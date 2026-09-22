'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'

import LanguageSwitcher from '@/components/language-switcher'
import { usePlayer } from '@/components/player-provider'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'
import { NAV_ITEMS, type NavItem } from '@/lib/site-sections'
import { cn } from '@/lib/utils'

/** عناصر القائمة الأساسية على الشاشات الكبيرة — والبقية داخل قائمة «المزيد» */
const PRIMARY_NAV_IDS: NavItem['id'][] = [
  'home',
  'profile',
  'tactical',
  'stats',
  'career',
  'media',
  'contact',
]

export default function SiteHeader() {
  const { content, pick } = useLanguage()
  const { bundle } = usePlayer()
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  const primaryNav = useMemo(
    () => NAV_ITEMS.filter((item) => PRIMARY_NAV_IDS.includes(item.id)),
    []
  )
  const moreNav = useMemo(
    () => NAV_ITEMS.filter((item) => !PRIMARY_NAV_IDS.includes(item.id)),
    []
  )

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(scrollTop > 40)
      setProgress(height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // إغلاق قائمة «المزيد» عند النقر خارجها أو بالزر Escape
  useEffect(() => {
    if (!moreOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMoreOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [moreOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'bg-ink/85 backdrop-blur-xl shadow-[0_20px_60px_-40px_var(--gold)]' : 'bg-transparent'
      )}
    >
      {/* شريط تقدم التمرير الذهبي */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-gold-deep via-primary to-gold-soft transition-transform duration-150"
        style={{ transform: `scaleX(${progress / 100})` }}
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:h-18 sm:gap-4 sm:px-6 sm:py-3 lg:px-8">
        {/* الشعار + اسم اللاعب */}
        <a href="#home" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border border-primary/40 bg-white/5 transition-transform duration-500 group-hover:scale-105 sm:size-11">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bundle.player.photoUrl || content.siteInfo.playerPhoto}
              alt={pick(bundle.player.fullNameEn, bundle.player.fullNameAr)}
              className="size-full object-cover object-top"
            />
            <span className="absolute -end-0.5 -bottom-0.5 grid size-[1.15rem] place-items-center rounded-full border border-primary/60 bg-ink font-serif text-[9px] font-black text-primary">
              {bundle.player.jerseyNumber}
            </span>
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="max-w-[5.5rem] truncate font-serif text-[13px] font-black tracking-wide text-foreground sm:max-w-[13rem] sm:text-sm">
              {pick(bundle.player.fullNameEn, bundle.player.fullNameAr)}
            </span>
            <span className="hidden max-w-[13rem] truncate text-[10px] font-semibold tracking-[0.18em] text-primary/80 uppercase xl:block">
              {content.siteInfo.agencyTagline}
            </span>
          </span>
        </a>

        {/* روابط سطح المكتب: عناصر أساسية + قائمة «المزيد» */}
        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {primaryNav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group relative rounded-full px-2.5 py-2 text-[12.5px] font-semibold whitespace-nowrap text-foreground/75 transition-colors hover:text-primary xl:px-3 xl:text-[13px]"
            >
              {content.navigation[item.key]}
              <span className="absolute inset-x-2.5 -bottom-0.5 h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}

          {moreNav.length > 0 ? (
            <div ref={moreRef} className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((open) => !open)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-[12.5px] font-semibold whitespace-nowrap transition-colors xl:px-3 xl:text-[13px]',
                  moreOpen ? 'text-primary' : 'text-foreground/75 hover:text-primary'
                )}
              >
                {content.navigation.more}
                <ChevronDown
                  className={cn('size-3.5 transition-transform duration-300', moreOpen && 'rotate-180')}
                />
              </button>

              <div
                className={cn(
                  'glass-panel absolute start-0 top-[calc(100%+0.6rem)] z-50 min-w-52 rounded-2xl p-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.95)] transition-all duration-200',
                  moreOpen
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none -translate-y-1 opacity-0'
                )}
              >
                {moreNav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMoreOpen(false)}
                    className="block rounded-xl px-3 py-2 text-[13px] font-semibold text-foreground/80 transition-colors hover:bg-white/6 hover:text-primary"
                  >
                    {content.navigation[item.key]}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </nav>

        {/* الإجراءات */}
        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <Button asChild size="sm" className="hidden xl:inline-flex">
            <a href="#contact">{content.navigation.agentContact}</a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? content.media.close : content.navigation.menu}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* قائمة الجوال والتابلت */}
      <div
        className={cn(
          'border-t border-white/8 bg-ink/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden',
          menuOpen
            ? 'max-h-[78vh] overflow-y-auto opacity-100'
            : 'max-h-0 overflow-hidden opacity-0'
        )}
      >
        <nav className="mx-auto grid max-w-7xl grid-cols-2 gap-1.5 px-4 py-4 sm:px-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl border border-white/6 bg-white/[0.03] px-3 py-2.5 text-center text-[13px] font-semibold text-foreground/85 transition-colors hover:border-primary/30 hover:text-primary"
            >
              {content.navigation[item.key]}
            </a>
          ))}
          <Button asChild className="col-span-2 mt-1 w-full">
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              {content.navigation.agentContact}
            </a>
          </Button>
        </nav>
      </div>
    </header>
  )
}