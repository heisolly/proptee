"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Users, Award, Check, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const values = [
  { icon: Shield, title: "Uncompromising Integrity", desc: "Discretion and transparency are the bedrocks of our service. We protect our clients' interests with unwavering dedication." },
  { icon: TrendingUp, title: "Market Mastery", desc: "Our data-driven approach and insider knowledge ensure our clients always stay ahead in the dynamic real estate market." },
  { icon: Users, title: "Bespoke Relationships", desc: "We don't just facilitate transactions — we build lifelong partnerships rooted in trust and mutual respect." },
];

const stats = [
  { value: "10K+", label: "Happy Clients" },
  { value: "₦120B+", label: "In Transactions" },
  { value: "14+", label: "Years Experience" },
  { value: "2,500+", label: "Properties Sold" },
];

const team = [
  { name: "Emmanuel Cole", role: "Founder & CEO", image: "/hero_background.jpg" },
  { name: "Amina Yusuf", role: "Head of Sales", image: "/hero_background.jpg" },
  { name: "Chukwuemeka Obi", role: "Lead Architect Advisor", image: "/hero_background.jpg" },
  { name: "Temi Adeyemi", role: "Client Relations Director", image: "/hero_background.jpg" },
];

export default function AboutPage() {
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
            <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-xs mb-4">Our Story</p>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-4">About Us</h1>
            <p className="text-white/60 text-lg font-sans">
              Nigeria's most trusted real estate platform since 2010.
            </p>
          </div>
        </section>

        {/* ── Mission: 2-column ── */}
        <section className="py-24 bg-white">
          <div className="container max-w-[1140px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-xs mb-4">Who We Are</p>
                <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6 leading-tight">
                  Curating Nigeria's Most <span className="text-brand-emerald">Extraordinary</span> Properties
                </h2>
                <p className="text-brand-dark/60 text-lg leading-relaxed font-sans mb-6">
                  Founded on a singular vision: to redefine the real estate experience in West Africa. Proptee connects discerning individuals and families with exceptional residences, estates, and investment opportunities.
                </p>
                <p className="text-brand-dark/60 text-lg leading-relaxed font-sans mb-10">
                  Our advisory-led approach transcends traditional brokerage. We offer a holistic suite of services encompassing acquisition, disposition, asset management, and lifestyle concierge.
                </p>
                <Link
                  href="/properties"
                  className="bg-brand-emerald text-white px-10 py-4 rounded-lg font-bold inline-flex items-center gap-3 hover:bg-brand-emerald-muted transition-all group"
                >
                  Browse Properties
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <Image src="/architectural_masterpiece_lagos_day_1773269982392.png" alt="About Proptee" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-brand-emerald text-white p-6 rounded-2xl shadow-xl">
                  <div className="text-3xl font-serif font-bold">14+</div>
                  <div className="text-xs font-black uppercase tracking-widest mt-1 opacity-80">Years of Excellence</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-20 bg-brand-dark">
          <div className="container max-w-[1140px] mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-serif text-brand-emerald mb-3">{stat.value}</div>
                  <div className="text-white/50 font-sans text-sm uppercase tracking-widest font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values / Core Principles ── */}
        <section className="py-24 bg-[#f9f9f9]">
          <div className="container max-w-[1140px] mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-xs mb-4">Core Principles</p>
              <h2 className="text-4xl font-serif text-brand-dark">The Pillars of Our Success</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 group hover:shadow-md transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-emerald/5 flex items-center justify-center mb-6 group-hover:bg-brand-emerald transition-all duration-500">
                    <v.icon size={28} className="text-brand-emerald group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-serif text-brand-dark mb-3">{v.title}</h3>
                  <p className="text-brand-dark/55 font-sans text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quote Banner ── */}
        <section
          className="relative py-32"
          style={{ background: "url('/hero_background.jpg') center center / cover no-repeat" }}
        >
          <div className="absolute inset-0 bg-brand-dark/75" />
          <div className="container max-w-[1140px] mx-auto px-6 relative z-10 text-center">
            <blockquote className="text-3xl md:text-5xl font-serif text-white italic max-w-3xl mx-auto leading-tight mb-8">
              "Excellence isn't a benchmark — it's our baseline."
            </blockquote>
            <div className="w-16 h-px bg-brand-emerald mx-auto mb-4" />
            <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-xs">Emmanuel Cole — Founder & CEO, Proptee</p>
          </div>
        </section>

        {/* ── Meet the Team ── */}
        <section className="py-24 bg-white">
          <div className="container max-w-[1140px] mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-xs mb-2">The People</p>
                <h2 className="text-4xl font-serif text-brand-dark">Meet Our Team</h2>
              </div>
              <Link href="/agents" className="bg-brand-emerald text-white px-8 py-3.5 rounded-lg text-sm font-bold hover:bg-brand-emerald-muted transition-all">
                All Agents
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group text-center"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-md">
                    <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                  </div>
                  <h4 className="text-brand-dark font-serif text-xl mb-1">{member.name}</h4>
                  <p className="text-brand-emerald text-xs font-black uppercase tracking-widest">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 bg-[#f9f9f9] border-t border-gray-100">
          <div className="container max-w-[1140px] mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-4">Ready to Find Your Dream Home?</h2>
            <p className="text-brand-dark/50 font-sans mb-8">Our advisors are standing by. Let's begin your journey today.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-brand-emerald text-white px-10 py-4 rounded-lg font-bold hover:bg-brand-emerald-muted transition-all">
                Get In Touch
              </Link>
              <Link href="/properties" className="bg-white text-brand-dark px-10 py-4 rounded-lg font-bold border border-gray-200 hover:border-brand-emerald hover:text-brand-emerald transition-all">
                Browse Properties
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
