import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import OverviewPage from './components/OverviewPage';
import ClientsPage from './components/ClientsPage';

const ClaudeTestApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
          <Routes>
            <Route path="/claude-test" element={<OverviewPage />} />
            <Route path="/claude-test/clients" element={<ClientsPage />} />
            <Route path="*" element={<OverviewPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default ClaudeTestApp;
