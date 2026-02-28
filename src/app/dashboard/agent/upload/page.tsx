"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  Upload, 
  Home, 
  MapPin, 
  Info, 
  DollarSign, 
  BedDouble, 
  Bath, 
  Square,
  Loader2,
  CheckCircle,
  X,
  Plus
} from "lucide-react";

export default function UploadPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/');
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== 'agent') {
        router.push('/');
        return;
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <Loader2 className="animate-spin text-[#0F3D2E]" size={40} />
      </div>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // For now, we will use mock images or just collect URLs
    // In a real prod app, we'd use supabase.storage.upload
    const file = e.target.files?.[0];
    if (file) {
      setUploadingImage(true);
      // Simulate upload
      setTimeout(() => {
        const mockUrl = URL.createObjectURL(file);
        setImages([...images, mockUrl]);
        setUploadingImage(false);
      }, 1000);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Please sign in to upload properties");
      setLoading(false);
      return;
    }

    const propertyData = {
      title: formData.get("title"),
      price: parseFloat(formData.get("price") as string),
      address: formData.get("address"),
      city: formData.get("city"),
      beds: parseInt(formData.get("beds") as string) || 0,
      baths: parseFloat(formData.get("baths") as string) || 0,
      sqft: parseInt(formData.get("sqft") as string) || 0,
      type: formData.get("category"),
      description: formData.get("description"),
      images: images,
      user_id: user.id,
      status: 'pending'
    };

    const { error } = await supabase.from("listings").insert([propertyData]);

    if (error) {
      alert("Error uploading property: " + error.message);
    } else {
      router.push("/dashboard/agent");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-12">
            <h1 className="text-4xl font-black text-[#0F3D2E] tracking-tight">Post New Listing</h1>
            <p className="text-gray-500 font-medium italic mt-2">Fill in the details below to list your property for review.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Basic Info */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 space-y-8">
              <div className="flex items-center gap-4 text-[#1F7A5C]">
                <Home size={28} />
                <h3 className="text-xl font-bold uppercase tracking-widest">Property Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Property Title</label>
                  <input name="title" required placeholder="Luxury 4 Bedroom Duplex" className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#0F3D2E]/20 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Price (₦)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input name="price" type="number" required placeholder="45,000,000" className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#0F3D2E]/20 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Category</label>
                  <select name="category" className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#0F3D2E]/20 outline-none transition-all">
                    <option value="buy">For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="sell">Lease</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">City</label>
                  <input name="city" required placeholder="Lagos" className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#0F3D2E]/20 outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input name="address" required placeholder="15 Ikoyi Road, Lagos Nigeria" className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#0F3D2E]/20 outline-none transition-all" />
                </div>
              </div>
            </div>

            {/* Section 2: Details */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 space-y-8">
              <div className="flex items-center gap-4 text-[#1F7A5C]">
                <Info size={28} />
                <h3 className="text-xl font-bold uppercase tracking-widest">Specifications</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Bedrooms</label>
                  <div className="relative">
                    <BedDouble className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input name="beds" type="number" placeholder="4" className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#0F3D2E]/20 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Bathrooms</label>
                  <div className="relative">
                    <Bath className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input name="baths" type="number" step="0.5" placeholder="4.5" className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#0F3D2E]/20 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Total SqFt</label>
                  <div className="relative">
                    <Square className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input name="sqft" type="number" placeholder="2800" className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#0F3D2E]/20 outline-none transition-all" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Property Description</label>
                <textarea name="description" rows={5} placeholder="Describe the property in detail. Mention amenities, school districts, recent updates, etc." className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#0F3D2E]/20 outline-none transition-all resize-none" />
              </div>
            </div>

            {/* Section 3: Media */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 space-y-8">
              <div className="flex items-center gap-4 text-[#1F7A5C]">
                <Upload size={28} />
                <h3 className="text-xl font-bold uppercase tracking-widest">Media & Photos</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((url, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden relative group">
                    <img src={url} className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 p-1 bg-white/80 backdrop-blur-md rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                <label className={`aspect-square rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all ${uploadingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  {uploadingImage ? <Loader2 className="animate-spin text-gray-400" /> : <Plus size={24} className="text-gray-300" />}
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 mt-2">Add Photo</span>
                </label>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl flex items-start gap-4">
                <CheckCircle size={20} className="text-[#1F7A5C] shrink-0 mt-1" />
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  By submitting this property, you agree to our listing guidelines. High-quality photos increase buyer engagement by up to 80%.
                </p>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-6 bg-[#0F3D2E] text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm shadow-2xl shadow-[#0F3D2E]/30 hover:bg-[#1F7A5C] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  Submit Listing for Review
                  <CheckCircle className="group-hover:scale-110 transition-transform" size={18} />
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
