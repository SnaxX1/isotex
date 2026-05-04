import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  const calledOnce = React.useRef(false);

  useEffect(() => {
    if (calledOnce.current) return;
    
    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });
        
        const data = await response.json();
        if (response.ok && data.success) {
          setStatus('success');
          setMessage('Your email has been successfully verified! You can now log in.');
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed. The link may be invalid or expired.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('A network error occurred. Please try again.');
      }
    };

    if (token) {
      calledOnce.current = true;
      verifyEmail();
    } else {
      setStatus('error');
      setMessage('No verification token provided.');
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-[540px] bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_20px_80px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col items-center text-center">
          
          {status === 'verifying' && (
            <>
              <div className="w-16 h-16 rounded-full bg-[#EAE5DB] flex items-center justify-center text-[#444444] mb-8 animate-pulse">
                <Loader2 size={28} className="animate-spin" />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif text-[#000000] mb-4">Verifying Email</h1>
              <p className="text-sm text-[#444444] mb-8">Please wait while we verify your account...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32] mb-8">
                <CheckCircle size={28} strokeWidth={2} />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif text-[#000000] mb-4">Verification Successful</h1>
              <p className="text-sm text-[#444444] mb-12">{message}</p>
              <Link to="/login" className="w-full bg-[#000000] hover:bg-[#1a1e19] text-white py-5 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center transition-all shadow-xl shadow-[#000000]/10">
                Proceed to Login
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 rounded-full bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F] mb-8">
                <XCircle size={28} strokeWidth={2} />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif text-[#000000] mb-4">Verification Failed</h1>
              <p className="text-sm text-[#444444] mb-12">{message}</p>
              <Link to="/signup" className="w-full bg-[#000000] hover:bg-[#1a1e19] text-white py-5 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center transition-all shadow-xl shadow-[#000000]/10">
                Return to Sign Up
              </Link>
            </>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VerifyEmailPage;
