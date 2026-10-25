import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Move3d, Sparkles, ExternalLink } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ProjectCanvas } from './ProjectCanvas'
import type { Project } from '@/data/projects'
import { projectVisuals } from '@/data/projectVisuals'

interface Props { project:Project;onPrev:()=>void;onNext:()=>void;onOpen:(project:Project)=>void;onSelect:(index:number)=>void;activeIndex:number;projects:Project[] }
export function ProjectStage({project,onPrev,onNext,onOpen,onSelect,activeIndex,projects}:Props){
  const visual=projectVisuals[project.id]
  const vars={'--stage-accent':visual.accent,'--stage-secondary':visual.secondary,'--stage-glow':visual.glow,'--stage-surface':visual.surface} as CSSProperties
  return <div className="project-stage" style={vars}>
    <div className="project-stage__top"><span><Sparkles size={14}/> THE INTERACTIVE ARCHIVE</span><span>VOL. I &nbsp; • &nbsp; 2026</span></div>
    <div className="project-stage__main">
      <div className="project-stage__story">
        <div className="project-stage__overline"><span className="project-stage__live-dot"/> NOW VIEWING / {visual.label}</div>
        <div key={`${project.id}-copy`} className="project-stage__copy"><div className="project-stage__number">{project.number}<span> / 06</span></div><h3>{project.title}<span>.</span></h3><p>{project.description}</p></div>
        <div className="project-stage__pills">{project.technologies.slice(0,4).map(t=><span key={t}>{t}</span>)}</div>
        <div className="project-stage__actions"><button type="button" className="project-stage__primary" onClick={()=>onOpen(project)}>Explore case study <ArrowUpRight size={18}/></button><a className="project-stage__source" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} source on GitHub`}><Github size={19}/></a>{project.live&&<a className="project-stage__source" href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live demo`}><ExternalLink size={19}/></a>}</div>
      </div>
      <div className="project-stage__art" key={project.id}>
        <div className="project-stage__grid" aria-hidden="true"/>
        <div className="project-stage__orbital" aria-hidden="true"/>
        <ProjectCanvas id={project.id} interactive />
        <div className="project-stage__floating-stat"><span>ENGINEERING SIGNAL</span><strong>{visual.stat}</strong><small>{visual.statLabel}</small></div>
        <div className="project-stage__rotate-hint"><Move3d size={15}/> DRAG TO ORBIT</div>
      </div>
    </div>
    <div className="project-stage__controls"><div className="project-stage__steps" role="group" aria-label="Choose a featured project">{projects.map((p,i)=><button key={p.id} type="button" aria-label={`Show ${p.title}`} aria-pressed={i===activeIndex} title={p.title} className={i===activeIndex?'active':''} onClick={()=>onSelect(i)}><span/>{`0${i+1}`}</button>)}</div><div className="project-stage__nav"><span>ORBIT THROUGH THE WORK</span><button type="button" onClick={onPrev} aria-label="Previous project"><ArrowLeft size={20}/></button><button type="button" onClick={onNext} aria-label="Next project"><ArrowRight size={20}/></button></div></div>
  </div>
}
