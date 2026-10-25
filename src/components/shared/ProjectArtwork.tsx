import type { ProjectId } from '@/data/projects'

interface Props { id: ProjectId; compact?: boolean }

export function ProjectArtwork({ id, compact = false }: Props) {
  return <div className={`project-art project-art--${id} ${compact ? 'art-compact' : ''}`} aria-label={`Conceptual interface illustration for ${id}`}>
    {id === 'cowork' && <div className="art-browser cowork-browser">
      <div className="art-browser-top"><div className="art-dots"><i/><i/><i/></div><span>CoWork / workspace</span><span>⌘ K</span></div>
      <div className="cowork-head"><div><small>YOUR WORKSPACE, READY</small><strong>Make space for<br/>great work.</strong></div><span className="avatar-pair">S&nbsp; M</span></div>
      <div className="cowork-metrics"><div><small>SPACES AVAILABLE</small><b>24 <em>↗</em></b></div><div><small>ACTIVE BOOKINGS</small><b>08 <em>↗</em></b></div></div>
      <div className="cowork-slots"><span>09:00</span><span className="active">10:00</span><span>11:00</span><span className="active">12:00</span><span>13:00</span></div>
    </div>}
    {id === 'tesla' && <div className="tesla-ui">
      <div className="map-grid"/><div className="route-dashed"/><div className="route-point route-start"/><div className="route-point route-end"/>
      <div className="tesla-top"><span className="mini-logo">↗</span><span>DHAKA / RIDE NETWORK</span></div>
      <div className="tesla-ride-card"><small>UPCOMING RIDE</small><strong>Dhanmondi <span>→</span> Gulshan</strong><div className="tesla-line"><span>3 SEATS</span><span>35% DETOUR CAP</span></div><div className="tesla-go">MATCH FOUND <span>↗</span></div></div>
    </div>}
    {id === 'astro' && <div className="astro-ui">
      <div className="astro-brand">ASTRO<span>✳</span> GOODS <span className="astro-bag">BAG (02)</span></div>
      <div className="astro-copy"><small>ANOTHER WORLD OF OBJECTS</small><strong>Everyday,<br/><em>but better.</em></strong></div>
      <div className="astro-product"><div className="astro-product-sphere"/><span className="astro-product-name">OBJECT NO. 004 <b>↗</b></span></div>
      <div className="astro-index">01 — 04 / THE COLLECTION</div>
    </div>}
    {id === 'relief' && <div className="relief-ui">
      <div className="relief-sidebar"><div className="relief-icon">✳</div><div>▦</div><div>◉</div><div>⌁</div></div>
      <div className="relief-dashboard"><small>RELIEF COMMAND / OVERVIEW</small><strong>Community response</strong><div className="relief-graph"><svg viewBox="0 0 260 100" preserveAspectRatio="none"><path d="M0 86 C25 80 42 30 65 49 S105 76 129 42 S170 20 190 34 S226 70 260 10" fill="none" stroke="#d8f3c0" strokeWidth="3"/><path d="M0 86 C25 80 42 30 65 49 S105 76 129 42 S170 20 190 34 S226 70 260 10 L260 100 L0 100Z" fill="#cee9b4" opacity=".13"/></svg></div><div className="relief-bottom"><span>VOLUNTEERS <b>124</b></span><span>SHELTERS <b>08</b></span></div></div>
    </div>}
    {id === 'merchandise' && <div className="merch-ui"><div className="mobile-mock"><div className="mobile-notch"/><div className="merch-head">merch<span>✳</span><small>◌</small></div><div className="merch-feature"><small>NEW DROP / 2026</small><strong>MAKE IT<br/>YOURS.</strong><div className="merch-disc"/></div><div className="merch-products"><div/><div/><div/></div><div className="merch-navbar">⌂ <span>◌</span> ♡ <span>▣</span></div></div><div className="merch-floating-tag">DESIGNED FOR<br/>MOBILE <b>↗</b></div></div>}
    {id === 'espresso' && <div className="espresso-ui"><div className="espresso-logo">espresso<span>echo.</span></div><div className="espresso-circle"><div className="espresso-cup"><div className="espresso-coffee"/></div></div><div className="espresso-banner">YOUR DAILY <em>GOOD THING.</em></div><div className="espresso-actions"><span>DISCOVER THE MENU →</span><span>01 / 03</span></div></div>}
    <div className="art-watermark">PERSONAL CONCEPT STUDY / {id.toUpperCase()}</div>
  </div>
}
