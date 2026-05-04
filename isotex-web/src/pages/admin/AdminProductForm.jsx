import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon,
  Upload,
  Loader2,
  CheckCircle2,
  Link as LinkIcon
} from 'lucide-react';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import { adminApi } from '../../api/adminProducts';

const AdminProductForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { addProduct, updateProduct } = useAdminProducts();
  
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageMode, setImageMode] = useState('url'); 
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    stock: 'IN STOCK',
    image: '',
    category: 'Interior Decoration',
    tag: 'NEW',
    visualStyle: 'Modern Style',
    color: 'Blue',
    pill: 'PIECE',
    description: '',
    composition: '',
    circularImpact: '',
    technicalData: {
      certification: '',
      breeam: '',
      standardForm: '',
      density: ''
    }
  });

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        try {
          const product = await adminApi.getProductById(id);
          if (product) {
            setFormData(product);
          } else {
            navigate('/admin/products');
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const dataToSave = {
        ...formData,
        thumbnails: formData.thumbnails || [formData.image],
        applications: formData.applications || ['Architectural Use']
      };
      
      if (isEdit) {
        await updateProduct(id, dataToSave);
      } else {
        await addProduct(dataToSave);
      }
      
      setSuccess(true);
      setTimeout(() => navigate('/admin/products'), 1500);
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 text-[#A69F92]">
      <Loader2 size={40} className="animate-spin mb-4" />
      <p className="font-serif text-xl">Loading Material Details...</p>
    </div>
  );

  return (
    <div className="max-w-4xl">
      <button 
        onClick={() => navigate('/admin/products')}
        className="flex items-center gap-2 text-[#A69F92] hover:text-[#2C2B29] transition-colors mb-8 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold tracking-widest uppercase">Back to List</span>
      </button>

      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-serif text-[#2C2B29] mb-2">
            {isEdit ? 'Edit Material' : 'Register New Material'}
          </h1>
          <p className="text-[#A69F92] text-sm">Define technical specifications and visual assets for the material library.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#A69F92]/10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          
          <div className="md:col-span-2">
            <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#706C61] border-b border-[#A69F92]/20 pb-3 mb-6">
              Basic Identity
            </h3>
          </div>

          <div className="md:col-span-2">
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Product Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. NeoBrick - Indigo Indigo"
              className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all appearance-none"
            >
              <option>Interior Decoration</option>
              <option>Exterior Decoration</option>
              <option>Insulation</option>
              <option>Acoustics</option>
              <option>Cladding</option>
              <option>Panels</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Price Label</label>
            <input
              type="text"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00 TND"
              className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Visual Tag</label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder="JEAN, NEUTRE, etc."
              className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Color Profile</label>
            <select
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all appearance-none"
            >
              <option>Blue</option>
              <option>Grey</option>
              <option>Multi</option>
              <option>Neutral</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Product Image</label>
            {}
            <div className="flex gap-2 mb-4">
              <button type="button" onClick={() => setImageMode('url')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-bold tracking-widest uppercase transition-all ${
                  imageMode === 'url' ? 'bg-[#2C2B29] text-white' : 'bg-[#EAE5DB]/50 text-[#A69F92] hover:bg-[#EAE5DB]'
                }`}>
                <LinkIcon size={12} /> URL
              </button>
              <button type="button" onClick={() => setImageMode('upload')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-bold tracking-widest uppercase transition-all ${
                  imageMode === 'upload' ? 'bg-[#2C2B29] text-white' : 'bg-[#EAE5DB]/50 text-[#A69F92] hover:bg-[#EAE5DB]'
                }`}>
                <Upload size={12} /> Upload File
              </button>
            </div>

            {imageMode === 'url' ? (
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69F92]/40" size={18} />
                  <input type="text" name="image" value={formData.image} onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 pl-12 px-6 text-sm text-[#2C2B29] outline-none transition-all" />
                </div>
                {formData.image && (
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#A69F92]/10 flex-shrink-0">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadingImage(true);
                    try {
                      const token = localStorage.getItem('ISOTEX_admin_token');
                      const fd = new FormData();
                      fd.append('image', file);
                      const res = await fetch('/api/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
                      const data = await res.json();
                      if (data.url) setFormData(prev => ({ ...prev, image: data.url }));
                    } catch (err) { console.error(err); }
                    finally { setUploadingImage(false); }
                  }}
                />
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="flex items-center justify-center gap-3 w-full border-2 border-dashed border-[#A69F92]/30 rounded-2xl py-8 text-[10px] font-bold uppercase tracking-widest text-[#A69F92] hover:border-[#706C61] hover:text-[#706C61] transition-all disabled:opacity-50">
                  {uploadingImage ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  {uploadingImage ? 'Uploading...' : 'Click to select an image (max 5 MB)'}
                </button>
                {formData.image && (
                  <div className="flex items-center gap-4">
                    <img src={formData.image} alt="Uploaded" className="w-20 h-20 rounded-2xl object-cover border border-[#A69F92]/10" />
                    <span className="text-[10px] text-[#706C61] font-bold">Image uploaded successfully ✓</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#706C61] border-b border-[#A69F92]/20 pb-3 mt-4 mb-6">
              Story & Material Composition
            </h3>
          </div>

          <div className="md:col-span-2">
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Description</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all resize-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Technical Composition</label>
            <input
              type="text"
              name="composition"
              value={formData.composition}
              onChange={handleChange}
              placeholder="e.g. 85% recycled denim, 15% mineral-based binder"
              className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Circular Impact</label>
            <input
              type="text"
              name="circularImpact"
              value={formData.circularImpact}
              onChange={handleChange}
              placeholder="e.g. Recycles 6.5kg of denim waste per unit"
              className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#706C61] border-b border-[#A69F92]/20 pb-3 mt-4 mb-6">
              Technical Data Grid
            </h3>
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Certification</label>
            <input
              type="text"
              name="technicalData.certification"
              value={formData.technicalData.certification}
              onChange={handleChange}
              className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">BREEAM Credits</label>
            <input
              type="text"
              name="technicalData.breeam"
              value={formData.technicalData.breeam}
              onChange={handleChange}
              className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Standard Form</label>
            <input
              type="text"
              name="technicalData.standardForm"
              value={formData.technicalData.standardForm}
              onChange={handleChange}
              className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Density</label>
            <input
              type="text"
              name="technicalData.density"
              value={formData.technicalData.density}
              onChange={handleChange}
              className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="flex-1 bg-white border border-[#A69F92]/20 text-[#A69F92] font-bold py-5 rounded-2xl hover:bg-[#EAE5DB] transition-all tracking-widest uppercase text-[10px]"
          >
            Cancel Changes
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-[#242321] text-white font-bold py-5 rounded-2xl hover:bg-[#2C2B29] shadow-xl disabled:opacity-50 transition-all tracking-widest uppercase text-[10px] flex items-center justify-center gap-3"
          >
            {saving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Synchronizing...
              </>
            ) : success ? (
              <>
                <CheckCircle2 size={18} className="text-green-400" />
                Material Saved
              </>
            ) : (
              <>
                <Save size={18} />
                {isEdit ? 'Update Material' : 'Publish Material'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
