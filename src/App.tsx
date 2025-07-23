import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/sections/Navigation'
import HeroSection from './components/sections/Hero'
import DidYouKnowSection from './components/sections/DidYouKnowSection'
import SolutionsSection from './components/sections/SolutionsSection'
import TestimonialsCTAFooter from './components/sections/TestimonialsCTAFooter'
import { LoginPage, RegistrationPage, SuccessPage } from './components/auth/PulseFlowAuth';
import './App.css'

// Landing Page Component
const LandingPage: React.FC = () => (
  <div className="min-h-screen bg-white">
    <Navigation />
    <HeroSection />
    <DidYouKnowSection />
    <SolutionsSection />
    <TestimonialsCTAFooter />
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Authentication Routes */}
          <Route 
            path="/login" 
            element={
              <LoginPage 
                onNavigateToSignup={() => window.location.href = '/signup'} 
              />
            } 
          />
          <Route 
            path="/signup" 
            element={
              <RegistrationPage 
                onNavigateToLogin={() => window.location.href = '/login'}
                onNavigateToSuccess={() => window.location.href = '/success'}
              />
            } 
          />
          <Route path="/success" element={<SuccessPage />} />
          
          {/* Redirect any unknown routes to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
