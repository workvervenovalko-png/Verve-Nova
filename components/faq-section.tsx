"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";
import Link from "next/link";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How much time does it take to complete a project?",
      answer: "Small websites usually take 1-2 weeks, while complex apps can take 4-8 weeks. We give you a clear timeline before starting so you know exactly when to expect delivery.",
    },
    {
      question: "What are your pricing models?",
      answer: "We offer both fixed-price projects and monthly maintenance plans. Our pricing is transparent—no hidden charges. We'll give you a detailed quote after understanding your requirements.",
    },
    {
      question: "Do you provide support after the project is live?",
      answer: "Yes, we provide 24/7 technical support. We don't just build and leave; we ensure your website or app runs smoothly and stays updated.",
    },
    {
      question: "Can I manage the website myself without coding knowledge?",
      answer: "Absolutely. We provide a simple admin panel where you can update text, images, and other content without needing to write a single line of code.",
    },
  ];

  return (
    <section className="py-20 bg-[#f8fafc] border-b border-[#e2e8f0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section (Exact Verve Nova Strings + AppSquadz Layout) */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#1b67b2] text-xs font-bold uppercase tracking-wider mb-4">
            Common Questions
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] uppercase tracking-tight mb-4">
            Frequently <span className="text-[#1b67b2]">Asked Questions</span>
          </h2>
        </div>

        {/* Accordions */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-[#1b67b2] shadow-md ring-1 ring-[#1b67b2]/10"
                    : "border-[#e2e8f0] hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-[#1b67b2] text-white" : "bg-blue-50 text-[#1b67b2]"
                    }`}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className="text-base sm:text-lg font-bold text-[#0f172a]">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#1b67b2] text-white rotate-180"
                        : "bg-[#f1f5f9] text-[#64748b]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-sm text-[#475569] leading-relaxed border-t border-[#f1f5f9] pt-4 pl-19">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Direct Contact Banner */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1b67b2] flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#0f172a]">
                Have More Questions?
              </h4>
              <p className="text-xs text-[#64748b]">
                Connect directly with our engineering team for instant clarity.
              </p>
            </div>
          </div>

          <a
            href="tel:+917380663685"
            className="inline-flex items-center gap-2 bg-[#1b67b2] hover:bg-[#15538e] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all whitespace-nowrap"
          >
            <span>Call +91 7380663685</span>
          </a>
        </div>

      </div>
    </section>
  );
}
