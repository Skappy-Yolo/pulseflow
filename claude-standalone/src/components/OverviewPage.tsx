import React from 'react';
import ClientCard from './ClientCard';
import PerformanceChart from './PerformanceChart';
import ClientDistributionChart from './ClientDistributionChart';

interface OverviewPageProps {
  setActiveTab: (tab: string) => void;
}

const OverviewPage: React.FC<OverviewPageProps> = ({ setActiveTab }) => {
  const clientsData = [
    {
      name: 'TRIPIDS',
      healthScore: 87,
      totalUsers: 24567,
      trend: 12.5,
      status: 'Active' as const,
    },
    {
      name: 'ENIES',
      healthScore: 64,
      totalUsers: 15890,
      trend: -5.2,
      status: 'Warning' as const,
    },
    {
      name: 'BUNQQI',
      healthScore: 92,
      totalUsers: 7100,
      trend: 8.7,
      status: 'Active' as const,
    },
  ];

  const performanceData = [
    { period: 'Jan', tripids: 45, enies: 38, bunqqi: 22 },
    { period: 'Feb', tripids: 52, enies: 35, bunqqi: 28 },
    { period: 'Mar', tripids: 48, enies: 42, bunqqi: 25 },
    { period: 'Apr', tripids: 61, enies: 45, bunqqi: 32 },
    { period: 'May', tripids: 55, enies: 40, bunqqi: 29 },
    { period: 'Jun', tripids: 67, enies: 48, bunqqi: 35 },
  ];

  const clientDistribution = [
    { name: 'TRIPIDS', value: 24567, color: '#f59e0b' },
    { name: 'ENIES', value: 15890, color: '#dc2626' },
    { name: 'BUNQQI', value: 7100, color: '#059669' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="text-white text-lg">👋</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Hey, Consuela.</h2>
            <p className="text-blue-700 text-base leading-relaxed">
              Here is an overview of your portfolio. You're managing <span className="font-semibold">3 active clients</span> with a combined user base of <span className="font-semibold">47,557 users</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Client Cards - Enhanced Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {clientsData.map((client, index) => (
          <ClientCard 
            key={index} 
            {...client} 
            onViewClick={() => setActiveTab('clients')}
          />
        ))}
      </div>

      {/* Charts Section - Premium Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        <div className="xl:col-span-3">
          <PerformanceChart data={performanceData} />
        </div>
        <div className="xl:col-span-2">
          <ClientDistributionChart data={clientDistribution} />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
