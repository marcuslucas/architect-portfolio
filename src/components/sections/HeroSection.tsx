'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import InsleyGrid from '@/components/ui/InsleyGrid'

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '680px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0 48px 72px',
      }}
    >
      {/* Background layers */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <InsleyGrid opacity={1} variant="hero" />

        {/* Vignette fade to bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(250,248,244,0) 0%, rgba(250,248,244,0) 55%, rgba(250,248,244,0.95) 100%)',
            zIndex: 2,
          }}
        />
      </div>

      {/* Glass panel — right side coordinate annotation */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '80px',
          transform: 'translateY(-50%)',
          width: '240px',
          height: '300px',
          background: 'rgba(244,241,234,0.04)',
          border: '0.5px solid rgba(26,25,22,0.1)',
          backdropFilter: 'blur(4px)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '10px',
            border: '0.5px solid rgba(26,25,22,0.06)',
          }}
        />
        {/* Coordinate annotation */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
          }}
        >
          {['N 25° 47\' 26.3"', 'W 80° 11\' 30.2"', '', 'Miami, Florida'].map(
            (line, i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontSize: '9px',
                  letterSpacing: '0.14em',
                  color: 'var(--ink)',
                  opacity: 0.3,
                  lineHeight: 1.9,
                  marginTop: i === 2 ? '8px' : 0,
                }}
              >
                {line}
              </span>
            )
          )}
        </div>
      </div>

      {/* Top-right coordinate marker — Insley annotation style */}
      <div
        style={{
          position: 'absolute',
          top: '88px',
          right: '48px',
          zIndex: 10,
          textAlign: 'right',
          pointerEvents: 'none',
        }}
      >
        {['Grid Ref. 001 — 024', 'VOSS ARCHITECTURE', 'Est. MMXI'].map(
          (text, i) => (
            <span
              key={i}
              style={{
                display: 'block',
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: '9px',
                letterSpacing: '0.14em',
                color: 'var(--ink)',
                opacity: 0.2,
                lineHeight: 1.8,
              }}
            >
              {text}
            </span>
          )
        )}
      </div>

      {/* Hero text content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '640px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '32px',
              height: '0.5px',
              background: 'var(--ink)',
              opacity: 0.35,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: '10px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              opacity: 0.5,
            }}
          >
            Contemporary Architecture · Florida
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(52px, 7vw, 96px)',
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
            marginBottom: '28px',
          }}
        >
          Space
          <br />
          <em>as intention</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '17px',
            lineHeight: 1.65,
            color: 'var(--ink)',
            opacity: 0.6,
            maxWidth: '400px',
            marginBottom: '48px',
          }}
        >
          Designing singular residences and developments where structure,
          light, and landscape converge into an enduring whole.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: 'flex', alignItems: 'center', gap: '40px' }}
        >
          <Link href="/projects" className="btn-primary">
            View Projects
          </Link>
          <Link href="/process" className="btn-outline">
            <span className="arrow-line" />
            Our Process
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          right: '48px',
          bottom: '72px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          opacity: 0.35,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '9px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
            color: 'var(--ink)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '0.5px',
            height: '48px',
            background: 'var(--ink)',
            animation: 'scrollPulse 2s infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.5); transform-origin: top; }
          50% { opacity: 0.9; transform: scaleY(1); transform-origin: top; }
        }
        @media (max-width: 768px) {
          section { padding: 0 24px 56px !important; }
          section > div:nth-child(2) { display: none !important; }
          .scroll-indicator { display: none; }
        }
      `}</style>
    </section>
  )
}
