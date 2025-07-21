import Navigation from './components/sections/Navigation'
import HeroSection from './components/sections/Hero'
import DidYouKnowSection from './components/sections/DidYouKnowSection'
import SolutionsSection from './components/sections/SolutionsSection'
import TestimonialsCTAFooter from './components/sections/TestimonialsCTAFooter'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <DidYouKnowSection />
      <SolutionsSection />
      <TestimonialsCTAFooter />
    </div>
  )
}

export default App
