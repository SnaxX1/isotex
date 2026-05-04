import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Plus, Minus, Trash2, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import logoImg from '/logo.png';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (path, hash) => {

    const isActive = hash
      ? location.pathname === '/' && location.hash === hash
      : location.pathname === path && !location.hash;

    return `hover:text-[#4F7C35] transition-colors pb-1 border-b ${isActive ? 'border-[#4F7C35] text-[#4F7C35]' : 'border-transparent'
      }`;
  };

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-500 px-6 md:px-12 lg:px-24 flex items-center justify-between ${isScrolled
        ? 'py-3 bg-[#F5F5F5]/80 backdrop-blur-md shadow-sm'
        : 'py-5 bg-[#F5F5F5]'
      }`}>

      <Link to="/" className="flex items-center gap-3 cursor-pointer group">
        <img src={logoImg} alt="ISOTEX logo" className="h-[35px] md:h-[45px] w-auto object-contain" />
        <span className="text-xl md:text-2xl font-serif font-bold text-[#000000] tracking-tighter group-hover:text-[#4F7C35] transition-colors">ISOTEX</span>
      </Link>

      <div className="flex items-center gap-12">

        <nav className="hidden md:flex items-center gap-8 text-[10px] font-bold text-[#444444] uppercase tracking-[0.15em]">
          <Link to="/shop" className={getLinkClass('/shop')}>Shop</Link>
          <Link to="/process" className={getLinkClass('/process')}>Process</Link>
          <Link to="/impact" className={getLinkClass('/impact')}>Impact</Link>
          <Link to="/depo" className={getLinkClass('/depo')} style={{ color: '#4F7C35' }}>Recycle & Earn</Link>

        </nav>

        <div className="flex items-center gap-5 text-[#000000]">
          <Link to="/ai-assistant" className="hover:opacity-70 transition-opacity text-[#444444]" title="AI Assistant">
            <Sparkles size={16} strokeWidth={1.5} />
          </Link>
          {isLoggedIn ? (
            <div className="relative group hidden md:block">
              <div className="cursor-pointer text-[#444444] hover:text-[#000000] transition-colors py-4 -my-4 flex items-center">
                <User size={16} strokeWidth={1.5} />
              </div>
              <div className="absolute top-full right-0 mt-4 w-36 bg-white shadow-xl border border-[#EAE5DB] rounded-md py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {!location.pathname.startsWith('/admin') && (
                  <Link to="/dashboard" className="block px-4 py-2.5 text-[10px] font-bold text-[#444444] uppercase tracking-[0.15em] hover:bg-gray-50 hover:text-black transition-colors">Dashboard</Link>
                )}
                <button onClick={logout} className="w-full text-left px-4 py-2.5 text-[10px] font-bold text-[#444444] uppercase tracking-[0.15em] hover:bg-gray-50 hover:text-black transition-colors">Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hidden md:block hover:opacity-70 transition-opacity text-[#444444]"><User size={16} strokeWidth={1.5} /></Link>
          )}
          <button
            className="hover:opacity-70 transition-opacity relative cursor-pointer flex items-center justify-center"
            onClick={() => navigate('/cart')}
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#000000] text-[#F5F5F5] text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden hover:opacity-70 transition-opacity ml-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#F5F5F5] border-t border-[#AC875F]/10 flex flex-col p-6 shadow-xl md:hidden">
          <nav className="flex flex-col gap-6 text-[12px] font-bold text-[#444444] uppercase tracking-[0.15em]">
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#000000] transition-colors">Shop</Link>
            <Link to="/process" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#000000] transition-colors">Process</Link>
            <Link to="/impact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#000000] transition-colors">Impact</Link>
            <Link to="/depo" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#000000] transition-colors text-[#4F7C35]">Recycle & Earn</Link>
            {isLoggedIn && !location.pathname.startsWith('/admin') && (
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#000000] transition-colors">Dashboard</Link>
            )}
            {isLoggedIn ? (
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="flex items-center justify-start gap-2 hover:text-[#000000] transition-colors mt-4 pt-4 border-t border-[#A69F92]/10 text-left">
                <User size={16} strokeWidth={1.5} /> Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-[#000000] transition-colors mt-4 pt-4 border-t border-[#A69F92]/10">
                <User size={16} strokeWidth={1.5} /> Account
              </Link>
            )}
          </nav>
        </div>
      )}

    </header>
  );
};

export default Header;
