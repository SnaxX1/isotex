import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '/logo.png';

const Footer = () => {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('idle'); 
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/newsletter/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Connection error. Please try again.');
    }
  };

  return (
    <footer className="bg-[#000000] pt-16 pb-8 px-8 text-brand-beige">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-12 border-b border-white/10 pb-12">
   
        <div className="w-full md:w-1/3">
          <Link to="/" className="flex items-center gap-3 mb-8 cursor-pointer group">
            <img src={logoImg} alt="ISOTEX logo" className="h-[35px] md:h-[45px] w-auto object-contain" />
            <span className="text-xl md:text-2xl font-serif font-bold text-white tracking-tighter group-hover:text-[#4F7C35] transition-colors">ISOTEX</span>
          </Link>
          <p className="text-gray-400 text-sm mb-6 max-w-sm leading-relaxed font-sans">
            Innovative architectural materials created from end-of-life textiles. Redefining what it means to build sustainably.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-brand-dark transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-brand-dark transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-wrap justify-between gap-8 font-sans">
          <div>
            <h4 className="font-bold text-white/40 mb-8 uppercase tracking-[0.2em] text-[10px]">Resources</h4>
            <ul className="space-y-4 text-xs text-white/70">
              <li><Link to="/shop" className="hover:text-white transition-colors">Materials</Link></li>
              <li><Link to="/process" className="hover:text-white transition-colors">The Process</Link></li>
              <li><Link to="/impact" className="hover:text-white transition-colors">Impact Report</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white/40 mb-8 uppercase tracking-[0.2em] text-[10px]">Company</h4>
            <ul className="space-y-4 text-xs text-white/70">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/b2b" className="hover:text-white transition-colors">B2B Solutions</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="max-w-[280px] w-full">
            <h4 className="font-bold text-white/40 mb-8 uppercase tracking-[0.2em] text-[10px]">Stay Informed</h4>
            <form onSubmit={handleSubmit} className="flex items-center gap-4 border-b border-white/20 pb-2 group mb-2">
              <input 
                type="email" 
                placeholder={status === 'success' ? "Subscribed!" : "Email Address"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                className="bg-transparent focus:outline-none text-xs text-white placeholder-white/30 flex-1 disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className="text-[10px] uppercase tracking-widest hover:text-[#706C61] transition-colors whitespace-nowrap disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : 'Join'}
              </button>
            </form>
            {message && (
              <p className={`text-[9px] uppercase tracking-widest ${status === 'error' ? 'text-red-400' : 'text-gray-400'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-gray-500 uppercase tracking-widest">
        <p>© 2026 ISOTEX. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
