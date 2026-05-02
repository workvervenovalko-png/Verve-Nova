import { VNTLoader } from "@/components/vnt-loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative">
          <VNTLoader size="lg" />
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
