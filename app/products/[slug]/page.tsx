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
    color: "from-blue-500 to-indigo-600",
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
        content: "Built on modern, resilient architecture (Next.js, Prisma, MongoDB), VNT Billzer offers unmatched speed and reliability. Whether you're processing 10 or 10,000 invoices a day, the system remains lightning fast."
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
    desc: "Verve CRM is an intelligent client relationship management system built to transform leads into lifelong customers. It automates the repetitive parts of sales so your team can focus on closing deals.",
    color: "from-blue-600 to-indigo-700",
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
        title: "Close More Deals with Less Friction",
        content: "With visual deal pipelines, custom fields, and real-time activity feeds, your sales force always knows the next step to convert prospects into revenue."
      },
      {
        title: "Enterprise-Grade Reliability",
        content: "Bank-level encryption, multi-role access controls, and instantaneous syncing across all mobile and web devices."
      }
    ]
  },
  "verve-erp": {
    name: "Verve ERP",
    tagline: "Unify Your Entire Enterprise",
    desc: "Verve ERP connects finance, logistics, human resources, and manufacturing into a single, cohesive source of truth.",
    color: "from-blue-700 to-indigo-800",
    icon: Cpu,
    liveLink: "#",
    why: "Siloed departmental software creates communication blackouts and duplicate effort.",
    for: "Manufacturing facilities, multi-state enterprises, and large distribution firms.",
    usefulness: "Provides leadership with instant end-to-end operational clarity, decreasing reporting delays from weeks to seconds.",
    features: [
      { title: "Unified Ledger", desc: "End-to-end multi-currency double entry financial accounting.", icon: BarChart3 },
      { title: "Supply Chain", desc: "Algorithmic procurement and supply chain orchestration.", icon: Layers },
      { title: "HR & Payroll", desc: "Automated compliance, attendance, payroll, and benefits.", icon: Users },
      { title: "Security Matrix", desc: "Zero-trust audit logs, immutable entries, and regulatory compliance.", icon: ShieldCheck }
    ],
    sections: [
      {
        title: "Next-Generation Operations",
        content: "Engineered from the ground up for extreme concurrency and zero downtime deployments."
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
      <div className="min-h-screen bg-white flex items-center justify-center text-slate-900 p-6">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4 uppercase">Product Not Found</h1>
          <Link href="/" className="text-[#1b67b2] hover:underline font-bold">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest"
              >
                <product.icon className="w-4 h-4 text-[#1b67b2]" /> {product.name}
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-[0.95] text-slate-950">
                {product.tagline}
              </h1>
              <p className="text-slate-600 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
                {product.desc}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                {product.liveLink !== "#" && (
                  <Link 
                    href={product.liveLink} 
                    target="_blank"
                    className="h-14 px-8 rounded-xl bg-[#1b67b2] hover:bg-[#15538e] text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center shadow-lg shadow-blue-500/25 transition-all active:scale-95"
                  >
                    Experience Live <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Link>
                )}
                <Link 
                  href="/#contact"
                  className="h-14 px-8 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-xs uppercase tracking-widest flex items-center justify-center transition-all shadow-xs"
                >
                  Request Technical Demo
                </Link>
              </div>
            </div>

            <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-3xl p-4 border border-slate-200 bg-white overflow-hidden shadow-xl">
                 <div className="aspect-[4/3] bg-slate-50 rounded-2xl flex items-center justify-center relative overflow-hidden border border-slate-100">
                    <product.icon className="w-28 h-28 text-[#1b67b2] opacity-30" />
                    <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md">
                       <p className="text-xs font-bold uppercase tracking-widest text-[#1b67b2] mb-1">Status</p>
                       <div className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          <p className="text-base font-bold uppercase tracking-tight text-slate-900">Institutional Production Ready</p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Section */}
      <section className="py-24 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="space-y-3 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#1b67b2]">The Problem</h2>
              <p className="text-xl font-bold leading-tight uppercase tracking-tight text-slate-900">Why We Built This</p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">{product.why}</p>
            </div>
            <div className="space-y-3 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#1b67b2]">Target Audience</h2>
              <p className="text-xl font-bold leading-tight uppercase tracking-tight text-slate-900">Who Is It For?</p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">{product.for}</p>
            </div>
            <div className="space-y-3 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#1b67b2]">Business Impact</h2>
              <p className="text-xl font-bold leading-tight uppercase tracking-tight text-slate-900">Why Is It Useful?</p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">{product.usefulness}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
             <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-950">Core Capabilities</h2>
             <p className="text-slate-600 text-base max-w-xl mx-auto">Every module is engineered for maximum performance and institutional reliability.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.features.map((feature: any, i: number) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#1b67b2] hover:bg-white hover:shadow-xl transition-all group shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-[#1b67b2]">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 uppercase tracking-tight text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Sections */}
      {product.sections.map((section: any, i: number) => (
        <section key={i} className={`py-20 px-6 border-b border-slate-200 ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
          <div className="max-w-4xl mx-auto text-center space-y-6">
             <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-slate-950">{section.title}</h2>
             <p className="text-base md:text-xl text-slate-600 leading-relaxed font-normal">{section.content}</p>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto rounded-3xl p-10 md:p-16 text-center border border-slate-200 bg-white relative overflow-hidden shadow-lg">
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight text-slate-950">
              Ready to Elevate Your <br /> <span className="text-[#1b67b2]">{product.name}?</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-normal">
              Join the institutions and enterprises scaling their operations with Verve Nova technology.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <Link 
                href="/#contact"
                className="h-14 px-10 rounded-xl bg-[#1b67b2] hover:bg-[#15538e] text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center shadow-lg shadow-blue-500/25 transition-all active:scale-95"
              >
                Get Started Now
              </Link>
              <Link 
                href="/#products"
                className="h-14 px-10 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs uppercase tracking-widest flex items-center justify-center hover:bg-slate-100 transition-all"
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
