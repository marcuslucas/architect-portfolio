'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { type Project } from '@/lib/projects'

const typeMap: Record<string, string> = {
  Residence: 'Residential',
  Condominium: 'Residential',
  Development: 'Development',
  Commercial: 'Commercial',
}

const statusMap: Record<string, string> = {
  Built: 'Completed',
  'Under Construction': 'Under Construction',
  'Design Development': 'Design Development',
  Concept: 'Concept',
}

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size))
  return result
}

interface ProjectCardProps {
  project: Project
  height: string
  cardIndex: number
  inView: boolean
  reducedMotion: boolean | null
}

function ProjectCard({ project, height, cardIndex, inView, reducedMotion }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const [tapped, setTapped] = useState(false)

  const eyebrow = `${typeMap[project.type] ?? project.type} · ${statusMap[project.status] ?? project.status}`

  return (
    <motion.div
      initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion ? 0 : cardIndex * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', height, overflow: 'hidden', cursor: 'pointer' }}
      className="project-card"
    >
      <Link
        href={`/projects/${project.id}`}
        onClick={(e) => {
          // Mobile tap: first tap shows overlay, second tap navigates
          if (window.matchMedia('(hover: none)').matches) {
            if (!tapped) {
              e.preventDefault()
              setTapped(true)
            }
          }
        }}
        style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 55vw"
        />

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered || tapped ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(26,25,22,0.72)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            pointerEvents: 'none',
            padding: '24px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 'var(--fw-heading)',
              fontStyle: 'italic',
              fontSize: '28px',
              color: 'var(--vellum)',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--vellum)',
              opacity: 0.7,
              textAlign: 'center',
            }}
          >
            {eyebrow}
          </span>
          <span
            className="btn-outline"
            style={{
              color: 'var(--vellum)',
              opacity: 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '4px',
            }}
          >
            <span
              className="arrow-line"
              style={{ background: 'var(--vellum)' }}
            />
            <span>View Project</span>
          </span>
        </motion.div>
      </Link>
    </motion.div>
  )
}

interface ProjectGridProps {
  projects: Project[]
  showViewAll?: boolean
}

export default function ProjectGrid({ projects, showViewAll }: ProjectGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()

  const rows = chunk(projects, 2)

  if (projects.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '80px 0',
          fontFamily: 'var(--font-cormorant)',
          fontWeight: 'var(--fw-body)',
          fontSize: '14px',
          color: 'var(--ink)',
          opacity: 0.4,
        }}
      >
        No projects in this category
      </div>
    )
  }

  return (
    <div>
      <div
        ref={ref}
        style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}
        className="project-grid"
      >
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: 'grid',
              gridTemplateColumns: row.length === 1 ? '1fr' : '55fr 43fr',
              gap: '3px',
            }}
            className="project-grid-row"
          >
            {row.map((project, colIndex) => {
              const cardIndex = rowIndex * 2 + colIndex
              const height = rowIndex === 0 ? '62vh' : '44vh'
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  height={height}
                  cardIndex={cardIndex}
                  inView={inView}
                  reducedMotion={reducedMotion}
                />
              )
            })}
          </div>
        ))}
      </div>

      {showViewAll && (
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link
            href="/projects"
            className="btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}
          >
            <span className="arrow-line" />
            <span>All Projects</span>
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .project-grid-row { grid-template-columns: 1fr !important; }
          .project-card { height: 56vw !important; }
        }
      `}</style>
    </div>
  )
}
