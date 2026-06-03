"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { VNTLoader } from "@/components/vnt-loader";
import { getCADashboardData } from "@/app/actions/admin";
import { Trophy, Users, Share2, Award, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function CADashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [caData, setCaData] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" || (session?.user as any)?.role !== "CA" && (session?.user as any)?.role !== "ADMIN") {
      toast.error("Access Denied. CA clearance required.");
      router.push("/careers/auth");
      return;
    }

    fetchDashboardData();
  }, [status, session, router]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    const result = await getCADashboardData();
    if (result.success && result.data) {
      setCaData(result.data.caData);
      setLeaderboard(result.data.leaderboard);
    } else {
      toast.error(result.error || "Failed to load CA data.");
    }
    setIsLoading(false);
  };

  const copyReferralCode = () => {
    if (caData?.referralCode) {
      navigator.clipboard.writeText(caData.referralCode);
      toast.success("Referral Code copied to clipboard!");
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <VNTLoader size="lg" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background selection:bg-indigo-500/30 text-white">
      <Navbar />

      <section className="relative pt-48 pb-32 px-6">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shadow-lg shadow-indigo-500/10 overflow-hidden shrink-0">
                  <Trophy className="w-8 h-8 text-indigo-400" />
                </div>
                <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                  CA <span className="text-gradient">Dashboard.</span>
                </h1>
              </div>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Campus Ambassador Portal</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-bold text-white uppercase">{session?.user?.name}</p>
              <p className="text-[10px] font-mono text-indigo-400">{session?.user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Stats & Actions */}
            <div className="lg:col-span-1 space-y-8">
              
              <div className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden border border-white/[0.06] bg-white/[0.02]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/[0.05] blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                <div className="mb-8">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-2">Your Referral Code</p>
                  <div 
                    onClick={copyReferralCode}
                    className="group cursor-pointer bg-[#09090B] border border-white/10 rounded-xl p-4 flex items-center justify-between hover:border-indigo-500/50 transition-all"
                  >
                    <span className="text-lg font-black tracking-widest text-indigo-400 font-mono">
                      {caData?.referralCode || "N/A"}
                    </span>
                    <Share2 className="w-5 h-5 text-white/20 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <p className="text-[9px] text-white/20 uppercase mt-3">Click to copy and share with students</p>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-4">Total Referrals</p>
                  <div className="flex items-end gap-3">
                    <span className="text-6xl font-black text-white leading-none tracking-tighter">{caData?.referralCount || 0}</span>
                    <span className="text-sm text-indigo-400 font-bold uppercase mb-1">Students</span>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-[2.5rem] p-8 border border-white/[0.06] bg-gradient-to-br from-indigo-500/5 to-violet-500/5">
                <div className="flex items-center gap-4 mb-4">
                  <Award className="w-6 h-6 text-indigo-400" />
                  <h3 className="text-sm font-bold uppercase tracking-widest">How it works</h3>
                </div>
                <ul className="space-y-4 text-[11px] text-white/60 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-400 mt-0.5">1.</span>
                    Share your unique referral code with students applying for VNT internships.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-400 mt-0.5">2.</span>
                    Students enter this code in the "Personal Details" section of their application.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-400 mt-0.5">3.</span>
                    Your referral count increases automatically. Climb the leaderboard to earn rewards!
                  </li>
                </ul>
              </div>

            </div>

            {/* Right Column: Leaderboard */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/[0.06] h-full">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Leaderboard</h2>
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1">Top Campus Ambassadors</p>
                  </div>
                  <Users className="w-8 h-8 text-white/10" />
                </div>

                <div className="space-y-4">
                  {leaderboard.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-sm text-white/20 font-bold uppercase tracking-widest">No referrals yet. Be the first!</p>
                    </div>
                  ) : (
                    leaderboard.map((ca, index) => (
                      <div 
                        key={ca._id} 
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                          index === 0 ? 'bg-indigo-500/10 border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.1)]' : 
                          index === 1 ? 'bg-white/[0.03] border-white/10' :
                          index === 2 ? 'bg-white/[0.02] border-white/[0.05]' :
                          'bg-transparent border-transparent hover:bg-white/[0.01]'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${
                            index === 0 ? 'bg-indigo-500 text-white' : 
                            'bg-white/5 text-white/40'
                          }`}>
                            #{index + 1}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white uppercase">{ca.name}</p>
                            {index === 0 && <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mt-1">Top Performer</p>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black text-white">{ca.referralCount}</p>
                          <p className="text-[9px] text-white/40 uppercase tracking-widest">Referrals</p>
                        </div>
                      </div>
                    ))
                  )}
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
