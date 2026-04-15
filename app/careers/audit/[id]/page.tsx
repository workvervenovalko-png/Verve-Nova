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
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!auditData) return null;

  return (
    <main className="min-h-screen bg-stone-50 selection:bg-indigo-500/30">
      <Navbar />

      <section className="relative pt-48 pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Audit Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16"
          >
            <div>
              <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className="mb-8 p-0 hover:bg-transparent text-slate-400 hover:text-indigo-600 transition-colors uppercase text-[10px] font-bold tracking-widest"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
              </Button>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-2xl">
                  <FileSearch className="w-6 h-6 text-indigo-500" />
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                  Candidate <span className="text-indigo-600">Audit.</span>
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Audit Trail ID: {auditData._id}</p>
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <span className={`px-3 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest ${
                    auditData.status === 'Accepted' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' :
                    auditData.status === 'Rejected' ? 'text-rose-500 border-rose-500/20 bg-rose-500/5' :
                    'text-indigo-500 border-indigo-500/20 bg-indigo-500/5'
                }`}>
                    {auditData.status}
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl flex items-center gap-6">
                 <div className="text-right">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Assigned Track</p>
                    <p className="text-sm font-black text-slate-900 uppercase italic">{auditData.roleSlug?.replace('-', ' ')}</p>
                 </div>
                 <div className="w-px h-10 bg-slate-100" />
                 <div className="text-right">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Transmission Date</p>
                    <p className="text-sm font-black text-slate-900 uppercase italic">{new Date(auditData.createdAt).toLocaleDateString()}</p>
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
                className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-10">
                    <GradIcon className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-xl font-black text-slate-900 uppercase italic">Academic Transcript</h2>
                </div>
                
                <div className="space-y-8">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Institution / Academy</p>
                        <p className="text-lg font-black text-slate-900 uppercase italic">{auditData.education?.college || "N/A"}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-slate-50">
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">Degree</p>
                            <p className="text-sm font-black text-slate-900">{auditData.education?.degree}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">CGPA</p>
                            <p className="text-sm font-black text-indigo-600">{auditData.education?.cgpa}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">10th %</p>
                            <p className="text-sm font-bold text-slate-600">{auditData.education?.tenthPercentage}%</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">12th %</p>
                            <p className="text-sm font-bold text-slate-600">{auditData.education?.twelfthPercentage}%</p>
                        </div>
                    </div>
                </div>
              </motion.div>

              {/* 2. Professional History */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-10">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-xl font-black text-slate-900 uppercase italic">Professional Trajectory</h2>
                </div>

                <div className="space-y-6">
                    {auditData.experience?.length > 0 && auditData.experience[0]?.company ? (
                        auditData.experience.map((exp: any, i: number) => (
                            <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                                <div className="flex gap-4 items-center">
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                        <BuildingIcon className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 uppercase">{exp.role}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exp.company}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-indigo-600 uppercase bg-white px-3 py-1 rounded-full shadow-sm">{exp.duration}</span>
                            </div>
                        ))
                    ) : (
                        <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">No Professional Cache Detected</p>
                        </div>
                    )}
                </div>
              </motion.div>

              {/* 3. Project Sandbox */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="flex items-center gap-4 mb-10">
                    <Code2 className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl font-black text-white uppercase italic">Project Sandbox</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    {auditData.projects?.length > 0 && auditData.projects[0]?.name ? (
                        auditData.projects.map((proj: any, i: number) => (
                            <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all">
                                <h3 className="text-lg font-black uppercase italic mb-2 text-indigo-400 tracking-wider font-mono">{proj.name}</h3>
                                <p className="text-xs font-light text-slate-400 mb-6 leading-relaxed">{proj.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 bg-indigo-500/20 rounded-full text-[9px] font-bold text-indigo-300 uppercase">{proj.techStack}</span>
                                    {proj.link && (
                                        <a href={proj.link} target="_blank" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all">
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-2 py-10 text-center border border-dashed border-white/10 rounded-3xl">
                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">No Architectural Logs Detected</p>
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
                    className="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl"
                >
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.6em] mb-10">Candidate Identity</h3>
                    
                    <div className="space-y-8">
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Full Name</p>
                            <p className="text-2xl font-black text-slate-900 uppercase italic leading-none">{auditData.userId?.name}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Clearance ID</p>
                            <p className="text-xl font-bold text-slate-900 font-mono tracking-tighter leading-none">{auditData.userId?.vn_id}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 pt-8 border-t border-slate-50">
                            <div>
                                <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">Email Matrix</p>
                                <p className="text-xs font-bold text-slate-900 truncate">{auditData.userId?.email}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">Phone Terminal</p>
                                <p className="text-xs font-bold text-slate-900">{auditData.personal?.phone}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">Current Cell</p>
                                <p className="text-xs font-bold text-slate-900">{auditData.personal?.currentCity}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Terminal Assets */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-8 rounded-[2.5rem] bg-indigo-600 text-white shadow-xl relative overflow-hidden"
                >
                    <Monitor className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10" />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.6em] mb-10 text-white/60">Terminal Assets</h3>
                    
                    <div className="grid grid-cols-1 gap-4 relative z-10">
                        {auditData.links?.resumeUrl && (
                            <Button 
                                onClick={() => window.open(auditData.links.resumeUrl, '_blank')}
                                className="h-14 bg-white/10 hover:bg-white text-white hover:text-indigo-600 border border-white/20 rounded-2xl transition-all flex justify-between px-6"
                            >
                                <span className="text-[10px] font-black uppercase tracking-widest">Master Resume</span>
                                <ExternalLink className="w-4 h-4" />
                            </Button>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            {auditData.links?.linkedIn && (
                                <Button 
                                    onClick={() => window.open(auditData.links.linkedIn, '_blank')}
                                    className="h-14 bg-white/10 hover:bg-white text-white hover:text-indigo-600 border border-white/20 rounded-2xl flex items-center justify-center p-0"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </Button>
                            )}
                            {auditData.links?.github && (
                                <Button 
                                    onClick={() => window.open(auditData.links.github, '_blank')}
                                    className="h-14 bg-white/10 hover:bg-white text-white hover:text-indigo-600 border border-white/20 rounded-2xl flex items-center justify-center p-0"
                                >
                                    <Github className="w-5 h-5" />
                                </Button>
                            )}
                        </div>
                        {auditData.links?.portfolio && (
                            <Button 
                                onClick={() => window.open(auditData.links.portfolio, '_blank')}
                                className="h-14 bg-white/10 hover:bg-white text-white hover:text-indigo-600 border border-white/20 rounded-2xl transition-all flex justify-between px-6"
                            >
                                <span className="text-[10px] font-black uppercase tracking-widest">Portfolio</span>
                                <Globe className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </motion.div>

                {/* Audit Seal */}
                <div className="pt-10 flex flex-col items-center justify-center text-center opacity-30">
                    <ShieldCheck className="w-12 h-12 mb-4" />
                    <p className="text-[8px] font-black uppercase tracking-[0.3em]">Verve Nova Candidate Validation System</p>
                    <p className="text-[7px] font-bold uppercase mt-1 tracking-widest">Official Audit Record // 2026</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
