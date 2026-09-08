import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { calculatorHref, isNativeCalculator } from '../data/calculatorLinks'

type Level = 'Beginner' | 'Intermediate' | 'Advanced'
type Pill = { cls: string; label: string }
type Card = { icon: string; title: string; desc: string; tags: string[]; level: Level; pill?: Pill }
type Category = { key: string; cls: string; icon: string; name: string; desc: string; cards: Card[] }

const categories: Category[] = [
  {
    key: 'invest', cls: 'lp-cat--invest', icon: '📈', name: 'Investment Calculators',
    desc: 'SIP, Lumpsum, FD, RD, CAGR & wealth compounding tools',
    cards: [
      { icon: '📊', title: 'SIP Calculator', desc: 'Calculate mutual fund SIP maturity, total returns, and wealth multiplier with rupee-cost averaging.', tags: ['Mutual Fund', 'Monthly SIP', 'Compounding'], level: 'Beginner', pill: { cls: 'lp-pill--hot', label: '🔥 Most Popular' } },
      { icon: '⬆️', title: 'Step-Up SIP', desc: 'Boost your SIP yearly — see the massive wealth difference a 10% annual step-up creates.', tags: ['Top-Up', 'Step-Up'], level: 'Beginner', pill: { cls: 'lp-pill--star', label: '⭐ Top Pick' } },
      { icon: '💰', title: 'Lumpsum Calculator', desc: 'Returns on a one-time investment at a compounded rate over any tenure.', tags: ['One-Time', 'Lumpsum'], level: 'Beginner' },
      { icon: '🏛️', title: 'FD Calculator', desc: 'Fixed deposit maturity with quarterly compounding and effective yield.', tags: ['Fixed Deposit', 'Bank'], level: 'Beginner' },
      { icon: '🪙', title: 'RD Calculator', desc: 'Recurring deposit maturity and interest earned on monthly instalments.', tags: ['Recurring', 'Monthly'], level: 'Beginner' },
      { icon: '💸', title: 'SWP Calculator', desc: 'Plan monthly withdrawals from your corpus — see how long it lasts.', tags: ['Withdrawal', 'Income'], level: 'Intermediate' },
      { icon: '📐', title: 'CAGR Calculator', desc: 'Find the true annualised growth rate between any start and end value.', tags: ['CAGR', 'Returns'], level: 'Beginner' },
      { icon: '⚡', title: 'Rule of 72', desc: 'Instantly estimate how long it takes to double your money at any rate.', tags: ['Quick Math', 'Doubling'], level: 'Beginner' },
      { icon: '📉', title: 'Step-Up SWP', desc: 'Plan growing withdrawals that increase annually — ideal for rising post-retirement expenses.', tags: ['Step-Up', 'Withdrawal'], level: 'Intermediate' },
      { icon: '🎯', title: 'Goal Planner', desc: 'Work backwards from a future financial goal to find the SIP or lumpsum needed today.', tags: ['Goal', 'Target Corpus'], level: 'Beginner' },
      { icon: '🏆', title: 'Mutual Fund Returns', desc: 'Calculate absolute and annualised returns on any mutual fund investment over a period.', tags: ['Mutual Fund', 'XIRR'], level: 'Intermediate' },
      { icon: '🔄', title: 'SIP vs Lumpsum', desc: 'Compare wealth created by monthly SIP versus a one-time lumpsum at the same rate.', tags: ['SIP', 'Lumpsum', 'Compare'], level: 'Beginner' },
    ],
  },
  {
    key: 'loans', cls: 'lp-cat--loans', icon: '🏦', name: 'Loan & EMI Calculators',
    desc: 'Home loan, car loan, personal loan & prepayment planning',
    cards: [
      { icon: '🏠', title: 'EMI Calculator', desc: 'Monthly EMI, total interest, and full amortization for home, car, or personal loans.', tags: ['Home Loan', 'Car Loan', 'Personal'], level: 'Beginner', pill: { cls: 'lp-pill--hot', label: '⭐ Most Used' } },
      { icon: '🏡', title: 'Home Loan Eligibility', desc: 'Maximum loan amount you qualify for based on salary and existing obligations.', tags: ['Eligibility', 'Housing'], level: 'Beginner' },
      { icon: '⚡', title: 'Loan Prepayment Savings', desc: 'See exactly how much interest you save by making a lump-sum prepayment.', tags: ['Prepayment', 'Savings'], level: 'Intermediate' },
      { icon: '💳', title: 'Credit Card Payoff', desc: 'Time & total cost to clear credit card debt. Eye-opening reality check.', tags: ['Credit Card', 'Debt'], level: 'Beginner' },
      { icon: '🔀', title: 'Balance Transfer Savings', desc: 'Savings from switching lender — see if a lower rate justifies the transfer cost.', tags: ['Balance Transfer', 'Refinance'], level: 'Intermediate' },
      { icon: '🎓', title: 'Education Loan', desc: 'Student loan EMI with moratorium period — see actual repayment after course completion.', tags: ['Education', 'Moratorium'], level: 'Beginner' },
      { icon: '📊', title: 'Loan Comparison', desc: 'Compare two loan offers side by side — EMI, total interest, and true cost of each.', tags: ['Compare', 'Loan Offers'], level: 'Intermediate' },
      { icon: '🚗', title: 'Car Loan Calculator', desc: 'EMI with down payment for new or used car — full on-road price breakdown.', tags: ['Car Loan', 'Vehicle'], level: 'Beginner' },
      { icon: '🧾', title: 'Personal Loan EMI', desc: 'Unsecured loan cost calculator with total interest burden analysis.', tags: ['Personal Loan', 'Unsecured'], level: 'Beginner' },
    ],
  },
  {
    key: 'tax', cls: 'lp-cat--tax', icon: '📋', name: 'Tax Calculators',
    desc: 'Income tax, capital gains, HRA & 80C planning — FY 2026–27',
    cards: [
      { icon: '🏛️', title: 'Income Tax Calculator', desc: 'New vs Old regime comparison with 80C, 80D, HRA for FY 2026–27.', tags: ['New Regime', 'Old Regime', '80C'], level: 'Intermediate', pill: { cls: 'lp-pill--fy', label: '📅 FY 2026–27' } },
      { icon: '📈', title: 'LTCG Tax Calculator', desc: 'Equity/fund LTCG tax with ₹1.25L annual exemption at 12.5% flat rate.', tags: ['LTCG', '12.5%', 'Equity'], level: 'Intermediate', pill: { cls: 'lp-pill--fy', label: 'Budget 2024' } },
      { icon: '📉', title: 'STCG Tax Calculator', desc: 'Tax on short-term capital gains from equity and debt at 20% flat rate.', tags: ['STCG', '20%', 'Equity'], level: 'Intermediate', pill: { cls: 'lp-pill--fy', label: 'Budget 2024' } },
      { icon: '🏠', title: 'HRA Exemption', desc: 'HRA exemption under Sec 10(13A) based on salary, rent paid, and city.', tags: ['HRA', 'Sec 10(13A)'], level: 'Intermediate' },
      { icon: '📙', title: 'PPF Calculator', desc: 'Tax-free PPF maturity at 7.1% p.a. with annual deposits over 15 years.', tags: ['PPF', 'EEE', '7.1%'], level: 'Beginner' },
      { icon: '📜', title: 'NSC Calculator', desc: 'National Savings Certificate maturity and interest with 80C deduction benefit.', tags: ['NSC', 'Post Office', '80C'], level: 'Beginner' },
      { icon: '🔎', title: 'TDS Estimator', desc: 'Estimate TDS on salary, FD interest, rent, and professional fees.', tags: ['TDS', 'Sec 194A'], level: 'Beginner' },
      { icon: '🏠', title: 'Home Loan Tax Benefits', desc: 'Calculate 80C (principal) and 24B (interest) deductions on your home loan EMI.', tags: ['80C', 'Sec 24B', 'Home Loan'], level: 'Beginner' },
      { icon: '🎁', title: 'Gift Tax Guide', desc: 'Check if a gift is taxable — exemption limits by relation, occasion, and amount.', tags: ['Gift Tax', 'Exemption'], level: 'Beginner' },
    ],
  },
  {
    key: 'insur', cls: 'lp-cat--insur', icon: '🛡️', name: 'Insurance Calculators',
    desc: 'Life cover, health premium, gratuity & critical illness estimators',
    cards: [
      { icon: '❤️', title: 'Life Cover Estimator', desc: 'How much term insurance you actually need based on income, loans & dependants.', tags: ['Term Plan', 'HLV'], level: 'Beginner', pill: { cls: 'lp-pill--star', label: '⭐ Essential' } },
      { icon: '🏆', title: 'Gratuity Calculator', desc: 'Statutory gratuity payable based on your years of service and last drawn salary.', tags: ['Gratuity', 'Employment'], level: 'Beginner' },
      { icon: '👧', title: 'Child Education Plan', desc: "SIP needed today to fund your child's education goal, adjusted for inflation.", tags: ['Education', 'Child Plan'], level: 'Intermediate' },
      { icon: '🔁', title: 'ULIP vs Term + MF', desc: 'Which gives better wealth? Compare ULIP vs buying term insurance + investing the rest.', tags: ['ULIP', 'Comparison'], level: 'Advanced' },
      { icon: '📝', title: 'Term Premium Estimator', desc: 'Approximate annual premium for your desired term insurance cover by age and amount.', tags: ['Term Plan', 'Premium'], level: 'Beginner' },
      { icon: '🏥', title: 'Critical Illness Cover', desc: 'Recommended CI cover amount based on your age, income, and annual medical costs.', tags: ['Critical Illness', 'CI Rider'], level: 'Intermediate' },
      { icon: '💊', title: 'Health Premium Estimator', desc: 'Estimate mediclaim premium for self or family floater based on age and cover amount.', tags: ['Mediclaim', 'Health'], level: 'Beginner' },
    ],
  },
  {
    key: 'retire', cls: 'lp-cat--retire', icon: '🏡', name: 'Retirement & Savings',
    desc: 'Corpus planner, NPS, EPF, SSY, SCSS & FIRE calculators',
    cards: [
      { icon: '🎯', title: 'Retirement Planner', desc: 'Goal-based retirement corpus calculation accounting for inflation and life expectancy.', tags: ['Retirement', 'Inflation', 'Goal-Based'], level: 'Intermediate', pill: { cls: 'lp-pill--star', label: '⭐ Top Pick' } },
      { icon: '🏛️', title: 'NPS Calculator', desc: 'NPS Tier-1 corpus and monthly pension from annuity at retirement age.', tags: ['NPS', 'Pension', 'Annuity'], level: 'Beginner' },
      { icon: '🏢', title: 'EPF Calculator', desc: 'Employee Provident Fund corpus at retirement with current balance and contributions.', tags: ['EPF / PF', 'Employee'], level: 'Beginner' },
      { icon: '🌸', title: 'Sukanya Samriddhi (SSY)', desc: "SSY maturity at 8.2% p.a. — the best government scheme for a girl child's future.", tags: ['SSY', '8.2%', 'EEE'], level: 'Beginner' },
      { icon: '🔥', title: 'FIRE Number Calculator', desc: 'Your Financial Independence number using the 4% withdrawal rule + years to achieve it.', tags: ['FIRE', '4% Rule', 'Early Retire'], level: 'Advanced', pill: { cls: 'lp-pill--new', label: '✨ New' } },
      { icon: '👴', title: 'Senior Citizen Savings (SCSS)', desc: 'SCSS interest and quarterly payouts at 8.2% p.a. for post-retirement income.', tags: ['SCSS', '8.2%', 'Post Office'], level: 'Beginner' },
      { icon: '🌊', title: 'Wealth Drawdown Planner', desc: 'How long does your retirement corpus last? Find a sustainable monthly withdrawal amount.', tags: ['Drawdown', 'Corpus', 'Withdraw'], level: 'Intermediate' },
      { icon: '🛡️', title: 'Annuity Calculator', desc: 'Estimate monthly pension income from an annuity plan based on corpus and annuity rate.', tags: ['Annuity', 'Pension'], level: 'Intermediate' },
      { icon: '🏦', title: 'Senior Citizen FD', desc: 'FD maturity for senior citizens with higher interest rates (typically 0.25–0.50% extra).', tags: ['Senior FD', 'Higher Rate'], level: 'Beginner' },
    ],
  },
  {
    key: 'personal', cls: 'lp-cat--personal', icon: '🎯', name: 'Personal Finance Tools',
    desc: 'Budgeting, goals, emergency fund, inflation & net worth tools',
    cards: [
      { icon: '🏆', title: 'Wealth Goal Tracker', desc: 'Monthly SIP amount needed to hit a specific wealth milestone in X years.', tags: ['Wealth Goal', 'Milestone'], level: 'Beginner', pill: { cls: 'lp-pill--hot', label: '🔥 Popular' } },
      { icon: '📊', title: 'Inflation Calculator', desc: 'What your money will actually be worth in 10–20 years after inflation erodes it.', tags: ['Inflation', 'Purchasing Power'], level: 'Beginner' },
      { icon: '🆘', title: 'Emergency Fund Calculator', desc: 'How large your emergency fund should be and how far you are from the target.', tags: ['Emergency Fund', 'Liquid'], level: 'Beginner' },
      { icon: '📋', title: 'Budget Planner (50/30/20)', desc: 'Apply the 50/30/20 rule — needs, wants, and savings at a glance.', tags: ['50/30/20', 'Budgeting'], level: 'Beginner' },
      { icon: '💎', title: 'Net Worth Calculator', desc: 'Assets minus liabilities — your true financial snapshot in seconds.', tags: ['Net Worth', 'Assets'], level: 'Beginner' },
      { icon: '🐖', title: 'Savings Rate Calculator', desc: 'Your savings rate determines your FIRE timeline — see the math behind the number.', tags: ['Savings Rate', 'FIRE'], level: 'Beginner' },
      { icon: '💼', title: 'Salary Hike Planner', desc: 'How an increment changes your take-home pay after income tax and PF deductions.', tags: ['Increment', 'Take-Home'], level: 'Beginner' },
      { icon: '🏧', title: 'Savings Goal', desc: 'How much to save monthly — or how long it takes — to reach a specific savings target.', tags: ['Savings', 'Target'], level: 'Beginner' },
      { icon: '📆', title: 'Daily Savings', desc: 'How saving a small amount daily compounds into a big goal over time.', tags: ['Daily Habit', 'Small Savings'], level: 'Beginner' },
    ],
  },
]

const filterTabs: { key: string; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'invest', label: '📈 Investments' },
  { key: 'loans', label: '🏦 Loans' },
  { key: 'tax', label: '📋 Tax' },
  { key: 'insur', label: '🛡️ Insurance' },
  { key: 'retire', label: '🏡 Retirement' },
  { key: 'personal', label: '🎯 Personal' },
]

const tickerItems = [
  { icon: '📊', text: 'SIP ', b1: '₹20K/mo @ 12%', arrow: ' → ', b2: '₹2 Cr in 20 yrs' },
  { icon: '🏠', text: 'Home Loan EMI ', b1: '₹50L, 8.5%, 20yr', arrow: ' → ', b2: '₹43,391/mo' },
  { icon: '🧾', text: 'Income Tax ', b1: '₹15L Income, New Regime', arrow: ' → ', b2: '₹1.5L Tax' },
  { icon: '🎯', text: 'Retirement ', b1: '₹50K/mo expenses today', arrow: ' → ', b2: '₹5.2 Cr corpus needed' },
  { icon: '📈', text: 'LTCG ', b1: '₹5L gains', arrow: ' → ', b2: '₹46,250 tax' },
  { icon: '💰', text: 'FIRE ', b1: '₹1L/mo expenses', arrow: ' → ', b2: '₹3 Cr FIRE number' },
]

function CalcCard({ card }: { card: Card }) {
  const href = calculatorHref(card.title)
  const levelCls = card.level === 'Intermediate' ? 'lvl-inter' : card.level === 'Advanced' ? 'lvl-adv' : ''
  const body = (
    <>
      <div className={`lp-card-level ${levelCls}`}>{card.level}</div>
      <div className="lp-card-body">
        <div className="lp-card-icon">{card.icon}</div>
        {card.pill && <div className={`lp-card-pill ${card.pill.cls}`}>{card.pill.label}</div>}
        <div className="lp-card-title">{card.title}</div>
        <div className="lp-card-desc">{card.desc}</div>
        <div className="lp-card-tags">{card.tags.map(t => <span key={t} className="lp-ctag">{t}</span>)}</div>
      </div>
      <div className="lp-card-foot">
        <span className="lp-card-cta">Calculate →</span>
      </div>
    </>
  )
  return isNativeCalculator(card.title)
    ? <Link to={href} className="lp-card">{body}</Link>
    : <a href={href} className="lp-card">{body}</a>
}

export function CalculatorsPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')
  const pageRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const q = search.trim().toLowerCase()
  const filteredCategories = useMemo(() => {
    return categories
      .filter(cat => activeFilter === 'all' || cat.key === activeFilter)
      .map(cat => ({
        ...cat,
        cards: cat.cards.filter(c => !q || c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.tags.some(t => t.toLowerCase().includes(q))),
      }))
      .filter(cat => cat.cards.length > 0)
  }, [activeFilter, q])

  const totalShown = filteredCategories.reduce((n, c) => n + c.cards.length, 0)

  return (
    <>
      {/* HERO */}
      <header className="lp-hero">
        <div className="lp-container">
          <div className="lp-hero-grid">
            <div>
              <div className="lp-hero-badge"><span className="lp-hero-badge-dot" />FY 2026–27 &middot; Free &middot; SEBI-aware Calculators</div>
              <h1>Every Calculator<br />for <span className="lp-hero-hl">Smart Indian</span><br />Investors</h1>
              <p className="lp-hero-sub">SIP, EMI, Tax, Insurance &amp; Retirement — 55+ financial tools designed to help you make better money decisions. No login. 100% free.</p>
              <div className="lp-hero-ctas">
                <button className="lp-btn-primary" onClick={() => pageRef.current?.scrollIntoView({ behavior: 'smooth' })}>🧮 Explore Calculators</button>
                <button className="lp-btn-secondary" onClick={() => searchRef.current?.focus()}>🔍 Search Tools</button>
              </div>
            </div>
            <div className="lp-hero-panel">
              <div className="lp-panel-title">Platform Highlights</div>
              <div className="lp-hstat-grid">
                <div className="lp-hstat lp-hstat-purple"><div className="lp-hstat-icon">🧮</div><div><span className="lp-hstat-num">55+</span><span className="lp-hstat-lbl">CALCULATORS</span></div></div>
                <div className="lp-hstat lp-hstat-green"><div className="lp-hstat-icon">🌟</div><div><span className="lp-hstat-num">100%</span><span className="lp-hstat-lbl">FREE FOREVER</span></div></div>
                <div className="lp-hstat lp-hstat-amber"><div className="lp-hstat-icon">📅</div><div><span className="lp-hstat-num">FY26</span><span className="lp-hstat-lbl">UPDATED</span></div></div>
                <div className="lp-hstat lp-hstat-blue"><div className="lp-hstat-icon">📊</div><div><span className="lp-hstat-num">6</span><span className="lp-hstat-lbl">CATEGORIES</span></div></div>
              </div>
              <div className="lp-minicharts">
                <div className="lp-minichart-card"><div className="lp-mc-icon" style={{ background: 'var(--p100)' }}>📈</div><div className="lp-mc-body"><div className="lp-mc-label">SIP Returns (20yr @ 12%)</div><div className="lp-mc-val">₹1.76 Cr</div></div><div className="lp-mc-badge" style={{ background: 'var(--g100)', color: 'var(--g700)' }}>+340%</div></div>
                <div className="lp-minichart-card"><div className="lp-mc-icon" style={{ background: '#fff7ed' }}>🏠</div><div className="lp-mc-body"><div className="lp-mc-label">Home Loan EMI (₹50L, 20yr)</div><div className="lp-mc-val">₹48,251</div></div><div className="lp-mc-badge" style={{ background: 'var(--p100)', color: 'var(--p700)' }}>8.5%</div></div>
                <div className="lp-minichart-card"><div className="lp-mc-icon" style={{ background: '#fffbeb' }}>🧾</div><div className="lp-mc-body"><div className="lp-mc-label">Tax Saved via 80C</div><div className="lp-mc-val">₹46,800</div></div><div className="lp-mc-badge" style={{ background: '#fff7ed', color: '#b45309' }}>New Regime</div></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* TICKER */}
      <div className="lp-ticker">
        <div className="lp-ticker-track">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="lp-ticker-item">
              {t.icon} {t.text}<b>{t.b1}</b>{t.arrow}<b>{t.b2}</b>
              <span className="lp-ticker-sep" style={{ marginLeft: '56px' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* INFOGRAPHIC STRIP */}
      <section className="lp-info-strip">
        <div className="lp-container">
          <div className="lp-info-strip-grid">
            <div className="lp-infotile purple"><div className="lp-it-emoji">📈</div><div className="lp-it-val">12–15%</div><div className="lp-it-label">Equity Long-Term CAGR</div><div className="lp-it-sub">Historical Nifty 50 average</div><div className="lp-it-bar"><div className="lp-it-bar-fill" style={{ width: '78%' }} /></div></div>
            <div className="lp-infotile green"><div className="lp-it-emoji">🏦</div><div className="lp-it-val">8.5%</div><div className="lp-it-label">Avg Home Loan Rate</div><div className="lp-it-sub">Current market range</div><div className="lp-it-bar"><div className="lp-it-bar-fill" style={{ width: '56%' }} /></div></div>
            <div className="lp-infotile amber"><div className="lp-it-emoji">🧾</div><div className="lp-it-val">₹7L</div><div className="lp-it-label">New Regime Zero Tax</div><div className="lp-it-sub">Standard deduction included</div><div className="lp-it-bar"><div className="lp-it-bar-fill" style={{ width: '47%' }} /></div></div>
            <div className="lp-infotile blue"><div className="lp-it-emoji">🛡️</div><div className="lp-it-val">10–15×</div><div className="lp-it-label">Life Cover Thumb Rule</div><div className="lp-it-sub">Annual income × multiplier</div><div className="lp-it-bar"><div className="lp-it-bar-fill" style={{ width: '65%' }} /></div></div>
          </div>
        </div>
      </section>

      {/* STICKY SEARCH + FILTER NAV */}
      <nav className="lp-sticky-nav">
        <div className="lp-nav-inner">
          <div className="lp-search-wrap">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            <input ref={searchRef} className="lp-search-input" type="search" placeholder="Search calculators…" value={search} onChange={e => setSearch(e.target.value)} autoComplete="off" />
          </div>
          <div className="lp-filter-scroll">
            {filterTabs.map(t => (
              <button key={t.key} className={`lp-ftab${activeFilter === t.key ? ' on' : ''}`} onClick={() => setActiveFilter(t.key)}>{t.label}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* CALCULATORS */}
      <main className="lp-page" ref={pageRef}>
        {filteredCategories.map(cat => (
          <section key={cat.key} className={`lp-cat-section ${cat.cls}`}>
            <div className="lp-cat-header">
              <div className="lp-cat-icon-wrap">{cat.icon}</div>
              <div className="lp-cat-text">
                <div className="lp-cat-name">{cat.name}</div>
                <div className="lp-cat-desc">{cat.desc}</div>
              </div>
              <span className="lp-cat-badge">{cat.cards.length} Tools</span>
            </div>
            <div className="lp-cards-grid">
              {cat.cards.map(c => <CalcCard key={c.title} card={c} />)}
            </div>
          </section>
        ))}

        {totalShown === 0 && (
          <div className="lp-empty">
            <div className="lp-empty-em">🔍</div>
            <div className="lp-empty-t">No calculators found</div>
            <div className="lp-empty-s">Try a different search term or clear your filters</div>
          </div>
        )}
      </main>

      {/* DISCLAIMER */}
      <section className="lp-disclaimer-section">
        <div className="lp-disc-inner">
          <div className="lp-disc-badge"><span className="lp-disc-badge-dot" />IMPORTANT DISCLAIMER</div>
          <div className="lp-disc-heading">Read Before You <span>Invest or Decide</span></div>
          <div className="lp-disc-sub">All calculators on this platform are for educational and illustrative purposes only. Please read the details below carefully.</div>

          <div className="lp-disc-cards">
            <div className="lp-disc-card"><span className="lp-disc-card-icon">📊</span><div className="lp-disc-card-title">Illustrative Projections Only</div><div className="lp-disc-card-text">All returns, maturity values, and corpus estimates shown are hypothetical projections based on assumed rates. Actual results will vary based on market conditions, fund performance, and individual circumstances.</div></div>
            <div className="lp-disc-card"><span className="lp-disc-card-icon">🏛️</span><div className="lp-disc-card-title">Not SEBI-Registered Advice</div><div className="lp-disc-card-text">FairStockBrokers is not a SEBI-registered investment advisor. Nothing on this platform constitutes personalised financial, tax, or legal advice. Always consult a qualified, registered professional before making investment decisions.</div></div>
            <div className="lp-disc-card"><span className="lp-disc-card-icon">📉</span><div className="lp-disc-card-title">Market Risk Applies</div><div className="lp-disc-card-text">Mutual fund investments, equity, and market-linked instruments are subject to market risk. Past performance is not indicative of future results. Please read all scheme-related documents carefully before investing.</div></div>
            <div className="lp-disc-card"><span className="lp-disc-card-icon">🧾</span><div className="lp-disc-card-title">Tax Laws Change</div><div className="lp-disc-card-text">Tax calculations are based on FY 2026–27 rules as publicly available. Tax laws are subject to amendments by the government. Verify all tax-related figures with a chartered accountant before filing or planning.</div></div>
            <div className="lp-disc-card"><span className="lp-disc-card-icon">🔢</span><div className="lp-disc-card-title">Calculator Accuracy</div><div className="lp-disc-card-text">While we strive for accuracy, calculator results may not account for all real-world variables — processing fees, exit loads, inflation adjustments, or product-specific terms. Use as a starting point, not a final number.</div></div>
            <div className="lp-disc-card"><span className="lp-disc-card-icon">🔒</span><div className="lp-disc-card-title">No Data Stored</div><div className="lp-disc-card-text">All calculations happen locally in your browser. We do not collect, store, or transmit any personal financial data you enter in these calculators. Your inputs stay private.</div></div>
          </div>

          <div className="lp-disc-full">
            <span className="lp-disc-full-icon">⚠️</span>
            <div className="lp-disc-full-text">
              <strong>Full Disclaimer:</strong> The information, tools, and calculators provided on FairStockBrokers are solely for general informational and educational purposes. They do not constitute an offer to buy or sell any security, financial product, or instrument. FairStockBrokers makes no representations or warranties — express or implied — about the completeness, accuracy, reliability, or suitability of any information. Any reliance you place on such information is strictly at your own risk. FairStockBrokers will not be liable for any loss or damage, including indirect or consequential loss, arising from use of this platform. <strong>Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Returns are not guaranteed.</strong>
            </div>
          </div>

          <div className="lp-disc-meta">
            <span className="lp-disc-tag"><span className="lp-disc-tag-dot" style={{ background: '#34d399' }} />FY 2026–27 Updated</span>
            <span className="lp-disc-tag"><span className="lp-disc-tag-dot" style={{ background: '#60a5fa' }} />No Login Required</span>
            <span className="lp-disc-tag"><span className="lp-disc-tag-dot" style={{ background: '#a78bfa' }} />Browser-Only Calculations</span>
            <span className="lp-disc-tag"><span className="lp-disc-tag-dot" style={{ background: '#fbbf24' }} />Not Financial Advice</span>
            <span className="lp-disc-tag"><span className="lp-disc-tag-dot" style={{ background: '#f87171' }} />Market Risk Applies</span>
            <span className="lp-disc-tag"><span className="lp-disc-tag-dot" style={{ background: '#34d399' }} />Educational Use Only</span>
          </div>
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
