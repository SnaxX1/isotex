import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import { ArrowLeft, Compass } from 'lucide-react';

const NotFoundPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#EDEDED] flex flex-col font-sans">
      <Header />

      <main className="flex-grow flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl w-full text-center">

          {}
          <div className="relative mb-8 select-none">
            <span
              className="text-[180px] md:text-[240px] font-serif font-light leading-none text-[#000000]/5 block"
              aria-hidden="true"
            >
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-[1.5rem] bg-[#000000] flex items-center justify-center shadow-2xl">
                <Compass size={36} className="text-white" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {}
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#706C61] mb-6">
            Page Not Found
          </p>

          {}
          <h1 className="text-4xl md:text-5xl font-serif text-[#000000] leading-tight mb-6">
            You've wandered off the{' '}
            <span className="italic font-light">blueprint.</span>
          </h1>

          {}
          <p className="text-sm text-[#444444] font-sans leading-relaxed max-w-md mx-auto mb-12">
            The page you're looking for has been moved, deleted, or never existed.
            Let's get you back to solid ground.
          </p>

          {}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-3 bg-[#1A1F2B] hover:bg-black text-white text-[10px] font-bold tracking-[0.15em] uppercase rounded-full px-8 py-4 transition-all shadow-xl shadow-black/10 active:scale-[0.98]"
            >
              <ArrowLeft size={14} />
              Return to Homepage
            </Link>
            <Link
              to="/shop"
              className="flex items-center gap-3 border border-[#444444]/30 text-[#444444] hover:border-[#000000] hover:text-[#000000] text-[10px] font-bold tracking-[0.15em] uppercase rounded-full px-8 py-4 transition-all"
            >
              Browse Catalogue
            </Link>
          </div>

          {}
          <div className="mt-16 pt-10 border-t border-[#444444]/10">
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#706C61] mb-6">
              Or explore
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: 'About ISOTEX', to: '/about' },
                { label: 'Our Process', to: '/process' },
                { label: 'Impact', to: '/impact' },
                { label: 'B2B', to: '/b2b' },
                { label: 'Contact', to: '/contact' },
              ].map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-[11px] font-semibold text-[#444444] hover:text-[#000000] transition-colors underline underline-offset-4 decoration-[#444444]/30 hover:decoration-[#000000]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
