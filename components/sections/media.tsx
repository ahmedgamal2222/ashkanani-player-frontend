'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, Play, X } from 'lucide-react'

import { usePlayer } from '@/components/player-provider'
import SectionHeading from '@/components/section-heading'
import { useLanguage } from '@/contexts/language-context'
import { formatMonth } from '@/lib/format'
import { sectionNumber } from '@/lib/site-sections'
import { getYouTubeEmbedUrl } from '@/lib/video'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'photo' | 'video'

export default function MediaSection() {
  const { content, pick, locale } = useLanguage()
  const { photos, videos } = usePlayer()
  const [filter, setFilter] = useState<Filter>('all')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const items = useMemo(() => {
    if (filter === 'photo') return photos
    if (filter === 'video') return videos
    return [...photos, ...videos]
  }, [filter, photos, videos])

  const close = useCallback(() => setActiveIndex(null), [])

  const step = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((current) => {
        if (current === null || items.length === 0) return current
        return (current + direction + items.length) % items.length
      })
    },
    [items.length]
  )

  useEffect(() => {
    if (activeIndex === null) return

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [activeIndex, close, step])

  const active = activeIndex !== null ? items[activeIndex] : null

  /** روابط يوتيوب تُضمَّن داخل الصفحة، أما ملفات MP4 فتُشغَّل بمشغّل HTML5 */
  const activeEmbedUrl = active ? getYouTubeEmbedUrl(active.url) : null

  const tabs: Array<{ key: Filter; label: string; count: number }> = [
    { key: 'all', label: content.media.all, count: photos.length + videos.length },
    { key: 'photo', label: content.media.photos, count: photos.length },
    { key: 'video', label: content.media.videos, count: videos.length },
  ]

  return (
    <section id="media" className="relative bg-ink/40 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`${sectionNumber('media')} — ${content.navigation.media}`}
          title={content.media.title}
          subtitle={content.media.subtitle}
        />

        {/* شرائح التصفية */}
        <div className="mt-10 flex justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setFilter(tab.key)
                setActiveIndex(null)
              }}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold transition-all duration-300',
                filter === tab.key
                  ? 'border-primary bg-primary text-primary-foreground shadow-[0_10px_30px_-12px_var(--gold)]'
                  : 'border-white/12 bg-white/4 text-foreground/75 hover:border-primary/50 hover:text-primary'
              )}
            >
              {tab.label}
              <span className="text-[10px] opacity-70">{tab.count}</span>
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">{content.media.noPhotos}</p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item, index) => (
              <button
                key={`${item.type}-${item.id}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/8 bg-card/60 text-start transition-all duration-500 hover:border-primary/45 hover:shadow-[0_30px_80px_-40px_var(--gold)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.type === 'video' ? item.thumbnailUrl || item.url : item.url}
                  alt={pick(item.titleEn, item.titleAr)}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

                {item.type === 'video' ? (
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="animate-pulse-gold grid size-14 place-items-center rounded-full border border-primary/50 bg-ink/70 backdrop-blur-sm">
                      <Play className="size-5 text-primary ltr:ms-0.5 rtl:-scale-x-100" />
                    </span>
                  </span>
                ) : (
                  <span className="absolute top-3 grid size-8 place-items-center rounded-full border border-white/15 bg-ink/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 ltr:right-3 rtl:left-3">
                    <Expand className="size-3.5 text-primary" />
                  </span>
                )}

                <span className="absolute inset-x-3 bottom-3">
                  <span className="block truncate font-serif text-sm font-bold text-foreground">
                    {pick(item.titleEn, item.titleAr)}
                  </span>
                  <span className="block text-[10px] tracking-[0.14em] text-primary/85 uppercase">
                    {formatMonth(item.takenOn, locale)}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* نافذة العرض */}
      {active ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={close}
            aria-label={content.media.close}
            className="absolute top-5 grid size-11 place-items-center rounded-full border border-white/12 bg-white/6 text-foreground transition-colors hover:border-primary/50 hover:text-primary ltr:right-5 rtl:left-5"
          >
            <X className="size-5" />
          </button>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                aria-label={content.media.previous}
                onClick={(event) => {
                  event.stopPropagation()
                  step(-1)
                }}
                className="absolute grid size-11 place-items-center rounded-full border border-white/12 bg-white/6 text-foreground transition-colors hover:border-primary/50 hover:text-primary ltr:left-5 rtl:right-5"
              >
                <ChevronLeft className="size-5 rtl:-scale-x-100" />
              </button>
              <button
                type="button"
                aria-label={content.media.next}
                onClick={(event) => {
                  event.stopPropagation()
                  step(1)
                }}
                className="absolute grid size-11 place-items-center rounded-full border border-white/12 bg-white/6 text-foreground transition-colors hover:border-primary/50 hover:text-primary ltr:right-5 rtl:left-5"
              >
                <ChevronRight className="size-5 rtl:-scale-x-100" />
              </button>
            </>
          ) : null}

          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-primary/25 bg-card/80"
            onClick={(event) => event.stopPropagation()}
          >
            {active.type === 'video' ? (
              activeEmbedUrl ? (
                <iframe
                  key={active.id}
                  src={activeEmbedUrl}
                  title={pick(active.titleEn, active.titleAr)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="aspect-video w-full border-0 bg-ink"
                />
              ) : (
                <video
                  key={active.id}
                  src={active.url}
                  poster={active.thumbnailUrl}
                  controls
                  autoPlay
                  playsInline
                  className="aspect-video w-full bg-ink"
                >
                  {content.media.videoUnavailable}
                </video>
              )
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={active.url}
                alt={pick(active.titleEn, active.titleAr)}
                className="max-h-[72vh] w-full object-contain"
              />
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/8 px-5 py-4">
              <div>
                <h3 className="font-serif text-base font-bold text-foreground">
                  {pick(active.titleEn, active.titleAr)}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {pick(active.descriptionEn, active.descriptionAr)}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-primary">
                {activeIndex !== null ? activeIndex + 1 : 1} / {items.length}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}