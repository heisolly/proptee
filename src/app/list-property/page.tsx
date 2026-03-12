"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Upload, Home, CheckCircle, Info, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ListPropertyPage() {
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
            <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-xs mb-4">Partner With Us</p>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-4">List Your Property</h1>
            <p className="text-white/60 text-lg font-sans">
              Reach verified high-net-worth investors across Nigeria and beyond.
            </p>
          </div>
        </section>

        {/* ── Main Layout ── */}
        <section className="py-24 bg-[#f9f9f9]">
          <div className="container max-w-[1140px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16">

              {/* Left: Listing Form */}
              <div className="lg:w-2/3">
                {submitted ? (
                  <div className="bg-white rounded-3xl p-16 shadow-xl border border-gray-100 text-center">
                    <div className="w-20 h-20 rounded-full bg-brand-emerald/10 flex items-center justify-center mx-auto mb-8">
                       <CheckCircle size={40} className="text-brand-emerald" />
                    </div>
                    <h2 className="text-4xl font-serif text-brand-dark mb-4">Submission Received!</h2>
                    <p className="text-brand-dark/50 text-lg mb-10 font-sans">
                      Our verification team will review your property details and contact you within 48 hours for onboarding.
                    </p>
                    <Link href="/properties" className="bg-brand-emerald text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-brand-emerald/10 inline-block">
                      Browse Portfolio
                    </Link>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                    <form className="space-y-12" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                      
                      {/* Section 1: Basic */}
                      <div>
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-8 h-8 rounded-full bg-brand-emerald text-white flex items-center justify-center font-bold text-xs">1</div>
                          <h3 className="text-2xl font-serif text-brand-dark">General Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-brand-dark/40 ml-1">Property Title</label>
                            <input type="text" placeholder="e.g. Modern Villa in Banana Island" className="w-full px-6 py-4 bg-[#f9f9f9] rounded-xl border border-gray-100 outline-none focus:border-brand-emerald transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-brand-dark/40 ml-1">Expected Price (₦)</label>
                            <input type="text" placeholder="e.g. 850,000,000" className="w-full px-6 py-4 bg-[#f9f9f9] rounded-xl border border-gray-100 outline-none focus:border-brand-emerald transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-brand-dark/40 ml-1">Category</label>
                            <select className="w-full px-6 py-4 bg-[#f9f9f9] rounded-xl border border-gray-100 outline-none focus:border-brand-emerald transition-colors appearance-none">
                              <option>For Sale</option>
                              <option>For Rent</option>
                              <option>Shortlet</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-brand-dark/40 ml-1">Property Type</label>
                            <select className="w-full px-6 py-4 bg-[#f9f9f9] rounded-xl border border-gray-100 outline-none focus:border-brand-emerald transition-colors appearance-none">
                              <option>Apartment</option>
                              <option>House / Duplex</option>
                              <option>Penthouse</option>
                              <option>Villa</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Details */}
                      <div>
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-8 h-8 rounded-full bg-brand-emerald text-white flex items-center justify-center font-bold text-xs">2</div>
                          <h3 className="text-2xl font-serif text-brand-dark">Location & Specs</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-brand-dark/40 ml-1">Physical Address</label>
                            <input type="text" placeholder="Street name and plot number..." className="w-full px-6 py-4 bg-[#f9f9f9] rounded-xl border border-gray-100 outline-none focus:border-brand-emerald transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-brand-dark/40 ml-1">City</label>
                            <input type="text" placeholder="Lagos, Abuja, etc." className="w-full px-6 py-4 bg-[#f9f9f9] rounded-xl border border-gray-100 outline-none focus:border-brand-emerald transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-brand-dark/40 ml-1">Bedrooms</label>
                            <input type="number" placeholder="4" className="w-full px-6 py-4 bg-[#f9f9f9] rounded-xl border border-gray-100 outline-none focus:border-brand-emerald transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-brand-dark/40 ml-1">Bathrooms</label>
                            <input type="number" placeholder="5" className="w-full px-6 py-4 bg-[#f9f9f9] rounded-xl border border-gray-100 outline-none focus:border-brand-emerald transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-brand-dark/40 ml-1">Area (sqm)</label>
                            <input type="text" placeholder="500" className="w-full px-6 py-4 bg-[#f9f9f9] rounded-xl border border-gray-100 outline-none focus:border-brand-emerald transition-colors" />
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Media */}
                      <div>
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-8 h-8 rounded-full bg-brand-emerald text-white flex items-center justify-center font-bold text-xs">3</div>
                          <h3 className="text-2xl font-serif text-brand-dark">Media & Disclosure</h3>
                        </div>
                        <div className="space-y-6">
                          <div className="bg-[#f9f9f9] border-2 border-dashed border-gray-100 rounded-3xl p-12 text-center hover:border-brand-emerald/50 transition-colors group cursor-pointer">
                            <Upload size={48} className="mx-auto text-gray-300 group-hover:text-brand-emerald mb-4 transition-colors" strokeWidth={1} />
                            <h4 className="font-bold text-brand-dark mb-2">Upload Visual Assets</h4>
                            <p className="text-brand-dark/40 text-sm">Drag images here or click to browse. (Min 5 high-res photos required)</p>
                          </div>
                          <div className="p-6 rounded-2xl bg-brand-emerald/5 border border-brand-emerald/10 flex items-start gap-4">
                            <ShieldCheck size={28} className="text-brand-emerald shrink-0" />
                            <p className="text-sm text-brand-dark/60 leading-relaxed font-sans">
                              <b>Proptee Verified Standard:</b> To maintain our catalog's prestige, every listing undergoes a strict title verification process. Our legal team will require scanned copies of the property's Title Document (C of O, Consent, etc.) during onboarding.
                            </p>
                          </div>
                        </div>
                      </div>

                      <button type="submit" className="w-full bg-brand-emerald text-white py-5 rounded-2xl text-lg font-bold shadow-xl shadow-brand-emerald/10 hover:bg-brand-emerald-muted transition-all">
                        Submit for Verification
                      </button>

                    </form>
                  </div>
                )}
              </div>

              {/* Right: Info Panels */}
              <div className="lg:w-1/3 flex flex-col gap-8">
                
                {/* Benefits */}
                <div className="bg-brand-dark text-white p-10 rounded-3xl shadow-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-2xl font-serif mb-8">Why List on Proptee?</h4>
                    <ul className="space-y-6">
                        {[
                          "Global reach to 100k+ high-net-worth visitors.",
                          "AI-driven lead matching for qualified buyers.",
                          "Complimentary professional staging for premium units.",
                          "Zero listing feeds — we only charge on success.",
                          "Dedicated concierge for site viewings & closure."
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <CheckCircle size={20} className="text-brand-emerald shrink-0 mt-1" />
                            <span className="text-white/70 font-sans text-sm">{item}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  {/* Decor */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-emerald/10 rounded-full blur-3xl" />
                </div>

                {/* Support */}
                <div className="bg-white border border-gray-100 p-10 rounded-3xl shadow-sm text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-emerald/5 flex items-center justify-center mx-auto mb-6">
                    <Mail size={24} className="text-brand-emerald" />
                  </div>
                  <h4 className="text-xl font-serif text-brand-dark mb-4">Direct Support</h4>
                  <p className="text-brand-dark/40 text-sm font-sans mb-8">
                     Prefer a manual listing? Speak with an acquisitions specialist directly.
                  </p>
                  <Link href="/contact" className="text-brand-emerald font-bold flex items-center justify-center gap-2 hover:gap-3 transition-all text-sm group">
                     Open Support Ticket <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
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
