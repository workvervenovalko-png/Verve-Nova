"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { internshipRoles } from "@/lib/internship-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Clock, Globe, ShieldCheck, Zap } from "lucide-react";

export default function InternshipDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const role = internshipRoles[slug as string];

  if (!role) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-8 uppercase tracking-tighter">Role Not Found</h1>
          <Button onClick={() => router.push("/careers")} className="bg-indigo-600 text-white rounded-xl px-8">
            Back to Careers
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background selection:bg-indigo-500/30">
      <Navbar />

      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        {/* Soft Ambient Glow */}
        <div className="absolute top-[20%] left-1/4 w-[600px] h-[600px] bg-indigo-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[10%] right-1/4 w-[400px] h-[400px] bg-violet-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <button 
              onClick={() => router.push("/careers")}
              className="group flex items-center gap-3 text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Back to Careers
            </button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[1px] bg-indigo-500/30" />
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.4em]">Studio Track // {role.slug}</span>
                </div>

                <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-12">
                  {role.title.split(' ')[0]} <br /> 
                  <span className="text-gradient">{role.title.split(' ').slice(1).join(' ')}</span>
                </h1>

                <p className="text-xl md:text-2xl text-white/30 font-light leading-relaxed mb-20 max-w-3xl">
                  {role.shortDesc}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-white/[0.04] pt-16">
                  {/* Responsibilities */}
                  <div>
                    <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.6em] mb-10">Responsibilities</h3>
                    <ul className="space-y-6">
                      {role.responsibilities.map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (i * 0.1) }}
                          className="flex gap-4 text-white/40 leading-relaxed font-light text-base"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.6em] mb-10">The Track Path</h3>
                    <ul className="space-y-6">
                      {role.benefits.map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (i * 0.1) }}
                          className="flex gap-4 text-indigo-400/80 leading-relaxed font-bold text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-10 rounded-[2.5rem] sticky top-32"
              >
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                      <Clock className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest leading-none mb-1">Duration</p>
                      <p className="text-xl font-black text-white uppercase leading-none">{role.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                      <Globe className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest leading-none mb-1">Mode</p>
                      <p className="text-xl font-black text-white uppercase leading-none">Remote / Flexible</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/[0.06]">
                    <h4 className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-6">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.techStack.map(stack => (
                        <span key={stack} className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-[9px] font-bold text-indigo-400 uppercase tracking-wider">{stack}</span>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => {
                        router.push(`/careers/apply/${slug}`);
                    }}
                    className="w-full h-16 bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-[0_0_32px_rgba(99,102,241,0.3)] text-white font-black rounded-xl transition-all uppercase text-[10px] tracking-[0.5em] group overflow-hidden relative border-0"
                  >
                    Apply Now
                  </Button>
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
