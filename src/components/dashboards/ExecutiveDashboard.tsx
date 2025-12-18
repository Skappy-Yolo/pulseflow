// Executive Dashboard - Standalone page for executive users
// This wraps the Enhanced Dashboard executive view WITHOUT the consultant switcher
// Now data-driven: fetches from Supabase OR shows demo data

import { useState, useEffect } from 'react';
import { 
  Home, 
  BarChart3,
  Link2,
  FileText,
  Menu,
  X,
  Bell,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Plus,
  Building2,
  Loader2,
  LogOut
} from 'lucide-react';
import { dashboardService, type DashboardUser, type ExecutiveDepartment } from '../../lib/dashboard-service';
import { useAuth } from '../../contexts/AuthContext';

// Sidebar component (NO consultant switch)
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
  userName: string;
  companyName: string;
}

const ExecutiveSidebar = ({ isOpen, onClose, currentPage, onPageChange, userName, companyName, onLogout }: SidebarProps & { onLogout: () => void }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'integrations', label: 'Integrations', icon: Link2 },
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

      {/* Logout Button */}
      <div className="px-4 py-4 border-t border-gray-200 mt-auto">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
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

// Empty State Component for new executives
const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  actionLabel?: string; 
  onAction?: () => void; 
}) => (
  <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
    <div className="p-4 bg-gray-100 rounded-full mb-4">
      <Icon className="h-8 w-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 max-w-sm mb-4">{description}</p>
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
      >
        <Plus className="h-4 w-4" />
        {actionLabel}
      </button>
    )}
  </div>
);

export const ExecutiveDashboard = ({ userEmail }: ExecutiveDashboardProps) => {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [dbUser, setDbUser] = useState<DashboardUser | null>(null);
  const [dbDepartments, setDbDepartments] = useState<ExecutiveDepartment[]>([]);
  const [dbMetrics, setDbMetrics] = useState({
    overallHealthScore: 0,
    totalBudgetUsed: 0,
    totalBudget: 0,
    totalHeadcount: 0,
    departmentsOnTrack: 0,
    departmentsAtRisk: 0
  });
  const [useRealData, setUseRealData] = useState(false);

  // Load data from Supabase on mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const currentUser = await dashboardService.getCurrentUser();
      if (currentUser) {
        setDbUser(currentUser);
        const [departmentsData, metricsData] = await Promise.all([
          dashboardService.getExecutiveDepartments(currentUser.organizationId),
          dashboardService.getExecutiveMetrics(currentUser.organizationId)
        ]);
        setDbDepartments(departmentsData);
        setDbMetrics(metricsData);
        // Use real data if we have any departments from DB
        setUseRealData(departmentsData.length > 0);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
      setUseRealData(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Get user info - prefer DB data, fall back to email-based demo data
  const getUserInfo = () => {
    if (dbUser) {
      return { name: dbUser.firstName || 'User', company: dbUser.organizationName };
    }
    if (userEmail === 'delphine@enies.com') {
      return { name: 'Delphine', company: 'ENIES' };
    }
    if (userEmail === 'executive@pulseflow.com') {
      return { name: 'Demo User', company: 'PulseFlow Demo' };
    }
    return { name: 'Executive', company: 'Your Company' };
  };

  const { name: userName, company: companyName } = getUserInfo();

  const hasNoDepartments = useRealData && dbDepartments.length === 0;

  // Demo metrics (fallback when no real data - shows ENIES example)
  const demoMetrics: MetricCardProps[] = [
    { icon: '📱', label: 'MARKETING', sublabel: '5.3%', value: '850 leads', valueColor: 'text-green-600', trend: 'up', trendText: '+12% this week' },
    { icon: '💼', label: 'SALES', sublabel: '26.7%', value: '227 opps', valueColor: 'text-red-600', trend: 'down', trendText: '-15% drop' },
    { icon: '⚡', label: 'PRODUCT', sublabel: '65%', value: '2,180 active', valueColor: 'text-green-600', trend: 'up', trendText: '+8% growth' },
    { icon: '🎯', label: 'CS HEALTH', sublabel: '92%', value: 'Excellent', valueColor: 'text-green-600', trend: 'stable', trendText: 'Stable' },
  ];

  // Convert DB departments to metrics display
  const realMetrics: MetricCardProps[] = dbDepartments.slice(0, 4).map(dept => ({
    icon: dept.departmentName === 'Marketing' ? '📱' : dept.departmentName === 'Sales' ? '💼' : dept.departmentName === 'Product' ? '⚡' : '🎯',
    label: dept.departmentName.toUpperCase(),
    sublabel: `${dept.healthScore}%`,
    value: `${dept.headcount} people`,
    valueColor: dept.healthScore >= 70 ? 'text-green-600' : dept.healthScore >= 40 ? 'text-yellow-600' : 'text-red-600',
    trend: dept.status === 'on_track' || dept.status === 'ahead' ? 'up' : dept.status === 'at_risk' ? 'down' : 'stable',
    trendText: dept.status.replace('_', ' ')
  }));

  const metrics = useRealData ? realMetrics : demoMetrics;

  // Demo funnel data (fallback)
  const demoFunnelStages: FunnelStageProps[] = [
    { label: 'Website Visitors', current: 12450, goal: 15000, color: '#3B82F6' },
    { label: 'Leads Generated', current: 850, goal: 1000, color: '#8B5CF6' },
    { label: 'Marketing Qualified', current: 425, goal: 500, color: '#EC4899' },
    { label: 'Sales Qualified', current: 227, goal: 300, color: '#F59E0B' },
    { label: 'Opportunities', current: 89, goal: 120, color: '#10B981' },
    { label: 'Closed Won', current: 34, goal: 50, color: '#059669' },
  ];

  const funnelStages = demoFunnelStages; // Always demo for now until integrations

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

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
        onLogout={handleLogout}
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
                  {!useRealData && (
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">Demo Data</span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {useRealData ? (
                    <p>Showing live data from your integrations</p>
                  ) : (
                    <p>Connect integrations to see your real data</p>
                  )}
                </div>
              </div>

              {hasNoDepartments ? (
                /* Empty State for new executives */
                <EmptyState
                  icon={Building2}
                  title="No departments configured"
                  description="Add your company's departments to start tracking their health scores, KPIs, and performance metrics."
                  actionLabel="Add Your First Department"
                  onAction={() => setCurrentPage('departments')}
                />
              ) : (
                <>
                  {/* Critical Alert Banner */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-xl text-gray-600 mb-2">Product Lifecycle Health Overview</p>
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className={`text-6xl md:text-8xl font-semibold ${
                            useRealData 
                              ? (dbMetrics.overallHealthScore >= 70 ? 'text-green-500' : dbMetrics.overallHealthScore >= 40 ? 'text-yellow-500' : 'text-red-500')
                              : 'text-yellow-500'
                          }`}>
                            {useRealData ? `${dbMetrics.overallHealthScore}%` : '78%'}
                          </div>
                          {(useRealData ? dbMetrics.departmentsAtRisk > 0 : true) && (
                            <div className="flex items-center gap-2 text-red-600">
                              <AlertTriangle className="h-6 w-6" />
                              <p className="text-lg font-medium">
                                {useRealData 
                                  ? `${dbMetrics.departmentsAtRisk} Department${dbMetrics.departmentsAtRisk !== 1 ? 's' : ''} Requiring Attention`
                                  : '2 Critical Issues Requiring Immediate Attention'
                                }
                              </p>
                            </div>
                          )}
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
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Monthly Conversion Funnel</h2>
                      {!useRealData && (
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">Sample Data</span>
                      )}
                    </div>
                    {funnelStages.map((stage, index) => (
                      <FunnelStage key={index} {...stage} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {currentPage === 'departments' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Departments</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  Add Department
                </button>
              </div>
              {hasNoDepartments ? (
                <EmptyState
                  icon={Building2}
                  title="No departments yet"
                  description="Add your company's departments (Marketing, Sales, Product, etc.) to track their performance and health scores."
                  actionLabel="Add Your First Department"
                  onAction={() => console.log('Add department modal')}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dbDepartments.map((dept) => (
                    <div key={dept.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{dept.departmentName}</h3>
                      {dept.departmentHead && (
                        <p className="text-sm text-gray-500 mb-4">Head: {dept.departmentHead}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Health Score</p>
                          <p className={`text-2xl font-bold ${
                            dept.healthScore >= 70 ? 'text-green-600' : dept.healthScore >= 40 ? 'text-yellow-600' : 'text-red-600'
                          }`}>{dept.healthScore}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Headcount</p>
                          <p className="text-xl font-semibold text-gray-900">{dept.headcount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentPage === 'integrations' && (
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Integrations</h1>
              <p className="text-gray-600 mb-6">Connect your business tools to automatically sync data and metrics.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'HubSpot', description: 'Marketing & CRM data', icon: '🎯', status: 'available' },
                  { name: 'Salesforce', description: 'Sales pipeline', icon: '☁️', status: 'available' },
                  { name: 'Jira', description: 'Product & engineering', icon: '📋', status: 'available' },
                  { name: 'Intercom', description: 'Customer success', icon: '💬', status: 'coming' },
                  { name: 'Google Analytics', description: 'Website traffic', icon: '📊', status: 'coming' },
                  { name: 'Stripe', description: 'Revenue metrics', icon: '💳', status: 'coming' },
                ].map(integration => (
                  <div
                    key={integration.name}
                    className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="text-3xl mb-3">{integration.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{integration.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{integration.description}</p>
                    <button
                      disabled={integration.status === 'coming'}
                      className={`w-full py-2 rounded-lg text-sm font-medium ${
                        integration.status === 'coming'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      {integration.status === 'coming' ? 'Coming Soon' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Integration connections require your own API keys from each service.
                </p>
              </div>
            </div>
          )}

          {currentPage === 'analytics' && (
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Data Analytics</h1>
              <EmptyState
                icon={BarChart3}
                title="Analytics coming soon"
                description="Connect your integrations first to unlock powerful analytics and insights about your business performance."
                actionLabel="Connect Integrations"
                onAction={() => setCurrentPage('integrations')}
              />
            </div>
          )}

          {currentPage === 'reports' && (
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Reports</h1>
              <EmptyState
                icon={FileText}
                title="Reports coming soon"
                description="Generate comprehensive reports about your company's performance once you have data flowing from integrations."
                actionLabel="Connect Integrations"
                onAction={() => setCurrentPage('integrations')}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
