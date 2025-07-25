import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Logo Component - Same as main auth with blue text
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

// Standalone Success Page Component for Testing
const StandaloneSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const user = {
    firstName: 'John',
    workEmail: 'john.doe@company.com'
  };

  const handleBackToLogin = () => {
    navigate('/login');
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
            onClick={handleBackToLogin}
            style={{
              width: '100%',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              paddingTop: '18px',
              paddingBottom: '18px',
              paddingLeft: '16px',
              paddingRight: '16px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '18px',
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

        {/* Testing Note */}
        <div style={{ 
          marginTop: '32px', 
          padding: '16px', 
          backgroundColor: '#f0f9ff', 
          borderRadius: '8px',
          border: '1px solid #e0f2fe'
        }}>
          <p style={{ fontSize: '12px', color: '#0369a1', fontWeight: '500', margin: 0 }}>
            🧪 Testing Mode: This is a standalone success page for testing purposes
          </p>
        </div>
      </div>
    </div>
  );
};

export default StandaloneSuccessPage;
