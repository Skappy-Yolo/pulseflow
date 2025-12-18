// App.tsx - Your ORIGINAL version with just the ComingSoon component improved

import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import { LoginPage, RegistrationPage, SuccessPage } from './components/auth/PulseFlowAuth';
import StandaloneSuccessPage from './components/auth/StandaloneSuccessPage';
import ActivationPage from './components/auth/ActivationPage';

import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import { AdminLogin } from './components/admin/auth/AdminLogin';
import AdminLayout from './components/admin/Layout/AdminLayout';
import AdminProtectedRoute from './components/admin/Layout/AdminProtectedRoute';
import CustomerUserManagement from './components/admin/dashboard/CustomerUserManagement';
import AdminUserManagement from './components/admin/dashboard/AdminUserManagement';
import PendingApprovals from './components/admin/dashboard/PendingApprovals';
import AdminComingSoon from './components/admin/ui/ComingSoon';
import ConsultantRedirect from './components/consultant/ConsultantRedirect';
import ExecutiveRedirect from './components/executive/ExecutiveRedirect';

// Wrapper components to handle navigation with React Router
const LoginPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  return (
    <LoginPage 
      onNavigateToSignup={() => navigate("/signup")} 
      onNavigateToForgotPassword={() => navigate("/forgot-password")}
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
            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin onLoginSuccess={() => {}} />} />


            {/* Admin Nested Layout Route */}
            <Route path="/admin" element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users/customers" element={<CustomerUserManagement />} />
              <Route path="users/admins" element={<AdminUserManagement />} />
              <Route path="integrations" element={<AdminComingSoon title="Integrations" />} />
              <Route path="billing" element={<AdminComingSoon title="Billing" />} />
              <Route path="settings" element={<AdminComingSoon title="Settings" />} />
              <Route path="analytics" element={<AdminComingSoon title="Analytics" />} />
              <Route path="users/pending" element={<PendingApprovals />} />
              <Route path="reports" element={<AdminComingSoon title="Reports Center" />} />
              <Route path="reports/users" element={<AdminComingSoon title="User Reports" />} />
              <Route path="reports/activity" element={<AdminComingSoon title="Activity Reports" />} />
              <Route path="audit" element={<AdminComingSoon title="Audit Logs" />} />
              <Route path="settings/general" element={<AdminComingSoon title="General Settings" />} />
              <Route path="settings/security" element={<AdminComingSoon title="Security Settings" />} />
              <Route path="activity" element={<AdminComingSoon title="Activity Log" />} />
              {/* Default admin redirect */}
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* Consultant Dashboard Route - Redirects to Live Figma Site */}
            <Route path="/consultant" element={
              <ProtectedRoute>
                <ConsultantRedirect />
              </ProtectedRoute>
            } />
            
            <Route path="/executive" element={
              <ProtectedRoute>
                <ExecutiveRedirect />
              </ProtectedRoute>
            } />

            {/* Landing Page Route */}
            <Route path="/" element={<LandingPage />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<LoginPageWrapper />} />
            <Route path="/signup" element={<RegistrationPageWrapper />} />

            {/* Protected Success Page - Only accessible after signup */}
            <Route path="/success" element={
              <ProtectedRoute requireSignup={true}>
                <SuccessPage onNavigateToLogin={() => window.location.href = '/login'} />
              </ProtectedRoute>
            } />

            {/* Standalone Success Page for Testing - Publicly accessible */}
            <Route path="/test-success" element={<StandaloneSuccessPage />} />

            {/* Account Activation Route */}
            <Route path="/activate" element={
              <ActivationPage onNavigateToLogin={() => window.location.href = '/login'} />
            } />

            {/* Redirect any unknown routes to landing page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;