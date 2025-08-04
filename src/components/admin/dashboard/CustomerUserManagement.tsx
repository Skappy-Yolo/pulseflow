// src/components/admin/dashboard/CustomerUserManagement.tsx
// COMPLETE: All UI fixes - search bar connection, icon spacing, alignment

import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import CreateCustomerModal from './CreateCustomerModal';
import { 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  Eye, 
  Mail,
  Calendar,
  Building,
  User,
  RefreshCw,
  ChevronDown,
  MoreHorizontal,
  AlertCircle,
  KeyRound
} from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { logAudit } from '../../../lib/audit';
import { adminAuth } from '../../../lib/admin-auth';
import { PERMISSIONS } from '../../../types/admin';
import type { CustomerUser, AdminTableFilters, AdminPaginationParams } from '../../../types/admin';

interface CustomerUserManagementProps {
  onUserSelect?: (user: CustomerUser) => void;
}

export const CustomerUserManagement: React.FC<CustomerUserManagementProps> = ({ onUserSelect }) => {
  const [users, setUsers] = useState<CustomerUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [assignedFilter, setAssignedFilter] = useState<string>('All');
  const [pagination, setPagination] = useState<AdminPaginationParams>({
    page: 1,
    limit: 25,
    sortBy: 'created_at',
    sortOrder: 'desc'
  });
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [actioningUser, setActioningUser] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [bulkStatus, setBulkStatus] = useState('');
  const [bulkLoading, setBulkLoading] = useState(false);
  const [resettingUser, setResettingUser] = useState<string | null>(null);

  // Modal-related state
  const [viewUser, setViewUser] = useState<CustomerUser | null>(null);
  const [editUser, setEditUser] = useState<CustomerUser | null>(null);
  const [editForm, setEditForm] = useState<{ firstName: string; lastName: string; email: string; company: string }>({ firstName: '', lastName: '', email: '', company: '' });
  const [editError, setEditError] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  // Populate edit form when editUser changes
  useEffect(() => {
    if (editUser) {
      setEditForm({
        firstName: editUser.firstName || '',
        lastName: editUser.lastName || '',
        email: editUser.email || '',
        company: editUser.company || ''
      });
      setEditError(null);
    }
  }, [editUser]);

  // Save handler for edit modal
  const handleEditSave = async () => {
    if (!editUser) return;
    setEditLoading(true);
    setEditError(null);
    try {
      const { error } = await supabase.from('customers').update({
        first_name: editForm.firstName,
        last_name: editForm.lastName,
        email: editForm.email,
        company: editForm.company
      }).eq('id', editUser.id);
      if (error) throw error;
      await loadUsers();
      setEditUser(null);
    } catch (err: any) {
      setEditError(err?.message || 'Failed to update customer');
    } finally {
      setEditLoading(false);
    }
  };

  // Get unique assigned team members for filter dropdown
  const assignedOptions = ['All', ...Array.from(new Set(users.map(u => u.assigned_to).filter(Boolean)))];

  // CSV export handler
  const handleExportCSV = () => {
    if (users.length === 0) return;
    const headers = [
      'ID', 'Email', 'First Name', 'Last Name', 'Company', 'Status', 'Registered', 'Assigned To', 'Demo Date'
    ];
    const rows = users.map((u: CustomerUser) => [
      u.id, 
      u.email, 
      u.firstName || '', 
      u.lastName || '', 
      u.company || '', 
      u.status, 
      u.registeredAt, 
      u.assigned_to || '', 
      u.demo_date || ''
    ]);
    const csv = [headers, ...rows].map((r: string[]) => 
      r.map((x: string) => `"${String(x).replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `customers-${new Date().toISOString().slice(0,10)}.csv`);
  };

  // Handler for creating a new customer
  const handleCreateCustomer = async (data: { firstName: string; lastName: string; email: string; company: string }) => {
    const { error } = await supabase.from('customers').insert([
      {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        company: data.company,
        status: 'pending',
        created_at: new Date().toISOString(),
      }
    ]);
    if (error) throw error;
    await loadUsers();
  };

  // Admin-initiated password reset for customer
  const handleResetPassword = async (user: CustomerUser) => {
    if (!user.authUserId) {
      alert('No linked auth user for this customer.');
      return;
    }
    setResettingUser(user.id);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email);
      if (error) {
        throw error;
      }
      alert('Password reset email sent to ' + user.email);
    } catch (err: any) {
      console.error('Reset password error:', err);
      alert('Failed to send reset email: ' + (err?.message || err));
    } finally {
      setResettingUser(null);
    }
  };

  // Bulk status change handler
  const handleBulkStatusChange = async () => {
    if (!bulkStatus || selectedUsers.size === 0) return;
    setBulkLoading(true);
    try {
      const ids = Array.from(selectedUsers);
      const { error } = await supabase.from('customers').update({ status: bulkStatus }).in('id', ids);
      if (!error) {
        // Log audit for each user
        const adminUserId = localStorage.getItem('adminUserId') || '';
        const adminEmail = localStorage.getItem('adminEmail') || '';
        for (const id of ids) {
          await logAudit({
            adminUserId,
            adminEmail,
            action: 'customer_status_changed',
            targetId: id as string,
            details: { to: bulkStatus, bulk: true },
          });
        }
        setSelectedUsers(new Set());
        setBulkStatus('');
        await loadUsers();
        alert('Bulk status update successful');
      } else {
        alert('Bulk status update failed');
      }
    } finally {
      setBulkLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [searchTerm, statusFilter, pagination.page, pagination.limit, pagination.sortBy, pagination.sortOrder]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      
      const filters: AdminTableFilters = {
        search: searchTerm || undefined,
        status: statusFilter !== 'all' ? [statusFilter as any] : undefined
      };

      const result = await adminAuth.getCustomerUsers(filters, pagination);
      setUsers(result.data);
      setTotalUsers(result.total);
      
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveUser = async (userId: string, reason?: string) => {
    if (!adminAuth.hasPermission(PERMISSIONS.USERS.APPROVE)) {
      alert('You do not have permission to approve users');
      return;
    }

    try {
      setActioningUser(userId);
      const success = await adminAuth.approveCustomerUser(userId, reason);
      
      if (success) {
        await loadUsers();
        alert('User approved successfully');
      } else {
        alert('Failed to approve user');
      }
    } catch (error) {
      console.error('Error approving user:', error);
      alert('Failed to approve user');
    } finally {
      setActioningUser(null);
    }
  };

  const handleRejectUser = async (userId: string) => {
    if (!adminAuth.hasPermission(PERMISSIONS.USERS.REJECT)) {
      alert('You do not have permission to reject users');
      return;
    }

    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;

    try {
      setActioningUser(userId);
      const success = await adminAuth.rejectCustomerUser(userId, reason);
      
      if (success) {
        await loadUsers();
        alert('User rejected successfully');
      } else {
        alert('Failed to reject user');
      }
    } catch (error) {
      console.error('Error rejecting user:', error);
      alert('Failed to reject user');
    } finally {
      setActioningUser(null);
    }
  };

  const handleSuspendUser = async (userId: string) => {
    if (!adminAuth.hasPermission(PERMISSIONS.USERS.SUSPEND)) {
      alert('You do not have permission to suspend users');
      return;
    }

    const reason = prompt('Please provide a reason for suspension:');
    if (!reason) return;

    try {
      setActioningUser(userId);
      const success = await adminAuth.suspendCustomerUser(userId, reason);
      
      if (success) {
        await loadUsers();
        alert('User suspended successfully');
      } else {
        alert('Failed to suspend user');
      }
    } catch (error) {
      console.error('Error suspending user:', error);
      alert('Failed to suspend user');
    } finally {
      setActioningUser(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'trial': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'demo': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled': return 'bg-slate-200 text-slate-700 border-slate-300';
      case 'inactive': return 'bg-gray-100 text-gray-500 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="admin-icon-sm" />;
      case 'approved': return <UserCheck className="admin-icon-sm" />;
      case 'active': return <UserCheck className="admin-icon-sm" />;
      case 'trial': return <Calendar className="admin-icon-sm text-indigo-600" />;
      case 'demo': return <Eye className="admin-icon-sm text-purple-600" />;
      case 'rejected': return <UserX className="admin-icon-sm" />;
      case 'suspended': return <UserX className="admin-icon-sm" />;
      case 'cancelled': return <AlertCircle className="admin-icon-sm text-slate-500" />;
      case 'inactive': return <User className="admin-icon-sm text-gray-400" />;
      default: return <User className="admin-icon-sm" />;
    }
  };

  const canPerformActions = () => {
    return adminAuth.hasPermission(PERMISSIONS.USERS.APPROVE) || 
           adminAuth.hasPermission(PERMISSIONS.USERS.REJECT) || 
           adminAuth.hasPermission(PERMISSIONS.USERS.SUSPEND);
  };

  const totalPages = Math.ceil(totalUsers / pagination.limit);

  // Filter users by assigned filter
  const filteredUsers = users.filter(user => 
    assignedFilter === 'All' || user.assigned_to === assignedFilter
  );

  if (!adminAuth.hasPermission(PERMISSIONS.USERS.VIEW)) {
    return (
      <div className="p-8 bg-slate-50 min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-800 font-['Inter']">
            You do not have permission to view customer users.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <div className="admin-flex-between admin-header-spacing">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-['Inter']">
            Customer Management
          </h1>
          <p className="text-lg text-slate-600 font-['Inter']">
            Manage all PulseFlow customer accounts
          </p>
        </div>
        
        <div className="admin-flex-center admin-gap-md">
          <button
            onClick={() => setShowCreateModal(true)}
            className="admin-btn-success"
          >
            <span>+ Create Customer</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="admin-btn-secondary bg-slate-600 text-white hover:bg-slate-700"
          >
            <span>Export CSV</span>
          </button>
          <button
            onClick={loadUsers}
            disabled={isLoading}
            className="admin-btn-primary disabled:opacity-50"
          >
            <RefreshCw className={`admin-icon-sm ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-flex-center flex-col sm:flex-row admin-gap-md admin-filter-spacing">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="admin-icon-md admin-search-icon-position text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-form-input admin-input-with-icon-left"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="sm:w-48">
          <div className="relative">
            <Filter className="admin-icon-sm admin-search-icon-position text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-form-input admin-input-with-icon-left admin-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="demo">Demo</option>
              <option value="rejected">Rejected</option>
              <option value="suspended">Suspended</option>
              <option value="cancelled">Cancelled</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown className="admin-icon-sm absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Assigned To Filter */}
        <div className="sm:w-48">
          <select
            value={assignedFilter}
            onChange={e => setAssignedFilter(e.target.value)}
            className="admin-form-input admin-select"
          >
            {assignedOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'All' ? 'All Assigned' : `Assigned to ${opt}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table - Connected to search bar */}
      <div className="admin-table-container-improved">
        {/* Table Header */}
        <div className="admin-table-header admin-tight-padding">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 font-['Inter']">
              Customers ({filteredUsers.length})
            </h3>
            {selectedUsers.size > 0 && canPerformActions() && (
              <div className="admin-flex-center admin-gap-sm">
                <span className="text-sm text-slate-600 font-['Inter']">
                  {selectedUsers.size} selected
                </span>
                <select
                  value={bulkStatus}
                  onChange={e => setBulkStatus(e.target.value)}
                  className="admin-form-input px-2 py-1 text-sm min-h-8"
                >
                  <option value="">Bulk Status...</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="active">Active</option>
                  <option value="trial">Trial</option>
                  <option value="demo">Demo</option>
                  <option value="rejected">Rejected</option>
                  <option value="suspended">Suspended</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button
                  onClick={handleBulkStatusChange}
                  disabled={!bulkStatus || bulkLoading}
                  className="admin-btn-primary px-3 py-1 text-sm min-h-8"
                >
                  {bulkLoading ? 'Updating...' : 'Update Status'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse flex items-center space-x-4">
                    <div className="w-4 h-4 bg-slate-200 rounded"></div>
                    <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="w-48 h-4 bg-slate-200 rounded"></div>
                      <div className="w-32 h-3 bg-slate-200 rounded"></div>
                    </div>
                    <div className="w-20 h-6 bg-slate-200 rounded"></div>
                    <div className="w-24 h-3 bg-slate-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredUsers.length > 0 ? (
            <table className="w-full">
              <thead className="admin-table-header">
                <tr>
                  <th className="admin-table-header-cell-improved text-left">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 focus:ring-indigo-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(new Set(filteredUsers.map(u => u.id)));
                        } else {
                          setSelectedUsers(new Set());
                        }
                      }}
                    />
                  </th>
                  <th className="admin-table-header-cell-improved">
                    Customer
                  </th>
                  <th className="admin-table-header-cell-improved">
                    Company
                  </th>
                  <th className="admin-table-header-cell-improved">
                    Status
                  </th>
                  <th className="admin-table-header-cell-improved">
                    Registered
                  </th>
                  {canPerformActions() && (
                    <th className="admin-table-header-cell-improved text-right">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="admin-table-cell-improved">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 focus:ring-indigo-500"
                        checked={selectedUsers.has(user.id)}
                        onChange={(e) => {
                          const newSelected = new Set(selectedUsers);
                          if (e.target.checked) {
                            newSelected.add(user.id);
                          } else {
                            newSelected.delete(user.id);
                          }
                          setSelectedUsers(newSelected);
                        }}
                      />
                    </td>
                    <td className="admin-table-cell-improved">
                      <div className="admin-flex-center admin-gap-sm">
                        <div className="admin-stat-icon-container w-12 h-12 bg-indigo-100">
                          <User className="admin-icon-md text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 font-['Inter']">
                            {user.firstName && user.lastName 
                              ? `${user.firstName} ${user.lastName}` 
                              : 'No name provided'
                            }
                          </p>
                          <p className="text-sm text-slate-500 font-['Inter']">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="admin-table-cell-improved">
                      <div className="admin-flex-center admin-gap-xs">
                        <Building className="admin-icon-sm text-slate-400" />
                        <span className="text-slate-900 font-['Inter']">
                          {user.company || 'No company'}
                        </span>
                      </div>
                    </td>
                    <td className="admin-table-cell-improved">
                      <div className={`admin-flex-center admin-gap-xs rounded-full border font-medium px-3 py-1 text-xs font-['Inter'] ${getStatusColor(user.status)}`}>
                        {getStatusIcon(user.status)}
                        <span className="capitalize">{user.status}</span>
                      </div>
                    </td>
                    <td className="admin-table-cell-improved">
                      <div className="admin-flex-center admin-gap-xs">
                        <Calendar className="admin-icon-sm text-slate-400" />
                        <span className="text-sm text-slate-600 font-['Inter']">
                          {formatDate(user.registeredAt)}
                        </span>
                      </div>
                    </td>
                    {canPerformActions() && (
                      <td className="admin-table-cell-padding text-right">
                        <div className="admin-flex-center justify-end admin-gap-xs">
                          <button
                            onClick={() => onUserSelect?.(user)}
                            className="admin-action-btn text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            title="View Details"
                          >
                            <Eye className="admin-icon-sm" />
                          </button>

                          <button
                            onClick={() => window.location.href = `mailto:${user.email}`}
                            className="admin-action-btn text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            title="Send Email"
                          >
                            <Mail className="admin-icon-sm" />
                          </button>

                          <button
                            onClick={() => handleResetPassword(user)}
                            disabled={resettingUser === user.id}
                            className={`admin-action-btn ${resettingUser === user.id ? 'text-indigo-400' : 'text-indigo-600 hover:text-indigo-800'} hover:bg-indigo-50 disabled:opacity-50`}
                            title="Reset Password"
                          >
                            <KeyRound className="admin-icon-sm" />
                          </button>

                          {user.status === 'pending' && (
                            <>
                              {adminAuth.hasPermission(PERMISSIONS.USERS.APPROVE) && (
                                <button
                                  onClick={() => handleApproveUser(user.id)}
                                  disabled={actioningUser === user.id}
                                  className="admin-action-btn text-green-600 hover:text-green-700 hover:bg-green-50 disabled:opacity-50"
                                  title="Approve User"
                                >
                                  <UserCheck className="admin-icon-sm" />
                                </button>
                              )}
                              {adminAuth.hasPermission(PERMISSIONS.USERS.REJECT) && (
                                <button
                                  onClick={() => handleRejectUser(user.id)}
                                  disabled={actioningUser === user.id}
                                  className="admin-action-btn text-red-600 hover:text-red-700 hover:bg-red-50 disabled:opacity-50"
                                  title="Reject User"
                                >
                                  <UserX size={16} />
                                </button>
                              )}
                            </>
                          )}

                          {(user.status === 'approved' || user.status === 'active') && adminAuth.hasPermission(PERMISSIONS.USERS.SUSPEND) && (
                            <button
                              onClick={() => handleSuspendUser(user.id)}
                              disabled={actioningUser === user.id}
                              className="admin-action-button-danger disabled:opacity-50"
                              title="Suspend User"
                            >
                              <UserX className="admin-icon-sm" />
                            </button>
                          )}

                          <button
                            className="admin-action-button-improved"
                            title="More Actions"
                          >
                            <MoreHorizontal className="admin-icon-sm" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center p-12">
              <User size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2 font-['Inter']">
                No customers found
              </h3>
              <p className="text-slate-500 font-['Inter']">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'No customers have registered yet'
                }
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="admin-table-header admin-tight-padding border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600 font-['Inter']">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, totalUsers)} of {totalUsers} customers
              </div>
              
              <div className="admin-flex-center admin-gap-xs">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page <= 1}
                  className="admin-btn-secondary px-3 py-2 text-sm min-h-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <span className="text-sm text-slate-600 font-['Inter'] px-3">
                  Page {pagination.page} of {totalPages}
                </span>
                
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page >= totalPages}
                  className="admin-btn-secondary px-3 py-2 text-sm min-h-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Customer Modal */}
      <CreateCustomerModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateCustomer}
      />

      {/* View Customer Modal */}
      {viewUser && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-container-lg">
            {/* Modal Header */}
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">
                Customer Details
              </h2>
              <button
                onClick={() => setViewUser(null)}
                className="admin-modal-close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="admin-modal-content">
              {/* Customer Avatar */}
              <div className="admin-flex-center admin-gap-md mb-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 font-['Inter']">
                    {viewUser.firstName} {viewUser.lastName}
                  </h3>
                  <p className="text-sm text-slate-600 font-['Inter']">
                    {viewUser.email}
                  </p>
                </div>
              </div>

              {/* Customer Information Grid */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-600 font-medium text-xs uppercase tracking-wider font-['Inter']">
                        Company
                      </label>
                      <p className="text-slate-900 font-medium mt-1 text-sm font-['Inter']">
                        {viewUser.company || 'No company'}
                      </p>
                    </div>
                    <div>
                      <label className="text-slate-600 font-medium text-xs uppercase tracking-wider font-['Inter']">
                        Status
                      </label>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium font-['Inter'] ${getStatusColor(viewUser.status)}`}>
                          {viewUser.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <label className="text-slate-600 font-medium text-xs uppercase tracking-wider font-['Inter']">
                    Registration Date
                  </label>
                  <p className="text-slate-900 font-medium mt-1 text-sm font-['Inter']">
                    {formatDate(viewUser.registeredAt)}
                  </p>
                </div>

                {viewUser.assigned_to && (
                  <div className="bg-slate-50 rounded-xl p-4">
                    <label className="text-slate-600 font-medium text-xs uppercase tracking-wider font-['Inter']">
                      Assigned To
                    </label>
                    <p className="text-slate-900 font-medium mt-1 text-sm font-['Inter']">
                      {viewUser.assigned_to}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-slate-200 p-6">
              <button
                onClick={() => setViewUser(null)}
                className="bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition-colors font-medium px-6 py-3 font-['Inter']"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 font-['Inter']">
                Edit Customer
              </h2>
              <button
                onClick={() => setEditUser(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
                disabled={editLoading}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={e => {e.preventDefault(); handleEditSave();}}>
              <div className="p-6">
                {/* Error Display */}
                {editError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl flex items-center p-4 mb-6">
                    <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 text-sm font-['Inter']">
                      {editError}
                    </p>
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-2 text-sm font-['Inter']">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={editForm.firstName}
                        onChange={e => setEditForm(f => ({...f, firstName: e.target.value}))}
                        className="w-full border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 p-3.5 text-sm font-['Inter']"
                        placeholder="Enter first name"
                        required
                        disabled={editLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-2 text-sm font-['Inter']">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={editForm.lastName}
                        onChange={e => setEditForm(f => ({...f, lastName: e.target.value}))}
                        className="w-full border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 p-3.5 text-sm font-['Inter']"
                        placeholder="Enter last name"
                        required
                        disabled={editLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-2 text-sm font-['Inter']">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={e => setEditForm(f => ({...f, email: e.target.value}))}
                      className="w-full border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 p-3.5 text-sm font-['Inter']"
                      placeholder="Enter email address"
                      required
                      disabled={editLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-2 text-sm font-['Inter']">
                      Company
                    </label>
                    <input
                      type="text"
                      value={editForm.company}
                      onChange={e => setEditForm(f => ({...f, company: e.target.value}))}
                      className="w-full border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 p-3.5 text-sm font-['Inter']"
                      placeholder="Enter company name (optional)"
                      disabled={editLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-4 border-t border-slate-200 p-6">
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="bg-slate-500 text-white rounded-xl hover:bg-slate-600 transition-colors font-medium disabled:opacity-50 px-6 py-3 font-['Inter']"
                  disabled={editLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 flex items-center space-x-2 px-6 py-3 font-['Inter']"
                  disabled={editLoading}
                >
                  {editLoading && (
                    <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  <span>{editLoading ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerUserManagement;