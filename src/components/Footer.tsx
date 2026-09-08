import { Link } from 'react-router-dom'

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
            <a href="#" className="f-soc" title="Twitter">𝕏</a>
            <a href="#" className="f-soc" title="YouTube">▶</a>
            <a href="#" className="f-soc" title="Telegram">✈</a>
          </div>
        </div>

        {/* IPO */}
        <div>
          <div className="f-col-head">IPO Tracker</div>
          <div className="f-links">
            <Link to="/ipo">All IPOs</Link>
            <a href="#">Mainboard IPO</a>
            <a href="#">SME IPO</a>
            <a href="#">GMP (Grey Market)</a>
            <a href="#">IPO Calendar</a>
            <a href="#">Allotment Status</a>
          </div>
        </div>

        {/* Brokers */}
        <div>
          <div className="f-col-head">Top Brokers</div>
          <div className="f-links">
            <Link to="/brokers">All Brokers</Link>
            <a href="#">Zerodha</a>
            <a href="#">Groww</a>
            <a href="#">AngelOne</a>
            <a href="#">Upstox</a>
            <a href="#">ICICI Direct</a>
          </div>
        </div>

        {/* Calculators */}
        <div>
          <div className="f-col-head">Calculators</div>
          <div className="f-links">
            <Link to="/calculators">All Calculators</Link>
            <a href="#">SIP Calculator</a>
            <a href="#">EMI Calculator</a>
            <a href="#">CAGR Calculator</a>
            <a href="#">FD Calculator</a>
            <a href="#">Income Tax</a>
          </div>
        </div>

        {/* Company */}
        <div>
          <div className="f-col-head">Company</div>
          <div className="f-links">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Disclaimer</a>
            <a href="#">SEBI Info</a>
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

