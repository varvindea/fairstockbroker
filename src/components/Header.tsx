import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <header className="topbar">
      <div className="brand-wrap">
        <div className="brand-mark">F</div>
        <div>
          <span className="brand-name">FairStockBroker</span>
          <small>Smart investing starts here</small>
        </div>
      </div>

      <nav className="nav" aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/pricing">Plans</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <button type="button" className="primary-btn small-btn">
        Book a call
      </button>
    </header>
  )
}
