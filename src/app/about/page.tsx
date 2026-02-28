import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Sub-page */}
      <section className="relative h-[40vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://proptee.ng/wp-content/uploads/2023/07/connecting-with-customers.jpg"
            alt="About Proptee.ng"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0F3D2E]/90 backdrop-blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">About Us</h1>
          <p className="text-xl text-gray-200">Building trust and wealth in the Nigerian real estate market.</p>
        </div>
      </section>

      <About />

      {/* Vision & Mission */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-3xl font-bold text-primary-color mb-6">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become the most reliable and innovative real estate platform in Africa, empowering individuals to create sustainable wealth through transparent property ownership and smart investments.
              </p>
            </div>
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-3xl font-bold text-secondary-color mb-6">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To demystify real estate by providing a secure, verified, and accessible marketplace. We aim to bridge the gap between property seekers and verified owners while ensuring every transaction is backed by integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-color mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Transparency", desc: "Openness in every listing and transaction." },
              { title: "Integrity", desc: "Honesty as our primary building block." },
              { title: "Innovation", desc: "Using technology to simplify your search." },
              { title: "Community", desc: "Growing wealth together as one family." }
            ].map((value, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white luxury-card">
                <div className="w-12 h-12 bg-[#0F3D2E]/10 rounded-full flex items-center justify-center text-[#0F3D2E] mx-auto mb-6 font-bold">
                  0{i + 1}
                </div>
                <h4 className="text-xl font-bold text-black mb-2">{value.title}</h4>
                <p className="text-gray-500 font-medium">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
