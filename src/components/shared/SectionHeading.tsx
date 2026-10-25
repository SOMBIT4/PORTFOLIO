import type { ReactNode } from 'react'
interface SectionHeadingProps { eyebrow: string; id?: string; title: ReactNode; intro?: string; number?: string; dark?: boolean }
export function SectionHeading({ eyebrow, id, title, intro, number, dark }: SectionHeadingProps) {
  return <div className="section-heading" data-reveal>
    <div className="eyebrow-row"><span className="section-kicker"><span className="small-plus">✳</span> {eyebrow}</span>{number && <span className="section-index">{number} / 06</span>}</div>
    <h2 id={id} className={dark ? 'section-title text-light' : 'section-title'}>{title}</h2>
    {intro && <p className="section-intro">{intro}</p>}
  </div>
}
