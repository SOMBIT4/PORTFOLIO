import { ArrowUpRight, Sparkles, Zap, Award, GraduationCap } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { PathSoFarCanvas } from '@/components/3d/PathSoFarCanvas'
import { milestones } from '@/data/profile'

const icons = [Zap, Award, GraduationCap]

export function PathSoFar() {
  return (
    <section className="path-section section-pad" id="journey" aria-labelledby="path-heading">
      <div className="page-shell">
        <div className="path-intro">
          <SectionHeading
            id="path-heading"
            number="05"
            eyebrow="THE PATH SO FAR"
            title={
              <>
                MOVING <span className="serif-italic">forward.</span>
              </>
            }
            intro="Every milestone is a step in the journey. Still learning, still building, and always pushing for something better."
          />
          <ArrowUpRight className="path-arrow" size={58} />
        </div>

        <div className="path-experience">
          <div className="path-canvas-container" data-reveal>
            <div className="path-canvas-label">
              <Sparkles size={18} />
              <span>INTERACTIVE 3D TIMELINE</span>
            </div>
            <PathSoFarCanvas />
            <div className="path-canvas-hint">
              <span>Drag to rotate • Scroll to zoom</span>
            </div>
          </div>

          <div className="milestone-list">
            {milestones.map((m, i) => {
              const Icon = icons[i]
              return (
                <div className="milestone" key={m.title} data-reveal>
                  <div className="milestone-year">
                    {m.year}
                    <span>
                      0{i + 1} / 03
                    </span>
                  </div>
                  <div className="milestone-icon">
                    <Icon size={23} />
                  </div>
                  <div className="milestone-info">
                    <h3>{m.title}</h3>
                    <p>{m.detail}</p>
                  </div>
                  <ArrowUpRight className="milestone-arrow" size={21} />
                </div>
              )
            })}
          </div>
        </div>

        <div className="path-caption">
          <span>CONTINUOUS LEARNING</span>
          <span>•</span>
          <span>MEANINGFUL IMPACT</span>
          <span>•</span>
          <span>ENGINEERING EXCELLENCE</span>
        </div>
      </div>
    </section>
  )
}
