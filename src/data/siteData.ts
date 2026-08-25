export type Stat = {
  value: string
  label: string
}

export type Feature = {
  title: string
  description: string
}

export type Plan = {
  name: string
  price: string
  description: string
  features: string[]
  featured?: boolean
}

export const stats: Stat[] = [
  { value: '1.2L+', label: 'clients guided' },
  { value: '18+', label: 'years of advisory experience' },
  { value: '4.9/5', label: 'average client satisfaction' },
]

export const features: Feature[] = [
  {
    title: 'Research-led investing',
    description:
      'Actionable stock insights built around market trends, risk management, and long-term value creation.',
  },
  {
    title: 'Zero jargon guidance',
    description:
      'Simple explanations for beginners and advanced strategy support for growing investors.',
  },
  {
    title: 'Portfolio-building support',
    description:
      'We help you define goals, build discipline, and create a balanced portfolio that matches your risk profile.',
  },
]

export const steps = [
  'Share your financial goals and investment profile.',
  'Receive a tailored strategy and stock opportunities.',
  'Track, refine, and grow with expert guidance.',
]

export const plans: Plan[] = [
  {
    name: 'Starter',
    price: '₹1,999',
    description: 'For beginners ready to take their first confident steps.',
    features: ['Portfolio review', '2 strategy calls', 'Market education'],
  },
  {
    name: 'Growth',
    price: '₹4,999',
    description: 'For investors aiming for smarter decisions and better execution.',
    features: ['Everything in Starter', 'Weekly stock ideas', 'Risk planning'],
    featured: true,
  },
  {
    name: 'Premium',
    price: '₹9,999',
    description: 'For focused investors who need hands-on portfolio support.',
    features: ['Everything in Growth', 'Priority support', 'Dedicated advisory'],
  },
]
