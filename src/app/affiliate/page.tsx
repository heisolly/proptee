"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  DollarSign, 
  Share2, 
  Users, 
  Rocket, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  BarChart3
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AffiliatePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">

        {/* ── Page Banner ── */}
        <section
          className="relative pt-40 pb-24 flex items-center"
          style={{ background: "url('/hero_background.jpg') center center / cover no-repeat" }}
        >
          <div className="absolute inset-0 bg-brand-dark/70" />
          <div className="container max-w-[1140px] mx-auto px-6 relative z-10 text-center">
            <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-xs mb-4">Elite Partnership</p>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-4">Earn with <span className="text-brand-emerald italic">Proptee</span></h1>
            <p className="text-white/60 text-lg font-sans max-w-2xl mx-auto">
              Join West Africa's most prestigious real estate network and monetize your professional circles.
            </p>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-24 bg-white">
          <div className="container max-w-[1140px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-4xl font-serif text-brand-dark mb-6">The Path to Prosperity</h2>
              <p className="text-brand-dark/50 font-sans leading-relaxed">
                Our affiliate model is designed for high-performance consultants, brokers, and influencers in the luxury space.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {[
                { icon: <Users size={32} />, title: "Membership", desc: "Apply for our exclusive affiliate license." },
                { icon: <Share2 size={32} />, title: "Distribute", desc: "Share curated listings via our private portal." },
                { icon: <Rocket size={32} />, title: "Accelerate", desc: "Close high-value deals with our legal support." },
                { icon: <DollarSign size={32} />, title: "Liquidate", desc: "Unlock industry-leading commission structures." }
              ].map((step, i) => (
                <div key={i} className="text-center group">
                  <div className="w-20 h-20 bg-[#f9f9f9] border border-gray-100 rounded-3xl flex items-center justify-center text-brand-emerald mx-auto mb-8 group-hover:bg-brand-emerald group-hover:text-white group-hover:shadow-2xl group-hover:shadow-brand-emerald/20 transition-all duration-500">
                    {step.icon}
                  </div>
                  <h4 className="text-xl font-serif text-brand-dark mb-3">0{i+1}. {step.title}</h4>
                  <p className="text-brand-dark/40 text-sm font-sans px-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Benefits & Form ── */}
        <section className="py-24 bg-[#f9f9f9]">
          <div className="container max-w-[1140px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              
              {/* Left: Benefits */}
              <div className="lg:w-1/2">
                 <h2 className="text-4xl font-serif text-brand-dark mb-10 leading-tight">Why the Elite Choose <span className="text-brand-emerald">Proptee</span></h2>
                 <div className="space-y-8">
                    {[
                      { icon: <TrendingUp className="text-brand-emerald" />, title: "High Commission", desc: "Earn up to 5% on transactions exceeding $1M USD." },
                      { icon: <ShieldCheck className="text-brand-emerald" />, title: "Verified Assets", desc: "Access the most strictly vetted properties in Nigeria." },
                      { icon: <BarChart3 className="text-brand-emerald" />, title: "Transparent Reporting", desc: "Track leads and payouts in your private dashboard." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6">
                         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-100 shrink-0 shadow-sm">
                           {item.icon}
                         </div>
                         <div>
                            <h4 className="font-serif text-xl text-brand-dark mb-2">{item.title}</h4>
                            <p className="text-brand-dark/40 font-sans text-sm">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 
                 <div className="mt-12 p-8 bg-brand-dark rounded-3xl text-white relative overflow-hidden">
                    <p className="text-white/60 text-sm font-sans relative z-10 italic">
                      "Proptee has transformed how I handle luxury real estate referrals. Their attention to detail and professional closing team is world-class."
                    </p>
                    <p className="mt-4 text-brand-emerald font-black uppercase tracking-widest text-[10px] relative z-10">— Senior Partner, Lagos Realty</p>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-emerald/10 rounded-full blur-2xl" />
                 </div>
              </div>

              {/* Right: Application */}
              <div className="lg:w-1/2 w-full">
                 <div className="bg-white p-10 md:p-14 rounded-[40px] shadow-2xl border border-gray-50">
                   {submitted ? (
                     <div className="text-center py-10">
                        <CheckCircle size={60} className="text-brand-emerald mx-auto mb-6" />
                        <h3 className="text-3xl font-serif text-brand-dark mb-4">Inquiry Routed</h3>
                        <p className="text-brand-dark/40 font-sans mb-8">Our partnership board will review your profile and contact you shortly.</p>
                        <button onClick={() => setSubmitted(false)} className="text-brand-emerald font-bold text-sm tracking-widest uppercase hover:underline">Apply Again</button>
                     </div>
                   ) : (
                     <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                        <h3 className="text-2xl font-serif text-brand-dark mb-8 text-center uppercase tracking-widest">Apply for Access</h3>
                        <div className="space-y-4">
                          <input type="text" placeholder="Full Legal Name" className="w-full px-6 py-4 bg-[#f9f9f9] rounded-xl border border-gray-100 outline-none focus:border-brand-emerald transition-colors" required />
                          <input type="email" placeholder="Professional Email" className="w-full px-6 py-4 bg-[#f9f9f9] rounded-xl border border-gray-100 outline-none focus:border-brand-emerald transition-colors" required />
                          <input type="tel" placeholder="Phone Number (WhatsApp preferred)" className="w-full px-6 py-4 bg-[#f9f9f9] rounded-xl border border-gray-100 outline-none focus:border-brand-emerald transition-colors" required />
                          <textarea placeholder="Briefly describe your network or background..." rows={3} className="w-full px-6 py-4 bg-[#f9f9f9] rounded-xl border border-gray-100 outline-none focus:border-brand-emerald transition-colors" required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-brand-emerald text-white py-5 rounded-xl font-bold text-sm tracking-[0.2em] uppercase shadow-xl shadow-brand-emerald/20 hover:bg-brand-emerald-muted transition-all">
                          Submit Application
                        </button>
                        <p className="text-[10px] text-center text-brand-dark/30 font-sans px-4">
                          By applying, you agree to our professional code of conduct and confidential disclosure agreements.
                        </p>
                     </form>
                   )}
                 </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
