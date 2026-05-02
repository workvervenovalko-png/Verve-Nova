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
    <main className="min-h-screen bg-[#09090B] text-white selection:bg-indigo-500/30">
      <Navbar />
      
      <section className="relative pt-48 pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/[0.05] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Authenticity Verification Portal</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            Verify <span className="text-gradient">Credentials.</span>
          </h1>
          <p className="text-sm text-white/40 font-light mb-12 max-w-lg mx-auto leading-relaxed">
            Enter the unique Document Verification ID to authenticate certificates, offer letters, and professional records issued by Verve Nova Technologies.
          </p>

          <div className="flex flex-col md:flex-row gap-4 p-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl backdrop-blur-xl mb-16">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-indigo-400 transition-colors" />
              <Input 
                placeholder="ENTER VERIFICATION ID (e.g. VN-WD-2026-001)"
                className="h-14 pl-12 bg-transparent border-none text-white placeholder:text-white/10 text-[11px] font-black tracking-widest uppercase focus-visible:ring-0"
                value={verifyId}
                onChange={(e) => setVerifyId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              />
            </div>
            <Button 
              onClick={handleVerify}
              disabled={isVerifying || !verifyId}
              className="h-14 px-10 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl tracking-[0.2em] uppercase text-[10px] transition-all"
            >
              {isVerifying ? <VNTLoader size="sm" /> : "Authenticate"}
            </Button>
          </div>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-10 rounded-[2.5rem] border-indigo-500/20 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-500/20" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <label className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] block mb-2">Verified Recipient</label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-600/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black uppercase text-white leading-none">{result.candidateName}</h4>
                        <p className="text-[10px] font-mono text-white/40 mt-1">{result.vnId}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] block mb-2">Role / Domain</label>
                    <div className="flex items-center gap-3 text-white/60">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">{result.domain}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] block mb-2">Issuance Date</label>
                    <div className="flex items-center gap-3 text-white/60">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">{new Date(result.issuedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] block mb-2">Document Status</label>
                    <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest text-emerald-400">Verified Authentic</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-white/5 flex justify-between items-center">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Digital Audit Log: {result.verificationId}</p>
                <Button 
                  onClick={() => router.push(`/verify/${result.verificationId}`)}
                  className="bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-[9px] uppercase tracking-widest h-12 px-6 flex items-center gap-2"
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
