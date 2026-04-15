"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { getCandidateData } from "@/app/actions/application";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  User2, Mail, Hash, Activity, Calendar, Clock, 
  ArrowRight, LogOut, CheckCircle2, ShieldEllipsis, 
  FileText, Briefcase, Zap, Loader2, BrainCircuit, 
  Search, Github, Linkedin, Globe, Monitor, 
  GraduationCap as GradIcon, Building as BuildingIcon, Code2, X, FileSearch, ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";


export default function CandidateProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();


  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/careers/auth");
      return;
    }

    const fetchData = async () => {
      const result = await getCandidateData();
      if (result.success && result.data) {
        setProfile(result.data.profile);
        setApplications(result.data.applications);
      } else {
        toast.error("Failed to synchronize candidate matrix.");
      }
      setIsLoading(false);
    };

    fetchData();
  }, [status, router]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/careers" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "Rejected": return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      case "Interviewing": return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
      default: return "text-white/40 bg-white/5 border-white/10";
    }
  };

  return (
    <main className="min-h-screen bg-background selection:bg-indigo-500/30 text-white">
      <Navbar />

      <section className="relative pt-48 pb-32 px-6">
        {/* Ambient Glow */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <User2 className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
                  Candidate <span className="text-gradient">Dashboard.</span>
                </h1>
              </div>
              <p className="text-[10px] text-white/20 font-bold tracking-[0.4em] uppercase">Managing your digital journey at Verve Nova.</p>
            </div>

            <Button 
                onClick={handleLogout}
                variant="outline" 
                className="rounded-xl border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-widest hover:bg-white/[0.05] hover:text-white transition-all bg-transparent"
            >
              <LogOut className="w-3 h-3 mr-2" />
              Terminate Session
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Identity Card */}
            <div className="lg:col-span-4 space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.6em] mb-10 leading-none">Candidate Identity</h3>
                
                <div className="space-y-8">
                  <div>
                    <Label className="text-[9px] font-bold text-white/15 uppercase tracking-widest leading-none mb-3 block">Full Name</Label>
                    <p className="text-xl font-black text-white uppercase leading-none">{profile?.name}</p>
                  </div>

                  <div>
                    <Label className="text-[9px] font-bold text-white/15 uppercase tracking-widest leading-none mb-3 block">Digital ID (VN-ID)</Label>
                    <div className="flex items-center gap-3">
                         <Hash className="w-5 h-5 text-indigo-400/50" />
                         <p className="text-2xl font-black text-white uppercase tracking-tighter leading-none">{profile?.vn_id}</p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/[0.06] flex items-center justify-between">
                    <div>
                         <Label className="text-[9px] font-bold text-white/15 uppercase tracking-widest leading-none mb-3 block">Email Status</Label>
                         <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Verified</span>
                         </div>
                    </div>
                    <div className="text-right">
                         <Label className="text-[9px] font-bold text-white/15 uppercase tracking-widest leading-none mb-3 block">Clearance</Label>
                         <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Student</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-violet-600 text-white relative overflow-hidden shadow-2xl shadow-indigo-600/20">
                   <BrainCircuit className="absolute -bottom-8 -right-8 w-40 h-40 text-black/10" />
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-6">Architect Mode</h4>
                   <p className="text-sm font-light leading-relaxed text-white/80 mb-8">
                        "Your talent is the core engine. Verve Nova architects provide the chassis. Together, we deploy the future."
                   </p>
                   <Button className="w-full bg-white text-indigo-600 hover:bg-slate-50 rounded-xl text-[10px] font-bold uppercase tracking-widest h-14 border-0">
                        View Resources
                   </Button>
              </div>
            </div>

            {/* Right: Application Tracker */}
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-10 rounded-[2.5rem] min-h-[500px]"
              >
                <div className="flex items-center justify-between mb-12">
                     <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.6em] leading-none">Active Applications</h3>
                     <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none">{applications.length} Found</span>
                </div>

                {applications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-10">
                         <ShieldEllipsis className="w-8 h-8 text-white/10" />
                    </div>
                    <h4 className="text-2xl font-black text-white uppercase mb-4">No Active Tracks</h4>
                    <p className="text-sm text-white/30 font-light mb-10 max-w-sm leading-relaxed">You haven't initiated any applications yet. Enter the arena and architect your future.</p>
                    <Button 
                         onClick={() => router.push("/careers")}
                         className="h-14 px-10 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl uppercase text-[9px] font-bold tracking-[0.5em] border-0"
                    >
                         View Open Tracks
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {applications.map((app, i) => (
                      <motion.div 
                        key={app._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-[2rem] border border-white/[0.06] hover:border-indigo-600/30 hover:bg-white/[0.02] transition-all group flex flex-col md:flex-row items-center gap-8"
                      >
                         <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                              <Zap className="w-6 h-6 text-white/20 group-hover:text-white" />
                         </div>
                         <div className="flex-1 text-center md:text-left">
                              <h4 className="text-xl font-black text-white uppercase mb-2 leading-none">{app.roleSlug?.replace('-', ' ')}</h4>
                              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                   <div className="flex items-center gap-2 text-[9px] font-bold text-white/20 uppercase tracking-widest leading-none">
                                        <Clock className="w-3 h-3" />
                                        Applied: {new Date(app.createdAt).toLocaleDateString()}
                                   </div>
                                   {app.interviewDate && (
                                        <div className="flex flex-col gap-3">
                                             <div className="flex items-center gap-2 text-[9px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded w-fit mx-auto md:mx-0">
                                                  <Calendar className="w-3 h-3" />
                                                  Interview: {new Date(app.interviewDate).toLocaleDateString()}
                                             </div>
                                             {app.interviewLink && (
                                                 <Button 
                                                     size="sm" 
                                                     onClick={() => window.open(app.interviewLink, '_blank')}
                                                     className="h-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[9px] font-black uppercase tracking-widest transition-all border-0"
                                                 >
                                                     Join Virtual Audit <ExternalLink className="w-3 h-3 ml-2" />
                                                 </Button>
                                             )}
                                        </div>
                                   )}
                              </div>
                         </div>
                         <div className={`px-4 py-2 rounded-full border text-[9px] font-bold uppercase tracking-widest ${getStatusColor(app.status)}`}>
                              {app.status}
                         </div>
                         <Button 
                             variant="ghost" 
                             className="rounded-full w-10 h-10 p-0 text-white/20 hover:bg-indigo-600 hover:text-white transition-colors"
                             onClick={() => router.push(`/careers/audit/${app._id}`)}
                         >
                              <FileSearch className="w-4 h-4" />
                         </Button>


                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </main>
  );
}
