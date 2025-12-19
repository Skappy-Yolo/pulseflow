import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ExecutiveSidebar } from "../components/executive/ExecutiveSidebar";
import { ExecutiveNavigation } from "../components/executive/ExecutiveNavigation";
import { ExecutiveOverview } from "../components/executive/ExecutiveOverview";
import { IntegrationsPage } from "../components/executive/IntegrationsPage";
import { TeamManagementPage } from "../components/executive/TeamManagementPage";
import { DataAnalyticsPage } from "../components/executive/DataAnalyticsPage";
import { ReportsPage } from "../components/executive/ReportsPage";

export default function ExecutiveDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("executive-overview");
  const navigate = useNavigate();

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false);
    
    // Navigate to the appropriate route
    switch (page) {
      case "executive-overview":
        navigate("/executive");
        break;
      case "integrations":
        navigate("/executive/integrations");
        break;
      case "department-heads":
        navigate("/executive/team");
        break;
      case "data-analytics":
        navigate("/executive/analytics");
        break;
      case "reports":
        navigate("/executive/reports");
        break;
      default:
        navigate("/executive");
    }
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
      
      {/* Executive Sidebar */}
      <ExecutiveSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-[280px]">
        {/* Executive Navigation */}
        <ExecutiveNavigation 
          onMenuClick={() => setSidebarOpen(true)}
          dashboardType="executive"
          onDashboardTypeChange={() => {}}
        />
        
        {/* Main Dashboard Content */}
        <div className="pt-16">
          <Routes>
            {/* Executive Overview Page */}
            <Route path="/" element={<ExecutiveOverview />} />

            {/* Integrations Page */}
            <Route path="/integrations" element={<IntegrationsPage />} />

            {/* Team Management Page */}
            <Route path="/team" element={<TeamManagementPage />} />

            {/* Data Analytics Page */}
            <Route path="/analytics" element={<DataAnalyticsPage />} />

            {/* Reports Page */}
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
