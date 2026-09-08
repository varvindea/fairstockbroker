export function SipGuideBook() {
  return (
    <div className="card" style={{ marginBottom: '22px' }}>
      <div className="card-head">
        <div className="ch-icon blue">❓</div>
        <div><div className="ch-title">What is a SIP?</div><div className="ch-sub">The fundamentals of Systematic Investment Plans</div></div>
      </div>
      <div className="card-body">
        <div className="guide-grid">
          <div className="gc purple-border">
            <div className="gc-icon">📊</div>
            <h3>Definition</h3>
            <p>A Systematic Investment Plan (SIP) lets you invest a fixed amount into a mutual fund at regular intervals — usually monthly. Rather than timing the market, you invest consistently regardless of market conditions, benefiting from rupee-cost averaging and the power of compounding.</p>
          </div>
          <div className="gc green-border">
            <div className="gc-icon">⚙️</div>
            <h3>How SIP Works</h3>
            <p>On your chosen date each month, your bank auto-debits the SIP amount and purchases mutual fund units at the current NAV. When markets are low, you get more units; when high, fewer. This averaging effect lowers your effective purchase cost over time.</p>
          </div>
          <div className="gc amber-border">
            <div className="gc-icon">🔢</div>
            <h3>The SIP Formula</h3>
            <div className="formula-box">
              <div className="formula-title">Future Value Formula</div>
              <div className="formula-code"><div className="fc-row"><div className="fc-icon">𝑓</div><div className="fc-text">FV = P × [((1+r)^n – 1) / r] × (1+r)</div></div></div>
              <div className="formula-note"><strong>Where:</strong> P = Monthly SIP amount · r = Monthly return rate (Annual rate ÷ 12) · n = Total number of instalments (Years × 12)</div>
            </div>
          </div>
          <div className="gc blue-border">
            <div className="gc-icon">💡</div>
            <h3>Why SIP Beats Lumpsum</h3>
            <ul>
              <li>No need to time the market — invest every month</li>
              <li>Rupee cost averaging reduces per-unit cost</li>
              <li>Builds financial discipline and habit</li>
              <li>Compounding works best over long horizons</li>
              <li>Small amounts grow into significant wealth</li>
            </ul>
          </div>
        </div>
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--n800)', marginBottom: '14px' }}>How to Start Your SIP in 4 Steps</div>
          <div className="step-flow">
            <div className="step-card"><div className="step-num">1</div><span className="step-icon">🆔</span><h4>Complete eKYC</h4><p>Aadhaar + PAN based. Takes 5–10 minutes online. One-time process.</p></div>
            <div className="step-card"><div className="step-num">2</div><span className="step-icon">🏦</span><h4>Choose Platform</h4><p>Groww, Zerodha Coin, Kuvera, or directly on AMC website.</p></div>
            <div className="step-card"><div className="step-num">3</div><span className="step-icon">📂</span><h4>Select Fund</h4><p>Large Cap, Flexi Cap, Mid Cap, or ELSS based on your goals.</p></div>
            <div className="step-card"><div className="step-num">4</div><span className="step-icon">🤖</span><h4>Set Auto-Debit</h4><p>Register NACH mandate. SIP runs on autopilot every month.</p></div>
          </div>
        </div>
        <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--n800)', marginBottom: '14px' }}>Types of SIPs in India</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
          <div style={{ background: 'var(--p50)', border: '1px solid var(--p200)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>📊</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--p800)', marginBottom: '5px' }}>Regular SIP</div>
            <div style={{ fontSize: '12px', color: 'var(--n600)', lineHeight: 1.6 }}>Fixed monthly amount throughout tenure. Most common type.</div>
          </div>
          <div style={{ background: 'var(--g50)', border: '1px solid var(--g200)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>⬆️</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--g700)', marginBottom: '5px' }}>Step-Up SIP</div>
            <div style={{ fontSize: '12px', color: 'var(--n600)', lineHeight: 1.6 }}>Increase SIP by fixed % annually. Best for salaried investors.</div>
          </div>
          <div style={{ background: 'var(--amberBg)', border: '1px solid var(--amberBdr,#fde68a)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>🔄</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#b45309', marginBottom: '5px' }}>Flexi SIP</div>
            <div style={{ fontSize: '12px', color: 'var(--n600)', lineHeight: 1.6 }}>Vary amount each month. Pause without penalty.</div>
          </div>
          <div style={{ background: 'var(--blueBg)', border: '1px solid var(--blueBdr)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>📅</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#1d4ed8', marginBottom: '5px' }}>Trigger SIP</div>
            <div style={{ fontSize: '12px', color: 'var(--n600)', lineHeight: 1.6 }}>Invests when market drops below a level.</div>
          </div>
          <div style={{ background: '#fdf2f8', border: '1px solid #f5d0fe', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>💎</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#be185d', marginBottom: '5px' }}>Perpetual SIP</div>
            <div style={{ fontSize: '12px', color: 'var(--n600)', lineHeight: 1.6 }}>No end date — runs until you stop it manually.</div>
          </div>
          <div style={{ background: 'var(--n50)', border: '1px solid var(--n200)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>🏛️</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--n700)', marginBottom: '5px' }}>Daily SIP</div>
            <div style={{ fontSize: '12px', color: 'var(--n600)', lineHeight: 1.6 }}>Invest daily. More averaging but operationally complex.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
