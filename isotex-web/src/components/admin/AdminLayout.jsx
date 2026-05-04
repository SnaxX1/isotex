import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Layers, 
  BarChart3, 
  Truck,
  ChevronRight,
  Menu,
  X,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import Header from '../Header';
import Footer from '../footer';

const SidebarLink = ({ to, icon: Icon, children, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
      active 
        ? 'bg-white shadow-sm text-[#000000]' 
        : 'text-[#444444] hover:bg-white/50 hover:text-[#000000]'
    }`}
  >
    <Icon size={18} strokeWidth={active ? 2 : 1.5} />
    <span className={`text-[11px] font-bold tracking-wide ${active ? 'opacity-100' : 'opacity-70'}`}>{children}</span>
    {active && <div className="ml-auto w-1 h-1 rounded-full bg-[#AC875F]" />}
  </Link>
);

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/admin/products', icon: Layers, label: 'Material Library' },
    { to: '/admin/projects', icon: Briefcase, label: 'My Projects' },
    { to: '/admin/users', icon: UserIcon, label: 'User Management' },
    { to: '/admin/impact', icon: BarChart3, label: 'Impact Analytics' },
    { to: '/admin/deliveries', icon: Truck, label: 'Deliveries' },
  ];

  return (
    <div className="min-h-screen bg-[#EDEDED] flex flex-col font-sans">
      <Header />

      <div className="flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row gap-12 py-12 md:py-20 animate-in fade-in duration-1000">
        
        {}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="flex items-center gap-4 mb-16 px-2">
            <div className="w-12 h-12 bg-[#4F7C35] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
              AD
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#000000] tracking-tight">Admin</h3>
              <p className="text-[9px] font-bold text-[#444444] tracking-widest uppercase mt-0.5">System Administrator</p>
            </div>
          </div>

          <nav className="space-y-2 mb-12">
            {navItems.map((item) => (
              <SidebarLink 
                key={item.to} 
                to={item.to} 
                icon={item.icon} 
                active={location.pathname === item.to}
              >
                {item.label}
              </SidebarLink>
            ))}
          </nav>

          <div className="pt-8 border-t border-[#AC875F]/10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[#444444] hover:text-red-500 hover:bg-red-50 transition-all duration-200 w-full text-left"
            >
              <LogOut size={18} strokeWidth={1.5} />
              <span className="text-[11px] font-bold tracking-wide opacity-70">Logout</span>
            </button>
          </div>
        </aside>

        {}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLayout;
