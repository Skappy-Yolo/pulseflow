import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { COLORS, COMPONENTS, SHADOWS } from '../design-system/enhanced-design-system';

interface PerformanceDataPoint {
  date: string;
  ENIES: number;
  Bunqqi: number;
}

interface PerformanceChartProps {
  data: PerformanceDataPoint[];
  title?: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  data, 
  title = "Comparative Client Performance" 
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="bg-white p-4 rounded-xl border shadow-lg"
          style={{ 
            borderColor: COLORS.border.default,
            boxShadow: SHADOWS.md
          }}
        >
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {entry.name}: {entry.value}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className="bg-white rounded-2xl border p-8"
      style={{ 
        borderColor: COLORS.border.default,
        boxShadow: COMPONENTS.card.shadow
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 
            className="text-2xl font-bold mb-2"
            style={{ color: COLORS.text.primary }}
          >
            {title}
          </h3>
          <p 
            className="text-base"
            style={{ color: COLORS.text.secondary }}
          >
            Health score progression over time
          </p>
        </div>
        <select 
          className="border rounded-xl px-4 py-2 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ borderColor: COLORS.border.default }}
        >
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last Quarter</option>
        </select>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={COLORS.gray[200]}
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: COLORS.text.secondary, 
                fontSize: 12,
                fontWeight: 500
              }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: COLORS.text.secondary, 
                fontSize: 12,
                fontWeight: 500
              }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="ENIES" 
              stroke={COLORS.clients.enies.primary}
              strokeWidth={3}
              dot={{ 
                fill: COLORS.clients.enies.primary, 
                strokeWidth: 0, 
                r: 5,
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
              }}
              activeDot={{ 
                r: 7, 
                stroke: COLORS.clients.enies.primary, 
                strokeWidth: 3, 
                fill: 'white',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="Bunqqi" 
              stroke={COLORS.clients.bunqqi.primary}
              strokeWidth={3}
              dot={{ 
                fill: COLORS.clients.bunqqi.primary, 
                strokeWidth: 0, 
                r: 5,
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
              }}
              activeDot={{ 
                r: 7, 
                stroke: COLORS.clients.bunqqi.primary, 
                strokeWidth: 3, 
                fill: 'white',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center space-x-12 mt-8 pt-6 border-t">
        <div className="flex items-center space-x-3">
          <div 
            className="w-4 h-4 rounded-full shadow-sm"
            style={{ backgroundColor: COLORS.clients.enies.primary }}
          />
          <span 
            className="text-base font-semibold"
            style={{ color: COLORS.text.secondary }}
          >
            ENIES
          </span>
          <span 
            className="text-base font-bold"
            style={{ color: COLORS.status.critical[600] }}
          >
            -8.3%
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div 
            className="w-4 h-4 rounded-full shadow-sm"
            style={{ backgroundColor: COLORS.clients.bunqqi.primary }}
          />
          <span 
            className="text-base font-semibold"
            style={{ color: COLORS.text.secondary }}
          >
            Bunqqi
          </span>
          <span 
            className="text-base font-bold"
            style={{ color: COLORS.status.excellent[600] }}
          >
            +5.4%
          </span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;