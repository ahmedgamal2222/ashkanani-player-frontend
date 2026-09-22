'use client'

import { useMemo, useState } from 'react'
import { CalendarDays, Target, Timer } from 'lucide-react'

import { usePlayer } from '@/components/player-provider'
import SectionHeading from '@/components/section-heading'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { sectionNumber } from '@/lib/site-sections'
import { cn } from '@/lib/utils'

interface StatsSectionProps {
  seasons: string[]
}

export default function StatsSection({ seasons }: StatsSectionProps) {
  const { content, pick } = useLanguage()
  const { bundle, totals } = usePlayer()
  const [selectedSeason, setSelectedSeason] = useState<string>('all')

  const seasonStats = useMemo(
    () =>
      selectedSeason === 'all'
        ? bundle.stats
        : bundle.stats.filter((item) => item.season === selectedSeason),
    [bundle.stats, selectedSeason]
  )

  const summary = useMemo(() => {
    const initial = {
      appearances: 0,
      starts: 0,
      minutes: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      passAccuracy: 0,
      duelsWonPct: 0,
      rating: 0,
      count: 0,
    }

    const aggregated = seasonStats.reduce(
      (accumulator, item) => ({
        appearances: accumulator.appearances + item.appearances,
        starts: accumulator.starts + item.starts,
        minutes: accumulator.minutes + item.minutes,
        goals: accumulator.goals + item.goals,
        assists: accumulator.assists + item.assists,
        yellowCards: accumulator.yellowCards + item.yellowCards,
        redCards: accumulator.redCards + item.redCards,
        passAccuracy: accumulator.passAccuracy + item.passAccuracy,
        duelsWonPct: accumulator.duelsWonPct + item.duelsWonPct,
        rating: accumulator.rating + item.rating,
        count: accumulator.count + 1,
      }),
      initial
    )

    const divisor = Math.max(1, aggregated.count)
    return {
      ...aggregated,
      passAccuracy: Number((aggregated.passAccuracy / divisor).toFixed(1)),
      duelsWonPct: Number((aggregated.duelsWonPct / divisor).toFixed(1)),
      rating: Number((aggregated.rating / divisor).toFixed(2)),
    }
  }, [seasonStats])

  const cards = [
    { label: content.stats.summary.appearances, value: summary.appearances },
    { label: content.stats.summary.starts, value: summary.starts },
    { label: content.stats.summary.minutes, value: summary.minutes },
    { label: content.stats.summary.goals, value: summary.goals, accent: true },
    { label: content.stats.summary.assists, value: summary.assists, accent: true },
    { label: content.stats.summary.passAccuracy, value: `${summary.passAccuracy}%` },
    { label: content.stats.summary.duelsWon, value: `${summary.duelsWonPct}%` },
    { label: content.stats.summary.rating, value: summary.rating },
  ]

  const overview = [
    {
      icon: CalendarDays,
      label: content.stats.summary.appearances,
      value: `${totals.appearances}`,
    },
    { icon: Target, label: content.stats.summary.goals, value: `${totals.goals}` },
    { icon: Timer, label: content.stats.summary.minutes, value: `${totals.minutes}` },
  ]

  const seasonOptions = ['all', ...seasons]

  return (
    <section id="stats" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`${sectionNumber('stats')} — ${content.navigation.stats}`}
          title={content.stats.title}
          subtitle={content.stats.subtitle}
        />

        {/* ملخّص المسيرة + اختيار الموسم */}
        <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid grid-cols-3 gap-3">
            {overview.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="glass-panel rounded-2xl px-4 py-3 text-center">
                  <Icon className="mx-auto size-4 text-primary" />
                  <p className="mt-1 font-serif text-xl font-black text-foreground">{item.value}</p>
                  <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    {item.label}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="me-1 text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              {content.stats.season}
            </span>
            {seasonOptions.map((season) => (
              <button
                key={season}
                type="button"
                onClick={() => setSelectedSeason(season)}
                className={cn(
                  'rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300',
                  selectedSeason === season
                    ? 'border-primary bg-primary text-primary-foreground shadow-[0_10px_30px_-12px_var(--gold)]'
                    : 'border-white/12 bg-white/4 text-foreground/75 hover:border-primary/50 hover:text-primary'
                )}
              >
                {season === 'all' ? content.stats.allSeasons : season}
              </button>
            ))}
          </div>
        </div>
{/* بطاقات الملخص */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {cards.map((card) => (
            <Card key={card.label} className="text-center">
              <CardContent className="p-4">
                <p
                  className={cn(
                    'font-serif text-2xl font-black',
                    card.accent ? 'text-gold-gradient' : 'text-foreground'
                  )}
                >
                  {card.value}
                </p>
                <p className="mt-1 text-[10px] leading-tight tracking-[0.14em] text-muted-foreground uppercase">
                  {card.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* جدول المسابقات */}
        <Card className="mt-8 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between gap-4 border-b border-white/8 px-6 py-4">
              <h3 className="font-serif text-base font-bold">{content.stats.tableCaption}</h3>
              <span className="text-xs text-muted-foreground">
                {seasonStats.length} {pick('competitions', 'مسابقات')}
              </span>
            </div>

            <div className="scroll-x">
              <table className="w-full min-w-[46rem] text-sm">
                <thead>
                  <tr className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    <th className="px-6 py-3 text-start font-semibold">
                      {content.stats.competition}
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      {content.stats.summary.appearances}
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      {content.stats.summary.goals}
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      {content.stats.summary.assists}
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      {content.stats.summary.minutes}
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      {content.stats.summary.passAccuracy}
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      {content.stats.summary.duelsWon}
                    </th>
                    <th className="px-6 py-3 text-center font-semibold">
                      {content.stats.summary.rating}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {seasonStats.map((row) => (
                    <tr
                      key={row.id}
                      className="border-t border-white/6 transition-colors hover:bg-white/4"
                    >
                      <td className="px-6 py-4">
                        <span className="block font-semibold text-foreground/95">
                          {pick(row.competitionEn, row.competitionAr)}
                        </span>
                        <span className="text-[11px] text-muted-foreground">{row.season}</span>
                      </td>
                      <td className="px-4 py-4 text-center font-semibold">{row.appearances}</td>
                      <td className="px-4 py-4 text-center font-semibold text-primary">{row.goals}</td>
                      <td className="px-4 py-4 text-center font-semibold text-primary">
                        {row.assists}
                      </td>
                      <td className="px-4 py-4 text-center text-foreground/85">{row.minutes}</td>
                      <td className="px-4 py-4 text-center text-foreground/85">
                        {row.passAccuracy}%
                      </td>
                      <td className="px-4 py-4 text-center text-foreground/85">
                        {row.duelsWonPct}%
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex min-w-12 justify-center rounded-full border border-primary/35 bg-primary/10 px-2 py-1 font-serif text-sm font-bold text-primary">
                          {row.rating.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}