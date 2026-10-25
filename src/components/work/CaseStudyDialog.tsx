import { ArrowUpRight, Github, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { Project } from '@/data/projects'

interface Props {project:Project|null;onClose:()=>void}
export function CaseStudyDialog({project,onClose}:Props) {
  return <Dialog open={Boolean(project)} onOpenChange={open=>{if(!open)onClose()}}>
    <DialogContent>
      {project&&<>
        <div className="case-topline">ENGINEERING / PROJECT DOSSIER <span>{project.number} / 06 — SELECTED WORK</span></div>
        <DialogTitle className="case-title">{project.title}<span>.</span></DialogTitle>
        <DialogDescription className="case-description">{project.description}</DialogDescription>
        <motion.div
          key={project.id}
          className={`case-art case-art--${project.id}`}
          initial={{ opacity: 0, y: 26, rotateX: -8, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="case-art__bar"><span>PROJECT CAPTURE</span><span>{project.number} / 06</span></div>
              <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
          <span className="case-art__type">{project.previewType === 'live-capture' ? 'LIVE SITE' : 'SOURCE VISUAL'}</span>
        </motion.div>
        <h4 className="case-subheading">Under the hood <span>✳</span></h4>
        <ol className="case-highlights">{project.highlights.map((highlight,i)=><li key={highlight}><span>0{i+1}</span><p>{highlight}</p></li>)}</ol>
        <div className="case-tech">{project.technologies.map(item=><span key={item}>{item}</span>)}</div>
        <div className="case-actions">
          <Button asChild variant="default"><a href={project.github} target="_blank" rel="noopener noreferrer"><Github size={17}/> Explore source <ArrowUpRight size={16}/></a></Button>
          {project.live&&<Button asChild variant="outline"><a href={project.live} target="_blank" rel="noopener noreferrer"><Eye size={17}/> Live project <ArrowUpRight size={16}/></a></Button>}
        </div>
      </>}
    </DialogContent>
  </Dialog>
}
