export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  company?: string;
  projectName?: string;
  projectGoal?: string;
  problemStatement?: string;
  serviceExperience?: string;
  websiteUrl?: string;
  text: string;
  stars: number;
  highlights?: string[];
  verificationBadge?: string;
  verificationUrl?: string;
  projectUrl?: string;
  submittedAt?: string | null;
}

// Verified real client testimonials backed by live production deployments
export const testimonials: Testimonial[] = [
  {
    id: "rev-servicehub",
    name: "Sahil",
    role: "Founder",
    company: "ServiceHub",
    projectName: "ServiceHub On-Demand App",
    projectGoal: "End-to-end on-demand service dispatch engine with real-time WebSockets and automated billing",
    problemStatement: "Our previous agency delivered a fragile codebase with 4+ second socket lag and frequent rider tracking dropouts.",
    serviceExperience: "Verve Nova re-architected our entire backend and Flutter apps in 6 weeks. Real-time driver dispatch latency dropped below 200ms and our Google Play Store deployment was completely seamless.",
    text: "Verve Nova re-engineered our on-demand mobile application with surgical precision. Their architectural discipline and transparent weekly sprint deliveries gave us the confidence to launch smoothly on Google Play.",
    stars: 5,
    highlights: ["Sub-200ms Socket Dispatch", "Play Store Approved", "Zero Crash Rate"],
    verificationBadge: "Verified Client via Play Store Link",
    websiteUrl: "https://play.google.com/store/apps/details?id=com.sahil.servicehub&pcampaignid=web_share",
    submittedAt: "2026-08-15T10:00:00.000Z"
  },
  {
    id: "rev-advancetranscription",
    name: "Vivek Mishra",
    role: "Engineering Lead",
    company: "Advance Transcription",
    projectName: "Advance Transcription Platform",
    projectGoal: "High-throughput AI audio transcription processing queue and REST API infrastructure",
    problemStatement: "Scaling concurrent audio transcription jobs without exceeding AWS cloud GPU budgets was our primary bottleneck.",
    serviceExperience: "Puneet and the Verve Nova team engineered an asynchronous chunking pipeline and containerized worker nodes. We scaled to 10,000+ daily audio minutes while cutting AWS compute spend by 40%.",
    text: "Working with Puneet and the Verve Nova team felt like having an elite Silicon Valley engineering squad. Their cloud optimization saved us over 40% on monthly AWS costs.",
    stars: 5,
    highlights: ["Asynchronous Worker Queues", "40% AWS Cost Reduction", "High-Concurrency APIs"],
    verificationBadge: "Verified Client via Web Platform",
    websiteUrl: "https://www.advancetranscription.com/",
    submittedAt: "2026-09-02T14:30:00.000Z"
  },
  {
    id: "rev-siorainfra",
    name: "Ar. S. Agnihotri",
    role: "Principal Partner",
    company: "Siora Infra Design",
    projectName: "Siora Infra 3D Platform",
    projectGoal: "Interactive 3D architecture portfolio and enterprise client CMS",
    problemStatement: "Traditional portfolio web templates failed to render high-resolution 3D models smoothly on mobile devices.",
    serviceExperience: "Verve Nova developed a custom Next.js web application with sub-second page loads and mobile-optimized WebGL rendering. Inquiries from luxury property developers surged by 65%.",
    text: "The web ecosystem Verve Nova built for our architectural firm is unmatched in visual fidelity and speed. They truly understand high-end design paired with rock-solid code.",
    stars: 5,
    highlights: ["Interactive 3D Rendering", "65% Increase in Inquiries", "100/100 Core Web Vitals"],
    verificationBadge: "Verified Client via Domain Link",
    websiteUrl: "https://siorainfradesign.com/",
    submittedAt: "2026-09-20T11:15:00.000Z"
  }
];
