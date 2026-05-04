import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    setUser(null);
    try {
      await SecureStore.deleteItemAsync('userToken');
      delete api.defaults.headers.common['Authorization'];
    } catch (e) {
      console.error('Logout cleanup error:', e);
    }
  };

  useEffect(() => {
    loadToken();

    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          await logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  const loadToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await api.get('/api/verify');
        setUser(response.data.user);
      }
    } catch (e) {
      if (e.response?.status === 401 || e.response?.status === 403) {
        await logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await api.post('/api/login', { username, password });
      const { token, role } = response.data;
      await SecureStore.setItemAsync('userToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ username, role });
      return { success: true };
    } catch (e) {
      return { success: false, error: e.response?.data?.error || 'Login failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
