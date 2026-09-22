/**
 * وسيط (proxy) من نفس النطاق إلى الـ API (HonoJS + D1) — **Cloudflare Pages Function**.
 *
 * لماذا هنا وليس في `app/api/inquiries/route.ts`؟
 *   لأن الواجهة تُبنى كتصدير ثابت (`output: 'export'`) وهذا الوضع لا يدعم
 *   مسارات Next.js الديناميكية (POST / قراءة الطلب)، فيتعطّل البناء بالخطأ:
 *   `export const dynamic = "force-static"/export const revalidate not configured …`
 *   لذلك نُقل الوسيط إلى Pages Function ويعمل على المسار نفسه `/api/inquiries`.
 *
 * الفائدة:
 *  1. لا نحتاج إعداد CORS في المتصفح.
 *  2. يمكن إخفاء رابط الـ Worker وتغييره دون تعديل الواجهة.
 */
interface Env {
  API_BASE_URL?: string
  NEXT_PUBLIC_API_BASE_URL?: string
}

interface PagesContext {
  request: Request
  env: Env
}

const DEFAULT_API_BASE_URL = 'http://localhost:8787'

const resolveApiBaseUrl = (env: Env): string =>
  (env.API_BASE_URL ?? env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, '')

const jsonResponse = (payload: unknown, status: number): Response =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context

  let body: string

  try {
    body = await request.text()
  } catch {
    return jsonResponse(
      { success: false, error: { code: 'INVALID_BODY', message: 'تعذّر قراءة البيانات' } },
      400
    )
  }

  try {
    const response = await fetch(`${resolveApiBaseUrl(env)}/api/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-agent': request.headers.get('user-agent') ?? 'ashkanani-frontend',
        'cf-connecting-ip':
          request.headers.get('cf-connecting-ip') ??
          request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
          'unknown',
      },
      body,
    })

    return jsonResponse(await response.json(), response.status)
  } catch {
    return jsonResponse(
      {
        success: false,
        error: {
          code: 'API_UNREACHABLE',
          message: 'تعذّر الاتصال بخادم الوكالة، يمكنك التواصل عبر واتساب.',
        },
      },
      503
    )
  }
}
