"use client";

import React, { useState } from "react";
import { Search, MapPin, ChevronDown, SlidersHorizontal } from "lucide-react";

const tabs = ["Buy", "Rent", "Sell"];

const PropertyFinder = () => {
  const [activeTab, setActiveTab] = useState("Buy");

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Tab Row */}
      <div className="flex items-center gap-1 mb-3 pl-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300 ${
              activeTab === tab
                ? "bg-[#D4AF37] text-black shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
                : "text-white/50 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center bg-white/8 backdrop-blur-2xl border border-white/12 rounded-2xl md:rounded-full overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">

        {/* Location */}
        <div className="flex items-center gap-3 flex-1 px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-white/10">
          <MapPin size={16} className="text-[#D4AF37] shrink-0" />
          <input
            type="text"
            placeholder="City, Area or Address"
            className="w-full bg-transparent text-white text-sm font-light placeholder:text-white/40 outline-none"
          />
        </div>

        {/* Property Type */}
        <div className="relative flex items-center gap-3 flex-1 px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-white/10">
          <SlidersHorizontal size={16} className="text-white/40 shrink-0" />
          <select className="w-full bg-transparent text-white text-sm font-light appearance-none cursor-pointer outline-none [&>option]:bg-[#111] [&>option]:text-white">
            <option value="" disabled selected>Property Type</option>
            <option>Luxury Estate</option>
            <option>Penthouse</option>
            <option>Villa</option>
            <option>Duplex</option>
            <option>Apartment</option>
            <option>Office Space</option>
          </select>
          <ChevronDown size={15} className="absolute right-5 text-white/30 pointer-events-none" />
        </div>

        {/* Budget */}
        <div className="relative flex items-center gap-3 flex-1 px-6 py-4 md:py-5 border-b md:border-b-0 border-white/10">
          <span className="text-white/40 text-sm shrink-0 font-light">₦</span>
          <select className="w-full bg-transparent text-white text-sm font-light appearance-none cursor-pointer outline-none [&>option]:bg-[#111] [&>option]:text-white">
            <option value="" disabled selected>Budget Range</option>
            <option>Under ₦50M</option>
            <option>₦50M – ₦150M</option>
            <option>₦150M – ₦500M</option>
            <option>₦500M – ₦1B</option>
            <option>Above ₦1B</option>
          </select>
          <ChevronDown size={15} className="absolute right-5 text-white/30 pointer-events-none" />
        </div>

        {/* Search Button */}
        <div className="p-2 md:p-2.5 shrink-0">
          <button className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#D4AF37] hover:bg-[#c09b2c] text-black font-black text-[11px] uppercase tracking-[0.25em] rounded-xl md:rounded-full transition-all duration-300 shadow-[0_8px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_35px_rgba(212,175,55,0.6)] active:scale-95">
            <Search size={16} />
            <span>Search</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default PropertyFinder;
