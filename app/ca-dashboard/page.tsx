"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Users, 
  Share2, 
  Award, 
  CheckCircle2, 
  ExternalLink,
  Copy,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { VNTLoader } from "@/components/vnt-loader";

export default function CADashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [caData, setCaData] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/careers/auth");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchCAData = async () => {
      try {
        const res = await fetch("/api/ca/stats");
        const data = await res.json();
        if (data.success) {
          setCaData(data.caData);
          setLeaderboard(data.leaderboard);
        }
      } catch (err) {
        console.error("FAILED_TO_LOAD_CA_DATA:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchCAData();
    }
  }, [session]);

  const copyReferralCode = () => {
    if (caData?.referralCode) {
      navigator.clipboard.writeText(caData.referralCode);
      toast.success("Referral code copied to clipboard!");
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <VNTLoader size="lg" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfdfd] text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />

      <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-8 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1b67b2] shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase">
                  Campus Ambassador <span className="text-[#1b67b2]">Portal</span>
                </h1>
              </div>
              <p className="text-xs text-slate-600 font-normal">Track your student referrals, campaign impact, and leaderboard ranking.</p>
            </div>
            
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-left md:text-right">
              <p className="text-xs font-black text-slate-900 uppercase">{session?.user?.name}</p>
              <p className="text-xs font-mono text-[#1b67b2] font-semibold">{session?.user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Stats & Actions */}
            <div className="lg:col-span-1 space-y-6">
              
              <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
                <div className="mb-6">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Your Unique Referral Code</p>
                  <div 
                    onClick={copyReferralCode}
                    className="group cursor-pointer bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between hover:bg-blue-100/60 transition-colors"
                  >
                    <span className="text-xl font-black tracking-widest text-[#1b67b2] font-mono">
                      {caData?.referralCode || "N/A"}
                    </span>
                    <Copy className="w-5 h-5 text-[#1b67b2] group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-2">Click to copy and share with students</p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Total Verified Referrals</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-slate-950 leading-none tracking-tight">{caData?.referralCount || 0}</span>
                    <span className="text-xs text-[#1b67b2] font-extrabold uppercase">Students</span>
                  </div>
                </div>
              </div>

              <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                  <Award className="w-5 h-5 text-[#1b67b2]" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Program Guidelines</h3>
                </div>
                <ul className="space-y-3.5 text-xs text-slate-600 leading-relaxed font-normal">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-[#1b67b2] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <span>Share your unique referral code with students applying for VNT internship tracks.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-[#1b67b2] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <span>Students enter your referral code in their application form.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-[#1b67b2] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <span>Your referral count updates automatically. Top ambassadors earn priority PPOs & certificates!</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Right Column: Leaderboard */}
            <div className="lg:col-span-2">
              <div className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs h-full">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-tight text-slate-950">Ambassador Leaderboard</h2>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5 font-medium">Top performing campus representatives</p>
                  </div>
                  <Users className="w-6 h-6 text-[#1b67b2]" />
                </div>

                <div className="space-y-3">
                  {leaderboard.length === 0 ? (
                    <div className="text-center py-16">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">No referrals yet. Be the first to refer!</p>
                    </div>
                  ) : (
                    leaderboard.map((ca, index) => (
                      <div 
                        key={ca._id} 
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                          index === 0 
                            ? 'bg-blue-50/70 border-blue-200 shadow-xs' 
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                            index === 0 
                              ? 'bg-[#1b67b2] text-white' 
                              : 'bg-white border border-slate-200 text-slate-700'
                          }`}>
                            #{index + 1}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 uppercase">{ca.name}</p>
                            {index === 0 && (
                              <p className="text-[10px] font-bold text-[#1b67b2] uppercase tracking-wider mt-0.5 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Top Ambassador
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-black text-slate-900">{ca.referralCount}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Referrals</p>
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
