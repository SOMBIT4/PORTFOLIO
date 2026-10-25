import { useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ArrowDownToLine, ArrowUpRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { navigation, profile } from '@/data/profile'

export function Header() {
  const [open, setOpen] = useState(false)
  return <header className="site-header" id="top">
    <div className="header-inner page-shell">
      <a className="brand" href="#top" aria-label="Sombit Mazumder — back to top"><span className="brand-mark">S<span className="brand-star">✳</span>M</span><span className="brand-sub">ENGINEER / 26</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>
      <div className="header-actions">
        <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="header-resume">RÉSUMÉ <ArrowUpRight size={14}/></a>
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
          <DialogPrimitive.Trigger asChild><Button size="icon" variant="outline" className="mobile-trigger" aria-label="Open navigation"><Menu size={20}/></Button></DialogPrimitive.Trigger>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="mobile-overlay fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"/>
            <DialogPrimitive.Content className="mobile-menu fixed inset-y-0 right-0 z-[91] flex w-[min(85vw,370px)] overflow-y-auto flex-col bg-[#141c15] p-7 text-[#f2f3ec] shadow-2xl">
              <DialogPrimitive.Title className="sr-only">Navigation menu</DialogPrimitive.Title>
              <div className="flex items-center justify-between"><span className="font-mono text-xs tracking-widest">NAVIGATION / SM</span><DialogPrimitive.Close className="rounded-full border border-white/20 p-2" aria-label="Close menu"><X size={20}/></DialogPrimitive.Close></div>
              <nav className="mt-16 flex flex-col gap-7" aria-label="Mobile navigation">{navigation.map((item,index)=><a className="mobile-link" href={item.href} key={item.href} onClick={()=>setOpen(false)}><span>0{index+1}</span>{item.label}<ArrowUpRight size={22}/></a>)}</nav>
              <a href={profile.resumeUrl} className="mt-auto flex items-center gap-2 text-sm" download><ArrowDownToLine size={16}/> Download résumé</a>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      </div>
    </div>
  </header>
}
