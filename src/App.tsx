import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navigation from './components/sections/Navigation'
import HeroSection from './components/sections/Hero'
import DidYouKnowSection from './components/sections/DidYouKnowSection'
import SolutionsSection from './components/sections/SolutionsSection'
import TestimonialsCTAFooter from './components/sections/TestimonialsCTAFooter'
import { LoginPage, RegistrationPage, SuccessPage } from './components/auth/PulseFlowAuth';
import { AuthProvider, ProtectedRoute } from './contexts/AuthContext';
import DebugPanel from './components/debug/DebugPanel';
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

// Wrapper components to handle navigation with React Router
const LoginPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  return (
    <LoginPage 
      onNavigateToSignup={() => navigate('/signup')} 
    />
  );
};

const RegistrationPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  return (
    <RegistrationPage 
      onNavigateToLogin={() => navigate('/login')}
      onNavigateToSuccess={() => navigate('/success')}
    />
  );
};

function App() {
  const [showDebug, setShowDebug] = useState(false);

  // Add keyboard shortcut: Ctrl+Shift+D to toggle debug
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setShowDebug(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<LoginPageWrapper />} />
            <Route path="/signup" element={<RegistrationPageWrapper />} />
            
            {/* Protected Success Page - Only accessible after signup */}
            <Route 
              path="/success" 
              element={
                <ProtectedRoute requireSignup={true}>
                  <SuccessPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Redirect any unknown routes to landing page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          {/* Debug Panel - Only show in development */}
          {process.env.NODE_ENV === 'development' && (
            <DebugPanel 
              isVisible={showDebug}
              onToggle={() => setShowDebug(!showDebug)}
            />
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App
