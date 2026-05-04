import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return !!localStorage.getItem('ISOTEX_admin_token');
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('ISOTEX_admin_token');
      if (!token) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/verify-admin', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
          localStorage.removeItem('ISOTEX_admin_token');
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Token verification error:', error);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();

    const handleAuthError = () => {
      setIsAdmin(false);
      localStorage.removeItem('ISOTEX_admin_token');
    };
    window.addEventListener('auth-error', handleAuthError);
    return () => window.removeEventListener('auth-error', handleAuthError);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        
        
        if (data.role !== 'admin') {
          console.error('Non-admin user attempted admin login');
          return false;
        }

        localStorage.setItem('ISOTEX_admin_token', data.token);
        setIsAdmin(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('ISOTEX_admin_token');
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
