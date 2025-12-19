import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Users, Settings, Bell, ChevronDown, X } from "lucide-react";

interface NewSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function NewSidebar({ isOpen, onClose, currentPage, onPageChange }: NewSidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const menuItems = [
    {
      id: "overview",
      label: "Dashboard",
      icon: Home,
      href: "#"
    },
    {
      id: "clients",
      label: "My Clients",
      icon: Users,
      href: "#"
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "#"
    }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-50">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">PulseFlow V2</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => onPageChange(item.id)}
                        className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full ${
                          currentPage === item.id
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                      >
                        <item.icon className="h-6 w-6 shrink-0" />
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <div className="relative z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/80"
              onClick={onClose}
            />

            <div className="fixed inset-0 flex">
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "tween", duration: 0.3 }}
                className="relative mr-16 flex w-full max-w-xs flex-1"
              >
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">P</span>
                      </div>
                      <h1 className="text-xl font-semibold text-gray-900">PulseFlow V2</h1>
                    </div>
                    <button
                      onClick={onClose}
                      className="h-6 w-6 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {menuItems.map((item) => (
                            <li key={item.id}>
                              <button
                                onClick={() => {
                                  onPageChange(item.id);
                                  onClose();
                                }}
                                className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full ${
                                  currentPage === item.id
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                }`}
                              >
                                <item.icon className="h-6 w-6 shrink-0" />
                                {item.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}