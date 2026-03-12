"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe, User } from "lucide-react";
import FullNav from "./Sidebar";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Properties", href: "/properties" },
    { label: "Locations", href: "/locations" },
    { label: "About", href: "/about" },
    { label: "Affiliate", href: "/affiliate" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 w-full ${
          scrolled 
            ? "bg-white/80 backdrop-blur-xl py-4 border-b border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]" 
            : "bg-transparent py-8"
        }`}
      >
        <div className="w-full px-8 md:px-12 flex items-center justify-between">

          {/* ── Left: Logo ── */}
          <div className="flex items-center gap-12">
            <Link href="/" className="group relative flex items-center">
              <div className={`relative w-32 h-8 transition-all duration-500 ${scrolled ? "brightness-100 invert-0" : "brightness-0 invert h-10 w-40"}`}>
                <Image src="/logo.png" alt="Proptee" fill className="object-contain" priority />
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
            
            <div className="hidden lg:flex items-center gap-1">
               <button className={`p-2 rounded-full transition-colors ${scrolled ? "text-brand-dark hover:bg-gray-100" : "text-white hover:bg-white/10"}`}>
                 <Globe size={16} strokeWidth={1.5} />
               </button>
               <Link href="/login" className={`flex items-center gap-2 p-2 rounded-full transition-colors ${scrolled ? "text-brand-dark hover:bg-gray-100" : "text-white hover:bg-white/10"}`}>
                 <User size={16} strokeWidth={1.5} />
               </Link>
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
              List Property
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

            {/* Mobile Nav Toggle */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : null}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        <div className={`fixed inset-0 bg-brand-dark z-[110] transition-all duration-700 h-screen ${mobileOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} pointer-events-none lg:hidden`}>
           {/* Mobile contents handled by FullNav for consistency */}
        </div>
      </header>

      <FullNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}
