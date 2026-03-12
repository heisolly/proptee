"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Map, ArrowRight, MapPin } from "lucide-react";

export default function InteractiveMapPreview() {
  return (
    <section className="bg-brand-surface py-24 lg:py-32 border-t border-black/6 overflow-hidden relative">
      {/* Soft glow orb */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-brand-emerald/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-[1400px] mx-auto px-6 md:px-12 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 z-10"
          >
            <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-5 block font-sans">Immersive Discovery</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-brand-dark leading-[1.1] mb-8">
              Explore Our<br />
              <em className="text-brand-dark/25 not-italic">Interactive Map</em>
            </h2>
            <p className="text-brand-dark-muted text-lg font-sans leading-relaxed mb-10 max-w-md">
              Visualize our entire premium portfolio across Nigeria. Discover exact locations, neighbourhood amenities, and local insights through our bespoke mapping experience.
            </p>
            <Link href="/map" className="luxury-button">
              Open Map View <Map size={18} />
            </Link>
          </motion.div>

          {/* Map graphic */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2"
          >
            <Link
              href="/map"
              className="block relative w-full aspect-square md:aspect-[4/3] rounded-[32px] overflow-hidden group border border-black/8 shadow-[0_8px_40px_rgba(26,24,20,0.1)] hover:shadow-[0_16px_60px_rgba(26,24,20,0.16)] transition-shadow duration-700"
            >
              {/* Map bg */}
              <div className="absolute inset-0 bg-[#E8ECE0] z-0">
                <Image
                  src="/hero-bg-3.jpg"
                  alt="Map preview"
                  fill
                  className="object-cover opacity-30 grayscale"
                />
              </div>
              {/* Fade */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#E8ECE0]/60 z-10" />

              {/* Live badge */}
              <div className="absolute top-5 left-5 z-20 bg-white/90 backdrop-blur-md border border-black/8 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
                <span className="text-brand-dark text-[10px] font-bold tracking-widest uppercase font-sans">Live Data</span>
              </div>

              {/* Map pins */}
              {[
                { top: "30%", left: "20%", color: "bg-brand-gold", size: "w-6 h-6", delay: "0s", icon: <MapPin size={11} className="text-white fill-white" /> },
                { top: "45%", right: "25%", color: "bg-brand-emerald", size: "w-8 h-8", delay: "0.5s", icon: <span className="text-[10px] font-bold text-white">12</span> },
                { bottom: "35%", left: "45%", color: "bg-brand-gold", size: "w-8 h-8", delay: "1s", icon: <span className="text-[10px] font-bold text-white">8</span> },
              ].map((pin, i) => (
                <div key={i} className="absolute z-20 group-hover:scale-110 transition-transform duration-500" style={{ top: pin.top, left: (pin as any).left, right: (pin as any).right, bottom: (pin as any).bottom }}>
                  <div className="relative flex items-center justify-center">
                    <div className={`absolute inset-0 ${pin.color} opacity-20 rounded-full animate-ping`} style={{ animationDelay: pin.delay }} />
                    <div className={`${pin.size} rounded-full ${pin.color} flex items-center justify-center shadow-lg`}>
                      {pin.icon}
                    </div>
                  </div>
                </div>
              ))}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-brand-emerald/10 opacity-0 group-hover:opacity-100 backdrop-blur-[1px] z-30 transition-all duration-500 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white text-brand-dark flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500 delay-100">
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
