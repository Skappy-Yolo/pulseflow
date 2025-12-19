import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { InteractiveSidebar } from "../components/dashboard/InteractiveSidebar";
import { InteractiveNavigation } from "../components/dashboard/InteractiveNavigation";
import { InteractiveClientCard } from "../components/dashboard/InteractiveClientCard";
import { ComparativeChart } from "../components/dashboard/ComparativeChart";
import { ClientPieChart } from "../components/dashboard/ClientPieChart";
import { SimpleProductLifecycles } from "../components/dashboard/SimpleProductLifecycles";
import { Footer } from "../components/dashboard/Footer";
import { ClientsPage } from "../components/dashboard/ClientsPage";
import { ClientDetailsPage } from "../components/dashboard/ClientDetailsPage";

export default function ConsultantDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("overview");
  const navigate = useNavigate();

  const clientData = [
    {
      name: "ENIES",
      category: "EdTech",
      users: "33,471 Users",
      score: 45,
      scoreColor: "text-[#ff272d]",
      trend: "down" as const,
      trendValue: "-15%",
      trendText: "Marketing → Sales dropped 15%",
      assignedTo: "Kenny M.",
      priority: "High" as const,
      chartColor: "#ff272d"
    },
    {
      name: "Bunqqi",
      category: "Financial Technology",
      users: "2,904 Users",
      score: 94,
      scoreColor: "text-[#116714]",
      trend: "up" as const,
      trendValue: "+27%",
      trendText: "✅ All Systems Performing Well",
      assignedTo: "Emmanuel O.",
      priority: "Low" as const,
      chartColor: "#116714"
    },
    {
      name: "Tripids",
      category: "E-commerce",
      users: "11,182 Users",
      score: 78,
      scoreColor: "text-[#ff8e00]",
      trend: "stable" as const,
      trendValue: "+5%",
      trendText: "Steady growth across metrics",
      assignedTo: "Sarah K.",
      priority: "Medium" as const,
      chartColor: "#ff8e00"
    }
  ];

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false);
    
    // Navigate to the appropriate route
    if (page === "overview") {
      navigate("/consultant");
    } else if (page === "clients") {
      navigate("/consultant/clients");
    }
  };

  const handleClientSelect = (clientId: string) => {
    navigate(`/consultant/clients/${clientId}`);
  };

  const handleBackToClients = () => {
    navigate("/consultant/clients");
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <InteractiveSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Navigation */}
        <InteractiveNavigation 
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        {/* Main Dashboard Content */}
        <div className="pt-16 lg:pt-20">
          <Routes>
            {/* Overview Page */}
            <Route path="/" element={
              <div className="p-4 md:p-6 lg:p-8">
                {/* Header Section */}
                <div className="mb-6 md:mb-8">
                  <h1 className="text-xl md:text-2xl font-semibold text-[#191b1c] mb-2">
                    👋 Hey, Consuela.
                  </h1>
                  <p className="text-sm md:text-base text-[#626c70]">Here is all Nolum's portfolio overview</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#626c70] mb-1">Total Clients</p>
                        <p className="text-xl md:text-2xl font-semibold text-[#191b1c]">12</p>
                      </div>
                      <div className="h-10 w-10 md:h-12 md:w-12 bg-[#f0f6ff] rounded-lg flex items-center justify-center">
                        <span className="text-lg md:text-2xl">👥</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <span className="text-sm text-[#0faf62]">+2 this month</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#626c70] mb-1">Active Projects</p>
                        <p className="text-xl md:text-2xl font-semibold text-[#191b1c]">34</p>
                      </div>
                      <div className="h-10 w-10 md:h-12 md:w-12 bg-[#f0f6ff] rounded-lg flex items-center justify-center">
                        <span className="text-lg md:text-2xl">📊</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <span className="text-sm text-[#0faf62]">+5 this week</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#626c70] mb-1">Revenue</p>
                        <p className="text-xl md:text-2xl font-semibold text-[#191b1c]">$47.2K</p>
                      </div>
                      <div className="h-10 w-10 md:h-12 md:w-12 bg-[#f0f6ff] rounded-lg flex items-center justify-center">
                        <span className="text-lg md:text-2xl">💰</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <span className="text-sm text-[#0faf62]">+12% from last month</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#626c70] mb-1">Team Members</p>
                        <p className="text-xl md:text-2xl font-semibold text-[#191b1c]">8</p>
                      </div>
                      <div className="h-10 w-10 md:h-12 md:w-12 bg-[#f0f6ff] rounded-lg flex items-center justify-center">
                        <span className="text-lg md:text-2xl">👨‍💼</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <span className="text-sm text-[#626c70]">No change</span>
                    </div>
                  </div>
                </div>

                {/* Client Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {clientData.map((client) => (
                    <InteractiveClientCard
                      key={client.name}
                      {...client}
                    />
                  ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
                  {/* Comparative Performance Chart - Takes 2 columns */}
                  <div className="xl:col-span-2">
                    <ComparativeChart />
                  </div>
                  
                  {/* Client Distribution Chart - Takes 1 column */}
                  <div className="xl:col-span-1">
                    <ClientPieChart />
                  </div>
                </div>

                {/* Product Lifecycles Section */}
                <div className="mt-6 md:mt-8">
                  <SimpleProductLifecycles />
                </div>

                {/* Footer */}
                <Footer />
              </div>
            } />

            {/* Clients List Page */}
            <Route path="/clients" element={
              <ClientsPage onClientSelect={handleClientSelect} />
            } />

            {/* Client Details Page */}
            <Route path="/clients/:clientId" element={
              <ClientDetailsPage 
                clientId=""
                onBack={handleBackToClients}
              />
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
}
