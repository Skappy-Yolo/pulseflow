import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ExecutiveDashboard from '../dashboards/ExecutiveDashboard';

const ExecutiveRedirect: React.FC = () => {
  const { userEmail } = useAuth();

  // Render the actual executive dashboard instead of showing placeholder
  return <ExecutiveDashboard userEmail={userEmail || undefined} />;
};

export default ExecutiveRedirect;
