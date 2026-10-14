"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Database, Sparkles, CheckCircle2, Server, FileText } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Data Sovereignty & Encryption",
      icon: Database,
      content: "All client data and intellectual property are encrypted at rest using industry-standard AES-256 encryption and in transit using TLS 1.3 cryptographic protocols."
    },
    {
      title: "Zero-Trust Engineering Access",
      icon: Lock,
      content: "We enforce strict least-privilege role-based access control (RBAC). Only engineers directly assigned to your specific project pod hold authenticated access to repositories."
    },
    {
      title: "Zero Third-Party Data Harvesting",
      icon: Eye,
      content: "We never monetize, sell, or disclose client or prospective client information to third-party brokers, ad networks, or data brokers under any circumstances."
    }
  ];

  const policies = [
    {
      title: "1. Information Collection & Usage",
      content: "We collect only information necessary to deliver software engineering and consulting services (such as contact information, project specifications, and authorized communication logs). We do not collect extraneous personal data."
    },
    {
      title: "2. Cloud Storage & Data Isolation",
      content: "All software artifacts and staging instances reside in secure, isolated cloud infrastructure (AWS, Google Cloud, Supabase). Production credentials and API secrets are never shared across team members without encrypted vault management."
    },
    {
      title: "3. Compliance with DPDP Act & Global Standards",
      content: "Verve Nova Technologies complies with India's Digital Personal Data Protection (DPDP) Act and adheres to international best practices regarding user consent, data correction, and right to erasure."
    },
    {
      title: "4. Data Retention & Deletion",
      content: "Upon formal project completion and warranty sign-off, client staging databases and non-essential developmental copies are permanently sanitized and purged from development workstations."
    }
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />
      
      {/* Header */}
      <section className="pt-36 pb-16 px-6 relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white border-b border-slate-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/[0.05] blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Compliance & Data Security
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-tight mb-6 text-slate-950">
            Privacy <span className="text-[#1b67b2]">Policy</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            Our commitment to enterprise-grade data security, confidentiality, and statutory compliance.
          </p>
        </div>
      </section>

      {/* Security Pillars */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {sections.map((sec) => (
            <div 
              key={sec.title}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#1b67b2] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-6 text-[#1b67b2]">
                  <sec.icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  {sec.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {sec.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Sections */}
        <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-black text-slate-950 uppercase tracking-tight">
              Statutory Governance & Standards
            </h2>
          </div>

          <div className="space-y-6">
            {policies.map((policy, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  {policy.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {policy.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-500">
              For security compliance inquiries or specific data processing agreements (DPA), contact our security officer at{" "}
              <a href="mailto:contact@vervenovatech.com" className="text-[#1b67b2] font-semibold underline">
                contact@vervenovatech.com
              </a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
