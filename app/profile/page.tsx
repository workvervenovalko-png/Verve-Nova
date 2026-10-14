"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/app/actions/profile";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  User2, 
  Hash, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  ExternalLink,
  ShieldAlert,
  BookOpen,
  LogOut,
  BrainCircuit,
  Zap,
  ArrowRight,
  ShieldEllipsis,
  FileSearch,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { VNTLoader } from "@/components/vnt-loader";

export default function ProfileDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/careers/auth");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user) {
        const result = await getUserProfile();
        if (result.success) {
          setProfile(result.user);
          setApplications(result.applications);
        } else {
          toast.error("Failed to load trajectory details.");
        }
        setIsLoading(false);
      }
    };

    if (session) {
      fetchUserData();
    }
  }, [session]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if ((status === "loading" || isLoading) && !profile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <VNTLoader size="lg" />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted": return "text-emerald-700 bg-emerald-50 border-emerald-200 font-bold";
      case "Rejected": return "text-rose-700 bg-rose-50 border-rose-200 font-bold";
      case "Interviewing": return "text-blue-700 bg-blue-50 border-blue-200 font-bold";
      default: return "text-slate-600 bg-slate-100 border-slate-200 font-bold";
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfdfd] text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />

      <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-8 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center overflow-hidden shrink-0">
                  <img src="/vnt-logo.png" alt="VNT Logo" className="w-9 h-9 object-contain" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase">
                  Candidate <span className="text-[#1b67b2]">Dashboard</span>
                </h1>
              </div>
              <p className="text-xs text-slate-600 font-normal">Manage your internship profile, active applications & verification documents.</p>
            </div>

            <Button 
                onClick={handleLogout}
                variant="outline" 
                className="rounded-xl border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-100 hover:text-slate-900 transition-all bg-white cursor-pointer h-11 px-5"
            >
              <LogOut className="w-3.5 h-3.5 mr-2 text-slate-500" />
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Identity Card */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs"
              >
                <h3 className="text-xs font-extrabold text-[#1b67b2] uppercase tracking-wider mb-6 pb-3 border-b border-slate-100">
                  Candidate Profile
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Full Name</Label>
                    <p className="text-lg font-black text-slate-900 uppercase leading-snug">{profile?.name}</p>
                  </div>

                  <div>
                    <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Clearance ID (VN-ID)</Label>
                    <div className="flex items-center gap-2">
                         <Hash className="w-4 h-4 text-[#1b67b2]" />
                         <p className="text-xl font-mono font-black text-[#1b67b2] tracking-tight">{profile?.vn_id}</p>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                         <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Email Status</Label>
                         <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-xs font-bold text-emerald-700 uppercase">Verified</span>
                         </div>
                    </div>
                    <div className="text-right">
                         <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Account Tier</Label>
                         <span className="text-xs font-bold text-[#1b67b2] uppercase bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded">Candidate</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="p-7 rounded-3xl bg-blue-50/70 border border-blue-200 text-slate-900 shadow-xs relative overflow-hidden">
                   <h4 className="text-xs font-extrabold text-[#1b67b2] uppercase tracking-wider mb-3">VNT Engineering Pods</h4>
                   <p className="text-xs text-slate-600 font-normal leading-relaxed mb-5">
                     Your applications are evaluated directly by lead architects. Successful candidates contribute directly to live enterprise client products.
                   </p>
                   <Button 
                     onClick={() => router.push("/careers")}
                     className="w-full bg-[#1b67b2] hover:bg-[#15538e] text-white font-bold rounded-xl text-xs uppercase tracking-wider h-11 border-0 cursor-pointer"
                   >
                     Explore All Openings
                   </Button>
              </div>
            </div>

            {/* Right: Application Tracker */}
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 sm:p-8 rounded-3xl min-h-[450px] bg-white border border-slate-200 shadow-xs"
              >
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                     <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Active Applications</h3>
                     <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 uppercase">
                       {applications.length} {applications.length === 1 ? "Track" : "Tracks"} Found
                     </span>
                </div>

                {applications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-6 text-[#1b67b2]">
                         <ShieldEllipsis className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900 uppercase mb-2">No Active Applications</h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal mb-8 max-w-sm leading-relaxed">
                      You haven't initiated any applications yet. Select an engineering or management track to begin.
                    </p>
                    <Button 
                         onClick={() => router.push("/careers")}
                         className="h-12 px-8 bg-[#1b67b2] hover:bg-[#15538e] text-white font-extrabold rounded-xl uppercase text-xs tracking-wider border-0 shadow-md shadow-blue-500/20 cursor-pointer"
                    >
                         View Open Tracks
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app, i) => (
                      <motion.div 
                        key={app._id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-[#1b67b2] hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                      >
                         <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1b67b2] shrink-0">
                                <Zap className="w-6 h-6" />
                           </div>
                           <div>
                                <h4 className="text-base font-black text-slate-900 uppercase mb-1">{app.roleSlug?.replace('-', ' ')}</h4>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                                     <div className="flex items-center gap-1.5">
                                          <Clock className="w-3.5 h-3.5 text-[#1b67b2]" />
                                          <span>Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
                                     </div>
                                     {app.interviewDate && (
                                       <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                                            <Calendar className="w-3 h-3" />
                                            <span>Interview: {new Date(app.interviewDate).toLocaleDateString()}</span>
                                       </div>
                                     )}
                                </div>
                           </div>
                         </div>

                         <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-200">
                           <span className={`px-3 py-1 rounded-full border text-xs ${getStatusColor(app.status)}`}>
                                {app.status}
                           </span>

                           <Button 
                               variant="outline" 
                               size="sm"
                               className="h-10 px-4 rounded-xl border-slate-200 text-[#1b67b2] hover:bg-blue-50 hover:border-[#1b67b2] text-xs font-bold uppercase transition-colors cursor-pointer"
                               onClick={() => router.push(`/careers/audit/${app._id}`)}
                           >
                                <FileSearch className="w-3.5 h-3.5 mr-1.5" />
                                <span>Audit Log</span>
                           </Button>
                         </div>

                         {app.documents && app.documents.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-200 w-full">
                               {app.documents.map((doc: any, j: number) => (
                                 <Button 
                                   key={j}
                                   variant="outline" 
                                   size="sm"
                                   onClick={() => window.open(`/verify/${doc.verificationId}`, '_blank')}
                                   className="h-8 rounded-lg bg-white hover:bg-blue-50 border-slate-200 text-[#1b67b2] text-[10px] font-bold uppercase tracking-wider"
                                 >
                                   <FileText className="w-3 h-3 mr-1.5" />
                                   {doc.type} <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-60" />
                                 </Button>
                               ))}
                            </div>
                         )}
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
