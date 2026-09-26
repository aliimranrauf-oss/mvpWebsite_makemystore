'use client'

import { useState, type FormEvent } from 'react'

declare global {
  interface Window {
    fbq?: (...args: any[]) => void
  }
}

function trackLead() {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { content_name: 'POS System Consultation' })
  }
}

const inputCls =
  'w-full rounded-lg border border-cyan-400/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition-all'

const selectCls =
  'w-full rounded-lg border border-cyan-400/15 bg-[#0d1220] px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition-all'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-widest text-cyan-400/70 mb-1.5">
      {children}
    </label>
  )
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Keep this list open-ended — "Other" always exists so no business type is
// ever blocked from submitting. Add verticals here as you take on new ones.
const businessTypes = [
  'Battery / Solar Shop',
  'Grocery / General Store',
  'Pharmacy',
  'Electronics / Mobile Shop',
  'Hardware Store',
  'Garments / Boutique',
  'Auto Parts Shop',
  'Wholesale / Distribution',
  'Other',
]

export default function LeadFormPOS() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const form = e.target as HTMLFormElement
    const data = new FormData(form)

    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()

    if (!name) {
      setError('Please enter your name.')
      return
    }
    if (!email || !EMAIL_RE.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/pos-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: data.get('phone') || null,
          businessType: data.get('businessType') || null,
          businessName: data.get('businessName') || null,
          message: data.get('message') || null,
          website: data.get('website') || '', // honeypot — real users never fill this
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Something went wrong. Please try again.')
      }

      trackLead()
      setSent(true)
      form.reset()
    } catch (err: any) {
      setError(err?.message ?? 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="lead-form" className="px-4 py-20 scroll-mt-20 border-t border-white/5">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Get a Free <span className="text-gradient">Consultation</span>
          </h2>
          <p className="text-white/70">
            Tell us about your shop — we&apos;ll reach out to scope your system and give you a clear quote.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8">
          {sent ? (
            <div className="text-center py-6">
              <p className="text-lg font-semibold text-[#00ffaa] mb-2">Thanks — we&apos;ve got your details!</p>
              <p className="text-white/70 text-sm">We&apos;ll be in touch shortly to talk through your shop&apos;s needs.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot — hidden from real users via CSS */}
              <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <input className={inputCls} type="text" name="name" placeholder="Your name" required />
                </div>
                <div>
                  <Label>Email</Label>
                  <input className={inputCls} type="email" name="email" placeholder="you@example.com" required />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Phone / WhatsApp</Label>
                  <input className={inputCls} type="tel" name="phone" placeholder="+92 3XX XXXXXXX" />
                </div>
                <div>
                  <Label>Business Type</Label>
                  <select className={selectCls} name="businessType" defaultValue="">
                    <option value="" disabled>Select your business type</option>
                    {businessTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label>Shop / Business Name</Label>
                <input className={inputCls} type="text" name="businessName" placeholder="e.g. Ali Traders" />
              </div>

              <div>
                <Label>What do you need? (optional)</Label>
                <textarea
                  className={inputCls}
                  name="message"
                  rows={4}
                  placeholder="Tell us about your shop, current process, or what's frustrating about it today."
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button type="submit" disabled={loading} className="btn-primary w-full text-center text-sm disabled:opacity-60">
                {loading ? 'Sending...' : 'Request Free Consultation'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
