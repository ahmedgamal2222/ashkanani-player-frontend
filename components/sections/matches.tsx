'use client'

import { CalendarDays, MapPin } from 'lucide-react'

import { usePlayer } from '@/components/player-provider'
import SectionHeading from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { formatDate } from '@/lib/format'
import { sectionNumber } from '@/lib/site-sections'

export default function MatchesSection() {
  const { content, pick, locale } = useLanguage()
  const { bundle } = usePlayer()

  const homeAwayLabel = {
    home: content.matches.home,
    away: content.matches.away,
    neutral: content.matches.neutral,
  }

  return (
    <section id="matches" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`${sectionNumber('matches')} — ${content.navigation.matches}`}
          title={content.matches.title}
          subtitle={content.matches.subtitle}
        />

        {bundle.matches.length === 0 ? (
          <p className="mt-14 text-center text-sm text-muted-foreground">{content.matches.empty}</p>
        ) : (
          <Card className="mt-12 overflow-hidden">
            <CardContent className="p-0">
              <div className="scroll-x">
                <table className="w-full min-w-[52rem] text-sm">
                  <thead>
                    <tr className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                      <th className="px-6 py-4 text-start font-semibold">{content.matches.date}</th>
                      <th className="px-4 py-4 text-start font-semibold">
                        {content.matches.competition}
                      </th>
                      <th className="px-4 py-4 text-start font-semibold">
                        {content.matches.opponent}
                      </th>
                      <th className="px-4 py-4 text-center font-semibold">{content.matches.result}</th>
                      <th className="px-4 py-4 text-center font-semibold">
                        {content.matches.minutes}
                      </th>
                      <th className="px-4 py-4 text-center font-semibold">{content.matches.goals}</th>
                      <th className="px-4 py-4 text-center font-semibold">
                        {content.matches.assists}
                      </th>
                      <th className="px-6 py-4 text-center font-semibold">
                        {content.matches.rating}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bundle.matches.map((match) => (
                      <tr
                        key={match.id}
                        className="border-t border-white/6 transition-colors hover:bg-white/4"
                      >
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-2 text-foreground/90">
                            <CalendarDays className="size-3.5 text-primary" />
                            {formatDate(match.matchDate, locale)}
                          </span>
                          {match.venueEn || match.venueAr ? (
                            <span className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                              <MapPin className="size-3" />
                              {pick(match.venueEn ?? '', match.venueAr ?? '')}
                            </span>
                          ) : null}
                        </td>
                        <td className="px-4 py-4 text-foreground/85">
                          {pick(match.competitionEn, match.competitionAr)}
                        </td>
                        <td className="px-4 py-4">
                          <span className="flex items-center gap-2">
                            <span className="font-semibold text-foreground/95">
                              {pick(match.opponentEn, match.opponentAr)}
                            </span>
                            <Badge variant="muted" className="px-2 py-0.5 text-[9px]">
                              {homeAwayLabel[match.homeAway]}
                            </Badge>
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center font-serif font-bold text-foreground">
                          {match.result || '—'}
                        </td>
                        <td className="px-4 py-4 text-center text-foreground/85">{match.minutes}</td>
                        <td className="px-4 py-4 text-center font-semibold text-primary">
                          {match.goals}
                        </td>
                        <td className="px-4 py-4 text-center font-semibold text-primary">
                          {match.assists}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex min-w-12 justify-center rounded-full border border-primary/35 bg-primary/10 px-2 py-1 font-serif text-sm font-bold text-primary">
                            {match.rating.toFixed(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}