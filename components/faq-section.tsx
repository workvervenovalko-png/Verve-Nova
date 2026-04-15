"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How much time does it take to complete a project?",
      answer: "Small websites usually take 1-2 weeks, while complex apps can take 4-8 weeks. We give you a clear timeline before starting so you know exactly when to expect delivery."
    },
    {
      question: "What are your pricing models?",
      answer: "We offer both fixed-price projects and monthly maintenance plans. Our pricing is transparent—no hidden charges. We'll give you a detailed quote after understanding your requirements."
    },
    {
      question: "Do you provide support after the project is live?",
      answer: "Yes, we provide 24/7 technical support. We don't just build and leave; we ensure your website or app runs smoothly and stays updated."
    },
    {
      question: "Can I manage the website myself without coding knowledge?",
      answer: "Absolutely. We provide a simple admin panel where you can update text, images, and other content without needing to write a single line of code."
    }
  ];

  return (
    <section className="py-28 bg-background border-t border-white/[0.04] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-violet-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.5em] mb-4">Common Questions</p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none">
            Frequently <span className="text-white/10">Asked Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`glass-card rounded-3xl overflow-hidden transition-all duration-500 ${openIndex === i ? 'ring-1 ring-indigo-500/20 shadow-[0_0_32px_rgba(99,102,241,0.06)]' : ''}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${openIndex === i ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-[0_0_16px_rgba(99,102,241,0.3)]' : 'bg-white/[0.04] text-white/20 group-hover:bg-white/[0.06]'}`}>
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h4 className="text-base md:text-lg font-bold text-white/80 leading-tight">{faq.question}</h4>
                </div>
                <div className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                  {openIndex === i ? <Minus className="w-5 h-5 text-indigo-400" /> : <Plus className="w-5 h-5 text-white/20" />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 pt-0 ml-16">
                      <p className="text-white/30 font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
