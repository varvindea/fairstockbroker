import { useState } from 'react'
import { Link } from 'react-router-dom'
import { brokerReviewHref, calculatorHref, sourcePageHref } from '../data/calculatorLinks'

type AccKey = 'ipo' | 'brokers' | 'calc' | 'learn' | 'pf' | 'demat' | 'market' | null

export function Header() {
  const [mobOpen, setMobOpen] = useState(false)
  const [accOpen, setAccOpen] = useState<AccKey>(null)

  const toggleAcc = (key: AccKey) => setAccOpen(prev => prev === key ? null : key)
  const closeNav = () => { setMobOpen(false); setAccOpen(null) }

  return (
    <>
      <div className="nav-wrap">
        {/* Row 1 */}
        <nav className="nav">
          <Link to="/" className="nav-logo">
            <div className="nav-logo-mark">F</div>
            <div className="nav-logo-text">Fair<b>StockBrokers</b></div>
          </Link>
          <div className="nav-actions">
            <Link to="/pages" className="btn-primary-sm">All Pages</Link>
            <Link to="/contact" className="btn-primary-sm">Open Free Demat</Link>
            <button
              className={`nav-burger${mobOpen ? ' open' : ''}`}
              aria-label="Menu"
              onClick={() => setMobOpen(o => !o)}
            >
              <span className="nb-line" />
              <span className="nb-line" />
              <span className="nb-line" />
            </button>
          </div>
        </nav>

        {/* Row 2: Mega menu bar */}
        <div className="nav-menu-bar">

          {/* IPO Tracker */}
          <div className="nmi">
            <button className="nmi-trigger">📈 IPO Tracker <span className="chevron">▾</span></button>
            <div className="mega-drop">
              <div className="mega-inner cols-4">
                <div className="mega-col">
                  <div className="mega-col-head">📋 IPO Lists</div>
                  <Link to="/ipo" className="mega-link"><span className="ml-ico">🌐</span> All IPOs</Link>
                  <Link to="/ipo" className="mega-link"><span className="ml-ico">🏢</span> Mainboard IPO</Link>
                  <Link to="/ipo" className="mega-link"><span className="ml-ico">🏪</span> SME IPO</Link>
                  <Link to="/ipo" className="mega-link"><span className="ml-ico">📄</span> NCD</Link>
                  <Link to="/ipo" className="mega-link"><span className="ml-ico">🔄</span> Buyback</Link>
                </div>
                <div className="mega-col">
                  <div className="mega-col-head">📊 Live Data</div>
                  <Link to="/ipo" className="mega-link"><span className="ml-ico">🔴</span> GMP (Grey Market) <span className="ml-badge hot">LIVE</span></Link>
                  <Link to="/ipo" className="mega-link"><span className="ml-ico">📅</span> IPO Calendar</Link>
                  <Link to="/ipo" className="mega-link"><span className="ml-ico">🎯</span> Allotment Status</Link>
                  <Link to="/ipo" className="mega-link"><span className="ml-ico">🚀</span> Listing Gains</Link>
                </div>
                <div className="mega-col">
                  <div className="mega-col-head">📚 Learn IPO</div>
                  <Link to="/guides/drhp-guide" className="mega-link"><span className="ml-ico">💡</span> IPO Glossary</Link>
                  <Link to="/guides/drhp-guide" className="mega-link"><span className="ml-ico">🧮</span> How to Apply via UPI</Link>
                  <Link to="/guides/drhp-guide" className="mega-link"><span className="ml-ico">📖</span> ASBA Process Guide</Link>
                  <Link to="/guides/drhp-guide" className="mega-link"><span className="ml-ico">🔍</span> How to Read DRHP</Link>
                </div>
                <div className="mega-col">
                  <div className="mega-feat-card">
                    <div className="mfc-tag">🔴 Live Now</div>
                    <div className="mfc-title">Track All Open IPOs in Real-Time</div>
                    <div className="mfc-desc">GMP, subscription data, allotment status and listing gains — updated daily for 200+ IPOs/year.</div>
                    <Link to="/ipo" className="mfc-btn">View IPO Tracker →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="nmi-divider" />

          {/* Top 25 Brokers */}
          <div className="nmi">
            <button className="nmi-trigger">🏆 Top 25 Brokers <span className="chevron">▾</span></button>
            <div className="mega-drop">
              <div className="mega-inner cols-4">
                <div className="mega-col">
                  <div className="mega-col-head">📋 Browse</div>
                  <Link to="/brokers" className="mega-link"><span className="ml-ico">🌐</span> All Broker List <span className="ml-badge">Top 25</span></Link>
                </div>
                <div className="mega-col">
                  <div className="mega-col-head">⚡ Discount Brokers</div>
                  <a href={brokerReviewHref('Zerodha')} className="mega-link"><span className="ml-ico" style={{background:'linear-gradient(135deg,#dcfce7,#bbf7d0)',fontSize:'12px',fontWeight:800,color:'#166534'}}>Z</span> Zerodha <span className="ml-badge hot">TOP</span></a>
                  <a href={brokerReviewHref('Groww')} className="mega-link"><span className="ml-ico" style={{background:'linear-gradient(135deg,#ede9fe,#ddd6fe)',fontSize:'12px',fontWeight:800,color:'#5b21b6'}}>G</span> Groww</a>
                  <a href={brokerReviewHref('AngelOne')} className="mega-link"><span className="ml-ico" style={{background:'linear-gradient(135deg,#fef3c7,#fde68a)',fontSize:'12px',fontWeight:800,color:'#92400e'}}>A</span> AngelOne</a>
                  <a href={brokerReviewHref('Upstox')} className="mega-link"><span className="ml-ico" style={{background:'linear-gradient(135deg,#e0f2fe,#bae6fd)',fontSize:'12px',fontWeight:800,color:'#0c4a6e'}}>U</span> Upstox</a>
                  <a href={brokerReviewHref('Dhan')} className="mega-link"><span className="ml-ico" style={{background:'linear-gradient(135deg,#fce7f3,#fbcfe8)',fontSize:'12px',fontWeight:800,color:'#831843'}}>D</span> Dhan</a>
                </div>
                <div className="mega-col">
                  <div className="mega-col-head">🏦 Full Service Brokers</div>
                  <a href={brokerReviewHref('ICICI Direct')} className="mega-link"><span className="ml-ico" style={{background:'linear-gradient(135deg,#fef3c7,#fde68a)',fontSize:'12px',fontWeight:800,color:'#b45309'}}>IC</span> ICICI Direct</a>
                  <a href={brokerReviewHref('HDFC Securities')} className="mega-link"><span className="ml-ico" style={{background:'linear-gradient(135deg,#dcfce7,#bbf7d0)',fontSize:'12px',fontWeight:800,color:'#166534'}}>HD</span> HDFC Securities</a>
                  <a href={brokerReviewHref('Kotak Securities')} className="mega-link"><span className="ml-ico" style={{background:'linear-gradient(135deg,#e0f2fe,#bae6fd)',fontSize:'12px',fontWeight:800,color:'#0c4a6e'}}>KS</span> Kotak Securities</a>
                  <a href={brokerReviewHref('Motilal Oswal')} className="mega-link"><span className="ml-ico" style={{background:'linear-gradient(135deg,#fce7f3,#fbcfe8)',fontSize:'12px',fontWeight:800,color:'#831843'}}>MO</span> Motilal Oswal</a>
                  <Link to="/brokers" className="mega-link" style={{marginTop:'6px'}}><span className="ml-ico">➕</span><span style={{color:'var(--p600)',fontWeight:700}}>More Brokers →</span></Link>
                </div>
                <div className="mega-col">
                  <div className="mega-feat-card">
                    <div className="mfc-tag">🏆 Expert Reviews</div>
                    <div className="mfc-title">Find Your Perfect Broker</div>
                    <div className="mfc-desc">Unbiased reviews across charges, app quality, support & features for 25+ Indian brokers.</div>
                    <Link to="/brokers" className="mfc-btn">Compare Brokers →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="nmi-divider" />

          {/* Calculators */}
          <div className="nmi">
            <button className="nmi-trigger">🧮 Calculators <span className="chevron">▾</span></button>
            <div className="mega-drop">
              <div className="mega-inner cols-4">
                <div className="mega-col">
                  <div className="mega-col-head">📈 Investment</div>
                  <Link to="/calculators" className="mega-link"><span className="ml-ico">🌐</span> All Calculators</Link>
                  <a href={calculatorHref('SIP Calculator')} className="mega-link"><span className="ml-ico">📈</span> SIP Calculator</a>
                  <a href={calculatorHref('Step Up SIP')} className="mega-link"><span className="ml-ico">⬆️</span> Step Up SIP</a>
                  <a href={calculatorHref('Lumpsum')} className="mega-link"><span className="ml-ico">💰</span> Lumpsum</a>
                  <a href={calculatorHref('SWP Calculator')} className="mega-link"><span className="ml-ico">💸</span> SWP Calculator</a>
                </div>
                <div className="mega-col">
                  <div className="mega-col-head">🏦 Fixed Income</div>
                  <a href={calculatorHref('FD Calculator')} className="mega-link"><span className="ml-ico">🏛️</span> FD Calculator</a>
                  <a href={calculatorHref('RD Calculator')} className="mega-link"><span className="ml-ico">📅</span> RD Calculator</a>
                  <a href={calculatorHref('EMI Calculator')} className="mega-link"><span className="ml-ico">🏠</span> EMI Calculator</a>
                  <a href={calculatorHref('PPF Calculator')} className="mega-link"><span className="ml-ico">🏛️</span> PPF Calculator</a>
                  <a href={calculatorHref('NPS Calculator')} className="mega-link"><span className="ml-ico">👶</span> NPS Calculator</a>
                </div>
                <div className="mega-col">
                  <div className="mega-col-head">📊 Analytics</div>
                  <a href={calculatorHref('CAGR Calculator')} className="mega-link"><span className="ml-ico">📊</span> CAGR Calculator</a>
                  <a href={calculatorHref('Compound Interest')} className="mega-link"><span className="ml-ico">♾️</span> Compound Interest</a>
                  <a href={calculatorHref('Rule of 72')} className="mega-link"><span className="ml-ico">72️⃣</span> Rule of 72</a>
                  <a href={calculatorHref('Goal Planner')} className="mega-link"><span className="ml-ico">🎯</span> Goal Planner</a>
                  <Link to="/calculators" className="mega-link" style={{marginTop:'6px'}}><span className="ml-ico">➕</span><span style={{color:'var(--p600)',fontWeight:700}}>More Calculators →</span></Link>
                </div>
                <div className="mega-col">
                  <div className="mega-feat-card">
                    <div className="mfc-tag">🧮 Free Tools</div>
                    <div className="mfc-title">30+ Financial Calculators</div>
                    <div className="mfc-desc">SIP, EMI, CAGR, Goal Planner and more — built for Indian investors, zero sign-up.</div>
                    <Link to="/calculators" className="mfc-btn">Open Calculator →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="nmi-divider" />

          {/* Learn */}
          <div className="nmi">
            <button className="nmi-trigger">📚 Learn <span className="chevron">▾</span></button>
            <div className="mega-drop">
              <div className="mega-inner cols-4">
                <div className="mega-col">
                  <div className="mega-col-head">📖 Market Essentials</div>
                  <Link to="/pages" className="mega-link"><span className="ml-ico">🌐</span> All Topics</Link>
                  <Link to="/pages" className="mega-link"><span className="ml-ico">📊</span> Fundamental Analysis</Link>
                  <Link to="/pages" className="mega-link"><span className="ml-ico">📉</span> Technical Analysis</Link>
                  <Link to="/pages" className="mega-link"><span className="ml-ico">⚡</span> Basic of F&amp;O</Link>
                  <Link to="/pages" className="mega-link"><span className="ml-ico">🎯</span> Option Strategies</Link>
                  <Link to="/pages" className="mega-link"><span className="ml-ico">🔬</span> Advanced Options</Link>
                </div>
                <div className="mega-col">
                  <div className="mega-col-head">🌍 Specialised</div>
                  <Link to="/pages" className="mega-link"><span className="ml-ico">🌾</span> Commodity Trading</Link>
                  <Link to="/pages" className="mega-link"><span className="ml-ico">🧠</span> Risk Management</Link>
                  <Link to="/guides/drhp-guide" className="mega-link"><span className="ml-ico">🚀</span> Investing in IPO</Link>
                </div>
                <div className="mega-col">
                  <div className="mega-col-head">💡 Wealth &amp; Finance</div>
                  <Link to="/guides/mutual-fund-learning" className="mega-link"><span className="ml-ico">🏦</span> PF — Mutual Funds</Link>
                  <Link to="/guides/health-insurance-guide" className="mega-link"><span className="ml-ico">🛡️</span> PF — Insurance</Link>
                  <Link to="/pages" className="mega-link"><span className="ml-ico">⭐</span> Must Read</Link>
                  <Link to="/pages" className="mega-link"><span className="ml-ico">📗</span> Market Books</Link>
                </div>
                <div className="mega-col">
                  <div className="mega-feat-card">
                    <div className="mfc-tag">📚 120+ Lessons</div>
                    <div className="mfc-title">From Beginner to Advanced</div>
                    <div className="mfc-desc">Structured courses across 12 topics — free, no login required, for all investor levels.</div>
                    <Link to="/pages" className="mfc-btn">Start Learning →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="nmi-divider" />

          {/* Personal Finance */}
          <div className="nmi">
            <button className="nmi-trigger">🌿 Personal Finance <span className="chevron">▾</span></button>
            <div className="mega-drop">
              <div className="mega-inner cols-2">
                <div className="mega-col">
                  <div className="mega-col-head">🌿 Personal Finance</div>
                  <Link to="/guides/term-plan-guide" className="mega-link"><span className="ml-ico">🛡️</span> Term Plan</Link>
                  <Link to="/guides/health-insurance-guide" className="mega-link"><span className="ml-ico">🏥</span> Health Insurance</Link>
                  <Link to="/guides/mutual-fund-learning" className="mega-link"><span className="ml-ico">📈</span> Mutual Fund</Link>
                  <Link to="/guides/goal-setting-guide" className="mega-link"><span className="ml-ico">🎯</span> Goal Setting</Link>
                </div>
                <div className="mega-col">
                  <div className="mega-feat-card">
                    <div className="mfc-tag">🌿 Plan Smarter</div>
                    <div className="mfc-title">Secure Your Financial Future</div>
                    <div className="mfc-desc">From term insurance to mutual funds — plan, protect and grow your wealth in one place.</div>
                    <Link to="/guides/personal-finance" className="mfc-btn">Explore All Tools →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="nmi-divider" />

          {/* Demat Account */}
          <div className="nmi">
            <button className="nmi-trigger">🏦 Demat Account <span className="chevron">▾</span></button>
            <div className="mega-drop">
              <div className="mega-inner cols-2">
                <div className="mega-col">
                  <div className="mega-col-head">👤 Account Types</div>
                  <Link to="/contact" className="mega-link"><span className="ml-ico">👤</span> Individual <span className="ml-badge new">Most Popular</span></Link>
                  <a href={sourcePageHref('Demat Opening Form/Final - Demat account opening Form.html')} className="mega-link"><span className="ml-ico">👨‍👩‍👧</span> HUF</a>
                  <a href={sourcePageHref('Demat Opening Form/Final - Demat account opening Form.html')} className="mega-link"><span className="ml-ico">🌏</span> NRI</a>
                  <a href={sourcePageHref('Demat Opening Form/Final - Demat account opening Form.html')} className="mega-link"><span className="ml-ico">🤝</span> LLP</a>
                  <a href={sourcePageHref('Demat Opening Form/Final - Demat account opening Form.html')} className="mega-link"><span className="ml-ico">🏢</span> Partnership Firm</a>
                  <a href={sourcePageHref('Demat Opening Form/Final - Demat account opening Form.html')} className="mega-link"><span className="ml-ico">🏦</span> Corporate</a>
                </div>
                <div className="mega-col">
                  <div className="mega-feat-card">
                    <div className="mfc-tag">🏦 Open Today</div>
                    <div className="mfc-title">Free Demat Account in 10 Minutes</div>
                    <div className="mfc-desc">Compare account types, understand charges, and open your ideal account — 100% online.</div>
                    <Link to="/contact" className="mfc-btn">Open Free Demat →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="nmi-divider" />

          {/* Market Data */}
          <div className="nmi">
            <button className="nmi-trigger">📊 Market Data <span className="chevron">▾</span></button>
            <div className="mega-drop">
              <div className="mega-inner cols-2">
                <div className="mega-col">
                  <div className="mega-col-head">📡 Live Market</div>
                  <a href={sourcePageHref('Tool/nifty_trend_finder_v8_live.html')} className="mega-link"><span className="ml-ico">🔊</span> Volume Shocker <span className="ml-badge hot">LIVE</span></a>
                  <a href={sourcePageHref('Tool/nifty_trend_finder_v8_live.html')} className="mega-link"><span className="ml-ico">🌅</span> ORB (Opening Range)</a>
                  <a href={sourcePageHref('Tool/nifty_trend_finder_v8_live.html')} className="mega-link"><span className="ml-ico">📉</span> Index Trend</a>
                  <a href={sourcePageHref('Tool/nifty_trend_finder_v8_live.html')} className="mega-link"><span className="ml-ico">📋</span> Stock Reports</a>
                  <a href={sourcePageHref('Tool/nifty_trend_finder_v8_live.html')} className="mega-link"><span className="ml-ico">📃</span> Stock List</a>
                </div>
                <div className="mega-col">
                  <div className="mega-feat-card">
                    <div className="mfc-tag">📊 Data Hub</div>
                    <div className="mfc-title">Live Market Pulse</div>
                    <div className="mfc-desc">Volume shockers, ORB setups, index trends and curated stock reports — updated daily.</div>
                    <a href={sourcePageHref('Tool/nifty_trend_finder_v8_live.html')} className="mfc-btn">View Market Data →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`mob-nav${mobOpen ? ' open' : ''}`}>
        <button className={`mob-acc-trigger${accOpen==='ipo' ? ' open' : ''}`} onClick={() => toggleAcc('ipo')}>
          <span className="mat-left"><span>📈</span> IPO Tracker</span>
          <span className="mat-chevron">▾</span>
        </button>
        <div className={`mob-acc-panel${accOpen==='ipo' ? ' open' : ''}`}>
          <Link to="/ipo" onClick={closeNav}>🌐 All IPOs</Link>
          <Link to="/ipo" onClick={closeNav}>🏢 Mainboard IPO</Link>
          <Link to="/ipo" onClick={closeNav}>🏪 SME IPO</Link>
          <Link to="/ipo" onClick={closeNav}>🔴 GMP (Live)</Link>
          <Link to="/guides/drhp-guide" onClick={closeNav}>💡 IPO Glossary</Link>
        </div>

        <div className="mob-nav-divider" />

        <button className={`mob-acc-trigger${accOpen==='brokers' ? ' open' : ''}`} onClick={() => toggleAcc('brokers')}>
          <span className="mat-left"><span>🏆</span> Top 25 Brokers</span>
          <span className="mat-chevron">▾</span>
        </button>
        <div className={`mob-acc-panel${accOpen==='brokers' ? ' open' : ''}`}>
          <Link to="/brokers" onClick={closeNav}>🌐 All Broker List</Link>
          <div className="mob-sub-head">Discount Brokers</div>
          <a href={brokerReviewHref('Zerodha')} onClick={closeNav}>Zerodha</a>
          <a href={brokerReviewHref('Groww')} onClick={closeNav}>Groww</a>
          <a href={brokerReviewHref('AngelOne')} onClick={closeNav}>AngelOne</a>
          <a href={brokerReviewHref('Upstox')} onClick={closeNav}>Upstox</a>
          <div className="mob-sub-head">Full Service Brokers</div>
          <a href={brokerReviewHref('ICICI Direct')} onClick={closeNav}>ICICI Direct</a>
          <a href={brokerReviewHref('HDFC Securities')} onClick={closeNav}>HDFC Securities</a>
        </div>

        <div className="mob-nav-divider" />

        <button className={`mob-acc-trigger${accOpen==='calc' ? ' open' : ''}`} onClick={() => toggleAcc('calc')}>
          <span className="mat-left"><span>🧮</span> Calculators</span>
          <span className="mat-chevron">▾</span>
        </button>
        <div className={`mob-acc-panel${accOpen==='calc' ? ' open' : ''}`}>
          <Link to="/calculators" onClick={closeNav}>🌐 All Calculators</Link>
          <a href={calculatorHref('SIP Calculator')} onClick={closeNav}>📈 SIP Calculator</a>
          <a href={calculatorHref('Step Up SIP')} onClick={closeNav}>⬆️ Step Up SIP</a>
          <a href={calculatorHref('Lumpsum')} onClick={closeNav}>💰 Lumpsum</a>
          <a href={calculatorHref('FD Calculator')} onClick={closeNav}>🏛️ FD Calculator</a>
          <a href={calculatorHref('CAGR Calculator')} onClick={closeNav}>📊 CAGR</a>
          <a href={calculatorHref('Compound Interest')} onClick={closeNav}>♾️ Compound Interest</a>
        </div>

        <div className="mob-nav-divider" />

        <button className={`mob-acc-trigger${accOpen==='learn' ? ' open' : ''}`} onClick={() => toggleAcc('learn')}>
          <span className="mat-left"><span>📚</span> Learn</span>
          <span className="mat-chevron">▾</span>
        </button>
        <div className={`mob-acc-panel${accOpen==='learn' ? ' open' : ''}`}>
          <Link to="/pages" onClick={closeNav}>🌐 All Topics</Link>
          <Link to="/pages" onClick={closeNav}>📊 Fundamental Analysis</Link>
          <Link to="/pages" onClick={closeNav}>📉 Technical Analysis</Link>
          <Link to="/pages" onClick={closeNav}>⚡ Basic of F&amp;O</Link>
          <Link to="/pages" onClick={closeNav}>🎯 Option Strategies</Link>
        </div>

        <div className="mob-nav-divider" />

        <button className={`mob-acc-trigger${accOpen==='pf' ? ' open' : ''}`} onClick={() => toggleAcc('pf')}>
          <span className="mat-left"><span>🌿</span> Personal Finance</span>
          <span className="mat-chevron">▾</span>
        </button>
        <div className={`mob-acc-panel${accOpen==='pf' ? ' open' : ''}`}>
          <Link to="/guides/term-plan-guide" onClick={closeNav}>🛡️ Term Plan</Link>
          <Link to="/guides/health-insurance-guide" onClick={closeNav}>🏥 Health Insurance</Link>
          <Link to="/guides/mutual-fund-learning" onClick={closeNav}>📈 Mutual Fund</Link>
          <Link to="/guides/goal-setting-guide" onClick={closeNav}>🎯 Goal Setting</Link>
        </div>

        <div className="mob-nav-divider" />

        <button className={`mob-acc-trigger${accOpen==='demat' ? ' open' : ''}`} onClick={() => toggleAcc('demat')}>
          <span className="mat-left"><span>🏦</span> Demat Account</span>
          <span className="mat-chevron">▾</span>
        </button>
        <div className={`mob-acc-panel${accOpen==='demat' ? ' open' : ''}`}>
          <Link to="/contact" onClick={closeNav}>👤 Individual</Link>
          <a href={sourcePageHref('Demat Opening Form/Final - Demat account opening Form.html')} onClick={closeNav}>🌏 NRI</a>
          <a href={sourcePageHref('Demat Opening Form/Final - Demat account opening Form.html')} onClick={closeNav}>🤝 LLP</a>
          <a href={sourcePageHref('Demat Opening Form/Final - Demat account opening Form.html')} onClick={closeNav}>🏦 Corporate</a>
        </div>

        <div className="mob-nav-divider" />

        <div className="mob-nav-ctas">
          <a href="https://wa.me" className="btn-wa-mob" onClick={closeNav}>💬 Join WhatsApp Community</a>
          <Link to="/contact" className="btn-p-mob" onClick={closeNav}>Open Free Demat Account →</Link>
        </div>
      </div>
    </>
  )
}

