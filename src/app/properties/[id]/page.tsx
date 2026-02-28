import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { BedDouble, Bath, Square, MapPin, Share2, Heart, CheckCircle2, Phone, Calendar } from "lucide-react";

// Mock data fetching for a specific property
const getProperty = (id: string) => {
  const properties = [
    {
      id: "1",
      title: "Ultra-Modern 4 Bedroom Duplex",
      location: "Lekki Phase 1, Lagos",
      price: "₦85,000,000",
      type: "Sale",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6199f7e009?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      description: "Experience luxury living in this architectural masterpiece located in the heart of Lekki Phase 1. This fully detached duplex features state-of-the-art finishes, a spacious rooftop terrace, and a private cinema room. Built with the highest quality materials, this home offers both comfort and sophistication for the modern family.",
      beds: 4,
      baths: 4,
      sqft: 2800,
      features: ["Swimming Pool", "Fitted Kitchen", "CCTV", "24/7 Power", "Boys Quarters", "Home Automation"],
      postedDate: "Oct 20, 2024",
    }
  ];
  return properties.find(p => p.id === id) || properties[0];
};

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = getProperty(params.id);

  return (
    <main className="min-h-screen bg-gray-50/50">
      <Header />
      
      {/* Photo Gallery Hero */}
      <section className="pt-24 lg:pt-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[500px] lg:h-[600px]">
            <div className="lg:col-span-2 relative h-full rounded-2xl overflow-hidden shadow-xl">
               <Image src={property.images[0]} alt={property.title} fill className="object-cover" priority />
            </div>
            <div className="hidden lg:grid grid-rows-2 gap-4 lg:col-span-2 h-full">
               <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <Image src={property.images[1]} alt={property.title} fill className="object-cover" />
               </div>
               <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <Image src={property.images[2]} alt={property.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-all">
                     <span className="text-white font-bold text-lg">+ 12 Photos</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Content */}
            <div className="lg:w-2/3">
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 mb-8">
                <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
                  <div>
                    <span className="bg-secondary-color/10 text-secondary-color px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                      For {property.type}
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-color mb-4">{property.title}</h1>
                    <div className="flex items-center gap-2 text-gray-500 text-lg">
                      <MapPin size={20} className="text-secondary-color" />
                      {property.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl md:text-5xl font-black text-secondary-color mb-4">{property.price}</div>
                    <div className="flex gap-4 justify-end">
                      <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <Share2 size={20} />
                      </button>
                      <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-red-500">
                        <Heart size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 py-8 border-y border-gray-100 mb-10">
                  <div className="text-center">
                    <BedDouble size={32} className="mx-auto text-primary-color mb-3 opacity-70" />
                    <div className="text-xl font-bold text-primary-color">{property.beds}</div>
                    <div className="text-sm text-gray-500">Bedrooms</div>
                  </div>
                  <div className="text-center border-x border-gray-100">
                    <Bath size={32} className="mx-auto text-primary-color mb-3 opacity-70" />
                    <div className="text-xl font-bold text-primary-color">{property.baths}</div>
                    <div className="text-sm text-gray-500">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <Square size={28} className="mx-auto text-primary-color mb-3 opacity-70 mt-1" />
                    <div className="text-xl font-bold text-primary-color">{property.sqft.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Square Ft</div>
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-primary-color mb-6">Property Overview</h3>
                  <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-primary-color mb-6">Premium Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {property.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <CheckCircle2 size={20} className="text-secondary-color shrink-0" />
                        <span className="font-medium text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Contact Agent */}
            <div className="lg:w-1/3">
              <div className="sticky top-28 space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                  <h3 className="text-2xl font-bold text-primary-color mb-8">Schedule a Viewing</h3>
                  <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-gray-50">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-secondary-color shadow-sm">
                       <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Agent" fill className="object-cover" />
                    </div>
                    <div>
                       <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">Expert Agent</div>
                       <div className="text-lg font-bold text-primary-color">Tunde Johnson</div>
                    </div>
                  </div>

                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full px-5 py-4 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:ring-1 focus:ring-secondary-color" />
                    <input type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:ring-1 focus:ring-secondary-color" />
                    <input type="tel" placeholder="Phone Number" className="w-full px-5 py-4 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:ring-1 focus:ring-secondary-color" />
                    <button className="w-full btn btn-primary py-5 rounded-xl font-bold flex items-center justify-center gap-3">
                      <Calendar size={20} />
                      Book Now
                    </button>
                    <button className="w-full border-2 border-secondary-color text-secondary-color py-5 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-secondary-color hover:text-white transition-all">
                      <Phone size={20} />
                      Direct Call
                    </button>
                  </form>
                </div>

                <div className="bg-primary-color p-8 rounded-3xl shadow-xl text-white">
                  <h3 className="text-xl font-bold mb-4">Investment Potential</h3>
                  <p className="text-white/70 mb-6 font-light">This property is located in a high-demand area with an estimated annual appreciation of 12-15%.</p>
                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 italic">
                     &quot;A prime choice for long-term capital preservation.&quot;
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
