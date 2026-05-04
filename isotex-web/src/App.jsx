import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AboutPage from './pages/AboutPage';
import ProcessPage from './pages/ProcessPage';
import ImpactPage from './pages/ImpactPage';
import B2BPage from './pages/B2BPage';
import ContactPage from './pages/ContactPage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import OrderValidationPage from './pages/OrderValidationPage';
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import AiAssistantPage from './pages/AiAssistantPage';
import DepoPage from './pages/DepoPage';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollToTop from './components/ScrollToTop';

import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminProjects from './pages/admin/AdminProjects';
import AdminProjectForm from './pages/admin/AdminProjectForm';
import AdminImpact from './pages/admin/AdminImpact';
import AdminDeliveries from './pages/admin/AdminDeliveries';

import DashboardPage from './pages/DashboardPage';
import AdminUsers from './pages/admin/AdminUsers';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToTopButton />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/b2b" element={<B2BPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-validation" element={<OrderValidationPage />} />
        <Route path="/ai-assistant" element={<AiAssistantPage />} />
        <Route path="/depo" element={<DepoPage />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route path="/admin/login" element={<AdminAuthProvider><AdminLogin /></AdminAuthProvider>} />
        <Route path="/admin" element={
          <AdminAuthProvider>
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          </AdminAuthProvider>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="add-product" element={<AdminProductForm />} />
          <Route path="edit-product/:id" element={<AdminProductForm />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="add-project-spec" element={<AdminProjectForm />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="impact" element={<AdminImpact />} />
          <Route path="deliveries" element={<AdminDeliveries />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
