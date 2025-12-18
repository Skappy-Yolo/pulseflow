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
import { SHADOWS } from './design-system';

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

  const SidebarItem: React.FC<SidebarItemProps> = ({ id, icon: Icon, label, hasSubmenu = false, isActive = false, onClick, children }) => (
    <div>
      <button
        onClick={() => {
          if (hasSubmenu) {
            toggleMenu(id);
          } else {
            onClick?.();
            setActiveTab(id);
          }
        }}
        className={`w-full flex items-center justify-between px-6 py-3.5 text-sm transition-all duration-200 mx-3 rounded-xl group ${
          isActive 
            ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 shadow-sm' 
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className={`${isActive ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-700'} transition-colors`} />
          <span className="font-medium">{label}</span>
        </div>
        {hasSubmenu && (
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-200 ${expandedMenus.has(id) ? 'rotate-180' : ''} ${
              isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
            }`}
          />
        )}
      </button>
      {hasSubmenu && expandedMenus.has(id) && (
        <div className="mt-2 ml-6 mr-3 border-l-2 border-slate-100 pl-4 space-y-1">
          {children}
        </div>
      )}
    </div>
  );

  const SubMenuItem: React.FC<SubMenuItemProps> = ({ label, onClick }) => (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200 border border-transparent hover:border-slate-200"
    >
      {label}
    </button>
  );

  return (
    <div className={`w-80 bg-white border-r border-slate-100 flex flex-col ${SHADOWS.header}`}>
      {/* Logo */}
      <div className="p-8 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-bold text-slate-900">PulseFlow</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3">
        {/* Portfolio Section */}
        <div className="mb-8">
          <div className="px-3 mb-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Portfolio</span>
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
        <div className="mb-8">
          <div className="px-3 mb-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Analytics</span>
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
        <div className="mb-8">
          <div className="px-3 mb-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Management</span>
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
          <div className="px-3 mb-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Admin</span>
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
