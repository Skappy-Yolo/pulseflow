// src/components/admin/layout/AdminProtectedRoute.tsx
// FIXED: Infinite re-rendering loop and dependency issues

import React, { useEffect, useState } from 'react';
import { adminAuth } from '../../../lib/admin-auth';
import AdminLogin from '../auth/AdminLogin';
import type { AdminUser, RequiredPermission } from '../../../types/admin';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: RequiredPermission[];
  fallbackMessage?: string;
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
  children,
  requiredPermissions = [],
  fallbackMessage = "You don't have permission to access this page."
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [hasRequiredPermissions, setHasRequiredPermissions] = useState(false);

  // Create a stable dependency from the permissions array
  const permissionsKey = requiredPermissions.join(',');

  // Single effect to check admin access - FIXED: Stable dependency
  useEffect(() => {
    const checkAdminAccess = () => {
      try {
        // Check if admin is authenticated
        const admin = adminAuth.getCurrentAdmin();
        setCurrentAdmin(admin);
        
        // Check required permissions
        let hasPermissions = false;
        if (admin) {
          if (requiredPermissions.length === 0) {
            hasPermissions = true; // No specific permissions required
          } else {
            hasPermissions = adminAuth.hasAllPermissions(requiredPermissions);
          }
        }
        
        setHasRequiredPermissions(hasPermissions);
        
      } catch (error) {
        console.error('❌ Error checking admin access:', error);
        setCurrentAdmin(null);
        setHasRequiredPermissions(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
  }, [permissionsKey]); // Use stable string key to avoid infinite loops

  const handleLoginSuccess = () => {
    // Reset loading state and recheck access
    setIsLoading(true);
    
    // Small delay to ensure auth state is updated
    setTimeout(() => {
      const admin = adminAuth.getCurrentAdmin();
      setCurrentAdmin(admin);
      
      let hasPermissions = false;
      if (admin) {
        if (requiredPermissions.length === 0) {
          hasPermissions = true;
        } else {
          hasPermissions = adminAuth.hasAllPermissions(requiredPermissions);
        }
      }
      
      setHasRequiredPermissions(hasPermissions);
      setIsLoading(false);
    }, 100);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            {/* PulseFlow Loading Animation */}
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-6 h-6 text-white animate-pulse" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" 
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2 font-['Inter']">
              Verifying Access
            </h2>
            <p className="text-slate-600 text-sm font-['Inter']">
              Checking admin authentication...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated - show login
  if (!currentAdmin) {
    return (
      <AdminLogin 
        onLoginSuccess={handleLoginSuccess}
        redirectTo="/admin/dashboard"
      />
    );
  }

  // Authenticated but insufficient permissions
  if (!hasRequiredPermissions) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            {/* Access Denied Icon */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-8 h-8 text-red-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-slate-900 mb-2 font-['Inter']">
              Access Denied
            </h2>
            
            <p className="text-slate-600 mb-4 font-['Inter']">
              {fallbackMessage}
            </p>

            {/* Admin Info */}
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-slate-700 font-['Inter']">
                <span className="font-semibold">Signed in as:</span><br />
                {currentAdmin.firstName} {currentAdmin.lastName}<br />
                <span className="text-slate-500">{currentAdmin.email}</span>
              </p>
              <p className="text-xs text-slate-500 mt-2 font-['Inter']">
                Role: {currentAdmin.role.name.replace('_', ' ').toUpperCase()}
              </p>
            </div>

            {/* Required Permissions Display */}
            {requiredPermissions.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-semibold text-red-800 mb-2 font-['Inter']">
                  Required Permissions:
                </h3>
                <ul className="text-xs text-red-700 space-y-1 font-['Inter']">
                  {requiredPermissions.map((permission, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      <span>{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/admin/dashboard'}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-['Inter']"
              >
                Go to Dashboard
              </button>
              
              <button
                onClick={async () => {
                  await adminAuth.logoutAdmin();
                  window.location.href = '/admin/login';
                }}
                className="w-full bg-slate-600 text-white py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors font-['Inter']"
              >
                Sign Out
              </button>
            </div>

            {/* Contact Admin */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500 font-['Inter']">
                Need access? Contact your system administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // All checks passed - render protected content
  return <>{children}</>;
};

// Convenience wrapper for common permission checks
export const SuperAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AdminProtectedRoute
    requiredPermissions={['admin:create', 'admin:delete', 'settings:security']}
    fallbackMessage="This page requires Super Administrator access."
  >
    {children}
  </AdminProtectedRoute>
);

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AdminProtectedRoute
    requiredPermissions={['users:view', 'users:approve']}
    fallbackMessage="This page requires Administrator access or higher."
  >
    {children}
  </AdminProtectedRoute>
);

export const ViewerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AdminProtectedRoute
    requiredPermissions={['users:view']}
    fallbackMessage="This page requires Viewer access or higher."
  >
    {children}
  </AdminProtectedRoute>
);

// Hook for checking permissions in components - moved to separate file to avoid Fast Refresh issues
// Import from '@/hooks/useAdminAuth' instead

export default AdminProtectedRoute;