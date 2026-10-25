import { ArrowDownRight, ArrowUpRight, MoveDown, MoveUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { OrbitalExperience } from '@/components/3d/OrbitalExperience'
import { profile } from '@/data/profile'

export function Hero() {
  return <section className="hero-section" aria-labelledby="hero-heading">
    <div className="hero-grain" aria-hidden="true"/>
    <div className="hero-orbit" aria-hidden="true"><OrbitalExperience /></div>
    <div className="hero-inner page-shell">
      <div className="hero-topline"><span>PORTFOLIO — EDITION 2026</span><span className="hero-topline-right"><span className="online-dot"/> DHAKA, BANGLADESH</span></div>
      <div className="hero-main">
        <div className="hero-copy">
          <Badge className="hero-availability"><span className="online-dot"/> OPEN TO OPPORTUNITIES</Badge>
          <p className="hero-overline">HI, I'M SOMBIT MAZUMDER <MoveUpRight size={15}/></p>
          <h1 className="hero-title" id="hero-heading"><span>IDEAS</span><span className="hero-outline">MADE</span><span>REAL<span className="hero-period">.</span></span></h1>
          <div className="hero-bottom-copy"><p>I build <strong>thoughtful interfaces</strong> and <strong>resilient systems</strong> that work where details matter.</p>
            <Button asChild size="lg" className="hero-primary"><a href="#work">Explore my work <ArrowUpRight size={18}/></a></Button>
          </div>
        </div>
        <div className="hero-portrait-block">
          <div className="hero-picture-aura" aria-hidden="true"/>
          <div className="hero-picture"><img src={profile.portraitUrl} alt="Sombit Mazumder in a dark suit, standing outdoors" fetchPriority="high" decoding="async" width="685" height="913"/><div className="portrait-shade"/><span className="photo-corner photo-tl"/><span className="photo-corner photo-br"/><span className="photo-watermark">SM<span>®</span></span></div>
          <div className="portrait-sticker"><span>DEVELOPER<br/>BY CRAFT.</span><ArrowDownRight size={19}/></div>
          <div className="portrait-coordinate">23°48′ N / 90°25′ E</div>
        </div>
      </div>
      <div className="hero-footerline"><span><MoveDown size={17}/> SCROLL TO EXPLORE</span><span>FULL STACK <span className="bullet-star">✳</span> BACKEND <span className="bullet-star">✳</span> CREATIVE DEVELOPMENT</span><span>01 / 06</span></div>
    </div>
    <div className="hero-bottom-rule" aria-hidden="true"/>
  </section>
}
