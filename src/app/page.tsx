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
      <main id="main-content">
        <HeroSection />
        <TaglineSection />
        <section style={{ padding: '80px 56px' }} className="homepage-grid-section">
          <h2 style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}>Portfolio</h2>
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
