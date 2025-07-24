import React from 'react';

const IntegrationsSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-[48px] font-bold text-gray-900 mb-8">
            Connect to Your Existing Tech Stack
          </h2>
          <p className="text-[20px] text-gray-600 max-w-3xl mx-auto">
            Seamless Software Integrations
          </p>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src="/images/placeholder.png" alt="HubSpot" className="w-full h-full object-contain" />
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src="/images/placeholder.png" alt="Microsoft Teams" className="w-full h-full object-contain" />
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src="/images/placeholder.png" alt="Zapier" className="w-full h-full object-contain" />
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src="/images/placeholder.png" alt="Google Calendar" className="w-full h-full object-contain" />
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src="/images/placeholder.png" alt="Google Analytics" className="w-full h-full object-contain" />
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src="/images/placeholder.png" alt="Zendesk" className="w-full h-full object-contain" />
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src="/images/Did-you-know-1.jpg" alt="Layer" className="w-full h-full object-contain" />
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src="/images/Did-you-know-2.jpg" alt="Integration" className="w-full h-full object-contain" />
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src="/images/placeholder.png" alt="Slack" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-[#005CE8] text-white px-8 py-4 rounded-lg font-medium text-[16px] hover:bg-blue-700 transition-colors">
            See All Integrations
          </button>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;