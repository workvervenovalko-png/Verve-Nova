"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowUpRight, ShieldCheck, Zap, Globe, Cpu, Target, Layers } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Cinematic Studio Hero */}
      <section className="relative pt-32 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-[20%] left-1/3 w-[500px] h-[500px] bg-indigo-500/[0.05] blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center md:items-start gap-6 md:gap-8 max-w-5xl text-center md:text-left mx-auto md:mx-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <span className="text-xs font-black text-indigo-400 uppercase tracking-[0.5em]">The Studio Profile // Engineering Excellence</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-7xl md:text-[10vw] font-black tracking-tighter uppercase leading-[0.85] text-white"
            >
              Verve Nova <br /> <span className="text-white/10">Technologies.</span>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Mission & Philosophy */}
      <section className="py-20 md:py-32 bg-[#0C0C0F] border-y border-white/[0.04]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
            <div className="lg:col-span-12 mb-6 md:mb-10 text-center md:text-left flex flex-col items-center md:items-start">
              <h2 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-8 md:mb-12 border-l-4 border-indigo-500 pl-6">Our DNA</h2>
              <p className="text-3xl md:text-5xl font-black text-white uppercase leading-[0.9] tracking-tighter">
                We don&apos;t just build apps. We engineer high-intensity technical ecosystems for the global enterprise.
              </p>
            </div>
            <div className="lg:col-span-12">
              <div className="flex flex-col gap-8 md:gap-10 items-center md:items-start text-center md:text-left">
                <p className="text-xl md:text-3xl text-white/25 font-bold leading-relaxed uppercase max-w-5xl">
                  Founded on the principles of surgical precision and matte-black aesthetics, Verve Nova Technologies is a specialized software studio.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-10 md:pt-12 border-t border-white/[0.04] w-full">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-4">Precision First</span>
                    <p className="text-sm font-bold text-white/20 uppercase leading-relaxed">
                      Every line of code is optimized for performance, security, and long-term scalability.
                    </p>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-4">Global Deployment</span>
                    <p className="text-sm font-bold text-white/20 uppercase leading-relaxed">
                      Operating across 12+ countries, our systems handle enterprise-grade loads with 99.9% uptime.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Standards */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        {/* Ambient orb */}
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-xs font-black text-indigo-400 uppercase tracking-[0.5em] mb-4">Engineering Standards</h2>
            <p className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Why Choose Verve Nova?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Surgical Design", desc: "No clutter. Just high-performance interfaces designed for professional impact.", icon: Target },
              { title: "Enterprise Grade", desc: "Built with modern stacks (Next.js, Go, AI-Integrations) for extreme scale.", icon: ShieldCheck },
              { title: "Active Intelligence", desc: "Custom LLMs and data pipelines built into your business core.", icon: Zap }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8 group hover:glass-card-hover transition-all duration-500"
              >
                <div className="w-12 md:w-14 h-12 md:h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)] group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 md:w-6 h-5 md:h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">{item.title}</h3>
                <p className="text-[11px] md:text-sm font-bold text-white/25 uppercase leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-40 bg-[#0C0C0F] border-t border-white/[0.04]">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-10 md:gap-12">
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              Ready for your <br /> <span className="text-white/10">Next Frontier?</span>
            </h2>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-6 px-10 md:px-12 py-5 md:py-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black rounded-full hover:shadow-[0_0_32px_rgba(99,102,241,0.3)] transition-all uppercase text-[10px] tracking-[0.4em] shadow-2xl"
            >
              Inquire Project
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
