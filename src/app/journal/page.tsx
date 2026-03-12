'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import InsleyGrid from '@/components/ui/InsleyGrid'

const posts = [
  {
    date: 'September 2024',
    category: 'Essay',
    title: 'On the horizon line and the architecture of Florida',
    excerpt: 'What does it mean to design for a landscape defined by its flatness? A meditation on threshold, light, and the particular conditions of Gulf Coast architecture.',
    readTime: '8 min',
  },
  {
    date: 'June 2024',
    category: 'Project Notes',
    title: 'Casa del Horizonte: notes on a completed house',
    excerpt: 'Three years of design and construction, distilled into a series of observations on what was learned, what failed, and what succeeded beyond expectation.',
    readTime: '12 min',
  },
  {
    date: 'March 2024',
    category: 'Influence',
    title: 'Will Insley and the architecture of imagined space',
    excerpt: 'The work of Will Insley — architect, artist, planner of utopian urban models — continues to inform our practice. A look at why ONECITY matters to contemporary architectural thinking.',
    readTime: '6 min',
  },
  {
    date: 'January 2024',
    category: 'Process',
    title: 'Drawing as thinking: the role of the hand in a digital practice',
    excerpt: 'In an era of computational design, why we still begin every project with pencil on tracing paper — and what that discipline produces.',
    readTime: '5 min',
  },
]

export default function JournalPage() {
  return (
    <>
      <Navigation />
      <main>
        <section style={{ position: 'relative', padding: '180px 48px 80px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <InsleyGrid variant="hero" opacity={0.4} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, var(--warm) 100%)' }} />
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <span style={{ display: 'inline-block', width: '28px', height: '0.5px', background: 'var(--ink)', opacity: 0.3 }} />
                <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.45 }}>Writing</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.0 }}>
                Journal
              </h1>
            </motion.div>
          </div>
        </section>

        <section style={{ padding: '40px 48px 120px' }}>
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr 80px',
                gap: '40px',
                alignItems: 'baseline',
                padding: '40px 0',
                borderBottom: '0.5px solid rgba(26,25,22,0.08)',
                cursor: 'pointer',
                transition: 'opacity 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <div>
                <span style={{ display: 'block', fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.35, marginBottom: '6px' }}>{post.category}</span>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '13px', opacity: 0.4 }}>{post.date}</span>
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '22px', color: 'var(--ink)', marginBottom: '10px', lineHeight: 1.2 }}>{post.title}</h2>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '15px', lineHeight: 1.65, opacity: 0.55 }}>{post.excerpt}</p>
              </div>
              <span style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '11px', letterSpacing: '0.12em', opacity: 0.3, textAlign: 'right' }}>{post.readTime}</span>
            </motion.article>
          ))}
        </section>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          article { grid-template-columns: 1fr !important; gap: 12px !important; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  )
}
