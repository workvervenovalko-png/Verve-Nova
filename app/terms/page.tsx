"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Scale, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Building2, 
  Award,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const coreTerms = [
    {
      title: "100% Client IP Ownership",
      badge: "Full Code Transfer",
      icon: ShieldCheck,
      content: "Upon full settlement of agreed project milestone invoices, all custom source code, architecture configurations, database schemas, and visual assets are unconditionally transferred to the client. We do not enforce proprietary vendor lock-in."
    },
    {
      title: "Mutual NDA & Data Protection",
      badge: "Bilateral Confidentiality",
      icon: Lock,
      content: "We execute formal bilateral Non-Disclosure Agreements (NDAs). All proprietary business data, user records, credentials, and product concepts shared with Verve Nova Technologies are held under strict confidentiality."
    },
    {
      title: "Milestone-Based Acceptance",
      badge: "Sprint-Driven SLA",
      icon: CheckCircle2,
      content: "Projects are executed in transparent, agreed sprints with clear deliverable criteria. Milestone sign-offs ensure the client reviews and accepts every phase before proceeding to deployment."
    },
    {
      title: "Post-Launch Warranty",
      badge: "30-Day Stabilization",
      icon: Award,
      content: "Every production delivery comes with a dedicated post-launch stabilization window covering critical bug fixes, deployment monitoring, and handover documentation at zero additional cost."
    }
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white relative overflow-hidden border-b border-slate-200">
        <div className="absolute top-[20%] right-1/4 w-[500px] h-[500px] bg-blue-500/[0.05] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-6">
            <Scale className="w-3.5 h-3.5" /> Legal Framework & Governance
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight uppercase leading-[0.95] mb-6">
            Terms of Service & <br /> <span className="text-[#1b67b2]">Client IP Covenant.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl">
            Verve Nova Technologies operates with transparent contracts, zero vendor lock-in, and full intellectual property transfer. Review our formal operating terms and enterprise legal declarations below.
          </p>
        </div>
      </section>

      {/* Core Principles Grid */}
      <section className="py-16 px-6 bg-slate-50/50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreTerms.map((term, i) => {
              const Icon = term.icon;
              return (
                <div 
                  key={term.title}
                  className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#1b67b2] hover:shadow-lg transition-all duration-300 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1b67b2] flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                        {term.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight mb-3">
                      {term.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {term.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Legal Disclosure & Clauses */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Statutory Business Disclosure */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-[#1b67b2]" />
              <h2 className="text-base font-black text-slate-950 uppercase tracking-wider">
                1. Legal Entity & Statutory Disclosures
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              The services are engineered and delivered by <strong>VERVE NOVA TECHNOLOGIES</strong>, a recognized Micro Enterprise officially registered under the <strong>Ministry of Micro, Small and Medium Enterprises (MSME)</strong>, Government of India.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Udyam Registration URN</span>
                <strong className="text-slate-900 font-mono font-bold">UDYAM-UP-10-0047070</strong>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Classification / NIC</span>
                <strong className="text-slate-900 font-bold">Micro • NIC 6201 (Software)</strong>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Jurisdiction</span>
                <strong className="text-slate-900 font-bold">Lucknow, Uttar Pradesh, India</strong>
              </div>
            </div>
          </div>

          {/* Section 2: Intellectual Property Rights */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-slate-950 uppercase tracking-tight">
              2. Intellectual Property Rights & Work-for-Hire
            </h2>
            <div className="text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
              <p>
                <strong>2.1 Client Ownership:</strong> Unless explicitly agreed otherwise in a separate custom licensing contract, all custom software architectures, source code commits, application bundles, API logic, database schemas, and visual designs created for the client under a Statement of Work (SOW) are treated as work-made-for-hire.
              </p>
              <p>
                <strong>2.2 Transfer on Settlement:</strong> Title, copyright, and full IP rights pass automatically and unconditionally to the client upon the client&apos;s settlement of the corresponding milestone invoice.
              </p>
              <p>
                <strong>2.3 Open-Source & Third-Party Dependencies:</strong> Third-party libraries, open-source packages (e.g. MIT, Apache 2.0), or cloud vendor APIs utilized in the development remain subject to their respective licenses. Verve Nova Technologies verifies all open-source dependencies for commercial compatibility.
              </p>
            </div>
          </div>

          {/* Section 3: Confidentiality & Mutual NDA */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-slate-950 uppercase tracking-tight">
              3. Confidentiality & Non-Disclosure (Mutual NDA)
            </h2>
            <div className="text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
              <p>
                <strong>3.1 Protected Information:</strong> Each party agrees to safeguard confidential and proprietary information of the other, including technical blueprints, customer data, API tokens, business models, and trade secrets, exercising the same degree of care it uses for its own confidential assets.
              </p>
              <p>
                <strong>3.2 Exclusions:</strong> Information in the public domain or independently developed without reference to the protected data is excluded from confidentiality restrictions.
              </p>
            </div>
          </div>

          {/* Section 4: Limitation of Liability & Warranties */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-slate-950 uppercase tracking-tight">
              4. Warranties & Limitation of Liability
            </h2>
            <div className="text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
              <p>
                <strong>4.1 Warranty & Stabilization Window:</strong> Verve Nova warrants that following production deployment, deliverables will conform materially to the agreed specifications. A standard stabilization warranty applies based on package scope: thirty (30) days for MVP deliverables, and sixty (60) days for Custom SaaS deployments as stated in the applicable Statement of Work (SOW). Verve Nova will resolve reproducible defects identified during this window at no additional charge. For enterprise clients requiring ongoing high-availability SLAs, dedicated monthly maintenance contracts with sub-2-hour critical response guarantees are defined under separate Service Level Agreements.
              </p>
              <p>
                <strong>4.2 Maximum Liability:</strong> To the extent permissible by law, Verve Nova Technologies&apos; total aggregate liability arising out of any engagement shall not exceed the total fees paid by the client under the specific Statement of Work directly giving rise to the claim.
              </p>
            </div>
          </div>

          {/* Section 5: Governing Law & Jurisdiction */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-slate-950 uppercase tracking-tight">
              5. Governing Law & Dispute Resolution
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              These Terms and any Statements of Work issued hereunder are governed by and construed in accordance with the laws of the Republic of India. In the event of any controversy or dispute, the parties agree to first seek amicable settlement through mutual executive consultation, failing which the dispute shall be resolved through arbitration under the Arbitration and Conciliation Act, 1996, with the seat of arbitration situated in Lucknow, Uttar Pradesh, India.
            </p>
          </div>

          {/* CTA Box */}
          <div className="p-8 rounded-3xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Need a Custom Mutual NDA or Enterprise MSA?
              </h3>
              <p className="text-xs text-slate-600">
                Our legal team provides tailored Master Service Agreements (MSAs) and bilateral NDAs upon project initiation.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-[#1b67b2] hover:bg-[#15538e] text-white text-xs font-bold uppercase tracking-wider transition-all shrink-0 shadow-sm"
            >
              Request Custom MSA
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
