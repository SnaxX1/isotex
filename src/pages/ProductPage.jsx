import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import { PRODUCTS } from '../data/products';
import {
  ShieldCheck, Maximize, Leaf, Layers, CheckCircle, Droplet, CheckCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();

  const product = React.useMemo(() => PRODUCTS.find((p) => p.id === parseInt(id)), [id]);

  useEffect(() => {
    if (!product) {
      navigate('/shop');
      return;
    }
    window.scrollTo(0, 0);
    setMainImage(product.image);
  }, [product, navigate]);

  if (!product) return null;

  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity((prev) => prev + 1);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location.pathname } });
    } else {
      addToCart(product, quantity);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setQuantity(1);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-16">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[9px] font-bold tracking-widest uppercase text-[#444444] mb-12 gap-4">
          <Link to="/shop" className="hover:text-[#5B432E] transition-colors flex items-center gap-2">
            ← BACK TO COLLECTION
          </Link>
          <div className="flex items-center gap-2 text-[#444444]">
            <Link to="/" className="hover:text-[#444444] transition-colors">HOME</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-[#444444] transition-colors">CATALOGUE</Link>
            <span>/</span>
            <span className="text-[#000000]">{product.title}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24">

          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-100 shadow-sm relative">
              <img src={mainImage} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(thumb)}
                  className={`relative w-1/3 aspect-square rounded-2xl overflow-hidden shadow-sm transition-all ${
                    mainImage === thumb
                      ? 'ring-2 ring-[#444444] ring-offset-2 ring-offset-[#F9F7F2]'
                      : 'hover:opacity-80'
                  }`}
                >
                  <img src={thumb} alt={`${product.title} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[45%] flex flex-col">

            <div className="flex items-center gap-4 text-[9px] font-bold tracking-widest uppercase mb-6">
              <span className="text-[#706C61]">{product.category}</span>
              <span className="text-gray-300">-</span>
              <span className="text-[#444444]">{product.visualStyle}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-[#000000] leading-tight mb-4">{product.title}</h1>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl text-[#444444] font-sans">{product.price}</span>
              <span className="text-[9px] font-bold tracking-widest uppercase text-[#444444] border border-gray-200 px-3 py-1.5 rounded-full bg-white/50">{product.stock}</span>
            </div>

            <div className="mb-8">
              <h3 className="text-[9px] font-bold tracking-widest uppercase text-[#444444] mb-3">Material Description</h3>
              <p className="text-sm text-[#444444] leading-relaxed font-sans">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-[#444444]/10">
              <div>
                <h3 className="text-[9px] font-bold tracking-widest uppercase text-[#444444] mb-3">Composition</h3>
                <div className="flex items-start gap-2">
                  <Droplet size={14} className="text-[#706C61] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#000000] font-sans leading-relaxed">{product.composition}</p>
                </div>
              </div>
              <div>
                <h3 className="text-[9px] font-bold tracking-widest uppercase text-[#444444] mb-3">Product Form</h3>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-[#000000] flex-shrink-0" />
                  <p className="text-xs text-[#000000] font-sans">{product.pill}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-[9px] font-bold tracking-widest uppercase text-[#444444] mb-4">Applications / Use Cases</h3>
              <ul className="flex flex-col gap-3">
                {product.applications.map((app, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs text-[#444444] font-sans border border-gray-100 rounded-xl px-4 py-2 bg-white/50 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#706C61]" />
                    {app}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#242321] rounded-2xl p-6 mb-10 text-[#FFFFFF] relative overflow-hidden shadow-lg">
              <h3 className="text-[9px] font-bold tracking-widest uppercase text-[#444444] mb-3">Circular Impact</h3>
              <p className="text-xs font-sans leading-relaxed text-gray-300 relative z-10">{product.circularImpact}</p>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#443C35] rounded-full opacity-50 z-0" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <div className="flex items-center justify-between bg-[#F5F5F5] rounded-full px-6 py-3 sm:w-40 shadow-sm">
                <button onClick={handleDecrease} className="text-[#444444] hover:text-[#000000] transition-colors text-lg leading-none">&minus;</button>
                <span className="text-xs font-bold text-[#000000] w-8 text-center">{quantity}</span>
                <button onClick={handleIncrease} className="text-[#444444] hover:text-[#000000] transition-colors text-lg leading-none">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#706C61] hover:bg-[#4a7796] active:scale-[0.98] text-white text-[10px] font-bold tracking-widest uppercase rounded-full py-4 transition-all shadow-lg shadow-[#706C61]/20"
              >
                Add to Project Batch
              </button>
            </div>

          </div>
        </div>

        <div className="w-full pt-16 border-t border-[#444444]/20 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          <div className="w-full lg:w-1/3">
            <h2 className="text-2xl md:text-3xl font-serif text-[#000000] mb-4">Technical Data</h2>
            <p className="text-xs text-[#444444] font-sans leading-relaxed">
              Professional-grade certifications for high-end architectural compliance.
            </p>
          </div>
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12">
            <div className="flex gap-4">
              <ShieldCheck className="text-[#444444] flex-shrink-0" size={20} strokeWidth={1.5} />
              <div>
                <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#000000] mb-2">Certification</h4>
                <p className="text-xs text-[#444444] font-sans leading-relaxed">{product.technicalData.certification}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Maximize className="text-[#706C61] flex-shrink-0" size={20} strokeWidth={1.5} />
              <div>
                <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#000000] mb-2">Standard Form</h4>
                <p className="text-xs text-[#444444] font-sans leading-relaxed">{product.technicalData.standardForm}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Leaf className="text-green-600 flex-shrink-0" size={20} strokeWidth={1.5} />
              <div>
                <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#000000] mb-2">BREEAM Credits</h4>
                <p className="text-xs text-[#444444] font-sans leading-relaxed">{product.technicalData.breeam}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Layers className="text-[#444444] flex-shrink-0" size={20} strokeWidth={1.5} />
              <div>
                <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#000000] mb-2">Density</h4>
                <p className="text-xs text-[#444444] font-sans leading-relaxed">{product.technicalData.density}</p>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />

      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 bg-[#242321] text-[#FFFFFF] text-xs font-sans px-6 py-4 rounded-2xl shadow-2xl animate-fade-in-up">
          <CheckCheck size={16} className="text-[#706C61] flex-shrink-0" />
          Added {product.title} to batch!
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.35s ease forwards; }
      `}</style>
    </div>
  );
};

export default ProductPage;
