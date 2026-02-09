import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import LoginSection from '../components/LoginSection'
import TrustBar from '../components/TrustBar'
import About from '../components/About'
import CardStack from '../components/CardStack'
import Stats from '../components/Stats'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Benefits from '../components/Benefits'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'

export default function HomePage() {
  const location = useLocation()
  const scrollToId = (location.state as { scrollTo?: string } | null)?.scrollTo

  useEffect(() => {
    if (scrollToId) {
      const el = document.getElementById(scrollToId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [scrollToId])

  return (
    <main>
      <Hero />
      <LoginSection />
      <TrustBar />
      <About />
      <section className="py-20 lg:py-28 bg-black" aria-label="Card stack">
        <CardStack />
      </section>
      <Stats />
      <Features />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <CTA />
      <Pricing />
      <FAQ />
    </main>
  )
}
