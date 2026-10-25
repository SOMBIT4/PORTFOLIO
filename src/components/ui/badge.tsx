import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em]', {
  variants: { variant: { default: 'border-[#c8ff74]/30 bg-[#c8ff74]/10 text-[#d6ff9c]', muted: 'border-black/12 bg-black/5 text-[#434a42]', outline: 'border-current/25 text-current' } },
  defaultVariants: { variant: 'default' },
})
export function Badge({ className, variant, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant, className }))} {...props} />
}
