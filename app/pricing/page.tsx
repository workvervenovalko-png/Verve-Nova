"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Code2, 
  FileCheck2, 
  Layers, 
  Workflow, 
  Zap, 
  HelpCircle,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  const packages = [
    {
      name: "MVP / Founder Sprint",
      badge: "Fast Market Validation",
      tagline: "Ideal for early-stage founders & validation concepts needing a rapid, production-ready launch.",
      inrPrice: "₹75,000",
      usdPrice: "$1,200",
      duration: "2 – 4 Weeks Delivery",
      durationShort: "2 – 4 Weeks",
      highlight: false,
      features: [
        "Interactive Figma UX/UI Prototype",
        "Full-Stack Web or Cross-Platform Mobile App",
        "User Authentication & Role Management",
        "Cloud Database (Supabase / PostgreSQL / MongoDB)",
        "Payment Gateway Integration (Razorpay / Stripe)",
        "Complete Source Code Handover on GitHub",
        "30 Days Complimentary Post-Launch Warranty",
        "Bilateral Non-Disclosure Agreement (NDA)"
      ],
      ctaText: "Launch Your MVP",
      link: "/contact?tier=mvp"
    },
    {
      name: "Custom SaaS & App Suite",
      badge: "Scale & Full Ecosystem",
      tagline: "Comprehensive digital ecosystem for scaling businesses, marketplaces, and SaaS platforms.",
      inrPrice: "₹2,50,000",
      usdPrice: "$3,500",
      duration: "4 – 8 Weeks Delivery",
      durationShort: "4 – 8 Weeks",
      highlight: true,
      features: [
        "Everything in MVP, plus:",
        "Multi-Role Dashboards (Admin / Merchant / Customer)",
        "Real-Time Realtime Sync & Push Notifications (FCM)",
        "Custom RESTful APIs & Microservices Integration",
        "WhatsApp / SMS / Email Automated Pipelines",
        "Automated CI/CD Deployment on AWS / Vercel",
        "Play Store & App Store Deployment Guidance",
        "60 Days Extended Post-Launch Bug Warranty",
        "Weekly Sprint Demos on Private Staging Server"
      ],
      ctaText: "Start Custom Project",
      link: "/contact?tier=custom-saas"
    },
    {
      name: "Enterprise Dedicated Pod",
      badge: "Mission-Critical Systems",
      tagline: "A dedicated squad of senior software architects, frontend engineers, backend specialists & QA testers.",
      inrPrice: "Custom Milestone",
      usdPrice: "Custom Milestone",
      duration: "Flexible Sprints / Retainer",
      durationShort: "Flexible Sprints",
      highlight: false,
      features: [
        "Dedicated Team: Tech Lead, Full-Stack Devs, QA & DevOps",
        "High-Concurrency Distributed Cloud Architecture",
        "Vulnerability Assessment & Penetration Testing (VAPT)",
        "ISO / SOC2 Security & Data Privacy Compliance Protocols",
        "99.9% Uptime SLA & 24/7 Priority Emergency Support",
        "Direct Private Slack & WhatsApp Developer Channel",
        "Weekly Strategic Architecture & Executive Reviews",
        "Continuous DevOps, Dockerization & Auto-Scaling"
      ],
      ctaText: "Request Enterprise Scoping",
      link: "/contact?tier=enterprise"
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Discovery & Architecture Blueprint",
      duration: "Days 1–3",
      desc: "We analyze your project goals, define technical architecture, select modern tech stacks, and agree on clear milestones. Zero technical ambiguity."
    },
    {
      step: "02",
      title: "Interactive High-Fidelity Figma",
      duration: "Week 1",
      desc: "Our design team crafts every user flow and screen in Figma. You click through and approve the exact prototype before a single line of code is written."
    },
    {
      step: "03",
      title: "Agile Sprints & Weekly Staging Demos",
      duration: "Weeks 2–6",
      desc: "Development proceeds in rapid 1-week sprints. You receive live private staging links every Friday to test progress and provide immediate feedback."
    },
    {
      step: "04",
      title: "QA, VAPT & Edge-Case Stress Testing",
      duration: "Pre-Launch",
      desc: "Comprehensive testing across devices, network speeds, input sanitation, and security edge cases to ensure zero launch day surprises."
    },
    {
      step: "05",
      title: "Production Release & 100% IP Handover",
      duration: "Launch Day",
      desc: "We deploy to your production domains and app stores. All GitHub repositories, cloud credentials, and 100% intellectual property are transferred to you."
    }
  ];

  const faqs = [
    {
      q: "Do I get full ownership of the source code and IP?",
      a: "Yes, absolutely 100%. Upon final milestone delivery, all intellectual property, GitHub source code repositories, databases, and deployment keys are transferred completely to you. We do not retain any rights or lock you into proprietary tools."
    },
    {
      q: "How does the payment milestone structure work?",
      a: "We work on a transparent, risk-free milestone schedule: 30% upon project kickoff and UI signoff, 40% upon functional beta milestone demonstration on staging, and the final 30% only after full acceptance and deployment."
    },
    {
      q: "What happens if bugs or glitches are found after launch?",
      a: "Every project comes with a complimentary 30 to 60-day post-launch warranty period where our engineering team resolves any bugs or regression errors immediately at zero additional cost."
    },
    {
      q: "Can you sign an NDA before we share our business idea?",
      a: "Yes. We sign a formal bilateral Non-Disclosure Agreement (NDA) with every prospective client before receiving proprietary specs or data. Your intellectual property is legally secured from moment one."
    },
    {
      q: "How do we communicate throughout the development process?",
      a: "You get a dedicated private WhatsApp and Slack group with the active development lead, plus weekly scheduled Google Meet / Zoom demonstrations to inspect running software."
    }
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />

      {/* Header Area */}
      <section className="pt-36 pb-16 px-6 relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white border-b border-slate-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/[0.05] blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Predictable & Milestone-Based
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-tight mb-6 text-slate-950">
            Transparent <span className="text-[#1b67b2]">Pricing & Process</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            No surprise fees, no vendor lock-in. Milestone-backed software development with 100% intellectual property ownership from day one.
          </p>

          {/* Currency Toggle */}
          <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
            <button
              onClick={() => setCurrency("INR")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                currency === "INR" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              INR (₹) - Domestic
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                currency === "USD" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              USD ($) - Global
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl p-6 sm:p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.highlight 
                  ? "bg-gradient-to-b from-blue-50/50 via-white to-white border-2 border-[#1b67b2] shadow-xl shadow-blue-500/10 lg:-translate-y-2" 
                  : "bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1b67b2] text-white text-[11px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border whitespace-nowrap shrink-0 ${
                    pkg.highlight 
                      ? "bg-blue-50 text-[#1b67b2] border-blue-200 shadow-2xs" 
                      : "bg-slate-100 text-slate-700 border-slate-200"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${pkg.highlight ? "bg-[#1b67b2]" : "bg-slate-400"}`} />
                    <span>{pkg.badge}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-600 bg-slate-50 px-2 sm:px-2.5 py-1 rounded-full border border-slate-200/90 whitespace-nowrap shrink-0">
                    <Clock className="w-3 h-3 text-[#1b67b2] shrink-0" />
                    <span>{pkg.duration}</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 mb-2 min-h-[58px] flex items-center">
                  {pkg.name}
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed font-normal mb-6 min-h-[48px] flex items-start">
                  {pkg.tagline}
                </p>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 mb-8 min-h-[104px] flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Starting Investment</span>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl lg:text-3xl font-black text-slate-950 tracking-tight whitespace-nowrap">
                      {currency === "INR" ? pkg.inrPrice : pkg.usdPrice}
                    </span>
                    {pkg.inrPrice !== "Custom Milestone" ? (
                      <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">+ milestone stages</span>
                    ) : (
                      <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">milestone / retainer</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900 block mb-2">
                    Included Deliverables:
                  </span>
                  {pkg.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Link
                  href={pkg.link}
                  className={`w-full h-12 flex items-center justify-center rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95 ${
                    pkg.highlight 
                      ? "bg-[#1b67b2] hover:bg-[#15538e] text-white shadow-blue-500/20" 
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  <span>{pkg.ctaText}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Development Lifecycle & Process */}
      <section className="py-20 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-4">
              <Workflow className="w-3.5 h-3.5" /> Systematic Execution
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-950 mb-4">
              Our 5-Stage <span className="text-[#1b67b2]">Engineering Process</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              From whiteboard to production deployment, every phase is engineered with surgical transparency and live milestone reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {workflowSteps.map((step, idx) => (
              <div 
                key={step.step}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#1b67b2] hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-200 group-hover:text-blue-500 transition-colors">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-950 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Escrow Milestone Reassurance */}
          <div className="mt-12 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-4xl mx-auto">
            <h3 className="text-base font-black uppercase tracking-wide text-slate-900 mb-3 text-center">
              Zero Financial Risk: Milestone Escrow Structure
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mt-6">
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <span className="text-xl font-black text-[#1b67b2] block mb-1">30%</span>
                <span className="text-xs font-bold text-slate-900 block mb-1">Kickoff & Figma UI</span>
                <span className="text-[11px] text-slate-500">Commence work after blueprint & prototype signoff</span>
              </div>
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <span className="text-xl font-black text-[#1b67b2] block mb-1">40%</span>
                <span className="text-xs font-bold text-slate-900 block mb-1">Functional Beta Demo</span>
                <span className="text-[11px] text-slate-500">Live staging deployment demonstrating core user flows</span>
              </div>
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <span className="text-xl font-black text-[#1b67b2] block mb-1">30%</span>
                <span className="text-xs font-bold text-slate-900 block mb-1">Source Code & Production</span>
                <span className="text-[11px] text-slate-500">Final handover of GitHub repos, keys & live launch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance Guarantees Banner */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <Code2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-1">100% IP Ownership</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Full source code & git repo ownership transferred cleanly to you.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-1">Free Bug Warranty</h4>
              <p className="text-xs text-slate-500 leading-relaxed">30 to 60 days of post-release bug fixes included in every project.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-1">Bilateral NDA</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Strict mutual confidentiality protection executed before project intake.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-1">Weekly Live Demos</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Inspect actual working code on live staging servers every sprint.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-4">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-950 mb-3">
              Client <span className="text-[#1b67b2]">Due Diligence FAQ</span>
            </h2>
            <p className="text-slate-600 text-sm">
              Everything you need to know about pricing, deliverables, and development governance.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm"
              >
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <div className="p-10 md:p-14 rounded-3xl bg-slate-950 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Have a Specific Scope in Mind?
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-8 font-light">
            Share your requirements or schedule a free 30-minute technical consultation with our engineering leads.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto h-12 px-8 inline-flex items-center justify-center bg-[#1b67b2] hover:bg-[#15538e] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95"
            >
              <span>Get a Detailed Estimate</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <a
              href="https://wa.me/917380663685?text=Hi%20Verve%20Nova%2C%20I%20would%20like%20to%20discuss%20a%20project%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto h-12 px-8 inline-flex items-center justify-center bg-white/10 hover:bg-white/15 text-white text-xs font-black uppercase tracking-widest rounded-xl border border-white/15 transition-all"
            >
              <MessageSquare className="w-4 h-4 mr-2 text-emerald-400" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
