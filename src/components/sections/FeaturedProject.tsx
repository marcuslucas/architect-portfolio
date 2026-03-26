'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedProject } from '@/lib/projects'

export default function FeaturedProject() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const project = getFeaturedProject()

  return (
    <section
      ref={ref}
      style={{ padding: '120px 48px' }}
    >
      <div className="section-label">Selected Work · {project.year}</div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          border: '0.5px solid rgba(26,25,22,0.1)',
        }}
      >
        {/* Image / Drawing side */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'relative',
            aspectRatio: '4/3',
            overflow: 'hidden',
            background: project.coverColor,
          }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 900px) 100vw, 58vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </motion.div>

        {/* Info side */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            padding: '56px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'var(--vellum)',
            borderLeft: '0.5px solid rgba(26,25,22,0.1)',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: '10px',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                opacity: 0.45,
                display: 'block',
                marginBottom: '12px',
              }}
            >
              {project.type} · Completed {project.year}
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 'var(--fw-heading)',
                fontSize: 'clamp(28px, 3vw, 40px)',
                lineHeight: 1.05,
                color: 'var(--ink)',
                marginBottom: '8px',
              }}
            >
              {project.title}
              {project.subtitle && (
                <>
                  <br />
                  <em>{project.subtitle}</em>
                </>
              )}
            </h2>

            <span
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 'var(--fw-body)',
                fontSize: '13px',
                letterSpacing: '0.08em',
                color: 'var(--ink)',
                opacity: 0.45,
                display: 'block',
                marginBottom: '28px',
              }}
            >
              {project.location}
            </span>

            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 'var(--fw-body)',
                fontSize: '16px',
                lineHeight: 1.7,
                color: 'var(--ink)',
                opacity: 0.6,
              }}
            >
              {project.description}
            </p>

            {/* Specs grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px 28px',
                marginTop: '40px',
                paddingTop: '28px',
                borderTop: '0.5px solid rgba(26,25,22,0.1)',
              }}
            >
              {[
                { label: 'Area', value: project.area },
                { label: 'Year', value: project.year },
                { label: 'Program', value: project.type },
                { label: 'Status', value: project.status },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-cormorant)',
                      fontWeight: 300,
                      fontSize: '10px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--ink)',
                      opacity: 0.38,
                      marginBottom: '6px',
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-cormorant)',
                      fontWeight: 'var(--fw-body)',
                      fontSize: '22px',
                      color: 'var(--ink)',
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href={`/projects/${project.id}`}
            style={{
              marginTop: '48px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              textDecoration: 'none',
              color: 'var(--ink)',
            }}
            className="btn-outline"
          >
            <span
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                transition: 'opacity 0.3s',
              }}
            >
              View Full Project
            </span>
            <span className="arrow-line" />
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          section { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  )
}
