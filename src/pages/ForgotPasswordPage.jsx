import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong');
      }
    } catch {
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
          
          <Link to="/login" className="flex items-center gap-2 text-[10px] font-bold text-[#A69F92] uppercase tracking-widest hover:text-[#000000] transition-colors mb-10 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </Link>

          <h1 className="text-3xl md:text-4xl font-serif text-[#000000] mb-4">Reset Password</h1>
          <p className="text-xs text-[#444444] font-sans tracking-wide mb-12">
            Enter your email and we'll send you instructions to reset your password.
          </p>

          {success ? (
            <div className="text-center space-y-6 py-8 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto shadow-sm">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#000000] mb-2">Check your email</h3>
                <p className="text-xs text-[#444444] leading-relaxed">
                  If an account exists for {email}, you will receive a reset link shortly.
                </p>
              </div>
              <p className="text-[10px] text-[#A69F92] italic pt-4">
                Tip: Check your spam folder if you don't see it.
              </p>
            </div>
          ) : (
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
                    type="email" 
                    placeholder="architect@studio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F5F5F5] border-none rounded-2xl py-4 pl-14 pr-6 text-sm text-[#000000] placeholder-gray-300 focus:ring-1 focus:ring-[#706C61] transition-all shadow-sm"
                    required
                  />
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
                className="w-full bg-[#000000] hover:bg-[#1a1e19] disabled:opacity-50 text-white py-5 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-xl shadow-[#000000]/10 mt-4"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Sending link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
