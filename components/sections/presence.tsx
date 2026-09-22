'use client'

import { Compass, Globe2, MapPin } from 'lucide-react'

import { ASHKANANI_CV_URL } from '@/components/player-links'
import { usePlayer } from '@/components/player-provider'
import SectionHeading from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { sectionNumber } from '@/lib/site-sections'

const SIZE = 320
const CENTER = SIZE / 2
const RADIUS = 118

/** إحداثيات الكويت — نقطة اللاعب */
const KUWAIT = { lat: 29.3759, lng: 47.9774 }

/** مركز الكرة: قريب من الكويت لتظهر أوروبا وآسيا وأفريقيا حول نقطة اللاعب */
const VIEW = { lat: 27, lng: 24 }

interface City {
  name: string
  ar: string
  lat: number
  lng: number
}

const CITIES: City[] = [
  { name: 'London', ar: 'لندن', lat: 51.5074, lng: -0.1278 },
  { name: 'Madrid', ar: 'مدريد', lat: 40.4168, lng: -3.7038 },
  { name: 'Paris', ar: 'باريس', lat: 48.8566, lng: 2.3522 },
  { name: 'Istanbul', ar: 'إستنبول', lat: 41.0082, lng: 28.9784 },
  { name: 'Cairo', ar: 'القاهرة', lat: 30.0444, lng: 31.2357 },
  { name: 'Riyadh', ar: 'الرياض', lat: 24.7136, lng: 46.6753 },
  { name: 'Doha', ar: 'الدوحة', lat: 25.2854, lng: 51.531 },
  { name: 'Dubai', ar: 'دبي', lat: 25.2048, lng: 55.2708 },
  { name: 'Mumbai', ar: 'مومباي', lat: 19.076, lng: 72.8777 },
  { name: 'Tokyo', ar: 'طوكيو', lat: 35.6762, lng: 139.6503 },
  { name: 'New York', ar: 'نيويورك', lat: 40.7128, lng: -74.006 },
]

/** إسقاط أورتوغرافي: يحوّل الإحداثيات إلى نقطة على نصف الكرة المرئي */
function project(lat: number, lng: number) {
  const rad = Math.PI / 180
  const phi = lat * rad
  const phi0 = VIEW.lat * rad
  const dLambda = (lng - VIEW.lng) * rad

  const x = CENTER + RADIUS * Math.cos(phi) * Math.sin(dLambda)
  const y =
    CENTER -
    RADIUS * (Math.cos(phi0) * Math.sin(phi) - Math.sin(phi0) * Math.cos(phi) * Math.cos(dLambda))

  return { x, y, visible: Math.hypot(x - CENTER, y - CENTER) <= RADIUS - 5 }
}

/** قوس منحنٍ يصل مدينة بالكويت */
function arc(from: { x: number; y: number }, to: { x: number; y: number }) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const length = Math.hypot(dx, dy) || 1
  const bow = length * 0.16
  const cx = (from.x + to.x) / 2 - (dy / length) * bow
  const cy = (from.y + to.y) / 2 + (dx / length) * bow

  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`
}

export default function PresenceSection() {
  const { content, pick } = useLanguage()
  const { bundle } = usePlayer()

  const kuwait = project(KUWAIT.lat, KUWAIT.lng)
  const cities = CITIES.map((city) => ({ ...city, point: project(city.lat, city.lng) })).filter(
    (city) => city.point.visible
  )

  const infoTiles = [
    { label: content.presence.labels.country, value: pick('Kuwait', KUWAIT.ar) },
    { label: content.presence.labels.region, value: content.presence.regionValue },
    { label: content.presence.labels.coordinates, value: `${KUWAIT.lat}° N · ${KUWAIT.lng}° E` },
    { label: content.presence.labels.timezone, value: 'GMT +3' },
    { label: content.presence.labels.dialCode, value: '+965' },
    { label: content.presence.labels.hemisphere, value: content.presence.hemisphereValue },
  ]

  return (
    <section id="presence" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`${sectionNumber('presence')} — ${content.navigation.presence}`}
          title={content.presence.title}
          subtitle={content.presence.subtitle}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <Card className="overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[radial-gradient(circle_at_60%_45%,oklch(0.28_0.05_258)_0%,oklch(0.12_0.02_262)_65%)]">
                <svg
                  viewBox={`0 0 ${SIZE} ${SIZE}`}
                  role="img"
                  aria-label={content.presence.mapTitle}
                  className="h-auto w-full"
                >
                  <defs>
                    <radialGradient id="globeFill" cx="45%" cy="32%" r="72%">
                      <stop offset="0%" stopColor="oklch(0.38 0.06 250)" stopOpacity="0.6" />
                      <stop offset="70%" stopColor="oklch(0.2 0.04 258)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="oklch(0.14 0.02 262)" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="oklch(0.86 0.12 88)" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="oklch(0.86 0.12 88)" stopOpacity="0" />
                    </radialGradient>
                    <clipPath id="globeClip">
                      <circle cx={CENTER} cy={CENTER} r={RADIUS} />
                    </clipPath>
                  </defs>

                  <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={RADIUS}
                    fill="url(#globeFill)"
                    stroke="oklch(0.79 0.13 85 / 0.4)"
                    strokeWidth="0.8"
                  />

                  <g clipPath="url(#globeClip)">
                    {/* خطوط الطول والعرض (إسقاط أورتوغرافي تقريبي) */}
                    <g stroke="oklch(1 0 0 / 0.07)" strokeWidth="0.5" fill="none">
                      {[20, -20, 40, -40, 60, -60].map((deg) => (
                        <ellipse
                          key={`meridian-${deg}`}
                          cx={CENTER}
                          cy={CENTER}
                          rx={RADIUS * Math.abs(Math.sin((deg * Math.PI) / 180))}
                          ry={RADIUS}
                        />
                      ))}
                      {[60, 40, 20, 0, -20, -40].map((deg) => {
                        const rad = (deg * Math.PI) / 180
                        const viewLat = (VIEW.lat * Math.PI) / 180
                        return (
                          <ellipse
                            key={`parallel-${deg}`}
                            cx={CENTER}
                            cy={CENTER - RADIUS * Math.cos(viewLat) * Math.sin(rad)}
                            rx={RADIUS * Math.cos(rad)}
                            ry={Math.max(0.4, RADIUS * Math.sin(viewLat) * Math.cos(rad))}
                          />
                        )
                      })}
                    </g>

                    {/* أقواس تصل كل سوق بالكويت */}
                    {cities.map((city) => (
                      <path
                        key={`arc-${city.name}`}
                        d={arc(city.point, kuwait)}
                        fill="none"
                        stroke="oklch(0.79 0.13 85 / 0.32)"
                        strokeWidth="0.7"
                        strokeDasharray="5 5"
                        className="animate-dash-flow"
                      />
                    ))}

                    {/* نقاط المدن */}
                    {cities.map((city) => (
                      <g key={`city-${city.name}`}>
                        <circle cx={city.point.x} cy={city.point.y} r="3.6" fill="url(#pinGlow)" />
                        <circle
                          cx={city.point.x}
                          cy={city.point.y}
                          r="1.5"
                          fill="oklch(0.9 0.1 90 / 0.95)"
                        />
                        <circle
                          cx={city.point.x}
                          cy={city.point.y}
                          r="3.2"
                          fill="none"
                          stroke="oklch(0.86 0.12 88 / 0.35)"
                          strokeWidth="0.4"
                        />
                        <text
                          x={city.point.x + 5}
                          y={city.point.y + 1.6}
                          fontSize="6.6"
                          fill="oklch(0.97 0.01 95 / 0.72)"
                          className="hidden sm:block"
                        >
                          {pick(city.name, city.ar)}
                        </text>
                      </g>
                    ))}

                    {/* مؤشر الكويت — نقطة اللاعب */}
                    <g>
                      <circle
                        cx={kuwait.x}
                        cy={kuwait.y}
                        r="20"
                        fill="url(#pinGlow)"
                        className="animate-pitch-pulse"
                      />
                      <circle
                        cx={kuwait.x}
                        cy={kuwait.y}
                        r="11"
                        fill="none"
                        stroke="oklch(0.86 0.12 88 / 0.55)"
                        strokeWidth="0.5"
                        className="animate-pitch-pulse"
                      />
                      {[
                        [-13, 0, -5, 0],
                        [5, 0, 13, 0],
                        [0, -13, 0, -5],
                        [0, 5, 0, 13],
                      ].map(([x1, y1, x2, y2]) => (
                        <line
                          key={`cross-${x1}-${y1}`}
                          x1={kuwait.x + x1}
                          y1={kuwait.y + y1}
                          x2={kuwait.x + x2}
                          y2={kuwait.y + y2}
                          stroke="oklch(0.86 0.12 88 / 0.6)"
                          strokeWidth="0.5"
                        />
                      ))}
                      <circle
                        cx={kuwait.x}
                        cy={kuwait.y}
                        r="3.4"
                        fill="oklch(0.86 0.12 88)"
                        stroke="oklch(0.14 0.02 262)"
                        strokeWidth="0.9"
                      />
                    </g>
                  </g>
                </svg>

                {/* بطاقة موقع اللاعب فوق نقطة الكويت */}
                <div
                  className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[135%] rounded-2xl border border-primary/40 bg-ink/85 px-3 py-1.5 text-center shadow-[0_18px_50px_-24px_var(--gold)] backdrop-blur-md"
                  style={{
                    left: `${(kuwait.x / SIZE) * 100}%`,
                    top: `${(kuwait.y / SIZE) * 100}%`,
                  }}
                >
                  <span className="block text-[9px] font-semibold tracking-[0.24em] text-primary/90 uppercase">
                    {content.presence.labels.playerPoint}
                  </span>
                  <span className="mt-0.5 flex items-center justify-center gap-1.5 font-serif text-sm font-black text-foreground">
                    <span aria-hidden>🇰🇼</span>
                    {pick('Kuwait', 'الكويت')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {infoTiles.map((tile) => (
                <Card key={tile.label}>
                  <CardContent className="p-5">
                    <p className="text-[10px] font-semibold tracking-[0.24em] text-primary/85 uppercase">
                      {tile.label}
                    </p>
                    <p className="mt-2 font-serif text-base font-black text-foreground">
                      {tile.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardContent className="space-y-5 p-6">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10">
                    <Globe2 className="size-5 text-primary" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground">
                      {content.presence.mapTitle}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {content.presence.mapNote}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/8 pt-5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-primary" />
                    {content.presence.legendPlayer}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-px w-6 border-t border-dashed border-primary/60" />
                    {content.presence.legendRoute}
                  </span>
                  <Badge variant="outline">
                    <Compass className="size-3" />
                    {content.presence.markets.replace('{count}', String(cities.length))}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <Button asChild className="w-full sm:w-auto">
                    <a
                      href={bundle.player.transfermarktUrl || ASHKANANI_CV_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="size-4" />
                      {content.presence.cta}
                    </a>
                  </Button>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {content.presence.legendNote}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
