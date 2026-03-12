"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Building2, SlidersHorizontal, ArrowRight, Home, Landmark, Building, Trees, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useSearch } from "@/context/SearchContext";

/* ─── Data ────────────────── */

const purposes = [
  { value: "buy", label: "Buy", desc: "Purchase a property" },
  { value: "rent", label: "Rent", desc: "Monthly/yearly rental" },
  { value: "shortlet", label: "Shortlet", desc: "Short-term stay" },
];

const locations = [
  { value: "lekki", label: "Lekki", sub: "Lagos", popular: true },
  { value: "ikoyi", label: "Ikoyi", sub: "Lagos", popular: true },
  { value: "vi", label: "Victoria Island", sub: "Lagos", popular: true },
  { value: "banana", label: "Banana Island", sub: "Lagos", popular: true },
  { value: "abuja", label: "Abuja", sub: "FCT", popular: true },
  { value: "ibadan", label: "Ibadan", sub: "Oyo", popular: true },
  { value: "portharcourt", label: "Port Harcourt", sub: "Rivers", popular: true },
];

const types = [
  { value: "house", label: "House", Icon: Home },
  { value: "apartment", label: "Apartment", Icon: Building },
  { value: "villa", label: "Villa", Icon: Landmark },
  { value: "penthouse", label: "Penthouse", Icon: Building2 },
  { value: "land", label: "Land", Icon: Trees },
];

export default function HeroCinematic() {
  const { openSearch, searchData, setSearchData } = useSearch();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for background
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.15]);

  const purposeLabel = purposes.find(p => p.value === searchData.purpose)?.label || "Buy";
  const locationLabel = locations.find(l => l.value === searchData.location)?.label || "Location";
  const typeLabel = types.find(t => t.value === searchData.type)?.label || "Home";

  return (
    <section ref={containerRef} className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Cinematic Background with Parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <Image 
          src="/luxury_lagos_dusk_hero_1773269189794.png"
          alt="Luxury Real Estate"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-brand-dark" />
        
        {/* Subtle Lens Flare Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(10,92,70,0.15)_0%,transparent_50%)] pointer-events-none" />
      </motion.div>

      <div className="w-full px-6 md:px-8 lg:max-w-[1440px] lg:mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* ── Headline Section ── */}
          <div className="text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="flex flex-col items-center">
                 <span className="text-4xl md:text-6xl lg:text-7xl text-white font-serif tracking-tight drop-shadow-2xl">
                    Find Your
                 </span>
                 <span className="text-7xl md:text-8xl lg:text-[7rem] text-brand-emerald font-handwriting mt-2 md:-mt-4 relative inline-block drop-shadow-2xl">
                    Dream Home
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: "100%" }}
                       transition={{ delay: 0.8, duration: 1 }}
                       className="absolute -bottom-2 left-0 h-1 bg-brand-emerald/30 rounded-full"
                    />
                 </span>
                 <span className="text-4xl md:text-6xl lg:text-7xl text-white font-serif tracking-tight mt-2 drop-shadow-2xl">
                    With Ease
                 </span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-white/60 text-base md:text-lg lg:text-xl mt-10 md:mt-12 leading-relaxed font-medium max-w-2xl mx-auto px-4"
            >
              Experience the gold standard of real estate. We curate exclusive 
              inventory and provide elite advisory for your most significant assets.
            </motion.p>
          </div>

          {/* ── Search Console (Responsive) ── */}
          <div className="w-full max-w-5xl mx-auto relative px-4">
            
            {/* MOBILE ONLY: Vertical Card (Slimmer) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-white/95 backdrop-blur-2xl rounded-[3rem] p-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border border-white/20 max-w-[320px] mx-auto"
            >
              <div className="flex flex-col gap-0.5">
                <div className="bg-gray-50/50 rounded-[2.5rem] overflow-hidden p-1 space-y-0.5">
                  <button onClick={openSearch} className="w-full group flex items-center justify-between px-6 py-3.5 hover:bg-white rounded-2xl transition-all text-left">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center bg-white group-hover:border-brand-emerald/30 transition-all">
                        <SlidersHorizontal size={16} className="text-brand-emerald stroke-[1.5]" />
                      </div>
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-300 mb-0.5">I want to</p>
                        <p className="text-base font-bold text-brand-dark tracking-tight">{purposeLabel}</p>
                      </div>
                    </div>
                  </button>
                  <div className="h-[1px] bg-gray-100/50 mx-6 opacity-50" />
                  <button onClick={openSearch} className="w-full group flex items-center justify-between px-6 py-3.5 hover:bg-white rounded-2xl transition-all text-left">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center bg-white group-hover:border-brand-emerald/30 transition-all">
                        <MapPin size={16} className="text-brand-emerald stroke-[1.5]" />
                      </div>
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-300 mb-0.5">In</p>
                        <p className="text-base font-bold text-brand-dark tracking-tight">{locationLabel}</p>
                      </div>
                    </div>
                  </button>
                  <div className="h-[1px] bg-gray-100/50 mx-6 opacity-50" />
                  <button onClick={openSearch} className="w-full group flex items-center justify-between px-6 py-3.5 hover:bg-white rounded-2xl transition-all text-left">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center bg-white group-hover:border-brand-emerald/30 transition-all">
                        <Building size={16} className="text-brand-emerald stroke-[1.5]" />
                      </div>
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-300 mb-0.5">Property</p>
                        <p className="text-base font-bold text-brand-dark tracking-tight">{typeLabel}</p>
                      </div>
                    </div>
                  </button>
                </div>
                <div className="pt-2 px-1 pb-1">
                  <button onClick={openSearch} className="w-full bg-[#0A5C46] text-white flex items-center justify-center gap-3 py-4 rounded-[2rem] font-bold text-base active:scale-[0.98]">
                    <Search size={18} className="stroke-[3]" />
                    <span>Search Listings</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* PC ONLY: Horizontal Bar (Modern & Straight) */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.9, y: 30 }}
              animate={{ opacity: 1, scaleX: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex items-center bg-white/95 backdrop-blur-3xl rounded-full p-2 pl-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] border border-white/20 w-full"
            >
              {/* Field 1: Purpose */}
              <button 
                onClick={openSearch}
                className="flex-[1] group flex items-center gap-5 px-6 py-4 hover:bg-gray-50/80 rounded-full transition-all text-left border-r border-gray-100/80"
              >
                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center bg-white group-hover:border-brand-emerald/30 group-hover:scale-110 transition-all shadow-sm">
                  <SlidersHorizontal size={18} className="text-brand-emerald stroke-[1.5]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-0.5 group-hover:text-brand-emerald transition-colors">I want to</p>
                  <p className="text-lg font-bold text-brand-dark tracking-tight truncate">{purposeLabel}</p>
                </div>
              </button>

              {/* Field 2: Location */}
              <button 
                onClick={openSearch}
                className="flex-[1.2] group flex items-center gap-5 px-8 py-4 hover:bg-gray-50/80 rounded-full transition-all text-left border-r border-gray-100/80"
              >
                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center bg-white group-hover:border-brand-emerald/30 group-hover:scale-110 transition-all shadow-sm">
                  <MapPin size={18} className="text-brand-emerald stroke-[1.5]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-0.5 group-hover:text-brand-emerald transition-colors">Location</p>
                  <p className="text-lg font-bold text-brand-dark tracking-tight truncate">{locationLabel}</p>
                </div>
              </button>

              {/* Field 3: Property Type */}
              <button 
                onClick={openSearch}
                className="flex-[1] group flex items-center gap-5 px-8 py-4 hover:bg-gray-50/80 rounded-full transition-all text-left"
              >
                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center bg-white group-hover:border-brand-emerald/30 group-hover:scale-110 transition-all shadow-sm">
                  <Building size={18} className="text-brand-emerald stroke-[1.5]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-0.5 group-hover:text-brand-emerald transition-colors">Style</p>
                  <p className="text-lg font-bold text-brand-dark tracking-tight truncate">{typeLabel}</p>
                </div>
              </button>

              {/* Search Button */}
              <button
                onClick={openSearch}
                className="bg-[#0A5C46] text-white flex items-center justify-center gap-4 px-12 py-5 rounded-full font-bold text-lg active:scale-[0.96] hover:bg-[#084a39] hover:shadow-[0_15px_30px_-5px_rgba(10,92,70,0.4)] transition-all relative overflow-hidden group/btn ml-4"
              >
                <motion.div 
                   className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:animate-shimmer"
                />
                <Search size={22} className="stroke-[3] group-hover/btn:scale-110 transition-transform" />
                <span className="whitespace-nowrap">Explore Inventory</span>
              </button>
            </motion.div>

          </div>

          {/* ── Visual Accents (PC Only) ── */}
          <div className="hidden lg:block">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute -left-32 top-1/2 -translate-y-1/2 space-y-24"
            >
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl"
               >
                 <p className="text-brand-emerald text-sm font-bold">₦1.5B+</p>
                 <p className="text-white/30 text-[9px] font-black uppercase tracking-widest">Premium Average</p>
               </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="absolute -right-32 top-2/3 -translate-y-1/2"
            >
               <motion.div 
                 animate={{ y: [0, 10, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-4"
               >
                 <div className="w-8 h-8 rounded-full bg-brand-emerald/20 flex items-center justify-center">
                    <TrendingUp size={16} className="text-brand-emerald" />
                 </div>
                 <div>
                    <p className="text-white font-bold text-sm">Top 1%</p>
                    <p className="text-white/30 text-[9px] font-black uppercase tracking-widest">Market Access</p>
                 </div>
               </motion.div>
            </motion.div>
          </div>

          {/* ── Trusted Partners ── */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-20 flex flex-col items-center gap-6"
          >
             <div className="flex -space-x-3 items-center">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-brand-dark bg-gray-200 overflow-hidden shadow-2xl transition-transform hover:scale-110 hover:z-10 cursor-pointer">
                    <img src={`https://i.pravatar.cc/100?u=${i+25}`} alt="Client" />
                  </div>
                ))}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-emerald flex items-center justify-center text-white text-[10px] border-2 border-brand-dark font-black tracking-tighter">
                   +500
                </div>
             </div>
             <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5rem] text-center">
                Curating excellence since 2010.
             </p>
          </motion.div>
        </div>
      </div>

    </section>
  );
}

// Missing icon fix
const TrendingUp = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);
