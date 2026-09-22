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

## بنية الملفات

```
frontend/
├─ app/                     layout + page + seo (robots/sitemap) — تصدير ثابت
├─ components/
│  ├─ sections/            أقسام الموقع: hero, profile, attributes, stats, career,
│  │                       achievements, media, matches, contact, footer
│  ├─ ui/                  عناصر واجهة بنمط shadcn (button, card, badge, input...)
│  ├─ player-provider.tsx  توزيع بيانات اللاعب على كل الأقسام
│  └─ site-header.tsx      القائمة العلوية + شريط التقدم + مبدّل اللغة
├─ contexts/               إدارة اللغة (عربي/إنجليزي + RTL)
├─ data/content.json       كل النصوص المترجمة
├─ lib/                    api.ts (الاتصال بالـ API) • fallback-data.ts • types.ts • format.ts
│                          site-sections.ts (الأقسام وإظهارها/إخفاؤها) • video.ts (تضمين يوتيوب)
├─ functions/               وسيط /api/inquiries (Cloudflare Pages Function)
└─ public/                 الصور والفيديوهات والشعارات
```