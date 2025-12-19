import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: NewTeamMember) => void;
}

export interface NewTeamMember {
  name: string;
  email: string;
  role: string;
  permissions: {
    lifecycleHealth: boolean;
    keyMetrics: boolean;
    attributionData: boolean;
    financialData: boolean;
    executiveSummary: boolean;
    boardReports: boolean;
    funnelOverview: boolean;
    conversionRates: boolean;
    dataQuality: boolean;
    bottlenecks: boolean;
  };
}

export function AddTeamMemberModal({ isOpen, onClose, onAdd }: AddTeamMemberModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState({
    lifecycleHealth: true,
    keyMetrics: true,
    attributionData: false,
    financialData: false,
    executiveSummary: false,
    boardReports: false,
    funnelOverview: true,
    conversionRates: true,
    dataQuality: false,
    bottlenecks: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && role) {
      onAdd({ name, email, role, permissions });
      // Reset form
      setName("");
      setEmail("");
      setRole("");
      setPermissions({
        lifecycleHealth: true,
        keyMetrics: true,
        attributionData: false,
        financialData: false,
        executiveSummary: false,
        boardReports: false,
        funnelOverview: true,
        conversionRates: true,
        dataQuality: false,
        bottlenecks: true,
      });
      onClose();
    }
  };

  const updatePermission = (key: keyof typeof permissions, value: boolean) => {
    setPermissions(prev => ({ ...prev, [key]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#191b1c]">Add New Team Member</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-[#191b1c]">Basic Information</h3>
            
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.smith@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="role">Role/Title *</Label>
              <Input
                id="role"
                type="text"
                placeholder="e.g., Head of Engineering"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="mt-1"
              />
            </div>
          </div>

          {/* Permissions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-[#191b1c]">Access Permissions</h3>
              <button
                type="button"
                onClick={() => {
                  const allTrue = Object.values(permissions).every(v => v);
                  const newValue = !allTrue;
                  setPermissions({
                    lifecycleHealth: newValue,
                    keyMetrics: newValue,
                    attributionData: newValue,
                    financialData: newValue,
                    executiveSummary: newValue,
                    boardReports: newValue,
                    funnelOverview: newValue,
                    conversionRates: newValue,
                    dataQuality: newValue,
                    bottlenecks: newValue,
                  });
                }}
                className="text-sm text-[#005CE8] hover:text-[#0e5fd9] font-medium"
              >
                {Object.values(permissions).every(v => v) ? "Deselect All" : "Select All"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#191b1c]">Lifecycle Health</span>
                <Switch checked={permissions.lifecycleHealth} onCheckedChange={(val) => updatePermission("lifecycleHealth", val)} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#191b1c]">Key Metrics</span>
                <Switch checked={permissions.keyMetrics} onCheckedChange={(val) => updatePermission("keyMetrics", val)} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#191b1c]">Attribution Data</span>
                <Switch checked={permissions.attributionData} onCheckedChange={(val) => updatePermission("attributionData", val)} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#191b1c]">Financial Data</span>
                <Switch checked={permissions.financialData} onCheckedChange={(val) => updatePermission("financialData", val)} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#191b1c]">Executive Summary</span>
                <Switch checked={permissions.executiveSummary} onCheckedChange={(val) => updatePermission("executiveSummary", val)} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#191b1c]">Board Reports</span>
                <Switch checked={permissions.boardReports} onCheckedChange={(val) => updatePermission("boardReports", val)} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#191b1c]">Funnel Overview</span>
                <Switch checked={permissions.funnelOverview} onCheckedChange={(val) => updatePermission("funnelOverview", val)} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#191b1c]">Conversion Rates</span>
                <Switch checked={permissions.conversionRates} onCheckedChange={(val) => updatePermission("conversionRates", val)} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#191b1c]">Data Quality</span>
                <Switch checked={permissions.dataQuality} onCheckedChange={(val) => updatePermission("dataQuality", val)} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#191b1c]">Bottlenecks</span>
                <Switch checked={permissions.bottlenecks} onCheckedChange={(val) => updatePermission("bottlenecks", val)} />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-[#005CE8] hover:bg-[#0e5fd9]">
              Send Invitation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
