import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { TrustMatrix } from "@/components/trust-matrix";
import { ReadyProjects } from "@/components/ready-projects";
import { Testimonials } from "@/components/testimonials";
import { BlogPreview } from "@/components/blog-preview";
import { FAQSection } from "@/components/faq-section";
import { WhatsAppFAB } from "@/components/whatsapp-fab";
import { Capabilities } from "@/components/capabilities";
import { Services } from "@/components/services";
import { Industries } from "@/components/industries";
import { Process } from "@/components/process";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background pb-px relative">
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <TrustMatrix />
      <TrustStrip />
      <ReadyProjects />
      <Capabilities />
      <Services />
      <Industries />
      <Testimonials />
      <BlogPreview />
      <Process />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}



