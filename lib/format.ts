import type { Locale } from '@/contexts/language-context'

const localeMap: Record<Locale, string> = {
  ar: 'ar-KW',
  en: 'en-GB',
}

/** تنسيق رقم بفواصل الآلاف (للقيم المالية والأرقام الكبيرة). */
export function formatNumber(value: number, locale: Locale = 'ar'): string {
  return new Intl.NumberFormat(localeMap[locale] ?? 'en-GB').format(value)
}

/** القيمة السوقية بصيغة مناسبة: $500K / 500 ألف دولار. */
export function formatMarketValue(valueUsd: number, locale: Locale = 'ar'): string {
  const compact = new Intl.NumberFormat(localeMap[locale] ?? 'en-GB', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(valueUsd)
  return `$${compact}`
}

/** تاريخ مقروء: 2025-04-12 → 12 أبريل 2025 / 12 Apr 2025. */
export function formatDate(value: string, locale: Locale = 'ar'): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat(localeMap[locale] ?? 'en-GB', {
    year: 'numeric',
    month: locale === 'ar' ? 'long' : 'short',
    day: 'numeric',
  }).format(date)
}

/** الشهر/السنة للصور: 2025-01 → يناير 2025 / Jan 2025. */
export function formatMonth(value: string, locale: Locale = 'ar'): string {
  if (!/^\d{4}-\d{2}$/.test(value)) return value

  const date = new Date(`${value}-01T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat(localeMap[locale] ?? 'en-GB', {
    year: 'numeric',
    month: locale === 'ar' ? 'long' : 'short',
    timeZone: 'UTC',
  }).format(date)
}

/** تحويل 1710 دقيقة → 28:30 (ساعات:دقائق) بجانب القيمة الأصلية. */
export function formatMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours}:${String(minutes).padStart(2, '0')}`
}

/** أول حرفين للاستخدام في الأفاتار. */
export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
}