import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', broker: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(cur => ({ ...cur, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', phone: '', broker: '', message: '' })
  }

  return (
    <>
      <section className="page-hero-sec">
        <div className="page-hero-inner">
          <div className="page-eyebrow">Open Free Demat Account</div>
          <h1 className="page-h1">Start Investing in 10 Minutes</h1>
          <p className="page-sub">Open your free demat account today — 100% online, paperless, and guided. We'll help you choose the right broker for your needs.</p>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--white)' }}>
        <div className="sec-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
            <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: '24px', padding: '36px' }}>
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--p500)', marginBottom: '8px' }}>Free Account Opening</div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.8px' }}>Get Your Personalized Broker Recommendation</div>
              </div>

              {submitted ? (
                <div style={{ padding: '32px', textAlign: 'center', background: 'var(--g50)', borderRadius: '16px', border: '1px solid var(--g200)' }}>
                  <div style={{ fontSize: '40px', marginBottom: '16px' }}>✅</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--g700)', marginBottom: '8px' }}>Thank you!</div>
                  <div style={{ fontSize: '14px', color: 'var(--ink3)' }}>We'll reach out within 24 hours to help you open your free demat account.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your full name', required: true },
                    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@example.com', required: true },
                    { label: 'Mobile Number', name: 'phone', type: 'tel', placeholder: '+91 98765 43210', required: false },
                  ].map(f => (
                    <div key={f.name} className="calc-field">
                      <label>{f.label}</label>
                      <input
                        type={f.type}
                        name={f.name}
                        value={form[f.name as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        required={f.required}
                        style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '14px', color: 'var(--ink)', outline: 'none', fontFamily: 'inherit' }}
                      />
                    </div>
                  ))}
                  <div className="calc-field">
                    <label>I currently trade with (optional)</label>
                    <select
                      name="broker"
                      value={form.broker}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '14px', color: 'var(--ink)', outline: 'none', fontFamily: 'inherit', background: '#fff' }}
                    >
                      <option value="">Select current broker</option>
                      <option>Zerodha</option><option>Groww</option><option>AngelOne</option>
                      <option>Upstox</option><option>ICICI Direct</option><option>HDFC Securities</option>
                      <option>None — first-time investor</option>
                    </select>
                  </div>
                  <div className="calc-field">
                    <label>Tell us your investing goal (optional)</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="E.g., I want to start SIP, or I want to invest in IPOs..."
                      rows={3}
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '14px', color: 'var(--ink)', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
                    />
                  </div>
                  <button type="submit" className="broker-open-btn" style={{ marginTop: '8px' }}>
                    Get Free Demat Recommendation →
                  </button>
                  <p style={{ fontSize: '11px', color: 'var(--ink4)', textAlign: 'center' }}>By submitting, you agree to our privacy policy. We'll never share your data.</p>
                </form>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: 'var(--surf1)', border: '1px solid var(--border)', borderRadius: '20px', padding: '28px' }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', marginBottom: '20px' }}>Why Open Through FairStockBrokers?</div>
                {[
                  { ico: '🆓', title: 'Completely Free Account', desc: 'No brokerage on delivery. No hidden charges. Just investing.' },
                  { ico: '⚡', title: '10-Minute Online Process', desc: '100% digital. Aadhaar-based e-KYC. No paper forms.' },
                  { ico: '🎯', title: 'Personalized Broker Match', desc: 'We match you to the best broker for your style and goals.' },
                  { ico: '📚', title: 'Free Education Support', desc: 'Access 120+ learning lessons to start investing confidently.' },
                ].map(i => (
                  <div key={i.title} style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: 'var(--p100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{i.ico}</div>
                    <div><div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)', marginBottom: '3px' }}>{i.title}</div><div style={{ fontSize: '12.5px', color: 'var(--ink3)', lineHeight: 1.5 }}>{i.desc}</div></div>
                  </div>
                ))}
              </div>

              <div style={{ background: 'linear-gradient(135deg,#d1fae5,#f0fdf4)', border: '1.5px solid var(--g200)', borderRadius: '20px', padding: '24px' }}>
                <div style={{ fontSize: '20px', marginBottom: '10px' }}>💬</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--g700)', marginBottom: '8px' }}>Prefer WhatsApp?</div>
                <div style={{ fontSize: '13px', color: 'var(--g700)', lineHeight: 1.6, marginBottom: '16px' }}>Chat with us on WhatsApp. Get instant answers about brokers and account opening.</div>
                <a href="https://wa.me" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px', background: 'var(--g500)', color: '#fff', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Open WhatsApp Chat →</a>
              </div>

              <div style={{ background: 'var(--surf1)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px' }}>Contact Info</div>
                {[{ icon: '✉️', label: 'Email', val: 'hello@fairstockbrokers.com' }, { icon: '📞', label: 'Phone', val: '+91 98765 43210' }, { icon: '⏰', label: 'Hours', val: 'Mon–Sat, 9am–6pm IST' }].map(c => (
                  <div key={c.label} style={{ display: 'flex', gap: '10px', marginBottom: '10px', fontSize: '13px', color: 'var(--ink3)' }}>
                    <span>{c.icon}</span>
                    <div><strong style={{ color: 'var(--ink)' }}>{c.label}:</strong> {c.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

