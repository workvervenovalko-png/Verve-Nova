"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, CheckCircle2, Sparkles, Smartphone, Globe, Cloud, Cpu, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const trustItems = [
  { text: "MSME GOVT. OF INDIA REGISTERED", link: "/registry#msme-udyam", icon: Award, highlight: true },
  { text: "ISO 27001 : 2022 CERTIFIED", link: "/registry", icon: ShieldCheck, highlight: false },
  { text: "100% NDA CONFIDENTIALITY", link: "/registry", icon: CheckCircle2, highlight: false },
  { text: "GOOGLE PLAY DEVELOPER VERIFIED", link: "/projects", icon: Smartphone, highlight: true },
  { text: "ENTERPRISE WEB & APP ARCHITECTURE", link: "/services", icon: Globe, highlight: false },
  { text: "AI AUTOMATION & WORKFLOW SYSTEMS", link: "/services", icon: Sparkles, highlight: false },
  { text: "UPWORK TOP RATED AGENCY", link: "/about", icon: Award, highlight: true },
  { text: "50+ PROJECTS DELIVERED GLOBALLY", link: "/projects", icon: Globe, highlight: false },
  { text: "FULL-STACK NEXT.JS & FLUTTER", link: "/services", icon: Cloud, highlight: false },
  { text: "HIGH-PERFORMANCE CLOUD DEPLOYMENTS", link: "/services", icon: Cpu, highlight: false },
];

export function TrustStrip() {
  return (
    <section className="py-7 bg-white border-b border-slate-200 overflow-hidden relative selection:bg-blue-500/20">
      
      {/* Subtitle Header */}
      <div className="max-w-7xl mx-auto px-4 mb-3.5 text-center">
        <p className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.35em] text-slate-400 uppercase">
          Enterprise Trust & Certified Legal Registrations
        </p>
      </div>

      {/* Infinite Moving Marquee Wrapper */}
      <div className="relative flex overflow-hidden w-full select-none">
        
        {/* Continuous Animated Marquee Row with framer-motion */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 32,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex items-center gap-8 sm:gap-12 whitespace-nowrap will-change-transform"
        >
          {/* Duplicated list to ensure seamless endless loop on all resolutions */}
          {[...trustItems, ...trustItems].map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={`${item.text}-${index}`}
                href={item.link}
                className="inline-flex items-center gap-3 text-xs sm:text-[13px] font-extrabold tracking-wider text-slate-600 hover:text-[#1b67b2] transition-colors py-1 group cursor-pointer"
              >
                {/* Dot or Icon */}
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  item.highlight
                    ? "bg-blue-50 text-[#1b67b2] group-hover:bg-[#1b67b2] group-hover:text-white"
                    : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#1b67b2]"
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <span className="uppercase">{item.text}</span>

                {/* Subtle bullet separator */}
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-4 group-hover:bg-[#1b67b2] transition-colors" />
              </Link>
            );
          })}
        </motion.div>

        {/* Soft edge gradient fades for cinematic loop entrance/exit */}
        <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
