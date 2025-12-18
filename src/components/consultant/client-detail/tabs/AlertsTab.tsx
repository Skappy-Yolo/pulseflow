import React from 'react';
import { AlertTriangle } from 'lucide-react';

const AlertsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900">Critical Alerts</h3>
      
      <div className="space-y-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-red-600 mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold text-red-900">Marketing to Sales conversion Dropped 15%</h4>
                <p className="text-red-700 text-sm mt-1">Lead quality has decreased significantly from recent campaigns</p>
                <div className="text-red-600 bg-red-100 inline-block px-3 py-1 rounded-full text-xs font-medium mt-2">
                  Recommendation: Review targeting criteria with marketing team
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-yellow-600 mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold text-yellow-900">Support Ticket Volume Up 40%</h4>
                <p className="text-yellow-700 text-sm mt-1">Multiple customers reporting issues with latest product release and failed orders</p>
                <div className="text-yellow-600 bg-yellow-100 inline-block px-3 py-1 rounded-full text-xs font-medium mt-2">
                  Recommendation: Engineering Team should prioritize fixes
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-yellow-600 mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold text-yellow-900">Support ticket resolution time above target</h4>
                <p className="text-yellow-700 text-sm mt-1">Average of 4.2 hr</p>
                <div className="text-yellow-600 bg-yellow-100 inline-block px-3 py-1 rounded-full text-xs font-medium mt-2">
                  Recommendation: Customer Support Team needs help but investigate first
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-blue-600 mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900">New feature adoption ahead of projections</h4>
                <p className="text-blue-700 text-sm mt-1">People like the new features than we expected</p>
                <div className="text-blue-600 bg-blue-100 inline-block px-3 py-1 rounded-full text-xs font-medium mt-2">
                  Recommendation: Resolve the current issues to prevent churn
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>High Impact</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span>Medium Impact</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Positive Impact</span>
        </div>
      </div>
    </div>
  );
};

export default AlertsTab;