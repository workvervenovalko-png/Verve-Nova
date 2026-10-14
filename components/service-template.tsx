"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 border-b border-slate-200 bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-6">
              Engineering Pillar
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-tight mb-6 text-slate-950 uppercase">
              {title}
            </h1>
            <p className="text-lg md:text-2xl text-slate-600 font-normal max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-xs font-black tracking-[0.4em] text-[#1b67b2] uppercase">
                How We Help
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lg md:text-2xl text-slate-700 leading-relaxed font-normal">
                {overview}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverable List */}
      <section className="py-24 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs font-black tracking-[0.4em] text-[#1b67b2] uppercase mb-12">
            {deliverableLabel}
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {deliverables.map((item, index) => (
              <div 
                key={item.title} 
                className="p-8 md:p-10 rounded-2xl bg-white border border-slate-200 hover:border-[#1b67b2] hover:shadow-xl transition-all duration-300 group shadow-xs"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl md:text-2xl font-black group-hover:text-[#1b67b2] transition-colors uppercase tracking-tight text-slate-900">
                    {item.title}
                  </h3>
                  <span className="text-[#1b67b2] font-mono font-bold text-lg">0{index + 1}</span>
                </div>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24 px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs font-black tracking-[0.4em] text-[#1b67b2] uppercase mb-12">
            Core Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {capabilities.map((capability, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 py-6 border-b border-slate-200 group hover:border-[#1b67b2] transition-all"
              >
                <span className="text-[#1b67b2] font-mono font-bold text-base">0{index + 1}</span>
                <span className="text-base md:text-lg font-bold text-slate-800 group-hover:text-[#1b67b2] group-hover:translate-x-1 transition-transform">
                  {capability}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 text-center bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-slate-950 uppercase">
            Ready to Build Your System?
          </h2>
          <p className="text-slate-600 text-base md:text-lg mb-10 max-w-xl mx-auto">
            Discuss your technical architecture and receive a tailored deployment blueprint from our senior team.
          </p>
          <Link 
            href="/#contact" 
            className="inline-flex items-center gap-3 px-10 py-4.5 bg-[#1b67b2] hover:bg-[#15538e] text-white font-extrabold rounded-xl shadow-lg shadow-blue-500/25 transition-all uppercase text-xs tracking-widest active:scale-95"
          >
            {ctaText}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
