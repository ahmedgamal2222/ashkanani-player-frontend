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

/** خريطة العالم الحقيقية — إسقاط متساوي المستطيلات (2:1) من ويكيميديا كومنز */
const MAP_URL =
  'https://commons.wikimedia.org/wiki/Special:FilePath/BlankMap-World-Equirectangular.svg?width=1920'

/** أبعاد الخريطة بوحدات الـ SVG: 360° خط طول × 180° خط عرض */
const WORLD_W = 360
const WORLD_H = 180

/** إحداثيات الكويت — نقطة اللاعب */
const KUWAIT = { lat: 29.3759, lng: 47.9774, ar: 'الكويت', en: 'Kuwait' }

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

/** إسقاط متساوي المستطيلات: خط الطول → x، خط العرض → y (مطابق لأبعاد الخريطة) */
function toPoint(lat: number, lng: number) {
  return { x: lng + WORLD_W / 2, y: WORLD_H / 2 - lat }
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

  const kuwait = toPoint(KUWAIT.lat, KUWAIT.lng)
  const cities = CITIES.map((city) => ({ ...city, point: toPoint(city.lat, city.lng) }))

  const infoTiles = [
    { label: content.presence.labels.country, value: pick(KUWAIT.en, KUWAIT.ar) },
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
              <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-white/8 bg-[linear-gradient(180deg,oklch(0.17_0.03_258)_0%,oklch(0.1_0.02_262)_100%)]">
                {/* خريطة العالم الحقيقية — تُلوَّن بالذهبي عبر قناة شفافية الخريطة (mask) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_40%,oklch(0.92_0.1_88/0.5)_0%,oklch(0.78_0.12_86/0.26)_45%,oklch(0.5_0.1_86/0.06)_78%,transparent_100%)]"
                  style={{
                    maskImage: `url("${MAP_URL}")`,
                    WebkitMaskImage: `url("${MAP_URL}")`,
                    maskSize: '100% 100%',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-primary/20 blur-[2px]"
                  style={{
                    maskImage: `url("${MAP_URL}")`,
                    WebkitMaskImage: `url("${MAP_URL}")`,
                    maskSize: '100% 100%',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                  }}
                />

                <svg
                  viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}
                  preserveAspectRatio="none"
                  role="img"
                  aria-label={content.presence.mapTitle}
                  className="absolute inset-0 size-full"
                >
                  <defs>
                    <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="oklch(0.86 0.12 88)" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="oklch(0.86 0.12 88)" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* شبكة خطوط الطول والعرض */}
                  <g stroke="oklch(1 0 0 / 0.06)" strokeWidth="0.3" strokeDasharray="1.6 2.6">
                    {[-150, -120, -90, -60, -30, 30, 60, 90, 120, 150].map((lng) => (
                      <line
                        key={`meridian-${lng}`}
                        x1={lng + WORLD_W / 2}
                        y1="0"
                        x2={lng + WORLD_W / 2}
                        y2={WORLD_H}
                      />
                    ))}
                    {[-60, -30, 60].map((lat) => (
                      <line
                        key={`parallel-${lat}`}
                        x1="0"
                        y1={WORLD_H / 2 - lat}
                        x2={WORLD_W}
                        y2={WORLD_H / 2 - lat}
                      />
                    ))}
                  </g>
                  <line
                    x1="0"
                    y1={WORLD_H / 2}
                    x2={WORLD_W}
                    y2={WORLD_H / 2}
                    stroke="oklch(0.79 0.13 85 / 0.22)"
                    strokeWidth="0.35"
                  />

                  {/* أقواس تصل كل سوق بالكويت */}
                  {cities.map((city) => (
                    <path
                      key={`arc-${city.name}`}
                      d={arc(city.point, kuwait)}
                      fill="none"
                      stroke="oklch(0.79 0.13 85 / 0.42)"
                      strokeWidth="0.45"
                      strokeDasharray="3 3"
                      className="animate-dash-flow"
                    />
                  ))}

                  {/* نقاط المدن وأسماؤها */}
                  {cities.map((city) => (
                    <g key={`city-${city.name}`}>
                      <circle cx={city.point.x} cy={city.point.y} r="3.2" fill="url(#pinGlow)" />
                      <circle
                        cx={city.point.x}
                        cy={city.point.y}
                        r="1.2"
                        fill="oklch(0.95 0.06 90 / 0.95)"
                      />
                      <circle
                        cx={city.point.x}
                        cy={city.point.y}
                        r="2.3"
                        fill="none"
                        stroke="oklch(0.86 0.12 88 / 0.4)"
                        strokeWidth="0.3"
                      />
                      <text
                        x={city.point.x + 3.4}
                        y={city.point.y + 1.2}
                        fontSize="3.4"
                        fontWeight="600"
                        fill="oklch(0.97 0.01 95 / 0.75)"
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
                      r="14"
                      fill="url(#pinGlow)"
                      className="animate-pitch-pulse"
                    />
                    <circle
                      cx={kuwait.x}
                      cy={kuwait.y}
                      r="7"
                      fill="none"
                      stroke="oklch(0.86 0.12 88 / 0.6)"
                      strokeWidth="0.35"
                      className="animate-pitch-pulse"
                    />
                    <line
                      x1={kuwait.x}
                      y1={kuwait.y - 3.5}
                      x2={kuwait.x}
                      y2={kuwait.y - 13}
                      stroke="oklch(0.86 0.12 88 / 0.5)"
                      strokeWidth="0.3"
                    />
                    <circle
                      cx={kuwait.x}
                      cy={kuwait.y}
                      r="2.2"
                      fill="oklch(0.86 0.12 88)"
                      stroke="oklch(0.12 0.02 262)"
                      strokeWidth="0.6"
                    />
                  </g>
                </svg>

                {/* بطاقة موقع اللاعب فوق نقطة الكويت */}
                <div
                  className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[155%] rounded-2xl border border-primary/45 bg-ink/90 px-3 py-1.5 text-center shadow-[0_18px_50px_-20px_var(--gold)] backdrop-blur-md"
                  style={{
                    left: `${(kuwait.x / WORLD_W) * 100}%`,
                    top: `${(kuwait.y / WORLD_H) * 100}%`,
                  }}
                >
                  <span className="block text-[9px] font-semibold tracking-[0.24em] text-primary/90 uppercase">
                    {content.presence.labels.playerPoint}
                  </span>
                  <span className="mt-0.5 flex items-center justify-center gap-1.5 font-serif text-sm font-black text-foreground">
                    <span aria-hidden>🇰🇼</span>
                    {pick(KUWAIT.en, KUWAIT.ar)}
                  </span>
                </div>

                {/* مرجع الإسقاط */}
                <span className="pointer-events-none absolute bottom-2 start-3 text-[9px] font-medium tracking-[0.18em] text-foreground/35 uppercase">
                  Equirectangular · 2:1
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
