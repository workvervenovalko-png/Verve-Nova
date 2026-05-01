"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Users, Cpu, ArrowUpRight, Globe, Activity } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ProductEcosystem() {
  const products = [
    {
      name: "VNT Billzer",
      slug: "verve-ledger",
      type: "Billing & Inventory",
      desc: "Institutional-grade SaaS platform for retail leaders. High-performance POS with neural analytics.",
      link: "https://verve-ledger.vercel.app/",
      icon: LayoutDashboard,
      color: "from-indigo-500 to-cyan-500",
      status: "Live Now"
    },
    {
      name: "Verve CRM",
      slug: "verve-crm",
      type: "Client Relations",
      desc: "Verve CRM is an intelligent client relationship management system built to transform leads into lifelong customers. It automates the 'boring' parts of sales so your team can focus on closing deals.",
      link: "https://www.vervenovatechcrm.online/login",
      icon: Users,
      color: "from-violet-500 to-indigo-600",
      status: "Live Now"
    },
    {
      name: "Verve ERP",
      slug: "verve-erp",
      type: "Resource Planning",
      desc: "Verve ERP is a comprehensive orchestration platform for large-scale operations. It integrates every department—from logistics and HR to finance and production—into a single source of truth.",
      link: "#",
      icon: Cpu,
      color: "from-cyan-500 to-blue-600",
      status: "Coming Soon"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#09090B] relative overflow-hidden">
      {/* Dynamic Background Elements - Aurora Style */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/5 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em]">
            <Globe className="w-4 h-4" /> The Verve Nova Ecosystem
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white font-display tracking-tighter leading-[1] uppercase">
            Our SaaS <br /> 
            <span className="text-gradient-aurora">Products</span>
          </h2>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Standardized, high-authority software suites built to digitize your entire enterprise.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {products.map((product, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 md:p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-2xl hover:bg-white/[0.05] hover:border-indigo-500/50 transition-all duration-700 flex flex-col h-full overflow-hidden shadow-2xl"
            >
              {/* Product Logo & Name Area (Horizontal) */}
              <Link href={`/products/${product.slug}`} className="relative z-10 flex items-center gap-5 mb-8 hover:opacity-80 transition-opacity">
                 <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} p-0.5 shadow-2xl group-hover:scale-110 transition-all duration-500 shrink-0`}>
                    <div className="w-full h-full bg-[#09090B] rounded-[0.9rem] flex items-center justify-center">
                       <product.icon className="w-7 h-7 text-white" />
                    </div>
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white font-display leading-tight">{product.name}</h3>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{product.type}</p>
                 </div>
              </Link>

              {/* Content Section */}
              <div className="flex flex-col flex-grow relative z-10">
                {/* Hover Gradient Overlay */}
                <div className={`absolute -inset-10 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-5 blur-3xl transition-all duration-700 pointer-events-none`} />
                
                <div className="space-y-6 flex-grow relative z-10">
                  <div className="flex justify-between items-start">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border",
                      product.status === "Live Now" ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" : "text-amber-400 border-amber-400/30 bg-amber-400/10"
                    )}>
                      {product.status}
                    </span>
                  </div>

                  <p className="text-sm md:text-base text-white/40 font-medium leading-relaxed">
                    {product.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-10 mt-auto grid grid-cols-2 gap-3">
                  <Link 
                    href={`/products/${product.slug}`}
                    className="h-14 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center hover:bg-white/10 transition-all"
                  >
                    View Details
                  </Link>
                  {product.status === "Live Now" ? (
                    <Link 
                      href={product.link} 
                      target="_blank"
                      className="h-14 rounded-2xl bg-white text-black hover:bg-indigo-600 hover:text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center transition-all group/btn shadow-xl"
                    >
                      Live <ArrowUpRight className="ml-1 w-3 h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Link>
                  ) : (
                    <button 
                      disabled
                      className="h-14 rounded-2xl bg-white/5 border border-white/10 text-white/20 font-black text-[10px] uppercase tracking-widest flex items-center justify-center cursor-not-allowed"
                    >
                      Soon <Activity className="ml-1 w-3 h-3 animate-pulse" />
                    </button>
                  )}
                </div>
              </div>

              {/* Card Gloss Effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
