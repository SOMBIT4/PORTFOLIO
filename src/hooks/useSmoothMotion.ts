import { useEffect, useLayoutEffect } from 'react'
import Lenis from 'lenis'
import { animate } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const EASE = [0.22, 1, 0.36, 1] as const

export function useSmoothMotion() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({
      lerp: 0.105,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    })

    let frame = 0
    const tick = (time: number) => {
      lenis.raf(time)
      frame = window.requestAnimationFrame(tick)
    }

    const start = () => {
      if (!frame) frame = window.requestAnimationFrame(tick)
    }
    const stop = () => {
      window.cancelAnimationFrame(frame)
      frame = 0
    }
    const handleVisibility = () => document.hidden ? stop() : start()
    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      const href = anchor?.getAttribute('href')
      if (!href || href === '#') return
      const target = document.getElementById(href.slice(1))
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target, { offset: -76, duration: 1.05 })
      window.history.pushState(null, '', href)
    }

    start()
    document.addEventListener('visibilitychange', handleVisibility)
    document.addEventListener('click', handleAnchorClick)

    return () => {
      stop()
      document.removeEventListener('visibilitychange', handleVisibility)
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
    }
  }, [reduced])

  useLayoutEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (reduced) {
      items.forEach((item) => {
        item.style.opacity = '1'
        item.style.transform = 'none'
      })
      return
    }

    const running = new Set<ReturnType<typeof animate>>()
    items.forEach((item) => {
      item.style.opacity = '0'
      item.style.transform = 'translate3d(0, 34px, 0)'
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const item = entry.target as HTMLElement
        const animation = animate(
          item,
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          { duration: 0.68, ease: EASE },
        )
        running.add(animation)
        observer.unobserve(item)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 })

    items.forEach((item) => observer.observe(item))
    return () => {
      observer.disconnect()
      running.forEach((animation) => animation.stop())
    }
  }, [reduced])
}
