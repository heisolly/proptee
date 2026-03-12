"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  Building2, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  LayoutDashboard,
  Layers,
  Bell,
  Search,
  UserCircle,
  ShieldCheck,
  ChevronRight,
  Plus
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
        <div className="w-10 h-10 border-4 border-brand-emerald/20 border-t-brand-emerald rounded-full animate-spin" />
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Properties", href: "/admin/properties", icon: Building2 },
    { name: "Agents", href: "/admin/agents", icon: Users },
    { name: "Categories", href: "/admin/categories", icon: Layers },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex font-sans">
      {/* ── Standard Sidebar ── */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20"
        } lg:static lg:block hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-dark rounded-lg flex items-center justify-center text-white shrink-0">
                <Building2 size={18} />
              </div>
              {isSidebarOpen && (
                <span className="font-serif text-lg font-bold tracking-tight text-brand-dark">Proptee <span className="text-brand-emerald">Admin</span></span>
              )}
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "bg-brand-emerald/10 text-brand-emerald font-semibold" 
                      : "text-gray-500 hover:text-brand-dark hover:bg-gray-50"
                  }`}
                >
                  <item.icon size={20} className={isActive ? "text-brand-emerald" : "text-gray-400"} />
                  {isSidebarOpen && <span className="text-sm">{item.name}</span>}
                  {isActive && isSidebarOpen && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-emerald" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Section / Bottom Utility */}
          <div className="p-4 border-t border-gray-100 space-y-2">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all w-full text-left"
            >
              <LogOut size={20} className="text-gray-400" />
              {isSidebarOpen && <span className="text-sm font-medium">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header Console */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40 lg:px-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
            >
              <Menu size={20} />
            </button>
            
            {/* Breadcrumbs / Page Title */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="hover:text-brand-dark cursor-pointer transition-colors">Admin</span>
              <ChevronRight size={14} className="text-gray-300" />
              <span className="text-brand-dark font-semibold capitalize">
                {navItems.find(item => pathname === item.href)?.name || "Dashboard"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <div className="hidden md:flex items-center bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 gap-2 w-64 focus-within:w-80 transition-all duration-300">
                <Search size={16} className="text-gray-400" />
                <input type="text" placeholder="Search system..." className="bg-transparent text-xs outline-none text-gray-700 w-full" />
            </div>

            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-all">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            <div className="h-8 w-px bg-gray-200 hidden sm:block" />

            <div className="flex items-center gap-3 pl-2">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[11px] font-bold text-gray-900 leading-none">Admin User</span>
                <span className="text-[10px] text-brand-emerald font-semibold uppercase tracking-tight">Super Admin</span>
              </div>
              <div className="w-9 h-9 bg-brand-emerald rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm ring-2 ring-white ring-offset-1 border border-brand-emerald">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <main className="flex-1 p-6 lg:p-10">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>

        {/* Footer info */}
        <footer className="px-6 py-4 border-t border-gray-200 bg-white text-[11px] text-gray-400 flex justify-between items-center">
          <p>© 2026 Proptee Real Estate • Administrative Portal v2.5</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-brand-dark transition-colors">Support</Link>
            <Link href="#" className="hover:text-brand-dark transition-colors">Privacy Policy</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
