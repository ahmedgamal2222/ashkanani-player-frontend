import type React from 'react'
import type { Metadata, Viewport } from 'next'
import { Cairo, Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'

import { LanguageProvider } from '@/contexts/language-context'
import contentData from '@/data/content.json'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ahmed-hussein.vercel.app'
const copy = contentData.ar

export const metadata: Metadata = {
  title: {
    default: copy.siteInfo.siteTitle,
    template: `%s | ${copy.siteInfo.agencyName}`,
  },
  description: copy.siteInfo.siteDescription,
  keywords: [
    'أحمد حسين خورشيد',
    'لاعب كرة قدم كويتي',
    'النادي العربي الكويتي',
    'نادي السالمية',
    'منتخب الكويت الأولمبي',
    'وكالة أشكناني للاعبين',
    'Ahmed Khoursheed',
    'Kuwait football player',
    'Salmiya SC',
    'Kuwait Olympic Team',
    'Ashkanani Players Agency',
    'football agent Kuwait',
  ],
  authors: [{ name: copy.siteInfo.agencyName }],
  creator: copy.siteInfo.agencyName,
  publisher: copy.siteInfo.agencyName,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'profile',
    locale: 'ar_KW',
    alternateLocale: ['en_US'],
    url: siteUrl,
    siteName: copy.siteInfo.agencyName,
    title: copy.siteInfo.siteTitle,
    description: copy.siteInfo.siteDescription,
    images: [
      {
        url: copy.siteInfo.playerPhoto,
        width: 1200,
        height: 1600,
        alt: 'أحمد خورشيد — وكالة أشكناني للاعبين',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: copy.siteInfo.siteTitle,
    description: copy.siteInfo.siteDescription,
    images: [copy.siteInfo.playerPhoto],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: 'https://ashkananitransfer.com/logo.png',
    apple: 'https://ashkananitransfer.com/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d1020',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${playfair.variable} ${inter.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <LanguageProvider initialLocale="ar">
          {children}
          <Toaster
            position="top-center"
            theme="dark"
            toastOptions={{
              style: {
                background: 'oklch(0.18 0.02 262)',
                border: '1px solid oklch(0.79 0.13 85 / 0.35)',
                color: 'oklch(0.97 0.01 95)',
              },
            }}
          />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}