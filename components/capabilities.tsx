"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const capabilities = [
  {
    id: "01",
    title: "Software Engineering",
    description: "Reliable, high-performance software systems for global enterprise needs.",
    href: "/software-engineering",
    tag: "Core Layer"
  },
  {
    id: "02",
    title: "AI Systems",
    description: "Smart automation and assistants that save your company hours of manual work.",
    href: "/ai-automation",
    tag: "Intelligence"
  },
  {
    id: "03",
    title: "Enterprise Solutions",
    description: "Integrated platforms that keep your entire team in sync and productive.",
    href: "/enterprise-solutions",
    tag: "Efficiency"
  },
  {
    id: "04",
    title: "Cloud Infrastructure",
    description: "Always-on systems that ensure your business never goes offline.",
    href: "/cloud-infrastructure",
    tag: "Stability"
  },
  {
    id: "05",
    title: "Digital Experience",
    description: "Modern websites and apps built to grow your revenue and user base.",
    href: "/digital-experience",
    tag: "Experience"
  },
  {
    id: "06",
    title: "Cybersecurity",
    description: "Total protection for your business data and legal peace of mind.",
    href: "/cybersecurity",
    tag: "Immunity"
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="py-40 bg-background px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-indigo-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 md:gap-10 mb-16 md:mb-32 text-center md:text-left">
          <div className="max-w-2xl flex flex-col items-center md:items-start px-4">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.6em] mb-4 md:mb-6">Execution Pillars</p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-[7vw] font-black text-white tracking-tighter uppercase leading-[0.85]">
              Specialized <br className="hidden md:block" />
              <span className="text-white/10">Capabilities.</span>
            </h2>
          </div>
          <p className="max-w-[240px] md:max-w-[280px] text-[9px] md:text-[10px] font-bold text-white/25 uppercase tracking-widest leading-relaxed">
            The technological architecture we deploy to solve complex enterprise problems at scale.
          </p>
        </div>

        <div className="flex flex-col">
          {capabilities.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={item.href}
                className="group relative flex flex-col md:flex-row items-center justify-between py-10 md:py-12 border-b border-white/[0.04] transition-all duration-700 hover:px-8 first:border-t text-center md:text-left"
              >
                {/* Hover Background */}
                <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10 rounded-2xl" />
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 -z-20 rounded-2xl" style={{ boxShadow: "inset 0 0 80px rgba(99, 102, 241, 0.03)" }} />

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 mb-6 md:mb-0">
                  <span className="text-[10px] md:text-xs font-black text-white/10 group-hover:text-indigo-400 transition-colors font-mono tracking-tighter">
                    {item.id}
                  </span>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-[8px] md:text-[9px] font-black text-indigo-500/60 uppercase tracking-[0.3em] mb-2 scale-x-90 origin-left opacity-0 md:group-hover:opacity-100 transition-all duration-500">
                      {item.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-5xl font-black text-white/90 uppercase tracking-tighter group-hover:text-indigo-400 transition-all duration-500">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-16 w-full md:w-auto max-w-xl">
                  <p className="text-xs md:text-base text-white/25 font-light leading-relaxed group-hover:text-white/50 transition-colors duration-500 px-6 md:px-0">
                    {item.description}
                  </p>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/[0.06] flex items-center justify-center text-white/15 group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-violet-600 group-hover:text-white group-hover:border-transparent group-hover:rotate-45 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-700">
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
