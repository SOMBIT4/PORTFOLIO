import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva('inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[color,background,transform,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4', {
  variants: {
    variant: {
      default: 'bg-[#c8ff74] text-[#131911] hover:bg-[#dbffa7] hover:-translate-y-0.5',
      outline: 'border border-current/25 bg-transparent hover:bg-current/10',
      ghost: 'bg-transparent hover:bg-current/10',
      dark: 'bg-[#152016] text-[#eaf5e4] hover:bg-[#2e3e29] hover:-translate-y-0.5',
    },
    size: { default: 'h-11 px-6', sm: 'h-9 px-4 text-xs', lg: 'h-13 px-7', icon: 'size-11' },
  }, defaultVariants: { variant: 'default', size: 'default' },
})

type ButtonProps = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }
export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
export { buttonVariants }
