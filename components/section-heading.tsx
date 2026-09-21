'use client'

import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'center' | 'start'
  className?: string
}

/** عنوان قسم موحّد بهوية ذهبية فخمة. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.25 })

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start text-start',
        'transition-all duration-700',
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        className
      )}
    >
      {eyebrow ? (
        <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-primary/90">
          {eyebrow}
        </span>
      ) : null}

      <h2 className="font-serif text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
        <span className="text-gold-gradient">{title}</span>
      </h2>

      <span
        className={cn(
          'h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent',
          align === 'start' && 'from-primary via-primary/60'
        )}
      />

      {subtitle ? (
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}