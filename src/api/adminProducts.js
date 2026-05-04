import { API_URLS } from './config';

const getAuthHeaders = () => {
  const token = localStorage.getItem('ISOTEX_admin_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const adminApi = {
  getProducts: async () => {
    const res = await fetch(API_URLS.products, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  getProductById: async (id) => {
    const res = await fetch(`${API_URLS.products}/${id}`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },

  addProduct: async (productData) => {
    const res = await fetch(API_URLS.products, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    });
    if (!res.ok) throw new Error('Failed to add product');
    return res.json();
  },

  updateProduct: async (id, data) => {
    const res = await fetch(`${API_URLS.products}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
  },

  deleteProduct: async (id) => {
    const res = await fetch(`${API_URLS.products}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete product');
    return true;
  }
};
