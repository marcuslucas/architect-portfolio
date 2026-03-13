'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export default function TaglineSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--warm)',
        borderTop: '0.5px solid rgba(26,25,22,0.08)',
        borderBottom: '0.5px solid rgba(26,25,22,0.08)',
        padding: '120px 56px',
      }}
      className="tagline-section"
    >
      <div
        className="tagline-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
        }}
      >
        {/* Left column — content */}
        <motion.div
          initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: 1.1,
              color: 'var(--ink)',
              marginBottom: '40px',
            }}
          >
            <span style={{ display: 'block' }}>Space</span>
            <span style={{ display: 'block' }}>as intention.</span>
          </div>

          <Link href="/studio" className="btn-outline" style={{ display: 'inline-flex' }}>
            <span className="arrow-line" />
            <span>About the Studio</span>
          </Link>
        </motion.div>

        {/* Right column — empty breathing room */}
        <div className="tagline-right" />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tagline-section { padding: 80px 24px !important; }
          .tagline-grid { grid-template-columns: 1fr !important; }
          .tagline-right { display: none !important; }
        }
      `}</style>
    </section>
  )
}
