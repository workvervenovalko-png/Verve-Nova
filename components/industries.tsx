"use client";

import React from "react";
import Link from "next/link";
import { 
  BarChart4, 
  Stethoscope, 
  ShoppingBag, 
  Truck, 
  Building2, 
  Database,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export function Industries() {
  const sectors = [
    {
      slug: "fintech-banking",
      icon: BarChart4,
      name: "Fintech & Banking",
      description: "Engineering secure ledger systems, payment gateways, and high-frequency trading infrastructure.",
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      slug: "healthcare-tech",
      icon: Stethoscope,
      name: "Healthcare Tech",
      description: "HIPAA-compliant platforms, tele-medicine portals, and advanced patient management systems.",
      color: "text-blue-600 bg-blue-50",
    },
    {
      slug: "ecommerce",
      icon: ShoppingBag,
      name: "E-Commerce",
      description: "Scalable multi-vendor platforms with integrated AI-driven recommendation engines.",
      color: "text-purple-600 bg-purple-50",
    },
    {
      slug: "logistics-supply",
      icon: Truck,
      name: "Logistics & Supply",
      description: "Real-time tracking systems and algorithmic route optimization for global shipping fleets.",
      color: "text-amber-600 bg-amber-50",
    },
    {
      slug: "real-estate-prop",
      icon: Building2,
      name: "Real Estate & Prop",
      description: "Virtual viewing portals and automated property management software for large-scale developers.",
      color: "text-rose-600 bg-rose-50",
    },
    {
      slug: "data-ai-saas",
      icon: Database,
      name: "Data & AI-SaaS",
      description: "High-performance data pipelines and custom Large Language Model (LLM) implementations.",
      color: "text-indigo-600 bg-indigo-50",
    },
  ];

  return (
    <section id="industries" className="py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section (Exact Verve Nova Strings + AppSquadz Style) */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-16">
          <div className="max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#1b67b2] text-xs font-bold uppercase tracking-wider mb-3">
              Market Verticals
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] uppercase tracking-tight">
              Sector <span className="text-[#1b67b2]">Expertise</span>
            </h2>
          </div>
          <p className="max-w-xs text-xs sm:text-sm text-[#64748b] leading-relaxed text-center md:text-right">
            We provide specialized engineering for complex business environments.
          </p>
        </div>

        {/* 6 Industry Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sectors.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <Link
                  href={`/industries/${sector.slug}`}
                  className="group bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-8 hover:bg-white hover:border-[#1b67b2] hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1b67b2] flex items-center justify-center mb-6 group-hover:bg-[#1b67b2] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold text-[#0f172a] group-hover:text-[#1b67b2] transition-colors mb-3">
                      {sector.name}
                    </h3>

                    <p className="text-sm text-[#475569] leading-relaxed mb-6">
                      {sector.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#e2e8f0] flex items-center justify-between text-xs font-bold text-[#1b67b2] group-hover:text-[#15538e] uppercase tracking-wider">
                    <span>Intelligence Brief</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase text-[#1b67b2] hover:text-[#15538e] tracking-wider"
          >
            <span>Have a specialized industry requirement? Talk to our architects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
