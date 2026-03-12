"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function CTABanner() {
  return (
    <section className="relative py-24 md:py-40 bg-brand-dark overflow-hidden">
      {/* Cinematic Background with Parallax effect (Simplified for banner) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image 
          src="/hero_background.jpg" 
          alt="Luxury Abstract" 
          fill 
          className="object-cover grayscale"
        />
        {/* Animated Gradient Overlay */}
        <motion.div 
          animate={{ 
            background: [
              "radial-gradient(circle at 20% 30%, rgba(10,92,70,0.2) 0%, transparent 70%)",
              "radial-gradient(circle at 80% 70%, rgba(10,92,70,0.2) 0%, transparent 70%)",
              "radial-gradient(circle at 20% 30%, rgba(10,92,70,0.2) 0%, transparent 70%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent" />
      </div>

      <div className="px-6 md:px-8 lg:max-w-[1440px] lg:mx-auto relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
               <Sparkles size={14} className="text-brand-emerald" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Ready to begin?</span>
            </div>

            <h3 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1] tracking-tighter">
              Discover Your Next <br />
              <span className="text-brand-emerald font-handwriting italic lowercase text-6xl md:text-8xl lg:text-9xl block md:inline md:ml-4">Legacy</span>.
            </h3>

            <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              Proptee is more than a platform; it's an elite portal to West Africa's most prestigious residences. 
              Our private inventory is waiting for your curation.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 py-5 bg-brand-emerald text-white font-black uppercase tracking-[0.2em] text-[13px] rounded-full hover:bg-white hover:text-brand-dark transition-all duration-500 shadow-2xl shadow-brand-emerald/20 group"
              >
                Inquire Privately
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/properties"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 py-5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[13px] rounded-full hover:bg-white/5 transition-all duration-500"
              >
                Explore Inventory
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Narrative Accent */}
      <div className="hidden lg:block absolute right-[-5%] bottom-[-5%] select-none pointer-events-none transition-all">
         <span className="text-[200px] font-black text-white/[0.02] tracking-tighter uppercase">EST. 2025</span>
      </div>
    </section>
  );
}
