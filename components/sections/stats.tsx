'use client'

import { useMemo, useState } from 'react'
import {
  Award,
  CalendarDays,
  Flag,
  GraduationCap,
  Handshake,
  Hash,
  Sparkles,
  Trophy,
} from 'lucide-react'

import { usePlayer } from '@/components/player-provider'
import SectionHeading from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { sectionNumber } from '@/lib/site-sections'
import type { SeasonStat } from '@/lib/types'
import { cn } from '@/lib/utils'

/** ترتيب ظهور المراحل في اللوحة */
const STAGE_ORDER: Record<string, number> = {
  u13: 1,
  u15: 2,
  u17: 3,
  u20: 4,
  first_team: 5,
  national: 6,
}

/** أيقونة لكل مرحلة */
const STAGE_ICONS: Record<string, typeof Trophy> = {
  u13: GraduationCap,
  u15: GraduationCap,
  u17: Sparkles,
  u20: Sparkles,
  first_team: Handshake,
  national: Flag,
}

export default function StatsSection() {
  const { content, pick } = useLanguage()
  const { bundle } = usePlayer()
  const [activeKey, setActiveKey] = useState<string>('')

  const stages = useMemo<SeasonStat[]>(
    () =>
      [...bundle.stats].sort(
        (a, b) => (STAGE_ORDER[a.stageKey] ?? 99) - (STAGE_ORDER[b.stageKey] ?? 99)
      ),
    [bundle.stats]
  )

  const active = stages.find((stage) => stage.stageKey === activeKey) ?? stages[0]

  /** تسميات المراحل (مترجمة) */
  const stageLabels: Record<string, string> = {
    u13: content.stats.stages.u13,
    u15: content.stats.stages.u15,
    u17: content.stats.stages.u17,
    u20: content.stats.stages.u20,
    first_team: content.stats.stages.first_team,
    national: content.stats.stages.national,
  }

  const stageLabel = (key: string) => stageLabels[key] ?? key

  /** الأرقام البارزة — تُحسب من المراحل المُبلَّغ عنها فقط */
  const highlights = useMemo(() => {
    const totals = (stageKey: string) =>
      stages
        .filter((stage) => stage.stageKey === stageKey)
        .reduce(
          (accumulator, stage) => ({
            appearances: accumulator.appearances + stage.appearances,
            goals: accumulator.goals + stage.goals,
            assists: accumulator.assists + stage.assists,
          }),
          { appearances: 0, goals: 0, assists: 0 }
        )

    const national = totals('national')
    const u17 = totals('u17')
    const u20 = totals('u20')

    return [
      {
        icon: Flag,
        value: national.appearances,
        label: content.stats.highlights.internationalApps,
      },
      { icon: Award, value: national.goals, label: content.stats.highlights.internationalGoals },
      { icon: Trophy, value: u17.goals, label: content.stats.highlights.u17Goals },
      { icon: Hash, value: u20.assists, label: content.stats.highlights.u20Assists },
    ]
  }, [stages, content.stats.highlights])

  /** أرقام المرحلة المختارة — لا تُعرض القيم الصفرية */
  const figures = useMemo(() => {
    if (!active) return []
    const entries: Array<{ label: string; value: number }> = []
    if (active.appearances > 0) {
      entries.push({ label: content.stats.summary.appearances, value: active.appearances })
    }
    if (active.goals > 0) entries.push({ label: content.stats.summary.goals, value: active.goals })
    if (active.assists > 0) {
      entries.push({ label: content.stats.summary.assists, value: active.assists })
    }
    return entries
  }, [active, content.stats.summary])


  return (
    <section id="stats" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`${sectionNumber('stats')} — ${content.navigation.stats}`}
          title={content.stats.title}
          subtitle={content.stats.subtitle}
        />

        {/* الأرقام البارزة المُبلَّغ عنها */}
        <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.label} className="text-center hover:-translate-y-1.5">
                <CardContent className="p-5">
                  <Icon className="mx-auto size-5 text-primary" />
                  <p className="text-gold-gradient mt-2 font-serif text-3xl font-black">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[10px] leading-tight tracking-[0.12em] text-muted-foreground uppercase sm:text-[11px]">
                    {item.label}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* لوحة المراحل التفاعلية */}
        <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-2">
            <p className="text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              {content.stats.chooseStage}
            </p>

            <div className="scroll-x flex gap-2 pb-1 lg:flex-col lg:pb-0">
              {stages.map((stage) => {
                const Icon = STAGE_ICONS[stage.stageKey] ?? Trophy
                const isActive = active?.id === stage.id
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveKey(stage.stageKey)}
                    aria-pressed={isActive}
                    className={cn(
                      'flex min-w-[15rem] items-center gap-3 rounded-2xl border p-3 text-start transition-all duration-300 lg:w-full lg:min-w-0',
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
                    <span className="min-w-0">
                      <span className="block truncate font-serif text-sm font-black text-foreground">
                        {stageLabel(stage.stageKey)}
                      </span>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {stage.season}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
          {active ? (
            <Card className="overflow-hidden">
              <CardContent className="space-y-5 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-2xl border border-primary/30 bg-primary/10">
                      {(() => {
                        const Icon = STAGE_ICONS[active.stageKey] ?? Trophy
                        return <Icon className="size-6 text-primary" />
                      })()}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-serif text-lg font-black text-foreground sm:text-xl">
                        {stageLabel(active.stageKey)}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {pick(active.competitionEn, active.competitionAr)}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{active.season}</Badge>
                </div>

                <p className="text-sm leading-8 text-foreground/85 sm:text-[15px] sm:leading-9">
                  {pick(active.noteEn, active.noteAr)}
                </p>
                {figures.length > 0 ? (
                  <div className="space-y-2 border-t border-white/8 pt-5">
                    <p className="text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                      {content.stats.figuresLabel}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {figures.map((figure) => (
                        <span
                          key={figure.label}
                          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-2 text-xs font-semibold text-foreground/90"
                        >
                          {figure.label}
                          <span className="font-serif text-base font-black text-primary">
                            {figure.value}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <p className="flex items-center gap-2 border-t border-white/8 pt-4 text-[11px] text-muted-foreground">
                  <CalendarDays className="size-3.5 text-primary" />
                  {content.stats.reportedNote}
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-sm text-muted-foreground sm:p-8">
                {content.stats.chooseStage}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}