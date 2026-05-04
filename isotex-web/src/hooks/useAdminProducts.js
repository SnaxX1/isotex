import { useState, useEffect, useCallback } from 'react';
import { adminApi } from '../api/adminProducts';

export const useAdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminApi.getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (data) => {
    const newProduct = await adminApi.addProduct(data);
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = async (id, data) => {
    const updated = await adminApi.updateProduct(id, data);
    setProducts(prev => prev.map(p => p.id === parseInt(id) ? updated : p));
    return updated;
  };

  const deleteProduct = async (id) => {
    await adminApi.deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== parseInt(id)));
  };

  return {
    products,
    loading,
    error,
    refresh: fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct
  };
};
