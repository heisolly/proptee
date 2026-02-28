import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { DollarSign, Share2, Users, Rocket } from "lucide-react";

export default function AffiliatePage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Sub-page */}
      <section className="relative h-[50vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://proptee.ng/wp-content/uploads/2023/07/connecting-with-customers.jpg"
            alt="Affiliate Program"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">Earn with <span className="text-secondary-color">Proptee</span></h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">Join the biggest real estate affiliate network in Nigeria and start earning massive commissions today.</p>
          <button className="btn btn-green btn-lg px-12 py-5 text-xl">Apply Now</button>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-color mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg">Four simple steps to start your journey as a Proptee Affiliate Partner.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Users />, title: "Sign Up", desc: "Create your free affiliate account in minutes." },
              { icon: <Share2 />, title: "Promote", desc: "Share verified properties with your network." },
              { icon: <Rocket />, title: "Close Deals", desc: "Help clients secure their dream properties." },
              { icon: <DollarSign />, title: "Get Paid", desc: "Earn up to 5% commission on every successful sale." }
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-secondary-color mx-auto mb-6 group-hover:bg-secondary-color group-hover:text-white transition-all shadow-sm">
                  {React.cloneElement(step.icon as React.ReactElement, { size: 32 })}
                </div>
                <h4 className="text-xl font-bold text-primary-color mb-3">{step.title}</h4>
                <p className="text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
           <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                 <h2 className="text-4xl font-bold text-primary-color mb-8">Why Partner with Us?</h2>
                 <ul className="space-y-6">
                    {[
                      "Highest commission rates in the industry.",
                      "Access to exclusive, high-demand verified listings.",
                      "Dedicated affiliate manager to help you close deals.",
                      "Marketing materials and training provided.",
                      "Monthly payouts with transparent tracking dashboard."
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="mt-1 w-6 h-6 rounded-full bg-secondary-color/10 flex items-center justify-center text-secondary-color shrink-0">
                           <div className="w-2 h-2 rounded-full bg-secondary-color"></div>
                        </div>
                        <p className="text-lg text-gray-700">{benefit}</p>
                      </li>
                    ))}
                 </ul>
              </div>
              <div className="flex-1 bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
                 <h3 className="text-2xl font-bold text-primary-color mb-8">Quick Application</h3>
                 <form className="space-y-4">
                    <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 outline-none" />
                    <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 outline-none" />
                    <input type="tel" placeholder="Phone Number" className="w-full px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 outline-none" />
                    <textarea placeholder="Tell us about your network..." rows={3} className="w-full px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 outline-none"></textarea>
                    <button className="w-full btn btn-primary py-5 rounded-xl text-lg font-bold">Submit Application</button>
                 </form>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
