import { ArrowUpRight, Award, GraduationCap, Layers3 } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { milestones } from '@/data/profile'

const icons = [Layers3, Award, GraduationCap]
export function Journey() {
  return <section className="journey-section section-pad" id="journey" aria-labelledby="journey-heading"><div className="page-shell"><div className="journey-intro"><SectionHeading id="journey-heading" number="04" eyebrow="THE JOURNEY SO FAR" title={<>A WORK IN <span className="serif-italic">progress.</span></>} intro="Still learning, still experimenting — and always trying to build something better than the last thing."/><ArrowUpRight className="journey-arrow" size={58}/></div><div className="milestone-list">{milestones.map((m,i)=>{ const Icon = icons[i]; return <div className="milestone" key={m.title} data-reveal><div className="milestone-year">{m.year}<span>0{i+1} / 03</span></div><div className="milestone-icon"><Icon size={23}/></div><div className="milestone-info"><h3>{m.title}</h3><p>{m.detail}</p></div><ArrowUpRight className="milestone-arrow" size={21}/></div>})}</div></div></section>
}
