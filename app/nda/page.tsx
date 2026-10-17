"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  FileLock2, 
  Briefcase, 
  ShieldCheck, 
  Fingerprint, 
  Sparkles, 
  Download, 
  FileText, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers
} from "lucide-react";
import Link from "next/link";

export default function NDAPage() {
  const complianceSteps = [
    {
      title: "Mutual Confidentiality (Bilateral)",
      icon: Briefcase,
      desc: "Every discussion and technical intake is bound by a bi-directional Non-Disclosure Agreement, safeguarding your proprietary trade secrets, business models, and system specs from day zero."
    },
    {
      title: "100% Intellectual Property Assignment",
      icon: FileLock2,
      desc: "All code, documentation, UI assets, and database schemas created for your project are 100% assigned to you upon milestone invoice settlement. Verve Nova retains zero proprietary claim on your custom software."
    },
    {
      title: "Isolated Engineering Pods",
      icon: Fingerprint,
      desc: "Each engagement is assigned a dedicated developer pod with strict role-based access control (RBAC). Project credentials, staging databases, and API keys are strictly partitioned."
    }
  ];

  const clauses = [
    {
      title: "1. Definition of Proprietary Information",
      content: "All technical data, source code, wireframes, financial forecasts, customer records, and operational workflows disclosed by either party are treated as strictly confidential."
    },
    {
      title: "2. Non-Disclosure & Permitted Use",
      content: "Information is utilized solely for the agreed software engineering scope. No data is shared with third parties, sub-contractors, or external entities without prior written consent."
    },
    {
      title: "3. Complete Code & Asset Handover",
      content: "Upon milestone settlement, all repository rights, cloud hosting credentials, build assets, and intellectual property are irrevocably transferred to the client."
    },
    {
      title: "4. Multi-Pass Data Sanitization",
      content: "Following production deployment and warranty completion, all local staging environments and test clones are permanently purged through secure multi-pass erasure protocols."
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
            <Sparkles className="w-3.5 h-3.5" /> Legal Governance & IP Protection
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-tight mb-6 text-slate-950">
            Confidentiality & <span className="text-[#1b67b2]">NDA Policy</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed mb-6">
            We recognize that your proprietary concepts, source code, and algorithms are your core enterprise assets. We safeguard them with institutional rigor.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact?subject=nda"
              className="inline-flex h-11 px-6 items-center bg-[#1b67b2] hover:bg-[#15538e] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-blue-500/20 transition-all"
            >
              <FileText className="w-4 h-4 mr-2" />
              <span>Request Signed Mutual NDA</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Protection Pillars */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {complianceSteps.map((step) => (
            <div 
              key={step.title}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#1b67b2] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-6 text-[#1b67b2]">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Clauses Overview */}
        <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-black text-slate-950 uppercase tracking-tight">
              Standard Engagement Covenants
            </h2>
          </div>

          <div className="space-y-6">
            {clauses.map((clause, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  {clause.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {clause.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#1b67b2] shrink-0" />
              <p className="text-xs text-slate-700 font-medium">
                Need your internal legal team's custom NDA countersigned before discussing your project?
              </p>
            </div>
            <Link
              href="/contact?subject=custom-nda"
              className="inline-flex h-10 px-5 items-center bg-[#1b67b2] hover:bg-[#15538e] text-white text-xs font-bold uppercase tracking-wider rounded-xl shrink-0 transition-all"
            >
              <span>Submit Your NDA</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
