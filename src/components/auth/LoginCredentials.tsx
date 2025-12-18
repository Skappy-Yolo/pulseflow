import React from 'react';

const LoginCredentials: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h3 className="text-sm font-semibold text-blue-900 mb-3">Demo Login Credentials</h3>
      <div className="space-y-2 text-sm">
        <div>
          <strong className="text-blue-800">Consultant:</strong>
          <div className="ml-4 text-blue-700">
            Email: consultant@pulseflow.com<br/>
            Password: consultant123
          </div>
        </div>
        <div>
          <strong className="text-blue-800">Executive:</strong>
          <div className="ml-4 text-blue-700">
            Email: executive@pulseflow.com<br/>
            Password: executive123
          </div>
        </div>
        <div>
          <strong className="text-blue-800">Admin:</strong>
          <div className="ml-4 text-blue-700">
            Email: emmanuel@pulseflow.com<br/>
            Password: password<br/>
            <em>(Access at /admin/login)</em>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCredentials;
