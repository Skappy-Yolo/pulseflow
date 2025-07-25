import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

// TypeScript interfaces
interface LoginFormData {
  email: string;
  password: string;
}

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  organizationType: string;
  teamSizeOrClients: string;
  primaryRole: string;
  mainChallenge: string;
  otherChallenge: string;
}

interface FormErrors {
  [key: string]: string;
}

interface LoginPageProps {
  onNavigateToSignup: () => void;
}

interface RegistrationPageProps {
  onNavigateToLogin: () => void;
  onNavigateToSuccess: () => void;
}

interface SuccessPageProps {
  onNavigateToLogin: () => void;
}

// Logo Component - ENHANCED with superior spacing and blue text
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

// Professional domain validator
const isWorkEmail = (email: string): boolean => {
  const personalDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
    'icloud.com', 'live.com', 'msn.com', 'ymail.com', 'mail.com',
    'protonmail.com', 'tutanota.com', 'fastmail.com'
  ];
  
  const domain = email.split('@')[1]?.toLowerCase();
  return Boolean(domain && !personalDomains.includes(domain));
};

// Login Page Component - FIXED TEXT VISIBILITY & SPACING
export const LoginPage = ({ onNavigateToSignup }: LoginPageProps) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (email: string) => {
    setFormData({...formData, email});
    
    // Clear previous errors
    setEmailError('');
    setErrors(prev => ({...prev, email: ''}));
    
    // Check for personal email domains
    if (email && email.includes('@')) {
      if (!isWorkEmail(email)) {
        setEmailError('Please use your work email address');
      }
    }
  };

  // Add missing functions
  const setCurrentPage = (page: string) => {
    // Handle forgot password navigation - this would typically navigate to forgot password page
    console.log('Navigate to:', page);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    console.log('Social login with:', provider);
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false);
      onNavigateToSignup(); // Call success callback
    }, 1500);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (!isWorkEmail(formData.email)) {
      newErrors.email = 'Please use your work email address';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate async login
      setTimeout(() => {
        console.log('✅ Login successful:', formData);
        setIsLoading(false);
        // Here you would typically call: login(formData.email);
      }, 1000);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '1280px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: window.innerWidth < 1024 ? 'column' : 'row', minHeight: '700px' }}>
          {/* Left Side - Hero Image */}
          <div style={{ 
            flex: '1', 
            background: 'linear-gradient(135deg, #047857 0%, #064e3b 100%)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: window.innerWidth < 1024 ? '24px' : '48px',
            minHeight: window.innerWidth < 1024 ? '300px' : '700px'
          }}>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/images/auth/hero-analytics.jpg"
                alt="PulseFlow Analytics Dashboard"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  borderRadius: '8px',
                  filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
                  maxHeight: '500px',
                  maxWidth: '600px'
                }}
              />
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div style={{ 
            flex: '1', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: window.innerWidth < 1024 ? '16px' : '32px' 
          }}>
            <div style={{ width: '100%', maxWidth: '448px' }}>
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '24px', marginBottom: '60px' }}>
                <PulseFlowLogo />
              </div>

              {/* Form with Professional spacing */}
              <div>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                  <h1 style={{ fontSize: '30px', fontWeight: '600', color: '#111827', marginBottom: '8px', lineHeight: '1.2' }}>
                    Login to your account
                  </h1>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Email - Enhanced with inline styles */}
                  <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '8px', textAlign: 'left' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      style={{
                        width: '100%',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        paddingTop: '16px',
                        paddingBottom: '16px',
                        fontSize: '16px',
                        color: '#111827',
                        backgroundColor: '#ffffff',
                        border: errors.email || emailError ? '2px solid #ef4444' : '2px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box'
                      }}
                      placeholder="name@company.com"
                      onFocus={(e) => e.target.style.border = '2px solid #2563eb'}
                      onBlur={(e) => e.target.style.border = errors.email || emailError ? '2px solid #ef4444' : '2px solid #d1d5db'}
                    />
                    {(errors.email || emailError) && (
                      <p style={{ marginTop: '4px', fontSize: '14px', color: '#ef4444', fontWeight: '500' }}>
                        {errors.email || emailError}
                      </p>
                    )}
                  </div>

                  {/* Password - Enhanced styling */}
                  <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '8px', textAlign: 'left' }}>
                      Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        style={{
                          width: '100%',
                          paddingLeft: '24px',
                          paddingRight: '56px',
                          paddingTop: '16px',
                          paddingBottom: '16px',
                          fontSize: '16px',
                          color: '#111827',
                          backgroundColor: '#ffffff',
                          border: errors.password ? '2px solid #ef4444' : '2px solid #d1d5db',
                          borderRadius: '8px',
                          outline: 'none',
                          transition: 'all 0.2s',
                          boxSizing: 'border-box'
                        }}
                        placeholder="Password"
                        onFocus={(e) => e.target.style.border = '2px solid #2563eb'}
                        onBlur={(e) => e.target.style.border = errors.password ? '2px solid #ef4444' : '2px solid #d1d5db'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '16px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          padding: '8px',
                          color: '#6b7280',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 10
                        }}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p style={{ marginTop: '4px', fontSize: '14px', color: '#ef4444', fontWeight: '500' }}>
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password - Enhanced visibility */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="auth-checkbox"
                        style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid #d1d5db',
                          borderRadius: '4px',
                          backgroundColor: rememberMe ? '#2563eb' : 'transparent',
                          cursor: 'pointer',
                          marginRight: '8px',
                          appearance: 'none',
                          position: 'relative'
                        }}
                      /> 
                      <span style={{ fontSize: '16px', color: '#4b5563', fontWeight: '500' }}>Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setCurrentPage('forgot-password')}
                      style={{
                        fontSize: '16px',
                        color: '#2563eb',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        textDecoration: 'none',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = '#1d4ed8'}
                      onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = '#2563eb'}
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Login Button - Enhanced styling */}
                  <div style={{ marginBottom: '48px' }}>
                    <button
                      type="submit"
                      disabled={isLoading}
                      style={{
                        width: '100%',
                        paddingTop: '18px',
                        paddingBottom: '18px',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '18px',
                        color: '#ffffff',
                        backgroundColor: isLoading ? '#60a5fa' : '#2563eb',
                        border: 'none',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        outline: 'none',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                        letterSpacing: '0.025em'
                      }}
                      onMouseEnter={(e) => {
                        if (!isLoading) {
                          const target = e.target as HTMLButtonElement;
                          target.style.backgroundColor = '#1d4ed8';
                          target.style.transform = 'translateY(-1px)';
                          target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLoading) {
                          const target = e.target as HTMLButtonElement;
                          target.style.backgroundColor = '#2563eb';
                          target.style.transform = 'translateY(0)';
                          target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                        }
                      }}
                    >
                      {isLoading ? 'Signing In...' : 'Login →'}
                    </button>
                  </div>

                  {/* Divider - Enhanced spacing */}
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '48px', marginBottom: '40px' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#d1d5db' }}></div>
                    <span style={{ paddingLeft: '24px', paddingRight: '24px', fontSize: '16px', color: '#6b7280', fontWeight: '500' }}>
                      OR LOGIN WITH
                    </span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#d1d5db' }}></div>
                  </div>

                  {/* Social Login - Enhanced visibility and spacing */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '48px' }}>
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('slack')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        paddingTop: '16px',
                        paddingBottom: '16px',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#374151',
                        backgroundColor: '#ffffff',
                        border: '2px solid #d1d5db',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        outline: 'none'
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = '#f9fafb';
                        target.style.borderColor = '#9ca3af';
                        target.style.transform = 'translateY(-1px)';
                        target.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = '#ffffff';
                        target.style.borderColor = '#d1d5db';
                        target.style.transform = 'translateY(0)';
                        target.style.boxShadow = 'none';
                      }}
                    >
                      <img src="/logos/Slack_icon_2019 1.svg" alt="Slack" style={{ width: '20px', height: '20px' }} />
                      <span style={{ color: '#374151', fontWeight: '600' }}>Slack</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('microsoft')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        paddingTop: '16px',
                        paddingBottom: '16px',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#374151',
                        backgroundColor: '#ffffff',
                        border: '2px solid #d1d5db',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        outline: 'none'
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = '#f9fafb';
                        target.style.borderColor = '#9ca3af';
                        target.style.transform = 'translateY(-1px)';
                        target.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = '#ffffff';
                        target.style.borderColor = '#d1d5db';
                        target.style.transform = 'translateY(0)';
                        target.style.boxShadow = 'none';
                      }}
                    >
                      <img src="/logos/microsoft.png" alt="Microsoft" style={{ width: '20px', height: '20px' }} />
                      <span style={{ color: '#374151', fontWeight: '600' }}>Microsoft</span>
                    </button>
                  </div>

                  {/* Sign up link - Enhanced spacing and visibility */}
                  <div style={{ textAlign: 'center', marginTop: '48px' }}>
                    <span style={{ fontSize: '16px', color: '#6b7280', fontWeight: '500' }}>New to PulseFlow? </span>
                    <button 
                      type="button"
                      onClick={onNavigateToSignup}
                      disabled={isLoading}
                      style={{
                        fontSize: '16px',
                        color: '#2563eb',
                        fontWeight: '600',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        background: 'none',
                        border: 'none',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        opacity: isLoading ? 0.5 : 1
                      }}
                      onMouseEnter={(e) => {
                        if (!isLoading) {
                          const target = e.target as HTMLButtonElement;
                          target.style.color = '#1d4ed8';
                          target.style.textDecoration = 'underline';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLoading) {
                          const target = e.target as HTMLButtonElement;
                          target.style.color = '#2563eb';
                          target.style.textDecoration = 'none';
                        }
                      }}
                    >
                      Try for free
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Registration Page Component - FIXED TEXT VISIBILITY & SPACING
export const RegistrationPage = ({ onNavigateToLogin, onNavigateToSuccess }: RegistrationPageProps) => {
  const [userType, setUserType] = useState<'consulting' | 'executive'>('executive');
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '', 
    workEmail: '',
    company: '',
    organizationType: '',
    teamSizeOrClients: '',
    primaryRole: '',
    mainChallenge: '',
    otherChallenge: ''
  });
  const [emailError, setEmailError] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (email: string) => {
    setFormData({...formData, workEmail: email});
    
    // Clear previous errors
    setEmailError('');
    setErrors(prev => ({...prev, workEmail: ''}));
    
    if (email && email.includes('@')) {
      if (!isWorkEmail(email)) {
        setEmailError('Please use your work/company email');
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'Work email is required';
    } else if (!isWorkEmail(formData.workEmail)) {
      newErrors.workEmail = 'Please use your work/company email';
    }
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      
      const userData = { 
        ...formData, 
        userType,
        registrationTimestamp: new Date().toISOString()
      };
      
      // Simulate async registration
      setTimeout(() => {
        console.log('✅ Registration successful:', userData);
        setIsLoading(false);
        onNavigateToSuccess();
      }, 1500);
    }
  };

  const handleChallengeChange = (value: string) => {
    setFormData({...formData, mainChallenge: value});
    setShowOtherInput(value === 'Other');
    if (value !== 'Other') {
      setFormData(prev => ({...prev, otherChallenge: ''}));
    }
  };

  // Dynamic dropdown options based on user type
  const getOrganizationOptions = () => [
    'Product/Digital Consulting Firm',
    'SaaS/Software Company', 
    'E-commerce Platform',
    'Digital Marketplace',
    'Fintech/Digital Finance',
    'Digital Agency',
    'Other Digital Business'
  ];

  const getTeamSizeOptions = () => [
    'Less than 50 people',
    '50-200 people', 
    '200-500 people',
    '500+ people'
  ];

  const getClientOptions = () => [
    'Less than 5 clients',
    '5-10 clients',
    '10-25 clients', 
    '>25 clients'
  ];

  const getRoleOptions = () => {
    if (userType === 'consulting') {
      return [
        'Consulting Firm Founder/CEO',
        'Consultant/Analyst'
      ];
    } else {
      return [
        'CEO/Founder',
        'Chief Product Officer',
        'Chief Technology Officer', 
        'VP Product',
        'RevOps Manager',
        'Head of Operations',
        'Data/Analytics Lead',
        'Growth Manager'
      ];
    }
  };

  const getChallengeOptions = () => [
    'Lack of Cross-Client Visibility',
    'Fragmented Analytics & Reporting',
    'Manual Data Integration',
    'Workflow & Task Coordination', 
    'Scaling Product Operations',
    'Real-time Alerting & Notifications',
    'Custom Dashboard Requirements',
    'Onboarding & Adoption',
    'Other'
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '1280px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: window.innerWidth < 1024 ? 'column' : 'row', minHeight: '800px' }}>
          {/* Left Side - Hero Image */}
          <div style={{ 
            flex: '1', 
            background: 'linear-gradient(135deg, #047857 0%, #064e3b 100%)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: window.innerWidth < 1024 ? '24px' : '48px',
            minHeight: window.innerWidth < 1024 ? '300px' : '800px'
          }}>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/images/auth/hero-analytics.jpg"
                alt="PulseFlow Registration"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  borderRadius: '8px',
                  filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
                  maxHeight: '500px',
                  maxWidth: '600px'
                }}
              />
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div style={{ 
            flex: '1', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: window.innerWidth < 1024 ? '16px' : '32px' 
          }}>
            <div style={{ width: '100%', maxWidth: '448px', maxHeight: '700px', overflowY: 'auto', paddingRight: '72px' }}>
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                <PulseFlowLogo />
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginBottom: '8px', lineHeight: '1.2' }}>
                    Welcome to PulseFlow
                  </h1>
                  <p style={{ fontSize: '16px', color: '#6b7280', fontWeight: '500' }}>
                    Tell us about your needs and we'll get you started
                  </p>
                </div>

                {/* Name Fields - Enhanced with inline styles */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                      First Name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      style={{
                        width: '100%',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        fontSize: '16px',
                        color: '#111827',
                        backgroundColor: '#ffffff',
                        border: errors.firstName ? '2px solid #ef4444' : '2px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box'
                      }}
                      placeholder="John"
                      required
                      onFocus={(e) => e.target.style.border = '2px solid #2563eb'}
                      onBlur={(e) => e.target.style.border = errors.firstName ? '2px solid #ef4444' : '2px solid #d1d5db'}
                    />
                    {errors.firstName && (
                      <p style={{ marginTop: '4px', fontSize: '14px', color: '#ef4444', fontWeight: '500' }}>
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                      Last Name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      style={{
                        width: '100%',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        fontSize: '16px',
                        color: '#111827',
                        backgroundColor: '#ffffff',
                        border: errors.lastName ? '2px solid #ef4444' : '2px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box'
                      }}
                      placeholder="Doe"
                      required
                      onFocus={(e) => e.target.style.border = '2px solid #2563eb'}
                      onBlur={(e) => e.target.style.border = errors.lastName ? '2px solid #ef4444' : '2px solid #d1d5db'}
                    />
                    {errors.lastName && (
                      <p style={{ marginTop: '4px', fontSize: '14px', color: '#ef4444', fontWeight: '500' }}>
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Work Email - Enhanced with inline styles */}
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '8px', textAlign: 'left' }}>
                    Work Email <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.workEmail}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    style={{
                      width: '100%',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      fontSize: '16px',
                      color: '#111827',
                      backgroundColor: '#ffffff',
                      border: (errors.workEmail || emailError) ? '2px solid #ef4444' : '2px solid #d1d5db',
                      borderRadius: '8px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    placeholder="john.doe@company.com"
                    required
                    onFocus={(e) => e.target.style.border = '2px solid #2563eb'}
                    onBlur={(e) => e.target.style.border = (errors.workEmail || emailError) ? '2px solid #ef4444' : '2px solid #d1d5db'}
                  />
                  {(errors.workEmail || emailError) && (
                    <p style={{ marginTop: '4px', fontSize: '14px', color: '#ef4444', fontWeight: '500' }}>
                      {errors.workEmail || emailError}
                    </p>
                  )}
                </div>

                {/* Company - Enhanced with inline styles */}
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '8px', textAlign: 'left' }}>
                    Company <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    style={{
                      width: '100%',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      fontSize: '16px',
                      color: '#111827',
                      backgroundColor: '#ffffff',
                      border: errors.company ? '2px solid #ef4444' : '2px solid #d1d5db',
                      borderRadius: '8px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Ink Consulting Group"
                    required
                    onFocus={(e) => e.target.style.border = '2px solid #2563eb'}
                    onBlur={(e) => e.target.style.border = errors.company ? '2px solid #ef4444' : '2px solid #d1d5db'}
                  />
                  {errors.company && (
                    <p style={{ marginTop: '4px', fontSize: '14px', color: '#ef4444', fontWeight: '500' }}>
                      {errors.company}
                    </p>
                  )}
                </div>

                {/* User Type Selection - Enhanced styling */}
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '16px', textAlign: 'left' }}>
                    I am a... <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="userType"
                        value="consulting"
                        checked={userType === 'consulting'}
                        onChange={(e) => setUserType(e.target.value as 'consulting' | 'executive')}
                        style={{
                          marginRight: '8px',
                          width: '16px',
                          height: '16px',
                          border: '2px solid #d1d5db',
                          borderRadius: '50%',
                          backgroundColor: userType === 'consulting' ? '#2563eb' : 'transparent',
                          appearance: 'none',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                      />
                      <span style={{ fontSize: '16px', color: '#374151', fontWeight: '500' }}>Consulting Team</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="userType"
                        value="executive"
                        checked={userType === 'executive'}
                        onChange={(e) => setUserType(e.target.value as 'consulting' | 'executive')}
                        style={{
                          marginRight: '8px',
                          width: '16px',
                          height: '16px',
                          border: '2px solid #d1d5db',
                          borderRadius: '50%',
                          backgroundColor: userType === 'executive' ? '#2563eb' : 'transparent',
                          appearance: 'none',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                      />
                      <span style={{ fontSize: '16px', color: '#374151', fontWeight: '500' }}>Company Executive</span>
                    </label>
                  </div>
                </div>

                {/* Organization Type - Enhanced dropdown styling */}
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '8px', textAlign: 'left' }}>
                    Organization Type
                  </label>
                  <select 
                    value={formData.organizationType}
                    onChange={(e) => setFormData({...formData, organizationType: e.target.value})}
                    style={{
                      width: '100%',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      fontSize: '16px',
                      color: '#111827',
                      backgroundColor: '#ffffff',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => (e.target as HTMLSelectElement).style.border = '2px solid #2563eb'}
                    onBlur={(e) => (e.target as HTMLSelectElement).style.border = '2px solid #d1d5db'}
                  >
                    <option value="" style={{ color: '#6b7280' }}>Select your organization type</option>
                    {getOrganizationOptions().map((option, index) => (
                      <option key={index} value={option} style={{ color: '#111827' }}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Dynamic Fields Based on User Type - Enhanced dropdown styling */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '8px', textAlign: 'left' }}>
                      {userType === 'consulting' ? 'Number of Clients' : 'Team Size'}
                    </label>
                    <select 
                      value={formData.teamSizeOrClients}
                      onChange={(e) => setFormData({...formData, teamSizeOrClients: e.target.value})}
                      style={{
                        width: '100%',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        fontSize: '16px',
                        color: '#111827',
                        backgroundColor: '#ffffff',
                        border: '2px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box',
                        cursor: 'pointer'
                      }}
                      onFocus={(e) => (e.target as HTMLSelectElement).style.border = '2px solid #2563eb'}
                      onBlur={(e) => (e.target as HTMLSelectElement).style.border = '2px solid #d1d5db'}
                    >
                      <option value="" style={{ color: '#6b7280' }}>Select</option>
                      {userType === 'consulting' 
                        ? getClientOptions().map((option, index) => (
                            <option key={index} value={option} style={{ color: '#111827' }}>{option}</option>
                          ))
                        : getTeamSizeOptions().map((option, index) => (
                            <option key={index} value={option} style={{ color: '#111827' }}>{option}</option>
                          ))
                      }
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '8px', textAlign: 'left' }}>
                      Primary Role
                    </label>
                    <select 
                      value={formData.primaryRole}
                      onChange={(e) => setFormData({...formData, primaryRole: e.target.value})}
                      style={{
                        width: '100%',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        fontSize: '16px',
                        color: '#111827',
                        backgroundColor: '#ffffff',
                        border: '2px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box',
                        cursor: 'pointer'
                      }}
                      onFocus={(e) => (e.target as HTMLSelectElement).style.border = '2px solid #2563eb'}
                      onBlur={(e) => (e.target as HTMLSelectElement).style.border = '2px solid #d1d5db'}
                    >
                      <option value="" style={{ color: '#6b7280' }}>Select your role</option>
                      {getRoleOptions().map((option, index) => (
                        <option key={index} value={option} style={{ color: '#111827' }}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Main Challenge - Enhanced dropdown styling */}
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '8px', textAlign: 'left' }}>
                    Main Challenge
                  </label>
                  <select 
                    value={formData.mainChallenge}
                    onChange={(e) => handleChallengeChange(e.target.value)}
                    style={{
                      width: '100%',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      fontSize: '16px',
                      color: '#111827',
                      backgroundColor: '#ffffff',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => (e.target as HTMLSelectElement).style.border = '2px solid #2563eb'}
                    onBlur={(e) => (e.target as HTMLSelectElement).style.border = '2px solid #d1d5db'}
                  >
                    <option value="" style={{ color: '#6b7280' }}>Select all that applies</option>
                    {getChallengeOptions().map((option, index) => (
                      <option key={index} value={option} style={{ color: '#111827' }}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Other Challenge Input - Enhanced styling */}
                {showOtherInput && (
                  <div style={{ marginBottom: '32px' }}>
                    <input
                      type="text"
                      value={formData.otherChallenge}
                      onChange={(e) => setFormData({...formData, otherChallenge: e.target.value})}
                      style={{
                        width: '100%',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        paddingTop: '12px',
                        paddingBottom: '12px',
                        fontSize: '16px',
                        color: '#111827',
                        backgroundColor: '#ffffff',
                        border: '2px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box'
                      }}
                      placeholder="Please specify"
                      onFocus={(e) => e.target.style.border = '2px solid #2563eb'}
                      onBlur={(e) => e.target.style.border = '2px solid #d1d5db'}
                    />
                  </div>
                )}

                {/* Submit Button - Enhanced styling */}
                <div style={{ marginBottom: '32px' }}>
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      paddingTop: '18px',
                      paddingBottom: '18px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '18px',
                      color: '#ffffff',
                      backgroundColor: isLoading ? '#60a5fa' : '#2563eb',
                      border: 'none',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      outline: 'none',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      letterSpacing: '0.025em'
                    }}
                    onMouseEnter={(e) => {
                      if (!isLoading) {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = '#1d4ed8';
                        target.style.transform = 'translateY(-1px)';
                        target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isLoading) {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = '#2563eb';
                        target.style.transform = 'translateY(0)';
                        target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                      }
                    }}
                  >
                    {isLoading ? 'Creating Account...' : 'Book A Demo →'}
                  </button>
                </div>

                {/* Divider - Enhanced spacing */}
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '32px', marginBottom: '24px' }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#d1d5db' }}></div>
                  <span style={{ paddingLeft: '24px', paddingRight: '24px', fontSize: '16px', color: '#6b7280', fontWeight: '500' }}>
                    OR SIGN UP WITH
                  </span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#d1d5db' }}></div>
                </div>

                {/* Social Registration - Enhanced with professional styling */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                  <button
                    type="button"
                    disabled={isLoading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#374151',
                      backgroundColor: '#ffffff',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      outline: 'none',
                      opacity: isLoading ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!isLoading) {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = '#f9fafb';
                        target.style.borderColor = '#9ca3af';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isLoading) {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = '#ffffff';
                        target.style.borderColor = '#d1d5db';
                      }
                    }}
                  >
                    <img 
                      src="/logos/Slack_icon_2019 1.svg" 
                      alt="Slack" 
                      style={{ width: '20px', height: '20px' }}
                    />
                    <span style={{ color: '#374151', fontWeight: '600' }}>Slack</span>
                  </button>
                  
                  <button
                    type="button"
                    disabled={isLoading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#374151',
                      backgroundColor: '#ffffff',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      outline: 'none',
                      opacity: isLoading ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!isLoading) {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = '#f9fafb';
                        target.style.borderColor = '#9ca3af';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isLoading) {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = '#ffffff';
                        target.style.borderColor = '#d1d5db';
                      }
                    }}
                  >
                    <img 
                      src="/logos/microsoft.png" 
                      alt="Microsoft" 
                      style={{ width: '20px', height: '20px' }}
                    />
                    <span style={{ color: '#374151', fontWeight: '600' }}>Microsoft</span>
                  </button>
                </div>

                {/* Login link - Enhanced spacing and visibility */}
                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                  <span style={{ fontSize: '16px', color: '#6b7280', fontWeight: '500' }}>Already have an account? </span>
                  <button 
                    type="button"
                    onClick={onNavigateToLogin}
                    disabled={isLoading}
                    style={{
                      fontSize: '16px',
                      color: '#2563eb',
                      fontWeight: '600',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      background: 'none',
                      border: 'none',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      opacity: isLoading ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!isLoading) {
                        const target = e.target as HTMLButtonElement;
                        target.style.color = '#1d4ed8';
                        target.style.textDecoration = 'underline';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isLoading) {
                        const target = e.target as HTMLButtonElement;
                        target.style.color = '#2563eb';
                        target.style.textDecoration = 'none';
                      }
                    }}
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Success Page Component - ORIGINAL DESIGN  
// Success Page Component - ENHANCED & FIXED with CheckCircle icons
export const SuccessPage = ({ onNavigateToLogin }: SuccessPageProps) => {
  const user = {
    firstName: 'John',
    workEmail: 'john.doe@company.com'
  };
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '448px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '48px', textAlign: 'center' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '48px' }}>
          <PulseFlowLogo />
        </div>

        {/* Success Content - Enhanced with professional styling */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            backgroundColor: '#dcfce7', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 24px auto' 
          }}>
            <CheckCircle style={{ width: '32px', height: '32px', color: '#16a34a' }} />
          </div>
          <h1 style={{ 
            fontSize: '30px', 
            fontWeight: '600', 
            color: '#111827', 
            marginBottom: '16px', 
            lineHeight: '1.2' 
          }}>
            Welcome to PulseFlow{user?.firstName ? `, ${user.firstName}!` : '!'}
          </h1>
          <p style={{ 
            fontSize: '16px', 
            color: '#6b7280', 
            marginBottom: '24px', 
            fontWeight: '500',
            lineHeight: '1.5'
          }}>
            Thank you for signing up! We're excited to have you on board.
          </p>
          <p style={{ 
            fontSize: '14px', 
            color: '#9ca3af',
            fontWeight: '500',
            lineHeight: '1.4'
          }}>
            A confirmation email has been sent to{' '}
            <span style={{ fontWeight: '600', color: '#6b7280' }}>
              {user?.workEmail || 'your email'}
            </span>
          </p>
        </div>

        {/* Action Button - Enhanced styling */}
        <div style={{ marginBottom: '48px' }}>
          <button 
            onClick={onNavigateToLogin}
            style={{
              width: '100%',
              paddingTop: '18px',
              paddingBottom: '18px',
              paddingLeft: '16px',
              paddingRight: '16px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '18px',
              color: '#ffffff',
              backgroundColor: '#2563eb',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              outline: 'none',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              letterSpacing: '0.025em'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#1d4ed8';
              target.style.transform = 'translateY(-1px)';
              target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#2563eb';
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }}
          >
            ← Back to Login
          </button>
        </div>

        {/* Features Preview - Enhanced with professional styling */}
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '24px', fontWeight: '600' }}>
            What's next?
          </p>
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle style={{ width: '16px', height: '16px', color: '#16a34a', marginRight: '12px', flexShrink: 0 }} />
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>A team member will contact you for the demo presentation</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle style={{ width: '16px', height: '16px', color: '#16a34a', marginRight: '12px', flexShrink: 0 }} />
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Connect your data sources</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle style={{ width: '16px', height: '16px', color: '#16a34a', marginRight: '12px', flexShrink: 0 }} />
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Set up your dashboard</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle style={{ width: '16px', height: '16px', color: '#16a34a', marginRight: '12px', flexShrink: 0 }} />
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Invite your team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Authentication Flow Component - Clean Production Version
const PulseFlowAuth = () => {
  const [currentPage, setCurrentPage] = useState<'login' | 'register' | 'success'>('login');

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigateToSignup={() => setCurrentPage('register')} />;
      case 'register':
        return (
          <RegistrationPage 
            onNavigateToLogin={() => setCurrentPage('login')}
            onNavigateToSuccess={() => setCurrentPage('success')}
          />
        );
      case 'success':
        return <SuccessPage onNavigateToLogin={() => setCurrentPage('login')} />;
      default:
        return <LoginPage onNavigateToSignup={() => setCurrentPage('register')} />;
    }
  };

  return renderPage();
};

export default PulseFlowAuth;
