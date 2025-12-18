import React, { useState } from 'react';
import { 
  Home, Users, BarChart3, FileText, UserCheck, Link, CreditCard, Settings, TrendingUp,
  ChevronDown, LucideIcon
} from 'lucide-react';
import { SidebarProps } from '../types/index';

interface SidebarItemProps {
  id: string;
  icon: LucideIcon;
  label: string;
  hasSubmenu?: boolean;
  isActive?: boolean;
  children?: React.ReactNode;
  onToggle: (id: string) => void;
  onNavigate: (id: string) => void;
  expandedMenus: Set<string>;
}

interface SubMenuItemProps {
  label: string;
  onClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  const toggleMenu = (menuId: string): void => {
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
    children,
    onToggle,
    onNavigate,
    expandedMenus
  }) => (
    <div className="mb-1">
      <button
        onClick={() => {
          if (hasSubmenu) {
            onToggle(id);
          } else {
            onNavigate(id);
          }
        }}
        className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-all duration-200 rounded-xl mx-2 group
          ${isActive 
            ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm border-l-4 border-blue-500' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        style={{ fontFamily: 'Public Sans, sans-serif' }}
      >
        <div className="flex items-center gap-3">
          <Icon size={20} className={`transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
          <span className="font-medium">{label}</span>
        </div>
        {hasSubmenu && (
          <ChevronDown size={16} className={`transition-transform duration-200 ${expandedMenus.has(id) ? 'rotate-180' : ''}`} />
        )}
      </button>
      {hasSubmenu && expandedMenus.has(id) && (
        <div className="mt-2 ml-6 pl-4 border-l-2 border-gray-100 space-y-1">
          {children}
        </div>
      )}
    </div>
  );

  const SubMenuItem: React.FC<SubMenuItemProps> = ({ label, onClick }) => (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
      style={{ fontFamily: 'Public Sans, sans-serif' }}
    >
      {label}
    </button>
  );

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg" style={{ fontFamily: 'Public Sans, sans-serif' }}>P</span>
          </div>
          <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Public Sans, sans-serif' }}>
            PulseFlow
          </span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-2 space-y-8">
        {/* Portfolio Section */}
        <div>
          <div className="px-4 mb-4">
            <span 
              className="text-xs font-semibold text-gray-400 uppercase tracking-wider"
              style={{ fontFamily: 'Public Sans, sans-serif' }}
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
              onToggle={toggleMenu}
              onNavigate={setActiveTab}
              expandedMenus={expandedMenus}
            />
            <SidebarItem 
              id="clients" 
              icon={Users} 
              label="Clients" 
              isActive={activeTab === 'clients'} 
              onToggle={toggleMenu}
              onNavigate={setActiveTab}
              expandedMenus={expandedMenus}
            />
            <SidebarItem 
              id="cross-client" 
              icon={BarChart3} 
              label="Cross-Client Insights" 
              hasSubmenu={true}
              onToggle={toggleMenu}
              onNavigate={setActiveTab}
              expandedMenus={expandedMenus}
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
              className="text-xs font-semibold text-gray-400 uppercase tracking-wider"
              style={{ fontFamily: 'Public Sans, sans-serif' }}
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
              onToggle={toggleMenu}
              onNavigate={setActiveTab}
              expandedMenus={expandedMenus}
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
              onToggle={toggleMenu}
              onNavigate={setActiveTab}
              expandedMenus={expandedMenus}
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
              className="text-xs font-semibold text-gray-400 uppercase tracking-wider"
              style={{ fontFamily: 'Public Sans, sans-serif' }}
            >
              Management
            </span>
          </div>
          <div className="space-y-1">
            <SidebarItem 
              id="team" 
              icon={UserCheck} 
              label="Team Members" 
              onToggle={toggleMenu}
              onNavigate={setActiveTab}
              expandedMenus={expandedMenus}
            />
            <SidebarItem 
              id="integrations" 
              icon={Link} 
              label="Integrations" 
              onToggle={toggleMenu}
              onNavigate={setActiveTab}
              expandedMenus={expandedMenus}
            />
            <SidebarItem 
              id="reports" 
              icon={FileText} 
              label="Reports Center" 
              hasSubmenu={true}
              onToggle={toggleMenu}
              onNavigate={setActiveTab}
              expandedMenus={expandedMenus}
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
              className="text-xs font-semibold text-gray-400 uppercase tracking-wider"
              style={{ fontFamily: 'Public Sans, sans-serif' }}
            >
              Admin
            </span>
          </div>
          <div className="space-y-1">
            <SidebarItem 
              id="billing" 
              icon={CreditCard} 
              label="Billing" 
              onToggle={toggleMenu}
              onNavigate={setActiveTab}
              expandedMenus={expandedMenus}
            />
            <SidebarItem 
              id="settings" 
              icon={Settings} 
              label="Settings" 
              onToggle={toggleMenu}
              onNavigate={setActiveTab}
              expandedMenus={expandedMenus}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;