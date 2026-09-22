'use client'

import { BadgeCheck, ExternalLink, Instagram } from 'lucide-react'

import { usePlayer } from '@/components/player-provider'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

/** شعار ترانسفير ماركت الرسمي (SVG) */
const TRANSFERMARKT_LOGO = 'https://tmsi.akamaized.net/head/tm_logo_rebrush.svg'

/** رابط ملف اللاعب على منصة أشكناني ترانسفير ماركت */
export const ASHKANANI_CV_URL = 'https://ashkananitransfer.com/cv/978'

const linkHost = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

/**
 * شارات سريعة تظهر في المقدمة (الهيرو): شعار ترانسفير ماركت + رابط الملف الرسمي.
 */
export function OfficialProfileChips({ className }: { className?: string }) {
  const { content, pick } = useLanguage()
  const { bundle } = usePlayer()

  const url = bundle.player.transfermarktUrl || ASHKANANI_CV_URL

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title={content.links.transfermarktNote}
        className="glass-panel group inline-flex items-center gap-3 rounded-2xl px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50"
      >
        <span className="grid size-9 place-items-center rounded-xl border border-primary/30 bg-primary/10 p-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={TRANSFERMARKT_LOGO} alt="Transfermarkt" className="max-h-full max-w-full object-contain" />
        </span>
        <span className="flex flex-col text-start">
          <span className="text-[10px] font-semibold tracking-[0.2em] text-primary/90 uppercase">
            {content.links.transfermarkt}
          </span>
          <span className="text-xs font-semibold text-foreground/85">{linkHost(url)}</span>
        </span>
        <ExternalLink className="size-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>

      <a
        href={content.siteInfo.agencyWebsite}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-panel group inline-flex items-center gap-3 rounded-2xl px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50"
      >
        <span className="grid size-9 place-items-center rounded-xl border border-white/12 bg-white/5 p-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.siteInfo.agencyLogo}
            alt={content.siteInfo.agencyName}
            className="max-h-full max-w-full object-contain"
          />
        </span>
        <span className="flex flex-col text-start">
          <span className="text-[10px] font-semibold tracking-[0.2em] text-primary/90 uppercase">
            {content.links.agency}
          </span>
          <span className="text-xs font-semibold text-foreground/85">
            {linkHost(content.siteInfo.agencyWebsite)}
          </span>
        </span>
        <ExternalLink className="size-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>

      {bundle.player.instagramUrl ? (
        <a
          href={bundle.player.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={pick('Instagram', 'إنستغرام')}
          className="grid size-12 place-items-center rounded-2xl border border-white/12 bg-white/5 text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
        >
          <Instagram className="size-5" />
        </a>
      ) : null}
    </div>
  )
}

/** بطاقات الملف الرسمي — تُستخدم داخل قسم الملف الشخصي. */
export default function OfficialProfileCards({ className }: { className?: string }) {
  const { content } = useLanguage()
  const { bundle } = usePlayer()

  const url = bundle.player.transfermarktUrl || ASHKANANI_CV_URL

  const cards = [
    {
      key: 'transfermarkt',
      href: url,
      logo: TRANSFERMARKT_LOGO,
      label: content.links.transfermarkt,
      note: content.links.transfermarktNote,
      badge: content.links.verified,
      highlight: true,
    },
    {
      key: 'agency',
      href: content.siteInfo.agencyWebsite,
      logo: content.siteInfo.agencyLogo,
      label: content.links.agency,
      note: content.links.agencyNote,
      badge: null,
      highlight: false,
    },
    {
      key: 'instagram',
      href: bundle.player.instagramUrl ?? content.siteInfo.agencyInstagram,
      logo: null,
      label: content.links.instagram,
      note: content.links.instagramNote,
      badge: null,
      highlight: false,
    },
  ]

  return (
    <div className={cn('grid gap-4 sm:grid-cols-3', className)}>
      {cards.map((card) => (
        <a
          key={card.key}
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'group relative flex flex-col gap-4 overflow-hidden rounded-2xl border p-5 transition-all duration-500 hover:-translate-y-1',
            card.highlight
              ? 'gold-ring border-primary/40 bg-gradient-to-br from-primary/12 via-card/70 to-card/60'
              : 'border-white/8 bg-card/60 hover:border-primary/35'
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -end-10 -top-10 size-28 rounded-full bg-primary/10 blur-2xl"
          />

          <span className="relative flex items-center justify-between gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5 p-2">
              {card.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={card.logo} alt={card.label} className="max-h-full max-w-full object-contain" />
              ) : (
                <Instagram className="size-5 text-primary" />
              )}
            </span>
            {card.badge ? (
              <Badge>
                <BadgeCheck className="size-3" />
                {card.badge}
              </Badge>
            ) : null}
          </span>

          <span className="relative space-y-1.5">
            <span className="block font-serif text-base font-bold text-foreground">{card.label}</span>
            <span className="block text-xs leading-relaxed text-muted-foreground">{card.note}</span>
          </span>

          <span className="relative mt-auto flex items-center gap-2 text-[11px] font-semibold text-primary">
            <span className="truncate">{linkHost(card.href)}</span>
            <ExternalLink className="ms-auto size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </a>
      ))}
    </div>
  )
}
