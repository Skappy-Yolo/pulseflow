// src/components/admin/layout/AdminSidebar.tsx
// FIXED: Navigation paths and route matching

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Shield,
  Clock,
  BarChart3,
  FileText,
  Activity,
  Settings,
  ChevronRight
} from 'lucide-react';
import { adminAuth } from '../../../lib/admin-auth';
import { PERMISSIONS } from '../../../types/admin';

interface AdminSidebarProps {
  isCollapsed?: boolean;
}

import type { RequiredPermission } from '../../../types/admin';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  path: string;
  permission?: RequiredPermission;
  children?: SidebarItem[];
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  isCollapsed = false 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Track expanded/collapsed state for dropdowns
  const [expanded, setExpanded] = useState<{ [id: string]: boolean }>({});

  const sidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      path: '/admin/analytics',
      permission: PERMISSIONS.USERS.VIEW
    },
    {
      id: 'customer-users',
      label: 'Customer Users',
      icon: Users,
      path: '/admin/users/customers',
      permission: PERMISSIONS.USERS.VIEW
    },
    {
      id: 'pending-approvals',
      label: 'Pending Approvals',
      icon: Clock,
      path: '/admin/users/pending',
      permission: PERMISSIONS.USERS.APPROVE
    },
    {
      id: 'admin-users',
      label: 'Admin Users',
      icon: Shield,
      path: '/admin/users/admins',
      permission: PERMISSIONS.ADMIN.VIEW
    },
    {
      id: 'reports',
      label: 'Reports Center',
      icon: FileText,
      path: '/admin/reports',
      permission: PERMISSIONS.USERS.VIEW,
      children: [
        {
          id: 'user-reports',
          label: 'User Reports',
          icon: Users,
          path: '/admin/reports/users',
          permission: PERMISSIONS.USERS.VIEW
        },
        {
          id: 'activity-reports',
          label: 'Activity Reports',
          icon: Activity,
          path: '/admin/reports/activity',
          permission: PERMISSIONS.USERS.VIEW
        }
      ]
    },
    {
      id: 'audit-logs',
      label: 'Audit Logs',
      icon: Activity,
      path: '/admin/audit',
      permission: PERMISSIONS.SETTINGS.VIEW
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings',
      permission: PERMISSIONS.SETTINGS.VIEW,
      children: [
        {
          id: 'general-settings',
          label: 'General Settings',
          icon: Settings,
          path: '/admin/settings/general',
          permission: PERMISSIONS.SETTINGS.UPDATE
        },
        {
          id: 'security-settings',
          label: 'Security Settings',
          icon: Shield,
          path: '/admin/settings/security',
          permission: PERMISSIONS.SETTINGS.SECURITY
        }
      ]
    }
  ];

  const handleNavigation = (path: string) => {
    // Use absolute navigation instead of relative
    navigate(path);
  };

  const isActiveItem = (itemPath: string) => {
    return location.pathname === itemPath;
  };

  const hasPermission = (permission?: RequiredPermission) => {
    if (!permission) return true;
    return adminAuth.hasPermission(permission);
  };

  const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
    if (!hasPermission(item.permission)) {
      return null;
    }

    const Icon = item.icon;
    const isActive = isActiveItem(item.path);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expanded[item.id] || false;

    const handleItemClick = (e: React.MouseEvent) => {
      if (hasChildren) {
        e.preventDefault();
        setExpanded(prev => ({ ...prev, [item.id]: !isExpanded }));
      } else {
        handleNavigation(item.path);
      }
    };

    return (
      <div key={item.id}>
        <button
          onClick={handleItemClick}
          className={`
            w-full flex items-center justify-between text-left transition-all duration-200 rounded-lg group
            ${isActive 
              ? 'bg-indigo-600 text-white shadow-lg' 
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }
          `}
          style={{
            padding: level === 0 ? '1rem 1.25rem' : '0.875rem 1.25rem 0.875rem 3rem',
            marginBottom: '0.375rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: level === 0 ? '0.875rem' : '0.8rem',
            fontWeight: level === 0 ? '500' : '400'
          }}
        >
          <div className="flex items-center" style={{ gap: '1rem' }}>
            <Icon 
              size={level === 0 ? 18 : 16} 
              className={`
                flex-shrink-0 transition-colors duration-200
                ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}
              `} 
            />
            {!isCollapsed && (
              <span className="truncate">
                {item.label}
              </span>
            )}
          </div>
          {!isCollapsed && hasChildren && (
            <ChevronRight 
              size={14} 
              className={`
                transition-transform duration-200 flex-shrink-0
                ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}
                ${isExpanded ? 'rotate-90' : ''}
              `}
            />
          )}
        </button>
        {/* Only render children if expanded and not collapsed */}
        {!isCollapsed && hasChildren && isExpanded && (
          <div className="space-y-1" style={{ marginBottom: '0.5rem' }}>
            {item.children!.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className="min-h-screen flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 bg-slate-900"
      style={{
        padding: '1.5rem',
        paddingTop: '2rem'
      }}
    >
      {/* Navigation Groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {/* Overview Section */}
        <div>
          {!isCollapsed && (
            <h3
              className="text-slate-400 uppercase font-semibold tracking-wider"
              style={{
                fontSize: '0.75rem',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.05em',
                marginBottom: '1rem'
              }}
            >
              Overview
            </h3>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {renderSidebarItem(sidebarItems[0])} {/* Dashboard */}
            {renderSidebarItem(sidebarItems[1])} {/* Analytics */}
          </div>
        </div>

        {/* User Management Section */}
        <div>
          {!isCollapsed && (
            <h3
              className="text-slate-400 uppercase font-semibold tracking-wider"
              style={{
                fontSize: '0.75rem',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.05em',
                marginBottom: '1rem'
              }}
            >
              User Management
            </h3>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {renderSidebarItem(sidebarItems[2])} {/* Customer Users */}
            {renderSidebarItem(sidebarItems[3])} {/* Pending Approvals */}
            {renderSidebarItem(sidebarItems[4])} {/* Admin Users */}
          </div>
        </div>

        {/* Reporting Section */}
        <div>
          {!isCollapsed && (
            <h3
              className="text-slate-400 uppercase font-semibold tracking-wider"
              style={{
                fontSize: '0.75rem',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.05em',
                marginBottom: '1rem'
              }}
            >
              Reporting
            </h3>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {renderSidebarItem(sidebarItems[5])} {/* Reports Center */}
            {renderSidebarItem(sidebarItems[6])} {/* Audit Logs */}
          </div>
        </div>

        {/* System Section */}
        <div>
          {!isCollapsed && (
            <h3
              className="text-slate-400 uppercase font-semibold tracking-wider"
              style={{
                fontSize: '0.75rem',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.05em',
                marginBottom: '1rem'
              }}
            >
              System
            </h3>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {renderSidebarItem(sidebarItems[7])} {/* Settings */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminSidebar;