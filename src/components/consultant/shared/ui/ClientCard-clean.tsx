import React from 'react';
import { Eye, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { getClientTheme, getStatusColor, getHealthScoreColor, COLORS, COMPONENTS, SHADOWS } from '../enhanced-design-system';

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
}

const ClientCard: React.FC<ClientCardProps> = ({ 
  client, 
  color, 
  healthScore, 
  status, 
  trend, 
  metrics, 
  onViewClick 
}) => {
  const clientTheme = getClientTheme(client);
  const statusColors = getStatusColor(status);
  const healthScoreColor = getHealthScoreColor(healthScore);

  const getTrendIcon = () => {
    switch (trend.type) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="group relative">
      {/* Premium Card Container */}
      <div 
        className="bg-white rounded-xl border transition-all duration-300 ease-out hover:scale-[1.02] overflow-hidden"
        style={{
          borderColor: COLORS.border.default,
          boxShadow: SHADOWS.card,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = SHADOWS.cardHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = SHADOWS.card;
        }}
      >
        {/* Client Color Border - Left accent */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.5"
          style={{ backgroundColor: clientTheme.primary }}
        />
        
        {/* Card Content */}
        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              {/* Client Indicator Dot */}
              <div 
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: clientTheme.primary }}
              />
              
              {/* Client Name */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 tracking-tight">
                  {client}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">{metrics.category}</p>
              </div>
            </div>
            
            {/* Action Button */}
            <button
              onClick={onViewClick}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors duration-200"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
          </div>

          {/* Health Score Section */}
          <div className="mb-5">
            <div className="flex items-baseline gap-2 mb-2">
              <span 
                className={`text-4xl font-bold tracking-tight ${healthScoreColor}`}
                style={{ color: clientTheme.primary }}
              >
                {healthScore}
              </span>
              <span className="text-lg text-slate-400 font-medium">/100</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Health Score</span>
              <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors.badge}`}>
                <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${statusColors.dot.replace('bg-', 'bg-')}`} />
                {status}
              </div>
            </div>
          </div>

          {/* Trend Indicator */}
          <div className="flex items-center gap-2 mb-5 p-3 bg-slate-50 rounded-lg">
            {getTrendIcon()}
            <span className={`text-sm font-medium ${
              trend.type === 'positive' ? 'text-green-700' :
              trend.type === 'negative' ? 'text-red-700' : 'text-amber-700'
            }`}>
              {trend.text}
            </span>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <div className="text-xs font-medium text-slate-500 mb-1">Users</div>
              <div className="text-sm font-semibold text-slate-900">{metrics.users}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 mb-1">Revenue</div>
              <div className="text-sm font-semibold text-slate-900">{metrics.mrr}</div>
            </div>
          </div>

          {/* Pipeline Metrics */}
          <div className="border-t border-slate-100 pt-4">
            <div className="text-xs font-medium text-slate-500 mb-3">Pipeline Status</div>
            <div className="grid grid-cols-2 gap-3">
              {metrics.details.map((detail, index) => (
                <div key={index} className="text-center p-2 bg-slate-50 rounded-lg">
                  <div className="text-xs text-slate-500 mb-1">{detail.label}</div>
                  <div className="text-sm font-semibold text-slate-900">{detail.value}</div>
                </div>
              ))}
            </div>
            
            {/* Assigned User */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Assigned to: <span className="font-medium text-slate-700">{metrics.assigned}</span>
              </div>
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                metrics.priority === 'High' ? 'bg-red-100 text-red-700' :
                metrics.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                'bg-green-100 text-green-700'
              }`}>
                {metrics.priority}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
