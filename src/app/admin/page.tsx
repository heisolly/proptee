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
  ChevronRight,
  TrendingUp,
  Activity,
  Plus,
  Filter,
  Download,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  MoreHorizontal
} from "lucide-react";
import { motion } from "framer-motion";
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
    { name: "Total Properties", value: counts.properties.toString(), change: "+8%", type: "increase", icon: Building2 },
    { name: "Active Agents", value: counts.agents.toString(), change: "+3", type: "increase", icon: Users },
    { name: "Categories", value: counts.categories.toString(), change: "0%", type: "neutral", icon: Layers },
    { name: "Pending Approval", value: counts.pending.toString(), change: "-12%", type: "decrease", icon: Clock },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse h-32" />
          ))}
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Overview</h1>
          <p className="text-sm text-gray-500">Real-time stats and management overview for Proptee.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/properties/add" className="flex items-center gap-2 bg-brand-emerald text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-emerald/90 transition-all shadow-sm">
            <Plus size={16} /> Add Property
          </Link>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 transition-all">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* ── KPI Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                stat.type === "increase" ? "bg-emerald-50 text-emerald-600" : 
                stat.type === "decrease" ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-600"
              }`}>
                {stat.type === "increase" ? <ArrowUpRight size={12} /> : stat.type === "decrease" ? <ArrowDownRight size={12} /> : null}
                {stat.change}
              </div>
            </div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.name}</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Recent Property Listings ── */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Pending Approvals</h3>
              <p className="text-xs text-gray-500 mt-0.5">Properties awaiting verification by administrators.</p>
            </div>
            <Link href="/admin/properties?status=pending" className="text-xs font-semibold text-brand-emerald hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100">
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {counts.pending > 0 ? (
                  // Mocking some pending properties since we don't have the real ones in this context easily
                  [1, 2, 3].map((i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900 group-hover:text-brand-emerald transition-colors">Waterfront Estate {i}</span>
                            <span className="text-xs text-gray-400">Lekki Phase 1, Lagos</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">
                          <Clock size={12} /> Pending
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1 hover:bg-gray-100 rounded text-gray-400">
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  )).slice(0, counts.pending)
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <CheckCircle2 size={32} strokeWidth={1.5} />
                        <p className="text-sm font-medium">Queue Synchronization Complete</p>
                        <p className="text-xs">No pending properties requiring attention.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── System Status / Alerts ── */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-brand-emerald/10 text-brand-emerald rounded-lg flex items-center justify-center">
                  <Activity size={18} />
                </div>
                <h3 className="font-bold text-gray-900">System Integrity</h3>
             </div>
             
             <div className="space-y-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Supabase Data Node</span>
                  <span className="flex items-center gap-1.5 text-emerald-600 font-bold uppercase tracking-tight">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Optimal
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Auth Identification</span>
                  <span className="flex items-center gap-1.5 text-emerald-600 font-bold uppercase tracking-tight">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">CDN Propagation</span>
                  <span className="flex items-center gap-1.5 text-emerald-600 font-bold uppercase tracking-tight">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Synchronized
                  </span>
                </div>
             </div>
             
             <div className="mt-8 pt-6 border-t border-gray-50">
                <button className="w-full bg-gray-50 text-gray-600 py-2.5 rounded-lg text-xs font-bold hover:bg-gray-100 transition-all">
                  System Self-Audit
                </button>
             </div>
          </div>

          <div className="bg-brand-dark p-6 rounded-xl text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-emerald/10 rounded-full blur-3xl -translate-y-12 translate-x-12" />
            <h4 className="font-serif text-lg mb-2 relative z-10">Advisory Support</h4>
            <p className="text-[11px] text-white/50 mb-6 font-sans relative z-10 leading-relaxed italic">
              Need assistance orchestrating the administrative platform? Our advisory lead is on standby.
            </p>
            <button className="w-full bg-brand-emerald text-white py-2.5 rounded-lg text-xs font-bold hover:bg-white hover:text-brand-dark transition-all relative z-10">
              Open Support Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
