"use client";

import React from "react";
import { Award, Briefcase, Users, RefreshCw, ChevronRight } from "lucide-react";
import Link from "next/link";

export function TrustMatrix() {
  const metrics = [
    {
      value: "4.9/5.0",
      label: "Google Rating",
      sub: "Verified Reviews",
      icon: Award,
    },
    {
      value: "100%",
      label: "Upwork Success",
      sub: "Job Success Score",
      icon: Briefcase,
    },
    {
      value: "50+",
      label: "Projects Done",
      sub: "Successful Deliveries",
      icon: Users,
    },
    {
      value: "100% IP",
      label: "Code Ownership",
      sub: "Full Client IP Transfer",
      icon: RefreshCw,
    },
    {
      value: "MSME URN",
      label: "Govt. Registered",
      sub: "UDYAM-UP-10-0047070",
      icon: Award,
    },
  ];

  const competencies = [
    "Software & Applications (Web, Mobile, Enterprise)",
    "AI & Automation (Chatbots & Workflow Agents)",
    "Enterprise Systems (Custom CRM & ERP Engines)",
    "Backend & APIs (REST, Auth, Secure Payments)",
    "Cloud & DevOps (AWS / GCP & CI/CD Pipelines)",
    "Cybersecurity (VAPT Audits & Zero-Trust SecOps)",
    "UI/UX & Branding (Design Systems & Interfaces)",
    "Performance Marketing & Search Optimization",
    "MSME Govt. of India Registered Enterprise",
    "100% NDA & Intellectual Property Confidentiality",
  ];

  return (
    <div className="w-full bg-white py-12 border-b border-[#e2e8f0]">
      
      {/* 1. AppSquadz Style 5-Card Metrics Strip with Exact Verve Nova Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-[#1b67b2] uppercase tracking-[0.4em] mb-2">Why Clients Trust Us</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] uppercase tracking-tight">
            Proven Results & High Ratings
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center bg-[#f8fafc] hover:bg-white hover:border-[#1b67b2] p-5 rounded-[16px] border border-[#e2e8f0] transition-all duration-300 hover:shadow-md"
              >
                {/* Circular Blue Icon */}
                <div className="w-11 h-11 rounded-full bg-[#1b67b2] flex items-center justify-center shrink-0 text-white shadow-sm mb-3">
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <span className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight">
                  {item.value}
                </span>
                <p className="text-xs font-bold text-[#1b67b2] mt-0.5 uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-[11px] text-[#64748b] mt-0.5">
                  {item.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. "Trusted to Deliver Across Every Cloud & Software Dimension" Competency Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-8 sm:p-12 shadow-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading, Subhead & Competency Grid with Orange Dots */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#1b67b2] text-xs font-bold uppercase tracking-wider mb-3">
                Core Engineering Capabilities
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                Trusted Across Every Software & Digital Dimension
              </h2>
              <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed mb-8 max-w-2xl">
                Recognized as a premier digital engineering firm, our competencies reflect the engineering precision and reliability behind every successful software deployment.
              </p>

              {/* 2-Column List with Orange Bullets (Exact AppSquadz Design) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                {competencies.map((comp, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f9661b] shrink-0" />
                    <span className="text-sm sm:text-[15px] font-bold text-[#1e293b]">
                      {comp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Verve Nova MSME / Enterprise Partner Badge */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="w-64 p-6 bg-white rounded-2xl border-2 border-[#f9661b]/40 shadow-lg flex flex-col items-center text-center relative overflow-hidden group hover:border-[#f9661b] transition-all">
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100/60 rounded-bl-full -z-0" />
                
                <div className="w-16 h-16 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-4 relative z-10">
                  <Award className="w-9 h-9 text-[#f9661b]" />
                </div>

                <div className="text-xs font-mono font-bold uppercase text-[#f9661b] tracking-widest mb-1 relative z-10">
                  VERVE NOVA TECH
                </div>
                <h3 className="text-base font-extrabold text-[#0f172a] mb-1 relative z-10">
                  MSME Govt. Registered
                </h3>
                <p className="text-xs text-[#64748b] mb-4 relative z-10">
                  ISO 27001 : 2022 Certified, NDA Protected Enterprise Software Engineering
                </p>

                <Link
                  href="/registry"
                  className="w-full bg-[#1b67b2] hover:bg-[#15538e] text-white text-xs font-bold uppercase py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 relative z-10 shadow-sm"
                >
                  <span>Verify Credentials</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
