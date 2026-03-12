"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Users, Award, Check, ArrowRight, Globe, Zap, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const values = [
  { icon: Shield, title: "Executive Integrity", desc: "Discretion and absolute transparency are the bedrocks of our service. We protect your architectural interests with unwavering dedication." },
  { icon: TrendingUp, title: "Market Orchestration", desc: "Our data-driven algorithms and internal networks ensure you always command the lead in the global real estate hierarchy." },
  { icon: Users, title: "Curated Relationships", desc: "We don't just facilitate transfers — we cultivate lifelong partnerships rooted in the shared pursuit of excellence." },
];

const stats = [
  { value: "10K+", label: "Verified Occupants" },
  { value: "₦120B+", label: "Asset Valuation" },
  { value: "14+", label: "Legacy Years" },
  { value: "2,500+", label: "Market Inductions" },
];

const team = [
  { name: "Emmanuel Cole", role: "Elite Orchestrator", image: "/architectural_masterpiece_lagos_day_1773269982392.png" },
  { name: "Amina Yusuf", role: "Market Strategist", image: "/luxury_lagos_dusk_hero_1773269189794.png" },
  { name: "Julian Vane", role: "Asset Custodian", image: "/proptee_concierge_narrative_1773292168744.png" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen text-brand-dark overflow-hidden">

        {/* ── Cinematic Hero ── */}
        <section className="relative h-[80vh] flex items-center overflow-hidden">
          <Image 
            src="/proptee_about_hero_1773292168744.png" 
            alt="Proptee Vision" 
            fill 
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/40 to-transparent" />
          
          <div className="container max-w-[1140px] mx-auto px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-brand-emerald" />
                <p className="text-brand-emerald font-black uppercase tracking-[0.5em] text-[10px]">The Manifesto</p>
              </div>
              <h1 className="text-6xl md:text-8xl font-serif text-white leading-[0.9] mb-8">
                Curating <br /><span className="text-brand-emerald italic">Tomorrow's</span> Legacy.
              </h1>
              <p className="text-white/50 text-sm font-sans max-w-lg leading-relaxed uppercase font-black tracking-widest">
                Nigeria's premier architecture orchestration and high-definition asset portal since 2010.
              </p>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
             <div className="w-[1px] h-16 bg-gradient-to-b from-brand-emerald to-transparent" />
             <span className="text-white/20 text-[9px] font-black uppercase tracking-[0.3em] rotate-90 origin-left translate-x-3">Scroll</span>
          </div>
        </section>

        {/* ── The Genesis: Mission ── */}
        <section className="py-32 relative bg-white">
          <div className="container max-w-[1140px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <header className="mb-10">
                  <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6 leading-tight">
                    Beyond <span className="text-brand-emerald italic">Brokerage.</span> <br />
                    Architectural Excellence.
                  </h2>
                  <div className="w-20 h-1 bg-brand-emerald/20" />
                </header>
                
                <div className="space-y-8 text-brand-dark/60 text-base leading-relaxed font-sans italic">
                  <p>
                    Proptee was founded on a singular crystalline vision: to redefine the real estate experience in the global south. We connect discerning individuals with high-definition asset opportunities.
                  </p>
                  <p>
                    Our orchestration-led approach transcends traditional service. We offer a holistic environment encompassing acquisition, asset management, and concierge-level living protocols.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 mt-12 py-8 border-y border-gray-50">
                   <div>
                      <p className="text-brand-dark text-3xl font-serif">14+</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-brand-emerald mt-1">Registry Years</p>
                   </div>
                   <div>
                      <p className="text-brand-dark text-3xl font-serif">2,500+</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-brand-emerald mt-1">Assets Handled</p>
                   </div>
                </div>

                <Link
                  href="/properties"
                  className="mt-12 bg-brand-dark text-white px-10 py-5 rounded-[2rem] font-black tracking-[0.2em] uppercase text-[10px] inline-flex items-center gap-4 hover:bg-brand-emerald transition-all group shadow-2xl shadow-brand-dark/10"
                >
                  Enter the Marketplace
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] aspect-[4/5] z-10"
                >
                  <Image src="/architectural_masterpiece_lagos_day_1773269982392.png" alt="Mission" fill className="object-cover" />
                </motion.div>
                {/* Decorative Elements */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-emerald/5 rounded-full blur-3xl z-0" />
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-brand-dark/5 rounded-full blur-3xl z-0" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Asset Orchestration: Values ── */}
        <section className="py-32 bg-gray-50/50">
          <div className="container max-w-[1140px] mx-auto px-8">
            <div className="text-center mb-20">
              <p className="text-brand-emerald font-black uppercase tracking-[0.5em] text-[10px] mb-4">Orchestration Models</p>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-dark">The Pillars of Proptee</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="bg-white rounded-[2.5rem] p-10 border border-gray-100 group hover:border-brand-emerald/20 transition-all hover:shadow-2xl hover:shadow-gray-200/50"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-10 group-hover:bg-brand-emerald group-hover:text-white transition-all duration-700">
                    <v.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-serif text-brand-dark mb-4">{v.title}</h3>
                  <p className="text-brand-dark/50 font-sans text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Metric Performance ── */}
        <section className="py-24 bg-brand-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-from)_0%,transparent_100%)] from-brand-emerald" />
          </div>
          <div className="container max-w-[1140px] mx-auto px-8 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-serif text-white mb-2">{stat.value}</div>
                  <div className="text-white/30 font-black text-[9px] uppercase tracking-[0.4em]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leadership Registry ── */}
        <section className="py-32 bg-white">
          <div className="container max-w-[1140px] mx-auto px-8">
             <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
                <div>
                   <p className="text-brand-emerald font-black uppercase tracking-[0.5em] text-[10px] mb-4">Elite Registry</p>
                   <h2 className="text-5xl font-serif text-brand-dark">The Orchestrators</h2>
                </div>
                <Link href="/agents" className="text-[10px] font-black uppercase tracking-widest text-brand-dark hover:text-brand-emerald transition-colors pb-1 border-b-2 border-brand-emerald/10">
                   View Full Registry
                </Link>
             </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-8 shadow-xl">
                    <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0" />
                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-brand-dark/80 to-transparent">
                       <p className="text-brand-emerald text-[10px] font-black uppercase tracking-widest mb-1">{member.role}</p>
                       <h4 className="text-white font-serif text-2xl">{member.name}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Engagement CTA ── */}
        <section className="py-24 bg-white border-t border-gray-50 text-center">
          <div className="container max-w-2xl mx-auto px-8">
            <Sparkles size={40} className="text-brand-emerald mx-auto mb-10 opacity-40" />
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-8 leading-[1.1]">
              Initiate Your <br />
              <span className="text-brand-emerald italic">Architectural Journey.</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact" className="bg-brand-emerald text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-brand-dark transition-all shadow-2xl shadow-brand-emerald/20">
                Contact Concierge
              </Link>
              <Link href="/properties" className="bg-white text-brand-dark border border-gray-100 px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-gray-50 transition-all">
                Registry Browsing
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
