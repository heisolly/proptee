"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Hexagon } from "lucide-react";

const locations = [
  { name: "Banana Island", city: "Lagos", listings: 42, image: "/hero_background.jpg", href: "/locations" },
  { name: "Victoria Island", city: "Lagos", listings: 67, image: "/hero-bg-2.jpg", href: "/locations" },
  { name: "Lekki Phase 1", city: "Lagos", listings: 85, image: "/hero-bg-3.jpg", href: "/locations" },
  { name: "Asokoro", city: "Abuja", listings: 31, image: "/hero_background.jpg", href: "/locations" },
  { name: "Ikoyi", city: "Lagos", listings: 54, image: "/hero-bg-2.jpg", href: "/locations" },
  { name: "Maitama", city: "Abuja", listings: 29, image: "/hero-bg-3.jpg", href: "/locations" },
];

export default function PremiumLocations() {
  return (
    <section className="bg-brand-dark py-32 lg:py-48 relative overflow-hidden">
      
      {/* Decorative Geometric Wireframe */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="absolute top-0 right-0 w-[100vw] h-[100vw] border-[1px] border-white/20 clip-hex rotate-45 translate-x-1/2 -translate-y-1/2" />
         <div className="absolute bottom-0 left-0 w-[80vw] h-[80vw] border-[1px] border-white/20 clip-hex -rotate-12 -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="container max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-end justify-between gap-12 mb-24"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-6 mb-8">
               <Hexagon size={24} className="text-brand-gold-bright fill-brand-gold-bright/10" />
               <span className="text-brand-gold-bright text-[11px] font-black uppercase tracking-[0.5em] font-sans">Prestigious Districts</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif font-light text-white tracking-tighter leading-[0.85]">
              Prime <br />
              <span className="italic font-normal opacity-30">Destinations</span>
            </h2>
          </div>
          <Link
            href="/locations"
            className="group flex flex-col items-end gap-4 text-white hover:text-brand-gold-bright transition-all pr-4"
          >
            <div className="flex items-center gap-6">
               <span className="text-[11px] font-black uppercase tracking-[0.4em]">Global Network Map</span>
               <div className="w-14 h-14 rounded-full border border-white/10 group-hover:bg-brand-gold-bright group-hover:text-white group-hover:scale-110 flex items-center justify-center transition-all shadow-2xl">
                 <ArrowRight size={20} />
               </div>
            </div>
          </Link>
        </motion.div>

        {/* Minimal Hexagonal Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-16 md:gap-y-24">
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1 }}
            >
              <Link
                href={loc.href}
                className="group relative block transition-all"
              >
                {/* Vertical Hexagon Frame */}
                <div className="relative w-full aspect-[4/5] clip-hex overflow-hidden bg-white/5 border border-white/10 transition-transform duration-700 group-hover:scale-[0.98]">
                   <Image
                     src={loc.image}
                     alt={loc.name}
                     fill
                     className="object-cover transition-transform duration-[3s] grayscale group-hover:grayscale-0 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-80" />
                </div>

                {/* Vertical Data Overlay */}
                <div className="mt-8 px-4 flex justify-between items-end">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <MapPin size={14} className="text-brand-gold-bright" />
                        <span className="text-brand-gold-bright text-[10px] font-black uppercase tracking-[0.4em] font-sans">
                          {loc.city}
                        </span>
                     </div>
                     <h3 className="text-white text-3xl font-serif font-light leading-none group-hover:text-brand-gold-bright transition-colors">
                        {loc.name}
                     </h3>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                     <span className="text-white text-xl font-serif font-light">{loc.listings}</span>
                     <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 font-sans">Listings</span>
                  </div>
                </div>

                {/* Hover Line Indicator */}
                <div className="w-0 h-[1.5px] bg-brand-gold-bright mx-auto mt-8 transition-all duration-700 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
