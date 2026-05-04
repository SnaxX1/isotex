import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Loader2, 
  Trash2,
  ExternalLink,
  BarChart2,
  FileText,
  MapPin
} from 'lucide-react';
import { useAdminProjects } from '../../hooks/useAdminProjects';

const ProjectCard = ({ project, onDelete }) => {
  const { id, title, status, location, date, impact, progress } = project;
  
  const getStatusColor = (s) => {
    switch (s) {
      case 'Completed': return 'text-green-600 bg-[#F4F9F1]';
      case 'In Specification': return 'text-[#4F7C35] bg-[#EEF6FF]';
      case 'Sampling Phase': return 'text-amber-600 bg-[#FEF9EE]';
      default: return 'text-gray-400 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-gray-200 p-10 mb-8 relative group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:border-gray-300">
      
      <div className="flex flex-col gap-8">
        {}
        <div className="flex items-center gap-6">
          <span className={`text-[9px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest ${getStatusColor(status)}`}>
            {status}
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <MapPin size={12} className="opacity-40" /> {location}
          </span>
        </div>

        {}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <h3 className="text-3xl md:text-4xl font-serif text-[#000000]">{title}</h3>
          
          <div className="w-full md:w-64">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                <BarChart2 size={12} className="text-[#4F7C35]" />
                Progress
              </div>
              <span className="text-xs font-serif text-[#000000] italic">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#4F7C35] rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-gray-50 mt-4">
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Impact Generation</p>
            <p className="text-[14px] font-bold text-[#444444]">{impact} Waste Saved</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Project Budget</p>
            <p className="text-[14px] font-bold text-[#000000]">£1.2M</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Last Update</p>
            <p className="text-[14px] text-gray-500 font-sans">{date}</p>
          </div>
        </div>

        {}
        <div className="flex flex-wrap justify-between items-center gap-6 mt-4">
          <div className="flex gap-10">
            <button className="flex items-center gap-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-[#000000] transition-colors">
              <FileText size={16} className="opacity-30" /> View Specs
            </button>
            <button className="flex items-center gap-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-[#000000] transition-colors">
              <BarChart2 size={16} className="opacity-30" /> Analytics
            </button>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onDelete(id, title)}
              className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={16} />
            </button>
            <button className="bg-[#F9F9F9] text-[#000000] px-8 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-[#000000] hover:text-white transition-all shadow-sm border border-gray-100">
              Open Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminProjects = () => {
  const navigate = useNavigate();
  const { projects, loading, deleteProject } = useAdminProjects();

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete the "${title}" specification?`)) {
      await deleteProject(id);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 animate-in fade-in slide-in-from-left-4 duration-700">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#000000] mb-3 tracking-tight">My Projects</h1>
          <p className="text-gray-400 text-sm md:text-base font-sans">Comprehensive management of your architectural material specifications.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/add-project-spec')}
          className="bg-[#1C2532] text-white px-10 py-5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#000000] shadow-2xl shadow-black/10 transition-all transform hover:-translate-y-1 duration-300 flex items-center gap-3"
        >
          <Plus size={16} /> Create Project
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#AC875F]">
          <Loader2 size={40} className="animate-spin mb-4" />
          <p className="font-serif text-xl">Accessing project database...</p>
        </div>
      ) : (
        <div className="space-y-0">
          {projects.map((project, i) => (
            <div key={project.id} className="animate-in fade-in slide-in-from-bottom-8 duration-1000" style={{ animationDelay: `${i * 0.15}s` }}>
              <ProjectCard project={project} onDelete={handleDelete} />
            </div>
          ))}
          {projects.length === 0 && (
            <div className="py-20 text-center bg-white rounded-[2.5rem] border border-[#AC875F]/10 animate-in zoom-in-95 duration-700">
              <p className="text-[#000000] font-serif text-2xl mb-2">No projects found</p>
              <p className="text-[#AC875F] text-sm">Create your first specification to begin.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
