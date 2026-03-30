'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ProcessSection from '@/components/sections/ProcessSection'
import InsleyGrid from '@/components/ui/InsleyGrid'
import Link from 'next/link'

export default function ProcessPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* Header */}
        <section className="page-hero" style={{ position: 'relative', padding: '180px 48px 100px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <InsleyGrid variant="passage" opacity={0.5} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, var(--warm) 100%)' }} />
          </div>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <span style={{ display: 'inline-block', width: '28px', height: '0.5px', background: 'var(--ink)', opacity: 0.3 }} />
                <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.45 }}>Method</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 'var(--fw-heading)', fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.0, marginBottom: '28px' }}>
                Process &<br /><em>Philosophy</em>
              </h1>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 'var(--fw-body)', fontSize: '18px', lineHeight: 1.65, opacity: 0.6, maxWidth: '520px' }}>
                Architecture is not the product of a formula. It is the result of sustained inquiry — into place, program, and the nature of the life that will unfold within.
              </p>
            </motion.div>
          </div>
        </section>

        <ProcessSection />

        {/* Extended philosophy text */}
        <section style={{ padding: '80px 48px 120px', background: 'var(--pale)', borderTop: '0.5px solid rgba(26,25,22,0.08)' }}>
          <div className="wide-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 'var(--fw-heading)', fontStyle: 'italic', fontSize: '32px', lineHeight: 1.2, marginBottom: '28px' }}>On the nature of space</h2>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 'var(--fw-body)', fontSize: '16px', lineHeight: 1.8, opacity: 0.6 }}>
                We believe that the most important quality in architecture is not formal novelty, but spatial generosity — the capacity of a building to accommodate the full range of human mood, activity, and time. A house must be as comfortable to inhabit alone on a Tuesday morning as it is to fill with people on a Friday night.
              </p>
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 'var(--fw-heading)', fontStyle: 'italic', fontSize: '32px', lineHeight: 1.2, marginBottom: '28px' }}>On Florida architecture</h2>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 'var(--fw-body)', fontSize: '16px', lineHeight: 1.8, opacity: 0.6 }}>
                Florida's architecture demands a particular response. The quality of light here is unlike anywhere else — fierce and diffuse simultaneously, capable of dissolving mass entirely. The horizon is omnipresent. Every room is in dialogue with the sky. We design buildings that are honest about this condition.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '100px 48px', borderTop: '0.5px solid rgba(26,25,22,0.08)' }}>
          <div className="wide-container" style={{ textAlign: 'center' }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.38, marginBottom: '24px' }}>Begin a Conversation</span>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 'var(--fw-heading)', fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 52px)', marginBottom: '40px', lineHeight: 1.1 }}>
              Every project starts with a question.
            </h2>
            <Link href="/contact" className="btn-primary">
              Inquire About Your Project
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
