import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Properties from "@/components/Properties";
import Image from "next/image";

export default function PropertiesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Sub-page */}
      <section className="relative h-[40vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Search Properties"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0F3D2E]/90 backdrop-blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Properties</h1>
          <p className="text-xl text-white/80 font-medium">Explore the finest real estate listings across Nigeria.</p>
        </div>
      </section>

      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
           {/* Detailed Search Filter could go here */}
           <div className="bg-white shadow-2xl rounded-[2.5rem] p-8 -mt-24 relative z-20 border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-6">
              <input type="text" placeholder="Search by name/id" className="px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#0F3D2E]/20 text-black font-bold" />
              <select className="px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#0F3D2E]/20 text-black font-bold appearance-none">
                 <option>Property Type</option>
                 <option>Apartment</option>
                 <option>House</option>
                 <option>Land</option>
              </select>
              <select className="px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#0F3D2E]/20 text-black font-bold appearance-none">
                 <option>Sort By</option>
                 <option>Newest first</option>
                 <option>Price: Low to High</option>
                 <option>Price: High to Low</option>
              </select>
              <button className="bg-[#0F3D2E] text-white rounded-2xl py-4 font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-[#0F3D2E]/20">Apply Filters</button>
           </div>
        </div>
      </div>

      <Properties />

      <Footer />
    </main>
  );
}
