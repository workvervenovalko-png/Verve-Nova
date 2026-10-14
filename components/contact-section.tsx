"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitContact } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, Mail, MessageSquare, Phone, Briefcase, ShieldCheck, MapPin, DollarSign, Clock, MessageCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { VNTLoader } from "@/components/vnt-loader";

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    timeline: "",
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
        service: formData.service || "General Software Inquiry",
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message
      });

      if (!result.success) throw new Error(result.error);

      toast.success("Project Inquiry Sent! Our team will contact you within 2-4 business hours.");
      setFormData({ name: "", email: "", phone: "", service: "", budget: "", timeline: "", message: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-6 bg-[#f8fafc] relative overflow-hidden border-t border-slate-200">
      {/* Light Mesh gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/[0.05] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Content */}
          <div className="lg:col-span-5 flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex flex-col items-center md:items-start w-full">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4 w-full">
                <div className="w-10 h-0.5 bg-[#1b67b2] hidden md:block" />
                <span className="text-xs font-mono font-extrabold text-[#1b67b2] uppercase tracking-widest">
                  Let&apos;s Build Together
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight uppercase leading-[0.95] mb-6 text-center md:text-left">
                Start Your <br /> <span className="text-[#1b67b2]">Project.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
                Share your requirements, software vision, or technical bottlenecks. We provide an initial technical feasibility analysis, milestone timeline, and transparent cost breakdown within 2–4 business hours.
              </p>

              {/* Direct Reach Out Cards */}
              <div className="space-y-3 w-full max-w-lg mb-6">
                <a 
                  href="tel:+917380663685" 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#1b67b2] hover:shadow-md transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1b67b2] shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Direct Phone</p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#1b67b2] transition-colors">+91 7380663685</p>
                  </div>
                </a>

                <a 
                  href="mailto:contact@vervenovatech.com" 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#1b67b2] hover:shadow-md transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1b67b2] shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Official Inquiries</p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#1b67b2] transition-colors">contact@vervenovatech.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-left">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1b67b2] shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Registered Headquarters</p>
                    <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                      Sector 10, Indira Nagar, Lucknow, Uttar Pradesh 226016, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Security & NDA Assurance */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 max-w-lg w-full mb-6">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <p className="text-xs text-slate-700 font-medium text-left">
                  <span className="font-bold text-emerald-800">100% Mutual NDA Guaranteed:</span> Full bilateral confidentiality & complete client IP ownership.
                </p>
              </div>

              {/* WhatsApp Instant Button */}
              <a
                href="https://wa.me/917380663685?text=Hello%20Verve%20Nova%20Technologies%2C%20I%20have%20a%20project%20requirement."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95 w-full max-w-lg cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Need Instant Answers? Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right - Crisp White Form Card */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl">
              <div className="mb-6">
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                  Request a Project Roadmap & Cost Estimate
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your project brief below. Our technical lead will review and respond with estimated milestones.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider ml-1">
                    Your Name / Company *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1b67b2]" />
                    <Input 
                      required
                      placeholder="e.g. Puneet Kushwaha"
                      className="h-13 pl-12 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:border-[#1b67b2] transition-all text-sm text-slate-900 placeholder:text-slate-400 font-medium"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider ml-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1b67b2]" />
                      <Input 
                        required
                        type="email"
                        placeholder="you@company.com"
                        className="h-13 pl-12 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:border-[#1b67b2] transition-all text-sm text-slate-900 placeholder:text-slate-400 font-medium"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider ml-1">
                      WhatsApp / Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1b67b2]" />
                      <Input 
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="h-13 pl-12 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:border-[#1b67b2] transition-all text-sm text-slate-900 placeholder:text-slate-400 font-medium"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider ml-1">
                    Service Required *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1b67b2] z-20 pointer-events-none" />
                    <Select 
                      value={formData.service} 
                      onValueChange={(value) => setFormData({...formData, service: value})}
                    >
                      <SelectTrigger className="h-13 pl-12 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:border-[#1b67b2] transition-all text-sm w-full text-slate-900 font-medium">
                        <SelectValue placeholder="Select service category" />
                      </SelectTrigger>
                      <SelectContent side="bottom" sideOffset={4} className="rounded-xl bg-white border-slate-200 shadow-2xl text-slate-900">
                        {[
                          "Custom Mobile Application (iOS & Android)",
                          "Full-Stack Web Application / Platform",
                          "AI Integration & Automated Workflows",
                          "Enterprise CRM & ERP Systems",
                          "Cloud Architecture, DevOps & Database Migration",
                          "UI/UX Design, Wireframing & Prototyping",
                          "API Engineering & Payment Gateway Setup",
                          "Code Audit, Bug Fixes & Performance Optimization"
                        ].map((srv) => (
                          <SelectItem key={srv} value={srv}>
                            {srv}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Budget & Timeline Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider ml-1">
                      Target Budget
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1b67b2] z-20 pointer-events-none" />
                      <Select 
                        value={formData.budget} 
                        onValueChange={(value) => setFormData({...formData, budget: value})}
                      >
                        <SelectTrigger className="h-13 pl-12 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:border-[#1b67b2] transition-all text-sm w-full text-slate-900 font-medium">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent side="bottom" sideOffset={4} className="rounded-xl bg-white border-slate-200 shadow-2xl text-slate-900">
                          {[
                            "Under ₹1,00,000 (MVP / Starter)",
                            "₹1,00,000 – ₹3,00,000 (Standard SaaS / App)",
                            "₹3,00,000 – ₹10,00,000 (Complex Multi-Module)",
                            "₹10,00,000+ (Enterprise Architecture)",
                            "$2,000 – $10,000+ USD (International Client)"
                          ].map((b) => (
                            <SelectItem key={b} value={b}>
                              {b}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider ml-1">
                      Expected Timeline
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1b67b2] z-20 pointer-events-none" />
                      <Select 
                        value={formData.timeline} 
                        onValueChange={(value) => setFormData({...formData, timeline: value})}
                      >
                        <SelectTrigger className="h-13 pl-12 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:border-[#1b67b2] transition-all text-sm w-full text-slate-900 font-medium">
                          <SelectValue placeholder="When do you need it?" />
                        </SelectTrigger>
                        <SelectContent side="bottom" sideOffset={4} className="rounded-xl bg-white border-slate-200 shadow-2xl text-slate-900">
                          {[
                            "Immediate (Within 2–4 Weeks)",
                            "1 to 2 Months",
                            "3+ Months",
                            "Flexible / Currently Planning"
                          ].map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider ml-1">
                    Project Overview & Key Requirements *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-[#1b67b2]" />
                    <Textarea 
                      required
                      placeholder="Describe what you want to build, user roles, integrations needed (e.g., payment gateways, maps, real-time chats)..."
                      rows={4}
                      className="pl-12 pt-3.5 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:border-[#1b67b2] transition-all text-sm text-slate-900 placeholder:text-slate-400 font-medium resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-14 bg-[#1b67b2] hover:bg-[#15538e] text-white font-black uppercase text-xs tracking-widest rounded-xl transition-all shadow-md shadow-blue-500/25 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <VNTLoader size="sm" text="DISPATCHING INQUIRY..." />
                  ) : (
                    <>
                      <span>Send Project Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 pt-2 text-[11px] font-semibold text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2–4 Hour Response SLA • Free Technical Discovery Call</span>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
