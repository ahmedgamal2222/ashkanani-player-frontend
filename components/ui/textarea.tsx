import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-foreground',
        'placeholder:text-muted-foreground/70 transition-colors resize-none',
        'focus-visible:border-primary/60 focus-visible:bg-white/6 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }