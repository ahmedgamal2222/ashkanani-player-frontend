'use client'

import { useCallback, useRef, useState } from 'react'
import { Clapperboard, ExternalLink, Film, Play, Sparkles } from 'lucide-react'

import SectionHeading from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/language-context'
import { useInView } from '@/hooks/use-in-view'
import { sectionNumber } from '@/lib/site-sections'
import { cn } from '@/lib/utils'
import { SHOWREEL } from '@/lib/videos'

/**
 * قسم «أبرز اللقطات»: فيلم اللاعب داخل إطار سينمائي بهوية ذهبية.
 *
 * - الفيديو لا يُحمَّل مسبقًا إطلاقًا (`preload="none"`) — يبدأ التنزيل فقط بعد ضغط
 *   الزائر على زر التشغيل، مع مشغّل HTML5 كامل (تشغيل/إيقاف/شاشة كاملة).
 * - الحركات تتبع نفس نظام الموقع (`useInView` + `animate-pulse-gold`) وتتوقف تلقائيًا
 *   لمن يفضّل تقليل الحركة عبر قاعدة `prefers-reduced-motion` في `globals.css`.
 */
export default function ShowreelSection() {
  const { content } = useLanguage()
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  /** يبدأ الفيلم من داخل الإطار نفسه (بدل فتح نافذة جديدة) */
  const startPlayback = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    setPlaying(true)
    const attempt = video.play()
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => setPlaying(false))
    }
  }, [])

  return (
    <section id="showreel" className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* توهّج ذهبي خلفي يمنح القسم إحساسًا سينمائيًا */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 size-[34rem] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`${sectionNumber('showreel')} — ${content.navigation.showreel}`}
          title={content.showreel.title}
          subtitle={content.showreel.subtitle}
        />

        <div
          ref={ref}
          className={cn(
            'mt-12 transition-all duration-1000',
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          )}
        >
          <div className="gold-ring group relative overflow-hidden rounded-[2rem] border border-primary/25 bg-ink/70">
            <video
              ref={videoRef}
              src={SHOWREEL.src}
              poster={SHOWREEL.poster}
              preload="none"
              playsInline
              controls={playing}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              className="aspect-video w-full bg-ink object-cover"
            />

            {/* الغلاف السينمائي — يظهر حتى يضغط الزائر زر التشغيل */}
            {!playing ? (
              <button
                type="button"
                onClick={startPlayback}
                aria-label={content.showreel.play}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden px-6 text-center"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/20 transition-opacity duration-500 group-hover:opacity-80"
                />

                <span className="animate-pulse-gold relative grid size-18 place-items-center rounded-full border border-primary/50 bg-ink/70 backdrop-blur-sm transition-transform duration-500 group-hover:scale-105 sm:size-24">
                  <Play className="size-7 text-primary ltr:ms-0.5 rtl:-scale-x-100 sm:size-9" />
                </span>

                <span className="relative flex flex-col items-center gap-2">
                  <span className="font-serif text-xl font-black text-foreground sm:text-2xl">
                    {content.showreel.overlayTitle}
                  </span>
                  <span className="max-w-md text-xs leading-relaxed text-foreground/70 sm:text-sm">
                    {content.showreel.overlaySubtitle}
                  </span>
                </span>

                <Badge variant="solid" className="relative">
                  <Film className="size-3" />
                  {content.showreel.badge}
                </Badge>
              </button>
            ) : null}

            {/* شريط الإطار السفلي */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/8 bg-ink/60 px-4 py-3 sm:px-6">
              <span className="flex min-w-0 items-center gap-2 text-[11px] font-semibold text-foreground/75 sm:text-xs">
                <Clapperboard className="size-3.5 shrink-0 text-primary" />
                <span className="truncate">{content.showreel.title}</span>
              </span>

              <a
                href={SHOWREEL.src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/30 px-3.5 py-1.5 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/10 sm:text-xs"
              >
                {content.showreel.openInNewTab}
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>

          <p className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-muted-foreground sm:text-xs">
            <Sparkles className="size-3.5 text-primary" />
            {content.showreel.note}
          </p>
        </div>
      </div>
    </section>
  )
}
