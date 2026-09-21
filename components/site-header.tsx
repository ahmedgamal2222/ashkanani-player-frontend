'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import LanguageSwitcher from '@/components/language-switcher'
import { usePlayer } from '@/components/player-provider'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'
import { NAV_ITEMS } from '@/lib/site-sections'
import { cn } from '@/lib/utils'

export default function SiteHeader() {
  const { content, pick } = useLanguage()
  const { bundle } = usePlayer()
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

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

      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* الشعار + اسم اللاعب */}
        <a href="#home" className="group flex items-center gap-3">
          <span className="relative grid size-11 place-items-center overflow-hidden rounded-full border border-primary/40 bg-white/5 transition-transform duration-500 group-hover:scale-105">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bundle.player.photoUrl}
              alt={pick(bundle.player.fullNameEn, bundle.player.fullNameAr)}
              className="size-full object-cover object-top"
            />
          </span>
          <span className="hidden flex-col sm:flex">
            <span className="font-serif text-sm font-black tracking-wide text-foreground">
              {pick(bundle.player.fullNameEn, bundle.player.fullNameAr)}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/80">
              {content.siteInfo.agencyTagline}
            </span>
          </span>
        </a>

        {/* روابط سطح المكتب */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group relative rounded-full px-3 py-2 text-[13px] font-semibold text-foreground/75 transition-colors hover:text-primary"
            >
              {content.navigation[item.key]}
              <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* الإجراءات */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href="#contact">{content.navigation.agentContact}</a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? content.media.close : content.navigation.home}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* قائمة الجوال */}
      <div
        className={cn(
          'overflow-hidden border-t border-white/8 bg-ink/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden',
          menuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-foreground/85 transition-colors hover:bg-white/5 hover:text-primary"
            >
              {content.navigation[item.key]}
            </a>
          ))}
          <Button asChild className="mt-2 w-full">
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              {content.navigation.agentContact}
            </a>
          </Button>
        </nav>
      </div>
    </header>
  )
}