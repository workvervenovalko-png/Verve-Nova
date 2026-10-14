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
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import { VNTLoader } from "@/components/vnt-loader";

export default function DetailedAuditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [auditData, setAuditData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const ensureAbsoluteUrl = (url: string) => {
    if (!url || typeof url !== 'string') return undefined;
    const trimmed = url.trim();
    if (trimmed.startsWith('http') || trimmed.startsWith('data:') || trimmed.startsWith('mailto:')) return trimmed;
    if (trimmed.includes('.') && !trimmed.includes(' ')) return `https://${trimmed}`;
    if (trimmed.startsWith('/')) return trimmed;
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

  if (isLoading && !auditData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <VNTLoader size="lg" />
      </div>
    );
  }

  if (!auditData) return null;

  return (
    <main className="min-h-screen bg-[#fcfdfd] text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />

      <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Audit Header */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-8 border-b border-slate-200"
          >
            <div>
              <button 
                onClick={() => router.back()}
                className="mb-6 flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#1b67b2] transition-colors uppercase tracking-wider cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1b67b2] shadow-xs">
                  <FileSearch className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight uppercase leading-none">
                    Candidate <span className="text-[#1b67b2]">Audit</span>
                  </h1>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1.5">
                    Advanced Verification Protocol // VNT-SEC-01
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <p className="text-xs font-mono font-bold text-slate-500">TR-ID: {auditData._id}</p>
                <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${
                    auditData.status === 'Accepted' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' :
                    auditData.status === 'Rejected' ? 'text-rose-700 border-rose-200 bg-rose-50' :
                    'text-blue-700 border-blue-200 bg-blue-50'
                }`}>
                    {auditData.status}
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-6">
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Track Assigned</p>
                    <p className="text-base font-black text-slate-900 uppercase tracking-tight">{auditData.roleSlug?.replace('-', ' ')}</p>
                 </div>
                 <div className="w-px h-8 bg-slate-200" />
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Submission Date</p>
                    <p className="text-base font-black text-slate-900 uppercase tracking-tight">{new Date(auditData.createdAt).toLocaleDateString()}</p>
                 </div>
            </div>
          </motion.div>

          {/* Audit Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Data Arrays */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* 1. Academic Matrix */}
              <motion.div 
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-xs"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[#1b67b2]">
                      <GradIcon className="w-5 h-5" />
                    </div>
                    <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">Academic Record</h2>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Institution / Academy</p>
                        <p className="text-xl font-black text-slate-900 uppercase leading-snug">{auditData.education?.college || "N/A"}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Degree</p>
                            <p className="text-xs font-black text-slate-900 uppercase">{auditData.education?.degree || "N/A"}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                            <p className="text-[10px] font-bold text-[#1b67b2] uppercase tracking-wider mb-1">CGPA / Score</p>
                            <p className="text-xs font-black text-[#1b67b2]">{auditData.education?.cgpa || "N/A"}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">10th Grade</p>
                            <p className="text-xs font-bold text-slate-800">{auditData.education?.tenthPercentage ? `${auditData.education?.tenthPercentage}%` : "N/A"}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">12th Grade</p>
                            <p className="text-xs font-bold text-slate-800">{auditData.education?.twelfthPercentage ? `${auditData.education?.twelfthPercentage}%` : "N/A"}</p>
                        </div>
                    </div>
                </div>
              </motion.div>

              {/* 2. Professional History */}
              <motion.div 
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-xs"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[#1b67b2]">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">Experience & Work History</h2>
                </div>

                <div className="space-y-4">
                    {auditData.experience?.length > 0 && auditData.experience[0]?.company ? (
                        auditData.experience.map((exp: any, i: number) => (
                            <div key={i} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                                <div className="flex gap-4 items-center">
                                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center border border-slate-200 text-[#1b67b2]">
                                        <BuildingIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{exp.role}</p>
                                        <p className="text-xs font-medium text-slate-600 uppercase tracking-wider">{exp.company}</p>
                                    </div>
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-[#1b67b2] uppercase bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg">{exp.duration}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-10 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">No Previous Experience Provided</p>
                        </div>
                    )}
                </div>
              </motion.div>

              {/* 3. Project Sandbox */}
              <motion.div 
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-xs"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[#1b67b2]">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">Relevant Projects</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {auditData.projects?.length > 0 && auditData.projects[0]?.name ? (
                        auditData.projects.map((proj: any, i: number) => (
                            <div key={i} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between">
                                <div>
                                  <h3 className="text-sm font-black uppercase text-slate-900 mb-2">{proj.name}</h3>
                                  <p className="text-xs font-normal text-slate-600 mb-4 leading-relaxed line-clamp-3">{proj.description}</p>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-700 uppercase">{proj.techStack}</span>
                                    {proj.link && ensureAbsoluteUrl(proj.link) && (
                                        <a 
                                            href={ensureAbsoluteUrl(proj.link)} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-[#1b67b2] hover:border-[#1b67b2] transition-colors"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-2 py-10 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">No Projects Logged</p>
                        </div>
                    )}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Identity & Assets */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* Identity Matrix */}
                <motion.div 
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs"
                >
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6 pb-3 border-b border-slate-100">
                      Candidate Identity
                    </h3>
                    
                    <div className="space-y-5">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</p>
                            <p className="text-xl font-black text-slate-900 uppercase leading-snug">{auditData.userId?.name}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Clearance VN-ID</p>
                            <p className="text-sm font-mono font-bold text-[#1b67b2]">{auditData.userId?.vn_id}</p>
                        </div>
                        <div className="space-y-3 pt-4 border-t border-slate-100">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email Address</p>
                                <p className="text-xs font-semibold text-slate-800 truncate">{auditData.userId?.email}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Contact Phone</p>
                                <p className="text-xs font-semibold text-slate-800">{auditData.personal?.phone || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">City / Location</p>
                                <p className="text-xs font-semibold text-slate-800">{auditData.personal?.currentCity || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Terminal Assets */}
                <motion.div 
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs"
                >
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-5 pb-3 border-b border-slate-100">
                      Attached Documents & Profiles
                    </h3>
                    
                    <div className="space-y-3">
                        {auditData.links?.resumeUrl || auditData.links?.resumeContent ? (
                            <a 
                                href={auditData.links?.resumeContent ? `/api/resume/${auditData._id}` : ensureAbsoluteUrl(auditData.links.resumeUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-12 bg-[#1b67b2] hover:bg-[#15538e] text-white font-bold rounded-xl transition-all flex items-center justify-between px-5 text-xs shadow-md shadow-blue-500/20"
                            >
                                <span className="uppercase tracking-wider">Download Resume</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        ) : (
                          <div className="h-12 flex items-center justify-center border border-slate-200 rounded-xl bg-slate-50 text-slate-400 text-xs font-bold">
                            No Resume Found
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            {auditData.links?.linkedIn && ensureAbsoluteUrl(auditData.links.linkedIn) ? (
                                <a 
                                    href={ensureAbsoluteUrl(auditData.links.linkedIn)} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="h-12 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-colors"
                                >
                                    <Linkedin className="w-4 h-4 text-[#1b67b2]" />
                                    <span>LinkedIn</span>
                                </a>
                            ) : (
                              <div className="h-12 flex items-center justify-center border border-slate-200 rounded-xl bg-slate-50 text-slate-400 text-xs font-bold">
                                No LinkedIn
                              </div>
                            )}

                            {auditData.links?.github && ensureAbsoluteUrl(auditData.links.github) ? (
                                <a 
                                    href={ensureAbsoluteUrl(auditData.links.github)} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="h-12 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-colors"
                                >
                                    <Github className="w-4 h-4 text-slate-900" />
                                    <span>GitHub</span>
                                </a>
                            ) : (
                              <div className="h-12 flex items-center justify-center border border-slate-200 rounded-xl bg-slate-50 text-slate-400 text-xs font-bold">
                                No GitHub
                              </div>
                            )}
                        </div>

                        {auditData.links?.portfolio && ensureAbsoluteUrl(auditData.links.portfolio) && (
                            <a 
                                href={ensureAbsoluteUrl(auditData.links.portfolio)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="h-12 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl flex items-center justify-between px-5 text-xs font-bold transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                  <Globe className="w-4 h-4 text-[#1b67b2]" />
                                  <span>Portfolio Website</span>
                                </span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        )}
                    </div>
                </motion.div>

                {/* Audit Seal */}
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-[#1b67b2] shrink-0" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-900">Verve Nova Verification</p>
                      <p className="text-[9px] text-slate-500 font-medium">Official Candidate Audit Trail // 2026-VNT</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
