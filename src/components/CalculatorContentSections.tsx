import { useState } from 'react'
import { Link } from 'react-router-dom'

const inr = (n: number) => {
  if (!isFinite(n)) return '₹0'
  const abs = Math.abs(n)
  if (abs >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`
  if (abs >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`
  return `₹${Math.round(n).toLocaleString('en-IN')}`
}

export function SectionDivider({ icon, gradient, title, subtitle }: { icon: string; gradient: string; title: string; subtitle: string }) {
  return (
    <div className="section-divider">
      <div className="sd-icon" style={{ background: gradient }}>{icon}</div>
      <div className="sd-text"><h2>{title}</h2><p>{subtitle}</p></div>
      <div className="sd-line" />
    </div>
  )
}

export interface InfoTile { variant: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; emoji: string; val: string; label: string; sub?: string }
export function InfoTileGrid({ tiles }: { tiles: InfoTile[] }) {
  return (
    <div className="info-grid">
      {tiles.map((t, i) => (
        <div className={`itile it${t.variant}`} key={i}>
          <span className="it-emoji">{t.emoji}</span>
          <div className="it-val">{t.val}</div>
          <div className="it-label">{t.label}</div>
          {t.sub && <div className="it-sub">{t.sub}</div>}
        </div>
      ))}
    </div>
  )
}

export interface PowerConfig { amount: number; rate: number; yrs: number; label: string }
// SIP future value formula (standard annuity-due)
const calcSip = (p: number, ratePct: number, yrs: number) => {
  const r = ratePct / 100 / 12
  const n = yrs * 12
  return p * (((1 + r) ** n - 1) / r) * (1 + r)
}
export function WealthPowerTable({ title, configs }: { title: string; configs: PowerConfig[] }) {
  return (
    <div className="power-table-wrap">
      <div className="pt-title">📊 {title}</div>
      <div className="power-rows">
        {configs.map((c, i) => {
          const val = calcSip(c.amount, c.rate, c.yrs)
          const invested = c.amount * 12 * c.yrs
          const gain = val - invested
          return (
            <div className="power-row" key={i}>
              <div className="pr-header"><span className="pr-year">{c.label}</span><span className="pr-badge">{c.yrs}yr @ {c.rate}%</span></div>
              <div className="pr-main">{inr(val)}</div>
              <div className="pr-invested">₹{c.amount.toLocaleString('en-IN')}/mo · Invested: {inr(invested)}</div>
              <div className="pr-gain">+{inr(gain)} returns ({((gain / invested) * 100).toFixed(0)}% gain)</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export interface TaxCardRow { label: string; val: string; highlight?: boolean; green?: boolean }
export interface TaxCardData { color: 'purple' | 'green'; title: string; rows: TaxCardRow[] }
export function TaxCardsGrid({ cards }: { cards: TaxCardData[] }) {
  return (
    <div className="tax-grid">
      {cards.map((c, i) => (
        <div className="tax-card" key={i}>
          <div className={`tc-head ${c.color}`}>{c.title}</div>
          {c.rows.map((r, j) => (
            <div className="tc-row" key={j}><span className="tc-label">{r.label}</span><span className={`tc-val${r.highlight ? ' highlight' : ''}${r.green ? ' green' : ''}`}>{r.val}</span></div>
          ))}
        </div>
      ))}
    </div>
  )
}

export interface TimelineStep { dot: 'p' | 'g' | 'a'; num: number; title: string; text: string }
export function TaxTimeline({ title, steps }: { title: string; steps: TimelineStep[] }) {
  return (
    <div className="tax-timeline">
      <div className="tt-title">📅 {title}</div>
      <div className="tt-steps">
        {steps.map((s, i) => (
          <div className="tt-step" key={i}>
            <div className={`tt-dot ${s.dot}`}>{s.num}</div>
            <div className="tt-content"><h4>{s.title}</h4><p>{s.text}</p></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LtcgEstimator({ initialLtcg = 250000, initialStcg = 50000 }: { initialLtcg?: number; initialStcg?: number }) {
  const [ltcg, setLtcg] = useState(initialLtcg)
  const [stcg, setStcg] = useState(initialStcg)
  const exempt = Math.min(ltcg, 125000)
  const taxableLtcg = Math.max(0, ltcg - 125000)
  const ltcgTax = taxableLtcg * 0.125
  const stcgTax = stcg * 0.2
  const total = ltcgTax + stcgTax
  return (
    <div className="tax-calc-box">
      <div className="tcb-title">🧮 Quick LTCG Tax Estimator</div>
      <div className="tcb-row">
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--n600)', marginBottom: '6px' }}>LTCG Gains this FY (₹)</div>
          <input className="num-input" type="number" value={ltcg} onChange={e => setLtcg(Number(e.target.value))} style={{ width: '100%', maxWidth: '100%', fontSize: '14px' }} />
        </div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--n600)', marginBottom: '6px' }}>STCG Gains this FY (₹)</div>
          <input className="num-input" type="number" value={stcg} onChange={e => setStcg(Number(e.target.value))} style={{ width: '100%', maxWidth: '100%', fontSize: '14px' }} />
        </div>
      </div>
      <div className="tax-result-grid">
        <div className="tr-tile"><div className="trt-label">LTCG Exempt</div><div className="trt-val green">{inr(exempt)}</div></div>
        <div className="tr-tile"><div className="trt-label">LTCG Tax (12.5%)</div><div className="trt-val red">{inr(ltcgTax)}</div></div>
        <div className="tr-tile"><div className="trt-label">STCG Tax (20%)</div><div className="trt-val red">{inr(stcgTax)}</div></div>
        <div className="tr-tile"><div className="trt-label">Total Tax</div><div className="trt-val">{inr(total)}</div></div>
      </div>
    </div>
  )
}

export interface TipData { variant: 1 | 2 | 3 | 4 | 5 | 6; badgeClass: string; badge: string; icon: string; title: string; text: string; highlight: string }
export function TipsGrid({ tips }: { tips: TipData[] }) {
  return (
    <div className="tips-grid">
      {tips.map((t, i) => (
        <div className={`tip-card tc${t.variant}`} key={i}>
          <div className={`tip-badge ${t.badgeClass}`}>{t.badge}</div>
          <div className="tip-icon">{t.icon}</div>
          <h4>{t.title}</h4>
          <p>{t.text}</p>
          <div className="tip-highlight">{t.highlight}</div>
        </div>
      ))}
    </div>
  )
}

export interface GoalData { icon: string; title: string; amount: number; rate: number; yrs: number; horizon: string; target: string; strategy: string; funds: string[] }
export function GoalPlanner({ goals }: { goals: Record<string, GoalData> }) {
  const keys = Object.keys(goals)
  const [active, setActive] = useState(keys[0])
  const g = goals[active]
  const corpus = calcSip(g.amount, g.rate, g.yrs)
  const invested = g.amount * 12 * g.yrs
  return (
    <div className="card">
      <div className="card-head"><div className="ch-icon" style={{ background: '#fdf2f8' }}>🎯</div><div><div className="ch-title">Goal-Based SIP Calculator</div><div className="ch-sub">Select your goal to see customised SIP strategy</div></div></div>
      <div className="card-body">
        <div className="goal-tabs">
          {keys.map(k => (
            <button key={k} className={`goal-tab${k === active ? ' active' : ''}`} onClick={() => setActive(k)}>
              <span className="goal-tab-icon">{goals[k].icon}</span> {goals[k].title}
            </button>
          ))}
        </div>
        <div className="goal-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ fontSize: '28px' }}>{g.icon}</div>
            <div><div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--n800)' }}>{g.title}</div><div style={{ fontSize: '12px', color: 'var(--n400)' }}>Customised SIP strategy for your goal</div></div>
          </div>
          <div className="goal-result-grid">
            <div className="gr-tile"><div className="grt-label">Suggested SIP</div><div className="grt-val">₹{g.amount.toLocaleString('en-IN')}/mo</div><div className="grt-sub">Starting amount</div></div>
            <div className="gr-tile"><div className="grt-label">Estimated Maturity</div><div className="grt-val green">{inr(corpus)}</div><div className="grt-sub">After {g.yrs} years @ {g.rate}%</div></div>
            <div className="gr-tile"><div className="grt-label">Total Invested</div><div className="grt-val amber">{inr(invested)}</div><div className="grt-sub">{g.yrs} years × 12 months</div></div>
            <div className="gr-tile"><div className="grt-label">Target Range</div><div className="grt-val blue">{g.target}</div><div className="grt-sub">Investment horizon: {g.horizon}</div></div>
          </div>
          <div className="goal-strategy">
            <div className="goal-strategy-title">📋 Strategy</div>
            <p>{g.strategy}</p>
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--n700)', marginBottom: '10px' }}>🏦 Suggested Fund Categories</div>
            <div className="fund-chips">{g.funds.map((f, i) => <span className="fund-chip" key={i}>{f}</span>)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export interface FaqData { q: string; aHtml: string }
export function FaqAccordion({ faqs }: { faqs: FaqData[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="faq-wrap">
      {faqs.map((f, i) => (
        <div className={`faq-item${open === i ? ' open' : ''}`} key={i}>
          <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>{f.q}<div className="faq-icon">+</div></div>
          <div className="faq-a" dangerouslySetInnerHTML={{ __html: f.aHtml }} />
        </div>
      ))}
    </div>
  )
}

export function DematBanner({ tag = '🏦 Open a Demat Account' }: { tag?: string }) {
  return (
    <div className="demat-banner">
      <div className="db-inner">
        <div className="db-tag">{tag}</div>
        <div className="db-title">Start Investing Today — Zero Account Opening Fee</div>
        <div className="db-sub">₹0 equity delivery · ₹20 flat F&O · Instant eKYC · Trusted by millions of Indian investors.</div>
        <div className="db-btns">
          <Link to="/contact" className="btn-db-pri">Open Demat Account</Link>
        </div>
        <div className="db-pills">
          <span className="db-pill">✓ SEBI Registered</span>
          <span className="db-pill">Top Discount Brokers</span>
          <span className="db-pill">₹0 Account Opening</span>
          <span className="db-pill">Instant eKYC</span>
        </div>
      </div>
    </div>
  )
}
