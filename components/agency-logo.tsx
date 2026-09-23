'use client'

import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

/**
 * لوح شعار وكالة أشكناني — شكل موحّد واحترافي في كل مواضع الموقع.
 *
 * ملاحظات مهمة:
 *  - ملف الشعار `/images/logo.png` عريض (نسبة تقارب 2:1)، لذلك يُعرض على «لوح»
 *    بخلفية فاتحة (أبيض/عاجي) حتى تندمج خلفية الشعار الفاتحة مع اللوح بلا إطار ظاهر،
 *    ويظهر التاج الذهبي وحروف ASM بتفاصيلها كاملة.
 *  - الارتفاع هو المتحكّم: الصورة تأخذ ارتفاع اللوح كاملًا وبعرض تلقائي (`h-full w-auto`
 *    + `object-contain`) فلا تتشوّه على أي مقاس (جوال/تابلت/لابتوب).
 *  - لتكبير/تصغير الشعار في أي موضع: مرّر صنف ارتفاع عبر `className`
 *    (مثال: `className="h-16 sm:h-20 lg:h-24"`) — والمقاسات الجاهزة: xs → xl.
 */
const PLATE_SIZES = {
  xs: 'h-9 rounded-xl px-2 py-1.5',
  sm: 'h-11 rounded-xl px-2.5 py-2 sm:h-12',
  md: 'h-14 rounded-2xl px-3 py-2.5',
  lg: 'h-16 rounded-2xl px-3.5 py-3 sm:h-20',
  xl: 'h-20 rounded-[1.5rem] px-4 py-3 sm:h-24 sm:px-5 sm:py-4 lg:h-28',
} as const

export type AgencyLogoSize = keyof typeof PLATE_SIZES

interface AgencyLogoProps {
  size?: AgencyLogoSize
  /** لتغيير الارتفاع من موضع الاستخدام (مثال: "h-16 sm:h-20") */
  className?: string
  /** وصف بديل للصورة */
  alt?: string
  /** هالة ذهبية نابضة حول اللوح */
  halo?: boolean
  /** لمعان ذهبي يمرّ على اللوح */
  animated?: boolean
}

export default function AgencyLogo({
  size = 'md',
  className,
  alt,
  halo = false,
  animated = true,
}: AgencyLogoProps) {
  const { content } = useLanguage()

  return (
    <span className="relative inline-flex shrink-0">
      {halo ? (
        <span
          aria-hidden
          className="animate-pulse-gold pointer-events-none absolute -inset-2 rounded-[1.9rem] border border-primary/35"
        />
      ) : null}

      <span
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden border border-primary/45',
          'bg-gradient-to-br from-white via-[#FFFDF6] to-[#F3E7CD]',
          'shadow-[0_0_0_1px_oklch(0.79_0.13_85/0.35),0_14px_36px_-18px_oklch(0.79_0.13_85/0.85),0_0_48px_-14px_oklch(0.79_0.13_85/0.45)]',
          'transition-transform duration-500 group-hover:scale-[1.03]',
          PLATE_SIZES[size],
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={content.siteInfo.agencyLogo || '/images/logo.png'}
          alt={alt ?? content.siteInfo.agencyName}
          className="h-full w-auto max-w-full object-contain"
          loading="lazy"
          decoding="async"
        />

        {animated ? <span aria-hidden className="brand-sheen" /> : null}

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.65),inset_0_-10px_18px_-14px_oklch(0.62_0.12_78/0.55)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-2 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
        />
      </span>
    </span>
  )
}
