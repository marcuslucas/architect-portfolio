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
