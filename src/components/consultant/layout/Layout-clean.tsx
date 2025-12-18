import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { COLORS, LAYOUT } from '../shared/enhanced-design-system';

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
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
            Welcome to PulseFlow Dashboard - {activeTab} section is ready!
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'overview' ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{
                backgroundColor: COLORS.primary[500],
                color: 'white'
              }}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'clients' ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{
                backgroundColor: COLORS.primary[500],
                color: 'white'
              }}
            >
              Clients
            </button>
          </div>
        </div>
      </div>
    );
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
