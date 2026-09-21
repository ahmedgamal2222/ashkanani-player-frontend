'use client'

import { BadgeCheck, Building2, Flag, Ruler, ShieldHalf, Weight } from 'lucide-react'

import { usePlayer } from '@/components/player-provider'
import SectionHeading from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { formatDate, formatMarketValue } from '@/lib/format'
import { sectionNumber } from '@/lib/site-sections'

export default function ProfileSection() {
  const { content, pick, locale } = useLanguage()
  const { bundle } = usePlayer()

  const player = bundle.player
  const labels = content.profile.labels

  const infoRows = [
    { label: labels.fullName, value: pick(player.fullNameEn, player.fullNameAr) },
    { label: labels.dateOfBirth, value: formatDate(player.dateOfBirth, locale) },
    { label: labels.age, value: `${player.age} ${content.quickStats.years}` },
    { label: labels.height, value: `${player.heightCm} cm` },
    { label: labels.weight, value: `${player.weightKg} kg` },
    { label: labels.foot, value: pick(player.preferredFootEn, player.preferredFootAr) },
    { label: labels.gender, value: player.gender === 'Male' ? pick('Male', 'ذكر') : player.gender },
    { label: labels.nationality, value: pick(player.nationalityEn, player.nationalityAr) },
    { label: labels.position, value: pick(player.positionEn, player.positionAr) },
    {
      label: labels.secondaryPosition,
      value: pick(player.secondaryPositionEn, player.secondaryPositionAr),
    },
    { label: labels.jerseyNumber, value: `${player.jerseyNumber}` },
    { label: labels.status, value: pick(player.statusEn, player.statusAr) },
    { label: labels.marketValue, value: formatMarketValue(player.marketValueUsd, locale) },
    { label: labels.address, value: pick(player.addressEn, player.addressAr) },
  ]

  const entities = [
    {
      icon: Building2,
      label: labels.federation,
      value: pick(player.federationEn, player.federationAr),
      logo: player.federationLogo,
    },
    {
      icon: ShieldHalf,
      label: labels.club,
      value: pick(player.clubEn, player.clubAr),
      logo: player.clubLogo,
    },
    {
      icon: Flag,
      label: labels.nationalTeam,
      value: pick(player.nationalTeamEn, player.nationalTeamAr),
      logo: player.nationalTeamLogo,
    },
  ]

  const previousClubs = bundle.career.filter((entry) => entry.isCurrent === 0)

  return (
    <section id="profile" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`${sectionNumber('profile')} — ${content.navigation.profile}`}
          title={content.profile.title}
          subtitle={content.profile.subtitle}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* النبذة */}
          <Card className="overflow-hidden">
            <CardContent className="space-y-6 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full border border-primary/30 bg-primary/10">
                  <BadgeCheck className="size-5 text-primary" />
                </span>
                <h3 className="font-serif text-xl font-bold">{content.profile.bioTitle}</h3>
              </div>

              <p className="text-sm leading-8 text-foreground/80 sm:text-base sm:leading-9">
                {pick(player.bioEn, player.bioAr)}
              </p>

              <div className="flex flex-wrap items-center gap-2 border-t border-white/8 pt-5">
                <Badge variant="outline">
                  <Ruler className="size-3" /> {player.heightCm} cm
                </Badge>
                <Badge variant="outline">
                  <Weight className="size-3" /> {player.weightKg} kg
                </Badge>
                <Badge variant="default">#{player.jerseyNumber}</Badge>
                <span className="text-[11px] text-muted-foreground">
                  {content.profile.verifiedNote}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* معلومات اللاعب */}
          <Card>
            <CardContent className="p-6 sm:p-8">
              <h3 className="font-serif text-xl font-bold">{content.profile.infoTitle}</h3>
              <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-0 sm:grid-cols-2">
                {infoRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 border-b border-white/6 py-3"
                  >
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {row.label}
                    </dt>
                    <dd className="text-end text-sm font-semibold text-foreground">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>

        {/* الاتحاد / النادي / المنتخب */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {entities.map((entity) => {
            const Icon = entity.icon
            return (
              <Card key={entity.label} className="hover:-translate-y-1">
                <CardContent className="flex items-center gap-4 p-5">
                  <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1.5">
                    {entity.logo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={entity.logo}
                        alt={entity.value}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <Icon className="size-6 text-primary" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold tracking-[0.2em] text-primary/80 uppercase">
                      {entity.label}
                    </span>
                    <span className="block truncate font-serif text-base font-bold text-foreground">
                      {entity.value}
                    </span>
                  </span>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* الأندية السابقة */}
        {previousClubs.length > 0 ? (
          <div className="mt-10">
            <h4 className="text-[11px] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
              {labels.previousClubs}
            </h4>
            <div className="mt-4 flex flex-wrap gap-3">
              {previousClubs.map((club) => (
                <span
                  key={club.id}
                  className="glass-panel inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm transition-colors hover:border-primary/40"
                >
                  {club.clubLogo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={club.clubLogo} alt="" className="size-6 object-contain" />
                  ) : null}
                  <span className="font-semibold text-foreground/90">
                    {pick(club.clubEn, club.clubAr)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {club.seasonFrom}
                    {club.seasonTo ? ` – ${club.seasonTo}` : ` – ${content.career.present}`}
                  </span>
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}