import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import { Leaf, Recycle, Droplets, Zap, Globe, FileText, Loader2 } from 'lucide-react';

const useCounter = (target, duration = 1800) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!target) return;
    const num = parseFloat(target);
    if (isNaN(num)) return;
    const step = num / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, num);
      setCount(current);
      if (current >= num) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
};

const ImpactCard = ({ icon: Icon, title, value, rawValue, suffix = '', desc, loading }) => {
  const animated = useCounter(rawValue);
  const displayValue = rawValue ? `${Math.floor(animated).toLocaleString()}${suffix}` : value;

  return (
    <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_15px_45px_rgba(0,0,0,0.04)] border border-gray-100/50 flex flex-col items-center text-center group hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500 transform hover:-translate-y-2">
      <div className="w-16 h-16 rounded-2xl bg-[#EDEDED] flex items-center justify-center text-[#706C61] mb-8 group-hover:bg-[#000000] group-hover:text-white transition-colors duration-500">
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#444444] mb-3">{title}</span>
      {loading ? (
        <Loader2 size={28} className="animate-spin text-[#706C61] mb-4" />
      ) : (
        <h3 className="text-4xl font-serif text-[#000000] mb-4">{displayValue}</h3>
      )}
      <p className="text-[12px] text-[#444444] leading-relaxed max-w-[200px]">{desc}</p>
    </div>
  );
};

const LiveStatCard = ({ label, rawValue, suffix = '' }) => {
  const animated = useCounter(rawValue);
  return (
    <div>
      <h3 className="text-4xl md:text-5xl font-serif text-[#000000] mb-4">
        {rawValue ? `${Math.floor(animated).toLocaleString()}${suffix}` : '—'}
      </h3>
      <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#444444]">{label}</p>
    </div>
  );
};

const ImpactPage = () => {
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('ISOTEX_auth_token');
        if (!token) { setLoadingStats(false); return; }
        const res = await fetch('/api/stats', { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) setStats(await res.json());
      } catch (e) {
        console.error('Could not load live stats', e);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  const activeProjects = stats?.activeSpecs ?? null;

  return (
    <div className="min-h-screen bg-[#EDEDED] flex flex-col font-sans">
      <Header />
      <main className="flex-grow">

        <section className="py-24 md:py-32 px-6 text-center">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#706C61] mb-6 block">Environmental Accountability</span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#000000] mb-8">Measurable <span className="italic font-light">Impact</span></h1>
          <p className="text-sm text-[#444444] font-sans leading-relaxed max-w-2xl mx-auto">
            Transparency is at the heart of ISOTEX. We track every gram of textile waste and every ton of CO₂ avoided through our proprietary densification technology.
          </p>
        </section>

        <section className="py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <ImpactCard 
              icon={Recycle}  
              title="Textile Waste Diverted" 
              rawValue={stats?.wasteDiverted} 
              suffix=" kg"
              value="500+ Tons" 
              desc="Discarded garments diverted from landfills since launch." 
              loading={loadingStats} 
            />
            <ImpactCard 
              icon={Leaf}     
              title="CO₂ Emissions Saved"    
              rawValue={stats?.carbonOffset} 
              suffix=" t"
              value="1,200 Tons" 
              desc="Carbon reduction by replacing traditional brick firing."  
              loading={loadingStats} 
            />
            <ImpactCard 
              icon={Droplets} 
              title="Water Preserved"        
              rawValue={2000000}
              suffix=" L"
              value="2M Liters"      
              desc="Water saved through our circular manufacturing process." 
              loading={false} 
            />
          </div>
        </section>

        <section className="py-24 bg-[#EDEDED] px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <div className="w-full lg:w-1/2">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#706C61] mb-6 block">The LCA Report</span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#000000] leading-tight mb-12 max-w-md">Lifecycle assessment from cradle to gate.</h2>
              <div className="space-y-10">
                {[
                  { icon: Zap,     title: 'Raw Material Acquisition', quote: '–90% impact compared to virgin concrete or ceramics.' },
                  { icon: Recycle, title: 'Production Phase',          quote: 'Zero chemicals, zero liquid discharge, minimal heat requirement.' },
                  { icon: Globe,   title: 'Local Supply Chains',       quote: '80% of our waste is sourced within 200 km of our production nodes.' },
                ].map(({ icon: Icon, title, quote }) => (
                  <div key={title} className="flex gap-6">
                    <div className="w-10 h-10 rounded-xl bg-[#EDEDED] flex items-center justify-center text-[#706C61] flex-shrink-0"><Icon size={18} /></div>
                    <div>
                      <h4 className="font-bold text-xs tracking-wider text-[#000000] mb-2 uppercase">{title}</h4>
                      <p className="text-[13px] text-[#444444] italic">"{quote}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="bg-[#000000] rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <span className="text-5xl font-serif text-[#706C61] mb-8 block opacity-50">"</span>
                  <p className="text-2xl md:text-3xl font-serif leading-relaxed mb-10 italic">Building the future shouldn't require destroying the present.</p>
                  <p className="text-sm text-white/50 font-sans leading-relaxed mb-12 max-w-sm">We provide a complete Environmental Product Declaration (EPD) for every material we ship, designed to help architecture firms achieve LEED and BREEAM certifications.</p>
                  <button className="flex items-center gap-3 bg-[#EDEDED] text-[#000000] px-8 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-[#706C61] hover:text-white transition-all duration-300 shadow-xl">
                    <FileText size={16} /> Download EPD Docs
                  </button>
                </div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#EDEDED]/5 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto bg-[#e7e5e4] rounded-[3rem] p-16 md:p-24 text-center border-[#444444]/10">
            <h2 className="text-3xl md:text-4xl font-serif text-[#000000] mb-20">A Global Network for Local Change</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
              <LiveStatCard label="Waste Hubs"      rawValue={12}                          />
              <LiveStatCard label="Refining Nodes"  rawValue={5}                           />
              <LiveStatCard label="Garments / Year" rawValue={300000}    suffix="+"        />
              <LiveStatCard label="Active Projects"  rawValue={activeProjects ?? 850}      />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default ImpactPage;
