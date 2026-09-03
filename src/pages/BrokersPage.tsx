import { useState } from 'react'
import { Link } from 'react-router-dom'
import { brokerHref } from '../data/brokers'

const brokers = [
  { name: 'Zerodha', type: 'Discount', av: { bg: 'linear-gradient(135deg,#dcfce7,#bbf7d0)', color: '#166534', text: 'Z' }, open: '₹200', delivery: 'FREE', intraday: '₹20/order', amc: '₹300/yr', rating: 4.8, reviews: '12.4K', best: true, badges: ['best', 'low-fee'], founded: 2010, app: 'Kite', pros: ['Zero delivery brokerage', 'Best-in-class Kite platform', 'Largest active client base', 'Coin for direct MF'] },
  { name: 'Groww', type: 'Discount', av: { bg: 'linear-gradient(135deg,#ede9fe,#ddd6fe)', color: '#5b21b6', text: 'G' }, open: 'FREE', delivery: 'FREE', intraday: '₹20/order', amc: '₹0', rating: 4.6, reviews: '8.2K', best: false, badges: ['free', 'beginner'], founded: 2017, app: 'Groww', pros: ['Zero AMC', 'Great beginner UX', 'Free demat', 'Direct mutual funds'] },
  { name: 'AngelOne', type: 'Discount', av: { bg: 'linear-gradient(135deg,#fef3c7,#fde68a)', color: '#92400e', text: 'A' }, open: 'FREE', delivery: 'FREE', intraday: '₹20/order', amc: '₹240/yr', rating: 4.5, reviews: '9.1K', best: false, badges: ['free', 'low-fee'], founded: 1996, app: 'SmartAPI', pros: ['AI-powered SmartAPI', 'Advisory tools', 'ARQ Prime research', 'NRI support'] },
  { name: 'Upstox', type: 'Discount', av: { bg: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', color: '#0c4a6e', text: 'U' }, open: 'FREE', delivery: 'FREE', intraday: '₹20/order', amc: '₹150/yr', rating: 4.4, reviews: '7.3K', best: false, badges: ['free', 'low-fee'], founded: 2011, app: 'Upstox Pro', pros: ['Zero delivery brokerage', 'Backed by Tiger Global', 'Advanced charting', 'Options analytics'] },
  { name: 'Dhan', type: 'Discount', av: { bg: 'linear-gradient(135deg,#fce7f3,#fbcfe8)', color: '#831843', text: 'D' }, open: 'FREE', delivery: 'FREE', intraday: '₹20/order', amc: '₹0', rating: 4.3, reviews: '3.8K', best: false, badges: ['free', 'new'], founded: 2021, app: 'Dhan', pros: ['Options-focused UI', 'Super fast execution', 'Zero AMC', 'Excellent charts'] },
  { name: 'IIFL Securities', type: 'Discount', av: { bg: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', color: '#1e3a5f', text: 'I' }, open: 'FREE', delivery: 'FREE', intraday: '₹20/order', amc: '₹200/yr', rating: 4.2, reviews: '4.5K', best: false, badges: ['free'], founded: 1995, app: 'IIFL Markets', pros: ['Research reports', 'Mutual fund advisory', 'Loan against securities'] },
  { name: 'ICICI Direct', type: 'Full Service', av: { bg: 'linear-gradient(135deg,#fef3c7,#fde68a)', color: '#b45309', text: 'IC' }, open: 'FREE', delivery: '0.55%', intraday: '0.275%', amc: '₹700/yr', rating: 4.2, reviews: '15.1K', best: false, badges: ['full-service'], founded: 2000, app: 'ICICIdirect', pros: ['3-in-1 account', 'Extensive research', 'Wealth management', 'NRI banking'] },
  { name: 'HDFC Securities', type: 'Full Service', av: { bg: 'linear-gradient(135deg,#dcfce7,#bbf7d0)', color: '#166534', text: 'HD' }, open: 'FREE', delivery: '0.50%', intraday: '0.25%', amc: '₹750/yr', rating: 4.1, reviews: '11.2K', best: false, badges: ['full-service'], founded: 2000, app: 'HDFC Securities', pros: ['3-in-1 account', 'Priority banking', 'Institutional research', 'Portfolio advisory'] },
  { name: 'Kotak Securities', type: 'Full Service', av: { bg: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', color: '#0c4a6e', text: 'KS' }, open: 'FREE', delivery: '0.49%', intraday: '0.245%', amc: '₹600/yr', rating: 4.0, reviews: '8.7K', best: false, badges: ['full-service'], founded: 1994, app: 'Kotak Neo', pros: ['Neo flat fee option', 'Strong research', 'Kotak bank integration'] },
]

const filterOptions = [
  { key: 'all', label: 'All Brokers' },
  { key: 'discount', label: 'Discount Brokers' },
  { key: 'full-service', label: 'Full Service' },
  { key: 'free', label: 'Zero Fee Opening' },
  { key: 'beginner', label: 'Best for Beginners' },
]

export function BrokersPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = brokers.filter(b => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'discount') return b.type === 'Discount'
    if (activeFilter === 'full-service') return b.type === 'Full Service'
    return b.badges.includes(activeFilter)
  })

  return (
    <>
      {/* Hero */}
      <section className="page-hero-sec">
        <div className="page-hero-inner">
          <div className="page-eyebrow">Broker Intelligence</div>
          <h1 className="page-h1">India's Top 25 Brokers<br />Compared Side-by-Side</h1>
          <p className="page-sub">Unbiased, research-backed reviews of India's best SEBI-registered stock brokers — charges, app quality, features and user ratings. Updated for FY 2026.</p>
          <div className="page-filters">
            {filterOptions.map(f => (
              <button key={f.key} className={`filter-btn${activeFilter === f.key ? ' active' : ''}`} onClick={() => setActiveFilter(f.key)}>{f.label}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="proof-bar">
        <div className="proof-inner">
          <div className="proof-item"><span className="proof-icon">🏆</span><span className="proof-text"><span>25+</span> Brokers Reviewed</span></div>
          <div className="proof-sep" />
          <div className="proof-item"><span className="proof-icon">✅</span><span className="proof-text"><span>SEBI</span> Registered Only</span></div>
          <div className="proof-sep" />
          <div className="proof-item"><span className="proof-icon">📊</span><span className="proof-text"><span>Unbiased</span> Fee Comparison</span></div>
          <div className="proof-sep" />
          <div className="proof-item"><span className="proof-icon">📅</span><span className="proof-text">Updated <span>FY 2026</span></span></div>
        </div>
      </div>

      {/* Broker cards */}
      <section className="sec" style={{ background: 'var(--white)' }}>
        <div className="sec-inner">
          <div className="brokers-grid">
            {filtered.map(b => (
              <div key={b.name} className="broker-card">
                {b.best && <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '10px', fontWeight: 800, padding: '3px 10px', borderRadius: '100px', background: 'linear-gradient(90deg,var(--p500),var(--p700))', color: '#fff' }}>EDITOR'S PICK</div>}
                <div className="broker-card-header">
                  <div className="broker-logo" style={{ background: b.av.bg, color: b.av.color, fontSize: b.av.text.length > 1 ? '14px' : '20px' }}>{b.av.text}</div>
                  <div>
                    <div className="broker-info-name">{b.name}</div>
                    <div className="broker-info-type">{b.type} Broker · Est. {b.founded}</div>
                  </div>
                </div>
                <div className="broker-badge-strip">
                  {b.badges.includes('best') && <span className="bb bb-top">🏆 Top Pick</span>}
                  {b.badges.includes('free') && <span className="bb bb-free">✓ Free Account</span>}
                  {b.badges.includes('low-fee') && <span className="bb bb-low">₹ Low Cost</span>}
                  {b.badges.includes('beginner') && <span className="bb" style={{ background: 'var(--p100)', color: 'var(--p600)', border: '1px solid var(--p200)' }}>👶 Beginner</span>}
                  {b.badges.includes('full-service') && <span className="bb" style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}>🏦 Full Service</span>}
                </div>
                <div className="broker-fees">
                  <div className="fee-item"><div className="fee-label">Account Opening</div><div className="fee-value" style={{ color: b.open === 'FREE' ? 'var(--g600)' : 'var(--ink)' }}>{b.open}</div></div>
                  <div className="fee-item"><div className="fee-label">Delivery</div><div className="fee-value" style={{ color: b.delivery === 'FREE' ? 'var(--g600)' : 'var(--ink)' }}>{b.delivery}</div></div>
                  <div className="fee-item"><div className="fee-label">Intraday / F&O</div><div className="fee-value">{b.intraday}</div></div>
                  <div className="fee-item"><div className="fee-label">AMC</div><div className="fee-value">{b.amc}</div></div>
                </div>
                <div className="broker-rating">
                  <div className="rating-stars">{'★'.repeat(Math.floor(b.rating))}{'☆'.repeat(5 - Math.floor(b.rating))}</div>
                  <div className="rating-num">{b.rating}/5</div>
                  <div className="rating-cnt">({b.reviews} reviews)</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  {b.pros.slice(0, 3).map(p => (
                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: 'var(--ink3)', marginBottom: '5px' }}>
                      <span style={{ color: 'var(--g500)', fontWeight: 800 }}>✓</span> {p}
                    </div>
                  ))}
                </div>
                <a href={brokerHref(b.name)} className="broker-open-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>View Full Review →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="sec" style={{ background: 'var(--surf1)' }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">Detailed Comparison</div>
            <h2 className="sec-h2">All Charges at a Glance</h2>
            <p className="sec-sub">Every fee, every feature — so you can choose with complete clarity.</p>
          </div>
          <div className="broker-wrap">
            <table className="broker-tbl">
              <thead>
                <tr>
                  <th>Broker</th>
                  <th>Account Opening</th>
                  <th>Equity Delivery</th>
                  <th>Intraday / F&O</th>
                  <th>AMC / Year</th>
                  <th>App</th>
                  <th>Rating</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {brokers.map(b => (
                  <tr key={b.name}>
                    <td>
                      <div className="broker-cell">
                        <div className="b-av" style={{ background: b.av.bg, color: b.av.color, fontSize: b.av.text.length > 1 ? '10px' : '12px' }}>{b.av.text}</div>
                        <div>
                          <div className="b-name">{b.name} {b.best && <span className="best-tag">BEST</span>}</div>
                          <div className="b-type">{b.type}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className={b.open === 'FREE' ? 'free-tag' : undefined}>{b.open}</span></td>
                    <td><span className={b.delivery === 'FREE' ? 'free-tag' : undefined}>{b.delivery}</span></td>
                    <td>{b.intraday}</td>
                    <td>{b.amc}</td>
                    <td style={{ fontSize: '12px' }}>{b.app}</td>
                    <td><div className="stars">{'★'.repeat(Math.floor(b.rating))}</div><div style={{ fontSize: '11px', color: 'var(--ink4)' }}>{b.rating}/5</div></td>
                    <td><a href={brokerHref(b.name)} className="open-btn">Review →</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-sec">
        <div className="cta-inner">
          <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Need Help Deciding?</div>
          <h2 className="cta-h2">Open Your Free Demat Account Today</h2>
          <p className="cta-sub">We'll guide you to the best broker for your needs — trading style, budget and experience level.</p>
          <div className="cta-btns">
            <Link to="/contact" className="cta-btn-p">Get Personalized Recommendation →</Link>
            <a href="https://wa.me" className="cta-btn-s">💬 Ask on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  )
}
