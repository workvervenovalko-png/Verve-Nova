import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl border-2 border-indigo-500/20 blur-sm absolute inset-0 animate-pulse" />
          <Loader2 className="w-16 h-16 text-indigo-500 animate-spin relative z-10" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black text-white uppercase tracking-[0.5em] animate-pulse">
            VNT.SYSTEM
          </span>
          <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em] mt-2">
            Synchronizing Digital Ecosystem...
          </span>
        </div>
      </div>
    </div>
  );
}
