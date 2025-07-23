import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-[1400px] mx-auto px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[48px] font-bold text-gray-900 mb-8">
            Ready to Transform Your Product Lifecycle Visibility?
          </h2>
          <p className="text-[20px] text-gray-600 mb-12 leading-relaxed">
            See why 500+ teams trust PulseFlow for building better products and serving customers at scale
          </p>
          
          <div className="flex justify-center gap-6">
            <button 
              className="bg-[#005CE8] text-white px-8 py-4 rounded-lg font-medium text-[16px] hover:bg-blue-700 transition-colors"
              onClick={() => navigate('/signup')}
            >
              Book Your Demo
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium text-[16px] hover:bg-gray-50 transition-colors">
              Watch Demo Video
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
