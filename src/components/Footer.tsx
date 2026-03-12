"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Youtube, Facebook, Mail, ArrowRight, ArrowUpRight, Globe, ShieldCheck, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "Portfolio",
    links: [
      { label: "Elite Mansions", href: "/properties?type=house" },
      { label: "Modern Suites", href: "/properties?type=apartment" },
      { label: "Waterfront Villas", href: "/properties?type=villa" },
      { label: "Landed Assets", href: "/properties?type=land" },
    ]
  },
  {
    title: "Enterprise",
    links: [
      { label: "Our Legacy", href: "/about" },
      { label: "Property Insights", href: "/blog" },
      { label: "Member Access", href: "/login" },
      { label: "Affiliate Portal", href: "/affiliate" },
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0B10] text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* ── Top Section: Brand + Navigation ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          {/* Brand & Statement (4 Cols) */}
          <div className="lg:col-span-4 space-y-10">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <div className="relative w-44 h-11">
                <Image src="/logo.png" alt="Proptee" fill className="object-contain brightness-0 invert" priority />
              </div>
            </Link>
            
            <h3 className="text-3xl lg:text-4xl font-serif leading-[1.2] max-w-sm tracking-tight">
               Crafting the future of <br /> 
               <span className="text-brand-emerald font-handwriting italic normal-case text-4xl lg:text-5xl">Luxury Living</span> <br /> 
               in West Africa.
            </h3>

            <div className="flex gap-6 pt-4">
              {[Instagram, Linkedin, Youtube, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-brand-emerald hover:border-brand-emerald hover:bg-white/[0.02] transition-all">
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation (4 Cols) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-12">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">{section.title}</h4>
                <ul className="space-y-5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href}
                        className="text-lg font-medium text-white/60 hover:text-brand-emerald transition-all inline-flex items-center group"
                      >
                        {link.label}
                        <ArrowUpRight size={14} className="ml-2 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-brand-emerald" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact & CTA (4 Cols) */}
          <div className="lg:col-span-4 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Private Consultation</h4>
            
            <div className="space-y-6">
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-brand-emerald group-hover:bg-brand-emerald group-hover:text-white transition-all duration-500">
                   <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Send Inquiry</p>
                  <a href="mailto:info@proptee.ng" className="text-xl font-bold hover:text-brand-emerald transition-colors">info@proptee.ng</a>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-brand-emerald group-hover:bg-brand-emerald group-hover:text-white transition-all duration-500">
                   <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Visit Headquarters</p>
                  <p className="text-lg font-bold text-white/80">Victoria Island, Lagos, NG</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
               <Link 
                 href="/contact" 
                 className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-brand-emerald text-white font-black uppercase tracking-widest text-[12px] rounded-full hover:bg-white hover:text-brand-dark transition-all duration-500 shadow-2xl shadow-brand-emerald/20"
               >
                 Book Consultation
                 <ArrowRight size={16} />
               </Link>
            </div>
          </div>
        </div>

        {/* ── Middle Section: Newsletter Reveal ── */}
        <div className="relative py-20 border-t border-white/5 mb-20 overflow-hidden rounded-[3rem] bg-gradient-to-tr from-white/[0.02] to-transparent border border-white/5">
           <div className="max-w-4xl mx-auto px-8 text-center flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-emerald mb-6">Stay Informed</span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-10 tracking-tight">Access the Private Dossier</h2>
              
              <div className="w-full max-w-xl group">
                 <div className="flex flex-col md:flex-row gap-4 p-2 bg-white/[0.03] border border-white/10 rounded-full focus-within:border-brand-emerald transition-all duration-500">
                    <input 
                      type="email" 
                      placeholder="Enter your premium email"
                      className="bg-transparent border-none focus:outline-none focus:ring-0 px-8 py-3 text-lg font-medium text-white placeholder:text-white/20 flex-1"
                    />
                    <button className="bg-white text-brand-dark px-10 py-4 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-brand-emerald hover:text-white transition-all">
                       Subscribe
                    </button>
                 </div>
                 <p className="text-white/20 text-[10px] uppercase tracking-widest mt-6">Only relevant insights. No noise. Ever.</p>
              </div>
           </div>
           
           {/* Abstract Decoration */}
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-emerald/5 blur-[100px] rounded-full pointer-events-none" />
           <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-emerald/5 blur-[100px] rounded-full pointer-events-none" />
        </div>

        {/* ── Bottom Section: Credits ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-12 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-10">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">© 2026 PROPTEE WEST AFRICA</p>
             <div className="flex gap-10">
                <Link href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-brand-emerald transition-colors">Privacy Charter</Link>
                <Link href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-brand-emerald transition-colors">Digital Protocol</Link>
             </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/10">
                <ShieldCheck size={14} className="text-brand-emerald" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Verified Infrastructure</span>
             </div>
             <div className="flex items-center gap-3">
                <Globe size={14} className="text-white/20" />
                <span className="text-[9px] font-black tracking-widest uppercase text-white/20">Market 24 / 7</span>
             </div>
          </div>
        </div>

      </div>
      
      {/* Background Narrative */}
      <div className="absolute left-1/2 -bottom-24 -translate-x-1/2 select-none pointer-events-none opacity-[0.05] overflow-hidden w-full text-center">
         <h2 className="text-[20vw] font-black leading-none uppercase tracking-tighter whitespace-nowrap">PROPTEE ELITE</h2>
      </div>
    </footer>
  );
}
