'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { getProjectById, projects } from '@/lib/projects'

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const project = getProjectById(slug)
  if (!project) notFound()

  const projectIndex = projects.findIndex((p) => p.id === slug)
  const nextProject = projects[(projectIndex + 1) % projects.length]

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section
          style={{
            position: 'relative',
            height: '70vh',
            minHeight: '540px',
            overflow: 'hidden',
            background: project.coverColor,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 30%, rgba(26,25,22,0.55) 100%)',
              zIndex: 2,
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            style={{
              position: 'relative',
              zIndex: 3,
              padding: '0 48px 56px',
              color: 'var(--vellum)',
            }}
          >
            <span style={{ display: 'block', fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', opacity: 0.6, marginBottom: '12px' }}>
              {project.number} — {project.type}
            </span>
            <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.0 }}>
              {project.title}
              {project.subtitle && <><br /><em>{project.subtitle}</em></>}
            </h1>
            <span style={{ display: 'block', fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '14px', letterSpacing: '0.1em', opacity: 0.55, marginTop: '12px' }}>
              {project.location}
            </span>
          </motion.div>
        </section>

        {/* Project intro */}
        <section className="project-intro" style={{ padding: '80px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', borderBottom: '0.5px solid rgba(26,25,22,0.08)' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '22px', lineHeight: 1.6, color: 'var(--ink)' }}>
              {project.description}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '16px', lineHeight: 1.75, color: 'var(--ink)', opacity: 0.6, marginBottom: '40px' }}>
              {project.longDescription}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 32px', paddingTop: '32px', borderTop: '0.5px solid rgba(26,25,22,0.1)' }}>
              {[
                { label: 'Location', value: project.location },
                { label: 'Year', value: project.year },
                { label: 'Area', value: project.area },
                { label: 'Type', value: project.type },
                { label: 'Status', value: project.status },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.35, marginBottom: '6px' }}>{label}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '18px', color: 'var(--ink)' }}>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Photo gallery */}
        <section style={{ padding: '80px 48px' }}>
          <div className="section-label">Photography</div>
          <div className="project-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', background: 'rgba(26,25,22,0.07)' }}>
            {project.images.map((src, i) => (
              <div key={src} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: project.coverColor }}>
                <Image
                  src={src}
                  alt={`${project.title} — ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Next project */}
        <section style={{ padding: '0 48px 120px' }}>
          <div style={{ borderTop: '0.5px solid rgba(26,25,22,0.1)', paddingTop: '48px' }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', opacity: 0.35, marginBottom: '24px' }}>
              Next Project
            </span>
            <Link
              href={`/projects/${nextProject.id}`}
              className="next-project-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textDecoration: 'none',
                color: 'var(--ink)',
                padding: '32px 0',
                borderBottom: '0.5px solid rgba(26,25,22,0.1)',
                transition: 'opacity 0.3s',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(24px, 4vw, 48px)', lineHeight: 1.05 }}>
                  {nextProject.title}{nextProject.subtitle && <><br /><em>{nextProject.subtitle}</em></>}
                </div>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '13px', letterSpacing: '0.1em', opacity: 0.4 }}>
                  {nextProject.location} · {nextProject.year}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.45 }}>
                View <span style={{ display: 'inline-block', width: '40px', height: '0.5px', background: 'var(--ink)' }} />
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          .project-intro { grid-template-columns: 1fr !important; gap: 40px !important; padding-top: 48px !important; padding-bottom: 48px !important; }
          .project-gallery-grid { grid-template-columns: 1fr !important; }
          .next-project-link { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
        }
      `}</style>
    </>
  )
}
