"use client";

import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getDetailedAudit } from "@/app/actions/audit";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { 
  User2, Briefcase, Calendar, Clock, ArrowLeft, 
  CheckCircle2, ShieldCheck, FileSearch, GraduationCap as GradIcon,
  Building as BuildingIcon, Code2, Monitor, Github, Linkedin, Globe, 
  ExternalLink, Loader2
} from "lucide-react";
import { toast } from "sonner";

export default function DetailedAuditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [auditData, setAuditData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const ensureAbsoluteUrl = (url: string) => {
    if (!url || typeof url !== 'string') return undefined;
    const trimmed = url.trim();
    if (trimmed.startsWith('http') || trimmed.startsWith('data:') || trimmed.startsWith('mailto:')) return trimmed;
    
    // If it has a dot and no spaces, it's likely a domain (e.g., google.com)
    if (trimmed.includes('.') && !trimmed.includes(' ')) return `https://${trimmed}`;
    
    // If it's a relative path starting with /
    if (trimmed.startsWith('/')) return trimmed;
    
    // Default to the original string if it doesn't match above but still exists
    return trimmed;
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDetailedAudit(id);
      if (result.success) {
        setAuditData(result.data);
      } else {
        toast.error(result.error || "Failed to retrieve audit logs.");
        router.push("/profile");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!auditData) return null;

  return (
    <main className="min-h-screen bg-background selection:bg-indigo-500/30 text-white">
      <Navbar />

      <section className="relative pt-48 pb-32 px-6">
        {/* Ambient background glow */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Audit Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16"
          >
            <div>
              <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className="mb-8 p-0 hover:bg-transparent text-white/40 hover:text-indigo-400 transition-colors uppercase text-[10px] font-black tracking-[0.4em]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
              </Button>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
                  <FileSearch className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                    Candidate <span className="text-gradient">Audit.</span>
                  </h1>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em] mt-3">Advanced Verification Protocol // VNT-SEC-01</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest font-mono">TR-ID: {auditData._id}</p>
                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                <span className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] ${
                    auditData.status === 'Accepted' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' :
                    auditData.status === 'Rejected' ? 'text-rose-400 border-rose-500/20 bg-rose-500/5' :
                    'text-indigo-400 border-indigo-500/20 bg-indigo-500/5'
                }`}>
                    {auditData.status}
                </span>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl border-white/[0.08] flex items-center gap-8">
                 <div className="text-right">
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] mb-2">Track Assigned</p>
                    <p className="text-lg font-black text-white uppercase italic tracking-tighter">{auditData.roleSlug?.replace('-', ' ')}</p>
                 </div>
                 <div className="w-px h-12 bg-white/5" />
                 <div className="text-right">
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] mb-2">Transmission Date</p>
                    <p className="text-lg font-black text-white uppercase italic tracking-tighter">{new Date(auditData.createdAt).toLocaleDateString()}</p>
                 </div>
            </div>
          </motion.div>

          {/* Audit Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Data Arrays */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* 1. Academic Matrix */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-10 rounded-[2.5rem] border-white/[0.08] shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/[0.02] blur-[100px] rounded-full pointer-events-none" />
                
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <GradIcon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h2 className="text-xl font-black text-white uppercase italic tracking-wider">Academic Transcript</h2>
                </div>
                
                <div className="space-y-10 relative z-10">
                    <div>
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-4">Institution / Academy</p>
                        <p className="text-2xl font-black text-white uppercase italic leading-none">{auditData.education?.college || "N/A"}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/[0.04]">
                        <div>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] mb-3">Degree</p>
                            <p className="text-sm font-black text-white/80 uppercase">{auditData.education?.degree || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] mb-3">CGPA / Score</p>
                            <p className="text-sm font-black text-indigo-400">{auditData.education?.cgpa || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] mb-3">10th Grade</p>
                            <p className="text-sm font-bold text-white/60">{auditData.education?.tenthPercentage ? `${auditData.education?.tenthPercentage}%` : "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] mb-3">12th Grade</p>
                            <p className="text-sm font-bold text-white/60">{auditData.education?.twelfthPercentage ? `${auditData.education?.twelfthPercentage}%` : "N/A"}</p>
                        </div>
                    </div>
                </div>
              </motion.div>

              {/* 2. Professional History */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-10 rounded-[2.5rem] border-white/[0.08] shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <Briefcase className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h2 className="text-xl font-black text-white uppercase italic tracking-wider">Professional Trajectory</h2>
                </div>

                <div className="space-y-6">
                    {auditData.experience?.length > 0 && auditData.experience[0]?.company ? (
                        auditData.experience.map((exp: any, i: number) => (
                            <div key={i} className="p-8 bg-white/[0.02] border border-white/[0.06] rounded-3xl flex items-center justify-between group hover:bg-white/[0.05] transition-all">
                                <div className="flex gap-6 items-center">
                                    <div className="w-14 h-14 rounded-2xl bg-white/[0.05] flex items-center justify-center border border-white/[0.1]">
                                        <BuildingIcon className="w-6 h-6 text-white/20 group-hover:text-indigo-400 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-white uppercase tracking-tight mb-1">{exp.role}</p>
                                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">{exp.company}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-[10px] font-black text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl">{exp.duration}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-16 text-center border-2 border-dashed border-white/[0.04] rounded-[2rem] bg-white/[0.01]">
                            <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.6em]">No Professional Cache Detected</p>
                        </div>
                    )}
                </div>
              </motion.div>

              {/* 3. Project Sandbox */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#111113] p-10 rounded-[3rem] border border-white/[0.06] text-white shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/[0.05] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <Code2 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h2 className="text-xl font-black text-white uppercase italic tracking-wider">Project Sandbox</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {auditData.projects?.length > 0 && auditData.projects[0]?.name ? (
                        auditData.projects.map((proj: any, i: number) => (
                            <div key={i} className="p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] hover:bg-white/[0.06] transition-all group">
                                <h3 className="text-lg font-black uppercase italic mb-3 text-indigo-400 tracking-wider font-mono transform transition-transform group-hover:translate-x-1">{proj.name}</h3>
                                <p className="text-xs font-light text-white/40 mb-8 leading-relaxed line-clamp-3">{proj.description}</p>
                                <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
                                    <span className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-[8px] font-black text-indigo-300 uppercase tracking-widest">{proj.techStack}</span>
                                    {proj.link && ensureAbsoluteUrl(proj.link) && (
                                        <a 
                                            href={ensureAbsoluteUrl(proj.link)} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-2 py-16 text-center border-2 border-dashed border-white/[0.04] rounded-[2rem] bg-white/[0.01]">
                            <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.6em]">No Architectural Logs Detected</p>
                        </div>
                    )}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Identity & Assets */}
            <div className="lg:col-span-4 space-y-10">
                
                {/* Identity Matrix */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-10 rounded-[3rem] glass-card border-white/[0.08] shadow-2xl"
                >
                    <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">Candidate Identity</h3>
                    
                    <div className="space-y-10">
                        <div>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] mb-4">Master Identity</p>
                            <p className="text-3xl font-black text-white uppercase italic leading-none">{auditData.userId?.name}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] mb-4">Clearance ID</p>
                            <p className="text-xl font-black text-indigo-400 font-mono tracking-tighter leading-none">{auditData.userId?.vn_id}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-8 pt-10 border-t border-white/[0.04]">
                            <div className="group">
                                <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-2">Digital Coord</p>
                                <p className="text-xs font-black text-white/80 truncate group-hover:text-indigo-400 transition-colors">{auditData.userId?.email}</p>
                            </div>
                            <div className="group">
                                <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-2">Comms Terminal</p>
                                <p className="text-xs font-black text-white/80 group-hover:text-indigo-400 transition-colors">{auditData.personal?.phone || "N/A"}</p>
                            </div>
                            <div className="group">
                                <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-2">Geo Location</p>
                                <p className="text-xs font-black text-white/80 group-hover:text-indigo-400 transition-colors">{auditData.personal?.currentCity || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Terminal Assets */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-10 rounded-[3rem] bg-indigo-600 text-white shadow-2xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.05] blur-[100px] rounded-full pointer-events-none" />
                    <Monitor className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-700" />
                    
                    <h3 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-white/60">Terminal Assets</h3>
                    
                    <div className="grid grid-cols-1 gap-5 relative z-10">
                        {auditData.links?.resumeUrl || auditData.links?.resumeContent ? (
                            <a 
                                href={auditData.links?.resumeContent ? `/api/resume/${auditData._id}` : ensureAbsoluteUrl(auditData.links.resumeUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-16 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl transition-all flex items-center justify-between px-8"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Master Resume</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        ) : (
                          <div className="h-16 flex items-center justify-center border border-white/10 rounded-2xl bg-white/[0.03]">
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/20">No Resume Found</span>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-5">
                            {auditData.links?.linkedIn && ensureAbsoluteUrl(auditData.links.linkedIn) ? (
                                <a 
                                    href={ensureAbsoluteUrl(auditData.links.linkedIn)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-16 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl flex items-center justify-center transition-all"
                                >
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            ) : (
                              <div className="h-16 flex items-center justify-center border border-white/10 rounded-2xl opacity-20"><Linkedin className="w-5 h-5" /></div>
                            )}
                            {auditData.links?.github && ensureAbsoluteUrl(auditData.links.github) ? (
                                <a 
                                    href={ensureAbsoluteUrl(auditData.links.github)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-16 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl flex items-center justify-center transition-all"
                                >
                                    <Github className="w-6 h-6" />
                                </a>
                            ) : (
                              <div className="h-16 flex items-center justify-center border border-white/10 rounded-2xl opacity-20"><Github className="w-5 h-5" /></div>
                            )}
                        </div>

                        {auditData.links?.portfolio && ensureAbsoluteUrl(auditData.links.portfolio) && (
                            <a 
                                href={ensureAbsoluteUrl(auditData.links.portfolio)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-16 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl transition-all flex items-center justify-between px-8"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Portfolio</span>
                                <Globe className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </motion.div>

                {/* Audit Seal */}
                <div className="pt-10 flex flex-col items-center justify-center text-center opacity-20">
                    <ShieldCheck className="w-14 h-14 mb-4 text-white" />
                    <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white">Verve Nova Tech Certification System</p>
                    <p className="text-[7px] font-bold uppercase mt-2 tracking-[0.3em] text-white/60">Official Secure Audit Trail // 2026-VNT</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
