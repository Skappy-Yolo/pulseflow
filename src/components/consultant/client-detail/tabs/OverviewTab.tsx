import React from 'react';

const OverviewTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Assigned Team Members */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Assigned Team Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-300 rounded-full flex items-center justify-center">
              <span className="text-slate-600 font-medium">CN</span>
            </div>
            <div>
              <h4 className="font-medium text-slate-900">Consuela Nicula</h4>
              <p className="text-sm text-slate-600">Lead PM</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-300 rounded-full flex items-center justify-center">
              <span className="text-slate-600 font-medium">EO</span>
            </div>
            <div>
              <h4 className="font-medium text-slate-900">Emmanuel Okanlawon</h4>
              <p className="text-sm text-slate-600">Product Manager</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                <span className="text-xs text-slate-600">Last seen 24 hr ago</span>
              </div>
            </div>
          </div>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4">
          + Assign Team Member
        </button>
      </div>

      {/* Recent Activity & Notes */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity & Notes</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-slate-900">Conversion drop identified in Sales stage</h4>
                <span className="text-sm text-slate-500">2 hours ago</span>
              </div>
              <p className="text-sm text-slate-600">Consuela Nicula</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-slate-900">Weekly report delivered to client CPO</h4>
                <span className="text-sm text-slate-500">Yesterday at 9:00 AM</span>
              </div>
              <p className="text-sm text-slate-600">System</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-slate-900">Support tickets spike detected - investigating</h4>
                <span className="text-sm text-slate-500">3 days ago</span>
              </div>
              <p className="text-sm text-slate-600">Emmanuel Okanlawon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
