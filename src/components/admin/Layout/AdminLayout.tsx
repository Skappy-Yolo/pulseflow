// src/components/admin/layout/AdminLayout.tsx
// COMPLETE: Perfect header spacing, notification/profile alignment, and hamburger logic

import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Bell, 
  User, 
  LogOut, 
  Settings,
  ChevronDown
} from 'lucide-react';
import { adminAuth } from '../../../lib/admin-auth';
import type { AdminUser } from '../../../types/admin';
import AdminSidebar from './AdminSidebar';



const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);

  // Check screen size for mobile responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Get current admin user
  useEffect(() => {
    const admin = adminAuth.getCurrentAdmin();
    setCurrentAdmin(admin);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await adminAuth.logoutAdmin();
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const formatAdminName = (admin: AdminUser) => {
    return `${admin.firstName} ${admin.lastName}`.trim() || admin.email;
  };

  const formatAdminRole = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'admin':
        return 'Administrator';
      case 'viewer':
        return 'Viewer';
      default:
        return role;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar Overlay for Mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 bg-slate-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 w-72
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between bg-slate-800 border-b border-slate-700 h-16 px-8">
          {/* PulseFlow Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/images/Heartbeat.svg" alt="PulseFlow Logo" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white font-['Public_Sans']">
                PulseFlow
              </h1>
              <p className="text-xs text-indigo-300 font-['Inter']">
                Admin Portal
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-slate-300 hover:text-white p-1 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Admin Sidebar Navigation */}
        <AdminSidebar isCollapsed={false} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 relative z-30 h-16">
          <div className="flex items-center justify-between h-full px-8 pr-8">
            {/* Left Side */}
            <div className="flex items-center">
              {/* Hamburger - only show on mobile OR when sidebar is closed on desktop */}
              {(isMobile || !isSidebarOpen) && (
                <button
                  onClick={toggleSidebar}
                  className="text-slate-500 hover:text-slate-700 transition-colors rounded-lg hover:bg-slate-100 p-2 mr-4"
                >
                  <Menu size={20} />
                </button>
              )}
            </div>

            {/* Right Side */}
            <div className="flex items-center mr-6">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
                  className="relative text-slate-500 hover:text-slate-700 transition-colors rounded-lg hover:bg-slate-100 w-10 h-10 flex items-center justify-center mr-6"
                >
                  <Bell size={20} />
                  {/* Notification badge */}
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Notification Dropdown */}
                {isNotificationMenuOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 z-50 py-2">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <h3 className="text-sm font-medium text-slate-900 font-['Inter']">
                        Notifications
                      </h3>
                    </div>
                    
                    <div className="px-4 py-8 text-center">
                      <Bell size={32} className="mx-auto text-slate-300 mb-3" />
                      <p className="text-sm text-slate-500 font-['Inter']">
                        No current notifications
                      </p>
                      <p className="text-xs text-slate-400 mt-1 font-['Inter']">
                        You'll see important updates here
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Profile Dropdown */}
              {currentAdmin && (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center text-slate-700 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100 p-2 gap-3"
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                      <User size={14} className="text-white" />
                    </div>
                    
                    {/* Admin Info */}
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-slate-900 leading-tight font-['Inter']">
                        {formatAdminName(currentAdmin)}
                      </p>
                      <p className="text-xs text-slate-500 leading-tight font-['Inter']">
                        {formatAdminRole(currentAdmin.role.name)}
                      </p>
                    </div>
                    
                    {/* Dropdown Arrow */}
                    <ChevronDown size={16} className="text-slate-400" />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 z-50 py-2">
                      {/* Admin Info Header */}
                      <div className="px-4 py-3 border-b border-slate-100 mb-2">
                        <p className="text-sm font-medium text-slate-900 font-['Inter']">
                          {formatAdminName(currentAdmin)}
                        </p>
                        <p className="text-xs text-slate-500 font-['Inter']">
                          {currentAdmin.email}
                        </p>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="space-y-1">
                        <button className="w-full text-left text-slate-700 hover:bg-slate-50 transition-colors flex items-center px-4 py-3 text-sm font-['Inter'] gap-3 rounded-lg mx-2">
                          <Settings size={16} />
                          <span>Account Settings</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-slate-100 my-2"></div>
                      
                      <div className="space-y-1">
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left text-red-600 hover:bg-red-50 transition-colors flex items-center px-4 py-3 text-sm font-['Inter'] gap-3 rounded-lg mx-2"
                        >
                          <LogOut size={16} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-slate-50">
          <Outlet key={location.pathname} />
        </main>
      </div>

      {/* Click outside to close menus */}
      {(isProfileMenuOpen || isNotificationMenuOpen) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileMenuOpen(false);
            setIsNotificationMenuOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminLayout;