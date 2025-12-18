import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { COLORS, COMPONENTS, SHADOWS } from '../design-system/enhanced-design-system';

interface ClientDistributionData {
  name: string;
  value: number;
  color: string;
}

interface ClientDistributionChartProps {
  data: ClientDistributionData[];
  title?: string;
}

const ClientDistributionChart: React.FC<ClientDistributionChartProps> = ({ 
  data, 
  title = "My Clients" 
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Get industry mapping
  const getIndustry = (name: string) => {
    switch (name) {
      case 'Tripids':
        return 'E-commerce';
      case 'ENIES':
        return 'EdTech';
      case 'Bunqqi':
        return 'FinTech';
      default:
        return 'Technology';
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div 
          className="bg-white p-4 rounded-xl border shadow-lg"
          style={{ 
            borderColor: COLORS.border.default,
            boxShadow: SHADOWS.md
          }}
        >
          <p className="font-semibold text-gray-900 mb-2">{data.name}</p>
          <div className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <span className="text-sm font-medium text-gray-700">
              Users: {data.value.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {((data.value / total) * 100).toFixed(1)}% of total
          </p>
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
      <div className="mb-8">
        <h3 
          className="text-2xl font-bold mb-2"
          style={{ color: COLORS.text.primary }}
        >
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <p 
            className="text-base"
            style={{ color: COLORS.text.secondary }}
          >
            User distribution across clients
          </p>
          <select 
            className="border rounded-xl px-3 py-1 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ borderColor: COLORS.border.default }}
          >
            <option>Industry</option>
            <option>Revenue</option>
            <option>Growth</option>
          </select>
        </div>
      </div>
      
      <div className="h-48 flex items-center justify-center mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke="white" 
                  strokeWidth={3}
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-4">
        {data.map((client, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
            <div className="flex items-center space-x-4">
              <div 
                className="w-4 h-4 rounded-full shadow-sm"
                style={{ backgroundColor: client.color }}
              />
              <div>
                <span 
                  className="text-base font-bold"
                  style={{ color: COLORS.text.primary }}
                >
                  {client.name}
                </span>
                <p className="text-sm text-gray-500">{getIndustry(client.name)}</p>
              </div>
            </div>
            <div className="text-right">
              <div 
                className="text-lg font-bold"
                style={{ color: COLORS.text.primary }}
              >
                {client.value.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-gray-500">
                {((client.value / total) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div 
        className="mt-6 pt-6 border-t"
        style={{ borderColor: COLORS.border.light }}
      >
        <div className="flex justify-between text-base">
          <span style={{ color: COLORS.text.secondary }}>Total Users</span>
          <span 
            className="font-bold"
            style={{ color: COLORS.text.primary }}
          >
            {total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClientDistributionChart;