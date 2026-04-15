"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Globe, Building2, CheckCircle2, Star, Target, Users } from "lucide-react";
import Link from "next/link";

export default function RegistryPage() {
  const dummyClients = [
    { name: "NexLogix", industry: "AI Logistics" },
    { name: "CloudArmor", industry: "Cybersecurity" },
    { name: "VeloSync", industry: "SaaS Systems" },
    { name: "QuantBase", industry: "Data Analytics" },
    { name: "AuraSystems", industry: "Cloud Infra" },
    { name: "NexusFlow", industry: "Fintech" }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute top-[20%] right-1/4 w-[500px] h-[500px] bg-indigo-500/[0.04] blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="max-w-4xl">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-black text-indigo-400 uppercase tracking-[0.5em] mb-4 md:mb-6"
            >
              Official Registry & Compliance
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-6 md:mb-8"
            >
              Trust is our <br /> <span className="text-white/10">Absolute Currency</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-white/25 font-bold leading-relaxed max-w-2xl mb-8 md:mb-12 uppercase mx-auto md:mx-0"
            >
              Verve Nova Technologies operates with surgical precision and government-grade transparency. Below you will find our official certifications and key portfolio highlights.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Governance Section */}
      <section className="py-16 md:py-24 bg-[#0C0C0F] relative overflow-hidden border-y border-white/[0.04]">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 text-center md:text-left">
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-6">Government Compliance</h2>
              <p className="text-white/25 font-bold leading-relaxed uppercase text-sm mb-8 max-w-xl">
                We are fully registered under the Ministry of Micro, Small and Medium Enterprises (MSME), Government of India. Our operations adhere to the highest standards of corporate governance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                 <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                       <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-tight">ISO 9001:2015 Standards</span>
                 </div>
                 <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                       <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-tight">NDA Compliant Ops</span>
                 </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
               <motion.div 
                 whileHover={{ y: -10 }}
                 className="glass-card p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center text-center gap-6 hover:glass-card-hover transition-all duration-500"
               >
                 <div className="w-full aspect-square bg-white/[0.03] rounded-2xl overflow-hidden p-4">
                    <img src="/msme-udyam-registration.jpeg" alt="MSME Logo" className="w-full h-full object-contain brightness-75 hover:brightness-100 transition-all" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-black text-white/60 uppercase tracking-widest">MSME Registered</span>
                    <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest mt-1">Reg No: UP-[REDACTED]</span>
                 </div>
               </motion.div>

               <motion.div 
                 whileHover={{ y: -10 }}
                 className="glass-card p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center text-center gap-6 hover:glass-card-hover transition-all duration-500"
               >
                 <div className="w-full aspect-square bg-white/[0.03] rounded-2xl overflow-hidden p-4">
                    <img src="/udyam.png" alt="Udyam Logo" className="w-full h-full object-contain brightness-75 hover:brightness-100 transition-all" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-black text-white/60 uppercase tracking-widest">Udyam Certified</span>
                    <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-1">Ministry Approved</span>
                 </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-background relative">
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-violet-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 text-center md:text-left flex flex-col items-center md:items-start relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col items-center md:items-start">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 md:mb-10 leading-none text-center md:text-left">
              Engineering High-Performance <br /> <span className="text-gradient">Specialized Systems</span>
            </h2>
            <div className="space-y-6 md:space-y-8 text-base md:text-lg text-white/25 font-bold leading-relaxed uppercase text-center md:text-justify max-w-4xl">
              <p>
                Verve Nova Technologies is more than a digital agency; we are a specialized engineering studio dedicated to building high-performance software systems for global enterprise partners.
              </p>
              <p>
                We operate at the intersection of architectural excellence and surgical precision. Whether it is deploying serverless AI infrastructures or engineering secure fintech gateways.
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-16 md:mt-20 w-full">
               {[
                 { icon: Globe, label: "Global Presence", val: "12+ Countries" },
                 { icon: Award, label: "Success Rate", val: "100% Score" },
                 { icon: Users, label: "Specialists", val: "Elite Team" },
                 { icon: Target, label: "Focus", val: "Precision" }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center gap-4">
                    <item.icon className="w-6 md:w-8 h-6 md:h-8 text-indigo-400" />
                    <div className="flex flex-col items-center">
                       <span className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-none">{item.val}</span>
                       <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-1">{item.label}</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section - already dark themed, just adjust accent colors */}
      <section className="py-20 md:py-24 bg-[#0C0C0F] text-white relative overflow-hidden border-y border-white/[0.04]">
        <div className="absolute inset-0 bg-indigo-600/[0.02] -skew-y-3 origin-bottom-right" />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-16 md:border-l-4 md:border-indigo-500 md:pl-6 text-center md:text-left">Mission Critical Deliveries</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <motion.div 
               whileHover={{ x: 10 }}
               className="glass-card p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] flex flex-col items-center text-center md:items-start md:text-left gap-8 group hover:glass-card-hover transition-all duration-500"
             >
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.06] relative">
                   <img src="/projects/transcription.png" alt="Advance Transcription" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#111113] to-transparent" />
                </div>
                <div className="flex flex-col gap-4">
                   <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Project: Advance Transcription</span>
                   <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Precision Digital Transcription</h3>
                   <p className="text-[13px] md:text-sm font-bold text-white/20 uppercase leading-relaxed">
                     A high-precision engine engineered for judicial and medical documentation accuracy, featuring secure data handling and crystal-clear output standards.
                   </p>
                </div>
             </motion.div>

             <motion.div 
               whileHover={{ x: -10 }}
               className="glass-card p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] flex flex-col items-center text-center md:items-start md:text-left gap-8 group hover:glass-card-hover transition-all duration-500"
             >
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.06] relative">
                   <img src="/projects/siora.png" alt="Siora Architecture" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#111113] to-transparent" />
                </div>
                <div className="flex flex-col gap-4">
                   <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Project: Siora Architecture</span>
                   <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Architectural Planning & Construction</h3>
                   <p className="text-[13px] md:text-sm font-bold text-white/20 uppercase leading-relaxed">
                     A specialized platform for premium architectural operations, focusing on high-end construction blueprints (Naksha), structural mapping, and project design for elite construction systems.
                   </p>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Clients Strip */}
      <section className="py-20 bg-background overflow-hidden border-t border-white/[0.04]">
        <div className="container mx-auto px-6 mb-12">
           <h5 className="text-[10px] font-black text-white/15 uppercase tracking-[0.4em] text-center">Global Partners & Clients</h5>
        </div>
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-24 items-center"
          >
            {[...dummyClients, ...dummyClients].map((client, i) => (
              <div key={i} className="flex flex-col items-center gap-2 opacity-[0.08] hover:opacity-30 transition-all">
                <span className="text-2xl font-black text-white uppercase tracking-tighter">{client.name}</span>
                <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-[0.2em]">{client.industry}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
