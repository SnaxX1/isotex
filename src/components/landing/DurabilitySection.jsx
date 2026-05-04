import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { motion } from 'framer-motion';

const DurabilitySection = () => {
  return (
    <section className="py-24 px-8 md:px-24 bg-[#000000] text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16"
        >
          <div>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#7A98B6] mb-4 font-sans">SIGNATURE SERIES</p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#FFFFFF]">Engineered for durability.</h2>
          </div>
          <Link to="/shop" className="text-[11px] font-bold tracking-widest uppercase flex items-center gap-2 hover:opacity-70 transition-opacity mt-6 md:mt-0 pb-1 border-b border-[#FFFFFF] text-[#FFFFFF]">
            VIEW ALL MATERIALS
          </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {PRODUCTS.slice(0, 4).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              <Link to={`/product/${item.id}`} className="group cursor-pointer block">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4] mb-6 shadow-lg">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-serif text-[15px] text-[#FFFFFF]">{item.title}</h3>
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400">{item.tag}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DurabilitySection;
