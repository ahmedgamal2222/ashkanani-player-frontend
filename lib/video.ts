/**
 * أدوات الفيديو: تحويل روابط يوتيوب / شورتس إلى رابط تضمين داخل الموقع.
 * الروابط المحلية (مثل /videos/ahmedhussin1.mp4) تُشغَّل بمشغّل HTML5 كما هي.
 */

const YOUTUBE_PATTERNS = [
  /youtube\.com\/watch\?[^#]*v=([A-Za-z0-9_-]{6,})/,
  /youtu\.be\/([A-Za-z0-9_-]{6,})/,
  /youtube\.com\/(?:embed|shorts|live)\/([A-Za-z0-9_-]{6,})/,
]

/** يعيد رقم الفيديو في يوتيوب إن كان الرابط من يوتيوب، وإلا null. */
export function getYouTubeVideoId(url: string): string | null {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = url.match(pattern)
    if (match?.[1]) return match[1]
  }
  return null
}

/** رابط التضمين الجاهز (مع التشغيل التلقائي) أو null للروابط غير التابعة ليوتيوب. */
export function getYouTubeEmbedUrl(url: string, autoplay = true): string | null {
  const id = getYouTubeVideoId(url)
  if (!id) return null

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    ...(autoplay ? { autoplay: '1' } : {}),
  })

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`
}
