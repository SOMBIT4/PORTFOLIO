import { lazy, Suspense, Component, useEffect, useRef, useState, type ReactNode } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const OrbitalScene = lazy(() => import('./OrbitalScene'))

class SceneBoundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <OrbitalFallback /> : this.props.children }
}

function OrbitalFallback() {
  return <div className="orbit-fallback" aria-hidden="true"><div className="orbit-fallback__ring one"/><div className="orbit-fallback__ring two"/><div className="orbit-fallback__core"/></div>
}

let webglReady: boolean | null = null
function canRenderWebGL() {
  if (webglReady !== null) return webglReady
  try {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl')
    webglReady = Boolean(context)
    context?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    webglReady = false
  }
  return webglReady
}

export function OrbitalExperience() {
  const reduced = useReducedMotion()
  const compact = useMediaQuery('(max-width: 767px)')
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)
  const [ready, setReady] = useState(false)
  const hasWebGL = typeof window !== 'undefined' && canRenderWebGL()

  useEffect(() => {
    if (reduced || compact || !hasWebGL || !root.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '80px 0px', threshold: 0.01 },
    )
    observer.observe(root.current)
    return () => observer.disconnect()
  }, [compact, hasWebGL, reduced])

  useEffect(() => {
    if (reduced || compact || !hasWebGL) return
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    const idleId = idleWindow.requestIdleCallback?.(() => setReady(true), { timeout: 1100 })
    const fallbackId = idleId === undefined ? window.setTimeout(() => setReady(true), 650) : 0
    return () => {
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId)
      if (fallbackId) window.clearTimeout(fallbackId)
    }
  }, [compact, hasWebGL, reduced])

  if (reduced || compact || !hasWebGL) return <OrbitalFallback />
  return <div className="orbital-experience" ref={root}>
    {!ready ? <OrbitalFallback /> : (
      <SceneBoundary>
        <Suspense fallback={<OrbitalFallback />}><OrbitalScene active={active} /></Suspense>
      </SceneBoundary>
    )}
  </div>
}
