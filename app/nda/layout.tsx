import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Non-Disclosure Agreement (NDA) & Confidentiality Protocol",
  description: "Bilateral Non-Disclosure Agreement, trade secret protections, and mutual confidentiality frameworks provided to all prospective Verve Nova clients.",
  alternates: {
    canonical: "https://vervenovatech.com/nda",
  },
  openGraph: {
    title: "Non-Disclosure Agreement (NDA) | Verve Nova Technologies",
    description: "Enterprise confidentiality protocols, trade secret defense, and downloadable NDA documentation.",
    url: "https://vervenovatech.com/nda",
    siteName: "Verve Nova Technologies",
    type: "website",
  },
};

export default function NDALayout({ children }: { children: React.ReactNode }) {
  return children;
}
