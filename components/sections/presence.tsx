'use client'

import { useState } from 'react'
import { Compass, Globe2, MapPin, Ruler, ZoomIn, ZoomOut } from 'lucide-react'

import KuwaitFlag from '@/components/kuwait-flag'
import { ASHKANANI_CV_URL } from '@/components/player-links'
import { usePlayer } from '@/components/player-provider'
import SectionHeading from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
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

/** المسافة الجوية الفعلية بالكيلومترات (معادلة هافرساين) */
function distanceKm(from: { lat: number; lng: number }, to: { lat: number; lng: number }) {
  const R = 6371
  const rad = (value: number) => (value * Math.PI) / 180
  const dLat = rad(to.lat - from.lat)
  const dLng = rad(to.lng - from.lng)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(from.lat)) * Math.cos(rad(to.lat)) * Math.sin(dLng / 2) ** 2

  return Math.round(2 * R * Math.asin(Math.sqrt(h)))
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

  const [zoom, setZoom] = useState(1)
  const [activeKey, setActiveKey] = useState<string>(cities[0]?.name ?? '')

  const activeCity = cities.find((city) => city.name === activeKey) ?? cities[0]
  const activeDistance = distanceKm(KUWAIT, activeCity)

  /** تكبير/تصغير مثبّت على نقطة الكويت حتى لا يتحرك الدبوس */
  const zoomStyle = {
    transform: `scale(${zoom})`,
    transformOrigin: `${(kuwait.x / WORLD_W) * 100}% ${(kuwait.y / WORLD_H) * 100}%`,
    transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
  }

  /** قصّ صورة الخريطة على اليابسة فقط (قناة الشفافية) */
  const maskStyle = {
    maskImage: `url("${MAP_URL}")`,
    WebkitMaskImage: `url("${MAP_URL}")`,
    maskSize: '100% 100%',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
  }

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
              <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-cyan-300/15 bg-[radial-gradient(circle_at_63%_34%,oklch(0.3_0.06_235)_0%,oklch(0.16_0.04_255)_45%,oklch(0.09_0.02_262)_100%)]">
                <div className="absolute inset-0" style={zoomStyle}>
                  {/* اليابسة بإطلالة أطلس: طبقة أساس + حافة مضيئة */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.47_0.05_232)_0%,oklch(0.35_0.05_244)_55%,oklch(0.27_0.04_252)_100%)]"
                    style={maskStyle}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-cyan-300/25 blur-[2px]"
                    style={maskStyle}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_63%_34%,oklch(0.9_0.1_88/0.2)_0%,transparent_45%)]"
                  />

                  {/* مسح رادار يدور حول الكويت */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute"
                    style={{
                      left: `${(kuwait.x / WORLD_W) * 100}%`,
                      top: `${(kuwait.y / WORLD_H) * 100}%`,
                      width: '62%',
                      aspectRatio: '1 / 1',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="size-full animate-spin rounded-full [animation-duration:9s] [background:conic-gradient(from_0deg,transparent_0deg,transparent_296deg,oklch(0.9_0.12_190/0.22)_344deg,transparent_360deg)]" />
                  </div>

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

                  {/* شبكة خطوط الطول والعرض — إطلالة أطلس حديثة */}
                  <g stroke="oklch(0.8 0.06 200 / 0.13)" strokeWidth="0.22" strokeDasharray="1.2 2.2">
                    {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lng) => (
                      <line
                        key={`meridian-${lng}`}
                        x1={lng + WORLD_W / 2}
                        y1="0"
                        x2={lng + WORLD_W / 2}
                        y2={WORLD_H}
                      />
                    ))}
                    {[-60, -30, 30, 60].map((lat) => (
                      <line
                        key={`parallel-${lat}`}
                        x1="0"
                        y1={WORLD_H / 2 - lat}
                        x2={WORLD_W}
                        y2={WORLD_H / 2 - lat}
                      />
                    ))}
                  </g>
                  <g fill="none">
                    <line
                      x1="0"
                      y1={WORLD_H / 2}
                      x2={WORLD_W}
                      y2={WORLD_H / 2}
                      stroke="oklch(0.82 0.08 200 / 0.35)"
                      strokeWidth="0.3"
                    />
                    <line
                      x1={WORLD_W / 2}
                      y1="0"
                      x2={WORLD_W / 2}
                      y2={WORLD_H}
                      stroke="oklch(0.82 0.08 200 / 0.2)"
                      strokeWidth="0.25"
                    />
                  </g>

                  {/* أقواس تصل كل سوق بالكويت — السوق المُحدد يتوهج */}
                  {cities.map((city) => {
                    const isActive = city.name === activeCity?.name

                    return (
                      <path
                        key={`arc-${city.name}`}
                        d={arc(city.point, kuwait)}
                        fill="none"
                        stroke={isActive ? 'oklch(0.9 0.12 88 / 0.95)' : 'oklch(0.8 0.1 200 / 0.34)'}
                        strokeWidth={isActive ? 0.75 : 0.4}
                        strokeDasharray={isActive ? '2 2' : '3 3'}
                        className="animate-dash-flow"
                      />
                    )
                  })}

                  {/* نقاط الأسواق — تفاعلية: مرّر أو اضغط للتحديد */}
                  {cities.map((city) => {
                    const isActive = city.name === activeCity?.name

                    return (
                      <g
                        key={`city-${city.name}`}
                        onMouseEnter={() => setActiveKey(city.name)}
                        onClick={() => setActiveKey(city.name)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={city.point.x}
                          cy={city.point.y}
                          r="4.6"
                          fill="none"
                          pointerEvents="all"
                        />
                        {isActive ? (
                          <circle
                            cx={city.point.x}
                            cy={city.point.y}
                            r="6.6"
                            fill="url(#pinGlow)"
                            className="animate-pitch-pulse"
                          />
                        ) : null}
                        <circle
                          cx={city.point.x}
                          cy={city.point.y}
                          r={isActive ? 1.9 : 1.2}
                          fill={isActive ? 'oklch(0.92 0.12 88)' : 'oklch(0.95 0.06 200 / 0.95)'}
                        />
                        <circle
                          cx={city.point.x}
                          cy={city.point.y}
                          r={isActive ? 3.4 : 2.3}
                          fill="none"
                          stroke={isActive ? 'oklch(0.9 0.12 88 / 0.9)' : 'oklch(0.8 0.1 200 / 0.5)'}
                          strokeWidth={isActive ? 0.45 : 0.3}
                        />
                        <text
                          x={city.point.x + 3.6}
                          y={city.point.y + 1.2}
                          fontSize={isActive ? '4' : '3.4'}
                          fontWeight={isActive ? '800' : '600'}
                          fill={isActive ? 'oklch(0.95 0.1 88)' : 'oklch(0.97 0.01 95 / 0.7)'}
                          className={isActive ? undefined : 'hidden sm:block'}
                        >
                          {pick(city.name, city.ar)}
                        </text>
                      </g>
                    )
                  })}

                  {/* مؤشر الكويت — نقطة اللاعب */}
                  <g>
                    <circle
                      cx={kuwait.x}
                      cy={kuwait.y}
                      r="16"
                      fill="url(#pinGlow)"
                      className="animate-pitch-pulse"
                    />
                    <circle
                      cx={kuwait.x}
                      cy={kuwait.y}
                      r="8"
                      fill="none"
                      stroke="oklch(0.9 0.12 88 / 0.7)"
                      strokeWidth="0.4"
                      className="animate-pitch-pulse"
                    />
                    <line
                      x1={kuwait.x}
                      y1={kuwait.y - 4}
                      x2={kuwait.x}
                      y2={kuwait.y - 15}
                      stroke="oklch(0.9 0.12 88 / 0.6)"
                      strokeWidth="0.3"
                    />
                    <circle
                      cx={kuwait.x}
                      cy={kuwait.y}
                      r="2.4"
                      fill="oklch(0.9 0.12 88)"
                      stroke="oklch(0.12 0.02 262)"
                      strokeWidth="0.6"
                    />
                  </g>
                </svg>
                </div>

                {/* شارة علم الكويت على نقطة اللاعب */}
                <div
                  className="pointer-events-none absolute z-10 overflow-hidden rounded-md shadow-[0_10px_30px_-12px_rgba(0,0,0,0.9)] ring-1 ring-white/25"
                  style={{
                    left: `${(kuwait.x / WORLD_W) * 100}%`,
                    top: `${(kuwait.y / WORLD_H) * 100}%`,
                    width: '7%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <KuwaitFlag className="w-full" title={content.presence.flagCaption} />
                </div>

                {/* بطاقة موقع اللاعب فوق الدبوس */}
                <div
                  className="pointer-events-none absolute z-20 -translate-x-1/2 rounded-2xl border border-primary/45 bg-ink/90 px-3 py-1.5 text-center shadow-[0_18px_50px_-20px_var(--gold)] backdrop-blur-md"
                  style={{
                    left: `${(kuwait.x / WORLD_W) * 100}%`,
                    top: `${(kuwait.y / WORLD_H) * 100}%`,
                    transform: 'translate(-50%, -300%)',
                  }}
                >
                  <span className="block text-[9px] font-semibold tracking-[0.24em] text-primary/90 uppercase">
                    {content.presence.labels.playerPoint}
                  </span>
                  <span className="mt-0.5 flex items-center justify-center gap-1.5 font-serif text-sm font-black text-foreground">
                    <span className="w-4 overflow-hidden rounded-[2px] ring-1 ring-white/25">
                      <KuwaitFlag className="w-full" />
                    </span>
                    {pick(KUWAIT.en, KUWAIT.ar)}
                  </span>
                </div>

                {/* مرجع الإسقاط */}
                <span className="pointer-events-none absolute bottom-2 start-3 text-[9px] font-medium tracking-[0.18em] text-foreground/35 uppercase">
                  Equirectangular · 2:1
                </span>

                {/* أزرار التكبير والتصغير (مركزة على الكويت) */}
                <div className="absolute end-2 bottom-2 z-20 flex items-center gap-1 rounded-full border border-white/12 bg-ink/85 p-1 backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setZoom((current) => Math.min(3.5, current + 0.5))}
                    aria-label={content.presence.zoomin}
                    className="grid size-7 place-items-center rounded-full text-foreground/80 transition-colors hover:bg-primary/15 hover:text-primary"
                  >
                    <ZoomIn className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom((current) => Math.max(1, current - 0.5))}
                    aria-label={content.presence.zoomOut}
                    className="grid size-7 place-items-center rounded-full text-foreground/80 transition-colors hover:bg-primary/15 hover:text-primary"
                  >
                    <ZoomOut className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom(1)}
                    aria-label={content.presence.reset}
                    className="grid size-7 place-items-center rounded-full text-foreground/80 transition-colors hover:bg-primary/15 hover:text-primary"
                  >
                    <Ruler className="size-3.5" />
                  </button>
                  <span className="px-1 text-[10px] font-black text-primary">{zoom.toFixed(1)}×</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* علم الكويت + نقطة اللاعب */}
            <Card className="overflow-hidden">
              <CardContent className="flex items-center gap-4 p-5">
                <span className="w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/20 sm:w-24">
                  <KuwaitFlag className="w-full" title={content.presence.flagCaption} />
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-lg font-black text-foreground">
                    {pick(KUWAIT.en, KUWAIT.ar)}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {content.presence.flagCaption}
                  </span>
                  <span className="mt-1 block text-[11px] font-semibold text-primary">
                    {KUWAIT.lat}° N · {KUWAIT.lng}° E · GMT +3
                  </span>
                </span>
              </CardContent>
            </Card>

            {/* الأسواق العالمية — تفاعلية */}
            <Card>
              <CardContent className="space-y-4 p-5">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10">
                    <Compass className="size-5 text-primary" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-base font-bold text-foreground">
                      {content.presence.selectCity}
                    </h3>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                      {content.presence.legendNote}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => {
                    const isActive = city.name === activeCity?.name

                    return (
                      <button
                        key={city.name}
                        type="button"
                        onClick={() => setActiveKey(city.name)}
                        onMouseEnter={() => setActiveKey(city.name)}
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all duration-300',
                          isActive
                            ? 'border-primary bg-primary/15 text-primary'
                            : 'border-white/10 bg-white/5 text-foreground/75 hover:border-primary/40 hover:text-primary'
                        )}
                      >
                        <span
                          className={cn(
                            'size-1.5 rounded-full transition-colors',
                            isActive ? 'bg-primary' : 'bg-cyan-300/70'
                          )}
                        />
                        {pick(city.name, city.ar)}
                      </button>
                    )
                  })}
                </div>

                <div className="rounded-2xl border border-primary/25 bg-primary/[0.06] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-serif text-base font-black text-foreground">
                      {pick(activeCity.name, activeCity.ar)}
                    </h4>
                    <Badge>
                      <Ruler className="size-3" />
                      {content.presence.distance}
                    </Badge>
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
                      <dt className="text-muted-foreground">{content.presence.labels.coordinates}</dt>
                      <dd className="mt-0.5 font-semibold text-foreground/90">
                        {activeCity.lat}° N · {activeCity.lng}° E
                      </dd>
                    </div>
                    <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
                      <dt className="text-muted-foreground">{content.presence.distance}</dt>
                      <dd className="mt-0.5 font-serif text-sm font-black text-primary">
                        {activeDistance.toLocaleString('en-US')} km
                      </dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>

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
