import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Upload, Home, CheckCircle, Info } from "lucide-react";

export default function ListPropertyPage() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      <Header />
      
      {/* Hero Header */}
      <section className="relative h-[40vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1582408921715-18e7806365c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="List Property"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-color/90 backdrop-blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">List Your Property</h1>
          <p className="text-xl text-gray-200">Reach thousands of verified buyers and tenants across Nigeria.</p>
        </div>
      </section>

      <div className="section-padding">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Form Side */}
            <div className="flex-[2]">
              <div className="bg-white p-10 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                <form className="space-y-10">
                  
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-2xl font-bold text-primary-color mb-8 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-secondary-color/10 text-secondary-color flex items-center justify-center text-sm">1</span>
                      Basic Property Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Property Title</label>
                        <input type="text" placeholder="e.g. Luxury 4 Bedroom Semi-Detached Duplex" className="w-full px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-1 focus:ring-secondary-color" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Price (₦)</label>
                        <input type="text" placeholder="e.g. 45,000,000" className="w-full px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-1 focus:ring-secondary-color" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Category</label>
                        <select className="w-full px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-1 focus:ring-secondary-color">
                          <option>For Sale</option>
                          <option>For Rent</option>
                          <option>Investment Property</option>
                          <option>Shortlet</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Property Type</label>
                        <select className="w-full px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-1 focus:ring-secondary-color">
                          <option>House / Duplex</option>
                          <option>Apartment / Flat</option>
                          <option>Land</option>
                          <option>Commercial</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Location & Details */}
                  <div>
                    <h3 className="text-2xl font-bold text-primary-color mb-8 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-secondary-color/10 text-secondary-color flex items-center justify-center text-sm">2</span>
                      Location & Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Exact Address</label>
                        <input type="text" placeholder="e.g. 15 Ikoyi Road, Lagos" className="w-full px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-1 focus:ring-secondary-color" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">City</label>
                        <input type="text" placeholder="Lagos" className="w-full px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-1 focus:ring-secondary-color" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Bedrooms</label>
                        <input type="number" placeholder="4" className="w-full px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-1 focus:ring-secondary-color" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Bathrooms</label>
                        <input type="number" placeholder="5" className="w-full px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-1 focus:ring-secondary-color" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Size (SqFt/Plots)</label>
                        <input type="text" placeholder="2500" className="w-full px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-1 focus:ring-secondary-color" />
                      </div>
                    </div>
                  </div>

                  {/* Media Upload */}
                  <div>
                    <h3 className="text-2xl font-bold text-primary-color mb-8 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-secondary-color/10 text-secondary-color flex items-center justify-center text-sm">3</span>
                      Media & Verification
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center hover:border-secondary-color/50 transition-colors group cursor-pointer">
                        <Upload size={48} className="mx-auto text-gray-400 group-hover:text-secondary-color mb-4 transition-colors" />
                        <h4 className="font-bold text-primary-color mb-2">Upload Property Photos</h4>
                        <p className="text-gray-500 text-sm">Drag and drop or click to browse. (Max 15 photos, Min 5 recommended)</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-secondary-color/5 border border-secondary-color/10 flex items-start gap-4">
                        <Info size={24} className="text-secondary-color shrink-0 mt-1" />
                        <p className="text-sm text-gray-600">
                          <b>Verification Note:</b> Our team will review your submission and may ask for additional documentation (e.g. C of O, Governor&apos;s Consent) to ensure transparency for our community.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full btn btn-primary py-6 rounded-2xl text-xl font-bold italic shadow-xl shadow-primary-color/20">
                    Submit Property for Review
                  </button>

                </form>
              </div>
            </div>

            {/* Info Side */}
            <div className="flex-1 space-y-8">
              <div className="bg-primary-color text-white p-10 rounded-3xl shadow-xl">
                 <h4 className="text-2xl font-bold mb-6 italic">Why list with Proptee?</h4>
                 <ul className="space-y-6">
                    {[
                      "Reach over 50,000 monthly visitors.",
                      "Free professional photography for premium listings.",
                      "Zero hidden fees. We only win when you do.",
                      "Automated matching with qualified buyers.",
                      "Seamless legal & closing support."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <CheckCircle size={20} className="text-secondary-color shrink-0 mt-1" />
                        <span className="text-white/80 font-medium italic">{item}</span>
                      </li>
                    ))}
                 </ul>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
                 <Image 
                   src="https://proptee.ng/wp-content/uploads/2023/07/feature-01.jpg" 
                   alt="Listing Help" 
                   width={300} 
                   height={200} 
                   className="rounded-2xl mx-auto mb-6 object-cover h-40"
                 />
                 <h4 className="text-xl font-bold text-primary-color mb-2 italic">Need Assistance?</h4>
                 <p className="text-gray-500 mb-6">Our listing specialists are ready to guide you through the process.</p>
                 <button className="text-secondary-color font-bold flex items-center gap-2 mx-auto hover:gap-3 transition-all">
                    Chat with an Expert <Home size={18} />
                 </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
