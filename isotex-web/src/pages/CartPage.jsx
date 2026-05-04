import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import { useCart } from '../context/CartContext';
import { Package, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { cartItems, cartTotal, removeFromCart, updateQty, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-sans">
      <Header />

      <main className="flex-grow flex flex-col justify-center">
        {cartItems.length === 0 ? (
          
          <section className="py-24 px-6 flex flex-col items-center justify-center text-center flex-grow">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-[#444444]/20 mb-8 shadow-sm">
              <Package size={24} className="text-[#444444] opacity-70" strokeWidth={1.5} />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif text-[#000000] mb-4">
              Your project batch is empty
            </h1>
            
            <p className="text-sm text-[#444444] font-sans leading-relaxed max-w-md mx-auto mb-10">
              Browse our materials catalogue to find the components needed for your architectural project.
            </p>
            
            <Link 
              to="/shop"
              className="bg-[#1A1F2B] hover:bg-black text-white px-8 py-4 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase transition-all shadow-xl shadow-black/10 active:scale-[0.98]"
            >
              Browse Materials
            </Link>
          </section>
        ) : (
          
          <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
            <div className="mb-12">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#706C61] mb-4 block">
                Review
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-[#000000]">
                Your Project Batch
              </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-16">
              
              <div className="flex-1 flex flex-col gap-8">
                {cartItems.map((item) => {
                  const unitPrice = parseFloat(String(item.product.price).replace(/[^0-9.]/g, ''));
                  const currency = String(item.product.price).replace(/[0-9.,\s]/g, '').trim();
                  
                  return (
                    <div key={item.product.id} className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-[#444444]/10 relative group">
                      <img 
                        src={item.product.image} 
                        alt={item.product.title} 
                        className="w-full sm:w-32 h-32 object-cover rounded-2xl shadow-sm"
                      />
                      
                      <div className="flex flex-col flex-1 justify-center">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-[9px] font-bold tracking-widest uppercase text-[#706C61] mb-1">
                              {item.product.category}
                            </p>
                            <h3 className="text-xl font-serif text-[#000000]">{item.product.title}</h3>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors p-2 sm:opacity-0 sm:group-hover:opacity-100 absolute top-0 right-0 sm:relative"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        <p className="text-[11px] font-bold tracking-widest text-[#444444] mb-4">
                          {item.product.price}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-4 bg-[#F5F5F5] border border-[#444444]/20 rounded-full px-4 py-2">
                            <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="text-[#444444] hover:text-[#000000] transition-colors"><Minus size={14} /></button>
                            <span className="text-xs font-bold text-[#000000] w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="text-[#444444] hover:text-[#000000] transition-colors"><Plus size={14} /></button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-[9px] font-bold tracking-widest uppercase text-[#444444] mb-0.5">Subtotal</p>
                            <span className="text-lg font-serif text-[#000000]">{(unitPrice * item.quantity).toFixed(2)} {currency}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="w-full lg:w-[400px]">
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.04)] border border-gray-50 sticky top-32">
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#444444] mb-6 border-b border-[#444444]/10 pb-4">
                    Order Summary
                  </h3>
                  
                  <div className="flex justify-between items-center mb-4 text-sm font-sans text-[#000000]">
                    <span className="text-gray-500">Subtotal ({cartItems.length} items)</span>
                    <span>{cartTotal.toFixed(2)} TND</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-8 text-sm font-sans text-[#000000]">
                    <span className="text-gray-500">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  
                  <div className="flex justify-between items-end mb-10 pt-6 border-t border-[#444444]/10">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#000000]">Estimated Total</span>
                    <span className="text-3xl font-serif text-[#000000]">{cartTotal.toFixed(2)} TND</span>
                  </div>
                  
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-[#1A1F2B] hover:bg-black active:scale-[0.98] text-white text-[10px] font-bold tracking-widest uppercase rounded-full py-5 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3 mb-4"
                  >
                    Proceed to Checkout <ArrowRight size={14} />
                  </button>
                  
                  <button 
                    onClick={clearCart}
                    className="w-full bg-transparent hover:bg-red-50 text-red-500 text-[10px] font-bold tracking-widest uppercase rounded-full py-4 transition-all cursor-pointer"
                  >
                    Cancel Purchase
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
