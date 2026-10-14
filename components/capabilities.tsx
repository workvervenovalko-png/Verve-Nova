"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ShieldCheck, Lock, Code2, Cpu, Building2, Cloud, Sparkles, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function Capabilities() {
  const capabilities = [
    {
      id: "01",
      title: "Software Engineering",
      description: "Reliable, high-performance software systems for global enterprise needs.",
      href: "/software-engineering",
      tag: "Core Layer",
      icon: Code2,
    },
    {
      id: "02",
      title: "AI Systems",
      description: "Smart automation and assistants that save your company hours of manual work.",
      href: "/ai-automation",
      tag: "Intelligence",
      icon: Cpu,
    },
    {
      id: "03",
      title: "Enterprise Solutions",
      description: "Integrated platforms that keep your entire team in sync and productive.",
      href: "/enterprise-solutions",
      tag: "Efficiency",
      icon: Building2,
    },
    {
      id: "04",
      title: "Cloud Infrastructure",
      description: "Always-on systems that ensure your business never goes offline.",
      href: "/cloud-infrastructure",
      tag: "Stability",
      icon: Cloud,
    },
    {
      id: "05",
      title: "Digital Experience",
      description: "Modern websites and apps built to grow your revenue and user base.",
      href: "/digital-experience",
      tag: "Experience",
      icon: Sparkles,
    },
    {
      id: "06",
      title: "Cybersecurity",
      description: "Total protection for your business data and legal peace of mind.",
      href: "/cybersecurity",
      tag: "Immunity",
      icon: Shield,
    },
  ];

  return (
    <section id="capabilities" className="py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section (Exact Live Verve Nova Strings) */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-16">
          <div className="max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#1b67b2] text-xs font-bold uppercase tracking-wider mb-3">
              Execution Pillars
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] uppercase tracking-tight">
              Specialized <span className="text-[#1b67b2]">Capabilities</span>
            </h2>
          </div>
          <p className="max-w-xs text-xs sm:text-sm text-[#64748b] leading-relaxed text-center md:text-right">
            The technological architecture we deploy to solve complex enterprise problems at scale.
          </p>
        </div>

        {/* 6 Capabilities Cards Grid (AppSquadz Clean Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <Link
                  href={item.href}
                  className="group bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-8 hover:bg-white hover:border-[#1b67b2] hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Top Row: Number & Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1b67b2] flex items-center justify-center group-hover:bg-[#1b67b2] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#1b67b2] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                          {item.tag}
                        </span>
                        <span className="text-lg font-black text-slate-300 group-hover:text-[#1b67b2] transition-colors">
                          {item.id}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#0f172a] group-hover:text-[#1b67b2] transition-colors mb-3">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#475569] leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#e2e8f0] flex items-center justify-between text-xs font-bold text-[#1b67b2] group-hover:text-[#15538e] uppercase tracking-wider">
                    <span>Explore Pillar</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Verve Nova Trust Credentials Banner */}
        <div className="bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#0f172a]">
                100% Intellectual Property & NDA Protected
              </h4>
              <p className="text-xs text-[#64748b]">
                ISO 27001 : 2022 Certified • Ministry of MSME Govt. Registered Entity
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#1b67b2] hover:bg-[#15538e] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all whitespace-nowrap"
          >
            <span>Request Enterprise Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
