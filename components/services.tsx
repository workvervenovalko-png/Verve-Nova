"use client";

import {
  Code2,
  Cpu,
  Building2,
  Database,
  Layout,
  BarChart3,
  Cloud,
  ShieldCheck,
} from "lucide-react";
import { MagneticCard } from "@/components/ui/magnetic-card";
import { motion } from "framer-motion";
import Link from "next/link";

const serviceCategories = [
  {
    title: "Software & Application",
    items: [
      { name: "Web Applications", slug: "web-applications" },
      { name: "Mobile Applications", slug: "mobile-applications" },
      { name: "Enterprise Software", slug: "enterprise-software" },
      { name: "Custom Platforms", slug: "custom-platforms" }
    ],
    icon: Code2,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "AI & Automation",
    items: [
      { name: "AI Chatbots", slug: "ai-chatbots" },
      { name: "Workflow Automation", slug: "workflow-automation" },
      { name: "Intelligent Systems", slug: "intelligent-systems" }
    ],
    icon: Cpu,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Enterprise Systems",
    items: [
      { name: "CRM Development", slug: "crm-development" },
      { name: "ERP Solutions", slug: "erp-solutions" },
      { name: "Business Automation", slug: "business-automation" }
    ],
    icon: Building2,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Backend & APIs",
    items: [
      { name: "REST APIs", slug: "rest-apis" },
      { name: "Secure Authentication", slug: "secure-authentication" },
      { name: "Payment Integrations", slug: "payment-integrations" }
    ],
    icon: Database,
    gradient: "from-orange-500 to-amber-600",
  },
  {
    title: "UI/UX & Branding",
    items: [
      { name: "UI/UX Design", slug: "ui-ux-design" },
      { name: "Brand Identity", slug: "brand-identity" },
      { name: "Creative Assets", slug: "creative-assets" }
    ],
    icon: Layout,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    title: "Marketing & Growth",
    items: [
      { name: "SEO", slug: "seo" },
      { name: "Performance Marketing", slug: "performance-marketing" },
      { name: "Lead Generation", slug: "lead-generation" }
    ],
    icon: BarChart3,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: "AWS / GCP Deployment", slug: "cloud-deployment" },
      { name: "CI/CD Pipelines", slug: "cicd-pipelines" },
      { name: "Infrastructure Scaling", slug: "infrastructure-scaling" }
    ],
    icon: Cloud,
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    title: "Cybersecurity",
    items: [
      { name: "Security Audits", slug: "security-audits" },
      { name: "Risk Analysis", slug: "risk-analysis" },
      { name: "IT Consulting", slug: "it-consulting" }
    ],
    icon: ShieldCheck,
    gradient: "from-red-500 to-orange-600",
  }
];


export function Services() {
  return (
    <section id="services" className="py-32 px-4 bg-[#0C0C0F] relative overflow-hidden section-glow">
      {/* Mesh gradient */}
      <div className="absolute inset-0 mesh-gradient-2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-indigo-400 uppercase tracking-[0.5em] mb-6"
          >
            Digital Services
          </motion.h2>
          <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
            Solutions for <br /> <span className="text-gradient">Your Business</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <MagneticCard
                className="glass-card p-8 rounded-[2rem] group hover:glass-card-hover transition-all duration-500 flex flex-col items-center text-center md:items-start md:text-left h-full"
              >
                <div className="flex justify-center md:justify-between items-start mb-8 w-full">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h4 className="text-lg font-black text-white/90 uppercase tracking-tight mb-6">
                  {category.title}
                </h4>

                <ul className="flex flex-col items-center md:items-start gap-3 mt-auto">
                  {category.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/services/${item.slug}`}
                        className="text-[10px] font-bold text-white/30 hover:text-indigo-400 uppercase tracking-[0.1em] flex items-center gap-2 transition-colors group/item"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/20 group-hover/item:bg-indigo-400 group-hover/item:shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-all" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </MagneticCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
