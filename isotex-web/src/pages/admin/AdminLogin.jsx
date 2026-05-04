import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Loader2 } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials or unauthorized account.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#242321] rounded-2xl flex items-center justify-center text-white font-serif text-3xl mx-auto mb-6 shadow-xl">I</div>
          <h1 className="text-3xl font-serif text-[#2C2B29] mb-2">Admin Portal</h1>
          <p className="text-sm text-[#A69F92] tracking-wide uppercase font-bold">Secure Access for ISOTEX Personnel</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.06)] border border-[#A69F92]/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69F92]/50" size={18} />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@isotex.com"
                  className="w-full bg-[#EAE5DB]/50 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-sm text-[#2C2B29] outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69F92]/50" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-[#EAE5DB]/50 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-sm text-[#2C2B29] outline-none transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 text-xs py-3 px-4 rounded-xl font-bold text-center animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#242321] hover:bg-[#2C2B29] disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>
        </div>
        
        <p className="text-center mt-8 text-[10px] text-[#A69F92] font-bold tracking-[0.1em] uppercase">
          Unauthorized access is monitored
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
