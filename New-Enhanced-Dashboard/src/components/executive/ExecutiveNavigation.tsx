import { useState } from "react";
import { Menu, Search, Bell, User, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface ExecutiveNavigationProps {
  onMenuClick: () => void;
  dashboardType: string;
  onDashboardTypeChange: (type: string) => void;
}

export function ExecutiveNavigation({ onMenuClick, dashboardType, onDashboardTypeChange }: ExecutiveNavigationProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const switchToConsultant = () => {
    navigate("/consultant");
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="flex h-16 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Search */}
        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="relative flex flex-1 max-w-2xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search metrics, reports, insights..."
              className="block w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#005CE8] focus:outline-none focus:ring-2 focus:ring-[#005CE8]/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications */}
          <button
            type="button"
            className="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="-m-1.5 flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#005CE8] to-[#0e5fd9] flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-sm font-semibold text-gray-900">Delphine C.</span>
                  <span className="text-xs text-gray-500">Chief Product Officer</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 hidden lg:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">Delphine C.</p>
                <p className="text-xs text-gray-500">delphine@company.com</p>
              </div>
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Team Management</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuItem onClick={switchToConsultant}>Switch to Consultant View</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}