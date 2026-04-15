"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";

interface ServicePageProps {
  title: string;
  subtitle: string;
  overview: string;
  deliverables: {
    title: string;
    description: string;
  }[];
  capabilities: string[];
  ctaText: string;
  deliverableLabel?: string;
}

export function ServiceTemplate({
  title,
  subtitle,
  overview,
  deliverables,
  capabilities,
  ctaText,
  deliverableLabel = "What We Deliver"
}: ServicePageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6 border-b border-white/[0.04] relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-2 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-8 text-white">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-white/25 font-light max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-xs font-bold tracking-[0.4em] text-indigo-400 uppercase">How We Help</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-xl md:text-2xl text-white/35 leading-relaxed font-light">
                {overview}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverable List */}
      <section className="py-24 px-6 bg-[#0C0C0F] border-y border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs font-bold tracking-[0.4em] text-white/20 uppercase mb-16">{deliverableLabel}</h2>
          <div className="grid grid-cols-1 gap-6">
            {deliverables.map((item, index) => (
              <div 
                key={item.title} 
                className="glass-card p-10 rounded-2xl hover:glass-card-hover transition-all duration-500 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold group-hover:text-indigo-400 transition-colors uppercase tracking-tight text-white/80">
                    {item.title}
                  </h3>
                  <span className="text-white/8 font-bold text-xl">0{index + 1}</span>
                </div>
                <p className="text-base text-white/25 leading-relaxed max-w-2xl group-hover:text-white/40 transition-colors">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs font-bold tracking-[0.4em] text-white/20 uppercase mb-12">Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {capabilities.map((capability, index) => (
              <div 
                key={index} 
                className="flex items-center gap-6 py-8 border-b border-white/[0.04] group hover:border-indigo-500/20 transition-all"
              >
                <span className="text-white/8 font-bold text-xl group-hover:text-indigo-400 transition-colors">0{index + 1}</span>
                <span className="text-lg md:text-xl font-medium text-white/40 group-hover:translate-x-2 transition-transform group-hover:text-white/70">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-6 text-center bg-[#0C0C0F] border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight text-white">Ready to build?</h2>
          <Link 
            href="/#contact" 
            className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-xl hover:shadow-[0_0_32px_rgba(99,102,241,0.3)] transition-all uppercase text-xs tracking-widest shadow-xl"
          >
            {ctaText}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
