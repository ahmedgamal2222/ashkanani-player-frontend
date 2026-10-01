'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Play, ShieldCheck } from 'lucide-react'

import AgencyLogo from '@/components/agency-logo'
import { OfficialProfileChips } from '@/components/player-links'
import { usePlayer } from '@/components/player-provider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'
import { formatMarketValue } from '@/lib/format'
import { cn } from '@/lib/utils'
import { HERO_FILM } from '@/lib/videos'

export default function Hero() {
  const { content, pick, locale } = useLanguage()
  const { bundle, source } = usePlayer()
  const [mounted, setMounted] = useState(false)
  const filmRef = useRef<HTMLVideoElement>(null)
  const [filmPlaying, setFilmPlaying] = useState(false)

  useEffect(() => setMounted(true), [])

  /**
   * تشغيل الفيلم الافتتاحي تلقائيًا فور فتح الصفحة: محاولة مباشرة عند التركيب،
   * وإذا منع المتصفح التشغيل التلقائي (مثل وضع الطاقة المنخفضة على الجوال) يُعاد
   * التشغيل عند أول تفاعل من الزائر (لمسة • ضغطة • مفتاح • تمرير) ثم تُزال المستمعات.
   */
  useEffect(() => {
    const video = filmRef.current
    if (!video) return

    const unlockEvents: Array<keyof WindowEventMap> = ['pointerdown', 'touchstart', 'keydown', 'scroll']

    const unlock = () => {
      void video.play().catch(() => {})
      unlockEvents.forEach((eventName) => window.removeEventListener(eventName, unlock))
    }

    void video.play().catch(() => {
      unlockEvents.forEach((eventName) => window.addEventListener(eventName, unlock, { passive: true }))
    })

    return () => unlockEvents.forEach((eventName) => window.removeEventListener(eventName, unlock))
  }, [])

  const player = bundle.player

  const quickStats = [
    { label: content.quickStats.age, value: `${player.age}`, suffix: content.quickStats.years },
    { label: content.quickStats.height, value: `${player.heightCm}`, suffix: 'cm' },
    { label: content.quickStats.weight, value: `${player.weightKg}`, suffix: 'kg' },
    { label: content.quickStats.foot, value: pick(player.preferredFootEn, player.preferredFootAr) },
    { label: content.quickStats.marketValue, value: formatMarketValue(player.marketValueUsd, locale) },
  ]

  /**
   * شعارات بطاقة اللاعب بالترتيب المعتمد: النادي العربي • نادي السالمية • منتخب الكويت الأولمبي
   * `photo: true` تعني أن الملف صورة (تُقصّ لتملأ الإطار)، و`light: true` تعني أن الشعار
   * بخلفية بيضاء (مثل شعار النادي العربي) فيُعرض فوق لوحة بيضاء أنيقة.
   */
  const playerBadges = [
    {
      src: player.federationLogo,
      label: pick(player.federationEn, player.federationAr),
      photo: false,
      light: true,
    },
    { src: player.clubLogo, label: pick(player.clubEn, player.clubAr), photo: false },
    {
      src: player.nationalTeamLogo,
      label: pick(player.nationalTeamEn, player.nationalTeamAr),
      photo: false,
    },
  ]

  return (
    <section
      id="home"
      style={{ minHeight: '100svh' }}
      className="relative isolate min-h-screen w-full max-w-full overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16"
    >
      {/* الخلفية: صورة الهيرو + الفيلم الافتتاحي (يشتغل تلقائيًا وصامتًا فور التحميل • يتكرر • بحركة تكبير بطيئة • يتلاشى للداخل عند بدء التشغيل) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={player.heroImageUrl || content.siteInfo.heroImage}
          alt=""
          aria-hidden
          className="size-full object-cover object-center opacity-45"
        />
        <video
          ref={filmRef}
          src={HERO_FILM.src}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          onPlaying={() => setFilmPlaying(true)}
          aria-hidden
          tabIndex={-1}
          className={cn(
            'absolute inset-0 size-full animate-hero-zoom object-cover object-center transition-opacity duration-1000 motion-reduce:hidden',
            filmPlaying ? 'opacity-45' : 'opacity-0'
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/90 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--gold)_0%,transparent_38%)] opacity-[0.13]" />
      </div>

      {/* رقم القميص كخلفية فنية */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 -z-10 hidden -translate-y-1/2 font-serif text-[26rem] leading-none font-black text-white/[0.03] select-none ltr:right-[-3rem] rtl:left-[-3rem] sm:block lg:text-[34rem]"
      >
        {player.jerseyNumber}
      </span>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-x-16 lg:gap-y-12 lg:px-8">
        {/* شريط الهوية: هوية الوكالة على اليسار • هوية اللاعب (الاسم والشارات) على اليمين — جنبًا إلى جنب */}
        <div
          className={cn(
            'glass-panel gold-ring relative grid gap-6 overflow-hidden rounded-[1.75rem] p-5 sm:p-6 lg:col-span-2 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-8',
            'transition-all duration-1000',
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          )}
        >
          {/* القاطع الذهبي في منتصف الشريط (يظهر على الشاشات الكبيرة) */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-8 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent lg:block"
          />

          {/* هوية الوكالة — الجهة اليسرى */}
          <div className="flex min-w-0 flex-col items-start gap-4 text-start sm:flex-row sm:items-center sm:gap-6 rtl:items-end rtl:text-end rtl:sm:flex-row-reverse lg:rtl:order-2">
            <AgencyLogo size="xl" className="h-16 sm:h-20 lg:h-24" />
            <span className="flex min-w-0 flex-col">
              <span className="font-serif text-lg font-black text-foreground sm:text-2xl">
                {content.siteInfo.agencyName}
              </span>
              <span className="mt-1.5 text-[10px] font-semibold tracking-[0.24em] text-primary/90 uppercase sm:text-[11px]">
                {content.siteInfo.agencyTagline}
              </span>
              <span
                aria-hidden
                className="mt-3 h-px w-32 bg-gradient-to-r from-primary via-primary/40 to-transparent sm:w-44 rtl:bg-gradient-to-l"
              />
            </span>
          </div>

          {/* هوية اللاعب — الجهة اليمنى */}
          <div className="min-w-0 items-start text-start ltr:items-end ltr:text-end lg:rtl:order-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="solid">
                <ShieldCheck className="size-3" />
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

            <h1 className="mt-4 font-serif text-[clamp(1.8rem,7vw,4.6rem)] leading-[1.12] font-black tracking-tight [text-wrap:balance]">
              <span className="block text-foreground">
                {pick(player.firstNameEn, player.firstNameAr)}
              </span>
              <span className="block w-fit px-0.5 pb-1 text-gold-gradient">
                {pick(player.lastNameEn, player.lastNameAr)}
              </span>
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.2em] text-primary/90 uppercase sm:text-sm">
              <span>{pick(player.positionEn, player.positionAr)}</span>
              <span className="h-1 w-1 rounded-full bg-primary/60" />
              <span>{pick(player.secondaryPositionEn, player.secondaryPositionAr)}</span>
            </div>
          </div>
        </div>
        {/* المحتوى النصي */}
        <div
          className={`w-full min-w-0 transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base">
            {content.hero.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
            <Button asChild size="lg">
              <a href="#contact">{content.hero.ctaPrimary}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#showreel" className="gap-2">
                <Play className="size-4 rtl:-scale-x-100" />
                {content.hero.ctaSecondary}
              </a>
            </Button>
          </div>

          {/* شرائط سريعة */}
          <dl className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 lg:grid-cols-5">
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
          <OfficialProfileChips className="mt-7 sm:mt-8" />
        </div>

        {/* بطاقة اللاعب */}
        <div
          className={`relative mx-auto w-full min-w-0 max-w-sm transition-all delay-200 duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-14 opacity-0'
          }`}
        >
          <div className="animate-float">
            <div className="gold-ring relative overflow-hidden rounded-[2rem] border border-primary/25 bg-card/60 p-3 backdrop-blur-md">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-ink/60 sm:aspect-[3/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={player.photoUrl || content.siteInfo.playerPhoto}
                  alt={pick(player.fullNameEn, player.fullNameAr)}
                  className="size-full object-cover object-[center_18%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

                <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 sm:inset-x-4 sm:bottom-4 sm:gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-semibold tracking-[0.24em] text-primary/90 uppercase">
                      {content.quickStats.club}
                    </p>
                    <p className="truncate font-serif text-base font-black text-foreground sm:text-lg">
                      {pick(player.clubEn, player.clubAr)}
                    </p>
                    <p className="truncate text-xs text-foreground/70">
                      {pick(player.nationalTeamEn, player.nationalTeamAr)}
                    </p>
                  </div>
                  <div className="grid size-13 shrink-0 place-items-center rounded-2xl border border-primary/40 bg-ink/70 sm:size-16">
                    <span className="text-gold-gradient font-serif text-xl font-black sm:text-2xl">
                      {player.jerseyNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* النادي العربي • نادي السالمية • منتخب الكويت الأولمبي */}
              <div className="mt-2.5 grid grid-cols-3 gap-2 sm:mt-3 sm:gap-3">
                {playerBadges.map((badge) => (
                  <div
                    key={badge.label}
                    title={badge.label}
                    className="overflow-hidden rounded-xl border border-white/8 bg-white/4 transition-colors duration-300 hover:border-primary/40"
                  >
                    <div
                      className={cn(
                        'relative grid aspect-square place-items-center',
                        badge.light ? 'bg-white p-1.5' : 'p-2'
                      )}
                    >
                      {badge.src ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={badge.src}
                          alt={badge.label}
                          className={cn(
                            'max-h-full max-w-full object-contain',
                            badge.photo && 'absolute inset-0 size-full object-cover'
                          )}
                        />
                      ) : null}
                      {badge.photo && badge.src ? (
                        <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
                      ) : null}
                    </div>
                    <span className="block truncate border-t border-white/8 bg-ink/45 px-1.5 py-1 text-center text-[9px] font-semibold text-foreground/75">
                      {badge.label}
                    </span>
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
        className="absolute inset-x-0 bottom-6 mx-auto hidden w-fit flex-col items-center gap-1 text-[10px] font-semibold tracking-[0.3em] text-foreground/50 uppercase transition-colors hover:text-primary sm:flex"
      >
        {content.hero.scroll}
        <ChevronDown className="size-5 animate-bounce text-primary" />
      </a>
</section>
  )
}