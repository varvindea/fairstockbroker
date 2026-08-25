import { SectionHeading } from '../components/SectionHeading'
import { features, steps } from '../data/siteData'

export function ServicesPage() {
  return (
    <section className="content-section page-section">
      <div className="page-hero premium-hero">
        <div className="page-hero-copy">
          <span className="eyebrow">Services</span>
          <h1>Actionable guidance for every stage of your investing journey.</h1>
          <p>
            From beginner education to strategic portfolio reviews, we create practical
            guidance that fits real life and market realities.
          </p>
        </div>

        <div className="mini-panel">
          <p>Advisory focus</p>
          <strong>3-step</strong>
          <span>Discovery, strategy, portfolio growth</span>
        </div>
      </div>

      <SectionHeading eyebrow="How we work" title="Helping investors move forward with intent." />

      <div className="steps-grid steps-grid-large">
        {steps.map((step, index) => (
          <div key={step} className="step-card">
            <span className="step-number">0{index + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>

      <div className="feature-grid feature-grid-compact top-space">
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
