"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, MapPin, Phone, Send, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const contactDetails = [
  {
    icon: MapPin,
    title: "Our Office",
    lines: ["15B Admiralty Way,", "Lekki Phase 1, Lagos, Nigeria"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+234 (0) 800 123 4567", "+234 (0) 800 765 4321"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["concierge@proptee.ng", "partners@proptee.ng"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon – Fri: 8:00AM – 6:00PM", "Sat: 10:00AM – 2:00PM"],
  },
];

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState("Buy");
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
          <div className="container max-w-[1140px] mx-auto px-6 relative z-10">
            <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-xs mb-4">Get In Touch</p>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-4">Contact Us</h1>
            <p className="text-white/60 text-lg font-sans">
              Our expert advisors are ready to help you find your dream property.
            </p>
          </div>
        </section>

        {/* ── Contact Cards ── */}
        <section className="py-16 bg-[#f9f9f9] border-b border-gray-100">
          <div className="container max-w-[1140px] mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactDetails.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center group hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 rounded-full bg-brand-emerald/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-emerald transition-all duration-500">
                    <item.icon size={28} className="text-brand-emerald group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-brand-dark font-bold uppercase tracking-widest text-xs mb-4">{item.title}</h4>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-brand-dark/60 font-sans text-sm leading-relaxed">{line}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main Content: Form + Map ── */}
        <section className="py-24">
          <div className="container max-w-[1140px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* Left: Form */}
              <div>
                <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-xs mb-4">Send Message</p>
                <h2 className="text-4xl font-serif text-brand-dark mb-8 leading-tight">
                  Request a <span className="text-brand-emerald">Free Consultation</span>
                </h2>

                {/* Inquiry Type Toggle */}
                <div className="flex gap-3 mb-8 flex-wrap">
                  {["Buy", "Sell", "Rent", "Invest"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setInquiryType(type)}
                      className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${
                        inquiryType === type
                          ? "bg-brand-emerald text-white border-brand-emerald"
                          : "bg-white text-brand-dark/50 border-gray-200 hover:border-brand-emerald hover:text-brand-emerald"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {submitted ? (
                  <div className="bg-brand-emerald/5 border border-brand-emerald/20 rounded-2xl p-10 text-center">
                    <Send size={40} className="text-brand-emerald mx-auto mb-4" strokeWidth={1.5} />
                    <h3 className="text-2xl font-serif text-brand-dark mb-2">Message Sent!</h3>
                    <p className="text-brand-dark/50 font-sans">Our team will get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form
                    className="flex flex-col gap-5"
                    onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/50 mb-2">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="John Adeyemi"
                          className="w-full border border-gray-200 rounded-xl px-5 py-4 text-brand-dark text-sm outline-none focus:border-brand-emerald transition-colors bg-[#f9f9f9]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/50 mb-2">Phone</label>
                        <input
                          type="tel"
                          placeholder="+234..."
                          className="w-full border border-gray-200 rounded-xl px-5 py-4 text-brand-dark text-sm outline-none focus:border-brand-emerald transition-colors bg-[#f9f9f9]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/50 mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="johnadeyemi@example.com"
                        className="w-full border border-gray-200 rounded-xl px-5 py-4 text-brand-dark text-sm outline-none focus:border-brand-emerald transition-colors bg-[#f9f9f9]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/50 mb-2">Message</label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Tell us about the property you are looking for..."
                        className="w-full border border-gray-200 rounded-xl px-5 py-4 text-brand-dark text-sm outline-none focus:border-brand-emerald transition-colors resize-none bg-[#f9f9f9]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-brand-emerald text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-brand-emerald-muted transition-all shadow-lg shadow-brand-emerald/10 group"
                    >
                      Send Message
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}
              </div>

              {/* Right: Map / Image */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 aspect-square lg:aspect-auto min-h-[500px] relative">
                <Image
                  src="/architectural_masterpiece_lagos_day_1773269982392.png"
                  alt="Proptee Office"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent flex flex-col justify-end p-10">
                  <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-xs mb-2">Headquarters</p>
                  <h3 className="text-white font-serif text-3xl">Eko Atlantic City</h3>
                  <p className="text-white/60 text-sm font-sans mt-1">Lagos, Nigeria</p>
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
