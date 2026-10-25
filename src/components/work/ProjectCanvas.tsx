import { Component, lazy, Suspense, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { ProjectId } from '@/data/projects'
import { projectVisuals } from '@/data/projectVisuals'

const ProjectUniverseScene = lazy(() => import('@/components/3d/ProjectUniverseScene'))

let webglAvailable: boolean | null = null
function supportsWebGL(){
  if(webglAvailable!==null)return webglAvailable
  try {
    const canvas=document.createElement('canvas')
    const context=canvas.getContext('webgl2')||canvas.getContext('webgl')
    webglAvailable=Boolean(context)
    context?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {webglAvailable=false}
  return webglAvailable
}

function WebGLFallback({id}: {id:ProjectId}) {
  const v=projectVisuals[id]
  return <div className="universe-fallback" aria-hidden="true" style={{'--scene-primary':v.accent,'--scene-secondary':v.secondary} as CSSProperties}>
    <div className="universe-fallback__orbit orbit-one"/><div className="universe-fallback__orbit orbit-two"/>
    <div className="universe-fallback__solid"/><div className="universe-fallback__small one"/><div className="universe-fallback__small two"/>
  </div>
}
class WebGLBoundary extends Component<{id:ProjectId;children:ReactNode},{failed:boolean}> {
  state={failed:false}
  static getDerivedStateFromError(){return {failed:true}}
  render(){return this.state.failed?<WebGLFallback id={this.props.id}/>:this.props.children}
}

interface ProjectCanvasProps { id:ProjectId; interactive?:boolean; miniature?:boolean }
/** Mount real WebGL only when near the viewport. Helps keep GPU and WebGL context counts low. */
export function ProjectCanvas({id,interactive=false,miniature=false}:ProjectCanvasProps){
  const ref=useRef<HTMLDivElement>(null)
  const [nearViewport,setNearViewport]=useState(false)
  const [available,setAvailable]=useState(false)
  const reduceMotion=useReducedMotion()
  useEffect(()=>{setAvailable(supportsWebGL())},[])
  useEffect(()=>{
    if(!ref.current)return
    if(!('IntersectionObserver' in window)){setNearViewport(true);return}
    const observer=new IntersectionObserver(([entry])=>setNearViewport(entry.isIntersecting),{rootMargin:miniature?'90px':'190px'})
    observer.observe(ref.current)
    return ()=>observer.disconnect()
  },[miniature])
  return <div className="universe-canvas" ref={ref}>
    {available&&nearViewport ?
      <WebGLBoundary key={id} id={id}>
        <Suspense fallback={<WebGLFallback id={id}/>}>
          <ProjectUniverseScene id={id} interactive={interactive&&!reduceMotion} reducedMotion={reduceMotion} miniature={miniature}/>
        </Suspense>
      </WebGLBoundary> : <WebGLFallback id={id}/>}
  </div>
}
