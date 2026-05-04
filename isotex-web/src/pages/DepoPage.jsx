import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Truck, MapPin, CheckCircle, ArrowRight, Loader2, Leaf } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/footer';

const DepoPage = () => {
  const [weightKg, setWeightKg] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('Drop-off');
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const pricePerKg = 5;
  const estimatedPayout = weightKg ? (parseFloat(weightKg) * pricePerKg).toFixed(2) : '0.00';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!weightKg || parseFloat(weightKg) <= 0) {
      setError('Please enter a valid weight.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/depos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, weightKg, deliveryMethod })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit request');
      
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow pt-10 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E4EEDF] text-[#4F7C35] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Leaf size={14} /> Circular Economy
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2C3A29] mb-6">
              Recycle & <span className="italic font-serif">Earn</span>
            </h1>
            <p className="text-[#666666] max-w-2xl mx-auto text-lg leading-relaxed">
              Don't throw away your old clothes. Sell them to ISOTEX! We transform your textile waste into high-end, sustainable acoustic and thermal insulation materials.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column: Calculator & Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-[#2C3A29] rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 text-white/5">
                  <Scale size={200} />
                </div>
                
                <h2 className="text-2xl font-serif mb-2 relative z-10">Pricing Calculator</h2>
                <p className="text-white/70 mb-8 relative z-10">We pay {pricePerKg.toFixed(2)} TND per kilogram of textile waste.</p>
                
                <div className="relative z-10 space-y-6">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-white/90 mb-3">Estimated Weight (KG)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        min="1"
                        step="0.5"
                        value={weightKg}
                        onChange={(e) => setWeightKg(e.target.value)}
                        placeholder="e.g. 5"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#4F7C35]"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50 font-bold">kg</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#4F7C35] rounded-xl p-6 flex justify-between items-center">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/80 font-bold mb-1">Estimated Payout</p>
                      <p className="text-3xl font-serif">{estimatedPayout} <span className="text-lg">TND</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-[#EAE5DB] shadow-sm">
                <h3 className="text-lg font-bold text-[#2C3A29] mb-6">How it works</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#E4EEDF] text-[#4F7C35] flex items-center justify-center font-bold shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-[#2C3A29]">Clean & Weigh</h4>
                      <p className="text-sm text-[#666666] mt-1">Ensure clothes are clean. Estimate the weight to calculate your payout.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#E4EEDF] text-[#4F7C35] flex items-center justify-center font-bold shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-[#2C3A29]">Submit Request</h4>
                      <p className="text-sm text-[#666666] mt-1">Fill out the form to register your drop-off or mail-in delivery.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#E4EEDF] text-[#4F7C35] flex items-center justify-center font-bold shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-[#2C3A29]">Get Paid</h4>
                      <p className="text-sm text-[#666666] mt-1">Once we receive and verify the weight, we process your payment immediately.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#EAE5DB] shadow-sm h-full">
                {success ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-20 h-20 bg-[#E4EEDF] rounded-full flex items-center justify-center text-[#4F7C35] mb-6">
                      <CheckCircle size={40} />
                    </div>
                    <h2 className="text-2xl font-serif text-[#2C3A29] mb-4">Request Received!</h2>
                    <p className="text-[#666666] mb-8 max-w-sm">
                      Thank you for contributing to the circular economy. We have sent an email with instructions on how to deliver your clothes.
                    </p>
                    <button 
                      onClick={() => { setSuccess(false); setWeightKg(''); setFormData({ fullName: '', email: '', phone: '' }); }}
                      className="text-[#4F7C35] font-bold uppercase tracking-widest text-sm hover:underline"
                    >
                      Submit Another
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-serif text-[#2C3A29] mb-8">Drop-off Registration</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      <div className="space-y-4">
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#444444]">Delivery Method</label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setDeliveryMethod('Drop-off')}
                            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                              deliveryMethod === 'Drop-off' 
                                ? 'border-[#4F7C35] bg-[#F9FBF8] text-[#4F7C35]' 
                                : 'border-[#EAE5DB] hover:border-[#D1D1D1] text-[#666666]'
                            }`}
                          >
                            <MapPin size={24} />
                            <span className="font-bold text-sm">Drop-off in Person</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliveryMethod('Mail-in')}
                            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                              deliveryMethod === 'Mail-in' 
                                ? 'border-[#4F7C35] bg-[#F9FBF8] text-[#4F7C35]' 
                                : 'border-[#EAE5DB] hover:border-[#D1D1D1] text-[#666666]'
                            }`}
                          >
                            <Truck size={24} />
                            <span className="font-bold text-sm">Mail to Facility</span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-[#EAE5DB]">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#444444] mb-2">Full Name</label>
                          <input 
                            type="text" 
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full bg-[#F5F5F5] border border-transparent rounded-xl px-5 py-3 text-[#2C3A29] focus:outline-none focus:border-[#4F7C35] focus:bg-white transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#444444] mb-2">Email Address</label>
                          <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-[#F5F5F5] border border-transparent rounded-xl px-5 py-3 text-[#2C3A29] focus:outline-none focus:border-[#4F7C35] focus:bg-white transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#444444] mb-2">Phone Number</label>
                          <input 
                            type="tel" 
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-[#F5F5F5] border border-transparent rounded-xl px-5 py-3 text-[#2C3A29] focus:outline-none focus:border-[#4F7C35] focus:bg-white transition-colors"
                          />
                        </div>
                      </div>

                      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                      <button 
                        type="submit" 
                        disabled={loading || !weightKg}
                        className="w-full bg-[#2C3A29] hover:bg-[#1e271c] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-8"
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>Register Request <ArrowRight size={18} /></>
                        )}
                      </button>
                      <p className="text-center text-xs text-[#888888] mt-4">
                        By submitting, you agree to ISOTEX's circular economy terms.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DepoPage;
