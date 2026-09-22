import { getPlayerData, getSeasons } from '@/lib/api'
import { isSectionVisible } from '@/lib/site-sections'
import { PlayerProvider } from '@/components/player-provider'
import SiteHeader from '@/components/site-header'
import AchievementsSection from '@/components/sections/achievements'
import AttributesSection from '@/components/sections/attributes'
import CareerSection from '@/components/sections/career'
import ContactSection from '@/components/sections/contact'
import SiteFooter from '@/components/sections/footer'
import Hero from '@/components/sections/hero'
import MatchesSection from '@/components/sections/matches'
import MediaSection from '@/components/sections/media'
import PresenceSection from '@/components/sections/presence'
import ProfileSection from '@/components/sections/profile'
import StatsSection from '@/components/sections/stats'
import TacticalSection from '@/components/sections/tactical'

export const revalidate = 120

export default async function HomePage() {
  const { bundle, source } = await getPlayerData()
  const seasons = await getSeasons()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: bundle.player.fullNameAr,
    alternateName: bundle.player.fullNameEn,
    jobTitle: `${bundle.player.positionAr} / ${bundle.player.secondaryPositionAr}`,
    nationality: bundle.player.nationalityAr,
    height: `${bundle.player.heightCm} cm`,
    weight: `${bundle.player.weightKg} kg`,
    birthDate: bundle.player.dateOfBirth,
    description: bundle.player.bioAr,
    image: bundle.player.photoUrl,
    memberOf: [
      { '@type': 'SportsTeam', name: bundle.player.clubAr },
      { '@type': 'SportsTeam', name: bundle.player.nationalTeamAr },
    ],
    affiliation: { '@type': 'Organization', name: 'وكالة أشكناني للاعبين' },
    knowsAbout: ['كرة القدم', 'لاعب وسط', 'الدوري الكويتي الممتاز'],
    sameAs: [bundle.player.transfermarktUrl, bundle.player.instagramUrl].filter(
      (value): value is string => Boolean(value)
    ),
  }

  return (
    <PlayerProvider bundle={bundle} source={source}>
      <SiteHeader />
      <main className="relative overflow-hidden">
        <Hero />
        <ProfileSection />
        {/* سمات اللاعب مخفية مؤقتًا — لإعادة إظهارها أزل 'attributes' من HIDDEN_SECTIONS في lib/site-sections.ts */}
        {isSectionVisible('attributes') ? <AttributesSection /> : null}
        {isSectionVisible('tactical') ? <TacticalSection /> : null}
        <StatsSection seasons={seasons} />
        <CareerSection />
        {isSectionVisible('presence') ? <PresenceSection /> : null}
        <AchievementsSection />
        <MediaSection />
        <MatchesSection />
        <ContactSection />
      </main>
      <SiteFooter />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </PlayerProvider>
  )
}