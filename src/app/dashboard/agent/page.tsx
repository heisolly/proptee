"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  Building2, 
  Plus, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  ChevronRight
} from "lucide-react";

export default function AgentDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    views: 1240, // Mock for now
    leads: 12, // Mock for now
  });
  const [recentListings, setRecentListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = '/'; // Simple client-side redirect
      return;
    }

    // Check if user is an agent
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== 'agent') {
      window.location.href = '/';
      return;
    }

    const { data: listings } = await supabase
      .from("listings")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (listings) {
      setRecentListings(listings.slice(0, 5));
      setStats({
        ...stats,
        total: listings.length,
        approved: listings.filter((l: any) => l.status === "approved").length,
        pending: listings.filter((l: any) => l.status === "pending").length,
      });
    }
    setLoading(false);
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
        <p className="text-3xl font-black text-[#0F3D2E]">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-12 pt-32 lg:pt-32">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#0F3D2E] tracking-tight">Agent Dashboard</h1>
            <p className="text-gray-500 font-medium italic">Welcome back to your property management portal.</p>
          </div>
          <Link 
            href="/dashboard/agent/upload" 
            className="px-8 py-4 bg-[#0F3D2E] text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl shadow-[#0F3D2E]/20 hover:bg-[#1F7A5C] transition-all"
          >
            <Plus size={18} />
            Post New Listing
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Listings" value={stats.total} icon={Building2} color="bg-[#0F3D2E]" />
          <StatCard title="Approved" value={stats.approved} icon={CheckCircle} color="bg-[#1F7A5C]" />
          <StatCard title="Pending Review" value={stats.pending} icon={Clock} color="bg-orange-400" />
          <StatCard title="Total Views" value={stats.views} icon={Eye} color="bg-[#4d4d4d]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#0F3D2E]">Recent Listings</h3>
              <Link href="/dashboard/agent/listings" className="text-xs font-bold uppercase tracking-widest text-[#1F7A5C] hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="h-64 bg-white rounded-3xl animate-pulse border border-gray-100" />
              ) : recentListings.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
                  <p className="text-gray-400 italic">No listings found. Start by uploading your first property.</p>
                </div>
              ) : (
                recentListings.map((listing) => (
                  <div key={listing.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden relative">
                         <img 
                           src={listing.images?.[0] || "https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&w=200&q=80"} 
                           alt={listing.title}
                           className="object-cover w-full h-full"
                         />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0F3D2E] group-hover:text-[#1F7A5C] transition-colors">{listing.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs font-bold uppercase tracking-widest">
                          <span className="text-gray-400">{listing.type}</span>
                          <span className="text-gray-200">•</span>
                          <span className={
                            listing.status === 'approved' ? 'text-[#1F7A5C]' : 
                            listing.status === 'pending' ? 'text-orange-400' : 'text-red-400'
                          }>
                            {listing.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right mr-4 hidden md:block">
                        <p className="font-black text-[#0F3D2E]">₦{listing.price?.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-400 uppercase font-black">Price</p>
                      </div>
                      <Link href={`/dashboard/agent/listings/${listing.id}`} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-[#0F3D2E] hover:bg-gray-100 transition-all">
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-bold text-[#0F3D2E]">Insights</h3>
            <div className="bg-[#0F3D2E] p-8 rounded-[2rem] text-white space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Performance</p>
                <TrendingUp size={20} className="text-[#1F7A5C]" />
              </div>
              <p className="text-3xl font-black italic">+24%</p>
              <p className="text-sm text-white/80 font-medium leading-relaxed">
                Your listings are receiving more traffic than last week. Keep it up!
              </p>
              <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/40 uppercase font-bold tracking-widest">Views today</span>
                  <span className="font-black">284</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/40 uppercase font-bold tracking-widest">Leads generated</span>
                  <span className="font-black">04</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-gray-100">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-full bg-secondary-color/10 flex items-center justify-center text-secondary-color">
                    <MessageSquare size={18} />
                 </div>
                 <h4 className="font-bold text-[#0F3D2E]">Support</h4>
               </div>
               <p className="text-sm text-gray-500 mb-6">Need help with a listing? Our concierge team is available 24/7.</p>
               <button className="w-full py-4 bg-gray-50 text-[#0F3D2E] rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all">
                 Contact Concierge
               </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
