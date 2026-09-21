'use client'

import { ArrowUp, Instagram, Mail, MapPin, Phone } from 'lucide-react'

import { usePlayer } from '@/components/player-provider'
import { useLanguage } from '@/contexts/language-context'
import { NAV_ITEMS } from '@/lib/site-sections'

export default function SiteFooter() {
  const { content, pick } = useLanguage()
  const { bundle } = usePlayer()

  const player = bundle.player
  const phone = player.whatsappNumber
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/8 bg-ink/70 pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          {/* هوية الوكالة */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.siteInfo.agencyLogo}
                alt={content.siteInfo.agencyName}
                className="size-12 rounded-xl border border-primary/30 bg-white/5 p-1.5 object-contain"
              />
              <div>
                <p className="font-serif text-base font-black text-foreground">
                  {content.siteInfo.agencyName}
                </p>
                <p className="text-[10px] font-semibold tracking-[0.22em] text-primary/80 uppercase">
                  {content.siteInfo.agencyTagline}
                </p>
              </div>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {content.contact.agentNote}
            </p>

            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${phone ?? ''}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/5 text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Phone className="size-4" />
              </a>
              <a
                href={content.siteInfo.agencyInstagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/5 text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={content.siteInfo.agencyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={content.siteInfo.agencyName}
                className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/5 text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.3em] text-foreground/80 uppercase">
              {content.footer.quickLinks}
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {content.navigation[item.key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* بيانات التواصل */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.3em] text-foreground/80 uppercase">
              {content.contact.directTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-primary" />
                <a href={`https://wa.me/${phone ?? ''}`} className="hover:text-primary">
                  {phone ?? '—'}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <span>{player.email ?? content.siteInfo.agencyWebsite}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                <span>{pick(player.addressEn, player.addressAr)}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/8 pt-6 text-center sm:flex-row sm:text-start">
          <p className="text-xs text-muted-foreground">
            {content.footer.rights.replace('{year}', String(year))}
            <span className="mt-1 block text-[11px] text-muted-foreground/70">
              {content.footer.disclaimer}
            </span>
          </p>

          <a
            href="#home"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            <ArrowUp className="size-3.5" />
            {content.common.scrollTop}
          </a>
        </div>
      </div>
    </footer>
  )
}