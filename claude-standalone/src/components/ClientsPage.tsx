import React from 'react';
import ClientCard from './ClientCard';

interface ClientsPageProps {
  setActiveTab: (tab: string) => void;
}

const ClientsPage: React.FC<ClientsPageProps> = ({ setActiveTab }) => {
  const clientsData = [
    {
      name: 'TRIPIDS',
      healthScore: 87,
      totalUsers: 24567,
      trend: 12.5,
      status: 'Active' as const,
    },
    {
      name: 'ENIES',
      healthScore: 64,
      totalUsers: 15890,
      trend: -5.2,
      status: 'Warning' as const,
    },
    {
      name: 'BUNQQI',
      healthScore: 92,
      totalUsers: 7100,
      trend: 8.7,
      status: 'Active' as const,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Client Management</h1>
        <p className="text-gray-600">Monitor and manage all your client accounts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {clientsData.map((client, index) => (
          <ClientCard 
            key={index} 
            {...client} 
            onViewClick={() => console.log(`View ${client.name}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientsPage;
