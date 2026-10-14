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

const sectors = [
  {
    icon: <BarChart4 className="w-6 h-6" />,
    name: "Fintech & Banking",
    description: "Engineering secure ledger systems, payment gateways, and high-frequency trading infrastructure.",
    color: "bg-emerald-500/10 text-emerald-400"
  },
  {
    icon: <Stethoscope className="w-6 h-6" />,
    name: "Healthcare Tech",
    description: "HIPAA-compliant platforms, tele-medicine portals, and advanced patient management systems.",
    color: "bg-blue-500/10 text-blue-400"
  },
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    name: "E-Commerce",
    description: "Scalable multi-vendor platforms with integrated AI-driven recommendation engines.",
    color: "bg-indigo-500/10 text-indigo-400"
  },
  {
    icon: <Truck className="w-6 h-6" />,
    name: "Logistics & Supply",
    description: "Real-time tracking systems and algorithmic route optimization for global shipping fleets.",
    color: "bg-amber-500/10 text-amber-400"
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    name: "Real Estate & Prop",
    description: "Virtual viewing portals and automated property management software for large-scale developers.",
    color: "bg-white/10 text-white"
  },
  {
    icon: <Database className="w-6 h-6" />,
    name: "Data & AI-SaaS",
    description: "High-performance data pipelines and custom Large Language Model (LLM) implementations.",
    color: "bg-rose-500/10 text-rose-400"
  }
];

export function IndustriesSectors() {
  return (
    <section id="industries" className="py-40 bg-background relative overflow-hidden border-t border-white/[0.04]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-32">
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <p className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest mb-4 leading-none">Market Verticals</p>
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
              Sector <span className="text-gradient">Expertise.</span>
            </h2>
          </div>
          <p className="max-w-xs text-xs text-slate-300 font-medium uppercase tracking-wider leading-relaxed text-center md:text-left mx-auto md:mx-0">
            We provide specialized engineering for complex business environments across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group p-10 rounded-[3rem] glass-card border border-white/10 hover:border-indigo-500/40 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-2xl ${sector.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                {sector.icon}
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-indigo-400 transition-colors duration-300">
                {sector.name}
              </h3>
              <p className="text-sm md:text-base text-slate-200 font-normal leading-relaxed mb-8">
                {sector.description}
              </p>
              <div className="flex items-center gap-3 text-xs font-bold text-indigo-400 uppercase tracking-wider transition-all duration-300">
                Intelligence Brief <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
