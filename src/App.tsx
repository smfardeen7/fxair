import Header from './components/Header'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import About from './components/About'
import CardStack from './components/CardStack'
import Founder from './components/Founder'
import Stats from './components/Stats'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <section className="py-20 lg:py-28 bg-black" aria-label="Card stack">
          <CardStack />
        </section>
        <Founder />
        <Stats />
        <Features />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <CTA />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}

export default App
