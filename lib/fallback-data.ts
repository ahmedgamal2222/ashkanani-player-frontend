/**
 * بيانات احتياطية مطابقة تمامًا لملف backend/seed.sql
 * تُستخدم إذا لم يكن الـ API (HonoJS + D1) متصلًا — فيعمل الموقع كاملًا دون باك-إند.
 */
import type { PlayerBundle } from './types'

const player: PlayerBundle['player'] = {
  id: 1,
  slug: 'ahmed-hussein',
  firstNameEn: 'Ahmed',
  firstNameAr: 'أحمد',
  lastNameEn: 'Hussein Khoursheed',
  lastNameAr: 'حسين خورشيد',
  fullNameEn: 'Ahmed Hussein Khoursheed',
  fullNameAr: 'أحمد حسين خورشيد',
  statusEn: 'Professional Player',
  statusAr: 'لاعب محترف',
  positionEn: 'Center Midfielder',
  positionAr: 'لاعب وسط',
  secondaryPositionEn: 'Attacking Midfielder',
  secondaryPositionAr: 'وسط هجومي',
  jerseyNumber: 8,
  age: 21,
  dateOfBirth: '2005-04-18',
  heightCm: 170,
  weightKg: 60,
  preferredFootEn: 'Both',
  preferredFootAr: 'كلتا القدمين',
  gender: 'Male',
  nationalityEn: 'Kuwaiti',
  nationalityAr: 'كويتي',
  marketValueUsd: 500000,
  addressEn: 'Kuwait',
  addressAr: 'الكويت',
  phone: null,
  email: null,
  whatsappNumber: '96500000000',
  instagramUrl: 'https://www.instagram.com/ashkanani.sport/',
  transfermarktUrl: 'https://ashkananitransfer.com/cv/978',
  photoUrl: '/images/ahmedhussin4.jpg',
  heroImageUrl: '/images/ahmedhussin6.jpg',
  bioEn:
    'Ahmed Hussein Khoursheed is a Kuwaiti central midfielder born in 2005 who started his football journey at Al-Arabi SC at the age of eight, progressing through the youth ranks until his last season with Al-Arabi in 2025/2026. He then signed a two-season contract (2026/2027 – 2027/2028) with Salmiya SC to play for the first team, and represents the Kuwait Olympic Team. A modern midfielder who is equally comfortable on both feet, he links defence and attack through fast ball circulation, intelligent positioning and aggressive pressing. With a low centre of gravity he excels in tight spaces, covers large distances across the pitch and takes responsibility in build-up play and set pieces. Signed as a professional player and officially represented by Ashkanani Players Agency in Kuwait.',
  bioAr:
    'أحمد حسين خورشيد لاعب وسط كويتي من مواليد 2005، بدأ رحلته الكروية في نادي العربي من عمر 8 سنوات وتدرّج في الفئات السنية حتى آخر موسم له مع العربي 2025/2026، ثم وقّع عقدًا لموسمين (2026/2027 – 2027/2028) مع نادي السالمية للفريق الأول، ويمثّل منتخب الكويت الأولمبي. لاعب وسط عصري يجيد اللعب بكلتا القدمين، يربط بين الدفاع والهجوم بسرعة تدوير الكرة وذكاء في التمركز وضغط قوي على الخصم. بمركز ثقل منخفض يتألق في المساحات الضيقة ويغطي مساحات واسعة داخل الملعب، ويتحمل مسؤولية بناء اللعب والكرات الثابتة. موقّع كلاعب محترف ومُمثَّل رسميًا من وكالة أشكناني للاعبين في الكويت.',
  federationEn: 'Kuwait Football Association (KFA)',
  federationAr: 'الاتحاد الكويتي لكرة القدم',
  federationLogo:
    'https://api.ashkananitransfer.com/storage/clubs/logos/Y7K4Eh3L6W9HzrMrg9IAiepd58ICEsdfgpZqIbxZ.png',
  clubEn: 'Salmiya SC',
  clubAr: 'نادي السالمية',
  clubLogo:
    'https://api.ashkananitransfer.com/storage/clubs/logos/j94fkz5qTn8imlOdS7El8udjbnS47W7y46o9V8w8.png',
  nationalTeamEn: 'Kuwait Olympic Team',
  nationalTeamAr: 'منتخب الكويت الأولمبي',
  nationalTeamLogo:
    'https://api.ashkananitransfer.com/storage/clubs/logos/Y7K4Eh3L6W9HzrMrg9IAiepd58ICEsdfgpZqIbxZ.png',
  updatedAt: new Date().toISOString(),
}

type AttrKey = PlayerBundle['attributes'][number]['attrKey']

const attributeSeed: Array<[AttrKey, PlayerBundle['attributes'][number]['category'], string, string, number]> = [
  ['passing', 'technical', 'Passing', 'التمرير', 84],
  ['vision', 'technical', 'Vision', 'الرؤية', 80],
  ['ballControl', 'technical', 'Ball Control', 'التحكم بالكرة', 82],
  ['dribbling', 'technical', 'Dribbling', 'المراوغة', 76],
  ['longPassing', 'technical', 'Long Passing', 'التمرير الطويل', 78],
  ['firstTouch', 'technical', 'First Touch', 'لمسة أولى', 81],
  ['shooting', 'technical', 'Shooting', 'التسديد', 70],
  ['tackling', 'defensive', 'Tackling', 'الافتكاك', 81],
  ['interceptions', 'defensive', 'Interceptions', 'قطع الكرات', 83],
  ['marking', 'defensive', 'Marking', 'الرقابة', 78],
  ['pressing', 'defensive', 'Pressing', 'الضغط على الخصم', 85],
  ['pace', 'physical', 'Pace', 'السرعة', 79],
  ['stamina', 'physical', 'Stamina', 'التحمّل البدني', 86],
  ['strength', 'physical', 'Strength', 'القوة البدنية', 70],
  ['agility', 'physical', 'Agility', 'الرشاقة', 80],
  ['decisionMaking', 'mental', 'Decision Making', 'اتخاذ القرار', 82],
  ['positioning', 'mental', 'Positioning', 'التمركز', 81],
  ['workRate', 'mental', 'Work Rate', 'معدل المجهود', 87],
  ['teamwork', 'mental', 'Teamwork', 'العمل الجماعي', 85],
  ['composure', 'mental', 'Composure', 'الهدوء', 80],
  ['leadership', 'mental', 'Leadership', 'القيادة', 74],
]

const attributes: PlayerBundle['attributes'] = attributeSeed.map(
  ([attrKey, category, nameEn, nameAr, value], index) => ({
    id: index + 1,
    attrKey,
    category,
    nameEn,
    nameAr,
    value,
    sortOrder: index + 1,
  })
)

const stats: PlayerBundle['stats'] = [
  { id: 1, season: '2024/2025', competitionEn: 'Kuwaiti Premier League', competitionAr: 'الدوري الكويتي الممتاز', appearances: 22, starts: 19, minutes: 1710, goals: 3, assists: 5, yellowCards: 4, redCards: 0, passAccuracy: 87.5, duelsWonPct: 61.2, rating: 7.4 },
  { id: 2, season: '2024/2025', competitionEn: 'Kuwait Federation Cup', competitionAr: 'كأس الاتحاد الكويتي', appearances: 5, starts: 4, minutes: 380, goals: 1, assists: 2, yellowCards: 1, redCards: 0, passAccuracy: 85.1, duelsWonPct: 58.7, rating: 7.2 },
  { id: 3, season: '2024/2025', competitionEn: 'Kuwait National Team', competitionAr: 'منتخب الكويت الوطني', appearances: 6, starts: 4, minutes: 350, goals: 0, assists: 1, yellowCards: 1, redCards: 0, passAccuracy: 88.0, duelsWonPct: 60.5, rating: 7.1 },
  { id: 4, season: '2024/2025', competitionEn: 'AFC Qualifiers', competitionAr: 'التصفيات الآسيوية', appearances: 3, starts: 2, minutes: 185, goals: 0, assists: 0, yellowCards: 0, redCards: 0, passAccuracy: 86.2, duelsWonPct: 59.0, rating: 7.0 },
  { id: 5, season: '2023/2024', competitionEn: 'Kuwaiti Premier League', competitionAr: 'الدوري الكويتي الممتاز', appearances: 18, starts: 14, minutes: 1290, goals: 2, assists: 3, yellowCards: 3, redCards: 1, passAccuracy: 84.6, duelsWonPct: 57.4, rating: 7.0 },
  { id: 6, season: '2023/2024', competitionEn: 'Kuwait Federation Cup', competitionAr: 'كأس الاتحاد الكويتي', appearances: 4, starts: 3, minutes: 300, goals: 0, assists: 1, yellowCards: 1, redCards: 0, passAccuracy: 83.0, duelsWonPct: 56.2, rating: 6.9 },
  { id: 7, season: '2023/2024', competitionEn: 'Kuwait U-23 National Team', competitionAr: 'منتخب الكويت تحت 23 سنة', appearances: 5, starts: 4, minutes: 330, goals: 1, assists: 1, yellowCards: 0, redCards: 0, passAccuracy: 85.4, duelsWonPct: 58.1, rating: 7.2 },
  { id: 8, season: '2025/2026', competitionEn: 'Kuwaiti Premier League', competitionAr: 'الدوري الكويتي الممتاز', appearances: 21, starts: 18, minutes: 1620, goals: 3, assists: 4, yellowCards: 3, redCards: 0, passAccuracy: 86.4, duelsWonPct: 60.1, rating: 7.3 },
  { id: 9, season: '2026/2027', competitionEn: 'Kuwaiti Premier League', competitionAr: 'الدوري الكويتي الممتاز', appearances: 6, starts: 5, minutes: 470, goals: 1, assists: 2, yellowCards: 1, redCards: 0, passAccuracy: 88.2, duelsWonPct: 62.4, rating: 7.5 },
]

const career: PlayerBundle['career'] = [
  { id: 1, clubEn: 'Salmiya SC', clubAr: 'نادي السالمية', clubLogo: 'https://api.ashkananitransfer.com/storage/clubs/logos/j94fkz5qTn8imlOdS7El8udjbnS47W7y46o9V8w8.png', leagueEn: 'Kuwaiti Premier League — First Team', leagueAr: 'الدوري الكويتي الممتاز — الفريق الأول', seasonFrom: '2026/2027', seasonTo: '2027/2028', isCurrent: 1, appearances: 6, goals: 1, assists: 2, sortOrder: 1 },
  { id: 2, clubEn: 'Al-Arabi SC', clubAr: 'النادي العربي', clubLogo: 'https://upload.wikimedia.org/wikipedia/ar/thumb/a/a2/%D8%B4%D8%B9%D8%A7%D8%B1_%D8%A7%D9%84%D9%86%D8%A7%D8%AF%D9%8A_%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A_%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA%D9%8A.svg/960px-%D8%B4%D8%B9%D8%A7%D8%B1_%D8%A7%D9%84%D9%86%D8%A7%D8%AF%D9%8A_%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A_%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA%D9%8A.svg.png', leagueEn: 'Kuwaiti Premier League — Youth Academy to First Team', leagueAr: 'الدوري الكويتي الممتاز — من الفئات السنية إلى الفريق الأول', seasonFrom: '2013/2014', seasonTo: '2025/2026', isCurrent: 0, appearances: 78, goals: 9, assists: 14, sortOrder: 2 },
  { id: 3, clubEn: 'Kuwait Olympic Team', clubAr: 'منتخب الكويت الأولمبي', clubLogo: 'https://api.ashkananitransfer.com/storage/clubs/logos/Y7K4Eh3L6W9HzrMrg9IAiepd58ICEsdfgpZqIbxZ.png', leagueEn: 'International — Olympic Team', leagueAr: 'مباريات دولية — المنتخب الأولمبي', seasonFrom: '2024', seasonTo: null, isCurrent: 1, appearances: 8, goals: 1, assists: 2, sortOrder: 3 },
  { id: 4, clubEn: 'Kuwait U-23 National Team', clubAr: 'منتخب الكويت تحت 23 سنة', clubLogo: 'https://api.ashkananitransfer.com/storage/clubs/logos/Y7K4Eh3L6W9HzrMrg9IAiepd58ICEsdfgpZqIbxZ.png', leagueEn: 'WAFF U-23 Championship', leagueAr: 'بطولة غرب آسيا تحت 23 سنة', seasonFrom: '2024/2025', seasonTo: '2025/2026', isCurrent: 0, appearances: 5, goals: 1, assists: 1, sortOrder: 4 },
  { id: 5, clubEn: 'Kuwait U-19 National Team', clubAr: 'منتخب الكويت تحت 19 سنة', clubLogo: 'https://api.ashkananitransfer.com/storage/clubs/logos/Y7K4Eh3L6W9HzrMrg9IAiepd58ICEsdfgpZqIbxZ.png', leagueEn: 'AFC U-19 Championship', leagueAr: 'كأس آسيا تحت 19 سنة', seasonFrom: '2022/2023', seasonTo: '2022/2023', isCurrent: 0, appearances: 8, goals: 1, assists: 2, sortOrder: 5 },
]

const achievements: PlayerBundle['achievements'] = [
  { id: 1, titleEn: 'League', titleAr: 'الدوري', descriptionEn: 'Regular starter with Al-Arabi SC in the Kuwaiti Premier League across the 2025/2026 season, before completing a two-season move to Salmiya SC.', descriptionAr: 'أساسي مع النادي العربي في الدوري الكويتي الممتاز خلال موسم 2025/2026، قبل إتمام انتقاله لموسمين إلى نادي السالمية.', category: 'league', season: '2025/2026', clubEn: 'Al-Arabi SC', clubAr: 'النادي العربي', icon: 'trophy', sortOrder: 1 },
  { id: 2, titleEn: 'National Team', titleAr: 'المنتخب الوطني', descriptionEn: 'Called up to the Kuwait Olympic Team and featured in international fixtures and AFC qualifiers.', descriptionAr: 'استدعاء لمنتخب الكويت الأولمبي والمشاركة في المباريات الدولية والتصفيات الآسيوية.', category: 'national', season: '2026/2027', clubEn: 'Kuwait Olympic Team', clubAr: 'منتخب الكويت الأولمبي', icon: 'shield', sortOrder: 2 },
  { id: 3, titleEn: 'Professional Contract', titleAr: 'عقد احترافي', descriptionEn: 'Signed a two-season professional contract (2026/2027 and 2027/2028) with the Salmiya SC first team, officially represented by Ashkanani Players Agency.', descriptionAr: 'توقيع عقد احترافي لموسمين (2026/2027 و2027/2028) مع الفريق الأول لنادي السالمية، بتمثيل رسمي من وكالة أشكناني للاعبين.', category: 'professional', season: '2026/2027', clubEn: 'Salmiya SC', clubAr: 'نادي السالمية', icon: 'file-signature', sortOrder: 3 },
  { id: 4, titleEn: 'Market Value', titleAr: 'القيمة السوقية', descriptionEn: 'Estimated market value of $500K based on current performance and league exposure.', descriptionAr: 'قيمة سوقية تقديرية 500 ألف دولار بناءً على الأداء الحالي والظهور في الدوري.', category: 'individual', season: '2024/2025', clubEn: null, clubAr: null, icon: 'trending-up', sortOrder: 4 },
]

const media: PlayerBundle['media'] = [
  { id: 1, type: 'photo', titleEn: 'Salmiya SC Jersey', titleAr: 'بلبس نادي السالمية', descriptionEn: 'Official photo of the player in the Salmiya SC kit.', descriptionAr: 'صورة رسمية للاعب بلبس نادي السالمية.', url: '/images/ahmedhussin1.jpg', thumbnailUrl: '/images/ahmedhussin1.jpg', category: 'club', takenOn: '2026-08', featured: 1, sortOrder: 1 },
  { id: 2, type: 'photo', titleEn: 'Kuwait National Team Jersey', titleAr: 'بلبس منتخب الكويت', descriptionEn: 'The player in the Kuwait National Team kit with the captain armband.', descriptionAr: 'اللاعب بلبس منتخب الكويت الوطني مع شارة القيادة.', url: '/images/ahmedhussin4.jpg', thumbnailUrl: '/images/ahmedhussin4.jpg', category: 'national', takenOn: '2026-09', featured: 1, sortOrder: 2 },
  { id: 3, type: 'photo', titleEn: 'With the Agent', titleAr: 'مع الوكيل', descriptionEn: 'Photo with the agency team during the contract signing.', descriptionAr: 'صورة مع فريق الوكالة أثناء توقيع العقد.', url: '/images/ahmedhussin2.jpg', thumbnailUrl: '/images/ahmedhussin2.jpg', category: 'club', takenOn: '2026-08', featured: 1, sortOrder: 3 },
  { id: 4, type: 'photo', titleEn: 'Announcement — Olympic Squad', titleAr: 'إعلان ضمّه للمنتخب الأولمبي', descriptionEn: 'Agency announcement after the player joined the Kuwait Olympic squad for the 20th Asian Games in Japan.', descriptionAr: 'إعلان الوكالة بعد ضمّ اللاعب لقائمة المنتخب الأولمبي لدورة الألعاب الآسيوية العشرين في اليابان.', url: '/images/ahmedhussin3.jpg', thumbnailUrl: '/images/ahmedhussin3.jpg', category: 'national', takenOn: '2026-09', featured: 0, sortOrder: 4 },
  { id: 5, type: 'photo', titleEn: 'Olympic National Team List', titleAr: 'قائمة المنتخب الأولمبي', descriptionEn: 'The player is included in the Kuwait Olympic national team list for the 20th Asian Games (Aichi-Nagoya).', descriptionAr: 'ضمن قائمة المنتخب الأولمبي لدورة الألعاب الآسيوية العشرين (آيتشي-ناغويا).', url: '/images/ahmedhussin8.jpg', thumbnailUrl: '/images/ahmedhussin8.jpg', category: 'national', takenOn: '2026-09', featured: 1, sortOrder: 5 },
  { id: 6, type: 'photo', titleEn: 'Champion — Early Years', titleAr: 'بطلاً في سنوات البدايات', descriptionEn: 'Young champion with the trophy in the 2018/2019 season.', descriptionAr: 'بطلاً في سن مبكرة مع الكأس موسم 2018/2019.', url: '/images/ahmedhussin5.jpg', thumbnailUrl: '/images/ahmedhussin5.jpg', category: 'portrait', takenOn: '2019-05', featured: 0, sortOrder: 6 },
  { id: 7, type: 'photo', titleEn: 'Rising Talent Poster', titleAr: 'بوستر بدايات الموهبة', descriptionEn: 'Early design poster for the young player.', descriptionAr: 'بوستر تصميمي في بدايات اللاعب.', url: '/images/ahmedhussin6.jpg', thumbnailUrl: '/images/ahmedhussin6.jpg', category: 'portrait', takenOn: '2020-03', featured: 0, sortOrder: 7 },
  { id: 8, type: 'photo', titleEn: 'With the Agent — Early Days', titleAr: 'مع الوكيل في البدايات', descriptionEn: 'Meeting with the agent in the early years of his career.', descriptionAr: 'لقاء مع الوكيل في بدايات المسيرة.', url: '/images/ahmedhussin7.jpg', thumbnailUrl: '/images/ahmedhussin7.jpg', category: 'club', takenOn: '2020-06', featured: 0, sortOrder: 8 },
  { id: 9, type: 'video', titleEn: 'Player Intro & Skills', titleAr: 'فيديو تعريفي ومهارات اللاعب', descriptionEn: 'Official intro video of the player and his skills.', descriptionAr: 'فيديو تعريفي رسمي باللاعب ومهاراته.', url: '/videos/ahmedhussin1.mp4', thumbnailUrl: '/images/ahmedhussin4.jpg', category: 'highlights', takenOn: '2026-08', featured: 1, sortOrder: 9 },
  { id: 10, type: 'video', titleEn: 'With the National Team — West Asia Youth Championship', titleAr: 'مع المنتخب — بطولة غرب آسيا للشباب', descriptionEn: 'Player footage with the Kuwait National Team in the West Asia Youth Championship.', descriptionAr: 'لقطات للاعب مع منتخب الكويت في بطولة غرب آسيا للشباب.', url: 'https://www.youtube.com/watch?v=N9LMTyeTJrQ', thumbnailUrl: '/images/ahmedhussin4.jpg', category: 'national', takenOn: '2025-01', featured: 1, sortOrder: 10 },
]

const matches: PlayerBundle['matches'] = [
  { id: 1, matchDate: '2026-09-12', competitionEn: 'Kuwaiti Premier League', competitionAr: 'الدوري الكويتي الممتاز', opponentEn: 'Kuwait SC', opponentAr: 'نادي الكويت', homeAway: 'home', result: '2-1', minutes: 90, goals: 1, assists: 1, rating: 8.1, venueEn: 'Salmiya Stadium', venueAr: 'ملعب السالمية', sortOrder: 1 },
  { id: 2, matchDate: '2026-09-05', competitionEn: 'Kuwaiti Premier League', competitionAr: 'الدوري الكويتي الممتاز', opponentEn: 'Al-Qadsia SC', opponentAr: 'نادي القادسية', homeAway: 'away', result: '1-1', minutes: 90, goals: 0, assists: 0, rating: 7.3, venueEn: 'Mohammed Al-Hamad Stadium', venueAr: 'ملعب محمد الحمد', sortOrder: 2 },
  { id: 3, matchDate: '2026-08-29', competitionEn: 'Kuwait National Team', competitionAr: 'منتخب الكويت الوطني', opponentEn: 'Bahrain', opponentAr: 'منتخب البحرين', homeAway: 'neutral', result: '1-0', minutes: 75, goals: 0, assists: 1, rating: 7.6, venueEn: 'Jaber Al-Ahmad International Stadium', venueAr: 'استاد جابر الأحمد الدولي', sortOrder: 3 },
  { id: 4, matchDate: '2026-08-22', competitionEn: 'Kuwaiti Premier League', competitionAr: 'الدوري الكويتي الممتاز', opponentEn: 'Al-Arabi SC', opponentAr: 'النادي العربي', homeAway: 'away', result: '0-2', minutes: 90, goals: 0, assists: 0, rating: 7.0, venueEn: 'Sabah Al-Salem Stadium', venueAr: 'ملعب صباح السالم', sortOrder: 4 },
  { id: 5, matchDate: '2026-08-15', competitionEn: 'Kuwait Federation Cup', competitionAr: 'كأس الاتحاد الكويتي', opponentEn: 'Al-Nasr SC', opponentAr: 'نادي النصر', homeAway: 'home', result: '3-0', minutes: 80, goals: 1, assists: 0, rating: 8.4, venueEn: 'Salmiya Stadium', venueAr: 'ملعب السالمية', sortOrder: 5 },
]

/** الحزمة الكاملة للاستخدام عند عدم توفر الـ API. */
export const fallbackBundle: PlayerBundle = {
  player,
  attributes,
  stats,
  career,
  achievements,
  media,
  matches,
}

/** قائمة المواسم المتوفرة محليًا. */
export const fallbackSeasons: string[] = Array.from(new Set(stats.map((item) => item.season))).sort(
  (a, b) => b.localeCompare(a)
)