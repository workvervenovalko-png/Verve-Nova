"use client";

import { useState, useEffect } from "react";
import { startAssessment, submitAssessment } from "@/app/actions/assessment";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Play, BrainCircuit } from "lucide-react";
import { toast } from "sonner";
import { VNTLoader } from "@/components/vnt-loader";

interface Question {
  id: string;
  type: string;
  text: string;
  codeSnippet?: string;
  options: string[];
}

interface AssessmentClientProps {
  appId: string;
  candidateName: string;
  roleSlug: string;
  questions: Question[];
  initialStatus: string;
}

const TOTAL_TIME_SECONDS = 60 * 60; // 1 Hour

export default function AssessmentClient({ appId, candidateName, roleSlug, questions, initialStatus }: AssessmentClientProps) {
  const [status, setStatus] = useState(initialStatus);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'In Progress' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStart = async () => {
    setIsStarting(true);
    const res = await startAssessment(appId);
    if (res.success) {
      setStatus('In Progress');
      setTimeLeft(TOTAL_TIME_SECONDS);
    } else {
      toast.error(res.error || "Failed to start assessment.");
    }
    setIsStarting(false);
  };

  const handleOptionSelect = (optIndex: number) => {
    const qId = questions[currentQuestionIndex].id;
    setAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const handleManualSubmit = async () => {
    if (!confirm("Are you sure you want to submit? You cannot change your answers after submission.")) return;
    await performSubmit();
  };

  const handleAutoSubmit = async () => {
    toast.error("Time is up! Auto-submitting your assessment...");
    await performSubmit();
  };

  const performSubmit = async () => {
    setIsSubmitting(true);
    const res = await submitAssessment(appId, answers);
    setIsSubmitting(false);
    
    if (res.success) {
      setStatus('Completed');
      toast.success("Assessment submitted successfully!");
    } else {
      toast.error(res.error || "Failed to submit assessment.");
    }
  };

  if (status === 'Completed') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/50">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">ASSESSMENT SUBMITTED</h1>
        <p className="text-white/40 uppercase tracking-widest text-sm max-w-md">Your responses have been recorded securely. You may close this window. Please wait for further communication from our talent acquisition team.</p>
      </div>
    );
  }

  if (status === 'Pending') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/[0.05] blur-[100px] rounded-full pointer-events-none" />
        
        <div className="glass-card max-w-xl w-full p-10 rounded-[2.5rem] border-white/[0.08] relative z-10 text-center">
          <BrainCircuit className="w-16 h-16 text-indigo-400 mx-auto mb-6 opacity-80" />
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Technical Assessment</h1>
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-8">{roleSlug.replace('-', ' ')} Domain</p>
          
          <div className="text-left bg-white/[0.02] border border-white/[0.04] p-6 rounded-2xl mb-8 space-y-4">
            <p className="text-sm font-medium text-white/70">Welcome, <strong className="text-white">{candidateName}</strong>.</p>
            <ul className="text-xs text-white/50 space-y-2 uppercase tracking-wide">
              <li>• Total Questions: <strong className="text-white">{questions.length}</strong></li>
              <li>• Time Allowed: <strong className="text-white">60 Minutes</strong></li>
              <li>• Sections: <strong className="text-white">Aptitude, Quant, Reasoning, Technical</strong></li>
              <li>• <strong className="text-rose-400">Warning:</strong> Timer cannot be paused once started.</li>
            </ul>
          </div>

          <Button 
            onClick={handleStart} 
            disabled={isStarting}
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all"
          >
            {isStarting ? <VNTLoader size="sm" /> : <><Play className="w-4 h-4 mr-2" /> Start Assessment</>}
          </Button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="h-20 border-b border-white/[0.08] flex items-center justify-between px-6 md:px-12 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <img src="/vnt-logo.png" alt="VNT" className="w-8 h-8 object-contain opacity-50" />
          <div className="hidden md:block">
            <h2 className="text-sm font-black text-white uppercase tracking-tighter leading-none">Assessment Round</h2>
            <p className="text-[9px] text-indigo-400 font-mono tracking-widest">{roleSlug.toUpperCase()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
            <Clock className={`w-4 h-4 ${timeLeft < 300 ? 'text-rose-500 animate-pulse' : 'text-indigo-400'}`} />
            <span className={`text-lg font-mono font-bold tracking-wider ${timeLeft < 300 ? 'text-rose-400' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          
          <Button 
            onClick={handleManualSubmit}
            disabled={isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest h-10 px-6 rounded-lg"
          >
            {isSubmitting ? <VNTLoader size="sm" /> : "Finish & Submit"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h3>
          <span className="px-3 py-1 bg-white/[0.05] rounded-full text-[9px] font-bold text-white/30 uppercase tracking-widest">
            {currentQ.type}
          </span>
        </div>

        <div className="space-y-8">
          <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
            {currentQ.text}
          </h2>

          {currentQ.codeSnippet && (
            <div className="bg-[#09090b] border border-white/[0.08] p-6 rounded-xl overflow-x-auto">
              <pre className="text-sm font-mono text-indigo-300">
                <code>{currentQ.codeSnippet}</code>
              </pre>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentQ.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`p-6 text-left rounded-xl border transition-all ${
                    isSelected 
                      ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.15)] text-white' 
                      : 'bg-white/[0.02] border-white/[0.08] text-white/70 hover:bg-white/[0.05] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-indigo-400 bg-indigo-400/20' : 'border-white/20'
                    }`}>
                      {isSelected && <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full" />}
                    </div>
                    <span className="font-medium">{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between pt-8 border-t border-white/[0.08]">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionIndex(p => Math.max(0, p - 1))}
            disabled={currentQuestionIndex === 0}
            className="border-white/[0.08] bg-transparent text-white/50 hover:text-white uppercase text-[10px] tracking-widest font-bold h-12 px-8"
          >
            Previous
          </Button>
          
          <Button
            disabled={answers[currentQ.id] === undefined}
            onClick={() => {
              if (currentQuestionIndex === questions.length - 1) {
                handleManualSubmit();
              } else {
                setCurrentQuestionIndex(p => Math.min(questions.length - 1, p + 1));
              }
            }}
            className={`${currentQuestionIndex === questions.length - 1 ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-500'} ${answers[currentQ.id] === undefined ? 'opacity-50 cursor-not-allowed' : ''} text-white uppercase text-[10px] tracking-widest font-bold h-12 px-8 border-0 transition-all`}
          >
            {currentQuestionIndex === questions.length - 1 ? "Submit Assessment" : "Next Question"}
          </Button>
        </div>
      </main>
    </div>
  );
}
