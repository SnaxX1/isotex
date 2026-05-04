import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
  User, Building2, Mail, FolderOpen, FileText, AlertCircle, CheckCheck,
  CreditCard, Landmark, FileCheck, ArrowRight, Truck, ChevronLeft
} from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { isLoggedIn } = useAuth();

  const [form, setForm] = useState({
    fullName: '',
    vatNumber: '',
    streetAddress: '',
    postcode: '',
    city: '',
    paymentMethod: '',
    cardNumber: '',
    cardHolder: '',
    cardExpiry: '',
    cardCvv: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const SHIPPING_COST = 150;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (submitted) return;
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/checkout' } });
    } else if (cartItems.length === 0) {
      navigate('/shop');
    }
  }, [isLoggedIn, cartItems.length, navigate, submitted]);

  const PAYMENT_METHODS = [
    { id: 'card',     label: 'Credit Card',           icon: CreditCard  },
    { id: 'transfer', label: 'Bank Transfer',         icon: Landmark    },
    { id: 'cod',      label: 'Cash on Delivery',      icon: Truck       },
  ];

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Contact name is required.';
    if (!form.vatNumber.trim()) newErrors.vatNumber = 'VAT / Tax ID is required.';
    if (!form.streetAddress.trim()) newErrors.streetAddress = 'Address is required.';
    if (!form.postcode.trim()) newErrors.postcode = 'Postcode is required.';
    if (!form.city.trim()) newErrors.city = 'City is required.';
    
    if (!form.paymentMethod) newErrors.paymentMethod = 'Please select a payment method.';
    if (form.paymentMethod === 'card') {
      if (!form.cardNumber.trim() || form.cardNumber.replace(/\s/g,'').length < 16)
        newErrors.cardNumber = 'Enter a valid 16-digit card number.';
      if (!form.cardHolder.trim()) newErrors.cardHolder = 'Cardholder name is required.';
      if (!form.cardExpiry.trim() || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.cardExpiry))
        newErrors.cardExpiry = 'Enter expiry as MM/YY.';
      if (!form.cardCvv.trim() || !/^\d{3,4}$/.test(form.cardCvv))
        newErrors.cardCvv = 'Enter a valid CVV.';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 16);
      const spaced = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
      setForm((prev) => ({ ...prev, cardNumber: spaced }));
    } else if (name === 'cardExpiry') {
      const digits = value.replace(/\D/g, '').slice(0, 4);
      const formatted = digits.length > 2 ? digits.slice(0,2) + '/' + digits.slice(2) : digits;
      setForm((prev) => ({ ...prev, cardExpiry: formatted }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const selectPayment = (id) => {
    setForm((prev) => ({ ...prev, paymentMethod: id, cardNumber: '', cardHolder: '', cardExpiry: '', cardCvv: '' }));
    setErrors((prev) => ({ ...prev, paymentMethod: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);

    const mappedForm = {
      fullName: form.fullName,
      company: form.vatNumber,
      paymentMethod: form.paymentMethod,
      notes: `${form.streetAddress}, ${form.postcode} ${form.city}`
    };

    try {
      const token = localStorage.getItem('ISOTEX_auth_token');
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          total: (cartTotal + SHIPPING_COST).toFixed(2),
          items: cartItems,
          paymentMethod: form.paymentMethod,
          shippingAddress: {
            street: form.streetAddress,
            postcode: form.postcode,
            city: form.city
          }
        })
      });
      const data = await res.json();
      
      navigate('/order-validation', {
        state: { 
          client: mappedForm, 
          items: cartItems, 
          shippingCost: SHIPPING_COST,
          orderId: data.id 
        }
      });
      clearCart();
    } catch (err) {
      console.error('Failed to process order:', err);
    }
  };

  if (cartItems.length === 0) return null;

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 w-full">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          <div className="flex-1 w-full">
            <button 
              onClick={() => navigate('/cart')}
              className="flex items-center gap-2 text-[#444444] text-[9px] font-bold tracking-[0.2em] uppercase hover:text-[#000000] transition-colors mb-8"
            >
              <ChevronLeft size={12} /> Back to Batch
            </button>

            <h1 className="text-4xl md:text-5xl font-serif text-[#000000] leading-tight mb-4">
              Client <span className="italic font-light">Specification</span> Details
            </h1>
            
            <p className="text-xs text-[#444444] font-sans leading-relaxed max-w-sm mb-12">
              Finalize your professional profile and project shipping parameters to generate the production order.
            </p>

            <form onSubmit={handleSubmit} className={`space-y-12 ${submitted ? 'opacity-50 pointer-events-none' : ''}`}>

                <div className="space-y-6">
                  <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#706C61] border-b border-[#444444]/20 pb-3">
                    Organization Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[8px] font-bold tracking-[0.15em] uppercase text-[#444444] mb-2 ml-2">Contact Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Julien Architecture"
                        className={`w-full bg-white border rounded-full px-5 py-3 text-sm text-[#000000] placeholder-gray-300 outline-none transition-all focus:ring-1 focus:ring-[#706C61] ${errors.fullName ? 'border-red-400' : 'border-[#444444]/20'}`}
                      />
                      {errors.fullName && <p className="text-[10px] text-red-500 mt-1 ml-2">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold tracking-[0.15em] uppercase text-[#444444] mb-2 ml-2">VAT / Tax ID</label>
                      <input
                        type="text"
                        name="vatNumber"
                        value={form.vatNumber}
                        onChange={handleChange}
                        placeholder="TN 1234567M"
                        className={`w-full bg-white border rounded-full px-5 py-3 text-sm text-[#000000] placeholder-gray-300 outline-none transition-all focus:ring-1 focus:ring-[#706C61] ${errors.vatNumber ? 'border-red-400' : 'border-[#444444]/20'}`}
                      />
                      {errors.vatNumber && <p className="text-[10px] text-red-500 mt-1 ml-2">{errors.vatNumber}</p>}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#706C61] border-b border-[#444444]/20 pb-3">
                    Ship To
                  </h3>
                  <div>
                    <label className="block text-[8px] font-bold tracking-[0.15em] uppercase text-[#444444] mb-2 ml-2">Address</label>
                    <input
                      type="text"
                      name="streetAddress"
                      value={form.streetAddress}
                      onChange={handleChange}
                      placeholder="12 Avenue Habib Bourguiba"
                      className={`w-full bg-white border rounded-full px-5 py-3 text-sm text-[#000000] placeholder-gray-300 outline-none transition-all focus:ring-1 focus:ring-[#706C61] ${errors.streetAddress ? 'border-red-400' : 'border-[#444444]/20'}`}
                    />
                    {errors.streetAddress && <p className="text-[10px] text-red-500 mt-1 ml-2">{errors.streetAddress}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[8px] font-bold tracking-[0.15em] uppercase text-[#444444] mb-2 ml-2">Postcode</label>
                      <input
                        type="text"
                        name="postcode"
                        value={form.postcode}
                        onChange={handleChange}
                        placeholder="1000"
                        className={`w-full bg-white border rounded-full px-5 py-3 text-sm text-[#000000] placeholder-gray-300 outline-none transition-all focus:ring-1 focus:ring-[#706C61] ${errors.postcode ? 'border-red-400' : 'border-[#444444]/20'}`}
                      />
                      {errors.postcode && <p className="text-[10px] text-red-500 mt-1 ml-2">{errors.postcode}</p>}
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold tracking-[0.15em] uppercase text-[#444444] mb-2 ml-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Tunis"
                        className={`w-full bg-white border rounded-full px-5 py-3 text-sm text-[#000000] placeholder-gray-300 outline-none transition-all focus:ring-1 focus:ring-[#706C61] ${errors.city ? 'border-red-400' : 'border-[#444444]/20'}`}
                      />
                      {errors.city && <p className="text-[10px] text-red-500 mt-1 ml-2">{errors.city}</p>}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#706C61] border-b border-[#444444]/20 pb-3">
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => selectPayment(id)}
                        className={`flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border text-center transition-all ${
                          form.paymentMethod === id
                            ? 'border-[#706C61] bg-[#706C61]/5 text-[#706C61] shadow-sm'
                            : 'border-[#444444]/20 text-[#444444] hover:border-[#706C61]/50 bg-white'
                        }`}
                      >
                        <Icon size={18} />
                        <span className="text-[8px] font-bold tracking-wider uppercase leading-tight">{label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.paymentMethod && <p className="text-[10px] text-red-500 mt-1 ml-2">{errors.paymentMethod}</p>}

                  {form.paymentMethod === 'card' && (
                    <div className="flex flex-col gap-4 bg-white rounded-3xl p-6 border border-[#444444]/10 shadow-sm mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="relative">
                        <CreditCard size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444444]/50" />
                        <input
                          type="text"
                          name="cardNumber"
                          value={form.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className={`w-full bg-[#F5F5F5] border rounded-full pl-11 pr-4 py-3 text-sm text-[#000000] font-mono placeholder:text-gray-300 outline-none transition-all focus:ring-1 focus:ring-[#706C61] ${errors.cardNumber ? 'border-red-400' : 'border-[#444444]/20'}`}
                        />
                        {errors.cardNumber && <p className="text-[10px] text-red-500 mt-1 ml-2">{errors.cardNumber}</p>}
                      </div>

                      <input
                        type="text"
                        name="cardHolder"
                        value={form.cardHolder}
                        onChange={handleChange}
                        placeholder="Cardholder Name"
                        className={`w-full bg-[#F5F5F5] border rounded-full px-5 py-3 text-sm text-[#000000] font-sans placeholder:text-gray-300 outline-none transition-all focus:ring-1 focus:ring-[#706C61] ${errors.cardHolder ? 'border-red-400' : 'border-[#444444]/20'}`}
                      />
                      {errors.cardHolder && <p className="text-[10px] text-red-500 mt-1 ml-2">{errors.cardHolder}</p>}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={form.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            className={`w-full bg-[#F5F5F5] border rounded-full px-5 py-3 text-sm text-[#000000] font-mono placeholder:text-gray-300 outline-none transition-all focus:ring-1 focus:ring-[#706C61] ${errors.cardExpiry ? 'border-red-400' : 'border-[#444444]/20'}`}
                          />
                          {errors.cardExpiry && <p className="text-[10px] text-red-500 mt-1 ml-2">{errors.cardExpiry}</p>}
                        </div>
                        <div>
                          <input
                            type="text"
                            name="cardCvv"
                            value={form.cardCvv}
                            onChange={handleChange}
                            placeholder="CVV"
                            maxLength={4}
                            className={`w-full bg-[#F5F5F5] border rounded-full px-5 py-3 text-sm text-[#000000] font-mono placeholder:text-gray-300 outline-none transition-all focus:ring-1 focus:ring-[#706C61] ${errors.cardCvv ? 'border-red-400' : 'border-[#444444]/20'}`}
                          />
                          {errors.cardCvv && <p className="text-[10px] text-red-500 mt-1 ml-2">{errors.cardCvv}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {form.paymentMethod === 'transfer' && (
                    <div className="bg-white rounded-3xl p-6 border border-[#444444]/10 shadow-sm mt-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex items-center gap-3 border-b border-[#444444]/10 pb-3">
                        <div className="w-8 h-8 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                          <Building2 size={14} className="text-[#444444]" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#706C61]">Isotex Corporate Bank Details</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs font-sans">
                        <span className="text-[#706C61] sm:col-span-1 flex items-center">Bank Name</span>
                        <span className="font-bold text-[#000000] sm:col-span-2">Banque Internationale Arabe de Tunisie (BIAT)</span>
                        
                        <span className="text-[#706C61] sm:col-span-1 flex items-center">IBAN</span>
                        <span className="font-bold text-[#000000] font-mono sm:col-span-2 bg-[#F5F5F5] px-2 py-1 rounded inline-block w-fit tracking-wider">TN59 0800 1234 5678 9012 3456</span>
                        
                        <span className="text-[#706C61] sm:col-span-1 flex items-center">BIC / SWIFT</span>
                        <span className="font-bold text-[#000000] font-mono sm:col-span-2">BIATTNTT</span>
                      </div>
                      
                      <div className="mt-2 bg-[#EEF6FF] rounded-2xl p-4 flex items-start gap-3 border border-[#4F7C35]/10">
                        <AlertCircle size={16} className="text-[#4F7C35] shrink-0 mt-0.5" />
                        <p className="text-[11px] text-[#4F7C35] font-medium leading-relaxed">
                          Your order will be processed once funds have cleared. Please use your Order ID as the payment reference.
                        </p>
                      </div>
                    </div>
                  )}

                  {form.paymentMethod === 'cod' && (
                    <div className="bg-white rounded-3xl p-6 border border-[#444444]/10 shadow-sm mt-4 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="w-12 h-12 rounded-full bg-[#F9F9F9] border border-gray-100 flex items-center justify-center shrink-0">
                        <Truck size={20} className="text-[#000000]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#000000] mb-2 font-serif">Pay upon receipt</p>
                        <p className="text-[11px] text-[#444444] font-sans leading-relaxed">
                          Please have the exact amount of <strong className="text-[#000000]">{(cartTotal + SHIPPING_COST).toFixed(2)} TND</strong> ready upon delivery. Our logistics partner (L&A Logistics) accepts cash or certified bank checks.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#1A1F2B] hover:bg-black active:scale-[0.98] text-white text-[10px] font-bold tracking-[0.15em] uppercase rounded-full px-8 py-5 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2 mt-8"
                >
                  Confirm Order & Verify
                </button>
            </form>
          </div>

          <div className="w-full lg:w-[420px] flex-shrink-0">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.04)] border border-gray-50 sticky top-32">
              <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#444444] mb-8">
                Batch Summary
              </h3>
              
              <div className="space-y-6 mb-8 border-b border-[#444444]/10 pb-8">
                {cartItems.map((item) => {
                  const unitPrice = parseFloat(String(item.product.price).replace(/[^0-9.]/g, ''));
                  return (
                    <div key={item.product.id} className="flex justify-between items-center text-sm font-sans">
                      <div className="flex items-center gap-3">
                        <span className="text-[#444444]">{item.quantity}×</span>
                        <span className="text-[#000000] truncate max-w-[180px]">{item.product.title}</span>
                      </div>
                      <span className="text-[#000000]">{(unitPrice * item.quantity).toFixed(2)} TND</span>
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#FAF9F6] rounded-2xl p-4 flex items-center justify-between mb-8 border border-[#444444]/10">
                <div className="flex items-center gap-3">
                  <Truck size={14} className="text-[#706C61]" />
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#706C61]">L&A Logistics</span>
                </div>
                <span className="text-[11px] font-bold text-[#000000]">+ {SHIPPING_COST.toFixed(2)} TND</span>
              </div>

              <div className="flex items-end justify-between">
                <span className="text-xl font-serif italic text-[#444444]">Quote Total</span>
                <span className="text-2xl font-serif text-[#000000]">{(cartTotal + SHIPPING_COST).toFixed(2)} TND</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
