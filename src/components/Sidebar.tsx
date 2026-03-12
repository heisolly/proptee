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
  TrendingUp,
  Award,
  Facebook,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Elite Map", href: "/map" },
  { label: "Saved Listings", href: "/saved" },
  { label: "My Account", href: "/login" },
  { label: "Dossier/Blog", href: "/blog" },
  { label: "Consultation", href: "/contact" },
];

interface FullNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullNav({ isOpen, onClose }: FullNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[190] bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            className="fixed top-0 right-0 bottom-0 z-[200] w-full md:w-[480px] bg-[#0A0B10] flex flex-col shadow-2xl overflow-hidden font-sans border-l border-white/5"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/5">
              <div className="relative w-32 h-8">
                <Image src="/logo.png" alt="Logo" fill className="object-contain brightness-0 invert" />
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center text-white hover:bg-brand-emerald transition-all"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Content Overflow Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 scrollbar-hide">
              <div className="space-y-10">
                
                {/* Brand Statement */}
                <div className="space-y-4">
                  <div className="w-12 h-[2px] bg-brand-emerald" />
                  <h3 className="text-3xl font-serif text-white tracking-tight leading-snug">
                    Access the <br />
                    <span className="text-brand-emerald font-handwriting italic lowercase text-4xl inline-block -rotate-1">Private Portfolio</span>
                  </h3>
                </div>

                {/* Primary Navigation */}
                <nav className="space-y-1">
                  {navItems.map((item, i) => (
                    <Link 
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between py-5 border-b border-white/5 transition-all hover:bg-white/[0.02] px-4 -mx-4 rounded-xl"
                    >
                      <div className="flex items-center gap-6">
                        <span className="text-brand-emerald font-handwriting text-xl opacity-40 group-hover:opacity-100 transition-opacity">
                          0{i + 1}
                        </span>
                        <span className="text-2xl font-bold text-white group-hover:text-brand-emerald transition-colors tracking-tight">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight size={18} className="text-white/10 group-hover:text-brand-emerald group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </nav>

                {/* Secondary Links & Contact */}
                <div className="pt-10 space-y-10">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Inquiries</p>
                        <a href="mailto:elite@proptee.ng" className="text-sm font-bold text-white/60 hover:text-brand-emerald underline underline-offset-4 decoration-brand-emerald/30">elite@proptee.ng</a>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Headquarters</p>
                        <p className="text-sm font-bold text-white/60">VI, Lagos, NG</p>
                      </div>
                   </div>

                   {/* Social Experience */}
                   <div className="flex items-center gap-6">
                      {[Instagram, Linkedin, Twitter, Facebook].map((Icon, i) => (
                        <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 hover:text-brand-emerald hover:border-brand-emerald transition-all shadow-xl">
                          <Icon size={16} strokeWidth={1.5} />
                        </a>
                      ))}
                   </div>
                </div>
              </div>
            </div>

            {/* Bottom Panel */}
            <div className="p-8 bg-brand-dark/50 border-t border-white/5">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Verified Access Only</span>
                 </div>
                 <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/10">© 2026 PROPTEE NG</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
