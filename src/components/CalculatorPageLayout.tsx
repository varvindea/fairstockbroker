import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { calculatorHref, isNativeCalculator, nativeSlugForCalculator } from '../data/calculatorLinks'
import { calculatorSidebarSections } from '../data/calculatorSidebarNav'

type HstatColor = 'purple' | 'green' | 'amber' | 'blue'

export type HeroStat = { color: HstatColor; icon: string; num: string; label: string }
export type HeroMinichart = { icon: string; iconBg: string; label: string; val: string; badge: string; badgeBg: string; badgeColor: string }

export type CalculatorHeroProps = {
  breadcrumbCurrent: string
  titleTop: string
  titleHighlight: string
  titleBottom?: string
  subtitle: string
  pills: string[]
  panelTitle: string
  stats: HeroStat[]
  minicharts: HeroMinichart[]
}

export function CalculatorHero({ breadcrumbCurrent, titleTop, titleHighlight, titleBottom, subtitle, pills, panelTitle, stats, minicharts }: CalculatorHeroProps) {
  return (
    <header className="hero">
      <div className="hero-deco" />
      <div className="hero-inner">
        <div className="hero-topbar">
          <Link className="home-btn" to="/calculators"><span className="home-btn-icon">🏠</span>Home</Link>
          <div className="hero-breadcrumb"><span className="hero-breadcrumb-sep">›</span><span>Calculators</span><span className="hero-breadcrumb-sep">›</span><span className="hero-breadcrumb-current">{breadcrumbCurrent}</span></div>
        </div>
        <div className="hero-grid">
          <div>
            <h1>{titleTop}<br /><span className="hero-hl">{titleHighlight}</span>{titleBottom ? <><br />{titleBottom}</> : null}</h1>
            <p className="hero-sub">{subtitle}</p>
            <div className="hero-pills">{pills.map(pill => <span key={pill} className="hpill">{pill}</span>)}</div>
          </div>
          <div className="hero-panel">
            <div className="panel-title">{panelTitle}</div>
            <div className="hero-stats">
              {stats.map(s => (
                <div key={s.label} className={`hstat hstat-${s.color}`}>
                  <div className="hstat-icon-wrap">{s.icon}</div>
                  <div className="hstat-text"><span className="hstat-num">{s.num}</span><span className="hstat-lbl">{s.label}</span></div>
                </div>
              ))}
            </div>
            <div className="hero-minicharts">
              {minicharts.map(m => (
                <div key={m.label} className="minichart-card">
                  <div className="mc-icon" style={{ background: m.iconBg }}>{m.icon}</div>
                  <div className="mc-body"><div className="mc-label">{m.label}</div><div className="mc-val">{m.val}</div></div>
                  <div className="mc-badge" style={{ background: m.badgeBg, color: m.badgeColor }}>{m.badge}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function SidebarLink({ name, icon, hint, active }: { name: string; icon: string; hint: string; active: boolean }) {
  const href = calculatorHref(name)
  const className = `sb-item${active ? ' active' : ''}`
  const content = (
    <>
      <span className="sb-item-icon">{icon}</span>
      <div className="sb-item-text"><div className="sb-item-name">{name}</div><div className="sb-item-hint">{hint}</div></div>
    </>
  )
  return isNativeCalculator(name)
    ? <Link className={className} to={href}>{content}</Link>
    : <a className={className} href={href}>{content}</a>
}

export function CalculatorSidebar({ activeSlug }: { activeSlug: string }) {
  return (
    <aside className="sidebar">
      <Link className="sb-home" to="/calculators" aria-label="Back to Home">
        <div className="sb-home-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M3 12L12 3l9 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="sb-home-text"><div className="sb-home-label">← Back to Home</div><div className="sb-home-sub">All Calculators</div></div>
      </Link>

      <div className="sidebar-card sidebar-calc-card">
        {calculatorSidebarSections.map(section => (
          <div key={section.title}>
            <div className="sb-head"><div className="sb-head-icon" style={{ background: section.iconBg }}>{section.icon}</div><div className="sb-head-title">{section.title}</div></div>
            <div className="sb-list">
              {section.items.map(item => (
                <SidebarLink key={item.name} name={item.name} icon={item.icon} hint={item.hint} active={nativeSlugForCalculator(item.name) === activeSlug} />
              ))}
            </div>
            <div className="sb-divider" />
          </div>
        ))}
      </div>

      <div className="sidebar-card">
        <div className="sb-head"><div className="sb-head-icon" style={{ background: '#dcfce7' }}>📊</div><div className="sb-head-title">SIP Quick Stats</div></div>
        <div className="sb-qstat">
          <div className="sq-row"><span className="sq-label">₹5K/mo × 10yr @ 12%</span><span className="sq-val">₹11.6L</span></div>
          <div className="sq-row"><span className="sq-label">₹10K/mo × 20yr @ 12%</span><span className="sq-val">₹99.9L</span></div>
          <div className="sq-row"><span className="sq-label">₹20K/mo × 25yr @ 12%</span><span className="sq-val">₹3.8 Cr</span></div>
          <div className="sq-row"><span className="sq-label">₹50K/mo × 30yr @ 12%</span><span className="sq-val">₹17.6 Cr</span></div>
        </div>
      </div>
    </aside>
  )
}

export function CalculatorPageLayout({ hero, activeSlug, children }: { hero: CalculatorHeroProps; activeSlug: string; children: ReactNode }) {
  return (
    <div className="calc-page-shell">
      <CalculatorHero {...hero} />
      <div className="page-wrap">
        <CalculatorSidebar activeSlug={activeSlug} />
        <main className="main-col">{children}</main>
      </div>
    </div>
  )
}
