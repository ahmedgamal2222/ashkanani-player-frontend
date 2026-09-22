/**
 * أقسام الموقع: الترتيب + الإظهار/الإخفاء المؤقت + ترقيم الأقسام.
 *
 * لإخفاء قسم مؤقتًا: أضف معرّفه إلى HIDDEN_SECTIONS أدناه.
 * لإعادة إظهاره: احذفه من القائمة — وسيعود تلقائيًا إلى القائمة العلوية
 * وروابط الفوتر مع إعادة ترقيم بقية الأقسام تلقائيًا.
 */
import contentData from '@/data/content.json'

export type SectionId =
  | 'profile'
  | 'attributes'
  | 'tactical'
  | 'stats'
  | 'career'
  | 'presence'
  | 'achievements'
  | 'media'
  | 'matches'
  | 'contact'

/** مفاتيح الترجمة في data/content.json → navigation */
type NavKey = keyof typeof contentData.en.navigation

/** ترتيب الأقسام كما تظهر في الصفحة الرئيسية */
export const SECTION_ORDER: SectionId[] = [
  'profile',
  'attributes',
  'tactical',
  'stats',
  'career',
  'presence',
  'achievements',
  'media',
  'matches',
  'contact',
]

/** الأقسام المخفية مؤقتًا — سمات اللاعب مخفية حاليًا */
export const HIDDEN_SECTIONS: SectionId[] = ['attributes']

/** هل القسم ظاهر في الصفحة؟ */
export function isSectionVisible(id: SectionId): boolean {
  return !HIDDEN_SECTIONS.includes(id)
}

/** الأقسام الظاهرة بترتيب ظهورها */
export const VISIBLE_SECTIONS: SectionId[] = SECTION_ORDER.filter(isSectionVisible)

/** رقم القسم الظاهر بصيغة 01، 02… (يتجاهل الأقسام المخفية) */
export function sectionNumber(id: SectionId): string {
  const index = VISIBLE_SECTIONS.indexOf(id)
  if (index < 0) return '00'
  return String(index + 1).padStart(2, '0')
}

export interface NavItem {
  id: 'home' | SectionId
  key: NavKey
}

/** عناصر القائمة العلوية وروابط الفوتر (بدون الأقسام المخفية) */
export const NAV_ITEMS: NavItem[] = [
  { id: 'home', key: 'home' },
  ...VISIBLE_SECTIONS.map((id) => ({ id, key: id })),
]
