import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors',
  {
    variants: {
      variant: {
        default: 'border-primary/40 bg-primary/12 text-primary',
        solid: 'border-transparent bg-primary text-primary-foreground',
        outline: 'border-white/15 bg-white/5 text-foreground/80',
        muted: 'border-transparent bg-white/6 text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }