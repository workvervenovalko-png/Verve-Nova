import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CareersHero, WhyJoinUs, InternshipProgram, ApplicationProcess } from "@/components/careers-sections";
import { NoiseTexture } from "@/components/ui/noise-texture";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-indigo-500/10 selection:text-indigo-900 overflow-hidden">
      <NoiseTexture />
      <Navbar />
      <CareersHero />
      <WhyJoinUs />
      <InternshipProgram />
      <ApplicationProcess />
      <Footer />
    </main>
  );
}
