import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroForest from '../../assets/images/IMG-20260421-WA0012.jpg';
import heroBackground from '../../assets/images/IMG-20260420-WA0044.jpg';

const NewHero = () => {
  return (
    <section className="w-full h-[90vh] md:h-[85vh] relative flex mx-auto max-w-[1600px] px-4 md:px-8 pb-4 md:pb-8">
      <div className="w-full h-full flex flex-col md:flex-row relative rounded-sm overflow-hidden shadow-sm">
        
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </motion.div>

        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroForest})` }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[92%] md:w-[90%] max-w-[600px] bg-black/30 backdrop-blur-2xl border border-white/10 rounded-3xl md:rounded-[2rem] p-8 md:p-16 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] z-20"
        >
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-4 md:mb-6 font-semibold text-white/90"
          >
            RECONCILED ARCHITECTURE
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-4 md:mb-6 font-normal drop-shadow-sm"
          >
            From Textile<br />
            Waste to<br />
            Architectural<br />
            <span className="italic font-serif">Design</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-xs md:text-sm font-sans text-white/90 leading-relaxed mb-6 md:mb-8 max-w-sm drop-shadow-sm"
          >
            We close the loop by transforming fashion waste into the next generation of high-end construction materials.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-[#4F7C35] hover:bg-[#4a7a9c] text-white text-[10px] md:text-[11px] font-bold uppercase tracking-widest px-8 md:px-10 py-4 md:py-5 rounded-full transition-all shadow-xl hover:-translate-y-1"
            >
              EXPLORE MATERIALS &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewHero;
