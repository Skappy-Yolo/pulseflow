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
import { COLORS, LAYOUT, SHADOWS } from '../design-system/enhanced-design-system';

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
  children?: React.ReactNode;
}

interface SubMenuItemProps {
  label: string;
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
    onClick, 
    children 
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
      
      {hasSubmenu && expandedMenus.has(id) && (
        <div 
          className="mt-2 ml-6 pl-4 border-l-2 space-y-1"
          style={{ borderColor: COLORS.border.light }}
        >
          {children}
        </div>
      )}
    </div>
  );

  const SubMenuItem: React.FC<SubMenuItemProps> = ({ label, onClick }) => (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-gray-900 
               hover:bg-gray-50 rounded-lg transition-colors duration-200"
    >
      {label}
    </button>
  );

  return (
    <div 
      className="bg-white border-r flex flex-col h-full"
      style={{ 
        width: LAYOUT.sidebar.width,
        borderColor: COLORS.border.default,
        boxShadow: SHADOWS.xs
      }}
    >
      {/* Logo Section */}
      <div className="p-6 border-b" style={{ borderColor: COLORS.border.light }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M9.86667 7C6.15886 7 3 9.7724 3 13.3731C3 15.857 4.16313 17.9482 5.70465 19.6806C7.24088 21.4069 9.22286 22.856 11.0146 24.0689L14.1061 26.1615C14.4447 26.3906 14.8887 26.3906 15.2272 26.1615L18.3187 24.0689C18.8916 23.681 19.484 23.2691 20.0751 22.8316C20.2297 22.7172 20.2789 22.5083 20.1936 22.3359L18.3765 18.6678C18.2907 18.4945 18.0548 18.4673 17.9318 18.6164L17.8348 18.7341C17.3282 19.3481 16.5738 19.7037 15.7778 19.7037H13.3333C11.8606 19.7037 10.6667 18.5098 10.6667 17.037C10.6667 15.5643 11.8606 14.3704 13.3333 14.3704H14.2693C14.4285 14.3704 14.5794 14.2992 14.6807 14.1764L16.7763 11.6363C17.3607 10.9279 18.2685 10.5701 19.1791 10.6892C20.0896 10.8082 20.8749 11.3874 21.2575 12.2223L22.3278 14.5574C22.4401 14.8024 22.7593 14.8677 22.9921 14.732C23.3884 14.5012 23.8477 14.3704 24.3333 14.3704H25.9179C26.1192 14.3704 26.2903 14.2208 26.3068 14.0201C26.3243 13.8075 26.3333 13.5918 26.3333 13.3731C26.3333 9.7724 23.1745 7 19.4667 7C17.5554 7 15.8735 7.89618 14.6667 9.05578C13.4598 7.89619 11.778 7 9.86667 7Z" 
                fill={COLORS.primary[500]}
              />
              <path 
                d="M19.7424 12.9167C19.5989 12.6036 19.3044 12.3864 18.963 12.3418C18.6215 12.2971 18.2811 12.4313 18.062 12.6969L15.3064 16.037H13.3333C12.781 16.037 12.3333 16.4848 12.3333 17.037C12.3333 17.5893 12.781 18.037 13.3333 18.037H15.7778C16.0763 18.037 16.3592 17.9037 16.5492 17.6734L18.5892 15.2007L20.9798 20.4167C21.1233 20.7297 21.4178 20.9469 21.7592 20.9916C22.1007 21.0362 22.4411 20.902 22.6603 20.6364L24.8047 18.037H28C28.5523 18.037 29 17.5893 29 17.037C29 16.4848 28.5523 16.037 28 16.037H24.3333C24.0348 16.037 23.7519 16.1704 23.562 16.4007L22.1331 18.1327L19.7424 12.9167Z" 
                fill={COLORS.primary[500]}
              />
            </svg>
          </div>
          <span 
            className="text-xl font-bold"
            style={{ color: COLORS.text.primary }}
          >
            PulseFlow
          </span>
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
            >
              <SubMenuItem label="Performance Comparison" onClick={() => {}} />
              <SubMenuItem label="Industry Benchmarks" onClick={() => {}} />
              <SubMenuItem label="Growth Metrics" onClick={() => {}} />
            </SidebarItem>
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
            >
              <SubMenuItem label="Customer Journey" onClick={() => {}} />
              <SubMenuItem label="Funnel Analysis" onClick={() => {}} />
              <SubMenuItem label="Conversion Rates" onClick={() => {}} />
            </SidebarItem>
            <SidebarItem
              id="benchmarking"
              icon={BarChart3}
              label="Benchmarking"
              hasSubmenu={true}
            >
              <SubMenuItem label="Industry Standards" onClick={() => {}} />
              <SubMenuItem label="Competitor Analysis" onClick={() => {}} />
              <SubMenuItem label="Performance Metrics" onClick={() => {}} />
            </SidebarItem>
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
            >
              <SubMenuItem label="Client Reports" onClick={() => {}} />
              <SubMenuItem label="Performance Reports" onClick={() => {}} />
              <SubMenuItem label="Custom Reports" onClick={() => {}} />
            </SidebarItem>
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