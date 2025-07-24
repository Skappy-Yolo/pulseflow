import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { ReactNode } from 'react';
import type { User, AuthError } from '@supabase/supabase-js';
import type { UserProfile } from '../lib/supabase';

// Auth Context Types
interface AuthState {
  isAuthenticated: boolean;
  hasCompletedSignup: boolean;
  user: User | null;
  userProfile: UserProfile | null;
  userEmail: string | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    hasCompletedSignup: false,
    user: null,
    userProfile: null,
    userEmail: null,
    loading: true
  });

  // Initialize auth state on mount
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        handleUserSession(session.user);
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        handleUserSession(session.user);
      } else {
        setAuthState({
          isAuthenticated: false,
          hasCompletedSignup: false,
          user: null,
          userProfile: null,
          userEmail: null,
          loading: false
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUserSession = async (user: User) => {
    try {
      // Fetch user profile
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
      }

      setAuthState({
        isAuthenticated: true,
        hasCompletedSignup: !!profile,
        user,
        userProfile: profile,
        userEmail: user.email || null,
        loading: false
      });
    } catch (error) {
      console.error('Error in handleUserSession:', error);
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  };

  const login = async (email: string, password: string = 'temppassword123') => {
    try {
      // For demo purposes, we'll create a session without password
      // In production, you'd want proper password authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        // If user doesn't exist, return specific error
        if (error.message.includes('Invalid login credentials')) {
          return { 
            success: false, 
            error: 'No account found with this email. Please sign up first.' 
          };
        }
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  };

  const signup = async (userData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.workEmail,
        password: 'temppassword123', // In production, collect actual password
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            company: userData.company
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // If signup successful, update the profile with additional data
      if (data.user) {
        const profileData = {
          id: data.user.id,
          email: userData.workEmail,
          first_name: userData.firstName,
          last_name: userData.lastName,
          company: userData.company,
          organization_type: userData.organizationType,
          team_size_or_clients: userData.teamSizeOrClients,
          primary_role: userData.primaryRole,
          main_challenge: userData.mainChallenge,
          other_challenge: userData.otherChallenge
        };

        const { error: profileError } = await supabase
          .from('user_profiles')
          .upsert(profileData);

        if (profileError) {
          console.error('Error updating profile:', profileError);
        }
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Signup failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!authState.user) {
      return { success: false, error: 'No authenticated user' };
    }

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('id', authState.user.id);

      if (error) {
        return { success: false, error: error.message };
      }

      // Refresh user profile
      handleUserSession(authState.user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Update failed' 
      };
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    updateProfile
  };

  // Show loading spinner while initializing
  if (authState.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
  const { isAuthenticated, hasCompletedSignup, loading } = useAuth();
  
  // Show loading while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Debug logging (only in development)
  if (process.env.NODE_ENV === 'development') {
    // Debug logging removed for production security
  }
  
  if (requireSignup && !hasCompletedSignup) {
    return <Navigate to="/signup" replace />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default AuthProvider;
