"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Database } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Data Sovereignty",
      icon: Database,
      content: "Your data is engineered with surgical isolation. We employ distributed node architectures to ensure that sensitive intelligence never resides in a single point of failure."
    },
    {
      title: "Zero-Trust Protocol",
      icon: Lock,
      content: "We assume zero inherent trust across our digital corridors. Every packet is encrypted at the quantum-resistant level, ensuring mission-critical confidentiality."
    },
    {
      title: "Behavioral Analytics",
      icon: Eye,
      content: "We only track essential kinetic interactions required for UI optimization. We do not engage in invasive profiling or third-party intelligence harvesting."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0C]">
      <Navbar />
      
      <section className="pt-48 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-indigo-600/[0.02] blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center md:text-left">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-black text-indigo-400 uppercase tracking-[0.5em] mb-6"
          >
            Compliance // Legal Hub
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-12"
          >
            Privacy <br /> <span className="text-white/10">Protocol.</span>
          </motion.h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {sections.map((sec, i) => (
              <motion.div 
                key={sec.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="glass-card p-8 rounded-[2rem] border border-white/[0.05] flex flex-col items-center md:items-start text-center md:text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
                  <sec.icon className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">{sec.title}</h3>
                <p className="text-[12px] text-white/30 font-bold leading-relaxed uppercase">{sec.content}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-12 text-white/40 font-bold uppercase text-[11px] tracking-widest leading-loose"
          >
            <div className="border-l-2 border-indigo-500 pl-8">
              <h4 className="text-white mb-4">1.0 Intelligence Collection</h4>
              <p>We do not collect personal data beyond what is strictly necessary for the execution of mission-critical digital services. This includes only IP addresses and basic telemetry for system health monitoring.</p>
            </div>
            
            <div className="border-l-2 border-white/10 pl-8">
              <h4 className="text-white mb-4">2.0 Secure Storage</h4>
              <p>All stored artifacts are housed in high-security, encrypted cloud repositories. Access is restricted to elite personnel with verified cryptographic credentials.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
