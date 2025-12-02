import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Menu, 
  X, 
  Package, 
  Grid3X3, 
  Award, 
  FileText, 
  LogOut,
  User,
  Home,
  Anchor
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Grid3X3 },
    { name: 'Brands', href: '/admin/brands', icon: Award },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-neutral-graylight font-sans">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-marine-navy/75 backdrop-blur-sm"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-marine-navy shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-marine-aqua/20">
          <Link to="/" className="flex items-center gap-3">
            <Anchor className="w-8 h-8 text-marine-aqua" />
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold text-white tracking-wide leading-none">
                CORONA MARINE
              </span>
              <span className="font-sans text-xs text-marine-aqua tracking-wider uppercase font-semibold">
                ADMIN PANEL
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-white/70 hover:text-white hover:bg-marine-blue/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-3 mt-1 text-sm font-bold uppercase tracking-wider rounded-lg transition-all border-l-4 ${
                  active
                    ? 'bg-marine-aqua/20 text-marine-aqua border-marine-aqua shadow-lg'
                    : 'text-neutral-graylight border-transparent hover:bg-marine-blue/20 hover:text-white hover:border-marine-aqua/50'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User info and logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-marine-aqua/20 bg-marine-blue/20">
          <div className="flex items-center mb-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-marine-aqua rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-marine-navy" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-bold text-white">
                {user?.name || user?.email || 'Admin User'}
              </p>
              <p className="text-xs text-marine-aqua">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-bold uppercase tracking-wider text-white bg-red-600/80 rounded-lg hover:bg-red-600 transition-all"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-marine-navy/95 backdrop-blur-md shadow-md border-b border-marine-aqua/20">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-white hover:bg-marine-blue/30 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="text-sm font-bold uppercase tracking-wider text-marine-aqua hover:text-white transition-colors"
              >
                ← Back to Website
              </Link>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;