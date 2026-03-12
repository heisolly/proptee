"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function AreaProperties() {
  const filters = ["All", "Dhanmondi", "Banani", "Uttara", "Mirpur", "Basundhara"];

  const areas = [
    { name: "Gazipur", count: 8, image: "/hero_background.jpg", explore: false },
    { name: "Uttara", count: 8, image: "/hero-bg.jpg", explore: false },
    { name: "Mirpur", count: 8, image: "/hero-bg-2.jpg", explore: false },
    { name: "Dhanmondi", count: 12, image: "/hero_background_light.png", explore: false },
    { name: "Banani", count: 5, image: "/hero_background.png", explore: false },
    { name: "Basundhara", count: 15, image: "/hero-bg-3.jpg", explore: true },
  ];

  return (
    <section className="py-24 px-6 lg:px-12 container mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24 mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-sans text-gray-900 leading-tight w-full md:w-1/2">
          Find Properties In These Areas
        </h2>
        <p className="text-gray-500 font-medium leading-relaxed w-full md:w-1/2">
          Find Your Property I've put together more than 50 examples of automated real estate text message scripts to use in your first text messaging campaign.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-start xl:justify-center gap-3 overflow-x-auto pb-6 mb-8 scrollbar-hide">
        {filters.map((filter, idx) => (
          <button
            key={idx}
            className={`whitespace-nowrap px-8 py-3 rounded-full text-sm font-semibold transition-colors border ${
              idx === 0
                ? "bg-[#2F348B] text-white border-[#2F348B]"
                : "bg-white text-gray-500 border-gray-200 hover:border-[#2F348B] hover:text-[#2F348B]"
            }`}
          >
            {filter}
          </button>
        ))}
        <button className="w-12 h-12 shrink-0 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#2F348B] hover:border-[#2F348B] transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {areas.map((area, idx) => (
          <div key={idx} className="relative rounded-[32px] overflow-hidden group h-[450px] cursor-pointer">
            <Image
              src={area.image}
              alt={area.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />

            {/* Content container aligned to the bottom */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              {!area.explore ? (
                <div>
                  <p className="text-white/80 font-medium text-sm mb-1">{area.count} Properties</p>
                  <h3 className="text-white font-bold text-3xl group-hover:-translate-y-2 transition-transform duration-500">
                    {area.name}
                  </h3>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-end justify-center pb-12">
                  <div className="w-24 h-24 rounded-full bg-[#2F348B] text-white flex items-center justify-center animate-spin-slow hover:scale-110 transition-transform shadow-xl">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                        <path id={`curve-area-${idx}`} d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent"/>
                        <text className="text-[10px] font-bold uppercase tracking-widest" fill="currentColor">
                          <textPath href={`#curve-area-${idx}`} startOffset="0">Explore Explore Explore</textPath>
                        </text>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-45">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
