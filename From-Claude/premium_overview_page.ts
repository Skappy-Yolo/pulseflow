import React from 'react';
import { AlertTriangle } from 'lucide-react';
import ClientCard from '../shared/ui/ClientCard';
import PerformanceChart from '../shared/charts/PerformanceChart';
import ClientDistributionChart from '../shared/charts/ClientDistributionChart';
import { COLORS, COMPONENTS, SPACING } from '../design-system/enhanced-design-system';

interface OverviewPageProps {
  setActiveTab: (tab: string) => void;
}

const OverviewPage: React.FC<OverviewPageProps> = ({ setActiveTab }) => {
  // Mock data for charts
  const performanceData = [
    { date: 'Nov 01', ENIES: 82, Bunqqi: 48 },
    { date: 'Nov 05', ENIES: 41, Bunqqi: 65 },
    { date: 'Nov 10', ENIES: 38, Bunqqi: 55 },
    { date: 'Nov 15', ENIES: 45, Bunqqi: 45 },
    { date: 'Nov 20', ENIES: 62, Bunqqi: 75 },
    { date: 'Nov 25', ENIES: 55, Bunqqi: 60 },
    { date: 'Nov 30', ENIES: 40, Bunqqi: 88 }
  ];

  const clientDistribution = [
    { name: 'Tripids', value: 11182, color: COLORS.clients.tripids.primary },
    { name: 'ENIES', value: 33471, color: COLORS.clients.enies.primary },
    { name: 'Bunqqi', value: 2904, color: COLORS.clients.bunqqi.primary }
  ];

  const lifecycleData = [
    { stage: 'Marketing→Sales', Tripids: 85, ENIES: 72, Bunqqi: 90 },
    { stage: 'Sales→Product', Tripids: 75, ENIES: 45, Bunqqi: 82 },
    { stage: 'Product→Support', Tripids: 88, ENIES: 65, Bunqqi: 95 }
  ];

  const clientsData = [
    {
      client: 'ENIES',
      color: COLORS.clients.enies.primary,
      healthScore: 45,
      status: 'Critical',
      trend: { type: 'negative' as const, text: 'Marketing - Sales dropped 15%' },
      metrics: {
        category: 'Financial Technology',
        users: '33,471 Users',
        mrr: 'MRR: €950K',
        assigned: 'Kenny M.',
        priority: 'High',
        details: [
          { label: 'Marketing', value: '600 leads' },
          { label: 'Sales', value: '45 deals (10%)' },
          { label: 'Product', value: '2 active' },
          { label: 'Support', value: '1 ticket' }
        ]
      }
    },
    {
      client: 'Bunqqi',
      color: COLORS.clients.bunqqi.primary,
      healthScore: 94,
      status: 'Excellent',
      trend: { type: 'positive' as const, text: 'All Systems Performing Well' },
      metrics: {
        category: 'FinTech',
        users: '2904 Users',
        mrr: 'MRR: €470K',
        assigned: 'Emmanuel O.',
        priority: 'Low',
        details: [
          { label: 'Marketing', value: '402 leads' },
          { label: 'Sales', value: '178 deals (42%)' },
          { label: 'Product', value: '43 active' },
          { label: 'Support', value: '2 tickets' }
        ]
      }
    },
    {
      client: 'Tripids',
      color: COLORS.clients.tripids.primary,
      healthScore: 78,
      status: 'Good',
      trend: { type: 'warning' as const, text: 'Product Adoption below target' },
      metrics: {
        category: 'E-commerce',
        users: '11,182 Users',
        mrr: 'MRR: €610K',
        assigned: 'Dieter Van De Bronc',
        priority: 'Medium',
        details: [
          { label: 'Marketing', value: '320 leads' },
          { label: 'Sales', value: '47 deals (15%)' },
          { label: 'Product', value: '18 active' },
          { label: 'Support', value: '4 tickets' }
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background.primary }}>
      <div className="p-8 space-y-8">
        {/* Welcome Message */}
        <div 
          className="rounded-2xl p-6 border"
          style={{ 
            backgroundColor: COLORS.primary[50],
            borderColor: COLORS.primary[200]
          }}
        >
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
              style={{ backgroundColor: COLORS.primary[500] }}
            >
              <span className="text-white text-lg">👋</span>
            </div>
            <div>
              <h2 
                className="text-xl font-bold mb-2"
                style={{ color: COLORS.primary[900] }}
              >
                Hey, Consuela.
              </h2>
              <p 
                className="text-base"
                style={{ color: COLORS.primary[700] }}
              >
                Here is an overview of your portfolio
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
              className="hover:scale-[1.02] transition-transform duration-200"
            />
          ))}
        </div>

        {/* Charts Section - Enhanced Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="xl:col-span-3">
            <PerformanceChart data={performanceData} />
          </div>
          <div className="xl:col-span-2">
            <ClientDistributionChart data={clientDistribution} />
          </div>
        </div>

        {/* Product Lifecycles - Enhanced Design */}
        <div 
          className="rounded-2xl border p-8"
          style={{ 
            backgroundColor: COLORS.background.secondary,
            borderColor: COLORS.border.default,
            boxShadow: COMPONENTS.card.shadow
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 
              className="text-2xl font-bold"
              style={{ color: COLORS.text.primary }}
            >
              Product Lifecycles
            </h3>
            <select 
              className="border rounded-xl px-4 py-2 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: COLORS.border.default }}
            >
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {lifecycleData.map((stage, index) => (
              <div key={index} className="text-center">
                <div 
                  className="rounded-xl p-6 mb-6"
                  style={{ backgroundColor: COLORS.gray[50] }}
                >
                  <h4 
                    className="text-lg font-semibold mb-6"
                    style={{ color: COLORS.text.secondary }}
                  >
                    {stage.stage}
                  </h4>
                  <div className="flex items-end justify-center space-x-4 h-40">
                    <div className="flex flex-col items-center space-y-2">
                      <div 
                        className="w-12 rounded-t-lg shadow-sm"
                        style={{ 
                          height: `${(stage.Tripids / 100) * 120}px`,
                          backgroundColor: COLORS.clients.tripids.primary
                        }}
                      />
                      <span className="text-sm font-medium text-gray-600">T</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div 
                        className="w-12 rounded-t-lg shadow-sm"
                        style={{ 
                          height: `${(stage.ENIES / 100) * 120}px`,
                          backgroundColor: COLORS.clients.enies.primary
                        }}
                      />
                      <span className="text-sm font-medium text-gray-600">E</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div 
                        className="w-12 rounded-t-lg shadow-sm"
                        style={{ 
                          height: `${(stage.Bunqqi / 100) * 120}px`,
                          backgroundColor: COLORS.clients.bunqqi.primary
                        }}
                      />
                      <span className="text-sm font-medium text-gray-600">B</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-3">
                  {stage.stage === 'Marketing→Sales' ? 'Tripids ranks 3rd of 5 similar clients' :
                   stage.stage === 'Sales→Product' ? 'ENIES ranks 5th of 5 similar clients' :
                   'Bunqqi ranks 1st of 5 similar clients'}
                </div>
                <button 
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                >
                  See {stage.stage.split('→')[0]} overview
                </button>
              </div>
            ))}
          </div>

          {/* Insight Alert - Enhanced Design */}
          <div 
            className="mt-8 rounded-xl p-6 border"
            style={{ 
              backgroundColor: COLORS.status.warning[50],
              borderColor: COLORS.status.warning[200]
            }}
          >
            <div className="flex items-start space-x-4">
              <AlertTriangle 
                size={24} 
                style={{ color: COLORS.status.warning[600] }}
                className="mt-1 flex-shrink-0"
              />
              <div className="flex-1">
                <p className="text-base leading-relaxed" style={{ color: COLORS.text.primary }}>
                  <span 
                    className="font-bold"
                    style={{ color: COLORS.status.warning[800] }}
                  >
                    Bunqqi
                  </span>{" "}
                  excels at sales conversion but has{" "}
                  <span 
                    className="font-bold"
                    style={{ color: COLORS.status.critical[600] }}
                  >
                    higher support ticket rates
                  </span>{" "}
                  than sector peers.{" "}
                  <button 
                    className="font-bold underline transition-colors duration-200"
                    style={{ color: COLORS.primary[600] }}
                    onMouseEnter={(e) => e.target.style.color = COLORS.primary[700]}
                    onMouseLeave={(e) => e.target.style.color = COLORS.primary[600]}
                  >
                    Recommend analyzing onboarding process for product usability improvements.
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;