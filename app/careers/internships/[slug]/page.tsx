"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { internshipRoles } from "@/lib/internship-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Clock, Globe, ShieldCheck, Zap, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function InternshipDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const role = internshipRoles[slug as string];

  if (!role) {
    return (
      <main className="min-h-screen bg-white text-slate-900 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto mb-6 text-[#1b67b2]">
            <Zap className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-slate-950 mb-3 uppercase tracking-tight">Role Not Found</h1>
          <p className="text-slate-600 text-sm mb-8">
            The internship role you are looking for does not exist or has been archived.
          </p>
          <Button 
            onClick={() => router.push("/careers")} 
            className="bg-[#1b67b2] hover:bg-[#15538e] text-white font-bold rounded-xl px-8 h-12 text-xs uppercase tracking-wider"
          >
            Back to Careers
          </Button>
        </div>
      </main>
    );
  }

  const titleWords = role.title.split(" ");
  const firstWord = titleWords[0];
  const remainingWords = titleWords.slice(1).join(" ");

  return (
    <main className="min-h-screen bg-[#fcfdfd] text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <button 
              onClick={() => router.push("/careers")}
              className="group inline-flex items-center gap-2.5 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-[#1b67b2] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Roles</span>
            </button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Studio Track // {role.slug}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-950 tracking-tight uppercase leading-[0.95] mb-8">
                  {firstWord} <br />
                  <span className="text-[#1b67b2]">{remainingWords || "Track"}</span>
                </h1>

                <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed mb-12 max-w-3xl">
                  {role.shortDesc}
                </p>

                {/* Key Grid: Responsibilities & The Track Path */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 pt-10">
                  {/* Responsibilities */}
                  <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs">
                    <h3 className="text-xs font-extrabold text-[#1b67b2] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#1b67b2]" />
                      Core Responsibilities
                    </h3>
                    <ul className="space-y-4">
                      {role.responsibilities.map((item, i) => (
                        <li 
                          key={i}
                          className="flex gap-3 text-slate-700 leading-relaxed text-sm font-normal"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1b67b2] mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Track Path & Outcomes */}
                  <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs">
                    <h3 className="text-xs font-extrabold text-emerald-700 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-600" />
                      The Track Path & Outcomes
                    </h3>
                    <ul className="space-y-4">
                      {role.benefits.map((item, i) => (
                        <li 
                          key={i}
                          className="flex gap-3 text-slate-700 leading-relaxed text-sm font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg shadow-blue-500/5 sticky top-32"
              >
                <div className="space-y-8">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-[#1b67b2]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Duration</p>
                      <p className="text-lg font-black text-slate-900 uppercase leading-none">{role.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                      <Globe className="w-6 h-6 text-[#1b67b2]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Work Mode</p>
                      <p className="text-lg font-black text-slate-900 uppercase leading-none">Remote / Flexible</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-4">
                      Technologies & Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {role.techStack.map(stack => (
                        <span 
                          key={stack} 
                          className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs font-bold text-[#1b67b2] uppercase tracking-wider"
                        >
                          {stack}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button 
                      onClick={() => router.push(`/careers/apply/${slug}`)}
                      className="w-full h-14 bg-[#1b67b2] hover:bg-[#15538e] text-white font-black rounded-xl transition-all shadow-md shadow-blue-500/25 uppercase text-xs tracking-widest group flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>Apply For This Role</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="text-center text-[11px] text-slate-500 mt-3 font-medium">
                      Performance-based track with immediate PPO evaluation.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
