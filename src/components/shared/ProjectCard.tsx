import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'
import { useRef, type CSSProperties, type PointerEvent } from 'react'
import { ProjectCanvas } from '@/components/work/ProjectCanvas'
import { projectVisuals } from '@/data/projectVisuals'
import type { Project } from '@/data/projects'

interface Props { project:Project;onOpen:(project:Project)=>void }

export function ProjectCard({project,onOpen}:Props){
  const ref=useRef<HTMLElement>(null)
  const visual=projectVisuals[project.id]
  const theme={'--art-accent':visual.accent,'--art-secondary':visual.secondary,'--art-glow':visual.glow,'--art-surface':visual.surface} as CSSProperties
  const onPointerMove=(event:PointerEvent<HTMLElement>)=>{
    if(event.pointerType!=='mouse'||!ref.current||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return
    const rect=ref.current.getBoundingClientRect()
    const nx=(event.clientX-rect.left)/rect.width-.5
    const ny=(event.clientY-rect.top)/rect.height-.5
    ref.current.style.setProperty('--card-rotate-y',`${nx*9}deg`)
    ref.current.style.setProperty('--card-rotate-x',`${ny*-8}deg`)
    ref.current.style.setProperty('--spot-x',`${(nx+.5)*100}%`)
    ref.current.style.setProperty('--spot-y',`${(ny+.5)*100}%`)
  }
  const reset=()=>{ref.current?.style.setProperty('--card-rotate-x','0deg');ref.current?.style.setProperty('--card-rotate-y','0deg')}
  return <article ref={ref} id={`project-${project.id}`} className={`universe-card universe-card--${project.id}`} style={theme} onPointerMove={onPointerMove} onPointerLeave={reset} data-reveal>
    <div className="universe-card__visual">
      <div className="universe-card__shine"/>
      <div className="universe-card__top"><span className="universe-card__small-caps">SOMBIT / ARCHIVE</span><span className="universe-card__small-caps">N° {visual.index}</span></div>
      <ProjectCanvas id={project.id} miniature/>
      <div className="universe-card__halo" aria-hidden="true"/>
      <span className="universe-card__glyph" aria-hidden="true">{visual.symbol}</span>
      <div className="universe-card__bottom"><span className="universe-card__art-label">{visual.label}</span><span className="universe-card__work-tag">3D STUDY / 2026</span></div>
      <button type="button" className="universe-card__explore" onClick={()=>onOpen(project)} aria-label={`Explore ${project.title} case study`}><span>EXPLORE PROJECT</span><ArrowUpRight size={17}/></button>
    </div>
    <div className="universe-card__detail">
      <div className="universe-card__category"><span className="universe-card__pulse"/> {project.category.toUpperCase()} <span>— {project.number} / 06</span></div>
      <div className="universe-card__heading"><div><h3>{project.title}</h3><p>{project.tagline}</p></div><button type="button" onClick={()=>onOpen(project)} className="universe-card__arrow" aria-label={`View case study of ${project.title}`}><ArrowUpRight size={23}/></button></div>
      <div className="universe-card__footer"><div className="universe-card__tags">{project.technologies.slice(0,3).map(tag=><span key={tag}>{tag}</span>)}</div><div className="universe-card__links"><a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub repository for ${project.title}`}><Github size={16}/></a>{project.live&&<a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Live demo of ${project.title}`}><ExternalLink size={16}/></a>}</div></div>
    </div>
  </article>
}
