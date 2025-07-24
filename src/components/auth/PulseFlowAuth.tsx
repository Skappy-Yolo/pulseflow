import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { images } from '../../assets/images';
import { useAuth } from '../../contexts/AuthContext';
import './AuthStyles.css';

// Types
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

// Professional domain validator
const isWorkEmail = (email: string): boolean => {
  const personalDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
    'icloud.com', 'live.com', 'msn.com', 'ymail.com', 'mail.com',
    'protonmail.com', 'tutanota.com', 'fastmail.com'
  ];
  
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? !personalDomains.includes(domain) : false;
};

// PulseFlow Logo Component
const PulseFlowLogo = () => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <img
        src={images.heartbeatIcon}
        alt="PulseFlow Icon"
        width="32"
        height="32"
      />
      <span className="text-2xl font-semibold text-blue-600">PulseFlow</span>
    </div>
  );
};

// Login Page Component - ORIGINAL DESIGN
export const LoginPage = ({ onNavigateToSignup }: LoginPageProps) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (email: string) => {
    setFormData({...formData, email});
    
    // Clear previous errors
    setEmailError('');
    setErrors(prev => ({...prev, email: ''}));
    
    // Only validate if email looks complete (has @ and text after it)
    if (email && email.includes('@') && email.split('@')[1]?.length > 0) {
      if (!isWorkEmail(email)) {
        setEmailError('Please use your work email address');
      }
    }
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
      
      login(formData.email, formData.password)
        .then(({ success, error }) => {
          setIsLoading(false);
          if (success) {
            console.log('✅ Login successful');
            // Navigation will be handled by AuthContext automatically
          } else {
            setErrors({ general: error || 'Login failed' });
          }
        })
        .catch(error => {
          setIsLoading(false);
          setErrors({ general: 'An unexpected error occurred' });
          console.error('Login error:', error);
        });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-layout">
          {/* Left Side - Green Background with Image */}
          <div className="auth-image-panel">
            <img
              src="/images/auth/hero-analytics.jpg"
              alt="PulseFlow Analytics Dashboard"
              className="auth-hero-image"
            />
          </div>

          {/* Right Side - Login Form */}
          <div className="auth-form-panel">
            <div className="auth-form-container">
              {/* Logo */}
              <div className="auth-logo-container">
                <PulseFlowLogo />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="auth-title-container">
                  <h1 className="auth-title">Login to your account</h1>
                </div>

                {/* Email */}
                <div className="auth-field-container">
                  <label className="auth-label">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={`auth-input ${
                      errors.email || emailError ? 'auth-input-error' : ''
                    }`}
                    placeholder="name@company.com"
                  />
                  {(errors.email || emailError) && (
                    <p className="auth-error-message">{errors.email || emailError}</p>
                  )}
                </div>

                {/* Password */}
                <div className="auth-field-container">
                  <label className="auth-label">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className={`auth-input auth-password-input ${
                        errors.password ? 'auth-input-error' : ''
                      }`}
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="auth-password-toggle"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="auth-error-message">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="auth-remember-container">
                  <label className="auth-checkbox-label">
                    <input 
                      type="checkbox" 
                      className="auth-checkbox" 
                    />
                    <span className="auth-checkbox-text">Remember me</span>
                  </label>
                  <a href="#" className="auth-forgot-link">
                    Forgot password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`auth-submit-button ${
                    isLoading ? 'auth-submit-button-loading' : ''
                  }`}
                >
                  {isLoading ? 'Signing In...' : 'Login →'}
                </button>

                {/* Divider */}
                <div className="auth-divider">
                  <div className="auth-divider-line"></div>
                  <span className="auth-divider-text">OR LOGIN WITH</span>
                  <div className="auth-divider-line"></div>
                </div>

                {/* Social Login */}
                <div className="auth-social-container">
                  <button
                    type="button"
                    className="auth-social-button"
                  >
                    <img 
                      src="/logos/Slack_icon_2019 1.svg" 
                      alt="Slack" 
                      className="auth-social-icon"
                    />
                    <span className="auth-social-text">Slack</span>
                  </button>
                  <button
                    type="button"
                    className="auth-social-button"
                  >
                    <img 
                      src="/logos/microsoft.png" 
                      alt="Microsoft" 
                      className="auth-social-icon"
                    />
                    <span className="auth-social-text">Microsoft</span>
                  </button>
                </div>

                {/* Sign up link */}
                <div className="auth-signup-link-container">
                  <span className="auth-signup-text">New to PulseFlow? </span>
                  <button 
                    type="button"
                    onClick={onNavigateToSignup}
                    className="auth-signup-link"
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
  );
};

// Registration Page Component - ORIGINAL DESIGN
export const RegistrationPage = ({ onNavigateToLogin, onNavigateToSuccess }: RegistrationPageProps) => {
  const { signup } = useAuth();
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
    
    // Only validate if email looks complete (has @ and text after it)
    if (email && email.includes('@') && email.split('@')[1]?.length > 0) {
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
      
      signup(userData)
        .then(({ success, error }) => {
          setIsLoading(false);
          if (success) {
            console.log('✅ Registration successful');
            onNavigateToSuccess();
          } else {
            setErrors({ general: error || 'Registration failed' });
          }
        })
        .catch(error => {
          setIsLoading(false);
          setErrors({ general: 'An unexpected error occurred' });
          console.error('Registration error:', error);
        });
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
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-layout">
          {/* Left Side - Green Background with Image */}
          <div className="auth-image-panel auth-image-panel-green">
            <img
              src="/images/auth/hero-analytics.jpg"
              alt="PulseFlow Registration"
              className="auth-hero-image auth-hero-image-registration"
            />
          </div>

          {/* Right Side - Registration Form */}
          <div className="auth-form-panel">
            <div className="auth-form-container auth-form-scrollable">
              {/* Logo */}
              <div className="auth-logo-container">
                <PulseFlowLogo />
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-title-container">
                  <h1 className="auth-title">Welcome to PulseFlow</h1>
                  <p className="auth-subtitle">Tell us about your needs and we'll get you started</p>
                </div>

                {/* Name Fields */}
                <div className="auth-name-fields">
                  <div>
                    <label className="auth-label">
                      First Name <span className="auth-required">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className={`auth-input ${
                        errors.firstName ? 'auth-input-error' : ''
                      }`}
                      placeholder="John"
                      required
                    />
                    {errors.firstName && (
                      <p className="auth-error-message">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="auth-label">
                      Last Name <span className="auth-required">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className={`auth-input ${
                        errors.lastName ? 'auth-input-error' : ''
                      }`}
                      placeholder="Doe"
                      required
                    />
                    {errors.lastName && (
                      <p className="auth-error-message">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Work Email */}
                <div className="auth-field-container">
                  <label className="auth-label">
                    Work Email <span className="auth-required">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.workEmail}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={`auth-input ${
                      errors.workEmail || emailError ? 'auth-input-error' : ''
                    }`}
                    placeholder="john.doe@company.com"
                    required
                  />
                  {(errors.workEmail || emailError) && (
                    <p className="auth-error-message">{errors.workEmail || emailError}</p>
                  )}
                </div>

                {/* Company */}
                <div className="auth-field-container">
                  <label className="auth-label">
                    Company <span className="auth-required">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className={`auth-input ${
                      errors.company ? 'auth-input-error' : ''
                    }`}
                    placeholder="Ink Consulting Group"
                    required
                  />
                  {errors.company && (
                    <p className="auth-error-message">{errors.company}</p>
                  )}
                </div>

                {/* User Type Selection */}
                <div className="auth-field-container">
                  <label className="auth-label">
                    I am a... <span className="auth-required">*</span>
                  </label>
                  <div className="auth-radio-group">
                    <label className="auth-radio-label">
                      <input
                        type="radio"
                        name="userType"
                        value="consulting"
                        checked={userType === 'consulting'}
                        onChange={(e) => setUserType(e.target.value as 'consulting' | 'executive')}
                        className="auth-radio"
                      />
                      <span className="auth-radio-text">Consulting Team</span>
                    </label>
                    <label className="auth-radio-label">
                      <input
                        type="radio"
                        name="userType"
                        value="executive"
                        checked={userType === 'executive'}
                        onChange={(e) => setUserType(e.target.value as 'consulting' | 'executive')}
                        className="auth-radio"
                      />
                      <span className="auth-radio-text">Company Executive</span>
                    </label>
                  </div>
                </div>

                {/* Organization Type */}
                <div className="auth-field-container">
                  <label className="auth-label">
                    Which best describes your organization?
                  </label>
                  <select 
                    value={formData.organizationType}
                    onChange={(e) => setFormData({...formData, organizationType: e.target.value})}
                    className="auth-select"
                  >
                    <option value="">Select your organization type</option>
                    {getOrganizationOptions().map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Dynamic Fields Based on User Type */}
                <div className="auth-name-fields">
                  <div>
                    <label className="auth-label">
                      {userType === 'consulting' ? 'Number of Clients' : 'Team Size'}
                    </label>
                    <select 
                      value={formData.teamSizeOrClients}
                      onChange={(e) => setFormData({...formData, teamSizeOrClients: e.target.value})}
                      className="auth-select"
                    >
                      <option value="">Select</option>
                      {userType === 'consulting' 
                        ? getClientOptions().map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))
                        : getTeamSizeOptions().map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))
                      }
                    </select>
                  </div>
                  <div>
                    <label className="auth-label">
                      What's your primary role?
                    </label>
                    <select 
                      value={formData.primaryRole}
                      onChange={(e) => setFormData({...formData, primaryRole: e.target.value})}
                      className="auth-select"
                    >
                      <option value="">Select your role</option>
                      {getRoleOptions().map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Main Challenge */}
                <div className="auth-field-container">
                  <label className="auth-label">
                    What is your main challenge?
                  </label>
                  <select 
                    value={formData.mainChallenge}
                    onChange={(e) => handleChallengeChange(e.target.value)}
                    className="auth-select"
                  >
                    <option value="">Select all that applies</option>
                    {getChallengeOptions().map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Other Challenge Input */}
                {showOtherInput && (
                  <div className="auth-field-container">
                    <input
                      type="text"
                      value={formData.otherChallenge}
                      onChange={(e) => setFormData({...formData, otherChallenge: e.target.value})}
                      className="auth-input"
                      placeholder="Please specify"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`auth-submit-button ${
                    isLoading ? 'auth-submit-button-loading' : ''
                  }`}
                >
                  {isLoading ? 'Creating Account...' : 'Book A Demo →'}
                </button>

                {/* Divider */}
                <div className="auth-divider">
                  <div className="auth-divider-line"></div>
                  <span className="auth-divider-text">OR SIGN UP WITH</span>
                  <div className="auth-divider-line"></div>
                </div>

                {/* Social Registration */}
                <div className="auth-social-container">
                  <button
                    type="button"
                    className="auth-social-button"
                  >
                    <img 
                      src="/logos/Slack_icon_2019 1.svg" 
                      alt="Slack" 
                      className="auth-social-icon"
                    />
                    <span className="auth-social-text">Slack</span>
                  </button>
                  <button
                    type="button"
                    className="auth-social-button"
                  >
                    <img 
                      src="/logos/microsoft.png" 
                      alt="Microsoft" 
                      className="auth-social-icon"
                    />
                    <span className="auth-social-text">Microsoft</span>
                  </button>
                </div>

                {/* Login link */}
                <div className="auth-signup-link-container">
                  <span className="auth-signup-text">Already have an account? </span>
                  <button 
                    type="button"
                    onClick={onNavigateToLogin}
                    className="auth-signup-link"
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
export const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-center min-h-[600px]" style={{ padding: '48px' }}>
          <div className="max-w-3xl mx-auto text-center">
            {/* Success Icon - Centered */}
            <div className="flex justify-center" style={{ marginBottom: '40px' }}>
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Thank You Message */}
            <h1 className="text-4xl font-bold text-gray-900" style={{ marginBottom: '24px' }}>Thank You For Your Interest</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ marginBottom: '64px' }}>
              We've received your request and our team will review it as soon as possible. 
              We'll reach out to schedule a personalised demo
            </p>

            {/* What Happens Next */}
            <div style={{ marginBottom: '40px' }}>
              <h2 className="text-3xl font-semibold text-gray-900" style={{ marginBottom: '40px' }}>What Happens Next?</h2>
              
              <div className="space-y-6 max-w-4xl mx-auto">
                {/* Timeline Steps */}
                <div className="flex items-center justify-between bg-blue-50 rounded-lg" style={{ padding: '24px' }}>
                  <div className="font-medium text-gray-900 text-lg" style={{ marginRight: '16px' }}>Right now:</div>
                  <div className="text-gray-700 text-lg">Check your email for a confirmation</div>
                </div>
                
                <div className="flex items-center justify-between bg-blue-50 rounded-lg" style={{ padding: '24px' }}>
                  <div className="font-medium text-gray-900 text-lg" style={{ marginRight: '16px' }}>Within 24 hours:</div>
                  <div className="text-gray-700 text-lg">Initial review by our team</div>
                </div>
                
                <div className="flex items-center justify-between bg-blue-50 rounded-lg" style={{ padding: '24px' }}>
                  <div className="font-medium text-gray-900 text-lg" style={{ marginRight: '16px' }}>24-48 hours:</div>
                  <div className="text-gray-700 text-lg">Our team will reach out for a demo schedule</div>
                </div>
                
                <div className="flex items-center justify-between bg-blue-50 rounded-lg" style={{ padding: '24px' }}>
                  <div className="font-medium text-gray-900 text-lg" style={{ marginRight: '16px' }}>Then:</div>
                  <div className="text-gray-700 text-lg">If you're satisfied, you'll receive platform access & we'll begin onboarding</div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center">
              <p className="text-lg text-gray-600">
                If you have urgent needs, <a href="#" className="text-blue-600 hover:underline font-medium">contact our team directly</a>
              </p>
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
        return <SuccessPage />;
      default:
        return <LoginPage onNavigateToSignup={() => setCurrentPage('register')} />;
    }
  };

  return renderPage();
};

export default PulseFlowAuth;
