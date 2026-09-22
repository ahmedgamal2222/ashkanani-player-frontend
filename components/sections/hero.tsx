'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, Play, ShieldCheck, Sparkles } from 'lucide-react'

import { OfficialProfileChips } from '@/components/player-links'
import { usePlayer } from '@/components/player-provider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'
import { formatMarketValue } from '@/lib/format'

export default function Hero() {
  const { content, pick, locale } = useLanguage()
  const { bundle, source } = usePlayer()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const player = bundle.player

  const quickStats = [
    { label: content.quickStats.age, value: `${player.age}`, suffix: content.quickStats.years },
    { label: content.quickStats.height, value: `${player.heightCm}`, suffix: 'cm' },
    { label: content.quickStats.weight, value: `${player.weightKg}`, suffix: 'kg' },
    { label: content.quickStats.foot, value: pick(player.preferredFootEn, player.preferredFootAr) },
    { label: content.quickStats.marketValue, value: formatMarketValue(player.marketValueUsd, locale) },
  ]

  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden pt-28 pb-16">
      {/* الخلفية */}
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={player.heroImageUrl || content.siteInfo.heroImage}
          alt=""
          aria-hidden
          className="size-full object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/92 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--gold)_0%,transparent_38%)] opacity-[0.13]" />
      </div>

      {/* رقم القميص كخلفية فنية */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 -z-10 -translate-y-1/2 font-serif text-[14rem] leading-none font-black text-white/[0.03] select-none ltr:right-[-2rem] rtl:left-[-2rem] sm:text-[26rem] lg:text-[34rem]"
      >
        {player.jerseyNumber}
      </span>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8">
        {/* المحتوى النصي */}
        <div
          className={`transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* هوية الوكالة — في المقدمة */}
          <div className="mb-6 flex items-center gap-3">
            <span className="gold-ring grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl border border-primary/40 bg-ink/60 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.siteInfo.agencyLogo}
                alt={content.siteInfo.agencyName}
                className="max-h-full max-w-full object-contain"
              />
            </span>
            <span className="flex flex-col">
              <span className="font-serif text-base font-black text-foreground sm:text-lg">
                {content.siteInfo.agencyName}
              </span>
              <span className="text-[10px] font-semibold tracking-[0.22em] text-primary/85 uppercase">
                {content.siteInfo.agencyTagline}
              </span>
            </span>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge variant="solid">
              <Sparkles className="size-3" />
              {content.hero.eyebrow}
            </Badge>
            <Badge variant="outline">{pick(player.statusEn, player.statusAr)}</Badge>
            {source === 'api' ? (
              <Badge variant="muted" title={content.common.liveData}>
                <ShieldCheck className="size-3" />
                {pick('Verified by agency', 'موثّق من الوكالة')}
              </Badge>
            ) : null}
          </div>

          <h1 className="font-serif text-[2.6rem] leading-[0.95] font-black tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block text-foreground">
              {pick(player.firstNameEn, player.firstNameAr)}
            </span>
            <span className="block text-gold-gradient">
              {pick(player.lastNameEn, player.lastNameAr)}
            </span>
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold tracking-[0.2em] text-primary/90 uppercase sm:text-base">
            <span>{pick(player.positionEn, player.positionAr)}</span>
            <span className="h-1 w-1 rounded-full bg-primary/60" />
            <span>{pick(player.secondaryPositionEn, player.secondaryPositionAr)}</span>
          </div>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base">
            {content.hero.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#contact">{content.hero.ctaPrimary}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#media" className="gap-2">
                <Play className="size-4" />
                {content.hero.ctaSecondary}
              </a>
            </Button>
          </div>

          {/* شرائط سريعة */}
          <dl className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {quickStats.map((stat) => (
              <div
                key={stat.label}
                className="glass-panel rounded-xl px-4 py-3 transition-colors duration-300 hover:border-primary/40"
              >
                <dt className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-serif text-lg font-bold text-foreground">
                  {stat.value}
                  {stat.suffix ? (
                    <span className="text-xs font-medium text-primary/80"> {stat.suffix}</span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>

          {/* الملف الرسمي على أشكناني ترانسفير ماركت */}
          <OfficialProfileChips className="mt-8" />
        </div>

        {/* بطاقة اللاعب */}
        <div
          className={`relative mx-auto w-full max-w-sm transition-all delay-200 duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-14 opacity-0'
          }`}
        >
          <div className="animate-float">
            <div className="gold-ring relative overflow-hidden rounded-[2rem] border border-primary/25 bg-card/60 p-3 backdrop-blur-md">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.6rem] bg-ink/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={player.photoUrl || content.siteInfo.playerPhoto}
                  alt={pick(player.fullNameEn, player.fullNameAr)}
                  className="size-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.24em] text-primary/90 uppercase">
                      {content.quickStats.club}
                    </p>
                    <p className="font-serif text-lg font-black text-foreground">
                      {pick(player.clubEn, player.clubAr)}
                    </p>
                    <p className="text-xs text-foreground/70">
                      {pick(player.nationalTeamEn, player.nationalTeamAr)}
                    </p>
                  </div>
                  <div className="grid size-16 shrink-0 place-items-center rounded-2xl border border-primary/40 bg-ink/70">
                    <span className="text-gold-gradient font-serif text-2xl font-black">
                      {player.jerseyNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* الشعارات: الاتحاد / النادي / المنتخب */}
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  { src: player.federationLogo, label: pick(player.federationEn, player.federationAr) },
                  { src: player.clubLogo, label: pick(player.clubEn, player.clubAr) },
                  {
                    src: player.nationalTeamLogo,
                    label: pick(player.nationalTeamEn, player.nationalTeamAr),
                  },
                ].map((logo, index) => (
                  <div
                    key={index}
                    title={logo.label}
                    className="grid aspect-square place-items-center rounded-xl border border-white/8 bg-white/4 p-2"
                  >
                    {logo.src ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={logo.src}
                        alt={logo.label}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-center text-[9px] text-muted-foreground">{logo.label}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* مؤشر التمرير */}
      <a
        href="#profile"
        className="absolute inset-x-0 bottom-6 mx-auto flex w-fit flex-col items-center gap-1 text-[10px] font-semibold tracking-[0.3em] text-foreground/50 uppercase transition-colors hover:text-primary"
      >
        {content.hero.scroll}
        <ChevronDown className="size-5 animate-bounce text-primary" />
      </a>
</section>
  )
}