import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { COLORS, COMPONENTS, getClientTheme, getHealthScoreColor, getStatusColor } from '../design-system/enhanced-design-system';

interface ClientMetrics {
  category: string;
  users: string;
  mrr: string;
  assigned: string;
  priority: string;
  details: Array<{
    label: string;
    value: string;
  }>;
}

interface ClientTrend {
  type: 'positive' | 'negative' | 'warning';
  text: string;
}

interface ClientCardProps {
  client: string;
  color: string;
  healthScore: number;
  status: string;
  trend: ClientTrend;
  metrics: ClientMetrics;
  onViewClick?: () => void;
  className?: string;
}

const ClientCard: React.FC<ClientCardProps> = ({ 
  client, 
  color, 
  healthScore, 
  status, 
  trend, 
  metrics, 
  onViewClick,
  className = ''
}) => {
  const clientTheme = getClientTheme(client);
  const healthColor = getHealthScoreColor(healthScore);
  const statusColors = getStatusColor(status);
  
  const getTrendIcon = () => {
    switch (trend.type) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
    }
  };

  const getTrendTextColor = () => {
    switch (trend.type) {
      case 'positive':
        return 'text-emerald-600';
      case 'negative':
        return 'text-red-600';
      case 'warning':
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusBadgeStyle = () => {
    return {
      backgroundColor: statusColors[50],
      color: statusColors.text,
      borderColor: statusColors[200],
    };
  };

  // Generate simple trend line for visual appeal
  const generateTrendPath = () => {
    const points = trend.type === 'positive' 
      ? '0,20 20,15 40,10 60,5 80,0'
      : trend.type === 'negative'
      ? '0,0 20,5 40,10 60,15 80,20'
      : '0,10 20,8 40,12 60,7 80,10';
    
    return points;
  };

  return (
    <div className={`
      group relative bg-white rounded-2xl shadow-sm hover:shadow-md 
      transition-all duration-200 border border-gray-100
      ${className}
    `}>
      {/* Color accent border */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{ backgroundColor: clientTheme.primary }}
      />
      
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* Client name and logo placeholder */}
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-gray-900">{client}</h3>
              <div className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500 font-medium">
                Logo
              </div>
            </div>
          </div>
          
          {/* Status badge */}
          <div 
            className="px-3 py-1 rounded-full text-sm font-medium border"
            style={getStatusBadgeStyle()}
          >
            {status}
          </div>
        </div>

        {/* Client info */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-1">{metrics.category}</p>
          <p className="text-sm text-gray-500">{metrics.users} • {metrics.mrr}</p>
        </div>

        {/* Health Score Section */}
        <div className="mb-6">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div 
                className="text-5xl font-bold mb-1"
                style={{ color: healthColor }}
              >
                {healthScore}/100
              </div>
              <p className="text-sm text-gray-600">Overall Health Score</p>
            </div>
            
            {/* Mini trend chart */}
            <div className="w-20 h-12">
              <svg width="80" height="24" className="w-full h-full">
                <polyline
                  fill="none"
                  stroke={clientTheme.primary}
                  strokeWidth="2"
                  points={generateTrendPath()}
                  className="drop-shadow-sm"
                />
              </svg>
            </div>
          </div>

          {/* Trend indicator */}
          <div className="flex items-center gap-2 mb-4">
            {getTrendIcon()}
            <span className={`text-sm font-medium ${getTrendTextColor()}`}>
              {trend.text}
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics.details.map((detail, index) => (
            <div key={index} className="text-center py-3 px-2 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">{detail.label}</div>
              <div className="text-sm font-semibold text-gray-900">{detail.value}</div>
            </div>
          ))}
        </div>

        {/* Assignment and Priority */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <span className="text-gray-600">Assigned: {metrics.assigned}</span>
          <span 
            className="font-semibold"
            style={{ color: clientTheme.primary }}
          >
            Priority: {metrics.priority}
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={onViewClick}
          className="w-full py-3 px-4 bg-white border-2 rounded-xl text-sm font-semibold 
                   transition-all duration-200 hover:shadow-md group-hover:border-opacity-100
                   flex items-center justify-center gap-2"
          style={{ 
            borderColor: clientTheme.primary,
            color: clientTheme.primary 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = clientTheme.primary;
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = clientTheme.primary;
          }}
        >
          Full Overview
          <span className="text-lg">→</span>
        </button>
      </div>

      {/* Team avatars at bottom */}
      <div className="absolute bottom-6 left-6 flex -space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white flex items-center justify-center">
          <span className="text-white text-xs font-semibold">C</span>
        </div>
        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-white flex items-center justify-center">
          <span className="text-white text-xs font-semibold">E</span>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;