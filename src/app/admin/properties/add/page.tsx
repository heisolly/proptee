"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  Image as ImageIcon,
  MapPin,
  Tag,
  DollarSign,
  Info,
  CheckCircle2,
  Loader2,
  LogOut,
  X
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AddPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    type: "For Sale",
    category_id: "",
    images: ["", "", "", "", ""] // 5 Image Slots as requested
  });

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from("categories").select("*");
      if (data) {
        setCategories(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, category_id: data[0].id }));
        }
      }
    }
    fetchCategories();
  }, []);

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();

      // Clean empty image URLs
      const cleanedImages = formData.images.filter((img) => img.trim() !== "");

      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        address: formData.address,
        type: formData.type,
        listing_type: formData.type, // Supporting both column namings
        category_id: formData.category_id || null,
        images: cleanedImages,
        status: "approved", // Admins approve instantly
        user_id: user?.id,
      };

      const { error } = await supabase.from("listings").insert([propertyData]);

      if (error) {
        throw error;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/properties");
      }, 2000);

    } catch (error: any) {
      alert("Error adding property: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-24 h-24 bg-brand-emerald/10 text-brand-emerald flex items-center justify-center rounded-full">
           <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-serif text-brand-dark">Asset Initialized!</h2>
        <p className="text-gray-500 font-medium">The property is now live and propagating.</p>
        <div className="flex gap-4 pt-4">
          <Loader2 className="animate-spin text-brand-dark" />
          <span className="text-xs font-black uppercase tracking-widest text-brand-dark">Redirecting to Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-brand-dark transition-colors mb-4 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Registry
          </button>
          <h1 className="text-3xl font-serif text-brand-dark">Commission New Asset</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Add a new property to the Proptee portfolio. Changes reflect live immediately.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Core Details */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                <div className="p-2 bg-gray-50 text-gray-400 rounded-lg"><Info size={18} /></div>
                <h3 className="text-lg font-bold text-brand-dark">Core Intelligence</h3>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Asset Title</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    placeholder="e.g. The Elysium Residence"
                    className="w-full text-lg bg-gray-50 border border-transparent focus:bg-white focus:border-brand-emerald/30 rounded-xl px-5 py-3 outline-none transition-all font-medium text-brand-dark"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Executive Narrative (Description)</label>
                  <textarea
                    required
                    placeholder="Provide a compelling overview of the property..."
                    rows={6}
                    className="w-full text-sm bg-gray-50 border border-transparent focus:bg-white focus:border-brand-emerald/30 rounded-xl px-5 py-4 outline-none transition-all font-medium text-brand-dark resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Visual Media (5 Design Templates / Slots) */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                <div className="p-2 bg-gray-50 text-gray-400 rounded-lg"><ImageIcon size={18} /></div>
                <div>
                  <h3 className="text-lg font-bold text-brand-dark">Visual Media Slots</h3>
                  <p className="text-[10px] uppercase font-black tracking-wider text-gray-400">Configure up to 5 visual templates</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formData.images.map((imgUrl, idx) => (
                  <div key={idx} className="space-y-2 group">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-brand-emerald mb-1">Visual Template 0{idx + 1}</label>
                    
                    {imgUrl ? (
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200">
                        <img src={imgUrl} alt={`Template ${idx+1}`} className="object-cover w-full h-full" />
                        <button 
                          type="button"
                          onClick={() => handleImageChange(idx, "")}
                          className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full aspect-[4/3] rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
                        <ImageIcon size={24} strokeWidth={1} className="mb-2" />
                        <span className="text-[10px] font-medium px-4 text-center">Awaiting Image URL</span>
                      </div>
                    )}
                    
                    <input
                      type="url"
                      placeholder="Paste Image URL here..."
                      className="w-full text-xs bg-gray-50 border border-transparent focus:bg-white focus:border-brand-emerald/30 rounded-lg px-3 py-2 outline-none transition-all text-brand-dark"
                      value={imgUrl}
                      onChange={(e) => handleImageChange(idx, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Meta Area */}
          <div className="space-y-8">
            
            {/* Taxonomy & Location */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                <div className="p-2 bg-gray-50 text-gray-400 rounded-lg"><MapPin size={18} /></div>
                <h3 className="text-lg font-bold text-brand-dark">Logistics</h3>
              </div>

              <div className="space-y-5">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Location Strategy</label>
                   <input
                     type="text"
                     required
                     placeholder="e.g. Lekki Phase 1, Lagos"
                     className="w-full text-sm bg-gray-50 border border-transparent focus:bg-white focus:border-brand-emerald/30 rounded-xl px-4 py-3 outline-none transition-all font-medium text-brand-dark"
                     value={formData.address}
                     onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                   />
                </div>

                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Asset Taxonomy</label>
                   <select
                     className="w-full text-sm bg-gray-50 border border-transparent focus:bg-white focus:border-brand-emerald/30 rounded-xl px-4 py-3 outline-none transition-all font-medium text-brand-dark appearance-none"
                     value={formData.category_id}
                     onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                   >
                     <option value="" disabled>Select a categorization</option>
                     {categories.map((c) => (
                       <option key={c.id} value={c.id}>{c.name}</option>
                     ))}
                   </select>
                </div>

                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Configuration</label>
                   <select
                     className="w-full text-sm bg-gray-50 border border-transparent focus:bg-white focus:border-brand-emerald/30 rounded-xl px-4 py-3 outline-none transition-all font-medium text-brand-dark appearance-none"
                     value={formData.type}
                     onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                   >
                     <option value="For Sale">For Sale</option>
                     <option value="For Rent">For Rent</option>
                   </select>
                </div>
              </div>
            </div>

            {/* Financials */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
               <div className="flex items-center gap-3 border-b border-gray-50 pb-4 mb-6">
                <div className="p-2 bg-gray-50 text-emerald-500 rounded-lg"><DollarSign size={18} /></div>
                <h3 className="text-lg font-bold text-brand-dark">Financial Core</h3>
              </div>
              
               <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Market Price (NGN)</label>
               <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₦</span>
                 <input
                   type="number"
                   required
                   min="0"
                   placeholder="0.00"
                   className="w-full text-xl bg-gray-50 border border-transparent focus:bg-white focus:border-brand-emerald/30 rounded-xl pl-9 pr-4 py-3 outline-none transition-all font-black text-brand-dark"
                   value={formData.price}
                   onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                 />
               </div>
               
               {/* Submit Area */}
               <div className="mt-10">
                 <button
                   type="submit"
                   disabled={loading}
                   className="w-full flex items-center justify-center gap-3 bg-brand-emerald text-white rounded-xl py-4 font-black text-[11px] uppercase tracking-widest hover:bg-brand-dark hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                 >
                   {loading ? (
                     <><Loader2 size={16} className="animate-spin" /> Committing Asset...</>
                   ) : (
                     <>Push to Network <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" /></>
                   )}
                 </button>
                 <p className="text-center text-[10px] text-gray-400 mt-4 font-medium italic">
                   Once pushed, the asset will bypass pending status and immediately synchronize across all distribution networks.
                 </p>
               </div>
            </div>
            
          </div>
        </div>
      </form>
    </div>
  );
}
