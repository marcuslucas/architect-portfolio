'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Site & Vision',
    description:
      "Every commission begins with the land. We study the site's geometries, light conditions, and relationship to horizon before a single line is drawn.",
    svg: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="22" x2="44" y2="22" stroke="rgba(26,25,22,0.18)" strokeWidth="0.5" />
        <line x1="22" y1="0" x2="22" y2="44" stroke="rgba(26,25,22,0.18)" strokeWidth="0.5" />
        <circle cx="22" cy="22" r="3.5" fill="none" stroke="rgba(26,25,22,0.45)" strokeWidth="0.5" />
        <circle cx="22" cy="22" r="10" fill="none" stroke="rgba(26,25,22,0.15)" strokeWidth="0.5" />
        <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(26,25,22,0.07)" strokeWidth="0.4" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Spatial Logic',
    description:
      'We develop the organizational diagram — a rigorous spatial logic from which all form and detail will emerge. Grid, threshold, passage, void.',
    svg: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="32" height="32" stroke="rgba(26,25,22,0.14)" strokeWidth="0.5" />
        <rect x="14" y="14" width="16" height="16" stroke="rgba(26,25,22,0.35)" strokeWidth="0.5" />
        <line x1="6" y1="22" x2="38" y2="22" stroke="rgba(26,25,22,0.1)" strokeWidth="0.4" />
        <line x1="22" y1="6" x2="22" y2="38" stroke="rgba(26,25,22,0.1)" strokeWidth="0.4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Material Resolution',
    description:
      'Materials are selected for their tectonic honesty and their relationship to the Florida environment — concrete, wood, glass, and stone.',
    svg: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="22,2 42,14 42,30 22,42 2,30 2,14" stroke="rgba(26,25,22,0.14)" strokeWidth="0.5" />
        <line x1="22" y1="2" x2="22" y2="42" stroke="rgba(26,25,22,0.1)" strokeWidth="0.4" />
        <line x1="2" y1="14" x2="42" y2="14" stroke="rgba(26,25,22,0.1)" strokeWidth="0.4" />
        <line x1="2" y1="30" x2="42" y2="30" stroke="rgba(26,25,22,0.1)" strokeWidth="0.4" />
        <line x1="22" y1="2" x2="42" y2="14" stroke="rgba(26,25,22,0.22)" strokeWidth="0.5" />
        <line x1="22" y1="2" x2="2" y2="14" stroke="rgba(26,25,22,0.22)" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Built Realization',
    description:
      'We oversee construction with the same precision that governs design. Every threshold, joint, and transition is resolved before it is built.',
    svg: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="28" x2="44" y2="28" stroke="rgba(26,25,22,0.5)" strokeWidth="0.8" />
        <line x1="0" y1="22" x2="44" y2="22" stroke="rgba(26,25,22,0.12)" strokeWidth="0.4" />
        <line x1="0" y1="16" x2="44" y2="16" stroke="rgba(26,25,22,0.06)" strokeWidth="0.3" />
        <line x1="0" y1="10" x2="44" y2="10" stroke="rgba(26,25,22,0.03)" strokeWidth="0.3" />
        <line x1="22" y1="0" x2="22" y2="44" stroke="rgba(26,25,22,0.07)" strokeWidth="0.3" />
      </svg>
    ),
  },
]

export default function ProcessSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{ padding: '120px 48px', background: 'var(--pale)' }}
    >
      <div className="section-label">How We Work</div>

      <div
        className="process-grid"
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: i * 0.12,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              padding: `0 ${i < steps.length - 1 ? '40px' : '0'} 0 ${i > 0 ? '40px' : '0'}`,
              borderRight:
                i < steps.length - 1
                  ? '0.5px solid rgba(26,25,22,0.1)'
                  : 'none',
            }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: '10px',
                letterSpacing: '0.24em',
                color: 'var(--ink)',
                opacity: 0.25,
                marginBottom: '24px',
              }}
            >
              {step.number}
            </span>

            <div style={{ marginBottom: '20px' }}>{step.svg}</div>

            <h3
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: '22px',
                color: 'var(--ink)',
                marginBottom: '14px',
                lineHeight: 1.2,
              }}
            >
              {step.title}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: '14px',
                lineHeight: 1.75,
                color: 'var(--ink)',
                opacity: 0.55,
              }}
            >
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 900px) {
          .process-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 600px) {
          .process-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          section { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  )
}
