import React, { useState } from 'react';
import { Search, Bell, MoreHorizontal, ChevronDown, X } from 'lucide-react';
import { LANGUAGES, NOTIFICATIONS_DATA } from '../constants/data';
import { HeaderProps, Language } from '../types/index';

const Header: React.FC<HeaderProps> = ({ 
  language, 
  setLanguage, 
  showNotifications, 
  setShowNotifications 
}) => {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState<boolean>(false);
  const [userRole] = useState<string>('Product Manager');

  const handleLanguageChange = (langCode: Language['code']): void => {
    setLanguage(langCode);
    setShowLanguageDropdown(false);
  };

  const toggleNotifications = (): void => {
    setShowNotifications(!showNotifications);
  };

  const toggleLanguageDropdown = (): void => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const currentLanguage = LANGUAGES.find(l => l.code === language);

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-50 shadow-sm" style={{ fontFamily: 'Public Sans, -apple-system, sans-serif' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search across your portfolio..."
                className="pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 w-96 text-sm bg-gray-50 focus:bg-white transition-all duration-200"
                style={{ fontFamily: 'Public Sans, sans-serif' }}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={toggleLanguageDropdown}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Select language"
              >
                <span className="text-lg">{currentLanguage?.flag || '🌐'}</span>
                <span className="text-sm font-medium" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                  {currentLanguage?.name || 'English'}
                </span>
                <ChevronDown size={14} />
              </button>
              
              {showLanguageDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg py-2 min-w-48 z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                      style={{ fontFamily: 'Public Sans, sans-serif' }}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg relative transition-colors"
                aria-label="Show notifications"
              >
                <Bell size={18} />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
            
            <button 
              className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              aria-label="More options"
            >
              <MoreHorizontal size={18} />
            </button>
            
            <div className="flex items-center gap-3 ml-2 pl-3 border-l border-gray-200">
              <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-gray-600 text-xs">👤</span>
              </div>
              <div className="text-sm" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                <div className="font-semibold text-gray-900">Consuela</div>
                <div className="text-gray-500 text-xs">{userRole}</div>
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed right-4 top-20 w-96 bg-white border border-gray-200 rounded-xl shadow-lg z-50" style={{ fontFamily: 'Public Sans, sans-serif' }}>
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <div className="flex items-center gap-2">
              <button className="text-sm text-blue-600 hover:text-blue-700">Clear All</button>
              <button 
                onClick={() => setShowNotifications(false)}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Close notifications"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {NOTIFICATIONS_DATA.map((notification) => (
              <div 
                key={notification.id}
                className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">{notification.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${notification.color}`}>
                      {notification.title}
                    </p>
                    {notification.subtitle && (
                      <p className="text-sm text-blue-600 mt-1">{notification.subtitle}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;