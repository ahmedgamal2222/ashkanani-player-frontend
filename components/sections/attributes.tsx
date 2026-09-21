'use client'

import { useMemo } from 'react'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'

import { usePlayer } from '@/components/player-provider'
import SectionHeading from '@/components/section-heading'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { sectionNumber } from '@/lib/site-sections'
import type { PlayerAttribute } from '@/lib/types'

const RADAR_KEYS = [
  'passing',
  'ballControl',
  'vision',
  'interceptions',
  'tackling',
  'stamina',
  'workRate',
  'decisionMaking',
]

const CATEGORY_ORDER: PlayerAttribute['category'][] = [
  'technical',
  'defensive',
  'physical',
  'mental',
]

const GOLD = '#e3c264'
const GOLD_SOFT = '#f4e0a8'

export default function AttributesSection() {
  const { content, pick } = useLanguage()
  const { bundle, attributesByCategory, overallRating } = usePlayer()

  const radarData = useMemo(
    () =>
      RADAR_KEYS.map((key) => {
        const attribute = bundle.attributes.find((item) => item.attrKey === key)
        if (!attribute) return null
        return { key, label: pick(attribute.nameEn, attribute.nameAr), value: attribute.value }
      }).filter((item): item is { key: string; label: string; value: number } => item !== null),
    [bundle.attributes, pick]
  )

  return (
    <section id="attributes" className="relative bg-ink/40 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`${sectionNumber('attributes')} — ${content.navigation.attributes}`}
          title={content.attributes.title}
          subtitle={content.attributes.subtitle}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          {/* الرسم الراداري + التقييم العام */}
          <Card className="overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                    {content.attributes.overall}
                  </p>
                  <p className="text-gold-gradient font-serif text-6xl leading-none font-black">
                    {overallRating}
                  </p>
                </div>
                <div className="text-end text-xs text-muted-foreground">
                  <p>{pick('Scale 1 — 100', 'المقياس من 1 إلى 100')}</p>
                  <p>{pick('Updated by the agency', 'محدَّث من الوكالة')}</p>
                </div>
              </div>

              <div className="mt-4 h-[22rem] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="72%">
                    <PolarGrid stroke="rgba(255,255,255,0.14)" />
                    <PolarAngleAxis
                      dataKey="label"
                      tick={{ fill: 'rgba(255,255,255,0.72)', fontSize: 11 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 9 }}
                      stroke="rgba(255,255,255,0.12)"
                    />
                    <Radar
                      name={pick('Attributes', 'السمات')}
                      dataKey="value"
                      stroke={GOLD}
                      fill={GOLD}
                      fillOpacity={0.32}
                      strokeWidth={2}
                      dot={{ r: 2.5, fill: GOLD_SOFT }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* أشرطة التقييم حسب التصنيف */}
          <div className="space-y-5">
            {CATEGORY_ORDER.map((category) => {
              const items = attributesByCategory[category]
              if (items.length === 0) return null

              return (
                <Card key={category}>
                  <CardContent className="p-5 sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-serif text-base font-bold tracking-wide text-foreground uppercase">
                        {content.attributes.categories[category]}
                      </h3>
                      <span className="text-[10px] text-muted-foreground">
                        {items.length} {pick('attributes', 'سمة')}
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {items.map((attribute) => (
                        <li key={attribute.id}>
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate text-sm font-medium text-foreground/90">
                              {pick(attribute.nameEn, attribute.nameAr)}
                            </span>
                            <span className="font-serif text-sm font-bold text-primary">
                              {attribute.value}
                            </span>
                          </div>
                          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                            <span
                              className="block h-full rounded-full bg-gradient-to-r from-gold-deep via-primary to-gold-soft"
                              style={{ width: `${attribute.value}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}