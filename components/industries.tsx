"use client";

import { motion } from "framer-motion";
import {
  BarChart4,
  Stethoscope,
  ShoppingBag,
  Truck,
  Building2,
  Database,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const sectors = [
  {
    slug: "fintech-banking",
    icon: <BarChart4 className="w-6 h-6" />,
    name: "Fintech & Banking",
    description: "Engineering secure ledger systems, payment gateways, and high-frequency trading infrastructure.",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    slug: "healthcare-tech",
    icon: <Stethoscope className="w-6 h-6" />,
    name: "Healthcare Tech",
    description: "HIPAA-compliant platforms, tele-medicine portals, and advanced patient management systems.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    slug: "ecommerce",
    icon: <ShoppingBag className="w-6 h-6" />,
    name: "E-Commerce",
    description: "Scalable multi-vendor platforms with integrated AI-driven recommendation engines.",
    gradient: "from-indigo-500 to-violet-500"
  },
  {
    slug: "logistics-supply",
    icon: <Truck className="w-6 h-6" />,
    name: "Logistics & Supply",
    description: "Real-time tracking systems and algorithmic route optimization for global shipping fleets.",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    slug: "real-estate-prop",
    icon: <Building2 className="w-6 h-6" />,
    name: "Real Estate & Prop",
    description: "Virtual viewing portals and automated property management software for large-scale developers.",
    gradient: "from-rose-500 to-pink-500"
  },
  {
    slug: "data-ai-saas",
    icon: <Database className="w-6 h-6" />,
    name: "Data & AI-SaaS",
    description: "High-performance data pipelines and custom Large Language Model (LLM) implementations.",
    gradient: "from-violet-500 to-purple-500"
  }
];

export function Industries() {
  return (
    <section id="industries" className="py-32 bg-background relative overflow-hidden section-glow">
      {/* Ambient orb */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-violet-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-20 text-center md:text-left">
          <div className="max-w-2xl flex flex-col items-center md:items-start">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.5em] mb-4">Market Verticals</p>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              Sector <span className="text-white/10">Expertise.</span>
            </h2>
          </div>
          <p className="max-w-xs text-[10px] text-white/20 font-bold uppercase tracking-widest leading-relaxed">
            We provide specialized engineering for complex business environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectors.map((sector, i) => (
            <Link key={i} href={`/industries/${sector.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group glass-card p-10 rounded-[2.5rem] hover:glass-card-hover transition-all duration-500 h-full cursor-pointer flex flex-col items-center text-center md:items-start md:text-left"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sector.gradient} flex items-center justify-center mb-10 group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(99,102,241,0.2)] transition-all duration-500 text-white`}>
                  {sector.icon}
                </div>
                <h3 className="text-xl font-black text-white/90 uppercase tracking-tight mb-4 group-hover:text-indigo-400 transition-colors">
                  {sector.name}
                </h3>
                <p className="text-[13px] md:text-sm text-white/25 font-light leading-relaxed mb-8">
                  {sector.description}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                  Intelligence Brief <ArrowRight className="w-4 h-4 text-indigo-400" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
