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
    // Scroll suave al formulario de demo con offset para el header
    const demoForm = document.getElementById('demo-form')
    if (demoForm) {
      // Obtener la altura del header (64px mobile, 80px desktop/lg)
      const headerHeight = window.innerWidth >= 1024 ? 80 : 64
      
      // Obtener la posición del elemento desde la parte superior de la página
      const elementPosition = demoForm.getBoundingClientRect().top + window.pageYOffset
      
      // Calcular la posición final restando la altura del header
      const offsetPosition = elementPosition - headerHeight
      
      // Hacer scroll suave a la posición calculada
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-background text-text overflow-x-hidden w-full max-w-[100vw] box-border">
      <Header onDemoClick={handleDemoClick} />
      <Hero onDemoClick={handleDemoClick} />
      <HowItWorks />
      <Testimonials />
      <LogoCarousel />
      <DemoForm />
      <FAQs />
      <FinalCTA onDemoClick={handleDemoClick} />
      <Footer />
      <StickyCTA onDemoClick={handleDemoClick} />
    </div>
  )
}

export default App
