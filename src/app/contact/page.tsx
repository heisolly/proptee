"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, Clock, Globe, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const contactDetails = [
  {
    icon: MapPin,
    title: "Global Headquarters",
    lines: ["15B Admiralty Way,", "Lekki Phase 1, Lagos, Nigeria"],
  },
  {
    icon: Phone,
    title: "Liaison Hotline",
    lines: ["+234 (0) 800 123 4567", "+234 (0) 800 765 4321"],
  },
  {
    icon: Mail,
    title: "Digital Correspondence",
    lines: ["concierge@proptee.ng", "partners@proptee.ng"],
  },
  {
    icon: Clock,
    title: "Availability Queue",
    lines: ["Mon – Fri: 8:00AM – 6:00PM", "Sat: 10:00AM – 2:00PM"],
  },
];

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState("Acquisition");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen text-brand-dark overflow-hidden">

        {/* ── Cinematic Banner ── */}
        <section className="relative h-[60vh] flex items-center overflow-hidden">
          <Image 
            src="/proptee_entrance_narrative_1773291875530.png" 
            alt="Concierge Gateway" 
            fill 
            className="object-cover scale-105 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-brand-dark/20" />
          
          <div className="container max-w-[1140px] mx-auto px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-[1px] bg-brand-emerald" />
                 <p className="text-brand-emerald font-black uppercase tracking-[0.5em] text-[10px]">Contact Concierge</p>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-brand-dark leading-tight mb-4">
                Liaison <span className="text-brand-emerald italic">&</span> Support.
              </h1>
              <p className="text-brand-dark/40 text-sm font-sans max-w-lg leading-relaxed uppercase font-black tracking-widest">
                Our elite advisors are stationed to orchestrate your next architectural acquisition.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Liaison Vectors: Cards ── */}
        <section className="py-24 bg-white relative z-20 -mt-20">
          <div className="container max-w-[1140px] mx-auto px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactDetails.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-[2rem] p-10 shadow-2xl shadow-gray-200/50 border border-gray-50 text-center group hover:border-brand-emerald/20 transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-8 group-hover:bg-brand-emerald group-hover:text-white transition-all duration-700">
                    <item.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-brand-dark font-black uppercase tracking-[0.2em] text-[10px] mb-6">{item.title}</h4>
                  <div className="space-y-2">
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-brand-dark/50 font-sans text-xs leading-relaxed italic">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Inquiry Orchestration Terminal ── */}
        <section className="py-32 bg-[#fdfdfd]">
          <div className="container max-w-[1140px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

              {/* Left: Liaison Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <header className="mb-14">
                  <p className="text-brand-emerald font-black uppercase tracking-[0.5em] text-[10px] mb-4">Inquiry Terminal</p>
                  <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6 leading-tight">
                    Submit Your <br /><span className="text-brand-emerald italic">Asset Requirements.</span>
                  </h2>
                  <div className="w-20 h-1 bg-brand-emerald/20" />
                </header>

                {/* Inquiry Protocol Toggle */}
                <div className="flex gap-4 mb-12 flex-wrap">
                  {["Acquisition", "Disposition", "Leasing", "Management"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setInquiryType(type)}
                      className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border shadow-sm ${
                        inquiryType === type
                          ? "bg-brand-dark text-white border-brand-dark shadow-xl"
                          : "bg-white text-brand-dark/40 border-gray-100 hover:border-brand-emerald hover:text-brand-emerald"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50/50 border border-emerald-100 rounded-[3rem] p-16 text-center shadow-2xl shadow-emerald-200/20"
                  >
                    <div className="w-20 h-20 rounded-full bg-brand-emerald text-white flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-emerald/20">
                      <Sparkles size={32} />
                    </div>
                    <h3 className="text-3xl font-serif text-brand-dark mb-4">Protocol Synchronized</h3>
                    <p className="text-brand-dark/50 font-sans italic leading-relaxed">
                      Our liaison officers have received your requirements. <br /> expect an official correspondence within 12 standard hours.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    className="space-y-10"
                    onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="group">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/30 mb-4 ml-1 group-focus-within:text-brand-emerald transition-colors">Identification (Name)</label>
                        <input
                          type="text"
                          required
                          placeholder="Julian Vane"
                          className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-5 text-brand-dark text-sm outline-none focus:border-brand-emerald/20 transition-all shadow-sm hover:shadow-md"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/30 mb-4 ml-1 group-focus-within:text-brand-emerald transition-colors">Communication Vector (Phone)</label>
                        <input
                          type="tel"
                          placeholder="+234 (0) ..."
                          className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-5 text-brand-dark text-sm outline-none focus:border-brand-emerald/20 transition-all shadow-sm hover:shadow-md"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/30 mb-4 ml-1 group-focus-within:text-brand-emerald transition-colors">Digital Identity (Email)</label>
                      <input
                        type="email"
                        required
                        placeholder="julian@vane.proprietary"
                        className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-5 text-brand-dark text-sm outline-none focus:border-brand-emerald/20 transition-all shadow-sm hover:shadow-md"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/30 mb-4 ml-1 group-focus-within:text-brand-emerald transition-colors">Requirement Narrative</label>
                      <textarea
                        rows={6}
                        required
                        placeholder="Detail your architectural expectations or investment goals..."
                        className="w-full bg-white border border-gray-100 rounded-3xl px-6 py-6 text-brand-dark text-sm outline-none focus:border-brand-emerald/20 transition-all shadow-sm hover:shadow-md resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-dark text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-brand-emerald transition-all shadow-2xl shadow-brand-dark/20 group relative overflow-hidden active:scale-[0.98]"
                    >
                      <span className="flex items-center justify-center gap-4">
                        Initialize Liaison <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </form>
                )}
              </motion.div>

              {/* Right: Immersive Context Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative rounded-[3rem] overflow-hidden shadow-[0_60px_100px_-20px_rgba(0,0,0,0.15)] aspect-[4/5] lg:aspect-auto h-full min-h-[700px] mt-12 lg:mt-0"
              >
                <Image
                  src="/proptee_entrance_narrative_1773291875530.png"
                  alt="Proptee Liaison Office"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent flex flex-col justify-end p-16">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-10 h-[1px] bg-brand-emerald" />
                     <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-[10px]">Headquarters</p>
                  </div>
                  <h3 className="text-white font-serif text-5xl leading-tight">Eko Atlantic City <br /><span className="italic">Lagos, Nigeria.</span></h3>
                  <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-6">
                     <div className="flex -space-x-3">
                        {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-dark bg-gray-200 overflow-hidden relative">
                           <Image src="/architectural_masterpiece_lagos_day_1773269982392.png" alt="" fill className="object-cover" />
                        </div>)}
                     </div>
                     <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">Global Liaisons Active Now</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
