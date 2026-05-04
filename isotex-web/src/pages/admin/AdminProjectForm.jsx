import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { useAdminProjects } from '../../hooks/useAdminProjects';

const AdminProjectForm = () => {
  const navigate = useNavigate();
  const { addProject } = useAdminProjects();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    status: 'In Specification',
    location: '',
    impact: '0kg',
    type: 'High-End Residential',
    progress: 10
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await addProject(formData);
      setSuccess(true);
      setTimeout(() => navigate('/admin/projects'), 1500);
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl animate-in fade-in duration-500">
      <button 
        onClick={() => navigate('/admin/projects')}
        className="flex items-center gap-2 text-[#A69F92] hover:text-[#2C2B29] transition-colors mb-8 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold tracking-widest uppercase">Back to Projects</span>
      </button>

      <h1 className="text-4xl font-serif text-[#2C2B29] mb-12">New Project Specification</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-[2.5rem] p-10 border border-[#A69F92]/10 shadow-sm space-y-8">
          <div>
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Project Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. Skyline Residential"
              className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Tunis, TN"
                className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all appearance-none"
              >
                <option>In Specification</option>
                <option>Sampling Phase</option>
                <option>Draft</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Project Type</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                placeholder="High-End Residential"
                className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-3 block">Progress (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value)})}
                className="w-full bg-[#EAE5DB]/30 border border-transparent focus:border-[#706C61] focus:bg-white rounded-2xl py-4 px-6 text-sm text-[#2C2B29] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-[#242321] text-white font-bold py-5 rounded-2xl hover:bg-[#2C2B29] shadow-xl disabled:opacity-50 transition-all tracking-widest uppercase text-[10px] flex items-center justify-center gap-3"
        >
          {saving ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Initializing Workspace...
            </>
          ) : success ? (
            <>
              <CheckCircle2 size={18} className="text-green-400" />
              Project Created
            </>
          ) : (
            <>
              <Save size={18} />
              Create Project Specification
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminProjectForm;
