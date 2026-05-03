"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DocumentTemplates } from "@/components/documents/DocumentTemplates";
import { ArrowLeft, Download, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VNTLoader } from "@/components/vnt-loader";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { toast } from "sonner";

export default function DocumentPreviewPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const router = useRouter();
  const documentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/verify?id=${id}`);
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleDownloadImage = async () => {
    if (!documentRef.current) return;
    
    setDownloading(true);
    const toastId = toast.loading("Generating high-quality image...");

    try {
      // Small delay to ensure everything is rendered
      await new Promise(resolve => setTimeout(resolve, 500));

      const dataUrl = await toPng(documentRef.current, {
        quality: 1.0,
        pixelRatio: 2, // Higher resolution
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = `VNT-${data.type.replace(/\s+/g, '-')}-${data.candidateName.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();

      toast.success("Downloaded successfully!", { id: toastId });
    } catch (err) {
      console.error("Failed to generate image:", err);
      toast.error("Failed to download image. Try again.", { id: toastId });
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <VNTLoader size="lg" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-black uppercase mb-4">Record Missing</h1>
        <Button onClick={() => router.push('/verify')} variant="outline" className="border-white/10 text-white">Back to Portal</Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#111111] py-20 px-6 flex flex-col items-center">
      <div className="w-full max-w-[800px] flex justify-between items-center mb-8">
        <Button 
          onClick={() => router.back()}
          variant="ghost" 
          className="text-white/40 hover:text-white flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Verification
        </Button>
        <Button 
          onClick={handleDownloadImage}
          disabled={downloading}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2"
        >
          {downloading ? (
            <VNTLoader size="sm" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {downloading ? "Generating..." : "Save as Image"}
        </Button>
      </div>

      <div ref={documentRef} className="shadow-2xl shadow-black/50 overflow-hidden rounded-sm bg-white">
        <DocumentTemplates 
          type={data.type}
          candidateName={data.candidateName}
          vnId={data.vnId}
          verificationId={data.verificationId}
          issuedAt={data.issuedAt}
          metadata={data.metadata}
        />
      </div>

      <div className="mt-12 text-center text-white/20 max-w-lg">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Official Digital Certification // Verve Nova Technologies</p>
        <p className="text-[8px] mt-2 italic">This document is digitally verified and requires no physical signature for authentication in its digital form. For official verification, visit vervenovatech.com/verify.</p>
      </div>
    </main>
  );
}
