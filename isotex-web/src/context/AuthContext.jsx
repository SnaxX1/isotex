import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem('ISOTEX_auth_token')
  );
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('ISOTEX_auth_token', data.token);
        setIsLoggedIn(true);
        setUser({ username: data.username });
        return { success: true };
      }
      const data = await response.json();
      return { success: false, error: data.error };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Connection error' };
    }
  };

  const register = async (email, password, fullName) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password, fullName })
      });
      
      if (response.ok) {
        const data = await response.json();
        return { success: true, message: data.message };
      }
      const data = await response.json();
      return { success: false, error: data.error };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Connection error' };
    }
  };

  const logout = () => {
    localStorage.removeItem('ISOTEX_auth_token');
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    const originalFetch = window.fetch;
    const AUTH_WHITELIST = ['/api/login', '/api/register', '/api/verify-email', '/api/forgot-password', '/api/reset-password'];
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || '';
      const isWhitelisted = AUTH_WHITELIST.some(path => url.includes(path));
      if (!isWhitelisted && (response.status === 401 || response.status === 403)) {
        logout();
        window.dispatchEvent(new Event('auth-error'));
      }
      return response;
    };
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
