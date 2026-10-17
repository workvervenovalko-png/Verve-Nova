import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustMatrix } from "@/components/trust-matrix";
import { TrustStrip } from "@/components/trust-strip";
import { ProductEcosystem } from "@/components/product-ecosystem";
import { ReadyProjects } from "@/components/ready-projects";
import { Capabilities } from "@/components/capabilities";
import { Services } from "@/components/services";
import { Industries } from "@/components/industries";
import { Testimonials } from "@/components/testimonials";
import { BlogPreview } from "@/components/blog-preview";
import { Process } from "@/components/process";
import { FAQSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { InstagramFeed } from "@/components/instagram-feed";
import { Footer } from "@/components/footer";
import { SocialSidebar } from "@/components/social-sidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground relative font-sans selection:bg-indigo-500/30">
      <Navbar />
      <Hero />
      <TrustMatrix />
      <TrustStrip />
      <ProductEcosystem />
      <ReadyProjects />
      <Capabilities />
      <Services />
      <Industries />
      <InstagramFeed />
      <Testimonials />
      <BlogPreview />
      <Process />
      <FAQSection />
      <ContactSection />
      <Footer />
      <SocialSidebar />
    </main>
  );
}
