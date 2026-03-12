"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DollarSign, 
  Share2, 
  Users, 
  Rocket, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Globe,
  Zap,
  Sparkles,
  Command
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const prosperityCycle = [
  { icon: Users, title: "Registry Membership", desc: "Apply for a proprietary affiliate license within the Proptee elite network." },
  { icon: Share2, title: "Asset Distribution", desc: "Orchestrate private listing visibility via your personal high-definition portal." },
  { icon: Rocket, title: "Capital Acceleration", desc: "Close multimillion-dollar transactions with our global legal and closing team." },
  { icon: DollarSign, title: "Revenue Liquidation", desc: "Unlock industry-leading commission structures synchronized with your performance." }
];

export default function AffiliatePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen text-brand-dark overflow-hidden">

        {/* ── Cinematic Partnership Hero ── */}
        <section className="relative h-[80vh] flex items-center overflow-hidden">
          <Image 
            src="/proptee_affiliate_hero_1773293540577.png" 
            alt="Capital Orchestration" 
            fill 
            className="object-cover scale-105 opacity-90"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white via-white/80 to-transparent" />
          
          <div className="container max-w-[1140px] mx-auto px-8 relative z-10 pt-40">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-brand-emerald" />
                <p className="text-brand-emerald font-black uppercase tracking-[0.5em] text-[10px]">Elite Partnership</p>
              </div>
              <h1 className="text-6xl md:text-8xl font-serif text-brand-dark leading-[0.9] mb-8">
                Capital <br /><span className="text-brand-emerald italic">Orchestration.</span>
              </h1>
              <p className="text-brand-dark/40 text-sm font-sans max-w-lg leading-relaxed uppercase font-black tracking-widest hidden md:block">
                Monetize your elite professional circles through West Africa's most prestigious real estate registry.
              </p>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
             <div className="w-[1px] h-16 bg-gradient-to-b from-brand-emerald to-transparent" />
             <span className="text-brand-dark/20 text-[9px] font-black uppercase tracking-[0.3em] rotate-90 origin-left translate-x-3">Protocol</span>
          </div>
        </section>

        {/* ── Prosperity Cycle: Sequence ── */}
        <section className="py-32 bg-white relative z-20">
          <div className="container max-w-[1140px] mx-auto px-8">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-[10px] mb-4">Operational Cycle</p>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-dark">The Path to <br /><span className="text-brand-emerald italic">High-Yield Returns.</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {prosperityCycle.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="text-center group"
                >
                  <div className="relative mb-10 inline-block">
                    <div className="w-24 h-24 bg-gray-50 border border-gray-100 rounded-[2rem] flex items-center justify-center text-brand-dark group-hover:bg-brand-emerald group-hover:text-white group-hover:shadow-[0_40px_80px_-20px_rgba(31,122,92,0.3)] transition-all duration-700">
                      <step.icon size={32} strokeWidth={1} />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[10px] font-black italic">
                      {i + 1}
                    </div>
                  </div>
                  <h4 className="text-xl font-serif text-brand-dark mb-4">{step.title}</h4>
                  <p className="text-brand-dark/40 text-xs font-sans px-4 leading-relaxed italic">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Advantages: Split Experience ── */}
        <section className="py-32 bg-[#fdfdfd] border-y border-gray-50">
          <div className="container max-w-[1140px] mx-auto px-8">
            <div className="flex flex-col lg:flex-row gap-32 items-center">
              
              {/* Left: Elite Advantages */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="lg:w-1/2"
              >
                 <header className="mb-14">
                    <p className="text-brand-emerald font-black uppercase tracking-[0.5em] text-[10px] mb-4">Network Benefits</p>
                    <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-8 leading-tight">
                      Why the Elite <br />Choose <span className="text-brand-emerald italic">Proptee.</span>
                    </h2>
                    <div className="w-20 h-1 bg-brand-emerald/20" />
                 </header>

                 <div className="space-y-12">
                    {[
                      { icon: <TrendingUp size={20} strokeWidth={1.5} />, title: "Premium Commission Flow", desc: "Gain industry-leading yield distributions on high-definition transactions exceeding ₦500M." },
                      { icon: <ShieldCheck size={20} strokeWidth={1.5} />, title: "Verified Asset Access", desc: "Navigate our strictly curated administrative registry of Nigeria's most prestigious portfolios." },
                      { icon: <BarChart3 size={20} strokeWidth={1.5} />, title: "Digital Transparency", desc: "Monitor your liaison performance and liquidation cycle in our encrypted partner dashboard." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-8 group">
                         <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm group-hover:bg-brand-emerald group-hover:text-white transition-all duration-700 shrink-0">
                           {item.icon}
                         </div>
                         <div>
                            <h4 className="font-serif text-xl text-brand-dark mb-2 group-hover:text-brand-emerald transition-colors">{item.title}</h4>
                            <p className="text-brand-dark/40 font-sans text-xs italic leading-relaxed">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 
                 <div className="mt-20 p-10 bg-brand-dark rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-brand-dark/20">
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-6 border-b border-white/5 pb-6">Affiliate Registry Testimonial</p>
                    <blockquote className="text-base font-sans relative z-10 italic leading-relaxed text-white/80">
                      "The level of capital orchestration provided by the Proptee registry is unprecedented. Their administrative closing team is the benchmark for luxury real estate."
                    </blockquote>
                    <p className="mt-8 text-brand-emerald font-black uppercase tracking-[0.3em] text-[10px] relative z-10">Administrative Elite • Node 0xLag-Admin</p>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-emerald/5 rounded-full blur-3xl" />
                 </div>
              </motion.div>

              {/* Right: Liaison Application Terminal */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="lg:w-1/2 w-full"
              >
                 <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-50 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                      <Globe size={200} className="text-brand-dark" />
                   </div>

                   <AnimatePresence mode="wait">
                     {submitted ? (
                       <motion.div 
                         key="success"
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="text-center py-16"
                       >
                          <div className="w-20 h-20 bg-brand-emerald text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-brand-emerald/20">
                            <Sparkles size={32} />
                          </div>
                          <h3 className="text-3xl font-serif text-brand-dark mb-6">Application Ingested</h3>
                          <p className="text-brand-dark/40 font-sans text-sm mb-12 italic leading-relaxed">
                            Our partnership board will analyze your trajectory and reach out for further synchronization.
                          </p>
                          <button 
                            onClick={() => setSubmitted(false)} 
                            className="text-brand-emerald font-black text-[10px] tracking-widest uppercase hover:text-brand-dark transition-colors border-b-2 border-brand-emerald/10 pb-1"
                          >
                            New Liaison Induction
                          </button>
                       </motion.div>
                     ) : (
                       <form className="space-y-8 relative z-10" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                          <header className="text-center mb-12">
                             <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-[10px] mb-2">Registry Access</p>
                             <h3 className="text-3xl font-serif text-brand-dark italic">Induction Terminal</h3>
                          </header>
                          
                          <div className="space-y-6">
                            <div className="group">
                               <label className="block text-[9px] font-black uppercase tracking-widest text-brand-dark/30 mb-3 ml-2 group-focus-within:text-brand-emerald transition-colors">Identification (Legal Name)</label>
                               <input type="text" placeholder="Julian Vane" className="w-full px-8 py-5 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-brand-emerald/20 focus:bg-white transition-all text-sm font-sans" required />
                            </div>
                            <div className="group">
                               <label className="block text-[9px] font-black uppercase tracking-widest text-brand-dark/30 mb-3 ml-2 group-focus-within:text-brand-emerald transition-colors">Communication Vector (Email)</label>
                               <input type="email" placeholder="julian@vane.capital" className="w-full px-8 py-5 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-brand-emerald/20 focus:bg-white transition-all text-sm font-sans" required />
                            </div>
                            <div className="group">
                               <label className="block text-[9px] font-black uppercase tracking-widest text-brand-dark/30 mb-3 ml-2 group-focus-within:text-brand-emerald transition-colors">Digital Handle (Phone/WhatsApp)</label>
                               <input type="tel" placeholder="+234 (0) ..." className="w-full px-8 py-5 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-brand-emerald/20 focus:bg-white transition-all text-sm font-sans" required />
                            </div>
                            <div className="group">
                               <label className="block text-[9px] font-black uppercase tracking-widest text-brand-dark/30 mb-3 ml-2 group-focus-within:text-brand-emerald transition-colors">Professional Narrative</label>
                               <textarea placeholder="Describe your network trajectory or background..." rows={4} className="w-full px-8 py-5 bg-gray-50/50 rounded-3xl border border-gray-100 outline-none focus:border-brand-emerald/20 focus:bg-white transition-all text-sm font-sans resize-none" required></textarea>
                            </div>
                          </div>
                          
                          <button type="submit" className="w-full bg-brand-dark text-white py-6 rounded-[2rem] font-black tracking-[0.3em] text-[10px] uppercase shadow-2xl shadow-brand-dark/20 hover:bg-brand-emerald transition-all group flex items-center justify-center gap-4">
                            Submit Induction <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                          
                          <div className="flex items-center justify-center gap-3 pt-4">
                             <ShieldCheck size={14} className="text-brand-emerald opacity-50" />
                             <p className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-dark/20 text-center uppercase">
                               Encrypted Connection • Secure Board Review Policy 2.4
                             </p>
                          </div>
                       </form>
                     )}
                   </AnimatePresence>
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
