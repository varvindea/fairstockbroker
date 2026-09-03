import { useState } from 'react'
import { Link } from 'react-router-dom'
import { calculatorHref } from '../data/calculatorLinks'

export function HomePage() {
  const [activeLearnTab, setActiveLearnTab] = useState('all')
  const [activeSipTab, setActiveSipTab] = useState('sip')
  const [sipAmount, setSipAmount] = useState(10000)
  const [sipYears, setSipYears] = useState(10)
  const [sipRate, setSipRate] = useState(12)

  const sipResult = Math.round(sipAmount * (((Math.pow(1 + sipRate / 100 / 12, sipYears * 12) - 1) / (sipRate / 100 / 12)) * (1 + sipRate / 100 / 12)))
  const sipInvested = sipAmount * sipYears * 12
  const sipGains = sipResult - sipInvested

  const learningCards = [
    { cat: 'basics', thumb: 'lt1', level: 'lv-b', levelText: 'Beginner', icon: '🏦', lessons: '12 Lessons', category: 'Market Basics', title: 'How the Indian Stock Market Works', time: '1.2 hr read' },
    { cat: 'equity', thumb: 'lt2', level: 'lv-b', levelText: 'Beginner', icon: '📊', lessons: '15 Lessons', category: 'Mutual Funds', title: 'SIP vs Lumpsum: Which is Right for You?', time: '1.8 hr read' },
    { cat: 'technical', thumb: 'lt3', level: 'lv-i', levelText: 'Intermediate', icon: '📈', lessons: '18 Lessons', category: 'Technical Analysis', title: 'Candlestick Patterns: Complete Visual Guide', time: '2.4 hr read' },
    { cat: 'derivatives', thumb: 'lt4', level: 'lv-a', levelText: 'Advanced', icon: '⚡', lessons: '22 Lessons', category: 'F&O Strategies', title: 'Options Greeks: Delta, Theta, Vega Explained', time: '3.2 hr read' },
    { cat: 'ipo', thumb: 'lt5', level: 'lv-b', levelText: 'Beginner', icon: '🚀', lessons: '10 Lessons', category: 'IPO Investing', title: 'How to Apply for an IPO via ASBA & UPI', time: '1.1 hr read' },
    { cat: 'tax', thumb: 'lt6', level: 'lv-i', levelText: 'Intermediate', icon: '📋', lessons: '9 Lessons', category: 'Taxation', title: 'LTCG & STCG: Complete Tax Guide for Stock Investors', time: '1.6 hr read' },
  ]

  const filteredCards = activeLearnTab === 'all' ? learningCards : learningCards.filter(c => c.cat === activeLearnTab)

  const fmt = (n: number) => n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr` : n >= 100000 ? `₹${(n / 100000).toFixed(1)} L` : `₹${n.toLocaleString('en-IN')}`

  const sensexData = [
    { year: '1990', val: 1 }, { year: '1995', val: 3 }, { year: '2000', val: 5 },
    { year: '2007', val: 18 }, { year: '2014', val: 25 }, { year: '2020', val: 27 },
    { year: '2024', val: 73 }, { year: '2026', val: 80 },
  ]
  const maxVal = Math.max(...sensexData.map(d => d.val))

  return (
    <>
      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-body">
          <div className="hero-badge">
            <div className="badge-live"><div className="live-dot" /> LIVE</div>
            India's Most Complete Financial Platform
          </div>
          <h1 className="hero-h1">
            Master the<br />
            <span className="acc-p">Indian Markets</span><br />
            with Confidence
          </h1>
          <p className="hero-sub">IPO tracking, broker intelligence, financial calculators, and investment education — everything India's serious investor needs in one platform.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn-hero-p">Open Free Demat Account →</Link>
            <Link to="/pages" className="btn-hero-wa">Explore All Pages →</Link>
            <a href="https://wa.me" className="btn-hero-wa">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.659 1.437 5.17L2.08 22l4.948-1.297A9.955 9.955 0 0012 22c5.522 0 10-4.477 10-9.997C22 6.477 17.523 2 12 2z" fillRule="evenodd" clipRule="evenodd" /></svg>
              Join Community
            </a>
          </div>

          {/* Stats cards */}
          <div className="hero-stats-grid">
            <div className="hsg-card hsg-purple">
              <div className="hsg-top">
                <div className="hsg-icon-wrap hsg-icon-purple">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <div className="hsg-trend hsg-trend-up">↑ Growing</div>
              </div>
              <div className="hsg-num">40<span className="hsg-unit">K+</span></div>
              <div className="hsg-lbl">Investors Educated</div>
              <div className="hsg-bar-wrap"><div className="hsg-bar-track"><div className="hsg-bar-fill hsg-fill-purple" style={{ width: '72%' }} /></div></div>
              <div className="hsg-footnote">Across all age groups & regions</div>
            </div>

            <div className="hsg-card hsg-green">
              <div className="hsg-top">
                <div className="hsg-icon-wrap hsg-icon-green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                </div>
                <div className="hsg-trend hsg-trend-up">↑ 18% vs 2023</div>
              </div>
              <div className="hsg-num">200<span className="hsg-unit">+</span></div>
              <div className="hsg-lbl">IPOs Tracked / Year</div>
              <svg className="hsg-spark" viewBox="0 0 120 32" preserveAspectRatio="none">
                <defs><linearGradient id="sg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--g500)" stopOpacity=".25" /><stop offset="100%" stopColor="var(--g500)" stopOpacity="0" /></linearGradient></defs>
                <polyline points="0,28 15,22 30,25 45,18 60,20 75,12 90,10 105,7 120,4" fill="none" stroke="var(--g500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polygon points="0,28 15,22 30,25 45,18 60,20 75,12 90,10 105,7 120,4 120,32 0,32" fill="url(#sg1)" />
              </svg>
              <div className="hsg-footnote">Mainboard + SME combined</div>
            </div>

            <div className="hsg-card hsg-amber">
              <div className="hsg-top">
                <div className="hsg-icon-wrap hsg-icon-amber">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="12" y2="14" /></svg>
                </div>
                <div className="hsg-trend hsg-trend-up">Zero sign-up</div>
              </div>
              <div className="hsg-num">30<span className="hsg-unit">+</span></div>
              <div className="hsg-lbl">Free Calculators</div>
              <div className="hsg-dot-grid">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className={i < 30 ? 'hsg-dot hsg-dot-on' : 'hsg-dot hsg-dot-off'} />
                ))}
              </div>
              <div className="hsg-footnote">SIP · EMI · CAGR · NPS · PPF &amp; more</div>
            </div>

            <div className="hsg-card hsg-blue">
              <div className="hsg-top">
                <div className="hsg-icon-wrap hsg-icon-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                </div>
                <div className="hsg-trend hsg-trend-up">3 Levels</div>
              </div>
              <div className="hsg-num">120<span className="hsg-unit">+</span></div>
              <div className="hsg-lbl">Education Lessons</div>
              <div className="hsg-levels">
                <div className="hsg-level-row"><span className="hsg-level-badge" style={{ background: 'var(--g500)' }}>Beginner</span><div className="hsg-level-track"><div className="hsg-level-fill" style={{ width: '55%', background: 'var(--g500)' }} /></div><span className="hsg-level-cnt">64</span></div>
                <div className="hsg-level-row"><span className="hsg-level-badge" style={{ background: 'var(--p500)' }}>Inter.</span><div className="hsg-level-track"><div className="hsg-level-fill" style={{ width: '30%', background: 'var(--p500)' }} /></div><span className="hsg-level-cnt">36</span></div>
                <div className="hsg-level-row"><span className="hsg-level-badge" style={{ background: '#f59e0b' }}>Adv.</span><div className="hsg-level-track"><div className="hsg-level-fill" style={{ width: '17%', background: '#f59e0b' }} /></div><span className="hsg-level-cnt">20</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROOF BAR ══ */}
      <div className="proof-bar">
        <div className="proof-inner">
          <div className="proof-item"><span className="proof-icon">📊</span><span className="proof-text"><span>25+</span> Top Brokers Reviewed</span></div>
          <div className="proof-sep" />
          <div className="proof-item"><span className="proof-icon">🏦</span><span className="proof-text"><span>Zero-cost</span> Demat Account</span></div>
          <div className="proof-sep" />
          <div className="proof-item"><span className="proof-icon">📱</span><span className="proof-text"><span>Active</span> WhatsApp Community</span></div>
          <div className="proof-sep" />
          <div className="proof-item"><span className="proof-icon">🧮</span><span className="proof-text"><span>30+</span> Free Calculators</span></div>
          <div className="proof-sep" />
          <div className="proof-item"><span className="proof-icon">⭐</span><span className="proof-text">Rated <span>4.8/5</span> by users</span></div>
        </div>
      </div>

      {/* ══ FEATURES ══ */}
      <section className="sec" style={{ background: 'var(--white)' }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">Why FairStockBrokers</div>
            <h2 className="sec-h2">Everything for the Indian Investor</h2>
            <p className="sec-sub">From day-one investing to advanced IPO strategies — tools, data, and education to help you invest smarter.</p>
          </div>

          <div className="stat-ribbon">
            <div className="sr-item"><span className="sr-num">200<sup>+</sup></span><span className="sr-lbl">IPOs / Year</span></div>
            <div className="sr-div" />
            <div className="sr-item"><span className="sr-num">25<sup>+</sup></span><span className="sr-lbl">Brokers Reviewed</span></div>
            <div className="sr-div" />
            <div className="sr-item"><span className="sr-num">30<sup>+</sup></span><span className="sr-lbl">Free Calculators</span></div>
            <div className="sr-div" />
            <div className="sr-item"><span className="sr-num">120<sup>+</sup></span><span className="sr-lbl">Learning Lessons</span></div>
            <div className="sr-div" />
            <div className="sr-item"><span className="sr-num">4.8<sup>/5</sup></span><span className="sr-lbl">User Rating</span></div>
          </div>

          <div className="feat-grid">
            <div className="fg-card fc-purple"><div className="fg-ico">📡</div><div className="fg-title">Live IPO Intelligence</div><div className="fg-desc">Real-time GMP tracking, subscription status, allotment dates and listing gains — all in one place.</div><div className="fg-tag">200+ IPOs/year</div></div>
            <div className="fg-card fc-green"><div className="fg-ico">📚</div><div className="fg-title">Structured Learning</div><div className="fg-desc">120+ lessons across 8 topics — from demat basics to advanced F&O strategies, for all levels.</div><div className="fg-tag">8 Learning Topics</div></div>
            <div className="fg-card fc-amber"><div className="fg-ico">🧮</div><div className="fg-title">Calculator Hub</div><div className="fg-desc">SIP, Lumpsum, EMI, Step-Up SIP, CAGR, PPF, NPS and 25+ more — free, instant, no sign-up.</div><div className="fg-tag">30+ Free Tools</div></div>
            <div className="fg-card fc-blue"><div className="fg-ico">🏦</div><div className="fg-title">Broker Intelligence</div><div className="fg-desc">Unbiased deep-dive reviews of 25+ Indian brokers with pricing, features and honest ratings.</div><div className="fg-tag">25+ Brokers</div></div>
            <div className="fg-card fc-pink"><div className="fg-ico">💬</div><div className="fg-title">WhatsApp Community</div><div className="fg-desc">Live alerts, IPO updates, market insights and peer discussions — straight to your WhatsApp.</div><div className="fg-tag">Live Alerts</div></div>
            <div className="fg-card fc-teal"><div className="fg-ico">🎯</div><div className="fg-title">Goal-Based Planning</div><div className="fg-desc">Plan retirement, education or home purchase with our intelligent goal tracker and SIP planner.</div><div className="fg-tag">Smart Planning</div></div>
          </div>
        </div>
      </section>

      {/* ══ IPO TRACKER ══ */}
      <section className="sec ipo-sec" id="ipo">
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">IPO Tracker</div>
            <h2 className="sec-h2">Never Miss a Winning IPO</h2>
            <p className="sec-sub">Real-time GMP, subscription data, and listing performance — stay ahead of every mainboard and SME IPO.</p>
          </div>

          <div className="ipo-cards-grid">
            <div className="ipo-card">
              <div className="ipo-card-header">
                <div className="ipo-header-left"><div className="ipo-brand-icon ib1">🏦</div><div><div className="ipo-company">Quadrant Future Tek Ltd</div><div className="ipo-sector">Railway Technology · NSE SME</div></div></div>
                <div className="status-chip st-open">● OPEN</div>
              </div>
              <div className="ipo-card-body">
                <div className="ipo-meta-row">
                  <div><div className="imf-label">Price Band</div><div className="imf-value">₹275–290</div></div>
                  <div><div className="imf-label">Issue Size</div><div className="imf-value">₹290 Cr</div></div>
                  <div><div className="imf-label">Open</div><div className="imf-value">Jan 7</div></div>
                  <div><div className="imf-label">Close</div><div className="imf-value">Jan 9</div></div>
                </div>
                <div className="sub-bar-wrap">
                  <div className="sub-bar-labels"><span>Subscription</span><span className="sub-pct">186.4×</span></div>
                  <div className="sub-rail"><div className="sub-fill" style={{ width: '100%' }} /></div>
                </div>
              </div>
              <div className="ipo-card-footer"><div className="gmp-badge">GMP +₹82 (+28.3%)</div><Link to="/ipo" className="view-link">View Details →</Link></div>
            </div>

            <div className="ipo-card">
              <div className="ipo-card-header">
                <div className="ipo-header-left"><div className="ipo-brand-icon ib2">🏥</div><div><div className="ipo-company">Dr. Agarwal's Eye Care</div><div className="ipo-sector">Healthcare · NSE/BSE Mainboard</div></div></div>
                <div className="status-chip st-open">● OPEN</div>
              </div>
              <div className="ipo-card-body">
                <div className="ipo-meta-row">
                  <div><div className="imf-label">Price Band</div><div className="imf-value">₹382–402</div></div>
                  <div><div className="imf-label">Issue Size</div><div className="imf-value">₹3,027 Cr</div></div>
                  <div><div className="imf-label">Open</div><div className="imf-value">Jan 29</div></div>
                  <div><div className="imf-label">Close</div><div className="imf-value">Jan 31</div></div>
                </div>
                <div className="sub-bar-wrap">
                  <div className="sub-bar-labels"><span>Subscription</span><span className="sub-pct">32.8×</span></div>
                  <div className="sub-rail"><div className="sub-fill purple" style={{ width: '90%' }} /></div>
                </div>
              </div>
              <div className="ipo-card-footer"><div className="gmp-badge">GMP +₹110 (+27.4%)</div><Link to="/ipo" className="view-link">View Details →</Link></div>
            </div>

            <div className="ipo-card">
              <div className="ipo-card-header">
                <div className="ipo-header-left"><div className="ipo-brand-icon ib3">⚡</div><div><div className="ipo-company">Indobell Insulation Ltd</div><div className="ipo-sector">Manufacturing · BSE SME</div></div></div>
                <div className="status-chip st-upcoming">UPCOMING</div>
              </div>
              <div className="ipo-card-body">
                <div className="ipo-meta-row">
                  <div><div className="imf-label">Price Band</div><div className="imf-value">₹95–100</div></div>
                  <div><div className="imf-label">Issue Size</div><div className="imf-value">₹12.4 Cr</div></div>
                  <div><div className="imf-label">Open</div><div className="imf-value">Feb 4</div></div>
                  <div><div className="imf-label">Close</div><div className="imf-value">Feb 6</div></div>
                </div>
                <div className="sub-bar-wrap">
                  <div className="sub-bar-labels"><span>Expected GMP</span><span className="sub-pct">+24%</span></div>
                  <div className="sub-rail"><div className="sub-fill" style={{ width: '45%' }} /></div>
                </div>
              </div>
              <div className="ipo-card-footer"><div className="gmp-badge">GMP +₹24 (+24%)</div><Link to="/contact" className="view-link">Set Alert →</Link></div>
            </div>
          </div>

          {/* IPO Infographic strip */}
          <div className="ipo-infographic-strip">
            <div className="ipo-mile-grid">
              <div className="ipo-mile-tile" style={{ background: 'linear-gradient(135deg,var(--p50),var(--p100))', borderColor: 'var(--p200)' }}><div className="imt-num" style={{ color: 'var(--p600)' }}>324</div><div className="imt-lbl">IPOs in 2024</div></div>
              <div className="ipo-mile-tile" style={{ background: 'linear-gradient(135deg,var(--g50),var(--g100))', borderColor: 'var(--g200)' }}><div className="imt-num" style={{ color: 'var(--g600)' }}>₹68K Cr</div><div className="imt-lbl">Funds Raised</div></div>
              <div className="ipo-mile-tile" style={{ background: 'linear-gradient(135deg,#fffbeb,#fef3c7)', borderColor: '#fde68a' }}><div className="imt-num" style={{ color: '#b45309' }}>+31%</div><div className="imt-lbl">Avg. GMP Premium</div></div>
              <div className="ipo-mile-tile" style={{ background: 'linear-gradient(135deg,#fdf4ff,#fae8ff)', borderColor: '#e9d5ff' }}><div className="imt-num" style={{ color: '#7c3aed' }}>186×</div><div className="imt-lbl">Peak Oversubscribed</div></div>
            </div>
            <div className="ipo-success-card">
              <div className="isc-title">IPO Success Rate <span className="isc-badge">All-time</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '10px' }}>
                <svg width="80" height="80" viewBox="0 0 80 80" style={{ flexShrink: 0 }}>
                  <circle cx="40" cy="40" r="30" fill="none" stroke="var(--surf2)" strokeWidth="9" />
                  <circle cx="40" cy="40" r="30" fill="none" stroke="url(#rg2)" strokeWidth="9" strokeDasharray="116.8 72.2" strokeDashoffset="47.1" strokeLinecap="round" transform="rotate(-90 40 40)" />
                  <defs><linearGradient id="rg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="var(--g500)" /><stop offset="100%" stopColor="var(--p400)" /></linearGradient></defs>
                  <text x="40" y="36" textAnchor="middle" fontSize="14" fontWeight="900" fill="var(--ink)">62%</text>
                  <text x="40" y="47" textAnchor="middle" fontSize="7" fill="var(--ink4)">Positive</text>
                </svg>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[{ label: 'SME IPOs', pct: 82, color: 'var(--p600)', fill: 'linear-gradient(90deg,var(--p400),var(--p600))' }, { label: 'Mainboard', pct: 38, color: 'var(--g600)', fill: 'linear-gradient(90deg,var(--g400),var(--g600))' }, { label: 'Tech IPOs', pct: 56, color: 'var(--amber)', fill: 'linear-gradient(90deg,#fbbf24,#f59e0b)' }].map(r => (
                    <div key={r.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}><span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink3)' }}>{r.label}</span><span style={{ fontSize: '11px', fontWeight: 800, color: r.color }}>{r.pct}%</span></div>
                      <div style={{ height: '5px', background: 'var(--surf2)', borderRadius: '100px', overflow: 'hidden' }}><div style={{ width: `${r.pct}%`, height: '100%', background: r.fill, borderRadius: '100px' }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ipo-success-card">
              <div className="isc-title">IPO Lifecycle <span className="isc-badge">How it works</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: '10px' }}>
                {[{ n: 1, title: 'Open Subscription', desc: 'Apply via broker in 3–5 day window', grad: 'linear-gradient(135deg,var(--p500),var(--p700))' }, { n: 2, title: 'Allotment & Refund', desc: 'Basis of allotment ~6 days post close', grad: 'linear-gradient(135deg,var(--p400),var(--g600))' }, { n: 3, title: 'Listing Day 🚀', desc: 'Shares list on NSE/BSE ~T+6', grad: 'linear-gradient(135deg,var(--g500),var(--g700))' }].map((s, i) => (
                  <div key={s.n} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: s.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900, color: '#fff' }}>{s.n}</div>
                      {i < 2 && <div style={{ width: '2px', height: '16px', background: 'linear-gradient(var(--p300),var(--g300))', marginTop: '3px' }} />}
                    </div>
                    <div style={{ paddingBottom: i < 2 ? '12px' : 0 }}><div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--ink)' }}>{s.title}</div><div style={{ fontSize: '10.5px', color: 'var(--ink4)', marginTop: '1px' }}>{s.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/ipo" className="cta-btn-p">View All IPOs →</Link>
          </div>
        </div>
      </section>

      {/* ══ WEALTH / IMPACT ══ */}
      <section className="wealth-sec">
        <div className="wealth-inner">
          <div className="wealth-head">
            <div className="sec-eyebrow">Platform Impact</div>
            <h2 className="sec-h2">Trusted by India's Serious Investors</h2>
            <p className="sec-sub">Real numbers from real investors using FairStockBrokers to make better financial decisions every day.</p>
          </div>
          <div className="wealth-grid">
            <div className="wealth-card"><div className="wc-ico">👥</div><div className="wc-num">40<sup>K+</sup></div><div className="wc-lbl">Investors Educated</div></div>
            <div className="wealth-card"><div className="wc-ico">💬</div><div className="wc-num">30<sup>+</sup></div><div className="wc-lbl">Free Calculators</div></div>
            <div className="wealth-card"><div className="wc-ico">📡</div><div className="wc-num">324</div><div className="wc-lbl">IPOs Tracked in 2024</div></div>
            <div className="wealth-card"><div className="wc-ico">⭐</div><div className="wc-num">4.8<sup>/5</sup></div><div className="wc-lbl">Average Rating</div></div>
          </div>
          <div className="wealth-chart-row">
            <div className="wealth-bar-chart">
              <div className="wbc-title">Sensex Multi-Decade Journey (Points × 1000)</div>
              <div className="wbc-bars">
                {sensexData.map(d => (
                  <div key={d.year} className="wbar" style={{ height: `${(d.val / maxVal) * 100}%` }}>
                    <div className="wbar-label">{d.year}</div>
                  </div>
                ))}
              </div>
              <div className="wbc-axis">
                {sensexData.map(d => <span key={d.year}>{d.year}</span>)}
              </div>
            </div>
            <div className="wealth-features">
              <div className="wf-item"><div className="wf-ico">🎯</div><div><div className="wf-title">Goal-Based Planning</div><div className="wf-desc">Plan for retirement, children's education, or home purchase using our intelligent goal tracker and SIP planner.</div></div></div>
              <div className="wf-item"><div className="wf-ico">🧠</div><div><div className="wf-title">AI Market Insights</div><div className="wf-desc">Weekly market summaries, sector rotation signals, and curated research — all explained in plain language.</div></div></div>
              <div className="wf-item"><div className="wf-ico">🔔</div><div><div className="wf-title">Smart Alerts</div><div className="wf-desc">IPO opening alerts, allotment results, listing day notifications — never miss a critical market event again.</div></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ LEARNING ══ */}
      <section className="sec" id="learn" style={{ background: 'var(--white)' }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">Education Hub</div>
            <h2 className="sec-h2">Learn Investing. Think Independently.</h2>
            <p className="sec-sub">120+ structured lessons covering everything from demat basics to F&O strategies, options, technical analysis, and macro economics.</p>
          </div>
          <div className="learn-tabs">
            {[['all', 'All Topics'], ['basics', 'Market Basics'], ['equity', 'Equity & MF'], ['technical', 'Technical'], ['derivatives', 'F&O / Derivatives'], ['ipo', 'IPO Investing'], ['tax', 'Taxation']].map(([key, label]) => (
              <button key={key} className={`ltab${activeLearnTab === key ? ' active' : ''}`} onClick={() => setActiveLearnTab(key)}>{label}</button>
            ))}
          </div>
          <div className="learn-bento">
            {filteredCards.map((c, i) => (
              <div key={i} className="lcard">
                <div className={`lcard-thumb ${c.thumb}`}>
                  <div className={`lv-badge ${c.level}`}>{c.levelText}</div>
                  <div className="topic-cnt">{c.lessons}</div>
                  {c.icon}
                </div>
                <div className="lcard-body">
                  <div className="lcard-cat">{c.category}</div>
                  <div className="lcard-title">{c.title}</div>
                  <div className="lcard-meta"><span>📖 {c.time}</span><div className="progress-mini"><div className="pm-fill" style={{ width: '0%' }} /></div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BROKER COMPARISON ══ */}
      <section className="sec broker-sec" id="brokers">
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">Broker Intelligence</div>
            <h2 className="sec-h2">India's Top 25 Brokers Compared</h2>
            <p className="sec-sub">Unbiased, research-backed reviews — charges, app quality, support, and features, all in one table.</p>
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
                  <th>Rating</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Zerodha', type: 'Discount', av: { bg: '#dcfce7', color: '#166534', text: 'Z' }, open: '₹200', delivery: 'FREE', intraday: '₹20/order', amc: '₹300', rating: '4.8', stars: '★★★★★', best: true },
                  { name: 'Groww', type: 'Discount', av: { bg: '#ede9fe', color: '#5b21b6', text: 'G' }, open: 'FREE', delivery: 'FREE', intraday: '₹20/order', amc: '₹0', rating: '4.6', stars: '★★★★☆', best: false },
                  { name: 'AngelOne', type: 'Discount', av: { bg: '#fef3c7', color: '#92400e', text: 'A' }, open: 'FREE', delivery: 'FREE', intraday: '₹20/order', amc: '₹240', rating: '4.5', stars: '★★★★☆', best: false },
                  { name: 'Upstox', type: 'Discount', av: { bg: '#e0f2fe', color: '#0c4a6e', text: 'U' }, open: 'FREE', delivery: 'FREE', intraday: '₹20/order', amc: '₹150', rating: '4.4', stars: '★★★★☆', best: false },
                  { name: 'ICICI Direct', type: 'Full Service', av: { bg: '#fef3c7', color: '#b45309', text: 'IC' }, open: 'FREE', delivery: '0.55%', intraday: '0.275%', amc: '₹700', rating: '4.2', stars: '★★★★☆', best: false },
                ].map(b => (
                  <tr key={b.name}>
                    <td><div className="broker-cell"><div className="b-av" style={{ background: b.av.bg, color: b.av.color }}>{b.av.text}</div><div><div className="b-name">{b.name} {b.best && <span className="best-tag">BEST</span>}</div><div className="b-type">{b.type}</div></div></div></td>
                    <td><span className={b.open === 'FREE' ? 'free-tag' : undefined}>{b.open}</span></td>
                    <td><span className={b.delivery === 'FREE' ? 'free-tag' : undefined}>{b.delivery}</span></td>
                    <td>{b.intraday}</td>
                    <td>{b.amc}</td>
                    <td><div className="stars">{b.stars}</div><div style={{ fontSize: '11px', color: 'var(--ink4)' }}>{b.rating}/5</div></td>
                    <td><Link to="/contact" className="open-btn">Open →</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link to="/brokers" className="cta-btn-p">Compare All 25 Brokers →</Link>
          </div>
        </div>
      </section>

      {/* ══ CALCULATORS ══ */}
      <section className="sec" id="calc" style={{ background: 'var(--white)' }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">Calculator Hub</div>
            <h2 className="sec-h2">30+ Free Financial Calculators</h2>
            <p className="sec-sub">SIP, EMI, CAGR, Goal Planner and more — built for Indian investors, zero sign-up required.</p>
          </div>
          <div className="calc-layout">
            <div>
              <div className="calc-grid">
                {[
                  { ico: '📈', name: 'SIP Calculator', desc: 'Monthly SIP returns' },
                  { ico: '⬆️', name: 'Step Up SIP', desc: 'Annual increase' },
                  { ico: '💰', name: 'Lumpsum', desc: 'One-time investment' },
                  { ico: '💸', name: 'SWP Calculator', desc: 'Systematic withdrawal' },
                  { ico: '🏛️', name: 'FD Calculator', desc: 'Fixed deposit returns' },
                  { ico: '📅', name: 'RD Calculator', desc: 'Recurring deposit' },
                  { ico: '🏠', name: 'EMI Calculator', desc: 'Home / car loan' },
                  { ico: '📊', name: 'CAGR Calculator', desc: 'Compound growth' },
                  { ico: '72️⃣', name: 'Rule of 72', desc: 'Doubling time' },
                  { ico: '🏛️', name: 'PPF Calculator', desc: 'Public provident fund' },
                  { ico: '👶', name: 'NPS Calculator', desc: 'Pension planning' },
                  { ico: '🎯', name: 'Goal Planner', desc: 'Wealth goal tracker' },
                ].map(c => (
                  <a key={c.name} href={calculatorHref(c.name)} className="calc-pill">
                    <div className="cp-ico">{c.ico}</div>
                    <div className="cp-name">{c.name}</div>
                    <div className="cp-desc">{c.desc}</div>
                  </a>
                ))}
              </div>
            </div>
            <div className="live-calc">
              <div className="lc-tabs">
                {[['sip', 'SIP'], ['fd', 'FD'], ['emi', 'EMI']].map(([key, label]) => (
                  <button key={key} className={`lc-tab${activeSipTab === key ? ' active' : ''}`} onClick={() => setActiveSipTab(key)}>{label}</button>
                ))}
              </div>
              <div className="lc-body">
                {activeSipTab === 'sip' && <>
                  <div className="calc-field">
                    <label>Monthly Investment</label>
                    <input type="range" min="500" max="100000" step="500" value={sipAmount} onChange={e => setSipAmount(+e.target.value)} />
                    <div className="field-vals"><span>₹500</span><span className="curr">{fmt(sipAmount)}</span><span>₹1L</span></div>
                  </div>
                  <div className="calc-field">
                    <label>Investment Period (Years)</label>
                    <input type="range" min="1" max="30" value={sipYears} onChange={e => setSipYears(+e.target.value)} />
                    <div className="field-vals"><span>1yr</span><span className="curr">{sipYears} yrs</span><span>30yr</span></div>
                  </div>
                  <div className="calc-field">
                    <label>Expected Return (% p.a.)</label>
                    <input type="range" min="6" max="30" step="0.5" value={sipRate} onChange={e => setSipRate(+e.target.value)} />
                    <div className="field-vals"><span>6%</span><span className="curr">{sipRate}%</span><span>30%</span></div>
                  </div>
                  <div className="calc-result">
                    <div className="cr-label">Total Corpus</div>
                    <div className="cr-val">{fmt(sipResult)}</div>
                    <div className="cr-rows">
                      <div className="cr-row"><span className="k">Invested Amount</span><span className="v">{fmt(sipInvested)}</span></div>
                      <div className="cr-row"><span className="k">Est. Returns</span><span className="v">{fmt(sipGains)}</span></div>
                      <div className="cr-row"><span className="k">Return Multiple</span><span className="v">{(sipResult / sipInvested).toFixed(1)}×</span></div>
                    </div>
                  </div>
                </>}
                {activeSipTab === 'fd' && <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--ink3)' }}>FD Calculator — <a href={calculatorHref('FD Calculator')} style={{ color: 'var(--p500)', fontWeight: 700 }}>Open Full Calculator →</a></div>}
                {activeSipTab === 'emi' && <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--ink3)' }}>EMI Calculator — <a href={calculatorHref('EMI Calculator')} style={{ color: 'var(--p500)', fontWeight: 700 }}>Open Full Calculator →</a></div>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="sec" style={{ background: '#fff' }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">How It Works</div>
            <h2 className="sec-h2">Start in 4 Simple Steps</h2>
            <p className="sec-sub">From discovery to confident investing — our platform guides you every step of the way.</p>
          </div>
          <div className="hiw-steps">
            <div className="hiw-step"><div className="step-num sn1">1</div><div className="step-title">Explore the Platform</div><div className="step-desc">Browse IPOs, broker reviews, calculators and learning content — all free, no login.</div></div>
            <div className="hiw-step"><div className="step-num sn2">2</div><div className="step-title">Compare Brokers</div><div className="step-desc">Use our unbiased comparison to pick the broker that fits your trading style and budget.</div></div>
            <div className="hiw-step"><div className="step-num sn3">3</div><div className="step-title">Open Free Demat</div><div className="step-desc">Open your demat account in 10 minutes — 100% online, paperless and guided.</div></div>
            <div className="hiw-step"><div className="step-num sn4">4</div><div className="step-title">Invest with Confidence</div><div className="step-desc">Apply for IPOs, use calculators, track goals and keep learning — we're always here.</div></div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="sec testi-sec">
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">What Investors Say</div>
            <h2 className="sec-h2">Trusted by 40,000+ Investors</h2>
            <p className="sec-sub">Real stories from real people making better financial decisions every day.</p>
          </div>
          <div className="testi-grid">
            {[
              { stars: '★★★★★', text: "FairStockBrokers' IPO tracker is my go-to before every IPO. The GMP data, subscription numbers, and allotment status are always accurate. Saved me from bad IPOs multiple times!", name: 'Rajesh Mehta', role: 'Equity Investor, Mumbai', av: { bg: 'linear-gradient(135deg,var(--p500),var(--p700))', text: 'RM' } },
              { stars: '★★★★★', text: "The broker comparison tool is incredible. I switched from HDFC Securities to Zerodha after seeing the fee difference. Saving ₹12,000+ per year. Couldn't have made that decision without this platform.", name: 'Priya Sharma', role: 'Long-term Investor, Bangalore', av: { bg: 'linear-gradient(135deg,var(--g500),var(--g700))', text: 'PS' } },
              { stars: '★★★★★', text: "As a first-time investor, the learning modules were a game-changer. Started with Market Basics, now I'm confidently trading F&O. The calculators helped me plan my first SIP too!", name: 'Arjun Nair', role: 'Beginner Investor, Chennai', av: { bg: 'linear-gradient(135deg,#f59e0b,#d97706)', text: 'AN' } },
            ].map(t => (
              <div key={t.name} className="testi-card">
                <div className="testi-stars">{t.stars}</div>
                <span className="testi-quote-mark">"</span>
                <p className="testi-text">{t.text}</p>
                <div className="testi-divider" />
                <div className="testi-author">
                  <div className="ta-avatar" style={{ background: t.av.bg }}>{t.av.text}</div>
                  <div><div className="ta-name">{t.name}</div><div className="ta-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="cta-sec">
        <div className="cta-inner">
          <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Start Today — It's Free</div>
          <h2 className="cta-h2">India's Most Complete<br />Financial Platform</h2>
          <p className="cta-sub">Join 40,000+ investors who use FairStockBrokers every day to make smarter decisions, track IPOs, compare brokers, and build wealth confidently.</p>
          <div className="cta-btns">
            <Link to="/contact" className="cta-btn-p">Open Free Demat Account →</Link>
            <a href="https://wa.me" className="cta-btn-s">💬 Join WhatsApp Community</a>
          </div>
        </div>
      </section>

      {/* WhatsApp float */}
      <a href="https://wa.me" className="wa-float" target="_blank" rel="noopener noreferrer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.659 1.437 5.17L2.08 22l4.948-1.297A9.955 9.955 0 0012 22c5.522 0 10-4.477 10-9.997C22 6.477 17.523 2 12 2z" fillRule="evenodd" clipRule="evenodd" /></svg>
        Join Community
      </a>
    </>
  )
}

