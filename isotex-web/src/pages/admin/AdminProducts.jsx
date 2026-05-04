import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Trash2,
  Zap,
  Bookmark
} from 'lucide-react';
import { useAdminProducts } from '../../hooks/useAdminProducts';

const ProductCard = ({ product, onDelete }) => (
  <div className="bg-white rounded-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-gray-200 flex flex-col group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
    <div className="relative h-64 bg-[#F9F9F9]">
      <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-all duration-700" />
      <div className="absolute top-6 right-6">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-400 shadow-sm border border-gray-100">
          <Bookmark size={18} fill="currentColor" className="opacity-80" />
        </div>
      </div>
    </div>

    <div className="p-8 flex flex-col flex-1">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[8px] font-bold px-3 py-1 bg-[#EEF6FF] text-[#4F7C35] rounded-full uppercase tracking-widest">
          {product.category}
        </span>
        <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Saved: Oct 10</span>
      </div>

      <h3 className="text-xl font-serif text-[#000000] mb-1">{product.title}</h3>
      <p className="text-[10px] text-gray-400 font-sans tracking-wide mb-8">Style: {product.pill || 'Neutral'}</p>

      <div className="bg-gray-50 rounded-2xl p-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#4F7C35] shadow-sm border border-gray-100">
            <Zap size={14} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Tech Grade</p>
            <p className="text-[10px] font-bold text-[#000000]">A2-s1 Fire Rated</p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-3">
        <Link 
          to={`/admin/edit-product/${product.id}`}
          className="flex-1 bg-[#000000] text-white py-4 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-[#333333] transition-all text-center"
        >
          View Specs
        </Link>
        <div className="flex gap-2">
          <button 
            onClick={() => onDelete(product.id, product.title)}
            className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 hover:text-red-500 hover:border-red-100 transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AdminProducts = () => {
  const { products, loading, deleteProduct } = useAdminProducts();

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 animate-in fade-in slide-in-from-left-4 duration-700">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#000000] mb-3 tracking-tight">Materials Vault</h1>
          <p className="text-gray-400 text-sm md:text-base font-sans">
            Your curated collection of high-performance architectural materials.
          </p>
        </div>
        <Link 
          to="/admin/add-product"
          className="bg-[#1C2532] text-white px-10 py-5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#000000] shadow-2xl shadow-black/10 transition-all transform hover:-translate-y-1 duration-300 flex items-center gap-3"
        >
          <Plus size={16} /> Add Material
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-center font-serif text-xl text-gray-400 animate-pulse">
          Synchronizing material network...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, i) => (
            <div key={product.id} className="animate-in fade-in slide-in-from-bottom-8 duration-1000" style={{ animationDelay: `${i * 0.1}s` }}>
              <ProductCard product={product} onDelete={handleDelete} />
            </div>
          ))}

          <Link 
            to="/admin/add-product"
            className="bg-transparent border-2 border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center group cursor-pointer hover:border-[#4F7C35] transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-300 group-hover:text-[#4F7C35] group-hover:scale-110 transition-all mb-8">
              <Plus size={32} strokeWidth={1} />
            </div>
            <h3 className="text-xl font-serif text-[#000000] mb-2">Grow your vault</h3>
            <p className="text-[11px] text-gray-400 leading-relaxed font-sans max-w-[200px]">
              Explore industrial textures in the Materials Catalogue.
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
