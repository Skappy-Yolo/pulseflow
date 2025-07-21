import React from 'react';
import { images } from '../../assets/images';

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
            <img src={images.hubspot} alt="HubSpot" className="w-full h-full object-contain" />
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={images.teams} alt="Microsoft Teams" className="w-full h-full object-contain" />
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={images.zapier} alt="Zapier" className="w-full h-full object-contain" />
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={images.googleCalendar} alt="Google Calendar" className="w-full h-full object-contain" />
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={images.googleAnalytics} alt="Google Analytics" className="w-full h-full object-contain" />
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={images.zenBig} alt="Zendesk" className="w-full h-full object-contain" />
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={images.layer} alt="Layer" className="w-full h-full object-contain" />
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={images.group1} alt="Integration" className="w-full h-full object-contain" />
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={images.slack} alt="Slack" className="w-full h-full object-contain" />
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