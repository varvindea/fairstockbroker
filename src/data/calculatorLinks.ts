const calculatorPaths: Record<string, string> = {
  'SIP Calculator': 'SIP_Calculator.html',
  'Step Up SIP': 'Step_Up_SIP_Calculator.html',
  'Lumpsum': 'Lumsum_Calculator.html',
  'Lumpsum Calculator': 'Lumsum_Calculator.html',
  'SWP Calculator': 'SWP_Calculator.html',
  'SIP vs Lumpsum': 'SIP_vs_Lumpsum_Calculator.html',
  'Step-up SWP': 'StepUp_SWP_Calculators.html',
  'Income Tax Calculator': 'Income_Tax_Calculator.html',
  'LTCG Tax Calculator': 'LTCG_Tax_Calculator.html',
  'STCG Tax Calculator': 'STCG_Tax_Calculator.html',
  'HRA Exemption Calculator': 'HRA_Exemption_Calculator.html',
  'TDS Calculator': 'TDS_Calculator.html',
  'Salary Hike Planner': 'Salary_Hike_Planner.html',
  'FD Calculator': 'FD_Calculator.html',
  'RD Calculator': 'RD_Calculator.html',
  'PPF Calculator': 'PPF_Calculator.html',
  'NPS Calculator': 'NPS_Calculator.html',
  'NSC Calculator': 'NSC_Calculator.html',
  'Sukanya Samriddhi': 'Sukanya_Samriddhi_Calculator.html',
  'EMI Calculator': 'EMI_Calculator.html',
  'Car Loan Calculator': 'Car_Loan_Calculator.html',
  'Education Loan': 'Education_Loan_Calculator.html',
  'Credit Card Payoff': 'Credit_Card_Payoff_Calculator.html',
  'Balance Transfer': 'Balance_Transfer_Calculator.html',
  'Loan Prepayment': 'Loan_Prepayment_Savings_Calculator.html',
  'Goal Planner': 'Goal_Planner.html',
  'Retirement Planner': 'Retirement_Corpus_Planner.html',
  'Child Education Plan': 'Child_Education_Plan_Calculator.html',
  'FIRE Number': 'FIRE_Number_Calculator.html',
  'Emergency Fund': 'Emergency_Fund_Calculator.html',
  'Net Worth Calculator': 'Net_Worth_Calculator.html',
  'CAGR Calculator': 'CAGR_Calculator.html',
  'Compound Interest': 'Annuity_Calculator.html',
  'Rule of 72': 'Rule_of_72_Calculator.html',
  'Inflation Calculator': 'Inflation_Calculator.html',
  'CAGR vs XIRR': 'Mutual_Fund_Returns_Calculator.html',
  'Wealth Drawdown': 'Wealth_Drawdown_Planner.html',
}

export function sourcePageHref(path: string) {
  return `${import.meta.env.BASE_URL}source-pages/${path.split('/').map(encodeURIComponent).join('/')}`
}

export function calculatorHref(name: string) {
  if (name === 'SIP Calculator') return '/#/calculators/sip'
  if (name === 'Lumpsum' || name === 'Lumpsum Calculator') return '/#/calculators/lumpsum'
  if (name === 'Step Up SIP') return '/#/calculators/step-up-sip'
  if (name === 'SWP Calculator') return '/#/calculators/swp'
  if (name === 'SIP vs Lumpsum') return '/#/calculators/sip-vs-lumpsum'
  if (name === 'FD Calculator') return '/#/calculators/fd'
  if (name === 'RD Calculator') return '/#/calculators/rd'
  if (name === 'PPF Calculator') return '/#/calculators/ppf'
  if (name === 'NSC Calculator') return '/#/calculators/nsc'
  if (name === 'Sukanya Samriddhi') return '/#/calculators/sukanya'
  if (name === 'NPS Calculator') return '/#/calculators/nps'

  const path = calculatorPaths[name]
  if (!path) return '/#/calculators'

  return sourcePageHref(`08. Financial Calculator/${path}`)
}

const brokerReviewPaths: Record<string, string> = {
  Zerodha: '02__Zerodha.html',
  Groww: '01__Groww.html',
  AngelOne: '03__AngelOne.html',
  Upstox: '05__Upstox.html',
  Dhan: '09__Dhan.html',
  'IIFL Securities': '15__IIFL_Securities.html',
  'ICICI Direct': '04__ICICI_Direct.html',
  'HDFC Securities': '06__HDFC_Securities.html',
  'Kotak Securities': '07__Kotak_Securities.html',
  'Motilal Oswal': '10__Motilal_Oswal.html',
}

export function brokerReviewHref(name: string) {
  const path = brokerReviewPaths[name]
  if (!path) return '/#/brokers'
  return `/#/brokers/${name.toLowerCase().replace('angelone', 'angelone').replace(' ', '-').replace('securities', 'securities').replace('direct', 'direct').replace('motilal-oswal', 'motilal-oswal')}`
}