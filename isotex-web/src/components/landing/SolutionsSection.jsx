import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SolutionsSection = () => {
  const solutions = [
    {
      title: 'Interior Decoration',
      desc: 'Elegant solutions for the modern home.',
      img: '/images/IMG-20260421-WA0023.jpg',
      link: '/shop?category=Interior Decoration'
    },
    {
      title: 'Exterior Decoration',
      desc: 'Durable materials for high-traffic areas.',
      img: '/images/IMG-20260420-WA0037.jpg',
      link: '/shop?category=Exterior Decoration'
    },
    {
      title: 'Insulation',
      desc: 'Creating welcoming and sustainable environments.',
      img: '/images/IMG-20260421-WA0028.jpg',
      link: '/shop?category=Insulation'
    }
  ];

  return (
    <section id="solutions" className="py-32 px-8 md:px-24 bg-[#EDEDED]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#4F7C35] mb-6">CATALOGUE</p>
          <h2 className="text-5xl md:text-6xl font-serif text-[#000000] leading-tight max-w-4xl">Solutions for every space.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Link 
                to={item.link}
                className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer shadow-sm hover:shadow-xl transition-shadow block"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.img})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                  <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center mb-4 backdrop-blur-sm">
                    <span className="text-xs">&rarr;</span>
                  </div>
                  <h3 className="text-xl font-serif mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300 font-sans">{item.desc}</p>
                  <div className="mt-4 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    View Applications &rarr;
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
