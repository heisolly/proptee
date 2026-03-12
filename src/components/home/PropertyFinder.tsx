"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, MapPin, Home, DollarSign, SlidersHorizontal, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownProps {
  label: string;
  icon: React.ReactNode;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

function CustomDropdown({ label, icon, options, value, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-4 relative" ref={dropdownRef}>
      <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-brand-gold">
        {icon} {label}
      </label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="relative border-b border-brand-border py-4 cursor-pointer hover:border-brand-emerald transition-colors group flex items-center justify-between"
      >
        <span className="font-sans font-medium text-brand-dark">{value}</span>
        <div className={`text-brand-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDown size={14} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-[60] mt-2 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-brand-border overflow-hidden p-2"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`px-6 py-4 rounded-xl text-sm font-sans font-medium transition-all cursor-pointer ${
                  value === option 
                    ? "bg-brand-emerald text-white" 
                    : "text-brand-dark-muted hover:bg-brand-bg hover:text-brand-dark"
                }`}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PropertyFinder() {
  const [activeTab, setActiveTab] = useState("buy");
  const [propertyType, setPropertyType] = useState("Luxury Penthouse");
  const [budget, setBudget] = useState("₦500M - ₦1B");

  const typeOptions = [
    "Luxury Penthouse",
    "Waterfront Villa",
    "Modern Duplex",
    "Mansion",
    "Private Estate"
  ];

  const budgetOptions = [
    "₦100M - ₦500M",
    "₦500M - ₦1B",
    "₦1B - ₦5B",
    "₦5B+"
  ];

  return (
    <section className="relative z-30 -mt-20 px-6 md:px-12">
      <div className="container max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[40px] shadow-[0_30px_100px_rgba(12,11,10,0.15)] border border-brand-border overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex bg-brand-bg-pure border-b border-brand-border">
            {["buy", "rent", "shortlet"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-6 text-[10px] font-black uppercase tracking-[0.4em] transition-all relative ${
                  activeTab === tab ? "text-brand-emerald" : "text-brand-muted hover:text-brand-dark"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabProp"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-emerald"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search Inputs */}
          <div className="p-8 md:p-12 lg:p-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Location */}
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-brand-gold">
                <MapPin size={12} /> Location
              </label>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Where are you looking?" 
                  className="w-full bg-transparent border-b border-brand-border py-4 outline-none focus:border-brand-emerald transition-colors font-sans font-medium placeholder:text-brand-muted/50"
                />
              </div>
            </div>

            {/* Property Type - Custom */}
            <CustomDropdown 
              label="Type"
              icon={<Home size={12} />}
              options={typeOptions}
              value={propertyType}
              onChange={setPropertyType}
            />

            {/* Price Range - Custom */}
            <CustomDropdown 
              label="Budget"
              icon={<DollarSign size={12} />}
              options={budgetOptions}
              value={budget}
              onChange={setBudget}
            />

            {/* Search Button */}
            <div className="flex items-end">
              <button className="w-full group bg-brand-dark text-white rounded-2xl py-6 px-8 flex items-center justify-between hover:bg-brand-emerald transition-all duration-500 shadow-xl hover:shadow-brand-emerald/20 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="font-sans font-black uppercase tracking-[0.3em] text-[11px] relative z-10">Find Property</span>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center relative z-10 group-hover:bg-white group-hover:text-brand-emerald transition-all duration-500">
                  <Search size={18} />
                </div>
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="px-8 pb-10 md:px-14 flex flex-wrap items-center gap-8 border-t border-brand-border pt-10">
             <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-muted">Top Tags:</span>
             {["Ocean View", "Smart Home", "Private Pool", "High-rise", "Garden Estate"].map((tag) => (
               <button key={tag} className="text-[10px] font-bold text-brand-dark-muted hover:text-brand-emerald transition-all">
                 #{tag}
               </button>
             ))}
             <button className="ml-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-emerald hover:gap-4 transition-all">
               Advanced Search <ArrowRight size={14} />
             </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
