// Executive Dashboard - Standalone page for executive users
// This wraps the Enhanced Dashboard executive view WITHOUT the consultant switcher

import { useState } from 'react';
import { 
  Home, 
  BarChart3,
  Users,
  Link2,
  FileText,
  Menu,
  X,
  Bell,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

// Sidebar component (NO consultant switch)
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
  userName: string;
  companyName: string;
}

const ExecutiveSidebar = ({ isOpen, onClose, currentPage, onPageChange, userName, companyName }: SidebarProps) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'integrations', label: 'Integrations', icon: Link2 },
    { id: 'team', label: 'Department Heads', icon: Users },
    { id: 'analytics', label: 'Data Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className={`
      fixed inset-y-0 left-0 z-50 
      bg-white w-72 min-h-screen overflow-y-auto border-r border-gray-200
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Logo */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/Heartbeat.svg" alt="PulseFlow" className="h-8 w-8" />
            <span className="text-xl font-semibold text-gray-900">PulseFlow</span>
          </div>
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* User Info */}
      <div className="px-6 py-4 border-b border-gray-200">
        <p className="text-sm text-gray-500">Logged in as</p>
        <p className="font-medium text-gray-900">{userName}</p>
        <p className="text-sm text-blue-600">{companyName} • Executive</p>
      </div>

      {/* Navigation - NO CONSULTANT SWITCH */}
      <nav className="py-4">
        <p className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Executive Dashboard
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-6 py-3 text-left transition-colors
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// Header component
interface HeaderProps {
  onMenuClick: () => void;
  userName: string;
  companyName: string;
}

const ExecutiveHeader = ({ onMenuClick, userName, companyName }: HeaderProps) => {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-72 z-40 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{companyName} Dashboard</h1>
            <p className="text-sm text-gray-500">Executive Overview</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-indigo-600">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">{userName}</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

// Metric Card component
interface MetricCardProps {
  icon: string;
  label: string;
  sublabel: string;
  value: string;
  valueColor: string;
  trend: 'up' | 'down' | 'stable';
  trendText: string;
}

const MetricCard = ({ icon, label, sublabel, value, valueColor, trend, trendText }: MetricCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-50';
      case 'down': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : CheckCircle;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-2xl">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-xs text-gray-400">{sublabel}</p>
        </div>
      </div>
      <p className={`text-2xl font-semibold mb-1 ${valueColor}`}>{value}</p>
      <div className={`flex items-center gap-1 text-sm mt-2 rounded-lg px-3 py-1.5 w-fit ${getTrendColor()}`}>
        <TrendIcon className="h-4 w-4" />
        <span>{trendText}</span>
      </div>
    </div>
  );
};

// Funnel Stage component
interface FunnelStageProps {
  label: string;
  current: number;
  goal: number;
  color: string;
}

const FunnelStage = ({ label, current, goal, color }: FunnelStageProps) => {
  const percentage = Math.round((current / goal) * 100);
  
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        <span className="text-sm text-gray-600">
          {current.toLocaleString()} <span className="text-xs text-gray-400">(of {goal.toLocaleString()})</span>
        </span>
      </div>
      <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-300"
          style={{ 
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};

// Main Executive Dashboard
interface ExecutiveDashboardProps {
  userEmail?: string;
}

export const ExecutiveDashboard = ({ userEmail }: ExecutiveDashboardProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('overview');

  // Get user info based on email (demo data for now)
  const getUserInfo = () => {
    if (userEmail === 'delphine@enies.com') {
      return { name: 'Delphine', company: 'ENIES' };
    }
    return { name: 'Executive', company: 'Company' };
  };

  const { name: userName, company: companyName } = getUserInfo();

  // Demo metrics (hardcoded for ENIES)
  const metrics: MetricCardProps[] = [
    { icon: '📱', label: 'MARKETING', sublabel: '5.3%', value: '850 leads', valueColor: 'text-green-600', trend: 'up', trendText: '+12% this week' },
    { icon: '💼', label: 'SALES', sublabel: '26.7%', value: '227 opps', valueColor: 'text-red-600', trend: 'down', trendText: '-15% drop' },
    { icon: '⚡', label: 'PRODUCT', sublabel: '65%', value: '2,180 active', valueColor: 'text-green-600', trend: 'up', trendText: '+8% growth' },
    { icon: '🎯', label: 'CS HEALTH', sublabel: '92%', value: 'Excellent', valueColor: 'text-green-600', trend: 'stable', trendText: 'Stable' },
  ];

  // Demo funnel data
  const funnelStages: FunnelStageProps[] = [
    { label: 'Website Visitors', current: 12450, goal: 15000, color: '#3B82F6' },
    { label: 'Leads Generated', current: 850, goal: 1000, color: '#8B5CF6' },
    { label: 'Marketing Qualified', current: 425, goal: 500, color: '#EC4899' },
    { label: 'Sales Qualified', current: 227, goal: 300, color: '#F59E0B' },
    { label: 'Opportunities', current: 89, goal: 120, color: '#10B981' },
    { label: 'Closed Won', current: 34, goal: 50, color: '#059669' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <ExecutiveSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        userName={userName}
        companyName={companyName}
      />

      {/* Main content */}
      <div className="flex-1 lg:ml-72">
        <ExecutiveHeader 
          onMenuClick={() => setSidebarOpen(true)} 
          userName={userName}
          companyName={companyName}
        />

        <main className="pt-20 p-4 md:p-6 lg:p-8">
          {currentPage === 'overview' && (
            <>
              {/* Company Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-semibold text-blue-600">{companyName}</h1>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Last updated: 2 minutes ago</p>
                  <p>Next sync: 3:45 PM</p>
                </div>
              </div>

              {/* Critical Alert Banner */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-xl text-gray-600 mb-2">Product Lifecycle Health Overview</p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="text-6xl md:text-8xl font-semibold text-yellow-500">78%</div>
                      <div className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="h-6 w-6" />
                        <p className="text-lg font-medium">2 Critical Issues Requiring Immediate Attention</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                {metrics.map((metric, index) => (
                  <MetricCard key={index} {...metric} />
                ))}
              </div>

              {/* Conversion Funnel */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Conversion Funnel</h2>
                {funnelStages.map((stage, index) => (
                  <FunnelStage key={index} {...stage} />
                ))}
              </div>
            </>
          )}

          {currentPage === 'integrations' && (
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Integrations</h1>
              <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                <Link2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Integration management coming soon...</p>
              </div>
            </div>
          )}

          {currentPage === 'team' && (
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Department Heads</h1>
              <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Team management coming soon...</p>
              </div>
            </div>
          )}

          {currentPage === 'analytics' && (
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Data Analytics</h1>
              <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Analytics dashboard coming soon...</p>
              </div>
            </div>
          )}

          {currentPage === 'reports' && (
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Reports</h1>
              <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Reports center coming soon...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
