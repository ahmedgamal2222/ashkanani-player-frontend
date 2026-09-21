/** @type {import('next').NextConfig} */

const nextConfig = {
  // Generate a static Next.js export for Cloudflare Pages
  output: 'export',

  eslint: {
    ignoreDuringBuilds: true,
  },

  // نُبقي البناء متسامحًا مع أخطاء الأنواع لتسريع التسليم
  // وللفحص الصارم شغّل: npm run typecheck
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  env: {
    NEXT_PUBLIC_PLAYER_SLUG:
      process.env.NEXT_PUBLIC_PLAYER_SLUG ?? 'ahmed-hussein',
  },
};

export default nextConfig;