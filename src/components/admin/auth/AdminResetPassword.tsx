// src/components/admin/auth/AdminResetPassword.tsx
// Admin password reset page with PulseFlow branding

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface AdminResetPasswordProps {
  onNavigateToLogin?: () => void;
}

export const AdminResetPassword: React.FC<AdminResetPasswordProps> = ({ 
  onNavigateToLogin 
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);

  // Check if user has a valid recovery session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      // User should have a session from the recovery link
      setIsValidSession(!!session);
    };
    checkSession();

    // Listen for auth state changes (recovery link will trigger this)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, _session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsValidSession(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(pwd)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(pwd)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(pwd)) return 'Password must contain at least one number';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({ 
        password: password 
      });

      if (updateError) {
        throw updateError;
      }

      setSuccess(true);
      
      // Sign out after password reset so they can log in fresh
      setTimeout(async () => {
        await supabase.auth.signOut();
      }, 2000);

    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err?.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    if (onNavigateToLogin) {
      onNavigateToLogin();
    } else {
      window.location.href = '/admin/login';
    }
  };

  // Show loading while checking session
  if (isValidSession === null) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)',
        }}
      >
        <div className="text-gray-600">Verifying reset link...</div>
      </div>
    );
  }

  // Show error if no valid session
  if (!isValidSession && !success) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)',
          padding: '3rem 1rem'
        }}
      >
        <div 
          className="w-full max-w-md"
          style={{ maxWidth: '28rem' }}
        >
          <div 
            className="text-center"
            style={{ marginBottom: '2rem' }}
          >
            <div className="flex items-center justify-center" style={{ marginBottom: '1.5rem' }}>
              <img 
                src="/images/Heartbeat.svg" 
                alt="PulseFlow" 
                style={{ width: '3rem', height: '3rem', marginRight: '0.75rem' }}
              />
              <span style={{ fontSize: '1.75rem', fontWeight: 700, color: '#4F46E5' }}>
                PulseFlow
              </span>
            </div>
          </div>

          <div 
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '1rem',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
              padding: '2rem',
              textAlign: 'center'
            }}
          >
            <div 
              style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '0.75rem',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}
            >
              <AlertCircle 
                style={{ width: '2rem', height: '2rem', color: '#DC2626', margin: '0 auto 0.5rem' }} 
              />
              <p style={{ color: '#DC2626', fontWeight: 500 }}>
                Invalid or Expired Link
              </p>
              <p style={{ color: '#7F1D1D', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                This password reset link is invalid or has expired. Please request a new one.
              </p>
            </div>

            <button
              onClick={handleBackToLogin}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#4F46E5',
                color: '#ffffff',
                fontWeight: 600,
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
              Back to Admin Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)',
        padding: '3rem 1rem'
      }}
    >
      <div 
        className="w-full max-w-md"
        style={{ maxWidth: '28rem' }}
      >
        {/* Header */}
        <div 
          className="text-center"
          style={{ marginBottom: '2rem' }}
        >
          {/* Logo */}
          <div 
            className="flex items-center justify-center"
            style={{ marginBottom: '1.5rem' }}
          >
            <img 
              src="/images/Heartbeat.svg" 
              alt="PulseFlow" 
              style={{ width: '3rem', height: '3rem', marginRight: '0.75rem' }}
            />
            <span style={{ fontSize: '1.75rem', fontWeight: 700, color: '#4F46E5' }}>
              PulseFlow
            </span>
          </div>
          <p style={{ color: '#6366F1', fontSize: '0.875rem', fontWeight: 500 }}>
            Admin Portal
          </p>
        </div>

        {/* Main Card */}
        <div 
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '1rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
            padding: '2rem'
          }}
        >
          {success ? (
            /* Success State */
            <div className="text-center">
              <div 
                style={{
                  backgroundColor: '#ECFDF5',
                  borderRadius: '50%',
                  width: '4rem',
                  height: '4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}
              >
                <CheckCircle style={{ width: '2rem', height: '2rem', color: '#10B981' }} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
                Password Reset Successful!
              </h2>
              <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                Your password has been updated. You can now log in with your new password.
              </p>
              <button
                onClick={handleBackToLogin}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#4F46E5',
                  color: '#ffffff',
                  fontWeight: 600,
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Go to Admin Login
              </button>
            </div>
          ) : (
            /* Reset Form */
            <>
              <h2 
                style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 700, 
                  color: '#111827', 
                  textAlign: 'center',
                  marginBottom: '0.5rem'
                }}
              >
                Reset Your Password
              </h2>
              <p 
                style={{ 
                  color: '#6B7280', 
                  textAlign: 'center', 
                  marginBottom: '1.5rem',
                  fontSize: '0.875rem'
                }}
              >
                Enter your new password below
              </p>

              {/* Error Message */}
              {error && (
                <div 
                  style={{
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #FECACA',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <AlertCircle style={{ width: '1rem', height: '1rem', color: '#DC2626', flexShrink: 0 }} />
                  <span style={{ color: '#DC2626', fontSize: '0.875rem' }}>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* New Password */}
                <div style={{ marginBottom: '1rem' }}>
                  <label 
                    style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: 500, 
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}
                  >
                    New Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div 
                      style={{ 
                        position: 'absolute', 
                        left: '0.75rem', 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        color: '#9CA3AF'
                      }}
                    >
                      <Lock style={{ width: '1.25rem', height: '1.25rem' }} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #D1D5DB',
                        fontSize: '1rem',
                        color: '#1F2937',
                        backgroundColor: '#F9FAFB',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#9CA3AF',
                        padding: 0
                      }}
                    >
                      {showPassword ? (
                        <EyeOff style={{ width: '1.25rem', height: '1.25rem' }} />
                      ) : (
                        <Eye style={{ width: '1.25rem', height: '1.25rem' }} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label 
                    style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: 500, 
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}
                  >
                    Confirm Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div 
                      style={{ 
                        position: 'absolute', 
                        left: '0.75rem', 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        color: '#9CA3AF'
                      }}
                    >
                      <Lock style={{ width: '1.25rem', height: '1.25rem' }} />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #D1D5DB',
                        fontSize: '1rem',
                        color: '#1F2937',
                        backgroundColor: '#F9FAFB',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#9CA3AF',
                        padding: 0
                      }}
                    >
                      {showConfirmPassword ? (
                        <EyeOff style={{ width: '1.25rem', height: '1.25rem' }} />
                      ) : (
                        <Eye style={{ width: '1.25rem', height: '1.25rem' }} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div 
                  style={{
                    backgroundColor: '#F3F4F6',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    marginBottom: '1.5rem',
                    fontSize: '0.75rem',
                    color: '#6B7280'
                  }}
                >
                  <p style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Password must contain:</p>
                  <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                    <li>At least 8 characters</li>
                    <li>One uppercase letter</li>
                    <li>One lowercase letter</li>
                    <li>One number</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: isLoading ? '#A5B4FC' : '#4F46E5',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    marginBottom: '1rem'
                  }}
                >
                  {isLoading ? 'Resetting Password...' : 'Reset Password'}
                </button>

                {/* Back to Login */}
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.5rem',
                    background: 'none',
                    border: 'none',
                    color: '#6B7280',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
                  Back to Admin Login
                </button>
              </form>
            </>
          )}
        </div>

        {/* Footer */}
        <p 
          style={{ 
            textAlign: 'center', 
            color: '#9CA3AF', 
            fontSize: '0.75rem',
            marginTop: '1.5rem'
          }}
        >
          © 2024 PulseFlow by Nolum. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminResetPassword;
