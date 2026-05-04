import React, { useState, useEffect } from 'react';
import { Truck, Package, CheckCircle2, MapPin, Search, Mail, AlertCircle, XCircle } from 'lucide-react';

const AdminDeliveries = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('ISOTEX_admin_token');
      const response = await fetch('/api/admin/orders', {
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
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('ISOTEX_admin_token');
      const response = await fetch(`/api/admin/orders/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const sendEmail = async (order) => {
    if (!order.user_email) {
      alert('User email is missing for this order.');
      return;
    }
    const subject = `Regarding your canceled Isotex order TX-${order.id}`;
    const text = `Hello,\n\nWe noticed that your recent order (TX-${order.id}) was canceled. We are reaching out to ask if there was any problem or if there is anything we can do to help.\n\nCould you please let us know the reason for the cancellation?\n\nThank you,\nThe Isotex Team`;

    try {
      const token = localStorage.getItem('ISOTEX_admin_token');
      const response = await fetch(`/api/admin/orders/${order.id}/contact`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ userEmail: order.user_email, subject, text })
      });
      
      const data = await response.json();
      if (response.ok) {
        alert('Email sent successfully to ' + order.user_email);
      } else {
        alert(`Failed to send email: ${data.error}`);
      }
    } catch (err) {
      console.error('Failed to send email:', err);
      alert('An error occurred while sending the email.');
    }
  };

  const getStatusColor = (s) => {
    switch (s) {
      case 'Delivered': return 'bg-green-50 text-green-700 border-green-100';
      case 'Shipped': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Processing': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Canceled': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  const getStatusLabel = (s) => {
    switch (s) {
      case 'Delivered': return 'Delivered';
      case 'Shipped': return 'Shipped';
      case 'Processing': return 'Processing';
      case 'Canceled': return 'Canceled';
      case 'Pending': return 'Pending';
      default: return s;
    }
  };

  const filteredOrders = orders.filter(o => 
    o.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id.toString().includes(searchTerm)
  );

  const canceledOrders = orders.filter(o => o.status === 'Canceled');

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {canceledOrders.length > 0 && (
        <div className="bg-[#FAF9F6] border border-[#AC875F]/30 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-[#FDF8F3] rounded-2xl flex items-center justify-center text-[#AC875F]">
              <AlertCircle size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-[10px] font-bold text-[#AC875F] uppercase tracking-[0.2em] mb-1">Administrative Notice</h3>
              <p className="text-base font-serif text-[#000000]">{canceledOrders.length} material batch {canceledOrders.length === 1 ? 'order has' : 'orders have'} been canceled.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-[#444444] uppercase tracking-widest border border-[#444444]/20 px-4 py-2 rounded-full">Follow-up Recommended</span>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-bold text-[#AC875F] uppercase tracking-[0.3em] mb-3">Logistic Tracking</p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#000000]">Delivery <span className="italic font-light">Queue</span></h1>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69F92]" />
          <input 
            type="text" 
            placeholder="Search for an order or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#444444]/10 rounded-full pl-11 pr-6 py-3 text-xs outline-none focus:ring-1 focus:ring-[#AC875F] transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#4F7C35] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-[10px] font-bold text-[#A69F92] uppercase tracking-widest">Logistic Synchronization...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] p-20 text-center border border-gray-100">
               <Truck size={48} strokeWidth={1} className="mx-auto text-gray-200 mb-6" />
               <p className="text-sm text-gray-400">No active deliveries matching your search.</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const items = JSON.parse(order.items || '[]');
              const address = JSON.parse(order.shipping_address || '{}');
              
              return (
                <div key={order.id} className={`bg-white rounded-[2.5rem] border p-8 shadow-sm transition-all hover:shadow-md ${order.status === 'Canceled' ? 'border-red-200 bg-red-50/10' : 'border-[#444444]/5'}`}>
                  <div className="flex flex-col lg:flex-row gap-12">
                    
                    <div className="lg:w-64 space-y-6 shrink-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${order.status === 'Canceled' ? 'bg-red-50 text-red-500' : 'bg-[#F9F9F8] text-[#000000]'}`}>
                          {order.status === 'Canceled' ? <XCircle size={20} /> : <Package size={20} />}
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-[#A69F92] uppercase tracking-widest">Order #TX-{order.id.toString().padStart(6, '0')}</p>
                          <p className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter inline-block mt-1 border ${getStatusColor(order.status)}`}>
                            {getStatusLabel(order.status)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-[#444444]/5">
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-[#A69F92] uppercase tracking-widest mb-1">Total Value</p>
                          <p className="text-xl font-serif text-[#000000]">{parseFloat(order.total).toFixed(2)} TND</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-bold text-[#A69F92] uppercase tracking-widest mb-1.5">Customer Identity</p>
                          <div className="flex items-center gap-2 text-[#000000] mb-1 overflow-hidden">
                            <Mail size={12} className="text-[#A69F92] shrink-0" />
                            <span className="text-[11px] font-bold truncate">{order.user_email}</span>
                          </div>
                          {order.status === 'Canceled' && (
                            <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1.5 rounded-lg mt-2">
                              <AlertCircle size={12} />
                              <span className="text-[10px] font-bold uppercase tracking-widest">Cancellation Alert</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-[8px] font-bold text-[#A69F92] uppercase tracking-widest mb-1.5">Destination</p>
                          <div className="flex items-start gap-2 text-[#444444]">
                            <MapPin size={12} className="text-[#A69F92] shrink-0 mt-0.5" />
                            <span className="text-[11px] leading-relaxed">
                              {address.street},<br />
                              {address.postcode} {address.city}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-6">
                      <div className="flex justify-between items-end pb-4 border-b border-[#444444]/5">
                        <p className="text-[9px] font-bold text-[#A69F92] uppercase tracking-widest">Specified Materials</p>
                        <p className="text-sm font-serif text-[#000000]">{items.length} Materials · {parseFloat(order.total).toFixed(2)} TND</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {items.map((item, idx) => {
                          const title = item.product?.title ?? item.title ?? 'Unknown Product';
                          const price = item.product?.price ?? item.price ?? '0';
                          const qty = item.quantity ?? 1;
                          return (
                            <div key={idx} className="flex justify-between items-center bg-[#F9F9F8] px-4 py-2.5 rounded-xl text-[10px]">
                              <span className="text-[#706C61] font-bold">{qty}× <span className="text-[#000000] ml-1">{title}</span></span>
                              <span className="text-[#A69F92]">{price} TND</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap gap-3 pt-4">
                        {order.status === 'Pending' && (
                          <button 
                            onClick={() => updateStatus(order.id, 'Processing')}
                            className="bg-[#1A1F2B] text-white text-[9px] font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-black transition-all"
                          >
                            Start Processing
                          </button>
                        )}
                        {order.status === 'Processing' && (
                          <button 
                            onClick={() => updateStatus(order.id, 'Shipped')}
                            className="bg-[#4F7C35] text-white text-[9px] font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#3D5E2A] transition-all"
                          >
                            Mark as Shipped
                          </button>
                        )}
                        {order.status === 'Shipped' && (
                          <button 
                            onClick={() => updateStatus(order.id, 'Delivered')}
                            className="bg-green-600 text-white text-[9px] font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-green-700 transition-all"
                          >
                            Mark as Delivered
                          </button>
                        )}
                        {order.status === 'Canceled' && (
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              sendEmail(order);
                            }}
                            className="bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-red-700 transition-all flex items-center gap-2"
                          >
                            <Mail size={12} /> Contact customer for follow-up
                          </button>
                        )}
                        <button className="border border-[#444444]/20 text-[#444444] text-[9px] font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#F9F9F8] transition-all">
                          View Order Documents
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDeliveries;
