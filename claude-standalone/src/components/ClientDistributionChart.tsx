import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Users } from 'lucide-react';

interface ClientDistributionData {
  name: string;
  value: number;
  color: string;
}

interface ClientDistributionChartProps {
  data: ClientDistributionData[];
  title?: string;
}

const ClientDistributionChart: React.FC<ClientDistributionChartProps> = ({ data, title = "Client Distribution" }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 p-8`}>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">User distribution across clients</p>
          </div>
        </div>
      </div>
      
      <div className="h-56 flex items-center justify-center mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={95}
              paddingAngle={4}
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
            <Tooltip 
              formatter={(value: number) => [value.toLocaleString(), 'Users']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '500'
              }}
              labelStyle={{ color: '#1e293b', fontWeight: 600 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-4">
        {data.map((client, index) => (
          <div key={index} className="flex items-center justify-between group hover:bg-gray-50 rounded-xl p-3 transition-colors duration-200">
            <div className="flex items-center space-x-4">
              <div 
                className="w-4 h-4 rounded-full shadow-sm border-2 border-white"
                style={{ backgroundColor: client.color }}
              />
              <span className="text-sm font-medium text-gray-900">{client.name}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">
                {client.value.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {((client.value / total) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4">
          <span className="text-sm font-medium text-gray-600">Total Users</span>
          <span className="text-lg font-bold text-gray-900">{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ClientDistributionChart;
