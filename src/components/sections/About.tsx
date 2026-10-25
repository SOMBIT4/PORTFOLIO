import { Download } from 'lucide-react'
import { profile } from '@/data/profile'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'

export function About() {
  return <section id="about" className="about-section section-pad" aria-labelledby="about-heading"><div className="page-shell">
    <SectionHeading id="about-heading" number="04" eyebrow="MORE THAN A JOB TITLE" title={<>CURIOUS BY <span className="serif-italic">nature.</span></>} />
    <div className="about-layout">
      <div className="about-photo-wrap" data-reveal><div className="about-photo"><img src={profile.portraitUrl} alt="Portrait of Sombit Mazumder" loading="lazy" width="685" height="913"/><span className="about-sticker">SOMBIT<br/>MAZUMDER<br/><b>© 2026</b></span></div><div className="about-photo-under"><span>FIG 01. / THE HUMAN BEHIND THE CODE</span><span>↗</span></div></div>
      <div className="about-copy" data-reveal><span className="small-accent">✳ HELLO THERE</span><h3>Technology is the medium.<br/><em>Problem-solving is the point.</em></h3><p>I'm Sombit, a Computer Science & Engineering undergraduate at Ahsanullah University of Science and Technology, based in Dhaka.</p><p>My work spans full-stack web applications and cross-platform mobile development. I'm especially drawn to the parts people don't always see: authentication, permissions, database design, and the systems that keep products reliable.</p><p>Whether it's stopping overlapping bookings or keeping concurrent seat allocations correct, I like turning complicated requirements into experiences that feel simple.</p><div className="about-facts"><div><span>LOCATION</span><strong>Dhaka, Bangladesh</strong></div><div><span>FOCUS</span><strong>Full-stack & backend</strong></div><div><span>EDUCATION</span><strong>B.Sc. in CSE · AUST</strong></div><div><span>GRADUATING</span><strong>Nov 2026 (expected)</strong></div></div><Button asChild variant="dark"><a href={profile.resumeUrl} download><Download size={17}/> Download my résumé</a></Button></div>
    </div>
  </div></section>
}
