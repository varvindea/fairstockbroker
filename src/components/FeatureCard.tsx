import type { Feature } from '../data/siteData'

type FeatureCardProps = {
  feature: Feature
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <article className="feature-card">
      <div className="icon-badge">✓</div>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </article>
  )
}
