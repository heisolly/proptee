import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Sub-page */}
      <section className="relative h-[40vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://proptee.ng/wp-content/uploads/2023/07/connecting-with-customers.jpg"
            alt="Contact Proptee.ng"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0F3D2E]/90 backdrop-blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-200">Have questions? We&apos;re here to help you navigate your real estate journey.</p>
        </div>
      </section>

      <Contact />

      {/* Map Placeholder or FAQ link */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="bg-gray-100 rounded-3xl h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300">
             <div className="text-center">
                <MapPin size={48} className="text-gray-400 mb-4 mx-auto" />
                <p className="text-gray-500 font-medium">Interactive Map Integration Coming Soon</p>
                <p className="text-sm text-gray-400">Lagos HQ • Abuja Branch • Ibadan Office</p>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import { MapPin } from "lucide-react";
