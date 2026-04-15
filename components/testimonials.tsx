"use client";

import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import { testimonials as allTestimonials } from "@/lib/testimonials-data";
import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 3 >= allTestimonials.length ? 0 : prev + 3));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const displayReviews = allTestimonials.slice(index, index + 3);

  return (
    <section className="py-28 bg-[#0C0C0F] relative overflow-hidden section-glow">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/[0.04] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-xl">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.5em] mb-4">What Our Clients Say</p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none">
              Trusted by <span className="text-white/10">People Globally</span>
            </h2>
          </div>

          <Link
            href="/testimonials"
            className="group flex items-center gap-3 text-[10px] font-bold text-white/40 uppercase tracking-widest hover:text-indigo-400 transition-colors"
          >
            View All 30+ Reviews <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[350px]">
          <AnimatePresence mode="wait">
            {displayReviews.map((review, i) => (
              <motion.div
                key={`${review.name}-${index}`}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-10 rounded-[2.5rem] flex flex-col relative group hover:glass-card-hover transition-all duration-500"
              >
                <Quote className="w-12 h-12 text-white/[0.04] absolute top-8 right-8 transition-colors group-hover:text-indigo-500/10" />
                <div className="mb-8">
                  <div className="flex gap-1.5 mb-6">
                    {[...Array(review.stars)].map((_, s) => (
                      <div key={s} className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_0_6px_rgba(245,158,11,0.3)]" />
                    ))}
                  </div>
                  <p className="text-lg text-white/50 font-light leading-relaxed relative z-10">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-4 border-t border-white/[0.04] pt-8">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-xs shadow-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white/80 leading-none mb-1 uppercase tracking-tight">{review.name}</h4>
                    <p className="text-[9px] font-black text-indigo-400/60 uppercase tracking-widest leading-none">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
