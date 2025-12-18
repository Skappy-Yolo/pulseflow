import React from 'react';
import DashboardLayout from '../shared/layout/DashboardLayout';

const ExecutiveDashboard: React.FC = () => {
  return (
    <DashboardLayout userType="executive">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Executive Dashboard</h1>
        <p className="text-gray-600">Ready to copy and paste your components here!</p>
      </div>
    </DashboardLayout>
  );
};

export default ExecutiveDashboard;
