import { useState } from "react";
import { Menu, Search, Bell, Settings, User, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface NewNavigationProps {
  onMenuClick: () => void;
  dashboardType: string;
  onDashboardTypeChange: (type: string) => void;
}

export function NewNavigation({ onMenuClick, dashboardType, onDashboardTypeChange }: NewNavigationProps) {
  const [searchQuery, setSearchQuery] = useState("");

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

        {/* Dashboard Version Switcher */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 hidden sm:block">Dashboard:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                {dashboardType === "v1" ? "Original" : "Version 2"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem 
                onClick={() => onDashboardTypeChange("v1")}
                className={dashboardType === "v1" ? "bg-blue-50" : ""}
              >
                <div>
                  <div className="font-medium">Original Dashboard</div>
                  <div className="text-sm text-gray-600">Your current production dashboard</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDashboardTypeChange("v2")}
                className={dashboardType === "v2" ? "bg-blue-50" : ""}
              >
                <div>
                  <div className="font-medium">Version 2</div>
                  <div className="text-sm text-gray-600">New dashboard with improved UX</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-300 hidden sm:block" />

        {/* Search */}
        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="relative flex flex-1 max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search clients, projects..."
              className="block w-full rounded-md border-0 bg-gray-50 py-1.5 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-600 sm:text-sm"
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
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <Bell className="h-6 w-6" />
          </button>

          {/* Settings */}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <Settings className="h-6 w-6" />
          </button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="-m-1.5 flex items-center p-1.5 hover:bg-gray-50 rounded-lg"
              >
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-sm font-semibold text-gray-900 hidden lg:block">
                  Consuela N.
                </span>
                <ChevronDown className="ml-2 h-4 w-4 text-gray-400 hidden lg:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}