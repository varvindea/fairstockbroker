import { useEffect, useState } from 'react'

type SourcePage = {
  category: string
  path: string
  title: string
}

function sourcePageUrl(path: string) {
  return `${import.meta.env.BASE_URL}source-pages/${path.split('/').map(encodeURIComponent).join('/')}`
}

export function SourcePagesPage() {
  const [pages, setPages] = useState<SourcePage[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}source-pages/manifest.json`)
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(({ pages: sourcePages }: { pages: SourcePage[] }) => setPages(sourcePages))
      .catch(() => setError(true))
  }, [])

  const groups = pages.reduce<Record<string, SourcePage[]>>((result, page) => {
    result[page.category] ??= []
    result[page.category].push(page)
    return result
  }, {})

  return (
    <>
      <section className="page-hero-sec">
        <div className="page-hero-inner">
          <div className="page-eyebrow">Complete Website</div>
          <h1 className="page-h1">Every FairStockBrokers<br />Page in One Place</h1>
          <p className="page-sub">Browse the complete library of original calculators, broker reviews, comparison pages, guides, forms, and market tools.</p>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--white)' }}>
        <div className="sec-inner">
          {error && <p className="sec-sub">The source-page library is unavailable. Run <code>npm run sync:source-pages</code> and reload this page.</p>}
          {!error && pages.length === 0 && <p className="sec-sub">Loading the page library...</p>}
          {Object.entries(groups).map(([category, categoryPages]) => (
            <section key={category} style={{ marginBottom: '48px' }}>
              <div className="sec-eyebrow">{category}</div>
              <h2 className="sec-h2" style={{ fontSize: '26px', marginBottom: '20px' }}>{categoryPages.length} pages</h2>
              <div className="feat-grid">
                {categoryPages.map(page => (
                  <a key={page.path} href={sourcePageUrl(page.path)} className="fg-card fc-blue" style={{ textDecoration: 'none' }}>
                    <div className="fg-ico">&#128196;</div>
                    <div className="fg-title">{page.title}</div>
                    <div className="fg-desc">Open the original page</div>
                    <div className="fg-tag">View page</div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  )
}