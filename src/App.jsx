import FlavorGallery from './components/flavors/FlavorGallery.jsx'
import Hero from './components/sections/Hero.jsx'
import PressSection from './components/sections/PressSection.jsx'
import ProcessSection from './components/sections/ProcessSection.jsx'
import SiteFooter from './components/sections/SiteFooter.jsx'
import SiteHeader from './components/sections/SiteHeader.jsx'
import StorySection from './components/sections/StorySection.jsx'
import VisitSection from './components/sections/VisitSection.jsx'

export default function App() {
  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <FlavorGallery />
        <ProcessSection />
        <StorySection />
        <PressSection />
        <VisitSection />
      </main>
      <SiteFooter />
    </div>
  )
}
