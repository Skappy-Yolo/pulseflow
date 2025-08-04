import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

const ForgotPasswordPage: React.FC<{ onNavigateToLogin: () => void }> = ({ onNavigateToLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password` // Make sure this route exists in your app
      });
      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Failed to send reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', padding: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px', color: '#2563eb' }}>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontWeight: 500 }}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', marginBottom: '16px', fontSize: '1rem' }}
            placeholder="Enter your email"
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: isLoading ? '#60a5fa' : '#2563eb', color: '#fff', fontWeight: 600, fontSize: '1rem', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', marginBottom: '12px' }}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        {success && <div style={{ color: '#16a34a', marginBottom: '8px' }}>Check your email for a password reset link.</div>}
        {error && <div style={{ color: '#dc2626', marginBottom: '8px' }}>{error}</div>}
        <button
          onClick={onNavigateToLogin}
          style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 600, cursor: 'pointer', marginTop: '8px' }}
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
