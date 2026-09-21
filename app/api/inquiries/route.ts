import { NextResponse } from 'next/server'

import { API_BASE_URL } from '@/lib/api'

/**
 * وسيط (proxy) من نفس النطاق إلى الـ API (HonoJS + D1).
 * يمنحنا ميزتين:
 *  1. لا نحتاج إعداد CORS في المتصفح.
 *  2. يمكن إخفاء رابط الـ Worker وتغييره دون تعديل الواجهة.
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let body: string

  try {
    body = await request.text()
  } catch {
    return NextResponse.json(
      { success: false, error: { code: 'INVALID_BODY', message: 'تعذّر قراءة البيانات' } },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-agent': request.headers.get('user-agent') ?? 'ashkanani-frontend',
        'cf-connecting-ip':
          request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown',
      },
      body,
      cache: 'no-store',
    })

    const payload = await response.json()
    return NextResponse.json(payload, { status: response.status })
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'API_UNREACHABLE',
          message: 'تعذّر الاتصال بخادم الوكالة، يمكنك التواصل عبر واتساب.',
        },
      },
      { status: 503 }
    )
  }
}