import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="text-center">
        <p className="text-gold-gradient font-serif text-7xl font-black">404</p>
        <h1 className="mt-4 font-serif text-2xl font-bold">
          الصفحة غير موجودة — Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          الملف الذي تبحث عنه غير متوفر. يمكنك العودة إلى الملف الرسمي للاعب أحمد خورشيد.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">العودة للرئيسية</Link>
        </Button>
      </div>
    </main>
  )
}