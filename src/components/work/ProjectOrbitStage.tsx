import { useEffect, useLayoutEffect, useRef, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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

function getCircularOffset(index: number, activeIndex: number, length: number) {
  let offset = index - activeIndex
  if (offset > length / 2) offset -= length
  if (offset < -length / 2) offset += length
  return offset
}

function getCardPosition(offset: number) {
  const distance = Math.abs(offset)
  const direction = Math.sign(offset)
  const position = Math.min(distance, 3)
  const xByDistance = [0, 68, 128, 174]
  const scaleByDistance = [1, 0.88, 0.75, 0.66]
  const opacityByDistance = [1, 0.88, 0.5, 0]

  return {
    x: `${direction * xByDistance[position]}%`,
    y: distance === 0 ? 0 : 18 + distance * 9,
    scale: scaleByDistance[position],
    rotateZ: direction * (distance === 1 ? 1.4 : 2.6),
    opacity: opacityByDistance[position],
  }
}

function getWrappedAnimation(
  previous: ReturnType<typeof getCardPosition>,
  next: ReturnType<typeof getCardPosition>,
) {
  if (previous.opacity === 0) {
    const entryEdge = `${Math.sign(Number.parseFloat(next.x)) * 174}%`
    return {
      x: [previous.x, entryEdge, next.x],
      y: [previous.y, next.y, next.y],
      scale: [previous.scale, next.scale, next.scale],
      rotateZ: [previous.rotateZ, next.rotateZ, next.rotateZ],
      opacity: [0, 0, next.opacity],
    }
  }

  return {
    x: [previous.x, previous.x, next.x],
    y: [previous.y, previous.y, next.y],
    scale: [previous.scale, previous.scale, next.scale],
    rotateZ: [previous.rotateZ, previous.rotateZ, next.rotateZ],
    opacity: [previous.opacity, 0, 0],
  }
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
  const previousActiveIndex = useRef(activeIndex)

  useLayoutEffect(() => {
    previousActiveIndex.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    projects.forEach(({ image }) => {
      const preload = new Image()
      preload.src = image
      preload.decode?.().catch(() => undefined)
    })
  }, [projects])

  const vars = {
    '--stage-accent': visual.accent,
    '--stage-secondary': visual.secondary,
    '--stage-glow': visual.glow,
    '--stage-surface': visual.surface,
  } as CSSProperties

  return (
    <section
      className="project-showcase project-showcase--orbit"
      style={vars}
      aria-label="Featured project carousel"
    >
      <div className="project-showcase__topline">
        <span><Sparkles size={13} /> PROJECT FREQUENCY / ON AIR</span>
        <span>ENDLESS BUILD ORBIT ↗</span>
      </div>

      <div className="project-showcase__main">
        <div className="project-showcase__visual">
          <div className="project-showcase__grid" aria-hidden="true" />
          <div className="project-showcase__halo project-showcase__halo--top" aria-hidden="true" />
          <div className="project-showcase__halo project-showcase__halo--bottom" aria-hidden="true" />

          <motion.div
            className="project-showcase__deck"
            drag={reducedMotion ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70 || info.velocity.x < -450) onNext()
              else if (info.offset.x > 70 || info.velocity.x > 450) onPrev()
            }}
          >
            {projects.map((item, index) => {
              const itemVisual = projectVisuals[item.id]
              const offset = getCircularOffset(index, activeIndex, projects.length)
              const previousOffset = getCircularOffset(index, previousActiveIndex.current, projects.length)
              const position = getCardPosition(offset)
              const previousPosition = getCardPosition(previousOffset)
              const isActive = index === activeIndex
              const isFar = Math.abs(offset) === 3
              const isWrapping = (
                Math.abs(previousOffset) === 3 || isFar
              ) && Math.abs(offset - previousOffset) > 1
              const animation = isWrapping
                ? getWrappedAnimation(previousPosition, position)
                : position
              const cardVars = {
                '--card-accent': itemVisual.accent,
                '--card-secondary': itemVisual.secondary,
                '--card-surface': itemVisual.surface,
                zIndex: 20 - Math.abs(offset),
              } as CSSProperties

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  className={`project-showcase__orbit-card${isActive ? ' is-active' : ''}${isFar ? ' is-far' : ''}`}
                  style={cardVars}
                  initial={false}
                  animate={animation}
                  whileHover={reducedMotion || !isActive ? undefined : { y: -8, scale: 1.015 }}
                  transition={isWrapping ? {
                    duration: reducedMotion ? 0.01 : 0.5,
                    times: [0, 0.16, 1],
                    ease: EASE,
                  } : {
                    duration: reducedMotion ? 0.01 : 0.5,
                    ease: EASE,
                  }}
                  onClick={() => isActive ? onOpen(item) : onSelect(index)}
                  aria-label={isActive ? `Open ${item.title} project` : `Show ${item.title}`}
                  aria-pressed={isActive}
                  aria-hidden={isFar}
                  tabIndex={isFar ? -1 : 0}
                >
                  <span className="project-showcase__orbit-head">
                    <span>PROJECT / {item.number}</span>
                    <span>{item.previewType === 'live-capture' ? 'LIVE' : 'SOURCE'} · 2026</span>
                  </span>

                  <span className={`project-showcase__orbit-image project-showcase__orbit-image--${item.id}`}>
                    <img src={item.image} alt="" loading="eager" decoding="async" draggable={false} />
                    <span className="project-showcase__orbit-scan" aria-hidden="true" />
                  </span>

                  <span className="project-showcase__orbit-body">
                    <span className="project-showcase__orbit-label">{itemVisual.label}</span>
                    <strong>{item.title}</strong>
                    <span className="project-showcase__orbit-tagline">{item.tagline}</span>
                    <span className="project-showcase__orbit-foot">
                      <span>{item.technologies.slice(0, 2).join(' / ')}</span>
                      <span>{isActive ? 'OPEN PROJECT ↗' : 'SELECT'}</span>
                    </span>
                  </span>
                </motion.button>
              )
            })}
          </motion.div>

          <div className="project-showcase__gesture" aria-hidden="true">
            <span>✦</span> DRAG OR SELECT TO EXPLORE <span>✦</span>
          </div>
        </div>

        <motion.div
          key={`${project.id}-story`}
          className="project-showcase__story"
          initial={reducedMotion ? false : { y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.46, ease: EASE }}
        >
          <div className="project-showcase__story-copy">
            <div className="project-showcase__overline"><i /> NOW EXPLORING / {visual.label}</div>
            <span className="project-showcase__number">{project.number}<em> / {String(projects.length).padStart(2, '0')}</em></span>
            <h3>{project.title}<span>.</span></h3>
            <p>{project.description}</p>
          </div>
          <div className="project-showcase__story-meta">
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
