import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// Auth Context Types
interface AuthState {
  isAuthenticated: boolean;
  hasCompletedSignup: boolean;
  userEmail: string | null;
  userInfo: any | null;
}

interface AuthContextType extends AuthState {
  login: (email: string) => void;
  signup: (userData: any) => void;
  logout: () => void;
  completeSignup: () => void;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Check localStorage for persisted auth state
    const savedAuth = localStorage.getItem('pulseflow_auth');
    if (savedAuth) {
      try {
        return JSON.parse(savedAuth);
      } catch {
        return {
          isAuthenticated: false,
          hasCompletedSignup: false,
          userEmail: null,
          userInfo: null
        };
      }
    }
    return {
      isAuthenticated: false,
      hasCompletedSignup: false,
      userEmail: null,
      userInfo: null
    };
  });

  // Persist auth state to localStorage
  const updateAuthState = (newState: Partial<AuthState>) => {
    const updatedState = { ...authState, ...newState };
    setAuthState(updatedState);
    localStorage.setItem('pulseflow_auth', JSON.stringify(updatedState));
  };

  const login = (email: string) => {
    updateAuthState({
      isAuthenticated: true,
      userEmail: email
    });
  };

  const signup = (userData: any) => {
    updateAuthState({
      isAuthenticated: true,
      hasCompletedSignup: true,
      userEmail: userData.workEmail,
      userInfo: userData
    });
  };

  const logout = () => {
    updateAuthState({
      isAuthenticated: false,
      hasCompletedSignup: false,
      userEmail: null,
      userInfo: null
    });
    localStorage.removeItem('pulseflow_auth');
  };

  const completeSignup = () => {
    updateAuthState({
      hasCompletedSignup: true
    });
  };

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    completeSignup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected Route Component
export const ProtectedRoute: React.FC<{ 
  children: ReactNode;
  requireSignup?: boolean;
}> = ({ children, requireSignup = false }) => {
  const { isAuthenticated, hasCompletedSignup } = useAuth();
  
  // Debug logging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('🔐 ProtectedRoute Check:', {
      isAuthenticated,
      hasCompletedSignup,
      requireSignup,
      willRedirect: (requireSignup && !hasCompletedSignup) || !isAuthenticated
    });
  }
  
  if (requireSignup && !hasCompletedSignup) {
    console.log('🚫 Redirecting to /signup: User has not completed signup');
    return <Navigate to="/signup" replace />;
  }
  
  if (!isAuthenticated) {
    console.log('🚫 Redirecting to /login: User not authenticated');
    return <Navigate to="/login" replace />;
  }
  
  console.log('✅ Access granted to protected route');
  return <>{children}</>;
};

export default AuthProvider;
