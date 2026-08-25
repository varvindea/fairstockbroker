import { Link } from 'react-router-dom'
import { stats } from '../data/siteData'

export function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Trusted investment guidance</span>
          <h1>Build wealth with clarity, confidence, and strategy.</h1>
          <p>
            FairStockBroker helps individuals make smarter stock decisions with
            research-backed guidance, transparent advice, and personalized portfolio
            planning.
          </p>

          <div className="cta-row">
            <Link to="/contact" className="primary-btn">
              Get started
            </Link>
            <Link to="/about" className="secondary-btn">
              Learn more
            </Link>
          </div>

          <div className="mini-trust">
            <div>
              <strong>10k+</strong>
              <span>investors mentored</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>market support</span>
            </div>
          </div>
        </div>

        <div className="hero-panel" aria-label="Investment overview card">
          <div className="panel-card panel-main">
            <div className="card-header">
              <span>Portfolio performance</span>
              <span className="positive">+18.4%</span>
            </div>
            <div className="chart-bars" aria-hidden="true">
              <span style={{ height: '35%' }} />
              <span style={{ height: '48%' }} />
              <span style={{ height: '60%' }} />
              <span style={{ height: '72%' }} />
              <span style={{ height: '56%' }} />
              <span style={{ height: '82%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>

          <div className="panel-card floating-card">
            <p>Investment focus</p>
            <strong>Balanced growth</strong>
            <span>Large-cap + diversified sectors</span>
          </div>
        </div>
      </section>

      <section className="home-cta-panel">
        <div className="home-cta-copy">
          <span className="eyebrow">Smart investing starts here</span>
          <h2>Transparent guidance for investors who want clarity and confidence.</h2>
        </div>

        <div className="home-cta-actions">
          <Link to="/contact" className="primary-btn">
            Book consultation
          </Link>
          <Link to="/pricing" className="secondary-btn">
            Explore plans
          </Link>
        </div>
      </section>

      <section className="stats-section compact-stats" aria-label="Company statistics">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-box">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>
    </>
  )
}
