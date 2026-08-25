import { PricingCard } from '../components/PricingCard'
import { SectionHeading } from '../components/SectionHeading'
import { plans } from '../data/siteData'

export function PricingPage() {
  return (
    <section className="content-section page-section">
      <div className="page-hero premium-hero">
        <div className="page-hero-copy">
          <span className="eyebrow">Plans</span>
          <h1>Transparent pricing for every level of investor ambition.</h1>
          <p>
            Choose a plan that matches your stage, whether you are learning the basics or
            building a more strategic portfolio with expert support.
          </p>
        </div>

        <div className="mini-panel">
          <p>Start with</p>
          <strong>₹1,999</strong>
          <span>Simple onboarding and strategy guidance</span>
        </div>
      </div>

      <SectionHeading
        eyebrow="Pricing"
        title="Flexible plans designed around your investment journey."
        centered
      />

      <div className="pricing-grid">
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </div>
    </section>
  )
}
