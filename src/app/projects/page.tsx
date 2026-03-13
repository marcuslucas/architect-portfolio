'use client'

import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ProjectGrid from '@/components/sections/ProjectGrid'
import { projects } from '@/lib/projects'

const filterMap: Record<string, string[]> = {
  Residential: ['Residence', 'Condominium'],
  Development: ['Development'],
  Commercial: ['Commercial'],
}

// Only show filter categories that have at least one matching project
const allFilters = ['All', ...Object.keys(filterMap)]
const visibleFilters = allFilters.filter(
  (f) => f === 'All' || projects.some((p) => filterMap[f]?.includes(p.type))
)

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const reducedMotion = useReducedMotion()

  const filtered = useMemo(
    () =>
      activeFilter === 'All'
        ? projects
        : projects.filter((p) => filterMap[activeFilter]?.includes(p.type) ?? false),
    [activeFilter]
  )

  return (
    <>
      <Navigation />
      <main>
        {/* Page header */}
        <section style={{ padding: '180px 56px 64px' }} className="projects-header">
          <motion.h1
            initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(48px, 7vw, 96px)',
              lineHeight: 1.0,
              color: 'var(--ink)',
            }}
          >
            Portfolio
          </motion.h1>
        </section>

        {/* Filter bar */}
        <div
          style={{
            padding: '0 56px 48px',
            display: 'flex',
            gap: '32px',
            borderBottom: '0.5px solid rgba(26,25,22,0.08)',
            overflowX: 'auto',
          }}
          className="filter-bar"
        >
          {visibleFilters.map((f) => {
            const active = activeFilter === f
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                  background: 'none',
                  border: 'none',
                  borderBottom: active ? '0.5px solid var(--ink)' : '0.5px solid transparent',
                  paddingBottom: '2px',
                  cursor: 'pointer',
                  opacity: active ? 1 : 0.35,
                  transition: 'opacity 200ms ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {f}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <section style={{ padding: '64px 56px 120px' }} className="projects-grid-section">
          <ProjectGrid projects={filtered} showViewAll={false} />
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .projects-header { padding: 140px 24px 48px !important; }
          .filter-bar { padding: 0 24px 40px !important; }
          .projects-grid-section { padding: 48px 24px 80px !important; }
        }
      `}</style>
    </>
  )
}
