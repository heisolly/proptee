"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  Building2, 
  X, 
  Home, 
  Landmark, 
  Building, 
  Trees, 
  ArrowLeft,
  Banknote,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "@/context/SearchContext";

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
  { value: "banana", label: "Banana Island", sub: "Lagos", popular: true },
  { value: "abuja", label: "Abuja", sub: "FCT", popular: true },
  { value: "ibadan", label: "Ibadan", sub: "Oyo", popular: true },
  { value: "portharcourt", label: "Port Harcourt", sub: "Rivers", popular: true },
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

type SearchStep = "where" | "what" | "budget";

export default function SearchModal() {
  const { isSearchOpen, closeSearch, searchData, setSearchData } = useSearch();
  const [step, setStep] = useState<SearchStep>("where");
  const [locationQuery, setLocationQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
      setStep("where");
      setLocationQuery("");
    } else {
      document.body.style.overflow = "";
    }
  }, [isSearchOpen]);

  // Focus location input when "where" step opens
  useEffect(() => {
    if (isSearchOpen && step === "where") {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isSearchOpen, step]);

  const filteredLocations = useMemo(() => {
    if (!locationQuery.trim()) return locations;
    const q = locationQuery.toLowerCase();
    return locations.filter(l =>
      l.label.toLowerCase().includes(q) || l.sub.toLowerCase().includes(q)
    );
  }, [locationQuery]);

  const handleLocationSelect = useCallback((val: string) => {
    setSearchData({ location: val });
    setStep("what");
  }, [setSearchData]);

  const handleTypeSelect = useCallback((val: string) => {
    setSearchData({ type: val });
    setStep("budget");
  }, [setSearchData]);

  const handleBudgetSelect = useCallback((val: string) => {
    setSearchData({ budget: val });
  }, [setSearchData]);

  const stepOrder: SearchStep[] = ["where", "what", "budget"];
  const stepIndex = stepOrder.indexOf(step);

  const goBack = () => {
    if (stepIndex > 0) setStep(stepOrder[stepIndex - 1]);
    else closeSearch();
  };

  const getStepProgress = () => {
    return ((stepIndex + 1) / stepOrder.length) * 100;
  };

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] bg-white flex flex-col font-sans"
      >
        {/* ─ Header ─ */}
        <div className="flex items-center justify-between px-6 pt-12 pb-4">
          <button
            onClick={goBack}
            className="w-10 h-10 rounded-full border border-gray-100 bg-white flex items-center justify-center text-gray-500 shadow-sm active:scale-90 transition-transform"
          >
            {stepIndex === 0 ? <X size={20} /> : <ArrowLeft size={20} />}
          </button>

          {/* Progress Indicator */}
          <div className="flex gap-1.5">
            {stepOrder.map((s, i) => (
              <div
                key={s}
                className={`h-[4px] rounded-full transition-all duration-500 ${
                  i <= stepIndex ? "bg-brand-emerald w-6" : "bg-gray-200 w-2.5"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              if (step === "where") setStep("what");
              else if (step === "what") setStep("budget");
              else closeSearch();
            }}
            className="text-[13px] font-bold text-gray-400 hover:text-brand-dark px-2"
          >
            {step === "budget" ? "Done" : "Skip"}
          </button>
        </div>

        {/* ─ Purpose Tabs ─ */}
        <div className="px-6 pb-6">
          <div className="bg-gray-50/80 rounded-2xl p-1 flex border border-gray-100 shadow-sm">
            {purposes.map((p) => (
              <button
                key={p.value}
                onClick={() => setSearchData({ purpose: p.value })}
                className="flex-1 relative py-3 rounded-xl text-[14px] font-bold transition-all"
              >
                {searchData.purpose === p.value && (
                  <motion.div
                    layoutId="currentPurposeTab"
                    className="absolute inset-0 bg-brand-emerald rounded-xl shadow-lg shadow-brand-emerald/20"
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  />
                )}
                <span className={`relative z-10 ${
                  searchData.purpose === p.value ? "text-white" : "text-gray-400"
                }`}>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ─ Step Content ─ */}
        <div className="flex-1 overflow-y-auto px-6 pb-40">
          <AnimatePresence mode="wait">
            {step === "where" && (
              <motion.div
                key="where"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-3xl font-black text-brand-dark tracking-tight">Where to?</h2>
                  <p className="text-gray-400 text-sm">Find your perfect location</p>
                </div>

                {/* Search Bar */}
                <div className="relative group">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-brand-emerald transition-colors" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="Search destinations..."
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-[15px] text-brand-dark placeholder:text-gray-300 focus:outline-none focus:border-brand-emerald/40 focus:bg-white transition-all shadow-sm"
                  />
                </div>

                {/* List */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-black/5 overflow-hidden">
                   <button
                    onClick={() => { setSearchData({ location: "" }); setStep("what"); }}
                    className="w-full flex items-center gap-4 px-6 py-5 hover:bg-gray-50/50 transition-colors border-b border-gray-50"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-brand-emerald/5 flex items-center justify-center">
                      <MapPin size={22} className="text-brand-emerald" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-brand-dark">I&apos;m flexible</p>
                      <p className="text-xs text-gray-400">Search all locations in Nigeria</p>
                    </div>
                  </button>

                  <div className="divide-y divide-gray-50">
                    {filteredLocations.map((loc) => (
                      <button
                        key={loc.value}
                        onClick={() => handleLocationSelect(loc.value)}
                        className={`w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50/50 transition-colors text-left ${
                           searchData.location === loc.value ? "bg-brand-emerald/5" : ""
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            searchData.location === loc.value ? "bg-brand-emerald text-white" : "bg-gray-100 text-gray-400"
                          }`}>
                            <MapPin size={20} />
                          </div>
                          <div>
                            <p className={`font-bold ${searchData.location === loc.value ? "text-brand-emerald" : "text-brand-dark"}`}>{loc.label}</p>
                            <p className="text-xs text-gray-400">{loc.sub}</p>
                          </div>
                        </div>
                        {loc.popular && (
                          <span className="text-[10px] font-black uppercase tracking-widest text-brand-emerald/40 bg-brand-emerald/5 px-3 py-1.5 rounded-full">Popular</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === "what" && (
              <motion.div
                key="what"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-1">
                  <h2 className="text-3xl font-black text-brand-dark tracking-tight">What type?</h2>
                  <p className="text-gray-400 text-sm">Choose your property style</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {types.map((t, i) => {
                    const Icon = t.icon;
                    return (
                      <motion.button
                        key={t.value}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => handleTypeSelect(t.value)}
                        className={`relative flex flex-col items-center gap-4 p-8 rounded-[2.5rem] border-2 transition-all active:scale-95 ${
                          searchData.type === t.value 
                            ? "border-brand-emerald bg-brand-emerald/5" 
                            : "border-gray-50 bg-gray-50/50"
                        }`}
                      >
                        {searchData.type === t.value && (
                          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-brand-emerald flex items-center justify-center shadow-lg shadow-brand-emerald/20 text-white">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}
                        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-sm ${
                           searchData.type === t.value ? "bg-brand-emerald text-white" : "bg-white text-gray-300"
                        }`}>
                          <Icon size={32} strokeWidth={1.5} />
                        </div>
                        <span className={`text-[15px] font-bold ${
                          searchData.type === t.value ? "text-brand-emerald" : "text-brand-dark"
                        }`}>{t.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => { setSearchData({ type: "" }); setStep("budget"); }}
                  className="w-full py-4 text-gray-400 font-bold hover:text-brand-dark transition-colors"
                >
                  Any type is fine
                </button>
              </motion.div>
            )}

            {step === "budget" && (
              <motion.div
                key="budget"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-1">
                   <h2 className="text-3xl font-black text-brand-dark tracking-tight">Budget range</h2>
                   <p className="text-gray-400 text-sm">What&apos;s your price range?</p>
                </div>

                <div className="space-y-3">
                  {budgets.map((b, i) => (
                    <motion.button
                      key={b.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleBudgetSelect(b.value)}
                      className={`w-full flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all active:scale-[0.98] ${
                        searchData.budget === b.value 
                          ? "border-brand-emerald bg-brand-emerald/5" 
                          : "border-gray-50 bg-gray-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          searchData.budget === b.value ? "bg-brand-emerald text-white" : "bg-white text-gray-300"
                        }`}>
                          <Banknote size={24} strokeWidth={1.5} />
                        </div>
                        <span className={`text-[15px] font-bold ${
                          searchData.budget === b.value ? "text-brand-emerald" : "text-brand-dark"
                        }`}>{b.label}</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                         searchData.budget === b.value ? "bg-brand-emerald border-brand-emerald" : "border-gray-200"
                      }`}>
                         {searchData.budget === b.value && <Check size={14} className="text-white" strokeWidth={4} />}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <button
                  onClick={() => setSearchData({ budget: "" })}
                  className="w-full py-4 text-gray-400 font-bold hover:text-brand-dark transition-colors"
                >
                  Any budget is fine
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─ Sticky Footer ─ */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-6 flex items-center justify-between pb-10 z-[310]">
          <button
            onClick={() => {
              setSearchData({ location: "", type: "", budget: "" });
              setStep("where");
            }}
            className="text-[14px] font-bold text-gray-400 underline underline-offset-4 decoration-2 hover:text-brand-dark transition-colors"
          >
            Clear all
          </button>

          <Link
            href={`/properties?purpose=${searchData.purpose}&location=${searchData.location}&type=${searchData.type}&budget=${searchData.budget}`}
            onClick={closeSearch}
            className="flex items-center gap-3 bg-brand-dark text-white px-10 py-5 rounded-2xl font-black text-[15px] shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Search size={20} strokeWidth={3} />
            Show results
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
