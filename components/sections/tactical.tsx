'use client'

import { usePlayer } from '@/components/player-provider'
import SectionHeading from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { sectionNumber } from '@/lib/site-sections'

/** أبعاد الملعب بوحدات الـ SVG (نسبة قريبة من 68×105 متر) */
const PITCH_W = 100
const PITCH_H = 140

/** تحويل إحداثيات النسبة المئوية (من أعلى الملعب) إلى وحدات الرسم */
const toY = (percent: number) => (percent / 100) * PITCH_H

interface Spot {
  x: number
  y: number
}

/** الرسم التكتيكي 4-3-3 — زملاء الفريق (نسب مئوية داخل الملعب) */
const FORMATION_433: Array<Spot & { label: string }> = [
  { x: 50, y: 92, label: 'GK' },
  { x: 16, y: 76, label: 'LB' },
  { x: 37, y: 78, label: 'CB' },
  { x: 63, y: 78, label: 'CB' },
  { x: 84, y: 76, label: 'RB' },
  { x: 30, y: 56, label: 'CM' },
  { x: 50, y: 62, label: 'CM' },
  { x: 70, y: 56, label: 'CM' },
  { x: 18, y: 30, label: 'LW' },
  { x: 82, y: 30, label: 'RW' },
  { x: 50, y: 18, label: 'ST' },
]

/** يستنتج موقع اللاعب داخل الملعب من نص المركز (عربي/إنجليزي) */
function resolveSpot(position: string): Spot {
  const value = (position || '').toLowerCase()

  if (/حارس|حراسة|goalkeeper|keeper|goalie/.test(value)) return { x: 50, y: 92 }
  if (/ظهير|قلب دفاع|مدافع|defender|full.?back|centre.?back|center.?back/.test(value))
    return { x: 24, y: 78 }
  if (/ارتكاز|محور|holding|defensive mid/.test(value)) return { x: 50, y: 66 }
  if (/صانع|هجومي|attacking|playmaker/.test(value)) return { x: 50, y: 37 }
  if (/جناح|winger|wide/.test(value)) return { x: 82, y: 32 }
  if (/مهاجم|رأس حربة|striker|forward/.test(value)) return { x: 50, y: 18 }
  if (/وسط|midfield|midfielder/.test(value)) return { x: 50, y: 52 }

  return { x: 50, y: 52 }
}

/** مسافة تقريبية بين نقطتين بنسب مئوية */
const spotDistance = (a: Spot, b: Spot) => Math.hypot(a.x - b.x, a.y - b.y)

export default function TacticalSection() {
  const { content, pick } = useLanguage()
  const { bundle } = usePlayer()

  const player = bundle.player
  const primary = resolveSpot(player.positionEn || player.positionAr)
  const secondary = resolveSpot(player.secondaryPositionEn || player.secondaryPositionAr)
  const showSecondary = spotDistance(primary, secondary) > 12
  const squad = FORMATION_433.filter((mate) => spotDistance(mate, primary) > 9)

  const px = primary.x
  const py = toY(primary.y)
  const sx = secondary.x
  const sy = toY(secondary.y)

  const tiles = [
    { label: content.tactical.labels.primary, value: pick(player.positionEn, player.positionAr) },
    {
      label: content.tactical.labels.secondary,
      value: pick(player.secondaryPositionEn, player.secondaryPositionAr),
    },
    { label: content.tactical.labels.jersey, value: `#${player.jerseyNumber}` },
    {
      label: content.tactical.labels.foot,
      value: pick(player.preferredFootEn, player.preferredFootAr),
    },
    { label: content.tactical.labels.club, value: pick(player.clubEn, player.clubAr) },
    { label: content.tactical.labels.nationalTeam, value: pick(player.nationalTeamEn, player.nationalTeamAr) },
  ]

  return (
    <section id="tactical" className="relative bg-ink/40 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`${sectionNumber('tactical')} — ${content.navigation.tactical}`}
          title={content.tactical.title}
          subtitle={content.tactical.subtitle}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <Card className="overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <svg
                viewBox={`0 0 ${PITCH_W} ${PITCH_H}`}
                role="img"
                aria-label={pick(player.fullNameEn, player.fullNameAr)}
                className="mx-auto h-auto w-full max-w-md rounded-2xl ring-1 ring-white/10"
              >
                <defs>
                  <linearGradient id="turf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.3 0.055 158)" />
                    <stop offset="55%" stopColor="oklch(0.26 0.05 158)" />
                    <stop offset="100%" stopColor="oklch(0.22 0.045 158)" />
                  </linearGradient>
                  <radialGradient id="playerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="oklch(0.86 0.12 88)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="oklch(0.86 0.12 88)" stopOpacity="0" />
                  </radialGradient>
                  <clipPath id="pitchClip">
                    <rect x="1.5" y="1.5" width="97" height="137" rx="1.5" />
                  </clipPath>
                  <pattern id="grassPattern" width="3.5" height="3.5" patternUnits="userSpaceOnUse">
                    <rect width="3.5" height="3.5" fill="oklch(0.28 0.05 158)" />
                    <circle cx="1" cy="1" r="0.35" fill="oklch(0.34 0.06 158 / 0.35)" />
                    <circle cx="2.6" cy="2.4" r="0.3" fill="oklch(0.2 0.04 158 / 0.4)" />
                  </pattern>
                  <pattern id="netPattern" width="2" height="2" patternUnits="userSpaceOnUse">
                    <path
                      d="M 0 0 L 0 2 M 0 0 L 2 0"
                      stroke="oklch(1 0 0 / 0.4)"
                      strokeWidth="0.12"
                    />
                  </pattern>
                  <radialGradient id="stadiumLight" cx="28%" cy="10%" r="90%">
                    <stop offset="0%" stopColor="oklch(0.98 0.02 95)" stopOpacity="0.2" />
                    <stop offset="55%" stopColor="oklch(0.9 0.03 95)" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="oklch(0.9 0.03 95)" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="vignette" cx="50%" cy="45%" r="72%">
                    <stop offset="52%" stopColor="oklch(0.08 0.02 262)" stopOpacity="0" />
                    <stop offset="100%" stopColor="oklch(0.08 0.02 262)" stopOpacity="0.7" />
                  </radialGradient>
                  <radialGradient id="coverageFill" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="oklch(0.86 0.12 88)" stopOpacity="0.22" />
                    <stop offset="70%" stopColor="oklch(0.86 0.12 88)" stopOpacity="0.07" />
                    <stop offset="100%" stopColor="oklch(0.86 0.12 88)" stopOpacity="0" />
                  </radialGradient>
                  <clipPath id="playerAvatar">
                    <circle cx={px} cy={py} r="6.6" />
                  </clipPath>
                </defs>

                <rect x="0" y="0" width={PITCH_W} height={PITCH_H} fill="url(#turf)" />
                <rect
                  x="1.5"
                  y="1.5"
                  width="97"
                  height="137"
                  fill="url(#grassPattern)"
                  opacity="0.45"
                />

                {/* المرميان والشباك */}
                <rect x="39" y="0.2" width="22" height="1.3" fill="url(#netPattern)" />
                <rect x="39" y="138.5" width="22" height="1.3" fill="url(#netPattern)" />

                {/* إضاءة الاستاد */}
                <rect x="0" y="0" width={PITCH_W} height={PITCH_H} fill="url(#stadiumLight)" />

                <g clipPath="url(#pitchClip)">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <rect
                      key={index}
                      x="1.5"
                      y={1.5 + index * 13.7}
                      width="97"
                      height="13.7"
                      fill={index % 2 === 0 ? 'oklch(1 0 0 / 0.035)' : 'oklch(1 0 0 / 0.012)'}
                    />
                  ))}
                  {[45.6, 91.2].map((line) => (
                    <line
                      key={line}
                      x1="1.5"
                      x2="98.5"
                      y1={line}
                      y2={line}
                      stroke="oklch(0.79 0.13 85 / 0.22)"
                      strokeWidth="0.3"
                      strokeDasharray="1.6 2.4"
                    />
                  ))}
                </g>

                {/* خطوط الملعب */}
                <g stroke="oklch(1 0 0 / 0.32)" strokeWidth="0.45" fill="none">
                  <rect x="1.5" y="1.5" width="97" height="137" rx="1.5" />
                  <line x1="1.5" y1={PITCH_H / 2} x2="98.5" y2={PITCH_H / 2} />
                  <circle cx="50" cy={PITCH_H / 2} r="11.5" />
                  <circle cx="50" cy={PITCH_H / 2} r="0.8" fill="oklch(1 0 0 / 0.4)" stroke="none" />

                  <rect x="20.5" y="1.5" width="59" height="22" />
                  <rect x="36.5" y="1.5" width="27" height="7.3" />
                  <circle cx="50" cy="15.9" r="0.7" fill="oklch(1 0 0 / 0.4)" stroke="none" />
                  <path d="M 40.8 23.5 A 11.9 11.9 0 0 1 59.2 23.5" strokeDasharray="2.4 2" />

                  <rect x="20.5" y="116.5" width="59" height="22" />
                  <rect x="36.5" y="131.2" width="27" height="7.3" />
                  <circle cx="50" cy="124.1" r="0.7" fill="oklch(1 0 0 / 0.4)" stroke="none" />
                  <path d="M 40.8 116.5 A 11.9 11.9 0 0 0 59.2 116.5" strokeDasharray="2.4 2" />
                </g>

                {/* أقواس الزوايا — مقصوصة على حدود الملعب */}
                <g clipPath="url(#pitchClip)" stroke="oklch(1 0 0 / 0.32)" strokeWidth="0.45" fill="none">
                  {[
                    [1.5, 1.5],
                    [98.5, 1.5],
                    [1.5, 138.5],
                    [98.5, 138.5],
                  ].map(([cx, cy]) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />
                  ))}
                </g>
                {/* زملاء الفريق — الرسم 4-3-3 */}
                {squad.map((mate) => (
                  <g key={`${mate.label}-${mate.x}`} opacity="0.6">
                    <circle
                      cx={mate.x}
                      cy={toY(mate.y)}
                      r="2.9"
                      fill="oklch(0.97 0.01 95 / 0.1)"
                      stroke="oklch(1 0 0 / 0.28)"
                      strokeWidth="0.3"
                    />
                    <text
                      x={mate.x}
                      y={toY(mate.y) + 1}
                      textAnchor="middle"
                      fontSize="2.4"
                      fontWeight="600"
                      fill="oklch(0.97 0.01 95 / 0.62)"
                    >
                      {mate.label}
                    </text>
                  </g>
                ))}

                {/* منطقة التغطية والتحرك */}
                <ellipse
                  cx={px}
                  cy={py - 4}
                  rx="17"
                  ry="21"
                  fill="url(#coverageFill)"
                  className="animate-pitch-pulse"
                />
                <ellipse
                  cx={px}
                  cy={py - 4}
                  rx="17"
                  ry="21"
                  fill="none"
                  stroke="oklch(0.86 0.12 88 / 0.25)"
                  strokeWidth="0.3"
                  strokeDasharray="2 2.4"
                />

                {/* كرات متحركة — تدوير اللعب */}
                {[
                  { key: 'pass-rw', x: 82, y: 42, dur: '4.4s' },
                  { key: 'pass-cm', x: 30, y: 78.4, dur: '5.8s' },
                ].map((pass) => (
                  <circle
                    key={pass.key}
                    r="0.95"
                    fill="oklch(0.97 0.01 95)"
                    stroke="oklch(0.12 0.02 262)"
                    strokeWidth="0.15"
                  >
                    <animateMotion
                      dur={pass.dur}
                      repeatCount="indefinite"
                      path={`M ${px} ${py} Q ${(px + pass.x) / 2} ${(py + pass.y) / 2 - 14} ${pass.x} ${pass.y} Q ${(px + pass.x) / 2} ${(py + pass.y) / 2 - 14} ${px} ${py}`}
                    />
                  </circle>
                ))}

                {/* نطاق التحرك نحو المركز الثاني */}
                {showSecondary ? (
                  <>
                    <path
                      d={`M ${px} ${py} Q ${(px + sx) / 2 + 8} ${(py + sy) / 2} ${sx} ${sy}`}
                      fill="none"
                      stroke="oklch(0.86 0.12 88 / 0.5)"
                      strokeWidth="0.45"
                      strokeDasharray="2 2"
                      className="animate-dash-flow"
                    />
                    <circle
                      cx={sx}
                      cy={sy}
                      r="3.6"
                      fill="none"
                      stroke="oklch(0.86 0.12 88 / 0.6)"
                      strokeWidth="0.4"
                      strokeDasharray="1.4 1.4"
                    />
                    <text
                      x={sx}
                      y={sy + 1}
                      textAnchor="middle"
                      fontSize="2.2"
                      fontWeight="700"
                      fill="oklch(0.86 0.12 88 / 0.85)"
                    >
                      2
                    </text>
                  </>
                ) : null}

                {/* مؤشر اللاعب: صورة + الرقم + المركز */}
                <g>
                  <circle cx={px} cy={py} r="13" fill="url(#playerGlow)" className="animate-pitch-pulse" />
                  <circle
                    cx={px}
                    cy={py}
                    r="9"
                    fill="none"
                    stroke="oklch(0.86 0.12 88 / 0.55)"
                    strokeWidth="0.35"
                    className="animate-pitch-pulse"
                  />
                  <circle
                    cx={px}
                    cy={py}
                    r="7"
                    fill="oklch(0.12 0.02 262)"
                    stroke="oklch(0.86 0.12 88)"
                    strokeWidth="0.6"
                  />
                  <image
                    href={player.photoUrl || content.siteInfo.playerPhoto}
                    x={px - 6.6}
                    y={py - 6.6}
                    width="13.2"
                    height="13.2"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#playerAvatar)"
                  />
                  <circle
                    cx={px}
                    cy={py}
                    r="6.6"
                    fill="none"
                    stroke="oklch(0.86 0.12 88)"
                    strokeWidth="0.7"
                  />
                  <circle
                    cx={px + 4.8}
                    cy={py + 4.8}
                    r="2.9"
                    fill="oklch(0.12 0.02 262)"
                    stroke="oklch(0.86 0.12 88)"
                    strokeWidth="0.5"
                  />
                  <text
                    x={px + 4.8}
                    y={py + 5.9}
                    textAnchor="middle"
                    fontSize="3"
                    fontWeight="900"
                    fill="oklch(0.86 0.12 88)"
                  >
                    {player.jerseyNumber}
                  </text>
                  <line
                    x1={px}
                    y1={py - 7.5}
                    x2={px}
                    y2={py - 15}
                    stroke="oklch(0.86 0.12 88 / 0.35)"
                    strokeWidth="0.35"
                  />
                  <text
                    x={px}
                    y={py - 16}
                    textAnchor="middle"
                    fontSize="3"
                    fontWeight="700"
                    fill="oklch(0.97 0.01 95 / 0.85)"
                  >
                    {pick(player.positionEn, player.positionAr)}
                  </text>
                </g>

                {/* تظليل الحواف لمظهر بثّ تلفزيوني */}
                <rect x="0" y="0" width={PITCH_W} height={PITCH_H} fill="url(#vignette)" />
              </svg>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {tiles.map((tile) => (
                <Card key={tile.label}>
                  <CardContent className="p-5">
                    <p className="text-[10px] font-semibold tracking-[0.24em] text-primary/85 uppercase">
                      {tile.label}
                    </p>
                    <p className="mt-2 font-serif text-lg font-black text-foreground">{tile.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardContent className="space-y-6 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    {content.tactical.formation}
                  </h3>
                  <Badge variant="solid">4-3-3</Badge>
                </div>

                <div>
                  <h4 className="text-[11px] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
                    {content.tactical.rolesTitle}
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {content.tactical.roles.map((role) => (
                      <li key={role} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-white/8 pt-5">
                  <h4 className="text-[11px] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
                    {content.tactical.legendTitle}
                  </h4>
                  <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="grid size-6 place-items-center rounded-full border border-primary bg-ink font-serif text-[10px] font-black text-primary">
                        {player.jerseyNumber}
                      </span>
                      {content.tactical.legendPlayer}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-4 rounded-full border border-white/25 bg-white/10" />
                      {content.tactical.legendSquad}
                    </li>
                    {showSecondary ? (
                      <li className="flex items-center gap-2">
                        <span className="size-4 rounded-full border border-dashed border-primary/70" />
                        {content.tactical.legendMove}
                      </li>
                    ) : null}
                    <li className="flex items-center gap-2">
                      <span className="size-4 rounded-full bg-[radial-gradient(circle,oklch(0.86_0.12_88/0.5),transparent_70%)] ring-1 ring-primary/30" />
                      {content.tactical.labels.coverage}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-foreground/90 ring-1 ring-ink" />
                      {content.tactical.labels.ballPath}
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
