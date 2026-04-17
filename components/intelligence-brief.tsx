"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Globe, Cpu, Target, Layers } from "lucide-react";
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
    <main className="min-h-screen bg-background text-white selection:bg-indigo-500/20">
      <Navbar />

      {/* Intelligence Hero */}
      <section className="relative pt-48 pb-24 overflow-hidden border-b border-white/[0.04]">
        <div className="absolute inset-0 bg-indigo-500/[0.02] pointer-events-none" />
        <div className="absolute inset-0 mesh-gradient-2 pointer-events-none opacity-20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col gap-6 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="h-px w-12 bg-indigo-500" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em]">Intelligence Brief // Classified</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-white"
            >
              {title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/40 font-bold leading-tight uppercase max-w-3xl"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Overview & Core Objectives */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                 <h2 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12 border-l-4 border-indigo-600 pl-6">Mission Overview</h2>
                 <p className="text-2xl font-bold text-white/80 uppercase leading-relaxed tracking-tight">
                    {overview}
                 </p>
                 <div className="mt-16 grid grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                       <span className="text-xs font-black text-indigo-400 uppercase tracking-widest leading-none">Status</span>
                       <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Active Ops</span>
                    </div>
                    <div className="flex flex-col gap-2">
                       <span className="text-xs font-black text-indigo-400 uppercase tracking-widest leading-none">Priority</span>
                       <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">High Impact</span>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="lg:col-span-7">
               <div className="grid grid-cols-1 gap-4">
                  {deliverables.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-indigo-500/20 transition-all group overflow-hidden relative"
                    >
                       <div className="absolute inset-0 bg-indigo-500/[0.01] opacity-0 group-hover:opacity-100 transition-opacity" />
                       <div className="relative z-10">
                          <div className="flex justify-between items-start mb-8">
                             <div className="w-12 h-12 rounded-2xl bg-white/[0.05] flex items-center justify-center text-indigo-400 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                <Cpu className="w-5 h-5" />
                             </div>
                             <span className="text-4xl font-black text-white/5 group-hover:text-indigo-500/10 transition-colors">0{i + 1}</span>
                          </div>
                          <h3 className="text-2xl font-black text-white/90 uppercase tracking-tighter mb-4">{item.title}</h3>
                          <p className="text-sm font-bold text-white/30 uppercase leading-relaxed">{item.description}</p>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities Matrix */}
      <section className="py-32 bg-[#020617] relative overflow-hidden border-y border-white/[0.04]">
        <div className="absolute inset-0 bg-indigo-600/5 mix-blend-overlay" />
        <div className="container mx-auto px-6 relative z-10">
           <div className="text-center mb-24">
              <h2 className="text-xs font-black text-indigo-400 uppercase tracking-[0.5em] mb-4">Tactical Matrix</h2>
              <p className="text-4xl font-black text-white uppercase tracking-tighter">System Capabilities</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {capabilities.map((cap, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 flex flex-col items-center text-center gap-6 group hover:bg-indigo-600/10 transition-all">
                   <div className="w-12 h-12 rounded-full border border-indigo-600/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5" />
                   </div>
                   <span className="text-sm font-black text-white uppercase tracking-widest">{cap}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Call to Intelligence */}
      <section className="py-40 relative">
        <div className="container mx-auto px-6 text-center">
           <div className="max-w-3xl mx-auto flex flex-col items-center gap-12">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                 Ready for <br /> <span className="text-white/20">Deployment?</span>
              </h2>
              <Link 
                href="/#contact" 
                className="inline-flex items-center gap-6 px-12 py-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black rounded-full hover:shadow-[0_0_32px_rgba(99,102,241,0.3)] transition-all uppercase text-[10px] tracking-[0.4em] shadow-2xl"
              >
                {ctaText}
                <ArrowRight className="w-5 h-5" />
              </Link>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
