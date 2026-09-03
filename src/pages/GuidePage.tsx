import { Link, useParams } from 'react-router-dom'
import { guides } from '../data/guides'

export function GuidePage() {
  const { slug } = useParams()
  const guide = guides.find(item => item.slug === slug)

  if (!guide) {
    return <section className="sec"><div className="sec-inner" style={{ textAlign: 'center' }}><h1 className="sec-h2">Guide Not Found</h1><Link to="/pages" className="cta-btn-p">Browse Learning Pages</Link></div></section>
  }

  return (
    <>
      <section className="page-hero-sec"><div className="page-hero-inner"><div className="page-eyebrow">{guide.category}</div><h1 className="page-h1">{guide.title}</h1><p className="page-sub">{guide.summary}</p></div></section>
      <section className="sec" style={{ background: 'var(--white)' }}><div className="sec-inner">
        {guide.sections.map(section => <section key={section.title} style={{ marginBottom: '48px' }}><div className="sec-head"><div className="sec-eyebrow">{guide.category}</div><h2 className="sec-h2" style={{ fontSize: '30px' }}>{section.title}</h2><p className="sec-sub">{section.description}</p></div><div className="feat-grid">{section.topics.map((topic, index) => <div key={topic} className={`fg-card ${['fc-purple', 'fc-green', 'fc-amber'][index % 3]}`}><div className="fg-ico">{index + 1}</div><div className="fg-title">{topic}</div><div className="fg-desc">Practical guidance from the {guide.title.toLowerCase()}.</div></div>)}</div></section>)}
        <div style={{ textAlign: 'center' }}><Link to="/calculators" className="cta-btn-p">Explore Financial Calculators</Link></div>
      </div></section>
    </>
  )
}
