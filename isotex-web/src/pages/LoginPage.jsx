import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (result.success) {
        const from = location.state?.from || '/shop';
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-[480px] bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_20px_80px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col items-center text-center">

          <div className="w-16 h-16 rounded-full bg-[#f4f7fa] flex items-center justify-center text-[#706C61] mb-8 border border-gray-50 shadow-inner">
            <User size={28} strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl md:text-4xl font-serif text-[#000000] mb-4">Welcome Back</h1>
          <p className="text-xs text-[#444444] font-sans tracking-wide mb-12">
            Access your ISOTEX architectural account.
          </p>

          <form onSubmit={handleSubmit} className="w-full text-left space-y-8">

            <div>
              <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-[#444444] mb-3 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#706C61] transition-colors">
                  <Mail size={16} strokeWidth={1.5} />
                </div>
                <input 
                  type="text" 
                  placeholder="Username or Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F5F5F5] border-none rounded-2xl py-4 pl-14 pr-6 text-sm text-[#000000] placeholder-gray-300 focus:ring-1 focus:ring-[#706C61] transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-[#444444] mb-3 ml-1">
                Password
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

            <div className="flex items-center justify-between text-[10px] font-sans text-[#444444]">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-200 text-[#706C61] focus:ring-[#706C61] transition-all" />
                <span className="group-hover:text-[#000000] transition-colors">Remember me</span>
              </label>
              <Link to="/forgot-password" size="sm" className="hover:text-[#000000] transition-colors">Forgot password?</Link>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 text-[10px] py-3 px-4 rounded-xl font-bold text-center">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#000000] hover:bg-[#1a1e19] disabled:opacity-50 text-white py-5 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#000000]/10 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  Login <ArrowRight size={14} />
                </>
              )}
            </button>

          </form>

          <div className="mt-12 space-y-2 text-[10px] text-[#444444] font-sans">
            <p>Don't have an account yet? <Link to="/signup" className="text-[#706C61] font-bold hover:underline">Create one</Link></p>
            <p>For high volume requests <Link to="/contact" className="text-[#706C61] font-bold hover:underline">Contact Project Sales</Link></p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
