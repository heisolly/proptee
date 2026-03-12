"use client";

import React from "react";
import Image from "next/image";
import { Bed, Bath, Square, MapPin } from "lucide-react";

export default function PerfectMatch() {
  const properties = [
    {
      name: "Skyper Pool Apartment",
      location: "Road 12, Dhanmondi, Dhaka",
      price: "BDT 1,45,0000",
      beds: 4,
      baths: 4,
      area: 230,
      image: "/hero_background.png",
      showDetails: true,
    },
    {
      name: "Cedar Residence",
      location: "Road 12, Uttara, Dhaka",
      price: "BDT 1,25,0000",
      beds: 4,
      baths: 4,
      area: 230,
      image: "/hero-bg-2.jpg",
      showDetails: true,
    },
    {
      name: "Lakeside Apartment",
      location: "Road 12, Dhanmondi, Dhaka",
      price: "BDT 1,45,0000",
      beds: 8,
      baths: 6,
      area: 360,
      image: "/hero_background_light.png",
      showDetails: true,
    },
    {
      name: "Luxury Tower",
      location: "Gulshan, Dhaka",
      price: "BDT 2,00,0000",
      beds: 5,
      baths: 5,
      area: 400,
      image: "/hero_background.jpg",
      showDetails: false,
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-12 container mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24 mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-sans text-gray-900 leading-tight w-full md:w-1/2">
          Discover Your Perfect Property Match
        </h2>
        <p className="text-gray-500 font-medium leading-relaxed w-full md:w-1/2">
          Find Your Property I've put together more than 50 examples of automated real estate text message scripts to use in your first text messaging campaign.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {properties.map((prop, idx) => (
          <div key={idx} className="relative rounded-[32px] overflow-hidden group min-h-[400px]">
            <Image
              src={prop.image}
              alt={prop.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-black/20" />

            {prop.showDetails ? (
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{prop.name}</h3>
                  <div className="flex items-center gap-2 text-gray-500 mb-6">
                    <MapPin size={16} className="text-[#2F348B]" />
                    <span className="text-sm font-medium">{prop.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <span className="text-red-500 font-bold text-lg">{prop.price}</span>
                    <div className="flex items-center gap-4 text-gray-600 text-sm font-semibold">
                      <div className="flex items-center gap-1.5 text-[#2F348B]">
                        <Bed size={16} /> <span>{prop.beds}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#2F348B]">
                        <Bath size={16} /> <span>{prop.baths}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#2F348B]">
                        <Square size={16} /> <span>{prop.area} ft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[#2F348B] text-white flex items-center justify-center animate-spin-slow cursor-pointer hover:scale-110 transition-transform shadow-xl">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                      <path id={`curve-${idx}`} d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent"/>
                      <text className="text-[10px] font-bold uppercase tracking-widest" fill="currentColor">
                        <textPath href={`#curve-${idx}`} startOffset="0">Explore Explore Explore</textPath>
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
        ))}
      </div>
    </section>
  );
}
