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
    <section className="py-16 md:py-24 bg-white">
      <div className="px-5 md:px-8 lg:max-w-[1140px] lg:mx-auto">

        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-serif text-brand-dark tracking-tight">Related Posts</h2>
          <Link
            href="/blog"
            className="luxury-button text-xs md:text-sm"
          >
            Read More
          </Link>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="-mx-5 px-5 md:mx-0 md:px-0">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0">
            {posts.map((post, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-base overflow-hidden group snap-start min-w-[260px] w-[80vw] md:w-auto md:min-w-0 flex-shrink-0 md:flex-shrink-initial"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <p className="text-brand-emerald text-[11px] font-semibold uppercase tracking-wider mb-2 font-sans">
                    {post.category} &middot; {post.date}
                  </p>
                  <Link href={post.href}>
                    <h4 className="text-base md:text-lg font-sans font-semibold text-brand-dark mb-2 leading-snug group-hover:text-brand-emerald transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                  </Link>
                  <p className="text-brand-muted text-sm font-sans leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
