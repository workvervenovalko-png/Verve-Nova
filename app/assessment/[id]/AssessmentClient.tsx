"use client";

import { useState, useEffect } from "react";
import { startAssessment, submitAssessment } from "@/app/actions/assessment";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, AlertCircle, ArrowRight, BrainCircuit, Linkedin, Instagram } from "lucide-react";
import { toast } from "sonner";
import { VNTLoader } from "@/components/vnt-loader";

interface AssessmentClientProps {
  appId: string;
  candidateName: string;
  roleSlug: string;
  questions: Array<{
    id: string;
    text: string;
    codeSnippet?: string;
    options: string[];
    type: string;
  }>;
  initialStatus: string;
  startedAt?: Date;
}

export default function AssessmentClient({
  appId,
  candidateName,
  roleSlug,
  questions,
  initialStatus,
  startedAt
}: AssessmentClientProps) {
  const [status, setStatus] = useState(initialStatus);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(30 * 60); // 30 mins
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mandatory social follow states
  const [socialFollows, setSocialFollows] = useState({
    linkedin: false,
    instaGlobal: false,
    instaIndia: false,
    instaLucknow: false
  });

  const allFollowed = socialFollows.linkedin && socialFollows.instaGlobal && socialFollows.instaIndia && socialFollows.instaLucknow;

  // Initialize timer
  useEffect(() => {
    if (status === 'In_Progress' && startedAt) {
      const elapsed = Math.floor((new Date().getTime() - new Date(startedAt).getTime()) / 1000);
      const remaining = Math.max(0, (30 * 60) - elapsed);
      setTimeLeft(remaining);

      if (remaining === 0) {
        handleAutoSubmit();
      }
    }
  }, [status, startedAt]);

  // Countdown timer
  useEffect(() => {
    if (status !== 'In_Progress') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  const handleStart = async () => {
    if (!allFollowed) {
      toast.error("Please connect with all official channels to unlock the assessment.");
      return;
    }

    setIsSubmitting(true);
    const res = await startAssessment(appId);
    if (res.success) {
      setStatus('In_Progress');
      toast.success("Assessment started! 30-minute timer initiated.");
    } else {
      toast.error(res.error || "Failed to start assessment.");
    }
    setIsSubmitting(false);
  };

  const handleOptionSelect = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: optionIndex
    }));
  };

  const handleManualSubmit = async () => {
    const unansweredCount = questions.length - Object.keys(answers).length;
    if (unansweredCount > 0) {
      const confirmSubmit = window.confirm(`You have ${unansweredCount} unanswered questions. Are you sure you want to submit?`);
      if (!confirmSubmit) return;
    }
    await processSubmit();
  };

  const handleAutoSubmit = async () => {
    toast.error("Time expired! Submitting answers automatically.");
    await processSubmit();
  };

  const processSubmit = async () => {
    setIsSubmitting(true);
    const res = await submitAssessment(appId, answers);
    if (res.success) {
      setStatus('Completed');
      toast.success("Assessment submitted successfully!");
    } else {
      toast.error(res.error || "Failed to submit assessment.");
    }
    setIsSubmitting(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (status === 'Completed') {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border border-emerald-200">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-black text-slate-950 uppercase tracking-tight mb-3">Assessment Submitted</h1>
        <p className="text-slate-600 text-sm max-w-md mb-8 leading-relaxed">
          Your responses have been recorded securely. You may close this window. Please wait for further communication from our talent acquisition team.
        </p>
        <Button 
          onClick={() => window.location.href = "/"}
          className="bg-[#1b67b2] hover:bg-[#15538e] text-white font-bold rounded-xl px-8 h-12 text-xs uppercase tracking-wider"
        >
          Return to Homepage
        </Button>
      </div>
    );
  }

  if (status === 'Pending') {
    return (
      <div className="min-h-screen bg-[#fcfdfd] text-slate-900 selection:bg-blue-500/20 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="max-w-xl w-full p-8 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-blue-500/5 relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto mb-6 text-[#1b67b2]">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-2">Technical Assessment</h1>
          <p className="text-xs font-bold text-[#1b67b2] uppercase tracking-widest mb-8">{roleSlug.replace('-', ' ')} Domain</p>
          
          {!allFollowed ? (
            <div className="text-left bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-8 space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase">Step 1: Connect with Us</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">Please follow our official channels to unlock the assessment round.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a 
                  href="https://www.linkedin.com/company/105071910/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setSocialFollows(prev => ({...prev, linkedin: true}))}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${socialFollows.linkedin ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200 hover:border-[#0077b5]'}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0077b5] flex items-center justify-center text-white shrink-0">
                    {socialFollows.linkedin ? <CheckCircle2 className="w-4 h-4" /> : <Linkedin className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900">LinkedIn</p>
                    <p className="text-[10px] text-slate-500">{socialFollows.linkedin ? "Followed" : "Follow Page"}</p>
                  </div>
                </a>

                <a 
                  href="https://www.instagram.com/vntech_global" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setSocialFollows(prev => ({...prev, instaGlobal: true}))}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${socialFollows.instaGlobal ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200 hover:border-pink-500'}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                    {socialFollows.instaGlobal ? <CheckCircle2 className="w-4 h-4" /> : <Instagram className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900">Global Page</p>
                    <p className="text-[10px] text-slate-500">{socialFollows.instaGlobal ? "Followed" : "Follow Page"}</p>
                  </div>
                </a>

                <a 
                  href="https://www.instagram.com/vntech_india" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setSocialFollows(prev => ({...prev, instaIndia: true}))}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${socialFollows.instaIndia ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200 hover:border-pink-500'}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                    {socialFollows.instaIndia ? <CheckCircle2 className="w-4 h-4" /> : <Instagram className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900">India Page</p>
                    <p className="text-[10px] text-slate-500">{socialFollows.instaIndia ? "Followed" : "Follow Page"}</p>
                  </div>
                </a>

                <a 
                  href="https://www.instagram.com/vntech_lucknow" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setSocialFollows(prev => ({...prev, instaLucknow: true}))}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${socialFollows.instaLucknow ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200 hover:border-pink-500'}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                    {socialFollows.instaLucknow ? <CheckCircle2 className="w-4 h-4" /> : <Instagram className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900">Lucknow Hub</p>
                    <p className="text-[10px] text-slate-500">{socialFollows.instaLucknow ? "Followed" : "Follow Page"}</p>
                  </div>
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl mb-8 flex items-center gap-3 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Channels verified! You are ready to start the assessment.</span>
            </div>
          )}

          <div className="space-y-4">
            <div className="text-xs text-slate-500 flex items-center justify-center gap-6">
              <span>⏱ 30 Minutes</span>
              <span>📝 {questions.length} Questions</span>
              <span>🔒 Anti-Cheating Monitored</span>
            </div>

            <Button 
              onClick={handleStart}
              disabled={!allFollowed || isSubmitting}
              className={`w-full h-14 ${allFollowed ? 'bg-[#1b67b2] hover:bg-[#15538e] cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'} text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md`}
            >
              {isSubmitting ? <VNTLoader size="sm" /> : "Start Technical Assessment"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-slate-900 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="h-20 border-b border-slate-200 flex items-center justify-between px-6 md:px-12 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-xs">
        <div className="flex items-center gap-4">
          <img src="/vnt-logo.png" alt="VNT" className="w-8 h-8 object-contain" />
          <div className="hidden md:block">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none">Assessment Round</h2>
            <p className="text-[10px] text-[#1b67b2] font-mono tracking-widest mt-0.5">{roleSlug.toUpperCase()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200 rounded-xl">
            <Clock className={`w-4 h-4 ${timeLeft < 300 ? 'text-rose-600 animate-pulse' : 'text-[#1b67b2]'}`} />
            <span className={`text-base font-mono font-bold tracking-wider ${timeLeft < 300 ? 'text-rose-600' : 'text-[#1b67b2]'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          
          <Button 
            onClick={handleManualSubmit}
            disabled={isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-widest h-10 px-5 rounded-xl cursor-pointer"
          >
            {isSubmitting ? <VNTLoader size="sm" /> : "Finish & Submit"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#1b67b2] uppercase tracking-wider">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h3>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider">
            {currentQ.type}
          </span>
        </div>

        <div className="space-y-6 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-xs">
          <h2 className="text-lg md:text-xl font-black text-slate-900 leading-relaxed">
            {currentQ.text}
          </h2>

          {currentQ.codeSnippet && (
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl overflow-x-auto">
              <pre className="text-xs font-mono text-sky-300">
                <code>{currentQ.codeSnippet}</code>
              </pre>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentQ.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`p-5 text-left rounded-2xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-blue-50/80 border-[#1b67b2] shadow-sm text-slate-950 font-bold' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'border-[#1b67b2] bg-[#1b67b2]' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="text-xs leading-relaxed flex-1 break-words min-w-0">{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionIndex(p => Math.max(0, p - 1))}
            disabled={currentQuestionIndex === 0}
            className="border-slate-200 bg-white text-slate-700 hover:text-slate-950 uppercase text-xs tracking-wider font-bold h-11 px-6 rounded-xl cursor-pointer"
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
            className={`${currentQuestionIndex === questions.length - 1 ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#1b67b2] hover:bg-[#15538e]'} ${answers[currentQ.id] === undefined ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} text-white uppercase text-xs tracking-wider font-bold h-11 px-7 rounded-xl border-0 transition-all shadow-md`}
          >
            {currentQuestionIndex === questions.length - 1 ? "Submit Assessment" : "Next Question"}
          </Button>
        </div>
      </main>
    </div>
  );
}
