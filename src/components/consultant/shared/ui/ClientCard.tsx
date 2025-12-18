import React from 'react';
import { CheckCircle, TrendingDown, AlertTriangle } from 'lucide-react';
import { COLORS } from '../constants/colors';
import { TRANSLATIONS } from '../constants/translations';
import { ClientCardProps, Language } from '../types/index';

const ClientCard: React.FC<ClientCardProps> = ({ 
  client, 
  color, 
  healthScore, 
  status, 
  trend, 
  metrics, 
  onViewClick, 
  language 
}) => {
  const t = TRANSLATIONS[language as Language['code']];
  
  const getHealthScoreColor = (score: number): string => {
    if (score >= 80) return COLORS.status.excellent[600];
    if (score >= 60) return COLORS.status.warning[600];
    return COLORS.status.critical[600];
  };

  const getMetricColors = (): Record<string, string> => {
    return {
      marketing: '#EBF4FF', // Very light blue
      sales: '#ECFDF5',     // Very light green
      product: '#FFFBEB',   // Very light orange
      support: '#FEF2F2'    // Very light red
    };
  };

  const getMetricTextColors = (): Record<string, string> => {
    return {
      marketing: '#3B82F6', // Blue
      sales: '#10B981',     // Green  
      product: '#F59E0B',   // Orange
      support: '#EF4444'    // Red
    };
  };

  const colors = getMetricColors();
  const textColors = getMetricTextColors();

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.currentTarget;
    target.style.backgroundColor = color;
    target.style.color = 'white';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.currentTarget;
    target.style.backgroundColor = 'white';
    target.style.color = color;
  };

  const renderTrendIcon = () => {
    switch (trend.type) {
      case 'positive':
        return <CheckCircle size={16} />;
      case 'negative':
        return <TrendingDown size={16} />;
      case 'warning':
        return <AlertTriangle size={16} />;
      default:
        return null;
    }
  };

  const getTrendBackgroundColor = (): string => {
    switch (trend.type) {
      case 'positive':
        return COLORS.status.excellent[50];
      case 'negative':
        return COLORS.status.critical[50];
      case 'warning':
        return COLORS.status.warning[50];
      default:
        return COLORS.gray[50];
    }
  };

  const getTrendTextColor = (): string => {
    switch (trend.type) {
      case 'positive':
        return COLORS.status.excellent[700];
      case 'negative':
        return COLORS.status.critical[700];
      case 'warning':
        return COLORS.status.warning[700];
      default:
        return COLORS.gray[700];
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] relative overflow-hidden"
      style={{
        width: '450px',
        height: '420px',
        flexShrink: 0,
        fontFamily: 'Public Sans, sans-serif'
      }}
    >
      {/* Color accent border */}
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: color }} />
      
      <div className="p-6 h-full flex flex-col">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-gray-900">
              {client}
            </h3>
            <div className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium text-gray-500">
              Logo
            </div>
          </div>
          
          {/* Full Overview Button in Header */}
          <button
            onClick={onViewClick}
            className="px-5 py-2 border-2 rounded-lg text-sm font-bold transition-all duration-200 hover:shadow-md"
            style={{ 
              borderColor: color,
              color,
              backgroundColor: 'white'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {t.fullOverview} →
          </button>
        </div>

        {/* Category Info */}
        <div className="mb-5">
          <p className="text-base text-gray-600 font-medium">
            {metrics.category}
          </p>
          <p className="text-lg font-bold mt-2" style={{ color: '#3B82F6', opacity: 0.7 }}>
            {metrics.users}
          </p>
        </div>

        {/* Main Content - Health Score & Trend */}
        <div className="flex items-center justify-center mb-6 flex-1">
          <div className="text-center">
            {/* Health Score */}
            <div 
              className="text-5xl font-bold mb-4" 
              style={{ 
                color: getHealthScoreColor(healthScore),
                lineHeight: '1'
              }}
            >
              {healthScore}/100
            </div>
            
            {/* Centered Status Message with Icon */}
            <div 
              className="flex items-center justify-center gap-2 text-base font-bold px-4 py-3 rounded-lg"
              style={{
                backgroundColor: getTrendBackgroundColor(),
                color: getTrendTextColor(),
              }}
            >
              {renderTrendIcon()}
              <span>{trend.text}</span>
            </div>
          </div>
        </div>

        {/* Bottom Section - All Content Visible */}
        <div className="space-y-4">
          {/* Metric Buttons - Larger for better visibility */}
          <div className="grid grid-cols-2 gap-3">
            {metrics.details.map((detail, index) => (
              <div 
                key={`${detail.label}-${index}`} 
                className="text-center py-3 px-3 rounded-lg"
                style={{ 
                  backgroundColor: Object.values(colors)[index]
                }}
              >
                <div className="text-xs text-gray-600 mb-1">{detail.label}</div>
                <div 
                  className="text-sm font-bold"
                  style={{ color: Object.values(textColors)[index] }}
                >
                  {detail.value}
                </div>
              </div>
            ))}
          </div>

          {/* Assignment & Priority Row */}
          <div className="flex items-center justify-between text-sm pt-2">
            <span className="text-gray-600 font-medium">
              {t.assignedTo} {metrics.assigned}
            </span>
            <span className="font-bold" style={{ color }}>
              {t.priority}: {metrics.priority}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;