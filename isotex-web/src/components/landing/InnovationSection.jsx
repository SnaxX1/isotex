import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const InnovationSection = () => {
  return (
    <section className="py-24 px-8 md:px-24 bg-[#EDEDED]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full md:w-1/2"
        >
          <p className="text-xs uppercase tracking-widest text-[#4F7C35] mb-4 font-sans">Our Story</p>
          <h2 className="text-4xl md:text-5xl text-[#000000] leading-tight mb-6">
            Architectural beauty born from <span className="italic text-[#444444]">circular innovation.</span>
          </h2>
          <p className="text-[#444444] mb-8 font-sans leading-relaxed">
            By finding new uses for end-of-life textiles, we create high-performance materials for architectural applications.
            <br /><br />
            Our process transforms waste into valuable resources, reducing the carbon footprint of the construction industry.
          </p>
          <Link to="/about" className="text-sm font-semibold tracking-wide uppercase flex items-center gap-2 hover:text-[#4F7C35] transition-colors">
            READ OUR STORY &rarr;
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="w-full md:w-1/2"
        >
          <div className="rounded-[40px] overflow-hidden shadow-2xl">
            <img 
              src="/images/IMG-20260421-WA0022.jpg"
              alt="Architectural Interior" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InnovationSection;
