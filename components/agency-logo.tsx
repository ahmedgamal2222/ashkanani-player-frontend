'use client'

import { useState } from 'react'

import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

/** شعار الوكالة المستضاف — يُستخدم تلقائيًا إذا تعذّر تحميل الملف المحلي */
const REMOTE_LOGO = 'https://ashkananitransfer.com/logo.png'

/**
 * شعار وكالة أشكناني — يُعرض **بألوانه الأصلية** مباشرة فوق الخلفية الداكنة للموقع.
 *
 * - الوضع الافتراضي: بلا خلفية وبلا إطار (الناف بار والهيرو) — تُضبط الأبعاد
 *   بارتفاع فقط عبر `className` (مثال: `h-16 sm:h-20 lg:h-24`) والصورة تحفظ
 *   نسبتها (`w-auto` + `object-contain`) فلا تتشوّه على أي مقاس.
 * - `framed`: يضع الشعار داخل صندوق داكن خفيف (الفوتر • التواصل • بطاقات الملف)
 *   كما كان معتمدًا سابقًا.
 */
const LOGO_HEIGHTS = {
  xs: 'h-8',
  sm: 'h-10',
  md: 'h-12',
  lg: 'h-16',
  xl: 'h-20',
} as const

export type AgencyLogoSize = keyof typeof LOGO_HEIGHTS

interface AgencyLogoProps {
  size?: AgencyLogoSize
  /** لتغيير الارتفاع/المقاس من موضع الاستخدام (مثال: "h-16 sm:h-20") */
  className?: string
  /** وصف بديل للصورة */
  alt?: string
  /** صندوق داكن خفيف حول الشعار (الفوتر • التواصل • بطاقات الملف) */
  framed?: boolean
}

export default function AgencyLogo({ size = 'md', className, alt, framed = false }: AgencyLogoProps) {
  const { content } = useLanguage()

  const local = content.siteInfo.agencyLogo || '/images/logo.png'
  const [src, setSrc] = useState(local)
  const label = alt ?? content.siteInfo.agencyName

  // إن تعذّر تحميل الشعار المحلي (مثلًا لم يُرفع للمستودع بعد) نرجع للشعار المستضاف
  const handleError = () => {
    if (src !== REMOTE_LOGO) setSrc(REMOTE_LOGO)
  }

  if (framed) {
    return (
      <span
        className={cn(
          'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 p-2',
          LOGO_HEIGHTS[size],
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
          decoding="async"
          onError={handleError}
        />
      </span>
    )
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={label}
      className={cn('w-auto max-w-full object-contain', LOGO_HEIGHTS[size], className)}
      loading="lazy"
      decoding="async"
      onError={handleError}
    />
  )
}
