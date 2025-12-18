import React from 'react';
import { 
  Users, CheckCircle, AlertTriangle, Bell, Plus, Filter, ArrowUpDown, LucideIcon
} from 'lucide-react';
import { COLORS } from '../constants/colors';
import { CLIENTS_DATA } from '../constants/data';
import { ClientsPageProps, StatData } from '../types/index';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
  bgColor: string;
}

const ClientsPage: React.FC<ClientsPageProps> = ({ setActiveTab }) => {
  const statsData: StatData[] = [
    { icon: 'Users', label: 'Total Clients', value: '6', color: COLORS.primary[500], bgColor: COLORS.primary[50] },
    { icon: 'CheckCircle', label: 'Average Health', value: '81', color: COLORS.status.excellent[600], bgColor: COLORS.status.excellent[50] },
    { icon: 'AlertTriangle', label: 'Critical', value: '6', color: COLORS.status.critical[600], bgColor: COLORS.status.critical[50] },
    { icon: 'Bell', label: 'Active Alerts', value: '10', color: COLORS.status.warning[600], bgColor: COLORS.status.warning[50] },
  ];

  const getIconComponent = (iconName: string): LucideIcon => {
    const iconMap: Record<string, LucideIcon> = {
      Users,
      CheckCircle,
      AlertTriangle,
      Bell
    };
    return iconMap[iconName] || Users;
  };

  const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, color, bgColor }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: bgColor }}>
        <Icon size={28} style={{ color }} />
      </div>
      <div className="text-3xl font-bold mb-2" style={{ color }}>{value}</div>
      <div className="text-base font-medium text-gray-600">{label}</div>
    </div>
  );

  const handleClientDetailClick = (clientName: string): void => {
    setActiveTab(`client-detail-${clientName.toLowerCase()}`);
  };

  const getTrendIcon = (trendType: string): string => {
    switch (trendType) {
      case 'positive':
        return '↗';
      case 'negative':
        return '↘';
      case 'warning':
        return '⚠';
      default:
        return '→';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Public Sans, sans-serif' }}>
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">My Clients</h1>
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Home</span><span>›</span><span>Clients</span>
            </nav>
          </div>
          <button className="flex items-center gap-3 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors">
            <Plus size={20} />
            <span>Add New Client</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const IconComponent = getIconComponent(stat.icon);
            return (
              <StatCard
                key={`stat-${stat.label}-${index}`}
                icon={IconComponent}
                label={stat.label}
                value={stat.value}
                color={stat.color}
                bgColor={stat.bgColor}
              />
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl font-medium hover:bg-gray-50">
              <Filter size={16} />
              <span>All Status</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl font-medium hover:bg-gray-50">
              <ArrowUpDown size={16} />
              <span>Sort by Health</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CLIENTS_DATA.map((client, index) => (
            <div 
              key={`client-card-${client.client}-${index}`} 
              className="bg-white rounded-xl border-l-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group" 
              style={{ borderLeftColor: client.color }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-gray-900">{client.client}</h3>
                    <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">Logo</span>
                    <div className="flex items-center gap-1">
                      <AlertTriangle size={14} className="text-red-500" />
                      <span className="text-xs text-red-600 font-medium">3</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">{client.metrics.category}</p>
                  <p className="text-sm text-gray-500">{client.metrics.users} • {client.metrics.mrr}</p>
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-bold mb-1" style={{ color: client.color }}>{client.healthScore}</div>
                  <div className="text-sm text-gray-600 mb-2">Overall Health Score</div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="flex items-center gap-1" style={{ color: client.color }}>
                      {getTrendIcon(client.trend.type)} {client.trend.text}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  {client.metrics.details.map((detail, detailIndex) => (
                    <div key={`detail-${client.client}-${detail.label}-${detailIndex}`} className="flex justify-between">
                      <span className="text-gray-600">{detail.label}:</span>
                      <span className="font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4 text-sm">
                  <span className="text-gray-600">Assigned {client.metrics.assigned}</span>
                  <span className="font-medium" style={{ color: client.color }}>Priority: {client.metrics.priority}</span>
                </div>

                <button 
                  className="w-full py-2 rounded-lg hover:shadow-lg transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg text-white font-semibold"
                  style={{ backgroundColor: client.color }}
                  onClick={() => handleClientDetailClick(client.client)}
                >
                  <span>Full Overview</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;