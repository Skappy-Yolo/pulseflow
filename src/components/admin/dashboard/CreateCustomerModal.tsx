// src/components/admin/dashboard/CreateCustomerModal.tsx
// FIXED: Proper spacing between form fields and buttons

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (customer: { firstName: string; lastName: string; email: string; company: string }) => Promise<void>;
}

const CreateCustomerModal: React.FC<CreateCustomerModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    try {
      await onCreate(form);
      setForm({ firstName: '', lastName: '', email: '', company: '' });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create customer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-container">
        {/* Modal Header */}
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">
            Create New Customer
          </h2>
          <button 
            onClick={onClose} 
            className="admin-modal-close"
          >
            <X className="admin-icon-md" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit}>
          <div className="admin-modal-content">
            <div className="admin-form-field-group">
              <div className="admin-form-field">
                <label className="admin-form-label">
                  First Name
                </label>
                <input 
                  name="firstName" 
                  value={form.firstName} 
                  onChange={handleChange} 
                  className="admin-form-input"
                  placeholder="Enter first name"
                  required 
                />
              </div>

              <div className="admin-form-field">
                <label className="admin-form-label">
                  Last Name
                </label>
                <input 
                  name="lastName" 
                  value={form.lastName} 
                  onChange={handleChange} 
                  className="admin-form-input"
                  placeholder="Enter last name"
                  required 
                />
              </div>

              <div className="admin-form-field">
                <label className="admin-form-label">
                  Email
                </label>
                <input 
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  className="admin-form-input"
                  placeholder="Enter email address"
                  required 
                />
              </div>

              <div className="admin-form-field">
                <label className="admin-form-label">
                  Company
                </label>
                <input 
                  name="company" 
                  value={form.company} 
                  onChange={handleChange} 
                  className="admin-form-input"
                  placeholder="Enter company name (optional)"
                />
              </div>

              {/* Error Display */}
              {error && (
                <div className="admin-form-error">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="admin-modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="admin-btn-secondary"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="admin-btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomerModal;