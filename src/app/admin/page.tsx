"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Building2, 
  Users, 
  Layers, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  Activity,
  ChevronRight,
  Zap,
  ShieldCheck,
  Search,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    properties: 0,
    agents: 0,
    categories: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [
        { count: propCount },
        { count: agentCount },
        { count: catCount },
        { count: pendingCount }
      ] = await Promise.all([
        supabase.from("listings").select("*", { count: "exact", head: true }),
        supabase.from("agents").select("*", { count: "exact", head: true }),
        supabase.from("categories").select("*", { count: "exact", head: true }),
        supabase.from("listings").select("*", { count: "exact", head: true }).eq("status", "pending")
      ]);

      setCounts({
        properties: propCount || 0,
        agents: agentCount || 0,
        categories: catCount || 0,
        pending: pendingCount || 0
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const stats = [
    { name: "Global Assets", value: counts.properties.toString(), change: "+12.5%", type: "increase", icon: Building2 },
    { name: "Verified Advisory", value: counts.agents.toString(), change: "+3", type: "increase", icon: Users },
    { name: "System Taxonomies", value: counts.categories.toString(), change: "+1", type: "increase", icon: Layers },
    { name: "Validation Queue", value: counts.pending.toString(), change: "-2", type: "decrease", icon: Clock },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm animate-pulse">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl mb-8"></div>
            <div className="h-3 w-20 bg-gray-50 rounded-full mb-4"></div>
            <div className="h-10 w-24 bg-gray-50 rounded-2xl"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* ── Cinematic Greeting ── */}
      <section className="relative overflow-hidden group">
        <div className="absolute inset-0 bg-brand-emerald/5 rounded-[4rem] group-hover:bg-brand-emerald/10 transition-all duration-700" />
        <div className="relative z-10 p-12 sm:p-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[1px] bg-brand-emerald" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-emerald">Operations Hub Alpha</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-brand-dark mb-6 leading-tight">Welcome to the <br /><span className="text-brand-emerald italic">Executive Suite.</span></h1>
            <p className="text-[10px] text-brand-dark/40 font-black uppercase tracking-[0.3em] backdrop-blur-sm">Synchronization Complete • Node 0x242424 Active • {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric", day: "numeric" })}</p>
          </div>
          
          <div className="flex gap-4">
            <Link href="/admin/properties" className="px-10 py-5 rounded-2xl bg-brand-dark text-white text-[10px] font-black uppercase tracking-widest hover:bg-brand-emerald transition-all shadow-xl shadow-brand-dark/10 group">
              Audit Assets <ChevronRight size={14} className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── High-Performance Metrics ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] transition-all group overflow-hidden relative"
          >
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50/50 rounded-full translate-x-12 -translate-y-12 group-hover:scale-[1.5] transition-transform duration-1000" />
            
            <div className="relative z-10 flex items-center justify-between mb-10">
              <div className="w-16 h-16 rounded-[1.8rem] bg-gray-50 flex items-center justify-center text-brand-dark group-hover:bg-brand-emerald group-hover:text-white transition-all duration-700 shadow-sm">
                <stat.icon size={24} strokeWidth={1.5} />
              </div>
              <div className={`flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase py-2 px-3 rounded-full ${stat.type === "increase" ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"}`}>
                {stat.type === "increase" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            
            <p className="text-brand-dark/30 text-[9px] font-black uppercase tracking-[0.3em] mb-2">{stat.name}</p>
            <h3 className="text-5xl font-serif text-brand-dark group-hover:text-brand-emerald transition-colors duration-500">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* ── Operational Audit Log ── */}
        <div className="lg:col-span-8 bg-white p-12 sm:p-16 rounded-[4rem] border border-gray-50 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gray-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-0" />
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16">
              <div>
                <h3 className="text-3xl font-serif text-brand-dark mb-2 flex items-center gap-3">Operational Audit</h3>
                <p className="text-[10px] text-brand-dark/30 font-black uppercase tracking-widest italic">Encrypted Real-time Synchronization Log</p>
              </div>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-emerald hover:text-brand-dark transition-all border-b border-brand-emerald pb-1">
                Deep Audit Archive <ChevronRight size={12} />
              </button>
            </div>
            
            <div className="space-y-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-8 pb-10 border-b border-gray-50 last:border-0 last:pb-0 group">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-[1.5rem] bg-gray-50 flex items-center justify-center group-hover:bg-brand-dark group-hover:text-white transition-all duration-700 shadow-sm">
                      <Zap size={20} className="text-brand-emerald" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-serif text-brand-dark leading-snug group-hover:text-brand-emerald transition-colors duration-500">
                      Inventory Update: <span className="text-brand-dark/50 italic mr-2">Asset approved for marketplace publication</span>
                      <span className="px-3 py-1 bg-gray-50 rounded-full text-[9px] font-black uppercase tracking-widest text-brand-emerald">Lekki Waterfront</span>
                    </p>
                    <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-brand-dark/20">
                      <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-brand-emerald" /> Proptee Node Beta</div>
                      <div className="flex items-center gap-2"><Clock size={12} /> 2h 45m ago</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── System Protocols ── */}
        <div className="lg:col-span-4 bg-brand-dark p-12 sm:p-14 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
          {/* Animated Background Mesh */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-emerald/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brand-emerald/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
          
          <div className="relative z-10 space-y-12">
            <div>
              <h3 className="text-2xl font-serif mb-2">Protocol Command</h3>
              <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Administrative Control Layer</p>
            </div>
            
            <div className="space-y-6">
              <Link href="/admin/blog/new" className="flex items-center justify-between p-7 rounded-[2.5rem] bg-white/5 border border-white/5 hover:bg-brand-emerald hover:border-brand-emerald transition-all duration-700 group/item hover:translate-x-3">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-brand-emerald group-hover/item:text-white transition-colors duration-700">
                    <Sparkles size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest">Draft Editorial</p>
                    <p className="text-[9px] text-white/30 group-hover/item:text-white/70 italic uppercase tracking-tighter">Narrative Archive</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-white/20 group-hover/item:text-white" />
              </Link>

              <button className="flex items-center justify-between p-7 rounded-[2.5rem] bg-white text-brand-dark hover:bg-brand-emerald hover:text-white transition-all duration-700 group/item shadow-2xl shadow-black/40 hover:translate-x-3 w-full">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-brand-emerald/10 flex items-center justify-center text-brand-emerald group-hover/item:bg-white/20 group-hover/item:text-white transition-all duration-700">
                    <Building2 size={22} strokeWidth={1.5} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black uppercase tracking-widest">Asset Induction</p>
                    <p className="text-[9px] text-brand-dark/30 group-hover/item:text-white/70 italic uppercase tracking-tighter">Marketplace Registration</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-brand-dark/20 group-hover/item:text-white" />
              </button>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-6">
              <div className="flex items-center gap-3 py-3 px-6 bg-white/5 rounded-full border border-white/5">
                <ShieldCheck size={14} className="text-brand-emerald" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Secure Node Encryption Alpha</span>
              </div>
              <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/10 text-center">Proptee Real Estate Global Core v2.4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
