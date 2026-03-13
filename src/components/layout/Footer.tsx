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
