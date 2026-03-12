"use client";

import React from "react";
import Image from "next/image";

const stats = [
  { value: "30+", label: "Satisfied Customer", highlight: false },
  { value: "5k+", label: "Award wining", highlight: true },
  { value: "07+", label: "Years of Experience", highlight: false },
  { value: "33+", label: "Projects Delivered", highlight: false },
];

export default function Advisors() {
  return (
    <section className="py-20 px-6 lg:px-12 container mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24 mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-sans text-gray-900 leading-tight w-full md:w-1/2">
          Your Trusted Real Estate Advisors
        </h2>
        <p className="text-gray-500 font-medium leading-relaxed w-full md:w-1/2">
          Find Your Property I've put together more than 50 examples of automated real estate text message scripts to use in your first text messaging campaign.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl flex flex-col justify-center h-48 transition-all ${
                stat.highlight
                  ? "bg-[#2F348B] text-white"
                  : "bg-[#F3F4FB] text-gray-800"
              }`}
            >
              <h3 className="text-4xl md:text-5xl font-bold mb-4">{stat.value}</h3>
              <p className={`text-base font-medium ${stat.highlight ? "text-white/90" : "text-gray-600"}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Image Collage */}
        <div className="relative h-full min-h-[400px]">
          <div className="absolute top-0 right-0 w-[85%] h-[55%] rounded-2xl overflow-hidden">
            <Image
              src="/hero-bg-2.jpg"
              alt="Real Estate Building"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[65%] h-[60%] rounded-2xl overflow-hidden z-20">
            <Image
              src="/hero_background.jpg"
              alt="Happy Homeowners"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-10 left-[10%] w-[35%] h-[45%] rounded-2xl overflow-hidden z-10 hidden md:block">
            <Image
              src="/hero_background_light.png"
              alt="Living Room"
              fill
              className="object-cover"
            />
          </div>

          {/* Rotating Explore Badge */}
          <div className="absolute top-[40%] left-[40%] z-30 w-24 h-24 rounded-full bg-[#2F348B] text-white flex items-center justify-center -translate-x-1/2 -translate-y-1/2 animate-spin-slow">
            <div className="relative w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                <path id="curve" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent"/>
                <text className="text-[10px] font-bold uppercase tracking-widest" fill="currentColor">
                  <textPath href="#curve" startOffset="0">Explore Explore Explore</textPath>
                </text>
              </svg>
              {/* Inner arrow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-45">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
