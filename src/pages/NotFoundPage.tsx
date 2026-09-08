import { Link, useRouteError } from 'react-router-dom'

export function NotFoundPage() {
  const error = useRouteError() as { statusText?: string; message?: string } | undefined
  const detail = error?.statusText || error?.message

  return (
    <section className="sec">
      <div className="sec-inner" style={{ textAlign: 'center', padding: '80px 0' }}>
        <div className="page-eyebrow">404</div>
        <h1 className="sec-h2">Page Not Found</h1>
        <p className="sec-sub">
          {detail || "The page you're looking for doesn't exist or may have moved."}
        </p>
        <Link to="/" className="cta-btn-p">Back to Home</Link>
      </div>
    </section>
  )
}
