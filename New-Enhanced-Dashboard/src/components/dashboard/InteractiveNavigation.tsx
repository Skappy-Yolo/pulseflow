import { useState } from "react";
import { Menu, Search, Bell, Settings, User, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { NotificationPanel } from "./NotificationPanel";

interface InteractiveNavigationProps {
  onMenuClick: () => void;
}

export function InteractiveNavigation({ onMenuClick }: InteractiveNavigationProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const switchToExecutive = () => {
    navigate("/executive");
  };

  return (
    <>
      <header className="fixed top-0 right-0 left-0 lg:left-[280px] z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex h-16 lg:h-20 items-center justify-between px-4 md:px-6 lg:px-8">
          {/* Left side */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>

            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search clients, projects..."
                className="w-64 lg:w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#005CE8] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile search */}
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="h-5 w-5 text-gray-600" />
            </button>

            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            {/* Settings */}
            <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#005CE8] to-[#0e5fd9] flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="hidden lg:flex flex-col items-start">
                    <span className="text-sm font-semibold text-gray-900">Consuela N.</span>
                    <span className="text-xs text-gray-500">Portfolio Manager</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 hidden lg:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">Consuela N.</p>
                  <p className="text-xs text-gray-500">consuela@nolum.com</p>
                </div>
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
                <DropdownMenuItem onClick={switchToExecutive}>Switch to Executive View</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
}