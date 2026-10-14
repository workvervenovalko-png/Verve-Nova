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
      whyJoin: "",
    },
    links: {
      resumeUrl: "",
      linkedIn: ""
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

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      personal: { ...formData.personal, [e.target.name]: e.target.value }
    });
  };

  const handleDobPartChange = (type: 'year' | 'month' | 'day', value: string) => {
    const currentDob = formData.personal.dob || "--";
    const parts = currentDob.split('-');
    let y = parts[0] || "";
    let m = parts[1] || "";
    let d = parts[2] || "";

    if (type === 'year') y = value;
    if (type === 'month') m = value.padStart(2, '0');
    if (type === 'day') d = value.padStart(2, '0');

    setFormData({
      ...formData,
      personal: { ...formData.personal, dob: `${y}-${m}-${d}` }
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 45 }, (_, i) => (currentYear - 15 - i).toString());
  const months = [
    { value: "01", name: "Jan" },
    { value: "02", name: "Feb" },
    { value: "03", name: "Mar" },
    { value: "04", name: "Apr" },
    { value: "05", name: "May" },
    { value: "06", name: "Jun" },
    { value: "07", name: "Jul" },
    { value: "08", name: "Aug" },
    { value: "09", name: "Sep" },
    { value: "10", name: "Oct" },
    { value: "11", name: "Nov" },
    { value: "12", name: "Dec" },
  ];
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      education: { ...formData.education, [e.target.name]: e.target.value }
    });
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
      return !!(formData.caAnswers.whyJoin && resumeFile && formData.links.linkedIn);
    }
    return true;
  };

  const handleFinalSubmit = async () => {
    if (!resumeFile) {
        toast.error("Resume file is required.");
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
        personal: formData.personal,
        education: {
          ...formData.education,
          cgpa: "N/A",
          tenthPercentage: "N/A",
          twelfthPercentage: "N/A"
        },
        experience: [],
        projects: formData.caAnswers.clubs ? [{ name: "Clubs/Activities", techStack: "Campus", description: formData.caAnswers.clubs, link: "" }] : [],
        skills: ["Campus Leadership", "Networking", "Event Management"],
        links: {
            ...formData.links,
            portfolio: "",
            github: "",
            resumeUrl: resumeFile.name,
            resumeContent: base64Resume,
            resumeType: resumeFile.type
        },
        referredByCode: formData.referredByCode
      });

      if (result.success) {
        toast.success("Campus Ambassador application submitted successfully!");
        router.push("/profile");
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      console.error("SUBMISSION_ERROR:", error);
      toast.error(error.message || "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <VNTLoader size="lg" />
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen bg-[#fcfdfd] text-slate-900 selection:bg-blue-500/20 font-sans">
        <Navbar />
        <section className="relative pt-44 pb-32 px-6 flex flex-col items-center justify-center">
            <div className="max-w-xl w-full text-center space-y-6 bg-white border border-slate-200 p-8 sm:p-12 rounded-3xl shadow-xl shadow-blue-500/5 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#1b67b2] uppercase tracking-widest mx-auto">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Candidate Authentication</span>
                </div>
                
                <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight uppercase leading-tight">
                    Account Verification <br />
                    <span className="text-[#1b67b2]">Required</span>
                </h1>

                <p className="text-sm text-slate-600 font-normal leading-relaxed max-w-md mx-auto">
                    Identity verification is required to submit your Campus Ambassador application. Please sign in or register to proceed.
                </p>

                <div className="pt-4 flex justify-center">
                    <Button 
                        onClick={() => router.push(`/careers/auth`)}
                        className="h-14 px-8 bg-[#1b67b2] hover:bg-[#15538e] text-white font-extrabold rounded-xl transition-all shadow-md shadow-blue-500/20 uppercase text-xs tracking-widest cursor-pointer flex items-center gap-2"
                    >
                        <span>Sign In to Continue</span>
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfdfd] text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />

      <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#1b67b2] uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Ambassador Program</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight uppercase mb-3">
              CA <span className="text-[#1b67b2]">Application</span>
            </h1>
            <p className="text-sm text-slate-600 font-normal">Represent Verve Nova at your campus and lead technology initiatives.</p>
          </div>

          {/* PERKS SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-3xl mx-auto">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-[#1b67b2]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold mb-1 text-sm uppercase tracking-wider">Certificate & LoR</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">Earn a recognized Certificate of Completion and a performance-based Letter of Recommendation.</p>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-[#1b67b2]">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold mb-1 text-sm uppercase tracking-wider">Career Priority</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">Gain real-world experience and get priority consideration for future paid engineering & management roles.</p>
              </div>
            </div>
          </div>

          {/* STEPPER */}
          <div className="flex items-center justify-between mb-12 max-w-xl mx-auto px-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 border-2 ${
                  step >= s 
                    ? 'bg-[#1b67b2] border-[#1b67b2] text-white shadow-md shadow-blue-500/20' 
                    : 'bg-slate-100 border-slate-200 text-slate-400'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-16 md:w-24 h-0.5 mx-2 transition-all duration-500 ${step > s ? 'bg-[#1b67b2]' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="rounded-3xl p-7 sm:p-12 bg-white border border-slate-200 shadow-xl shadow-blue-500/5 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-2 pb-4 border-b border-slate-100">
                    <User className="w-5 h-5 text-[#1b67b2]" />
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Step 1: Personal Details</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">Full Name *</Label>
                      <Input 
                        name="fullName"
                        value={formData.personal.fullName}
                        onChange={handlePersonalChange}
                        placeholder="John Doe" 
                        className="h-12 bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">Contact Phone *</Label>
                      <Input 
                        name="phone"
                        value={formData.personal.phone}
                        onChange={handlePersonalChange}
                        placeholder="+91 98765 43210" 
                        className="h-12 bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">Date of Birth *</Label>
                      <div className="grid grid-cols-3 gap-2.5">
                        <Select value={formData.personal.dob?.split('-')[0] || ""} onValueChange={(v) => handleDobPartChange('year', v)}>
                          <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white"><SelectValue placeholder="Year" /></SelectTrigger>
                          <SelectContent className="bg-white border-slate-200 max-h-60 overflow-y-auto">
                            {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <Select value={formData.personal.dob?.split('-')[1] || ""} onValueChange={(v) => handleDobPartChange('month', v)}>
                          <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white"><SelectValue placeholder="Month" /></SelectTrigger>
                          <SelectContent className="bg-white border-slate-200">
                            {months.map(m => <SelectItem key={m.value} value={m.value}>{m.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <Select value={formData.personal.dob?.split('-')[2] || ""} onValueChange={(v) => handleDobPartChange('day', v)}>
                          <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white"><SelectValue placeholder="Day" /></SelectTrigger>
                          <SelectContent className="bg-white border-slate-200 max-h-60 overflow-y-auto">
                            {days.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">City of Residence *</Label>
                      <Input 
                        name="currentCity"
                        value={formData.personal.currentCity}
                        onChange={handlePersonalChange}
                        placeholder="Lucknow, UP" 
                        className="h-12 bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">Referral Code (Optional)</Label>
                      <Input 
                        name="referredByCode"
                        value={formData.referredByCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, referredByCode: e.target.value.trim().toUpperCase() }))}
                        placeholder="e.g. VNT-CA-XYZ" 
                        className="h-12 bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-medium uppercase focus:bg-white focus:border-[#1b67b2]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-2 pb-4 border-b border-slate-100">
                    <GraduationCap className="w-5 h-5 text-[#1b67b2]" />
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Step 2: Campus Details</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-5">
                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">University / College *</Label>
                      <Input 
                        name="college"
                        value={formData.education.college}
                        onChange={handleEducationChange}
                        placeholder="Institute of Engineering & Technology" 
                        className="h-12 bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">Degree Program *</Label>
                        <Input 
                          name="degree"
                          value={formData.education.degree}
                          onChange={handleEducationChange}
                          placeholder="B.Tech / BCA / BBA" 
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">Graduation Year *</Label>
                        <Input 
                          name="graduationYear"
                          value={formData.education.graduationYear}
                          onChange={handleEducationChange}
                          placeholder="2026" 
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">Campus Clubs / Communities (Optional)</Label>
                      <Textarea 
                        value={formData.caAnswers.clubs}
                        onChange={(e) => setFormData(prev => ({ ...prev, caAnswers: { ...prev.caAnswers, clubs: e.target.value } }))}
                        placeholder="Are you part of any student clubs, tech societies, or placement cells?" 
                        className="min-h-[90px] bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-2 pb-4 border-b border-slate-100">
                    <LinkIcon className="w-5 h-5 text-[#1b67b2]" />
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Step 3: Motivation & Links</h2>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">Why do you want to be a Campus Ambassador? *</Label>
                      <Textarea 
                        value={formData.caAnswers.whyJoin}
                        onChange={(e) => setFormData(prev => ({ ...prev, caAnswers: { ...prev.caAnswers, whyJoin: e.target.value } }))}
                        placeholder="Tell us why you would be a great Campus Ambassador for Verve Nova..." 
                        className="min-h-[100px] bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">Your Resume *</Label>
                      <div 
                        className={`relative h-32 border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-2 p-4 text-center cursor-pointer ${
                          resumeFile 
                            ? 'border-emerald-500 bg-emerald-50/50' 
                            : 'border-slate-300 hover:border-[#1b67b2] bg-slate-50 hover:bg-blue-50/30'
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
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-1" />
                            <p className="text-xs font-bold text-slate-900">{resumeFile.name}</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center text-[#1b67b2]">
                            <UploadCloud className="w-6 h-6 mb-1" />
                            <p className="text-xs font-bold text-slate-700">Upload Resume (PDF / DOC - Max 3MB)</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">LinkedIn Profile URL *</Label>
                      <Input 
                        value={formData.links.linkedIn}
                        onChange={(e) => setFormData({...formData, links: {...formData.links, linkedIn: e.target.value}})}
                        placeholder="https://linkedin.com/in/yourprofile" 
                        className="h-12 bg-slate-50 border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
              <Button 
                disabled={step === 1 || isSubmitting}
                onClick={() => setStep(s => s - 1)}
                variant="ghost" 
                className="h-12 px-6 text-slate-600 hover:text-slate-900 hover:bg-slate-100 uppercase text-xs font-bold tracking-wider rounded-xl cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 mr-1.5" />
                Previous Step
              </Button>

              {step < 3 ? (
                <Button 
                  disabled={!isStepValid()}
                  onClick={() => setStep(s => s + 1)}
                  className="h-12 px-8 bg-[#1b67b2] hover:bg-[#15538e] disabled:opacity-40 text-white font-extrabold rounded-xl transition-all shadow-md shadow-blue-500/20 uppercase text-xs tracking-wider cursor-pointer flex items-center gap-1.5"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  disabled={isSubmitting || !isStepValid()}
                  onClick={handleFinalSubmit}
                  className="h-12 px-10 bg-[#1b67b2] hover:bg-[#15538e] disabled:opacity-40 text-white font-extrabold rounded-xl transition-all shadow-lg shadow-blue-500/25 uppercase text-xs tracking-wider cursor-pointer flex items-center gap-2"
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
