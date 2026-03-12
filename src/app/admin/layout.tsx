"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  BarChart3, 
  Home, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  LayoutDashboard,
  Building2,
  Newspaper,
  Layers,
  Bell,
  Search,
  UserCircle,
  ShieldCheck,
  Command
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      const cookies = document.cookie.split(";");
      const authCookie = cookies.find(c => c.trim().startsWith("admin_auth="));
      
      if (!authCookie && pathname !== "/admin/login") {
        router.push("/admin/login");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 border-2 border-brand-emerald rounded-xl flex items-center justify-center text-brand-emerald"
        >
          <Command size={24} />
        </motion.div>
      </div>
    );
  }

  const navItems = [
    { name: "Executive Suite", href: "/admin", icon: LayoutDashboard },
    { name: "Asset Portfolio", href: "/admin/properties", icon: Building2 },
    { name: "Advisory Team", href: "/admin/agents", icon: Users },
    { name: "Editorial HQ", href: "/admin/blog", icon: Newspaper },
    { name: "System Taxonomy", href: "/admin/categories", icon: Layers },
    { name: "Control Tower", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex font-sans overflow-hidden">
      {/* ── Cinematic Sidebar ── */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 320 : 100 }}
        className="bg-brand-dark text-white flex flex-col fixed h-full z-50 shadow-[20px_0_80px_rgba(0,0,0,0.1)] border-r border-white/5"
      >
        {/* Sidebar Branding */}
        <div className="h-32 flex items-center px-10 mb-6 relative">
          <AnimatePresence mode="wait">
            {isSidebarOpen ? (
              <motion.div 
                key="logo-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-4"
              >
                <div className="relative w-44 h-12">
                  <Image src="/logo.png" alt="Proptee" fill className="object-contain" />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="logo-collapsed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mx-auto w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10"
              >
                <span className="text-xl font-serif text-brand-emerald">P</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Fabric */}
        <nav className="flex-1 px-6 space-y-3 overflow-y-auto no-scrollbar pt-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-6 px-6 py-5 rounded-[2rem] transition-all duration-500 ${
                  isActive 
                    ? "bg-white/10 text-white shadow-xl shadow-black/20" 
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className={`${isActive ? "text-brand-emerald" : "group-hover:text-brand-emerald"} transition-colors duration-500`}>
                  <item.icon size={22} strokeWidth={isActive ? 2 : 1.5} />
                </div>
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] font-black uppercase tracking-[0.2em]"
                  >
                    {item.name}
                  </motion.span>
                )}
                {isActive && (
                  <motion.div 
                    layoutId="admin-active-nav"
                    className="absolute left-0 w-2 h-12 bg-brand-emerald rounded-r-3xl"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Utility */}
        <div className="p-8 border-t border-white/5 mt-auto">
          <button 
            onClick={handleLogout}
            className="group flex items-center gap-6 px-6 py-5 rounded-[2rem] transition-all w-full text-gray-500 hover:bg-red-500/10 hover:text-red-500"
          >
            <LogOut size={22} strokeWidth={1.5} />
            {isSidebarOpen && (
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit Portal</span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* ── Desktop Orchestrator ── */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-12 left-[300px] z-[60] bg-white text-brand-dark p-4 rounded-3xl shadow-2xl border border-gray-100 hover:scale-110 active:scale-95 transition-all"
        style={{ left: isSidebarOpen ? "300px" : "80px" }}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* ── Operations Canopy ── */}
      <main 
        className={`flex-1 min-h-screen transition-all duration-700 ${
          isSidebarOpen ? "pl-[320px]" : "pl-[100px]"
        }`}
      >
        {/* Header Console */}
        <header className="h-32 bg-white/80 backdrop-blur-2xl border-b border-gray-50 flex items-center justify-between px-16 sticky top-0 z-40">
          <div>
            <h2 className="text-3xl font-serif text-brand-dark tracking-tight capitalize">
              {navItems.find(item => pathname === item.href)?.name || "Operations Center"}
            </h2>
            <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-brand-dark/30 mt-2">
              <ShieldCheck size={12} className="text-brand-emerald" /> Proptee Secure Node • {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden lg:flex items-center bg-gray-50/50 border border-gray-100 rounded-[2rem] px-8 py-4 gap-4 w-80 group focus-within:w-[400px] focus-within:bg-white focus-within:border-brand-emerald/20 transition-all duration-700 shadow-sm focus-within:shadow-xl focus-within:shadow-brand-emerald/5">
                <Search size={18} className="text-gray-300 group-focus-within:text-brand-emerald transition-colors" />
                <input type="text" placeholder="Global system search..." className="bg-transparent text-sm font-medium outline-none text-brand-dark placeholder:text-gray-300 w-full" />
            </div>

            <div className="flex items-center gap-6 pl-10 border-l border-gray-100">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-brand-dark uppercase tracking-[0.2em]">Administrative Elite</span>
                <span className="text-[9px] text-brand-emerald font-black tracking-widest uppercase">Node 0x242424</span>
              </div>
              <div className="relative group cursor-pointer">
                <div className="w-16 h-16 rounded-[1.8rem] bg-brand-dark p-[2px] transition-transform duration-700 group-hover:rotate-12 shadow-xl shadow-brand-dark/10">
                  <div className="w-full h-full rounded-[1.6rem] bg-white p-[2px]">
                    <div className="w-full h-full rounded-[1.4rem] bg-gray-50 flex items-center justify-center text-gray-200">
                       <UserCircle size={48} />
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-4 h-4 bg-brand-emerald rounded-full border-4 border-white shadow-lg animate-pulse" />
              </div>
            </div>
          </div>
        </header>

        {/* Context Canvas */}
        <div className="p-16 max-w-[1600px] mx-auto min-h-[calc(100vh-128px)]">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
