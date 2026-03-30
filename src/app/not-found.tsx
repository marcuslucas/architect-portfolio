import Link from 'next/link'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main
        id="main-content"
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          padding: '48px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: '10px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            opacity: 0.35,
            marginBottom: '20px',
          }}
        >
          404
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 'var(--fw-heading)',
            fontStyle: 'italic',
            fontSize: 'clamp(32px, 5vw, 60px)',
            marginBottom: '28px',
          }}
        >
          Page not found
        </h1>
        <Link href="/" className="btn-outline" style={{ display: 'inline-flex' }}>
          <span
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Return Home
          </span>
          <span className="arrow-line" />
        </Link>
      </main>
      <Footer />
    </>
  )
}
