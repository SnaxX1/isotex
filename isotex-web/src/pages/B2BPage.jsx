import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import { Building2, Ruler, Truck, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

const SolutionCard = ({ title, desc, image }) => (
  <div className="group cursor-pointer">
    <div className="aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 shadow-lg relative">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
    </div>
    <h3 className="text-2xl font-serif text-[#000000] mb-3">{title}</h3>
    <p className="text-[13px] text-[#444444] leading-relaxed max-w-[280px]">{desc}</p>
  </div>
);

const B2BPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#EDEDED] flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">

        <section className="py-24 md:py-32 px-6 text-center">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#4F7C35] mb-6 block">Partnership</span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#000000] mb-8">Architectural Scale</h1>
          <p className="text-sm text-[#444444] font-sans leading-relaxed max-w-xl mx-auto">
            ISOTEX provides developers and architects with circular material solutions designed for high-performance commercial and residential projects.
          </p>
        </section>

        <section className="pb-32 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <SolutionCard 
              title="Commercial Fit-outs"
              desc="Acoustic panels and structural surfaces for modern office environments and retail spaces."
              image="/images/IMG-20260421-WA0019.jpg"
            />
            <SolutionCard 
              title="Residential Dev"
              desc="Sustainable insulation and decorative panels for large-scale ecological housing projects."
              image="/images/IMG-20260421-WA0024.jpg"
            />
            <SolutionCard 
              title="Hospitality Design"
              desc="Durable, high-end finishes for hotels and restaurants that prioritize circularity."
              image="/images/IMG-20260421-WA0025.jpg"
            />
          </div>
        </section>

        <section className="py-32 bg-[#000000] text-white px-6 md:px-12 lg:px-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-2xl mb-24">
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Built for industry professionals.</h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-md font-sans">
                Our B2B platform is designed to streamline material specification, offering technical support and logistical precision for every project phase.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: Building2, title: "Volume Pricing", desc: "Tiered pricing structures designed for large-scale procurement." },
                { icon: Ruler, title: "Custom Specs", desc: "Bespoke dimensions and density calibrations for specific technical needs." },
                { icon: Truck, title: "Priority Logistics", desc: "Direct factory-to-site delivery coordination for project timelines." },
                { icon: ShieldCheck, title: "Compliance", desc: "Full EPD and technical certification packages for every material." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#4F7C35]">
                    <item.icon size={22} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-lg font-serif">{item.title}</h4>
                  <p className="text-[12px] text-white/40 leading-relaxed font-sans">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/[0.02] transform skew-x-12 translate-x-20"></div>
        </section>

        <section className="py-32 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto bg-white rounded-[4rem] p-16 md:p-24 shadow-xl border border-gray-50 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#EDEDED] flex items-center justify-center text-[#444444] mb-10">
              <Mail size={28} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#000000] mb-8 leading-tight">Start your project inquiry.</h2>
            <p className="text-[14px] text-[#444444] font-sans leading-relaxed mb-12 max-w-sm">
              Connect with our project sales team to discuss technical specifications and volume requirements.
            </p>
            <Link to="/contact" className="bg-[#000000] text-white px-12 py-5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-3 hover:bg-[#1a1e19] transition-all shadow-xl shadow-[#000000]/10">
              Contact Project Sales <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <div className="h-16 md:h-20"></div>

      </main>

      <Footer />
    </div>
  );
};

export default B2BPage;
