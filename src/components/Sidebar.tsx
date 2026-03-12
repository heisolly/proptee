"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  X,
  Instagram, 
  Linkedin, 
  Twitter,
  ArrowRight,
  ShieldCheck,
  Headset
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/", subtitle: "The Commencement" },
  { label: "Properties", href: "/properties", subtitle: "Curated Inventory" },
  { label: "Locations", href: "/locations", subtitle: "Prime Jurisdictions" },
  { label: "Elite Map", href: "/map", subtitle: "Geospatial Locator" },
  { label: "Affiliate", href: "/affiliate", subtitle: "Elite Partnership" },
  { label: "About", href: "/about", subtitle: "Our Heritage" },
];

interface FullNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullNav({ isOpen, onClose }: FullNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-0 z-[200] bg-brand-dark flex flex-col lg:flex-row overflow-hidden"
        >
          {/* ── Left Column: Brand Identity (Cinematic) ── */}
          <div className="hidden lg:flex lg:w-[45%] bg-[#050505] border-r border-white/5 flex-col p-24 justify-between relative overflow-hidden">
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 3 }}
              className="absolute inset-0 pointer-events-none"
            >
              <Image 
                src="/architectural_masterpiece_lagos_day_1773269982392.png" 
                alt="Architecture" 
                fill 
                className="object-cover grayscale"
              />
            </motion.div>

            <div className="relative z-10">
              <Link href="/" onClick={onClose} className="block w-40 h-10 relative mb-20">
                 <Image src="/logo.png" alt="Logo" fill className="object-contain brightness-0 invert" />
              </Link>
              
              <div className="space-y-8 max-w-sm">
                 <div className="w-12 h-[2px] bg-brand-emerald" />
                 <h2 className="text-5xl md:text-6xl font-serif text-white leading-[1.1] tracking-tight">
                    Redefining the <span className="text-brand-emerald italic">Horizon</span> of African Luxury.
                 </h2>
                 <p className="text-white/30 text-xs font-sans leading-relaxed tracking-widest uppercase">
                    Proptee advisory services / Est. 2010
                 </p>
              </div>
            </div>

            <div className="relative z-10 flex items-end justify-between">
               <div className="space-y-6">
                 <div className="flex items-center gap-4 text-white/40">
                   <ShieldCheck size={16} className="text-brand-emerald" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Secured Vault Assets</span>
                 </div>
                 <div className="flex items-center gap-4 text-white/40">
                   <Headset size={16} className="text-brand-emerald" />
                   <span className="text-[10px] font-black uppercase tracking-widest">24/7 Private Concierge</span>
                 </div>
               </div>
               
               <div className="flex flex-col gap-6 items-end">
                  <div className="flex gap-6">
                    {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                      <a key={i} href="#" className="text-white/20 hover:text-brand-emerald transition-all">
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                  <p className="text-white/10 text-[9px] font-bold tracking-[0.4em] uppercase">Connect Globally</p>
               </div>
            </div>
          </div>

          {/* ── Right Column: Interactive Menu ── */}
          <div className="flex-1 bg-brand-dark flex flex-col p-6 md:p-12 lg:p-24 relative overflow-y-auto overflow-x-hidden scrollbar-hide">
            
            {/* Minimal Close Header */}
            <div className="flex items-center justify-between mb-12 lg:mb-0 lg:absolute lg:top-12 lg:right-16">
              <Link href="/" onClick={onClose} className="lg:hidden block w-24 h-6 relative">
                 <Image src="/logo.png" alt="Logo" fill className="object-contain brightness-0 invert" />
              </Link>
              
              <button 
                onClick={onClose}
                className="group flex items-center gap-4 md:gap-6"
              >
                <div className="relative hidden md:block">
                   <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 group-hover:text-white transition-all duration-500">Close</span>
                   <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-emerald group-hover:w-full transition-all duration-500" />
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/5 flex items-center justify-center text-white/30 group-hover:border-brand-emerald group-hover:text-brand-emerald transition-all duration-500 active:scale-90">
                  <X size={20} className="group-hover:rotate-180 transition-transform duration-700" />
                </div>
              </button>
            </div>

            {/* Main Menu Grid */}
            <nav className="flex-1 flex flex-col justify-center">
              <div className="flex flex-col gap-6 md:gap-12 lg:gap-16">
                {navItems.map((item, i) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.1 + (i * 0.05),
                      ease: [0.19, 1, 0.22, 1]
                    }}
                  >
                    <Link 
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between border-b border-white/5 pb-4 md:pb-8 min-h-[56px]"
                    >
                      <div className="flex items-center gap-4 md:gap-10">
                        <span className="font-serif text-sm md:text-lg text-brand-emerald italic opacity-40 group-hover:opacity-100 transition-opacity">
                          0{i+1}
                        </span>
                        <div className="space-y-1 md:space-y-2">
                           <h4 className="text-2xl md:text-5xl lg:text-7xl font-serif text-white/40 group-hover:text-white transition-all duration-500 tracking-tighter leading-none">
                            {item.label}
                          </h4>
                          <p className="text-[9px] font-semibold uppercase tracking-widest text-white/10 group-hover:text-brand-emerald transition-colors">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      <div className="hidden md:flex w-16 h-16 rounded-full border border-white/5 items-center justify-center -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700">
                         <ArrowRight className="text-brand-emerald" size={20} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Bottom Panel */}
            <div className="mt-12 md:mt-20 lg:mt-32 pt-8 md:pt-12 border-t border-white/5 flex flex-wrap items-center justify-between gap-6 md:gap-8">
               <div className="flex flex-wrap gap-x-10 gap-y-4">
                 {["Legal Dossier", "Terms of Use", "Agent Access", "Careers"].map((link) => (
                    <Link key={link} href="#" onClick={onClose} className="text-[10px] uppercase tracking-widest font-black text-white/20 hover:text-white transition-colors">
                      {link}
                    </Link>
                  ))}
               </div>
               <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Market Live / Nigeria</p>
               </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
