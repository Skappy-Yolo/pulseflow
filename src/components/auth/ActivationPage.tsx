import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { customerRegistration } from '../../lib/customer-registration';

// =============================================================================
// ACCOUNT ACTIVATION PAGE
// =============================================================================
// This page handles the account activation flow:
// 1. User clicks activation link from email
// 2. Token is validated
// 3. User sets their new password
// 4. Account is activated
// =============================================================================

// Logo Component
const PulseFlowLogo = () => {
  return (
    <div className="flex items-center space-x-3">
      <img
        src="/images/Heartbeat.svg"
        alt="PulseFlow Logo"
        className="w-8 h-8"
      />
      <span className="text-2xl font-semibold" style={{ color: '#2563eb' }}>PulseFlow</span>
    </div>
  );
};

interface ActivationPageProps {
  onNavigateToLogin: () => void;
}

export const ActivationPage: React.FC<ActivationPageProps> = ({ onNavigateToLogin }) => {
  // Get token from URL
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  // States
  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid' | 'success' | 'error'>('loading');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setStatus('invalid');
        setErrorMessage('No activation token provided. Please use the link from your email.');
        return;
      }

      const result = await customerRegistration.validateActivationToken(token);
      
      if (result.valid) {
        setStatus('valid');
        setEmail(result.email || '');
        setFirstName(result.firstName || 'User');
      } else {
        setStatus('invalid');
        setErrorMessage(result.error || 'Invalid or expired activation link.');
      }
    };

    validateToken();
  }, [token]);

  // Password validation
  const validatePassword = (): boolean => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter');
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError('Password must contain at least one lowercase letter');
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setPasswordError('Password must contain at least one number');
      return false;
    }
    setPasswordError('');
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await customerRegistration.activateAccount(token!, password);
      
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Failed to activate account. Please try again.');
      }
    } catch (error) {
      console.error('Activation error:', error);
      setStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (status === 'loading') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f9fafb', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p style={{ color: '#6b7280', fontSize: '16px' }}>Validating activation link...</p>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (status === 'invalid') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f9fafb', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '16px'
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '448px', 
          backgroundColor: '#ffffff', 
          borderRadius: '16px', 
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          padding: '48px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <PulseFlowLogo />
          </div>
          
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            backgroundColor: '#fef2f2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <AlertCircle size={32} color="#ef4444" />
          </div>
          
          <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
            Invalid Activation Link
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '32px' }}>
            {errorMessage}
          </p>
          
          <button
            onClick={onNavigateToLogin}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb'}
          >
            Go to Login
          </button>
          
          <p style={{ marginTop: '24px', fontSize: '14px', color: '#6b7280' }}>
            Need help? Contact <a href="mailto:support@pulseflow.app" style={{ color: '#2563eb' }}>support@pulseflow.app</a>
          </p>
        </div>
      </div>
    );
  }

  // Success state
  if (status === 'success') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f9fafb', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '16px'
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '448px', 
          backgroundColor: '#ffffff', 
          borderRadius: '16px', 
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          padding: '48px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <PulseFlowLogo />
          </div>
          
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            backgroundColor: '#dcfce7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <CheckCircle size={32} color="#16a34a" />
          </div>
          
          <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
            Account Activated!
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '32px' }}>
            Your account is now active. You can login with your new password.
          </p>
          
          <button
            onClick={onNavigateToLogin}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb'}
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'error') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f9fafb', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '16px'
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '448px', 
          backgroundColor: '#ffffff', 
          borderRadius: '16px', 
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          padding: '48px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <PulseFlowLogo />
          </div>
          
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            backgroundColor: '#fef2f2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <AlertCircle size={32} color="#ef4444" />
          </div>
          
          <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
            Activation Failed
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '32px' }}>
            {errorMessage}
          </p>
          
          <button
            onClick={() => setStatus('valid')}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '16px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb'}
          >
            Try Again
          </button>
          
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Need help? Contact <a href="mailto:support@pulseflow.app" style={{ color: '#2563eb' }}>support@pulseflow.app</a>
          </p>
        </div>
      </div>
    );
  }

  // Valid token - Show password form
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '448px', 
        backgroundColor: '#ffffff', 
        borderRadius: '16px', 
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        padding: '48px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <PulseFlowLogo />
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
            Welcome, {firstName}!
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Set your password to activate your account
          </p>
        </div>

        {/* Email display */}
        <div style={{ 
          backgroundColor: '#f0f9ff', 
          border: '1px solid #bae6fd', 
          borderRadius: '8px', 
          padding: '12px 16px',
          marginBottom: '24px'
        }}>
          <p style={{ fontSize: '14px', color: '#0369a1', margin: 0 }}>
            <strong>Email:</strong> {email}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '16px', 
              fontWeight: '500', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              New Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px',
                  paddingRight: '48px',
                  fontSize: '16px',
                  color: '#111827',
                  backgroundColor: '#ffffff',
                  border: passwordError ? '2px solid #ef4444' : '2px solid #d1d5db',
                  borderRadius: '8px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '4px',
                  color: '#6b7280',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '16px', 
              fontWeight: '500', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px',
                  paddingRight: '48px',
                  fontSize: '16px',
                  color: '#111827',
                  backgroundColor: '#ffffff',
                  border: passwordError ? '2px solid #ef4444' : '2px solid #d1d5db',
                  borderRadius: '8px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '4px',
                  color: '#6b7280',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Password requirements */}
          <div style={{ 
            fontSize: '13px', 
            color: '#6b7280', 
            marginBottom: '24px',
            padding: '12px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px'
          }}>
            <p style={{ margin: '0 0 8px', fontWeight: '500' }}>Password must contain:</p>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li style={{ color: password.length >= 8 ? '#16a34a' : '#6b7280' }}>At least 8 characters</li>
              <li style={{ color: /[A-Z]/.test(password) ? '#16a34a' : '#6b7280' }}>One uppercase letter</li>
              <li style={{ color: /[a-z]/.test(password) ? '#16a34a' : '#6b7280' }}>One lowercase letter</li>
              <li style={{ color: /[0-9]/.test(password) ? '#16a34a' : '#6b7280' }}>One number</li>
            </ul>
          </div>

          {/* Error message */}
          {passwordError && (
            <div style={{ 
              backgroundColor: '#fef2f2', 
              border: '1px solid #fecaca', 
              borderRadius: '8px', 
              padding: '12px',
              marginBottom: '24px'
            }}>
              <p style={{ fontSize: '14px', color: '#dc2626', margin: 0 }}>
                {passwordError}
              </p>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: isSubmitting ? '#93c5fd' : '#2563eb',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Activating...
              </>
            ) : (
              'Activate Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActivationPage;
