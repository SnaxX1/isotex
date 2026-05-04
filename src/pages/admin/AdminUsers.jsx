import React, { useState, useEffect } from 'react';
import { User, Trash2, Shield, UserCircle, Search, AlertTriangle } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('ISOTEX_admin_token');
      const response = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        setError(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError('Connection failed. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id, username) => {
    if (username === 'admin') {
      alert('Cannot delete the primary admin account.');
      return;
    }
    if (!window.confirm(`Are you sure you want to delete user "${username}"? This action is irreversible.`)) return;
    
    try {
      const token = localStorage.getItem('ISOTEX_admin_token');
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setUsers(users.filter(u => u.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-bold text-[#AC875F] uppercase tracking-[0.3em] mb-3">System Access</p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#000000]">Registered <span className="italic font-light">Users</span></h1>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69F92]" />
          <input 
            type="text" 
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#444444]/10 rounded-full pl-11 pr-6 py-3 text-xs outline-none focus:ring-1 focus:ring-[#AC875F] transition-all"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-center gap-4 text-red-600">
          <AlertTriangle size={20} />
          <p className="text-sm font-bold uppercase tracking-widest">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-[2.5rem] p-20 text-center border border-[#444444]/5 shadow-sm">
          <div className="animate-spin w-8 h-8 border-2 border-[#AC875F] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-[10px] font-bold text-[#A69F92] uppercase tracking-widest">Indexing identity database...</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-[#444444]/5 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF9F6] border-b border-[#444444]/5">
                  <th className="px-8 py-5 text-[10px] font-bold text-[#A69F92] uppercase tracking-widest">Identity</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-[#A69F92] uppercase tracking-widest">Role</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-[#A69F92] uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-[#A69F92] uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#444444]/5">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="group hover:bg-[#FAF9F6]/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${u.role === 'admin' ? 'bg-[#4F7C35] text-white' : 'bg-[#F9F9F8] text-[#706C61]'}`}>
                          {u.role === 'admin' ? <Shield size={18} /> : <UserCircle size={20} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#000000]">{u.full_name || 'Anonymous'}</p>
                          <p className="text-[10px] text-[#A69F92]">{u.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${u.role === 'admin' ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-500'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span className="text-[10px] font-bold text-[#4F7C35] uppercase tracking-widest">Active</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {u.username !== 'admin' && (
                        <button 
                          onClick={() => deleteUser(u.id, u.username)}
                          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete user"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-xs text-[#A69F92] italic">No users matching your search parameters.</p>
            </div>
          )}
        </div>
      )}

      <div className="bg-[#FEFCE8] border border-yellow-200 rounded-3xl p-6 flex items-start gap-4">
        <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="text-[10px] font-bold text-yellow-800 uppercase tracking-widest mb-1">Security Notice</h4>
          <p className="text-xs text-yellow-700 leading-relaxed">
            Deleting a user account will permanently remove their access to the Isotex platform. Associated orders will remain in the database for financial tracking but will lose their identity link.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
