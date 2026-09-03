export type Guide = {
  slug: string
  category: string
  title: string
  summary: string
  sections: { title: string; description: string; topics: string[] }[]
}

const learningSections = (first: string, second: string) => [
  { title: first, description: 'Clear foundations to help you understand the topic and make informed financial decisions.', topics: ['Key concepts', 'How it works', 'Important terms'] },
  { title: second, description: 'Practical information to help you compare choices and build a confident action plan.', topics: ['What to compare', 'Common mistakes', 'Your next steps'] },
]

export const guides: Guide[] = [
  { slug: 'drhp-guide', category: 'IPO Education', title: 'How to Read a DRHP', summary: 'Learn how to evaluate an IPO Draft Red Herring Prospectus before investing.', sections: learningSections('DRHP Fundamentals', 'Investor Checklist') },
  { slug: 'india-indices', category: 'Market Education', title: 'India Indices Learning Hub', summary: 'Understand the major Indian stock-market indices and what they measure.', sections: learningSections('Core Indices', 'Index Types') },
  { slug: 'mutual-fund-guide', category: 'Personal Finance', title: 'Mutual Fund Guide', summary: 'A practical introduction to mutual funds, fund categories, and long-term SIP investing.', sections: learningSections('Mutual Fund Basics', 'Build Your Plan') },
  { slug: 'term-insurance-industry-guide', category: 'Insurance', title: 'Term Insurance Industry Guide 2026-27', summary: 'Understand term insurance rules, claim data, coverage choices, and policy riders.', sections: learningSections('Coverage Essentials', 'Compare With Care') },
  { slug: 'term-plan-learning', category: 'Insurance', title: 'Term Plan Learning Guide', summary: 'A structured learning path for understanding term insurance and protecting your family.', sections: learningSections('Getting Started', 'Make an Informed Choice') },
  { slug: 'term-plan-stories', category: 'Insurance', title: 'Real Term Plan Stories', summary: 'Explore practical insurance scenarios and the decisions behind successful claims and coverage.', sections: learningSections('Lessons From Families', 'Your Takeaways') },
  { slug: 'top-30-brokers', category: 'Broker Intelligence', title: 'Top 30 Stock Brokers India', summary: 'Compare leading Indian brokers by charges, platform, services, and investor fit.', sections: learningSections('Compare Brokers', 'Choose Your Fit') },
  { slug: 'goal-setting-guide', category: 'Personal Finance', title: 'Personal Finance Goal Setting Guide', summary: 'Turn financial goals into an actionable plan with timelines, risk levels, and regular reviews.', sections: learningSections('Set Strong Goals', 'Track Progress') },
  { slug: 'health-insurance-guide', category: 'Insurance', title: 'Health Insurance Guide', summary: 'Understand health coverage, plan types, claims, waiting periods, and tax benefits.', sections: learningSections('Coverage Basics', 'Claims and Selection') },
  { slug: 'mutual-fund-learning', category: 'Personal Finance', title: 'Mutual Fund Learning Guide', summary: 'Build confidence with fund types, risk assessment, selection methods, and portfolio planning.', sections: learningSections('Fund Types', 'Portfolio Building') },
  { slug: 'personal-finance', category: 'Personal Finance', title: 'Personal Finance Made Simple', summary: 'A single starting point for financial planning, insurance, mutual funds, and useful calculators.', sections: learningSections('Plan Your Money', 'Grow With Confidence') },
  { slug: 'term-plan-guide', category: 'Insurance', title: 'Term Plan Guide', summary: 'A complete learning guide to term insurance, from calculating cover to maintaining your policy.', sections: learningSections('Understand Your Cover', 'Policy Management') },
]
