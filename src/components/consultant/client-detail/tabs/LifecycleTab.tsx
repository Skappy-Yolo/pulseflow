import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LifecycleTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Weekly Product Flow */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Weekly Product Flow</h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📢</span>
            </div>
            <div className="text-sm text-slate-600 mb-2">MARKETING</div>
            <div className="text-2xl font-bold text-slate-900 mb-1">500</div>
            <div className="text-xs text-red-600">↓ 15% • Sales conversion</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">💼</span>
            </div>
            <div className="text-sm text-slate-600 mb-2">SALES</div>
            <div className="text-2xl font-bold text-slate-900 mb-1">75</div>
            <div className="text-xs text-green-600">↗ 60% • Product conversion</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">💎</span>
            </div>
            <div className="text-sm text-slate-600 mb-2">PRODUCT</div>
            <div className="text-2xl font-bold text-slate-900 mb-1">45</div>
            <div className="text-xs text-green-600">↗ 85% • Retention</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">👥</span>
            </div>
            <div className="text-sm text-slate-600 mb-2">SUPPORT</div>
            <div className="text-2xl font-bold text-slate-900 mb-1">40</div>
            <div className="text-xs text-orange-600">→ 91% • Customer Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Lifecycle Health Scores */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Lifecycle Health Scores</h3>
          <select className="border border-slate-300 rounded-lg px-3 py-1 text-sm">
            <option>Last 30 days</option>
            <option>Last 60 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {['Awareness', 'Acquisition', 'Activation', 'Retention', 'Revenue'].map((stage, index) => {
            const scores = [85, 72, 60, 78, 90];
            const score = scores[index];
            return (
              <div key={stage} className="text-center">
                <div className="h-32 bg-slate-100 rounded-lg p-4 mb-2 flex items-end justify-center">
                  <div 
                    className="w-8 bg-green-500 rounded-t"
                    style={{ height: `${score}%` }}
                  ></div>
                </div>
                <div className="text-sm font-medium text-slate-900">{stage}</div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
            <span>Target</span>
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-2">Activation: Current vs Target</p>
      </div>

      {/* Trend Analysis */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Trend Analysis</h3>
          <select className="border border-slate-300 rounded-lg px-3 py-1 text-sm">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
          </select>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { month: 'January', Pipeline: 400, Conversion: 350, Revenue: 420 },
              { month: 'February', Pipeline: 350, Conversion: 320, Revenue: 380 },
              { month: 'March', Pipeline: 380, Conversion: 340, Revenue: 400 },
              { month: 'April', Pipeline: 420, Conversion: 380, Revenue: 450 },
              { month: 'May', Pipeline: 450, Conversion: 400, Revenue: 480 },
              { month: 'June', Pipeline: 480, Conversion: 440, Revenue: 520 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748B', fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="Pipeline" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="Conversion" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="Revenue" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Pipeline</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span>Conversion</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Revenue</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifecycleTab;
