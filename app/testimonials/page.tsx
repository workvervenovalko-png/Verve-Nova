"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { testimonials } from "@/lib/testimonials-data";
import { Quote, Star } from "lucide-react";
import { WhatsAppFAB } from "@/components/whatsapp-fab";

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-40 pb-20 px-6 bg-[#0C0C0F] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-[30%] left-1/4 w-[500px] h-[500px] bg-indigo-500/[0.04] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4"
            >
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.5em] mb-4">Wall of Love</p>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-6">
                Success <br /> <span className="text-gradient">Stories.</span>
              </h1>
              <p className="text-sm text-white/30 font-light leading-relaxed">
                30+ global clients have shared their experience working with our expert team.
              </p>
            </motion.div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.slice(0, 2).map((review, i) => (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-8 rounded-[2rem]"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.stars)].map((_, s) => (
                      <div key={s} className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_0_4px_rgba(245,158,11,0.3)]" />
                    ))}
                  </div>
                  <p className="text-xs text-white/40 font-light leading-relaxed mb-6">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-[10px] font-black text-white">{review.name.charAt(0)}</div>
                    <div>
                      <h4 className="text-[10px] font-black text-white/70 uppercase">{review.name}</h4>
                      <p className="text-[8px] font-bold text-white/20 uppercase">{review.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.slice(2).map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.1 }}
                className="break-inside-avoid glass-card p-8 rounded-[2rem] hover:glass-card-hover transition-all duration-500 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1">
                    {[...Array(review.stars)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-white/[0.04] group-hover:text-indigo-500/10 transition-colors" />
                </div>

                <p className="text-white/35 font-light leading-relaxed mb-8">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="flex items-center gap-4 border-t border-white/[0.04] pt-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-xs shadow-lg group-hover:shadow-[0_0_16px_rgba(99,102,241,0.3)] transition-all">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white/70 leading-none mb-1 uppercase tracking-tight">{review.name}</h4>
                    <p className="text-[9px] font-bold text-indigo-400/50 uppercase tracking-widest">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </main>
  );
}
