"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    image: "/hero_background.jpg",
    category: "Investment",
    date: "12 Jan, 2025",
    title: "Why Lekki is Nigeria's fastest-growing real estate market",
    excerpt: "Discover the driving forces behind Lekki's explosive property demand and what it means for investors in 2025.",
    href: "/blog/lekki-market",
  },
  {
    image: "/hero_background.jpg",
    category: "Buying Guide",
    date: "05 Feb, 2025",
    title: "5 things to check before signing any property agreement in Nigeria",
    excerpt: "Protect yourself from common pitfalls — our legal team outlines the most critical due diligence steps.",
    href: "/blog/property-agreement-tips",
  },
  {
    image: "/hero_background.jpg",
    category: "Design",
    date: "22 Feb, 2025",
    title: "Modern vibes: today's most sought-after interior design trends",
    excerpt: "From open-plan living to rooftop terraces — the architectural must-haves dominating high-end Nigerian homes.",
    href: "/blog/design-trends",
  },
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container max-w-[1140px] mx-auto px-6">

        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark uppercase tracking-tight" style={{ fontFamily: "var(--font-bold)" }}>Recent Insights</h2>
          <Link
            href="/blog"
            className="bg-brand-emerald text-white px-8 py-3.5 rounded-lg text-sm font-bold hover:bg-brand-emerald-muted transition-all"
          >
            Read More
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 gap-8 -mx-6 px-6 md:mx-0 md:px-0">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="min-w-[80vw] md:min-w-0 snap-center group"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div>
                <p className="text-brand-emerald text-[11px] font-black uppercase tracking-[0.2em] mb-3 font-sans">
                  {post.category} / {post.date}
                </p>
                <Link href={post.href}>
                  <h4 className="text-lg md:text-xl font-serif text-brand-dark mb-3 leading-snug group-hover:text-brand-emerald transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                </Link>
                <p className="text-brand-dark/50 text-xs md:text-sm font-sans leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
