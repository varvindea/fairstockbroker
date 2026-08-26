import { Link } from 'react-router-dom'

export function AboutPage() {
  return (
    <>
      <section className="page-hero-sec">
        <div className="page-hero-inner">
          <div className="page-eyebrow">About Us</div>
          <h1 className="page-h1">India's Most Trusted<br />Financial Information Platform</h1>
          <p className="page-sub">FairStockBrokers was built for India's growing investor community — providing unbiased broker reviews, real-time IPO data, financial calculators, and structured investment education, completely free.</p>
        </div>
      </section>

      <div className="proof-bar">
        <div className="proof-inner">
          <div className="proof-item"><span className="proof-icon">👥</span><span className="proof-text"><span>40,000+</span> Investors Educated</span></div>
          <div className="proof-sep" />
          <div className="proof-item"><span className="proof-icon">🏆</span><span className="proof-text"><span>25+</span> Brokers Reviewed</span></div>
          <div className="proof-sep" />
          <div className="proof-item"><span className="proof-icon">📊</span><span className="proof-text"><span>200+</span> IPOs Tracked / Year</span></div>
          <div className="proof-sep" />
          <div className="proof-item"><span className="proof-icon">⭐</span><span className="proof-text">Rated <span>4.8/5</span></span></div>
        </div>
      </div>

      <section className="sec" style={{ background: 'var(--white)' }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">Our Mission</div>
            <h2 className="sec-h2">Empowering Every Indian Investor</h2>
            <p className="sec-sub">We believe every Indian investor deserves access to clear, unbiased financial information — not just the privileged few.</p>
          </div>
          <div className="feat-grid">
            <div className="fg-card fc-purple"><div className="fg-ico">🎯</div><div className="fg-title">Unbiased Information</div><div className="fg-desc">We never accept paid promotions for broker rankings. Our reviews are based on verified data, actual user experiences, and transparent methodology.</div><div className="fg-tag">100% Unbiased</div></div>
            <div className="fg-card fc-green"><div className="fg-ico">📚</div><div className="fg-title">Free Education for All</div><div className="fg-desc">All 120+ learning lessons, calculators, and IPO data are completely free — no subscription, no sign-up, no hidden fees.</div><div className="fg-tag">Always Free</div></div>
            <div className="fg-card fc-amber"><div className="fg-ico">🔍</div><div className="fg-title">Research-Backed</div><div className="fg-desc">Every broker review, IPO analysis, and calculator is verified against actual data from SEBI, NSE, and BSE — kept updated monthly.</div><div className="fg-tag">Data-Verified</div></div>
            <div className="fg-card fc-blue"><div className="fg-ico">🌐</div><div className="fg-title">Comprehensive Coverage</div><div className="fg-desc">From discount brokers to full-service firms, from mainboard to SME IPOs, from SIP to tax planning — everything in one platform.</div><div className="fg-tag">All-in-One</div></div>
            <div className="fg-card fc-pink"><div className="fg-ico">💬</div><div className="fg-title">Community-First</div><div className="fg-desc">Our WhatsApp community has 40,000+ investors sharing real insights, alerts, and questions — join the conversation for free.</div><div className="fg-tag">Active Community</div></div>
            <div className="fg-card fc-teal"><div className="fg-ico">🛡️</div><div className="fg-title">Investor Protection</div><div className="fg-desc">We help you avoid common scams, identify red flags in IPOs, and make informed decisions — not impulsive ones driven by hype.</div><div className="fg-tag">Safe Investing</div></div>
          </div>
        </div>
      </section>

      <section className="wealth-sec">
        <div className="wealth-inner">
          <div className="wealth-head">
            <div className="sec-eyebrow">Platform Impact</div>
            <h2 className="sec-h2">Numbers That Matter</h2>
            <p className="sec-sub">Real milestones from a platform built for India's investing community.</p>
          </div>
          <div className="wealth-grid">
            <div className="wealth-card"><div className="wc-ico">👥</div><div className="wc-num">40<sup>K+</sup></div><div className="wc-lbl">Investors Educated</div></div>
            <div className="wealth-card"><div className="wc-ico">📈</div><div className="wc-num">324</div><div className="wc-lbl">IPOs Tracked in 2024</div></div>
            <div className="wealth-card"><div className="wc-ico">🏆</div><div className="wc-num">25<sup>+</sup></div><div className="wc-lbl">Brokers Reviewed</div></div>
            <div className="wealth-card"><div className="wc-ico">🧮</div><div className="wc-num">30<sup>+</sup></div><div className="wc-lbl">Free Calculators</div></div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--white)' }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-eyebrow">How it Works</div>
            <h2 className="sec-h2">Start Your Journey</h2>
            <p className="sec-sub">Everything you need to go from curious beginner to confident investor.</p>
          </div>
          <div className="hiw-steps">
            <div className="hiw-step"><div className="step-num sn1">1</div><div className="step-title">Learn the Basics</div><div className="step-desc">Start with our free structured courses — stock market basics, SIP, IPO fundamentals, and more.</div></div>
            <div className="hiw-step"><div className="step-num sn2">2</div><div className="step-title">Compare Brokers</div><div className="step-desc">Use our unbiased broker comparison to pick the right partner based on your needs and budget.</div></div>
            <div className="hiw-step"><div className="step-num sn3">3</div><div className="step-title">Track IPOs</div><div className="step-desc">Never miss a winning IPO — use our tracker for GMP, subscription, and allotment data.</div></div>
            <div className="hiw-step"><div className="step-num sn4">4</div><div className="step-title">Plan with Calculators</div><div className="step-desc">Use SIP, EMI, goal planner and 25+ more calculators to make data-driven investment decisions.</div></div>
          </div>
        </div>
      </section>

      <section className="cta-sec">
        <div className="cta-inner">
          <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Join the Community</div>
          <h2 className="cta-h2">Start Investing Smarter Today</h2>
          <p className="cta-sub">Open a free demat account and join 40,000+ investors who use FairStockBrokers to make better financial decisions every day.</p>
          <div className="cta-btns">
            <Link to="/contact" className="cta-btn-p">Open Free Demat Account →</Link>
            <a href="https://wa.me" className="cta-btn-s">💬 Join WhatsApp Community</a>
          </div>
        </div>
      </section>
    </>
  )
}
