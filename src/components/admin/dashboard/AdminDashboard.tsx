// src/components/admin/dashboard/AdminDashboard.tsx
// FIXED: Navigation issue and UI spacing problems

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { adminAuth } from '../../../lib/admin-auth';
import type { AdminUser, CustomerUser, AdminDashboardStats } from '../../../types/admin';

interface DashboardMetric {
  id: string;
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<CustomerUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const admin = adminAuth.getCurrentAdmin();
    setCurrentAdmin(admin);
    if (admin) {
      loadDashboardData();
    }
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      const dashboardStats = await adminAuth.getDashboardStats();
      setStats(dashboardStats);
      setRecentUsers(dashboardStats.recentRegistrations);
      setLastUpdated(new Date());
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadDashboardData();
  };

  // FIXED: Clean navigation using only React Router - no window.location.href
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const getMetrics = (): DashboardMetric[] => {
    if (!stats) return [];

    return [
      {
        id: 'total-customers',
        label: 'Total Customers',
        value: stats.totalCustomers,
        icon: Users,
        color: 'blue'
      },
      {
        id: 'pending-approvals',
        label: 'Pending Approvals',
        value: stats.pendingApprovals,
        icon: Clock,
        color: stats.pendingApprovals > 0 ? 'yellow' : 'gray'
      },
      {
        id: 'active-customers',
        label: 'Active Customers',
        value: stats.activeCustomers,
        icon: CheckCircle,
        color: 'green'
      },
      {
        id: 'suspended-customers',
        label: 'Suspended',
        value: stats.suspendedCustomers,
        icon: XCircle,
        color: stats.suspendedCustomers > 0 ? 'red' : 'gray'
      }
    ];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMetricCardColor = (color: string) => {
    switch (color) {
      case 'blue': return 'admin-metric-blue';
      case 'green': return 'admin-metric-green';
      case 'yellow': return 'admin-metric-yellow';
      case 'red': return 'admin-metric-red';
      default: return 'admin-metric-gray';
    }
  };

  const getMetricIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-indigo-600';
      case 'green': return 'text-green-600';
      case 'yellow': return 'text-yellow-600';
      case 'red': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  if (!currentAdmin) {
    return (
      <div className="admin-loading-section">
        <p className="admin-text-secondary">Please log in to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Header - FIXED: Better spacing between "Last updated" and "Refresh" button */}
      <div className="admin-flex-between" style={{ marginBottom: '3rem' }}>
        <div>
          <h1 className="admin-dashboard-title">
            Welcome back, {currentAdmin.firstName || currentAdmin.email.split('@')[0]}!
          </h1>
          <p className="admin-dashboard-subtitle">
            Here's what's happening with your platform today
          </p>
        </div>
        
        {/* FIXED: Proper spacing between text and button */}
        <div className="flex items-center gap-6">
          <div className="admin-text-secondary text-sm">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="admin-btn-primary"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="admin-metrics-grid" style={{ marginBottom: '3rem' }}>
        {getMetrics().map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.id}
              className={`admin-metric-card ${getMetricCardColor(metric.color)}`}
              onClick={() => {
                if (metric.id === 'pending-approvals' && metric.value > 0) {
                  handleNavigation('/admin/users/pending');
                } else if (metric.id === 'total-customers' || metric.id === 'active-customers') {
                  handleNavigation('/admin/users/customers');
                }
              }}
            >
              <div className="admin-flex-between">
                <div>
                  <p className="admin-metric-label">
                    {metric.label}
                  </p>
                  <p className={`admin-metric-value ${getMetricIconColor(metric.color)}`}>
                    {metric.value}
                  </p>
                </div>
                <Icon size={36} className={`${getMetricIconColor(metric.color)}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="admin-dashboard-grid">
        {/* Recent Customer Registrations */}
        <div className="admin-section-container lg:col-span-2">
          <div className="admin-flex-between" style={{ marginBottom: '1.5rem' }}>
            <h2 className="admin-section-title">
              Recent Registrations
            </h2>
            <button 
              className="admin-btn-link"
              onClick={() => handleNavigation('/admin/users/customers')}
            >
              View All
            </button>
          </div>
          
          {isLoading ? (
            <div className="admin-loading-section">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex items-center space-x-4 p-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="w-32 h-4 bg-slate-200 rounded"></div>
                      <div className="w-24 h-3 bg-slate-200 rounded"></div>
                    </div>
                    <div className="w-16 h-6 bg-slate-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : recentUsers.length > 0 ? (
            <div className="space-y-3">
              {recentUsers.slice(0, 5).map((user) => (
                <div 
                  key={user.id} 
                  className="admin-table-row admin-dashboard-user-row"
                  onClick={() => handleNavigation('/admin/users/customers')}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Users size={20} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="admin-text-primary font-medium">
                        {user.firstName && user.lastName 
                          ? `${user.firstName} ${user.lastName}` 
                          : user.email
                        }
                      </p>
                      <p className="admin-text-secondary text-sm">
                        {user.company || 'No company'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`admin-badge text-xs ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                    <span className="admin-text-secondary text-xs">
                      {formatDate(user.registeredAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="admin-empty-state">
              <Users size={48} className="admin-empty-icon" />
              <p className="admin-empty-description">
                No recent registrations
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions - FIXED: Better card spacing and padding */}
        <div className="admin-section-container">
          <h2 className="admin-section-title" style={{ marginBottom: '1.5rem' }}>
            Quick Actions
          </h2>
          
          {/* FIXED: Using new container class for proper card spacing */}
          <div className="admin-action-cards-container">
            {/* Pending Approvals Action */}
            {stats && stats.pendingApprovals > 0 && (
              <button
                className="admin-action-card admin-action-warning"
                onClick={() => handleNavigation('/admin/users/pending')}
              >
                <div className="flex items-center space-x-3">
                  <UserCheck size={24} className="text-yellow-600" />
                  <div className="text-left">
                    <p className="admin-action-title text-yellow-800">
                      Review Approvals
                    </p>
                    <p className="admin-action-subtitle text-yellow-600">
                      {stats.pendingApprovals} pending review
                    </p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-yellow-600 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {/* Manage Customers */}
            <button
              className="admin-action-card admin-action-primary"
              onClick={() => handleNavigation('/admin/users/customers')}
            >
              <div className="flex items-center space-x-3">
                <Users size={24} className="text-indigo-600" />
                <div className="text-left">
                  <p className="admin-action-title text-indigo-800">
                    Manage Customers
                  </p>
                  <p className="admin-action-subtitle text-indigo-600">
                    View and manage all users
                  </p>
                </div>
              </div>
              <ArrowRight size={18} className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Add Admin (Super Admin Only) */}
            {currentAdmin.role.name === 'super_admin' && (
              <button
                className="admin-action-card admin-action-success"
                onClick={() => handleNavigation('/admin/users/admins')}
              >
                <div className="flex items-center space-x-3">
                  <Plus size={24} className="text-green-600" />
                  <div className="text-left">
                    <p className="admin-action-title text-green-800">
                      Manage Admins
                    </p>
                    <p className="admin-action-subtitle text-green-600">
                      Add or manage admin users
                    </p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-green-600 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {/* View Reports */}
            <button
              className="admin-action-card admin-action-neutral"
              onClick={() => handleNavigation('/admin/reports')}
            >
              <div className="flex items-center space-x-3">
                <TrendingUp size={24} className="text-slate-600" />
                <div className="text-left">
                  <p className="admin-action-title text-slate-800">
                    View Reports
                  </p>
                  <p className="admin-action-subtitle text-slate-600">
                    Analytics and insights
                  </p>
                </div>
              </div>
              <ArrowRight size={18} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;