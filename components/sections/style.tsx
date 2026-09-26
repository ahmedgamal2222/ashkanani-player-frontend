'use client'

import { useEffect, useState } from 'react'
import { Crown, Layers, Repeat, ShieldCheck, Target } from 'lucide-react'

import SectionHeading from '@/components/section-heading'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { sectionNumber } from '@/lib/site-sections'
import { cn } from '@/lib/utils'

/** أيقونة لكل مرحلة من مراحل اللعب (المفاتيح تأتي من data/content.json) */
const PHASE_ICONS: Record<string, typeof Layers> = {
  build: Layers,
  circulate: Repeat,
  press: ShieldCheck,
  final: Target,
  lead: Crown,
}

/** المدة بين كل انتقال تلقائي (بالملي ثانية) */
const AUTO_ADVANCE_MS = 7000

/**
 * لوحة «أسلوب اللعب» — قسم تفاعلي بلا أرقام:
 * يختار الزائر مرحلة من مراحل اللعب فيتغيّر الشرح والسمات المرتبطة،
 * مع انتقال تلقائي يتوقف فور أي تفاعل من الزائر.
 */
export default function StyleSection() {
  const { content } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const phases = content.style.phases

  useEffect(() => {
    if (!autoPlay || phases.length < 2) return
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % phases.length)
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(timer)
  }, [autoPlay, phases.length])

  const selectPhase = (index: number) => {
    setActiveIndex(index)
    setAutoPlay(false)
  }

  const active = phases[activeIndex] ?? phases[0]
  if (!active) return null

  const ActiveIcon = PHASE_ICONS[active.icon] ?? Layers

  return (
    <section id="style" className="relative bg-ink/40 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`${sectionNumber('style')} — ${content.navigation.style}`}
          title={content.style.title}
          subtitle={content.style.subtitle}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* مراحل اللعب — أزرار تفاعلية */}
          <div className="scroll-x flex gap-2 pb-1 lg:flex-col lg:gap-3 lg:pb-0">
            {phases.map((phase, index) => {
              const Icon = PHASE_ICONS[phase.icon] ?? Layers
              const isActive = index === activeIndex
              return (
                <button
                  key={phase.title}
                  type="button"
                  onClick={() => selectPhase(index)}
                  aria-pressed={isActive}
                  className={cn(
                    'flex min-w-[16rem] items-center gap-3 rounded-2xl border p-3 text-start transition-all duration-300 lg:w-full lg:min-w-0 lg:p-4',
                    isActive
                      ? 'border-primary/60 bg-primary/12 shadow-[0_18px_45px_-24px_var(--gold)]'
                      : 'border-white/10 bg-white/4 hover:border-primary/40 hover:bg-white/6'
                  )}
                >
                  <span
                    className={cn(
                      'grid size-11 shrink-0 place-items-center rounded-xl border transition-colors',
                      isActive ? 'border-primary/50 bg-primary/15' : 'border-white/10 bg-white/5'
                    )}
                  >
                    <Icon className="size-5 text-primary" />
                  </span>
                  <span className="min-w-0 font-serif text-sm font-black text-foreground">
                    {phase.title}
                  </span>
                </button>
              )
            })}
          </div>

          {/* تفاصيل المرحلة المختارة */}
          <Card className="relative overflow-hidden">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-24 size-64 rounded-full bg-primary/12 blur-3xl ltr:-right-24 rtl:-left-24"
            />
            <CardContent className="relative space-y-6 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-primary/35 bg-primary/12">
                  <ActiveIcon className="size-7 text-primary" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-[0.24em] text-primary/85 uppercase">
                    {content.navigation.style}
                  </p>
                  <h3 className="font-serif text-xl font-black text-foreground sm:text-2xl">
                    {active.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm leading-8 text-foreground/85 sm:text-base sm:leading-9">
                {active.text}
              </p>

              <div className="space-y-3 border-t border-white/8 pt-5">
                <p className="text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                  {content.style.tagsLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 text-[11px] font-semibold text-foreground/85"
                    >
                      <span className="size-1.5 rounded-full bg-primary" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* مؤشرات التنقل بين المراحل */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {phases.map((phase, index) => (
            <button
              key={phase.title}
              type="button"
              aria-label={phase.title}
              onClick={() => selectPhase(index)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                index === activeIndex ? 'w-10 bg-primary' : 'w-3 bg-white/15 hover:bg-primary/50'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
