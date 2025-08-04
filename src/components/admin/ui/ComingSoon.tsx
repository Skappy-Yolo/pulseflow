// src/components/admin/ui/ComingSoon.tsx
// Coming Soon component for admin pages

import React from 'react';
import { Construction } from 'lucide-react';

interface ComingSoonProps {
  title: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20 px-4">
      <div className="max-w-md text-center">
        {/* Construction Icon */}
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Construction className="w-8 h-8 text-indigo-600" />
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 mb-3 font-['Public_Sans']">
          {title}
        </h2>
        
        {/* Description */}
        <p className="text-slate-600 mb-6 leading-relaxed font-['Inter']">
          This feature is currently under development. We're working hard to bring you the best admin experience.
        </p>
        
        {/* Coming Soon Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
          Coming Soon
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
