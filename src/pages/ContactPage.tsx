import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { SectionHeading } from '../components/SectionHeading'

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section className="content-section page-section">
      <div className="page-hero premium-hero">
        <div className="page-hero-copy">
          <span className="eyebrow">Contact</span>
          <h1>Let’s create a smarter investing strategy for your goals.</h1>
          <p>
            Tell us your current situation, risk appetite, and growth goals. We’ll guide
            you toward a more thoughtful investing direction.
          </p>
        </div>

        <div className="mini-panel">
          <p>Response time</p>
          <strong>Within 24 hrs</strong>
          <span>Usually same-day for priority inquiries</span>
        </div>
      </div>

      <SectionHeading eyebrow="Get in touch" title="Let’s plan your next move in the market." />

      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your investment goals"
            />
          </label>

          <button type="submit" className="primary-btn">
            Send message
          </button>
        </form>

        <div className="page-card contact-info">
          <div>
            <h3>Email us</h3>
            <a href="mailto:hello@fairstockbroker.com">hello@fairstockbroker.com</a>
          </div>
          <div>
            <h3>Call us</h3>
            <a href="tel:+919876543210">+91 98765 43210</a>
          </div>
          <div>
            <h3>Office hours</h3>
            <p>Mon - Sat : 9:00 AM - 7:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  )
}
