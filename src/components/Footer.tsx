import { Link } from 'react-router-dom'
import { brokerReviewHref, calculatorHref } from '../data/calculatorLinks'

export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        {/* Brand */}
        <div>
          <div className="f-logo-text">Fair<span>StockBrokers</span></div>
          <p className="f-tagline">India's most complete financial platform — IPO tracking, broker intelligence, calculators, and investment education for serious investors.</p>
          <div className="f-socials">
            <a href="https://wa.me" className="f-soc" title="WhatsApp">💬</a>
            <a href="https://x.com" className="f-soc" title="Twitter">𝕏</a>
            <a href="https://www.youtube.com" className="f-soc" title="YouTube">▶</a>
            <a href="https://telegram.org" className="f-soc" title="Telegram">✈</a>
          </div>
        </div>

        {/* IPO */}
        <div>
          <div className="f-col-head">IPO Tracker</div>
          <div className="f-links">
            <Link to="/ipo">All IPOs</Link>
            <Link to="/ipo">Mainboard IPO</Link>
            <Link to="/ipo">SME IPO</Link>
            <Link to="/ipo">GMP (Grey Market)</Link>
            <Link to="/ipo">IPO Calendar</Link>
            <Link to="/ipo">Allotment Status</Link>
          </div>
        </div>

        {/* Brokers */}
        <div>
          <div className="f-col-head">Top Brokers</div>
          <div className="f-links">
            <Link to="/brokers">All Brokers</Link>
            <a href={brokerReviewHref('Zerodha')}>Zerodha</a>
            <a href={brokerReviewHref('Groww')}>Groww</a>
            <a href={brokerReviewHref('AngelOne')}>AngelOne</a>
            <a href={brokerReviewHref('Upstox')}>Upstox</a>
            <a href={brokerReviewHref('ICICI Direct')}>ICICI Direct</a>
          </div>
        </div>

        {/* Calculators */}
        <div>
          <div className="f-col-head">Calculators</div>
          <div className="f-links">
            <Link to="/calculators">All Calculators</Link>
            <a href={calculatorHref('SIP Calculator')}>SIP Calculator</a>
            <a href={calculatorHref('EMI Calculator')}>EMI Calculator</a>
            <a href={calculatorHref('CAGR Calculator')}>CAGR Calculator</a>
            <a href={calculatorHref('FD Calculator')}>FD Calculator</a>
            <a href={calculatorHref('Income Tax Calculator')}>Income Tax</a>
          </div>
        </div>

        {/* Company */}
        <div>
          <div className="f-col-head">Company</div>
          <div className="f-links">
            <Link to="/pages">All Website Pages</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">Privacy Policy</Link>
            <Link to="/about">Terms of Use</Link>
            <Link to="/about">Disclaimer</Link>
            <Link to="/about">SEBI Info</Link>
          </div>
        </div>
      </div>

      <div className="footer-disclaimer">
        <strong style={{ color: 'rgba(255,255,255,.45)' }}>Disclaimer:</strong> FairStockBrokers is an information and education platform. We are not SEBI-registered investment advisors. Information provided here is for educational purposes only and should not be construed as investment advice. Always conduct your own due diligence before making any investment decision. Past performance is not indicative of future results. Investments in securities market are subject to market risks, read all the related documents carefully before investing.
      </div>

      <div className="footer-bottom">
        <div className="fb-copy">© {new Date().getFullYear()} FairStockBrokers. All rights reserved.</div>
        <div className="fb-status">
          <span className="status-dot" />
          All systems operational
        </div>
      </div>
    </footer>
  )
}

