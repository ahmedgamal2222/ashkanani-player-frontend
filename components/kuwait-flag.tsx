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