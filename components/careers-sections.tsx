"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Briefcase, Zap, Globe, Cpu, CheckCircle2, ChevronRight, Target, Sparkles, Code2, Rocket, Layout, BrainCircuit, LineChart, Building2, Database, Cloud, ShieldCheck, User2, Layers } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";


export function CareersHero() {
  const [time, setTime] = useState<string>("");
  const { status } = useSession();

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center px-6 bg-background overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-[20%] left-1/4 w-[600px] h-[600px] bg-indigo-500/[0.04] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-1/4 w-[400px] h-[400px] bg-violet-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.5em] mb-8">Careers at Verve Nova</p>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-10">
                Architect <br /> <span className="text-gradient">the Future.</span>
              </h1>

              <p className="text-base md:text-lg text-white/25 font-light leading-relaxed mb-12 max-w-xl">
                Scouting visionaries to deploy the next generation of digital ecosystems. No templates. No shortcuts. Just pure engineering.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  asChild
                  className="h-14 px-10 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-xl transition-all hover:shadow-[0_0_32px_rgba(99,102,241,0.3)] uppercase text-[10px] tracking-[0.2em] group"
                >
                  <Link href="#internships">
                    <span>Open roles</span>
                    <ArrowUpRight className="ml-3 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </Button>

                <Button
                  asChild
                  className="h-14 px-10 bg-white/[0.04] border border-white/[0.08] text-white font-bold rounded-xl transition-all hover:bg-white/[0.08] uppercase text-[10px] tracking-[0.2em] group backdrop-blur-sm"
                >
                  <Link href={status === 'authenticated' ? "/profile" : "/careers/auth"}>
                    <User2 className="mr-3 w-4 h-4" />
                    {status === 'authenticated' ? "My Profile" : "Candidate Portal"}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Metadata Sidebar & Branded Signature */}
          <div className="lg:col-span-4 flex flex-col justify-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="space-y-8 border-l border-white/[0.06] pl-10 relative"
            >
              <div className="absolute top-0 left-[-1px] h-full w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />

              {[
                { label: "Active Roles", val: "09", status: "Open" },
                { label: "Internal Time", val: time || "--:-- --", status: "Live" }
              ].map(item => (
                <div key={item.label} className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-indigo-500 transition-colors" />
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] leading-none">{item.label}</p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <p className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-indigo-400 transition-colors leading-none">{item.val}</p>
                    <span className="text-[7px] font-bold text-indigo-400/50 uppercase tracking-widest border border-indigo-500/10 px-1.5 py-0.5 rounded">{item.status}</span>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <div className="glass-card text-[10px] font-bold text-white/50 px-5 py-3 rounded-xl uppercase tracking-[0.3em] inline-block">
                  System Status: Active
                </div>
              </div>
            </motion.div>

            {/* VNT Technical Signature */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex flex-col gap-2 pl-10 border-l border-white/[0.03]"
            >
                <span className="text-[8px] font-black text-white/10 uppercase tracking-[0.8em]">VNT.RECRUITMENT.ALPHA</span>
                <span className="text-[7px] font-bold text-indigo-500/20 uppercase tracking-[0.4em]">AUTH_PROTOCOL_01</span>
            </motion.div>
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
      desc: "No dummy work. You will contribute directly to active enterprise systems and production-grade software.",
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
    <section className="py-32 px-6 bg-[#0C0C0F] border-y border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-20 items-end">
          <div className="lg:col-span-8">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-[0.5em] mb-6">The Culture</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              Beyond Just <span className="text-white/8">Work</span>
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: i * 0.1
              }}
              className="glass-card p-8 rounded-[2rem] transition-all duration-500 group hover:glass-card-hover cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600/20 to-violet-600/20 flex items-center justify-center mb-6 border border-indigo-500/10 group-hover:from-indigo-600 group-hover:to-violet-600 transition-all duration-500">
                <v.icon className="w-6 h-6 text-indigo-400 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase tracking-tight mb-4 group-hover:text-indigo-400 transition-colors">
                {v.title}
              </h4>
              <p className="text-sm text-white/25 font-light leading-relaxed">{v.desc}</p>
            </motion.div>
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
    { slug: "cybersecurity", title: "Cybersecurity", icon: ShieldCheck, desc: "Securing systems and conducting strategic risk assessments.", tasks: ["Risk Analysis", "Security Audits"] }
  ];

  return (
    <section id="internships" className="py-32 px-6 bg-background border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <div className="lg:max-w-2xl">
            <div className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-6">
              Internship Tracks
            </div>
            <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-8">
              Practical <br /> <span className="text-gradient">Opportunity.</span>
            </h3>
          </div>
          <div className="lg:max-w-sm glass-card p-8 rounded-2xl">
            <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Terms</h4>
            <p className="text-xs text-white/25 leading-relaxed font-light">
              Our internship is performance-based. High-performing visionaries are converted to immediate paid roles (PPO).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role, i) => (
            <Link key={role.slug} href={`/careers/internships/${role.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  delay: i * 0.05
                }}
                className="glass-card p-6 h-full rounded-[2rem] transition-all duration-500 flex flex-col gap-6 group hover:glass-card-hover cursor-pointer"
              >
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-indigo-600/15 to-violet-600/15 flex items-center justify-center border border-indigo-500/10 group-hover:from-indigo-600 group-hover:to-violet-600 group-hover:border-transparent transition-all duration-500">
                  <role.icon className="w-7 h-7 text-indigo-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-indigo-400 transition-colors mb-3">{role.title}</h4>
                  <p className="text-sm text-white/20 font-light leading-relaxed mb-6">{role.desc}</p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="space-y-2">
                      {role.tasks.map(task => (
                        <div key={task} className="flex items-center gap-3 text-[9px] font-bold text-white/15 uppercase tracking-widest">
                          <div className="w-1 h-1 rounded-full bg-indigo-500" />
                          {task}
                        </div>
                      ))}
                    </div>

                    <div
                      className="opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 flex items-center gap-2 text-[8px] font-black text-indigo-400 uppercase tracking-widest transition-all duration-500 bg-indigo-500/10 px-3 py-2 rounded-full border border-indigo-500/20"
                    >
                      Enter <ArrowUpRight className="w-2.5 h-2.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ApplicationProcess() {
  const steps = [
    {
      title: "Select Track",
      desc: "Find the internship role that matches your skills."
    },
    {
      title: "Submit Credentials",
      desc: "Submit your narrative and portfolio through the portal."
    },
    {
      title: "Studio Audit",
      desc: "Our senior architects review your potential."
    },
    {
      title: "Direct Entry",
      desc: "Join the collective and begin architecting."
    }
  ];

  return (
    <section className="py-32 px-6 bg-[#0C0C0F] relative overflow-hidden border-y border-white/[0.04]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-[0.5em] mb-6">The Journey</h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight"
          >
            Studio <span className="text-gradient">Onboarding.</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mb-8 group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-violet-600 group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_24px_rgba(99,102,241,0.2)]">
                  <span className="text-lg font-black text-white/40 group-hover:text-white transition-colors">{i + 1}</span>
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-tight mb-4 group-hover:text-indigo-400 transition-colors">
                  {step.title}
                </h4>
                <p className="text-sm text-white/20 font-light leading-relaxed px-4">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
