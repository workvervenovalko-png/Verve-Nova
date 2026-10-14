"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Zap, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";

interface IntelligenceBriefProps {
  title: string;
  subtitle: string;
  overview: string;
  deliverables: {
    title: string;
    description: string;
  }[];
  capabilities: string[];
  ctaText: string;
}

export function IntelligenceBriefTemplate({
  title,
  subtitle,
  overview,
  deliverables,
  capabilities,
  ctaText
}: IntelligenceBriefProps) {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />

      {/* Intelligence Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col gap-6 max-w-5xl">
            <motion.div 
              initial={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-8 bg-[#1b67b2]" />
              <span className="text-[10px] font-black text-[#1b67b2] uppercase tracking-[0.4em]">
                Industry Intelligence Brief
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-tight text-slate-950"
            >
              {title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 1, y: 0 }}
              className="text-lg md:text-2xl text-slate-600 font-normal leading-relaxed uppercase max-w-3xl"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Overview & Core Objectives */}
      <section className="py-24 px-6 relative overflow-hidden bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <h2 className="text-[11px] font-black text-[#1b67b2] uppercase tracking-[0.4em] mb-6 border-l-4 border-[#1b67b2] pl-4">
                  Sector Overview
                </h2>
                <p className="text-xl md:text-2xl font-bold text-slate-800 uppercase leading-relaxed tracking-tight">
                  {overview}
                </p>
                <div className="mt-10 grid grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-black text-[#1b67b2] uppercase tracking-widest leading-none">
                      Operational Status
                    </span>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                      ● Active Architecture
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-black text-[#1b67b2] uppercase tracking-widest leading-none">
                      Security Level
                    </span>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      NDA Compliant
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-6">
                {deliverables.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 1, y: 0 }}
                    className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#1b67b2] hover:bg-white hover:shadow-xl transition-all group overflow-hidden relative shadow-xs"
                  >
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-[#1b67b2] shadow-xs group-hover:bg-[#1b67b2] group-hover:text-white transition-all">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <span className="text-2xl font-black text-[#1b67b2] font-mono">0{i + 1}</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base font-normal text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities Matrix */}
      <section className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-[#1b67b2] uppercase tracking-[0.4em] mb-3">
              Technical Capabilities
            </h2>
            <p className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight">
              Vertical Engineering Stack
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <div 
                key={i} 
                className="p-8 rounded-2xl bg-white border border-slate-200 flex flex-col items-center text-center gap-4 group hover:border-[#1b67b2] hover:shadow-lg transition-all shadow-xs"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1b67b2] group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  {cap}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Intelligence */}
      <section className="py-28 px-6 relative text-center bg-white">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight leading-tight">
            Ready for Custom <br /> <span className="text-[#1b67b2]">Industry Deployment?</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto">
            Our vertical engineering teams deploy specialized solutions aligned with strict regulatory and scale demands.
          </p>
          <Link 
            href="/#contact" 
            className="inline-flex items-center gap-3 px-10 py-4.5 bg-[#1b67b2] hover:bg-[#15538e] text-white font-black rounded-xl shadow-lg shadow-blue-500/25 transition-all uppercase text-xs tracking-widest active:scale-95"
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
