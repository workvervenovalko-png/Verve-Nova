"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowUpRight, ShieldCheck, Zap, Globe, Cpu, Target, Layers, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />

      {/* Cinematic Studio Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white border-b border-slate-200">
        <div className="absolute top-[20%] left-1/3 w-[500px] h-[500px] bg-blue-500/[0.06] blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="flex flex-col items-center md:items-start gap-6 max-w-5xl text-center md:text-left mx-auto md:mx-0">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#1b67b2]" />
              <span className="text-xs font-black text-[#1b67b2] uppercase tracking-[0.4em]">
                The Studio Profile // Engineering Excellence
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-[0.95] text-slate-950">
              Verve Nova <br /> <span className="text-[#1b67b2]">Technologies.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
              We are an enterprise software engineering and digital transformation studio delivering high-performance, scalable applications to businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Philosophy */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-12 mb-6 text-center md:text-left flex flex-col items-center md:items-start">
              <h2 className="text-xs font-black text-[#1b67b2] uppercase tracking-[0.4em] mb-4 border-l-4 border-[#1b67b2] pl-4">
                Our DNA
              </h2>
              <p className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-950 uppercase leading-tight tracking-tight">
                We don&apos;t just build apps. We engineer high-intensity technical ecosystems for the global enterprise.
              </p>
            </div>
            <div className="lg:col-span-12">
              <div className="flex flex-col gap-8 items-center md:items-start text-center md:text-left">
                <p className="text-base md:text-xl text-slate-600 font-normal leading-relaxed max-w-5xl">
                  Founded on the principles of surgical precision and modern architectures, Verve Nova Technologies is a specialized software studio.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200 w-full">
                  <div className="flex flex-col items-center md:items-start p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                    <span className="text-xs font-black text-[#1b67b2] uppercase tracking-widest block mb-2">
                      Precision First
                    </span>
                    <p className="text-sm font-normal text-slate-600 leading-relaxed">
                      Every line of code is optimized for performance, security, and long-term scalability across modern stacks.
                    </p>
                  </div>
                  <div className="flex flex-col items-center md:items-start p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                    <span className="text-xs font-black text-[#1b67b2] uppercase tracking-widest block mb-2">
                      Modern Cloud & Mobile
                    </span>
                    <p className="text-sm font-normal text-slate-600 leading-relaxed">
                      Containerized microservices, high-throughput APIs, and production Android/web deployments engineered for scale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Standards */}
      <section className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200">
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-[#1b67b2] uppercase tracking-[0.4em] mb-3">
              Engineering Standards
            </h2>
            <p className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight">
              Why Choose Verve Nova?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Surgical Design", desc: "No clutter. Just high-performance interfaces designed for professional business impact.", icon: Target },
              { title: "Enterprise Grade", desc: "Built with modern stacks (Next.js, Node/Python, AI Integrations, Cloud APIs) for extreme scale.", icon: ShieldCheck },
              { title: "Active Intelligence", desc: "Custom LLMs, neural models, and automated data pipelines built seamlessly into your business core.", icon: Zap }
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 md:p-10 rounded-3xl bg-white border border-slate-200 flex flex-col items-center md:items-start text-center md:text-left gap-6 group hover:border-[#1b67b2] hover:shadow-xl transition-all shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1b67b2] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight leading-tight">
              Ready for your <br /> <span className="text-[#1b67b2]">Next Frontier?</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto font-normal">
              Partner with our engineering collective to architect high-performance software systems that scale.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#1b67b2] hover:bg-[#15538e] text-white font-extrabold rounded-full transition-all uppercase text-xs tracking-widest shadow-lg shadow-blue-500/25 active:scale-95"
            >
              <span>Inquire Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
