import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedProject from '@/components/sections/FeaturedProject'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import PhilosophyBand from '@/components/sections/PhilosophyBand'
import ProcessSection from '@/components/sections/ProcessSection'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedProject />
        <ProjectsGrid />
        <PhilosophyBand />
        <ProcessSection />
      </main>
      <Footer />
    </>
  )
}
