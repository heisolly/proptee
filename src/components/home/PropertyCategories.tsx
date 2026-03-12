"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Hexagon } from "lucide-react";

const categories = [
  { label: "Luxury Villas", count: "34 Properties", image: "/hero_background.jpg", href: "/properties?type=villa" },
  { label: "Exclusive Penthouses", count: "21 Properties", image: "/hero-bg-2.jpg", href: "/properties?type=penthouse" },
  { label: "Waterfront Estates", count: "18 Properties", image: "/hero-bg-3.jpg", href: "/properties?type=waterfront" },
  { label: "Modern Apartments", count: "47 Properties", image: "/hero_background.jpg", href: "/properties?type=apartment" },
  { label: "Smart Living", count: "12 Properties", image: "/hero-bg-2.jpg", href: "/properties?type=smart" },
];

export default function PropertyCategories() {
  return (
    <section className="bg-brand-bg/30 py-32 lg:py-48 relative overflow-hidden">
      
      {/* Decorative Geometric Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] border-[100px] border-white/40 clip-hex -z-0 opacity-50 rotate-45 translate-x-1/2 -translate-y-1/2" />

      <div className="container max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
             <div className="w-12 h-px bg-brand-gold-bright" />
             <Hexagon size={16} className="text-brand-gold-bright fill-brand-gold-bright/10" />
             <div className="w-12 h-px bg-brand-gold-bright" />
          </div>
          <h2 className="text-6xl md:text-8xl font-serif font-light text-brand-dark tracking-tighter leading-[0.9] mb-8">
            The <span className="italic">Collection</span>
          </h2>
          <p className="text-brand-dark/40 text-[11px] font-black uppercase tracking-[0.5em] font-sans">Curated by Architecture & Form</p>
        </motion.div>

        {/* Hexagonal Interactive Grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-x-12 md:gap-y-24">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative w-[80vw] sm:w-[280px] md:w-[320px] aspect-square"
            >
              <Link href={cat.href} className="absolute inset-0 block">
                {/* Hexagon Container */}
                <div className="absolute inset-0 clip-hex bg-white shadow-2xl transition-all duration-700 group-hover:scale-[1.05] group-hover:rotate-6">
                   <div className="absolute inset-2 clip-hex overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.label}
                        fill
                        className="object-cover transition-transform duration-[2s] group-hover:scale-110 group-hover:-rotate-6"
                      />
                      <div className="absolute inset-0 bg-brand-dark/40 opacity-40 group-hover:opacity-60 transition-opacity" />
                   </div>
                </div>

                {/* Floating Info Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-6 z-20">
                   <h3 className="text-white text-xl md:text-2xl font-serif font-light mb-2 transition-transform duration-500 group-hover:scale-110">
                      {cat.label}
                   </h3>
                   <div className="h-px w-0 bg-brand-gold-bright mx-auto group-hover:w-16 transition-all duration-700 mb-2" />
                   <p className="text-white/60 text-[9px] font-black uppercase tracking-[0.3em] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
                      {cat.count}
                   </p>
                </div>

                {/* Corner Indicator */}
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <ArrowUpRight size={20} className="text-brand-dark" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
