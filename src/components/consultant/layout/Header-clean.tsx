import React, { useState } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search across your portfolio..."
              className="pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-96 text-sm bg-gray-50 focus:bg-white transition-all duration-200"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
            <Bell size={18} />
          </button>
          
          <div className="flex items-center gap-3 ml-2 pl-3 border-l border-gray-200">
            <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-gray-600 text-xs">👤</span>
            </div>
            <div className="text-sm">
              <div className="font-semibold text-gray-900">Consuela</div>
              <div className="text-gray-500 text-xs">Product Manager</div>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
