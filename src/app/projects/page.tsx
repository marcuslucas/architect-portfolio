'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import InsleyGrid from '@/components/ui/InsleyGrid'
import ArchDrawing from '@/components/ui/ArchDrawing'
import { projects } from '@/lib/projects'

const drawingVariants: Array<'elevation' | 'section' | 'plan' | 'isometric'> = [
  'elevation', 'section', 'plan', 'isometric', 'elevation', 'section',
]

const filters = ['All', 'Residence', 'Development', 'Condominium']

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Page header */}
        <section
          style={{
            position: 'relative',
            padding: '180px 48px 80px',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
            <InsleyGrid variant="hero" opacity={0.6} />
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 60%, var(--warm) 100%)',
            }}
          />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}
            >
              <span style={{ display: 'inline-block', width: '28px', height: '0.5px', background: 'var(--ink)', opacity: 0.3 }} />
              <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.45 }}>
                Selected Work
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.0, color: 'var(--ink)' }}
            >
              Projects
            </motion.h1>
          </div>
        </section>

        {/* Filter bar */}
        <div
          style={{
            padding: '0 48px 48px',
            display: 'flex',
            gap: '32px',
            borderBottom: '0.5px solid rgba(26,25,22,0.08)',
          }}
        >
          {filters.map((f, i) => (
            <button
              key={f}
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                opacity: i === 0 ? 1 : 0.4,
                borderBottom: i === 0 ? '0.5px solid var(--ink)' : '0.5px solid transparent',
                paddingBottom: '2px',
                transition: 'opacity 0.3s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects list */}
        <section style={{ padding: '64px 48px 120px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5px',
              background: 'rgba(26,25,22,0.07)',
            }}
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link href={`/projects/${project.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit', background: 'var(--warm)' }}>
                  <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: project.coverColor }} className="grid-bg-fine">
                    <ArchDrawing variant={drawingVariants[i % drawingVariants.length]} />
                    <div
                      className="card-overlay"
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(26,25,22,0.6) 0%, transparent 55%)',
                        opacity: 0, transition: 'opacity 0.4s',
                      }}
                    />
                  </div>
                  <div style={{ padding: '20px 24px', background: 'var(--pale)', borderTop: '0.5px solid rgba(26,25,22,0.07)' }}>
                    <span style={{ display: 'block', fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '9px', letterSpacing: '0.2em', opacity: 0.28, marginBottom: '5px' }}>{project.number}</span>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '19px', lineHeight: 1.2 }}>
                      {project.title}{project.subtitle && <em style={{ display: 'block' }}>{project.subtitle}</em>}
                    </div>
                    <span style={{ display: 'block', fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '11px', letterSpacing: '0.1em', opacity: 0.38, marginTop: '4px' }}>
                      {project.location} · {project.year}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        .card-overlay:hover, article:hover .card-overlay { opacity: 1 !important; }
        a:hover .card-overlay { opacity: 1 !important; }
        @media (max-width: 900px) { .projects-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px) { section, div[style*="padding: '64px 48px'"] { padding-left: 24px !important; padding-right: 24px !important; } }
      `}</style>
    </>
  )
}
