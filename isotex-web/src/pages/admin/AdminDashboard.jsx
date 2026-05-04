import React from 'react';
import { 
  Recycle, 
  Leaf, 
  Files, 
  ArrowUpRight,
  ChevronRight,
  FileText,
  BarChart2
} from 'lucide-react';
import { useAdminProjects } from '../../hooks/useAdminProjects';
import { useAdminStats } from '../../hooks/useAdminStats';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', impact: 120 },
  { name: 'Feb', impact: 210 },
  { name: 'Mar', impact: 180 },
  { name: 'Apr', impact: 350 },
  { name: 'May', impact: 420 },
  { name: 'Jun', impact: 580 },
];

const StatCard = ({ title, value, unit, change, icon: Icon, color, link }) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-gray-200 transition-all duration-500 relative overflow-hidden group hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-gray-300">
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-8">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color === 'text-[#4F7C35]' ? 'bg-[#F4F9F1] text-[#4F7C35]' : color === 'text-[#AC875F]' ? 'bg-[#FDF8F3] text-[#AC875F]' : 'bg-[#F9F9F8] text-[#000000]'}`}>
          <Icon size={20} strokeWidth={1.5} />
        </div>
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">{title}</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-baseline gap-2">
          <h3 className="text-4xl font-serif text-[#000000]">{value}</h3>
          <span className="text-sm font-sans text-gray-400 italic">{unit}</span>
        </div>
        
        {change && (
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#4F7C35]">
            <ArrowUpRight size={14} />
            {change} from last month
          </div>
        )}

        {link && (
          <button className="flex items-center gap-2 text-[10px] font-bold text-[#4F7C35] hover:opacity-70 transition-opacity">
            {link}
            <ChevronRight size={12} />
          </button>
        )}
      </div>
    </div>
    
    <Icon size={140} className={`absolute -bottom-6 -right-6 ${color === 'text-[#4F7C35]' ? 'text-[#F4F9F1]' : color === 'text-[#AC875F]' ? 'text-[#FDF8F3]' : 'text-[#F9F9F8]'} opacity-40 group-hover:rotate-6 transition-transform duration-700`} />
  </div>
);

const ProjectItem = ({ title, status, date, impact, icon: Icon }) => (
  <div className="flex items-center justify-between p-6 bg-[#F9F9F9] rounded-2xl border border-transparent hover:border-gray-200 transition-all cursor-pointer group">
    <div className="flex items-center gap-6">
      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#AC875F] shadow-sm border border-gray-50">
        <Icon size={20} strokeWidth={1.2} />
      </div>
      <div>
        <h4 className="text-[15px] font-serif text-[#000000] mb-1">{title}</h4>
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <span className="text-[#4F7C35]">{status}</span>
          <span className="opacity-30">•</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
            {date}
          </span>
        </div>
      </div>
    </div>
    <div className="text-right">
      <p className="text-[13px] font-bold text-[#000000] mb-0.5">{impact} Waste Saved</p>
    </div>
  </div>
);

const SupportLink = ({ title, desc, icon: Icon, color }) => (
  <div className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-transparent hover:border-gray-100 transition-all cursor-pointer group">
    <div className="flex items-center gap-6">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center shadow-sm`}>
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <div>
        <h4 className="text-[14px] font-bold text-[#000000] mb-1">{title}</h4>
        <p className="text-[11px] text-gray-400 font-sans">{desc}</p>
      </div>
    </div>
    <ArrowUpRight size={16} className="text-gray-300 group-hover:text-[#000000] transition-all" />
  </div>
);

import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { projects, loading: projectsLoading } = useAdminProjects();
  const { stats } = useAdminStats();

  const formatStat = (val) => {
    const num = parseFloat(val);
    return isNaN(num) ? val : num.toLocaleString();
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 animate-in fade-in slide-in-from-left-4 duration-700">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#000000] mb-3 tracking-tight">Project Workspace</h1>
          <p className="text-[#444444] text-sm md:text-base font-sans">Welcome back to your ISOTEX specification dashboard.</p>
        </div>
        <Link to="/admin/add-project-spec">
          <button className="bg-[#332D28] text-white px-8 py-4 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#000000] shadow-xl shadow-[#332D28]/20 transition-all transform hover:-translate-y-1 duration-300">
            Start New Specification
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-1000 delay-200">
        <StatCard title="Waste Diverted" value={formatStat(stats.wasteDiverted)} unit="kg" change="+12%" icon={Recycle} color="text-[#AC875F]" />
        <StatCard title="Carbon Offset" value={formatStat(stats.carbonOffset)} unit="tCO2e" icon={Leaf} color="text-[#4F7C35]" />
        <StatCard title="Active Specs" value={String(stats.activeSpecs).padStart(2, '0')} unit="Projects" icon={Files} color="text-[#000000]" link="View all active drafts" />
      </div>

      <div className="bg-white rounded-[3rem] p-10 shadow-[0_15px_60px_rgba(0,0,0,0.03)] border border-gray-200 animate-in fade-in duration-1000 delay-300">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-serif text-[#000000]">Sustainability Impact Trend</h3>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F7C35" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4F7C35" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#A69F92" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#A69F92" fontSize={12} tickLine={false} axisLine={false} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                itemStyle={{ color: '#000', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="impact" stroke="#4F7C35" strokeWidth={3} fillOpacity={1} fill="url(#colorImpact)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <div className="lg:col-span-7 bg-white rounded-[3rem] p-12 shadow-[0_15px_60px_rgba(0,0,0,0.03)] border border-gray-200 flex flex-col animate-in fade-in slide-in-from-left-4 duration-1000 delay-300">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-xl font-serif text-[#000000]">Current Projects</h3>
            <button className="text-[10px] font-bold tracking-widest uppercase text-[#4F7C35] hover:opacity-70 transition-opacity">Manage All</button>
          </div>
          <div className="space-y-4">
            {projectsLoading ? (
              <p className="text-sm text-gray-400">Loading projects...</p>
            ) : projects.length === 0 ? (
              <p className="text-sm text-gray-400">No projects found.</p>
            ) : (
              projects.slice(0, 3).map(project => (
                <ProjectItem 
                  key={project.id}
                  title={project.title} 
                  status={project.status} 
                  date={project.date} 
                  impact={project.impact} 
                  icon={Files}
                />
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-10 animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
          <div className="bg-white rounded-[3rem] p-12 shadow-[0_15px_60px_rgba(0,0,0,0.03)] border border-gray-200">
            <h3 className="text-xl font-serif text-[#000000] mb-10">Materials Support</h3>
            <div className="space-y-6">
              <SupportLink 
                title="Download TDS Library" 
                desc="Full technical data for BREEAM certification." 
                icon={FileText}
                color="bg-[#F9F9F8] text-[#444444]"
              />
              <SupportLink 
                title="Project Impact report" 
                desc="Q3 2023 summary for client presentation." 
                icon={BarChart2}
                color="bg-[#F4F9F1] text-[#4F7C35]"
              />
            </div>
          </div>

          <div className="bg-[#1C1F1A] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl group cursor-pointer">
            <div className="relative z-10">
              <h3 className="text-lg font-serif mb-3">Material sample request?</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed mb-8 max-w-[240px]">
                Our atelier provides specific physical texture libraries for large-scale interior projects.
              </p>
              <button className="flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase text-[#4F7C35] border-b border-[#4F7C35]/30 pb-1 hover:border-[#4F7C35] transition-all">
                Order Custom Samples
                <ChevronRight size={12} />
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F7C35]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
