import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navigation from "./components/sections/Navigation";
import HeroSection from "./components/sections/Hero";
import DidYouKnowSection from "./components/sections/DidYouKnowSection";
import SolutionsSection from "./components/sections/SolutionsSection";
import TestimonialsCTAFooter from "./components/sections/TestimonialsCTAFooter";
import { LoginPage, RegistrationPage, SuccessPage } from "./components/auth/PulseFlowAuth";
import { AuthProvider, ProtectedRoute } from "./contexts/AuthContext";
import "./App.css";

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
      onNavigateToSignup={() => navigate("/signup")} 
    />
  );
};

const RegistrationPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  return (
    <RegistrationPage 
      onNavigateToLogin={() => navigate("/login")}
      onNavigateToSuccess={() => navigate("/success")}
    />
  );
};

function App() {
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
                  <SuccessPage onNavigateToLogin={() => window.location.href = '/login'} />
                </ProtectedRoute>
              } 
            />
            
            {/* Redirect any unknown routes to landing page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
