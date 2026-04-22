import type { Metadata, Viewport } from 'next'
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
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://vervenovatech.com'), // Replace with your actual domain
  title: {
    default: 'VNT - Verve Nova Tech | Top Website & Software Company in Lucknow',
    template: '%s | VNT - Verve Nova Tech'
  },
  description: 'VNT (Verve Nova Tech) is a premium website and software development company in Lucknow. Specializing in custom software, AI solutions, and digital transformation, VNT delivers elite tech globally.',
  keywords: [
    'VNT',
    'VNT Global',
    'Verve Nova Tech',
    'VNT Lucknow',
    'Website company',
    'Website company in Lucknow',
    'Software company',
    'Software company in Lucknow',
    'Best website company in Lucknow',
    'Top IT company',
    'Web development agency',
    'IT Solutions'
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
  openGraph: {
    title: 'VNT - Verve Nova Tech | Top Website & Software Company',
    description: 'VNT (Verve Nova Tech) is a leading software and website company in Lucknow, delivering cutting-edge digital solutions globally.',
    url: 'https://vervenovatech.com',
    siteName: 'VNT - Verve Nova Tech',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VNT - Verve Nova Tech - Enterprise IT Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VNT - Verve Nova Tech | Top Website & Software Company',
    description: 'VNT (Verve Nova Tech) is a leading software and website company in Lucknow.',
    creator: '@vervenovatech',
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
  generator: 'v0.app',
}

import { Providers } from '@/components/providers'
import { SocialSidebar } from '@/components/social-sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "VNT - Verve Nova Tech",
                "url": "https://vervenovatech.com",
                "logo": "https://vervenovatech.com/vnt-logo.png",
                "sameAs": [
                  "https://www.linkedin.com/company/vervenovatech",
                  "https://x.com/vervenovatech",
                  "https://www.instagram.com/vervenovatech"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-XXXXXXXXXX", // Replace with actual number if known
                  "contactType": "customer service",
                  "areaServed": "IN",
                  "availableLanguage": ["en", "Hindi"]
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "VNT - Verve Nova Tech",
                "url": "https://vervenovatech.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://vervenovatech.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "VNT - Verve Nova Tech",
                "alternateName": ["VNT", "VNT Global", "VNT Lucknow", "Verve Nova Technologies"],
                "url": "https://vervenovatech.com",
                "description": "VNT (Verve Nova Tech) is a leading website company and software company in Lucknow. We specialize in software development, web apps, AI, and enterprise tech globally.",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Lucknow",
                  "addressRegion": "Uttar Pradesh",
                  "addressCountry": "IN"
                },
                "areaServed": ["Lucknow", "India", "Global"],
                "knowsAbout": ["Website Development", "Software Development", "IT Solutions", "AI Solutions", "Digital Transformation"]
              }
            ])
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>
          {children}
          <SocialSidebar />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
