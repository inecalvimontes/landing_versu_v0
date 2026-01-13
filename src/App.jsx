import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import LogoCarousel from './components/LogoCarousel'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import FAQs from './components/FAQs'
import DemoForm from './components/DemoForm'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import StickyCTA from './components/StickyCTA'

function App() {
  const handleDemoClick = () => {
    // Scroll suave al formulario de demo
    const demoForm = document.getElementById('demo-form')
    if (demoForm) {
      demoForm.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onDemoClick={handleDemoClick} />
      <Hero onDemoClick={handleDemoClick} />
      <LogoCarousel />
      <HowItWorks />
      <Testimonials />
      <DemoForm />
      <FAQs />
      <FinalCTA onDemoClick={handleDemoClick} />
      <Footer />
      <StickyCTA onDemoClick={handleDemoClick} />
    </div>
  )
}

export default App
