"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe, User, LogOut, LayoutDashboard, Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";
import AuthModal from "./auth/AuthModal";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    };

    checkUser();
    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) setProfile(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setDropdownOpen(false);
  };

  const navItems = [
    { name: 'Collections', href: '#properties' },
    { name: 'About', href: '/about' },
    { name: 'Short Stays', href: '#' },
    { name: 'Insights', href: '/blog' },
    { name: 'Concierge', href: '/contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-xl py-4 border-b border-gray-100 shadow-sm" 
        : "bg-transparent py-8"
    }`}>
      <div className="container mx-auto px-6 lg:px-16 flex justify-between items-center relative z-10 transition-all">
        
        {/* Architectural Logo */}
        <Link href="/" className="flex items-center group shrink-0">
          <div className="relative w-28 md:w-44 h-14 transition-transform duration-700 group-hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="Proptee Logo" 
              fill
              className="object-contain brightness-0"
              priority
            />
          </div>
        </Link>

        {/* Navigation - Spaced & Sophisticated */}
        <nav className="hidden xl:flex items-center gap-4">
          {navItems.map((item, i) => (
            <Link 
              key={i} 
              href={item.href} 
              className="relative group px-6 py-3 text-[11px] font-bold uppercase tracking-[0.4em] text-[#111827]/70 hover:text-[#111827] transition-all overflow-hidden"
            >
              <span className="relative z-10">{item.name}</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#1F7A5C] group-hover:w-full transition-all duration-700"></span>
            </Link>
          ))}
        </nav>

        {/* Right Actions - Focused */}
        <div className="flex items-center gap-6 shrink-0">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4 px-6 py-2.5 rounded-full border border-gray-100 bg-white/80 backdrop-blur-md text-[#111827] transition-all hover:bg-white shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-[#1F7A5C] flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                  {profile?.full_name?.charAt(0) || user.email?.charAt(0)}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] hidden lg:block">Resident Portal</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-6 w-72 bg-white backdrop-blur-3xl rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden py-4 animate-in fade-in slide-in-from-top-6 duration-500">
                  <div className="px-8 py-6 border-b border-gray-50 mb-2">
                    <p className="font-bold text-[#111827] text-base truncate mb-1">{profile?.full_name || 'Valued Resident'}</p>
                    <p className="text-[10px] text-[#6B7280] font-bold uppercase tracking-widest">{profile?.role || 'Member'}</p>
                  </div>
                  
                  <div className="px-4">
                    {profile?.role === 'agent' && (
                      <Link href="/dashboard/agent" className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 rounded-2xl text-[#4B5563] hover:text-[#111827] transition-all group">
                        <LayoutDashboard size={18} className="text-[#1F7A5C]/40 group-hover:text-[#1F7A5C]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Dashboard</span>
                      </Link>
                    )}
                    <Link href="/saved" className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 rounded-2xl text-[#4B5563] hover:text-[#111827] transition-all group">
                      <Heart size={18} className="text-[#1F7A5C]/40 group-hover:text-[#1F7A5C]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Collections</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-4 px-6 py-4 hover:bg-red-50 rounded-2xl text-red-600 transition-all border-t border-gray-50 mt-2"
                    >
                      <LogOut size={18} className="opacity-40" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-left">End Session</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => setAuthModalOpen(true)}
              className="hidden md:flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] px-10 py-4 rounded-full bg-[#1F7A5C] text-white transition-all duration-500 hover:bg-[#14532D] shadow-[0_15px_30px_rgba(31,122,92,0.15)] hover:scale-105 active:scale-95 border border-[#1F7A5C]"
            >
              <User size={14} className="opacity-70" />
              <span>Private Portal</span>
            </button>
          )}

          {/* Mobile Toggle */}
          <button
            className="xl:hidden w-12 h-12 flex items-center justify-center rounded-full text-[#111827] bg-gray-100 hover:bg-gray-200 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-[90] transition-all duration-1000 flex flex-col ${mobileMenuOpen ? "clip-path-open" : "clip-path-closed pointer-events-none"}`}>
        <div className="flex-1 flex flex-col justify-center items-center relative z-10 px-8">
          <div className="flex flex-col items-center gap-8">
            {navItems.map((item, i) => (
              <Link 
                key={i} 
                href={item.href} 
                className="text-[#111827] text-5xl md:text-8xl font-serif italic tracking-tighter hover:text-[#1F7A5C] transition-all relative group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute -left-16 top-1/2 -translate-y-1/2 text-sm font-sans not-italic text-[#111827]/10 group-hover:text-[#1F7A5C]/40 transition-colors uppercase tracking-[0.5em] font-bold">0{i+1}</span>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="h-48 flex flex-col justify-center items-center border-t border-gray-100 relative z-10 bg-gray-50/50 backdrop-blur-md">
          <div className="flex gap-12 items-center mb-8">
            <Link href="/privacy" className="text-[10px] font-bold text-[#111827]/30 uppercase tracking-[0.4em] hover:text-[#1F7A5C] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[10px] font-bold text-[#111827]/30 uppercase tracking-[0.4em] hover:text-[#1F7A5C] transition-colors">Legal</Link>
            <Link href="/contact" className="text-[10px] font-bold text-[#111827]/30 uppercase tracking-[0.4em] hover:text-[#1F7A5C] transition-colors">Concierge</Link>
          </div>
          <p className="text-[9px] font-bold text-[#111827]/10 uppercase tracking-[0.8em]">© 2024 Architectural Excellence</p>
        </div>
      </div>

      <style jsx>{`
        .clip-path-open {
          clip-path: circle(150% at 100% 0);
          opacity: 1;
        }
        .clip-path-closed {
          clip-path: circle(0% at 100% 0);
          opacity: 0;
        }
      `}</style>
    </header>
  );
};

export default Header;
