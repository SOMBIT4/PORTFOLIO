import { useState, type CSSProperties, type PointerEvent } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { projectVisuals } from '@/data/projectVisuals'
import type { Project } from '@/data/projects'

interface Props {
  project: Project
  onOpen: (project: Project) => void
}

export function ProjectScreenshotCard({ project, onOpen }: Props) {
  const visual = projectVisuals[project.id]
  const reducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 140, damping: 25, mass: 0.45 })
  const smoothY = useSpring(pointerY, { stiffness: 140, damping: 25, mass: 0.45 })
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7])
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6])
  const shineX = useTransform(smoothX, [-0.5, 0.5], ['20%', '80%'])
  const shineY = useTransform(smoothY, [-0.5, 0.5], ['20%', '80%'])
  const shineBackground = useMotionTemplate`radial-gradient(420px circle at ${shineX} ${shineY}, rgba(255,255,255,.19), transparent 58%)`

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5)
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  const reset = () => {
    setHovered(false)
    pointerX.set(0)
    pointerY.set(0)
  }

  const theme = {
    '--card-accent': visual.accent,
    '--card-secondary': visual.secondary,
    '--card-glow': visual.glow,
  } as CSSProperties

  return (
    <motion.article
      id={`project-${project.id}`}
      className={`project-card project-card--${project.id}`}
      style={theme}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={onPointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={reset}
    >
      <motion.div
        className="project-card__visual"
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        animate={{ y: hovered && !reducedMotion ? -8 : 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
      >
        <div className="project-card__browserbar">
          <div><i /><i /><i /></div>
          <span>SOMBIT / PROJECT {project.number}</span>
          <span>{project.previewType === 'live-capture' ? 'LIVE CAPTURE' : 'SOURCE VISUAL'}</span>
        </div>
        <div className={`project-card__image project-card__image--${project.id}`}>
          <motion.img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            decoding="async"
            animate={{ scale: hovered && !reducedMotion ? 1.055 : 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            draggable={false}
          />
          <motion.div
            className="project-card__shine"
            style={{ background: shineBackground }}
            animate={{ opacity: hovered ? 1 : 0 }}
          />
          <div className="project-card__shade" />
          <motion.button
            type="button"
            className="project-card__view"
            onClick={() => onOpen(project)}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 16, scale: hovered ? 1 : 0.94 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            VIEW PROJECT <ArrowUpRight size={16} />
          </motion.button>
          <div className="project-card__caption">
            <span>{visual.label}</span>
            <span>{project.number} / 06</span>
          </div>
        </div>
      </motion.div>

      <div className="project-card__detail">
        <div className="project-card__category">
          <i /> {project.category.toUpperCase()} <span>— {project.number} / 06</span>
        </div>
        <div className="project-card__heading">
          <div>
            <h3>{project.title}</h3>
            <p>{project.tagline}</p>
          </div>
          <motion.button type="button" onClick={() => onOpen(project)} aria-label={`View case study of ${project.title}`} whileHover={{ rotate: 45, scale: 1.06 }} whileTap={{ scale: 0.94 }}>
            <ArrowUpRight size={22} />
          </motion.button>
        </div>
        <div className="project-card__footer">
          <div className="project-card__tags">
            {project.technologies.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}
          </div>
          <div className="project-card__links">
            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub repository for ${project.title}`}><Github size={15} /></a>
            {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Live demo of ${project.title}`}><ExternalLink size={15} /></a>}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
