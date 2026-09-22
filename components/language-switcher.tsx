'use client'

import { Languages } from 'lucide-react'

import { useLanguage, type Locale } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

const OPTIONS: Array<{ value: Locale; label: string }> = [
  { value: 'ar', label: 'عربي' },
  { value: 'en', label: 'EN' },
]

/** مبدّل لغة مدمج (شريحة بنمط Segmented) — يعمل على الجوال وسطح المكتب. */
export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage()

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        'inline-flex shrink-0 items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-0.5',
        className
      )}
    >
      <Languages className="mx-1 size-3.5 text-primary/80" />
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setLocale(option.value)}
          aria-pressed={locale === option.value}
          className={cn(
            'rounded-full px-2 py-1 text-[11px] leading-none font-bold transition-colors',
            locale === option.value
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground/70 hover:text-primary'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}