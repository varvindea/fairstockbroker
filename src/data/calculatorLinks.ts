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
  'EPF Calculator': 'EPF_Calculator.html',
  'Senior Citizen Savings': 'Senior_Citizen_Savings_Calculator.html',
  'Savings Goal': 'Savings_Goal_Calculator.html',
  'Saving Rate': 'Saving_Rate_Calculator.html',
  'Daily Savings': 'Daily_Savings_Calculator.html',
  // Landing-page card title aliases + calculators not yet native
  'Home Loan Eligibility': 'Home_Loan_Eligibility_Calculator.html',
  'Loan Comparison': 'Loan_Comparison_Calculator.html',
  'Personal Loan EMI': 'Personal_Loan_EMI_Calculator.html',
  'Gift Tax Guide': 'Gift_Tax_Guide_Calculator.html',
  'Home Loan Tax Benefits': 'Home_Loan_Tax_Benefits_Calculator.html',
  'Life Cover Estimator': 'Life_Cover_Estimator.html',
  'Gratuity Calculator': 'Gratuity_Calculator.html',
  'ULIP vs Term + MF': 'ULIP_vs_Term_MF_Calculator.html',
  'Term Premium Estimator': 'Term_Premium_Estimator.html',
  'Critical Illness Cover': 'Critical_Illness_Cover_Calculator.html',
  'Health Premium Estimator': 'Health_Premium_Estimator.html',
  'Wealth Goal Tracker': 'Wealth_Goal_Tracker.html',
  'Budget Planner (50/30/20)': 'Budget_Planner.html',
  'Loan Prepayment Savings': 'Loan_Prepayment_Savings_Calculator.html',
  'Balance Transfer Savings': 'Balance_Transfer_Calculator.html',
  'HRA Exemption': 'HRA_Exemption_Calculator.html',
  'TDS Estimator': 'TDS_Calculator.html',
  'FIRE Number Calculator': 'FIRE_Number_Calculator.html',
  'Wealth Drawdown Planner': 'Wealth_Drawdown_Planner.html',
  'Emergency Fund Calculator': 'Emergency_Fund_Calculator.html',
}

export function sourcePageHref(path: string) {
  return `${import.meta.env.BASE_URL}source-pages/${path.split('/').map(encodeURIComponent).join('/')}`
}

const nativeCalculatorSlugs: Record<string, string> = {
  'SIP Calculator': 'sip',
  'Lumpsum': 'lumpsum',
  'Lumpsum Calculator': 'lumpsum',
  'Step Up SIP': 'step-up-sip',
  'Step-Up SIP': 'step-up-sip',
  'SWP Calculator': 'swp',
  'SIP vs Lumpsum': 'sip-vs-lumpsum',
  'FD Calculator': 'fd',
  'RD Calculator': 'rd',
  'PPF Calculator': 'ppf',
  'NSC Calculator': 'nsc',
  'Sukanya Samriddhi': 'sukanya',
  'NPS Calculator': 'nps',
  'EPF Calculator': 'epf',
  'Senior Citizen Savings': 'senior-citizen-savings',
  'Savings Goal': 'savings-goal',
  'Saving Rate': 'saving-rate',
  'Daily Savings': 'daily-savings',
  'Step-up SWP': 'step-up-swp',
  'Step-Up SWP': 'step-up-swp',
  'CAGR Calculator': 'cagr',
  'Compound Interest': 'annuity',
  'Rule of 72': 'rule-of-72',
  'CAGR vs XIRR': 'mutual-fund-returns',
  'Inflation Calculator': 'inflation',
  // Landing-page card title aliases pointing at the same native calculators
  'Annuity Calculator': 'annuity',
  'Mutual Fund Returns': 'mutual-fund-returns',
  'Sukanya Samriddhi (SSY)': 'sukanya',
  'Senior Citizen Savings (SCSS)': 'senior-citizen-savings',
  'Savings Rate Calculator': 'saving-rate',
  'Senior Citizen FD': 'fd',
}

export function isNativeCalculator(name: string) {
  return name in nativeCalculatorSlugs
}

export function calculatorHref(name: string) {
  const slug = nativeCalculatorSlugs[name]
  if (slug) return `/calculators/${slug}`

  const path = calculatorPaths[name]
  if (!path) return '/calculators'

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