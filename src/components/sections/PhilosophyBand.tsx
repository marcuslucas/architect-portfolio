'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import InsleyGrid from '@/components/ui/InsleyGrid'

export default function PhilosophyBand() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        background: 'var(--ink)',
        padding: '120px 56px',
        overflow: 'hidden',
      }}
      className="philosophy-section"
    >
      {/* InsleyGrid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      >
        <InsleyGrid variant="dark" opacity={1} />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: reducedMotion ? 0 : 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        {/* Label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '10px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--vellum)',
            opacity: 0.4,
          }}
        >
          <span>——</span>
          <span>Philosophy</span>
        </div>

        {/* Quote */}
        <blockquote
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 'var(--fw-heading)',
            fontStyle: 'italic',
            fontSize: 'clamp(28px, 4vw, 52px)',
            lineHeight: 1.3,
            color: 'var(--vellum)',
            maxWidth: '760px',
            margin: 0,
            padding: 0,
          }}
        >
          "to contain spatial situations sympathetic to the horizon line."
        </blockquote>

        {/* Attribution */}
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--vellum)',
            opacity: 0.4,
            marginTop: '32px',
          }}
        >
          — Will Insley, ONECITY Diaries
        </p>

        {/* CTA */}
        <Link
          href="/process"
          className="btn-outline"
          style={{
            marginTop: '48px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            color: 'var(--vellum)',
          }}
        >
          <span className="arrow-line" style={{ background: 'var(--vellum)' }} />
          <span>Read our Philosophy</span>
        </Link>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .philosophy-section { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  )
}
