import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ConsultantDashboard from '../dashboards/ConsultantDashboard';

const ConsultantRedirect: React.FC = () => {
  const { userEmail } = useAuth();

  // Render the actual consultant dashboard instead of redirecting
  return <ConsultantDashboard userEmail={userEmail || undefined} />;
};

export default ConsultantRedirect;
