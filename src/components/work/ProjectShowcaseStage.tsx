import { useEffect, useLayoutEffect, useRef, type CSSProperties, type PointerEvent } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github, Pause, Play, Sparkles } from 'lucide-react'
import type { Project } from '@/data/projects'
import { projectVisuals } from '@/data/projectVisuals'

const EASE = [0.22, 1, 0.36, 1] as const

interface Props {
  project: Project
  projects: Project[]
  activeIndex: number
  isAutoPlaying: boolean
  onToggleAutoPlay: () => void
  onPrev: () => void
  onNext: () => void
  onSelect: (index: number) => void
  onOpen: (project: Project) => void
}

export function ProjectShowcaseStage({
  project,
  projects,
  activeIndex,
  isAutoPlaying,
  onToggleAutoPlay,
  onPrev,
  onNext,
  onSelect,
  onOpen,
}: Props) {
  const visual = projectVisuals[project.id]
  const reducedMotion = useReducedMotion()
  const previousIndex = useRef(activeIndex)
  const pointerBounds = useRef<DOMRect | null>(null)
  const pointerFrame = useRef(0)
  const previous = previousIndex.current
  let direction = activeIndex >= previous ? 1 : -1
  if (previous === projects.length - 1 && activeIndex === 0) direction = 1
  if (previous === 0 && activeIndex === projects.length - 1) direction = -1

  useLayoutEffect(() => {
    previousIndex.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    projects.forEach(({ image }) => {
      const preload = new Image()
      preload.src = image
      preload.decode?.().catch(() => undefined)
    })
  }, [projects])

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 115, damping: 24, mass: 0.5 })
  const smoothY = useSpring(pointerY, { stiffness: 115, damping: 24, mass: 0.5 })
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4.5, 4.5])
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3.5, -3.5])

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = pointerBounds.current ?? event.currentTarget.getBoundingClientRect()
    const nextX = (event.clientX - bounds.left) / bounds.width - 0.5
    const nextY = (event.clientY - bounds.top) / bounds.height - 0.5
    window.cancelAnimationFrame(pointerFrame.current)
    pointerFrame.current = window.requestAnimationFrame(() => {
      pointerX.set(nextX)
      pointerY.set(nextY)
    })
  }

  const resetPointer = () => {
    pointerBounds.current = null
    window.cancelAnimationFrame(pointerFrame.current)
    pointerX.set(0)
    pointerY.set(0)
  }

  useEffect(() => () => window.cancelAnimationFrame(pointerFrame.current), [])

  const vars = {
    '--stage-accent': visual.accent,
    '--stage-secondary': visual.secondary,
    '--stage-glow': visual.glow,
    '--stage-surface': visual.surface,
  } as CSSProperties

  return (
    <section className="project-showcase" style={vars} aria-label="Featured project carousel">
      <div className="project-showcase__topline">
        <span><Sparkles size={13} /> LIVE PROJECT ARCHIVE</span>
        <span>SCREEN CAPTURE / INTERACTIVE DECK</span>
      </div>

      <div className="project-showcase__main">
        <div
          className="project-showcase__visual"
          onPointerEnter={(event) => {
            if (event.pointerType === 'mouse') pointerBounds.current = event.currentTarget.getBoundingClientRect()
          }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
        >
          <div className="project-showcase__grid" aria-hidden="true" />
          <div className="project-showcase__watermark" aria-hidden="true">{project.title}</div>

          <div className="project-showcase__deck" aria-label={`${project.title} project screenshot`}>
            <div className="project-showcase__shadow-card project-showcase__shadow-card--1" aria-hidden="true" />
            <div className="project-showcase__shadow-card project-showcase__shadow-card--2" aria-hidden="true" />

            <motion.div
              className="project-showcase__active-card"
              drag={reducedMotion ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                if (info.offset.x < -85 || info.velocity.x < -520) onNext()
                else if (info.offset.x > 85 || info.velocity.x > 520) onPrev()
              }}
              style={{ rotateX, rotateY, transformPerspective: 1400 }}
            >
              <motion.div
                key={project.id}
                className="project-showcase__card-slide"
                initial={reducedMotion ? false : {
                  x: direction * 12,
                  scale: 1.04,
                  rotateZ: direction * 0.25,
                }}
                animate={{ x: 0, scale: 1, rotateZ: 0 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.58, ease: EASE }}
              >
                <div className="project-showcase__browserbar">
                  <div><i /><i /><i /></div>
                  <span>{project.live ? new URL(project.live).hostname : 'SOURCE-OWNED PROJECT VISUAL'}</span>
                  <span>{project.number} / {String(projects.length).padStart(2, '0')}</span>
                </div>
                <div className={`project-showcase__image project-showcase__image--${project.id}`}>
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                  />
                  <div className="project-showcase__image-shade" />
                  <span className="project-showcase__capture-kind">
                    {project.previewType === 'live-capture' ? 'LIVE SITE CAPTURE' : 'REPOSITORY VISUAL'}
                  </span>
                  <button type="button" onClick={() => onOpen(project)}>
                    VIEW PROJECT <ArrowUpRight size={16} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="project-showcase__gesture" aria-hidden="true">
            <span>←</span> DRAG / SWIPE TO SLIDE <span>→</span>
          </div>
        </div>

        <motion.div
          key={`${project.id}-story`}
          className="project-showcase__story"
          initial={reducedMotion ? false : { y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.42, ease: EASE }}
        >
            <div className="project-showcase__overline">
              <i /> NOW VIEWING / {visual.label}
            </div>
            <span className="project-showcase__number">{project.number}<em> / 06</em></span>
            <h3>{project.title}<span>.</span></h3>
            <p>{project.description}</p>
            <div className="project-showcase__pills">
              {project.technologies.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}
            </div>
            <div className="project-showcase__actions">
              <motion.button type="button" onClick={() => onOpen(project)} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                Explore case study <ArrowUpRight size={17} />
              </motion.button>
              <motion.a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} source on GitHub`} whileHover={{ y: -3, rotate: 4 }}>
                <Github size={18} />
              </motion.a>
              {project.live && (
                <motion.a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live demo`} whileHover={{ y: -3, rotate: -4 }}>
                  <ExternalLink size={18} />
                </motion.a>
              )}
            </div>
        </motion.div>
      </div>

      <div className="project-showcase__controls">
        <div className="project-showcase__progress" aria-hidden="true">
          <motion.span
            key={`${project.id}-${isAutoPlaying}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isAutoPlaying ? 1 : 0 }}
            transition={{ duration: isAutoPlaying && !reducedMotion ? 5.2 : 0.01, ease: 'linear' }}
          />
        </div>
        <div className="project-showcase__steps" role="group" aria-label="Choose a featured project">
          {projects.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.title}`}
              aria-pressed={index === activeIndex}
              className={index === activeIndex ? 'active' : ''}
              onClick={() => onSelect(index)}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
        <div className="project-showcase__nav">
          <button type="button" onClick={onPrev} aria-label="Previous project"><ArrowLeft size={17} /></button>
          <button type="button" onClick={onToggleAutoPlay} aria-label={isAutoPlaying ? 'Pause project slideshow' : 'Play project slideshow'} aria-pressed={!isAutoPlaying}>
            {isAutoPlaying ? <Pause size={15} /> : <Play size={15} />}
            <span>{isAutoPlaying ? 'AUTO' : 'PAUSED'}</span>
          </button>
          <button type="button" onClick={onNext} aria-label="Next project"><ArrowRight size={17} /></button>
        </div>
      </div>
    </section>
  )
}
