"use client";

import React from "react";
import Link from "next/link";
import {
  Code2,
  Cpu,
  Building2,
  Database,
  Layout,
  BarChart3,
  Cloud,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export function Services() {
  const serviceCategories = [
    {
      title: "Software & Application",
      icon: Code2,
      items: [
        { name: "Web Applications", slug: "web-applications" },
        { name: "Mobile Applications", slug: "mobile-applications" },
        { name: "Enterprise Software", slug: "enterprise-software" },
        { name: "Custom Platforms", slug: "custom-platforms" },
      ],
    },
    {
      title: "AI & Automation",
      icon: Cpu,
      items: [
        { name: "AI Chatbots", slug: "ai-chatbots" },
        { name: "Workflow Automation", slug: "workflow-automation" },
        { name: "Intelligent Systems", slug: "intelligent-systems" },
      ],
    },
    {
      title: "Enterprise Systems",
      icon: Building2,
      items: [
        { name: "CRM Development", slug: "crm-development" },
        { name: "ERP Solutions", slug: "erp-solutions" },
        { name: "Business Automation", slug: "business-automation" },
      ],
    },
    {
      title: "Backend & APIs",
      icon: Database,
      items: [
        { name: "REST APIs", slug: "rest-apis" },
        { name: "Secure Authentication", slug: "secure-authentication" },
        { name: "Payment Integrations", slug: "payment-integrations" },
      ],
    },
    {
      title: "UI/UX & Branding",
      icon: Layout,
      items: [
        { name: "UI/UX Design", slug: "ui-ux-design" },
        { name: "Brand Identity", slug: "brand-identity" },
        { name: "Creative Assets", slug: "creative-assets" },
      ],
    },
    {
      title: "Marketing & Growth",
      icon: BarChart3,
      items: [
        { name: "SEO", slug: "seo" },
        { name: "Performance Marketing", slug: "performance-marketing" },
        { name: "Lead Generation", slug: "lead-generation" },
      ],
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      items: [
        { name: "AWS / GCP Deployment", slug: "cloud-deployment" },
        { name: "CI/CD Pipelines", slug: "cicd-pipelines" },
        { name: "Infrastructure Scaling", slug: "infrastructure-scaling" },
      ],
    },
    {
      title: "Cybersecurity",
      icon: ShieldCheck,
      items: [
        { name: "Security Audits", slug: "security-audits" },
        { name: "Risk Analysis", slug: "risk-analysis" },
        { name: "IT Consulting", slug: "it-consulting" },
      ],
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#f8fafc] border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section (Exact Live Strings + AppSquadz Layout) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#1b67b2] text-xs font-bold uppercase tracking-wider mb-4">
            Digital Services
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] uppercase tracking-tight mb-4">
            Solutions for <span className="text-[#1b67b2]">Your Business</span>
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            High-performance engineering capabilities tailored for rapid scale and digital transformation.
          </p>
        </div>

        {/* AppSquadz Signature 8-Card Grid (Top border line + rounded-br-[40px]) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {serviceCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="group relative bg-white border border-[#e2e8f0] border-t-[5px] border-t-[#1b67b2] p-7 rounded-t-[8px] rounded-br-[40px] rounded-bl-[8px] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1b67b2] flex items-center justify-center mb-6 group-hover:bg-[#1b67b2] group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-[#0f172a] uppercase tracking-tight mb-5 group-hover:text-[#1b67b2] transition-colors">
                    {category.title}
                  </h3>

                  {/* Service Items with Real Slugs */}
                  <ul className="space-y-2.5 mb-6">
                    {category.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/services/${item.slug}`}
                          className="text-xs font-semibold text-[#475569] hover:text-[#1b67b2] flex items-center gap-2 transition-colors group/item"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1b67b2] group-hover/item:scale-125 transition-transform" />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#f1f5f9] flex items-center justify-between">
                  <Link
                    href={`/services/${category.items[0].slug}`}
                    className="text-xs font-bold text-[#1b67b2] hover:text-[#15538e] flex items-center gap-1 uppercase tracking-wider"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
