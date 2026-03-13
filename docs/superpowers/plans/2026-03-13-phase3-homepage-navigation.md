# Phase 3: Homepage & Navigation Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage, navigation, footer, and `/projects` page to match the Woodcliffe reference aesthetic — full-bleed photography, asymmetric project grid, typography-first layout.

**Architecture:** Foundation-first — Navigation and Footer rebuilt first (shared across all pages), then homepage sections assembled, then `/projects` page reuses the `ProjectGrid` component. No new dependencies; uses existing Framer Motion, Next.js Image, and next/navigation.

**Tech Stack:** Next.js 14 App Router, TypeScript, Framer Motion, Tailwind CSS (utility classes minimal — mostly inline styles per existing codebase pattern), Cormorant Garamond via CSS variable `--font-cormorant`.

**Spec:** `docs/superpowers/specs/2026-03-13-phase3-homepage-navigation-redesign.md`

**No test suite** — verification is `npm run build` (TypeScript + compilation) after each task, plus visual check in `npm run dev`.

---

## Chunk 1: Shared Infrastructure

### Task 1: Navigation.tsx

**Files:**
- Modify: `src/components/layout/Navigation.tsx`

- [ ] **Step 1: Replace Navigation.tsx with the full rebuild**

```tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const navLinks = [
  { href: '/projects', label: 'Portfolio' },
  { href: '/process', label: 'Philosophy' },
  { href: '/studio', label: 'Studio' },
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
]

// Module-level singleton — persists across route remounts in the same browser session
let navigationHasMounted = false

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled80, setScrolled80] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const reducedMotion = useReducedMotion()

  // Singleton mount flag: animates in once on first visit, skips on route changes
  const [skipInitial] = useState(() => {
    const skip = navigationHasMounted
    if (typeof window !== 'undefined') navigationHasMounted = true
    return skip
  })

  const paddingYMotion = useTransform(scrollY, [0, 80], [28, 16])

  // Reduced-motion fallback: snap padding at 80px threshold
  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled80(v > 80))
    return unsub
  }, [scrollY])

  const paddingY = reducedMotion ? (scrolled80 ? 16 : 28) : paddingYMotion

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Body scroll lock when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={skipInitial ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: paddingY,
          paddingBottom: paddingY,
          paddingLeft: '56px',
          paddingRight: '56px',
          background: 'rgba(250,248,244,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '0.5px solid rgba(26,25,22,0.08)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '13px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            textDecoration: 'none',
          }}
        >
          Dustin Brady Architecture
        </Link>

        {/* Desktop nav */}
        <ul
          style={{
            display: 'flex',
            gap: '40px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    opacity: active ? 1 : 0.55,
                    borderBottom: active ? '0.5px solid var(--stone)' : '0.5px solid transparent',
                    paddingBottom: '2px',
                    transition: 'opacity 200ms ease',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="nav-hamburger"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'none' }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '20px',
                height: '0.5px',
                background: 'var(--ink)',
                marginBottom: i < 2 ? '5px' : 0,
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform:
                  i === 0 && menuOpen ? 'translateY(5.5px) rotate(45deg)'
                  : i === 2 && menuOpen ? 'translateY(-5.5px) rotate(-45deg)'
                  : 'none',
                opacity: i === 1 && menuOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'var(--warm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '48px',
            }}
          >
            <nav style={{ textAlign: 'center' }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.4 }}
                  style={{ marginBottom: '28px' }}
                >
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontWeight: 300,
                      fontSize: '32px',
                      color: 'var(--ink)',
                      textDecoration: 'none',
                      opacity: pathname.startsWith(link.href) ? 1 : 0.5,
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div
              style={{
                position: 'absolute',
                bottom: '48px',
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                opacity: 0.3,
                color: 'var(--ink)',
              }}
            >
              Miami · Naples · Palm Beach
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
          nav[style] { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd /Users/marcuslucas/Desktop/architect-portfolio && npm run build
```

Expected: `✓ Compiled successfully` with no TypeScript errors.

- [ ] **Step 3: Visual check**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify: "Dustin Brady Architecture" logo top-left, 5 nav items top-right, glassmorphic background always visible, padding shrinks on scroll.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navigation.tsx
git commit -m "feat: rebuild Navigation — 5 links, scroll-shrink padding, singleton mount fix"
```

---

### Task 2: Footer.tsx

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Replace Footer.tsx with the full rebuild**

```tsx
'use client'

import Link from 'next/link'

const col2Links = [
  [
    { href: '/projects', label: 'Portfolio' },
    { href: '/process', label: 'Philosophy' },
    { href: '/contact', label: 'Contact' },
  ],
  [
    { href: '/studio', label: 'Studio' },
    { href: '/journal', label: 'Journal' },
  ],
]

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--warm)',
        borderTop: '0.5px solid rgba(26,25,22,0.08)',
        padding: '72px 56px 40px',
      }}
    >
      {/* Three-column grid */}
      <div
        className="footer-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1fr',
          gap: '40px',
          marginBottom: '56px',
        }}
      >
        {/* Col 1 — Brand */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: '18px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              lineHeight: 1.3,
            }}
          >
            <span style={{ display: 'block' }}>Dustin Brady</span>
            <span style={{ display: 'block' }}>Architecture</span>
          </div>
        </div>

        {/* Col 2 — Nav links (two sub-columns) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px 16px',
          }}
        >
          {col2Links.map((col, ci) => (
            <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {col.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-link"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    opacity: 0.5,
                    transition: 'opacity 200ms ease',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Col 3 — Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a
            href="mailto:info@bradyarchitecture.com"
            className="footer-link"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: '13px',
              color: 'var(--ink)',
              textDecoration: 'none',
              opacity: 0.5,
              transition: 'opacity 200ms ease',
            }}
          >
            info@bradyarchitecture.com
          </a>
          <span
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: '13px',
              color: 'var(--ink)',
              opacity: 0.5,
            }}
          >
            Miami, Florida
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          paddingTop: '32px',
          borderTop: '0.5px solid rgba(26,25,22,0.08)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '10px',
            letterSpacing: '0.18em',
            color: 'var(--ink)',
            opacity: 0.4,
          }}
        >
          © {new Date().getFullYear()} Dustin Brady Architecture
        </span>
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: '10px',
            letterSpacing: '0.18em',
            color: 'var(--ink)',
            opacity: 0.4,
          }}
        >
          "to contain spatial situations sympathetic to the horizon line."
        </span>
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '10px',
            letterSpacing: '0.18em',
            color: 'var(--ink)',
            opacity: 0.4,
          }}
        >
          Privacy
        </span>
      </div>

      <style>{`
        .footer-link:hover { opacity: 1 !important; }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          footer { padding: 48px 24px 32px !important; }
        }
      `}</style>
    </footer>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean compile.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: rebuild Footer — 3-column layout, Dustin Brady brand, bottom bar"
```

---

## Chunk 2: Hero + Tagline

### Task 3: HeroSection.tsx

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Replace HeroSection.tsx**

```tsx
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean compile.

- [ ] **Step 3: Visual check**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify: full-bleed house photo, "Dustin Brady Architecture" large text bottom-left over dark gradient, "SCROLL" indicator fades as you scroll down.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat: rebuild HeroSection — full-bleed photo, firm name, scroll fade indicator"
```

---

### Task 4: TaglineSection.tsx

**Files:**
- Create: `src/components/sections/TaglineSection.tsx`

- [ ] **Step 1: Create TaglineSection.tsx**

```tsx
'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export default function TaglineSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--warm)',
        borderTop: '0.5px solid rgba(26,25,22,0.08)',
        borderBottom: '0.5px solid rgba(26,25,22,0.08)',
        padding: '120px 56px',
      }}
      className="tagline-section"
    >
      <div
        className="tagline-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
        }}
      >
        {/* Left column — content */}
        <motion.div
          initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: 1.1,
              color: 'var(--ink)',
              marginBottom: '40px',
            }}
          >
            <span style={{ display: 'block' }}>Space</span>
            <span style={{ display: 'block' }}>as intention.</span>
          </div>

          <Link href="/studio" className="btn-outline" style={{ display: 'inline-flex' }}>
            <span className="arrow-line" />
            <span>About the Studio</span>
          </Link>
        </motion.div>

        {/* Right column — empty breathing room */}
        <div className="tagline-right" />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tagline-section { padding: 80px 24px !important; }
          .tagline-grid { grid-template-columns: 1fr !important; }
          .tagline-right { display: none !important; }
        }
      `}</style>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean compile.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/TaglineSection.tsx
git commit -m "feat: add TaglineSection — italic tagline, About Studio link, useInView fade"
```

---

## Chunk 3: ProjectGrid Component

### Task 5: ProjectGrid.tsx

**Files:**
- Create: `src/components/sections/ProjectGrid.tsx`

- [ ] **Step 1: Create ProjectGrid.tsx**

```tsx
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
              fontWeight: 300,
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
          fontWeight: 300,
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean compile.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ProjectGrid.tsx
git commit -m "feat: add ProjectGrid — asymmetric rows, hover overlay, mobile tap, zero-state"
```

---

## Chunk 4: PhilosophyBand + Homepage Assembly

### Task 6: PhilosophyBand.tsx

**Files:**
- Modify: `src/components/sections/PhilosophyBand.tsx`

- [ ] **Step 1: Replace PhilosophyBand.tsx**

```tsx
'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import InsleyGrid from '@/components/ui/InsleyGrid'

export default function PhilosophyBand() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        background: 'var(--ink)',
        padding: '120px 56px',
        overflow: 'hidden',
      }}
      className="philosophy-section"
    >
      {/* InsleyGrid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      >
        <InsleyGrid variant="dark" opacity={1} />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: reducedMotion ? 0 : 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        {/* Label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '10px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--vellum)',
            opacity: 0.4,
          }}
        >
          <span>——</span>
          <span>Philosophy</span>
        </div>

        {/* Quote */}
        <blockquote
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(28px, 4vw, 52px)',
            lineHeight: 1.3,
            color: 'var(--vellum)',
            maxWidth: '760px',
            margin: 0,
            padding: 0,
          }}
        >
          "to contain spatial situations sympathetic to the horizon line."
        </blockquote>

        {/* Attribution */}
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--vellum)',
            opacity: 0.4,
            marginTop: '32px',
          }}
        >
          — Will Insley, ONECITY Diaries
        </p>

        {/* CTA */}
        <Link
          href="/process"
          className="btn-outline"
          style={{
            marginTop: '48px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            color: 'var(--vellum)',
          }}
        >
          <span className="arrow-line" style={{ background: 'var(--vellum)' }} />
          <span>Read our Philosophy</span>
        </Link>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .philosophy-section { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean compile.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/PhilosophyBand.tsx
git commit -m "feat: rebuild PhilosophyBand — dark band, Insley quote, InsleyGrid bg"
```

---

### Task 7: page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx with 5-section assembly**

```tsx
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import TaglineSection from '@/components/sections/TaglineSection'
import ProjectGrid from '@/components/sections/ProjectGrid'
import PhilosophyBand from '@/components/sections/PhilosophyBand'
import { projects } from '@/lib/projects'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <TaglineSection />
        <section style={{ padding: '80px 56px' }} className="homepage-grid-section">
          <ProjectGrid projects={projects} showViewAll />
          <style>{`
            @media (max-width: 768px) {
              .homepage-grid-section { padding: 60px 24px !important; }
            }
          `}</style>
        </section>
        <PhilosophyBand />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean compile, `/` route is `○ (Static)`.

- [ ] **Step 3: Full visual check of homepage**

```bash
npm run dev
```

Open `http://localhost:3000`. Walk through each section:
- Hero: full-bleed photo, large firm name bottom-left, scroll indicator fades
- Tagline: "Space / as intention." italic, "About the Studio →" link
- Project grid: 2 rows, 55/43 asymmetric layout, hover reveals overlay
- Philosophy band: dark, Insley quote, InsleyGrid behind
- Footer: 3-column, correct brand name and email

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: rebuild homepage — 5 sections assembled (Hero, Tagline, Grid, Philosophy, Footer)"
```

---

## Chunk 5: /projects Page

### Task 8: /projects/page.tsx

**Files:**
- Modify: `src/app/projects/page.tsx`

- [ ] **Step 1: Replace /projects/page.tsx**

```tsx
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
            WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
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
```

- [ ] **Step 2: Fix TypeScript — `WebkitOverflowScrolling` type**

If TypeScript complains about `WebkitOverflowScrolling`, cast the style object:
```tsx
style={{
  // ...other styles
  overflowX: 'auto' as const,
  // Remove the WebkitOverflowScrolling line if it errors — it's a progressive enhancement
}}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: clean compile.

- [ ] **Step 4: Visual check of /projects**

Open `http://localhost:3000/projects`. Verify:
- "Portfolio" heading large, left-aligned
- Filter bar: "All · Residential · Development" (Commercial hidden)
- Grid: 2 asymmetric rows with hover overlays
- Clicking "Residential" shows 3 projects (2 Residence + 1 Condominium)
- Clicking "Development" shows 1 project (full-width)
- "All" restores all 4

- [ ] **Step 5: Final build and commit**

```bash
npm run build
git add src/app/projects/page.tsx
git commit -m "feat: rebuild /projects — asymmetric grid, dynamic filters, Residential/Development buckets"
```

---

## Final Verification

- [ ] **Full production build**

```bash
npm run build
```

Expected output:
```
Route (app)
┌ ○ /
├ ○ /projects
├ ƒ /projects/[slug]
├ ○ /studio
├ ○ /process
├ ○ /journal
├ ○ /contact
└ ○ /not-found
```

All routes compile without errors.

- [ ] **Cross-page nav check**

Visit `/`, `/projects`, `/studio`, `/process`, `/journal`, `/contact`. On each:
- Active nav item has underline
- "Portfolio" underlines on `/projects/house-01` slug pages
- Nav padding shrinks on scroll, background always glassmorphic
- Mobile hamburger opens overlay with 5 items at 32px

- [ ] **Final commit**

```bash
git add -A
git commit -m "feat: Phase 3 complete — homepage, nav, footer, projects page redesign"
```
