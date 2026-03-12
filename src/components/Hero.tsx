"use client";

import React from "react";
import Image from "next/image";
import { Search, SlidersHorizontal } from "lucide-react";

const propertyTypes = [
  { image: "/hero_background.jpg", name: "Duplex & Triplex" },
  { image: "/hero-bg.jpg", name: "Apartment & Units" },
  { image: "/hero_background_light.png", name: "Multistorey Buildings" },
  { image: "/hero-bg-2.jpg", name: "Modern Architecture" },
];

export default function Hero() {
  return (
    <section className="relative w-full px-4 lg:px-8 xl:px-12 pt-6">
      {/* Container holding the big image */}
      <div className="relative w-full rounded-[40px] overflow-hidden bg-gray-200" style={{ height: "65vh", minHeight: "500px" }}>
        
        {/* Background Image */}
        <Image
          src="/hero_background.jpg"
          alt="Find Your Properties"
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Hero Content inside the image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center -mt-16">
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
            Find Your Properties
          </h1>
          
          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-md rounded-full px-4 py-3 min-w-[300px] w-full max-w-[650px] flex items-center shadow-2xl">
            <div className="flex-1 flex items-center gap-3 px-4">
              <span className="text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </span>
              <input 
                type="text" 
                placeholder="Find Your Property" 
                className="w-full bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400 font-medium"
              />
            </div>
            
            <div className="w-px h-8 bg-gray-200 mx-2" />
            
            <button className="px-4 text-gray-400 hover:text-gray-600 transition-colors">
              <SlidersHorizontal size={20} />
            </button>
            
            <button className="w-12 h-12 rounded-full bg-[#2F348B] hover:bg-[#252a78] text-white flex items-center justify-center transition-colors shadow-lg">
              <Search size={22} className="stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlapping Bottom Cards */}
      <div className="container mx-auto max-w-7xl -mt-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4 bg-transparent">
          {propertyTypes.map((type, idx) => (
            <div key={idx} className={`rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] bg-white cursor-pointer group flex flex-col ${idx === 1 ? 'border-2 border-[#2F348B]/20' : ''}`}>
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={type.image}
                  alt={type.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-4 text-center bg-white">
                <h3 className="font-semibold text-gray-800 text-sm group-hover:text-[#2F348B] transition-colors">{type.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
