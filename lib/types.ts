/**
 * أنواع البيانات المشتركة مع الـ API (HonoJS + D1).
 * مطابقة تمامًا لملف backend/src/types.ts.
 */

export interface PlayerProfile {
  id: number
  slug: string
  firstNameEn: string
  firstNameAr: string
  lastNameEn: string
  lastNameAr: string
  fullNameEn: string
  fullNameAr: string
  statusEn: string
  statusAr: string
  positionEn: string
  positionAr: string
  secondaryPositionEn: string
  secondaryPositionAr: string
  jerseyNumber: number
  age: number
  dateOfBirth: string
  heightCm: number
  weightKg: number
  preferredFootEn: string
  preferredFootAr: string
  gender: string
  nationalityEn: string
  nationalityAr: string
  marketValueUsd: number
  addressEn: string
  addressAr: string
  phone: string | null
  email: string | null
  whatsappNumber: string | null
  instagramUrl: string | null
  transfermarktUrl: string | null
  photoUrl: string
  heroImageUrl: string
  bioEn: string
  bioAr: string
  federationEn: string
  federationAr: string
  federationLogo: string | null
  clubEn: string
  clubAr: string
  clubLogo: string | null
  nationalTeamEn: string
  nationalTeamAr: string
  nationalTeamLogo: string | null
  updatedAt: string
}

export interface PlayerAttribute {
  id: number
  attrKey: string
  category: 'technical' | 'physical' | 'mental' | 'defensive'
  nameEn: string
  nameAr: string
  value: number
  sortOrder: number
}

export interface SeasonStat {
  id: number
  season: string
  competitionEn: string
  competitionAr: string
  appearances: number
  starts: number
  minutes: number
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  passAccuracy: number
  duelsWonPct: number
  rating: number
}

export interface CareerEntry {
  id: number
  clubEn: string
  clubAr: string
  clubLogo: string | null
  leagueEn: string
  leagueAr: string
  seasonFrom: string
  seasonTo: string | null
  isCurrent: number
  appearances: number
  goals: number
  assists: number
  sortOrder: number
}

export interface Achievement {
  id: number
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  category: 'league' | 'national' | 'professional' | 'individual'
  season: string
  clubEn: string | null
  clubAr: string | null
  icon: string
  sortOrder: number
}

export interface MediaItem {
  id: number
  type: 'photo' | 'video'
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  url: string
  thumbnailUrl: string
  category: 'club' | 'national' | 'match' | 'training' | 'highlights' | 'portrait'
  takenOn: string
  featured: number
  sortOrder: number
}

export interface MatchEntry {
  id: number
  matchDate: string
  competitionEn: string
  competitionAr: string
  opponentEn: string
  opponentAr: string
  homeAway: 'home' | 'away' | 'neutral'
  result: string
  minutes: number
  goals: number
  assists: number
  rating: number
  venueEn: string | null
  venueAr: string | null
  sortOrder: number
}

export interface PlayerBundle {
  player: PlayerProfile
  attributes: PlayerAttribute[]
  stats: SeasonStat[]
  career: CareerEntry[]
  achievements: Achievement[]
  media: MediaItem[]
  matches: MatchEntry[]
}

export interface ApiEnvelope<T> {
  success: boolean
  data: T
  meta?: Record<string, unknown>
  error?: { code: string; message: string; details?: unknown }
}