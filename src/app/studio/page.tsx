'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import InsleyGrid from '@/components/ui/InsleyGrid'
import PhilosophyBand from '@/components/sections/PhilosophyBand'

const awards = [
  { year: '2024', title: 'AIA Florida Design Award — Residential', project: 'Casa del Horizonte' },
  { year: '2023', title: 'Architectural Record — Houses', project: 'Villa Blanca' },
  { year: '2023', title: 'Dezeen Award — Residential Interior', project: 'Coconut Grove Penthouse' },
  { year: '2022', title: 'AIA Florida Honor Award — Multi-unit', project: 'Coral Ridge Development' },
  { year: '2021', title: 'AD100 — Architects to Watch', project: 'Studio Recognition' },
]

const team = [
  { name: 'Dustin Brady', role: 'Founder · Principal', bio: 'Harvard GSD. 20 years practice. Formerly Zaha Hadid Architects and Herzog & de Meuron.' },
  { name: 'Camila Torres', role: 'Design Director', bio: 'MIT Architecture. Leads design development and client relationships across all projects.' },
  { name: 'Marcus Reid', role: 'Project Architect', bio: 'University of Florida. Specializes in high-performance coastal construction and materials.' },
  { name: 'Sofia Neves', role: 'Interior Architecture', bio: 'RISD. Oversees interior design coordination and specification across all residential projects.' },
]

export default function StudioPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* Header */}
        <section className="page-hero" style={{ position: 'relative', padding: '180px 48px 100px', overflow: 'hidden', minHeight: '520px' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <InsleyGrid variant="elevation" opacity={0.5} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, var(--warm) 100%)' }} />
          </div>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <span style={{ display: 'inline-block', width: '28px', height: '0.5px', background: 'var(--ink)', opacity: 0.3 }} />
                <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.45 }}>The Studio</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 'var(--fw-heading)', fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.0, marginBottom: '36px' }}>
                Thinking as an architect.<br /><em>Acting as an artist.</em>
              </h1>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 'var(--fw-body)', fontSize: '20px', lineHeight: 1.65, opacity: 0.6, maxWidth: '600px' }}>
                Brady Architecture is a Miami-based practice founded in 2011. We design high-end contemporary residences, luxury condominiums, and architectural developments across Florida.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Studio statement */}
        <section className="studio-statement" style={{ padding: '80px 48px', borderTop: '0.5px solid rgba(26,25,22,0.08)', borderBottom: '0.5px solid rgba(26,25,22,0.08)' }}>
          <div className="wide-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 'var(--fw-body)', fontSize: '17px', lineHeight: 1.8, opacity: 0.65 }}>
                Our approach is grounded in a single conviction: that architecture is the art of organizing space to serve the full range of human experience — not merely the functional, but the poetic, the contemplative, the quietly extraordinary.
              </p>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 'var(--fw-body)', fontSize: '17px', lineHeight: 1.8, opacity: 0.65, marginBottom: '28px' }}>
                We work selectively, with a small number of clients each year, to maintain the quality of attention that our projects require. Each commission is a sustained investigation — of site, program, and the particular life the building will frame.
              </p>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 'var(--fw-body)', fontSize: '17px', lineHeight: 1.8, opacity: 0.65 }}>
                Florida's architecture demands a specific response to its light, its landscape, and its relationship to water. We have dedicated our practice to understanding and working within these conditions.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section style={{ padding: '100px 48px' }}>
          <div className="section-label">The Team</div>
          <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5px', background: 'rgba(26,25,22,0.07)' }}>
            {team.map((member) => (
              <div key={member.name} style={{ background: 'var(--pale)', padding: '40px 32px', borderRadius: '12px' }}>
                {/* Avatar placeholder */}
                <div style={{ width: '56px', height: '56px', background: 'var(--dust)', borderRadius: '50%', marginBottom: '24px', border: '0.5px solid rgba(26,25,22,0.1)' }} />
                <div style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 'var(--fw-body)', fontSize: '20px', color: 'var(--ink)', marginBottom: '4px' }}>{member.name}</div>
                <span style={{ display: 'block', fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.38, marginBottom: '20px' }}>{member.role}</span>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 'var(--fw-body)', fontSize: '14px', lineHeight: 1.7, opacity: 0.55 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <PhilosophyBand />

        {/* Awards */}
        <section style={{ padding: '100px 48px' }}>
          <div className="wide-container">
          <div className="section-label">Recognition</div>
          <div>
            {awards.map((award, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  alignItems: 'baseline',
                  gap: '32px',
                  padding: '24px 0',
                  borderBottom: '0.5px solid rgba(26,25,22,0.08)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '12px', letterSpacing: '0.1em', opacity: 0.38 }}>{award.year}</span>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 'var(--fw-body)', fontSize: '18px', color: 'var(--ink)' }}>{award.title}</span>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 'var(--fw-body)', fontStyle: 'italic', fontSize: '15px', opacity: 0.45 }}>{award.project}</span>
              </div>
            ))}
          </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          .studio-statement .wide-container { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
