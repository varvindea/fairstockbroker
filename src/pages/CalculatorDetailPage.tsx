import { useRef, useState } from 'react'
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
  const resultsRef = useRef<HTMLDivElement>(null)

  const maturity = principal * (1 + rate / 100 / frequency) ** (frequency * years)
  const interest = maturity - principal
  const effectiveYield = ((1 + rate / 100 / frequency) ** frequency - 1) * 100
  const yearlyGrowth = Array.from({ length: years }, (_, index) => {
    const year = index + 1
    const value = principal * (1 + rate / 100 / frequency) ** (frequency * year)
    return { year, value, interest: value - principal }
  })
  const resetFd = () => { setPrincipal(500_000); setRate(7.5); setYears(5); setFrequency(4) }

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
          <div className="card">
            <div className="card-head"><div className="ch-icon amber">🏦</div><div><div className="ch-title">Enter Your FD Details</div><div className="ch-sub">Results update instantly — try different tenures</div></div></div>
            <div className="card-body">
              <div className="params-grid">
                <div className="param-card">
                  <div className="pc-top"><span className="pc-label">💰 Principal Amount</span><span className="pc-value">{inr(principal)}</span></div>
                  <div className="pc-input-row"><input className="num-input" type="number" min={1000} max={100000000} step={1000} value={principal} onChange={e => setPrincipal(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1000} max={100000000} step={1000} value={principal} onChange={e => setPrincipal(Number(e.target.value))} /></div></div>
                  <div className="range-marks"><span className="rm">₹1K</span><span className="rm">₹50L</span><span className="rm">₹10Cr</span></div>
                  <div className="presets">{[100000, 250000, 500000, 1000000, 5000000].map(v => <button key={v} className={`preset${principal === v ? ' on' : ''}`} onClick={() => setPrincipal(v)}>{inr(v)}</button>)}</div>
                </div>
                <div className="param-card">
                  <div className="pc-top"><span className="pc-label">📈 Interest Rate (p.a.)</span><span className="pc-value">{rate}%</span></div>
                  <div className="pc-input-row"><input className="num-input" type="number" min={1} max={15} step={0.25} value={rate} onChange={e => setRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1} max={15} step={0.25} value={rate} onChange={e => setRate(Number(e.target.value))} /></div></div>
                  <div className="range-marks"><span className="rm">1%</span><span className="rm">7.5%</span><span className="rm">15%</span></div>
                  <div className="presets">{[6.5, 7, 7.5, 8, 9].map(v => <button key={v} className={`preset${rate === v ? ' on' : ''}`} onClick={() => setRate(v)}>{v}%</button>)}</div>
                </div>
                <div className="param-card green">
                  <div className="pc-top"><span className="pc-label green">⏳ Tenure</span><span className="pc-value green">{years} Yrs</span></div>
                  <div className="pc-input-row"><input className="num-input" type="number" min={1} max={30} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={1} max={30} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /></div></div>
                  <div className="range-marks"><span className="rm">1yr</span><span className="rm">15yr</span><span className="rm">30yr</span></div>
                  <div className="presets">{[1, 2, 3, 5, 10].map(v => <button key={v} className={`preset green-preset${years === v ? ' on' : ''}`} onClick={() => setYears(v)}>{v}yr</button>)}</div>
                </div>
                <div className="param-card">
                  <div className="pc-top"><span className="pc-label">🔄 Compounding</span><span className="pc-value">{compoundingFrequencies.find(f => f.value === frequency)?.label}</span></div>
                  <div className="presets">{compoundingFrequencies.map(f => <button key={f.value} className={`preset${frequency === f.value ? ' on' : ''}`} onClick={() => setFrequency(f.value)}>{f.label}</button>)}</div>
                </div>
              </div>

              <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate FD Returns</button>
              <button className="btn-reset" onClick={resetFd}>↺ Reset to defaults</button>

              <div className="results-area show" ref={resultsRef}>
                <div className="stats-grid">
                  <div className="stat-tile purple"><div className="st-label">Maturity Value</div><div className="st-val purple">{inr(maturity)}</div><div className="st-sub">After {years} years</div></div>
                  <div className="stat-tile green"><div className="st-label">Principal Invested</div><div className="st-val green">{inr(principal)}</div></div>
                  <div className="stat-tile amber"><div className="st-label">Interest Earned</div><div className="st-val amber">{inr(interest)}</div></div>
                  <div className="stat-tile blue"><div className="st-label">Effective Annual Yield</div><div className="st-val blue">{effectiveYield.toFixed(2)}%</div><div className="st-sub">After compounding effect</div></div>
                </div>
                <div className="card" style={{ marginTop: '16px' }}>
                  <div className="card-head"><div className="ch-icon amber">📅</div><div><div className="ch-title">Year-by-Year Growth</div></div></div>
                  <div className="card-body" style={{ padding: 0 }}>
                    <div className="broker-wrap">
                      <table className="broker-tbl">
                        <thead><tr><th>Year</th><th>Closing Balance</th><th>Interest Earned</th></tr></thead>
                        <tbody>{yearlyGrowth.map(row => <tr key={row.year}><td>{row.year}</td><td>{inr(row.value)}</td><td>{inr(row.interest)}</td></tr>)}</tbody>
                      </table>
                    </div>
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
  const resultsRef = useRef<HTMLDivElement>(null)
  const monthlyRate = rate / 100 / 12
  const months = years * 12
  const maturity = monthlyDeposit * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate)
  const invested = monthlyDeposit * months
  const resetRd = () => { setMonthlyDeposit(10_000); setRate(7.5); setYears(5) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Savings Calculator</div><h1 className="page-h1">RD Calculator</h1><p className="page-sub">Estimate the maturity value and interest earned from regular monthly deposits.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon purple">🪙</div><div><div className="ch-title">Enter Your RD Details</div><div className="ch-sub">Results update instantly as you adjust the sliders</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 Monthly Deposit</span><span className="pc-value">{inr(monthlyDeposit)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={100} max={100000} step={100} value={monthlyDeposit} onChange={e => setMonthlyDeposit(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={100} max={100000} step={100} value={monthlyDeposit} onChange={e => setMonthlyDeposit(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹100</span><span className="rm">₹50K</span><span className="rm">₹1L</span></div>
                <div className="presets">{[2000, 5000, 10000, 20000, 50000].map(v => <button key={v} className={`preset${monthlyDeposit === v ? ' on' : ''}`} onClick={() => setMonthlyDeposit(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📈 Interest Rate (p.a.)</span><span className="pc-value">{rate.toFixed(2)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={15} step={0.25} value={rate} onChange={e => setRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1} max={15} step={0.25} value={rate} onChange={e => setRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1%</span><span className="rm">7.5%</span><span className="rm">15%</span></div>
                <div className="presets">{[6.5, 7, 7.5, 8, 9].map(v => <button key={v} className={`preset${rate === v ? ' on' : ''}`} onClick={() => setRate(v)}>{v}%</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">⏳ Tenure</span><span className="pc-value green">{years} Yrs</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={30} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={1} max={30} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1yr</span><span className="rm">15yr</span><span className="rm">30yr</span></div>
                <div className="presets">{[1, 2, 3, 5, 10].map(v => <button key={v} className={`preset green-preset${years === v ? ' on' : ''}`} onClick={() => setYears(v)}>{v}yr</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate RD Returns</button>
            <button className="btn-reset" onClick={resetRd}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">Maturity Value</div><div className="st-val purple">{inr(maturity)}</div><div className="st-sub">After {years} years</div></div>
                <div className="stat-tile green"><div className="st-label">Total Deposited</div><div className="st-val green">{inr(invested)}</div></div>
                <div className="stat-tile amber"><div className="st-label">Interest Earned</div><div className="st-val amber">{inr(maturity - invested)}</div></div>
                <div className="stat-tile blue"><div className="st-label">Investment Period</div><div className="st-val blue">{years} years</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function InvestmentCalculator({ type }: { type: 'sip' | 'lumpsum' }) {
  const [amount, setAmount] = useState(type === 'sip' ? 10_000 : 100_000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const resultsRef = useRef<HTMLDivElement>(null)
  const monthlyRate = rate / 100 / 12
  const months = years * 12
  const maturity = type === 'sip'
    ? amount * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate)
    : amount * (1 + rate / 100) ** years
  const invested = type === 'sip' ? amount * months : amount
  const title = type === 'sip' ? 'SIP Calculator' : 'Lumpsum Calculator'
  const amountLabel = type === 'sip' ? '💰 Monthly Investment' : '💰 Initial Investment'
  const amountMin = type === 'sip' ? 500 : 1000
  const amountPresets = type === 'sip' ? [1000, 5000, 10000, 25000, 50000] : [50000, 100000, 500000, 1000000, 2500000]
  const resetInv = () => { setAmount(type === 'sip' ? 10_000 : 100_000); setRate(12); setYears(10) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Investment Calculator</div><h1 className="page-h1">{title}</h1><p className="page-sub">See how compounding can grow your investment over time. Results update instantly as you adjust the values.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon purple">📊</div><div><div className="ch-title">Enter Your Investment Details</div><div className="ch-sub">Results update instantly as you adjust the sliders</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">{amountLabel}</span><span className="pc-value">{inr(amount)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={amountMin} max={10000000} step={amountMin} value={amount} onChange={e => setAmount(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={amountMin} max={10000000} step={amountMin} value={amount} onChange={e => setAmount(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">{type === 'sip' ? '₹500' : '₹1K'}</span><span className="rm">₹50L</span><span className="rm">₹1Cr</span></div>
                <div className="presets">{amountPresets.map(v => <button key={v} className={`preset${amount === v ? ' on' : ''}`} onClick={() => setAmount(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📈 Expected Return (p.a.)</span><span className="pc-value">{rate.toFixed(1)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={30} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1} max={30} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1%</span><span className="rm">15%</span><span className="rm">30%</span></div>
                <div className="presets">{[8, 10, 12, 15].map(v => <button key={v} className={`preset${rate === v ? ' on' : ''}`} onClick={() => setRate(v)}>{v}%</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">⏳ Investment Period</span><span className="pc-value green">{years} Yrs</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={30} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={1} max={30} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1yr</span><span className="rm">15yr</span><span className="rm">30yr</span></div>
                <div className="presets">{[5, 10, 15, 20, 25].map(v => <button key={v} className={`preset green-preset${years === v ? ' on' : ''}`} onClick={() => setYears(v)}>{v}yr</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate Returns</button>
            <button className="btn-reset" onClick={resetInv}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">Estimated Value</div><div className="st-val purple">{inr(maturity)}</div><div className="st-sub">After {years} years</div></div>
                <div className="stat-tile green"><div className="st-label">Total Invested</div><div className="st-val green">{inr(invested)}</div></div>
                <div className="stat-tile amber"><div className="st-label">Estimated Returns</div><div className="st-val amber">{inr(maturity - invested)}</div></div>
                <div className="stat-tile blue"><div className="st-label">Return Multiple</div><div className="st-val blue">{(maturity / invested).toFixed(2)}×</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function StepUpSipCalculator() {
  const [monthlySip, setMonthlySip] = useState(10_000)
  const [stepUp, setStepUp] = useState(10)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(20)
  const resultsRef = useRef<HTMLDivElement>(null)
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
  const resetStepUp = () => { setMonthlySip(10_000); setStepUp(10); setRate(12); setYears(20) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Investment Calculator</div><h1 className="page-h1">Step-Up SIP Calculator</h1><p className="page-sub">See how increasing your SIP every year can strengthen your long-term investment corpus.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon purple">⬆️</div><div><div className="ch-title">Enter Your Step-Up SIP Details</div><div className="ch-sub">Results update instantly as you adjust the sliders</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 Starting Monthly SIP</span><span className="pc-value">{inr(monthlySip)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={500} max={100000} step={500} value={monthlySip} onChange={e => setMonthlySip(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={500} max={100000} step={500} value={monthlySip} onChange={e => setMonthlySip(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹500</span><span className="rm">₹50K</span><span className="rm">₹1L</span></div>
                <div className="presets">{[5000, 10000, 25000, 50000].map(v => <button key={v} className={`preset${monthlySip === v ? ' on' : ''}`} onClick={() => setMonthlySip(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">⬆️ Annual Step-Up</span><span className="pc-value">{stepUp}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={0} max={30} step={1} value={stepUp} onChange={e => setStepUp(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={0} max={30} step={1} value={stepUp} onChange={e => setStepUp(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">0%</span><span className="rm">15%</span><span className="rm">30%</span></div>
                <div className="presets">{[5, 10, 15, 20].map(v => <button key={v} className={`preset${stepUp === v ? ' on' : ''}`} onClick={() => setStepUp(v)}>{v}%</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📈 Expected Return (p.a.)</span><span className="pc-value">{rate.toFixed(1)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={30} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1} max={30} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1%</span><span className="rm">15%</span><span className="rm">30%</span></div>
                <div className="presets">{[8, 10, 12, 15].map(v => <button key={v} className={`preset${rate === v ? ' on' : ''}`} onClick={() => setRate(v)}>{v}%</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">⏳ Investment Period</span><span className="pc-value green">{years} Yrs</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={30} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={1} max={30} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1yr</span><span className="rm">15yr</span><span className="rm">30yr</span></div>
                <div className="presets">{[10, 15, 20, 25].map(v => <button key={v} className={`preset green-preset${years === v ? ' on' : ''}`} onClick={() => setYears(v)}>{v}yr</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate Step-Up SIP</button>
            <button className="btn-reset" onClick={resetStepUp}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">Step-Up SIP Maturity Value</div><div className="st-val purple">{inr(corpus)}</div></div>
                <div className="stat-tile green"><div className="st-label">Total Invested</div><div className="st-val green">{inr(invested)}</div></div>
                <div className="stat-tile amber"><div className="st-label">Estimated Returns</div><div className="st-val amber">{inr(corpus - invested)}</div></div>
                <div className="stat-tile blue"><div className="st-label">Extra Wealth vs Flat SIP</div><div className="st-val blue">{inr(corpus - flatSip)}</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function SwpCalculator() {
  const [initialCorpus, setInitialCorpus] = useState(5_000_000)
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(30_000)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(20)
  const resultsRef = useRef<HTMLDivElement>(null)
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
  const resetSwp = () => { setInitialCorpus(5_000_000); setMonthlyWithdrawal(30_000); setRate(10); setYears(20) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Investment Calculator</div><h1 className="page-h1">SWP Calculator</h1><p className="page-sub">Plan systematic withdrawals from your corpus and see how long your money lasts.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon amber">💸</div><div><div className="ch-title">Enter Your SWP Details</div><div className="ch-sub">Results update instantly as you adjust the sliders</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 Initial Corpus</span><span className="pc-value">{inr(initialCorpus)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={100000} max={100000000} step={100000} value={initialCorpus} onChange={e => setInitialCorpus(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={100000} max={100000000} step={100000} value={initialCorpus} onChange={e => setInitialCorpus(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹1L</span><span className="rm">₹50L</span><span className="rm">₹10Cr</span></div>
                <div className="presets">{[1000000, 2500000, 5000000, 10000000].map(v => <button key={v} className={`preset${initialCorpus === v ? ' on' : ''}`} onClick={() => setInitialCorpus(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📅 Monthly Withdrawal</span><span className="pc-value">{inr(monthlyWithdrawal)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1000} max={500000} step={1000} value={monthlyWithdrawal} onChange={e => setMonthlyWithdrawal(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1000} max={500000} step={1000} value={monthlyWithdrawal} onChange={e => setMonthlyWithdrawal(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹1K</span><span className="rm">₹2.5L</span><span className="rm">₹5L</span></div>
                <div className="presets">{[10000, 20000, 30000, 50000].map(v => <button key={v} className={`preset${monthlyWithdrawal === v ? ' on' : ''}`} onClick={() => setMonthlyWithdrawal(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📈 Expected Return (p.a.)</span><span className="pc-value">{rate.toFixed(1)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={20} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1} max={20} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1%</span><span className="rm">10%</span><span className="rm">20%</span></div>
                <div className="presets">{[7, 8, 10, 12].map(v => <button key={v} className={`preset${rate === v ? ' on' : ''}`} onClick={() => setRate(v)}>{v}%</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">⏳ Withdrawal Period</span><span className="pc-value green">{years} Yrs</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={40} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={1} max={40} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1yr</span><span className="rm">20yr</span><span className="rm">40yr</span></div>
                <div className="presets">{[10, 15, 20, 25].map(v => <button key={v} className={`preset green-preset${years === v ? ' on' : ''}`} onClick={() => setYears(v)}>{v}yr</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate SWP</button>
            <button className="btn-reset" onClick={resetSwp}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">Remaining Balance</div><div className="st-val purple">{inr(Math.max(0, balance))}</div><div className="st-sub">After {years} years</div></div>
                <div className="stat-tile green"><div className="st-label">Total Withdrawn</div><div className="st-val green">{inr(totalWithdrawn)}</div></div>
                <div className="stat-tile amber"><div className="st-label">Total Interest Earned</div><div className="st-val amber">{inr(totalInterest)}</div></div>
                <div className="stat-tile blue"><div className="st-label">Sustainable Monthly Withdrawal</div><div className="st-val blue">{inr(safeWithdrawal)}</div><div className="st-sub">To exhaust corpus in {years}yrs</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function SipVsLumpsumCalculator() {
  const [total, setTotal] = useState(1_200_000)
  const [years, setYears] = useState(10)
  const [rate, setRate] = useState(12)
  const [scenario, setScenario] = useState(2)
  const resultsRef = useRef<HTMLDivElement>(null)
  const monthlyRate = rate / 100 / 12
  const months = years * 12
  const sipCorpus = total / months * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate)
  const adjustment = [0, 1.05, 0.98, 0.88][scenario]
  const lumpsumCorpus = total * (1 + rate / 100) ** years * adjustment
  const sipWins = sipCorpus > lumpsumCorpus
  const resetCompare = () => { setTotal(1_200_000); setYears(10); setRate(12); setScenario(2) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Investment Calculator</div><h1 className="page-h1">SIP vs Lumpsum Calculator</h1><p className="page-sub">Compare a monthly SIP against a one-time investment under your selected market-volatility scenario.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon purple">🔄</div><div><div className="ch-title">Enter Your Investment Details</div><div className="ch-sub">Results update instantly as you adjust the sliders</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 Total Amount to Invest</span><span className="pc-value">{inr(total)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={12000} max={100000000} step={12000} value={total} onChange={e => setTotal(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={12000} max={100000000} step={12000} value={total} onChange={e => setTotal(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹12K</span><span className="rm">₹50L</span><span className="rm">₹1Cr</span></div>
                <div className="presets">{[500000, 1200000, 2500000, 5000000].map(v => <button key={v} className={`preset${total === v ? ' on' : ''}`} onClick={() => setTotal(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📈 Expected Return (p.a.)</span><span className="pc-value">{rate.toFixed(1)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={30} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1} max={30} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1%</span><span className="rm">15%</span><span className="rm">30%</span></div>
                <div className="presets">{[8, 10, 12, 15].map(v => <button key={v} className={`preset${rate === v ? ' on' : ''}`} onClick={() => setRate(v)}>{v}%</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">⏳ Investment Duration</span><span className="pc-value green">{years} Yrs</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={30} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={1} max={30} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1yr</span><span className="rm">15yr</span><span className="rm">30yr</span></div>
                <div className="presets">{[5, 10, 15, 20].map(v => <button key={v} className={`preset green-preset${years === v ? ' on' : ''}`} onClick={() => setYears(v)}>{v}yr</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📊 Market Volatility Scenario</span><span className="pc-value">{['', 'Low', 'Moderate', 'High'][scenario]}</span></div>
                <div className="presets">{['Low', 'Moderate', 'High'].map((label, index) => <button key={label} className={`preset${scenario === index + 1 ? ' on' : ''}`} onClick={() => setScenario(index + 1)}>{label}</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Compare SIP vs Lumpsum</button>
            <button className="btn-reset" onClick={resetCompare}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">{sipWins ? 'SIP Leads By' : 'Lumpsum Leads By'}</div><div className="st-val purple">{inr(Math.abs(sipCorpus - lumpsumCorpus))}</div></div>
                <div className="stat-tile green"><div className="st-label">Monthly SIP Required</div><div className="st-val green">{inr(total / months)}</div></div>
                <div className="stat-tile amber"><div className="st-label">SIP Final Value</div><div className="st-val amber">{inr(sipCorpus)}</div></div>
                <div className="stat-tile blue"><div className="st-label">Lumpsum Final Value</div><div className="st-val blue">{inr(lumpsumCorpus)}</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function PpfCalculator() {
  const [annualDeposit, setAnnualDeposit] = useState(150_000)
  const [rate, setRate] = useState(7.1)
  const [years, setYears] = useState(15)
  const resultsRef = useRef<HTMLDivElement>(null)
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
  const resetPpf = () => { setAnnualDeposit(150_000); setRate(7.1); setYears(15) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Retirement Calculator</div><h1 className="page-h1">PPF Calculator</h1><p className="page-sub">Calculate your tax-free Public Provident Fund maturity value on annual deposits.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon green">🏛️</div><div><div className="ch-title">Enter Your PPF Details</div><div className="ch-sub">EEE tax-free · 15-year lock-in · Results update instantly</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 Annual Deposit</span><span className="pc-value">{inr(annualDeposit)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={500} max={150000} step={500} value={annualDeposit} onChange={e => setAnnualDeposit(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={500} max={150000} step={500} value={annualDeposit} onChange={e => setAnnualDeposit(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹500</span><span className="rm">₹75K</span><span className="rm">₹1.5L</span></div>
                <div className="presets">{[50000, 100000, 125000, 150000].map(v => <button key={v} className={`preset${annualDeposit === v ? ' on' : ''}`} onClick={() => setAnnualDeposit(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📈 Interest Rate (p.a.)</span><span className="pc-value">{rate.toFixed(1)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={5} max={10} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={5} max={10} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">5%</span><span className="rm">7.5%</span><span className="rm">10%</span></div>
                <div className="presets">{[7.1].map(v => <button key={v} className={`preset${rate === v ? ' on' : ''}`} onClick={() => setRate(v)}>{v}% (current)</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">⏳ Tenure (multiples of 5)</span><span className="pc-value green">{years} Yrs</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={15} max={50} step={5} value={years} onChange={e => setYears(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={15} max={50} step={5} value={years} onChange={e => setYears(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">15yr</span><span className="rm">30yr</span><span className="rm">50yr</span></div>
                <div className="presets">{[15, 20, 25, 30].map(v => <button key={v} className={`preset green-preset${years === v ? ' on' : ''}`} onClick={() => setYears(v)}>{v}yr</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate PPF Maturity</button>
            <button className="btn-reset" onClick={resetPpf}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">Maturity Value</div><div className="st-val purple">{inr(maturity)}</div><div className="st-sub">Tax-free (EEE)</div></div>
                <div className="stat-tile green"><div className="st-label">Total Deposited</div><div className="st-val green">{inr(totalDeposit)}</div></div>
                <div className="stat-tile amber"><div className="st-label">Interest Earned</div><div className="st-val amber">{inr(maturity - totalDeposit)}</div></div>
                <div className="stat-tile blue"><div className="st-label">80C Deduction/Year</div><div className="st-val blue">{inr(Math.min(annualDeposit, 150000))}</div></div>
              </div>
              <div className="card" style={{ marginTop: '16px' }}>
                <div className="card-head"><div className="ch-icon green">📅</div><div><div className="ch-title">Year-by-Year Growth</div></div></div>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="broker-wrap">
                    <table className="broker-tbl">
                      <thead><tr><th>Year</th><th>Deposited</th><th>Interest</th><th>Closing Balance</th></tr></thead>
                      <tbody>{schedule.map(row => <tr key={row.year}><td>{row.year}</td><td>{inr(row.deposited)}</td><td>{inr(row.interest)}</td><td>{inr(row.balance)}</td></tr>)}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function NationalSavingsCertificateCalculator() {
  const [principal, setPrincipal] = useState(100_000)
  const [rate, setRate] = useState(7.7)
  const resultsRef = useRef<HTMLDivElement>(null)
  const maturity = principal * (1 + rate / 100) ** 5
  const resetNsc = () => { setPrincipal(100_000); setRate(7.7) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Savings Calculator</div><h1 className="page-h1">NSC Calculator</h1><p className="page-sub">Calculate the maturity value of your National Savings Certificate investment over its 5-year term.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon green">🏅</div><div><div className="ch-title">Enter Your NSC Details</div><div className="ch-sub">5-year lock-in · 80C eligible · Results update instantly</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 Investment Amount</span><span className="pc-value">{inr(principal)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1000} max={5000000} step={1000} value={principal} onChange={e => setPrincipal(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1000} max={5000000} step={1000} value={principal} onChange={e => setPrincipal(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹1K</span><span className="rm">₹25L</span><span className="rm">₹50L</span></div>
                <div className="presets">{[50000, 100000, 150000, 500000].map(v => <button key={v} className={`preset${principal === v ? ' on' : ''}`} onClick={() => setPrincipal(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">📈 Interest Rate (p.a.)</span><span className="pc-value green">{rate.toFixed(1)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={5} max={10} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={5} max={10} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">5%</span><span className="rm">7.5%</span><span className="rm">10%</span></div>
                <div className="presets">{[7.7].map(v => <button key={v} className={`preset green-preset${rate === v ? ' on' : ''}`} onClick={() => setRate(v)}>{v}% (current)</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate NSC Maturity</button>
            <button className="btn-reset" onClick={resetNsc}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">Maturity Value (5 yrs)</div><div className="st-val purple">{inr(maturity)}</div></div>
                <div className="stat-tile green"><div className="st-label">Principal Invested</div><div className="st-val green">{inr(principal)}</div></div>
                <div className="stat-tile amber"><div className="st-label">Interest Earned</div><div className="st-val amber">{inr(maturity - principal)}</div></div>
                <div className="stat-tile blue"><div className="st-label">80C Deduction</div><div className="st-val blue">{inr(Math.min(principal, 150000))}</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function SukanyaCalculator() {
  const [annualDeposit, setAnnualDeposit] = useState(150_000)
  const [age, setAge] = useState(0)
  const resultsRef = useRef<HTMLDivElement>(null)
  const annualRate = 8.2 / 100
  const yearsToMaturity = 21 - age
  const contributionYears = Math.min(15, yearsToMaturity)
  let maturity = 0
  for (let year = 1; year <= yearsToMaturity; year += 1) {
    if (year <= contributionYears) maturity += annualDeposit
    maturity *= 1 + annualRate
  }
  const invested = annualDeposit * contributionYears
  const resetSukanya = () => { setAnnualDeposit(150_000); setAge(0) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Savings Calculator</div><h1 className="page-h1">Sukanya Samriddhi Calculator</h1><p className="page-sub">Calculate the maturity value of your girl child's Sukanya Samriddhi Yojana account at 8.2% tax-free interest.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon purple">💎</div><div><div className="ch-title">Enter Your SSY Details</div><div className="ch-sub">EEE tax-free · Matures at age 21 · Results update instantly</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 Annual Deposit</span><span className="pc-value">{inr(annualDeposit)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={250} max={150000} step={250} value={annualDeposit} onChange={e => setAnnualDeposit(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={250} max={150000} step={250} value={annualDeposit} onChange={e => setAnnualDeposit(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹250</span><span className="rm">₹75K</span><span className="rm">₹1.5L</span></div>
                <div className="presets">{[25000, 50000, 100000, 150000].map(v => <button key={v} className={`preset${annualDeposit === v ? ' on' : ''}`} onClick={() => setAnnualDeposit(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">🎂 Girl Child's Current Age</span><span className="pc-value green">{age} Yrs</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={0} max={10} step={1} value={age} onChange={e => setAge(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={0} max={10} step={1} value={age} onChange={e => setAge(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">0yr</span><span className="rm">5yr</span><span className="rm">10yr</span></div>
                <div className="presets">{[0, 2, 5, 8].map(v => <button key={v} className={`preset green-preset${age === v ? ' on' : ''}`} onClick={() => setAge(v)}>{v}yr</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate SSY Maturity</button>
            <button className="btn-reset" onClick={resetSukanya}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">Maturity Value (at 21)</div><div className="st-val purple">{inr(maturity)}</div></div>
                <div className="stat-tile green"><div className="st-label">Total Deposited</div><div className="st-val green">{inr(invested)}</div></div>
                <div className="stat-tile amber"><div className="st-label">Interest Earned</div><div className="st-val amber">{inr(maturity - invested)}</div></div>
                <div className="stat-tile blue"><div className="st-label">Years to Maturity</div><div className="st-val blue">{yearsToMaturity} years</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function NpsCalculator() {
  const [monthlyContribution, setMonthlyContribution] = useState(5_000)
  const [currentAge, setCurrentAge] = useState(30)
  const [returnRate, setReturnRate] = useState(10)
  const [annuityRate, setAnnuityRate] = useState(6)
  const resultsRef = useRef<HTMLDivElement>(null)
  const years = 60 - currentAge
  const monthlyRate = returnRate / 100 / 12
  const months = years * 12
  const corpus = monthlyContribution * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate)
  const invested = monthlyContribution * months
  const lumpSum = corpus * 0.6
  const monthlyPension = corpus * 0.4 * annuityRate / 100 / 12
  const resetNps = () => { setMonthlyContribution(5_000); setCurrentAge(30); setReturnRate(10); setAnnuityRate(6) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Retirement Calculator</div><h1 className="page-h1">NPS Calculator</h1><p className="page-sub">Estimate your National Pension System corpus, tax-free lump sum, and expected monthly pension at age 60.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon blue">🔐</div><div><div className="ch-title">Enter Your NPS Details</div><div className="ch-sub">60% tax-free lump sum · 40% mandatory annuity · Results update instantly</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 Monthly Contribution</span><span className="pc-value">{inr(monthlyContribution)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={500} max={100000} step={500} value={monthlyContribution} onChange={e => setMonthlyContribution(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={500} max={100000} step={500} value={monthlyContribution} onChange={e => setMonthlyContribution(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹500</span><span className="rm">₹50K</span><span className="rm">₹1L</span></div>
                <div className="presets">{[2000, 5000, 10000, 20000].map(v => <button key={v} className={`preset${monthlyContribution === v ? ' on' : ''}`} onClick={() => setMonthlyContribution(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">🎂 Current Age</span><span className="pc-value">{currentAge} Yrs</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={18} max={59} step={1} value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={18} max={59} step={1} value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">18</span><span className="rm">38</span><span className="rm">59</span></div>
                <div className="presets">{[25, 30, 35, 40].map(v => <button key={v} className={`preset${currentAge === v ? ' on' : ''}`} onClick={() => setCurrentAge(v)}>{v}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📈 Expected Return (p.a.)</span><span className="pc-value">{returnRate.toFixed(1)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={5} max={15} step={0.5} value={returnRate} onChange={e => setReturnRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={5} max={15} step={0.5} value={returnRate} onChange={e => setReturnRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">5%</span><span className="rm">10%</span><span className="rm">15%</span></div>
                <div className="presets">{[8, 10, 12].map(v => <button key={v} className={`preset${returnRate === v ? ' on' : ''}`} onClick={() => setReturnRate(v)}>{v}%</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">🛡️ Annuity Rate (p.a.)</span><span className="pc-value green">{annuityRate.toFixed(1)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={3} max={10} step={0.5} value={annuityRate} onChange={e => setAnnuityRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={3} max={10} step={0.5} value={annuityRate} onChange={e => setAnnuityRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">3%</span><span className="rm">6%</span><span className="rm">10%</span></div>
                <div className="presets">{[5, 6, 7].map(v => <button key={v} className={`preset green-preset${annuityRate === v ? ' on' : ''}`} onClick={() => setAnnuityRate(v)}>{v}%</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate NPS Corpus</button>
            <button className="btn-reset" onClick={resetNps}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">Corpus at Age 60</div><div className="st-val purple">{inr(corpus)}</div></div>
                <div className="stat-tile green"><div className="st-label">Total Invested</div><div className="st-val green">{inr(invested)}</div></div>
                <div className="stat-tile amber"><div className="st-label">Tax-Free Lump Sum (60%)</div><div className="st-val amber">{inr(lumpSum)}</div></div>
                <div className="stat-tile blue"><div className="st-label">Monthly Pension</div><div className="st-val blue">{inr(monthlyPension)}/mo</div><div className="st-sub">From 40% annuity corpus</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function EpfCalculator() {
  const [basic, setBasic] = useState(40_000)
  const [epfAge, setEpfAge] = useState(30)
  const [incr, setIncr] = useState(7)
  const [epfBal, setEpfBal] = useState(200_000)
  const resultsRef = useRef<HTMLDivElement>(null)

  const retAge = 58
  const years = Math.max(1, retAge - epfAge)
  const milestoneStep = Math.max(1, Math.floor(years / 4))
  let corpus = epfBal * 1.0825
  let totalContributed = 0
  let curBasic = basic
  const milestones: { age: number; val: number }[] = []
  for (let i = 0; i < years; i += 1) {
    const empContribution = curBasic * 0.12 * 12
    const erContribution = curBasic * 0.0367 * 12
    totalContributed += empContribution + erContribution
    corpus = (corpus + empContribution + erContribution) * 1.0825
    if ((i + 1) % milestoneStep === 0 || i === years - 1) milestones.push({ age: epfAge + i + 1, val: corpus })
    curBasic *= 1 + incr / 100
  }
  const interestEarned = corpus - epfBal - totalContributed
  const monthlySwp = (corpus * 0.04) / 12
  const maxMilestone = milestones[milestones.length - 1]?.val || corpus

  const resetEpf = () => { setBasic(40_000); setEpfAge(30); setIncr(7); setEpfBal(200_000) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Retirement Calculator</div><h1 className="page-h1">EPF Calculator</h1><p className="page-sub">Calculate your EPF corpus at retirement accounting for salary increments and 8.25% guaranteed returns. Understand VPF, EPS pension, and how to maximise your EPF.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon blue">🏛️</div><div><div className="ch-title">Calculate Your EPF Corpus at 58</div><div className="ch-sub">Employee + Employer contribution at 8.25% compound interest — fully tax-free</div></div></div>
          <div className="card-body">
            <div className="epf-formula-wrap">
              <div className="epf-formula-header"><div className="epf-formula-icon">📐</div><div><div className="epf-formula-title">EPF Contribution Formula</div><div className="epf-formula-sub">How your monthly EPF is calculated</div></div></div>
              <div className="epf-formula-grid">
                <div className="epf-fcard purple"><div className="epf-fcard-ico">👤</div><div className="epf-fcard-label">Employee Contribution</div><div className="epf-fcard-val">12%</div><div className="epf-fcard-desc">of Basic Salary · goes fully to EPF</div></div>
                <div className="epf-fcard green"><div className="epf-fcard-ico">🏢</div><div className="epf-fcard-label">Employer to EPF</div><div className="epf-fcard-val">3.67%</div><div className="epf-fcard-desc">of Basic · remaining 8.33% to EPS pension</div></div>
                <div className="epf-fcard amber"><div className="epf-fcard-ico">➕</div><div className="epf-fcard-label">Total Monthly EPF</div><div className="epf-fcard-val">15.67%</div><div className="epf-fcard-desc">of basic salary deposited each month</div></div>
                <div className="epf-fcard blue"><div className="epf-fcard-ico">📈</div><div className="epf-fcard-label">Interest Rate</div><div className="epf-fcard-val">8.25%</div><div className="epf-fcard-desc">p.a. compounded annually · FY 2024-25</div></div>
              </div>
              <div className="epf-eee-badge"><span className="epf-eee-icon">🛡️</span><div><strong>EEE Tax Status</strong> — Exempt · Exempt · Exempt<div style={{ fontSize: '11px', color: '#15803d', marginTop: '2px' }}>Contribution deductible (80C) · Interest tax-free · Maturity tax-free</div></div></div>
            </div>

            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💼 Basic Salary (Monthly)</span><span className="pc-value">{inr(basic)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={5000} max={500000} step={1000} value={basic} onChange={e => setBasic(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={5000} max={500000} step={1000} value={basic} onChange={e => setBasic(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹5K</span><span className="rm">₹2.5L</span><span className="rm">₹5L</span></div>
                <div className="presets">{[20000, 40000, 80000, 150000].map(v => <button key={v} className={`preset${basic === v ? ' on' : ''}`} onClick={() => setBasic(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">🎂 Current Age</span><span className="pc-value">{epfAge} yrs</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={18} max={57} step={1} value={epfAge} onChange={e => setEpfAge(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={18} max={57} step={1} value={epfAge} onChange={e => setEpfAge(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">18</span><span className="rm">38</span><span className="rm">57</span></div>
                <div className="presets">{[25, 30, 35, 40].map(v => <button key={v} className={`preset${epfAge === v ? ' on' : ''}`} onClick={() => setEpfAge(v)}>{v}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📈 Annual Salary Increment</span><span className="pc-value">{incr}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={0} max={20} step={0.5} value={incr} onChange={e => setIncr(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={0} max={20} step={0.5} value={incr} onChange={e => setIncr(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">0%</span><span className="rm">10%</span><span className="rm">20%</span></div>
                <div className="presets">{[5, 7, 10].map(v => <button key={v} className={`preset${incr === v ? ' on' : ''}`} onClick={() => setIncr(v)}>{v}%</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 Current EPF Balance</span><span className="pc-value">{inr(epfBal)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={0} max={5000000} step={50000} value={epfBal} onChange={e => setEpfBal(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={0} max={5000000} step={50000} value={epfBal} onChange={e => setEpfBal(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹0</span><span className="rm">₹25L</span><span className="rm">₹50L</span></div>
                <div className="presets">{[0, 200000, 1000000, 3000000].map(v => <button key={v} className={`preset${epfBal === v ? ' on' : ''}`} onClick={() => setEpfBal(v)}>{v === 0 ? '₹0' : inr(v)}</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>🏛️ Calculate EPF Corpus</button>
            <button className="btn-reset" onClick={resetEpf}>↺ Reset</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile blue"><div className="st-label">💎 EPF Corpus at 58</div><div className="st-val blue">{inr(corpus)}</div><div className="st-sub">Tax-free retirement corpus</div></div>
                <div className="stat-tile green"><div className="st-label">📈 Total Interest Earned</div><div className="st-val green">{inr(interestEarned)}</div><div className="st-sub">@ 8.25% p.a. compound</div></div>
                <div className="stat-tile purple"><div className="st-label">💼 Total Contributed</div><div className="st-val purple">{inr(totalContributed + epfBal)}</div><div className="st-sub">Employee + Employer (EPF share)</div></div>
                <div className="stat-tile amber"><div className="st-label">📅 Monthly Income (SWP)</div><div className="st-val amber">{inr(monthlySwp)}/mo</div><div className="st-sub">At 4% annual withdrawal rate</div></div>
              </div>
              <div className="card" style={{ marginTop: '16px' }}>
                <div className="card-head"><div className="ch-icon blue">📊</div><div><div className="ch-title">EPF Corpus Growth by Age</div></div></div>
                <div className="card-body">
                  {milestones.map(m => (
                    <div key={m.age} className="bchart-row">
                      <div className="bchart-label"><span>Age {m.age}{m.age === retAge ? ' 🎯' : ''}</span><strong>{inr(m.val)}</strong></div>
                      <div className="bchart-track"><div className="bchart-fill invested" style={{ width: `${(m.val / maxMilestone * 100).toFixed(1)}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function SeniorCitizenSavingsCalculator() {
  const [depositAmount, setDepositAmount] = useState(1_500_000)
  const [rate, setRate] = useState(8.2)
  const resultsRef = useRef<HTMLDivElement>(null)
  const years = 5
  const quarterlyInterest = depositAmount * rate / 100 / 4
  const totalInterest = quarterlyInterest * 4 * years
  const resetScss = () => { setDepositAmount(1_500_000); setRate(8.2) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Retirement Calculator</div><h1 className="page-h1">Senior Citizen Savings Scheme Calculator</h1><p className="page-sub">Calculate quarterly interest payouts from your SCSS deposit over its 5-year term.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon amber">👴</div><div><div className="ch-title">Enter Your SCSS Details</div><div className="ch-sub">5-year term · Quarterly payout · Results update instantly</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 Deposit Amount</span><span className="pc-value">{inr(depositAmount)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1000} max={3000000} step={1000} value={depositAmount} onChange={e => setDepositAmount(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1000} max={3000000} step={1000} value={depositAmount} onChange={e => setDepositAmount(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹1K</span><span className="rm">₹15L</span><span className="rm">₹30L</span></div>
                <div className="presets">{[500000, 1000000, 1500000, 3000000].map(v => <button key={v} className={`preset${depositAmount === v ? ' on' : ''}`} onClick={() => setDepositAmount(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">📈 Interest Rate (p.a.)</span><span className="pc-value green">{rate.toFixed(1)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={5} max={10} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={5} max={10} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">5%</span><span className="rm">7.5%</span><span className="rm">10%</span></div>
                <div className="presets">{[8.2].map(v => <button key={v} className={`preset green-preset${rate === v ? ' on' : ''}`} onClick={() => setRate(v)}>{v}% (current)</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate SCSS Returns</button>
            <button className="btn-reset" onClick={resetScss}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">Quarterly Payout</div><div className="st-val purple">{inr(quarterlyInterest)}</div></div>
                <div className="stat-tile green"><div className="st-label">Deposit Amount</div><div className="st-val green">{inr(depositAmount)}</div></div>
                <div className="stat-tile amber"><div className="st-label">Total Interest (5 yrs)</div><div className="st-val amber">{inr(totalInterest)}</div></div>
                <div className="stat-tile blue"><div className="st-label">Maturity Value</div><div className="st-val blue">{inr(depositAmount + totalInterest)}</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function SavingsGoalCalculator() {
  const [goalAmount, setGoalAmount] = useState(2_000_000)
  const [years, setYears] = useState(10)
  const [rate, setRate] = useState(12)
  const resultsRef = useRef<HTMLDivElement>(null)
  const monthlyRate = rate / 100 / 12
  const months = years * 12
  const requiredSip = goalAmount / ((((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate))
  const totalInvested = requiredSip * months
  const resetGoal = () => { setGoalAmount(2_000_000); setYears(10); setRate(12) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Goal Planning</div><h1 className="page-h1">Savings Goal Calculator</h1><p className="page-sub">Find the monthly SIP you need to reach a specific savings target.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon purple">🎯</div><div><div className="ch-title">Enter Your Savings Goal</div><div className="ch-sub">Results update instantly as you adjust the sliders</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">🎯 Goal Amount</span><span className="pc-value">{inr(goalAmount)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={50000} max={100000000} step={50000} value={goalAmount} onChange={e => setGoalAmount(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={50000} max={100000000} step={50000} value={goalAmount} onChange={e => setGoalAmount(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹50K</span><span className="rm">₹50L</span><span className="rm">₹10Cr</span></div>
                <div className="presets">{[1000000, 2000000, 5000000, 10000000].map(v => <button key={v} className={`preset${goalAmount === v ? ' on' : ''}`} onClick={() => setGoalAmount(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📈 Expected Return (p.a.)</span><span className="pc-value">{rate.toFixed(1)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={30} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1} max={30} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1%</span><span className="rm">15%</span><span className="rm">30%</span></div>
                <div className="presets">{[8, 10, 12, 15].map(v => <button key={v} className={`preset${rate === v ? ' on' : ''}`} onClick={() => setRate(v)}>{v}%</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">⏳ Time to Goal</span><span className="pc-value green">{years} Yrs</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={30} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={1} max={30} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1yr</span><span className="rm">15yr</span><span className="rm">30yr</span></div>
                <div className="presets">{[3, 5, 10, 15].map(v => <button key={v} className={`preset green-preset${years === v ? ' on' : ''}`} onClick={() => setYears(v)}>{v}yr</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate Required SIP</button>
            <button className="btn-reset" onClick={resetGoal}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">Monthly SIP Required</div><div className="st-val purple">{inr(requiredSip)}</div></div>
                <div className="stat-tile green"><div className="st-label">Total Invested</div><div className="st-val green">{inr(totalInvested)}</div></div>
                <div className="stat-tile amber"><div className="st-label">Estimated Returns</div><div className="st-val amber">{inr(goalAmount - totalInvested)}</div></div>
                <div className="stat-tile blue"><div className="st-label">Goal Amount</div><div className="st-val blue">{inr(goalAmount)}</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function SavingRateCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(80_000)
  const [monthlyExpenses, setMonthlyExpenses] = useState(50_000)
  const [rate, setRate] = useState(12)
  const resultsRef = useRef<HTMLDivElement>(null)
  const monthlySavings = Math.max(0, monthlyIncome - monthlyExpenses)
  const savingsRate = monthlyIncome > 0 ? (monthlySavings / monthlyIncome) * 100 : 0
  const fireNumber = monthlyExpenses * 12 * 25
  const monthlyRate = rate / 100 / 12
  let months = 0
  let corpus = 0
  while (corpus < fireNumber && months < 900) {
    corpus = (corpus + monthlySavings) * (1 + monthlyRate)
    months += 1
  }
  const yearsToFire = months / 12
  const resetSavingRate = () => { setMonthlyIncome(80_000); setMonthlyExpenses(50_000); setRate(12) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Personal Finance</div><h1 className="page-h1">Saving Rate Calculator</h1><p className="page-sub">See your savings rate and how it determines your path to financial independence (FIRE).</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon purple">🐖</div><div><div className="ch-title">Enter Your Income & Expenses</div><div className="ch-sub">Results update instantly as you adjust the sliders</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 Monthly Income</span><span className="pc-value">{inr(monthlyIncome)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={10000} max={1000000} step={1000} value={monthlyIncome} onChange={e => setMonthlyIncome(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={10000} max={1000000} step={1000} value={monthlyIncome} onChange={e => setMonthlyIncome(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹10K</span><span className="rm">₹5L</span><span className="rm">₹10L</span></div>
                <div className="presets">{[50000, 80000, 150000, 300000].map(v => <button key={v} className={`preset${monthlyIncome === v ? ' on' : ''}`} onClick={() => setMonthlyIncome(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💸 Monthly Expenses</span><span className="pc-value">{inr(monthlyExpenses)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={5000} max={1000000} step={1000} value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={5000} max={1000000} step={1000} value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹5K</span><span className="rm">₹5L</span><span className="rm">₹10L</span></div>
                <div className="presets">{[30000, 50000, 80000, 150000].map(v => <button key={v} className={`preset${monthlyExpenses === v ? ' on' : ''}`} onClick={() => setMonthlyExpenses(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">📈 Expected Return (p.a.)</span><span className="pc-value green">{rate.toFixed(1)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={20} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={1} max={20} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1%</span><span className="rm">10%</span><span className="rm">20%</span></div>
                <div className="presets">{[8, 10, 12, 15].map(v => <button key={v} className={`preset green-preset${rate === v ? ' on' : ''}`} onClick={() => setRate(v)}>{v}%</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate Savings Rate</button>
            <button className="btn-reset" onClick={resetSavingRate}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">Savings Rate</div><div className="st-val purple">{savingsRate.toFixed(1)}%</div></div>
                <div className="stat-tile green"><div className="st-label">Monthly Savings</div><div className="st-val green">{inr(monthlySavings)}</div></div>
                <div className="stat-tile amber"><div className="st-label">FIRE Number (25× expenses)</div><div className="st-val amber">{inr(fireNumber)}</div></div>
                <div className="stat-tile blue"><div className="st-label">Years to FIRE</div><div className="st-val blue">{yearsToFire >= 75 ? '75+' : yearsToFire.toFixed(1)} years</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function DailySavingsCalculator() {
  const [dailyAmount, setDailyAmount] = useState(100)
  const [years, setYears] = useState(10)
  const [rate, setRate] = useState(12)
  const resultsRef = useRef<HTMLDivElement>(null)
  const monthlyAmount = dailyAmount * 30
  const monthlyRate = rate / 100 / 12
  const months = years * 12
  const maturity = monthlyAmount * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate)
  const invested = monthlyAmount * months
  const resetDaily = () => { setDailyAmount(100); setYears(10); setRate(12) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Personal Finance</div><h1 className="page-h1">Daily Savings Calculator</h1><p className="page-sub">See how a small daily saving habit compounds into a big goal over time.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon purple">📆</div><div><div className="ch-title">Enter Your Daily Savings Details</div><div className="ch-sub">Results update instantly as you adjust the sliders</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 Daily Savings</span><span className="pc-value">{inr(dailyAmount)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={10} max={5000} step={10} value={dailyAmount} onChange={e => setDailyAmount(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={10} max={5000} step={10} value={dailyAmount} onChange={e => setDailyAmount(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹10</span><span className="rm">₹2.5K</span><span className="rm">₹5K</span></div>
                <div className="presets">{[50, 100, 200, 500].map(v => <button key={v} className={`preset${dailyAmount === v ? ' on' : ''}`} onClick={() => setDailyAmount(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📈 Expected Return (p.a.)</span><span className="pc-value">{rate.toFixed(1)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={30} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1} max={30} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1%</span><span className="rm">15%</span><span className="rm">30%</span></div>
                <div className="presets">{[8, 10, 12, 15].map(v => <button key={v} className={`preset${rate === v ? ' on' : ''}`} onClick={() => setRate(v)}>{v}%</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">⏳ Time Period</span><span className="pc-value green">{years} Yrs</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={30} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={1} max={30} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1yr</span><span className="rm">15yr</span><span className="rm">30yr</span></div>
                <div className="presets">{[5, 10, 15, 20].map(v => <button key={v} className={`preset green-preset${years === v ? ' on' : ''}`} onClick={() => setYears(v)}>{v}yr</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate Savings Growth</button>
            <button className="btn-reset" onClick={resetDaily}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">Maturity Value</div><div className="st-val purple">{inr(maturity)}</div><div className="st-sub">After {years} years</div></div>
                <div className="stat-tile green"><div className="st-label">Total Saved</div><div className="st-val green">{inr(invested)}</div></div>
                <div className="stat-tile amber"><div className="st-label">Estimated Returns</div><div className="st-val amber">{inr(maturity - invested)}</div></div>
                <div className="stat-tile blue"><div className="st-label">Monthly Equivalent</div><div className="st-val blue">{inr(monthlyAmount)}</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function StepUpSwpCalculator() {
  const [initialCorpus, setInitialCorpus] = useState(5_000_000)
  const [initialWithdrawal, setInitialWithdrawal] = useState(25_000)
  const [stepUp, setStepUp] = useState(8)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(20)
  const resultsRef = useRef<HTMLDivElement>(null)
  const monthlyRate = rate / 100 / 12
  let balance = initialCorpus
  let totalWithdrawn = 0
  let withdrawal = initialWithdrawal
  for (let year = 0; year < years && balance > 0; year += 1) {
    for (let month = 0; month < 12 && balance > 0; month += 1) {
      balance *= 1 + monthlyRate
      const actual = Math.min(withdrawal, balance)
      balance -= actual
      totalWithdrawn += actual
    }
    withdrawal *= 1 + stepUp / 100
  }
  const resetStepSwp = () => { setInitialCorpus(5_000_000); setInitialWithdrawal(25_000); setStepUp(8); setRate(10); setYears(20) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Investment Calculator</div><h1 className="page-h1">Step-Up SWP Calculator</h1><p className="page-sub">Plan growing withdrawals that increase annually — ideal for rising post-retirement expenses.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon amber">📉</div><div><div className="ch-title">Enter Your Step-Up SWP Details</div><div className="ch-sub">Results update instantly as you adjust the sliders</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 Initial Corpus</span><span className="pc-value">{inr(initialCorpus)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={100000} max={100000000} step={100000} value={initialCorpus} onChange={e => setInitialCorpus(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={100000} max={100000000} step={100000} value={initialCorpus} onChange={e => setInitialCorpus(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹1L</span><span className="rm">₹50L</span><span className="rm">₹10Cr</span></div>
                <div className="presets">{[1000000, 2500000, 5000000, 10000000].map(v => <button key={v} className={`preset${initialCorpus === v ? ' on' : ''}`} onClick={() => setInitialCorpus(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📅 Initial Monthly Withdrawal</span><span className="pc-value">{inr(initialWithdrawal)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1000} max={500000} step={1000} value={initialWithdrawal} onChange={e => setInitialWithdrawal(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1000} max={500000} step={1000} value={initialWithdrawal} onChange={e => setInitialWithdrawal(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹1K</span><span className="rm">₹2.5L</span><span className="rm">₹5L</span></div>
                <div className="presets">{[10000, 20000, 25000, 50000].map(v => <button key={v} className={`preset${initialWithdrawal === v ? ' on' : ''}`} onClick={() => setInitialWithdrawal(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">⬆️ Annual Step-Up</span><span className="pc-value">{stepUp}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={0} max={20} step={1} value={stepUp} onChange={e => setStepUp(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={0} max={20} step={1} value={stepUp} onChange={e => setStepUp(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">0%</span><span className="rm">10%</span><span className="rm">20%</span></div>
                <div className="presets">{[5, 8, 10, 12].map(v => <button key={v} className={`preset${stepUp === v ? ' on' : ''}`} onClick={() => setStepUp(v)}>{v}%</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📈 Expected Return (p.a.)</span><span className="pc-value">{rate.toFixed(1)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={20} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1} max={20} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1%</span><span className="rm">10%</span><span className="rm">20%</span></div>
                <div className="presets">{[7, 8, 10, 12].map(v => <button key={v} className={`preset${rate === v ? ' on' : ''}`} onClick={() => setRate(v)}>{v}%</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">⏳ Withdrawal Period</span><span className="pc-value green">{years} Yrs</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={40} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={1} max={40} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1yr</span><span className="rm">20yr</span><span className="rm">40yr</span></div>
                <div className="presets">{[10, 15, 20, 25].map(v => <button key={v} className={`preset green-preset${years === v ? ' on' : ''}`} onClick={() => setYears(v)}>{v}yr</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate Step-Up SWP</button>
            <button className="btn-reset" onClick={resetStepSwp}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">Remaining Balance</div><div className="st-val purple">{inr(Math.max(0, balance))}</div><div className="st-sub">After {years} years</div></div>
                <div className="stat-tile green"><div className="st-label">Total Withdrawn</div><div className="st-val green">{inr(totalWithdrawn)}</div></div>
                <div className="stat-tile amber"><div className="st-label">Final Monthly Withdrawal</div><div className="st-val amber">{inr(withdrawal)}</div></div>
                <div className="stat-tile blue"><div className="st-label">Initial Corpus</div><div className="st-val blue">{inr(initialCorpus)}</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function CagrCalculator() {
  const [initialValue, setInitialValue] = useState(100_000)
  const [finalValue, setFinalValue] = useState(250_000)
  const [years, setYears] = useState(5)
  const resultsRef = useRef<HTMLDivElement>(null)
  const cagr = initialValue > 0 ? ((finalValue / initialValue) ** (1 / years) - 1) * 100 : 0
  const absoluteReturn = initialValue > 0 ? ((finalValue - initialValue) / initialValue) * 100 : 0
  const resetCagr = () => { setInitialValue(100_000); setFinalValue(250_000); setYears(5) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Analytics Calculator</div><h1 className="page-h1">CAGR Calculator</h1><p className="page-sub">Find the true annualised growth rate between any start and end value.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon purple">📐</div><div><div className="ch-title">Enter Your Investment Values</div><div className="ch-sub">Results update instantly as you adjust the sliders</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 Initial Value</span><span className="pc-value">{inr(initialValue)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1000} max={100000000} step={1000} value={initialValue} onChange={e => setInitialValue(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1000} max={100000000} step={1000} value={initialValue} onChange={e => setInitialValue(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹1K</span><span className="rm">₹50L</span><span className="rm">₹10Cr</span></div>
                <div className="presets">{[50000, 100000, 500000, 1000000].map(v => <button key={v} className={`preset${initialValue === v ? ' on' : ''}`} onClick={() => setInitialValue(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">🏁 Final Value</span><span className="pc-value">{inr(finalValue)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1000} max={200000000} step={1000} value={finalValue} onChange={e => setFinalValue(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1000} max={200000000} step={1000} value={finalValue} onChange={e => setFinalValue(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹1K</span><span className="rm">₹1Cr</span><span className="rm">₹20Cr</span></div>
                <div className="presets">{[150000, 250000, 500000, 2000000].map(v => <button key={v} className={`preset${finalValue === v ? ' on' : ''}`} onClick={() => setFinalValue(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">⏳ Time Period</span><span className="pc-value green">{years} Yrs</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={40} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={1} max={40} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1yr</span><span className="rm">20yr</span><span className="rm">40yr</span></div>
                <div className="presets">{[3, 5, 10, 15].map(v => <button key={v} className={`preset green-preset${years === v ? ' on' : ''}`} onClick={() => setYears(v)}>{v}yr</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate CAGR</button>
            <button className="btn-reset" onClick={resetCagr}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">CAGR</div><div className="st-val purple">{cagr.toFixed(2)}%</div></div>
                <div className="stat-tile green"><div className="st-label">Absolute Return</div><div className="st-val green">{absoluteReturn.toFixed(2)}%</div></div>
                <div className="stat-tile amber"><div className="st-label">Total Growth</div><div className="st-val amber">{inr(finalValue - initialValue)}</div></div>
                <div className="stat-tile blue"><div className="st-label">Time Period</div><div className="st-val blue">{years} years</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function AnnuityCalculator() {
  const [purchaseAmount, setPurchaseAmount] = useState(5_000_000)
  const [annuityRate, setAnnuityRate] = useState(6.4)
  const [purchaseAge, setPurchaseAge] = useState(60)
  const resultsRef = useRef<HTMLDivElement>(null)
  const monthlyPension = purchaseAmount * annuityRate / 100 / 12
  const annualPension = monthlyPension * 12
  const breakevenYears = annualPension > 0 ? purchaseAmount / annualPension : 0
  const breakevenAge = purchaseAge + Math.round(breakevenYears)
  const resetAnnuity = () => { setPurchaseAmount(5_000_000); setAnnuityRate(6.4); setPurchaseAge(60) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Retirement Calculator</div><h1 className="page-h1">Annuity Calculator</h1><p className="page-sub">Calculate your guaranteed monthly pension income from an annuity purchase and find your breakeven age.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon blue">🛡️</div><div><div className="ch-title">Enter Your Annuity Details</div><div className="ch-sub">Results update instantly as you adjust the sliders</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 Annuity Purchase Amount</span><span className="pc-value">{inr(purchaseAmount)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={100000} max={20000000} step={10000} value={purchaseAmount} onChange={e => setPurchaseAmount(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={100000} max={20000000} step={10000} value={purchaseAmount} onChange={e => setPurchaseAmount(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹1L</span><span className="rm">₹1Cr</span><span className="rm">₹2Cr</span></div>
                <div className="presets">{[2500000, 5000000, 10000000, 15000000].map(v => <button key={v} className={`preset${purchaseAmount === v ? ' on' : ''}`} onClick={() => setPurchaseAmount(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📈 Annuity Rate (p.a.)</span><span className="pc-value">{annuityRate.toFixed(1)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={3} max={10} step={0.1} value={annuityRate} onChange={e => setAnnuityRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={3} max={10} step={0.1} value={annuityRate} onChange={e => setAnnuityRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">3%</span><span className="rm">6.5%</span><span className="rm">10%</span></div>
                <div className="presets">{[5.5, 6.4, 7, 8].map(v => <button key={v} className={`preset${annuityRate === v ? ' on' : ''}`} onClick={() => setAnnuityRate(v)}>{v}%</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">🎂 Purchase Age</span><span className="pc-value green">{purchaseAge} Yrs</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={45} max={80} step={1} value={purchaseAge} onChange={e => setPurchaseAge(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={45} max={80} step={1} value={purchaseAge} onChange={e => setPurchaseAge(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">45</span><span className="rm">60</span><span className="rm">80</span></div>
                <div className="presets">{[55, 60, 65, 70].map(v => <button key={v} className={`preset green-preset${purchaseAge === v ? ' on' : ''}`} onClick={() => setPurchaseAge(v)}>{v}</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate Annuity Income</button>
            <button className="btn-reset" onClick={resetAnnuity}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">Monthly Pension</div><div className="st-val purple">{inr(monthlyPension)}/mo</div></div>
                <div className="stat-tile green"><div className="st-label">Annual Pension</div><div className="st-val green">{inr(annualPension)}</div></div>
                <div className="stat-tile amber"><div className="st-label">Breakeven Period</div><div className="st-val amber">{breakevenYears.toFixed(1)} years</div></div>
                <div className="stat-tile blue"><div className="st-label">Breakeven Age</div><div className="st-val blue">{breakevenAge} years</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function RuleOf72Calculator() {
  const [rate, setRate] = useState(12)
  const resultsRef = useRef<HTMLDivElement>(null)
  const yearsToDouble = 72 / rate
  const yearsToTriple = 114 / rate
  const yearsToQuadruple = 144 / rate
  const resetRule72 = () => setRate(12)

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Analytics Calculator</div><h1 className="page-h1">Rule of 72 Calculator</h1><p className="page-sub">Instantly estimate how long it takes to double your money at any rate.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon purple">⚡</div><div><div className="ch-title">Enter Your Expected Return</div><div className="ch-sub">Results update instantly as you adjust the slider</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📈 Expected Return (p.a.)</span><span className="pc-value">{rate.toFixed(1)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={30} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1} max={30} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1%</span><span className="rm">15%</span><span className="rm">30%</span></div>
                <div className="presets">{[6, 8, 10, 12, 15].map(v => <button key={v} className={`preset${rate === v ? ' on' : ''}`} onClick={() => setRate(v)}>{v}%</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate Doubling Time</button>
            <button className="btn-reset" onClick={resetRule72}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">Years to Double</div><div className="st-val purple">{yearsToDouble.toFixed(1)} years</div></div>
                <div className="stat-tile green"><div className="st-label">Years to Triple</div><div className="st-val green">{yearsToTriple.toFixed(1)} years</div></div>
                <div className="stat-tile amber"><div className="st-label">Years to Quadruple</div><div className="st-val amber">{yearsToQuadruple.toFixed(1)} years</div></div>
                <div className="stat-tile blue"><div className="st-label">Rate Used</div><div className="st-val blue">{rate.toFixed(1)}%</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function MutualFundReturnsCalculator() {
  const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip')
  const [amount, setAmount] = useState(10_000)
  const [years, setYears] = useState(10)
  const resultsRef = useRef<HTMLDivElement>(null)
  const categories = [
    { name: 'Large-Cap', rate: 12 },
    { name: 'Flexi-Cap', rate: 13.5 },
    { name: 'Mid-Cap', rate: 15 },
    { name: 'Small-Cap', rate: 17 },
  ]
  const results = categories.map(category => {
    const monthlyRate = category.rate / 100 / 12
    const months = years * 12
    const value = investmentType === 'sip'
      ? amount * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate)
      : amount * (1 + category.rate / 100) ** years
    return { ...category, value }
  })
  const invested = investmentType === 'sip' ? amount * years * 12 : amount
  const resetMf = () => { setInvestmentType('sip'); setAmount(10_000); setYears(10) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Analytics Calculator</div><h1 className="page-h1">Mutual Fund Returns Calculator</h1><p className="page-sub">Compare expected returns across fund categories for your SIP or lumpsum investment.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon purple">🏆</div><div><div className="ch-title">Enter Your Investment Details</div><div className="ch-sub">Results update instantly as you adjust the sliders</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">🔄 Investment Type</span><span className="pc-value">{investmentType === 'sip' ? 'SIP' : 'Lumpsum'}</span></div>
                <div className="presets">{(['sip', 'lumpsum'] as const).map(t => <button key={t} className={`preset${investmentType === t ? ' on' : ''}`} onClick={() => setInvestmentType(t)}>{t === 'sip' ? 'SIP' : 'Lumpsum'}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 {investmentType === 'sip' ? 'Monthly Investment' : 'Investment Amount'}</span><span className="pc-value">{inr(amount)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={500} max={10000000} step={500} value={amount} onChange={e => setAmount(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={500} max={10000000} step={500} value={amount} onChange={e => setAmount(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹500</span><span className="rm">₹50L</span><span className="rm">₹1Cr</span></div>
                <div className="presets">{[5000, 10000, 25000, 50000].map(v => <button key={v} className={`preset${amount === v ? ' on' : ''}`} onClick={() => setAmount(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">⏳ Investment Period</span><span className="pc-value green">{years} Yrs</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={30} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={1} max={30} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1yr</span><span className="rm">15yr</span><span className="rm">30yr</span></div>
                <div className="presets">{[5, 10, 15, 20].map(v => <button key={v} className={`preset green-preset${years === v ? ' on' : ''}`} onClick={() => setYears(v)}>{v}yr</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Compare Fund Returns</button>
            <button className="btn-reset" onClick={resetMf}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile purple"><div className="st-label">Total Invested</div><div className="st-val purple">{inr(invested)}</div></div>
                <div className="stat-tile blue"><div className="st-label">Best Case ({results[results.length - 1].name})</div><div className="st-val blue">{inr(results[results.length - 1].value)}</div></div>
              </div>
              <div className="card" style={{ marginTop: '16px' }}>
                <div className="card-head"><div className="ch-icon purple">📊</div><div><div className="ch-title">Returns by Fund Category</div></div></div>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="broker-wrap">
                    <table className="broker-tbl">
                      <thead><tr><th>Category</th><th>Expected Return</th><th>Final Value</th><th>Gains</th></tr></thead>
                      <tbody>{results.map(r => <tr key={r.name}><td>{r.name}</td><td>{r.rate}%</td><td>{inr(r.value)}</td><td>{inr(r.value - invested)}</td></tr>)}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
    </>
  )
}

function InflationCalculatorPage() {
  const [currentAmount, setCurrentAmount] = useState(100_000)
  const [inflationRate, setInflationRate] = useState(6)
  const [years, setYears] = useState(10)
  const resultsRef = useRef<HTMLDivElement>(null)
  const futureCost = currentAmount * (1 + inflationRate / 100) ** years
  const purchasingPower = currentAmount / (1 + inflationRate / 100) ** years
  const resetInflation = () => { setCurrentAmount(100_000); setInflationRate(6); setYears(10) }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Personal Finance</div><h1 className="page-h1">Inflation Calculator</h1><p className="page-sub">See what your money will actually be worth after inflation erodes its purchasing power.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        <div className="card">
          <div className="card-head"><div className="ch-icon amber">🌡️</div><div><div className="ch-title">Enter Your Details</div><div className="ch-sub">Results update instantly as you adjust the sliders</div></div></div>
          <div className="card-body">
            <div className="params-grid">
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">💰 Current Amount</span><span className="pc-value">{inr(currentAmount)}</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1000} max={100000000} step={1000} value={currentAmount} onChange={e => setCurrentAmount(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1000} max={100000000} step={1000} value={currentAmount} onChange={e => setCurrentAmount(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">₹1K</span><span className="rm">₹50L</span><span className="rm">₹10Cr</span></div>
                <div className="presets">{[50000, 100000, 500000, 1000000].map(v => <button key={v} className={`preset${currentAmount === v ? ' on' : ''}`} onClick={() => setCurrentAmount(v)}>{inr(v)}</button>)}</div>
              </div>
              <div className="param-card">
                <div className="pc-top"><span className="pc-label">📈 Inflation Rate (p.a.)</span><span className="pc-value">{inflationRate.toFixed(1)}%</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={15} step={0.5} value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))} /><div className="range-wrap"><input className="slider" type="range" min={1} max={15} step={0.5} value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1%</span><span className="rm">7.5%</span><span className="rm">15%</span></div>
                <div className="presets">{[4, 6, 7, 8].map(v => <button key={v} className={`preset${inflationRate === v ? ' on' : ''}`} onClick={() => setInflationRate(v)}>{v}%</button>)}</div>
              </div>
              <div className="param-card green">
                <div className="pc-top"><span className="pc-label green">⏳ Time Period</span><span className="pc-value green">{years} Yrs</span></div>
                <div className="pc-input-row"><input className="num-input" type="number" min={1} max={40} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /><div className="range-wrap"><input className="slider green" type="range" min={1} max={40} step={1} value={years} onChange={e => setYears(Number(e.target.value))} /></div></div>
                <div className="range-marks"><span className="rm">1yr</span><span className="rm">20yr</span><span className="rm">40yr</span></div>
                <div className="presets">{[5, 10, 15, 20].map(v => <button key={v} className={`preset green-preset${years === v ? ' on' : ''}`} onClick={() => setYears(v)}>{v}yr</button>)}</div>
              </div>
            </div>

            <button className="btn-calc" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>✨ Calculate Inflation Impact</button>
            <button className="btn-reset" onClick={resetInflation}>↺ Reset to defaults</button>

            <div className="results-area show" ref={resultsRef}>
              <div className="stats-grid">
                <div className="stat-tile amber"><div className="st-label">Future Cost of Today's {inr(currentAmount)}</div><div className="st-val amber">{inr(futureCost)}</div><div className="st-sub">After {years} years</div></div>
                <div className="stat-tile purple"><div className="st-label">Purchasing Power Today</div><div className="st-val purple">{inr(purchasingPower)}</div><div className="st-sub">Of {inr(currentAmount)} in {years} years</div></div>
                <div className="stat-tile green"><div className="st-label">Value Eroded</div><div className="st-val green">{inr(currentAmount - purchasingPower)}</div></div>
                <div className="stat-tile blue"><div className="st-label">Inflation Rate Used</div><div className="st-val blue">{inflationRate.toFixed(1)}%</div></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}><Link to="/calculators" className="cta-btn-p">Browse All Calculators</Link></div>
      </div></section>
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
  if (slug === 'epf') return <EpfCalculator />
  if (slug === 'senior-citizen-savings') return <SeniorCitizenSavingsCalculator />
  if (slug === 'savings-goal') return <SavingsGoalCalculator />
  if (slug === 'saving-rate') return <SavingRateCalculator />
  if (slug === 'daily-savings') return <DailySavingsCalculator />
  if (slug === 'step-up-swp') return <StepUpSwpCalculator />
  if (slug === 'cagr') return <CagrCalculator />
  if (slug === 'annuity') return <AnnuityCalculator />
  if (slug === 'rule-of-72') return <RuleOf72Calculator />
  if (slug === 'mutual-fund-returns') return <MutualFundReturnsCalculator />
  if (slug === 'inflation') return <InflationCalculatorPage />

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
