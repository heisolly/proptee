"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, Star, TrendingUp, Home, ChevronLeft, ChevronRight } from "lucide-react";
import PropertyFinder from "./PropertyFinder";

const slides = [
  {
    image: "/hero_background_light.png",
    location: "Banana Island, Lagos",
    tag: "Featured Estate",
    price: "₦850M",
    label: "Waterfront Villa",
    beds: 6,
    baths: 7,
    sqm: 1200,
  },
  {
    image: "/hero_background_light.png",
    location: "Victoria Island, Lagos",
    tag: "New Listing",
    price: "₦320M",
    label: "Sky Penthouse",
    beds: 4,
    baths: 5,
    sqm: 650,
  },
  {
    image: "/hero_background_light.png",
    location: "Lekki Phase 1, Lagos",
    tag: "Investment Pick",
    price: "₦190M",
    label: "Modern Residence",
    beds: 5,
    baths: 4,
    sqm: 890,
  },
];

const stats = [
  { value: "12K+", label: "Active Listings", icon: <Home size={14} /> },
  { value: "₦2.4B", label: "Portfolio Value", icon: <TrendingUp size={14} /> },
  { value: "98%", label: "Satisfaction", icon: <Star size={14} /> },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent((p) => (p + 1) % slides.length);

  const slide = slides[current];

  return (
    /* Full viewport height minus the 72 px fixed header */
    <section className="relative w-full bg-[#060606] overflow-hidden" style={{ height: "calc(100vh - 72px)", minHeight: 600 }}>

      {/* ─── FULL-BLEED BACKGROUND IMAGE ─────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slide.image}
            alt={slide.label}
            fill
            className="object-cover object-center"
            priority
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* ─── MAIN LAYOUT ──────────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col">

        {/* Content flex row — fills all space above the search bar */}
        <div className="flex-1 flex items-center overflow-hidden">
          <div className="w-full container mx-auto px-6 md:px-10 xl:px-16 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 pb-6">

            {/* ── LEFT: Headline + CTAs ─────────────────────── */}
            <div className="w-full lg:max-w-[580px] flex flex-col">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="inline-flex items-center gap-2 self-start mb-6 px-4 py-2 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.35em]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                Nigeria's Finest Addresses
              </motion.div>

              {/* Headline */}
              <div className="overflow-hidden mb-1">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                  className="text-[clamp(2.6rem,6.5vw,6rem)] font-light leading-[1] tracking-tight text-white font-serif"
                >
                  Where Elite
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-6">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
                  className="text-[clamp(2.6rem,6.5vw,6rem)] font-light leading-[1] tracking-tight text-white font-serif"
                >
                  Living{" "}
                  <em className="text-[#D4AF37] not-italic">Begins</em>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="text-white/55 text-sm md:text-base font-light leading-relaxed max-w-sm mb-8"
              >
                Discover iconic penthouses, private waterfront estates, and architecturally curated residences across Nigeria.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-wrap items-center gap-3"
              >
                <a
                  href="#properties"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#c09b2c] text-black text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300 shadow-[0_8px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.55)] active:scale-95"
                >
                  Explore Properties <ArrowUpRight size={14} />
                </a>
                <button className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/15 text-white/65 hover:text-white hover:border-white/30 text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300 backdrop-blur-sm">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                    <Play size={8} fill="currentColor" />
                  </div>
                  Virtual Tour
                </button>
              </motion.div>
            </div>

            {/* ── RIGHT: Property Card + Slide controls ─────── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="w-full lg:w-auto lg:min-w-[260px] flex flex-col gap-4"
            >
              {/* Floating property info card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current + "-card"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="bg-black/45 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl"
                >
                  <span className="text-[9px] font-black uppercase tracking-[0.35em] text-[#D4AF37] mb-3 block">{slide.tag}</span>
                  <p className="text-white font-semibold text-lg leading-snug mb-1">{slide.label}</p>
                  <p className="text-white/45 text-xs mb-5">{slide.location}</p>

                  {/* Specs */}
                  <div className="flex items-center gap-4 mb-5 text-white/50 text-[11px]">
                    <span>{slide.beds} Beds</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{slide.baths} Baths</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{slide.sqm.toLocaleString()} m²</span>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[9px] text-white/35 uppercase tracking-widest mb-1">Starting From</p>
                      <p className="text-[#D4AF37] text-2xl font-bold leading-none">{slide.price}</p>
                    </div>
                    <a
                      href="#properties"
                      className="w-10 h-10 rounded-full bg-[#D4AF37] hover:bg-white transition-colors flex items-center justify-center shadow-lg"
                    >
                      <ArrowUpRight size={14} className="text-black" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slide dots + arrows */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`rounded-full transition-all duration-500 ${i === current ? "w-7 h-2 bg-[#D4AF37]" : "w-2 h-2 bg-white/25 hover:bg-white/45"}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="w-9 h-9 rounded-full border border-white/15 text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-all"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <button
                    onClick={next}
                    className="w-9 h-9 rounded-full border border-white/15 text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-all"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── STATS BAR ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="container mx-auto px-6 md:px-10 xl:px-16 pb-4"
        >
          <div className="flex items-center gap-8 md:gap-14 mb-5">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-3 group cursor-default">
                <span className="text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors">{s.icon}</span>
                <div>
                  <p className="text-white text-xl md:text-2xl font-bold leading-none group-hover:text-[#D4AF37] transition-colors">{s.value}</p>
                  <p className="text-white/35 text-[9px] uppercase tracking-[0.2em] mt-0.5">{s.label}</p>
                </div>
                {i < stats.length - 1 && <div className="w-px h-8 bg-white/8 ml-2" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── SEARCH BAR ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="w-full border-t border-white/8 bg-black/40 backdrop-blur-2xl px-4 md:px-10 xl:px-16 py-4"
        >
          <PropertyFinder />
        </motion.div>

      </div>
    </section>
  );
}
