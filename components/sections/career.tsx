'use client'

import { Trophy } from 'lucide-react'

import { usePlayer } from '@/components/player-provider'
import SectionHeading from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { sectionNumber } from '@/lib/site-sections'

export default function CareerSection() {
  const { content, pick } = useLanguage()
  const { bundle } = usePlayer()

  return (
    <section id="career" className="relative bg-ink/40 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`${sectionNumber('career')} — ${content.navigation.career}`}
          title={content.career.title}
          subtitle={content.career.subtitle}
        />

        <ol className="relative mt-14 space-y-5 before:absolute before:inset-y-0 before:w-px before:bg-gradient-to-b before:from-transparent before:via-primary/40 before:to-transparent ltr:before:left-4 rtl:before:right-4 sm:ltr:before:left-6 sm:rtl:before:right-6">
          {bundle.career.map((entry) => (
            <li
              key={entry.id}
              className="relative grid grid-cols-[auto_1fr] items-start gap-3 sm:gap-6"
            >
              {/* علامة الخط الزمني */}
              <span className="relative z-10 mt-6 grid size-8 shrink-0 place-items-center rounded-full border border-primary/40 bg-ink sm:size-12">
                {entry.clubLogo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={entry.clubLogo} alt="" className="size-5 object-contain sm:size-7" />
                ) : (
                  <Trophy className="size-4 text-primary sm:size-5" />
                )}
              </span>

              <Card className="w-full min-w-0">
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-6">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif text-base font-black break-words text-foreground sm:text-lg">
                        {pick(entry.clubEn, entry.clubAr)}
                      </h3>
                      {entry.isCurrent === 1 ? (
                        <Badge variant="solid">{content.career.current}</Badge>
                      ) : null}
                    </div>
                    <p className="text-[11px] leading-relaxed tracking-wide text-muted-foreground sm:text-xs">
                      {pick(entry.leagueEn, entry.leagueAr)}
                    </p>
                    <p className="text-[11px] font-semibold text-primary/90 sm:text-xs">
                      {entry.seasonFrom}
                      {entry.seasonTo ? ` — ${entry.seasonTo}` : ` — ${content.career.present}`}
                    </p>
                  </div>

                  <dl className="grid w-full grid-cols-3 gap-2 sm:flex sm:w-auto sm:shrink-0 sm:gap-3">
                    {[
                      { label: content.career.appearances, value: entry.appearances },
                      { label: content.career.goals, value: entry.goals },
                      { label: content.career.assists, value: entry.assists },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="min-w-0 rounded-xl border border-white/8 bg-white/4 px-2 py-2 text-center sm:min-w-16 sm:px-3"
                      >
                        <dd className="font-serif text-base font-black text-foreground sm:text-lg">
                          {stat.value}
                        </dd>
                        <dt className="text-[8px] leading-tight tracking-[0.06em] text-muted-foreground uppercase sm:text-[9px] sm:tracking-[0.14em]">
                          {stat.label}
                        </dt>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}