import { Link, useParams } from 'react-router-dom'
import { brokerComparisons } from '../data/brokerComparisons'
import { brokers } from '../data/brokers'

export function BrokerComparisonPage() {
  const { slug } = useParams()
  const comparison = brokerComparisons.find(item => item.slug === slug)
  const left = brokers.find(item => item.slug === comparison?.left)
  const right = brokers.find(item => item.slug === comparison?.right)

  if (!comparison || !left || !right) return <section className="sec"><div className="sec-inner" style={{ textAlign: 'center' }}><h1 className="sec-h2">Comparison Not Found</h1><Link to="/brokers" className="cta-btn-p">Compare Brokers</Link></div></section>

  const winner = comparison.winner === left.slug ? left : right
  const rows = [
    ['Broker type', left.type, right.type],
    ['Account opening', left.opening, right.opening],
    ['Equity delivery', left.delivery, right.delivery],
    ['Intraday / F&O', left.intraday, right.intraday],
    ['Annual maintenance', left.amc, right.amc],
    ['Trading platform', left.app, right.app],
    ['User rating', `${left.rating}/5`, `${right.rating}/5`],
  ]

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">Broker Comparison</div><h1 className="page-h1">{left.name} vs {right.name}</h1><p className="page-sub">Compare fees, platforms, ratings, and strengths side by side to choose the broker that fits your investing style.</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner"><div className="wealth-grid"><div className="wealth-card"><div className="wc-num">{left.rating}<sup>/5</sup></div><div className="wc-lbl">{left.name}</div></div><div className="wealth-card"><div className="wc-ico">VS</div><div className="wc-lbl">Side-by-side comparison</div></div><div className="wealth-card"><div className="wc-num">{right.rating}<sup>/5</sup></div><div className="wc-lbl">{right.name}</div></div><div className="wealth-card"><div className="wc-ico">🏆</div><div className="wc-lbl">Top match: {winner.name}</div></div></div></div></section>
      <section className="sec" style={{ background: 'var(--surf1)' }}><div className="sec-inner"><div className="sec-head"><div className="sec-eyebrow">At a Glance</div><h2 className="sec-h2">Fees and Platform Comparison</h2></div><div className="broker-wrap"><table className="broker-tbl"><thead><tr><th>Feature</th><th>{left.name}</th><th>{right.name}</th></tr></thead><tbody>{rows.map(([label, leftValue, rightValue]) => <tr key={label}><td>{label}</td><td>{leftValue}</td><td>{rightValue}</td></tr>)}</tbody></table></div></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner"><div className="sec-head"><div className="sec-eyebrow">Best Fit</div><h2 className="sec-h2">Key Strengths</h2></div><div className="calc-layout"><div className="live-calc"><div className="lc-body"><div style={{ fontSize: '17px', fontWeight: 800, marginBottom: '16px' }}>{left.name}</div>{left.pros.map(pro => <div key={pro} style={{ display: 'flex', gap: '8px', marginBottom: '10px', color: 'var(--ink3)' }}><span style={{ color: 'var(--g600)', fontWeight: 900 }}>✓</span>{pro}</div>)}</div></div><div className="live-calc"><div className="lc-body"><div style={{ fontSize: '17px', fontWeight: 800, marginBottom: '16px' }}>{right.name}</div>{right.pros.map(pro => <div key={pro} style={{ display: 'flex', gap: '8px', marginBottom: '10px', color: 'var(--ink3)' }}><span style={{ color: 'var(--g600)', fontWeight: 900 }}>✓</span>{pro}</div>)}</div></div></div><div className="cta-btns" style={{ marginTop: '36px' }}><Link to={`/brokers/${left.slug}`} className="cta-btn-p">Read {left.name} Review</Link><Link to={`/brokers/${right.slug}`} className="cta-btn-s">Read {right.name} Review</Link></div></div></section>
    </>
  )
}