import React, { useEffect } from 'react';

const ExecutiveRedirect: React.FC = () => {
  useEffect(() => {
    // TODO: Redirect to the live Figma executive dashboard when available
    // For now, show a placeholder - update the URL when executive Figma site is ready
    // window.location.href = 'https://executive-dashboard-figma-site.figma.site';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            className="w-8 h-8 text-indigo-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3 font-['Public_Sans']">
          Executive Dashboard
        </h2>
        <p className="text-gray-600 mb-6 font-['Inter']">
          Your executive dashboard is being prepared. You'll have access to strategic insights 
          and cross-departmental analytics soon.
        </p>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <p className="text-sm text-indigo-700">
            <strong>Coming Soon:</strong> Real-time executive analytics, department-level KPIs, 
            and strategic decision support tools.
          </p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ExecutiveRedirect;
