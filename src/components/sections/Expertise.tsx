import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Radio, Signal, Sparkles } from 'lucide-react'
import { skillDisciplines, skillEntries, type SkillDiscipline } from '@/data/skills'

const ALL = 'all'
const EASE = [0.22, 1, 0.36, 1] as const

/** Credentials used in the trust marquee — all verifiable from the résumé and project work. */
const trustSignals = [
  'AUST · DHAKA',
  'SOFTWARE EXHIBITION — 1ST RUNNER-UP',
  '421 TESTS PASSING',
  '6 SHIPPED PROJECTS',
  '9-TABLE MULTI-TENANT SCHEMA',
  'B.Sc. CSE — NOV 2026',
]

export function Expertise() {
  const [activeId, setActiveId] = useState<string>(ALL)
  const [hovered, setHovered] = useState<string | null>(null)

  const active = useMemo<SkillDiscipline | null>(
    () => skillDisciplines.find((item) => item.id === activeId) ?? null,
    [activeId],
  )

  const stream = useMemo(
    () => (active ? skillEntries.filter((entry) => entry.disciplineId === active.id) : skillEntries),
    [active],
  )

  const focus = hovered ?? active?.id ?? null
  const focusDiscipline = focus ? skillDisciplines.find((item) => item.id === focus) : null
  const focusAccent = focusDiscipline?.accent ?? '#c8ff74'

  return (
    <section className="expertise-section section-pad" id="expertise" aria-labelledby="expertise-heading">
      <div className="expertise-ambient" aria-hidden="true" />
      <div className="page-shell">
        {/* ── TRUST MARQUEE (real credentials, continuously scrolling) ── */}
        <div className="expertise-trust" data-reveal>
          <div className="expertise-trust__label">
            <span className="expertise-trust__star" aria-hidden="true">✳</span>
            <span>PROVEN ACROSS PROJECTS, PRODUCT AND PRACTICE</span>
          </div>
          <div className="expertise-trust__viewport">
            <ul className="expertise-trust__track">
              {[...trustSignals, ...trustSignals].map((signal, index) => (
                <li key={`${signal}-${index}`} className="expertise-trust__item">
                  <span className="expertise-trust__mark" aria-hidden="true">◈</span>
                  {signal}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── HEADING ── */}
        <div className="expertise-heading" data-reveal>
          <div className="eyebrow-row">
            <span className="section-kicker">
              <span className="small-plus">✳</span> ENGINEERING &amp; EXPERTISE
            </span>
            <span className="section-index">01 / 06</span>
          </div>
          <h2 id="expertise-heading" className="section-title text-light">
            SKILLS, ALWAYS <span className="serif-italic">in motion.</span>
          </h2>
          <p className="section-intro">
            Ideas become products through the tools behind them. Filter the live transmission to explore a specific
            engineering discipline.
          </p>
        </div>

        {/* ── FILTER THE STREAM ── */}
        <div className="expertise-transmission" data-reveal>
          <div className="expertise-transmission__top">
            <span className="expertise-transmission__title">
              <Signal size={15} /> FILTER THE STREAM
            </span>
            <span className="expertise-transmission__meta">
              <span className="expertise-transmission__live" aria-hidden="true" />
              {stream.length} SIGNALS IN RANGE
            </span>
          </div>

          <div className="expertise-filters" role="group" aria-label="Filter technologies by discipline">
            <button
              type="button"
              className={`expertise-filter ${activeId === ALL ? 'active' : ''}`}
              aria-pressed={activeId === ALL}
              onClick={() => setActiveId(ALL)}
              onMouseEnter={() => setHovered(null)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="expertise-filter__index">00</span>
              <span className="expertise-filter__label">All skills</span>
              <span className="expertise-filter__count">{skillEntries.length}</span>
            </button>
            {skillDisciplines.map((discipline) => (
              <button
                key={discipline.id}
                type="button"
                className={`expertise-filter ${activeId === discipline.id ? 'active' : ''}`}
                aria-pressed={activeId === discipline.id}
                onClick={() => setActiveId(discipline.id)}
                onMouseEnter={() => setHovered(discipline.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(discipline.id)}
                onBlur={() => setHovered(null)}
                style={{ '--filter-accent': discipline.accent } as React.CSSProperties}
              >
                <span className="expertise-filter__index">{discipline.number}</span>
                <span className="expertise-filter__label">{discipline.label}</span>
                <span className="expertise-filter__count">{discipline.tools.length}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── STREAM + READOUT ── */}
        <div className="expertise-stage" style={{ '--stream-accent': focusAccent } as React.CSSProperties}>
          <div className="expertise-stream" role="list" aria-label="Technology stream">
            <AnimatePresence mode="popLayout" initial={false}>
              {stream.map((entry, index) => (
                <motion.div
                  key={`${entry.disciplineId}-${entry.name}`}
                  layout
                  role="listitem"
                  className="expertise-signal"
                  initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                  transition={{ duration: 0.42, delay: Math.min(index * 0.035, 0.4), ease: EASE }}
                  whileHover={{ x: 6 }}
                >
                  <span className="expertise-signal__pulse" style={{ background: entry.accent }} aria-hidden="true" />
                  <span className="expertise-signal__body">
                    <strong className="expertise-signal__name">{entry.name}</strong>
                    <span className="expertise-signal__note">{entry.note}</span>
                  </span>
                  <span className="expertise-signal__meta">
                    <span className="expertise-signal__discipline">{entry.disciplineCode}</span>
                    <span className="expertise-signal__kind">{entry.kind}</span>
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.aside
              key={focusDiscipline?.id ?? 'all'}
              className="expertise-readout"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.36, ease: EASE }}
            >
              <div className="expertise-readout__top">
                <span>{focusDiscipline ? focusDiscipline.code : 'ALL / DISCIPLINES'}</span>
                <Radio size={16} aria-hidden="true" />
              </div>

              <div className="expertise-readout__glyph" aria-hidden="true">
                <span className="expertise-readout__ring" />
                <span className="expertise-readout__ring expertise-readout__ring--two" />
                <span className="expertise-readout__core">{focusDiscipline?.number ?? '06'}</span>
              </div>

              <h3>
                {focusDiscipline ? focusDiscipline.label : 'Everything'}
                <span>.</span>
              </h3>
              <p>
                {focusDiscipline
                  ? focusDiscipline.description
                  : 'A working set that spans the whole stack — interface, application layer, data, mobile, and the practices that hold them together.'}
              </p>

              <Waveform accent={focusAccent} seed={focusDiscipline?.number ?? '06'} />

              <div className="expertise-readout__stats">
                <div>
                  <span>IN RANGE</span>
                  <strong>{stream.length}</strong>
                </div>
                <div>
                  <span>DISCIPLINES</span>
                  <strong>{active ? '01' : '05'}</strong>
                </div>
                <div>
                  <span>FOCUS</span>
                  <strong>{focusDiscipline?.summary ?? 'Full stack'}</strong>
                </div>
              </div>

              <div className="expertise-readout__footer">
                <span>
                  <Sparkles size={13} style={{ display: 'inline', marginRight: '6px' }} />
                  ALWAYS LEARNING / ALWAYS BUILDING
                </span>
                <ArrowUpRight size={16} />
              </div>
            </motion.aside>
          </AnimatePresence>
        </div>

        {/* ── NUMBERED CAPABILITY LIST ── */}
        <div className="expertise-capabilities">
          {skillDisciplines.map((discipline, index) => (
            <motion.article
              key={discipline.id}
              className={`expertise-capability ${activeId === discipline.id ? 'active' : ''}`}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }}
              onMouseEnter={() => setHovered(discipline.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActiveId(discipline.id)}
              style={{ '--cap-accent': discipline.accent } as React.CSSProperties}
            >
              <span className="expertise-capability__index">({discipline.number})</span>
              <div className="expertise-capability__body">
                <h4>{discipline.label}</h4>
                <p>{discipline.description}</p>
                <ul className="expertise-capability__tools">
                  {discipline.tools.slice(0, 5).map((tool) => (
                    <li key={tool.name}>{tool.name}</li>
                  ))}
                  {discipline.tools.length > 5 && <li>+{discipline.tools.length - 5}</li>}
                </ul>
              </div>
              <ArrowUpRight className="expertise-capability__arrow" size={22} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Live oscilloscope trace that reacts to the active discipline. */
function Waveform({ accent, seed }: { accent: string; seed: string }) {
  const points = useMemo(() => {
    const digits = seed.split('').map((char) => char.charCodeAt(0))
    const width = 320
    const height = 54
    const step = width / 22
    return Array.from({ length: 23 }, (_, index) => {
      const wave = Math.sin(index * 0.55 + digits[1] * 0.4) * 0.5 + Math.sin(index * 0.19 + digits[0]) * 0.5
      const x = index * step
      const y = height / 2 - wave * (height / 2 - 6) - (digits[2] ?? 3) * 0.6
      return `${x.toFixed(1)},${y.toFixed(1)}`
    }).join(' ')
  }, [seed])

  return (
    <div className="expertise-wave" aria-hidden="true">
      <svg viewBox="0 0 320 54" preserveAspectRatio="none">
        <polyline points={points} fill="none" stroke={accent} strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <span className="expertise-wave__scan" style={{ background: accent }} />
    </div>
  )
}
