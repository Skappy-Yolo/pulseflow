import React from 'react';
import { Search, Bell, Globe, MoreHorizontal, ChevronDown } from 'lucide-react';
import { COLORS, COMPONENTS, SHADOWS } from '../design-system/enhanced-design-system';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header 
      className="bg-white border-b px-8 py-4 sticky top-0 z-50"
      style={{ 
        borderColor: COLORS.border.default,
        boxShadow: SHADOWS.xs 
      }}
    >
      <div className="flex items-center justify-between">
        {/* Search Section */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search 
              size={18} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              placeholder="Search across your portfolio..."
              className="pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 w-96 text-sm bg-gray-50 focus:bg-white 
                       transition-all duration-200 placeholder-gray-500"
              style={{
                borderColor: COLORS.border.default,
                fontSize: '14px',
              }}
            />
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <button 
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 
                     hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <Globe size={16} />
            <span className="text-sm font-medium">English</span>
            <ChevronDown size={14} />
          </button>
          
          {/* Notifications */}
          <button 
            className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 
                     rounded-lg relative transition-colors duration-200"
          >
            <Bell size={18} />
            <span 
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full 
                       border-2 border-white"
              style={{ backgroundColor: COLORS.status.critical[500] }}
            />
          </button>
          
          {/* More Options */}
          <button 
            className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 
                     rounded-lg transition-colors duration-200"
          >
            <MoreHorizontal size={18} />
          </button>
          
          {/* User Profile */}
          <div className="flex items-center gap-3 ml-2 pl-3 border-l border-gray-200">
            <div 
              className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 
                       rounded-full flex items-center justify-center shadow-sm"
            >
              <span className="text-white text-sm font-semibold">C</span>
            </div>
            <div className="text-sm">
              <div className="font-semibold text-gray-900">Consuela</div>
              <div className="text-gray-500 text-xs">Consultant</div>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;