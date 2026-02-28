'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  BarChart3, 
  Home, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  PlusCircle,
  FolderOpen,
  LayoutDashboard,
  Building2,
  Newspaper,
  Layers,
  Bell,
  Search,
  UserCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie.split(';');
      const authCookie = cookies.find(c => c.trim().startsWith('admin_auth='));
      
      if (!authCookie && pathname !== '/admin/login') {
        router.push('/admin/login');
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    document.cookie = 'admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2]">
        <div className="w-12 h-12 border-4 border-[#0F3D2E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const navItems = [
    { name: 'Insights', href: '/admin', icon: LayoutDashboard },
    { name: 'Properties', href: '/admin/properties', icon: Building2 },
    { name: 'The Team', href: '/admin/agents', icon: Users },
    { name: 'Journal', href: '/admin/blog', icon: Newspaper },
    { name: 'Taxonomy', href: '/admin/categories', icon: Layers },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 88 }}
        className="bg-[#000000] text-white flex flex-col fixed h-full z-50 shadow-[10px_0_40px_rgba(0,0,0,0.05)] border-r border-white/5"
      >
        {/* Sidebar Header */}
        <div className="h-24 flex items-center px-6 mb-4 border-b border-white/5">
          <AnimatePresence mode="wait">
            {isSidebarOpen ? (
              <motion.div 
                key="logo-full"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-3 overflow-hidden"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0F3D2E] to-[#1F7A5C] flex items-center justify-center shrink-0">
                  <Building2 size={20} className="text-white" />
                </div>
                <span className="font-black text-xl tracking-tighter uppercase whitespace-nowrap">
                  Proptee <span className="text-[#1F7A5C]">Admin</span>
                </span>
              </motion.div>
            ) : (
              <motion.div 
                key="logo-collapsed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0F3D2E] to-[#1F7A5C] flex items-center justify-center mx-auto"
              >
                <Building2 size={20} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar pt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#0F3D2E] to-[#1F7A5C] text-white shadow-[0_8px_20px_rgba(15,61,46,0.3)]' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={22} className={`${isActive ? 'text-white' : 'group-hover:text-white'} transition-colors duration-300`} />
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-bold text-sm tracking-wide uppercase"
                  >
                    {item.name}
                  </motion.span>
                )}
                {/* Active Indicator Bar */}
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5 mb-4">
          <button 
            onClick={handleLogout}
            className={`group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all w-full text-gray-500 hover:bg-red-500/10 hover:text-red-500`}
          >
            <LogOut size={22} />
            {isSidebarOpen && (
              <span className="font-bold text-sm tracking-wide uppercase">Logout</span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Toggle Button for Desktop */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-10 left-[260px] z-[60] bg-white text-[#000000] p-3 rounded-2xl shadow-2xl border border-gray-100 hover:scale-110 active:scale-95 transition-all"
        style={{ left: isSidebarOpen ? '255px' : '65px' }}
      >
        {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Main Content Area */}
      <main 
        className={`flex-1 min-h-screen transition-all duration-500 ${
          isSidebarOpen ? 'pl-[280px]' : 'pl-[88px]'
        }`}
      >
        {/* Header */}
        <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex flex-col">
            <h2 className="text-2xl font-black text-[#000000] tracking-tight truncate uppercase">
              {navItems.find(item => pathname === item.href)?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              Admin Portal <span className="w-1 h-1 rounded-full bg-gray-300"></span> 
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          <div className="flex items-center gap-8">
            {/* Search Bar Placeholder */}
            <div className="hidden md:flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 gap-3 w-64 group focus-within:w-80 focus-within:border-[#1F7A5C] transition-all duration-500">
               <Search size={18} className="text-gray-400 group-focus-within:text-[#1F7A5C]" />
               <input type="text" placeholder="Global search..." className="bg-transparent text-sm font-medium outline-none text-[#000000] placeholder:text-gray-400" />
            </div>

            <button className="relative w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-white hover:text-[#1F7A5C] transition-all border border-gray-100 hover:shadow-xl group">
               <Bell size={20} />
               <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-4 pl-8 border-l border-gray-100">
              <div className="flex flex-col items-end">
                <span className="text-sm font-black text-[#000000] uppercase tracking-tighter">Administrator</span>
                <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Proptee Hub</span>
              </div>
              <div className="relative group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0F3D2E] to-[#1F7A5C] p-0.5 shadow-xl group-hover:rotate-6 transition-transform">
                  <div className="w-full h-full rounded-[14px] bg-white p-0.5">
                    <div className="w-full h-full rounded-[12px] bg-gray-100 overflow-hidden flex items-center justify-center">
                       <UserCircle size={40} className="text-gray-300" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-[-2px] right-[-2px] w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="p-10 max-w-7xl mx-auto">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
