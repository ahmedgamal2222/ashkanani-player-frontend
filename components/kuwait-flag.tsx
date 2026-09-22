/**
 * علم دولة الكويت الرسمي (نسبة 2:1):
 * ثلاث طبقات أفقية: أخضر (#007A3D) ثم أبيض (#FFFFFF) ثم أحمر (#CE1126)،
 * مع شبه منحرف أسود (#000000) عند جهة السارية يغطي ربع العرض.
 */
export default function KuwaitFlag({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 30 15" role="img" aria-label={title ?? 'Kuwait'} className={className}>
      <rect width="30" height="5" fill="#007A3D" />
      <rect y="5" width="30" height="5" fill="#FFFFFF" />
      <rect y="10" width="30" height="5" fill="#CE1126" />
      <polygon points="0,0 7.5,5 7.5,10 0,15" fill="#000000" />
    </svg>
  )
}

/** شكل قماش العلم بموجة طبيعية (يُستخدم لكل طبقة مع إزاحة رأسية) */
const CLOTH =
  'M2.6 2.4 C 9.5 0.2 17.5 4.6 25.5 2.9 C 29 2.2 32.5 2.7 34.6 3.4 L 34.6 11.6 C 31.5 12.2 28 11.2 24 11.8 C 15.5 13 8.5 9.4 2.6 11.2 Z'

/**
 * علم الكويت بشكل واقعي: قماش مموّج بألوان العلم الرسمية على سارية ذهبية،
 * مع تظليل ضوء/ظل على القماش — يُستخدم في المقاسات الكبيرة.
 */
export function WavingKuwaitFlag({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 40 33" role="img" aria-label={title ?? 'Kuwait'} className={className}>
      <defs>
        <linearGradient id="kf-shade" x1="0" y1="0" x2="1" y2="0.25">
          <stop offset="0%" stopColor="oklch(0 0 0)" stopOpacity="0.38" />
          <stop offset="24%" stopColor="oklch(0 0 0)" stopOpacity="0.05" />
          <stop offset="58%" stopColor="oklch(1 0 0)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="oklch(0 0 0)" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="kf-pole" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.58 0.06 85)" />
          <stop offset="45%" stopColor="oklch(0.93 0.08 92)" />
          <stop offset="100%" stopColor="oklch(0.52 0.06 82)" />
        </linearGradient>
      </defs>

      <g transform="translate(1.6 1.2)">
        <ellipse cx="1.2" cy="30.2" rx="3.2" ry="1" fill="oklch(0.22 0.02 262)" opacity="0.75" />
        <rect x="0.5" y="0.6" width="1.4" height="29.6" rx="0.7" fill="url(#kf-pole)" />
        <circle cx="1.2" cy="0.6" r="1.7" fill="url(#kf-pole)" />

        <path d={CLOTH} fill="#007A3D" />
        <path d={CLOTH} fill="#FFFFFF" transform="translate(0 7.4)" />
        <path d={CLOTH} fill="#CE1126" transform="translate(0 14.8)" />

        <path d="M2.6 2.4 L9.7 11.8 L9.7 19.4 L2.6 28.8 Z" fill="#000000" />

        <path d={CLOTH} fill="url(#kf-shade)" />
        <path d={CLOTH} fill="url(#kf-shade)" transform="translate(0 7.4)" />
        <path d={CLOTH} fill="url(#kf-shade)" transform="translate(0 14.8)" />

        <path d={CLOTH} fill="none" stroke="oklch(0 0 0 / 0.25)" strokeWidth="0.22" />
        <path
          d={CLOTH}
          fill="none"
          stroke="oklch(0 0 0 / 0.25)"
          strokeWidth="0.22"
          transform="translate(0 7.4)"
        />
        <path
          d={CLOTH}
          fill="none"
          stroke="oklch(0 0 0 / 0.25)"
          strokeWidth="0.22"
          transform="translate(0 14.8)"
        />
      </g>
    </svg>
  )
}