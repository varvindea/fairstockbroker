import type { Plan } from '../data/siteData'

type PricingCardProps = {
  plan: Plan
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <article className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
      <h3>{plan.name}</h3>
      <div className="price-row">
        <strong>{plan.price}</strong>
        <span>/month</span>
      </div>
      <p>{plan.description}</p>

      <ul>
        {plan.features.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <button type="button" className={plan.featured ? 'primary-btn' : 'secondary-btn'}>
        {plan.featured ? 'Most popular' : 'Choose plan'}
      </button>
    </article>
  )
}
