import React from "react";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
}

const FeatureCard = ({ image, title, description }: FeatureCardProps) => (
  <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 h-full flex flex-col border border-gray-100">
    <div className="relative h-72 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-1000"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </div>
    <div className="p-10 flex flex-col flex-1">
      <h3 className="text-2xl font-bold text-black mb-5 group-hover:text-[#0F3D2E] transition-colors leading-tight tracking-tight">{title}</h3>
      <p className="text-gray-500 mb-8 flex-1 leading-relaxed font-medium">
        {description}
      </p>
      <button className="flex items-center gap-4 text-[#1F7A5C] font-black text-xs uppercase tracking-[0.3em] group-hover:gap-6 transition-all duration-300">
        LEARN MORE <ArrowRight size={18} />
      </button>
    </div>
  </div>
);

const Features = () => {
  return (
    <section className="py-32 bg-[#F2F2F2]/50">
      <div className="container mx-auto px-4 lg:pl-24">
        <div className="max-w-3xl mb-20">
          <span className="text-[#0F3D2E] font-black tracking-[0.4em] uppercase text-xs mb-6 block">Our Expertise</span>
          <h2 className="text-5xl md:text-7xl font-black text-black mb-8 tracking-tighter leading-[0.9]">
              PRECISION <br/>
              <span className="text-[#0F3D2E]">REDEFINED</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed font-medium">
            We deliver institutional-grade real estate solutions across the Nigerian landscape, engineered for reliability and long-term equity growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          <FeatureCard
            image="https://proptee.ng/wp-content/uploads/2023/07/feature-01.jpg"
            title="Premium Rentals"
            description="Luxury residences curated for high-profile living in Nigeria's most prestigious districts."
          />
          <FeatureCard
            image="https://proptee.ng/wp-content/uploads/2023/07/feature-02.jpg"
            title="Smart Investments"
            description="Strategic entry-points into emerging high-yield markets for both retail and institutional capital."
          />
          <FeatureCard
            image="https://proptee.ng/wp-content/uploads/2023/07/feature-03.jpg"
            title="Verified Sales"
            description="Secure property acquisitions backed by rigorous title verification and strategic advisory."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
