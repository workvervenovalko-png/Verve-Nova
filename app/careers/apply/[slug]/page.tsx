"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ChevronRight, 
  ChevronLeft, 
  User, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Link as LinkIcon, 
  Plus, 
  Trash2, 
  CheckCircle2,
  ShieldCheck,
  Building2,
  Calendar as CalendarIcon,
  Layers,
  ArrowRight,
  UploadCloud,
  FileText,
  Globe
} from "lucide-react";
import { submitApplication } from "@/app/actions/application";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { VNTLoader } from "@/components/vnt-loader";

export default function DetailedApplicationPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

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
      cgpa: "",
      tenthPercentage: "",
      twelfthPercentage: ""
    },
    experience: [{ company: "", role: "", duration: "", description: "" }],
    projects: [{ name: "", techStack: "", description: "", link: "" }],
    skills: [""],
    links: {
      resumeUrl: "",
      portfolio: "",
      linkedIn: "",
      github: ""
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

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: "", role: "", duration: "", description: "" }]
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: "", techStack: "", description: "" , link: "" }]
    }));
  };

  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const handleFinalSubmit = async () => {
    if (!resumeFile) {
        toast.error("Resume file is required.");
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
        roleSlug: slug as string,
        ...formData,
        links: {
            ...formData.links,
            resumeUrl: resumeFile.name,
            resumeContent: base64Resume,
            resumeType: resumeFile.type
        }
      });

      if (result.success) {
        toast.success("Application submitted successfully! Your profile has been updated.");
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

  const isStepValid = () => {
    if (step === 1) {
      const { fullName, phone, dob, currentCity } = formData.personal;
      return !!(fullName && phone && dob && currentCity);
    }
    if (step === 2) {
      const { college, degree, branch, graduationYear, cgpa, tenthPercentage, twelfthPercentage } = formData.education;
      return !!(college && degree && branch && graduationYear && cgpa && tenthPercentage && twelfthPercentage);
    }
    if (step === 3) return true;
    if (step === 4) {
      return !!(resumeFile && formData.links.linkedIn && formData.links.github);
    }
    return true;
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
                    Please sign in or create your candidate profile to submit an application and track your review status.
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

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto px-4">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 border-2 ${
            step >= s 
              ? 'bg-[#1b67b2] border-[#1b67b2] text-white shadow-md shadow-blue-500/20' 
              : 'bg-slate-100 border-slate-200 text-slate-400'
          }`}>
            {s}
          </div>
          {s < 4 && (
            <div className={`w-12 md:w-20 h-0.5 mx-2 transition-all duration-500 ${step > s ? 'bg-[#1b67b2]' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fcfdfd] text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />

      <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#1b67b2] uppercase tracking-widest mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Internship Application // {slug}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight uppercase mb-3">
              Candidate <span className="text-[#1b67b2]">Application</span>
            </h1>
            <p className="text-sm text-slate-600 font-normal">Please provide accurate information for candidate review and verification.</p>
          </div>

          {renderStepIndicator()}

          <div className="p-7 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-blue-500/5 relative overflow-hidden">
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
                        <Select
                          value={formData.personal.dob?.split('-')[0] || ""}
                          onValueChange={(v) => handleDobPartChange('year', v)}
                        >
                          <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-slate-200 max-h-60 overflow-y-auto">
                            {years.map(y => (
                              <SelectItem key={y} value={y}>{y}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={formData.personal.dob?.split('-')[1] || ""}
                          onValueChange={(v) => handleDobPartChange('month', v)}
                        >
                          <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-slate-200">
                            {months.map(m => (
                              <SelectItem key={m.value} value={m.value}>{m.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={formData.personal.dob?.split('-')[2] || ""}
                          onValueChange={(v) => handleDobPartChange('day', v)}
                        >
                          <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white">
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-slate-200 max-h-60 overflow-y-auto">
                            {days.map(d => (
                              <SelectItem key={d} value={d}>{d}</SelectItem>
                            ))}
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
                        placeholder="Lucknow, IN" 
                        className="h-12 bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">Referral Code (Optional)</Label>
                      <Input 
                        name="referredByCode"
                        value={formData.referredByCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, referredByCode: e.target.value.trim().toUpperCase() }))}
                        placeholder="e.g. VNT-CA-100" 
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
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Step 2: Education Details</h2>
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
                          placeholder="B.Tech / BCA / MCA" 
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">Branch / Specialization *</Label>
                        <Input 
                          name="branch"
                          value={formData.education.branch}
                          onChange={handleEducationChange}
                          placeholder="Computer Science & Engineering" 
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">GPA / CGPA *</Label>
                        <Input 
                          name="cgpa"
                          value={formData.education.cgpa}
                          onChange={handleEducationChange}
                          placeholder="8.5" 
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">Grad Year *</Label>
                        <Input 
                          name="graduationYear"
                          value={formData.education.graduationYear}
                          onChange={handleEducationChange}
                          placeholder="2025" 
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">10th (%) *</Label>
                        <Input 
                          name="tenthPercentage"
                          value={formData.education.tenthPercentage}
                          onChange={handleEducationChange}
                          placeholder="92" 
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">12th (%) *</Label>
                        <Input 
                          name="twelfthPercentage"
                          value={formData.education.twelfthPercentage}
                          onChange={handleEducationChange}
                          placeholder="88" 
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                        />
                      </div>
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
                  className="space-y-8"
                >
                  <div className="flex items-center gap-3 mb-2 pb-4 border-b border-slate-100">
                    <Briefcase className="w-5 h-5 text-[#1b67b2]" />
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Step 3: Work & Projects (Optional)</h2>
                  </div>

                  {/* Experience Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-extrabold text-[#1b67b2] uppercase tracking-wider">Past Experience / Internships</h3>
                      <Button variant="ghost" size="sm" onClick={addExperience} className="text-[#1b67b2] hover:bg-blue-50 font-bold text-xs cursor-pointer">
                        <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Role
                      </Button>
                    </div>

                    {formData.experience.map((exp, i) => (
                      <div key={i} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl relative group space-y-3">
                        <button onClick={() => removeExperience(i)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pr-8">
                          <Input 
                            placeholder="Company Name" 
                            className="h-11 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 font-medium text-xs focus:border-[#1b67b2]" 
                            value={exp.company}
                            onChange={(e) => {
                              const newExp = [...formData.experience];
                              newExp[i].company = e.target.value;
                              setFormData({...formData, experience: newExp});
                            }}
                          />
                          <Input 
                            placeholder="Role (e.g. Frontend Intern)" 
                            className="h-11 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 font-medium text-xs focus:border-[#1b67b2]" 
                            value={exp.role}
                            onChange={(e) => {
                              const newExp = [...formData.experience];
                              newExp[i].role = e.target.value;
                              setFormData({...formData, experience: newExp});
                            }}
                          />
                          <Input 
                            placeholder="Duration (e.g. 3 Months, June 2024 - Aug 2024)" 
                            className="h-11 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 font-medium text-xs md:col-span-2 focus:border-[#1b67b2]" 
                            value={exp.duration}
                            onChange={(e) => {
                              const newExp = [...formData.experience];
                              newExp[i].duration = e.target.value;
                              setFormData({...formData, experience: newExp});
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Projects Section */}
                  <div className="space-y-4 pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-extrabold text-[#1b67b2] uppercase tracking-wider">Relevant Projects</h3>
                      <Button variant="ghost" size="sm" onClick={addProject} className="text-[#1b67b2] hover:bg-blue-50 font-bold text-xs cursor-pointer">
                        <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Project
                      </Button>
                    </div>

                    {formData.projects.map((proj, i) => (
                      <div key={i} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl relative group space-y-3">
                        <button onClick={() => removeProject(i)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pr-8">
                          <Input 
                            placeholder="Project Name" 
                            className="h-11 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 font-medium text-xs focus:border-[#1b67b2]"
                            value={proj.name}
                            onChange={(e) => {
                              const newProj = [...formData.projects];
                              newProj[i].name = e.target.value;
                              setFormData({...formData, projects: newProj});
                            }}
                          />
                          <Input 
                            placeholder="Tech Stack (e.g. Next.js, TypeScript)" 
                            className="h-11 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 font-medium text-xs focus:border-[#1b67b2]"
                            value={proj.techStack}
                            onChange={(e) => {
                              const newProj = [...formData.projects];
                              newProj[i].techStack = e.target.value;
                              setFormData({...formData, projects: newProj});
                            }}
                          />
                          <Input 
                            placeholder="Description & Live Link / GitHub" 
                            className="h-11 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 font-medium text-xs md:col-span-2 focus:border-[#1b67b2]"
                            value={proj.description}
                            onChange={(e) => {
                              const newProj = [...formData.projects];
                              newProj[i].description = e.target.value;
                              setFormData({...formData, projects: newProj});
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-2 pb-4 border-b border-slate-100">
                    <LinkIcon className="w-5 h-5 text-[#1b67b2]" />
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Step 4: Resume & Links</h2>
                  </div>

                  <div className="space-y-6">
                    {/* File Upload Box */}
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1">Upload Resume (PDF / DOC) *</Label>
                      <div 
                        className={`relative h-44 border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4 text-center cursor-pointer ${
                          resumeFile 
                            ? 'border-emerald-500 bg-emerald-50/50' 
                            : 'border-slate-300 hover:border-[#1b67b2] bg-slate-50 hover:bg-blue-50/30'
                        }`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files[0];
                          if (file) {
                            setResumeFile(file);
                            setUploadProgress(100);
                          }
                        }}
                      >
                        <Input 
                          type="file" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setResumeFile(file);
                              setUploadProgress(100);
                              setFormData({...formData, links: {...formData.links, resumeUrl: file.name}});
                            }
                          }}
                        />
                        
                        {resumeFile ? (
                          <>
                            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md">
                              <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{resumeFile.name}</p>
                              <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mt-0.5">Resume Attached Successfully</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1b67b2]">
                              <UploadCloud className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">Click to upload or drag & drop resume</p>
                              <p className="text-xs text-slate-500 mt-0.5">PDF or DOC format (Max 3MB)</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Profiles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1 flex items-center gap-1.5">
                          <LinkIcon className="w-3.5 h-3.5 text-[#1b67b2]" /> LinkedIn Profile *
                        </Label>
                        <Input 
                          value={formData.links.linkedIn}
                          onChange={(e) => setFormData({...formData, links: {...formData.links, linkedIn: e.target.value}})}
                          placeholder="https://linkedin.com/in/username" 
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1 flex items-center gap-1.5">
                          <Code className="w-3.5 h-3.5 text-[#1b67b2]" /> GitHub Profile *
                        </Label>
                        <Input 
                          value={formData.links.github}
                          onChange={(e) => setFormData({...formData, links: {...formData.links, github: e.target.value}})}
                          placeholder="https://github.com/username" 
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase tracking-wider text-slate-700 font-bold ml-1 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-[#1b67b2]" /> Portfolio / Blog
                        </Label>
                        <Input 
                          value={formData.links.portfolio}
                          onChange={(e) => setFormData({...formData, links: {...formData.links, portfolio: e.target.value}})}
                          placeholder="https://yourportfolio.dev" 
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-[#1b67b2]"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#1b67b2] shrink-0" />
                      <p className="text-xs text-slate-700 font-normal">
                        By submitting, you certify that all information provided is accurate and authentic for verification.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stepper Footer Controls */}
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

              {step < 4 ? (
                <Button 
                  disabled={!isStepValid()}
                  onClick={() => setStep(s => s + 1)}
                  className="h-12 px-8 bg-[#1b67b2] hover:bg-[#15538e] disabled:opacity-40 text-white font-extrabold rounded-xl transition-all shadow-md shadow-blue-500/20 uppercase text-xs tracking-wider cursor-pointer flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  disabled={isSubmitting || !isStepValid()}
                  onClick={handleFinalSubmit}
                  className="h-12 px-10 bg-[#1b67b2] hover:bg-[#15538e] disabled:opacity-40 text-white font-extrabold rounded-xl transition-all shadow-lg shadow-blue-500/25 uppercase text-xs tracking-wider cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting ? <VNTLoader size="sm" /> : "Submit Application"}
                  <ArrowRight className="w-4 h-4" />
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
