import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const inr = (value: number) => value >= 10_000_000
  ? `₹${(value / 10_000_000).toFixed(2)} Cr`
  : value >= 100_000
    ? `₹${(value / 100_000).toFixed(2)} L`
    : `₹${Math.round(value).toLocaleString('en-IN')}`

const compoundingFrequencies = [
  { label: 'Monthly', value: 12 },
  { label: 'Quarterly', value: 4 },
  { label: 'Half-Yearly', value: 2 },
  { label: 'Yearly', value: 1 },
]

function FixedDepositCalculator() {
  const [principal, setPrincipal] = useState(500_000)
  const [rate, setRate] = useState(7.5)
  const [years, setYears] = useState(5)
  const [frequency, setFrequency] = useState(4)

  const maturity = principal * (1 + rate / 100 / frequency) ** (frequency * years)
  const interest = maturity - principal
  const effectiveYield = ((1 + rate / 100 / frequency) ** frequency - 1) * 100
  const yearlyGrowth = Array.from({ length: years }, (_, index) => {
    const year = index + 1
    const value = principal * (1 + rate / 100 / frequency) ** (frequency * year)
    return { year, value, interest: value - principal }
  })

  return (
    <>
      <section className="page-hero-sec">
        <div className="page-hero-inner">
          <div className="page-eyebrow">Savings Calculator</div>
          <h1 className="page-h1">FD Calculator</h1>
          <p className="page-sub">Calculate your fixed-deposit maturity value, interest earned, and annual growth. Results update as you adjust your investment.</p>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--white)' }}>
        <div className="sec-inner">
          <div className="calc-layout">
            <div>
              <div className="calc-field">
                <label>Deposit Amount</label>
                <input type="range" min="1000" max="10000000" step="1000" value={principal} onChange={event => setPrincipal(Number(event.target.value))} />
                <div className="field-vals"><span>₹1K</span><strong className="curr">{inr(principal)}</strong><span>₹1 Cr</span></div>
              </div>
              <div className="calc-field">
                <label>Interest Rate (% p.a.)</label>
                <input type="range" min="1" max="15" step="0.25" value={rate} onChange={event => setRate(Number(event.target.value))} />
                <div className="field-vals"><span>1%</span><strong className="curr">{rate.toFixed(2)}%</strong><span>15%</span></div>
              </div>
              <div className="calc-field">
                <label>Investment Period</label>
                <input type="range" min="1" max="30" value={years} onChange={event => setYears(Number(event.target.value))} />
                <div className="field-vals"><span>1 year</span><strong className="curr">{years} years</strong><span>30 years</span></div>
              </div>
              <div className="calc-field">
                <label>Compounding Frequency</label>
                <div className="calc-categories" style={{ justifyContent: 'flex-start', marginBottom: 0 }}>
                  {compoundingFrequencies.map(option => (
                    <button key={option.value} className={`calc-cat-btn${frequency === option.value ? ' active' : ''}`} onClick={() => setFrequency(option.value)}>{option.label}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="live-calc">
              <div className="lc-body">
                <div className="calc-result">
                  <div className="cr-label">Maturity Value after {years} years</div>
                  <div className="cr-val">{inr(maturity)}</div>
                  <div className="cr-rows">
                    <div className="cr-row"><span className="k">Principal Invested</span><span className="v">{inr(principal)}</span></div>
                    <div className="cr-row"><span className="k">Interest Earned</span><span className="v">{inr(interest)}</span></div>
                    <div className="cr-row"><span className="k">Effective Annual Yield</span><span className="v">{effectiveYield.toFixed(2)}%</span></div>
                  </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--ink)', marginBottom: '10px' }}>Year-by-Year Growth</div>
                  <div className="broker-wrap">
                    <table className="broker-tbl">
                      <thead><tr><th>Year</th><th>Value</th><th>Interest</th></tr></thead>
                      <tbody>{yearlyGrowth.map(row => <tr key={row.year}><td>{row.year}</td><td>{inr(row.value)}</td><td>{inr(row.interest)}</td></tr>)}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
        </div>
      </section>
    </>
  )
}

function RecurringDepositCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(10_000)
  const [rate, setRate] = useState(7.5)
  const [years, setYears] = useState(5)
  const monthlyRate = rate / 100 / 12
  const months = years * 12
  const maturity = monthlyDeposit * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate)
  const invested = monthlyDeposit * months

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Savings Calculator</div><h1 className="page-h1">RD Calculator</h1><p className="page-sub">Estimate the maturity value and interest earned from regular monthly deposits.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner"><div className="calc-layout">
        <div>
          <div className="calc-field"><label>Monthly Deposit</label><input type="range" min="100" max="100000" step="100" value={monthlyDeposit} onChange={event => setMonthlyDeposit(Number(event.target.value))} /><div className="field-vals"><span>₹100</span><strong className="curr">{inr(monthlyDeposit)}</strong><span>₹1L</span></div></div>
          <div className="calc-field"><label>Interest Rate (% p.a.)</label><input type="range" min="1" max="15" step="0.25" value={rate} onChange={event => setRate(Number(event.target.value))} /><div className="field-vals"><span>1%</span><strong className="curr">{rate.toFixed(2)}%</strong><span>15%</span></div></div>
          <div className="calc-field"><label>Investment Period</label><input type="range" min="1" max="30" value={years} onChange={event => setYears(Number(event.target.value))} /><div className="field-vals"><span>1 year</span><strong className="curr">{years} years</strong><span>30 years</span></div></div>
        </div>
        <div className="live-calc"><div className="lc-body"><div className="calc-result"><div className="cr-label">Estimated Maturity Value</div><div className="cr-val">{inr(maturity)}</div><div className="cr-rows"><div className="cr-row"><span className="k">Total Deposited</span><span className="v">{inr(invested)}</span></div><div className="cr-row"><span className="k">Interest Earned</span><span className="v">{inr(maturity - invested)}</span></div><div className="cr-row"><span className="k">Investment Period</span><span className="v">{years} years</span></div></div></div></div></div>
      </div><div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div></div></section>
    </>
  )
}

function InvestmentCalculator({ type }: { type: 'sip' | 'lumpsum' }) {
  const [amount, setAmount] = useState(type === 'sip' ? 10_000 : 100_000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const monthlyRate = rate / 100 / 12
  const months = years * 12
  const maturity = type === 'sip'
    ? amount * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate)
    : amount * (1 + rate / 100) ** years
  const invested = type === 'sip' ? amount * months : amount
  const title = type === 'sip' ? 'SIP Calculator' : 'Lumpsum Calculator'
  const amountLabel = type === 'sip' ? 'Monthly Investment' : 'Initial Investment'

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Investment Calculator</div><h1 className="page-h1">{title}</h1><p className="page-sub">See how compounding can grow your investment over time. Results update instantly as you adjust the values.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner"><div className="calc-layout"><div><div className="calc-field"><label>{amountLabel}</label><input type="range" min={type === 'sip' ? '500' : '1000'} max="10000000" step={type === 'sip' ? '500' : '1000'} value={amount} onChange={event => setAmount(Number(event.target.value))} /><div className="field-vals"><span>{type === 'sip' ? '₹500' : '₹1K'}</span><strong className="curr">{inr(amount)}</strong><span>₹1 Cr</span></div></div><div className="calc-field"><label>Expected Return (% p.a.)</label><input type="range" min="1" max="30" step="0.5" value={rate} onChange={event => setRate(Number(event.target.value))} /><div className="field-vals"><span>1%</span><strong className="curr">{rate.toFixed(1)}%</strong><span>30%</span></div></div><div className="calc-field"><label>Investment Period</label><input type="range" min="1" max="30" value={years} onChange={event => setYears(Number(event.target.value))} /><div className="field-vals"><span>1 year</span><strong className="curr">{years} years</strong><span>30 years</span></div></div></div><div className="live-calc"><div className="lc-body"><div className="calc-result"><div className="cr-label">Estimated Value after {years} years</div><div className="cr-val">{inr(maturity)}</div><div className="cr-rows"><div className="cr-row"><span className="k">Total Invested</span><span className="v">{inr(invested)}</span></div><div className="cr-row"><span className="k">Estimated Returns</span><span className="v">{inr(maturity - invested)}</span></div><div className="cr-row"><span className="k">Return Multiple</span><span className="v">{(maturity / invested).toFixed(2)}x</span></div></div></div></div></div></div><div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div></div></section>
    </>
  )
}

function StepUpSipCalculator() {
  const [monthlySip, setMonthlySip] = useState(10_000)
  const [stepUp, setStepUp] = useState(10)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(20)
  const monthlyRate = rate / 100 / 12
  let corpus = 0
  let invested = 0
  let currentSip = monthlySip
  for (let year = 0; year < years; year += 1) {
    for (let month = 0; month < 12; month += 1) {
      corpus = (corpus + currentSip) * (1 + monthlyRate)
      invested += currentSip
    }
    currentSip *= 1 + stepUp / 100
  }
  const flatSip = monthlySip * (((1 + monthlyRate) ** (years * 12) - 1) / monthlyRate) * (1 + monthlyRate)

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Investment Calculator</div><h1 className="page-h1">Step-Up SIP Calculator</h1><p className="page-sub">See how increasing your SIP every year can strengthen your long-term investment corpus.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner"><div className="calc-layout"><div><div className="calc-field"><label>Starting Monthly SIP</label><input type="range" min="500" max="100000" step="500" value={monthlySip} onChange={event => setMonthlySip(Number(event.target.value))} /><div className="field-vals"><span>₹500</span><strong className="curr">{inr(monthlySip)}</strong><span>₹1L</span></div></div><div className="calc-field"><label>Annual Step-Up</label><input type="range" min="0" max="30" step="1" value={stepUp} onChange={event => setStepUp(Number(event.target.value))} /><div className="field-vals"><span>0%</span><strong className="curr">{stepUp}%</strong><span>30%</span></div></div><div className="calc-field"><label>Expected Return (% p.a.)</label><input type="range" min="1" max="30" step="0.5" value={rate} onChange={event => setRate(Number(event.target.value))} /><div className="field-vals"><span>1%</span><strong className="curr">{rate.toFixed(1)}%</strong><span>30%</span></div></div><div className="calc-field"><label>Investment Period</label><input type="range" min="1" max="30" value={years} onChange={event => setYears(Number(event.target.value))} /><div className="field-vals"><span>1 year</span><strong className="curr">{years} years</strong><span>30 years</span></div></div></div><div className="live-calc"><div className="lc-body"><div className="calc-result"><div className="cr-label">Step-Up SIP Maturity Value</div><div className="cr-val">{inr(corpus)}</div><div className="cr-rows"><div className="cr-row"><span className="k">Total Invested</span><span className="v">{inr(invested)}</span></div><div className="cr-row"><span className="k">Estimated Returns</span><span className="v">{inr(corpus - invested)}</span></div><div className="cr-row"><span className="k">Extra Wealth vs Flat SIP</span><span className="v">{inr(corpus - flatSip)}</span></div></div></div></div></div></div><div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div></div></section>
    </>
  )
}

function SwpCalculator() {
  const [initialCorpus, setInitialCorpus] = useState(5_000_000)
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(30_000)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(20)
  const monthlyRate = rate / 100 / 12
  let balance = initialCorpus
  let totalWithdrawn = 0
  let totalInterest = 0
  for (let month = 0; month < years * 12 && balance > 0; month += 1) {
    const interest = balance * monthlyRate
    balance += interest
    totalInterest += interest
    const withdrawal = Math.min(monthlyWithdrawal, balance)
    balance -= withdrawal
    totalWithdrawn += withdrawal
  }
  const safeWithdrawal = initialCorpus * monthlyRate / (1 - (1 + monthlyRate) ** -(years * 12))

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Investment Calculator</div><h1 className="page-h1">SWP Calculator</h1><p className="page-sub">Project systematic withdrawals, remaining corpus, and interest earned over your chosen period.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner"><div className="calc-layout"><div><div className="calc-field"><label>Initial Corpus</label><input type="range" min="100000" max="10000000" step="10000" value={initialCorpus} onChange={event => setInitialCorpus(Number(event.target.value))} /><div className="field-vals"><span>₹1L</span><strong className="curr">{inr(initialCorpus)}</strong><span>₹1 Cr</span></div></div><div className="calc-field"><label>Monthly Withdrawal</label><input type="range" min="1000" max="100000" step="1000" value={monthlyWithdrawal} onChange={event => setMonthlyWithdrawal(Number(event.target.value))} /><div className="field-vals"><span>₹1K</span><strong className="curr">{inr(monthlyWithdrawal)}</strong><span>₹1L</span></div></div><div className="calc-field"><label>Expected Return (% p.a.)</label><input type="range" min="1" max="20" step="0.5" value={rate} onChange={event => setRate(Number(event.target.value))} /><div className="field-vals"><span>1%</span><strong className="curr">{rate.toFixed(1)}%</strong><span>20%</span></div></div><div className="calc-field"><label>Withdrawal Period</label><input type="range" min="1" max="30" value={years} onChange={event => setYears(Number(event.target.value))} /><div className="field-vals"><span>1 year</span><strong className="curr">{years} years</strong><span>30 years</span></div></div></div><div className="live-calc"><div className="lc-body"><div className="calc-result"><div className="cr-label">Remaining Corpus after {years} years</div><div className="cr-val">{inr(balance)}</div><div className="cr-rows"><div className="cr-row"><span className="k">Total Withdrawn</span><span className="v">{inr(totalWithdrawn)}</span></div><div className="cr-row"><span className="k">Interest Earned</span><span className="v">{inr(totalInterest)}</span></div><div className="cr-row"><span className="k">Monthly Withdrawal for Period</span><span className="v">{inr(safeWithdrawal)}</span></div></div></div></div></div></div><div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div></div></section>
    </>
  )
}

function SipVsLumpsumCalculator() {
  const [total, setTotal] = useState(1_200_000)
  const [years, setYears] = useState(10)
  const [rate, setRate] = useState(12)
  const [scenario, setScenario] = useState(2)
  const monthlyRate = rate / 100 / 12
  const months = years * 12
  const sipCorpus = total / months * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate)
  const adjustment = [0, 1.05, 0.98, 0.88][scenario]
  const lumpsumCorpus = total * (1 + rate / 100) ** years * adjustment
  const sipWins = sipCorpus > lumpsumCorpus

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Investment Calculator</div><h1 className="page-h1">SIP vs Lumpsum Calculator</h1><p className="page-sub">Compare a monthly SIP against a one-time investment under your selected market-volatility scenario.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner"><div className="calc-layout"><div><div className="calc-field"><label>Total Amount to Invest</label><input type="range" min="12000" max="10000000" step="1000" value={total} onChange={event => setTotal(Number(event.target.value))} /><div className="field-vals"><span>₹12K</span><strong className="curr">{inr(total)}</strong><span>₹1 Cr</span></div></div><div className="calc-field"><label>Investment Duration</label><input type="range" min="1" max="30" value={years} onChange={event => setYears(Number(event.target.value))} /><div className="field-vals"><span>1 year</span><strong className="curr">{years} years</strong><span>30 years</span></div></div><div className="calc-field"><label>Expected Return (% p.a.)</label><input type="range" min="1" max="30" step="0.5" value={rate} onChange={event => setRate(Number(event.target.value))} /><div className="field-vals"><span>1%</span><strong className="curr">{rate.toFixed(1)}%</strong><span>30%</span></div></div><div className="calc-field"><label>Market Volatility Scenario</label><div className="calc-categories" style={{ justifyContent: 'flex-start', marginBottom: 0 }}>{['Low', 'Moderate', 'High'].map((label, index) => <button key={label} className={`calc-cat-btn${scenario === index + 1 ? ' active' : ''}`} onClick={() => setScenario(index + 1)}>{label}</button>)}</div></div></div><div className="live-calc"><div className="lc-body"><div className="calc-result"><div className="cr-label">{sipWins ? 'SIP leads in this scenario' : 'Lumpsum leads in this scenario'}</div><div className="cr-val">{inr(Math.abs(sipCorpus - lumpsumCorpus))}</div><div className="cr-rows"><div className="cr-row"><span className="k">Monthly SIP Required</span><span className="v">{inr(total / months)}</span></div><div className="cr-row"><span className="k">SIP Final Value</span><span className="v">{inr(sipCorpus)}</span></div><div className="cr-row"><span className="k">Lumpsum Final Value</span><span className="v">{inr(lumpsumCorpus)}</span></div></div></div></div></div></div><div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div></div></section>
    </>
  )
}

function PpfCalculator() {
  const [annualDeposit, setAnnualDeposit] = useState(150_000)
  const [rate, setRate] = useState(7.1)
  const [years, setYears] = useState(15)
  const schedule = Array.from({ length: years }, (_, index) => {
    const openingBalance = index === 0 ? 0 : 0
    return { year: index + 1, openingBalance }
  }).reduce<{ year: number; deposited: number; interest: number; balance: number }[]>((rows, row) => {
    const previousBalance = rows.at(-1)?.balance ?? 0
    const deposited = previousBalance + annualDeposit
    const interest = deposited * rate / 100
    rows.push({ year: row.year, deposited: annualDeposit, interest, balance: deposited + interest })
    return rows
  }, [])
  const maturity = schedule.at(-1)?.balance ?? 0
  const totalDeposit = annualDeposit * years

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Savings Calculator</div><h1 className="page-h1">PPF Calculator</h1><p className="page-sub">Plan Public Provident Fund contributions, tax savings, and long-term compounded growth.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner"><div className="calc-layout">
        <div>
          <div className="calc-field"><label>Annual Deposit</label><input type="range" min="500" max="150000" step="500" value={annualDeposit} onChange={event => setAnnualDeposit(Number(event.target.value))} /><div className="field-vals"><span>₹500</span><strong className="curr">{inr(annualDeposit)}</strong><span>₹1.5L</span></div></div>
          <div className="calc-field"><label>Interest Rate (% p.a.)</label><input type="range" min="5" max="12" step="0.1" value={rate} onChange={event => setRate(Number(event.target.value))} /><div className="field-vals"><span>5%</span><strong className="curr">{rate.toFixed(1)}%</strong><span>12%</span></div></div>
          <div className="calc-field"><label>Investment Period</label><input type="range" min="15" max="30" value={years} onChange={event => setYears(Number(event.target.value))} /><div className="field-vals"><span>15 years</span><strong className="curr">{years} years</strong><span>30 years</span></div></div>
        </div>
        <div className="live-calc"><div className="lc-body"><div className="calc-result"><div className="cr-label">Estimated PPF Maturity Value</div><div className="cr-val">{inr(maturity)}</div><div className="cr-rows"><div className="cr-row"><span className="k">Total Deposited</span><span className="v">{inr(totalDeposit)}</span></div><div className="cr-row"><span className="k">Interest Earned</span><span className="v">{inr(maturity - totalDeposit)}</span></div><div className="cr-row"><span className="k">Tax Saving at 30%</span><span className="v">{inr(Math.min(annualDeposit, 150_000) * 0.3)} / year</span></div></div></div><div style={{ marginTop: '20px' }}><div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--ink)', marginBottom: '10px' }}>Annual Growth</div><div className="broker-wrap"><table className="broker-tbl"><thead><tr><th>Year</th><th>Interest</th><th>Balance</th></tr></thead><tbody>{schedule.map(row => <tr key={row.year}><td>{row.year}</td><td>{inr(row.interest)}</td><td>{inr(row.balance)}</td></tr>)}</tbody></table></div></div></div></div>
      </div><div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div></div></section>
    </>
  )
}

function NationalSavingsCertificateCalculator() {
  const [principal, setPrincipal] = useState(100_000)
  const [rate, setRate] = useState(7.7)
  const maturity = principal * (1 + rate / 100) ** 5

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Savings Calculator</div><h1 className="page-h1">NSC Calculator</h1><p className="page-sub">Calculate the 5-year maturity value of your National Savings Certificate investment.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner"><div className="calc-layout"><div><div className="calc-field"><label>Principal Amount</label><input type="range" min="1000" max="10000000" step="1000" value={principal} onChange={event => setPrincipal(Number(event.target.value))} /><div className="field-vals"><span>₹1K</span><strong className="curr">{inr(principal)}</strong><span>₹1 Cr</span></div></div><div className="calc-field"><label>Interest Rate (% p.a.)</label><input type="range" min="5" max="12" step="0.1" value={rate} onChange={event => setRate(Number(event.target.value))} /><div className="field-vals"><span>5%</span><strong className="curr">{rate.toFixed(1)}%</strong><span>12%</span></div></div></div><div className="live-calc"><div className="lc-body"><div className="calc-result"><div className="cr-label">Maturity Value after 5 years</div><div className="cr-val">{inr(maturity)}</div><div className="cr-rows"><div className="cr-row"><span className="k">Principal Invested</span><span className="v">{inr(principal)}</span></div><div className="cr-row"><span className="k">Interest Earned</span><span className="v">{inr(maturity - principal)}</span></div><div className="cr-row"><span className="k">80C Tax Saving at 30%</span><span className="v">{inr(Math.min(principal, 150_000) * 0.3)}</span></div></div></div></div></div></div><div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div></div></section>
    </>
  )
}

function SukanyaCalculator() {
  const [annualDeposit, setAnnualDeposit] = useState(150_000)
  const [age, setAge] = useState(0)
  const annualRate = 8.2 / 100
  const yearsToMaturity = 21 - age
  const contributionYears = Math.min(15, yearsToMaturity)
  let maturity = 0
  for (let year = 1; year <= yearsToMaturity; year += 1) {
    if (year <= contributionYears) maturity += annualDeposit
    maturity *= 1 + annualRate
  }
  const invested = annualDeposit * contributionYears

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Savings Calculator</div><h1 className="page-h1">Sukanya Samriddhi Calculator</h1><p className="page-sub">Estimate long-term savings under the Sukanya Samriddhi Yojana at the current 8.2% annual interest rate.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner"><div className="calc-layout"><div><div className="calc-field"><label>Daughter's Current Age</label><input type="range" min="0" max="10" value={age} onChange={event => setAge(Number(event.target.value))} /><div className="field-vals"><span>0 years</span><strong className="curr">{age} years</strong><span>10 years</span></div></div><div className="calc-field"><label>Annual Investment</label><input type="range" min="250" max="150000" step="250" value={annualDeposit} onChange={event => setAnnualDeposit(Number(event.target.value))} /><div className="field-vals"><span>₹250</span><strong className="curr">{inr(annualDeposit)}</strong><span>₹1.5L</span></div></div></div><div className="live-calc"><div className="lc-body"><div className="calc-result"><div className="cr-label">Estimated Maturity Value at Age 21</div><div className="cr-val">{inr(maturity)}</div><div className="cr-rows"><div className="cr-row"><span className="k">Total Invested</span><span className="v">{inr(invested)}</span></div><div className="cr-row"><span className="k">Interest Earned</span><span className="v">{inr(maturity - invested)}</span></div><div className="cr-row"><span className="k">Investment Period</span><span className="v">{yearsToMaturity} years</span></div><div className="cr-row"><span className="k">Contribution Period</span><span className="v">{contributionYears} years</span></div></div></div></div></div></div><div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div></div></section>
    </>
  )
}

function NpsCalculator() {
  const [monthlyContribution, setMonthlyContribution] = useState(5_000)
  const [currentAge, setCurrentAge] = useState(30)
  const [returnRate, setReturnRate] = useState(10)
  const [annuityRate, setAnnuityRate] = useState(6)
  const years = 60 - currentAge
  const monthlyRate = returnRate / 100 / 12
  const months = years * 12
  const corpus = monthlyContribution * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate)
  const invested = monthlyContribution * months
  const lumpSum = corpus * 0.6
  const monthlyPension = corpus * 0.4 * annuityRate / 100 / 12

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Retirement Calculator</div><h1 className="page-h1">NPS Calculator</h1><p className="page-sub">Estimate your National Pension System corpus, tax-free lump sum, and expected monthly pension at age 60.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner"><div className="calc-layout"><div><div className="calc-field"><label>Monthly Contribution</label><input type="range" min="500" max="100000" step="500" value={monthlyContribution} onChange={event => setMonthlyContribution(Number(event.target.value))} /><div className="field-vals"><span>₹500</span><strong className="curr">{inr(monthlyContribution)}</strong><span>₹1L</span></div></div><div className="calc-field"><label>Current Age</label><input type="range" min="18" max="55" value={currentAge} onChange={event => setCurrentAge(Number(event.target.value))} /><div className="field-vals"><span>18 years</span><strong className="curr">{currentAge} years</strong><span>55 years</span></div></div><div className="calc-field"><label>Expected Return (% p.a.)</label><input type="range" min="5" max="15" step="0.5" value={returnRate} onChange={event => setReturnRate(Number(event.target.value))} /><div className="field-vals"><span>5%</span><strong className="curr">{returnRate.toFixed(1)}%</strong><span>15%</span></div></div><div className="calc-field"><label>Annuity Rate (% p.a.)</label><input type="range" min="3" max="10" step="0.5" value={annuityRate} onChange={event => setAnnuityRate(Number(event.target.value))} /><div className="field-vals"><span>3%</span><strong className="curr">{annuityRate.toFixed(1)}%</strong><span>10%</span></div></div></div><div className="live-calc"><div className="lc-body"><div className="calc-result"><div className="cr-label">Estimated Corpus at Age 60</div><div className="cr-val">{inr(corpus)}</div><div className="cr-rows"><div className="cr-row"><span className="k">Total Invested</span><span className="v">{inr(invested)}</span></div><div className="cr-row"><span className="k">Tax-Free Lump Sum (60%)</span><span className="v">{inr(lumpSum)}</span></div><div className="cr-row"><span className="k">Annuity Corpus (40%)</span><span className="v">{inr(corpus * 0.4)}</span></div><div className="cr-row"><span className="k">Est. Monthly Pension</span><span className="v">{inr(monthlyPension)}</span></div><div className="cr-row"><span className="k">Years to Retirement</span><span className="v">{years} years</span></div></div></div></div></div></div><div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div></div></section>
    </>
  )
}

export function CalculatorDetailPage() {
  const { slug } = useParams()

  if (slug === 'fd') return <FixedDepositCalculator />
  if (slug === 'rd') return <RecurringDepositCalculator />
  if (slug === 'sip') return <InvestmentCalculator type="sip" />
  if (slug === 'lumpsum') return <InvestmentCalculator type="lumpsum" />
  if (slug === 'step-up-sip') return <StepUpSipCalculator />
  if (slug === 'swp') return <SwpCalculator />
  if (slug === 'sip-vs-lumpsum') return <SipVsLumpsumCalculator />
  if (slug === 'ppf') return <PpfCalculator />
  if (slug === 'nsc') return <NationalSavingsCertificateCalculator />
  if (slug === 'sukanya') return <SukanyaCalculator />
  if (slug === 'nps') return <NpsCalculator />

  return (
    <section className="sec" style={{ background: 'var(--white)' }}>
      <div className="sec-inner" style={{ textAlign: 'center' }}>
        <h1 className="sec-h2">Calculator Coming Next</h1>
        <p className="sec-sub">This calculator is scheduled for the native React migration.</p>
        <Link to="/calculators" className="cta-btn-p" style={{ marginTop: '24px' }}>Back to Calculators</Link>
      </div>
    </section>
  )
}