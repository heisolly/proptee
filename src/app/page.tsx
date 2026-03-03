"use client";

import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Properties from "@/components/Properties";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Fixed header rendered OUTSIDE the scrollable main, always above everything */}
      <Header />

      {/* pt-[72px] = exact height of fixed header so first section is never hidden under it */}
      <main className="min-h-screen pt-[72px]">
        <Hero />
        <Features />
        <About />
        <Properties />
        <Blog />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
