'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'

import type { DataSource } from '@/lib/api'
import type { Achievement, MediaItem, PlayerAttribute, PlayerBundle } from '@/lib/types'

interface PlayerContextValue {
  bundle: PlayerBundle
  /** api = بيانات مباشرة من HonoJS/D1، fallback = بيانات محلية */
  source: DataSource
  attributesByCategory: Record<PlayerAttribute['category'], PlayerAttribute[]>
  photos: MediaItem[]
  videos: MediaItem[]
  featuredMedia: MediaItem[]
  overallRating: number
  totals: {
    appearances: number
    goals: number
    assists: number
    minutes: number
    yellowCards: number
    redCards: number
    rating: number
  }
  achievementCounts: Record<Achievement['category'], number>
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined)

export function PlayerProvider({
  bundle,
  source,
  children,
}: {
  bundle: PlayerBundle
  source: DataSource
  children: ReactNode
}) {
  const value = useMemo<PlayerContextValue>(() => {
    const attributesByCategory = {
      technical: bundle.attributes.filter((item) => item.category === 'technical'),
      defensive: bundle.attributes.filter((item) => item.category === 'defensive'),
      physical: bundle.attributes.filter((item) => item.category === 'physical'),
      mental: bundle.attributes.filter((item) => item.category === 'mental'),
    }

    const overall =
      bundle.attributes.length > 0
        ? Math.round(
            bundle.attributes.reduce((sum, item) => sum + item.value, 0) / bundle.attributes.length
          )
        : 0

    const totals = bundle.stats.reduce(
      (accumulator, item) => ({
        appearances: accumulator.appearances + item.appearances,
        goals: accumulator.goals + item.goals,
        assists: accumulator.assists + item.assists,
        minutes: accumulator.minutes + item.minutes,
        yellowCards: accumulator.yellowCards + item.yellowCards,
        redCards: accumulator.redCards + item.redCards,
        rating: accumulator.rating + item.rating,
      }),
      { appearances: 0, goals: 0, assists: 0, minutes: 0, yellowCards: 0, redCards: 0, rating: 0 }
    )

    totals.rating = bundle.stats.length > 0 ? Number((totals.rating / bundle.stats.length).toFixed(2)) : 0

    const achievementCounts = {
      league: bundle.achievements.filter((item) => item.category === 'league').length,
      national: bundle.achievements.filter((item) => item.category === 'national').length,
      professional: bundle.achievements.filter((item) => item.category === 'professional').length,
      individual: bundle.achievements.filter((item) => item.category === 'individual').length,
    }

    return {
      bundle,
      source,
      attributesByCategory,
      photos: bundle.media.filter((item) => item.type === 'photo'),
      videos: bundle.media.filter((item) => item.type === 'video'),
      featuredMedia: bundle.media.filter((item) => item.featured === 1),
      overallRating: overall,
      totals,
      achievementCounts,
    }
  }, [bundle, source])

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}