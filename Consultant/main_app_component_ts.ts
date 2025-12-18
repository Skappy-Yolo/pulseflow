import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import OverviewPage from './components/OverviewPage';
import ClientsPage from './components/ClientsPage';
import { Language } from './types/index';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [language, setLanguage] = useState<Language['code']>('en');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const renderContent = (): JSX.Element => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPage setActiveTab={setActiveTab} language={language} />;
      case 'clients':
        return <ClientsPage setActiveTab={setActiveTab} />;
      default:
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center" style={{ fontFamily: 'Public Sans, sans-serif' }}>
            <div className="text-center p-12">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-blue-500">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')} Page
              </h3>
              <p className="text-lg text-gray-600 mb-6">This section is coming next!</p>
              <button
                onClick={() => setActiveTab('overview')}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                style={{ fontFamily: 'Public Sans, sans-serif' }}
              >
                Back to Overview
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 z-20">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 ml-72">
        <Header 
          language={language} 
          setLanguage={setLanguage}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />
        <main className="relative">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;