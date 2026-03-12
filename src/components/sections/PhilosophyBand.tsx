'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import InsleyGrid from '@/components/ui/InsleyGrid'

export default function PhilosophyBand() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        padding: '120px 48px',
        background: 'var(--ink)',
        overflow: 'hidden',
      }}
    >
      {/* Insley-inspired diagonal background */}
      <InsleyGrid opacity={0.07} variant="dark" />

      {/* Fine grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(244,241,234,0.025) 79px, rgba(244,241,234,0.025) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(244,241,234,0.025) 79px, rgba(244,241,234,0.025) 80px)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
      >
        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: 'clamp(24px, 3vw, 44px)',
            lineHeight: 1.3,
            color: 'var(--vellum)',
            letterSpacing: '-0.02em',
            borderLeft: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          "The architect must think as an artist — and measure whatever spaces are sensed lurking in the crevices of observation."
        </motion.blockquote>

        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: 1.75,
              color: 'var(--vellum)',
              opacity: 0.6,
            }}
          >
            Every project begins with the same question: what is the irreducible
            spatial truth of this place? Not what can be built, but what must be
            built. Form follows the logic of land, light, and the life that will
            unfold within.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: 1.75,
              color: 'var(--vellum)',
              opacity: 0.6,
            }}
          >
            Our practice is grounded in the particular qualities of Florida
            architecture — the light that dissolves mass, the horizon that
            commands every room, the passage between inside and outside.
          </p>
          <span
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--vellum)',
              opacity: 0.3,
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '24px',
                height: '0.5px',
                background: 'var(--vellum)',
                opacity: 0.3,
              }}
            />
            Dustin Brady, Founder
          </span>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          section { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  )
}
