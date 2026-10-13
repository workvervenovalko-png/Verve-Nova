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
    default: 'Verve Nova Technologies | Next-Gen Cloud Systems & Software Engineering',
    template: '%s | Verve Nova Technologies'
  },
  description: 'Verve Nova Technologies engineers enterprise digital solutions, custom software, AI platforms, and scalable cloud systems for high-growth businesses globally.',
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
                "foundingDate": "2024",
                "founders": [
                  {
                    "@type": "Person",
                    "name": "Puneet Kushwaha"
                  },
                  {
                    "@type": "Person",
                    "name": "Mehak Agarwal"
                  }
                ],
                "sameAs": [
                  "https://www.linkedin.com/company/vervenovatech",
                  "https://x.com/vervenovatech",
                  "https://www.instagram.com/vervenovatech"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-7380663685",
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
                "@type": "Organization",
                "name": "Verve Nova Technologies",
                "alternateName": ["VNT", "VNT Global", "Verve Nova Tech"],
                "url": "https://vervenovatech.com",
                "description": "Verve Nova Technologies specializes in enterprise software engineering, cloud systems, AI platforms, and digital transformation for businesses worldwide.",
                "areaServed": ["Global", "India"],
                "knowsAbout": ["Enterprise Software Development", "Cloud Systems", "AI Solutions", "Full-Stack Web Engineering", "Mobile Applications"]
              }
            ])
          }}
        />
        {/* Google Analytics Tag */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent('14965936414')}`}></script>
        <script
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
