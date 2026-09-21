/**
 * طبقة الاتصال بالـ API (HonoJS على Cloudflare Workers + D1).
 * - تجلب بيانات اللاعب كاملة من الـ API.
 * - وإذا تعذّر الاتصال (أو لم يُشغّل الـ Worker بعد) تعود تلقائيًا إلى البيانات الاحتياطية
 *   فيبقى الموقع يعمل بكامل تفاصيله.
 */
import { fallbackBundle, fallbackSeasons } from './fallback-data'
import type { ApiEnvelope, PlayerBundle, SeasonStat } from './types'

export const API_BASE_URL = (
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'http://localhost:8787'
).replace(/\/$/, '')

export const PLAYER_SLUG = process.env.NEXT_PUBLIC_PLAYER_SLUG ?? 'ahmed-hussein'

export type DataSource = 'api' | 'fallback'

export interface PlayerData {
  bundle: PlayerBundle
  source: DataSource
}

async function fetchJson<T>(path: string, revalidate = 120): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate },
    })

    if (!response.ok) return null

    const payload = (await response.json()) as ApiEnvelope<T>
    if (!payload || payload.success !== true) return null

    return payload.data
  } catch {
    // الـ API غير متاح — سيتم استخدام البيانات الاحتياطية
    return null
  }
}

/** بيانات اللاعب الكاملة (أو الاحتياطية عند فشل الاتصال). */
export async function getPlayerData(slug: string = PLAYER_SLUG): Promise<PlayerData> {
  const bundle = await fetchJson<PlayerBundle>(
    `/api/player/${encodeURIComponent(slug)}?mediaLimit=60&matchesLimit=20`,
    120
  )

  if (bundle?.player) {
    return { bundle, source: 'api' }
  }

  return { bundle: fallbackBundle, source: 'fallback' }
}

/** قائمة المواسم المتوفرة. */
export async function getSeasons(slug: string = PLAYER_SLUG): Promise<string[]> {
  const seasons = await fetchJson<string[]>(
    `/api/player/${encodeURIComponent(slug)}/seasons`,
    600
  )
  return seasons && seasons.length > 0 ? seasons : fallbackSeasons
}

/** إحصائيات موسم واحد. */
export async function getSeasonStats(
  season: string | undefined,
  slug: string = PLAYER_SLUG
): Promise<SeasonStat[]> {
  const query = season ? `?season=${encodeURIComponent(season)}` : ''
  const stats = await fetchJson<SeasonStat[]>(
    `/api/player/${encodeURIComponent(slug)}/stats${query}`,
    120
  )

  if (stats && stats.length > 0) return stats
  if (!season) return fallbackBundle.stats
  return fallbackBundle.stats.filter((item) => item.season === season)
}

// ---------------------------------------------------------------------------
// نموذج التواصل
// ---------------------------------------------------------------------------
export interface InquiryPayload {
  fullName: string
  email: string
  phone?: string
  organization?: string
  subject: string
  message: string
  locale: 'ar' | 'en'
}

export interface SubmitResult {
  ok: boolean
  message: string
}

/** إرسال رسالة للوكالة — تُحفظ داخل Cloudflare D1. */
export async function submitInquiry(payload: InquiryPayload): Promise<SubmitResult> {
  const endpoints = ['/api/inquiries', `${API_BASE_URL}/api/inquiries`]
  let lastMessage = ''

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = (await response.json()) as ApiEnvelope<{ id: number }>

      if (response.ok && result.success === true) {
        return {
          ok: true,
          message:
            payload.locale === 'ar'
              ? 'تم استلام رسالتك بنجاح، سيتواصل معك فريق الوكالة قريبًا.'
              : 'Your message has been received. The agency will contact you soon.',
        }
      }

      lastMessage =
        result.error?.message ??
        (payload.locale === 'ar'
          ? 'تعذّر إرسال الرسالة، يرجى المحاولة مرة أخرى.'
          : 'Could not send the message, please try again.')

      // خطأ في البيانات المُدخلة: لا حاجة لتجربة نقطة وصول أخرى
      if (response.status === 422) {
        return { ok: false, message: lastMessage }
      }
    } catch {
      lastMessage =
        payload.locale === 'ar'
          ? 'تعذّر الاتصال بالخادم، يمكنك التواصل عبر واتساب.'
          : 'Server unreachable — you can reach us on WhatsApp instead.'
    }
  }

  return { ok: false, message: lastMessage }
}