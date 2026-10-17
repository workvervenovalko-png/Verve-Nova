import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  variable: '--font-poppins',
});

export const viewport: Viewport = {
  themeColor: '#FAFAF8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://vervenovatech.com'), // Replace with your actual domain
  title: {
    default: 'Verve Nova Technologies | Next-Gen Cloud Systems & Software Engineering',
    template: '%s | Verve Nova Technologies'
  },
  description: 'Verve Nova Technologies (VNT) engineers enterprise digital solutions, custom software, AI platforms, and scalable cloud systems for high-growth businesses globally.',
  keywords: [
    'VNT',
    'VNT Global',
    'Verve Nova Technologies',
    'Enterprise Software Engineering',
    'Cloud Systems',
    'AI Software Development',
    'Custom Application Development',
    'Global IT Solutions',
    'Full-Stack Web Engineering'
  ],
  authors: [{ name: 'VNT - Verve Nova Tech' }],
  creator: 'VNT - Verve Nova Tech',
  publisher: 'VNT - Verve Nova Tech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/vnt-logo.png', type: 'image/png' },
    ],
    shortcut: '/vnt-logo.png',
    apple: '/vnt-logo.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://vervenovatech.com',
  },
  openGraph: {
    title: 'Verve Nova Technologies | Enterprise Software & Cloud Systems',
    description: 'Verve Nova Technologies engineers custom enterprise software, AI platforms, and cloud systems for modern businesses worldwide.',
    url: 'https://vervenovatech.com',
    siteName: 'Verve Nova Technologies',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Verve Nova Technologies - Enterprise IT Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verve Nova Technologies | Enterprise Software & Cloud Systems',
    description: 'Verve Nova Technologies engineers custom enterprise software, AI platforms, and cloud systems for modern businesses worldwide.',
    creator: '@vervenova',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'GfKcs2U6i040Xdk3gc6yBf27eDH2FyIyiqlP4GxQgYE',
  },
}

import { Providers } from '@/components/providers'
import { SocialSidebar } from '@/components/social-sidebar';
import { MaintenanceGuard } from '@/components/maintenance-guard';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} light`}>
      <body className="font-sans antialiased bg-white text-slate-900 selection:bg-[#1b67b2] selection:text-white">
        <Providers>
          <MaintenanceGuard>
            {children}
          </MaintenanceGuard>
          <SocialSidebar />
        </Providers>
        <Analytics />
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Verve Nova Technologies",
                "alternateName": ["VNT", "VNT Global", "Verve Nova Tech"],
                "legalName": "Verve Nova Technologies Private Limited",
                "identifier": "UDYAM-UP-10-0047070",
                "taxID": "UDYAM-UP-10-0047070",
                "url": "https://vervenovatech.com",
                "logo": "https://vervenovatech.com/vnt-logo.png",
                "foundingDate": "2024",
                "founders": [
                  {
                    "@type": "Person",
                    "name": "Puneet Kushwaha",
                    "jobTitle": "Founder & CEO / Principal Systems Architect",
                    "sameAs": "https://vervenovatech.com/about"
                  },
                  {
                    "@type": "Person",
                    "name": "Mehak Agarwal",
                    "jobTitle": "Co-Founder & Director of Operations"
                  }
                ],
                "sameAs": [
                  "https://www.linkedin.com/company/verve-nova/",
                  "https://x.com/vervenova",
                  "https://www.instagram.com/vntech_global",
                  "https://www.instagram.com/vervenovatech",
                  "https://www.facebook.com/share/1CboBbz1bF/",
                  "https://play.google.com/store/apps/details?id=com.sahil.servicehub"
                ],
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Sector 10, Indira Nagar",
                  "addressLocality": "Lucknow",
                  "addressRegion": "Uttar Pradesh",
                  "postalCode": "226016",
                  "addressCountry": "IN"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-7380663685",
                  "email": "contact@vervenovatech.com",
                  "contactType": "customer service",
                  "areaServed": ["IN", "US", "GB", "AE", "Global"],
                  "availableLanguage": ["en", "Hindi"]
                },
                "areaServed": ["Global", "India", "United States", "United Kingdom", "United Arab Emirates"],
                "knowsAbout": [
                  "Enterprise Software Development",
                  "Cloud Systems Architecture",
                  "AI Platforms & Machine Learning",
                  "Full-Stack Web Engineering",
                  "Mobile Application Development",
                  "Cybersecurity Auditing",
                  "Microservices Infrastructure"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Verve Nova Technologies",
                "alternateName": "VNT Global",
                "url": "https://vervenovatech.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://vervenovatech.com/blog?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "name": "Verve Nova Technologies",
                "alternateName": "VNT Global",
                "image": "https://vervenovatech.com/vnt-logo.png",
                "url": "https://vervenovatech.com",
                "telephone": "+91-7380663685",
                "email": "contact@vervenovatech.com",
                "priceRange": "$$",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Sector 10, Indira Nagar",
                  "addressLocality": "Lucknow",
                  "addressRegion": "Uttar Pradesh",
                  "postalCode": "226016",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 26.8833,
                  "longitude": 80.9933
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "09:30",
                  "closes": "19:00"
                }
              }
            ])
          }}
        />
        {/* Google Analytics Tag */}
        <Script
          id="gtag-base"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent('14965936414')}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '14965936414', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
