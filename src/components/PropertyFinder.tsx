"use client";

import React, { useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";

const PropertyFinder = () => {
  const [activeTab, setActiveTab] = useState("For Rent");

  const tabs = ["For Lease", "For Rent", "For Sale"];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Selection Tabs (Radio Style) */}
      <div className="flex mb-[-1px]">
        <div className="bg-white px-8 py-5 rounded-t-[2rem] border-t border-x border-gray-100 flex items-center gap-8 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex items-center gap-3 group transition-all"
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                activeTab === tab 
                  ? "border-[#111827] bg-[#111827]" 
                  : "border-gray-300 group-hover:border-[#111827]"
              }`}>
                {activeTab === tab && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                )}
              </div>
              <span className={`text-[13px] font-black uppercase tracking-wider transition-colors ${
                activeTab === tab ? "text-[#111827]" : "text-gray-400 group-hover:text-gray-600"
              }`}>
                {tab}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Search Console */}
      <div className="bg-white rounded-b-[2rem] rounded-tr-[2rem] border border-gray-100 shadow-[0_45px_100px_rgba(0,0,0,0.1)] p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          
          {/* Keyword Field */}
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Enter Keyword" 
              className="w-full bg-[#F3F4F6] border-none rounded-2xl py-5 px-6 text-[#111827] text-sm font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-200 transition-all"
            />
          </div>

          {/* Property Type Field */}
          <div className="relative group">
            <select className="w-full bg-[#F3F4F6] border-none rounded-2xl py-5 px-6 text-[#111827] text-sm font-medium appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-gray-200 transition-all">
              <option>Property Type</option>
              <option>Apartments</option>
              <option>Villas</option>
              <option>Penthouses</option>
              <option>Office Space</option>
            </select>
            <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gray-600 transition-colors" />
          </div>

          {/* Location Field */}
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Location" 
              className="w-full bg-[#F3F4F6] border-none rounded-2xl py-5 px-6 pr-12 text-[#111827] text-sm font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-200 transition-all"
            />
            <MapPin size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#F26422]" />
          </div>

          {/* Search Button */}
          <button className="w-full bg-[#F26422] hover:bg-[#D9531E] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(242,100,34,0.3)] hover:shadow-[0_20px_40px_rgba(242,100,34,0.4)] transition-all duration-300 transform active:scale-[0.98]">
            Search Property
          </button>

        </div>
      </div>
    </div>
  );
};

export default PropertyFinder;
