"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Globe, Compass, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const locations = [
  { name: "Banana Island", count: 24, image: "/luxury_lagos_dusk_hero_1773269189794.png", desc: "The pinnacle of Nigerian architecture. A private sanctuary for the global elite." },
  { name: "Victoria Island", count: 18, image: "/architectural_masterpiece_lagos_day_1773269982392.png", desc: "Cosmopolitan orchestration with breathtaking oceanic perspectives." },
  { name: "Lekki Phase 1", count: 42, image: "/proptee_entrance_narrative_1773291875530.png", desc: "Modern architectural paradigms and vibrant life protocols." },
  { name: "Asokoro, Abuja", count: 15, image: "/proptee_about_hero_1773292316418.png", desc: "Exclusive estates curated for the distinguished administrative elite." },
  { name: "Maitama, Abuja", count: 12, image: "/proptee_locations_hero_1773292512467.png", desc: "Diplomatic serenity synchronized with premium residential towers." },
  { name: "Ikoyi", count: 31, image: "/proptee_concierge_narrative_1773292168744.png", desc: "Heritage luxury nested within lush, historical environments." }
];

export default function LocationsPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen text-brand-dark overflow-hidden">

        {/* ── Cinematic Territorial Hero ── */}
        <section className="relative h-[70vh] flex items-center overflow-hidden">
          <Image 
            src="/proptee_locations_hero_1773292512467.png" 
            alt="Global Reach" 
            fill 
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white via-white/80 to-transparent" />
          
          <div className="container max-w-[1140px] mx-auto px-8 relative z-10 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                <div className="w-12 h-[1px] bg-brand-emerald" />
                <p className="text-brand-emerald font-black uppercase tracking-[0.5em] text-[10px]">Territorial Registry</p>
              </div>
              <h1 className="text-6xl md:text-8xl font-serif text-brand-dark leading-[0.9] mb-8">
                Prestigious <br /><span className="text-brand-emerald italic">Geographies.</span>
              </h1>
              <p className="text-brand-dark/40 text-sm font-sans max-w-lg leading-relaxed uppercase font-black tracking-widest hidden md:block">
                Discover curated high-definition properties across West Africa's most elite administrative territories.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── The Registry: Grid ── */}
        <section className="py-24 bg-white relative z-20">
          <div className="container max-w-[1140px] mx-auto px-8">
            
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 border-b border-gray-50 pb-12">
              <div className="max-w-2xl">
                 <h2 className="text-4xl font-serif text-brand-dark mb-6">Explore by <span className="text-brand-emerald italic">Sector.</span></h2>
                 <p className="text-brand-dark/40 font-sans text-sm leading-relaxed italic uppercase font-black tracking-widest">
                   From the vertical finance districts of Eko Atlantic to the diplomatic estates of Asokoro.
                 </p>
              </div>
              <Compass size={40} className="text-brand-emerald/20 hidden md:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {locations.map((loc, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                >
                  <Link 
                    href={`/properties?location=${loc.name}`} 
                    className="group block relative rounded-[3rem] overflow-hidden bg-gray-50 aspect-[4/5] shadow-2xl shadow-gray-200/50"
                  >
                    <Image 
                      src={loc.image} 
                      alt={loc.name} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 filter saturate-[0.8]" 
                    />
                    
                    {/* Glass Overlay */}
                    <div className="absolute inset-x-4 bottom-4 p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] transform transition-all duration-700 group-hover:bg-white group-hover:scale-[1.02]">
                       <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-serif text-white group-hover:text-brand-dark transition-colors">{loc.name}</h3>
                          <div className="w-10 h-10 rounded-full bg-brand-emerald text-white flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-1000">
                             <ArrowUpRight size={20} />
                          </div>
                       </div>
                       <p className="text-white/60 text-[10px] font-sans leading-relaxed group-hover:text-brand-dark/40 transition-colors uppercase tracking-widest font-black mb-6">
                          {loc.count}+ Asset Inductions
                       </p>
                       <p className="text-white/0 group-hover:text-brand-dark/50 text-xs font-sans leading-relaxed transition-all duration-700 overflow-hidden h-0 group-hover:h-12 italic">
                          {loc.desc}
                       </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ── Admission CTA ── */}
        <section className="py-24 bg-gray-50/50 overflow-hidden relative">
          <div className="container max-w-[1140px] mx-auto px-8">
            <div className="bg-brand-dark rounded-[4rem] p-12 md:p-24 relative overflow-hidden group">
              {/* Animated Background Element */}
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-from)_0%,transparent_50%)] from-brand-emerald/20 transition-all duration-1000 group-hover:scale-150" />
              
              <div className="relative z-10 max-w-2xl text-center md:text-left">
                <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-[10px] mb-8">Asset Admission</p>
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-[1.1]">
                   Command Your <br />
                   <span className="text-brand-emerald italic">Territorial Presence.</span>
                </h2>
                <p className="text-white/30 text-base mb-12 font-sans leading-relaxed italic max-w-lg">
                  Submit your architectural masterpiece to our global registry and encounter verified high-capacity investors.
                </p>
                <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                   <Link 
                    href="/list-property"
                    className="bg-brand-emerald text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-brand-dark transition-all shadow-2xl shadow-brand-emerald/20"
                  >
                    Initialize Listing
                  </Link>
                  <Link 
                    href="/contact"
                    className="bg-transparent text-white border border-white/10 px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/5 transition-all"
                  >
                    Registry Support
                  </Link>
                </div>
              </div>

              {/* Decorative Shield Icon */}
              <div className="absolute bottom-12 right-12 opacity-10 hidden lg:block">
                 <Shield size={200} className="text-brand-emerald" strokeWidth={0.5} />
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
