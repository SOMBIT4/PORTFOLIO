import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowLeft, ArrowRight, Pause, Play, Radio } from 'lucide-react'
import { skillDisciplines, skillEntries, type SkillEntry } from '@/data/skills'

const ALL = 'all'
const EASE = [0.22, 1, 0.36, 1] as const

function repeatForStream(entries: SkillEntry[]) {
  const copies = Math.max(1, Math.ceil(6 / entries.length))
  return Array.from({ length: copies }, () => entries).flat()
}

export function Expertise() {
  const [activeId, setActiveId] = useState(ALL)
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const pointerBounds = useRef<DOMRect | null>(null)
  const pointerFrame = useRef(0)
  const isInView = useInView(sectionRef, { amount: 0.08, margin: '100px 0px 100px 0px' })

  const activeDiscipline = useMemo(
    () => skillDisciplines.find((discipline) => discipline.id === activeId) ?? null,
    [activeId],
  )

  const visibleEntries = useMemo(
    () => (activeDiscipline
      ? skillEntries.filter((entry) => entry.disciplineId === activeDiscipline.id)
      : skillEntries),
    [activeDiscipline],
  )

  const featuredIndex = activeIndex % visibleEntries.length
  const featured = visibleEntries[featuredIndex]
  const streamEntries = useMemo(() => repeatForStream(visibleEntries), [visibleEntries])

  useEffect(() => {
    if (paused || reduceMotion || !isInView || visibleEntries.length < 2) return
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % visibleEntries.length)
    }, 3200)
    return () => window.clearInterval(interval)
  }, [isInView, paused, reduceMotion, visibleEntries.length])

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 95, damping: 22, mass: 0.45 })
  const smoothY = useSpring(pointerY, { stiffness: 95, damping: 22, mass: 0.45 })
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-2.6, 2.6])
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2.2, -2.2])

  const selectDiscipline = (id: string) => {
    setActiveId(id)
    setActiveIndex(0)
  }

  const step = (direction: number) => {
    setActiveIndex((index) => (index + direction + visibleEntries.length) % visibleEntries.length)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !isInView || event.pointerType !== 'mouse') return
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

  return (
    <section
      ref={sectionRef}
      className="expertise-section section-pad"
      id="expertise"
      aria-labelledby="expertise-heading"
      style={{ '--expertise-accent': featured.accent } as CSSProperties}
    >
      <div className="expertise-aurora" aria-hidden="true" />
      <div className="page-shell">
        <header className="expertise-editorial" data-reveal>
          <div className="expertise-editorial__main">
            <div className="eyebrow-row">
              <span className="section-kicker">
                <span className="small-plus">✳</span> ENGINEERING &amp; EXPERTISE
              </span>
              <span className="section-index">02 / CAPABILITIES</span>
            </div>
            <h2 id="expertise-heading" className="expertise-title">
              FULL STACK,
              <span>in motion.</span>
            </h2>
          </div>
          <aside className="expertise-editorial__note">
            <strong>{String(skillEntries.length).padStart(2, '0')}</strong>
            <span>TECHNICAL SKILLS</span>
            <p>
              One résumé-grounded toolkit, moving across interfaces, application logic, data, and delivery.
            </p>
          </aside>
        </header>

        <div className="expertise-filterbar" data-reveal>
          <div className="expertise-filterbar__label">
            <Radio size={14} aria-hidden="true" />
            <span>FILTER THE SIGNAL</span>
          </div>
          <div className="expertise-filters" role="group" aria-label="Filter résumé skills by discipline">
            <button
              type="button"
              className={activeId === ALL ? 'active' : ''}
              aria-pressed={activeId === ALL}
              onClick={() => selectDiscipline(ALL)}
            >
              <span>00</span> All skills <em>{skillEntries.length}</em>
            </button>
            {skillDisciplines.map((discipline) => (
              <button
                key={discipline.id}
                type="button"
                className={activeId === discipline.id ? 'active' : ''}
                aria-pressed={activeId === discipline.id}
                onClick={() => selectDiscipline(discipline.id)}
                style={{ '--filter-accent': discipline.accent } as CSSProperties}
              >
                <span>{discipline.number}</span> {discipline.label} <em>{discipline.tools.length}</em>
              </button>
            ))}
          </div>
        </div>

        <div className="expertise-transmission-wrap">
          <motion.div
            className={`expertise-transmission ${paused ? 'is-paused' : ''} ${isInView ? '' : 'is-dormant'}`}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') pointerBounds.current = event.currentTarget.getBoundingClientRect()
            }}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
          >
            <div className="expertise-transmission__grid" aria-hidden="true" />
            <div className="expertise-transmission__beam" aria-hidden="true" />

            <div className="expertise-transmission__topline">
              <span><i aria-hidden="true" /> LIVE TECHNOLOGY TRANSMISSION</span>
              <span>{activeDiscipline?.code ?? 'ALL DISCIPLINES / OPEN RANGE'}</span>
            </div>

            <div className="expertise-lane expertise-lane--far" aria-hidden="true">
              <div className="expertise-lane__track">
                {[0, 1].map((set) => (
                  <div className="expertise-lane__set" key={set}>
                    {streamEntries.map((entry, index) => (
                      <span key={`${set}-${entry.name}-${index}`}>{entry.name}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="expertise-lane expertise-lane--near" aria-hidden="true">
              <div className="expertise-lane__track">
                {[0, 1].map((set) => (
                  <div className="expertise-lane__set" key={set}>
                    {[...streamEntries].reverse().map((entry, index) => (
                      <span key={`${set}-${entry.name}-${index}`}>{entry.note}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="expertise-feature" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${featured.disciplineId}-${featured.name}`}
                  className="expertise-feature__content"
                  initial={{ opacity: 0, y: 22, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 1.035 }}
                  transition={reduceMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 150, damping: 22, mass: 0.68 }}
                >
                  <span className="expertise-feature__discipline">{featured.disciplineCode}</span>
                  <strong>{featured.name}</strong>
                  <p>{featured.note}</p>
                  <span className="expertise-feature__kind">{featured.kind}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="expertise-transmission__coordinates" aria-hidden="true">
              <span>DEPTH / 04</span>
              <span>SIGNAL {String(featuredIndex + 1).padStart(2, '0')}</span>
              <span>EST. 2026</span>
            </div>

            <div className="expertise-transmission__controls">
              <div className="expertise-transmission__status">
                <span>THE TOOLKIT</span>
                <p>{activeDiscipline?.summary ?? 'Many tools. One direction. Always moving forward.'}</p>
              </div>
              <div className="expertise-transmission__buttons">
                <button type="button" onClick={() => step(-1)} aria-label="Previous skill">
                  <ArrowLeft size={15} /> PREV
                </button>
                <button
                  type="button"
                  onClick={() => setPaused((value) => !value)}
                  aria-label={paused ? 'Resume technology transmission' : 'Pause technology transmission'}
                  aria-pressed={paused}
                >
                  {paused ? <Play size={14} /> : <Pause size={14} />}
                  {paused ? 'PLAY' : 'PAUSE'}
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next skill">
                  NEXT <ArrowRight size={15} />
                </button>
              </div>
              <span className="expertise-transmission__count">
                {String(featuredIndex + 1).padStart(2, '0')} / {String(visibleEntries.length).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        </div>

        <div className="expertise-index" aria-label="Résumé skill index">
          <div className="expertise-index__heading">
            <span>THE RÉSUMÉ INDEX</span>
            <span>SELECT A DISCIPLINE ↘</span>
          </div>
          <div className="expertise-index__grid">
            {skillDisciplines.map((discipline, index) => (
              <motion.button
                type="button"
                key={discipline.id}
                className={activeId === discipline.id ? 'active' : ''}
                onClick={() => selectDiscipline(discipline.id)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.055, ease: EASE }}
                style={{ '--card-accent': discipline.accent } as CSSProperties}
              >
                <span className="expertise-index__number">({discipline.number})</span>
                <strong>{discipline.label}</strong>
                <p>{discipline.tools.map((tool) => tool.name).join(' · ')}</p>
                <span className="expertise-index__arrow">↗</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
