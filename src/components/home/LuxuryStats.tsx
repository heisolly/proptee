"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hexagon, TrendingUp, Users, Award, ShieldCheck, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { icon: TrendingUp, value: "₦120B+", label: "Total Asset Value", sub: "Managed in 2025" },
  { icon: Users, value: "1,200+", label: "Private Clients", sub: "Global Network" },
  { icon: Award, value: "14+", label: "Years Excellence", sub: "Since Foundation" },
  { icon: ShieldCheck, value: "100%", label: "Secure Escrow", sub: "Verified Assets" },
];

export default function LuxuryStats() {
  return (
    <section className="bg-brand-bg-pure py-32 lg:py-56 relative overflow-hidden">
      
      {/* Decorative Geometric Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-brand-dark/[0.03] clip-hex -z-0 rotate-12" />

      <div className="container max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── Top Header ── */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-10">
               <Hexagon size={24} className="text-brand-gold-bright fill-brand-gold-bright/10" />
               <span className="text-brand-gold text-[11px] font-black uppercase tracking-[0.5em] font-sans">Our Track Record</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-brand-dark tracking-tighter leading-[0.9] mb-10" style={{ fontFamily: "var(--font-bold)" }}>
              The <span className="italic">Power</span> <br />
              of Precision.
            </h2>
            <p className="text-brand-dark/50 text-lg md:text-xl max-w-xl leading-relaxed font-sans mb-12">
              We transcend traditional real estate. Every property in our portfolio is analyzed with mathematical precision and geometric soul to ensure unmatched investment potential.
            </p>
            <Link href="/about" className="group inline-flex items-center gap-6">
               <div className="w-16 h-16 rounded-full border border-brand-dark/10 group-hover:bg-brand-dark group-hover:text-white flex items-center justify-center transition-all duration-500">
                  <ArrowUpRight size={24} />
               </div>
               <span className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-dark">The Proptee Legacy</span>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto clip-hex shadow-2xl overflow-hidden">
               <Image 
                 src="/hero_background.jpg" 
                 alt="Luxury Interior" 
                 fill 
                 className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s]" 
               />
               <div className="absolute inset-0 bg-brand-emerald/10 mix-blend-multiply" />
            </div>
            {/* Hexagonal Accent */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-gold-bright clip-hex -z-10 shadow-xl opacity-20" />
          </motion.div>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group text-center lg:text-left"
            >
              <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 mb-8">
                 <div className="w-20 h-20 bg-brand-bg-pure border border-brand-dark/5 shadow-xl clip-hex flex items-center justify-center text-brand-dark group-hover:bg-brand-dark group-hover:text-white transition-all duration-700">
                    <item.icon size={30} strokeWidth={1.5} />
                 </div>
                 <div className="h-px w-20 bg-brand-dark/5 hidden lg:block mb-4" />
              </div>
              <div className="space-y-3">
                 <h4 className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight" style={{ fontFamily: "var(--font-bold)" }}>{item.value}</h4>
                 <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-dark">{item.label}</span>
                    <span className="text-[10px] text-brand-dark/40 italic font-serif mt-1">{item.sub}</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
