import Header from './components/Header'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import About from './components/About'
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
