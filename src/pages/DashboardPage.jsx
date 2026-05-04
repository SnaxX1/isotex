import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import { useAuth } from '../context/AuthContext';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertCircle,
  ChevronRight,
  User as UserIcon,
  CreditCard,
  MapPin,
  Calendar
} from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('ISOTEX_auth_token');
      const response = await fetch('/api/orders/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [isLoggedIn, navigate]);

  const cancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order? The administrator will be notified to contact you.')) return;
    
    try {
      const token = localStorage.getItem('ISOTEX_auth_token');
      const response = await fetch(`/api/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error('Failed to cancel order:', err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 className="text-green-500" size={18} />;
      case 'Shipped': return <Truck className="text-blue-500" size={18} />;
      case 'Processing': return <Clock className="text-amber-500" size={18} />;
      case 'Canceled': return <XCircle className="text-red-500" size={18} />;
      default: return <AlertCircle className="text-gray-400" size={18} />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'Delivered': return 'Delivered';
      case 'Shipped': return 'Shipped';
      case 'Processing': return 'In Progress';
      case 'Canceled': return 'Canceled';
      case 'Pending': return 'Pending';
      default: return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-50 text-green-700 border-green-100';
      case 'Shipped': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Processing': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Canceled': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F8] flex flex-col font-sans">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 w-full">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          <aside className="w-full lg:w-80 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#EAE8E3]">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-[#4F7C35] rounded-full flex items-center justify-center text-white mb-6">
                  <UserIcon size={40} strokeWidth={1.5} />
                </div>
                <h2 className="text-xl font-serif text-[#000000] mb-1">{user?.username}</h2>
                <p className="text-[10px] font-bold text-[#A69F92] uppercase tracking-widest">ISOTEX Client Profile</p>
                
                <div className="w-full h-[1px] bg-[#EAE8E3] my-8"></div>
                
                <div className="w-full space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-[#A69F92]" />
                    <span className="text-xs text-[#444444]">Member since April 2024</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package size={14} className="text-[#A69F92]" />
                    <span className="text-xs text-[#444444]">{orders.length} Total Orders</span>
                  </div>
                </div>
                
                <button 
                  onClick={logout}
                  className="mt-10 w-full py-3 rounded-full border border-[#444444]/10 text-[10px] font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          </aside>

          <div className="flex-1 w-full space-y-8">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-4xl font-serif text-[#000000]">User <span className="italic font-light">Dashboard</span></h1>
                <p className="text-xs text-[#706C61] mt-2 tracking-wide">Manage your professional material orders and track delivery status.</p>
              </div>
            </div>

            {loading ? (
              <div className="py-20 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-[#4F7C35] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-xs text-[#A69F92] uppercase tracking-widest">Retrieving Secure Data...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-[2.5rem] p-16 text-center border border-[#EAE8E3] shadow-sm">
                <div className="w-16 h-16 bg-[#F9F9F8] rounded-2xl flex items-center justify-center text-[#A69F92] mx-auto mb-6">
                  <Package size={32} strokeWidth={1} />
                </div>
                <h3 className="text-xl font-serif text-[#000000] mb-4">No Material Orders</h3>
                <p className="text-xs text-[#706C61] max-w-xs mx-auto leading-relaxed mb-8">
                  Your batch history will appear here once you've finalized a material specification.
                </p>
                <a href="/shop" className="inline-block bg-[#1A1F2B] text-white text-[10px] font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-black transition-all">
                  Browse Catalogue
                </a>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => {
                  const items = JSON.parse(order.items || '[]');
                  const address = JSON.parse(order.shipping_address || '{}');
                  
                  return (
                    <div key={order.id} className="bg-white rounded-[2rem] overflow-hidden border border-[#EAE8E3] shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                          <div className="flex items-center gap-4">
                            <div className="shrink-0 w-12 h-12 bg-[#F9F9F8] rounded-xl flex items-center justify-center text-[#000000]">
                              <Package size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-[#A69F92] uppercase tracking-widest">Order #TX-{order.id.toString().padStart(6, '0')}</p>
                              <p className="text-xs font-bold text-[#000000] mt-1">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-widest ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              {getStatusLabel(order.status)}
                            </div>
                            {order.status === 'Pending' && (
                              <button 
                                onClick={() => cancelOrder(order.id)}
                                className="text-[9px] font-bold text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors"
                              >
                                Cancel Batch
                              </button>
                            )}
                          </div>
                        </div>

                        {order.status !== 'Canceled' && (
                          <div className="relative mb-10 pt-4 px-2">
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#EAE8E3] -translate-y-1/2"></div>
                            <div className="relative flex justify-between">
                              <div className="flex flex-col items-center">
                                <div className={`w-3 h-3 rounded-full z-10 ${['Pending', 'Processing', 'Shipped', 'Delivered'].includes(order.status) ? 'bg-[#4F7C35]' : 'bg-[#EAE8E3]'}`}></div>
                                <span className="text-[8px] font-bold uppercase tracking-widest mt-3 text-[#4F7C35]">Ordered</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className={`w-3 h-3 rounded-full z-10 ${['Processing', 'Shipped', 'Delivered'].includes(order.status) ? 'bg-[#4F7C35]' : 'bg-[#EAE8E3]'}`}></div>
                                <span className="text-[8px] font-bold uppercase tracking-widest mt-3 text-[#A69F92]">In Progress</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className={`w-3 h-3 rounded-full z-10 ${['Shipped', 'Delivered'].includes(order.status) ? 'bg-[#4F7C35]' : 'bg-[#EAE8E3]'}`}></div>
                                <span className="text-[8px] font-bold uppercase tracking-widest mt-3 text-[#A69F92]">In Transit</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className={`w-3 h-3 rounded-full z-10 ${['Delivered'].includes(order.status) ? 'bg-[#4F7C35]' : 'bg-[#EAE8E3]'}`}></div>
                                <span className="text-[8px] font-bold uppercase tracking-widest mt-3 text-[#A69F92]">Arrived</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div className="md:col-span-2">
                            <p className="text-[9px] font-bold text-[#A69F92] uppercase tracking-widest mb-4">Specified Materials</p>
                            <div className="space-y-3">
                              {items.map((item, idx) => {
                                const title = item.product?.title ?? item.title ?? 'Unknown Product';
                                const price = item.product?.price ?? item.price ?? '0';
                                const qty = item.quantity ?? 1;
                                return (
                                  <div key={idx} className="flex justify-between items-center bg-[#F9F9F8] p-3 rounded-xl">
                                    <div className="flex items-center gap-3">
                                      <span className="text-[10px] font-bold text-[#706C61]">{qty}×</span>
                                      <span className="text-[11px] font-bold text-[#000000]">{title}</span>
                                    </div>
                                    <span className="text-[10px] font-serif text-[#706C61]">{price} TND</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          
                          <div className="space-y-6">
                            <div>
                              <p className="text-[9px] font-bold text-[#A69F92] uppercase tracking-widest mb-3">Shipping Parameters</p>
                              <div className="flex items-start gap-3">
                                <MapPin size={14} className="text-[#A69F92] shrink-0 mt-0.5" />
                                <p className="text-[11px] text-[#444444] leading-relaxed">
                                  {address.street}<br />
                                  {address.postcode} {address.city}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-[9px] font-bold text-[#A69F92] uppercase tracking-widest mb-3">Payment</p>
                              <div className="flex items-center gap-3">
                                <CreditCard size={14} className="text-[#A69F92]" />
                                <span className="text-[11px] font-bold text-[#000000] uppercase tracking-wider">
                                  {order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[#FAF9F6] px-8 py-4 flex items-center justify-between border-t border-[#EAE8E3]">
                        <span className="text-[10px] font-bold text-[#706C61] uppercase tracking-widest">Total Batch Value</span>
                        <span className="text-lg font-serif text-[#000000]">{parseFloat(order.total).toFixed(2)} TND</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
