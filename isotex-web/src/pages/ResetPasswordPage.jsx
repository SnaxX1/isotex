import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import { Lock, ArrowRight, Eye, EyeOff, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(data.error || 'Invalid or expired token');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-[480px] bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_20px_80px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col">
          
          <h1 className="text-3xl md:text-4xl font-serif text-[#000000] mb-4">Set New Password</h1>
          <p className="text-xs text-[#444444] font-sans tracking-wide mb-12">
            Create a secure password for your ISOTEX account.
          </p>

          {success ? (
            <div className="text-center space-y-6 py-8 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto shadow-sm">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#000000] mb-2">Password Reset!</h3>
                <p className="text-xs text-[#444444] leading-relaxed">
                  Your password has been updated. Redirecting you to login...
                </p>
              </div>
              <Link to="/login" className="inline-block text-[10px] font-bold text-[#706C61] uppercase tracking-widest hover:underline">
                Click here if not redirected
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full text-left space-y-8">
              
              <div>
                <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-[#444444] mb-3 ml-1">
                  New Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#706C61] transition-colors">
                    <Lock size={16} strokeWidth={1.5} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F5F5F5] border-none rounded-2xl py-4 pl-14 pr-12 text-sm text-[#000000] placeholder-gray-300 focus:ring-1 focus:ring-[#706C61] transition-all shadow-sm"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-5 flex items-center text-gray-300 hover:text-[#706C61] transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-[#444444] mb-3 ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#706C61] transition-colors">
                    <Lock size={16} strokeWidth={1.5} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#F5F5F5] border-none rounded-2xl py-4 pl-14 pr-6 text-sm text-[#000000] placeholder-gray-300 focus:ring-1 focus:ring-[#706C61] transition-all shadow-sm"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 text-[10px] py-3 px-4 rounded-xl font-bold flex items-center gap-3">
                  <AlertTriangle size={14} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#000000] hover:bg-[#1a1e19] disabled:opacity-50 text-white py-5 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-xl shadow-[#000000]/10 mt-4"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    Update Password <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          )}

          {!success && (
            <p className="mt-8 text-center text-[10px] text-[#A69F92] italic">
              Security Notice: This link is unique to you and will expire in 1 hour.
            </p>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
