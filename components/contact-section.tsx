"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitContact } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, Mail, MessageSquare, Globe, ArrowUpRight, Loader2, Phone, Briefcase } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message
      });

      if (!result.success) throw new Error(result.error);

      toast.success("Message Sent. Our team will contact you soon.");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-40 px-6 bg-[#09090B] relative overflow-hidden border-t border-white/[0.04]">
      {/* Mesh gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/[0.05] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-6 flex flex-col items-center text-center md:items-start md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="flex items-center justify-center md:justify-start gap-4 mb-8 w-full">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-indigo-500/30" />
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-[0.4em]">Get in Touch</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-8 text-center md:text-left">
                Talk to Our <br /> <span className="text-gradient">Specialists.</span>
              </h2>

              <p className="text-[13px] md:text-lg text-white/25 font-light leading-relaxed mb-12 max-w-lg mx-auto md:mx-0">
                Ready to start your project? Connect with our expert team to discuss your goals and get a clear project plan. We respond quickly to all inquiries.
              </p>

              <div className="space-y-6 pt-12 border-t border-white/[0.04] w-full max-w-md">
                   {[
                        { label: "Global HQ", val: "LKO // INDIA", icon: Globe },
                        { label: "Response Time", val: "< 24 Hours", icon: ArrowUpRight }
                   ].map(item => (
                        <div key={item.label} className="flex items-center justify-center md:justify-start gap-6">
                             <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                                  <item.icon className="w-4 h-4 text-indigo-400" />
                             </div>
                             <div className="text-left">
                                  <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">{item.label}</p>
                                  <p className="text-sm font-black text-white/70 uppercase leading-none">{item.val}</p>
                             </div>
                        </div>
                   ))}
              </div>
            </motion.div>
          </div>

          {/* Right - Form */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-10 md:p-14 rounded-[3rem] relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/[0.04] blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
               
               <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="space-y-3">
                         <label className="text-[10px] font-bold text-white/25 uppercase tracking-widest ml-1">Your Name</label>
                         <div className="relative">
                              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/15" />
                              <Input 
                                   required
                                   placeholder="Full Name / Company"
                                   className="h-16 pl-14 bg-white/[0.03] border-white/[0.06] rounded-2xl focus:bg-white/[0.05] focus:border-indigo-500/30 transition-all text-sm text-white placeholder:text-white/15"
                                   value={formData.name}
                                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                              />
                         </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-3">
                              <label className="text-[10px] font-bold text-white/25 uppercase tracking-widest ml-1">Email Address</label>
                              <div className="relative">
                                   <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/15" />
                                   <Input 
                                        required
                                        type="email"
                                        placeholder="enterprise@client.com"
                                        className="h-16 pl-14 bg-white/[0.03] border-white/[0.06] rounded-2xl focus:bg-white/[0.05] focus:border-indigo-500/30 transition-all text-sm text-white placeholder:text-white/15"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                   />
                              </div>
                         </div>

                         <div className="space-y-3">
                              <label className="text-[10px] font-bold text-white/25 uppercase tracking-widest ml-1">Phone Number</label>
                              <div className="relative">
                                   <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/15" />
                                   <Input 
                                        required
                                        type="tel"
                                        placeholder="+91 00000 00000"
                                        className="h-16 pl-14 bg-white/[0.03] border-white/[0.06] rounded-2xl focus:bg-white/[0.05] focus:border-indigo-500/30 transition-all text-sm text-white placeholder:text-white/15"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                   />
                              </div>
                         </div>
                    </div>

                    <div className="space-y-3">
                         <label className="text-[10px] font-bold text-white/25 uppercase tracking-widest ml-1">Service Required</label>
                         <div className="relative">
                              <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/15 z-20 pointer-events-none" />
                              <Select 
                                   value={formData.service} 
                                   onValueChange={(value) => setFormData({...formData, service: value})}
                              >
                                   <SelectTrigger className="h-16 pl-14 bg-white/[0.03] border-white/[0.06] rounded-2xl focus:bg-white/[0.05] focus:border-indigo-500/30 transition-all text-sm w-full text-white">
                                        <SelectValue placeholder="Which service do you need?" />
                                   </SelectTrigger>
                                   <SelectContent side="bottom" sideOffset={4} className="rounded-2xl bg-[#111113] border-white/[0.06] shadow-2xl">
                                        {[
                                             "Software & Application",
                                             "AI & Automation",
                                             "Enterprise Systems",
                                             "Backend & APIs",
                                             "UI/UX & Branding",
                                             "Marketing & Growth",
                                             "Cloud & DevOps",
                                             "Cybersecurity"
                                        ].map(service => (
                                             <SelectItem key={service} value={service} className="text-xs font-bold uppercase tracking-widest py-4 text-white/60">
                                                  {service}
                                             </SelectItem>
                                        ))}
                                   </SelectContent>
                              </Select>
                         </div>
                    </div>

                    <div className="space-y-3">
                         <label className="text-[10px] font-bold text-white/25 uppercase tracking-widest ml-1">Your Message</label>
                         <div className="relative">
                              <MessageSquare className="absolute left-5 top-6 w-4 h-4 text-white/15" />
                              <Textarea 
                                   required
                                   placeholder="Brief overview of project requirements..."
                                   className="min-h-[160px] pl-14 pt-6 bg-white/[0.03] border-white/[0.06] rounded-[2rem] focus:bg-white/[0.05] focus:border-indigo-500/30 transition-all text-sm resize-none text-white placeholder:text-white/15"
                                   value={formData.message}
                                   onChange={(e) => setFormData({...formData, message: e.target.value})}
                              />
                         </div>
                    </div>

                    <Button 
                         disabled={isLoading}
                         type="submit"
                         className="w-full h-16 bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-[0_0_32px_rgba(99,102,241,0.3)] text-white font-black rounded-2xl transition-all uppercase text-[10px] tracking-[0.5em] group overflow-hidden relative border-0"
                    >
                         {isLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                         ) : (
                              <>
                                   <span className="relative z-10">Send Message</span>
                                   <Send className="ml-3 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                              </>
                         )}
                    </Button>

                    <p className="text-[8px] text-center text-white/15 uppercase tracking-widest leading-loose">
                         Fast Response Guaranteed // Talk to Experts
                    </p>
               </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
