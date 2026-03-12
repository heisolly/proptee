"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Tag, Layers, ChevronRight, Hash, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("listing");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("type", { ascending: false });
    
    if (!error) setCategories(data || []);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    await supabase.from("categories").insert([{ name: newName, type: newType }]);
    setNewName("");
    fetchCategories();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Confirm removal of this classification. This will affect asset indexing.")) {
      await supabase.from("categories").delete().eq("id", id);
      fetchCategories();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* ── Registration Panel ── */}
      <div className="lg:col-span-4">
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm sticky top-32 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full translate-x-12 -translate-y-12" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-serif text-brand-dark mb-2 flex items-center gap-3">
              <Database size={24} className="text-brand-emerald" /> Asset Taxonomy
            </h3>
            <p className="text-[10px] text-brand-dark/30 font-black uppercase tracking-widest mb-10">Define your classification logic</p>
            
            <form onSubmit={handleAdd} className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-3 ml-1">Identity Name</label>
                <input 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Waterfront Estates"
                  className="w-full bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-3 ml-1">System Domain</label>
                <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl">
                  {["listing", "blog"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewType(type)}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        newType === type 
                          ? "bg-white text-brand-emerald shadow-sm" 
                          : "text-gray-400 hover:text-brand-dark"
                      }`}
                    >
                      {type === "listing" ? "Real Estate" : "Editorial"}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                type="submit"
                className="w-full py-5 rounded-2xl bg-brand-dark text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-emerald transition-all shadow-xl shadow-brand-dark/10 shadow-xl active:scale-[0.98]"
              >
                Register Category
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Inventory Panels ── */}
      <div className="lg:col-span-8 space-y-12">
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-serif text-brand-dark">Listing Portfolio</h3>
              <p className="text-[10px] text-brand-dark/30 font-black uppercase tracking-widest mt-1">Property classifications</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-emerald/5 flex items-center justify-center text-brand-emerald">
              <Layers size={20} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.filter(c => c.type === "listing").map(category => (
              <motion.div 
                key={category.id} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between p-6 rounded-[1.5rem] bg-gray-50 border border-transparent hover:border-brand-emerald/10 hover:bg-white hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[10px] font-black text-brand-dark/20">
                    <Hash size={14} />
                  </div>
                  <span className="font-serif text-lg text-brand-dark">{category.name}</span>
                </div>
                <button 
                  onClick={() => handleDelete(category.id)} 
                  className="opacity-0 group-hover:opacity-100 w-10 h-10 rounded-xl bg-red-50 text-red-400 hover:text-red-600 transition-all flex items-center justify-center"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
            {categories.filter(c => c.type === "listing").length === 0 && (
              <div className="col-span-full py-10 border-2 border-dashed border-gray-100 rounded-[2rem] text-center text-brand-dark/20 font-serif italic">
                Initial listing census required.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-serif text-brand-dark">Editorial Taxonomy</h3>
              <p className="text-[10px] text-brand-dark/30 font-black uppercase tracking-widest mt-1">Blog classifications</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-emerald/5 flex items-center justify-center text-brand-emerald">
              <Tag size={20} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.filter(c => c.type === "blog").map(category => (
              <motion.div 
                key={category.id} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between p-6 rounded-[1.5rem] bg-gray-50 border border-transparent hover:border-brand-emerald/10 hover:bg-white hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[10px] font-black text-brand-dark/20">
                    <Hash size={14} />
                  </div>
                  <span className="font-serif text-lg text-brand-dark">{category.name}</span>
                </div>
                <button 
                  onClick={() => handleDelete(category.id)} 
                  className="opacity-0 group-hover:opacity-100 w-10 h-10 rounded-xl bg-red-50 text-red-400 hover:text-red-600 transition-all flex items-center justify-center"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
            {categories.filter(c => c.type === "blog").length === 0 && (
              <div className="col-span-full py-10 border-2 border-dashed border-gray-100 rounded-[2rem] text-center text-brand-dark/20 font-serif italic">
                No editorial domains defined.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
