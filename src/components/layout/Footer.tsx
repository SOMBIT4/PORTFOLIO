import { ArrowUp } from 'lucide-react'
import { profile } from '@/data/profile'

export function Footer() {
  return <footer className="footer-section"><div className="page-shell"><div className="footer-bar"><span>© {new Date().getFullYear()} SOMBIT MAZUMDER</span><span>DESIGNED AND DEVELOPED WITH INTENTION <span className="footer-star">✳</span></span><a href="#top">BACK TO TOP <ArrowUp size={15}/></a></div><div className="footer-signature" aria-hidden="true">SOMBIT<span>®</span></div><div className="sr-only">{profile.title} portfolio</div></div></footer>
}
