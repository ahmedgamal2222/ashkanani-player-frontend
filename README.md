# Ashkanani Players Agency — Player Profile (Frontend)

واجهة موقع تعريفي فخمة للاعب **أحمد خورشيد** (نادي السالمية + منتخب الكويت الأولمبي) — من **وكالة أشكناني للاعبين، الكويت**.

- **Next.js 15** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS v4** + مكونات بنمط **shadcn/ui** (Radix + cva)
- **ثنائي اللغة** (عربي RTL / إنجليزي LTR) عبر `contexts/language-context.tsx` + `data/content.json`
- **Recharts** للرسم الراداري للسمات، **Sonner** للتنبيهات، **Lucide** للأيقونات
- بيانات اللاعب تُجلب من الـ API (HonoJS + Cloudflare D1)، ومع تعذّر الاتصال يعمل الموقع
  ببيانات احتياطية كاملة من `lib/fallback-data.ts`

## التشغيل

```bash
cd frontend
npm install
cp .env.example .env.local     # ويندوز: copy .env.example .env.local
npm run dev                    # http://localhost:3000
```

> لتشغيل بيانات حقيقية من قاعدة البيانات: شغّل الـ API أولًا (`cd ../backend && npm run dev`)
> ثم تأكد من `API_BASE_URL="http://localhost:8787"` في `.env.local`.

## الأوامر

| الأمر | الوصف |
| --- | --- |
| `npm run dev` | تشغيل الموقع محليًا |
| `npm run build` | بناء الإنتاج |
| `npm run start` | تشغيل نسخة الإنتاج |
| `npm run typecheck` | فحص أنواع TypeScript |

## استبدال الصور والفيديوهات

| الملف الحالي (Placeholder) | استبدله بـ |
| --- | --- |
| `public/images/agency-logo.svg` | لوجو وكالة أشكناني (PNG شفاف أو SVG) — حاليًا يُستخدم `https://ashkananitransfer.com/logo.png` |
| `public/images/ahmedhussin4.jpg` | صورة اللاعب الرسمية بلبس المنتخب (تُستخدم أيضًا كصورة رئيسية) |
| `public/images/ahmedhussin6.jpg` | صورة الغلاف الواسعة للهيرو |
| `public/images/ahmedhussin1.jpg` | صورة اللاعب بلبس نادي السالمية |
| `public/images/ahmedhussin2.jpg` | صورة اللاعب مع الوكيل |
| `public/images/ahmedhussin3.jpg` | إعلان ضمّه للمنتخب الأولمبي |
| `public/images/ahmedhussin5.jpg` | صورة من سنوات البدايات (مع الكأس) |
| `public/images/ahmedhussin7.jpg` | صورة مع الوكيل في البدايات |
| `public/images/ahmedhussin8.jpg` | قائمة المنتخب الأولمبي |
| `public/images/club-salmiya.svg` | شعار نادي السالمية — حاليًا يُستخدم رابط الشعار الرسمي من `api.ashkananitransfer.com` |
| `public/images/national-team-kuwait.svg` | ملف قديم غير مُستخدم — شعار المنتخب الحالي هو شعار الاتحاد الرسمي من `api.ashkananitransfer.com` |
| `public/images/federation-kfa.svg` | شعار الاتحاد الكويتي لكرة القدم — حاليًا يُستخدم رابط الشعار الرسمي من `api.ashkananitransfer.com` |
| `public/favicon.svg` | أيقونة الموقع — حاليًا تُستخدم أيقونة الوكالة الرسمية `https://ashkananitransfer.com/logo.png` (في `app/layout.tsx`) |
| `public/videos/ahmedhussin1.mp4` | الفيديو التعريفي للاعب (مهارات) |
| رابط يوتيوب | فيديو المنتخب — بطولة غرب آسيا للشباب (يُضمَّن تلقائيًا في المعرض) |

بعد إضافة الصور إما:
1. **تستبدل** الملفات بنفس الأسماء (بدون تعديل أي كود)، أو
2. تضع الصور بأسماء جديدة وتُحدّث مساراتها في `../backend/seed.sql` ثم `npm run db:seed`.

## المحتوى النصي

- كل النصوص والترجمات في ملف واحد: `data/content.json` (قسم `ar` وقسم `en`).
- كل بيانات اللاعب الرقمية تأتي من الـ API/الاحتياطية — لا تُكتب داخل المكونات.

## إخفاء الأقسام مؤقتًا (سمات اللاعب)

- الأقسام وترتيبها في `lib/site-sections.ts`.
- لإخفاء قسم من الموقع (المحتوى + القائمة العلوية + روابط الفوتر + إعادة ترقيم الأقسام):
  أضف معرّفه إلى `HIDDEN_SECTIONS` — حاليًا `'attributes'` (سمات اللاعب) مخفي مؤقتًا.
- لإعادة إظهار السمات: احذف `'attributes'` من `HIDDEN_SECTIONS` فقط، ويعود القسم بترقيمه `02` تلقائيًا.

## النشر (Vercel)

1. ارفع المجلد إلى Git.
2. في Vercel: Root Directory = `frontend`.
3. متغيرات البيئة:
   - `API_BASE_URL` = رابط Worker (مثال: `https://ashkanani-agency-api.<account>.workers.dev`)
   - `NEXT_PUBLIC_PLAYER_SLUG` = `ahmed-hussein`
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`
4. اضبط `ALLOWED_ORIGINS` في `backend/wrangler.toml` على نطاقك ثم `cd ../backend && npm run deploy`.

## النشر (Cloudflare Pages)

المشروع مضبوط على `output: 'export'` في `next.config.mjs` (تصدير ثابت)، لذا في إعدادات مشروع Pages:

| الإعداد | القيمة |
| --- | --- |
| Framework preset | `None` (وليس Next.js) |
| Build command | `npm run build` |
| Build output directory | `out` |
| متغيرات البيئة | `API_BASE_URL` = رابط الـ Worker • `NEXT_PUBLIC_SITE_URL` • `NEXT_PUBLIC_PLAYER_SLUG` |

- وسيط `/api/inquiries` يعمل عبر `functions/api/inquiries.ts` (Cloudflare Pages Function) ويقرأ رابط الـ Worker من `API_BASE_URL`.
- `app/robots.ts` و `app/sitemap.ts` فيهما `export const dynamic = 'force-static'` لأن التصدير الثابت لا يقبل المسارات الديناميكية.
- إذا تعذّر الوسيط تتصل الواجهة بالـ Worker مباشرة، لذلك أضف نطاق Pages إلى `ALLOWED_ORIGINS` في `backend/wrangler.toml` (المدعوم حاليًا: `https://*.pages.dev`).

## الأقسام البصرية والروابط الرسمية

- **`#tactical` — المركز داخل الملعب** (`components/sections/tactical.tsx`): ملعب SVG كامل (عشب محبب، خطوط الملعب، شبكات المرميين، إضاءة استاد، تظليل حواف) + الرسم 4-3-3 + مؤشر اللاعب برقم القميص ومنطقة التغطية وكرات متحركة (SMIL). موقع اللاعب يُستنتج تلقائيًا من `positionEn/positionAr` عبر `resolveSpot()`.
- **`#presence` — الحضور عالميًا** (`components/sections/presence.tsx`): **خريطة حقيقية لسطح الأرض** من صور القمر الصناعي (NASA Blue Marble بإسقاط متساوي المستطيلات 2048×1024 = 2:1) مع تلوين الهوية (طبقة كحلية + وهج ذهبي + تظليل حواف)، و:
  - **أرقام إحداثيات حقيقية** على الحواف (60°N…60°S و120°W…120°E) + خطوط المدارين + خط الاستواء وغرينتش، و**وردة بوصلة** ذهبية، و**مفتاح مقياس حقيقي** (4,000 كم ≈ 10% من عرض الخريطة عند خط الاستواء).
  - **تفاعل كامل**: مرّر أو اضغط أي سوق (على الخريطة أو من قائمة الأسواق) → يتوهج السوق وقوسه، مع بطاقة تفاصيل و**المسافة الجوية الحقيقية من الكويت** (هافرساين) — وأسماء الأسواق طبقة HTML بحجم خط ثابت وواضح على الجوال.
  - **أزرار تكبير/تصغير/إعادة** (1× → 3.5×) مثبّتة على نقطة الكويت فيبقى الدبوس في مكانه، مع **نبضات اتصال** تنطلق من الكويت.
  - **علم الكويت**: نسخة واقعية على سارية بقماش مموّج وظلال (`WavingKuwaitFlag`) في بطاقة الكويت، ونسخة مسطّحة (`KuwaitFlag`) كشارة على الدبوس وفي شارة الموقع — كلاهما من `components/kuwait-flag.tsx` بألوان العلم الرسمية.
  - إحداثيات الدبوس: `x = خط الطول + 180`، `y = 90 − خط العرض` (الكويت: 29.3759N / 47.9774E).
- **الملف الرسمي** (`components/player-links.tsx`): الهيرو يعرض شريحتين فقط — شعار **ترانسفير ماركت** (رابط `player.transfermarktUrl`) وشعار **أشكناني ترانسفير ماركت** (رابط `content.siteInfo.agencyTransfermarkt`)، وقسم الملف الشخصي يعرض بطاقات الوكالة + إنستغرام + واتساب. كل رابط يظهر مرة واحدة في أعلى الصفحة (لا تكرار).
- **شعار الوكالة** (`components/agency-logo.tsx` + `public/images/logo.png`): مكوّن `AgencyLogo` موحّد يُستخدم في الهيدر والهيرو والفوتر وقسم التواصل وبطاقات الملف، ويعرض الشعار **بألوانه الأصلية فوق الخلفية الداكنة** بلا خلفية ولا إطار (وفي الفوتر/التواصل/البطاقات داخل صندوق داكن خفيف عبر `framed`). الأبعاد تُضبط بارتفاع واحد عبر `className` (مثال: `h-16 sm:h-20 lg:h-24`) والصورة تحفظ نسبتها (`w-auto` + `object-contain`). المصدر: `/images/logo.png` محليًا، ومع `onError` يرجع تلقائيًا إلى `https://ashkananitransfer.com/logo.png` إن لم يكن الملف مرفوعًا/متاحًا — فلا يظهر الشعار فارغًا في أي حال.

## الاستجابة والتوافق مع الأجهزة

- **الناف بار**: العناصر الأساسية (الرئيسية • الملف • المركز في الملعب • الإحصائيات • المسيرة • الوسائط • التواصل) على `lg+`، والبقية (الحضور عالميًا • الإنجازات • المباريات) داخل قائمة **«المزيد»** المنسدلة. زر «اتصل بالوكالة» يظهر من `xl` (وللجوال داخل القائمة). أقل من `lg` تظهر قائمة جوال بشبكة عمودين قابلة للتمرير (حتى 78vh).
- **اسم اللاعب في الناف بار**: شعار الوكالة (`AgencyLogo` — 28px على الجوال و44px من `sm`، بلا إطار ذهبي وبلا خلفية) + **صورة اللاعب الدائرية (تظهر على كل المقاسات: 32px على الجوال و44px من `sm`)** + الاسم (يُقطع بـ`truncate` ولا يكسر التصميم)، والنص التعريفي للوكالة يظهر من `xl` فقط. لإخفاء شعار الوكالة على الجوال: بدّل `h-7 sm:h-11` إلى `hidden sm:block sm:h-11`.
- **مبدّل اللغة**: شريحة Segmented (عربي | EN) تُظهر اللغة النشطة — بدون تمدد أو ازدحام، وتعمل بـ RTL/LTR.
- **الجداول** (الإحصائيات والمباريات): تمرير أفقي بشريط ذهبي واضح عبر أداة `scroll-x`.
- **الحماية من التمرير الأفقي**: `overflow-x: hidden` + `text-size-adjust` على `body`، و`main` مقصوص (`overflow-hidden`).
- **الهيرو**: اسم اللاعب بمقاس سائل `clamp(1.8rem, 7.5vw, 5.5rem)` مع `leading-[1.15]` وحشوة صغيرة على سطر التدرّج الذهبي (`px-0.5 pb-1`) فلا يُقطع على أي جهاز؛ بطاقة اللاعب على الجوال بنسبة `4/5` (و`3/4` من `sm`) مع `min-w-0` + `truncate` للنصوص — لا اقتطاع للصورة أو النصوص. شارات الملف الرسمي (`player-links.tsx`) تأخذ عرض الشاشة كاملًا على الجوال مع `truncate` فلا يُقطع رابط ترانسفير ماركت/أشكناني.
- **منع القص الأفقي نهائيًا**: `overflow-x: clip` على `html` و`body` (Safari/iOS يحتاجها على `html`)، وإخفاء الرقم الفني الضخم على الجوال (`hidden sm:block`)، وارتفاع الهيرو `100svh` بدل `100vh`.
- **توازن العمودين على الشاشات الكبيرة**: كل شبكات العمودين تستخدم `lg:items-start` (الحضور عالميًا • المركز في الملعب • الملف الشخصي • التواصل) وتم توزيع البطاقات بحيث لا يتمدّد كارد الخريطة/الملعب بطول العمود الآخر فتبقى مساحة فارغة داخله: عمود الخريطة = (الكارد + ٦ بطاقات معلومات)، وعمود اللوحة = (العلم + الأسواق التفاعلية + بطاقة الموقع).
- **صورة اللاعب داخل الملعب**: دائرة ذهبية بصورته (مكبّرة، مثبتة من الأعلى `xMidYMin`) عبر `clipPath` على `<image>`، مع **بطاقة صورة اللاعب** داخل ركن الملعب تظهر على كل المقاسات (بدون شارة رقم — الرقم يظهر في بطاقات المعلومات وفي بطاقة اللاعب في الهيرو).
- **خطوط القواطع**: الجوال (الافتراضي) → `sm: 640` → `lg: 1024` → `xl: 1280`؛ كل الأقسام شبكات أحادية العمود على الجوال ثم تتوسّع تدريجيًا.

## بنية الملفات

```
frontend/
├─ app/                     layout + page + seo (robots/sitemap) — تصدير ثابت
├─ components/
│  ├─ sections/            أقسام الموقع: hero, profile, tactical (خريطة الملعب), stats, career,
│  │                       presence (الخريطة العالمية), achievements, media, matches, contact, footer
│  ├─ ui/                  عناصر واجهة بنمط shadcn (button, card, badge, input...)
│  ├─ player-provider.tsx  توزيع بيانات اللاعب على كل الأقسام
│  ├─ player-links.tsx     بطاقات الملف الرسمي (ترانسفير ماركت + الوكالة + إنستغرام)
│  └─ site-header.tsx      القائمة العلوية + شريط التقدم + مبدّل اللغة
├─ contexts/               إدارة اللغة (عربي/إنجليزي + RTL)
├─ data/content.json       كل النصوص المترجمة
├─ lib/                    api.ts (الاتصال بالـ API) • fallback-data.ts • types.ts • format.ts
│                          site-sections.ts (الأقسام وإظهارها/إخفاؤها) • video.ts (تضمين يوتيوب)
├─ functions/               وسيط /api/inquiries (Cloudflare Pages Function)
└─ public/                 الصور والفيديوهات والشعارات
```