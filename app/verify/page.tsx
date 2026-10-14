"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShieldCheck, User, Briefcase, Calendar, CheckCircle2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { VNTLoader } from "@/components/vnt-loader";

export default function VerificationPage() {
  const [verifyId, setVerifyId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  const handleVerify = async () => {
    if (!verifyId) return;
    setIsVerifying(true);
    setResult(null);

    try {
      const res = await fetch(`/api/verify?id=${verifyId}`);
      const data = await res.json();
      
      if (data.success) {
        setResult(data.data);
        toast.success("Identity Verified.");
      } else {
        toast.error(data.error || "No record found with this ID.");
      }
    } catch (error) {
      toast.error("Verification system offline.");
    }
    setIsVerifying(false);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />
      
      <section className="relative pt-36 pb-32 px-6 bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white border-b border-slate-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/[0.05] blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-8 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#1b67b2]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1b67b2]">Authenticity Verification Portal</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 text-slate-950">
            Verify <span className="text-[#1b67b2]">Credentials.</span>
          </h1>
          <p className="text-base text-slate-600 font-normal mb-12 max-w-lg mx-auto leading-relaxed">
            Enter the unique Document Verification ID to authenticate certificates, offer letters, and professional records issued by Verve Nova Technologies.
          </p>

          <div className="flex flex-col md:flex-row gap-4 p-2.5 bg-white border border-slate-200 rounded-2xl mb-16 shadow-lg">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1b67b2]" />
              <Input 
                placeholder="ENTER VERIFICATION ID (e.g. VN-WD-2026-001)"
                className="h-14 pl-12 bg-transparent border-none text-slate-900 placeholder:text-slate-400 text-xs font-bold tracking-wider uppercase focus-visible:ring-0"
                value={verifyId}
                onChange={(e) => setVerifyId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              />
            </div>
            <Button 
              onClick={handleVerify}
              disabled={isVerifying || !verifyId}
              className="h-14 px-10 bg-[#1b67b2] hover:bg-[#15538e] text-white font-extrabold rounded-xl tracking-[0.2em] uppercase text-[11px] shadow-md shadow-blue-500/20 transition-all active:scale-95"
            >
              {isVerifying ? <VNTLoader size="sm" /> : "Authenticate"}
            </Button>
          </div>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-10 rounded-3xl bg-white border border-slate-200 text-left relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 p-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-extrabold text-[#1b67b2] uppercase tracking-widest block mb-2">Verified Recipient</label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#1b67b2]">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black uppercase text-slate-900 leading-none">{result.candidateName}</h4>
                        <p className="text-xs font-mono text-slate-500 font-bold mt-1">{result.vnId}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-extrabold text-[#1b67b2] uppercase tracking-widest block mb-2">Role / Domain</label>
                    <div className="flex items-center gap-3 text-slate-800">
                      <Briefcase className="w-4 h-4 text-[#1b67b2]" />
                      <span className="text-sm font-bold uppercase tracking-wider">{result.domain}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-extrabold text-[#1b67b2] uppercase tracking-widest block mb-2">Issuance Date</label>
                    <div className="flex items-center gap-3 text-slate-800">
                      <Calendar className="w-4 h-4 text-[#1b67b2]" />
                      <span className="text-sm font-bold uppercase tracking-wider">{new Date(result.issuedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-extrabold text-[#1b67b2] uppercase tracking-widest block mb-2">Document Status</label>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-black uppercase tracking-wider text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Verified Authentic
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Audit Log: {result.verificationId}</p>
                <Button 
                  onClick={() => router.push(`/verify/${result.verificationId}`)}
                  className="bg-slate-100 hover:bg-[#1b67b2] hover:text-white text-slate-800 font-bold rounded-xl text-xs uppercase tracking-wider h-11 px-6 flex items-center gap-2 shadow-xs transition-colors"
                >
                  View Digital Record <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
