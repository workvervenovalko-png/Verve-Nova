"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import {
  Code2,
  Smartphone,
  Cpu,
  Building2,
  Cloud,
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Sparkles,
  Server,
  Database,
  Lock,
  GitBranch,
  BarChart3,
  Bot,
  Workflow,
  CreditCard,
  Palette,
  Search,
  ChevronRight,
  ExternalLink,
  ShieldAlert
} from "lucide-react";

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: "Web & Mobile" | "AI & Automation" | "Enterprise & Cloud" | "Security & Audits" | "Design & Growth";
  badge: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
  techStack: string[];
  featured?: boolean;
}

const allServices: ServiceItem[] = [
  // Web & Mobile
  {
    id: "web-applications",
    slug: "web-applications",
    title: "Web Application Engineering",
    category: "Web & Mobile",
    badge: "Core Architecture",
    description: "High-performance, responsive, and secure web applications engineered to handle massive concurrent traffic with zero latency bottlenecks.",
    icon: Code2,
    deliverables: ["Enterprise Web Portals", "Multi-tenant SaaS Platforms", "High-Conversion E-Commerce"],
    techStack: ["Next.js", "React", "TypeScript", "Node.js"],
    featured: true,
  },
  {
    id: "mobile-applications",
    slug: "mobile-applications",
    title: "Mobile Application Development",
    category: "Web & Mobile",
    badge: "iOS & Android",
    description: "Native and cross-platform mobile apps built with fluid 60fps animations, offline-first sync engines, and verified store deployment (e.g. ServiceHub on Google Play).",
    icon: Smartphone,
    deliverables: ["Consumer Mobile Ecosystems", "Field Force GPS Tracking", "Real-Time Push & Siren Alerts"],
    techStack: ["React Native", "Flutter", "Kotlin", "Swift"],
    featured: true,
  },
  {
    id: "custom-platforms",
    slug: "custom-platforms",
    title: "Custom Platform Architecture",
    category: "Web & Mobile",
    badge: "Bespoke Engineering",
    description: "Tailor-made software built from the ground up to match unique operational workflows without compromising on scalability or maintainability.",
    icon: Layers,
    deliverables: ["Domain-Specific Architecture", "Custom Logic Engines", "Third-Party API Integrations"],
    techStack: ["PostgreSQL", "Docker", "GraphQL", "Tailwind CSS"],
  },
  {
    id: "rest-apis",
    slug: "rest-apis",
    title: "High-Throughput REST APIs",
    category: "Web & Mobile",
    badge: "Backend Core",
    description: "Clean, documented, and versioned API microservices engineered for low-latency client synchronization and seamless third-party partner integration.",
    icon: Server,
    deliverables: ["Public API Developer Portals", "Mobile Sync Backends", "Rate-Limited Gateway Proxies"],
    techStack: ["Node.js", "Express", "PostgreSQL", "Redis"],
  },
  {
    id: "payment-integrations",
    slug: "payment-integrations",
    title: "Payment Gateway Systems",
    category: "Web & Mobile",
    badge: "Fintech Engine",
    description: "Frictionless, PCI-compliant payment integrations supporting recurring subscriptions, smart dunning, split marketplace disbursements, and multi-currency transactions.",
    icon: CreditCard,
    deliverables: ["Subscription Billing Engines", "Razorpay / Stripe Connect", "Tax & GST Automation"],
    techStack: ["Stripe", "Razorpay", "Webhooks", "PostgreSQL"],
  },

  // AI & Automation
  {
    id: "ai-chatbots",
    slug: "ai-chatbots",
    title: "Enterprise AI Agents & Chatbots",
    category: "AI & Automation",
    badge: "Autonomous AI",
    description: "Conversational assistants and customer support bots powered by LLMs, fine-tuned with company documentation and automated CRM sync.",
    icon: Bot,
    deliverables: ["Multi-Channel Chatbots", "Knowledge Base RAG Engines", "Automated Lead Qualification"],
    techStack: ["OpenAI API", "Claude", "LangChain", "Vector DBs"],
    featured: true,
  },
  {
    id: "workflow-automation",
    slug: "workflow-automation",
    title: "Workflow & Process Automation",
    category: "AI & Automation",
    badge: "Zero Manual Work",
    description: "End-to-end operational automation eliminating repetitive manual tasks between CRM, ERP, messaging channels, and inventory systems.",
    icon: Workflow,
    deliverables: ["Event-Driven Workflows", "Custom Webhooks & Scripting", "Cross-Platform Sync"],
    techStack: ["n8n", "Node.js", "Python", "Zapier"],
  },
  {
    id: "intelligent-systems",
    slug: "intelligent-systems",
    title: "Machine Learning & Predictive Systems",
    category: "AI & Automation",
    badge: "Neural Insights",
    description: "Predictive data modeling and neural analytics that forecast inventory demand, user churn, and business anomalies in real-time.",
    icon: Cpu,
    deliverables: ["Predictive Churn Modeling", "Demand Forecasting", "Automated Anomaly Detection"],
    techStack: ["Python", "TensorFlow", "Scikit-Learn", "FastAPI"],
  },

  // Enterprise & Cloud
  {
    id: "enterprise-software",
    slug: "enterprise-software",
    title: "Enterprise Software Modernization",
    category: "Enterprise & Cloud",
    badge: "Mission Critical",
    description: "Large-scale systems engineered to orchestrate multi-department operations, modernize legacy monoliths, and guarantee 99.9% uptime.",
    icon: Building2,
    deliverables: ["Legacy Monolith Refactoring", "Microservices Migration", "Departmental Orchestration"],
    techStack: ["Microservices", "Docker", "PostgreSQL", "Kubernetes"],
    featured: true,
  },
  {
    id: "crm-development",
    slug: "crm-development",
    title: "Custom CRM Systems",
    category: "Enterprise & Cloud",
    badge: "Pipeline Engine",
    description: "Tailor-made client relationship platforms that track leads from first click to closed deal, built specifically around your sales pipeline.",
    icon: BarChart3,
    deliverables: ["Lead Attribution Tracking", "Automated Follow-ups", "Executive Revenue Dashboards"],
    techStack: ["React", "Node.js", "PostgreSQL", "Supabase"],
  },
  {
    id: "erp-solutions",
    slug: "erp-solutions",
    title: "Enterprise ERP Solutions",
    category: "Enterprise & Cloud",
    badge: "Operations Hub",
    description: "Unified institutional resource planning systems uniting supply chain, warehousing, payroll, and financial ledgers into one truth source.",
    icon: Database,
    deliverables: ["Inventory & Warehouse Sync", "Automated Payroll Modules", "Real-Time Ledger Audits"],
    techStack: ["Next.js", "PostgreSQL", "Redis", "TypeScript"],
  },
  {
    id: "cloud-deployment",
    slug: "cloud-deployment",
    title: "Cloud Infrastructure & Hosting",
    category: "Enterprise & Cloud",
    badge: "High Availability",
    description: "Production cloud environments built on AWS, GCP, and Vercel with automated load balancing, CDN edge caching, and zero-downtime rolling deploys.",
    icon: Cloud,
    deliverables: ["AWS / GCP Cloud Architecture", "Edge CDN Configuration", "Database Sharding & Caching"],
    techStack: ["AWS", "Vercel", "Docker", "Cloudflare"],
  },
  {
    id: "cicd-pipelines",
    slug: "cicd-pipelines",
    title: "CI/CD & DevOps Automation",
    category: "Enterprise & Cloud",
    badge: "Continuous Delivery",
    description: "Automated test suites, linting gates, and staging-to-production pipelines that allow your team to deploy software safely multiple times a day.",
    icon: GitBranch,
    deliverables: ["GitHub Actions Workflows", "Automated Unit/E2E Tests", "Multi-Environment Staging"],
    techStack: ["GitHub Actions", "Docker", "Jest", "Playwright"],
  },

  // Security & Audits
  {
    id: "security-audits",
    slug: "security-audits",
    title: "Cybersecurity & Vulnerability Audits",
    category: "Security & Audits",
    badge: "Zero Vulnerabilities",
    description: "Comprehensive penetration testing and source code security audits to uncover SQLi, XSS, exposed tokens, and infrastructure vulnerabilities.",
    icon: ShieldCheck,
    deliverables: ["Penetration Testing Reports", "OWASP Top 10 Hardening", "Secrets & Env Variable Audit"],
    techStack: ["OWASP", "SSL/TLS", "Burp Suite", "SonarQube"],
    featured: true,
  },
  {
    id: "secure-authentication",
    slug: "secure-authentication",
    title: "Identity & Access Management (IAM)",
    category: "Security & Audits",
    badge: "Role-Based Security",
    description: "Industry-standard authentication architectures with Multi-Factor Authentication (MFA), Single Sign-On (SSO), and granular role permissions.",
    icon: Lock,
    deliverables: ["Role-Based Access Control (RBAC)", "OAuth2 & SSO Integration", "Biometric / OTP Verification"],
    techStack: ["NextAuth", "Supabase Auth", "JWT", "OAuth2"],
  },
  {
    id: "risk-analysis",
    slug: "risk-analysis",
    title: "Technical Risk & Disaster Recovery",
    category: "Security & Audits",
    badge: "Disaster Preparedness",
    description: "Architectural resilience reviews, point-in-time database backups, and emergency failover protocols ensuring business continuity.",
    icon: ShieldAlert,
    deliverables: ["Failover & Backup Runbooks", "Compliance Gap Analysis", "Incident Response Protocols"],
    techStack: ["S3 Backups", "Multi-AZ Cloud", "Redis Sentinel"],
  },

  // Design & Growth
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "UI/UX Product Design",
    category: "Design & Growth",
    badge: "User Experience",
    description: "Research-backed digital interfaces and modern component design systems crafted to elevate brand authority and maximize user conversion.",
    icon: Palette,
    deliverables: ["Interactive Figma Prototypes", "Custom Design Systems", "Responsive Mobile Wireframes"],
    techStack: ["Figma", "Tailwind CSS", "Design Tokens"],
  },
  {
    id: "seo",
    slug: "seo",
    title: "Technical SEO & Speed Optimization",
    category: "Design & Growth",
    badge: "Top Google Ranking",
    description: "Core Web Vitals tuning, structured schema metadata, server-side rendering, and crawl budget optimization for maximum search visibility.",
    icon: Search,
    deliverables: ["Sub-Second Core Web Vitals", "Dynamic OpenGraph & Schema", "Sitemap & Robots Automation"],
    techStack: ["Next.js SSR", "Google Search Console", "Lighthouse"],
  },
];

const categories = ["All Services", "Web & Mobile", "AI & Automation", "Enterprise & Cloud", "Security & Audits", "Design & Growth"] as const;

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All Services");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = allServices.filter((service) => {
    const matchesCategory = activeCategory === "All Services" || service.category === activeCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      service.deliverables.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#fcfdfd] text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-gradient-to-b from-blue-50/60 via-slate-50/40 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-6">
              <Zap className="w-3.5 h-3.5" />
              <span>Full-Stack Engineering Capabilities</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6 text-slate-950 uppercase">
              Technology & Engineering <br className="hidden sm:block" />
              <span className="text-[#1b67b2]">Services</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
              From high-concurrency web platforms and mobile ecosystems to enterprise software, cloud infrastructure, and AI automation. We architect robust digital products with 100% IP ownership, transparent agile delivery, and zero vendor lock-in.
            </p>

            {/* Quick Guarantees Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                <div className="text-[#1b67b2] font-black text-xl mb-0.5">2 – 4 Weeks</div>
                <div className="text-slate-600 text-xs font-medium">Rapid Production MVP</div>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                <div className="text-[#1b67b2] font-black text-xl mb-0.5">100% IP</div>
                <div className="text-slate-600 text-xs font-medium">Complete Code Ownership</div>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                <div className="text-[#1b67b2] font-black text-xl mb-0.5">Senior Pods</div>
                <div className="text-slate-600 text-xs font-medium">Direct Developer Access</div>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                <div className="text-[#1b67b2] font-black text-xl mb-0.5">99.9% Uptime</div>
                <div className="text-slate-600 text-xs font-medium">Cloud Hardened Security</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === category
                    ? "bg-[#1b67b2] text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-transparent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search capability or stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1b67b2]/20 focus:border-[#1b67b2] transition-all"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
              {activeCategory === "All Services" ? "All Engineering Services" : activeCategory}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Showing {filteredServices.length} {filteredServices.length === 1 ? "service" : "services"} engineered with enterprise rigor.
            </p>
          </div>
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#1b67b2] hover:text-blue-800 transition-colors"
          >
            <span>Need Custom Engineering?</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-24 bg-white border border-slate-200 rounded-2xl p-8">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-2">No matching services found</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
              We engineer custom solutions across diverse tech stacks. Tell us what you want to build and our lead architects will scope it.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All Services");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 bg-[#1b67b2] text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                  className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  {service.featured && (
                    <div className="absolute top-0 right-0 bg-blue-50 text-[#1b67b2] border-b border-l border-blue-200 text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                      Featured Pillar
                    </div>
                  )}

                  <div>
                    {/* Icon & Category Pill */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1b67b2] group-hover:bg-[#1b67b2] group-hover:text-white transition-colors duration-300 shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                        {service.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-[#1b67b2] transition-colors mb-2.5 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      {service.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                      <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Key Deliverables
                      </div>
                      {service.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-semibold bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#1b67b2] hover:text-blue-800 group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/contact?service=${service.slug}`}
                      className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-colors"
                    >
                      Book Call
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Engineering Methodology Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70 border-t border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-wider mb-3">
              Delivery Methodology
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 uppercase tracking-tight mb-4">
              How We Engineer & <span className="text-[#1b67b2]">Deliver Systems</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We reject bloated, open-ended timelines. Every project follows our battle-tested 4-stage sprint framework with clear sign-offs at each milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="text-3xl font-black text-[#1b67b2]/30 mb-3">01</div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Architecture Blueprint</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scope definition, schema modeling, high-level system diagrams, and technical risk analysis before writing a single line of code.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="text-3xl font-black text-[#1b67b2]/30 mb-3">02</div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Rapid Sprint 1 MVP</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Working software in 2–4 weeks. Staging environments deployed from day 7 so your team can test real features early.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="text-3xl font-black text-[#1b67b2]/30 mb-3">03</div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Enterprise Hardening</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Penetration testing, automated CI/CD pipelines, rate limiting, and database indexing to withstand peak production traffic.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="text-3xl font-black text-[#1b67b2]/30 mb-3">04</div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Launch & SLA Monitoring</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Production rollout with zero downtime, full Git repository transfer, documentation handover, and ongoing 99.9% uptime support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            Technologies Powering Our Client Systems
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {["Next.js 15", "React 19", "TypeScript", "React Native", "Flutter", "Node.js", "Python", "PostgreSQL", "Supabase", "Docker", "AWS", "Redis", "OpenAI API", "Tailwind CSS"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:border-blue-400 hover:text-[#1b67b2] transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-4xl mx-auto text-center bg-white border border-slate-200 rounded-3xl p-8 sm:p-14 shadow-lg shadow-blue-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1b67b2] text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
              Direct Technical Consultation
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 uppercase tracking-tight mb-4">
              Ready to Build Your <span className="text-[#1b67b2]">Next System?</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
              Skip agency bureaucracy. Speak directly with our lead engineering team to review your technical requirements, architecture feasibility, and sprint milestones.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#1b67b2] text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 text-center"
              >
                Schedule Architecture Call
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold rounded-xl transition-all border border-slate-200 text-center"
              >
                View Sprint Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
