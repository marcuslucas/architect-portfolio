'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const reducedMotion = useReducedMotion()

  const scrollOpacity = useTransform(scrollY, [0, 100], [1, 0])

  const ease = [0.25, 0.46, 0.45, 0.94] as const

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '640px',
        overflow: 'hidden',
      }}
    >
      {/* Full-bleed background image */}
      <Image
        src="/images/projects/house-01/01.JPG"
        alt="Dustin Brady Architecture"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority
      />

      {/* Gradient overlay — darkens bottom only */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(to top, rgba(26,25,22,0.55) 0%, rgba(26,25,22,0.0) 50%)',
        }}
      />

      {/* Firm name — bottom-left */}
      <div
        style={{
          position: 'absolute',
          bottom: '56px',
          left: '56px',
          zIndex: 2,
        }}
        className="hero-text"
      >
        <motion.span
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, ease }}
          style={{
            display: 'block',
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(72px, 10vw, 160px)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            color: 'var(--vellum)',
          }}
        >
          Dustin Brady
        </motion.span>

        <motion.span
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.1, ease }}
          style={{
            display: 'block',
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(72px, 10vw, 160px)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            color: 'var(--vellum)',
          }}
        >
          Architecture
        </motion.span>

        <motion.span
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.2, ease }}
          style={{
            display: 'block',
            marginTop: '16px',
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '10px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--vellum)',
            opacity: 0.6,
          }}
        >
          Contemporary Architecture · Florida
        </motion.span>
      </div>

      {/* Scroll indicator — bottom-center, fades on scroll */}
      <motion.div
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          opacity: reducedMotion ? 0.4 : scrollOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '9px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--vellum)',
            writingMode: 'vertical-rl',
          }}
        >
          Scroll
        </span>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-text { left: 24px !important; bottom: 36px !important; }
          .scroll-indicator { display: none !important; }
        }
      `}</style>
    </section>
  )
}
