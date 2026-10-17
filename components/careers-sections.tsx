"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Briefcase, Zap, Globe, Cpu, CheckCircle2, ChevronRight, Target, Sparkles, Code2, Rocket, Layout, BrainCircuit, LineChart, Building2, Database, Cloud, ShieldCheck, User2, Layers, Smartphone } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export function CareersHero() {
  const [time, setTime] = useState<string>("");
  const { data: session, status } = useSession();

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center px-6 bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white text-slate-900 overflow-hidden border-b border-slate-200">
      {/* Ambient glow */}
      <div className="absolute top-[20%] left-1/4 w-[600px] h-[600px] bg-blue-500/[0.05] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full pt-44 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-6">
                Careers at Verve Nova
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-950 tracking-tight uppercase leading-[0.9] mb-8">
                Architect <br /> <span className="text-[#1b67b2]">the Future.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed mb-10 max-w-xl">
                Scouting visionaries to deploy the next generation of digital ecosystems. No templates. No shortcuts. Just pure engineering.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="h-14 px-8 bg-[#1b67b2] hover:bg-[#15538e] text-white font-extrabold rounded-xl transition-all shadow-md shadow-blue-500/20 uppercase text-xs tracking-widest group active:scale-95"
                >
                  <Link href="#internships">
                    <span>Open Roles</span>
                    <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </Button>

                <Button
                  asChild
                  className="h-14 px-8 bg-white border border-slate-300 text-slate-800 font-bold rounded-xl transition-all hover:bg-slate-50 uppercase text-xs tracking-widest group shadow-xs"
                >
                  <Link href={status === 'authenticated' ? (session?.user?.role?.toUpperCase() === 'ADMIN' ? '/admin' : '/profile') : "/careers/auth"}>
                    <User2 className="mr-2 w-4 h-4 text-[#1b67b2]" />
                    {status === 'authenticated' ? "My Profile" : "Candidate Portal"}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Metadata Sidebar */}
          <div className="lg:col-span-4 flex flex-col justify-center gap-8">
            <div className="space-y-6 border-l-2 border-[#1b67b2] pl-8">
              {[
                { label: "Active Roles", val: "12 Tracks", status: "Open" },
                { label: "Work Model", val: "Hybrid / Remote", status: "Active" }
              ].map(item => (
                <div key={item.label} className="group">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p className="text-2xl font-black text-slate-900 uppercase tracking-tight">{item.val}</p>
                    <span className="text-[10px] font-bold text-[#1b67b2] uppercase tracking-widest bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">{item.status}</span>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider inline-block shadow-xs">
                  Recruitment System: Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyJoinUs() {
  const values = [
    {
      title: "Master Mentorship",
      desc: "Our senior engineers personally mentor you through complex architectural challenges.",
      icon: GraduationCap
    },
    {
      title: "Real-World Projects",
      desc: "No dummy work. You will contribute directly to active enterprise systems and production software.",
      icon: Target
    },
    {
      title: "Modern Tech Stack",
      desc: "Deep dive into Next.js, AI/ML models, Cloud Architecture, and advanced Security protocols.",
      icon: Cpu
    },
    {
      title: "The PPO Path",
      desc: "High-performing interns are fast-tracked for a Pre-Placement Offer (PPO) to join us permanently.",
      icon: Rocket
    }
  ];

  return (
    <section className="py-24 px-6 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-xs font-bold text-[#1b67b2] uppercase tracking-[0.4em] mb-4">The Culture</h2>
          <h3 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight uppercase leading-none">
            Beyond Just <span className="text-[#1b67b2]">Work</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-200 transition-all duration-300 group hover:border-[#1b67b2] hover:bg-white hover:shadow-xl shadow-xs"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-[#1b67b2]">
                <v.icon className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-3">
                {v.title}
              </h4>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InternshipProgram() {
  const roles = [
    { slug: "web-development", title: "Web Development", icon: Code2, desc: "Engineer websites, high-converting landing pages, and fullstack systems.", tasks: ["Frontend & Backend", "Core Infrastructure"] },
    { slug: "uiux-design", title: "UI/UX & Design", icon: Sparkles, desc: "Creating the visual soul. UI design, branding, and high-impact assets.", tasks: ["Interface Design", "Branding"] },
    { slug: "business-development", title: "Business Development", icon: Building2, desc: "Strategizing growth and architecting enterprise partnerships.", tasks: ["Strategy & Growth", "Partnership Logic"] },
    { slug: "upwork-bidder", title: "Upwork Bidder", icon: Target, desc: "Direct client acquisition. Mastering the art of the perfect proposal.", tasks: ["Bid Strategy", "Client Acquisition"] },
    { slug: "app-development", title: "App Development", icon: Layout, desc: "Developing mobile experiences using React Native or Flutter.", tasks: ["Mobile Screen Logic", "Cross-platform"] },
    { slug: "ai-automation", title: "AI & Automation", icon: BrainCircuit, desc: "Implementing intelligent chatbots and automation for enterprise.", tasks: ["AI Tuning", "Workflow Logic"] },
    { slug: "digital-marketing", title: "Digital Marketing", icon: LineChart, desc: "Attracting clients through SEO and strategic brand positioning.", tasks: ["SEO Optimization", "Lead Gen"] },
    { slug: "qa-testing", title: "QA / Testing", icon: CheckCircle2, desc: "Ensuring a mirror-finish. Bug hunting and automated testing.", tasks: ["Bug Hunting", "UX Testing"] },
    { slug: "cybersecurity", title: "Cybersecurity", icon: ShieldCheck, desc: "Securing systems and conducting strategic risk assessments.", tasks: ["Risk Analysis", "Security Audits"] },
    { slug: "data-analytics", title: "Data Analytics", icon: Database, desc: "Transform raw data into strategic insights and business intelligence.", tasks: ["Data Modeling", "Pipelines"] },
    { slug: "social-media-management", title: "Social Media Mngt", icon: Smartphone, desc: "Architect brand growth through viral content, reels, and community engagement.", tasks: ["Reels & Content", "Community"] },
    { slug: "campus-ambassador", title: "Campus Ambassador", icon: Layers, desc: "Represent Verve Nova at your campus. Build network & gain leadership experience.", tasks: ["Campus Outreach", "Networking"] }
  ];

  return (
    <section id="internships" className="py-24 px-6 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
          <div className="lg:max-w-2xl">
            <div className="inline-block px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-xs font-bold text-[#1b67b2] uppercase tracking-widest mb-4">
              Internship Tracks
            </div>
            <h3 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight uppercase leading-tight">
              Practical <br /> <span className="text-[#1b67b2]">Opportunity.</span>
            </h3>
          </div>
          <div className="lg:max-w-md p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-[#1b67b2] uppercase tracking-widest">Internship Framework</h4>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">100% Free • Zero Fees</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-slate-700">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration</span>
                <span className="font-extrabold text-slate-900">3 – 6 Months</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Commitment</span>
                <span className="font-extrabold text-slate-900">20–25 hrs / week</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-normal">
              <strong className="text-slate-900 font-bold block mb-1">Stipend & PPO Structure:</strong>
              Performance-driven milestone stipends (₹8,000 – ₹15,000/mo upon milestone assessment). Stellar performers receive immediate full-time Junior Software Engineer Pre-Placement Offers (PPO).
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Link key={role.slug} href={`/careers/internships/${role.slug}`}>
              <div
                className="p-6 h-full rounded-2xl bg-white border border-slate-200 transition-all duration-300 flex flex-col gap-6 group hover:border-[#1b67b2] hover:shadow-xl cursor-pointer shadow-xs"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform text-[#1b67b2]">
                  <role.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight group-hover:text-[#1b67b2] transition-colors mb-2">
                    {role.title}
                  </h4>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6">
                    {role.desc}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div className="space-y-1.5">
                      {role.tasks.map(task => (
                        <div key={task} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1b67b2]" />
                          {task}
                        </div>
                      ))}
                    </div>

                    <div
                      className="flex items-center gap-1.5 text-[9px] font-extrabold text-[#1b67b2] uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 group-hover:bg-[#1b67b2] group-hover:text-white transition-colors"
                    >
                      Apply <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ApplicationProcess() {
  const steps = [
    { title: "Select Track", desc: "Find the internship role that matches your skills and ambitions." },
    { title: "Submit Credentials", desc: "Submit your narrative and portfolio through our dedicated portal." },
    { title: "Studio Audit", desc: "Our senior software architects evaluate your potential and assignments." },
    { title: "Direct Entry", desc: "Join the engineering team and begin building production systems." }
  ];

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-[#1b67b2] uppercase tracking-[0.4em] mb-3">The Journey</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight uppercase">
            Studio <span className="text-[#1b67b2]">Onboarding.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center group hover:border-[#1b67b2] hover:bg-white hover:shadow-xl transition-all shadow-xs"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-6 text-[#1b67b2] font-mono font-bold text-lg">
                0{i + 1}
              </div>
              <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2 group-hover:text-[#1b67b2] transition-colors">
                {step.title}
              </h4>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
