"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Building2, SlidersHorizontal, ArrowRight, Home, Landmark, Building, Trees } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "@/context/SearchContext";

/* ─── Data (Keep for desktop dropdowns) ────────────────── */

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

const budgets = [
  { value: "0-50m", label: "Under ₦50M" },
  { value: "50m-100m", label: "₦50M – ₦100M" },
  { value: "100m-250m", label: "₦100M – ₦250M" },
  { value: "250m-500m", label: "₦250M – ₦500M" },
  { value: "500m+", label: "₦500M+" },
];

export default function HeroCinematic() {
  const { openSearch, searchData, setSearchData } = useSearch();
  const [desktopDropdown, setDesktopDropdown] = useState<"purpose" | "location" | "type" | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDesktopDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const purposeLabel = purposes.find(p => p.value === searchData.purpose)?.label || "Purpose";
  const locationLabel = locations.find(l => l.value === searchData.location)?.label || "Location";
  const typeLabel = types.find(t => t.value === searchData.type)?.label || "Type";

  return (
    <section className="relative min-h-[100svh] flex items-end pb-24 md:items-center md:pb-0 pt-0 md:pt-20 overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          poster="/hero_background.jpg"
          className="w-full h-full object-cover brightness-50"
        >
          {/* If you have a cinematic video, add it here. For now, we'll use an image fallback or a stylized background */}
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark/90" />
      </div>

      <div className="w-full px-6 md:px-8 lg:max-w-[1440px] lg:mx-auto relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="inline-block text-brand-emerald text-xs font-black uppercase tracking-[0.4em] mb-6">
              Elite Real Estate Advisory
            </span>
            <h1 className="text-[2.75rem] leading-[1.05] md:text-7xl lg:text-9xl text-white mb-8 tracking-tighter font-bold">
              Find Your <br />
              <span className="text-brand-emerald italic font-light">Extraordinary</span> <br />
              Masterpiece.
            </h1>
            
            <p className="text-white/60 text-lg md:text-xl mb-12 leading-relaxed font-sans max-w-xl">
              Curating the most prestigious addresses in Africa's prime jurisdictions for the discerning few.
            </p>
          </motion.div>

          {/* ═══════════════════════════════════════════════
              MOBILE — Compact Search Trigger
              ═══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:hidden"
          >
            <button
              onClick={openSearch}
              className="w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] flex items-center gap-4 px-6 py-4 shadow-2xl active:scale-95 transition-all text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-emerald flex items-center justify-center shrink-0 shadow-lg shadow-brand-emerald/20">
                <Search size={22} className="text-white" strokeWidth={3} />
              </div>
              <div className="flex-1 min-w-0">
                 <p className="text-[14px] font-black text-white leading-tight uppercase tracking-widest">Where to?</p>
                 <p className="text-[12px] text-white/40 leading-tight mt-1 truncate">
                    {locationLabel} · {typeLabel} · {searchData.purpose}
                 </p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                <SlidersHorizontal size={16} className="text-white/40" />
              </div>
            </button>
          </motion.div>

          {/* ═══════════════════════════════════════════════
              DESKTOP — Editorial Search Design
              ═══════════════════════════════════════════════ */}
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block"
          >
            <div className="bg-white/10 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] flex items-stretch p-2 shadow-2xl relative">
              {/* Purpose */}
              <div className="relative flex-1">
                <button
                  onClick={() => setDesktopDropdown(desktopDropdown === "purpose" ? null : "purpose")}
                  className="w-full flex flex-col justify-center px-10 py-6 hover:bg-white/5 rounded-[2rem] transition-colors text-left group"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-brand-emerald transition-colors">Purpose</span>
                  <span className={`text-base font-bold mt-1 ${searchData.purpose ? "text-white" : "text-white/40"}`}>{purposeLabel}</span>
                </button>
                <AnimatePresence>
                  {desktopDropdown === "purpose" && (
                     <motion.div
                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
                       className="absolute top-full left-0 mt-4 w-72 bg-brand-dark border border-white/10 rounded-[2rem] shadow-2xl p-3 z-50 overflow-hidden"
                     >
                       {purposes.map((p) => (
                         <button
                           key={p.value}
                           onClick={() => { setSearchData({ purpose: p.value }); setDesktopDropdown(null); }}
                           className={`w-full text-left px-6 py-4 rounded-2xl transition-all ${
                             searchData.purpose === p.value ? "bg-brand-emerald text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                           }`}
                         >
                           <p className="text-base font-bold">{p.label}</p>
                           <p className={`text-xs mt-0.5 ${searchData.purpose === p.value ? "text-white/70" : "text-white/30"}`}>{p.desc}</p>
                         </button>
                       ))}
                     </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-px bg-white/10 my-6" />

               {/* Location */}
               <div className="relative flex-1">
                <button
                  onClick={() => setDesktopDropdown(desktopDropdown === "location" ? null : "location")}
                  className="w-full flex flex-col justify-center px-10 py-6 hover:bg-white/5 rounded-[2rem] transition-colors text-left group"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-brand-emerald transition-colors">Location</span>
                  <span className={`text-base font-bold mt-1 ${searchData.location ? "text-white" : "text-white/40"}`}>{locationLabel}</span>
                </button>
                <AnimatePresence>
                  {desktopDropdown === "location" && (
                     <motion.div
                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
                       className="absolute top-full left-0 mt-4 w-80 bg-brand-dark border border-white/10 rounded-[2rem] shadow-2xl p-3 z-50 max-h-[400px] overflow-y-auto scrollbar-hide"
                     >
                       {locations.map((loc) => (
                         <button
                           key={loc.value}
                           onClick={() => { setSearchData({ location: loc.value }); setDesktopDropdown(null); }}
                           className={`w-full text-left px-6 py-4 rounded-2xl transition-all flex items-center justify-between group/item ${
                             searchData.location === loc.value ? "bg-brand-emerald text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                           }`}
                         >
                           <div>
                              <p className="text-base font-bold">{loc.label}</p>
                              <p className={`text-xs mt-0.5 ${searchData.location === loc.value ? "text-white/70" : "text-white/30"}`}>{loc.sub}</p>
                           </div>
                           {loc.popular && (
                             <span className="text-[9px] font-black uppercase tracking-widest text-brand-emerald/40 bg-brand-emerald/10 px-2 py-1 rounded-full group-hover/item:bg-white/10 group-hover/item:text-white/50">Popular</span>
                           )}
                         </button>
                       ))}
                     </motion.div>
                  )}
                </AnimatePresence>
              </div>

               <div className="w-px bg-white/10 my-6" />

               {/* Type */}
               <div className="relative flex-1">
                <button
                  onClick={() => setDesktopDropdown(desktopDropdown === "type" ? null : "type")}
                  className="w-full flex flex-col justify-center px-10 py-6 hover:bg-white/5 rounded-[2rem] transition-colors text-left group"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-brand-emerald transition-colors">Style</span>
                  <span className={`text-base font-bold mt-1 ${searchData.type ? "text-white" : "text-white/40"}`}>{typeLabel}</span>
                </button>
                <AnimatePresence>
                  {desktopDropdown === "type" && (
                     <motion.div
                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
                       className="absolute top-full right-0 mt-4 w-72 bg-brand-dark border border-white/10 rounded-[2rem] shadow-2xl p-3 z-50 overflow-hidden"
                     >
                       {types.map((t) => (
                         <button
                           key={t.value}
                           onClick={() => { setSearchData({ type: t.value }); setDesktopDropdown(null); }}
                           className={`w-full text-left px-6 py-4 rounded-2xl transition-all ${
                             searchData.type === t.value ? "bg-brand-emerald text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                           }`}
                         >
                           <p className="text-base font-bold">{t.label}</p>
                         </button>
                       ))}
                     </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Button */}
              <div className="p-2">
                <Link
                  href={`/properties?purpose=${searchData.purpose}&location=${searchData.location}&type=${searchData.type}`}
                  className="h-full bg-brand-emerald text-white flex items-center justify-center gap-4 px-12 rounded-[1.8rem] font-bold text-base hover:bg-brand-emerald-muted transition-all shadow-xl shadow-brand-emerald/20 active:scale-95 group"
                >
                  <Search size={22} className="group-hover:scale-110 transition-transform" strokeWidth={3} />
                  <span>Curate Properties</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Trust Batch */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex items-center gap-8"
          >
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-dark bg-gray-200 overflow-hidden">
                   <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Client" />
                 </div>
               ))}
             </div>
             <div className="text-white/40 text-sm font-medium">
               <span className="text-white font-bold">500+ Luxury Transactions</span> <br />
               Completed across Lagos & Abuja this quarter.
             </div>
          </motion.div>
        </div>
      </div>

      {/* Side Narrative (Vertical text - High-end touch) */}
      <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 vertical-text text-white/5 pointer-events-none select-none">
        <span className="text-[120px] font-black uppercase tracking-[0.2em]">PROPTEE ELITE</span>
      </div>
    </section>
  );
}
