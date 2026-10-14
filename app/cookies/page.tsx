"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Cookie, MousePointer2, Activity, Cpu, Sparkles, CheckCircle2 } from "lucide-react";

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      title: "Essential Session Cookies",
      desc: "Necessary for page navigation, security token validation, and basic functional stability across the website.",
      icon: Cpu
    },
    {
      title: "Performance & Reliability",
      desc: "Aggregated, anonymous latency telemetry used to identify page load bottlenecks and enhance server response times.",
      icon: Activity
    },
    {
      title: "User Preference Memory",
      desc: "Remembers client interface choices, such as currency preference (INR/USD) or dismissible announcements.",
      icon: MousePointer2
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
            <Sparkles className="w-3.5 h-3.5" /> Web Standards & Transparency
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-tight mb-6 text-slate-950">
            Cookie <span className="text-[#1b67b2]">Policy</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            How Verve Nova utilizes lightweight cookies to ensure seamless browsing without intrusive cross-site tracking.
          </p>
        </div>
      </section>

      {/* Cookie Categories */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cookieTypes.map((type) => (
            <div 
              key={type.title}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#1b67b2] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-6 text-[#1b67b2]">
                  <type.icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  {type.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {type.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Management Guidance */}
        <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-6 h-6 text-[#1b67b2]" />
            <h2 className="text-xl font-black text-slate-950 uppercase tracking-tight">
              Managing Your Cookie Preferences
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal mb-4">
            You can modify or disable cookies at any time through your browser settings (Chrome, Safari, Firefox, Edge). Please note that disabling essential cookies may impact specific session functionality like portal logins.
          </p>
          <p className="text-slate-500 text-xs leading-relaxed">
            Last updated: October 2026. For questions regarding our cookie practices, reach out to{" "}
            <a href="mailto:contact@vervenovatech.com" className="text-[#1b67b2] font-semibold underline">
              contact@vervenovatech.com
            </a>.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
