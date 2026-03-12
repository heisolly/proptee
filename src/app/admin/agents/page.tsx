"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  Trash2, 
  X,
  User,
  ShieldCheck,
  Building2,
  ChevronRight,
  MoreVertical,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<any>(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error) setAgents(data || []);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const agentData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      bio: formData.get("bio"),
    };

    if (currentAgent) {
      await supabase.from("agents").update(agentData).eq("id", currentAgent.id);
    } else {
      await supabase.from("agents").insert([agentData]);
    }

    setIsModalOpen(false);
    setCurrentAgent(null);
    fetchAgents();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently remove this agent profile from the ecosystem?")) {
      await supabase.from("agents").delete().eq("id", id);
      fetchAgents();
    }
  };

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* ── Header Control ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="relative w-full md:w-[400px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-emerald transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search the elite team..."
            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-brand-emerald/20 outline-none transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          onClick={() => { setCurrentAgent(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-dark text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-emerald transition-all shadow-xl shadow-brand-dark/10 group active:scale-95"
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500" /> 
          Appoint Agent
        </button>
      </div>

      {/* ── Agents Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 animate-pulse">
              <div className="w-20 h-20 bg-gray-100 rounded-full mb-6 mx-auto" />
              <div className="h-6 bg-gray-100 rounded w-48 mx-auto mb-4" />
              <div className="h-4 bg-gray-100 rounded w-32 mx-auto" />
            </div>
          ))
        ) : filteredAgents.length === 0 ? (
          <div className="col-span-full py-20 text-center text-brand-dark/30 font-serif italic text-2xl">
            No agents found meeting the current query.
          </div>
        ) : (
          filteredAgents.map((agent) => (
            <motion.div 
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] transition-all relative group overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-emerald/5 rounded-bl-full translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform duration-700" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#0F3D2E] to-[#1F7A5C] p-1 shadow-xl mb-6 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full bg-white p-1">
                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-brand-emerald overflow-hidden uppercase font-serif text-3xl">
                      {agent.name.charAt(0)}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-serif text-brand-dark mb-1">{agent.name}</h3>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-emerald mb-8 bg-brand-emerald/5 px-3 py-1 rounded-full">
                  <ShieldCheck size={12} /> Certified Partner
                </div>

                <div className="w-full space-y-4 mb-10">
                  <div className="flex items-center gap-4 text-brand-dark/60">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                      <Mail size={16} />
                    </div>
                    <span className="text-sm font-medium truncate">{agent.email}</span>
                  </div>
                  <div className="flex items-center gap-4 text-brand-dark/60">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                      <Phone size={16} />
                    </div>
                    <span className="text-sm font-medium">{agent.phone || "No secure line"}</span>
                  </div>
                </div>

                <div className="w-full flex gap-3">
                  <button 
                    onClick={() => { setCurrentAgent(agent); setIsModalOpen(true); }}
                    className="flex-1 py-4 rounded-2xl bg-gray-50 text-brand-dark text-[10px] font-black uppercase tracking-widest hover:bg-brand-emerald hover:text-white transition-all"
                  >
                    Edit Profile
                  </button>
                  <button 
                    onClick={() => handleDelete(agent.id)}
                    className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/40 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100"
            >
              <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h3 className="text-2xl font-serif text-brand-dark">
                    {currentAgent ? "Refine Profile" : "Register Agent"}
                  </h3>
                  <p className="text-[10px] text-brand-dark/30 font-black uppercase tracking-widest mt-1">Personnel Ecosystem</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-dark transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-10 space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-2 ml-1">Legal Full Name</label>
                  <input 
                    name="name"
                    defaultValue={currentAgent?.name}
                    required
                    placeholder="e.g. Emmanuel Cole"
                    className="w-full bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-2 ml-1">Secure Email</label>
                  <input 
                    type="email"
                    name="email"
                    defaultValue={currentAgent?.email}
                    required
                    placeholder="name@proptee.com"
                    className="w-full bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-2 ml-1">Communication Line</label>
                  <input 
                    name="phone"
                    defaultValue={currentAgent?.phone}
                    placeholder="+234 ..."
                    className="w-full bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-2 ml-1">Professional Biography</label>
                  <textarea 
                    name="bio"
                    rows={3}
                    defaultValue={currentAgent?.bio}
                    placeholder="Tell the brand's story..."
                    className="w-full bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium resize-none"
                  />
                </div>
                <div className="pt-6">
                  <button 
                    type="submit"
                    className="w-full py-5 rounded-[1.5rem] bg-brand-dark text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-brand-emerald transition-all shadow-xl shadow-brand-dark/10 active:scale-[0.98]"
                  >
                    {currentAgent ? "Finalize Changes" : "Confirm Appointment"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
