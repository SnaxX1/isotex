import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import { Shirt, Scissors, Wind, Hammer, Box } from 'lucide-react';

const ProcessStep = ({ phase, title, desc, icon: Icon, image, isLeft, iconBg, className = '' }) => {
  return (
    <div className={`flex flex-col md:flex-row items-center justify-between w-full mb-48 md:mb-64 relative z-10 ${isLeft ? '' : 'md:flex-row-reverse'} ${className}`}>
      
      <div className={`w-full md:w-[42%] flex flex-col ${isLeft ? 'items-start text-left' : 'items-start text-left'}`}>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-10 shadow-sm ${iconBg}`}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-5">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#706C61] whitespace-nowrap">{phase}</span>
          <h3 className="text-3xl md:text-4xl font-serif text-[#000000]">{title}</h3>
        </div>
        <p className="text-[14px] text-[#444444] leading-relaxed font-sans max-w-sm">
          {desc}
        </p>
      </div>

      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-14 h-14 z-20">
        <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[#F5F5F5] flex items-center justify-center shadow-md">
          <div className="w-2.5 h-2.5 rounded-full bg-[#000000]"></div>
        </div>
      </div>

      <div className="w-full md:w-[42%] mt-16 md:mt-0">
        <div className="w-full aspect-[4/3] rounded-[3.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:grayscale-0 transition-all duration-1000">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

const ProcessPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    {
      phase: 'Phase 01',
      title: 'Waste Collection',
      desc: 'Sourcing industrial surplus and post-consumer textile waste through our proprietary collection nodes.',
      icon: Shirt,
      image: '/images/IMG-20260420-WA0033.jpg',
      iconBg: 'bg-[#706C61]',
      isLeft: true
    },
    {
      phase: 'Phase 02',
      title: 'Fiber Deconstruction',
      desc: 'Mechanical shredding into homogeneous fiber clouds without use of water or chemical solvents.',
      icon: Scissors,
      image: '/images/IMG-20260420-WA0034.jpg',
      iconBg: 'bg-[#444444]',
      isLeft: false
    },
    {
      phase: 'Phase 03',
      title: 'Acoustic Blending',
      desc: 'Creating specific densities for thermal and acoustic performance by calibrating fiber lengths and types.',
      icon: Wind,
      image: '/images/IMG-20260420-WA0035.jpg',
      iconBg: 'bg-[#8BB1C9]',
      isLeft: true
    },
    {
      phase: 'Phase 04',
      title: 'Thermo-Compression',
      desc: 'Applying heat and high-pressure to fuse fibers and create architectural panels without toxic glues added.',
      icon: Hammer,
      image: '/images/IMG-20260420-WA0036.jpg',
      iconBg: 'bg-[#A3B18A]',
      isLeft: false
    },
    {
      phase: 'Phase 05',
      title: 'Architectural Forming',
      desc: 'Precision cutting into interlocking blocks, facing panels, or custom-molded architectural details.',
      icon: Box,
      image: '/images/IMG-20260420-WA0037.jpg',
      iconBg: 'bg-[#5D6B8C]',
      isLeft: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#EDEDED] flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">

        <section className="py-20 md:py-32 px-6 text-center">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#4F7C35] mb-6 block">Our Methodology</span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#000000] mb-6">Engineering Circularity</h1>
          <p className="text-sm text-[#444444] font-sans leading-relaxed max-w-xl mx-auto">
            The ISOTEX process is a low-impact mechanical sequence that turns soft waste into structural hard materials.
          </p>
        </section>

        <section className="py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
          <div className="max-w-6xl mx-auto relative">
            
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gray-300 z-0"></div>
            
            {steps.map((step, index) => (
              <ProcessStep 
                key={index} 
                {...step} 
                className={index === steps.length - 1 ? 'mb-0 md:mb-0' : ''} 
              />
            ))}
          </div>
        </section>

        <section className="py-24 bg-[#000000] text-white px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-20">
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                Mechanical densification vs. chemical binding.
              </h2>
              <p className="text-sm text-white/60 leading-relaxed font-sans">
                Our core innovation is a high-pressure compression algorithm that leverages the natural polymers found in textile waste to create structural integrity without added toxins or glues.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { label: 'CO2 EMISSIONS', value: '-85%', desc: 'vs traditional concrete' },
                { label: 'GLUE / TOXINS', value: '0%', desc: 'mechanical binding' },
                { label: 'WATER USAGE', value: '0', desc: 'liters used in processing' },
                { label: 'RECYCLABILITY', value: '100%', desc: 'fully circular lifecycle' }
              ].map((m, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                  <h3 className="text-3xl md:text-4xl font-serif mb-2">{m.value}</h3>
                  <p className="text-[8px] font-bold tracking-widest uppercase text-white/40 mb-1">{m.label}</p>
                  <p className="text-[10px] text-white/30 italic">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-16 md:h-20"></div>

      </main>

      <Footer />
    </div>
  );
};

export default ProcessPage;
