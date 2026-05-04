import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import { PRODUCTS } from '../data/products';

const ProductCard = ({ product }) => (
  <Link to={`/product/${product.id}`} className="flex flex-col group cursor-pointer">
    <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden mb-4 bg-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.06)] w-full pt-[100%]">
      <img 
        src={product.image} 
        alt={product.title} 
        className="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute top-4 left-4 bg-[#EDEDED]/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[9px] font-bold tracking-widest text-[#000000] uppercase shadow-sm z-10">
        {product.tag}
      </div>
    </div>

    <div className="flex justify-between items-start mb-1 px-1 gap-4">
      <h3 className="font-serif text-[14px] lg:text-[15px] text-[#000000] leading-tight flex-1 min-w-0">{product.title}</h3>
      <span className="font-sans text-[13px] text-[#444444] whitespace-nowrap">{product.price}</span>
    </div>
    
    <div className="px-1 mb-4">
      <p className="text-[8px] font-bold tracking-widest uppercase text-[#444444] break-words">{product.category}</p>
    </div>

    <div className="px-1 mt-auto">
      <span className="inline-flex items-center justify-center border border-[#444444]/30 px-3 py-1.5 rounded-full text-[8px] font-bold tracking-[0.1em] uppercase text-[#444444] max-w-full text-center">
        <span className="truncate">{product.pill}</span>
      </span>
    </div>
  </Link>
);

const CategoryPage = () => {
  const { categoryId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  const normalize = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const categoryProducts = PRODUCTS.filter(p => 
    normalize(p.category).replace(/\s+/g, '-') === normalize(categoryId)
  );

  const formattedTitle = categoryId.replace(/-/g, ' ').toUpperCase();

  return (
    <div className="min-h-screen bg-[#EDEDED] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        <div className="bg-[#EDEDED] py-20 text-center border-b border-[#444444]/10">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#4F7C35] mb-4 block">
            Category
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#000000] mb-4">{formattedTitle}</h1>
          <p className="text-[#444444] max-w-xl mx-auto text-sm leading-relaxed font-sans">
            Explore our curated selection of architectural materials specifically engineered for {formattedTitle.toLowerCase()}.
          </p>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-16">
          <div className="flex justify-between items-center mb-10 border-b border-[#444444]/10 pb-4">
            <p className="text-[10px] text-[#4F7C35] tracking-wider uppercase font-bold">
              Showing {categoryProducts.length} materials
            </p>
            <Link to="/shop" className="text-[10px] text-[#4F7C35] hover:text-[#000000] transition-colors tracking-wider uppercase font-bold">
              View All Catalogue &rarr;
            </Link>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center">
              <p className="text-[#000000] font-serif text-2xl mb-2">No materials found</p>
              <p className="text-[#444444] text-sm font-sans mb-8">This category doesn't have any products yet.</p>
              <Link 
                to="/shop"
                className="border border-[#444444] text-[#444444] px-6 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-[#444444] hover:text-white transition-colors"
              >
                Back to Catalogue
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
