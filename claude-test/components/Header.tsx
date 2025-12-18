import React from 'react';
import { Search, Bell, Globe, MoreHorizontal, ChevronDown } from 'lucide-react';
import { SHADOWS } from './design-system';

const Header: React.FC = () => {
  return (
    <header className={`bg-white border-b border-gray-100 px-8 py-6 ${SHADOWS.header}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search across your portfolio..."
              className={`pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-96 text-sm bg-gray-50 focus:bg-white transition-all duration-200 ${SHADOWS.input} focus:${SHADOWS.inputFocus}`}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200">
            <Globe size={16} />
            <span className="text-sm font-medium">English</span>
            <ChevronDown size={14} />
          </button>
          
          <button className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl relative transition-all duration-200 border border-transparent hover:border-gray-200">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full border-2 border-white shadow-sm"></span>
          </button>
          
          <button className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200">
            <MoreHorizontal size={18} />
          </button>
          
          <div className="flex items-center gap-3 ml-4 p-2 hover:bg-gray-50 rounded-xl transition-all duration-200 cursor-pointer">
            <div className={`w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center ${SHADOWS.avatar}`}>
              <span className="text-white text-sm font-semibold">C</span>
            </div>
            <div className="text-sm">
              <div className="font-semibold text-gray-900">Consuela</div>
              <div className="text-gray-500 text-xs font-medium">Consultant</div>
            </div>
            <ChevronDown size={14} className="text-gray-400 ml-2" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
