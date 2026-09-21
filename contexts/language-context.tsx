'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import contentData from '@/data/content.json'

export type Locale = 'ar' | 'en'

/** محتوى الموقع النصي (عربي + إنجليزي) — مشتق من data/content.json */
export type SiteContent = (typeof contentData)['en'] | (typeof contentData)['ar']

const STORAGE_KEY = 'ashkanani-locale'

interface LanguageContextValue {
  locale: Locale
  dir: 'rtl' | 'ltr'
  isRTL: boolean
  content: SiteContent
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  /** اختيار القيمة المترجمة من بيانات الـ API: pick(player.fullNameEn, player.fullNameAr) */
  pick: <T,>(en: T, ar: T) => T
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({
  children,
  initialLocale = 'ar',
}: {
  children: ReactNode
  initialLocale?: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  // استرجاع تفضيل الزائر المحفوظ
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'ar' || saved === 'en') {
      setLocaleState(saved)
    }
  }, [])

  // تحديث اتجاه الصفحة واللغة في وسم <html>
  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = locale === 'ar' ? 'rtl' : 'ltr'
    window.localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => setLocaleState(next), [])
  const toggleLocale = useCallback(
    () => setLocaleState((current) => (current === 'ar' ? 'en' : 'ar')),
    []
  )

  const value = useMemo<LanguageContextValue>(() => {
    const content = (locale === 'ar' ? contentData.ar : contentData.en) as SiteContent
    return {
      locale,
      dir: locale === 'ar' ? 'rtl' : 'ltr',
      isRTL: locale === 'ar',
      content,
      setLocale,
      toggleLocale,
      pick: (en, ar) => (locale === 'ar' ? ar : en),
    }
  }, [locale, setLocale, toggleLocale])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}