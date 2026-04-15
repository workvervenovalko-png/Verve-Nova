"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { FileLock2, Briefcase, Shovel as ShieldCheck, Fingerprint } from "lucide-react";

export default function NDAPage() {
  const complianceSteps = [
    {
      title: "Mutual Confidentiality",
      icon: Briefcase,
      desc: "Every engagement begins with a bipartite Non-Disclosure Agreement, protecting your intellectual property before a single line of code is written."
    },
    {
      title: "Data Sanitization",
      icon: FileLock2,
      desc: "Post-project execution, all non-essential staging clones are purged through a multi-pass secure deletion protocol."
    },
    {
      title: "Personnel Isolation",
      icon: Fingerprint,
      desc: "Each mission is handled by a isolated pod of engineers. Project intelligence is restricted on a strict 'Need-to-Know' basis."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0C]">
      <Navbar />
      
      <section className="pt-48 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/[0.03] blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center md:text-left">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-black text-indigo-400 uppercase tracking-[0.5em] mb-6"
          >
            Confidentiality // Protocol
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-12"
          >
            NDA <br /> <span className="text-white/10">Compliance.</span>
          </motion.h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {complianceSteps.map((step, i) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="glass-card p-10 rounded-[2.5rem] border border-white/[0.05] relative group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-8 group-hover:border-indigo-500/50 transition-all duration-500">
                  <step.icon className="w-6 h-6 text-white/40 group-hover:text-indigo-400 transition-colors" />
                </div>
                <h3 className="text-[11px] font-black text-white uppercase tracking-widest mb-4">{step.title}</h3>
                <p className="text-[12px] text-white/30 font-bold leading-relaxed uppercase">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="border border-white/[0.04] p-12 rounded-[3.5rem] relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-transparent pointer-events-none" />
             <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-8">Executive Summary</h3>
             <p className="text-sm text-white/20 font-bold uppercase tracking-widest leading-loose text-justify">
               Verve Nova Technologies operates with the discretion of a surgical team. We recognize that in the digital era, confidentiality is not a preference—it is a mandatory architectural requirement. Our systems, personnel, and workflows are all engineered to maintain the absolute sanctity of your enterprise secrets.
             </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
