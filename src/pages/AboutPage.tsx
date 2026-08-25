import { SectionHeading } from '../components/SectionHeading'
import { features } from '../data/siteData'

export function AboutPage() {
  return (
    <section className="content-section page-section">
      <div className="page-hero premium-hero">
        <div className="page-hero-copy">
          <span className="eyebrow">Our story</span>
          <h1>Investing with clarity, trust, and long-term discipline.</h1>
          <p>
            We help people make confident financial decisions through market education,
            tailored stock insights, and a transparent process built around steady growth.
          </p>
        </div>

        <div className="mini-panel">
          <p>Client trust index</p>
          <strong>96%</strong>
          <span>Retained learning & portfolio confidence</span>
        </div>
      </div>

      <SectionHeading eyebrow="Our philosophy" title="A transparent approach to financial growth." />

      <div className="page-copy-grid">
        <div className="page-card">
          <p>
            FairStockBroker was built for people who want clarity before they commit to
            stock market decisions. We believe investing should be understandable,
            disciplined, and aligned with real financial goals.
          </p>
        </div>
        <div className="page-card">
          <p>
            Our team blends market research, practical planning, and educational guidance
            to help clients build confidence without unnecessary complexity.
          </p>
        </div>
      </div>

      <div className="feature-grid feature-grid-compact">
        {features.map((feature) => (
          <div key={feature.title} className="feature-card">
            <div className="icon-badge">✓</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
