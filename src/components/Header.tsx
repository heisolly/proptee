"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe, User, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FullNav from "./Sidebar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);
      
      // Hide header when scrolling down past 100px, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
         setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial session check
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, [lastScrollY]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 w-full ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled 
            ? "bg-white/90 backdrop-blur-xl py-4 border-b border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]" 
            : "bg-transparent py-8"
        }`}
      >
        <div className="w-full px-8 md:px-12 flex items-center justify-between">

          {/* ── Left: Logo ── */}
          <div className="flex items-center gap-12">
            <Link href="/" className="group relative flex items-center">
              <div className={`relative transition-all duration-500 ${scrolled ? "w-32 h-8" : "w-40 h-10"}`}>
                <Image 
                  src="/logo.png" 
                  alt="Proptee" 
                  fill 
                  className={`object-contain transition-all duration-500 ${scrolled ? "brightness-100 invert-0" : "brightness-0 invert"}`} 
                  priority 
                />
              </div>
            </Link>

            {/* Navigation Links — Subtle Minimalist */}
            <nav className="hidden xl:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 relative group overflow-hidden ${
                    scrolled ? "text-brand-dark/60 hover:text-brand-emerald" : "text-white/60 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-emerald -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Right: Integrated Actions ── */}
          <div className="flex items-center gap-4 md:gap-8">
            
            <div className="hidden lg:flex items-center gap-6">
               <button className={`p-2 rounded-full transition-colors ${scrolled ? "text-brand-dark hover:bg-gray-100" : "text-white hover:bg-white/10"}`}>
                 <Globe size={16} strokeWidth={1.5} />
               </button>

               {user ? (
                 <div className="relative">
                   <button 
                     onClick={() => setDropdownOpen(!dropdownOpen)}
                     className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all group ${
                       scrolled ? "bg-gray-50 text-brand-dark border border-gray-100" : "bg-white/10 text-white border border-white/10"
                     }`}
                   >
                     <div className="w-6 h-6 rounded-full bg-brand-emerald/10 flex items-center justify-center text-brand-emerald">
                       <User size={12} />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest">{getDisplayName()}</span>
                     <ChevronDown size={12} className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                   </button>

                   <AnimatePresence>
                    {dropdownOpen && (
                      <div className="absolute top-full right-0 mt-4 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 overflow-hidden z-[110]">
                        <button 
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-400 text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                          <LogOut size={14} /> Sign Out
                        </button>
                      </div>
                    )}
                   </AnimatePresence>
                 </div>
               ) : (
                 <div className="flex items-center gap-3">
                   <Link href="/login" className={`text-[10px] font-black uppercase tracking-widest pl-2 pr-1 ${scrolled ? "text-brand-dark/60 hover:text-brand-emerald" : "text-white/60 hover:text-white"}`}>
                     Sign In
                   </Link>
                   <Link href="/signup" className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                     scrolled 
                       ? "border-brand-dark/10 text-brand-dark hover:bg-brand-dark hover:text-white" 
                       : "border-white/20 text-white hover:bg-white hover:text-brand-dark"
                   }`}>
                     Join Us
                   </Link>
                 </div>
               )}
            </div>

            <div className="h-4 w-[1px] bg-gray-200/20 hidden md:block" />

            {/* List Property CTA — Cinematic Shape */}
            <Link
              href="/list-property"
              className={`hidden md:flex items-center gap-3 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-xl ${
                scrolled 
                  ? "bg-brand-emerald text-white shadow-brand-emerald/20 hover:bg-brand-dark" 
                  : "bg-white text-brand-dark hover:bg-brand-emerald hover:text-white"
              }`}
            >
              Enroll Asset
            </Link>

            {/* Geometric Menu Toggle */}
            <button
              onClick={() => setIsNavOpen(true)}
              className={`flex items-center gap-3 pl-4 border-l border-gray-200/20 group transition-all`}
            >
              <div className="hidden sm:block text-right">
                <p className={`text-[9px] font-black tracking-widest uppercase mb-0.5 ${scrolled ? "text-brand-dark" : "text-white"}`}>Navigate</p>
                <div className={`h-[1px] w-full origin-right scale-x-50 group-hover:scale-x-100 transition-transform duration-500 ${scrolled ? "bg-brand-emerald" : "bg-white"}`} />
              </div>
              <div className={`w-12 h-12 flex items-center justify-center rounded-2xl border transition-all duration-500 ${
                scrolled 
                  ? "border-gray-200 text-brand-dark hover:border-brand-emerald hover:text-brand-emerald" 
                  : "border-white/10 text-white hover:border-white"
              }`}>
                <Menu size={20} className="group-hover:rotate-180 transition-transform duration-700" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Menu Button (Appears when Main Header hides) */}
      <div 
        className={`fixed top-6 right-6 md:right-12 z-[105] transition-all duration-500 ${
          isHidden ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setIsNavOpen(true)}
          className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-[20px] text-brand-dark shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_40px_rgba(31,122,92,0.2)] hover:border-brand-emerald hover:text-brand-emerald group transition-all"
        >
          <Menu size={20} className="group-hover:rotate-180 transition-transform duration-700" />
        </button>
      </div>

      <FullNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}
