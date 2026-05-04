import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import { Search } from 'lucide-react';
import { API_URLS } from '../api/config';

const ProductSkeleton = () => (
  <div className="flex flex-col animate-pulse">
    <div className="rounded-2xl md:rounded-[2rem] bg-gray-300 w-full pt-[100%] mb-4"></div>
    <div className="flex justify-between items-start mb-2 px-1">
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      <div className="h-4 bg-gray-300 rounded w-1/5"></div>
    </div>
    <div className="h-2 bg-gray-200 rounded w-1/4 mb-4 px-1"></div>
    <div className="h-6 bg-gray-200 rounded-full w-1/3 ml-1 mt-auto"></div>
  </div>
);

const FilterSection = ({ title, options, active, setActive }) => (
  <div className="mb-10">
    <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-[#444444] mb-4">{title}</h3>
    <ul className="flex flex-col gap-3">
      {options.map((opt, i) => (
        <li key={i}>
          <button 
            onClick={() => setActive(opt)}
            className={`text-xs font-sans text-left transition-colors ${
              active === opt 
                ? (opt.startsWith('All') ? 'text-[#4F7C35] font-bold border-b border-[#4F7C35] pb-0.5 inline-block' : 'text-[#706C61] font-bold border-b border-[#706C61] pb-0.5 inline-block')
                : (opt.startsWith('All') ? 'text-[#4F7C35] font-semibold hover:opacity-70' : 'text-[#444444] font-semibold hover:text-[#000000]')
            }`}
          >
            {opt}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const ProductCard = ({ product }) => (
  <Link to={`/product/${product.id}`} className="flex flex-col group cursor-pointer">
    
    <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden mb-4 bg-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.06)] w-full pt-[100%]">
      <img 
        src={product.image} 
        alt={product.title} 
        className="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
      />
      
      <div className="absolute top-4 left-4 bg-[#EDEDED]/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[9px] font-bold tracking-widest text-[#000000] uppercase shadow-sm z-10">
        {product.status || 'NEW'}
      </div>
    </div>

    <div className="flex justify-between items-start mb-1 px-1 gap-4">
      <h3 className="font-serif text-[14px] lg:text-[15px] text-[#000000] leading-tight flex-1 min-w-0">{product.title}</h3>
      <span className="font-sans text-[13px] text-[#444444] whitespace-nowrap">{product.price} TND</span>
    </div>
    
    <div className="px-1 mb-4">
      <p className="text-[8px] font-bold tracking-widest uppercase text-[#444444] break-words">{product.category}</p>
    </div>

    <div className="px-1 mt-auto">
      <span className="inline-flex items-center justify-center border border-[#444444]/30 px-3 py-1.5 rounded-full text-[8px] font-bold tracking-[0.1em] uppercase text-[#444444] max-w-full text-center">
        <span className="truncate">{product.category === 'INSULATION' ? 'Solid Block' : (product.category === 'INTERIOR DECORATION' ? 'Interlocking Bricks' : 'Facing Panels')}</span>
      </span>
    </div>
  </Link>
);

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const activeApp = searchParams.get('category') || 'All Applications';
  const activeForm = searchParams.get('form') || 'All Formats';
  const activeStyle = searchParams.get('style') || 'All Styles';
  const searchQuery = searchParams.get('q') || '';

  const updateParam = (key, value, defaultValue) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === defaultValue) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const setActiveApp = (val) => updateParam('category', val, 'All Applications');
  const setActiveForm = (val) => updateParam('form', val, 'All Formats');
  const setActiveStyle = (val) => updateParam('style', val, 'All Styles');
  const setSearchQuery = (val) => updateParam('q', val, '');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URLS.products);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setDbProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const normalize = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const filteredProducts = dbProducts.filter(product => {
    const matchApp = activeApp === 'All Applications' || normalize(product.category) === normalize(activeApp);
    const matchForm = activeForm === 'All Formats' || normalize(product.pill) === normalize(activeForm);
    const matchStyle = activeStyle === 'All Styles' || normalize(product.tag) === normalize(activeStyle);
    const matchSearch = !searchQuery || normalize(product.title).includes(normalize(searchQuery)) || normalize(product.category).includes(normalize(searchQuery));
    
    return matchApp && matchForm && matchStyle && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#EDEDED] flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-20">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 border-b border-[#444444]/10 pb-16 w-full">
          <div className="max-w-xl flex-shrink-0">
            <h1 className="text-4xl md:text-5xl font-serif text-[#000000] mb-4">Materials Catalogue</h1>
            <div className="min-h-[48px]">
              {activeApp === 'Interior Decoration' && (
                <p className="text-sm text-[#444444] font-medium leading-relaxed font-sans mb-2 transition-all">
                  High-end decorative elements and interior cladding designed for residential and commercial spaces.
                </p>
              )}
              {activeApp === 'Exterior Decoration' && (
                <p className="text-sm text-[#444444] font-medium leading-relaxed font-sans mb-2 transition-all">
                  Weather-resistant materials designed for durability in various outdoor architectural applications.
                </p>
              )}
              {activeApp === 'Insulation' && (
                <p className="text-sm text-[#444444] font-medium leading-relaxed font-sans mb-2 transition-all">
                  High-performance acoustic and thermal insulation solutions for sustainable building envelopes.
                </p>
              )}
              <p className="text-sm text-[#444444] leading-relaxed font-sans max-w-md">
                Technical architectural components for sustainable high-performance construction.
              </p>
            </div>
          </div>
          
          <div className="w-full lg:w-72 relative flex items-center flex-shrink-0">
            <input 
              type="text" 
              placeholder="Search for materials..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#EDEDED] border-none rounded-xl py-3 pl-10 pr-4 text-sm text-[#000000] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#444444]"
            />
            <Search className="absolute left-3.5 text-[#444444]" size={16} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="flex items-center gap-2 mb-10 text-[#000000]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              <h2 className="text-xs font-bold tracking-widest uppercase">Filters</h2>
            </div>

            <FilterSection 
              title="Application Category" 
              options={['All Applications', 'Interior Decoration', 'Exterior Decoration', 'Insulation']} 
              active={activeApp}
              setActive={setActiveApp}
            />
            <FilterSection 
              title="Product Format" 
              options={['All Formats', 'Interlocking Bricks', 'Facing Panels', 'Solid Block']} 
              active={activeForm}
              setActive={setActiveForm}
            />
            <FilterSection 
              title="Visual Style" 
              options={['All Styles', 'Denim', 'Neutral', 'Color mix']} 
              active={activeStyle}
              setActive={setActiveStyle}
            />

          </aside>

          <div className="flex-1">

            <div className="flex justify-between items-center mb-8">
              <p className="text-[10px] text-[#4F7C35] font-bold tracking-wider uppercase">
                {loading ? 'Loading materials...' : `Showing ${filteredProducts.length} materials`}
              </p>
              <div className="flex gap-4 text-[10px] text-[#444444] tracking-wider">
                <button className="text-[#4F7C35] font-bold border-b border-[#4F7C35] pb-0.5 uppercase">Grid</button>
                <button className="hover:text-[#000000] transition-colors">Technical List</button>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <ProductSkeleton key={n} />)}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="w-full py-20 flex flex-col items-center justify-center text-center">
                <p className="text-[#000000] font-serif text-2xl mb-2">No materials found</p>
                <p className="text-[#444444] text-sm font-sans">Try adjusting your filters or search.</p>
                <button 
                  onClick={() => {
                    setSearchParams({});
                  }}
                  className="mt-6 border border-[#444444] text-[#444444] px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-[#444444] hover:text-white transition-colors"
                >
                  Reset filters
                </button>
              </div>
            )}

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ShopPage;
