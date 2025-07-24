import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/sections/Navigation';
import Hero from './components/sections/Hero';
import ProblemSection from './components/sections/ProblemSection';
import SolutionsSection from './components/sections/SolutionsSection';
import DidYouKnowSection from './components/sections/DidYouKnowSection';
import IntegrationsSection from './components/sections/IntegrationsSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import CTASection from './components/sections/CTASection';
import Footer from './components/sections/Footer';
import PulseFlowAuth from './components/auth/PulseFlowAuth';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/auth/*" element={<PulseFlowAuth />} />
            <Route path="/*" element={
              <>
                <Navigation />
                <Hero />
                <ProblemSection />
                <SolutionsSection />
                <DidYouKnowSection />
                <IntegrationsSection />
                <TestimonialsSection />
                <CTASection />
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
