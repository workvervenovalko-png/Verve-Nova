"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.6em] mb-6">Connect</h2>
            <h3 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase mb-8">
              Start Your <span className="text-indigo-600">Journey</span>
            </h3>
            <p className="text-xl text-slate-500 font-light leading-relaxed mb-12">
              Ready to scale your enterprise infrastructure? Let's discuss your technical roadmap.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-12 rounded-[3rem] shadow-xl shadow-indigo-500/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Name</label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-slate-900 outline-none focus:border-indigo-600 transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-slate-900 outline-none focus:border-indigo-600 transition-colors"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                <Textarea
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-slate-900 outline-none focus:border-indigo-600 transition-colors min-h-[150px]"
                  required
                />
              </div>
              <Button 
                type="submit"
                className="w-full h-16 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-all uppercase text-[10px] tracking-[0.2em] shadow-xl"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
