"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  Tag, 
  DollarSign, 
  Image as ImageIcon, 
  CheckCircle2, 
  ArrowRight,
  ChevronLeft,
  X,
  Plus,
  Home,
  Layers,
  Sparkles
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ListPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    city: "",
    state: "",
    type: "buy",
    category_id: "",
    images: [""],
    beds: "",
    baths: "",
    sqft: ""
  });

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login?redirect=/list-property");
        return;
      }
      setUser(user);

      const { data: cats } = await supabase
        .from("categories")
        .select("*")
        .eq("type", "listing");
      
      if (cats) {
        setCategories(cats);
        if (cats.length > 0) {
          setFormData(prev => ({ ...prev, category_id: cats[0].id }));
        }
      }
    };
    checkAuthAndFetch();
  }, [router]);

  const handleAddImageField = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ""] }));
  };

  const handleRemoveImageField = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      images: prev.images.filter((_, i) => i !== index) 
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("listings").insert([{
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        address: formData.address,
        city: formData.city,
        state: formData.state,
        type: formData.type,
        category_id: formData.category_id,
        images: formData.images.filter(img => img.trim() !== ""),
        beds: parseInt(formData.beds) || null,
        baths: parseFloat(formData.baths) || null,
        sqft: parseInt(formData.sqft) || null,
        user_id: user.id,
        status: "pending"
      }]);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        router.push("/properties");
      }, 5000);
    } catch (err: any) {
      alert(err.message || "An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-32 bg-brand-bg relative overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-emerald/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

        <div className="container max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="mb-16">
              <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-dark/30 hover:text-brand-emerald transition-colors mb-8 group">
                <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
              </Link>
              <h1 className="text-4xl sm:text-6xl font-serif text-brand-dark mb-4 leading-tight">
                Submit Your <br /><span className="text-brand-emerald italic">Architectural Masterpiece.</span>
              </h1>
              <p className="text-brand-dark/50 text-sm font-sans max-w-xl leading-relaxed">
                Enter the details of your property to begin the verification and listing process in the Proptee high-definition marketplace.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[3rem] p-16 sm:p-24 text-center shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-100"
                >
                  <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mx-auto text-brand-emerald mb-10 shadow-lg shadow-emerald-500/10">
                    <Sparkles size={48} />
                  </div>
                  <h2 className="text-4xl font-serif text-brand-dark mb-6">Submission Protocol Accepted</h2>
                  <p className="text-brand-dark/50 text-lg font-sans max-w-md mx-auto leading-relaxed mb-10">
                    Your asset has been queued for verification. Our administrative elite will review and publish within 24 hours.
                  </p>
                  <button 
                    onClick={() => router.push("/properties")}
                    className="luxury-button inline-flex group"
                  >
                    View Global Marketplace <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="mt-8 text-[10px] text-gray-300 font-black uppercase tracking-[0.2em]">Redirecting automatically...</p>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  className="space-y-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Basic Identity */}
                  <div className="bg-white rounded-[3rem] p-10 sm:p-14 shadow-sm border border-gray-50 space-y-10">
                    <div className="flex items-center gap-4 border-b border-gray-50 pb-8">
                      <div className="w-12 h-12 bg-brand-emerald/10 rounded-2xl flex items-center justify-center text-brand-emerald">
                        <Building2 size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif text-brand-dark">Asset Identity</h3>
                        <p className="text-[10px] text-brand-dark/30 font-black uppercase tracking-widest mt-1">Primary definition and narrative</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 ml-1">Asset Title</label>
                        <input 
                          type="text"
                          required
                          value={formData.title}
                          onChange={e => setFormData({...formData, title: e.target.value})}
                          placeholder="e.g. The Sapphire Penthouse"
                          className="w-full bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 ml-1">Market Valuation (₦)</label>
                        <input 
                          type="number"
                          required
                          value={formData.price}
                          onChange={e => setFormData({...formData, price: e.target.value})}
                          placeholder="e.g. 250000000"
                          className="w-full bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 ml-1">Executive Narrative</label>
                      <textarea 
                        rows={4}
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        placeholder="Detail the architectural significance and luxury amenities..."
                        className="w-full bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium resize-none"
                      />
                    </div>
                  </div>

                  {/* Classification & Domain */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-50 space-y-8">
                      <div className="flex items-center gap-3 mb-2">
                        <Tag className="text-brand-emerald" size={18} />
                        <h4 className="text-lg font-serif text-brand-dark">Taxonomy</h4>
                      </div>
                      <div className="space-y-4">
                        <select 
                          value={formData.category_id}
                          onChange={e => setFormData({...formData, category_id: e.target.value})}
                          className="w-full bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium appearance-none cursor-pointer"
                        >
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                        <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl">
                          {["buy", "rent"].map(type => (
                            <button 
                              key={type}
                              type="button"
                              onClick={() => setFormData({...formData, type})}
                              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                formData.type === type ? "bg-white text-brand-emerald shadow-sm" : "text-gray-400"
                              }`}
                            >
                              {type === "buy" ? "For Sale" : "For Lease"}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 space-y-8">
                      <div className="flex items-center gap-3 mb-2">
                        <Layers className="text-brand-emerald" size={18} />
                        <h4 className="text-lg font-serif text-brand-dark">Specifications</h4>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="block text-[8px] font-black uppercase tracking-widest text-brand-dark/30 ml-1">Beds</label>
                          <input type="number" value={formData.beds} onChange={e => setFormData({...formData, beds: e.target.value})} className="w-full bg-gray-100 border-none py-3 px-4 rounded-xl text-center text-sm font-bold" />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-[8px] font-black uppercase tracking-widest text-brand-dark/30 ml-1">Baths</label>
                          <input type="number" step="0.5" value={formData.baths} onChange={e => setFormData({...formData, baths: e.target.value})} className="w-full bg-gray-100 border-none py-3 px-4 rounded-xl text-center text-sm font-bold" />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-[8px] font-black uppercase tracking-widest text-brand-dark/30 ml-1">SqFt</label>
                          <input type="number" value={formData.sqft} onChange={e => setFormData({...formData, sqft: e.target.value})} className="w-full bg-gray-100 border-none py-3 px-4 rounded-xl text-center text-sm font-bold" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Geolocation */}
                  <div className="bg-white rounded-[3rem] p-10 sm:p-14 shadow-sm border border-gray-50 space-y-10">
                    <div className="flex items-center gap-4 border-b border-gray-50 pb-8">
                      <div className="w-12 h-12 bg-brand-emerald/10 rounded-2xl flex items-center justify-center text-brand-emerald">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif text-brand-dark">Geospatial Data</h3>
                        <p className="text-[10px] text-brand-dark/30 font-black uppercase tracking-widest mt-1">Locational coordinates and address</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="md:col-span-2 space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 ml-1">Full Address</label>
                        <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Street Name, Area" className="w-full bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium" />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 ml-1">City</label>
                        <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="e.g. Lagos" className="w-full bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium" />
                      </div>
                    </div>
                  </div>

                  {/* High-Definition Imagery */}
                  <div className="bg-white rounded-[3rem] p-10 sm:p-14 shadow-sm border border-gray-50 space-y-10">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-emerald/10 rounded-2xl flex items-center justify-center text-brand-emerald">
                          <ImageIcon size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-serif text-brand-dark">Visual Assets</h3>
                          <p className="text-[10px] text-brand-dark/30 font-black uppercase tracking-widest mt-1">High-definition image resolution required</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={handleAddImageField}
                        className="p-3 bg-brand-dark text-white rounded-xl hover:bg-brand-emerald transition-all shadow-lg shadow-brand-dark/10"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formData.images.map((url, index) => (
                        <div key={index} className="flex gap-4">
                          <input 
                            type="url"
                            value={url}
                            onChange={e => handleImageChange(index, e.target.value)}
                            placeholder="https://image-url.com/asset.jpg"
                            className="flex-1 bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium"
                          />
                          {formData.images.length > 1 && (
                            <button 
                              type="button"
                              onClick={() => handleRemoveImageField(index)}
                              className="p-4 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                            >
                              <X size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submission Footer */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-10">
                    <div className="flex items-center gap-4 text-brand-dark/40 italic text-sm">
                      <CheckCircle2 className="text-brand-emerald" size={20} />
                      Asset will enter 'Validation Protocol' immediately upon submission.
                    </div>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-16 py-6 bg-brand-dark text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-brand-emerald transition-all shadow-2xl shadow-brand-dark/20 relative overflow-hidden group"
                    >
                      <span className={loading ? "opacity-0" : "flex items-center gap-3"}>
                        Initiate Asset Induction <ArrowRight size={16} />
                      </span>
                      {loading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        </div>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
