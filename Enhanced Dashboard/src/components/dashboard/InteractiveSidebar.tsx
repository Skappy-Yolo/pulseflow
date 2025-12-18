import { useState, useEffect } from "react";
import { 
  Home, 
  Users, 
  TrendingUp, 
  BookOpen, 
  Leaf, 
  CreditCard, 
  Settings,
  ChevronDown,
  ChevronRight,
  Activity,
  X,
  BarChart3,
  Target,
  Zap,
  GitCompare,
  Trophy,
  LineChart,
  MapPin,
  UserCheck,
  Calendar,
  FileText,
  Download,
  Clock
} from "lucide-react";
import heartbeatLogo from 'figma:asset/8ddad7e039742b34386c4a51ee32a841ff13deee.png';
import { Button } from "../ui/button";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  onClick?: () => void;
  submenuItems?: Array<{
    label: string;
    icon?: React.ReactNode;
  }>;
}

function SidebarItem({ icon, label, isActive, hasSubmenu, onClick, submenuItems }: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="w-full">
      {hasSubmenu ? (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-between px-6 py-2.5 h-auto rounded-none hover:bg-[#f0f6ff] transition-colors ${
                isActive ? 'bg-[#f0f6ff] border-r-2 border-r-[#0e5fd9] text-[#191b1c]' : 'text-[#626c70]'
              }`}
            >
              <div className="flex items-center gap-3">
                {icon}
                <span className="text-sm font-medium">{label}</span>
              </div>
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-6">
            {submenuItems?.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start gap-3 py-2 pl-8 text-sm text-[#626c70] hover:text-[#191b1c] hover:bg-[#f8f9fa] rounded-none"
                onClick={onClick}
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 px-6 py-2.5 h-auto rounded-none hover:bg-[#f0f6ff] transition-colors ${
            isActive ? 'bg-[#f0f6ff] border-r-2 border-r-[#0e5fd9] text-[#191b1c]' : 'text-[#626c70]'
          }`}
          onClick={onClick}
        >
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </Button>
      )}
    </div>
  );
}

interface InteractiveSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

export function InteractiveSidebar({ isOpen, onClose, currentPage = "overview", onPageChange }: InteractiveSidebarProps) {
  const getActiveItem = () => {
    switch (currentPage) {
      case "overview": return "Overview";
      case "clients": return "Clients";
      default: return "Overview";
    }
  };
  
  const [activeItem, setActiveItem] = useState(getActiveItem());

  // Sync active item with current page
  useEffect(() => {
    const newActiveItem = currentPage === "overview" ? "Overview" : 
                          currentPage === "clients" ? "Clients" : "Overview";
    setActiveItem(newActiveItem);
  }, [currentPage]);

  return (
    <div className={`
      fixed lg:static inset-y-0 left-0 z-50 
      bg-white w-72 min-h-screen overflow-y-auto border-r border-[#f2f3f4]
      transform transition-transform duration-300 ease-in-out lg:flex-shrink-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Logo */}
      <div className="px-6 py-4 border-b border-[#f2f3f4]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img src={heartbeatLogo} alt="PulseFlow Logo" className="h-8 w-8" />
            <span className="text-2xl font-semibold text-[#191b1c]">PulseFlow</span>
          </div>
          {/* Close button for mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="py-6 space-y-6">
        {/* Portfolio Section */}
        <div>
          <div className="px-6 mb-2">
            <h3 className="text-xs font-medium text-[#959fa3] uppercase tracking-wide">
              PORTFOLIO
            </h3>
          </div>
          <div className="space-y-1">
            <SidebarItem
              icon={<Home className="h-5 w-5" />}
              label="Overview"
              isActive={activeItem === "Overview"}
              onClick={() => {
                setActiveItem("Overview");
                onPageChange?.("overview");
                onClose();
              }}
            />
            <SidebarItem
              icon={<span className="text-sm">👥</span>}
              label="Clients"
              isActive={activeItem === "Clients"}
              onClick={() => {
                setActiveItem("Clients");
                onPageChange?.("clients");
                onClose();
              }}
            />
            <SidebarItem
              icon={<BarChart3 className="h-5 w-5" />}
              label="Cross-Client Insights"
              hasSubmenu
              submenuItems={[
                { label: "Performance Metrics", icon: <Target className="h-4 w-4" /> },
                { label: "Comparative Analysis", icon: <GitCompare className="h-4 w-4" /> },
                { label: "Benchmarks", icon: <Trophy className="h-4 w-4" /> }
              ]}
            />
          </div>
        </div>

        {/* Analytics Section */}
        <div>
          <div className="px-6 mb-2">
            <h3 className="text-xs font-medium text-[#959fa3] uppercase tracking-wide">
              ANALYTICS
            </h3>
          </div>
          <div className="space-y-1">
            <SidebarItem
              icon={<Zap className="h-5 w-5" />}
              label="Lifecycle Analysis"
              hasSubmenu
              submenuItems={[
                { label: "Customer Journey", icon: <MapPin className="h-4 w-4" /> },
                { label: "Product Lifecycle", icon: <Zap className="h-4 w-4" /> },
                { label: "Retention Analysis", icon: <UserCheck className="h-4 w-4" /> }
              ]}
            />
            <SidebarItem
              icon={<BookOpen className="h-5 w-5" />}
              label="Benchmarking"
              hasSubmenu
              submenuItems={[
                { label: "Industry Standards", icon: <Trophy className="h-4 w-4" /> },
                { label: "Competitor Analysis", icon: <GitCompare className="h-4 w-4" /> },
                { label: "Performance Trends", icon: <LineChart className="h-4 w-4" /> }
              ]}
            />
          </div>
        </div>

        {/* Management Section */}
        <div>
          <div className="px-6 mb-2">
            <h3 className="text-xs font-medium text-[#959fa3] uppercase tracking-wide">
              MANAGEMENT
            </h3>
          </div>
          <div className="space-y-1">
            <SidebarItem
              icon={<span className="text-sm">👥</span>}
              label="Team Members"
              isActive={activeItem === "Team"}
              onClick={() => setActiveItem("Team")}
            />
            <SidebarItem
              icon={<Leaf className="h-5 w-5" />}
              label="Integrations"
              isActive={activeItem === "Integrations"}
              onClick={() => setActiveItem("Integrations")}
            />
            <SidebarItem
              icon={<FileText className="h-5 w-5" />}
              label="Reports Center"
              hasSubmenu
              submenuItems={[
                { label: "Monthly Reports", icon: <Calendar className="h-4 w-4" /> },
                { label: "Custom Reports", icon: <FileText className="h-4 w-4" /> },
                { label: "Scheduled Reports", icon: <Clock className="h-4 w-4" /> }
              ]}
            />
          </div>
        </div>

        {/* Admin Section */}
        <div>
          <div className="px-6 mb-2">
            <h3 className="text-xs font-medium text-[#959fa3] uppercase tracking-wide">
              ADMIN
            </h3>
          </div>
          <div className="space-y-1">
            <SidebarItem
              icon={<CreditCard className="h-5 w-5" />}
              label="Billing"
              isActive={activeItem === "Billing"}
              onClick={() => setActiveItem("Billing")}
            />
            <SidebarItem
              icon={<span className="text-sm">⚙️</span>}
              label="Settings"
              isActive={activeItem === "Settings"}
              onClick={() => setActiveItem("Settings")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}