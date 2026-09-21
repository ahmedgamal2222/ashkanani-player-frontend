import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ahmed-hussein.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: siteUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/#profile`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/#stats`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/#media`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/#contact`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
  ]
}