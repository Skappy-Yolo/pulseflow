import React, { useEffect } from 'react';

const ConsultantRedirect: React.FC = () => {
  useEffect(() => {
    // Redirect to the live Figma dashboard
    window.location.href = 'https://cozy-trace-60283357.figma.site';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Redirecting to Consultant Dashboard...
        </h2>
        <p className="text-gray-600">
          Taking you to your personalized dashboard
        </p>
      </div>
    </div>
  );
};

export default ConsultantRedirect;
