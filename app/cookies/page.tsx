"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Cookie, MousePointer2, Activity, Cpu } from "lucide-react";

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      title: "Essential Telemetry",
      desc: "Critical for session maintenance and secure auth synchronization across our node clusters.",
      icon: Cpu
    },
    {
      title: "UI Optimization",
      desc: "Anonymous tracking of kinetic cursor movements to refine our 'Hollow Editorial' interaction physics.",
      icon: MousePointer2
    },
    {
      title: "Performance Metrics",
      desc: "Monitoring load latencies to ensure your experience remains at the surgical precision standard.",
      icon: Activity
    }
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0C]">
      <Navbar />
      
      <section className="pt-48 pb-24 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-indigo-500/[0.01] blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center md:text-left">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em] mb-6"
          >
            Telemetry // Metadata
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-12"
          >
            Cookie <br /> <span className="text-white/10">Policy.</span>
          </motion.h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {cookieTypes.map((type, i) => (
              <motion.div 
                key={type.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="glass-card p-10 rounded-[2.5rem] border border-white/[0.04] hover:bg-white/[0.02] transition-colors"
              >
                <type.icon className="w-8 h-8 text-indigo-500/40 mb-8" />
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4">{type.title}</h3>
                <p className="text-[11px] text-white/30 font-bold leading-relaxed uppercase">{type.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05]">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8">Management Protocol</h3>
            <p className="text-xs text-white/40 font-bold uppercase tracking-widest leading-loose mb-0">
              You can modulate your metadata footprint directly via your browser's governance settings. Disabling essential telemetry may degrade the structural integrity of the Verve Nova digital experience.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
