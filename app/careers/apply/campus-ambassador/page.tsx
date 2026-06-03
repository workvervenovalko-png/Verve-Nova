"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChevronRight, 
  ChevronLeft, 
  User, 
  GraduationCap, 
  Link as LinkIcon, 
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  UploadCloud,
  Sparkles,
  Briefcase
} from "lucide-react";
import { submitApplication } from "@/app/actions/application";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { VNTLoader } from "@/components/vnt-loader";

export default function CampusAmbassadorApplyPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    personal: {
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      currentCity: ""
    },
    education: {
      college: "",
      degree: "",
      branch: "",
      graduationYear: "",
    },
    caAnswers: {
      clubs: "",
      whyJoin: ""
    },
    links: {
      resumeUrl: "",
      linkedIn: "",
    },
    referredByCode: ""
  });

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        personal: {
          ...prev.personal,
          fullName: session.user.name || "",
          email: session.user.email || ""
        }
      }));
    }
  }, [session]);

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const numericValue = value.replace(/[^\d+ ]/g, ''); 
      setFormData(prev => ({ ...prev, personal: { ...prev.personal, [name]: numericValue } }));
      return;
    }
    setFormData(prev => ({ ...prev, personal: { ...prev.personal, [name]: value } }));
  };

  const handleDobPartChange = (part: 'year' | 'month' | 'day', value: string) => {
    const currentDob = formData.personal.dob || "--";
    const parts = currentDob.split('-');
    if (parts.length !== 3) {
      parts[0] = ""; parts[1] = ""; parts[2] = "";
    }
    if (part === 'year') parts[0] = value;
    if (part === 'month') parts[1] = value;
    if (part === 'day') parts[2] = value;
    setFormData(prev => ({ ...prev, personal: { ...prev.personal, dob: `${parts[0]}-${parts[1]}-${parts[2]}` } }));
  };

  const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());
  const months = [
    { name: "January", value: "01" }, { name: "February", value: "02" }, { name: "March", value: "03" },
    { name: "April", value: "04" }, { name: "May", value: "05" }, { name: "June", value: "06" },
    { name: "July", value: "07" }, { name: "August", value: "08" }, { name: "September", value: "09" },
    { name: "October", value: "10" }, { name: "November", value: "11" }, { name: "December", value: "12" }
  ];
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'graduationYear') {
      const regex = /^\d*$/;
      if (value !== "" && !regex.test(value)) return;
      if (value.length > 4) return;
    }
    setFormData(prev => ({ ...prev, education: { ...prev.education, [name]: value } }));
  };

  const handleFinalSubmit = async () => {
    if (!resumeFile) {
        toast.error("Resume Required.");
        return;
    }
    if (resumeFile.size > 3 * 1024 * 1024) {
        toast.error("File is too large (Max 3MB allowed).");
        return;
    }
    setIsSubmitting(true);
    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(resumeFile);
      });
      const base64Resume = await base64Promise;

      const result = await submitApplication({
        roleSlug: "campus-ambassador",
        ...formData,
        links: {
            ...formData.links,
            resumeUrl: resumeFile.name,
            resumeContent: base64Resume,
            resumeType: resumeFile.type
        }
      });

      if (result.success) {
        toast.success("Application Submitted Successfully.");
        router.push("/profile");
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast.error(error.message || "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    if (step === 1) {
      const { fullName, phone, dob, currentCity } = formData.personal;
      return !!(fullName && phone && dob && currentCity);
    }
    if (step === 2) {
      const { college, degree, graduationYear } = formData.education;
      return !!(college && degree && graduationYear);
    }
    if (step === 3) {
      return !!(resumeFile && formData.links.linkedIn && formData.caAnswers.whyJoin);
    }
    return true;
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <VNTLoader size="lg" />
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen bg-background selection:bg-indigo-500/30 text-white">
        <Navbar />
        <section className="relative pt-64 pb-32 px-6 flex flex-col items-center justify-center">
            <div className="max-w-2xl w-full text-center space-y-12 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[9px] font-bold text-white/40 uppercase tracking-[0.4em] mb-4">
                    <ShieldCheck className="w-3 h-3 text-red-400" />
                    Authentication Required
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                    Access <span className="text-gradient">Denied.</span>
                </h1>
                <p className="text-[10px] text-white/20 font-bold tracking-[0.4em] uppercase leading-relaxed">
                    Identity verification is mandatory to initiate your application. <br />
                    Please authenticate your account to proceed.
                </p>
                <div className="flex justify-center pt-8">
                    <Button 
                        onClick={() => router.push(`/careers/auth`)}
                        className="h-16 px-12 bg-white hover:bg-slate-200 text-background font-black rounded-xl transition-all shadow-xl uppercase text-[10px] tracking-widest group border-0"
                    >
                        Sign In Now
                        <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background selection:bg-indigo-500/30 text-white">
      <Navbar />

      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="absolute top-[10%] left-1/4 w-[600px] h-[600px] bg-indigo-500/[0.03] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[9px] font-bold text-indigo-400 uppercase tracking-[0.4em] mb-8">
              Campus Ambassador Program
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
              CA <span className="text-gradient">Application.</span>
            </h1>
            <p className="text-[10px] text-white/20 font-bold tracking-[0.4em] uppercase">Represent Verve Nova in your campus</p>
          </div>

          {/* PERKS SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wider">Certificate & LoR</h3>
                <p className="text-xs text-white/50 leading-relaxed">Earn a recognized Certificate of Completion and a performance-based Letter of Recommendation.</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wider">Career Priority</h3>
                <p className="text-xs text-white/50 leading-relaxed">Gain real-world experience and get priority consideration for future paid roles.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-20 max-w-xl mx-auto px-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 border-2 ${
                  step >= s ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'bg-white/[0.03] border-white/[0.08] text-white/20'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-16 md:w-24 h-px mx-2 transition-all duration-1000 ${step > s ? 'bg-indigo-600' : 'bg-white/[0.06]'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="glass-card rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <User className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">Personal Details</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">Full Name *</Label>
                      <Input 
                        name="fullName"
                        value={formData.personal.fullName}
                        onChange={handlePersonalChange}
                        placeholder="John Doe" 
                        className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl text-white"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">Contact Phone *</Label>
                      <Input 
                        name="phone"
                        value={formData.personal.phone}
                        onChange={handlePersonalChange}
                        placeholder="+91 XXXX XXX XXX" 
                        className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl text-white"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">Date of Birth *</Label>
                      <div className="grid grid-cols-3 gap-3">
                        <Select value={formData.personal.dob?.split('-')[0] || ""} onValueChange={(v) => handleDobPartChange('year', v)}>
                          <SelectTrigger className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl text-white text-xs"><SelectValue placeholder="Year" /></SelectTrigger>
                          <SelectContent className="bg-[#09090B] border-white/[0.06] max-h-60 overflow-y-auto">
                            {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <Select value={formData.personal.dob?.split('-')[1] || ""} onValueChange={(v) => handleDobPartChange('month', v)}>
                          <SelectTrigger className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl text-white text-xs"><SelectValue placeholder="Month" /></SelectTrigger>
                          <SelectContent className="bg-[#09090B] border-white/[0.06]">
                            {months.map(m => <SelectItem key={m.value} value={m.value}>{m.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <Select value={formData.personal.dob?.split('-')[2] || ""} onValueChange={(v) => handleDobPartChange('day', v)}>
                          <SelectTrigger className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl text-white text-xs"><SelectValue placeholder="Day" /></SelectTrigger>
                          <SelectContent className="bg-[#09090B] border-white/[0.06] max-h-60 overflow-y-auto">
                            {days.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">City of Residence *</Label>
                      <Input 
                        name="currentCity"
                        value={formData.personal.currentCity}
                        onChange={handlePersonalChange}
                        placeholder="Mumbai, IN" 
                        className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl text-white"
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">Referral Code (Optional)</Label>
                      <Input 
                        name="referredByCode"
                        value={formData.referredByCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, referredByCode: e.target.value.trim().toUpperCase() }))}
                        placeholder="e.g. VNT-CA-XYZ" 
                        className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl text-white"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <GraduationCap className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">Campus Details</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">University / College *</Label>
                      <Input 
                        name="college"
                        value={formData.education.college}
                        onChange={handleEducationChange}
                        placeholder="Institute of Emerging Technology" 
                        className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">Degree Program *</Label>
                          <Input 
                              name="degree"
                              value={formData.education.degree}
                              onChange={handleEducationChange}
                              placeholder="B.Tech / BBA" 
                              className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl text-white"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">Grad Year *</Label>
                          <Input 
                              name="graduationYear"
                              value={formData.education.graduationYear}
                              onChange={handleEducationChange}
                              placeholder="2026" 
                              className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl text-white"
                          />
                        </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">Campus Clubs / Communities (Optional)</Label>
                      <Textarea 
                        value={formData.caAnswers.clubs}
                        onChange={(e) => setFormData(prev => ({ ...prev, caAnswers: { ...prev.caAnswers, clubs: e.target.value } }))}
                        placeholder="Are you part of any student clubs, tech societies, or placement cells?" 
                        className="min-h-[100px] bg-white/[0.03] border-white/[0.06] rounded-xl text-white"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <LinkIcon className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">Motivation & Links</h2>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">Why do you want to be a CA? *</Label>
                      <Textarea 
                        value={formData.caAnswers.whyJoin}
                        onChange={(e) => setFormData(prev => ({ ...prev, caAnswers: { ...prev.caAnswers, whyJoin: e.target.value } }))}
                        placeholder="Tell us why you would be a great Campus Ambassador for Verve Nova..." 
                        className="min-h-[120px] bg-white/[0.03] border-white/[0.06] rounded-xl text-white text-sm"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">Your Resume *</Label>
                      <div 
                        className={`relative h-32 border-2 border-dashed rounded-2xl transition-all duration-500 flex flex-col items-center justify-center gap-2 group ${
                            resumeFile ? 'border-emerald-500/50 bg-emerald-500/[0.02]' : 'border-white/[0.06] hover:border-indigo-500/30 bg-white/[0.02]'
                        }`}
                      >
                        <Input 
                            type="file" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setResumeFile(file);
                                    setFormData({...formData, links: {...formData.links, resumeUrl: file.name}});
                                }
                            }}
                        />
                        {resumeFile ? (
                            <div className="flex flex-col items-center">
                              <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-2" />
                              <p className="text-sm font-bold text-white">{resumeFile.name}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-white/40 group-hover:text-indigo-400 transition-colors">
                              <UploadCloud className="w-6 h-6 mb-2" />
                              <p className="text-xs font-bold">Upload Resume (PDF/DOC)</p>
                            </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                        <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">LinkedIn URL *</Label>
                        <Input 
                            value={formData.links.linkedIn}
                            onChange={(e) => setFormData({...formData, links: {...formData.links, linkedIn: e.target.value}})}
                            placeholder="https://linkedin.com/in/yourprofile" 
                            className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl text-white text-sm"
                        />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/[0.06]">
              <Button 
                disabled={step === 1 || isSubmitting}
                onClick={() => setStep(s => s - 1)}
                variant="ghost" 
                className="h-14 px-8 text-white/20 hover:text-white hover:bg-white/[0.04] uppercase text-[10px] font-bold tracking-widest"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {step < 3 ? (
                <Button 
                  disabled={!isStepValid()}
                  onClick={() => setStep(s => s + 1)}
                  className="h-14 px-10 bg-white hover:bg-slate-200 disabled:opacity-5 text-background font-black rounded-xl transition-all uppercase text-[10px] tracking-widest group border-0"
                >
                  Continue
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <Button 
                  disabled={isSubmitting || !isStepValid()}
                  onClick={handleFinalSubmit}
                  className="h-14 px-12 bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-[0_0_32px_rgba(99,102,241,0.3)] disabled:opacity-5 text-white font-black rounded-xl transition-all uppercase text-[10px] tracking-widest border-0"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
