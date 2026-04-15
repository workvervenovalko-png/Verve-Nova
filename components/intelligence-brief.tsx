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
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-600/10">
      <Navbar />

      {/* Intelligence Hero */}
      <section className="relative pt-48 pb-24 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[#020617]/[0.01] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col gap-6 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="h-px w-12 bg-blue-600" />
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em]">Intelligence Brief // Classified</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-[#020617]"
            >
              {title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-500 font-bold leading-tight uppercase max-w-3xl"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Overview & Core Objectives */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                 <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-12 border-l-4 border-blue-600 pl-6">Mission Overview</h2>
                 <p className="text-2xl font-bold text-[#020617] uppercase leading-relaxed tracking-tight">
                    {overview}
                 </p>
                 <div className="mt-16 grid grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                       <span className="text-xs font-black text-blue-600 uppercase tracking-widest leading-none">Status</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Ops</span>
                    </div>
                    <div className="flex flex-col gap-2">
                       <span className="text-xs font-black text-blue-600 uppercase tracking-widest leading-none">Priority</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">High Impact</span>
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
                      className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-600/20 transition-all group"
                    >
                       <div className="flex justify-between items-start mb-8">
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                             <Cpu className="w-5 h-5" />
                          </div>
                          <span className="text-4xl font-black text-slate-100 group-hover:text-blue-50 transition-colors">0{i + 1}</span>
                       </div>
                       <h3 className="text-2xl font-black text-[#020617] uppercase tracking-tighter mb-4">{item.title}</h3>
                       <p className="text-sm font-bold text-slate-500 uppercase leading-relaxed">{item.description}</p>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities Matrix */}
      <section className="py-32 bg-[#020617] relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay" />
        <div className="container mx-auto px-6 relative z-10">
           <div className="text-center mb-24">
              <h2 className="text-xs font-black text-blue-400 uppercase tracking-[0.5em] mb-4">Tactical Matrix</h2>
              <p className="text-4xl font-black text-white uppercase tracking-tighter">System Capabilities</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {capabilities.map((cap, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col items-center text-center gap-6 group hover:bg-blue-600/10 transition-all">
                   <div className="w-12 h-12 rounded-full border border-blue-600/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5" />
                   </div>
                   <span className="text-sm font-black text-white uppercase tracking-widest">{cap}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Call to Intelligence */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6 text-center">
           <div className="max-w-3xl mx-auto flex flex-col items-center gap-12">
              <h2 className="text-5xl md:text-7xl font-black text-[#020617] uppercase tracking-tighter leading-[0.9]">
                 Ready for <br /> <span className="text-slate-300">Deployment?</span>
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
