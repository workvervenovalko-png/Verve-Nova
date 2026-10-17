import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Reviews & Verified Testimonials",
  description: "Read authentic client reviews, verified project ratings, and testimonials from global founders and enterprise executives partnering with Verve Nova Technologies.",
  keywords: [
    "Verve Nova Reviews",
    "Client Testimonials",
    "Verve Nova Tech Ratings",
    "Software Agency Reviews",
    "Verified Client Feedback"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/testimonials",
  },
  openGraph: {
    title: "Client Reviews & Verified Testimonials | Verve Nova Technologies",
    description: "Authentic feedback and verified reviews from enterprise leaders who engineered systems with Verve Nova.",
    url: "https://vervenovatech.com/testimonials",
    siteName: "Verve Nova Technologies",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Testimonials - Verve Nova Tech" }],
  },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
