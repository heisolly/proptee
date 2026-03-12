"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Globe, LogOut, LayoutDashboard, User, Search, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FullNav from "./Sidebar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useSearch } from "@/context/SearchContext";

export default function Header() {
  const { openSearch } = useSearch();
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, [lastScrollY]);

  const navLinks = [
    { label: "Properties", href: "/properties" },
    { label: "Locations", href: "/locations" },
    { label: "About", href: "/about" },
    { label: "Affiliate", href: "/affiliate" },
    { label: "Blog", href: "/blog" },
  ];

  const getDisplayName = () => {
    if (!user) return "";
    return user.user_metadata?.display_username || user.user_metadata?.full_name || "Member";
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 w-full ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl py-3 border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">

          {/* ── Branding ── */}
          <div className="flex items-center gap-12 lg:gap-16">
            <Link href="/" className="shrink-0 group">
              <div className={`relative transition-all duration-700 ${scrolled ? "w-28 h-7 lg:w-32 lg:h-8" : "w-32 h-8 lg:w-40 lg:h-10"}`}>
                <Image
                  src="/logo.png"
                  alt="Proptee"
                  fill
                  className={`object-contain transition-all duration-700 group-hover:scale-105 ${scrolled ? "" : "brightness-0 invert"}`}
                  priority
                />
              </div>
            </Link>

            {/* Navigation (Desktop) */}
            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative px-4 py-2 text-[14px] font-bold uppercase tracking-[0.15em] transition-all group ${
                    scrolled
                      ? "text-gray-500 hover:text-brand-dark"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-4 right-4 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${scrolled ? "bg-brand-emerald" : "bg-white"}`} />
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Action Suite ── */}
          <div className="flex items-center gap-3 lg:gap-6">

            {/* Premium CTA */}
            <Link
              href="/list-property"
              className={`hidden md:flex items-center gap-2 px-8 py-3 rounded-full text-[13px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${
                scrolled
                  ? "bg-brand-emerald text-white shadow-lg shadow-brand-emerald/20 hover:bg-brand-dark"
                  : "bg-white text-brand-dark hover:bg-brand-emerald hover:text-white shadow-xl shadow-black/10"
              }`}
            >
              <Plus size={16} strokeWidth={3} />
              List Property
            </Link>

            {/* Interaction Group */}
            <div className="flex items-center gap-1 lg:gap-2">
              <button
                onClick={openSearch}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                  scrolled ? "text-gray-400 hover:bg-gray-100 hover:text-brand-dark" : "text-white/60 hover:bg-white/20 hover:text-white"
                }`}
              >
                <Search size={22} strokeWidth={2.5} />
              </button>

              {user ? (
                <div className="relative ml-1 lg:ml-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
                    className={`flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border transition-all ${
                      scrolled
                        ? "border-gray-100 bg-gray-50/50 hover:bg-white text-brand-dark"
                        : "border-white/20 bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-emerald flex items-center justify-center text-white text-[11px] font-black shadow-lg">
                      {getDisplayName().charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[14px] font-bold hidden lg:block tracking-tight">{getDisplayName()}</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 opacity-40 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-3 w-64 bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-50 overflow-hidden z-[110] p-2"
                      >
                        <div className="px-5 py-4 border-b border-gray-50">
                          <p className="text-[15px] font-bold text-brand-dark">{getDisplayName()}</p>
                          <p className="text-[12px] text-gray-400 font-medium truncate mt-0.5">{user.email}</p>
                        </div>
                        <div className="p-1 space-y-1">
                          <Link
                            href="/dashboard/agent"
                            className="flex items-center gap-3 px-4 py-3.5 text-[14px] font-bold text-gray-600 hover:bg-gray-50 hover:text-brand-dark rounded-2xl transition-all"
                          >
                            <LayoutDashboard size={18} className="text-gray-300" />
                            Elite Dashboard
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-4 py-3.5 text-[14px] font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                          >
                            <LogOut size={18} />
                            End Session
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden lg:flex items-center ml-2">
                  <Link
                    href="/login"
                    className={`px-5 py-2.5 rounded-full text-[14px] font-bold uppercase tracking-widest transition-all ${
                      scrolled 
                        ? "text-gray-600 hover:text-brand-dark hover:bg-gray-100" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    Private Access
                  </Link>
                </div>
              )}
            </div>

            {/* Menu Button */}
            <div className="flex items-center gap-2 lg:gap-4">
              <div className={`hidden md:block w-[1px] h-6 ${scrolled ? "bg-gray-100" : "bg-white/10"}`} />
              <button
                onClick={() => setIsNavOpen(true)}
                className={`w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl lg:rounded-2xl transition-all shadow-xl ${
                  scrolled
                    ? "bg-brand-dark text-white hover:bg-brand-emerald"
                    : "bg-brand-emerald text-white hover:bg-white hover:text-brand-dark shadow-brand-emerald/20"
                }`}
              >
                <div className="space-y-1.5 flex flex-col items-center">
                   <div className="w-5 h-[2px] bg-current rounded-full" />
                   <div className="w-5 h-[2px] bg-current rounded-full" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Header Hub (Mobile Mini) */}
      <AnimatePresence>
        {isHidden && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[105] md:hidden"
          >
             <button
               onClick={() => setIsNavOpen(true)}
               className="bg-brand-dark text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-black text-xs uppercase tracking-widest"
             >
                <div className="flex flex-col gap-1">
                   <div className="w-4 h-[1.5px] bg-white" />
                   <div className="w-3 h-[1.5px] bg-white" />
                </div>
                Menu
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      <FullNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}
