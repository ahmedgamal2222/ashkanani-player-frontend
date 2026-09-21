'use client'

import { Award, FileSignature, Loader, ShieldHalf, TrendingUp, Trophy } from 'lucide-react'

import { usePlayer } from '@/components/player-provider'
import SectionHeading from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { sectionNumber } from '@/lib/site-sections'
import type { Achievement } from '@/lib/types'

const ICONS: Record<string, typeof Trophy> = {
  trophy: Trophy,
  shield: ShieldHalf,
  'file-signature': FileSignature,
  'trending-up': TrendingUp,
  loader: Loader,
  award: Award,
}

export default function AchievementsSection() {
  const { content, pick } = useLanguage()
  const { bundle, achievementCounts } = usePlayer()

  const categories = (Object.keys(achievementCounts) as Achievement['category'][]).filter(
    (category) => achievementCounts[category] > 0
  )

  return (
    <section id="achievements" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`${sectionNumber('achievements')} — ${content.navigation.achievements}`}
          title={content.achievements.title}
          subtitle={content.achievements.subtitle}
        />

        {/* شرائح التصنيفات */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Badge key={category} variant="outline">
              {content.achievements.categories[category]}
              <span className="ms-1 text-primary">{achievementCounts[category]}</span>
            </Badge>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bundle.achievements.map((achievement) => {
            const Icon = ICONS[achievement.icon] ?? Trophy
            return (
              <Card key={achievement.id} className="hover:-translate-y-1.5">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <span className="grid size-12 place-items-center rounded-2xl border border-primary/30 bg-primary/10">
                    <Icon className="size-6 text-primary" />
                  </span>

                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold tracking-[0.22em] text-primary/85 uppercase">
                      {content.achievements.categories[achievement.category]}
                    </p>
                    <h3 className="font-serif text-lg font-black text-foreground">
                      {pick(achievement.titleEn, achievement.titleAr)}
                    </h3>
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-foreground/75">
                    {pick(achievement.descriptionEn, achievement.descriptionAr)}
                  </p>

                  <div className="flex items-center justify-between border-t border-white/8 pt-4 text-[11px] text-muted-foreground">
                    <span className="font-semibold text-primary/90">{achievement.season}</span>
                    {achievement.clubEn || achievement.clubAr ? (
                      <span className="truncate text-end">
                        {pick(achievement.clubEn ?? '', achievement.clubAr ?? '')}
                      </span>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}