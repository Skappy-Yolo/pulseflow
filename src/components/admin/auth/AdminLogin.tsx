// src/components/admin/auth/AdminLogin.tsx
// Fresh admin login with proper spacing - using different class names to avoid cache issues

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { adminAuth } from '../../../lib/admin-auth';
import type { AdminLoginCredentials } from '../../../types/admin';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  redirectTo?: string;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ 
  onLoginSuccess, 
  redirectTo = '/admin/dashboard'
}) => {
  const [credentials, setCredentials] = useState<AdminLoginCredentials>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof AdminLoginCredentials, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await adminAuth.loginAdmin(credentials);
      if (response.success && response.user) {
        onLoginSuccess();
        window.location.href = redirectTo;
      } else {
        setError(response.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Admin login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)',
        padding: '3rem 1rem'
      }}
    >
      {/* Main Container */}
      <div 
        className="w-full max-w-md"
        style={{
          maxWidth: '28rem'
        }}
      >
        {/* Header Section */}
        <div 
          className="text-center"
          style={{
            marginBottom: '3rem'
          }}
        >
          {/* Logo */}
          <div 
            className="flex items-center justify-center"
            style={{
              marginBottom: '2rem'
            }}
          >
            <div className="flex items-center">
              <img 
                src="/images/Heartbeat.svg" 
                alt="PulseFlow" 
                style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  marginRight: '1rem'
                }}
              />
              <div>
                <h1 
                  className="font-bold text-slate-900"
                  style={{
                    fontSize: '2rem',
                    lineHeight: '1.2',
                    fontFamily: 'Public Sans, sans-serif'
                  }}
                >
                  PulseFlow
                </h1>
                <p 
                  className="text-indigo-600 font-medium"
                  style={{
                    fontSize: '1rem',
                    marginTop: '0.25rem',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  Admin Portal
                </p>
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <div>
            <h2 
              className="font-bold text-slate-900"
              style={{
                fontSize: '2rem',
                marginBottom: '0.75rem',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Welcome Back
            </h2>
            <p 
              className="text-slate-600"
              style={{
                fontSize: '1.125rem',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Sign in to access your admin dashboard
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div 
          className="bg-white rounded-2xl shadow-2xl border"
          style={{
            padding: '2.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            marginBottom: '2rem'
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div 
                className="bg-red-50 border border-red-200 rounded-xl flex items-center"
                style={{
                  padding: '1rem',
                  marginBottom: '1.5rem'
                }}
              >
                <AlertCircle className="h-5 w-5 text-red-500" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
                <p className="text-sm text-red-700" style={{ fontFamily: 'Inter, sans-serif' }}>{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label 
                htmlFor="admin-email" 
                className="block text-sm font-semibold text-slate-700"
                style={{
                  marginBottom: '0.5rem',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Email Address
              </label>
              <div className="relative">
                <div 
                  className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                  style={{ paddingLeft: '1rem' }}
                >
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={credentials.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="block w-full border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white"
                  style={{
                    paddingLeft: '3rem',
                    paddingRight: '1rem',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif'
                  }}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '2rem' }}>
              <label 
                htmlFor="admin-password" 
                className="block text-sm font-semibold text-slate-700"
                style={{
                  marginBottom: '0.5rem',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Password
              </label>
              <div className="relative">
                <div 
                  className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                  style={{ paddingLeft: '1rem' }}
                >
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={credentials.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="block w-full border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white"
                  style={{
                    paddingLeft: '3rem',
                    paddingRight: '3.5rem',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif'
                  }}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center hover:text-slate-600 transition-colors"
                  style={{ paddingRight: '1rem' }}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || !credentials.email || !credentials.password}
              className="w-full flex justify-center items-center border-transparent text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl rounded-xl font-semibold"
              style={{
                padding: '1rem 1.5rem',
                fontSize: '1.125rem',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg 
                    className="animate-spin h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                    style={{ marginRight: '0.75rem' }}
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p 
            className="text-slate-500"
            style={{
              fontSize: '1rem',
              marginBottom: '1rem',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Need access? Contact your system administrator
          </p>
          
          <div 
            className="flex items-center justify-center text-slate-400"
            style={{
              fontSize: '0.875rem',
              gap: '0.5rem'
            }}
          >
            <span>Powered by</span>
            <button
              onClick={() => window.open('/', '_blank')}
              className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer"
            >
              PulseFlow
            </button>
            <span>© 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;