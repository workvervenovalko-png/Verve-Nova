"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  CheckCircle2, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Users, 
  LayoutDashboard, 
  Cpu, 
  Globe, 
  MessageSquare,
  Lock,
  LineChart,
  Smartphone,
  Layers
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const productData: Record<string, any> = {
  "verve-ledger": {
    name: "VNT Billzer",
    tagline: "The Future of Retail Management",
    desc: "VNT Billzer is an institutional-grade SaaS billing and inventory management platform designed for modern shop owners and large-scale retail businesses. It's not just a billing tool; it's a neural center for your entire business operation.",
    color: "from-indigo-500 to-cyan-500",
    icon: LayoutDashboard,
    liveLink: "https://verve-ledger.vercel.app/",
    why: "Traditional billing systems are slow, disconnected, and prone to errors. VNT Billzer synchronizes your inventory, sales, and analytics in real-time, giving you total control from anywhere in the world.",
    for: "Retail chains, wholesalers, pharmaceutical stores, and growing businesses that need robust multi-tenant inventory management.",
    usefulness: "Reduces operational overhead by 40%, eliminates stock leakage, and provides AI-driven insights to predict future sales trends.",
    features: [
      { title: "Smart POS", desc: "Real-time billing with barcode/QR scanning and instant invoice generation.", icon: Zap },
      { title: "Neural Analytics", desc: "Deep insights into sales performance, customer behavior, and profit margins.", icon: BarChart3 },
      { title: "Inventory Mastery", desc: "Automated low-stock alerts, SKU tracking, and multi-warehouse management.", icon: Layers },
      { title: "GST & Compliance", desc: "Automated GST calculations and professional tax-ready reports.", icon: ShieldCheck }
    ],
    sections: [
      {
        title: "Why Choose VNT Billzer?",
        content: "Built on the latest tech stack (Next.js 15, Prisma, MongoDB), VNT Billzer offers unmatched speed and reliability. Whether you're processing 10 or 10,000 invoices a day, the system remains lightning fast."
      },
      {
        title: "Architected for Growth",
        content: "Our multi-tenant architecture allows you to manage multiple branches under one unified dashboard. Role-based access control ensures your data stays secure while your team stays productive."
      }
    ]
  },
  "verve-crm": {
    name: "Verve CRM",
    tagline: "Accelerate Your Sales Velocity",
    desc: "Verve CRM is an intelligent client relationship management system built to transform leads into lifelong customers. It automates the 'boring' parts of sales so your team can focus on closing deals.",
    color: "from-violet-500 to-indigo-600",
    icon: Users,
    liveLink: "https://www.vervenovatechcrm.online/login",
    why: "Losing leads due to poor follow-ups is the #1 killer of business growth. Verve CRM ensures no lead is left behind with automated pipelines and smart reminders.",
    for: "Sales teams, marketing agencies, real estate firms, and service-based businesses looking to scale their client acquisition.",
    usefulness: "Increases lead conversion rates by 60% and reduces manual data entry by automating the sales lifecycle.",
    features: [
      { title: "Lead Automation", desc: "Automatically capture and distribute leads to the right team members.", icon: Globe },
      { title: "Pipeline Vision", desc: "Visual drag-and-drop pipelines to track every deal's progress at a glance.", icon: LineChart },
      { title: "Client Intelligence", desc: "Detailed profiles with history, preferences, and automated follow-up triggers.", icon: MessageSquare },
      { title: "Team Synergy", desc: "Integrated communication tools and performance tracking for sales teams.", icon: Users }
    ],
    sections: [
      {
        title: "Relationship Management 2.0",
        content: "Verve CRM doesn't just store contacts; it manages relationships. Every interaction is logged, analyzed, and optimized to ensure maximum customer satisfaction."
      }
    ]
  },
  "verve-erp": {
    name: "Verve ERP",
    tagline: "The Unified Enterprise OS",
    desc: "Verve ERP is a comprehensive orchestration platform for large-scale operations. It integrates every department—from logistics and HR to finance and production—into a single source of truth.",
    color: "from-cyan-500 to-blue-600",
    icon: Cpu,
    liveLink: "#",
    why: "Large organizations often struggle with fragmented data. Verve ERP breaks down silos, ensuring every department works in harmony with real-time data flow.",
    for: "Manufacturing plants, logistics companies, educational institutions, and large-scale enterprises with complex workflows.",
    usefulness: "Unifies disparate operations, reduces data redundancy, and provides board-level transparency for strategic decision making.",
    features: [
      { title: "Workflow Orchestration", desc: "Design and automate complex multi-departmental workflows.", icon: Cpu },
      { title: "Resource Planning", desc: "Optimize human resources, machinery, and capital allocation.", icon: Layers },
      { title: "Logistics Hub", desc: "Real-time supply chain tracking and fleet management integration.", icon: Globe },
      { title: "Enterprise Security", desc: "Military-grade encryption and comprehensive audit logs for total peace of mind.", icon: Lock }
    ],
    sections: [
      {
        title: "Maximum Transparency",
        content: "Get a 360-degree view of your organization. Monitor every moving part in real-time and make data-driven decisions that impact the bottom line."
      }
    ]
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = productData[slug];

  if (!product) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4 uppercase">Product Not Found</h1>
          <Link href="/" className="text-indigo-400 hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090B] text-white selection:bg-indigo-500/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b ${product.color} opacity-[0.03] blur-[120px] rounded-full pointer-events-none`} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-transparent bg-clip-text bg-gradient-to-r ${product.color} text-[10px] font-black uppercase tracking-[0.4em]`}
              >
                <product.icon className="w-4 h-4 text-white/50" /> {product.name}
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]"
              >
                {product.tagline}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/40 text-lg md:text-xl font-medium leading-relaxed max-w-2xl"
              >
                {product.desc}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                {product.liveLink !== "#" && (
                  <Link 
                    href={product.liveLink} 
                    target="_blank"
                    className="h-16 px-10 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all shadow-2xl"
                  >
                    Experience Live <ArrowUpRight className="ml-2 w-5 h-5" />
                  </Link>
                )}
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="flex-1 relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-20 blur-[100px] rounded-full`} />
              <div className="relative glass-card rounded-[4rem] p-4 border border-white/10 overflow-hidden shadow-2xl">
                 <div className="aspect-[4/3] bg-[#0C0C0F] rounded-[3.5rem] flex items-center justify-center relative overflow-hidden">
                    <product.icon className={`w-32 h-32 text-transparent bg-clip-text bg-gradient-to-br ${product.color} opacity-20`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${product.color} blur-3xl opacity-20`} />
                    </div>
                    <div className="absolute bottom-10 left-10 right-10 p-8 glass rounded-3xl border border-white/10">
                       <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Live Status</p>
                       <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          <p className="text-xl font-black uppercase tracking-tight">Institutional Ready</p>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deep Dive Section */}
      <section className="py-32 px-6 bg-white/[0.01] border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-400">The Problem</h2>
              <p className="text-2xl font-bold leading-tight uppercase tracking-tighter">Why We Built This</p>
              <p className="text-white/40 leading-relaxed">{product.why}</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-400">Target Audience</h2>
              <p className="text-2xl font-bold leading-tight uppercase tracking-tighter">Who Is It For?</p>
              <p className="text-white/40 leading-relaxed">{product.for}</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-400">Business Impact</h2>
              <p className="text-2xl font-bold leading-tight uppercase tracking-tighter">Why Is It Useful?</p>
              <p className="text-white/40 leading-relaxed">{product.usefulness}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Core Capabilities</h2>
             <p className="text-white/40 max-w-xl mx-auto">Every module is engineered for maximum performance and institutional reliability.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {product.features.map((feature: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-500 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.color} p-0.5 mb-6 group-hover:scale-110 transition-transform`}>
                   <div className="w-full h-full bg-[#09090B] rounded-[0.7rem] flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                   </div>
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-sm text-white/30 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Sections */}
      {product.sections.map((section: any, i: number) => (
        <section key={i} className={`py-32 px-6 ${i % 2 === 0 ? 'bg-indigo-600/[0.02]' : ''}`}>
          <div className="max-w-4xl mx-auto text-center space-y-8">
             <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{section.title}</h2>
             <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-light">{section.content}</p>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-32 px-6">
        <div className={`max-w-6xl mx-auto rounded-[4rem] p-12 md:p-24 text-center border border-white/10 relative overflow-hidden bg-gradient-to-br ${product.color} opacity-90`}>
           <div className="absolute inset-0 bg-[#09090B] opacity-80" />
           <div className="relative z-10 space-y-10">
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">Ready to Elevate Your <br /> {product.name}?</h2>
              <p className="text-white/60 text-xl max-w-2xl mx-auto">Join the institutions that are already scaling with Verve Nova technology.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                 <Link 
                    href="/contact"
                    className="h-16 px-12 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest flex items-center justify-center hover:scale-105 transition-all shadow-2xl"
                 >
                    Get Started Now
                 </Link>
                 <Link 
                    href="/"
                    className="h-16 px-12 rounded-2xl bg-white/10 border border-white/20 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center hover:bg-white/20 transition-all"
                 >
                    Explore Other Products
                 </Link>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
