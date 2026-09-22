import { NextResponse } from 'next/server'

/**
 * ⚠️ هذا المسار لم يعد الوسيط إلى الـ API (HonoJS + D1).
 *
 * السبب: الواجهة تُبنى كتصدير ثابت (`output: 'export'`) وهذا الوضع لا يدعم
 * مسارات Next.js الديناميكية (POST / قراءة الطلب)، وكان وجوده يُعطّل بناء
 * Cloudflare Pages بهذا الخطأ:
 *   `export const dynamic = "force-static"/export const revalidate not configured …`
 *
 * لذلك تم نقل الوسيط كما هو (بنفس المنطق والترويسات) إلى:
 *   `functions/api/inquiries.ts`  ← Cloudflare Pages Function على نفس المسار `/api/inquiries`
 *
 * وإن أرغبت في حذف هذا الملف نهائيًا:  Remove-Item -Recurse -Force app\api
 * (المتصفح يرسل POST إلى /api/inquiries الذي تلتقطه Pages Function، والواجهة
 *  في `lib/api.ts` تُجرب وسيط النطاق نفسه ثم تتصل بالـ Worker مباشرة كخطة بديلة.)
 */
export const dynamic = 'force-static'

/** مسار ثابت للتوضيح فقط — الإرسال يكون بـ POST إلى /api/inquiries. */
export async function GET() {
  return NextResponse.json({
    success: false,
    error: {
      code: 'USE_POST',
      message: 'أرسل الرسالة عبر POST إلى /api/inquiries — الوسيط موجود في functions/api/inquiries.ts',
    },
  })
}
