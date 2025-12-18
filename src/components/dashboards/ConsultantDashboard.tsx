// Consultant Dashboard - Standalone page for consultant users
// This wraps the Enhanced Dashboard consultant view WITHOUT the executive switcher

import { useState } from 'react';
import { 
  Home, 
  Users, 
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Minus,
  MoreHorizontal
} from 'lucide-react';

// Sidebar component (NO executive switch)
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
  userName: string;
  companyName: string;
}

const ConsultantSidebar = ({ isOpen, onClose, currentPage, onPageChange, userName, companyName }: SidebarProps) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'clients', label: 'Clients', icon: Users },
  ];

  return (
    <div className={`
      fixed lg:static inset-y-0 left-0 z-50 
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
        <p className="text-sm text-gray-500">{companyName}</p>
      </div>

      {/* Navigation - NO EXECUTIVE SWITCH */}
      <nav className="py-4">
        <p className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Dashboard
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
}

const ConsultantHeader = ({ onMenuClick, userName }: HeaderProps) => {
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
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
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

// Client Card component
interface ClientCardProps {
  name: string;
  category: string;
  users: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  trendText: string;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
}

const ClientCard = ({ name, category, users, score, trend, trendValue, trendText, assignedTo, priority }: ClientCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-orange-100 text-orange-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreHorizontal className="h-5 w-5 text-gray-400" />
        </button>
      </div>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">Health Score</p>
          <p className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}%</p>
        </div>
        <div className="flex items-center gap-1">
          {getTrendIcon()}
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
            {trendValue}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{trendText}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full" />
          <span className="text-sm text-gray-600">{assignedTo}</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor()}`}>
          {priority}
        </span>
      </div>
      
      <p className="text-xs text-gray-400 mt-3">{users}</p>
    </div>
  );
};

// Stats Card component
interface StatCardProps {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'neutral';
  icon: string;
}

const StatCard = ({ label, value, change, changeType, icon }: StatCardProps) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
    <p className={`text-sm mt-3 ${changeType === 'positive' ? 'text-green-600' : 'text-gray-500'}`}>
      {change}
    </p>
  </div>
);

// Main Consultant Dashboard
interface ConsultantDashboardProps {
  userEmail?: string;
}

export const ConsultantDashboard = ({ userEmail }: ConsultantDashboardProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('overview');

  // Get user info based on email (demo data for now)
  const getUserInfo = () => {
    if (userEmail === 'consuela@nolum.com') {
      return { name: 'Consuela', company: 'Nolum' };
    }
    return { name: 'Consultant', company: 'Company' };
  };

  const { name: userName, company: companyName } = getUserInfo();

  // Demo client data (hardcoded for Nolum)
  const clientData: ClientCardProps[] = [
    {
      name: "ENIES",
      category: "EdTech",
      users: "33,471 Users",
      score: 45,
      trend: "down",
      trendValue: "-15%",
      trendText: "Marketing → Sales dropped 15%",
      assignedTo: "Kenny M.",
      priority: "High"
    },
    {
      name: "Bunqqi",
      category: "Financial Technology",
      users: "2,904 Users",
      score: 94,
      trend: "up",
      trendValue: "+27%",
      trendText: "✅ All Systems Performing Well",
      assignedTo: "Emmanuel O.",
      priority: "Low"
    },
    {
      name: "Tripids",
      category: "E-commerce",
      users: "11,182 Users",
      score: 78,
      trend: "stable",
      trendValue: "+5%",
      trendText: "Steady growth across metrics",
      assignedTo: "Sarah K.",
      priority: "Medium"
    }
  ];

  const stats: StatCardProps[] = [
    { label: 'Total Clients', value: '12', change: '+2 this month', changeType: 'positive', icon: '👥' },
    { label: 'Active Projects', value: '34', change: '+5 this week', changeType: 'positive', icon: '📊' },
    { label: 'Revenue', value: '$47.2K', change: '+12% from last month', changeType: 'positive', icon: '💰' },
    { label: 'Team Members', value: '8', change: 'No change', changeType: 'neutral', icon: '👨‍💼' },
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
      <ConsultantSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        userName={userName}
        companyName={companyName}
      />

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        <ConsultantHeader 
          onMenuClick={() => setSidebarOpen(true)} 
          userName={userName}
        />

        <main className="pt-16 lg:pt-20 p-4 md:p-6 lg:p-8">
          {currentPage === 'overview' && (
            <>
              {/* Welcome Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  👋 Hey, {userName}.
                </h1>
                <p className="text-gray-600">
                  Here is all {companyName}'s portfolio overview
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </div>

              {/* Client Cards */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Health Overview</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {clientData.map((client) => (
                    <ClientCard key={client.name} {...client} />
                  ))}
                </div>
              </div>
            </>
          )}

          {currentPage === 'clients' && (
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">All Clients</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {clientData.map((client) => (
                  <ClientCard key={client.name} {...client} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ConsultantDashboard;
