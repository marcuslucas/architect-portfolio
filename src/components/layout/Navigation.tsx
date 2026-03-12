'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/process', label: 'Process' },
  { href: '/studio', label: 'Studio' },
  { href: '/journal', label: 'Journal' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 48px',
          background: scrolled
            ? 'rgba(250, 248, 244, 0.92)'
            : 'rgba(250, 248, 244, 0)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? '0.5px solid rgba(26, 25, 22, 0.08)'
            : '0.5px solid transparent',
          transition:
            'background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '14px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            textDecoration: 'none',
          }}
        >
          Alejandro Voss
        </Link>

        {/* Desktop Nav */}
        <ul
          style={{
            display: 'flex',
            gap: '40px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                  textDecoration: 'none',
                  opacity: pathname === link.href ? 1 : 0.5,
                  borderBottom:
                    pathname === link.href
                      ? '0.5px solid var(--ink)'
                      : '0.5px solid transparent',
                  paddingBottom: '2px',
                  transition: 'opacity 0.3s ease',
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link
            href="/contact"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              textDecoration: 'none',
              borderBottom: '0.5px solid rgba(26,25,22,0.4)',
              paddingBottom: '2px',
              opacity: 0.7,
              transition: 'opacity 0.3s',
            }}
            className="hidden-mobile"
          >
            Enquire
          </Link>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'none',
            }}
            className="show-mobile"
          >
            <div
              style={{
                width: '24px',
                height: '0.5px',
                background: 'var(--ink)',
                marginBottom: '7px',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: menuOpen ? 'translateY(7.5px) rotate(45deg)' : 'none',
              }}
            />
            <div
              style={{
                width: '24px',
                height: '0.5px',
                background: 'var(--ink)',
                marginBottom: '7px',
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.3s',
              }}
            />
            <div
              style={{
                width: '24px',
                height: '0.5px',
                background: 'var(--ink)',
                transition: 'transform 0.3s',
                transform: menuOpen ? 'translateY(-7.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 150,
              background: 'var(--warm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '48px',
            }}
          >
            <nav>
              {[...navLinks, { href: '/contact', label: 'Enquire' }].map(
                (link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                    style={{ marginBottom: '32px' }}
                  >
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontWeight: 300,
                        fontSize: 'clamp(32px, 8vw, 52px)',
                        color: 'var(--ink)',
                        textDecoration: 'none',
                        opacity: pathname === link.href ? 1 : 0.5,
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              )}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                position: 'absolute',
                bottom: '48px',
                left: '48px',
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                opacity: 0.3,
              }}
            >
              Miami · Naples · Palm Beach
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}
