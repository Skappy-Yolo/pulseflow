// src/components/admin/dashboard/PendingApprovals.tsx
// Admin page to view and manage pending customer registrations

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  Eye, 
  Calendar,
  Building,
  User,
  RefreshCw,
  ChevronDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Send,
  Briefcase,
  Users
} from 'lucide-react';
import { adminRegistration, type PendingRegistration, type RegistrationStatus } from '../../../lib/admin-registration';

// Status badge component
const StatusBadge: React.FC<{ status: RegistrationStatus }> = ({ status }) => {
  const statusConfig: Record<RegistrationStatus, { bg: string; text: string; label: string }> = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending Review' },
    contacted: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Contacted' },
    demo_scheduled: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Demo Scheduled' },
    approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
    rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

// Customer type badge
const CustomerTypeBadge: React.FC<{ type: 'consulting' | 'executive' }> = ({ type }) => {
  const config = type === 'consulting' 
    ? { bg: 'bg-indigo-100', text: 'text-indigo-800', label: 'Consulting Team', icon: Users }
    : { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Company Executive', icon: Briefcase };

  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <Icon size={12} />
      {config.label}
    </span>
  );
};

// Registration detail modal
interface DetailModalProps {
  registration: PendingRegistration | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onUpdateStatus: (id: string, status: RegistrationStatus) => void;
  isApproving: boolean;
}

const DetailModal: React.FC<DetailModalProps> = ({ 
  registration, 
  onClose, 
  onApprove, 
  onReject,
  onUpdateStatus,
  isApproving 
}) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (!registration) return null;

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    onReject(registration.id, rejectionReason);
    setShowRejectForm(false);
    setRejectionReason('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative inline-block bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Registration Details
                </h3>
                <p className="text-indigo-200 text-sm">
                  Submitted {new Date(registration.created_at).toLocaleDateString()}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="text-white hover:text-indigo-200 transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            {/* Status & Type */}
            <div className="flex items-center gap-3 mb-6">
              <StatusBadge status={registration.status} />
              {registration.customer_type && (
                <CustomerTypeBadge type={registration.customer_type} />
              )}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Full Name
                </label>
                <p className="text-gray-900 font-medium">
                  {registration.first_name} {registration.last_name}
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Email
                </label>
                <p className="text-gray-900">{registration.email}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Company
                </label>
                <p className="text-gray-900">{registration.company}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Primary Role
                </label>
                <p className="text-gray-900">{registration.primary_role || 'Not specified'}</p>
              </div>
            </div>

            {/* Organization Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Organization Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Type:</span>
                  <span className="ml-2 text-gray-900">{registration.organization_type || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-500">
                    {registration.customer_type === 'consulting' ? 'Clients:' : 'Team Size:'}
                  </span>
                  <span className="ml-2 text-gray-900">{registration.team_size_or_clients || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Challenge */}
            {registration.main_challenge && (
              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Main Challenge
                </label>
                <p className="text-gray-900 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
                  {registration.main_challenge}
                  {registration.other_challenge && (
                    <span className="block mt-2 text-gray-600">
                      Details: {registration.other_challenge}
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Admin Notes */}
            {registration.admin_notes && (
              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Admin Notes
                </label>
                <p className="text-gray-700 bg-gray-100 rounded-lg p-3 text-sm">
                  {registration.admin_notes}
                </p>
              </div>
            )}

            {/* Quick Status Update */}
            {registration.status !== 'approved' && registration.status !== 'rejected' && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-gray-500">Quick status:</span>
                <button
                  onClick={() => onUpdateStatus(registration.id, 'contacted')}
                  className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                >
                  Mark Contacted
                </button>
                <button
                  onClick={() => onUpdateStatus(registration.id, 'demo_scheduled')}
                  className="px-3 py-1 text-xs font-medium text-purple-700 bg-purple-50 rounded-full hover:bg-purple-100 transition-colors"
                >
                  Demo Scheduled
                </button>
              </div>
            )}

            {/* Rejection Form */}
            {showRejectForm && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <label className="block text-sm font-medium text-red-700 mb-2">
                  Reason for Rejection
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-3 py-2 border border-red-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows={3}
                  placeholder="Please provide a reason..."
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleReject}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                  >
                    Confirm Rejection
                  </button>
                  <button
                    onClick={() => setShowRejectForm(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {registration.status !== 'approved' && registration.status !== 'rejected' && (
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
              {!showRejectForm && (
                <button
                  onClick={() => setShowRejectForm(true)}
                  className="px-4 py-2 border border-red-300 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50 flex items-center gap-2"
                >
                  <UserX size={16} />
                  Reject
                </button>
              )}
              <button
                onClick={() => onApprove(registration.id)}
                disabled={isApproving}
                className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isApproving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Approving...
                  </>
                ) : (
                  <>
                    <UserCheck size={16} />
                    Approve & Send Email
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main component
const PendingApprovals: React.FC = () => {
  const [registrations, setRegistrations] = useState<PendingRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRegistration, setSelectedRegistration] = useState<PendingRegistration | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    try {
      setIsLoading(true);
      const data = await adminRegistration.getPendingRegistrations();
      setRegistrations(data);
    } catch (error) {
      console.error('Error loading registrations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (registrationId: string) => {
    setIsApproving(true);
    try {
      const result = await adminRegistration.approveRegistration(registrationId);
      
      if (result.success) {
        setActionMessage({ type: 'success', text: 'Registration approved! Activation email sent.' });
        setSelectedRegistration(null);
        await loadRegistrations();
      } else {
        setActionMessage({ type: 'error', text: result.message || 'Failed to approve registration' });
      }
    } catch (error) {
      console.error('Approval error:', error);
      setActionMessage({ type: 'error', text: 'An error occurred during approval' });
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async (registrationId: string, reason: string) => {
    try {
      const result = await adminRegistration.rejectRegistration(registrationId, reason);
      
      if (result.success) {
        setActionMessage({ type: 'success', text: 'Registration rejected.' });
        setSelectedRegistration(null);
        await loadRegistrations();
      } else {
        setActionMessage({ type: 'error', text: 'Failed to reject registration' });
      }
    } catch (error) {
      console.error('Rejection error:', error);
      setActionMessage({ type: 'error', text: 'An error occurred' });
    }
  };

  const handleUpdateStatus = async (registrationId: string, status: RegistrationStatus) => {
    try {
      const result = await adminRegistration.updateStatus(registrationId, status);
      
      if (result.success) {
        setActionMessage({ type: 'success', text: `Status updated to ${status}` });
        await loadRegistrations();
        // Update the selected registration if it's the same one
        if (selectedRegistration?.id === registrationId) {
          const updated = registrations.find(r => r.id === registrationId);
          if (updated) {
            setSelectedRegistration({ ...updated, status });
          }
        }
      }
    } catch (error) {
      console.error('Status update error:', error);
    }
  };

  const handleResendEmail = async (registrationId: string) => {
    try {
      const result = await adminRegistration.resendActivationEmail(registrationId);
      
      if (result.success) {
        setActionMessage({ type: 'success', text: result.message });
      } else {
        setActionMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      console.error('Resend error:', error);
      setActionMessage({ type: 'error', text: 'Failed to resend email' });
    }
  };

  // Filter registrations
  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Dismiss action message after 5 seconds
  useEffect(() => {
    if (actionMessage) {
      const timer = setTimeout(() => setActionMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [actionMessage]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-['Public_Sans']">
              Pending Approvals
            </h1>
            <p className="text-gray-600 mt-1 font-['Inter']">
              Review and approve new customer registrations
            </p>
          </div>
          <button
            onClick={loadRegistrations}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Action Message */}
      {actionMessage && (
        <div className={`mb-4 p-4 rounded-lg flex items-center gap-3 ${
          actionMessage.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {actionMessage.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="font-medium">{actionMessage.text}</span>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="demo_scheduled">Demo Scheduled</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Count */}
          <div className="text-sm text-gray-500">
            {filteredRegistrations.length} registration{filteredRegistrations.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-indigo-600" />
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending registrations</h3>
            <p className="text-gray-500">New registrations will appear here for review.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRegistrations.map((registration) => (
                  <tr 
                    key={registration.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedRegistration(registration)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <User size={20} className="text-indigo-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {registration.first_name} {registration.last_name}
                          </div>
                          <div className="text-sm text-gray-500">{registration.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building size={16} className="text-gray-400" />
                        <span className="text-gray-900">{registration.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {registration.customer_type && (
                        <CustomerTypeBadge type={registration.customer_type} />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={registration.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar size={14} />
                        {new Date(registration.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedRegistration(registration)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        {registration.status !== 'approved' && registration.status !== 'rejected' && (
                          <>
                            <button
                              onClick={() => handleApprove(registration.id)}
                              disabled={isApproving}
                              className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <UserCheck size={18} />
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('Reason for rejection:');
                                if (reason) handleReject(registration.id, reason);
                              }}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <UserX size={18} />
                            </button>
                          </>
                        )}
                        {registration.status === 'approved' && (
                          <button
                            onClick={() => handleResendEmail(registration.id)}
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Resend Activation Email"
                          >
                            <Send size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <DetailModal
        registration={selectedRegistration}
        onClose={() => setSelectedRegistration(null)}
        onApprove={handleApprove}
        onReject={handleReject}
        onUpdateStatus={handleUpdateStatus}
        isApproving={isApproving}
      />
    </div>
  );
};

export default PendingApprovals;
