import { useRef, useState, type CSSProperties } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ArrowRight, ArrowDownRight, Atom, FlaskConical, Layers3 } from 'lucide-react'
import { engineeringNotes } from '@/data/engineeringNotes'
import { LabCanvas } from '@/components/3d/LabCanvas'

export function EngineeringLab(){
  const sectionRef=useRef<HTMLElement>(null)
  const [active,setActive]=useState(0)
  const isInView=useInView(sectionRef,{amount:0.05,margin:'100px 0px 100px 0px'})
  const reduceMotion=useReducedMotion()
  const note=engineeringNotes[active]
  return <section ref={sectionRef} className={`lab-section section-pad ${isInView?'':'is-dormant'}`} id="lab" aria-labelledby="lab-heading">
    <div className="page-shell">
      <div className="lab-heading" data-reveal><div className="lab-micro"><span><FlaskConical size={15}/> 03 / ENGINEERING LAB</span><span>BEYOND THE INTERFACE / 2026</span></div><div className="lab-heading__layout"><h2 id="lab-heading">ENGINEERING<br/><em>INSIGHTS</em>.</h2><div><p>A look inside the challenges that make software interesting. Not academic publications—practical engineering investigations from the projects I built.</p><span>PROBLEMS → SYSTEMS → SOLUTIONS <ArrowDownRight size={16}/></span></div></div></div>
      <div className="lab-explorer">
        <div className="lab-index" role="tablist" aria-label="Engineering investigations"><span>SELECT AN EXPERIMENT <Atom size={16}/></span>{engineeringNotes.map((entry,i)=><button type="button" role="tab" aria-selected={i===active} aria-controls="lab-detail" id={`lab-tab-${i}`} key={entry.code} onClick={()=>setActive(i)} className={active===i?'lab-index__item active':'lab-index__item'}><span className="lab-index__number">{entry.number}</span><span className="lab-index__copy"><small>{entry.discipline}</small><strong>{entry.title}</strong></span><ArrowUpRight size={18}/></button>)}<div className="lab-index__bottom">RESEARCH MINDSET. PRODUCTION CONSTRAINTS.</div></div>
        <motion.div className="lab-display" id="lab-detail" role="tabpanel" aria-labelledby={`lab-tab-${active}`} key={note.code} style={{'--lab-color':note.color,'--lab-color-two':note.secondColor} as CSSProperties} initial={reduceMotion?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={reduceMotion?{duration:0.01}:{type:'spring',stiffness:145,damping:22,mass:0.68}}>
          <div className="lab-display__grid" aria-hidden="true"/><div className="lab-display__top"><span>EXPERIMENT / {note.code}</span><span><span className="lab-flash"/> SYSTEM ACTIVE</span></div>
          <div className={`lab-device lab-device--${active}`} aria-hidden="true"><div className="lab-device__halo"/><div className="lab-device__ring ring-one"/><div className="lab-device__ring ring-two"/><div className="lab-device__core"><Layers3 size={43} strokeWidth={1.15}/></div><div className="lab-device__node one"/><div className="lab-device__node two"/><div className="lab-device__node three"/><LabCanvas index={active}/></div>
          <div className="lab-display__body"><div className="lab-display__caption">TECHNICAL EXPLORATION / {note.discipline}</div><h3>{note.title}</h3><p>{note.blurb}</p><div className="lab-display__insight"><span>THE ENGINEERING IDEA</span><strong>{note.insight}</strong></div><ul>{note.details.map(detail=><li key={detail}>{detail}</li>)}</ul><a href="#work" onClick={()=>document.dispatchEvent(new CustomEvent('portfolio:select-project',{detail:{id:note.relatedProject}}))} className="lab-display__link">SEE RELATED PROJECT <ArrowRight size={18}/></a></div>
          <div className="lab-display__base"><span>INSIGHT RECORD / {note.number} OF 03</span><span>SM — THE SYSTEMS LAB</span></div>
        </motion.div>
      </div>
    </div>
  </section>
}
