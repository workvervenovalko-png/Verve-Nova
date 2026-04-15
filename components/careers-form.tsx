"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, Mail, Briefcase, Link as LinkIcon, MessageSquare } from "lucide-react";

import { useSession } from "next-auth/react";
import { submitApplication } from "@/app/actions/application";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CareersForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    role: "",
    portfolio: "",
    message: ""
  });

  React.useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({ 
        ...prev, 
        email: session.user.email || "", 
        name: session.user.name || "" 
      }));
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "authenticated") {
      toast.error("Authentication Required. Please sign in to apply.");
      router.push("/careers/auth");
      return;
    }

    const result = await submitApplication({
      roleSlug: formData.role,
      resumeUrl: formData.portfolio,
    });

    if (!result.success) {
      toast.error(result.error);
    } else {
      toast.success("Application Initiated. VN-ID Link Established.");
      router.push("/profile");
    }
  };

  return (
    <section id="apply" className="py-40 px-6 bg-background border-t border-slate-200 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.6em] mb-6">Join the Future</h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-6">
            Apply <span className="text-slate-200">Now</span>
          </h3>
          <p className="text-sm text-slate-500 font-light max-w-xl mx-auto tracking-wide uppercase">
            Step into the arena. Submit your application below.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="p-1 md:p-12 rounded-[3.5rem] bg-white border border-slate-200 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="p-8 md:p-4 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  <User className="w-3 h-3 text-indigo-500/50" />
                  Full Name
                </label>
                <Input 
                  required
                  placeholder="John Doe"
                  className="h-16 bg-slate-50 border-slate-200 focus:border-indigo-600 focus:bg-white text-slate-900 rounded-2xl px-6 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  <Mail className="w-3 h-3 text-indigo-500/50" />
                  Email Address
                </label>
                <Input 
                  required
                  type="email"
                  placeholder="john@example.com"
                  className="h-16 bg-slate-50 border-slate-200 focus:border-indigo-600 focus:bg-white text-slate-900 rounded-2xl px-6 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  <Briefcase className="w-3 h-3 text-indigo-500/50" />
                  Target Role
                </label>
                <select 
                  required
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white text-slate-900 rounded-2xl px-6 outline-none transition-all appearance-none cursor-pointer"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="" disabled className="bg-white">Select Role</option>
                  <option value="web" className="bg-white">Web Development Intern</option>
                  <option value="design" className="bg-white">UI/UX & Graphic Design Intern</option>
                  <option value="app" className="bg-white">App Development Intern</option>
                  <option value="ai" className="bg-white">AI & Automation Intern</option>
                  <option value="marketing" className="bg-white">Digital Marketing Intern</option>
                  <option value="hr" className="bg-white">Business Dev / HR Intern</option>
                  <option value="content" className="bg-white">Content & Copywriting Intern</option>
                  <option value="qa" className="bg-white">QA / Testing Intern</option>
                  <option value="cyber" className="bg-white">Cybersecurity Intern</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  <LinkIcon className="w-3 h-3 text-indigo-500/50" />
                  Portfolio / LinkedIn Link
                </label>
                <Input 
                  required
                  placeholder="https://yourportfolio.com"
                  className="h-16 bg-slate-50 border-slate-200 focus:border-indigo-600 focus:bg-white text-slate-900 rounded-2xl px-6 transition-all"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                <MessageSquare className="w-3 h-3 text-indigo-500/50" />
                Your Message / Cover Note
              </label>
              <Textarea 
                required
                placeholder="Tell us why you want to join Verve Nova Tech..."
                className="min-h-[160px] bg-slate-50 border-slate-200 focus:border-indigo-600 focus:bg-white text-slate-900 rounded-3xl px-6 py-4 transition-all resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <div className="pt-4">
              <Button 
                type="submit"
                className="w-full h-16 bg-slate-900 hover:bg-indigo-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/10 uppercase text-xs tracking-[0.3em] group"
              >
                Submit Application
                <Send className="w-4 h-4 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
            
            <p className="text-[9px] text-slate-300 uppercase tracking-widest text-center mt-8">
              Authorized Submission // Verve Nova Group SecuCheck Active
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
