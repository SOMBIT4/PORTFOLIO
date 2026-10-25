import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogTitle = DialogPrimitive.Title
const DialogDescription = DialogPrimitive.Description
const DialogClose = DialogPrimitive.Close
function DialogContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="dialog-overlay fixed inset-0 z-[100] bg-[#060a06]/80 backdrop-blur-lg" />
    <DialogPrimitive.Content className={cn('dialog-content fixed left-1/2 top-1/2 z-[101] max-h-[90dvh] w-[min(94vw,740px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[20px] border border-white/12 bg-[#141a15] p-6 text-[#f2f3ec] shadow-2xl outline-none sm:p-9', className)} {...props}>
      {children}
      <DialogPrimitive.Close aria-label="Close project details" className="absolute right-5 top-5 rounded-full border border-white/20 p-2 text-white/80 hover:text-white focus-visible:ring-2 focus-visible:ring-[#c8ff74]"><X size={16}/></DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
}
export { Dialog, DialogTrigger, DialogTitle, DialogDescription, DialogClose, DialogContent }
