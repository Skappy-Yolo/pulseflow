import React from 'react';
import { FileText } from 'lucide-react';

const ReportsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText size={32} className="text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Reports Coming Soon</h3>
        <p className="text-slate-600">Detailed reporting functionality will be available in the next update.</p>
      </div>
    </div>
  );
};

export default ReportsTab;
