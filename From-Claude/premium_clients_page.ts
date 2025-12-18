import React from 'react';
import { Users, CheckCircle, AlertTriangle, Bell, Plus, Filter, ArrowUpDown } from 'lucide-react';
import { COLORS, COMPONENTS, SHADOWS, SPACING } from '../design-system/enhanced-design-system';

interface ClientsPageProps {
  setActiveTab: (tab: string) => void;
}

const ClientsPage: React.FC<ClientsPageProps> = ({ setActiveTab }) => {
  const statsData = [
    {
      icon: Users,
      label: 'Total Clients',
      value: '6',
      color: COLORS.primary[500],
      bgColor: COLORS.primary[50],
    },
    {
      icon: CheckCircle,
      label: 'Average Health',
      value: '81',
      color: COLORS.status.excellent[600],
      bgColor: COLORS.status.excellent[50],
    },
    {
      icon: AlertTriangle,
      label: 'Critical',
      value: '6',
      color: COLORS.status.critical[600],
      bgColor: COLORS.status.critical[50],
    },
    {
      icon: Bell,
      label: 'Active Alerts',
      value: '10',
      color: COLORS.status.warning[600],
      bgColor: COLORS.status.warning[50],
    },
  ];

  const clientsData = [
    {
      name: 'ENIES',
      category: 'Financial Technology',
      users: '33,471 Users',
      mrr: 'MRR: €950K',
      healthScore: 45,
      status: 'Critical',
      trend: 'Marketing - Sales dropped 15%',
      trendType: 'negative',
      assigned: 'Kenny M.',
      priority: 'High',
      alerts: 3,
      color: COLORS.clients.enies.primary,
      metrics: {
        marketing: '600 leads',
        sales: '45 deals (10%)',
        product: '2 active',
        support: '1 ticket'
      },
      detailTab: 'client-detail-enies'
    },
    {
      name: 'Bunqqi',
      category: 'FinTech',
      users: '2,904 Users',
      mrr: 'MRR: €470K',
      healthScore: 94,
      status: 'Excellent',
      trend: 'All Systems Performing Well',
      trendType: 'positive',
      assigned: 'Emmanuel O.',
      priority: 'Low',
      alerts: 1,
      color: COLORS.clients.bunqqi.primary,
      metrics: {
        marketing: '402 leads',
        sales: '178 deals (42%)',
        product: '43 active',
        support: '2 tickets'
      },
      detailTab: 'client-detail-bunqqi'
    },
    {
      name: 'Tripids',
      category: 'E-commerce',
      users: '11,182 Users',
      mrr: 'MRR: €610K',
      healthScore: 78,
      status: 'Good',
      trend: 'Product Adoption below target',
      trendType: 'warning',
      assigned: 'Dieter Van De Bronc',
      priority: 'Medium',
      alerts: 2,
      color: COLORS.clients.tripids.primary,
      metrics: {
        marketing: '320 leads',
        sales: '47 deals (15%)',
        product: '18 active',
        support: '4 tickets'
      },
      detailTab: 'client-detail-tripids'
    },
  ];

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return COLORS.status.excellent[600];
    if (score >= 60) return COLORS.status.warning[600];
    return COLORS.status.critical[600];
  };

  const getTrendColor = (type: string) => {
    switch (type) {
      case 'positive':
        return COLORS.status.excellent[600];
      case 'negative':
        return COLORS.status.critical[600];
      case 'warning':
        return COLORS.status.warning[600];
      default:
        return COLORS.text.secondary;
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'critical':
        return {
          backgroundColor: COLORS.status.critical[50],
          color: COLORS.status.critical[700],
          borderColor: COLORS.status.critical[200],
        };
      case 'excellent':
        return {
          backgroundColor: COLORS.status.excellent[50],
          color: COLORS.status.excellent[700],
          borderColor: COLORS.status.excellent[200],
        };
      case 'good':
        return {
          backgroundColor: COLORS.status.warning[50],
          color: COLORS.status.warning[700],
          borderColor: COLORS.status.warning[200],
        };
      default:
        return {
          backgroundColor: COLORS.gray[50],
          color: COLORS.gray[700],
          borderColor: COLORS.gray[200],
        };
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: COLORS.background.primary }}
    >
      <div className="p-8 space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 
              className="text-3xl font-bold mb-3"
              style={{ color: COLORS.text.primary }}
            >
              My Clients
            </h1>
            <nav className="flex items-center space-x-2 text-sm">
              <span style={{ color: COLORS.text.secondary }}>Home</span>
              <span style={{ color: COLORS.text.tertiary }}>›</span>
              <span style={{ color: COLORS.text.secondary }}>Clients</span>
            </nav>
          </div>
          <button 
            className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-md hover:scale-105"
            style={{
              backgroundColor: COLORS.primary[500],
              color: 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primary[600];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primary[500];
            }}
          >
            <Plus size={20} />
            <span>Add New Client</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl border p-6 text-center transition-all duration-200 hover:shadow-md"
              style={{ 
                borderColor: COLORS.border.default,
                boxShadow: COMPONENTS.card.shadow
              }}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"
                style={{ backgroundColor: stat.bgColor }}
              >
                <stat.icon size={28} style={{ color: stat.color }} />
              </div>
              <div 
                className="text-3xl font-bold mb-2"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div 
                className="text-base font-medium"
                style={{ color: COLORS.text.secondary }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div 
          className="bg-white rounded-2xl border p-6"
          style={{ 
            borderColor: COLORS.border.default,
            boxShadow: COMPONENTS.card.shadow
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="flex items-center gap-2 px-4 py-2 border rounded-xl font-medium transition-all duration-200 hover:bg-gray-50"
                style={{ borderColor: COLORS.border.default }}
              >
                <Filter size={16} />
                <span>All Status</span>
              </button>
              <button 
                className="flex items-center gap-2 px-4 py-2 border rounded-xl font-medium transition-all duration-200 hover:bg-gray-50"
                style={{ borderColor: COLORS.border.default }}
              >
                <ArrowUpDown size={16} />
                <span>Sort by Health</span>
              </button>
            </div>
          </div>
        </div>

        {/* Client Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {clientsData.map((client, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group hover:scale-[1.02]"
              style={{ borderColor: COLORS.border.default }}
            >
              {/* Color accent border */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ backgroundColor: client.color }}
              />
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 
                      className="text-xl font-bold"
                      style={{ color: COLORS.text.primary }}
                    >
                      {client.name}
                    </h3>
                    <div className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-500">
                      Logo
                    </div>
                    {client.alerts > 0 && (
                      <div className="flex items-center gap-1">
                        <AlertTriangle size={14} style={{ color: COLORS.status.critical[500] }} />
                        <span 
                          className="text-xs font-bold"
                          style={{ color: COLORS.status.critical[600] }}
                        >
                          {client.alerts}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <p 
                    className="text-sm mb-1"
                    style={{ color: COLORS.text.secondary }}
                  >
                    {client.category}
                  </p>
                  <p 
                    className="text-sm"
                    style={{ color: COLORS.text.tertiary }}
                  >
                    {client.users} • {client.mrr}
                  </p>
                </div>

                {/* Health Score */}
                <div className="mb-4">
                  <div 
                    className="text-4xl font-bold mb-2"
                    style={{ color: getHealthScoreColor(client.healthScore) }}
                  >
                    {client.healthScore}
                  </div>
                  <div 
                    className="text-sm mb-3"
                    style={{ color: COLORS.text.secondary }}
                  >
                    Overall Health Score
                  </div>
                  <div 
                    className="flex items-center gap-2 text-sm mb-4 px-3 py-2 rounded-lg"
                    style={{ 
                      backgroundColor: client.trendType === 'positive' ? COLORS.status.excellent[50] : 
                                      client.trendType === 'negative' ? COLORS.status.critical[50] : 
                                      COLORS.status.warning[50]
                    }}
                  >
                    <span 
                      className="font-medium"
                      style={{ color: getTrendColor(client.trendType) }}
                    >
                      {client.trend}
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Marketing</div>
                    <div className="text-sm font-semibold text-gray-900">{client.metrics.marketing}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Sales</div>
                    <div className="text-sm font-semibold text-gray-900">{client.metrics.sales}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Product</div>
                    <div className="text-sm font-semibold text-gray-900">{client.metrics.product}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Support</div>
                    <div className="text-sm font-semibold text-gray-900">{client.metrics.support}</div>
                  </div>
                </div>

                {/* Team & Priority */}
                <div className="flex items-center justify-between mb-4 text-sm">
                  <span style={{ color: COLORS.text.secondary }}>
                    Assigned {client.assigned}
                  </span>
                  <span 
                    className="font-bold"
                    style={{ color: client.color }}
                  >
                    Priority: {client.priority}
                  </span>
                </div>

                {/* Action Button */}
                <button 
                  className="w-full py-3 px-4 border-2 rounded-xl font-semibold transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                  style={{ 
                    borderColor: client.color,
                    color: client.color,
                    backgroundColor: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = client.color;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = client.color;
                  }}
                  onClick={() => setActiveTab(client.detailTab)}
                >
                  <span>Full Overview</span>
                  <span className="text-lg">→</span>
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