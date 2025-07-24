import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminDashboard from '../admin/AdminDashboard';

interface DebugPanelProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ isVisible, onToggle }) => {
  const { isAuthenticated, hasCompletedSignup, userEmail, logout } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const clearLocalStorage = () => {
    localStorage.removeItem('pulseflow_auth');
    window.location.reload();
  };

  const getCurrentAuthData = () => {
    const data = localStorage.getItem('pulseflow_auth');
    return data ? JSON.parse(data) : null;
  };

  const setTestAuthState = (state: 'none' | 'authenticated' | 'completed') => {
    localStorage.removeItem('pulseflow_auth');
    
    if (state === 'authenticated') {
      const authData = {
        isAuthenticated: true,
        hasCompletedSignup: false,
        userEmail: 'test@company.com',
        userInfo: null
      };
      localStorage.setItem('pulseflow_auth', JSON.stringify(authData));
    } else if (state === 'completed') {
      const authData = {
        isAuthenticated: true,
        hasCompletedSignup: true,
        userEmail: 'test@company.com',
        userInfo: {
          firstName: 'Test',
          lastName: 'User',
          company: 'Test Company'
        }
      };
      localStorage.setItem('pulseflow_auth', JSON.stringify(authData));
    }
    
    window.location.reload();
  };

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium hover:bg-red-700 transition-colors z-50"
        style={{ fontSize: '12px' }}
      >
        🐛 Debug
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-red-500 rounded-lg shadow-xl p-4 max-w-sm z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-red-600">🐛 Auth Debug Panel</h3>
        <button
          onClick={onToggle}
          className="text-gray-500 hover:text-gray-700 text-lg"
        >
          ×
        </button>
      </div>

      {/* Current State */}
      <div className="mb-4 p-3 bg-gray-50 rounded text-xs">
        <div className="font-medium mb-2">Current Auth State:</div>
        <div className={`mb-1 ${isAuthenticated ? 'text-green-600' : 'text-red-600'}`}>
          🔐 Authenticated: {isAuthenticated ? 'YES' : 'NO'}
        </div>
        <div className={`mb-1 ${hasCompletedSignup ? 'text-green-600' : 'text-red-600'}`}>
          ✅ Signup Complete: {hasCompletedSignup ? 'YES' : 'NO'}
        </div>
        <div className="mb-1 text-gray-600">
          📧 Email: {userEmail || 'None'}
        </div>
        
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600 hover:underline text-xs mt-2"
        >
          {showDetails ? 'Hide' : 'Show'} localStorage data
        </button>
        
        {showDetails && (
          <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-20">
            {JSON.stringify(getCurrentAuthData(), null, 2)}
          </pre>
        )}
      </div>

      {/* Route Access Status */}
      <div className="mb-4 p-3 bg-blue-50 rounded text-xs">
        <div className="font-medium mb-2">Route Access:</div>
        <div className="text-green-600">✅ Landing (/)</div>
        <div className="text-green-600">✅ Login (/login)</div>
        <div className="text-green-600">✅ Signup (/signup)</div>
        <div className={hasCompletedSignup ? 'text-green-600' : 'text-red-600'}>
          {hasCompletedSignup ? '✅' : '❌'} Success (/success) {!hasCompletedSignup && '← BLOCKED'}
        </div>
      </div>

      {/* Test Controls */}
      <div className="mb-4">
        <div className="font-medium mb-2 text-xs">Test Auth States:</div>
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => setTestAuthState('none')}
            className="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600"
          >
            🚫 Clear All (Logged Out)
          </button>
          <button
            onClick={() => setTestAuthState('authenticated')}
            className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600"
          >
            🔐 Logged In Only
          </button>
          <button
            onClick={() => setTestAuthState('completed')}
            className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
          >
            ✅ Fully Signed Up
          </button>
        </div>
      </div>

      {/* Clear Actions */}
      <div className="border-t pt-3">
        <button
          onClick={clearLocalStorage}
          className="w-full bg-red-500 text-white px-3 py-2 rounded text-xs font-medium hover:bg-red-600 mb-2"
        >
          🗑️ Clear localStorage & Reload
        </button>
        
        {isAuthenticated && (
          <button
            onClick={logout}
            className="w-full bg-orange-500 text-white px-3 py-2 rounded text-xs font-medium hover:bg-orange-600"
          >
            🚪 Logout (Context Only)
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-3 p-2 bg-yellow-50 rounded text-xs">
        <div className="font-medium text-yellow-800 mb-1">Testing Tips:</div>
        <div className="text-yellow-700">
          • Use "Clear All" then try /success<br/>
          • Test in incognito for clean state<br/>
          • Check console for auth errors
        </div>
      </div>

      {/* Admin Access */}
      <div className="mt-3 border-t pt-3">
        <button
          onClick={() => setShowAdmin(true)}
          className="w-full bg-indigo-600 text-white px-3 py-2 rounded text-xs font-medium hover:bg-indigo-700"
        >
          👑 Admin Dashboard
        </button>
      </div>

      {/* Admin Dashboard Modal */}
      {showAdmin && (
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      )}
    </div>
  );
};

export default DebugPanel;
