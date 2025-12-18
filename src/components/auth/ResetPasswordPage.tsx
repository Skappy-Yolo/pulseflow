import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

const ResetPasswordPage: React.FC<{ onNavigateToLogin: () => void }> = ({ onNavigateToLogin }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', padding: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px', color: '#2563eb' }}>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontWeight: 500 }}>New Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', marginBottom: '16px', fontSize: '1rem', color: '#1f2937', backgroundColor: '#ffffff', caretColor: '#1f2937' }}
            placeholder="Enter new password"
          />
          <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontWeight: 500 }}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', marginBottom: '16px', fontSize: '1rem', color: '#1f2937', backgroundColor: '#ffffff', caretColor: '#1f2937' }}
            placeholder="Confirm new password"
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: isLoading ? '#60a5fa' : '#2563eb', color: '#fff', fontWeight: 600, fontSize: '1rem', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', marginBottom: '12px' }}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        {success && <div style={{ color: '#16a34a', marginBottom: '8px' }}>Password reset successful! You can now log in.</div>}
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

export default ResetPasswordPage;
