'use client'

import { useState, useEffect } from 'react'
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

  // Escape key closes menu
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      <motion.nav
        initial={skipInitial || reducedMotion ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="nav-bar"
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
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
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
          .nav-bar { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  )
}
