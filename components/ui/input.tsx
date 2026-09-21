import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-11 w-full rounded-xl border border-white/10 bg-white/4 px-4 py-2 text-sm text-foreground',
        'placeholder:text-muted-foreground/70 transition-colors',
        'focus-visible:border-primary/60 focus-visible:bg-white/6 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export { Input }