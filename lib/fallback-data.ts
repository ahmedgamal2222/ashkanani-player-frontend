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
  weightKg: 65,
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
  transfermarktUrl: 'https://www.transfermarkt.com/ahmed-awadh/transfers/spieler/1115547/transfer_id/6434546',
  photoUrl: '/images/ahmedhussin4.jpg',
  heroImageUrl: '/images/ahmedhussin6.jpg',
  bioEn:
    'Ahmed Hussein Khoursheed is a Kuwaiti central midfielder born in 2005 who joined Al-Arabi SC at the age of eight and progressed through every youth stage: named Best Player of the Season at Under-13 (2005/2006 generation), he played the Under-13 Cup and the Under-15 League, then the Under-17 League where he scored around 20 goals and finished runner-up in every competition, before recording about 18 assists and 4 goals at the Under-20 stage. He made his first-team debut at 17, represented Kuwait at every age level (Under-17, Under-20 and the Olympic Team) and captained the 2005 and 2006 national teams at all stages, with around 14 official international appearances (excluding friendlies and camps), 4 international goals and more than 15 Man-of-the-Match awards. He then signed a two-season contract (2026/2027 – 2027/2028) with Salmiya SC to play for the first team, and represents the Kuwait Olympic Team. A modern midfielder who is equally comfortable on both feet, he links defence and attack through fast ball circulation, intelligent positioning and aggressive pressing. With a low centre of gravity he excels in tight spaces, covers large distances across the pitch and takes responsibility in build-up play and set pieces. Signed as a professional player and officially represented by Ashkanani Players Agency in Kuwait.',
  bioAr:
    'أحمد حسين خورشيد لاعب وسط كويتي من مواليد 2005، بدأ رحلته الكروية في نادي العربي من عمر 8 سنوات وتدرّج في جميع المراحل السنية: اختير أفضل لاعب في الموسم لفئة تحت 13 سنة (مواليد 2005/2006)، ولعب بطولة كأس تحت 13 ودوري تحت 15، ثم فئة تحت 17 التي سجّل فيها ما يقارب 20 هدفًا وأنهى كل مسابقاتها بالمركز الثاني، وسجّل في فئة تحت 20 قرابة 18 تمريرة حاسمة و4 أهداف. شارك مع الفريق الأول لأول مرة بعمر 17 سنة، ومثّل منتخبات الكويت في جميع المراحل السنية (الناشئين والشباب والأولمبي)، وصعد إلى المنتخب الأولمبي مع جيل 2001 وكان أصغر لاعب يصعد، وقاد منتخبي 2005 و2006 في جميع المراحل، وخاض ما يقارب 14 مباراة دولية رسمية (بدون الوديات والمعسكرات) سجّل فيها 4 أهداف، ونال جائزة أفضل لاعب في المباراة أكثر من 15 مرة. ثم وقّع عقدًا لموسمين (2026/2027 – 2027/2028) مع نادي السالمية للفريق الأول، ويمثّل منتخب الكويت الأولمبي. لاعب وسط عصري يجيد اللعب بكلتا القدمين، يربط بين الدفاع والهجوم بسرعة تدوير الكرة وذكاء في التمركز وضغط قوي على الخصم. بمركز ثقل منخفض يتألق في المساحات الضيقة ويغطي مساحات واسعة داخل الملعب، ويتحمل مسؤولية بناء اللعب والكرات الثابتة. موقّع كلاعب محترف ومُمثَّل رسميًا من وكالة أشكناني للاعبين في الكويت.',
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
  // المراحل السنية — الأرقام كما أبلغها اللاعب (تقريبية)
  { id: 1, season: '2017/2018', stageKey: 'u13', competitionEn: 'Kuwait U-13 League & Cup — Al-Arabi SC', competitionAr: 'دوري وكأس الكويت تحت 13 سنة — النادي العربي', noteEn: 'Career start at Al-Arabi SC, the Under-13 Best Player of the Season award (2005/2006 generation) and the U-13 Cup.', noteAr: 'بداية المسيرة في النادي العربي، ولقب أفضل لاعب في الموسم لفئة تحت 13 سنة (مواليد 2005/2006)، والمشاركة في كأس تحت 13.', appearances: 0, starts: 0, minutes: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0, passAccuracy: 0, duelsWonPct: 0, rating: 0 },
  { id: 2, season: '2019/2020', stageKey: 'u15', competitionEn: 'Kuwait U-15 League — Al-Arabi SC', competitionAr: 'دوري الكويت تحت 15 سنة — النادي العربي', noteEn: 'Development through the Al-Arabi SC youth sector and the Kuwait Under-15 League.', noteAr: 'التدرّج في قطاع الفئات السنية بالنادي العربي والمشاركة في دوري الكويت تحت 15 سنة.', appearances: 0, starts: 0, minutes: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0, passAccuracy: 0, duelsWonPct: 0, rating: 0 },
  { id: 3, season: '2021/2022', stageKey: 'u17', competitionEn: 'Kuwait U-17 League — Al-Arabi SC', competitionAr: 'دوري الكويت للناشئين تحت 17 سنة — النادي العربي', noteEn: 'A standout youth stage: around 20 goals, with runner-up finishes across the stage competitions.', noteAr: 'محطة بارزة في الفئات السنية: نحو 20 هدفًا، مع إنهاء مسابقات المرحلة في المركز الثاني.', appearances: 0, starts: 0, minutes: 0, goals: 20, assists: 0, yellowCards: 0, redCards: 0, passAccuracy: 0, duelsWonPct: 0, rating: 0 },
  { id: 4, season: '2022/2023', stageKey: 'u20', competitionEn: 'Kuwait U-20 League — Al-Arabi SC', competitionAr: 'دوري الكويت للشباب تحت 20 سنة — النادي العربي', noteEn: 'Around 18 assists and 4 goals at the Under-20 stage.', noteAr: 'نحو 18 تمريرة حاسمة و4 أهداف في مرحلة تحت 20 سنة.', appearances: 0, starts: 0, minutes: 0, goals: 4, assists: 18, yellowCards: 0, redCards: 0, passAccuracy: 0, duelsWonPct: 0, rating: 0 },
  { id: 5, season: '2022/2023', stageKey: 'first_team', competitionEn: 'First Team — Al-Arabi SC (Kuwaiti Premier League)', competitionAr: 'الفريق الأول — النادي العربي (الدوري الكويتي الممتاز)', noteEn: 'First-team debut for Al-Arabi SC at the age of 17.', noteAr: 'أول مشاركة مع الفريق الأول للنادي العربي في سن 17.', appearances: 0, starts: 0, minutes: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0, passAccuracy: 0, duelsWonPct: 0, rating: 0 },
  { id: 6, season: '2021/2022 — 2026/2027', stageKey: 'national', competitionEn: 'Kuwait National Teams — All Age Levels (U-17, U-20, Olympic)', competitionAr: 'منتخبات الكويت — جميع المراحل السنية (ناشئين، شباب، أولمبي)', noteEn: 'Represented Kuwait at every age level (U-17, U-20 and the Olympic Team) and captained the 2005 and 2006 national teams — 14 official international appearances and 4 goals (excluding friendlies and training camps).', noteAr: 'تمثيل منتخبات الكويت في جميع المراحل السنية (الناشئين والشباب والأولمبي) وقيادة منتخبي 2005 و2006، مع 14 مباراة دولية رسمية و4 أهداف (باستثناء المباريات الودية والمعسكرات).', appearances: 14, starts: 0, minutes: 0, goals: 4, assists: 0, yellowCards: 0, redCards: 0, passAccuracy: 0, duelsWonPct: 0, rating: 0 },
]

const career: PlayerBundle['career'] = [
  { id: 1, clubEn: 'Salmiya SC', clubAr: 'نادي السالمية', clubLogo: 'https://api.ashkananitransfer.com/storage/clubs/logos/j94fkz5qTn8imlOdS7El8udjbnS47W7y46o9V8w8.png', leagueEn: 'Kuwaiti Premier League — First Team', leagueAr: 'الدوري الكويتي الممتاز — الفريق الأول', seasonFrom: '2026/2027', seasonTo: '2027/2028', isCurrent: 1, appearances: 0, goals: 0, assists: 0, sortOrder: 1 },
  { id: 2, clubEn: 'Al-Arabi SC', clubAr: 'النادي العربي', clubLogo: 'https://upload.wikimedia.org/wikipedia/ar/thumb/a/a2/%D8%B4%D8%B9%D8%A7%D8%B1_%D8%A7%D9%84%D9%86%D8%A7%D8%AF%D9%8A_%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A_%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA%D9%8A.svg/960px-%D8%B4%D8%B9%D8%A7%D8%B1_%D8%A7%D9%84%D9%86%D8%A7%D8%AF%D9%8A_%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A_%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA%D9%8A.svg.png', leagueEn: 'Kuwaiti Premier League — Youth Stages (U-13 → U-20) to First Team', leagueAr: 'الدوري الكويتي الممتاز — المراحل السنية (تحت 13 → تحت 20) إلى الفريق الأول', seasonFrom: '2013/2014', seasonTo: '2025/2026', isCurrent: 0, appearances: 0, goals: 24, assists: 18, sortOrder: 2 },
  { id: 3, clubEn: 'Kuwait National Teams', clubAr: 'منتخبات الكويت — جميع المراحل السنية', clubLogo: 'https://api.ashkananitransfer.com/storage/clubs/logos/Y7K4Eh3L6W9HzrMrg9IAiepd58ICEsdfgpZqIbxZ.png', leagueEn: 'International — U-17, U-20 & Olympic Team', leagueAr: 'مباريات دولية — الناشئين والشباب والأولمبي', seasonFrom: '2021/2022', seasonTo: null, isCurrent: 1, appearances: 14, goals: 4, assists: 0, sortOrder: 3 },
]

const achievements: PlayerBundle['achievements'] = [
  { id: 1, titleEn: 'League', titleAr: 'الدوري', descriptionEn: 'Regular starter with Al-Arabi SC in the Kuwaiti Premier League across the 2025/2026 season, before completing a two-season move to Salmiya SC.', descriptionAr: 'أساسي مع النادي العربي في الدوري الكويتي الممتاز خلال موسم 2025/2026، قبل إتمام انتقاله لموسمين إلى نادي السالمية.', category: 'league', season: '2025/2026', clubEn: 'Al-Arabi SC', clubAr: 'النادي العربي', icon: 'trophy', sortOrder: 1 },
  { id: 2, titleEn: 'National Team', titleAr: 'المنتخب الوطني', descriptionEn: 'Called up to the Kuwait Olympic Team and played for the national teams at every age level: around 14 official international appearances (excluding friendlies and camps) with 4 goals.', descriptionAr: 'استدعاء لمنتخب الكويت الأولمبي واللعب مع منتخبات جميع المراحل السنية: قرابة 14 مباراة دولية رسمية (بدون الوديات والمعسكرات) و4 أهداف.', category: 'national', season: '2026/2027', clubEn: 'Kuwait Olympic Team', clubAr: 'منتخب الكويت الأولمبي', icon: 'shield', sortOrder: 2 },
  { id: 3, titleEn: 'Professional Contract', titleAr: 'عقد احترافي', descriptionEn: 'Signed a two-season professional contract (2026/2027 and 2027/2028) with the Salmiya SC first team, officially represented by Ashkanani Players Agency.', descriptionAr: 'توقيع عقد احترافي لموسمين (2026/2027 و2027/2028) مع الفريق الأول لنادي السالمية، بتمثيل رسمي من وكالة أشكناني للاعبين.', category: 'professional', season: '2026/2027', clubEn: 'Salmiya SC', clubAr: 'نادي السالمية', icon: 'file-signature', sortOrder: 3 },
  { id: 4, titleEn: 'Market Value', titleAr: 'القيمة السوقية', descriptionEn: 'Estimated market value of $500K based on current performance and league exposure.', descriptionAr: 'قيمة سوقية تقديرية 500 ألف دولار بناءً على الأداء الحالي والظهور في الدوري.', category: 'individual', season: '2024/2025', clubEn: null, clubAr: null, icon: 'trending-up', sortOrder: 4 },
  { id: 5, titleEn: 'Man of the Match — 15+ Times', titleAr: 'أفضل لاعب في المباراة — أكثر من 15 مرة', descriptionEn: 'Named Man of the Match more than 15 times across club and national team matches.', descriptionAr: 'اختير أفضل لاعب في المباراة أكثر من 15 مرة مع الأندية والمنتخبات.', category: 'individual', season: '2022/2023 — 2026/2027', clubEn: null, clubAr: null, icon: 'award', sortOrder: 5 },
  { id: 6, titleEn: 'Captain — 2005 & 2006 National Teams', titleAr: 'قائد منتخبي 2005 و2006', descriptionEn: 'Captained the Kuwait national teams of the 2005 and 2006 generations at every age level.', descriptionAr: 'قائد منتخبات الكويت لمواليد 2005 و2006 في جميع المراحل السنية.', category: 'individual', season: '2021/2022 — 2023/2024', clubEn: null, clubAr: null, icon: 'award', sortOrder: 6 },
  { id: 7, titleEn: 'Youngest Player Promoted — Olympic Team', titleAr: 'أصغر لاعب يصعد للمنتخب الأولمبي', descriptionEn: 'Promoted to the Kuwait Olympic Team with the 2001 generation as the youngest player in the squad.', descriptionAr: 'صعد إلى منتخب الكويت الأولمبي مع جيل 2001 وكان أصغر لاعب يصعد في تلك المجموعة.', category: 'national', season: '2024', clubEn: 'Kuwait Olympic Team', clubAr: 'منتخب الكويت الأولمبي', icon: 'shield', sortOrder: 7 },
  { id: 8, titleEn: 'First-Team Debut at 17', titleAr: 'أول مشاركة مع الفريق الأول بعمر 17 سنة', descriptionEn: 'Made his official first-team debut for Al-Arabi SC at the age of 17.', descriptionAr: 'أول مشاركة رسمية مع الفريق الأول لنادي العربي في عمر 17 سنة.', category: 'professional', season: '2022/2023', clubEn: 'Al-Arabi SC', clubAr: 'النادي العربي', icon: 'file-signature', sortOrder: 8 },
  { id: 9, titleEn: 'U-20 Stage — 18 Assists', titleAr: 'فئة تحت 20 سنة — 18 تمريرة حاسمة', descriptionEn: 'Around 18 assists and 4 goals during the Under-20 youth stage with Al-Arabi SC.', descriptionAr: 'قرابة 18 تمريرة حاسمة و4 أهداف في مرحلة تحت 20 سنة مع النادي العربي.', category: 'individual', season: '2022/2023', clubEn: 'Al-Arabi SC', clubAr: 'النادي العربي', icon: 'trending-up', sortOrder: 9 },
  { id: 10, titleEn: 'U-17 Stage — 20 Goals & Runner-Up', titleAr: 'فئة تحت 17 سنة — 20 هدفًا والمركز الثاني', descriptionEn: 'Scored around 20 goals in the Under-17 stage and finished second in every competition.', descriptionAr: 'سجّل قرابة 20 هدفًا في مرحلة تحت 17 سنة وأنهى كل مسابقاتها بالمركز الثاني.', category: 'league', season: '2021/2022', clubEn: 'Al-Arabi SC', clubAr: 'النادي العربي', icon: 'trophy', sortOrder: 10 },
  { id: 11, titleEn: 'U-15 League', titleAr: 'دوري تحت 15 سنة', descriptionEn: 'Featured with the Under-15 team in the Kuwaiti youth league.', descriptionAr: 'المشاركة مع فريق تحت 15 سنة في دوري الكويت للفئات السنية.', category: 'league', season: '2019/2020', clubEn: 'Al-Arabi SC', clubAr: 'النادي العربي', icon: 'trophy', sortOrder: 11 },
  { id: 12, titleEn: 'U-13 Cup', titleAr: 'كأس تحت 13 سنة', descriptionEn: 'Featured with the Under-13 team in the Kuwaiti U-13 Cup.', descriptionAr: 'المشاركة مع فريق تحت 13 سنة في بطولة كأس الكويت تحت 13 سنة.', category: 'league', season: '2017/2018', clubEn: 'Al-Arabi SC', clubAr: 'النادي العربي', icon: 'trophy', sortOrder: 12 },
  { id: 13, titleEn: 'Best Player of the Season — U-13', titleAr: 'أفضل لاعب في الموسم — تحت 13 سنة', descriptionEn: 'Named Best Player of the Season for the Under-13 category (2005/2006 generation).', descriptionAr: 'اختير أفضل لاعب في الموسم لفئة تحت 13 سنة (مواليد 2005/2006).', category: 'individual', season: '2017/2018', clubEn: 'Al-Arabi SC', clubAr: 'النادي العربي', icon: 'award', sortOrder: 13 },
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

// سكشن «المباريات الأخيرة» أُلغي (لا توجد مباريات موثّقة بعد) — واستُبدل بقسم «أسلوب اللعب» التفاعلي.
const matches: PlayerBundle['matches'] = []

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