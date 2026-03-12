"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const locations = [
  { name: "Banana Island", count: 24, image: "/hero_background.jpg", desc: "The pinnacle of Nigerian luxury real estate." },
  { name: "Victoria Island", count: 18, image: "/hero_background.jpg", desc: "Cosmopolitan living with breathtaking ocean views." },
  { name: "Lekki Phase 1", count: 42, image: "/hero_background.jpg", desc: "Modern architectural masterpieces and vibrant lifestyle." },
  { name: "Asokoro, Abuja", count: 15, image: "/hero_background.jpg", desc: "Exclusive estates for the distinguished elite." },
  { name: "Maitama, Abuja", count: 12, image: "/hero_background.jpg", desc: "Diplomatic serenity and premium residential towers." },
  { name: "Ikoyi", count: 31, image: "/hero_background.jpg", desc: "Heritage luxury nested in lush environments." }
];

export default function LocationsPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">

        {/* ── Page Banner ── */}
        <section
          className="relative pt-40 pb-24 flex items-center"
          style={{ background: "url('/hero_background.jpg') center center / cover no-repeat" }}
        >
          <div className="absolute inset-0 bg-brand-dark/70" />
          <div className="container max-w-[1140px] mx-auto px-6 relative z-10 text-center">
            <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-xs mb-4">Our Reach</p>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-4">Prestigious Neighborhoods</h1>
            <p className="text-white/60 text-lg font-sans">
              Discover exclusive properties across West Africa's most prestigious zip codes.
            </p>
          </div>
        </section>

        {/* ── Locations Grid ── */}
        <section className="py-24 bg-[#f9f9f9]">
          <div className="container max-w-[1140px] mx-auto px-6">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-serif text-brand-dark mb-6">Explore by Location</h2>
              <p className="text-brand-dark/50 font-sans leading-relaxed">
                From the bustling business districts of Lagos to the serene diplomatic quarters of Abuja, 
                we curate properties in regions that define luxury living.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((loc, idx) => (
                <Link 
                  href={`/properties?location=${loc.name}`} 
                  key={idx} 
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image 
                      src={loc.image} 
                      alt={loc.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {loc.count} Listings Available
                    </div>

                    {/* Arrow Hover */}
                    <div className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-brand-emerald text-white flex items-center justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <ArrowUpRight size={24} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-8">
                    <h3 className="text-2xl font-serif text-brand-dark mb-2 group-hover:text-brand-emerald transition-colors">{loc.name}</h3>
                    <p className="text-brand-dark/40 text-sm font-sans leading-relaxed line-clamp-2">{loc.desc}</p>
                    
                    <div className="mt-6 flex items-center gap-2 text-brand-emerald text-xs font-black uppercase tracking-widest">
                      <MapPin size={12} />
                      View All Properties
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* ── Partnership CTA ── */}
        <section className="py-24 bg-white">
          <div className="container max-w-[1140px] mx-auto px-6">
            <div className="bg-brand-dark rounded-[40px] p-10 md:p-20 relative overflow-hidden">
              {/* Decorative circle */}
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-emerald/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
                  Establish Your Presence in Nigeria’s <span className="text-brand-emerald">Elite Circles</span>
                </h2>
                <p className="text-white/50 text-lg mb-10 font-sans leading-relaxed">
                  Looking to list a property in one of these iconic neighborhoods? Join our network of premium listings and reach verified high-net-worth investors.
                </p>
                <Link 
                  href="/list-property"
                  className="bg-brand-emerald text-white px-10 py-5 rounded-2xl font-bold hover:bg-brand-emerald-muted transition-all inline-block shadow-xl shadow-brand-emerald/10"
                >
                  List Your Property
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
