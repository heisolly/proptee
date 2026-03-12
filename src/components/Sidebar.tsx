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
  Globe,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/", subtitle: "Return to Commencement" },
  { label: "Properties", href: "/properties", subtitle: "Curated Estate Inventory" },
  { label: "Locations", href: "/locations", subtitle: "Prime Jurisdictions" },
  { label: "How it Works", href: "/about", subtitle: "Our Heritage & Process" },
  { label: "Elite Map", href: "/map", subtitle: "Geospatial Asset Locator" },
  { label: "Insights", href: "/blog", subtitle: "The Real Estate Dossier" },
  { label: "Contact", href: "/contact", subtitle: "Private Consultation" },
];

interface FullNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullNav({ isOpen, onClose }: FullNavProps) {
  // Stagger variants for the menu items
  const containerVars = {
    initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    animate: { transition: { staggerChildren: 0.07, delayChildren: 0.2, staggerDirection: 1 } }
  };

  const itemVars = {
    initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
    open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-0 z-[200] bg-brand-dark flex flex-col lg:flex-row overflow-hidden font-sans"
        >
          {/* Subtle Background Texture for Mobile */}
          <div className="absolute inset-0 opacity-10 pointer-events-none lg:hidden">
            <Image 
              src="/hero_background.jpg" 
              alt="Background Texture" 
              fill 
              className="object-cover grayscale"
            />
          </div>

          {/* ── Left Column: Cinematic Visuals (Desktop Only) ── */}
          <div className="hidden lg:flex lg:w-[45%] bg-[#050505] border-r border-white/5 flex-col p-20 justify-between relative overflow-hidden">
            <motion.div 
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="absolute inset-0 pointer-events-none"
            >
              <Image 
                src="/architectural_masterpiece_lagos_day_1773269982392.png" 
                alt="Architecture" 
                fill 
                className="object-cover"
              />
            </motion.div>

            <div className="relative z-10">
              <Link href="/" onClick={onClose} className="block w-40 h-10 relative mb-20">
                 <Image src="/logo.png" alt="Logo" fill className="object-contain brightness-0 invert" />
              </Link>
              
              <div className="space-y-8 max-w-sm">
                 <div className="w-16 h-[1px] bg-brand-emerald" />
                 <h2 className="text-5xl font-bold text-white leading-tight uppercase tracking-tighter" style={{ fontFamily: "var(--font-bold)" }}>
                    Redefining the <br />
                    <span className="text-brand-emerald italic">Horizon</span> of <br />
                    African Luxury.
                 </h2>
                 <p className="text-white/30 text-[10px] font-black tracking-[0.4em] uppercase">
                    Proptee advisory services / Est. 2025
                 </p>
              </div>
            </div>

            <div className="relative z-10 flex items-end justify-between">
               <div className="space-y-6">
                 <div className="flex items-center gap-4 text-white/40">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Market Live / Nigeria</span>
                 </div>
                 <div className="flex items-center gap-4 text-white/40">
                   <MapPin size={14} className="text-brand-emerald" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Global Asset Reach</span>
                 </div>
               </div>
               
               <div className="flex flex-col gap-6 items-end">
                  <div className="flex gap-4">
                    {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                      <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-brand-emerald hover:border-brand-emerald transition-all">
                        <Icon size={16} />
                      </a>
                    ))}
                  </div>
                  <p className="text-white/10 text-[9px] font-bold tracking-[0.4em] uppercase">Connect Digitally</p>
               </div>
            </div>
          </div>

          {/* ── Right Column: Interactive Menu ── */}
          <div className="flex-1 flex flex-col p-8 lg:p-20 relative overflow-y-auto overflow-x-hidden scrollbar-hide">
            
            {/* Header / Close */}
            <div className="flex items-center justify-between mb-16 lg:mb-0 lg:absolute lg:top-10 lg:right-12 z-20">
              <Link href="/" onClick={onClose} className="lg:hidden block w-28 h-6 relative">
                 <Image src="/logo.png" alt="Logo" fill className="object-contain brightness-0 invert" />
              </Link>
              
              <button 
                onClick={onClose}
                className="group flex items-center gap-6"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-white transition-all">Close</span>
                <div className="w-14 h-14 rounded-full bg-brand-emerald flex items-center justify-center text-white transform group-hover:rotate-90 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-brand-emerald/20">
                  <X size={24} />
                </div>
              </button>
            </div>

            {/* Navigation Links */}
            <motion.nav 
              variants={containerVars}
              initial="initial"
              animate="animate"
              className="flex-1 flex flex-col justify-center"
            >
              <div className="space-y-6 lg:space-y-4">
                {navItems.map((item, i) => (
                  <div key={item.label} className="overflow-hidden">
                    <motion.div variants={itemVars}>
                      <Link 
                        href={item.href}
                        onClick={onClose}
                        className="group flex flex-col lg:flex-row lg:items-center justify-between py-5 lg:py-7 border-b border-white/5 transition-all"
                      >
                        <div className="flex items-center gap-8 lg:gap-12">
                          <span className="hidden lg:block font-serif text-lg text-brand-emerald italic opacity-40 group-hover:opacity-100 transition-opacity">
                            {i < 9 ? `0${i+1}` : i+1}
                          </span>
                          <div className="space-y-2">
                             <h4 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white/40 group-hover:text-white transition-all duration-500 tracking-tighter leading-none" style={{ fontFamily: "var(--font-bold)" }}>
                              {item.label}
                            </h4>
                            <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-white/10 group-hover:text-brand-emerald transition-colors">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                        
                        <div className="hidden lg:flex w-16 h-16 rounded-full border border-white/5 items-center justify-center -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                           <ArrowRight className="text-brand-emerald" size={20} />
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.nav>

            {/* Bottom Panel (Mobile Only) */}
            <div className="lg:hidden mt-20 space-y-12">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                 <div className="space-y-4">
                   <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-emerald">Office</h5>
                   <p className="text-white/50 text-xs leading-relaxed font-sans">
                     31, Atofarati Qtrs, <br />
                     Ibadan, Nigeria
                   </p>
                 </div>
                 <div className="space-y-4">
                   <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-emerald">Inquiries</h5>
                   <p className="text-white/50 text-xs font-sans">
                     info@proptee.ng <br />
                     +234 707 381 7578
                   </p>
                 </div>
               </div>
               
               <div className="pt-10 border-t border-white/5 flex items-center justify-between">
                 <div className="flex gap-6">
                    {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                      <a key={i} href="#" className="text-white/20">
                        <Icon size={18} />
                      </a>
                    ))}
                 </div>
                 <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/10">© 2025 Proptee NG</p>
               </div>
            </div>

            {/* Bottom Links (Desktop) */}
            <div className="hidden lg:flex mt-20 pt-10 border-t border-white/5 items-center justify-between">
               <div className="flex gap-12">
                 {["Legal Dossier", "Privacy Charter", "Partnership Access"].map((link) => (
                    <Link key={link} href="#" onClick={onClose} className="text-[10px] uppercase tracking-widest font-black text-white/20 hover:text-white transition-colors">
                      {link}
                    </Link>
                  ))}
               </div>
               <div className="flex items-center gap-3">
                  <Globe size={14} className="text-brand-emerald" />
                  <span className="text-[10px] font-black tracking-widest uppercase text-white/30">NGA / International Access</span>
               </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
