import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './contexts/AuthContext';
import { LandingPage } from './components/LandingPage';
import { LoginPage, RegistrationPage, SuccessPage } from './components/auth/PulseFlowAuth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Landing Page Route */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Authentication Routes */}
            <Route 
              path="/login" 
              element={
                <div className="auth-page">
                  <LoginPage 
                    onNavigateToSignup={() => window.location.href = '/signup'} 
                    onNavigateToForgotPassword={() => window.location.href = '/forgot-password'}
                  />
                </div>
              } 
            />
            
            <Route 
              path="/signup" 
              element={
                <div className="auth-page">
                  <RegistrationPage 
                    onNavigateToLogin={() => window.location.href = '/login'}
                    onNavigateToSuccess={() => window.location.href = '/success'}
                  />
                </div>
              } 
            />
            
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
