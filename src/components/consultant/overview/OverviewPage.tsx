import React from 'react';
import { AlertTriangle } from 'lucide-react';
import ClientCard from './ClientCard';
import { COLORS } from '../constants/colors';
import { TRANSLATIONS } from '../constants/translations';
import { CLIENTS_DATA } from '../constants/data';
import { OverviewPageProps, Language } from '../types/index';

interface LifecycleStage {
  stage: string;
  Tripids: number;
  ENIES: number;
  Bunqqi: number;
}

const OverviewPage: React.FC<OverviewPageProps> = ({ setActiveTab, language }) => {
  const t = TRANSLATIONS[language as Language['code']];
  
  const lifecycleStages: LifecycleStage[] = [
    { stage: 'Marketing → Sales', Tripids: 85, ENIES: 72, Bunqqi: 90 },
    { stage: 'Sales → Product', Tripids: 75, ENIES: 45, Bunqqi: 82 },
    { stage: 'Product → Support', Tripids: 88, ENIES: 65, Bunqqi: 95 }
  ];

  const getStageDescription = (stage: string): string => {
    switch (stage) {
      case 'Marketing → Sales':
        return 'Tripids ranks 3rd of 5 similar clients';
      case 'Sales → Product':
        return 'ENIES ranks 5th of 5 similar clients';
      case 'Product → Support':
        return 'Bunqqi ranks 1st of 5 similar clients';
      default:
        return '';
    }
  };

  const getStageButtonText = (stage: string): string => {
    const stageType = stage.split(' → ')[0];
    return `See ${stageType} overview`;
  };

  const handleClientCardClick = (): void => {
    setActiveTab('clients');
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Public Sans, sans-serif' }}>
      <div className="p-6 space-y-6">
        {/* Welcome Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-white text-lg">👋</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-blue-900 mb-1" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                {t.welcome}
              </h2>
              <p className="text-sm text-blue-700" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                {t.portfolioOverview}
              </p>
            </div>
          </div>
        </div>

        {/* Client Cards - Fixed Spacing and Justification */}
        <div className="flex gap-6 justify-center px-4">
          {CLIENTS_DATA.map((client, index) => (
            <ClientCard 
              key={`${client.client}-${index}`}
              client={client.client}
              color={client.color}
              healthScore={client.healthScore}
              status={client.status}
              trend={client.trend}
              metrics={client.metrics}
              language={language}
              onViewClick={handleClientCardClick}
            />
          ))}
        </div>

        {/* Charts Section - FIXED HORIZONTAL Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Performance Chart - Takes 2/3 of the space */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                  {t.comparativePerformance}
                </h3>
                <select 
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
                  style={{ fontFamily: 'Public Sans, sans-serif' }}
                >
                  <option>This Month</option>
                </select>
              </div>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-white rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-sm" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                  Performance Chart Visualization
                </p>
              </div>
            </div>
          </div>
          
          {/* My Clients - Takes 1/3 of the space - BESIDE not below */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                  {t.myClients}
                </h3>
                <select 
                  className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-white"
                  style={{ fontFamily: 'Public Sans, sans-serif' }}
                >
                  <option>Industry</option>
                </select>
              </div>
              
              <div className="h-32 bg-gradient-to-br from-green-50 to-white rounded-lg flex items-center justify-center mb-4">
                <p className="text-gray-500 text-xs" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                  Distribution Chart
                </p>
              </div>
              
              <div className="space-y-3">
                {CLIENTS_DATA.map((client, index) => (
                  <div key={`client-summary-${client.client}-${index}`} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: client.color }} />
                      <span className="font-semibold text-gray-900" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                        {client.client}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 text-sm" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                        {client.metrics.users.split(' ')[0]}
                      </div>
                      <div className="text-xs text-gray-500" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                        {client.metrics.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Lifecycles */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Public Sans, sans-serif' }}>
              {t.productLifecycles}
            </h3>
            <select 
              className="border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium bg-white"
              style={{ fontFamily: 'Public Sans, sans-serif' }}
            >
              <option>{t.thisYear}</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {lifecycleStages.map((stage, index) => (
              <div key={`lifecycle-${stage.stage}-${index}`} className="text-center">
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-6" style={{ fontFamily: 'Public Sans, sans-serif' }}>
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
                      <span className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Public Sans, sans-serif' }}>T</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div 
                        className="w-12 rounded-t-lg shadow-sm"
                        style={{ 
                          height: `${(stage.ENIES / 100) * 120}px`,
                          backgroundColor: COLORS.clients.enies.primary
                        }}
                      />
                      <span className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Public Sans, sans-serif' }}>E</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div 
                        className="w-12 rounded-t-lg shadow-sm"
                        style={{ 
                          height: `${(stage.Bunqqi / 100) * 120}px`,
                          backgroundColor: COLORS.clients.bunqqi.primary
                        }}
                      />
                      <span className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Public Sans, sans-serif' }}>B</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-3" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                  {getStageDescription(stage.stage)}
                </div>
                <button 
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  style={{ fontFamily: 'Public Sans, sans-serif' }}
                  onClick={() => {/* Handle stage overview navigation */}}
                >
                  {getStageButtonText(stage.stage)}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle size={24} className="text-amber-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base leading-relaxed text-gray-900" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                  <span className="font-bold text-amber-800">Bunqqi</span> excels at sales conversion but has{" "}
                  <span className="font-bold text-red-600">higher support ticket rates</span> than sector peers.{" "}
                  <button 
                    className="font-bold text-blue-600 underline hover:text-blue-700 transition-colors"
                    onClick={() => {/* Handle recommendation action */}}
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