// src/components/admin/dashboard/InviteAdminModal.tsx
// Modal for inviting new admin users

import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  User, 
  Shield, 
  Loader2, 
  CheckCircle,
  Copy,
  AlertCircle
} from 'lucide-react';
import { adminInvitation, type AdminRole } from '../../../lib/admin-invitation';

interface InviteAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitedById: string;
  onSuccess: () => void;
}

const roleDescriptions: Record<AdminRole, string> = {
  super_admin: 'Full access to all features, can manage other admins',
  admin: 'Can manage customers, view reports, approve registrations',
  sales: 'Can view and manage leads, customer registrations',
  viewer: 'Read-only access to dashboards and reports'
};

const InviteAdminModal: React.FC<InviteAdminModalProps> = ({
  isOpen,
  onClose,
  invitedById,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: 'admin' as AdminRole
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    tempPassword?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const response = await adminInvitation.inviteAdmin(formData, invitedById);
    
    setResult({
      success: response.success,
      message: response.message,
      tempPassword: response.tempPassword
    });

    setIsSubmitting(false);

    if (response.success && !response.tempPassword) {
      // Email was sent successfully, close after delay
      setTimeout(() => {
        onSuccess();
        handleClose();
      }, 2000);
    }
  };

  const handleClose = () => {
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      role: 'admin'
    });
    setResult(null);
    setCopied(false);
    onClose();
  };

  const copyCredentials = () => {
    if (result?.tempPassword) {
      const text = `Email: ${formData.email}\nTemporary Password: ${result.tempPassword}\nLogin URL: ${window.location.origin}/admin/login`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={handleClose}
        />

        {/* Modal */}
        <div className="relative inline-block w-full max-w-md p-6 my-8 text-left align-middle bg-white rounded-xl shadow-xl transform transition-all">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Invite Admin</h3>
            </div>
            <p className="text-sm text-gray-500">
              Send an invitation to a new admin user. They'll receive an email with login credentials.
            </p>
          </div>

          {/* Success/Error Result */}
          {result && (
            <div className={`mb-6 p-4 rounded-lg ${
              result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-start gap-3">
                {result.success ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.message}
                  </p>

                  {/* Show temp password if email failed */}
                  {result.success && result.tempPassword && (
                    <div className="mt-3 p-3 bg-white rounded border border-green-200">
                      <p className="text-xs text-gray-500 mb-2">Share these credentials manually:</p>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-gray-500">Email:</span> <span className="font-medium text-gray-900">{formData.email}</span></p>
                        <p><span className="text-gray-500">Password:</span> <span className="font-mono font-medium text-gray-900">{result.tempPassword}</span></p>
                      </div>
                      <button
                        onClick={copyCredentials}
                        className="mt-3 flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 rounded hover:bg-indigo-100 transition-colors"
                      >
                        <Copy size={14} />
                        {copied ? 'Copied!' : 'Copy Credentials'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          {!result?.success && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="admin@company.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Name Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="First"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Last"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Role
                </label>
                <div className="relative">
                  <Shield size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as AdminRole })}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer"
                  >
                    <option value="admin" className="text-gray-900 bg-white">Admin</option>
                    <option value="super_admin" className="text-gray-900 bg-white">Super Admin</option>
                    <option value="sales" className="text-gray-900 bg-white">Sales</option>
                    <option value="viewer" className="text-gray-900 bg-white">Viewer</option>
                  </select>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {roleDescriptions[formData.role]}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Inviting...
                    </>
                  ) : (
                    <>
                      <Mail size={16} />
                      Send Invitation
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Done button after success */}
          {result?.success && result?.tempPassword && (
            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  onSuccess();
                  handleClose();
                }}
                className="px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteAdminModal;
