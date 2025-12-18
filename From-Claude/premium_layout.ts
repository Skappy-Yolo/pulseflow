import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import OverviewPage from '../overview/OverviewPage';
import ClientsPage from '../clients/ClientsPage';
import ClientDetailPage from '../client-detail/ClientDetailPage';
import { COLORS, LAYOUT } from '../design-system/enhanced-design-system';

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPage setActiveTab={setActiveTab} />;
      case 'clients':
        return <ClientsPage setActiveTab={setActiveTab} />;
      case 'client-detail-tripids':
      case 'client-detail-enies':
      case 'client-detail-bunqqi':
        return <ClientDetailPage activeTab={activeTab} setActiveTab={setActiveTab} />;
      default:
        return (
          <div 
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: COLORS.background.primary }}
          >
            <div className="text-center p-12">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                style={{ backgroundColor: COLORS.primary[50] }}
              >
                <span 
                  className="text-4xl"
                  style={{ color: COLORS.primary[500] }}
                >
                  📊
                </span>
              </div>
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ color: COLORS.text.primary }}
              >
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')} Page
              </h3>
              <p 
                className="text-lg"
                style={{ color: COLORS.text.secondary }}
              >
                This section is coming next!
              </p>
              <button
                onClick={() => setActiveTab('overview')}
                className="mt-6 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-md"
                style={{
                  backgroundColor: COLORS.primary[500],
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.primary[600];
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.primary[500];
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Back to Overview
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className="min-h-screen flex"
      style={{ backgroundColor: COLORS.background.primary }}
    >
      {/* Fixed Sidebar */}
      <div 
        className="fixed left-0 top-0 h-full z-20"
        style={{ width: LAYOUT.sidebar.width }}
      >
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      {/* Main Content Area */}
      <div 
        className="flex-1"
        style={{ marginLeft: LAYOUT.sidebar.width }}
      >
        <Header />
        <main className="relative">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Layout;