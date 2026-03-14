'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import InsleyGrid from '@/components/ui/InsleyGrid'

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(26,25,22,0.2)',
  padding: '12px 0',
  fontFamily: 'var(--font-cormorant)',
  fontWeight: 300,
  fontSize: '16px',
  color: 'var(--ink)',
  outline: 'none',
  transition: 'border-color 0.3s',
}

const labelStyle = {
  display: 'block',
  fontFamily: 'var(--font-cormorant)',
  fontWeight: 300,
  fontSize: '10px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  opacity: 0.4,
  marginBottom: '8px',
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Navigation />
      <main>
        {/* Header */}
        <section className="page-hero" style={{ position: 'relative', padding: '180px 48px 80px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <InsleyGrid variant="hero" opacity={0.4} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, var(--warm) 100%)' }} />
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <span style={{ display: 'inline-block', width: '28px', height: '0.5px', background: 'var(--ink)', opacity: 0.3 }} />
                <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.45 }}>Get in Touch</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.0 }}>
                Inquire About<br /><em>Your Project</em>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Contact content */}
        <section style={{ padding: '40px 48px 120px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'start' }}>
          {/* Info column */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '18px', lineHeight: 1.7, opacity: 0.65, marginBottom: '56px', maxWidth: '360px' }}>
              We work with a limited number of clients each year. If you have a project in mind, we'd like to hear about it.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {[
                { label: 'Studio', lines: ['262 NE 2nd Street', 'Miami, Florida 33132'] },
                { label: 'Email', lines: ['studio@bradyarchitecture.com'] },
                { label: 'Phone', lines: ['+1 (305) 555 0190'] },
                { label: 'Hours', lines: ['Monday – Friday', '9:00 — 18:00 EST'] },
              ].map(({ label, lines }) => (
                <div key={label}>
                  <span style={labelStyle}>{label}</span>
                  {lines.map((line, i) => (
                    <span key={i} style={{ display: 'block', fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '16px', opacity: 0.65, lineHeight: 1.6 }}>{line}</span>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            {submitted ? (
              <div style={{ padding: '64px 0' }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontStyle: 'italic', fontSize: '28px', opacity: 0.7 }}>
                  Thank you for reaching out.
                </span>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '16px', opacity: 0.5, marginTop: '16px', lineHeight: 1.7 }}>
                  We'll be in touch within two business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px' }}>
                  <div style={{ marginBottom: '40px' }}>
                    <label style={labelStyle}>First Name</label>
                    <input style={inputStyle} type="text" required placeholder="Your name" />
                  </div>
                  <div style={{ marginBottom: '40px' }}>
                    <label style={labelStyle}>Last Name</label>
                    <input style={inputStyle} type="text" required placeholder="Your surname" />
                  </div>
                </div>

                <div style={{ marginBottom: '40px' }}>
                  <label style={labelStyle}>Email</label>
                  <input style={inputStyle} type="email" required placeholder="your@email.com" />
                </div>

                <div style={{ marginBottom: '40px' }}>
                  <label style={labelStyle}>Project Type</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option>Private Residence</option>
                    <option>Condominium</option>
                    <option>Multi-unit Development</option>
                    <option>Interior Architecture</option>
                    <option>Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: '40px' }}>
                  <label style={labelStyle}>Location</label>
                  <input style={inputStyle} type="text" placeholder="City, Florida" />
                </div>

                <div style={{ marginBottom: '48px' }}>
                  <label style={labelStyle}>Tell us about your project</label>
                  <textarea
                    style={{ ...inputStyle, resize: 'none', minHeight: '120px', lineHeight: 1.65 }}
                    rows={5}
                    placeholder="Describe your vision, timeline, and budget range..."
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ cursor: 'pointer' }}>
                  Send Inquiry
                </button>
              </form>
            )}
          </motion.div>
        </section>
      </main>
      <Footer />
      <style>{`
        input::placeholder, textarea::placeholder { opacity: 0.3; }
        input:focus, textarea:focus, select:focus { border-bottom-color: rgba(26,25,22,0.6) !important; }
        @media (max-width: 900px) {
          section:last-of-type { grid-template-columns: 1fr !important; gap: 48px !important; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  )
}
