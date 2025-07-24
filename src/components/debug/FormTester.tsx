import React, { useState } from 'react';
import ContactForm from '../forms/ContactForm';
import Modal from '../ui/Modal';

/**
 * FormTester Component - Demo component for testing contact forms
 * 
 * This component demonstrates all three form types:
 * - Contact: General inquiries
 * - Demo: Product demonstration requests  
 * - Pricing: Pricing information requests
 */
const FormTester: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'contact' | 'demo' | 'pricing' | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Netlify Forms Integration Test
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Contact Form</h3>
          <p className="text-gray-600 mb-4">General inquiries and support</p>
          <button
            onClick={() => setActiveModal('contact')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Test Contact Form
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Demo Request</h3>
          <p className="text-gray-600 mb-4">Schedule product demonstrations</p>
          <button
            onClick={() => setActiveModal('demo')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Test Demo Form
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Pricing Inquiry</h3>
          <p className="text-gray-600 mb-4">Get detailed pricing information</p>
          <button
            onClick={() => setActiveModal('pricing')}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Test Pricing Form
          </button>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Integration Status</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
            <span>Netlify Forms Configuration: Active</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
            <span>Hidden Form Detection: Enabled</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
            <span>Form Validation: Working</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
            <span>Modal Integration: Ready</span>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <Modal isOpen={activeModal === 'contact'} onClose={closeModal}>
        <ContactForm 
          formType="contact"
          onSuccess={closeModal}
        />
      </Modal>

      {/* Demo Form Modal */}
      <Modal isOpen={activeModal === 'demo'} onClose={closeModal}>
        <ContactForm 
          formType="demo"
          onSuccess={closeModal}
        />
      </Modal>

      {/* Pricing Form Modal */}
      <Modal isOpen={activeModal === 'pricing'} onClose={closeModal}>
        <ContactForm 
          formType="pricing"
          onSuccess={closeModal}
        />
      </Modal>
    </div>
  );
};

export default FormTester;
