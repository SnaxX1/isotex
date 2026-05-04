import { db } from './db.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const products = [
  {
    title: 'NeoBrick - Indigo Indigo',
    category: 'INTERIOR DECORATION',
    price: '48.00',
    stock: 500,
    status: 'In Stock',
    description: 'Self-locking architectural brick with a raw industrial aesthetic. The distinctive indigo hue comes from 100% recycled denim fibers.',
    sustainability: '85% recycled denim, 15% mineral-based binder. Recycles 6.5kg of denim waste per unit. Zero-water dyeing process.',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800'
  },
  {
    title: 'Soft Grey Facing Plate',
    category: 'INTERIOR DECORATION',
    price: '135.00',
    stock: 200,
    status: 'In Stock',
    description: 'Ultra-thin facing plates designed for modern interior cladding. Features a smooth, concrete-like finish derived from mixed neutral textile waste.',
    sustainability: '90% mixed neutral textiles, 10% eco-resin. Recycles 3.2kg of mixed textile waste per square meter.',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=800'
  },
  {
    title: 'Cento Mixed Block',
    category: 'INSULATION',
    price: '92.00',
    stock: 0,
    status: 'Made to Order',
    description: 'High-density acoustic and thermal isolation block. The unique speckled appearance comes from processing unsorted, multi-colored textile waste streams.',
    sustainability: '100% post-consumer mixed textiles, compressed under heat. Diverts 12kg of unrecyclable mixed textiles from landfill per block.',
    image: 'https://images.unsplash.com/photo-1549488493-4a11c0f0a575?w=800'
  }
];

const projects = [
  { title: 'Skyline Residential', status: 'In Specification', location: 'Tunis, TN', date: 'Oct 19, 2023', impact: '140kg', type: 'High-End Residential', progress: 75 },
  { title: 'The Atrium Lobby', status: 'Sampling Phase', location: 'Sousse, TN', date: 'Oct 16, 2023', impact: '85kg', type: 'Commercial Lobby', progress: 40 },
  { title: 'Studio Mono', status: 'Completed', location: 'Berlin, DE', date: 'Sep 22, 2023', impact: '210kg', type: 'Interior Cladding', progress: 100 }
];

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // 1. Create Admin User
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@ISOTEX2024';
    const hashedAdmin = await bcrypt.hash(adminPassword, 12);
    
    await db.user.upsert({
      where: { username: 'admin' },
      update: {
        password: hashedAdmin
      },
      create: {
        username: 'admin',
        password: hashedAdmin,
        role: 'admin',
        full_name: 'System Admin',
        is_verified: 1
      }
    });
    console.log('✅ Admin user ready.');

    // 2. Seed Products
    await db.product.deleteMany();
    for (const p of products) {
      await db.product.create({ data: p });
    }
    console.log(`✅ ${products.length} products seeded.`);

    // 3. Seed Projects
    await db.project.deleteMany();
    for (const proj of projects) {
      await db.project.create({ data: proj });
    }
    console.log(`✅ ${projects.length} projects seeded.`);

    console.log('🎉 Seeding finished successfully!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    process.exit();
  }
}

seed();
