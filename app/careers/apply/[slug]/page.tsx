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
  Loader2, 
  CheckCircle2,
  ShieldCheck,
  Building2,
  Calendar as CalendarIcon,
  Layers,
  ArrowRight,
  UploadCloud,
  FileText,
  GlobeIcon
} from "lucide-react";
import { submitApplication } from "@/app/actions/application";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function DetailedApplicationPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
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
    }
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
    
    // Strict numeric validation for phone
    if (name === 'phone') {
      const numericValue = value.replace(/[^\d+ ]/g, ''); // Allow digits, plus, and space
      setFormData(prev => ({
        ...prev,
        personal: { ...prev.personal, [name]: numericValue }
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      personal: { ...prev.personal, [name]: value }
    }));
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Strict validation for numeric fields
    if (name === 'cgpa' || name.endsWith('Percentage') || name === 'graduationYear') {
      // Only allow digits and a single decimal point (except for year which is just digits)
      const regex = name === 'graduationYear' ? /^\d*$/ : /^\d*\.?\d*$/;
      if (value !== "" && !regex.test(value)) return;
      
      // Basic length limits to prevent overflow but allow typing
      if (name === 'graduationYear' && value.length > 4) return;
      if (name === 'cgpa' && value.length > 4) return; // Allows 9.99, 10.0
      if (name.endsWith('Percentage') && value.length > 5) return; // Allows 100.00
    }

    setFormData(prev => ({
      ...prev,
      education: { ...prev.education, [name]: value }
    }));
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
        toast.error("Resume Transmission Required.");
        return;
    }
    setIsSubmitting(true);
    try {
      const result = await submitApplication({
        roleSlug: slug as string,
        ...formData
      });

      if (result.success) {
        toast.success("Audit Successful. Your trajectory has been locked.");
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
      const { college, degree, branch, graduationYear, cgpa, tenthPercentage, twelfthPercentage } = formData.education;
      return !!(college && degree && branch && graduationYear && cgpa && tenthPercentage && twelfthPercentage);
    }
    if (step === 3) return true; // Optional as requested
    if (step === 4) {
      return !!(resumeFile && formData.links.linkedIn && formData.links.github);
    }
    return true;
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-20 max-w-2xl mx-auto px-4">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 border-2 ${
            step >= s ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'bg-white/[0.03] border-white/[0.08] text-white/20'
          }`}>
            {s}
          </div>
          {s < 4 && (
            <div className={`w-12 md:w-20 h-px mx-2 transition-all duration-1000 ${step > s ? 'bg-indigo-600' : 'bg-white/[0.06]'}`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <main className="min-h-screen bg-background selection:bg-indigo-500/30 text-white">
      <Navbar />

      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        {/* Soft Ambient Orbs */}
        <div className="absolute top-[10%] left-1/4 w-[600px] h-[600px] bg-indigo-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[20%] right-1/4 w-[500px] h-[500px] bg-violet-600/[0.02] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[9px] font-bold text-white/40 uppercase tracking-[0.4em] mb-8">
              <ShieldCheck className="w-3 h-3 text-indigo-400" />
              Standard Application Protocol v2.0
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
              Candidate <span className="text-gradient">Audit.</span>
            </h1>
            <p className="text-[10px] text-white/20 font-bold tracking-[0.4em] uppercase">Provide detailed trajectories to initiate onboarding.</p>
          </div>

          {renderStepIndicator()}

          <div className="glass-card rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/[0.03] blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
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
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">Identity Profile</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">Full Name *</Label>
                      <Input 
                        name="fullName"
                        value={formData.personal.fullName}
                        onChange={handlePersonalChange}
                        placeholder="John Architect" 
                        className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] focus:border-indigo-500/30 transition-all text-sm text-white placeholder:text-white/10"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">Contact Phone *</Label>
                      <Input 
                        name="phone"
                        value={formData.personal.phone}
                        onChange={handlePersonalChange}
                        placeholder="+91 XXXX XXX XXX" 
                        className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] focus:border-indigo-500/30 transition-all text-sm text-white placeholder:text-white/10"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">Date of Birth *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "h-14 w-full bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] transition-all text-sm px-4 justify-start text-left font-normal hover:bg-white/[0.05] hover:text-white border-white/[0.06]",
                              !formData.personal.dob && "text-white/10"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-indigo-400/50" />
                            {formData.personal.dob ? format(new Date(formData.personal.dob), "PPP") : <span>Select Date of Birth</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-3xl border-white/[0.06] shadow-2xl bg-[#09090B]" align="start">
                          <CalendarUI
                            mode="single"
                            selected={formData.personal.dob ? new Date(formData.personal.dob) : undefined}
                            onSelect={(date) => {
                              if (date) {
                                setFormData(prev => ({
                                  ...prev,
                                  personal: { ...prev.personal, dob: date.toISOString().split('T')[0] }
                                }));
                              }
                            }}
                            initialFocus
                            className="p-4"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">City of Residence *</Label>
                      <Input 
                        name="currentCity"
                        value={formData.personal.currentCity}
                        onChange={handlePersonalChange}
                        placeholder="Mumbai, IN" 
                        className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] focus:border-indigo-500/30 transition-all text-sm text-white placeholder:text-white/10"
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
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">Academic Matrix</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">University / College</Label>
                      <Input 
                        name="college"
                        value={formData.education.college}
                        onChange={handleEducationChange}
                        placeholder="Institute of Emerging Technology" 
                        className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] focus:border-indigo-500/30 transition-all text-sm text-white placeholder:text-white/10"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                        <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">Degree Program</Label>
                        <Input 
                            name="degree"
                            value={formData.education.degree}
                            onChange={handleEducationChange}
                            placeholder="B.Tech" 
                            className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] focus:border-indigo-500/30 transition-all text-sm text-white placeholder:text-white/10"
                        />
                        </div>
                        <div className="space-y-3">
                        <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">Branch / Specialization</Label>
                        <Input 
                            name="branch"
                            value={formData.education.branch}
                            onChange={handleEducationChange}
                            placeholder="Computer Science" 
                            className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] focus:border-indigo-500/30 transition-all text-sm text-white placeholder:text-white/10"
                        />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-3">
                        <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">GPA / CGPA *</Label>
                        <Input 
                            name="cgpa"
                            value={formData.education.cgpa}
                            onChange={handleEducationChange}
                            placeholder="9.2" 
                            className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] focus:border-indigo-500/30 transition-all text-sm text-white placeholder:text-white/10"
                        />
                        </div>
                        <div className="space-y-3">
                        <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">Grad Year *</Label>
                        <Input 
                            name="graduationYear"
                            value={formData.education.graduationYear}
                            onChange={handleEducationChange}
                            placeholder="2025" 
                            className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] focus:border-indigo-500/30 transition-all text-sm text-white placeholder:text-white/10"
                        />
                        </div>
                        <div className="space-y-3">
                        <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">10th (%) *</Label>
                        <Input 
                            name="tenthPercentage"
                            value={formData.education.tenthPercentage}
                            onChange={handleEducationChange}
                            placeholder="94" 
                            className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] focus:border-indigo-500/30 transition-all text-sm text-white placeholder:text-white/10"
                        />
                        </div>
                        <div className="space-y-3">
                        <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">12th (%) *</Label>
                        <Input 
                            name="twelfthPercentage"
                            value={formData.education.twelfthPercentage}
                            onChange={handleEducationChange}
                            placeholder="91" 
                            className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] focus:border-indigo-500/30 transition-all text-sm text-white placeholder:text-white/10"
                        />
                        </div>
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
                    <Briefcase className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">Professional Log</h2>
                  </div>

                  {/* Experience Section */}
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none">Internships / Experience</h3>
                        <Button variant="ghost" size="sm" onClick={addExperience} className="text-indigo-400 hover:text-indigo-300 hover:bg-white/[0.04]">
                            <Plus className="w-3 h-3 mr-2" /> Add Entry
                        </Button>
                    </div>

                    {formData.experience.map((exp, i) => (
                        <div key={i} className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl relative group">
                            <button onClick={() => removeExperience(i)} className="absolute top-4 right-4 text-white/10 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                <Trash2 className="w-3 h-3" />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input 
                                    placeholder="Company Name" 
                                    className="bg-white/[0.03] border-white/[0.06] text-white" 
                                    value={exp.company}
                                    onChange={(e) => {
                                        const newExp = [...formData.experience];
                                        newExp[i].company = e.target.value;
                                        setFormData({...formData, experience: newExp});
                                    }}
                                />
                                <Input 
                                    placeholder="Role (e.g. Intern)" 
                                    className="bg-white/[0.03] border-white/[0.06] text-white" 
                                    value={exp.role}
                                    onChange={(e) => {
                                        const newExp = [...formData.experience];
                                        newExp[i].role = e.target.value;
                                        setFormData({...formData, experience: newExp});
                                    }}
                                />
                                <Input 
                                    placeholder="Duration" 
                                    className="bg-white/[0.03] border-white/[0.06] text-white md:col-span-2" 
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
                  <div className="space-y-8 pt-8 border-t border-white/[0.04]">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none">Architectural Projects</h3>
                        <Button variant="ghost" size="sm" onClick={addProject} className="text-indigo-400 hover:text-indigo-300 hover:bg-white/[0.04]">
                            <Plus className="w-3 h-3 mr-2" /> Add Project
                        </Button>
                    </div>

                    {formData.projects.map((proj, i) => (
                        <div key={i} className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl relative group">
                            <button onClick={() => removeProject(i)} className="absolute top-4 right-4 text-white/10 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                <Trash2 className="w-3 h-3" />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input 
                                    placeholder="Project Name" 
                                    className="bg-white/[0.03] border-white/[0.06] text-white"
                                    value={proj.name}
                                    onChange={(e) => {
                                        const newProj = [...formData.projects];
                                        newProj[i].name = e.target.value;
                                        setFormData({...formData, projects: newProj});
                                    }}
                                />
                                <Input 
                                    placeholder="Tech Stack" 
                                    className="bg-white/[0.03] border-white/[0.06] text-white"
                                    value={proj.techStack}
                                    onChange={(e) => {
                                        const newProj = [...formData.projects];
                                        newProj[i].techStack = e.target.value;
                                        setFormData({...formData, projects: newProj});
                                    }}
                                />
                                <Input 
                                    placeholder="Detailed Description" 
                                    className="bg-white/[0.03] border-white/[0.06] text-white md:col-span-2"
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <LinkIcon className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">Digital Assets</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-12">
                    <div className="space-y-4">
                      <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1">Academic & Technical Resume (PDF/DOC)</Label>
                      <div 
                        className={`relative h-48 border-2 border-dashed rounded-[2.5rem] transition-all duration-500 flex flex-col items-center justify-center gap-4 group ${
                            resumeFile ? 'border-emerald-500/50 bg-emerald-500/[0.02]' : 'border-white/[0.06] hover:border-indigo-500/30 bg-white/[0.02]'
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
                            className="absolute inset-0 opacity-0 cursor-pointer z-10" 
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
                                <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold text-white">{resumeFile.name}</p>
                                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-1">Ready for Transmission</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/20 group-hover:text-indigo-400 group-hover:border-indigo-500/30 group-hover:shadow-xl transition-all duration-500">
                                    <UploadCloud className="w-8 h-8" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold text-white/60">Drag your resume here or click to browse</p>
                                    <p className="text-[10px] font-bold text-white/15 uppercase tracking-widest mt-1">Support: PDF, DOC (max 10MB)</p>
                                </div>
                            </>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         <div className="space-y-3">
                            <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1 flex items-center gap-2">
                                <LinkIcon className="w-3 h-3 text-indigo-400/50" /> LinkedIn
                            </Label>
                            <Input 
                                value={formData.links.linkedIn}
                                onChange={(e) => setFormData({...formData, links: {...formData.links, linkedIn: e.target.value}})}
                                placeholder="linkedin.com/in/..." 
                                className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] text-sm text-white"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1 flex items-center gap-2">
                                <Code className="w-3 h-3 text-indigo-400/50" /> GitHub
                            </Label>
                            <Input 
                                value={formData.links.github}
                                onChange={(e) => setFormData({...formData, links: {...formData.links, github: e.target.value}})}
                                placeholder="github.com/..." 
                                className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] text-sm text-white"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold ml-1 flex items-center gap-2">
                                <GlobeIcon className="w-3 h-3 text-indigo-400/50" /> Portfolio
                            </Label>
                            <Input 
                                value={formData.links.portfolio}
                                onChange={(e) => setFormData({...formData, links: {...formData.links, portfolio: e.target.value}})}
                                placeholder="name.co" 
                                className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] text-sm text-white"
                            />
                        </div>
                    </div>
                  </div>


                  <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-3xl flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none mb-1">Final Validation</p>
                        <p className="text-sm text-white/40 font-light">By proceeding, you verify all coordinates are accurate for audit.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-16 pt-10 border-t border-white/[0.06]">
              <Button 
                disabled={step === 1 || isSubmitting}
                onClick={() => setStep(s => s - 1)}
                variant="ghost" 
                className="h-14 px-8 text-white/20 hover:text-white hover:bg-white/[0.04] uppercase text-[10px] font-bold tracking-widest"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous Track
              </Button>

              {step < 4 ? (
                <Button 
                  disabled={!isStepValid()}
                  onClick={() => setStep(s => s + 1)}
                  className="h-14 px-10 bg-white hover:bg-slate-200 disabled:opacity-5 text-background font-black rounded-xl transition-all shadow-xl uppercase text-[10px] tracking-widest group border-0"
                >
                  Next Phase
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <Button 
                  disabled={isSubmitting || !isStepValid()}
                  onClick={handleFinalSubmit}
                  className="h-14 px-12 bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-[0_0_32px_rgba(99,102,241,0.3)] disabled:opacity-5 text-white font-black rounded-xl transition-all shadow-xl uppercase text-[10px] tracking-widest group border-0"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Trajectory & Lock"}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
