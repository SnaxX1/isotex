import React from 'react';
import { Recycle, Building2, Leaf, Factory, Briefcase, Users, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const ODDSection = () => {
  const odds = [
    {
      id: 12,
      title: "Responsible Consumption & Production",
      description: "Transforming textile waste into ecological insulation panels for a real circular economy.",
      icon: <Recycle size={32} />,
      primary: true
    },
    {
      id: 11,
      title: "Sustainable Cities & Communities",
      description: "High-performance insulation for buildings with a low carbon footprint and reduced urban pollution.",
      icon: <Building2 size={24} />
    },
    {
      id: 13,
      title: "Climate Action",
      description: "Massive reduction in CO₂ emissions by diverting textiles from incineration.",
      icon: <Leaf size={24} />
    },
    {
      id: 9,
      title: "Industry, Innovation & Infrastructure",
      description: "Innovative industrial solution based on recycling and new sustainable materials.",
      icon: <Factory size={24} />
    },
    {
      id: 8,
      title: "Decent Work & Economic Growth",
      description: "Creation of local green jobs in sorting, recycling, and industrial production.",
      icon: <Briefcase size={24} />
    },
    {
      id: 17,
      title: "Partnerships for the Goals",
      description: "Collaboration between students, construction experts, and textile industry players.",
      icon: <Users size={24} />
    },
    {
      id: 3,
      title: "Good Health & Well-being",
      description: "Reduction of textile pollution indirectly improving public health and quality of life.",
      icon: <Heart size={24} />
    }
  ];

  const primaryODD = odds.find(o => o.primary);
  const secondaryODDs = odds.filter(o => !o.primary);

  return (
    <section className="py-24 px-8 bg-[#f9f9f8]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#4F7C35] mb-4 font-bold">Our Commitments</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#000000] mb-6">Sustainable Development Goals</h2>
          <div className="w-20 h-1 bg-[#4F7C35] mx-auto opacity-20"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="h-full bg-white border border-[#EAE8E3] rounded-[2.5rem] p-10 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div>
                <div className="w-20 h-20 bg-[#F4F9F1] rounded-3xl flex items-center justify-center text-[#4F7C35] mb-10 group-hover:bg-[#4F7C35] group-hover:text-white transition-colors duration-500">
                  {primaryODD.icon}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-bold px-3 py-1 bg-[#4F7C35]/10 text-[#4F7C35] rounded-full uppercase tracking-widest">Primary Goal</span>
                  <span className="text-[10px] font-bold text-[#A69F92]">SDG {primaryODD.id}</span>
                </div>
                <h3 className="text-3xl font-serif text-[#000000] mb-6 leading-tight">{primaryODD.title}</h3>
                <p className="text-[#444444] leading-relaxed opacity-80 text-lg">
                  {primaryODD.description}
                </p>
              </div>
              <div className="mt-12 pt-8 border-t border-[#F0F0EE]">
                <p className="text-[11px] font-bold text-[#A69F92] uppercase tracking-[0.2em]">Core of our circular mission</p>
              </div>
            </div>
          </motion.div>

          {}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryODDs.map((odd, idx) => (
              <motion.div 
                key={odd.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                className="bg-white border border-[#EAE8E3] rounded-[2rem] p-8 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-12 h-12 bg-[#F4F4F2] rounded-2xl flex items-center justify-center text-[#706C61] group-hover:bg-[#000000] group-hover:text-white transition-colors duration-300">
                    {odd.icon}
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#A69F92] uppercase tracking-widest mb-1 block">SDG {odd.id}</span>
                    <h4 className="text-lg font-serif text-[#000000] mb-3">{odd.title}</h4>
                    <p className="text-xs text-[#666666] leading-relaxed opacity-80">
                      {odd.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ODDSection;
