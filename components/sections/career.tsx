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
              className="relative grid grid-cols-[auto_1fr] items-start gap-4 sm:gap-6"
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

              <Card className="w-full">
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif text-lg font-black text-foreground">
                        {pick(entry.clubEn, entry.clubAr)}
                      </h3>
                      {entry.isCurrent === 1 ? (
                        <Badge variant="solid">{content.career.current}</Badge>
                      ) : null}
                    </div>
                    <p className="text-xs tracking-wide text-muted-foreground">
                      {pick(entry.leagueEn, entry.leagueAr)}
                    </p>
                    <p className="text-xs font-semibold text-primary/90">
                      {entry.seasonFrom}
                      {entry.seasonTo ? ` — ${entry.seasonTo}` : ` — ${content.career.present}`}
                    </p>
                  </div>

                  <dl className="flex shrink-0 gap-3">
                    {[
                      { label: content.career.appearances, value: entry.appearances },
                      { label: content.career.goals, value: entry.goals },
                      { label: content.career.assists, value: entry.assists },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="min-w-16 rounded-xl border border-white/8 bg-white/4 px-3 py-2 text-center"
                      >
                        <dd className="font-serif text-lg font-black text-foreground">
                          {stat.value}
                        </dd>
                        <dt className="text-[9px] tracking-[0.14em] text-muted-foreground uppercase">
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