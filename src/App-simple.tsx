import { BrowserRouter as Router } from 'react-router-dom';
import NavigationSimple from './components/sections/NavigationSimple';
import Hero from './components/sections/Hero';
import ProblemSection from './components/sections/ProblemSection';
import SolutionsSection from './components/sections/SolutionsSection';
import DidYouKnowSection from './components/sections/DidYouKnowSection';
import IntegrationsSection from './components/sections/IntegrationsSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import CTASection from './components/sections/CTASection';
import Footer from './components/sections/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationSimple />
        <Hero />
        <ProblemSection />
        <SolutionsSection />
        <DidYouKnowSection />
        <IntegrationsSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
