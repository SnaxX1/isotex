import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import { Check, Download, Share2, ArrowRight } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const genRef = () =>
  'TX-' + Math.floor(100000 + Math.random() * 900000);

const OrderValidationPage = () => {
  const location = useLocation();
  const passedOrderId = location.state?.orderId;
  const [reference] = useState(passedOrderId ? `TX-${passedOrderId}` : genRef()); 
  const pdfRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownloadPDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin:       [0.5, 0.5, 0.5, 0.5],
      filename:     `Isotex_Invoice_${reference}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex flex-col font-sans">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10 w-full mt-8 mb-16">
        <div ref={pdfRef} className="bg-white rounded-[2rem] relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] max-w-[580px] w-full text-center border-t-[8px] border-t-[#5A6953] border-x border-b border-x-[#EAE8E3] border-b-[#EAE8E3]">
          
          <div className="pt-14 pb-14 px-8 md:px-14">
            <div className="w-16 h-16 rounded-full bg-[#F6F7F4] flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 rounded-full border-[1.5px] border-[#5A6953] flex items-center justify-center">
                <Check className="text-[#5A6953]" size={16} strokeWidth={2.5} />
              </div>
            </div>

            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#A69F92] mb-4">
              Successful Order Validation
            </p>
            
            <h1 className="text-4xl md:text-[40px] font-serif text-[#2C2B29] mb-6 leading-tight">
              Specification <span className="italic font-light text-[#8A8F86]">Confirmed.</span>
            </h1>
            
            <p className="text-[13px] md:text-[14px] text-[#8C8C8C] font-sans leading-relaxed max-w-[380px] mx-auto mb-10">
              Your project batch has been transmitted to our manufacturing studio. 
              A digital twin specification and carbon impact report have been generated for your project file.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-[460px] mx-auto bg-[#FCFBF8] border border-[#EAE8E3] rounded-full p-2 pl-6 mb-10">
              <div className="flex flex-col items-start justify-center mb-4 sm:mb-0">
                <span className="text-[7px] font-bold tracking-widest uppercase text-[#A69F92] mb-0.5">
                  Batch Reference
                </span>
                <span className="text-sm font-bold font-sans text-[#2C2B29]">
                  {reference}
                </span>
              </div>
              
              <div className="flex items-center gap-2" data-html2canvas-ignore>
                <button onClick={handleDownloadPDF} className="flex items-center gap-2 bg-white border border-[#EAE8E3] rounded-full px-5 py-3 text-[8px] font-bold tracking-widest uppercase text-[#A69F92] hover:text-[#2C2B29] transition-colors shadow-sm">
                  <Download size={12} strokeWidth={2.5} />
                  PDF Invoice
                </button>
                
                <button className="flex items-center gap-2 bg-white border border-[#EAE8E3] rounded-full px-5 py-3 text-[8px] font-bold tracking-widest uppercase text-[#A69F92] hover:text-[#2C2B29] transition-colors shadow-sm">
                  <Share2 size={12} strokeWidth={2.5} />
                  Share
                </button>
              </div>
            </div>

            <div className="flex justify-center mt-2">
              <Link
                to="/shop"
                className="text-[10px] font-bold tracking-widest uppercase text-[#A69F92] hover:text-[#2C2B29] transition-colors border-b border-transparent hover:border-[#2C2B29] pb-1"
              >
                Return to Catalog
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderValidationPage;
