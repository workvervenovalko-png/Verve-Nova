"use client";

import React from "react";
import { LayoutDashboard, Users, Cpu, ArrowUpRight, Globe, Activity } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function ProductEcosystem() {
  const products = [
    {
      name: "VNT Billzer",
      slug: "verve-ledger",
      type: "Billing & Inventory",
      desc: "Institutional-grade SaaS platform for retail leaders. High-performance POS with neural analytics.",
      link: "https://verve-ledger.vercel.app/",
      icon: LayoutDashboard,
      status: "Live Now",
    },
    {
      name: "Verve CRM",
      slug: "verve-crm",
      type: "Client Relations",
      desc: "Verve CRM is an intelligent client relationship management system built to transform leads into lifelong customers. It automates the 'boring' parts of sales so your team can focus on closing deals.",
      link: "https://www.vervenovatechcrm.online/login",
      icon: Users,
      status: "Live Now",
    },
    {
      name: "Verve ERP",
      slug: "verve-erp",
      type: "Resource Planning",
      desc: "Verve ERP is a comprehensive orchestration platform for large-scale operations. It integrates every department—from logistics and HR to finance and production—into a single source of truth.",
      link: "/contact?service=erp",
      icon: Cpu,
      status: "Enterprise Early Access",
    },
  ];

  return (
    <section id="products" className="py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section (Exact Verve Nova Strings + AppSquadz Layout) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#1b67b2] text-xs font-bold uppercase tracking-wider mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>The Verve Nova Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] uppercase tracking-tight mb-4">
            Our SaaS <span className="text-[#1b67b2]">Products</span>
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Standardized, high-authority software suites built to digitize your entire enterprise.
          </p>
        </div>

        {/* 3-Column Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, idx) => {
            const Icon = product.icon;
            const isLive = product.status === "Live Now";
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-8 hover:bg-white hover:border-[#1b67b2] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1b67b2] flex items-center justify-center group-hover:bg-[#1b67b2] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-full border ${
                        isLive
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>

                  <Link href={`/products/${product.slug}`} className="block">
                    <h3 className="text-2xl font-black text-[#0f172a] group-hover:text-[#1b67b2] transition-colors leading-tight mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs font-bold text-[#1b67b2] uppercase tracking-wider mb-4">
                      {product.type}
                    </p>
                  </Link>

                  <p className="text-sm text-[#475569] leading-relaxed mb-8">
                    {product.desc}
                  </p>
                </div>

                {/* 2-Button Action Row */}
                <div className="grid grid-cols-2 gap-3 pt-6 border-t border-[#e2e8f0]">
                  <Link
                    href={`/products/${product.slug}`}
                    className="h-11 rounded-xl bg-white border border-[#cbd5e1] hover:border-[#1b67b2] text-[#0f172a] font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all shadow-sm"
                  >
                    View Details
                  </Link>
                  {isLive ? (
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 rounded-xl bg-[#1b67b2] hover:bg-[#15538e] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <span>Live</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      disabled
                      className="h-11 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-not-allowed border border-slate-200"
                    >
                      <span>Soon</span>
                      <Activity className="w-3 h-3 animate-pulse" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
