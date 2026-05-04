import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import { Mail, Phone, Building2, Globe, Send, Loader2, CheckCircle, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.username || '',
    organization: '',
    requestType: 'General Inquiry',
    projectScale: 'Commercial (<500m²)',
    projectBrief: '',
    joinNewsletter: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to send message.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          <div className="w-full lg:flex-1 mt-6">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#4F7C35] mb-6 block">
              Professional Specifiers
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#000000] leading-[1.1] mb-6">
              Request <span className="italic font-light">Specification</span> Details.
            </h1>
            <p className="text-sm text-[#444444] font-sans leading-relaxed mb-14 max-w-md">
              Whether you are specifying for a BREEAM-certified development or looking for a bespoke texture for a high-end interior, our team is ready to help.
            </p>

            <div className="space-y-6">
              
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#FFFFFF] rounded-xl shadow-sm border border-[#444444]/10 flex items-center justify-center flex-shrink-0">
                  <Building2 size={18} className="text-[#706C61]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#000000] mb-1">Studio Tunis</h4>
                  <p className="text-xs text-[#444444]">12 Avenue Habib Bourguiba, 1000 Tunis, TN</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#FFFFFF] rounded-xl shadow-sm border border-[#444444]/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-[#706C61]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#000000] mb-1">Email</h4>
                  <p className="text-xs text-[#444444]">isotexadmin@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#FFFFFF] rounded-xl shadow-sm border border-[#444444]/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-[#706C61]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#000000] mb-1">Direct Line</h4>
                  <p className="text-xs text-[#444444]">+216 71 123 456</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-[#FFFFFF] border border-[#444444]/10 rounded-2xl p-5 flex items-start gap-4 max-w-md">
              <Globe size={18} className="text-[#000000] mt-0.5 flex-shrink-0 opacity-70" />
              <p className="text-xs text-[#444444] leading-relaxed">
                Join over 1,200 architectural firms currently specifying with circular materials.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[480px] xl:w-[540px] flex-shrink-0">
            <div className="bg-[#FFFFFF] rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.04)] border border-gray-50 relative">
              {!isLoggedIn ? (
                <div className="text-center py-12 flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center text-[#706C61] mb-6">
                    <Lock size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-serif text-[#000000] mb-4">Account Required</h3>
                  <p className="text-[#444444] text-sm leading-relaxed mb-8">
                    You must be registered and logged in to submit a specification request to our team.
                  </p>
                  <Link 
                    to="/login"
                    className="bg-[#1A1F2B] text-white px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-black transition-colors mb-4"
                  >
                    Log In to Continue
                  </Link>
                  <p className="text-[10px] text-[#444444] font-sans">
                    Don't have an account? <Link to="/signup" className="text-[#706C61] font-bold hover:underline">Sign up here</Link>
                  </p>
                </div>
              ) : success ? (
                <div className="text-center py-12 flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center text-[#2E7D32] mb-6">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-serif text-[#000000] mb-4">Request Received</h3>
                  <p className="text-[#444444] text-sm leading-relaxed mb-8">
                    Thank you for reaching out. Our team has received your specification request and will be in touch shortly.
                  </p>
                  <button 
                    onClick={() => {
                      setSuccess(false);
                      setFormData({
                        fullName: '', email: user?.username || '', organization: '', requestType: 'General Inquiry', projectScale: 'Commercial (<500m²)', projectBrief: '', joinNewsletter: false
                      });
                    }}
                    className="bg-[#1A1F2B] text-white px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-black transition-colors"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 text-red-500 text-xs py-3 px-4 rounded-xl font-bold text-center">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[8px] font-bold tracking-[0.15em] uppercase text-[#444444] mb-2 ml-1">Full Name</label>
                      <input 
                        type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                        placeholder="Ex. Julian Architects"
                        className="w-full bg-[#F5F5F5] border-none rounded-2xl py-4 px-5 text-sm text-[#000000] placeholder-gray-300 focus:ring-1 focus:ring-[#706C61] outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold tracking-[0.15em] uppercase text-[#444444] mb-2 ml-1">Professional Email</label>
                      <input 
                        type="email" name="email" value={formData.email} onChange={handleChange}
                        placeholder="pro@studio.com"
                        className="w-full bg-[#F5F5F5] border-none rounded-2xl py-4 px-5 text-sm text-[#000000] placeholder-gray-300 focus:ring-1 focus:ring-[#706C61] outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[8px] font-bold tracking-[0.15em] uppercase text-[#444444] mb-2 ml-1">Organization / Firm</label>
                    <input 
                      type="text" name="organization" value={formData.organization} onChange={handleChange}
                      placeholder="Studio Name"
                      className="w-full bg-[#F5F5F5] border-none rounded-2xl py-4 px-5 text-sm text-[#000000] placeholder-gray-300 focus:ring-1 focus:ring-[#706C61] outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[8px] font-bold tracking-[0.15em] uppercase text-[#444444] mb-2 ml-1">Request Type</label>
                      <div className="relative">
                        <select name="requestType" value={formData.requestType} onChange={handleChange} className="w-full bg-[#F5F5F5] border-none rounded-2xl py-4 px-5 text-sm text-[#000000] focus:ring-1 focus:ring-[#706C61] outline-none transition-all appearance-none cursor-pointer">
                          <option>General Inquiry</option>
                          <option>Project Specification</option>
                          <option>Sample Request</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold tracking-[0.15em] uppercase text-[#444444] mb-2 ml-1">Est. Project Scale</label>
                      <div className="relative">
                        <select name="projectScale" value={formData.projectScale} onChange={handleChange} className="w-full bg-[#F5F5F5] border-none rounded-2xl py-4 px-5 text-sm text-[#000000] focus:ring-1 focus:ring-[#706C61] outline-none transition-all appearance-none cursor-pointer">
                          <option>Commercial (&lt;500m²)</option>
                          <option>Commercial (&gt;500m²)</option>
                          <option>Residential</option>
                          <option>Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[8px] font-bold tracking-[0.15em] uppercase text-[#444444] mb-2 ml-1">Project Brief</label>
                    <textarea 
                      name="projectBrief" value={formData.projectBrief} onChange={handleChange}
                      rows="4"
                      placeholder="Describe your design intentions..."
                      className="w-full bg-[#F5F5F5] border-none rounded-2xl py-4 px-5 text-sm text-[#000000] placeholder-gray-300 focus:ring-1 focus:ring-[#706C61] outline-none transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-3 mt-2">
                    <input name="joinNewsletter" checked={formData.joinNewsletter} onChange={handleChange} type="checkbox" className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 text-[#706C61] focus:ring-[#706C61] transition-all cursor-pointer" />
                    <label className="text-[10px] text-[#444444] leading-relaxed cursor-pointer">
                      Join the <span className="font-bold text-[#706C61]">Circular Specification List</span> for exclusive material releases.
                    </label>
                  </div>

                  <button 
                    type="submit" disabled={loading}
                    className="w-full bg-[#1A1F2B] hover:bg-black disabled:opacity-50 text-white py-5 mt-4 rounded-2xl text-[10px] font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-xl shadow-black/10"
                  >
                    {loading ? (
                      <><Loader2 size={14} className="animate-spin" /> Sending Request...</>
                    ) : (
                      <>Send Specification Request <Send size={14} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
