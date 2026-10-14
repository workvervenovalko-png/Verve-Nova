"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Globe, Building2, CheckCircle2, Star, Target, Users, Sparkles, Copy, Check, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

export default function RegistryPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("UDYAM-UP-10-0047070");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  const verifiedPartners = [
    { name: "ServiceHub", industry: "Google Play Store Live App", link: "https://play.google.com/store/apps/details?id=com.sahil.servicehub&pcampaignid=web_share" },
    { name: "Advance Transcription", industry: "Speech-to-Text AI Platform", link: "https://www.advancetranscription.com/" },
    { name: "Siora Infra Design", industry: "3D Infrastructure Portal", link: "https://siorainfradesign.com/" },
    { name: "ChotU Commerce", industry: "Quick Commerce Logistics", link: "/projects" },
    { name: "Ministry of MSME", industry: "Govt. Registration UDYAM-UP-10-0047070", link: "https://udyamregistration.gov.in/SearchRegistration.aspx" },
    { name: "Upwork Global", industry: "100% Job Success Record", link: "/registry" }
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white border-b border-slate-200">
        <div className="absolute top-[20%] right-1/4 w-[500px] h-[500px] bg-blue-500/[0.05] blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center md:text-left flex flex-col items-center md:items-start max-w-6xl">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Official Registry & Compliance
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-950 tracking-tight uppercase leading-[0.95] mb-6">
              Trust is our <br /> <span className="text-[#1b67b2]">Absolute Currency</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mb-8 uppercase mx-auto md:mx-0">
              Verve Nova Technologies operates with surgical precision and government-grade transparency. Below you will find our official certifications and key portfolio highlights.
            </p>
          </div>
        </div>
      </section>

      {/* Governance & MSME Udyam Verification Section */}
      <section id="msme-udyam" className="py-20 md:py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200 scroll-mt-24">
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          
          <div className="flex flex-col lg:flex-row items-stretch gap-10">
            
            {/* Left Column: Official Status, Registration Details & Actions */}
            <div className="w-full lg:w-7/12 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Active MSME
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1b67b2] border border-blue-200 text-xs font-semibold">
                    Govt. of India
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-slate-950 uppercase tracking-tight mb-4">
                  MSME & Udyam Registration
                </h2>
                <p className="text-slate-600 font-normal leading-relaxed text-sm sm:text-base mb-6">
                  Verve Nova Technologies is officially registered under the <strong>Ministry of Micro, Small and Medium Enterprises (MSME)</strong>, Government of India. Our legal incorporation and compliance records are fully public and verifiable on the official government portal.
                </p>

                {/* Registration Number Card with 1-Click Copy */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 mb-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      Udyam Registration Number (URN)
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 uppercase">
                      Govt. Verified
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between gap-3 bg-white px-4 py-3 rounded-xl border border-slate-200">
                    <code className="text-sm sm:text-base font-extrabold text-slate-900 tracking-wider select-all font-mono">
                      UDYAM-UP-10-0047070
                    </code>
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-600" />
                          <span>Copy URN</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-3 text-xs text-slate-600">
                    <div>
                      <span className="font-semibold text-slate-400 block text-[10px] uppercase">Enterprise</span>
                      <strong className="text-slate-900 font-bold">VERVE NOVA TECHNOLOGIES</strong>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-400 block text-[10px] uppercase">Category / Activity</span>
                      <strong className="text-slate-900 font-bold">Micro • Services (NIC 6201)</strong>
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                  <a
                    href="https://udyamregistration.gov.in/verifyudyambarcode.aspx?verifyudrn=f2Xa5oRA/xCXjiP+ATBygzdbluHkzKXBXinSGgFcOv0="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#1b67b2] hover:bg-[#15538e] text-white rounded-xl font-bold text-xs uppercase px-5 py-3.5 flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>Verify on Govt. Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="/Verve Nova Tech Udyam.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl font-bold text-xs uppercase px-5 py-3.5 flex items-center justify-center gap-2 shadow-xs transition-all"
                  >
                    <FileText className="w-3.5 h-3.5 text-red-500" />
                    <span>View Certificate (PDF)</span>
                  </a>
                </div>

                <p className="text-xs text-slate-500">
                  Prefer manual verification? Visit the{" "}
                  <a
                    href="https://udyamregistration.gov.in/Udyam_Verify.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1b67b2] font-semibold underline underline-offset-2"
                  >
                    Official Udyam Verification Portal
                  </a>{" "}
                  and enter URN <code className="font-mono font-bold text-slate-800">UDYAM-UP-10-0047070</code> to verify live.
                </p>
              </div>

              {/* Standards Badges */}
              <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#1b67b2] shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">ISO Standards Compliant</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">100% NDA Protection</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Credentials Showcase (Emblem + Udyam Logo + Scannable QR) */}
            <div className="w-full lg:w-5/12 flex flex-col justify-between p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="w-20 h-16 bg-slate-50 rounded-xl p-2 flex items-center justify-center border border-slate-100">
                  <img src="/msme-udyam-registration.jpeg" alt="MSME Logo" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="w-20 h-16 bg-slate-50 rounded-xl p-2 flex items-center justify-center border border-slate-100">
                  <img src="/udyam.png" alt="Udyam Logo" className="max-h-full max-w-full object-contain" />
                </div>
              </div>

              {/* Scannable Government Barcode / QR Section */}
              <div className="py-6 flex flex-col items-center text-center">
                <div className="p-3 bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-xs mb-3">
                  <img
                    src="/udyam-qr.jpg"
                    alt="Official Govt Udyam Verification QR"
                    className="w-36 h-36 object-contain rounded-lg"
                  />
                </div>
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Instant Smartphone Verification
                </span>
                <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                  Scan this QR code with any camera or scanner app to view the live verification directly on the official <strong>udyamregistration.gov.in</strong> portal.
                </p>
              </div>

              {/* Security & Verification Guarantee */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold">Ministry of MSME</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Genuine
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white relative border-b border-slate-200">
        <div className="container mx-auto px-6 max-w-6xl text-center md:text-left flex flex-col items-center md:items-start relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col items-center md:items-start">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 uppercase tracking-tight mb-8 leading-tight text-center md:text-left">
              Engineering High-Performance <br /> <span className="text-[#1b67b2]">Specialized Systems</span>
            </h2>
            <div className="space-y-6 text-base md:text-lg text-slate-600 font-normal leading-relaxed text-center md:text-justify max-w-4xl">
              <p>
                Verve Nova Technologies is more than a digital agency; we are a specialized engineering studio dedicated to building high-performance software systems for global enterprise partners.
              </p>
              <p>
                We operate at the intersection of architectural excellence and surgical precision. Whether it is deploying serverless AI infrastructures or engineering secure fintech gateways.
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full">
               {[
                 { icon: Globe, label: "Global Presence", val: "12+ Countries" },
                 { icon: Award, label: "Success Rate", val: "100% Score" },
                 { icon: Users, label: "Specialists", val: "Elite Team" },
                 { icon: Target, label: "Focus", val: "Precision" }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                    <item.icon className="w-7 h-7 text-[#1b67b2] mb-3" />
                    <span className="text-sm font-black text-slate-900 uppercase tracking-wider">{item.val}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200">
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#1b67b2] text-xs font-bold uppercase tracking-wider mb-2">
                Independently Verifiable
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-950">
                Verified Deliveries & Live Platforms
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1b67b2] hover:underline uppercase tracking-wider"
            >
              <span>Explore All Case Studies</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Advance Transcription */}
             <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between shadow-md hover:border-[#1b67b2] hover:shadow-xl transition-all">
                <div>
                  <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100 mb-5">
                     <img src="/projects/transcription.png" alt="Advance Transcription" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <span className="text-[11px] font-black text-purple-600 uppercase tracking-wider">AI SaaS Web Platform</span>
                     <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">Advance Transcription</h3>
                     <p className="text-xs text-slate-600 font-normal leading-relaxed">
                       High-precision audio speech-to-text platform engineered for accuracy, multi-speaker recognition, and secure cloud transcript storage.
                     </p>
                  </div>
                </div>
                <div className="pt-5 mt-5 border-t border-slate-100">
                   <a
                     href="https://www.advancetranscription.com/"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-[#1b67b2] hover:text-white text-slate-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                   >
                     <span>Open Live Web App</span>
                     <ExternalLink className="w-3.5 h-3.5" />
                   </a>
                </div>
             </div>

             {/* Siora Infra Design */}
             <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between shadow-md hover:border-[#1b67b2] hover:shadow-xl transition-all">
                <div>
                  <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100 mb-5">
                     <img src="/projects/siora.png" alt="Siora Architecture" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <span className="text-[11px] font-black text-amber-600 uppercase tracking-wider">Infrastructure & 3D Naksha</span>
                     <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">Siora Infra Design</h3>
                     <p className="text-xs text-slate-600 font-normal leading-relaxed">
                       A specialized platform for architectural operations, blueprints (Naksha), 3D structural mapping, and project construction estimation.
                     </p>
                  </div>
                </div>
                <div className="pt-5 mt-5 border-t border-slate-100">
                   <a
                     href="https://siorainfradesign.com/"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-[#1b67b2] hover:text-white text-slate-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                   >
                     <span>Visit Live Portal</span>
                     <ExternalLink className="w-3.5 h-3.5" />
                   </a>
                </div>
             </div>

             {/* ServiceHub */}
             <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between shadow-md hover:border-[#1b67b2] hover:shadow-xl transition-all">
                <div>
                  <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-200 relative bg-slate-900 mb-5 flex items-center justify-center p-4">
                     <img src="/projects/servicehub.png" alt="ServiceHub App" className="h-full object-contain" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <span className="text-[11px] font-black text-blue-600 uppercase tracking-wider">Play Store Verified App</span>
                     <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">ServiceHub</h3>
                     <p className="text-xs text-slate-600 font-normal leading-relaxed">
                       On-demand home repair and appliance services mobile application with real-time technician booking, OTP tracking, and instant invoicing.
                     </p>
                  </div>
                </div>
                <div className="pt-5 mt-5 border-t border-slate-100">
                   <a
                     href="https://play.google.com/store/apps/details?id=com.sahil.servicehub&pcampaignid=web_share"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-[#1b67b2] hover:text-white text-slate-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                   >
                     <span>View on Google Play</span>
                     <ExternalLink className="w-3.5 h-3.5" />
                   </a>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Clients Strip */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6 mb-8 text-center">
           <h5 className="text-xs font-bold text-[#1b67b2] uppercase tracking-[0.4em]">Verified Ecosystem & Enterprise Partners</h5>
        </div>
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 items-center"
          >
            {[...verifiedPartners, ...verifiedPartners].map((client, i) => (
              <a
                key={i}
                href={client.link}
                target={client.link.startsWith("http") ? "_blank" : undefined}
                rel={client.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity group cursor-pointer"
              >
                <span className="text-xl font-bold text-slate-800 uppercase tracking-wider group-hover:text-[#1b67b2] transition-colors">{client.name}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{client.industry}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
