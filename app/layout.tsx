import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  metadataBase: new URL('https://vervenovatech.com'), // Replace with your actual domain
  title: {
    default: 'Verve Nova Tech | Top Website & Software Company in Lucknow',
    template: '%s | Verve Nova Tech'
  },
  description: 'Verve Nova Tech (VNT) is a premium website company and software development agency in Lucknow. We specialize in custom software, enterprise systems, AI solutions, web applications, and digital transformation natively in Lucknow and globally (VNT Global).',
  keywords: [
    'Verve Nova Tech', 
    'Verve Nova', 
    'VNT', 
    'VNT Lucknow', 
    'VNT Global', 
    'Website company', 
    'Website company in Lucknow', 
    'Software company', 
    'Software company in Lucknow',
    'Best website company in Lucknow',
    'Top IT company',
    'Web development agency',
    'IT Solutions'
  ],
  authors: [{ name: 'Verve Nova Tech' }],
  creator: 'Verve Nova Tech',
  publisher: 'Verve Nova Tech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Verve Nova Tech | Top Website & Software Company in Lucknow',
    description: 'Verve Nova Tech (VNT) is a leading software and website company in Lucknow, delivering cutting-edge digital solutions globally.',
    url: 'https://vervenovatech.com',
    siteName: 'Verve Nova Tech',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Verve Nova Tech - Enterprise IT Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verve Nova Tech | Top Website & Software Company',
    description: 'Verve Nova Tech (VNT) is a leading software and website company in Lucknow.',
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
             __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Verve Nova Tech",
              "alternateName": ["VNT", "VNT Lucknow", "VNT Global", "Verve Nova"],
              "url": "https://vervenovatech.com",
              "description": "Verve Nova Tech (VNT) is a leading website company and software company in Lucknow. We specialize in software development, web apps, AI, and enterprise tech globally.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lucknow",
                "addressRegion": "Uttar Pradesh",
                "addressCountry": "IN"
              },
              "areaServed": ["Lucknow", "India", "Global"],
              "knowsAbout": ["Website Development", "Software Development", "IT Solutions", "AI Solutions", "Digital Transformation"]
            })
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
