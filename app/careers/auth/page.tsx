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
import { ShieldCheck, User2, Mail, Lock, Sparkles, ArrowRight, Phone, Search, Edit2, ChevronDown, XCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { VNTLoader } from "@/components/vnt-loader";
import { countries } from "@/lib/countries";


export default function CareersAuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("register");
  const [authStep, setAuthStep] = useState<"input" | "review">("input");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isCountryListOpen, setIsCountryListOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
          if (session?.user?.role?.toUpperCase() === 'ADMIN') {
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
          if (session?.user?.role?.toUpperCase() === 'ADMIN') {
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
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-24 h-24 mb-4"
                >
                  <img src="/vnt-logo.png" alt="VNT Logo" className="w-full h-full object-contain" />
                </motion.div>
                
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/5 border border-white/10 text-[8px] font-black text-indigo-400 uppercase tracking-[0.5em]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Studio Protocol
                </div>
                
                <h1 className="text-6xl md:text-8xl xl:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85] flex flex-col">
                  <span>STUDIO</span>
                  <span className="text-outline-white">ENTRY.</span>
                </h1>

                <div className="max-w-md w-full h-px bg-gradient-to-r from-indigo-500/30 via-white/10 to-transparent" />

                <p className="text-sm md:text-base text-slate-200 font-normal tracking-wide leading-relaxed max-w-lg">
                  Authenticate your identity to initiate or track your application deployment within the <span className="text-white font-bold">Verve Nova Ecosystem.</span>
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
              <div className="p-1 border border-white/15 rounded-[2.5rem] bg-slate-950/80 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)]">
                {/* Tab Toggle */}
                <div className="p-1.5 bg-white/[0.05] rounded-[2.2rem] flex items-center mb-1">
                  <button 
                    onClick={() => { setActiveTab("register"); setAuthStep("input"); }}
                    className={`flex-1 py-3 text-xs font-extrabold uppercase tracking-wider rounded-full transition-all duration-300 ${activeTab === 'register' ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.5)]' : 'text-slate-300 hover:text-white'}`}
                  >
                    Register
                  </button>
                  <button 
                    onClick={() => { setActiveTab("login"); setAuthStep("input"); }}
                    className={`flex-1 py-3 text-xs font-extrabold uppercase tracking-wider rounded-full transition-all duration-300 ${activeTab === 'login' ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.5)]' : 'text-slate-300 hover:text-white'}`}
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
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={handleAuth} className="space-y-4">
                        {activeTab === "register" && authStep === "review" ? (
                          <div className="space-y-4">
                            <div className="p-6 rounded-[2rem] bg-white/[0.04] border border-white/15 space-y-4">
                               <div className="flex justify-between items-start">
                                  <div className="space-y-1">
                                     <p className="text-xs uppercase tracking-wider text-slate-300 font-bold">Full Name</p>
                                     <p className="text-base font-extrabold text-white tracking-tight uppercase">{formData.fullName}</p>
                                  </div>
                                  <button type="button" onClick={() => setAuthStep("input")} className="p-2 bg-white/10 hover:bg-indigo-600 rounded-xl transition-all group">
                                     <Edit2 className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                                  </button>
                               </div>
                               <div className="space-y-1">
                                  <p className="text-xs uppercase tracking-wider text-slate-300 font-bold">Email Address</p>
                                  <p className="text-sm font-bold text-indigo-400">{formData.email}</p>
                                </div>
                               <div className="space-y-1">
                                  <p className="text-xs uppercase tracking-wider text-slate-300 font-bold">Phone Number</p>
                                  <p className="text-sm font-bold text-white tracking-wider">{formData.countryCode.flag} {formData.countryCode.code} {formData.phone}</p>
                               </div>
                            </div>
                            
                            <div className="flex items-center gap-3 px-4 py-3 bg-indigo-500/15 rounded-xl border border-indigo-500/30">
                              <Sparkles className="w-4 h-4 text-indigo-400" />
                              <p className="text-xs font-bold text-indigo-200 uppercase tracking-wider leading-relaxed">System ready for VN-ID generation.</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {activeTab === "register" && (
                              <div className="space-y-1.5">
                                 <Label className="text-xs font-bold uppercase tracking-wider text-slate-200 ml-2">Full Name *</Label>
                                 <div className="relative group">
                                    <User2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 transition-colors" />
                                    <Input 
                                      required
                                      placeholder="e.g. John Doe"
                                      className="h-12 pl-12 bg-white/[0.04] border-white/15 rounded-xl text-white placeholder:text-slate-400 text-xs font-medium focus:bg-white/[0.08] focus:border-indigo-400 transition-all"
                                      value={formData.fullName}
                                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                    />
                                 </div>
                              </div>
                            )}

                            {activeTab === "register" && (
                              <div className="space-y-1.5">
                                 <Label className="text-xs font-bold uppercase tracking-wider text-slate-200 ml-2">Phone Number *</Label>
                                 <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 transition-colors z-10" />
                                    <button 
                                      type="button"
                                      onClick={() => setIsCountryListOpen(!isCountryListOpen)}
                                      className="absolute left-10 top-1/2 -translate-y-1/2 z-20 flex items-center gap-2 px-2.5 py-1.5 bg-white/10 border border-white/20 rounded-lg h-8 transition-colors hover:bg-white/20 shadow-sm"
                                    >
                                      <span className="text-sm">{formData.countryCode.flag}</span>
                                      <span className="text-xs font-extrabold text-indigo-400">{formData.countryCode.code}</span>
                                      <ChevronDown className={`w-3 h-3 text-slate-300 transition-transform ${isCountryListOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <Input 
                                      required
                                      type="tel"
                                      placeholder="10-digit mobile number"
                                      className="h-12 pl-28 bg-white/[0.04] border-white/15 rounded-xl text-white placeholder:text-slate-400 text-xs font-medium tracking-wider focus:bg-white/[0.08] focus:border-indigo-400 transition-all"
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
                                          className="absolute top-full left-0 mt-4 w-72 max-h-60 bg-slate-900 border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-[100] backdrop-blur-3xl"
                                        >
                                           <div className="p-3 border-b border-white/10">
                                              <input 
                                                autoFocus
                                                placeholder="Search country..."
                                                className="w-full bg-white/10 border-none rounded-xl text-xs font-medium text-white p-2.5 focus:ring-0 placeholder:text-slate-400"
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
                                                  className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-indigo-600 group transition-all"
                                                >
                                                  <div className="flex items-center gap-3">
                                                    <span className="text-base">{c.flag}</span>
                                                    <span className="text-xs font-bold uppercase text-slate-200 group-hover:text-white">{c.name}</span>
                                                  </div>
                                                  <span className="text-xs font-bold text-indigo-400 group-hover:text-white">{c.code}</span>
                                                </button>
                                              ))}
                                           </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                 </div>
                              </div>
                            )}

                            <div className="space-y-1.5">
                              <Label className="text-xs font-bold uppercase tracking-wider text-slate-200 ml-2">Email Address *</Label>
                              <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 transition-colors" />
                                <Input 
                                  required
                                  type="email"
                                  placeholder="name@domain.com"
                                  className="h-12 pl-12 bg-white/[0.04] border-white/15 rounded-xl text-white placeholder:text-slate-400 text-xs font-medium focus:bg-white/[0.08] focus:border-indigo-400 transition-all"
                                  value={formData.email}
                                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <Label className="text-xs font-bold uppercase tracking-wider text-slate-200 ml-2">Password *</Label>
                              <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 transition-colors" />
                                <Input 
                                  required
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Enter password"
                                  className="h-12 pl-12 pr-12 bg-white/[0.04] border-white/15 rounded-xl text-white placeholder:text-slate-400 text-xs font-medium focus:bg-white/[0.08] focus:border-indigo-400 transition-all"
                                  value={formData.password}
                                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
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
                              className="px-4 py-3 bg-red-500/15 border border-red-500/30 rounded-xl flex items-center gap-3 overflow-hidden mt-4"
                            >
                              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                              <span className="text-xs font-bold uppercase tracking-wider text-red-200 leading-none">{authError}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <Button 
                          disabled={isLoading}
                          className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl transition-all shadow-lg uppercase text-xs tracking-wider group relative overflow-hidden active:scale-[0.98] border-0 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <VNTLoader size="sm" />
                          ) : (
                            <div className="flex items-center">
                              <span className="relative z-10">
                                {activeTab === 'login' ? 'Authenticate Access' : 
                                 (authStep === 'input' ? 'Review Details' : 'Initialize VN-ID')}
                              </span>
                              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          )}
                        </Button>

                        <p className="text-[11px] text-center text-slate-400 font-medium tracking-wide leading-relaxed pt-2">
                          By continuing, you agree to our{" "}
                          <a href="/terms" target="_blank" className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300">Terms</a>
                          {" "}and{" "}
                          <a href="/privacy" target="_blank" className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300">Privacy Policy</a>.
                          Candidate credentials and recruitment records are encrypted and protected under India&apos;s DPDP Act.
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
