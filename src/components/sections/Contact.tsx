import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Github, Linkedin, Send } from 'lucide-react'
import { profile } from '@/data/profile'
import { Button } from '@/components/ui/button'

export function Contact() {
  const [copied, setCopied] = useState(false)
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); window.setTimeout(()=>setCopied(false), 1800) }
    catch { window.location.href = `mailto:${profile.email}` }
  }
  return <section className="contact-section" id="contact" aria-labelledby="contact-heading"><div className="page-shell">
    <div className="contact-top"><span><span className="online-dot"/> CURRENTLY OPEN TO OPPORTUNITIES</span><span>06 / 06 — SAY HELLO</span></div>
    <div className="contact-center" data-reveal><p>HAVE AN IDEA? AN OPPORTUNITY? A GOOD QUESTION?</p><h2 id="contact-heading">LET'S BUILD<br/><em>SOMETHING</em> <span className="contact-dot">✳</span><br/>MEANINGFUL.</h2><div className="contact-actions"><Button asChild size="lg"><a href={`mailto:${profile.email}`}>Start a conversation <Send size={17}/></a></Button><button onClick={copyEmail} className="contact-copy" type="button" aria-label="Copy email address">{copied ? <Check size={18}/> : <Copy size={18}/>} {copied ? 'Copied!' : 'Copy email'}</button></div></div>
    <div className="contact-bottom"><div className="contact-email"><span>EMAIL ME DIRECTLY</span><a href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={19}/></a></div><div className="contact-social"><span>FIND ME ONLINE</span><div><a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18}/> GITHUB</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18}/> LINKEDIN</a></div></div></div>
  </div></section>
}
