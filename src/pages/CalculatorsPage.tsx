import { useState } from 'react'
import { Link } from 'react-router-dom'
import { calculatorHref } from '../data/calculatorLinks'

const calculatorCategories = [
  {
    key: 'investment',
    label: '📈 Investment',
    calcs: [
      { ico: '📈', name: 'SIP Calculator', desc: 'Monthly SIP returns & corpus', badge: 'Most Popular' },
      { ico: '⬆️', name: 'Step Up SIP', desc: 'Annual increment SIP returns', badge: '' },
      { ico: '💰', name: 'Lumpsum Calculator', desc: 'One-time investment growth', badge: '' },
      { ico: '💸', name: 'SWP Calculator', desc: 'Systematic withdrawal planning', badge: '' },
      { ico: '📊', name: 'SIP vs Lumpsum', desc: 'Which gives better returns?', badge: '' },
      { ico: '🔄', name: 'Step-up SWP', desc: 'Growing withdrawal plan', badge: '' },
    ],
  },
  {
    key: 'tax',
    label: '📋 Tax & Salary',
    calcs: [
      { ico: '📋', name: 'Income Tax Calculator', desc: 'Old vs new tax regime', badge: 'FY 2026-27' },
      { ico: '📈', name: 'LTCG Tax Calculator', desc: 'Long-term capital gains tax', badge: '' },
      { ico: '📉', name: 'STCG Tax Calculator', desc: 'Short-term capital gains tax', badge: '' },
      { ico: '🏠', name: 'HRA Exemption Calculator', desc: 'House rent allowance exemption', badge: '' },
      { ico: '💼', name: 'TDS Calculator', desc: 'Tax deducted at source', badge: '' },
      { ico: '⬆️', name: 'Salary Hike Planner', desc: 'Plan your appraisal strategy', badge: '' },
    ],
  },
  {
    key: 'savings',
    label: '🏦 Savings & FD',
    calcs: [
      { ico: '🏛️', name: 'FD Calculator', desc: 'Fixed deposit maturity value', badge: '' },
      { ico: '📅', name: 'RD Calculator', desc: 'Recurring deposit returns', badge: '' },
      { ico: '🏛️', name: 'PPF Calculator', desc: 'Public provident fund growth', badge: '' },
      { ico: '👶', name: 'NPS Calculator', desc: 'National pension scheme', badge: '' },
      { ico: '🏅', name: 'NSC Calculator', desc: 'National savings certificate', badge: '' },
      { ico: '💎', name: 'Sukanya Samriddhi', desc: 'Girl child savings scheme', badge: '' },
    ],
  },
  {
    key: 'loans',
    label: '🏠 Loans & EMI',
    calcs: [
      { ico: '🏠', name: 'EMI Calculator', desc: 'Home / personal / car loan', badge: 'Most Used' },
      { ico: '🚗', name: 'Car Loan Calculator', desc: 'Auto loan EMI & total cost', badge: '' },
      { ico: '🎓', name: 'Education Loan', desc: 'Study loan repayment plan', badge: '' },
      { ico: '💳', name: 'Credit Card Payoff', desc: 'Pay off CC debt faster', badge: '' },
      { ico: '🔄', name: 'Balance Transfer', desc: 'Savings from BT loan', badge: '' },
      { ico: '💡', name: 'Loan Prepayment', desc: 'Savings from part-payment', badge: '' },
    ],
  },
  {
    key: 'planning',
    label: '🎯 Goal Planning',
    calcs: [
      { ico: '🎯', name: 'Goal Planner', desc: 'Any financial goal tracker', badge: '' },
      { ico: '🏖️', name: 'Retirement Planner', desc: 'Corpus for retirement', badge: '' },
      { ico: '👶', name: 'Child Education Plan', desc: 'Education fund calculator', badge: '' },
      { ico: '🔥', name: 'FIRE Number', desc: 'Financial independence calculator', badge: 'Popular' },
      { ico: '💧', name: 'Emergency Fund', desc: 'How much buffer you need', badge: '' },
      { ico: '📊', name: 'Net Worth Calculator', desc: 'Total net worth tracker', badge: '' },
    ],
  },
  {
    key: 'analytics',
    label: '📊 Analytics',
    calcs: [
      { ico: '📊', name: 'CAGR Calculator', desc: 'Compound annual growth rate', badge: '' },
      { ico: '♾️', name: 'Compound Interest', desc: 'Power of compounding', badge: '' },
      { ico: '72️⃣', name: 'Rule of 72', desc: 'How long to double money', badge: '' },
      { ico: '🌡️', name: 'Inflation Calculator', desc: 'Future value after inflation', badge: '' },
      { ico: '💹', name: 'CAGR vs XIRR', desc: 'Return comparison', badge: '' },
      { ico: '📉', name: 'Wealth Drawdown', desc: 'Portfolio withdrawal planning', badge: '' },
    ],
  },
]

export function CalculatorsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sipAmount, setSipAmount] = useState(10000)
  const [sipYears, setSipYears] = useState(10)
  const [sipRate, setSipRate] = useState(12)

  const sipResult = Math.round(sipAmount * (((Math.pow(1 + sipRate / 100 / 12, sipYears * 12) - 1) / (sipRate / 100 / 12)) * (1 + sipRate / 100 / 12)))
  const sipInvested = sipAmount * sipYears * 12
  const sipGains = sipResult - sipInvested

  const fmt = (n: number) => n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr` : n >= 100000 ? `₹${(n / 100000).toFixed(1)} L` : `₹${n.toLocaleString('en-IN')}`

  const displayedCategories = activeCategory === 'all' ? calculatorCategories : calculatorCategories.filter(c => c.key === activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="page-hero-sec">
        <div className="page-hero-inner">
          <div className="page-eyebrow">Calculator Hub</div>
          <h1 className="page-h1">30+ Free Financial Calculators<br />for Indian Investors</h1>
          <p className="page-sub">SIP, EMI, Tax, Insurance, Retirement and Goal Planning calculators — built for Indian investors, updated for FY 2026-27. No sign-up required.</p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-hero-p">Open Free Demat Account →</Link>
            <a href="https://wa.me" className="btn-hero-wa">💬 Ask a Calculator Question</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="proof-bar">
        <div className="proof-inner">
          <div className="proof-item"><span className="proof-icon">🧮</span><span className="proof-text"><span>30+</span> Calculators</span></div>
          <div className="proof-sep" />
          <div className="proof-item"><span className="proof-icon">✅</span><span className="proof-text"><span>Zero</span> Sign-up</span></div>
          <div className="proof-sep" />
          <div className="proof-item"><span className="proof-icon">📅</span><span className="proof-text">Updated <span>FY 2026-27</span></span></div>
          <div className="proof-sep" />
          <div className="proof-item"><span className="proof-icon">📱</span><span className="proof-text"><span>Mobile</span> Optimized</span></div>
        </div>
      </div>

      {/* Live SIP Calculator */}
      <section className="sec" style={{ background: 'var(--surf1)' }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">Try It Now</div>
            <h2 className="sec-h2">SIP Calculator — Live</h2>
            <p className="sec-sub">See the power of compounding instantly. Adjust the sliders to calculate your SIP returns.</p>
          </div>
          <div className="calc-layout">
            <div>
              <div className="calc-field">
                <label>Monthly Investment</label>
                <input type="range" min="500" max="100000" step="500" value={sipAmount} onChange={e => setSipAmount(+e.target.value)} />
                <div className="field-vals"><span>₹500</span><span className="curr">{fmt(sipAmount)}</span><span>₹1L</span></div>
              </div>
              <div className="calc-field">
                <label>Investment Period (Years)</label>
                <input type="range" min="1" max="30" value={sipYears} onChange={e => setSipYears(+e.target.value)} />
                <div className="field-vals"><span>1yr</span><span className="curr">{sipYears} years</span><span>30yr</span></div>
              </div>
              <div className="calc-field">
                <label>Expected Return (% p.a.)</label>
                <input type="range" min="6" max="30" step="0.5" value={sipRate} onChange={e => setSipRate(+e.target.value)} />
                <div className="field-vals"><span>6%</span><span className="curr">{sipRate}%</span><span>30%</span></div>
              </div>

              {/* Visual donut */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '24px', background: '#fff', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px' }}>
                <svg width="100" height="100" viewBox="0 0 100 100" style={{ flexShrink: 0 }}>
                  <circle cx="50" cy="50" r="38" fill="none" stroke="var(--surf2)" strokeWidth="12" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="url(#dg1)" strokeWidth="12"
                    strokeDasharray={`${(sipInvested / sipResult) * 238.8} ${238.8 - (sipInvested / sipResult) * 238.8}`}
                    strokeDashoffset="59.7" strokeLinecap="round" transform="rotate(-90 50 50)" />
                  <defs><linearGradient id="dg1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="var(--p500)" /><stop offset="100%" stopColor="var(--g500)" /></linearGradient></defs>
                </svg>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--p500)' }} />
                    <span style={{ fontSize: '12px', color: 'var(--ink3)' }}>Invested: <strong style={{ color: 'var(--ink)' }}>{fmt(sipInvested)}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--g500)' }} />
                    <span style={{ fontSize: '12px', color: 'var(--ink3)' }}>Est. Gains: <strong style={{ color: 'var(--g600)' }}>{fmt(sipGains)}</strong></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="live-calc">
              <div style={{ padding: '20px 20px 0', background: 'var(--p50)', borderBottom: '1.5px solid var(--p100)' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--ink3)', marginBottom: '8px' }}>SIP Result</div>
              </div>
              <div className="lc-body">
                <div className="calc-result">
                  <div className="cr-label">Total Corpus in {sipYears} years</div>
                  <div className="cr-val">{fmt(sipResult)}</div>
                  <div className="cr-rows">
                    <div className="cr-row"><span className="k">Monthly SIP</span><span className="v">{fmt(sipAmount)}</span></div>
                    <div className="cr-row"><span className="k">Total Invested</span><span className="v">{fmt(sipInvested)}</span></div>
                    <div className="cr-row"><span className="k">Total Returns</span><span className="v">{fmt(sipGains)}</span></div>
                    <div className="cr-row"><span className="k">Return Multiple</span><span className="v">{(sipResult / sipInvested).toFixed(1)}×</span></div>
                    <div className="cr-row"><span className="k">Annualized Return</span><span className="v">{sipRate}% p.a.</span></div>
                  </div>
                </div>
                <div style={{ marginTop: '16px', padding: '12px', background: 'var(--g50)', borderRadius: '10px', border: '1px solid var(--g200)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--g700)', fontWeight: 700 }}>💡 Pro Tip</div>
                  <div style={{ fontSize: '12px', color: 'var(--ink3)', marginTop: '4px', lineHeight: 1.6 }}>Increasing your SIP by 10% annually (Step-Up SIP) could boost your corpus by 30–50% over long periods.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator categories */}
      <section className="sec" style={{ background: 'var(--white)' }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">All Calculators</div>
            <h2 className="sec-h2">Find the Right Calculator</h2>
            <p className="sec-sub">Explore all 30+ calculators across investment, tax, savings, loans, and goal planning.</p>
          </div>
          <div className="calc-categories">
            <button className={`calc-cat-btn${activeCategory === 'all' ? ' active' : ''}`} onClick={() => setActiveCategory('all')}>🌐 All</button>
            {calculatorCategories.map(c => (
              <button key={c.key} className={`calc-cat-btn${activeCategory === c.key ? ' active' : ''}`} onClick={() => setActiveCategory(c.key)}>{c.label}</button>
            ))}
          </div>

          {displayedCategories.map(cat => (
            <div key={cat.key} style={{ marginBottom: '48px' }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                {cat.label}
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink4)', background: 'var(--surf2)', padding: '3px 10px', borderRadius: '100px' }}>{cat.calcs.length} calculators</span>
              </div>
              <div className="calc-cards-grid">
                {cat.calcs.map(c => (
                  <a key={c.name} href={calculatorHref(c.name)} className="calc-card">
                    <div className="calc-card-ico">{c.ico}</div>
                    <div className="calc-card-name">{c.name}</div>
                    <div className="calc-card-desc">{c.desc}</div>
                    {c.badge && <div className="calc-card-badge">{c.badge}</div>}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-sec">
        <div className="cta-inner">
          <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Start Investing Today</div>
          <h2 className="cta-h2">Plan. Calculate. Invest.</h2>
          <p className="cta-sub">Open a free demat account and start investing based on your calculator projections — guided by India's most trusted financial platform.</p>
          <div className="cta-btns">
            <Link to="/contact" className="cta-btn-p">Open Free Demat Account →</Link>
            <a href="https://wa.me" className="cta-btn-s">💬 Join WhatsApp Community</a>
          </div>
        </div>
      </section>
    </>
  )
}
