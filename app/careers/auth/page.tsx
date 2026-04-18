"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, getSession } from "next-auth/react";
import { registerUser } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ShieldCheck, User2, Mail, Lock, Sparkles, ArrowRight, Loader2, Phone, Search, Edit2, ChevronDown, XCircle } from "lucide-react";
import { toast } from "sonner";
import { countries } from "@/lib/countries";


export default function CareersAuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("register");
  const [authStep, setAuthStep] = useState<"input" | "review">("input");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isCountryListOpen, setIsCountryListOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    countryCode: { code: "+91", flag: "🇮🇳" }
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (activeTab === "register" && authStep === "input") {
      setAuthStep("review");
      return;
    }
    setIsLoading(true);

    try {
      if (activeTab === "register") {
        const result = await registerUser({
          fullName: formData.fullName,
          email: formData.email,
          password: { val: formData.password },
          phone: `${formData.countryCode.code} ${formData.phone}`
        });

        if (!result.success) throw new Error(result.error);

        toast.success("Registration Successful! Your VN-ID has been generated.");
        
        const loginRes = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (loginRes?.ok) {
          const session = await getSession();
          if (session?.user?.role === 'ADMIN') {
            router.push("/admin");
          } else {
            router.push("/profile");
          }
        }
      } else {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          let errorMessage = "Studio access denied. Unauthorized identity.";
          if (result.error === "CredentialsSignin") {
            errorMessage = "Invalid coordinates or security key. Please verify your identity.";
          } else if (result.error === "Configuration") {
            errorMessage = "Server configuration error. Please contact the architect.";
          } else if (result.error) {
            errorMessage = result.error;
          }
          throw new Error(errorMessage);
        }

        if (result?.ok) {
          toast.success("Welcome back to the Arena.");
          const session = await getSession();
          if (session?.user?.role === 'ADMIN') {
            router.push("/admin");
          } else {
            router.push("/profile");
          }
        }
      }
    } catch (error: any) {
      console.error("AUTH_ERROR_LOG:", error.message);
      setAuthError(error.message);
      toast.error(error.message || "An authentication error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090B] text-white selection:bg-indigo-500/30 overflow-hidden relative flex flex-col">
      <Navbar />

      {/* 🌌 Cinematic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/10 blur-[150px] rounded-full" />
        
        {/* Editorial Text Sculpture */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/[0.01] tracking-tighter select-none">
           VNT.AUTH
        </div>

        {/* Studio Grid Lines */}
        <div className="absolute inset-0 flex justify-center opacity-[0.03]">
          <div className="w-px h-full bg-white mx-auto" />
          <div className="w-px h-full bg-white absolute left-1/4" />
          <div className="w-px h-full bg-white absolute right-1/4" />
        </div>
      </div>

      <section className="relative flex-1 flex flex-col items-center justify-center px-6 z-10 pt-32 pb-32">
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-center">
            
            {/* Left: Editorial Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 space-y-8 text-center lg:text-left"
            >
              <div className="flex flex-col items-center lg:items-start gap-6">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/5 border border-white/10 text-[8px] font-black text-indigo-400 uppercase tracking-[0.5em]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Studio Protocol
                </div>
                
                <h1 className="text-6xl md:text-8xl xl:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85] flex flex-col">
                  <span>STUDIO</span>
                  <span className="text-outline-white">ENTRY.</span>
                </h1>

                <div className="max-w-md w-full h-px bg-gradient-to-r from-indigo-500/30 via-white/10 to-transparent" />

                <p className="text-[11px] md:text-[12px] text-white/30 font-bold tracking-[0.3em] uppercase leading-relaxed max-w-lg">
                  Authenticate your identity to initiate <br className="hidden md:block"/>
                  or track your application deployment <br className="hidden md:block"/>
                  within the <span className="text-white">Verve Nova Ecosystem.</span>
                </p>

                <div className="flex flex-wrap justify-center lg:justify-end gap-4 mt-8" />
              </div>
            </motion.div>

            {/* Right: Auth Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5"
            >
              <div className="glass-card p-1 border border-white/10 rounded-[2.5rem] bg-white/[0.02] shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                {/* Tab Toggle */}
                <div className="p-1.5 bg-white/[0.02] rounded-[2.2rem] flex items-center mb-1">
                  <button 
                    onClick={() => { setActiveTab("register"); setAuthStep("input"); }}
                    className={`flex-1 py-3 text-[9px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-500 ${activeTab === 'register' ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]' : 'text-white/20 hover:text-white'}`}
                  >
                    Register
                  </button>
                  <button 
                    onClick={() => { setActiveTab("login"); setAuthStep("input"); }}
                    className={`flex-1 py-3 text-[9px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-500 ${activeTab === 'login' ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]' : 'text-white/20 hover:text-white'}`}
                  >
                    Login
                  </button>
                </div>

                <div className="p-8 pb-6 space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab + authStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <form onSubmit={handleAuth} className="space-y-4">
                        {activeTab === "register" && authStep === "review" ? (
                          <div className="space-y-4">
                            <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 space-y-4">
                               <div className="flex justify-between items-start">
                                  <div className="space-y-1">
                                     <p className="text-[7px] uppercase tracking-[0.3em] text-white/20 font-black">Identity</p>
                                     <p className="text-sm font-black text-white tracking-tight uppercase">{formData.fullName}</p>
                                  </div>
                                  <button type="button" onClick={() => setAuthStep("input")} className="p-2 bg-white/5 hover:bg-indigo-600 rounded-xl transition-all group">
                                     <Edit2 className="w-3.5 h-3.5 text-indigo-400 group-hover:text-white" />
                                  </button>
                               </div>
                               <div className="space-y-1">
                                  <p className="text-[7px] uppercase tracking-[0.3em] text-white/20 font-black">Email</p>
                                  <p className="text-xs font-bold text-indigo-400">{formData.email}</p>
                               </div>
                               <div className="space-y-1">
                                  <p className="text-[7px] uppercase tracking-[0.3em] text-white/20 font-black">Phone</p>
                                  <p className="text-xs font-bold text-white tracking-widest">{formData.countryCode.flag} {formData.countryCode.code} {formData.phone}</p>
                               </div>
                            </div>
                            
                            <div className="flex items-center gap-3 px-4 py-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                              <Sparkles className="w-4 h-4 text-indigo-400" />
                              <p className="text-[8px] font-black text-indigo-300 uppercase tracking-[0.2em] leading-relaxed">System ready for VN-ID generation.</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {activeTab === "register" && (
                              <div className="space-y-1">
                                 <Label className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 ml-2">Identity</Label>
                                 <div className="relative group">
                                    <User2 className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-indigo-400 transition-colors" />
                                    <Input 
                                      required
                                      placeholder="FULL NAME"
                                      className="h-12 pl-12 bg-white/[0.03] border-white/10 rounded-xl text-white placeholder:text-white/10 text-[10px] font-black tracking-widest uppercase focus:bg-white/[0.05] focus:border-indigo-500/50 transition-all"
                                      value={formData.fullName}
                                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                    />
                                 </div>
                              </div>
                            )}

                            {activeTab === "register" && (
                              <div className="space-y-1">
                                 <Label className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 ml-2">Digital Comms</Label>
                                 <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-indigo-400 transition-colors z-10" />
                                    <button 
                                      type="button"
                                      onClick={() => setIsCountryListOpen(!isCountryListOpen)}
                                      className="absolute left-10 top-1/2 -translate-y-1/2 z-20 flex items-center gap-2 px-2 py-1.5 bg-white/10 border border-white/20 rounded-lg h-8 transition-colors hover:bg-white/20 shadow-sm"
                                    >
                                      <span className="text-sm brightness-125">{formData.countryCode.flag}</span>
                                      <span className="text-[11px] font-black text-indigo-400 transition-colors">{formData.countryCode.code}</span>
                                      <ChevronDown className={`w-3 h-3 text-white/40 transition-transform ${isCountryListOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <Input 
                                      required
                                      type="tel"
                                      placeholder="PHONE LINE"
                                      className="h-12 pl-24 bg-white/[0.03] border-white/10 rounded-xl text-white placeholder:text-white/10 text-[10px] font-black tracking-[0.2em] uppercase focus:bg-white/[0.05] focus:border-indigo-500/50 transition-all"
                                      value={formData.phone}
                                      onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, ''); // Remove non-digits
                                        if (val.length <= 10) setFormData({...formData, phone: val});
                                      }}
                                    />

                                    <AnimatePresence>
                                      {isCountryListOpen && (
                                        <motion.div
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: 10 }}
                                          className="absolute top-full left-0 mt-4 w-72 max-h-60 bg-[#121215] border border-white/10 rounded-3xl shadow-3xl overflow-hidden z-[100] backdrop-blur-3xl"
                                        >
                                           <div className="p-4 border-b border-white/5">
                                              <input 
                                                autoFocus
                                                placeholder="SEARCH..."
                                                className="w-full bg-white/5 border-none rounded-xl text-[9px] font-black tracking-widest text-white p-3 focus:ring-0"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                              />
                                           </div>
                                           <div className="overflow-y-auto max-h-40 custom-scrollbar py-2">
                                              {countries.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((c) => (
                                                <button
                                                  key={c.name}
                                                  type="button"
                                                  onClick={() => { setFormData({...formData, countryCode: c}); setIsCountryListOpen(false); }}
                                                  className="w-full px-5 py-3 flex items-center justify-between hover:bg-indigo-600 group transition-all"
                                                >
                                                  <div className="flex items-center gap-3">
                                                    <span className="text-lg">{c.flag}</span>
                                                    <span className="text-[9px] font-black tracking-widest uppercase text-white/50 group-hover:text-white">{c.name}</span>
                                                  </div>
                                                  <span className="text-[9px] font-black text-indigo-500 group-hover:text-white/50">{c.code}</span>
                                                </button>
                                              ))}
                                           </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                 </div>
                              </div>
                            )}

                            <div className="space-y-1">
                              <Label className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 ml-2">Coordinates</Label>
                              <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-indigo-400 transition-colors" />
                                <Input 
                                  required
                                  type="email"
                                  placeholder="SYSTEM EMAIL"
                                  className="h-12 pl-12 bg-white/[0.03] border-white/10 rounded-xl text-white placeholder:text-white/10 text-[10px] font-black tracking-widest uppercase focus:bg-white/[0.05] focus:border-indigo-500/50 transition-all"
                                  value={formData.email}
                                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <Label className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 ml-2">Security Key</Label>
                              <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-indigo-400 transition-colors" />
                                <Input 
                                  required
                                  type="password"
                                  placeholder="PASSWORD"
                                  className="h-12 pl-12 bg-white/[0.03] border-white/10 rounded-xl text-white placeholder:text-white/10 text-[10px] font-black tracking-widest uppercase focus:bg-white/[0.05] focus:border-indigo-500/50 transition-all"
                                  value={formData.password}
                                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        
                        <AnimatePresence>
                          {authError && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 overflow-hidden mt-4"
                            >
                              <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-red-200 leading-none">{authError}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <Button 
                          disabled={isLoading}
                          className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl transition-all shadow-lg uppercase text-[9px] tracking-[0.3em] group relative overflow-hidden active:scale-[0.98] border-0 mt-4"
                        >
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <div className="flex items-center">
                              <span className="relative z-10">
                                {activeTab === 'login' ? 'Authenticate Access' : 
                                 (authStep === 'input' ? 'Review Details' : 'Initialize VN-ID')}
                              </span>
                              <ArrowRight className="ml-3 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          )}
                        </Button>

                        <p className="text-[7px] text-center text-white/10 uppercase tracking-[0.2em] leading-relaxed pt-2">
                          Encrypted tunnel active. <br /> Security protocols engaged.
                        </p>
                      </form>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
