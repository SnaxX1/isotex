import React from 'react';
import { RefreshCw, Leaf, Globe, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const ImpactSection = () => {
  return (
    <section className="py-40 px-6 md:px-12 lg:px-24 bg-[#EDEDED] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 xl:gap-40">

        <div className="w-full lg:w-[50%] relative flex justify-center items-center">
          
          <div className="relative w-full max-w-[550px] h-[580px]">

            <motion.div 
              initial={{ rotate: -45, opacity: 0 }}
              whileInView={{ rotate: -12, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[80%] border border-[#444444]/10 rounded-full -rotate-12"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30, y: -30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-0 left-0 w-[260px] aspect-square bg-[#E1EFFF] rounded-[3.5rem] p-10 flex flex-col justify-between shadow-2xl shadow-blue-500/10 z-20"
            >
              <div className="w-10 h-10 flex items-center justify-center text-[#3D5E80]">
                <RefreshCw size={32} strokeWidth={2} />
              </div>
              <div className="space-y-3">
                <h4 className="text-5xl font-serif text-[#161D29]">500t</h4>
                <div className="text-[10px] font-bold tracking-[0.2em] text-[#3D5E80] uppercase leading-relaxed">
                  Waste Diverted<br />From Landfills
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30, y: -30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute top-12 right-0 w-[230px] aspect-square bg-[#E8F5E1] rounded-[3rem] p-10 flex flex-col justify-between shadow-2xl shadow-green-500/10 z-10"
            >
              <div className="w-10 h-10 flex items-center justify-center text-[#4E6347]">
                <Leaf size={32} strokeWidth={2} />
              </div>
              <div className="space-y-3">
                <h4 className="text-4xl font-serif text-[#161D29]">1.2k</h4>
                <div className="text-[10px] font-bold tracking-[0.2em] text-[#4E6347] uppercase leading-relaxed">
                  Tonnes of CO2 Saved<br />Vs Traditional Firing
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-16 left-4 w-[240px] aspect-square bg-[#f5f5f4] rounded-[3rem] p-10 flex flex-col justify-between shadow-2xl shadow-gray-500/10 z-10"
            >
              <div className="w-10 h-10 flex items-center justify-center text-[#333333] " >
                <Globe size={32} strokeWidth={2} />
              </div>
              <div className="space-y-3">
                <h4 className="text-4xl font-serif text-[#161D29]">2M</h4>
                <div className="text-[10px] font-bold tracking-[0.2em] text-[#666666] uppercase leading-relaxed">
                  Litres of Water<br />Preserved in Loop
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-0 right-4 w-[250px] aspect-square bg-[#0D121A] rounded-[4rem] p-12 flex flex-col justify-between shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-20"
            >
              <div className="w-10 h-10 flex items-center justify-center text-white">
                <TrendingDown size={32} strokeWidth={2} />
              </div>
              <div className="space-y-3">
                <h4 className="text-5xl font-serif text-white">-90%</h4>
                <div className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase leading-relaxed">
                  Reduced LCA Impact<br />Cradle-to-Gate
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        <div className="w-full lg:w-[45%] space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#4F7C35] block">Our Commitment</span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#000000] leading-[1.1]">
              Materials that give back to the planet.
            </h2>
            <p className="text-[#444444] text-[16px] leading-relaxed font-sans max-w-lg opacity-80">
              ISOTEX was born from a simple observation: the industry needs cleaner materials, and the fashion industry needs solutions for its waste. By merging the two, we create a material that sequesters carbon and eliminates extraction.
            </p>
          </motion.div>

          <div className="space-y-5 pt-4">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-6 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm group hover:shadow-md transition-all duration-500"
            >
              <div className="w-14 h-14 bg-[#EDEDED] rounded-2xl flex items-center justify-center text-[#4F7C35]">
                <Globe size={24} strokeWidth={1.5} />
              </div>
              <span className="text-[15px] font-bold text-[#000000] font-sans">B-Corp Certified Manufacturing</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-6 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm group hover:shadow-md transition-all duration-500"
            >
              <div className="w-14 h-14 bg-[#EDEDED] rounded-2xl flex items-center justify-center text-[#556955]">
                <RefreshCw size={24} strokeWidth={1.5} />
              </div>
              <span className="text-[15px] font-bold text-[#000000] font-sans">100% Circular Life Cycle</span>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ImpactSection;
