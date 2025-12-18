import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { SHADOWS } from './design-system';

interface DataPoint {
  period: string;
  tripids: number;
  enies: number;
  bunqqi: number;
}

interface PerformanceChartProps {
  data: DataPoint[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  return (
    <div className={`bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-200`}>
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Performance Overview</h3>
            <p className="text-sm text-gray-500 mt-1">Revenue trends across all clients</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">$47.5K</p>
          <p className="text-sm text-green-600 font-medium">+12.5% vs last month</p>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f1f5f9" 
              strokeWidth={1}
              vertical={false}
            />
            <XAxis 
              dataKey="period" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              tickFormatter={(value) => `$${value}k`}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '500'
              }}
              labelStyle={{ color: '#1e293b', fontWeight: '600', marginBottom: '8px' }}
              formatter={(value, name) => [
                `$${value}k`,
                name.charAt(0).toUpperCase() + name.slice(1)
              ]}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
              formatter={(value) => (
                <span style={{ color: '#64748b', fontWeight: '500', fontSize: '14px' }}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )}
            />
            <Line 
              type="monotone" 
              dataKey="tripids" 
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: '#f59e0b', strokeWidth: 2, fill: 'white' }}
              name="tripids"
            />
            <Line 
              type="monotone" 
              dataKey="enies" 
              stroke="#dc2626" 
              strokeWidth={3}
              dot={{ fill: '#dc2626', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: '#dc2626', strokeWidth: 2, fill: 'white' }}
              name="enies"
            />
            <Line 
              type="monotone" 
              dataKey="bunqqi" 
              stroke="#059669" 
              strokeWidth={3}
              dot={{ fill: '#059669', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: '#059669', strokeWidth: 2, fill: 'white' }}
              name="bunqqi"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
