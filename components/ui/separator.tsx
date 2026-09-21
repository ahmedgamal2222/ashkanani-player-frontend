import * as React from 'react'

import { cn } from '@/lib/utils'

function Separator({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<'div'> & { orientation?: 'horizontal' | 'vertical' }) {
  return (
    <div
      data-slot="separator"
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'shrink-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px bg-gradient-to-b',
        className
      )}
      {...props}
    />
  )
}

export { Separator }