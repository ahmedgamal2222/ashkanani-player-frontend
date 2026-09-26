'use client'

import { useMemo } from 'react'
import {
  Award,
  Flag,
  Goal,
  Handshake,
  Medal,
  Shirt,
  Target,
  TrendingUp,
  Trophy,
} from 'lucide-react'

import { usePlayer } from '@/components/player-provider'
import SectionHeading from '@/components/section-heading'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { sectionNumber } from '@/lib/site-sections'
import type { SeasonStat } from '@/lib/types'

/** ترتيب ظهور المراحل في الجدول */
const STAGE_ORDER: Record<string, number> = {
  u13: 1,
  u15: 2,
  u17: 3,
  u20: 4,
  first_team: 5,
  national: 6,
}

/** أيقونة معبّرة لكل مرحلة */
const STAGE_ICONS: Record<string, typeof Trophy> = {
  u13: Medal,
  u15: Award,
  u17: Target,
  u20: TrendingUp,
  first_team: Shirt,
  national: Flag,
}

export default function StatsSection() {
  const { content, pick } = useLanguage()
  const { bundle } = usePlayer()

  const stages = useMemo<SeasonStat[]>(
    () =>
      [...bundle.stats].sort(
        (a, b) => (STAGE_ORDER[a.stageKey] ?? 99) - (STAGE_ORDER[b.stageKey] ?? 99)
      ),
    [bundle.stats]
  )

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

  /** الأرقام البارزة — تُحسب من سجل المراحل */
  const highlights = useMemo(() => {
    const sum = (stageKey: string, key: 'appearances' | 'goals' | 'assists') =>
      stages
        .filter((stage) => stage.stageKey === stageKey)
        .reduce((total, stage) => total + stage[key], 0)

    return [
      {
        icon: Flag,
        value: sum('national', 'appearances'),
        label: content.stats.highlights.internationalApps,
      },
      {
        icon: Goal,
        value: sum('national', 'goals'),
        label: content.stats.highlights.internationalGoals,
      },
      { icon: Trophy, value: sum('u17', 'goals'), label: content.stats.highlights.u17Goals },
      { icon: Handshake, value: sum('u20', 'assists'), label: content.stats.highlights.u20Assists },
    ]
  }, [stages, content.stats.highlights])

  /** أعمدة الأرقام في الجدول */
  const columns = [
    { key: 'appearances', label: content.stats.summary.appearances },
    { key: 'goals', label: content.stats.summary.goals },
    { key: 'assists', label: content.stats.summary.assists },
  ] as const


  return (
    <section id="stats" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`${sectionNumber('stats')} — ${content.navigation.stats}`}
          title={content.stats.title}
          subtitle={content.stats.subtitle}
        />

        {/* الأرقام البارزة */}
        <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.label} className="text-center hover:-translate-y-1.5">
                <CardContent className="p-5 sm:p-6">
                  <span className="mx-auto grid size-11 place-items-center rounded-2xl border border-primary/30 bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </span>
                  <p className="text-gold-gradient mt-3 font-serif text-3xl font-black">
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

        {/* سجل المراحل */}
        <Card className="mt-8 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl border border-primary/30 bg-primary/10">
                  <TrendingUp className="size-5 text-primary" />
                </span>
                <h3 className="font-serif text-sm font-bold text-foreground sm:text-base">
                  {content.stats.stagesLabel}
                </h3>
              </div>
              <span className="text-[11px] text-muted-foreground sm:text-xs">
                {stages.length} {pick('stages', 'مراحل')}
              </span>
            </div>

            <div className="scroll-x">
              <table className="w-full min-w-[46rem] text-sm">
                <thead>
                  <tr className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    <th className="px-6 py-3 text-start font-semibold">{content.stats.stage}</th>
                    <th className="px-4 py-3 text-center font-semibold">{content.stats.season}</th>
                    {columns.map((column) => (
                      <th key={column.key} className="px-4 py-3 text-center font-semibold">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>

                  {stages.map((stage) => {
                    const Icon = STAGE_ICONS[stage.stageKey] ?? Trophy
                    return (
                      <tr
                        key={stage.id}
                        className="border-t border-white/6 transition-colors hover:bg-white/4"
                      >
                        <td className="px-6 py-4">
                          <span className="flex items-start gap-3">
                            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10">
                              <Icon className="size-4 text-primary" />
                            </span>
                            <span className="min-w-0">
                              <span className="block font-semibold text-foreground/95">
                                {stageLabel(stage.stageKey)}
                              </span>
                              <span className="mt-0.5 block max-w-[30rem] text-[11px] leading-relaxed text-muted-foreground">
                                {pick(stage.noteEn, stage.noteAr)}
                              </span>
                            </span>
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center text-foreground/85">{stage.season}</td>
                        {columns.map((column) => {
                          const value = stage[column.key]
                          return (
                            <td key={column.key} className="px-4 py-4 text-center">
                              {value > 0 ? (
                                <span className="font-serif text-base font-black text-primary">
                                  {value}
                                </span>
                              ) : (
                                <span className="text-muted-foreground/60">—</span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}