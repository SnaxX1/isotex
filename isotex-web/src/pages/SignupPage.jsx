import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, Briefcase, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await register(email, password, fullName);
      if (result.success) {
        setSuccessMsg(result.message);
      } else {
        setError(result.error || 'Registration failed');
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
        <div className="w-full max-w-[540px] bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_20px_80px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col items-center text-center">

          <div className="w-16 h-16 rounded-full bg-[#EAE5DB] flex items-center justify-center text-[#444444] mb-8 border border-gray-50 shadow-inner">
            <Briefcase size={28} strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl md:text-4xl font-serif text-[#000000] mb-4">Create an Account</h1>
          <p className="text-xs text-[#444444] font-sans tracking-wide mb-12">
            Join the ISOTEX architectural network.
          </p>

          {successMsg ? (
            <div className="w-full bg-[#EAE5DB]/30 border border-[#C5A880] p-8 rounded-2xl flex flex-col items-center">
              <Mail size={32} className="text-[#C5A880] mb-4" />
              <h3 className="text-[#2C3A29] font-serif text-xl mb-2">Check your email</h3>
              <p className="text-sm text-[#444444] text-center mb-6">{successMsg}</p>
              <Link to="/login" className="bg-[#2C3A29] text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#1a2218] transition-colors">
                Go to Login
              </Link>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="w-full text-left space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-[#444444] mb-3 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#706C61] transition-colors">
                    <User size={16} strokeWidth={1.5} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#F5F5F5] border-none rounded-2xl py-4 pl-14 pr-6 text-sm text-[#000000] placeholder-gray-300 focus:ring-1 focus:ring-[#706C61] transition-all shadow-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-[#444444] mb-3 ml-1">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#706C61] transition-colors">
                    <Mail size={16} strokeWidth={1.5} />
                  </div>
                  <input 
                    type="email" 
                    placeholder="name@studio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F5F5F5] border-none rounded-2xl py-4 pl-14 pr-6 text-sm text-[#000000] placeholder-gray-300 focus:ring-1 focus:ring-[#706C61] transition-all shadow-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-[#444444] mb-3 ml-1">
                Create a password
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

            {error && (
              <div className="bg-red-50 text-red-500 text-[10px] py-3 px-4 rounded-xl font-bold text-center">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#000000] hover:bg-[#1a1e19] disabled:opacity-50 text-white py-5 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#000000]/10 mt-6"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight size={14} />
                </>
              )}
            </button>

          </form>
          )}

          <p className="mt-12 text-[10px] text-[#444444] font-sans">
            Already have an account? <Link to="/login" className="text-[#706C61] font-bold hover:underline">Login</Link>
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignupPage;
