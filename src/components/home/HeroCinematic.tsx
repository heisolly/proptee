"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { Search, MapPin, Building2, X, Home, Landmark, Building, Trees, ChevronRight, Banknote, SlidersHorizontal, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ────────────────────────────────────────────────── */

const purposes = [
  { value: "buy", label: "Buy", desc: "Purchase a property" },
  { value: "rent", label: "Rent", desc: "Monthly/yearly rental" },
  { value: "shortlet", label: "Shortlet", desc: "Short-term stay" },
];

const locations = [
  { value: "lekki", label: "Lekki", sub: "Lagos", popular: true },
  { value: "ikoyi", label: "Ikoyi", sub: "Lagos", popular: true },
  { value: "vi", label: "Victoria Island", sub: "Lagos", popular: true },
  { value: "banana", label: "Banana Island", sub: "Lagos", popular: false },
  { value: "abuja", label: "Abuja", sub: "FCT", popular: true },
  { value: "ibadan", label: "Ibadan", sub: "Oyo", popular: false },
  { value: "portharcourt", label: "Port Harcourt", sub: "Rivers", popular: false },
];

const types = [
  { value: "house", label: "House", icon: Home },
  { value: "apartment", label: "Apartment", icon: Building },
  { value: "villa", label: "Villa", icon: Landmark },
  { value: "penthouse", label: "Penthouse", icon: Building2 },
  { value: "land", label: "Land", icon: Trees },
];

const budgets = [
  { value: "0-50m", label: "Under ₦50M" },
  { value: "50m-100m", label: "₦50M – ₦100M" },
  { value: "100m-250m", label: "₦100M – ₦250M" },
  { value: "250m-500m", label: "₦250M – ₦500M" },
  { value: "500m+", label: "₦500M+" },
];

/* ─── Full-Screen Search Modal (Airbnb-style) ─────────────── */

type SearchStep = "where" | "what" | "budget";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  purpose: string;
  setPurpose: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  budget: string;
  setBudget: (v: string) => void;
}

function SearchModal({
  isOpen, onClose,
  purpose, setPurpose,
  location, setLocation,
  type, setType,
  budget, setBudget,
}: SearchModalProps) {
  const [step, setStep] = useState<SearchStep>("where");
  const [locationQuery, setLocationQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset to first step on open
      setStep("where");
      setLocationQuery("");
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Focus location input when "where" step opens
  useEffect(() => {
    if (isOpen && step === "where") {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen, step]);

  const filteredLocations = useMemo(() => {
    if (!locationQuery.trim()) return locations;
    const q = locationQuery.toLowerCase();
    return locations.filter(l =>
      l.label.toLowerCase().includes(q) || l.sub.toLowerCase().includes(q)
    );
  }, [locationQuery]);

  const locationLabel = locations.find(l => l.value === location)?.label;
  const typeLabel = types.find(t => t.value === type)?.label;
  const budgetLabel = budgets.find(b => b.value === budget)?.label;
  const filledCount = [location, type].filter(Boolean).length;

  const handleLocationSelect = useCallback((val: string) => {
    setLocation(val);
    setStep("what");
  }, [setLocation]);

  const handleTypeSelect = useCallback((val: string) => {
    setType(val);
    setStep("budget");
  }, [setType]);

  const handleBudgetSelect = useCallback((val: string) => {
    setBudget(val);
  }, [setBudget]);

  const stepOrder: SearchStep[] = ["where", "what", "budget"];
  const stepIndex = stepOrder.indexOf(step);

  const goBack = () => {
    if (stepIndex > 0) setStep(stepOrder[stepIndex - 1]);
    else onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[300] md:hidden"
        >
          {/* Background */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="absolute inset-0 bg-[#f7f7f7] flex flex-col"
          >
            {/* ─ Header ─ */}
            <div className="flex items-center justify-between px-5 pt-[max(env(safe-area-inset-top,12px),12px)] pb-3">
              <button
                onClick={goBack}
                className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 active:scale-90 active:bg-gray-50 transition-all shadow-sm"
              >
                {stepIndex === 0 ? <X size={17} /> : <ArrowLeft size={17} />}
              </button>

              {/* Step dots */}
              <div className="flex gap-1.5">
                {stepOrder.map((s, i) => (
                  <div
                    key={s}
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      i <= stepIndex ? "bg-brand-emerald w-5" : "bg-gray-300 w-2"
                    }`}
                  />
                ))}
              </div>

              {/* Skip label */}
              <button
                onClick={() => {
                  if (step === "where") setStep("what");
                  else if (step === "what") setStep("budget");
                }}
                className="text-xs font-semibold text-gray-400 active:text-gray-600 transition-colors px-1"
              >
                {step !== "budget" ? "Skip" : ""}
              </button>
            </div>

            {/* Purpose Tabs - always visible */}
            <div className="px-5 pb-4">
              <div className="bg-white rounded-xl p-1 flex shadow-sm border border-gray-100">
                {purposes.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPurpose(p.value)}
                    className="flex-1 relative py-2.5 rounded-lg text-[13px] font-semibold transition-all"
                  >
                    {purpose === p.value && (
                      <motion.div
                        layoutId="searchPurposeTab"
                        className="absolute inset-0 bg-brand-emerald rounded-lg shadow-sm"
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      />
                    )}
                    <span className={`relative z-10 ${
                      purpose === p.value ? "text-white" : "text-gray-500"
                    }`}>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ─ Step Content (scrollable) ─ */}
            <div className="flex-1 overflow-y-auto px-5 pb-32">
              <AnimatePresence mode="wait">
                {/* ─── STEP: WHERE ─── */}
                {step === "where" && (
                  <motion.div
                    key="where"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="p-5 pb-4">
                        <h2 className="text-[1.35rem] font-bold text-brand-dark tracking-tight">Where to?</h2>
                        <p className="text-sm text-gray-400 mt-0.5">Search destinations</p>
                      </div>

                      {/* Search Input */}
                      <div className="px-5 pb-4">
                        <div className="relative">
                          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input
                            ref={inputRef}
                            type="text"
                            value={locationQuery}
                            onChange={(e) => setLocationQuery(e.target.value)}
                            placeholder="Search locations"
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-2xl text-sm text-brand-dark placeholder:text-gray-300 border border-gray-100 focus:outline-none focus:border-brand-emerald/30 focus:ring-2 focus:ring-brand-emerald/10 transition-all"
                          />
                          {locationQuery && (
                            <button
                              onClick={() => setLocationQuery("")}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center"
                            >
                              <X size={10} className="text-gray-500" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* "I'm flexible" option */}
                      <button
                        onClick={() => { setLocation(""); setStep("what"); }}
                        className="w-full flex items-center gap-3 px-5 py-3.5 border-t border-gray-50 active:bg-gray-50 transition-colors text-left"
                      >
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-emerald/10 to-brand-emerald/5 flex items-center justify-center">
                          <MapPin size={18} className="text-brand-emerald" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-brand-dark">I&apos;m flexible</p>
                          <p className="text-[11px] text-gray-400">Show me properties everywhere</p>
                        </div>
                      </button>

                      {/* Location list */}
                      <div className="border-t border-gray-50">
                        {filteredLocations.length === 0 && (
                          <p className="text-sm text-gray-400 text-center py-8">No locations found</p>
                        )}
                        {filteredLocations.map((loc, i) => (
                          <button
                            key={loc.value}
                            onClick={() => handleLocationSelect(loc.value)}
                            className={`w-full flex items-center gap-3 px-5 py-3.5 active:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-b-0 ${
                              location === loc.value ? "bg-brand-emerald/5" : ""
                            }`}
                          >
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                              location === loc.value
                                ? "bg-brand-emerald"
                                : "bg-gray-100"
                            }`}>
                              <MapPin size={16} className={location === loc.value ? "text-white" : "text-gray-400"} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-semibold ${location === loc.value ? "text-brand-emerald" : "text-brand-dark"}`}>{loc.label}</p>
                              <p className="text-[11px] text-gray-400">{loc.sub}</p>
                            </div>
                            {loc.popular && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-emerald/60 bg-brand-emerald/8 px-2 py-0.5 rounded-full">Popular</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Recent searches section */}
                    <div className="mt-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3 px-1">Suggested</p>
                      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                        {locations.filter(l => l.popular).map((loc) => (
                          <button
                            key={loc.value}
                            onClick={() => handleLocationSelect(loc.value)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-2xl whitespace-nowrap text-sm font-medium transition-all active:scale-95 ${
                              location === loc.value
                                ? "bg-brand-emerald text-white shadow-md"
                                : "bg-white text-brand-dark border border-gray-100 shadow-sm"
                            }`}
                          >
                            <MapPin size={14} className={location === loc.value ? "text-white/70" : "text-brand-emerald"} />
                            {loc.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP: WHAT ─── */}
                {step === "what" && (
                  <motion.div
                    key="what"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-5">
                      <h2 className="text-[1.35rem] font-bold text-brand-dark tracking-tight">What type?</h2>
                      <p className="text-sm text-gray-400 mt-0.5 mb-5">Choose your property style</p>

                      <div className="grid grid-cols-2 gap-3">
                        {types.map((t, i) => {
                          const Icon = t.icon;
                          const isSelected = type === t.value;
                          return (
                            <motion.button
                              key={t.value}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.06 }}
                              onClick={() => handleTypeSelect(t.value)}
                              className={`relative flex flex-col items-center gap-3 py-6 px-3 rounded-2xl border-2 transition-all active:scale-[0.96] ${
                                isSelected
                                  ? "border-brand-emerald bg-brand-emerald/5"
                                  : "border-gray-100 bg-gray-50/50"
                              }`}
                            >
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-brand-emerald flex items-center justify-center"
                                >
                                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </motion.div>
                              )}
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                                isSelected ? "bg-brand-emerald/10" : "bg-white"
                              }`}>
                                <Icon size={24} strokeWidth={1.5} className={isSelected ? "text-brand-emerald" : "text-gray-400"} />
                              </div>
                              <span className={`text-sm font-semibold ${isSelected ? "text-brand-emerald" : "text-brand-dark"}`}>{t.label}</span>
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Any type option */}
                      <button
                        onClick={() => { setType(""); setStep("budget"); }}
                        className="w-full mt-3 py-3.5 text-sm font-semibold text-gray-400 active:text-gray-600 transition-colors text-center"
                      >
                        Any type is fine
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP: BUDGET ─── */}
                {step === "budget" && (
                  <motion.div
                    key="budget"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-5">
                      <h2 className="text-[1.35rem] font-bold text-brand-dark tracking-tight">Budget range</h2>
                      <p className="text-sm text-gray-400 mt-0.5 mb-5">What&apos;s your price range?</p>

                      <div className="space-y-2">
                        {budgets.map((b, i) => {
                          const isSelected = budget === b.value;
                          return (
                            <motion.button
                              key={b.value}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              onClick={() => handleBudgetSelect(b.value)}
                              className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl border-2 transition-all active:scale-[0.98] ${
                                isSelected
                                  ? "border-brand-emerald bg-brand-emerald/5"
                                  : "border-gray-100 bg-gray-50/50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                  isSelected ? "bg-brand-emerald/10" : "bg-white"
                                }`}>
                                  <Banknote size={18} className={isSelected ? "text-brand-emerald" : "text-gray-400"} />
                                </div>
                                <span className={`text-sm font-semibold ${isSelected ? "text-brand-emerald" : "text-brand-dark"}`}>{b.label}</span>
                              </div>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                isSelected ? "border-brand-emerald bg-brand-emerald" : "border-gray-200"
                              }`}>
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                  >
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                  </motion.div>
                                )}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setBudget("")}
                        className="w-full mt-3 py-3.5 text-sm font-semibold text-gray-400 active:text-gray-600 transition-colors text-center"
                      >
                        Any budget
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ─ Sticky Bottom Bar ─ */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4 flex items-center justify-between"
              style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 16px) + 16px)" }}
            >
              {/* Clear all */}
              <button
                onClick={() => {
                  setLocation(""); setType(""); setBudget("");
                }}
                className="text-sm font-semibold text-gray-500 underline underline-offset-2 active:text-gray-800 transition-colors"
              >
                Clear all
              </button>

              {/* Search CTA */}
              <Link
                href={`/properties?purpose=${purpose}&location=${location}&type=${type}&budget=${budget}`}
                onClick={onClose}
                className="flex items-center gap-2.5 bg-brand-emerald text-white px-7 py-3.5 rounded-xl font-bold text-[0.9rem] active:scale-[0.96] transition-all shadow-lg shadow-brand-emerald/25"
              >
                <Search size={16} strokeWidth={2.5} />
                Search
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Hero Component ───────────────────────────────────── */

export default function HeroCinematic() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [purpose, setPurpose] = useState("buy");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");

  // Desktop dropdown state
  const [desktopDropdown, setDesktopDropdown] = useState<"purpose" | "location" | "type" | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDesktopDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const purposeLabel = purposes.find(p => p.value === purpose)?.label || "Purpose";
  const locationLabel = locations.find(l => l.value === location)?.label || "Location";
  const typeLabel = types.find(t => t.value === type)?.label || "Type";

  return (
    <section className="relative min-h-[100svh] flex items-end pb-10 md:items-center md:pb-0 pt-0 md:pt-20" style={{ background: "url('/hero_background.jpg') center center / cover no-repeat" }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 md:bg-brand-dark/60" />

      <div className="w-full px-5 md:px-8 lg:max-w-[1140px] lg:mx-auto relative z-10">
        <div className="max-w-3xl mx-auto">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[2.25rem] leading-[1.08] md:text-6xl lg:text-8xl text-white mb-3 md:mb-6 tracking-tight text-center"
            style={{ fontFamily: "var(--font-handwriting), 'Dancing Script', cursive" }}
          >
            Find Your Dream Home With Ease
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/70 text-[0.95rem] md:text-lg mb-8 md:mb-10 leading-relaxed font-sans max-w-md mx-auto text-center"
          >
            Seamless property transactions with our expert team.
          </motion.p>

          {/* ═══════════════════════════════════════════════
              MOBILE — Compact Airbnb-style search pill
              ═══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:hidden"
          >
            {/* Search Pill — tapping opens full-screen */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full bg-white rounded-full flex items-center gap-3 px-4 py-3.5 shadow-2xl shadow-black/15 active:scale-[0.98] transition-transform text-left"
            >
              <div className="w-10 h-10 rounded-full bg-brand-emerald flex items-center justify-center shrink-0">
                <Search size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-brand-dark leading-tight">Where to?</p>
                <p className="text-[11px] text-gray-400 leading-tight mt-0.5 truncate">
                  {[
                    location ? locations.find(l => l.value === location)?.label : "Anywhere",
                    type ? types.find(t => t.value === type)?.label : "Any type",
                    budget ? budgets.find(b => b.value === budget)?.label : "Any price"
                  ].join(" · ")}
                </p>
              </div>
              <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
                <SlidersHorizontal size={15} className="text-gray-600" />
              </div>
            </button>

            {/* Quick Location Chips below pill */}
            <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-1 px-1">
              {locations.filter(l => l.popular).map((loc) => (
                <motion.button
                  key={loc.value}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => { setLocation(loc.value); setSearchOpen(true); }}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
                    location === loc.value
                      ? "bg-white text-brand-emerald shadow-md"
                      : "bg-white/12 text-white/70 backdrop-blur-md border border-white/10"
                  }`}
                >
                  <MapPin size={12} />
                  {loc.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Full-screen search modal (mobile only) */}
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            purpose={purpose}
            setPurpose={setPurpose}
            location={location}
            setLocation={setLocation}
            type={type}
            setType={setType}
            budget={budget}
            setBudget={setBudget}
          />

          {/* ═══════════════════════════════════════════════
              DESKTOP SEARCH — Inline pill with dropdowns
              ═══════════════════════════════════════════════ */}
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block"
          >
            <div className="bg-white rounded-full flex items-stretch shadow-2xl border border-white/20 relative">
              {/* Purpose */}
              <div className="relative flex-1">
                <button
                  onClick={() => setDesktopDropdown(desktopDropdown === "purpose" ? null : "purpose")}
                  className="w-full flex items-center gap-3 px-6 py-5 rounded-l-full hover:bg-gray-50/50 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-emerald/8 flex items-center justify-center shrink-0">
                    <Search size={15} className="text-brand-emerald" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Purpose</p>
                    <p className={`text-sm font-medium ${purpose ? "text-brand-dark" : "text-gray-400"}`}>{purposeLabel}</p>
                  </div>
                </button>
                <AnimatePresence>
                  {desktopDropdown === "purpose" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 p-2"
                    >
                      {purposes.map((p) => (
                        <button
                          key={p.value}
                          onClick={() => { setPurpose(p.value); setDesktopDropdown(null); }}
                          className={`w-full text-left px-4 py-3.5 rounded-xl transition-colors ${
                            purpose === p.value ? "bg-brand-emerald text-white" : "hover:bg-gray-50 text-brand-dark"
                          }`}
                        >
                          <p className="text-sm font-medium">{p.label}</p>
                          <p className={`text-xs mt-0.5 ${purpose === p.value ? "text-white/70" : "text-gray-400"}`}>{p.desc}</p>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-px bg-gray-100 my-3" />

              {/* Location */}
              <div className="relative flex-1">
                <button
                  onClick={() => setDesktopDropdown(desktopDropdown === "location" ? null : "location")}
                  className="w-full flex items-center gap-3 px-6 py-5 hover:bg-gray-50/50 transition-colors text-left"
                >
                  <MapPin size={16} className="text-gray-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Location</p>
                    <p className={`text-sm font-medium ${location ? "text-brand-dark" : "text-gray-400"}`}>{locationLabel}</p>
                  </div>
                </button>
                <AnimatePresence>
                  {desktopDropdown === "location" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 p-2"
                    >
                      {locations.map((loc) => (
                        <button
                          key={loc.value}
                          onClick={() => { setLocation(loc.value); setDesktopDropdown(null); }}
                          className={`w-full text-left px-4 py-3.5 rounded-xl transition-colors flex items-center justify-between ${
                            location === loc.value ? "bg-brand-emerald text-white" : "hover:bg-gray-50 text-brand-dark"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <MapPin size={14} className={location === loc.value ? "text-white/70" : "text-gray-300"} />
                            <span className="text-sm font-medium">{loc.label}</span>
                          </div>
                          <span className={`text-xs ${location === loc.value ? "text-white/60" : "text-gray-400"}`}>{loc.sub}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-px bg-gray-100 my-3" />

              {/* Type */}
              <div className="relative flex-1">
                <button
                  onClick={() => setDesktopDropdown(desktopDropdown === "type" ? null : "type")}
                  className="w-full flex items-center gap-3 px-6 py-5 hover:bg-gray-50/50 transition-colors text-left"
                >
                  <Building2 size={16} className="text-gray-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Type</p>
                    <p className={`text-sm font-medium ${type ? "text-brand-dark" : "text-gray-400"}`}>{typeLabel}</p>
                  </div>
                </button>
                <AnimatePresence>
                  {desktopDropdown === "type" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 p-2"
                    >
                      {types.map((t) => {
                        const Icon = t.icon;
                        return (
                          <button
                            key={t.value}
                            onClick={() => { setType(t.value); setDesktopDropdown(null); }}
                            className={`w-full text-left px-4 py-3.5 rounded-xl transition-colors flex items-center gap-3 ${
                              type === t.value ? "bg-brand-emerald text-white" : "hover:bg-gray-50 text-brand-dark"
                            }`}
                          >
                            <Icon size={16} className={type === t.value ? "text-white/70" : "text-gray-300"} />
                            <span className="text-sm font-medium">{t.label}</span>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search Button */}
              <div className="p-2 shrink-0">
                <Link
                  href={`/properties?purpose=${purpose}&location=${location}&type=${type}`}
                  className="h-full bg-brand-emerald text-white flex items-center justify-center gap-2 px-8 rounded-full font-semibold text-sm hover:bg-brand-emerald-muted active:scale-[0.97] transition-all shadow-lg shadow-brand-emerald/20"
                >
                  <Search size={18} />
                  <span>Search</span>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
