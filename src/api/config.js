const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const API_URLS = {
  login: `${API_BASE_URL}/api/login`,
  register: `${API_BASE_URL}/api/register`,
  products: `${API_BASE_URL}/api/products`,
  projects: `${API_BASE_URL}/api/projects`,
  orders: `${API_BASE_URL}/api/orders`,
  stats: `${API_BASE_URL}/api/stats`,
  contact: `${API_BASE_URL}/api/contact`,
  depos: `${API_BASE_URL}/api/depos`,
  newsletter: `${API_BASE_URL}/api/newsletter/signup`,
  upload: `${API_BASE_URL}/api/upload`,
  analyze: `${API_BASE_URL}/api/ai/analyze`,
  chat: `${API_BASE_URL}/api/ai/chat`,
  verify: `${API_BASE_URL}/api/verify`,
  verifyEmail: `${API_BASE_URL}/api/verify-email`,
  forgotPassword: `${API_BASE_URL}/api/forgot-password`,
  resetPassword: `${API_BASE_URL}/api/reset-password`,
  adminUsers: `${API_BASE_URL}/api/admin/users`,
  adminOrders: `${API_BASE_URL}/api/admin/orders`,
};

export default API_BASE_URL;
