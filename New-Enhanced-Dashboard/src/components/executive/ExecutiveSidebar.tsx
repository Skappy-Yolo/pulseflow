import { useState } from "react";
import { X, ChevronDown, Home, Bell, BookOpen, Users, Settings } from "lucide-react";
import svgPaths from "../../imports/svg-b9btvxme69";

interface ExecutiveSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

function SolidStatusHeartbeat() {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g>
          <path d={svgPaths.p16f90f00} fill="#005CE8" />
          <path d={svgPaths.p9f15640} fill="#005CE8" />
        </g>
      </svg>
    </div>
  );
}

interface NavItemProps {
  icon: string | React.ReactNode;
  label: string;
  page: string;
  currentPage: string;
  onPageChange: (page: string) => void;
  hasDropdown?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

function NavItem({ icon, label, page, currentPage, onPageChange, hasDropdown, isOpen, onToggle }: NavItemProps) {
  const isActive = currentPage === page;
  
  return (
    <button
      onClick={() => {
        if (hasDropdown && onToggle) {
          onToggle();
        } else {
          onPageChange(page);
        }
      }}
      className={`
        w-full flex items-center gap-3 px-6 py-2.5 transition-all
        ${isActive 
          ? 'bg-[#f0f6ff] text-[#191b1c] shadow-[inset_3px_0px_0px_0px_#0e5fd9]' 
          : 'bg-white text-[#626c70] hover:bg-gray-50'
        }
      `}
    >
      {typeof icon === 'string' ? (
        <span className="text-base">{icon}</span>
      ) : (
        icon
      )}
      <span className="flex-1 text-left text-sm font-medium">{label}</span>
      {hasDropdown && (
        <ChevronDown className={`h-4 w-4 text-[#959fa3] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      )}
    </button>
  );
}

export function ExecutiveSidebar({ isOpen, onClose, currentPage, onPageChange }: ExecutiveSidebarProps) {
  const [lifecycleOpen, setLifecycleOpen] = useState(false);
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [boardDeckOpen, setBoardDeckOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[280px] bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-1.5 px-6 py-4 border-b border-gray-100">
          <SolidStatusHeartbeat />
          <h1 className="text-2xl font-semibold text-[#191b1c]">PulseFlow</h1>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="ml-auto lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="py-4 space-y-6">
          {/* PORTFOLIO Section */}
          <div className="space-y-2">
            <div className="px-6 mb-2">
              <h2 className="text-xs font-medium text-[#959fa3] uppercase tracking-wider">Portfolio</h2>
            </div>
            <NavItem
              icon={<Home className="h-5 w-5" />}
              label="Executive Dashboard"
              page="executive-overview"
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
            <NavItem
              icon="🔔"
              label="Alerts"
              page="alerts"
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>

          {/* INSIGHTS Section */}
          <div className="space-y-2">
            <div className="px-6 mb-2">
              <h2 className="text-xs font-medium text-[#959fa3] uppercase tracking-wider">Insights</h2>
            </div>
            <NavItem
              icon="🔄"
              label="Lifecycle Health"
              page="lifecycle-health"
              currentPage={currentPage}
              onPageChange={onPageChange}
              hasDropdown={true}
              isOpen={lifecycleOpen}
              onToggle={() => setLifecycleOpen(!lifecycleOpen)}
            />
            <NavItem
              icon="📊"
              label="Key Metrics"
              page="key-metrics"
              currentPage={currentPage}
              onPageChange={onPageChange}
              hasDropdown={true}
              isOpen={metricsOpen}
              onToggle={() => setMetricsOpen(!metricsOpen)}
            />
            <NavItem
              icon="🚦"
              label="Funnel Overview"
              page="funnel-overview"
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
            <NavItem
              icon="⚡"
              label="Bottlenecks"
              page="bottlenecks"
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
            <NavItem
              icon="🔌"
              label="Integrations"
              page="integrations"
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
            <NavItem
              icon="✅"
              label="Data Quality"
              page="data-quality"
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
            <NavItem
              icon="🔄"
              label="Sync Status"
              page="sync-status"
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
            <NavItem
              icon="📈"
              label="Attribution"
              page="attribution"
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
            <NavItem
              icon="🎯"
              label="Conversion Rates"
              page="conversion-rates"
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>

          {/* REPORTS Section */}
          <div className="space-y-2">
            <div className="px-6 mb-2">
              <h2 className="text-xs font-medium text-[#959fa3] uppercase tracking-wider">Reports</h2>
            </div>
            <NavItem
              icon="📄"
              label="Executive Reports"
              page="reports"
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
            <NavItem
              icon="📊"
              label="Data Analytics"
              page="data-analytics"
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>

          {/* TEAM Section */}
          <div className="space-y-2">
            <div className="px-6 mb-2">
              <h2 className="text-xs font-medium text-[#959fa3] uppercase tracking-wider">Team</h2>
            </div>
            <NavItem
              icon="👥"
              label="Department Heads"
              page="department-heads"
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
            <NavItem
              icon="⚙️"
              label="Settings"
              page="settings"
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </aside>
    </>
  );
}