import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  ChevronDown, 
  BarChart3, 
  FileText, 
  UserCheck, 
  Link, 
  CreditCard, 
  Settings,
  TrendingUp
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { COLORS, LAYOUT } from '../shared/enhanced-design-system';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface SidebarItemProps {
  id: string;
  icon: LucideIcon;
  label: string;
  hasSubmenu?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [expandedMenus, setExpandedMenus] = useState(new Set<string>());

  const toggleMenu = (menuId: string) => {
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId);
    } else {
      newExpanded.add(menuId);
    }
    setExpandedMenus(newExpanded);
  };

  const SidebarItem: React.FC<SidebarItemProps> = ({ 
    id, 
    icon: Icon, 
    label, 
    hasSubmenu = false, 
    isActive = false, 
    onClick
  }) => (
    <div className="mb-1">
      <button
        onClick={() => {
          if (hasSubmenu) {
            toggleMenu(id);
          } else {
            onClick?.();
            setActiveTab(id);
          }
        }}
        className={`
          w-full flex items-center justify-between px-4 py-3 text-sm 
          transition-all duration-200 rounded-xl mx-2 group
          ${isActive 
            ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm border-l-4 border-blue-500' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }
        `}
      >
        <div className="flex items-center gap-3">
          <Icon 
            size={20} 
            className={`transition-colors duration-200 ${
              isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
            }`} 
          />
          <span className="font-medium">{label}</span>
        </div>
        {hasSubmenu && (
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-200 ${
              expandedMenus.has(id) ? 'rotate-180' : ''
            } ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
          />
        )}
      </button>
    </div>
  );

  return (
    <div 
      className="bg-white border-r border-gray-200 flex flex-col h-full shadow-sm"
      style={{ width: LAYOUT.sidebar.width }}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
            style={{ backgroundColor: COLORS.primary[50] }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke={COLORS.primary[500]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1 
              className="text-xl font-bold"
              style={{ color: COLORS.text.primary }}
            >
              PulseFlow
            </h1>
            <p 
              className="text-xs"
              style={{ color: COLORS.text.secondary }}
            >
              Consultant Portal
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-2 space-y-8">
        {/* Portfolio Section */}
        <div>
          <div className="px-4 mb-4">
            <span 
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: COLORS.text.tertiary }}
            >
              Portfolio
            </span>
          </div>
          <div className="space-y-1">
            <SidebarItem
              id="overview"
              icon={Home}
              label="Overview"
              isActive={activeTab === 'overview'}
            />
            <SidebarItem
              id="clients"
              icon={Users}
              label="Clients"
              isActive={activeTab === 'clients'}
            />
            <SidebarItem
              id="cross-client"
              icon={BarChart3}
              label="Cross-Client Insights"
              hasSubmenu={true}
            />
          </div>
        </div>

        {/* Analytics Section */}
        <div>
          <div className="px-4 mb-4">
            <span 
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: COLORS.text.tertiary }}
            >
              Analytics
            </span>
          </div>
          <div className="space-y-1">
            <SidebarItem
              id="lifecycle"
              icon={TrendingUp}
              label="Lifecycle Analysis"
              hasSubmenu={true}
            />
            <SidebarItem
              id="benchmarking"
              icon={BarChart3}
              label="Benchmarking"
              hasSubmenu={true}
            />
          </div>
        </div>

        {/* Management Section */}
        <div>
          <div className="px-4 mb-4">
            <span 
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: COLORS.text.tertiary }}
            >
              Management
            </span>
          </div>
          <div className="space-y-1">
            <SidebarItem
              id="team"
              icon={UserCheck}
              label="Team Members"
            />
            <SidebarItem
              id="integrations"
              icon={Link}
              label="Integrations"
            />
            <SidebarItem
              id="reports"
              icon={FileText}
              label="Reports Center"
              hasSubmenu={true}
            />
          </div>
        </div>

        {/* Admin Section */}
        <div>
          <div className="px-4 mb-4">
            <span 
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: COLORS.text.tertiary }}
            >
              Admin
            </span>
          </div>
          <div className="space-y-1">
            <SidebarItem
              id="billing"
              icon={CreditCard}
              label="Billing"
            />
            <SidebarItem
              id="settings"
              icon={Settings}
              label="Settings"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
