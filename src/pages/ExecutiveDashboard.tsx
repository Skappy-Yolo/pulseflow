import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ExecutiveSidebar } from "../components/nolum-dashboard/executive/ExecutiveSidebar";
import { ExecutiveNavigation } from "../components/nolum-dashboard/executive/ExecutiveNavigation";
import { ExecutiveOverview } from "../components/nolum-dashboard/executive/ExecutiveOverview";
import { IntegrationsPage } from "../components/nolum-dashboard/executive/IntegrationsPage";
import { TeamManagementPage } from "../components/nolum-dashboard/executive/TeamManagementPage";
import { DataAnalyticsPage } from "../components/nolum-dashboard/executive/DataAnalyticsPage";
import { ReportsPage } from "../components/nolum-dashboard/executive/ReportsPage";

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
        navigate("/enies");
        break;
      case "integrations":
        navigate("/enies/integrations");
        break;
      case "department-heads":
        navigate("/enies/team");
        break;
      case "data-analytics":
        navigate("/enies/analytics");
        break;
      case "reports":
        navigate("/enies/reports");
        break;
      default:
        navigate("/enies");
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
