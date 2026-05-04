import React from 'react';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Download,
  FileText
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { useAdminProjects } from '../../hooks/useAdminProjects';

const trendData = [
  { name: 'May', carbon: 120, waste: 180 },
  { name: 'Jun', carbon: 210, waste: 250 },
  { name: 'Jul', carbon: 180, waste: 320 },
  { name: 'Aug', carbon: 310, waste: 290 },
  { name: 'Sep', carbon: 400, waste: 450 },
  { name: 'Oct', carbon: 520, waste: 490 }
];

const materialData = [
  { name: 'Indigo Denim', value: 45, color: '#4F7C35' },
  { name: 'Recycled Cotton', value: 25, color: '#4F7942' },
  { name: 'Linen Fibers', value: 15, color: '#000000' },
  { name: 'Mixed Synthetic', value: 15, color: '#AC875F' }
];

const AdminImpact = () => {
  const { projects, loading } = useAdminProjects();
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      <div className="animate-in fade-in slide-in-from-left-4 duration-700">
        <h1 className="text-4xl md:text-5xl font-serif text-[#000000] mb-3">Impact Analytics</h1>
        <p className="text-[#444444] text-sm md:text-base">Granular reporting on environmental mitigation across your portfolio.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-[#AC875F]/10 shadow-sm relative overflow-hidden animate-in zoom-in-95 duration-1000">
          <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#444444] mb-8">Carbon & Waste Mitigation Trends</h3>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F7C35" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F7C35" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#AC875F" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#AC875F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#A69F92" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#A69F92" fontSize={11} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', fontSize: '12px' }}
                  itemStyle={{ color: '#000', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="carbon" stroke="#4F7C35" strokeWidth={3} fillOpacity={1} fill="url(#colorCarbon)" name="Carbon (tCO2e)" />
                <Area type="monotone" dataKey="waste" stroke="#AC875F" strokeWidth={3} fillOpacity={1} fill="url(#colorWaste)" name="Waste (kg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="bg-white rounded-[2.5rem] p-10 border border-[#AC875F]/10 shadow-sm flex flex-col items-center justify-between animate-in zoom-in-95 duration-1000 delay-150">
          <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#444444] self-start w-full">Material Origin</h3>
          
          <div className="relative w-full h-48 my-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={materialData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  animationDuration={1500}
                >
                  {materialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', fontSize: '11px' }}
                  itemStyle={{ color: '#000', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-serif text-[#000000]">90%</span>
              <span className="text-[7px] font-bold tracking-[0.2em] uppercase text-[#444444]">Recycled</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-4 w-full">
            {materialData.map((item, i) => (
              <div key={i} className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-500" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[8px] font-bold text-[#444444] uppercase tracking-widest truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {}
      <div className="bg-[#1C1F1A] rounded-[2.5rem] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-1000 delay-300">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-12">
          
          <div className="flex-1 max-w-xl">
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/50 mb-6 block">Specifier Insights</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight mb-10">
              Your project portfolio is performing <span className="italic text-[#4F7C35]">18% higher</span> in BREEAM credits than the regional average.
            </h2>
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4F7C35] hover:text-white transition-all transform hover:translate-x-2 duration-300 group">
              Generate PDF Report 
              <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="w-full lg:w-72 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 animate-in fade-in slide-in-from-right-4 duration-1000 delay-500">
            <h4 className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/40 mb-6 border-b border-white/10 pb-4">
              EPD Documentation Status
            </h4>
            <div className="space-y-4">
              {loading ? (
                <p className="text-[10px] text-white/50">Loading documentation status...</p>
              ) : projects.slice(0, 3).map((item, i) => (
                <div key={item.id} className="flex justify-between items-center animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${0.8 + i * 0.1}s` }}>
                  <span className="text-[10px] font-bold tracking-wider text-white/80">{item.title}</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-green-400" />
                    <span className="text-[8px] font-bold tracking-widest text-green-400">VALIDATED</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="absolute -bottom-20 -right-20 text-white/[0.03] font-serif text-[30rem] leading-none pointer-events-none animate-in fade-in duration-1000 delay-1000">
          T
        </div>
      </div>

    </div>
  );
};

export default AdminImpact;
