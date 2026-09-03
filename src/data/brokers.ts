export type Broker = {
  slug: string
  name: string
  type: string
  founded: number
  app: string
  opening: string
  delivery: string
  intraday: string
  amc: string
  rating: number
  reviews: string
  logo: string
  logoBackground: string
  logoColor: string
  pros: string[]
}

export const brokers: Broker[] = [
  { slug: 'zerodha', name: 'Zerodha', type: 'Discount', founded: 2010, app: 'Kite', opening: '₹200', delivery: 'FREE', intraday: '₹20/order', amc: '₹300/yr', rating: 4.8, reviews: '12.4K', logo: 'Z', logoBackground: '#dcfce7', logoColor: '#166534', pros: ['Zero delivery brokerage', 'Best-in-class Kite platform', 'Largest active client base', 'Coin for direct mutual funds'] },
  { slug: 'groww', name: 'Groww', type: 'Discount', founded: 2017, app: 'Groww', opening: 'FREE', delivery: 'FREE', intraday: '₹20/order', amc: '₹0', rating: 4.6, reviews: '8.2K', logo: 'G', logoBackground: '#ede9fe', logoColor: '#5b21b6', pros: ['Zero AMC', 'Simple beginner experience', 'Free demat account', 'Direct mutual funds'] },
  { slug: 'angelone', name: 'AngelOne', type: 'Discount', founded: 1996, app: 'SmartAPI', opening: 'FREE', delivery: 'FREE', intraday: '₹20/order', amc: '₹240/yr', rating: 4.5, reviews: '9.1K', logo: 'A', logoBackground: '#fef3c7', logoColor: '#92400e', pros: ['SmartAPI trading tools', 'Advisory tools', 'ARQ Prime research', 'NRI support'] },
  { slug: 'upstox', name: 'Upstox', type: 'Discount', founded: 2011, app: 'Upstox Pro', opening: 'FREE', delivery: 'FREE', intraday: '₹20/order', amc: '₹150/yr', rating: 4.4, reviews: '7.3K', logo: 'U', logoBackground: '#e0f2fe', logoColor: '#0c4a6e', pros: ['Zero delivery brokerage', 'Advanced charting', 'Options analytics', 'Fast order execution'] },
  { slug: 'dhan', name: 'Dhan', type: 'Discount', founded: 2021, app: 'Dhan', opening: 'FREE', delivery: 'FREE', intraday: '₹20/order', amc: '₹0', rating: 4.3, reviews: '3.8K', logo: 'D', logoBackground: '#fce7f3', logoColor: '#831843', pros: ['Options-focused interface', 'Fast execution', 'Zero AMC', 'Excellent charts'] },
  { slug: 'iifl-securities', name: 'IIFL Securities', type: 'Discount', founded: 1995, app: 'IIFL Markets', opening: 'FREE', delivery: 'FREE', intraday: '₹20/order', amc: '₹200/yr', rating: 4.2, reviews: '4.5K', logo: 'I', logoBackground: '#e0f2fe', logoColor: '#1e3a5f', pros: ['Research reports', 'Mutual fund advisory', 'Loan against securities', 'Full investment suite'] },
  { slug: 'icici-direct', name: 'ICICI Direct', type: 'Full Service', founded: 2000, app: 'ICICIdirect', opening: 'FREE', delivery: '0.55%', intraday: '0.275%', amc: '₹700/yr', rating: 4.2, reviews: '15.1K', logo: 'IC', logoBackground: '#fef3c7', logoColor: '#b45309', pros: ['3-in-1 account', 'Extensive research', 'Wealth management', 'NRI banking'] },
  { slug: 'hdfc-securities', name: 'HDFC Securities', type: 'Full Service', founded: 2000, app: 'HDFC Securities', opening: 'FREE', delivery: '0.50%', intraday: '0.25%', amc: '₹750/yr', rating: 4.1, reviews: '11.2K', logo: 'HD', logoBackground: '#dcfce7', logoColor: '#166534', pros: ['3-in-1 account', 'Priority banking', 'Institutional research', 'Portfolio advisory'] },
  { slug: 'kotak-securities', name: 'Kotak Securities', type: 'Full Service', founded: 1994, app: 'Kotak Neo', opening: 'FREE', delivery: '0.49%', intraday: '0.245%', amc: '₹600/yr', rating: 4.0, reviews: '8.7K', logo: 'KS', logoBackground: '#e0f2fe', logoColor: '#0c4a6e', pros: ['Neo flat-fee option', 'Strong research', 'Kotak banking integration', 'Investment advisory'] },
  { slug: 'motilal-oswal', name: 'Motilal Oswal', type: 'Full Service', founded: 1987, app: 'MO Investor', opening: 'FREE', delivery: '0.50%', intraday: '0.25%', amc: '₹400/yr', rating: 4.1, reviews: '6.5K', logo: 'MO', logoBackground: '#fce7f3', logoColor: '#831843', pros: ['Research-led advisory', 'Wealth management', 'Wide product range', 'Relationship support'] },
  { slug: 'sbi-securities', name: 'SBI Securities', type: 'Full Service', founded: 2005, app: 'SBI Securities / YONO', opening: 'FREE online', delivery: '0.50%', intraday: '₹20/order', amc: '₹350/yr', rating: 4.0, reviews: '5.4K', logo: 'SBI', logoBackground: '#e0f2fe', logoColor: '#075985', pros: ['SBI 3-in-1 account integration', 'Flexible brokerage plans', 'Large branch support network', 'Research and advisory support'] },
  { slug: 'paytm-money', name: 'Paytm Money', type: 'Discount', founded: 2017, app: 'Paytm Money', opening: 'FREE', delivery: 'FREE', intraday: '₹20/order', amc: 'FREE', rating: 3.8, reviews: '4.1K', logo: 'PM', logoBackground: '#e0f2fe', logoColor: '#0369a1', pros: ['Zero lifetime AMC', 'NPS available in app', 'T+5 PayLater feature', 'Simple mobile experience'] },
  { slug: 'indmoney', name: 'INDmoney', type: 'Discount', founded: 2019, app: 'INDmoney', opening: 'FREE', delivery: '₹20 or 0.1%', intraday: '₹20/order', amc: 'FREE', rating: 4.0, reviews: '3.6K', logo: 'IN', logoBackground: '#ede9fe', logoColor: '#6d28d9', pros: ['Access to US stocks', 'Zero lifetime AMC', 'Direct mutual funds', 'Portfolio tracking tools'] },
  { slug: 'mirae-sharekhan', name: 'Mirae Asset Sharekhan', type: 'Full Service', founded: 1986, app: 'Sharekhan', opening: 'Varies by plan', delivery: 'Plan-based', intraday: '₹20/order', amc: '₹350-500/yr', rating: 4.0, reviews: '5.2K', logo: 'MS', logoBackground: '#fef3c7', logoColor: '#92400e', pros: ['Long-established full-service broker', 'Research and advisory backing', 'Multiple account types', 'Broad investment offering'] },
  { slug: 'axis-direct', name: 'Axis Direct', type: 'Full Service', founded: 2011, app: 'Axis Direct', opening: 'FREE', delivery: '0.1% or ₹20', intraday: '₹20/order', amc: '₹750/yr', rating: 3.6, reviews: '4.3K', logo: 'AX', logoBackground: '#fce7f3', logoColor: '#9d174d', pros: ['Axis Bank 3-in-1 account', 'Trade@20 plan', 'NRI account support', 'Banking integration'] },
  { slug: '5paisa', name: '5paisa', type: 'Discount', founded: 2016, app: '5paisa', opening: 'FREE', delivery: 'Plan-based', intraday: 'Plan-based', amc: '₹300/yr', rating: 3.5, reviews: '3.9K', logo: '5P', logoBackground: '#dcfce7', logoColor: '#166534', pros: ['Flexible pricing plans', 'AI-powered research', 'Robo-advisory options', 'NRI account support'] },
  { slug: 'choice-broking', name: 'Choice Broking', type: 'Full Service', founded: 2010, app: 'Choice Broking', opening: 'Varies', delivery: 'Negotiable', intraday: 'Negotiable', amc: 'Varies', rating: 3.5, reviews: '2.8K', logo: 'CB', logoBackground: '#fef3c7', logoColor: '#92400e', pros: ['Listed brokerage parent', 'Research across 400+ stocks', 'Daily investment calls', 'Full-service support'] },
  { slug: 'share-market', name: 'Share.Market', type: 'Discount', founded: 2022, app: 'Share.Market', opening: 'FREE', delivery: '₹20 or 0.1%', intraday: '₹20/order', amc: 'FREE', rating: 3.9, reviews: '2.1K', logo: 'SM', logoBackground: '#dcfce7', logoColor: '#166534', pros: ['Zero lifetime AMC', 'PhonePe ecosystem access', 'Simple mobile trading', 'Growing product offering'] },
  { slug: 'geojit-financial', name: 'Geojit Financial', type: 'Full Service', founded: 1989, app: 'SELFIE', opening: 'Varies', delivery: 'Negotiable', intraday: 'Plan-based', amc: 'Varies', rating: 3.7, reviews: '3.4K', logo: 'GF', logoBackground: '#e0f2fe', logoColor: '#1d4ed8', pros: ['Long operating history', 'BNP Paribas backing', 'Gulf-focused NRI support', 'CDSL and NSDL account options'] },
  { slug: 'fyers', name: 'FYERS', type: 'Discount', founded: 2015, app: 'FYERS', opening: 'FREE', delivery: 'FREE', intraday: '₹20/order', amc: 'FREE', rating: 4.0, reviews: '4.0K', logo: 'FY', logoBackground: '#ede9fe', logoColor: '#6d28d9', pros: ['Free API v3', 'Integrated TradingView charts', 'Zero lifetime AMC', 'NRI and corporate account support'] },
  { slug: 'smc-global-securities', name: 'SMC Global Securities', type: 'Full Service', founded: 1990, app: 'SMC Global', opening: 'Varies', delivery: 'Negotiable', intraday: 'Plan-based', amc: 'Varies', rating: 3.8, reviews: '3.1K', logo: 'SMC', logoBackground: '#fce7f3', logoColor: '#9d174d', pros: ['Established listed broker', 'Diversified financial services', 'Investment banking and PMS access', 'International operations'] },
]

export function brokerHref(name: string) {
  const broker = brokers.find(item => item.name === name)
  return broker ? `/#/brokers/${broker.slug}` : '/#/brokers'
}