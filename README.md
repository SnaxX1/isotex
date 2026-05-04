# 🌿 ISOTEX — Sustainable Materials E-Commerce Platform

> A full-stack, production-grade e-commerce platform for sustainable architectural materials. Built with React, Node.js, and SQLite.

---

## ✨ Key Features

### 🛍️ Customer Experience

- **Full E-Commerce Flow** — Browse, filter, add to cart, checkout, and receive a confirmation email automatically.
- **Animated Skeleton Loaders** — Premium loading experience that feels instant and polished.
- **Downloadable PDF Invoice** — Every confirmed order generates a downloadable PDF receipt directly in the browser.
- **Multi-step Checkout** — Collects shipping address, payment method, and client information in a guided flow.
- **Newsletter Subscription** — Instantly sends a welcome email upon signup using Nodemailer.

### 🔐 Authentication & Security

- **JWT Authentication** — Secure, stateless login for both customers and administrators.
- **Bcrypt Password Hashing** — All passwords are encrypted with a salt factor of 12.
- **Rate Limiting** — Login attempts are rate-limited to prevent brute-force attacks.
- **Role-Based Access Control** — Separate customer and admin roles with protected routes.
- **Password Reset Flow** — Secure token-based password reset via email.

### 🛠️ Admin Dashboard

- **Live Analytics Chart** — Beautiful animated AreaChart (Recharts) visualizing sustainability impact over time.
- **Order & Delivery Management** — Full lifecycle tracking: Pending → Processing → Shipped → Delivered.
- **Automated Customer Emails** — One-click "Contact Customer" sends a professional follow-up email via Nodemailer for canceled orders.
- **Product & Project Management** — Full CRUD for products and impact projects.
- **User Management** — View and manage all registered users.

### 📧 Automated Email System (Nodemailer)

- Order confirmation emails sent automatically on purchase.
- Cancellation follow-up emails sent directly from the admin dashboard.
- Newsletter welcome emails sent on signup.

---

## 🏗️ Tech Stack

| Layer              | Technology                             |
| ------------------ | -------------------------------------- |
| **Frontend**       | React 19, React Router, TailwindCSS v4 |
| **Backend**        | Node.js, Express 5                     |
| **Database**       | SQLite3                                |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js       |
| **Email**          | Nodemailer (Gmail SMTP)                |
| **Charts**         | Recharts                               |
| **PDF Generation** | html2pdf.js                            |
| **File Uploads**   | Multer                                 |
| **Build Tool**     | Vite                                   |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- A Gmail account with 2-Step Verification enabled (for email features)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd compet
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory:

   ```env
   JWT_SECRET=your_super_secret_jwt_key
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_gmail_app_password
   ```

4. **Seed the database with demo data:**

   ```bash
   node server/seed.js
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be running at `http://localhost:5173` and the API at `http://localhost:3000`.

---

## 📁 Project Structure

```
compet/
├── server/
│   ├── server.js       # Express API with all endpoints
│   ├── db.js           # SQLite database connection
│   └── seed.js         # Database seeder for demo data
├── src/
│   ├── components/     # Reusable UI components (Header, Footer, Cart)
│   ├── context/        # React Contexts (Auth, Cart)
│   ├── hooks/          # Custom React hooks for data fetching
│   └── pages/
│       ├── admin/      # Admin dashboard pages
│       └── *.jsx       # Customer-facing pages
└── public/
    └── uploads/        # Product image uploads
```

---

## 🌱 Sustainability Mission

ISOTEX is built around the mission of making sustainable architectural materials accessible to modern designers and builders. Every product in the catalogue is sourced with environmental impact in mind, and the platform tracks and displays real carbon offset data from active projects.

---
