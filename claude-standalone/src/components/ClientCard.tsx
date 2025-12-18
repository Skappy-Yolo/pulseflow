import React from 'react';
import { ArrowUp, ArrowDown, Eye } from 'lucide-react';
import { getClientTheme } from './design-system';

interface ClientCardProps {
  name: string;
  healthScore: number;
  totalUsers: number;
  trend: number;
  status: 'Active' | 'Inactive' | 'Warning';
  onViewClick: () => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ 
  name, 
  healthScore, 
  totalUsers, 
  trend, 
  status, 
  onViewClick 
}) => {
  const theme = getClientTheme(name);
  const isPositiveTrend = trend >= 0;
  
  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getHealthScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-50';
    if (score >= 60) return 'bg-amber-50';
    return 'bg-red-50';
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all duration-200 group relative overflow-hidden">
      {/* Client Theme Accent */}
      <div 
        className="absolute left-0 top-0 w-1 h-full"
        style={{ backgroundColor: theme.primary }}
      />
      
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            status === 'Active' 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : status === 'Warning'
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
              status === 'Active' ? 'bg-emerald-500' : status === 'Warning' ? 'bg-amber-500' : 'bg-red-500'
            }`}></span>
            {status}
          </div>
        </div>
        
        <button
          onClick={onViewClick}
          className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <Eye size={18} />
        </button>
      </div>

      {/* Health Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">Health Score</span>
          <div className={`flex items-center gap-1 ${isPositiveTrend ? 'text-emerald-600' : 'text-red-600'}`}>
            {isPositiveTrend ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            <span className="text-sm font-medium">{Math.abs(trend)}%</span>
          </div>
        </div>
        
        <div className="flex items-end gap-3">
          <div className={`text-3xl font-bold ${getHealthScoreColor(healthScore)}`}>
            {healthScore}
          </div>
          <div className={`px-3 py-1 rounded-lg ${getHealthScoreBg(healthScore)} ${getHealthScoreColor(healthScore)} text-sm font-medium`}>
            {healthScore >= 80 ? 'Excellent' : healthScore >= 60 ? 'Good' : 'Needs Attention'}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${healthScore}%`,
              backgroundColor: theme.primary
            }}
          />
        </div>
      </div>

      {/* Total Users */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Total Users</span>
          <div className="text-lg font-semibold text-gray-900">
            {totalUsers.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
