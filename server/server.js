import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';

import nodemailer from 'nodemailer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { v2 as cloudinary } from 'cloudinary';
import prisma from './prisma.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  console.error('FATAL: JWT_SECRET is not set in .env');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts. Please wait 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // Increased to 10MB for production
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Only image files allowed'));
  },
});

app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static(uploadsDir)); // DISABLED for Cloudinary production
app.use(express.static(path.join(__dirname, '../public')));

// --- VALIDATION ROUTES ---
app.get('/api/test-db', async (req, res) => {
  try {
    const users = await prisma.user.findMany({ take: 5 });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/test-email', async (req, res) => {
  try {
    await transporter.sendMail({
      from: `"ISOTEX Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "Test Email",
      text: "This is a stable production test email."
    });
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/test-ai', async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY missing");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent("Say hello");
    res.json({ 
      success: true, 
      reply: result.response.text() 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) return res.sendStatus(403);
    try {
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) return res.sendStatus(403);
      req.user = decoded;
      next();
    } catch (error) {
      res.sendStatus(500);
    }
  });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

app.post('/api/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    
    if (user.isVerified === 0) {
      return res.status(403).json({ error: 'Please verify your email address before logging in.' });
    }
    
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: '24h' }
    );
    res.json({ token, username: user.username, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, password, fullName } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Required fields missing' });
  if (password.length < 6) return res.status(400).json({ error: 'Password too short' });
  
  try {
    const hashed = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    const user = await prisma.user.create({
      data: {
        username,
        password: hashed,
        fullName,
        isVerified: 0,
        verificationToken
      }
    });
    
    const baseUrl = req.get('origin') || process.env.FRONTEND_URL || `http://${req.hostname}:5173`;
    const verifyLink = `${baseUrl}/verify-email/${verificationToken}`;
    console.log(`\n[EMAIL VERIFICATION] Link for ${username}: ${verifyLink}\n`);

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await transporter.sendMail({
          from: `"ISOTEX Support" <${process.env.SMTP_USER}>`,
          to: username,
          subject: 'Verify your email address - ISOTEX',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #2C3A29; text-align: center;">ISOTEX</h2>
              <p>Welcome to ISOTEX!</p>
              <p>Please verify your email address to complete your registration by clicking the button below:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verifyLink}" style="background-color: #000; color: #fff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px;">Verify Email</a>
              </div>
              <p>If you did not create an account, please ignore this email.</p>
              <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
              <p style="font-size: 12px; color: #888; text-align: center;">&copy; 2024 ISOTEX. All rights reserved.</p>
            </div>
          `
        });
        console.log(`[EMAIL] Verification link sent to ${username}`);
      } catch (error) {
        console.error('[EMAIL ERROR]:', error);
      }
    }

    res.json({ success: true, message: 'Please check your email to verify your account.' });
  } catch (err) {
    if (err.code === 'P2002') return res.status(400).json({ error: 'User exists' });
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/verify-email', async (req, res) => {
  const { token } = req.body;
  try {
    const user = await prisma.user.findFirst({ where: { verificationToken: token } });
    if (!user) return res.status(400).json({ error: 'Invalid or expired verification token' });
    
    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: 1, verificationToken: null }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username: email } });
    if (!user) return res.json({ message: 'Reset link sent if email exists' });
    
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000);
    
    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken: token, resetTokenExpiry: expiry }
    });
    
    const baseUrl = req.get('origin') || process.env.FRONTEND_URL || `http://${req.hostname}:5173`;
    const resetLink = `${baseUrl}/reset-password/${token}`;
    console.log(`\n[PASSWORD RESET] Link for ${email}: ${resetLink}\n`);

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await transporter.sendMail({
          from: `"ISOTEX Support" <${process.env.SMTP_USER}>`,
          to: email,
          subject: 'Password Reset Request - ISOTEX',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #2C3A29; text-align: center;">ISOTEX</h2>
              <p>Hello,</p>
              <p>We received a request to reset your password for your ISOTEX account. Click the button below to set a new password:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" style="background-color: #000; color: #fff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px;">Reset Password</a>
              </div>
              <p>If you did not request this, please ignore this email or contact support.</p>
              <p>This link will expire in 1 hour.</p>
              <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
              <p style="font-size: 12px; color: #888; text-align: center;">&copy; 2024 ISOTEX. All rights reserved.</p>
            </div>
          `
        });
        console.log(`[EMAIL] Reset link sent to ${email}`);
      } catch (error) {
        console.error('[EMAIL ERROR]:', error);
      }
    }

    res.json({ message: 'Reset link sent if email exists' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() }
      }
    });
    if (!user) return res.status(400).json({ error: 'Invalid/expired token' });
    
    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed, resetToken: null, resetTokenExpiry: null }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/verify', authenticateToken, (req, res) => res.json({ valid: true, user: req.user }));
app.get('/api/verify-admin', authenticateToken, isAdmin, (req, res) => res.json({ valid: true, user: req.user }));

app.post('/api/upload', authenticateToken, isAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  
  try {
    const uploadPromise = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'isotex_products' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const result = await uploadPromise;
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('[CLOUDINARY UPLOAD ERROR]:', error);
    res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
  }
});

app.post('/api/ai/analyze', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is missing' });
  }

  try {
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const base64Image = req.file.buffer.toString('base64');
    
    const prompt = `You are an expert in sustainable architecture and material selection using recycled textile-based construction products.
You MUST return ONLY a valid JSON object.
Do NOT include any explanation, text, or formatting outside the JSON.
Analyze the provided image and follow these rules strictly:
1. Identify the space:
   - environment: must be either "interior" or "exterior"
   - type: short description (e.g., "living room wall", "office", "garden", "facade")
2. Detect design style:
   Choose ONLY one from:
   ["modern", "industrial", "minimalist", "rustic"]
3. Extract dominant colors:
   - Maximum 3 colors
   - Use simple names only (e.g., "grey", "white", "blue", "brown")
4. Recommend the best material configuration:
- category (choose ONE):
   ["decoration_interieure", "decoration_exterieure", "isolation"]
- product_form (choose ONE):
   ["brique_auto_bloquante", "plaquette_parement", "bloc_plein"]
- function (choose ONE):
   ["acoustique", "thermique", "none"]
- visual_style (choose ONE):
   ["jean", "neutre", "mix_color"]
5. Provide a short reason (maximum 12 words)
6. If unsure, ALWAYS choose the closest valid option from the lists above.
Return ONLY this JSON format:
{
  "space": { "environment": "", "type": "" },
  "style": "",
  "colors": [],
  "recommendation": { "category": "", "product_form": "", "function": "", "visual_style": "" },
  "reason": ""
}`;

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent([
      prompt,
      { inlineData: { data: base64Image, mimeType: req.file.mimetype } }
    ]);

    let rawText = result.response.text();
    if (rawText.startsWith('```json')) {
       rawText = rawText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    }
    
    const parsedData = JSON.parse(rawText.trim());
    
    res.json(parsedData);
  } catch (error) {
    console.error('[AI ERROR]:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

app.post('/api/ai/chat', async (req, res) => {
  const { message, history } = req.body;
  
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is missing' });
  }

  try {
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const systemInstruction = `You are an expert in sustainable architecture and ISOTEX's recycled textile construction products.
ISOTEX offers:
- Decoration Interieure: Plaquette Parement, Brique Auto Bloquante (Acoustic, modern aesthetics: neutre, jean, mix_color).
- Isolation: High thermal and acoustic insulation blocs.
Be concise, helpful, and professional. Always recommend the best ISOTEX product for their needs based on the information provided.`;

    const model = ai.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction 
    });

    let contents = [];
    if (history && history.length > 0) {
      contents = history.map(msg => ({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] }));
    }
    
    while (contents.length > 0 && contents[0].role === 'model') {
      contents.shift();
    }
    
    // contents.push({ role: 'user', parts: [{ text: message }] }); // Not needed if we use sendMessage

    const chat = model.startChat({
      history: contents,
    });

    const result = await chat.sendMessage(message);
    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error('[CHAT ERROR]:', error);
    res.status(500).json({ error: 'Failed to generate chat response' });
  }
});

app.get('/api/products', authenticateToken, async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', authenticateToken, isAdmin, async (req, res) => {
  const { title, category, price, stock, status, description, sustainability, image } = req.body;
  try {
    const product = await prisma.product.create({
      data: { title, category, price: price.toString(), stock: parseInt(stock), status, description, sustainability, image }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/:id', authenticateToken, isAdmin, async (req, res) => {
  const { title, category, price, stock, status, description, sustainability, image } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: { title, category, price: price.toString(), stock: parseInt(stock), status, description, sustainability, image }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/products/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/projects', authenticateToken, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { id: 'desc' } });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', authenticateToken, isAdmin, async (req, res) => {
  const { title, status, location, impact, type, progress } = req.body;
  const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  try {
    const project = await prisma.project.create({
      data: { title, status, location, date, impact, type, progress: parseInt(progress) }
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/projects/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/stats', authenticateToken, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({ select: { impact: true } });
    let total = 0;
    projects.forEach(p => {
      const v = parseFloat(p.impact);
      if (!isNaN(v)) total += v;
    });
    
    const productCount = await prisma.product.count();
    
    res.json({ 
      wasteDiverted: total.toFixed(1), 
      carbonOffset: (total * 0.005).toFixed(1), 
      activeSpecs: productCount 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', authenticateToken, async (req, res) => {
  const { total, items, paymentMethod, shippingAddress } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        items: JSON.stringify(items),
        total: parseFloat(total),
        paymentMethod,
        shippingAddress: JSON.stringify(shippingAddress)
      }
    });
    
    const orderId = order.id;
    const userEmail = req.user.username;
    console.log(`\n[ORDER] Confirmed for ${userEmail}: ${orderId} (${total} TND)\n`);

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: userEmail,
          subject: `Order Confirmation - Isotex (TX-${orderId})`,
          text: `Hello,\n\nThank you for your purchase!\n\nYour order (TX-${orderId}) has been successfully confirmed. The total amount is ${total} TND.\n\nWe will notify you once it ships.\n\nThank you,\nThe Isotex Team`
        });
        console.log(`[EMAIL] Confirmation sent to ${userEmail}`);
      } catch (error) {
        console.error('[EMAIL ERROR]:', error);
      }
    }

    res.json({ id: orderId, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/me', authenticateToken, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/orders/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const result = await prisma.order.updateMany({
      where: {
        id: parseInt(req.params.id),
        userId: req.user.id,
        status: 'Pending'
      },
      data: { status: 'Canceled' }
    });
    if (result.count === 0) return res.status(400).json({ error: 'Cannot cancel' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/contact', async (req, res) => {
  const { fullName, email, organization, requestType, projectScale, projectBrief, joinNewsletter } = req.body;

  if (!fullName || !email || !organization || !projectBrief) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(500).json({ error: 'Server email configuration is missing.' });
  }

  try {
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2C3A29; border-bottom: 2px solid #EAE5DB; padding-bottom: 10px;">New Contact Request</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Request Type:</strong> ${requestType}</p>
        <p><strong>Project Scale:</strong> ${projectScale}</p>
        <p><strong>Newsletter Opt-in:</strong> ${joinNewsletter ? 'Yes' : 'No'}</p>
        <h3 style="color: #444; margin-top: 20px;">Project Brief:</h3>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; color: #333; line-height: 1.5;">
          ${projectBrief.replace(/\n/g, '<br>')}
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
        <p style="font-size: 12px; color: #888; text-align: center;">Sent from ISOTEX Contact Form</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"ISOTEX Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `New Inquiry: ${requestType} - ${organization}`,
      html: htmlContent
    });

    res.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('[CONTACT FORM ERROR]:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

app.post('/api/depos', async (req, res) => {
  const { fullName, email, phone, weightKg, deliveryMethod } = req.body;
  if (!fullName || !email || !weightKg || !deliveryMethod) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const payout = parseFloat(weightKg) * 5;

  try {
    const depo = await prisma.depo.create({
      data: {
        fullName,
        email,
        phone: phone || '',
        weightKg: parseFloat(weightKg),
        payout,
        deliveryMethod
      }
    });
    
    const depoId = depo.id;

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
         const instructions = deliveryMethod === 'Drop-off' 
           ? 'Please bring your items to our main facility at: 123 Eco Street, Tunis, TN.' 
           : 'Please mail your items to our processing center at: 123 Eco Street, Tunis, TN. Clearly write your Request ID (DP-' + depoId + ') on the outside of the package.';
           
         await transporter.sendMail({
          from: `"ISOTEX Circular" <${process.env.SMTP_USER}>`,
          to: email,
          subject: `Clothing Drop-off Request Received (DP-${depoId})`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #2C3A29;">ISOTEX Circular Economy</h2>
              <p>Hello ${fullName},</p>
              <p>Thank you for choosing to recycle your clothes with us!</p>
              <p><strong>Estimated Weight:</strong> ${weightKg} kg</p>
              <p><strong>Estimated Payout:</strong> ${payout.toFixed(2)} TND</p>
              <p><strong>Delivery Method:</strong> ${deliveryMethod}</p>
              <div style="background-color: #F9FBF8; padding: 15px; border-left: 4px solid #4F7C35; margin: 20px 0;">
                <p style="margin:0;"><strong>Instructions:</strong> ${instructions}</p>
              </div>
              <p>Once we receive and verify the weight of your items, we will contact you to process your payout.</p>
              <p>Thank you for helping us build a sustainable future.</p>
              <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
              <p style="font-size: 12px; color: #888; text-align: center;">&copy; 2024 ISOTEX. All rights reserved.</p>
            </div>
          `
        });
      } catch (emailErr) {
        console.error('[EMAIL ERROR DEPO]:', emailErr);
      }
    }

    res.json({ success: true, id: depoId, payout });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/newsletter/signup', async (req, res) => {
  const { email } = req.body;
  try {
    await prisma.subscriber.create({ data: { email } });
    console.log(`[NEWSLETTER] Welcome: ${email}`);

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: email,
          subject: 'Welcome to the Isotex Newsletter!',
          text: `Hello,\n\nThank you for subscribing to the Isotex newsletter!\n\nYou'll now be the first to know about our latest products, sustainability updates, and exclusive offers.\n\nWelcome to the community!\n\nThe Isotex Team`
        });
        console.log(`[EMAIL] Newsletter welcome sent to ${email}`);
      } catch (error) {
        console.error('[EMAIL ERROR]:', error);
      }
    }

    res.json({ success: true });
  } catch (err) {
    if (err.code === 'P2002') return res.status(400).json({ error: 'Already subscribed' });
    res.status(500).json({ error: 'Error subscribing' });
  }
});

app.get('/api/admin/users', authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, fullName: true, role: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/users/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/orders', authenticateToken, isAdmin, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { user: { select: { username: true } } },
      orderBy: { id: 'desc' }
    });
    // Map to include user_email for frontend compatibility
    const formattedOrders = orders.map(o => ({ ...o, user_email: o.user.username }));
    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/orders/:id/status', authenticateToken, isAdmin, async (req, res) => {
  const { status } = req.body;
  const orderId = parseInt(req.params.id);

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });


    if (status === 'Delivered') {
      console.log(`[DELIVERY] Status set to Delivered for order TX-${orderId}. Fetching customer email...`);

      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { user: { select: { username: true } } }
      });

      if (order && order.user.username) {
        const userEmail = order.user.username;
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
          try {
            await transporter.sendMail({
              from: `"ISOTEX" <${process.env.SMTP_USER}>`,
              to: userEmail,
              subject: `Your Order Has Arrived! — ISOTEX (TX-${orderId})`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                  <h2 style="color: #2C3A29; text-align: center;">ISOTEX</h2>
                  <div style="text-align: center; margin: 20px 0;">
                    <span style="font-size: 48px;">✅</span>
                  </div>
                  <h3 style="color: #2C3A29; text-align: center;">Your order has been delivered!</h3>
                  <p>Hello,</p>
                  <p>Great news! Your ISOTEX order <strong>TX-${orderId}</strong> has been successfully delivered.</p>
                  <p>We hope you're thrilled with your eco-materials. If you have any questions or concerns about your order, please don't hesitate to contact us.</p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" 
                       style="background-color: #2C3A29; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 14px;">
                      View My Orders
                    </a>
                  </div>
                  <p>Thank you for choosing ISOTEX — building a sustainable future together.</p>
                  <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
                  <p style="font-size: 12px; color: #888; text-align: center;">© 2024 ISOTEX. All rights reserved.</p>
                </div>
              `
            });
            console.log(`[EMAIL] ✅ Delivery notification sent to ${userEmail} for TX-${orderId}`);
          } catch (emailErr) {
            console.error('[EMAIL ERROR] Failed to send delivery email:', emailErr.message);
          }
        } else {
          console.warn('[EMAIL] SMTP credentials missing — skipping delivery email.');
        }
      } else {
        console.warn(`[DELIVERY] Could not find customer email for order TX-${orderId}`);
      }
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/orders/:id/contact', authenticateToken, isAdmin, async (req, res) => {
  const { userEmail, subject, text } = req.body;
  if (!userEmail) return res.status(400).json({ error: 'User email is required' });
  
  try {
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: userEmail,
        subject: subject || `Regarding your Isotex order TX-${req.params.id}`,
        text: text
      });
      res.json({ success: true });
    } else {
      res.status(500).json({ error: 'Email configuration missing' });
    }
  } catch (error) {
    console.error('[EMAIL ERROR]:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, '0.0.0.0', () => console.log(`✅ ISOTEX API: Listening on all network interfaces (port ${PORT})`));
