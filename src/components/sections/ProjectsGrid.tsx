'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { projects, type Project } from '@/lib/projects'

export default function ProjectsGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const gridProjects = projects.filter((p) => !p.featured).slice(0, 6)

  return (
    <section ref={ref} style={{ padding: '0 48px 120px' }}>
      <div className="section-label">All Projects</div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5px',
          background: 'rgba(26,25,22,0.08)',
        }}
      >
        {gridProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Link
              href={`/projects/${project.id}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                background: 'var(--warm)',
                cursor: 'pointer',
              }}
            >
              <ProjectCard project={project} />
            </Link>
          </motion.div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '64px' }}>
        <Link href="/projects" className="btn-outline" style={{ display: 'inline-flex' }}>
          <span
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            View All Projects
          </span>
          <span className="arrow-line" />
        </Link>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          section > div { grid-template-columns: 1fr !important; }
          section { padding: 0 24px 80px !important; }
        }
      `}</style>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article>
      {/* Drawing / Image area */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '3/4',
          overflow: 'hidden',
          background: project.coverColor,
        }}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />

        {/* Hover overlay */}
        <div
          className="card-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(26,25,22,0.65) 0%, transparent 55%)',
            opacity: 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      </div>

      {/* Card info */}
      <div
        style={{
          padding: '20px 24px',
          background: 'var(--pale)',
          borderTop: '0.5px solid rgba(26,25,22,0.07)',
        }}
      >
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '9px',
            letterSpacing: '0.2em',
            opacity: 0.28,
            marginBottom: '6px',
          }}
        >
          {project.number}
        </span>
        <div
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '19px',
            color: 'var(--ink)',
            lineHeight: 1.2,
          }}
        >
          {project.title}
          {project.subtitle && (
            <em style={{ display: 'block' }}>{project.subtitle}</em>
          )}
        </div>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: 'var(--ink)',
            opacity: 0.38,
            marginTop: '4px',
          }}
        >
          {project.location} · {project.year}
        </span>
      </div>

      <style>{`
        article:hover .card-overlay { opacity: 1 !important; }
      `}</style>
    </article>
  )
}
