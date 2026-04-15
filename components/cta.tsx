"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Terminal, Zap } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-32 px-4 bg-[#0A0A0C] overflow-hidden">
      <div className="noise-overlay opacity-[0.02]" />
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500 blur-[120px] rounded-full opacity-10 animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="glass-card p-12 md:p-20 rounded-[4rem] specular-glow"
        >
          <div className="flex justify-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-[0_0_24px_rgba(99,102,241,0.3)]">
              <Terminal className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]">
            Ready to <br /> <span className="text-gradient-aurora">Initiate?</span>
          </h2>
          
          <p className="text-white/20 text-xs md:text-sm font-black tracking-[0.5em] uppercase mb-12 max-w-xl mx-auto leading-relaxed">
            Deployment cycle: READY. Global infrastructure nodes: OPTIMAL. 
            Authorized secure entry protocol awaiting confirmation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="h-16 px-12 text-[10px] font-black tracking-[0.6em] rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-[0_0_32px_rgba(99,102,241,0.4)] transition-all uppercase border-0">
              Launch Core
            </Button>
            <div className="flex items-center gap-3 text-indigo-400/40 text-[10px] font-black tracking-[0.4em] uppercase">
              <Zap className="w-4 h-4" />
              Direct-Sync Available
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
