'use client'

import { Languages } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'

export default function LanguageSwitcher() {
  const { locale, toggleLocale } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      aria-label={locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
      className="gap-2 border border-white/10 px-3"
    >
      <Languages className="size-4 text-primary" />
      <span className="font-semibold">{locale === 'ar' ? 'EN' : 'عربي'}</span>
    </Button>
  )
}