"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Building2, 
  Search, 
  Home, 
  MapPin, 
  Trash2, 
  CheckCircle, 
  Clock, 
  X,
  ExternalLink,
  ChevronRight,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PropertiesPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("listings")
      .select("*, profiles(full_name), categories(name)")
      .order("created_at", { ascending: false });

    if (!error) setListings(data || []);
    setLoading(false);
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("listings").update({ status }).eq("id", id);
    if (!error) {
      fetchData();
      setSelectedListing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently archive this asset? This action cannot be undone.")) {
      await supabase.from("listings").delete().eq("id", id);
      fetchData();
    }
  };

  const filteredListings = listings.filter(l => 
    l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* ── Control Bar ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="relative w-full md:w-[400px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-emerald transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search assets by title or location..."
            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-brand-emerald/20 outline-none transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-gray-100 text-xs font-black uppercase tracking-widest text-brand-dark/40 hover:text-brand-dark transition-all">
            <Filter size={16} /> Filters
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-brand-dark text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-emerald transition-all shadow-xl shadow-brand-dark/10">
            Initiate Induction
          </button>
        </div>
      </div>

      {/* ── Asset Table ── */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark/30">Asset Identity</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark/30">Valuation</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark/30">Status</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark/30">Representative</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark/30 text-right">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-brand-emerald border-t-transparent rounded-full animate-spin" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark/20">Syncing Data...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredListings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center text-brand-dark/30 font-serif text-xl italic">
                    No matching assets found in the current jurisdiction.
                  </td>
                </tr>
              ) : (
                filteredListings.map((listing) => (
                  <tr 
                    key={listing.id} 
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                    onClick={() => setSelectedListing(listing)}
                  >
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.25rem] bg-gray-50 flex items-center justify-center text-brand-emerald group-hover:bg-white group-hover:shadow-lg transition-all duration-500 overflow-hidden relative">
                          {listing.images?.[0] ? (
                            <img src={listing.images[0]} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Building2 size={24} />
                          )}
                        </div>
                        <div>
                          <p className="font-serif text-lg text-brand-dark group-hover:text-brand-emerald transition-colors">{listing.title}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1">
                            <MapPin size={10} /> {listing.city || 'Lagos'}, {listing.state || 'NG'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <p className="text-sm font-black text-brand-dark">₦{listing.price?.toLocaleString()}</p>
                      <p className="text-[9px] uppercase font-black text-gray-300 tracking-tighter mt-0.5">{listing.type} • Marketplace</p>
                    </td>
                    <td className="px-10 py-6">
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        listing.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 
                        listing.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          listing.status === 'approved' ? 'bg-emerald-500' : 
                          listing.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                        }`} />
                        {listing.status}
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                          {listing.profiles?.full_name?.charAt(0) || 'A'}
                        </div>
                        <span className="text-xs font-bold text-brand-dark">{listing.profiles?.full_name || 'Anonymous Agent'}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDelete(listing.id); }}
                          className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="p-3 text-brand-emerald bg-brand-emerald/5 rounded-xl">
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Asset Details Modal ── */}
      <AnimatePresence>
        {selectedListing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedListing(null)}
              className="absolute inset-0 bg-brand-dark/40 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100"
            >
              <div className="relative h-64 bg-gray-100">
                {selectedListing.images?.[0] ? (
                  <img src={selectedListing.images[0]} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200">
                    <Building2 size={64} />
                  </div>
                )}
                <button 
                  onClick={() => setSelectedListing(null)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-brand-dark transition-all"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-3xl font-serif text-white">{selectedListing.title}</h3>
                  <p className="text-white/70 text-sm mt-1 flex items-center gap-2">
                    <MapPin size={14} /> {selectedListing.address}
                  </p>
                </div>
              </div>

              <div className="p-10 space-y-8">
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-3xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Financials</p>
                    <p className="text-lg font-black text-brand-dark">₦{selectedListing.price?.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-3xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Taxonomy</p>
                    <p className="text-lg font-black text-brand-dark uppercase tracking-tighter italic">{selectedListing.categories?.name || 'Luxury'}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-3xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Engagement</p>
                    <p className="text-lg font-black text-brand-dark uppercase tracking-tighter">{selectedListing.type}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Executive Narrative</p>
                  <p className="text-brand-dark/70 leading-relaxed italic">
                    {selectedListing.description || "An architectural masterpiece curated for the most discerning expectations. This property represents the pinnacle of contemporary living in Nigeria's most coveted jurisdiction."}
                  </p>
                </div>

                <div className="pt-6 flex gap-4">
                  <button 
                    onClick={() => setSelectedListing(null)}
                    className="flex-1 py-5 rounded-2xl border border-gray-100 font-black uppercase tracking-widest text-[10px] text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    Archive View
                  </button>
                  {selectedListing.status === "pending" && (
                    <button 
                      onClick={() => handleUpdateStatus(selectedListing.id, "approved")}
                      className="flex-1 py-5 rounded-2xl bg-brand-emerald text-white font-black uppercase tracking-widest text-[10px] hover:bg-brand-dark transition-all shadow-xl shadow-brand-emerald/20"
                    >
                      Verify & Publish Asset
                    </button>
                  )}
                  {selectedListing.status === "approved" && (
                    <button 
                      onClick={() => handleUpdateStatus(selectedListing.id, "rejected")}
                      className="flex-1 py-5 rounded-2xl bg-red-500 text-white font-black uppercase tracking-widest text-[10px] hover:bg-red-600 transition-all shadow-xl shadow-red-500/20"
                    >
                      Suspend Listing
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
