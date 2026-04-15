"use client";

import { motion } from "framer-motion";

const logos = [
  "CRYPTON", "NEXUS", "VENTURE", "ORBIT", "QUANTUM", "VELOCITY", "CORE", "APEX", "INFRA", "SYSTEMS"
];

export function TrustStrip() {
  return (
    <section className="py-20 bg-background border-y border-white/[0.04] overflow-hidden relative">
      {/* Subtle glow line at top */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="text-[10px] font-bold tracking-[0.6em] text-white/20 uppercase">
          Trusted by growing startups, SMEs, and enterprise clients
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 md:gap-24 items-center whitespace-nowrap px-6 md:px-12"
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="text-4xl font-black text-white/[0.06] tracking-tighter uppercase transition-all pointer-events-none hover:text-white/10"
            >
              {logo}
            </div>
          ))}
        </motion.div>

        {/* Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent z-10" />
      </div>
    </section>
  );
}
