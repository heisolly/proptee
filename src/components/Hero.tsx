"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Search, MapPin, ChevronRight } from "lucide-react";
import PropertyFinder from "./PropertyFinder";

const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-white">
      
      {/* Cinematic Background - Bright & Modern */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image 
          src="/hero_background_light.png" 
          alt="Luxury Architecture" 
          fill
          className="object-cover"
          priority
        />
        {/* Soft Modern Gradients */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        <div className="absolute inset-0 bg-white/10"></div>
      </motion.div>

      {/* Architectural Side Labels - Professional Web Touch */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-24 z-20">
         <div className="flex flex-col items-center gap-6">
            <span className="text-[9px] font-bold text-[#111827]/30 uppercase tracking-[0.8em] rotate-180 [writing-mode:vertical-lr]">Exclusivity</span>
            <div className="w-px h-24 bg-[#111827]/10"></div>
         </div>
         <div className="flex flex-col items-center gap-6">
            <span className="text-[10px] font-black text-[#1F7A5C] tracking-widest rotate-180 [writing-mode:vertical-lr]">2024</span>
            <div className="w-px h-12 bg-[#1F7A5C]/30"></div>
         </div>
      </div>

      <div className="container mx-auto px-6 lg:px-24 relative z-10 pt-32 pb-16">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center"
          >
            {/* Pre-title */}
            <div className="flex items-center justify-center gap-6 mb-12 opacity-0 animate-fade-in">
               <span className="w-12 h-px bg-[#1F7A5C]/40"></span>
               <span className="text-[11px] font-black uppercase tracking-[0.6em] text-[#111827]/40">Architectural Narrative</span>
               <span className="w-12 h-px bg-[#1F7A5C]/40"></span>
            </div>
            
            <h1 className="leading-[0.85] mb-12 select-none">
              <span className="block text-6xl md:text-9xl lg:text-[140px] font-black tracking-[-0.04em] text-[#111827] animate-text-reveal">ELEVATING</span>
              <span className="block text-5xl md:text-8xl lg:text-[110px] font-serif italic text-[#1F7A5C] -mt-4 lg:-mt-8 opacity-0 animate-fade-up-slow">Lifestyles</span>
            </h1>
            
            <p className="text-[#111827] text-lg md:text-xl font-semibold leading-relaxed mb-20 max-w-[650px] mx-auto opacity-0 animate-fade-in-delayed tracking-wide">
              Where architectural precision meets uncompromising luxury. Explore curated residences that redefine the Nigerian skyline.
            </p>

            {/* Immersive Search Console Integration */}
            <div className="w-full flex justify-center mb-32 relative opacity-0 animate-fade-in-delayed-2">
               {/* Sophisticated Glow Ring */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[140%] bg-[#1F7A5C]/5 blur-[120px] rounded-full pointer-events-none"></div>
               <div className="w-full relative z-10 px-4">
                  <PropertyFinder />
               </div>
            </div>

            {/* High-End Trust Metrics - Minimalist Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-32 opacity-0 animate-fade-in-delayed-3 relative">
              <div className="flex flex-col items-center group cursor-default">
                 <span className="text-[10px] font-bold text-[#111827]/60 uppercase tracking-[0.4em] mb-4 group-hover:text-[#111827] transition-colors">Managed Portfolio</span>
                 <div className="relative">
                    <span className="text-4xl md:text-6xl font-black text-[#111827] italic">₦2.4B</span>
                    <motion.div className="absolute -bottom-2 left-0 h-px bg-[#1F7A5C]" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 3, duration: 1 }} />
                 </div>
              </div>
              
              <div className="hidden md:flex flex-col items-center group cursor-default">
                 <span className="text-[10px] font-bold text-[#111827]/60 uppercase tracking-[0.4em] mb-4 group-hover:text-[#111827] transition-colors">Curated Units</span>
                 <div className="relative">
                    <span className="text-4xl md:text-6xl font-black text-[#111827] italic">120+</span>
                    <motion.div className="absolute -bottom-2 left-0 h-px bg-[#1F7A5C]" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 3.2, duration: 1 }} />
                 </div>
              </div>

              <div className="flex flex-col items-center group cursor-default">
                 <span className="text-[10px] font-bold text-[#111827]/60 uppercase tracking-[0.4em] mb-4 group-hover:text-[#111827] transition-colors">Global Trust</span>
                 <div className="relative">
                    <span className="text-4xl md:text-6xl font-black text-[#111827] italic">98%</span>
                    <motion.div className="absolute -bottom-2 left-0 h-px bg-[#1F7A5C]" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 3.4, duration: 1 }} />
                 </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Professional Sidebar Indicator */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8 z-20">
         {[1, 2, 3].map((i) => (
            <div key={i} className={`w-1 h-8 rounded-full transition-all duration-700 ${i === 1 ? "bg-[#1F7A5C] h-16" : "bg-[#111827]/10"}`}></div>
         ))}
      </div>

      {/* Scroll Down Hint - Modern Pill */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-20 opacity-0 animate-fade-in-delayed-3">
         <div className="w-8 h-12 rounded-full border border-[#111827]/20 flex items-start justify-center p-2">
            <motion.div 
               animate={{ y: [0, 16, 0] }} 
               transition={{ duration: 2, repeat: Infinity }}
               className="w-1.5 h-1.5 rounded-full bg-[#1F7A5C]"
            />
         </div>
      </div>

      <style jsx>{`
        @keyframes text-reveal {
          from { clip-path: inset(0 100% 0 0); opacity: 0; transform: translateX(-20px); }
          to { clip-path: inset(0 0 0 0); opacity: 1; transform: translateX(0); }
        }
        .animate-text-reveal {
          animation: text-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up-slow {
          animation: fade-up 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
        }
        @keyframes fade-in {
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out 0.8s forwards;
        }
        .animate-fade-in-delayed {
          animation: fade-in 1s ease-out 1.2s forwards;
        }
        .animate-fade-in-delayed-2 {
          animation: fade-in 1s ease-out 1.6s forwards;
        }
        .animate-fade-in-delayed-3 {
          animation: fade-in 1s ease-out 2s forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;



