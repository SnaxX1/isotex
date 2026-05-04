import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import { Recycle, Ruler, Eye } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#EDEDED] flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">

        <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24">
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

            <div className="w-full lg:w-1/2">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#4F7C35] mb-6 block">Our Story</span>
              <h1 className="text-4xl md:text-6xl font-serif text-[#000000] leading-[1.1] mb-8 max-w-lg">
                Reversing the trend of textile waste.
              </h1>
              <div className="space-y-6 text-sm md:text-base text-[#444444] leading-relaxed max-w-xl font-sans">
                <p>
                  ISOTEX was founded in 2021 with a unique vision: to treat textile waste not as a problem to hide in landfills, but as a high-value resource for the architectural world.
                </p>
                <p>
                  Every year, 92 million tons of clothing end up in landfills. We collect these fibers — cotton, denim, polyester — which possess incredible potential for densification and structural reuse. By applying high-pressure mechanical engineering, we've created a new category of architectural materials.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative">
                <img 
                  src="/images/IMG-20260421-WA0023.jpg"
                  alt="Abstract textile texture" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-8 -right-4 md:right-12 bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-100 z-10 w-48 md:w-56 text-center transform translate-y-4">
                <h3 className="text-4xl font-serif text-[#706C61] mb-1">92M</h3>
                <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-[#444444] leading-tight">
                  TONS OF WASTE ANNUALLY
                </p>
              </div>
            </div>

          </div>
        </section>

        <section className="py-24 bg-[#EDEDED] px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-[#000000] mb-4">Built on Principles</h2>
            <p className="text-xs text-[#444444] font-sans tracking-wide mb-20 max-w-2xl mx-auto">
              Our methodology is anchored in three key pillars that guide every material we develop.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-white p-12 rounded-[2.5rem] flex flex-col items-center group shadow-[0_15px_45px_rgba(0,0,0,0.04)] border border-gray-100/50 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500 transform hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-[#EDEDED] flex items-center justify-center text-[#4F7C35] mb-8 group-hover:bg-[#000000] group-hover:text-white transition-colors duration-500">
                  <Recycle size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-serif text-[#000000] mb-4">Circular by Design</h3>
                <p className="text-xs text-[#444444] leading-relaxed font-sans">
                  We don't just recycle, we design infinitely recyclable materials, ensuring a truly closed-loop system.
                </p>
              </div>

              <div className="bg-white p-12 rounded-[2.5rem] flex flex-col items-center group shadow-[0_15px_45px_rgba(0,0,0,0.04)] border border-gray-100/50 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500 transform hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-[#EDEDED] flex items-center justify-center text-[#4F7C35] mb-8 group-hover:bg-[#000000] group-hover:text-white transition-colors duration-500">
                  <Ruler size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-serif text-[#000000] mb-4">Architectural Performance</h3>
                <p className="text-xs text-[#444444] leading-relaxed font-sans">
                  Sustainability doesn't compromise quality. Our materials meet and exceed fire resistance, acoustics, and thermal performance standards.
                </p>
              </div>

              <div className="bg-white p-12 rounded-[2.5rem] flex flex-col items-center group shadow-[0_15px_45px_rgba(0,0,0,0.04)] border border-gray-100/50 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500 transform hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-[#EDEDED] flex items-center justify-center text-[#4F7C35] mb-8 group-hover:bg-[#000000] group-hover:text-white transition-colors duration-500">
                  <Eye size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-serif text-[#000000] mb-4">Radical Transparency</h3>
                <p className="text-xs text-[#444444] leading-relaxed font-sans">
                  From the origin of textile waste to the energy used in our factory, every metric is measured and verified.
                </p>
              </div>

            </div>
          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
