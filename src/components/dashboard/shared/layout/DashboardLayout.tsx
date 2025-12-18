import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'consultant' | 'executive';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userType }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">
                PulseFlow {userType === 'consultant' ? 'Consultant' : 'Executive'} Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome back!</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <nav className="p-4">
            <div className="space-y-2">
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <span className="w-5 h-5 bg-gray-400 rounded"></span>
                Dashboard
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <span className="w-5 h-5 bg-gray-400 rounded"></span>
                {userType === 'consultant' ? 'Clients' : 'Portfolio'}
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <span className="w-5 h-5 bg-gray-400 rounded"></span>
                Reports
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <span className="w-5 h-5 bg-gray-400 rounded"></span>
                Settings
              </a>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
