import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import { LoginPage, RegistrationPage, SuccessPage } from './components/auth/PulseFlowAuth';
import StandaloneSuccessPage from './components/auth/StandaloneSuccessPage';

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
  const { completeSignup } = useAuth();
  
  const handleSuccessNavigation = () => {
    completeSignup(); // Mark signup as completed
    navigate("/success");
  };
  
  return (
    <RegistrationPage 
      onNavigateToLogin={() => navigate("/login")}
      onNavigateToSuccess={handleSuccessNavigation}
    />
  );
};

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
              element={<LoginPageWrapper />} 
            />
            
            <Route 
              path="/signup" 
              element={<RegistrationPageWrapper />} 
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
            
            {/* Standalone Success Page for Testing - Publicly accessible */}
            <Route 
              path="/test-success" 
              element={<StandaloneSuccessPage />} 
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
