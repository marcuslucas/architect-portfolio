'use client'

import Link from 'next/link'

const footerLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/process', label: 'Process' },
  { href: '/studio', label: 'Studio' },
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer
      style={{
        padding: '72px 48px 48px',
        borderTop: '0.5px solid rgba(26,25,22,0.1)',
        background: 'var(--warm)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1fr',
          gap: '40px',
          marginBottom: '64px',
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: '14px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              marginBottom: '12px',
            }}
          >
            Alejandro Voss
          </div>
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '15px',
              color: 'var(--ink)',
              opacity: 0.45,
              lineHeight: 1.6,
              maxWidth: '280px',
            }}
          >
            Architecture &amp; Design<br />
            Miami — Naples — Palm Beach
          </p>
        </div>

        {/* Navigation */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: '10px',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              opacity: 0.35,
              marginBottom: '20px',
            }}
          >
            Navigation
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {footerLinks.map((link) => (
              <li key={link.href} style={{ marginBottom: '10px' }}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: '15px',
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    opacity: 0.55,
                    transition: 'opacity 0.3s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.opacity = '1')
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.opacity = '0.55')
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: '10px',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              opacity: 0.35,
              marginBottom: '20px',
            }}
          >
            Studio
          </div>
          <address
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: 1.8,
              color: 'var(--ink)',
              opacity: 0.45,
            }}
          >
            262 NE 2nd Street<br />
            Miami, Florida 33132<br />
            <br />
            <a
              href="mailto:studio@vossarchitecture.com"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                borderBottom: '0.5px solid rgba(26,25,22,0.2)',
                paddingBottom: '1px',
              }}
            >
              studio@vossarchitecture.com
            </a>
            <br />
            <a
              href="tel:+13055550190"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              +1 (305) 555 0190
            </a>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '32px',
          borderTop: '0.5px solid rgba(26,25,22,0.08)',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: 'var(--ink)',
            opacity: 0.3,
          }}
        >
          © {new Date().getFullYear()} Voss Architecture. All rights reserved.
        </span>
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: '12px',
            color: 'var(--ink)',
            opacity: 0.2,
          }}
        >
          "to contain spatial situations sympathetic to the horizon line"
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div:first-child {
            grid-template-columns: 1fr !important;
          }
          footer {
            padding: 48px 24px 40px !important;
          }
        }
      `}</style>
    </footer>
  )
}
