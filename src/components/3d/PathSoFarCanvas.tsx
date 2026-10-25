import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const PathSoFarScene = lazy(() => import('./PathSoFarScene'))

class PathSceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

let webglReady: boolean | null = null
function canRender() {
  if (webglReady !== null) return webglReady
  try {
    const test = document.createElement('canvas')
    const gl = test.getContext('webgl2') || test.getContext('webgl')
    webglReady = Boolean(gl)
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    webglReady = false
  }
  return webglReady
}

export function PathSoFarCanvas() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!ref.current || !canRender()) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '120px' }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="path-webgl"
      ref={ref}
      aria-label="Interactive 3D visualization of career timeline and milestones"
    >
      {visible && (
        <PathSceneBoundary>
          <Suspense fallback={null}>
            <PathSoFarScene reduced={reduced} />
          </Suspense>
        </PathSceneBoundary>
      )}
    </div>
  )
}
