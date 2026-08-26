import { Link } from 'react-router-dom'

const ipos = [
  { company: 'Quadrant Future Tek Ltd', sector: 'Railway Technology · NSE SME', icon: '🏦', iconBg: 'ib1', status: 'OPEN', statusClass: 'st-open', price: '₹275–290', size: '₹290 Cr', open: 'Jan 7', close: 'Jan 9', sub: '186.4×', subPct: 100, gmp: '+₹82 (+28.3%)', purple: false },
  { company: "Dr. Agarwal's Eye Care", sector: 'Healthcare · NSE/BSE Mainboard', icon: '🏥', iconBg: 'ib2', status: 'OPEN', statusClass: 'st-open', price: '₹382–402', size: '₹3,027 Cr', open: 'Jan 29', close: 'Jan 31', sub: '32.8×', subPct: 90, gmp: '+₹110 (+27.4%)', purple: true },
  { company: 'Indobell Insulation Ltd', sector: 'Manufacturing · BSE SME', icon: '⚡', iconBg: 'ib3', status: 'UPCOMING', statusClass: 'st-upcoming', price: '₹95–100', size: '₹12.4 Cr', open: 'Feb 4', close: 'Feb 6', sub: 'GMP ~+24%', subPct: 45, gmp: '+₹24 (+24%)', purple: false },
  { company: 'Swiggy Ltd', sector: 'Food Tech · NSE/BSE Mainboard', icon: '🍕', iconBg: 'ib1', status: 'LISTED', statusClass: 'st-open', price: '₹371–390', size: '₹11,327 Cr', open: 'Nov 6', close: 'Nov 8', sub: '3.6×', subPct: 60, gmp: '+₹29 (+7.4%)', purple: false },
  { company: 'NTPC Green Energy Ltd', sector: 'Renewable Energy · NSE/BSE', icon: '🌿', iconBg: 'ib2', status: 'LISTED', statusClass: 'st-open', price: '₹102–108', size: '₹10,000 Cr', open: 'Nov 19', close: 'Nov 22', sub: '2.5×', subPct: 50, gmp: '-₹5 (-4.6%)', purple: false },
  { company: 'Vishal Mega Mart Ltd', sector: 'Retail · NSE/BSE Mainboard', icon: '🛒', iconBg: 'ib3', status: 'LISTED', statusClass: 'st-open', price: '₹74–78', size: '₹8,000 Cr', open: 'Dec 11', close: 'Dec 13', sub: '27.3×', subPct: 85, gmp: '+₹22 (+28.2%)', purple: true },
]

export function IPOPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero-sec">
        <div className="page-hero-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div className="page-eyebrow" style={{ marginBottom: 0 }}>IPO Tracker</div>
            <span style={{ padding: '3px 10px', background: 'var(--g100)', color: 'var(--g700)', borderRadius: '100px', fontSize: '11px', fontWeight: 800, border: '1px solid var(--g300)' }}>🔴 LIVE</span>
          </div>
          <h1 className="page-h1">Track Every IPO<br />in Real-Time</h1>
          <p className="page-sub">GMP (Grey Market Premium), subscription status, allotment dates, and listing gains — updated daily for 200+ mainboard and SME IPOs per year.</p>
          <div className="page-filters">
            <button className="filter-btn active">All IPOs</button>
            <button className="filter-btn">Mainboard</button>
            <button className="filter-btn">SME IPO</button>
            <button className="filter-btn">Currently Open</button>
            <button className="filter-btn">Upcoming</button>
            <button className="filter-btn">Recently Listed</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="proof-bar">
        <div className="proof-inner">
          <div className="proof-item"><span className="proof-icon">📊</span><span className="proof-text"><span>324</span> IPOs in 2024</span></div>
          <div className="proof-sep" />
          <div className="proof-item"><span className="proof-icon">💰</span><span className="proof-text"><span>₹68,000 Cr</span> Raised</span></div>
          <div className="proof-sep" />
          <div className="proof-item"><span className="proof-icon">📈</span><span className="proof-text">Avg GMP Premium <span>+31%</span></span></div>
          <div className="proof-sep" />
          <div className="proof-item"><span className="proof-icon">🚀</span><span className="proof-text">Peak Sub <span>186×</span></span></div>
        </div>
      </div>

      {/* IPO Milestone strip */}
      <section className="sec" style={{ background: 'var(--white)', paddingBottom: 0 }}>
        <div className="sec-inner" style={{ paddingBottom: '0' }}>
          <div className="sec-head">
            <div className="sec-eyebrow">Live IPO Data</div>
            <h2 className="sec-h2">Current & Upcoming IPOs</h2>
            <p className="sec-sub">Stay ahead with real-time IPO data — GMP, subscription rates, and allotment tracking for every IPO.</p>
          </div>
        </div>
      </section>

      {/* Milestone strip */}
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 52px 48px' }}>
        <div className="ipo-infographic-strip" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
          {[
            { val: '324', lbl: 'IPOs in 2024', bg: 'linear-gradient(135deg,var(--p50),var(--p100))', bc: 'var(--p200)', col: 'var(--p600)' },
            { val: '₹68K Cr', lbl: 'Total Funds Raised', bg: 'linear-gradient(135deg,var(--g50),var(--g100))', bc: 'var(--g200)', col: 'var(--g600)' },
            { val: '+31%', lbl: 'Avg. GMP Premium', bg: 'linear-gradient(135deg,#fffbeb,#fef3c7)', bc: '#fde68a', col: '#b45309' },
            { val: '186×', lbl: 'Peak Subscription', bg: 'linear-gradient(135deg,#fdf4ff,#fae8ff)', bc: '#e9d5ff', col: '#7c3aed' },
          ].map(m => (
            <div key={m.lbl} className="ipo-mile-tile" style={{ background: m.bg, borderColor: m.bc }}>
              <div className="imt-num" style={{ color: m.col }}>{m.val}</div>
              <div className="imt-lbl">{m.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* IPO Cards */}
      <section className="sec ipo-sec">
        <div className="sec-inner">
          <div className="ipo-cards-grid">
            {ipos.map(ipo => (
              <div key={ipo.company} className="ipo-card">
                <div className="ipo-card-header">
                  <div className="ipo-header-left">
                    <div className={`ipo-brand-icon ${ipo.iconBg}`}>{ipo.icon}</div>
                    <div><div className="ipo-company">{ipo.company}</div><div className="ipo-sector">{ipo.sector}</div></div>
                  </div>
                  <div className={`status-chip ${ipo.statusClass}`}>{ipo.status === 'OPEN' ? '● ' : ''}{ipo.status}</div>
                </div>
                <div className="ipo-card-body">
                  <div className="ipo-meta-row">
                    <div><div className="imf-label">Price Band</div><div className="imf-value">{ipo.price}</div></div>
                    <div><div className="imf-label">Issue Size</div><div className="imf-value">{ipo.size}</div></div>
                    <div><div className="imf-label">Open</div><div className="imf-value">{ipo.open}</div></div>
                    <div><div className="imf-label">Close</div><div className="imf-value">{ipo.close}</div></div>
                  </div>
                  <div className="sub-bar-wrap">
                    <div className="sub-bar-labels"><span>Subscription</span><span className="sub-pct">{ipo.sub}</span></div>
                    <div className="sub-rail"><div className={`sub-fill${ipo.purple ? ' purple' : ''}`} style={{ width: `${ipo.subPct}%` }} /></div>
                  </div>
                </div>
                <div className="ipo-card-footer">
                  <div className="gmp-badge">GMP {ipo.gmp}</div>
                  <a href="#" className="view-link">View Details →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IPO Learning */}
      <section className="sec" style={{ background: 'var(--surf1)' }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">IPO Education</div>
            <h2 className="sec-h2">How to Invest in IPOs</h2>
            <p className="sec-sub">From reading a DRHP to checking GMP to applying via ASBA — everything you need to know.</p>
          </div>
          <div className="feat-grid">
            {[
              { ico: '📖', title: 'How to Read a DRHP', desc: 'Draft Red Herring Prospectus — what to look for in promoter background, financials, and risk factors.', tag: 'Beginner', cls: 'fc-purple' },
              { ico: '🧮', title: 'Apply via UPI / ASBA', desc: 'Step-by-step guide to applying for an IPO through your broker app using UPI mandate or ASBA.', tag: 'Beginner', cls: 'fc-green' },
              { ico: '📊', title: 'Understanding GMP', desc: 'Grey Market Premium explained — how it forms, what it signals, and how to use it wisely.', tag: 'Intermediate', cls: 'fc-amber' },
              { ico: '🎯', title: 'Allotment Chances', desc: 'How basis of allotment works, retail vs HNI vs QIB categories, and how to maximise your odds.', tag: 'Intermediate', cls: 'fc-blue' },
              { ico: '🚀', title: 'Listing Day Strategy', desc: 'Should you sell on listing or hold? Data-backed analysis of listing gains across categories.', tag: 'Advanced', cls: 'fc-pink' },
              { ico: '💡', title: 'IPO Glossary', desc: 'From Anchor Investors to Oversubscription to DP ID — every IPO term explained simply.', tag: 'Reference', cls: 'fc-teal' },
            ].map(c => (
              <div key={c.title} className={`fg-card ${c.cls}`}>
                <div className="fg-ico">{c.ico}</div>
                <div className="fg-title">{c.title}</div>
                <div className="fg-desc">{c.desc}</div>
                <div className="fg-tag">{c.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-sec">
        <div className="cta-inner">
          <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Never Miss an IPO</div>
          <h2 className="cta-h2">Get IPO Alerts on WhatsApp</h2>
          <p className="cta-sub">Be the first to know about new IPOs opening, GMP updates, allotment results and listing gains — free WhatsApp alerts.</p>
          <div className="cta-btns">
            <a href="https://wa.me" className="cta-btn-p">💬 Join WhatsApp Community →</a>
            <Link to="/contact" className="cta-btn-s">Open Free Demat Account</Link>
          </div>
        </div>
      </section>
    </>
  )
}
