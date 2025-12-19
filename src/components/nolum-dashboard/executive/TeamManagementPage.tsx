import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AddTeamMemberModal, type NewTeamMember } from "./AddTeamMemberModal";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending" | "inactive";
  lastLogin: string;
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

function PermissionToggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-[#191b1c]">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const [permissions, setPermissions] = useState(member.permissions);
  const [expanded, setExpanded] = useState(false);

  const updatePermission = (key: keyof typeof permissions, value: boolean) => {
    setPermissions(prev => ({ ...prev, [key]: value }));
  };

  const handleEditPermissions = () => {
    setExpanded(true); // Always open, never toggle
  };

  const activePermissionsCount = Object.values(permissions).filter(Boolean).length;
  const totalPermissions = Object.keys(permissions).length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-[#191b1c] mb-1">{member.name}</h3>
            <p className="text-sm text-[#626c70] mb-2">{member.email} | {member.role}</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#005CE8] bg-blue-50 px-3 py-1 rounded-full">
                Access to {activePermissionsCount} out of {totalPermissions} sections
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {member.status === "active" && (
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                ✅ Active
              </Badge>
            )}
            {member.status === "pending" && (
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                ⚠️ Pending invitation
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#626c70]">
            Last login: {member.lastLogin}
          </p>
          <Button 
            onClick={handleEditPermissions}
            variant="outline" 
            size="sm"
            className="text-[#005CE8] border-[#005CE8] hover:bg-blue-50"
          >
            Edit Permissions
          </Button>
        </div>
      </div>

      {/* Permissions Section */}
      <div className={`${member.status === "pending" ? "bg-amber-50" : ""}`}>
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-6 py-3 flex items-center justify-between font-medium text-sm text-[#191b1c] hover:bg-gray-50 transition-colors"
        >
          <span>{member.status === "pending" ? "Configured Access Permissions (When Activated)" : "Current Access Permissions"}</span>
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        
        {expanded && (
          <div className="px-6 pb-6 space-y-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
              <PermissionToggle
                label="Lifecycle Health"
                checked={permissions.lifecycleHealth}
                onChange={(val) => updatePermission("lifecycleHealth", val)}
              />
              <PermissionToggle
                label="Key Metrics"
                checked={permissions.keyMetrics}
                onChange={(val) => updatePermission("keyMetrics", val)}
              />
              <PermissionToggle
                label="Attribution Data"
                checked={permissions.attributionData}
                onChange={(val) => updatePermission("attributionData", val)}
              />
              <PermissionToggle
                label="Financial Data"
                checked={permissions.financialData}
                onChange={(val) => updatePermission("financialData", val)}
              />
              <PermissionToggle
                label="Executive Summary"
                checked={permissions.executiveSummary}
                onChange={(val) => updatePermission("executiveSummary", val)}
              />
              <PermissionToggle
                label="Board Reports"
                checked={permissions.boardReports}
                onChange={(val) => updatePermission("boardReports", val)}
              />
              <PermissionToggle
                label="Funnel Overview"
                checked={permissions.funnelOverview}
                onChange={(val) => updatePermission("funnelOverview", val)}
              />
              <PermissionToggle
                label="Conversion Rates"
                checked={permissions.conversionRates}
                onChange={(val) => updatePermission("conversionRates", val)}
              />
              <PermissionToggle
                label="Data Quality"
                checked={permissions.dataQuality}
                onChange={(val) => updatePermission("dataQuality", val)}
              />
              <PermissionToggle
                label="Bottlenecks"
                checked={permissions.bottlenecks}
                onChange={(val) => updatePermission("bottlenecks", val)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 flex gap-2">
        {member.status === "pending" ? (
          <>
            <Button variant="outline" size="sm" className="flex-1">
              Resend Invite
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700">
              Cancel Invite
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="sm" className="flex-1">
              Edit Permissions
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700">
              Revoke Access
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export function TeamManagementPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Sarah Martinez",
      email: "sarah.martinez@enies.com",
      role: "Head of Marketing",
      status: "active",
      lastLogin: "2 hours ago",
      permissions: {
        lifecycleHealth: true,
        keyMetrics: true,
        attributionData: true,
        financialData: false,
        executiveSummary: false,
        boardReports: false,
        funnelOverview: true,
        conversionRates: true,
        dataQuality: true,
        bottlenecks: true,
      },
    },
    {
      id: "2",
      name: "Michael Johnson",
      email: "mike.johnson@enies.com",
      role: "Head of Sales",
      status: "active",
      lastLogin: "45 minutes ago",
      permissions: {
        lifecycleHealth: true,
        keyMetrics: true,
        attributionData: false,
        financialData: true,
        executiveSummary: false,
        boardReports: false,
        funnelOverview: true,
        conversionRates: true,
        dataQuality: false,
        bottlenecks: true,
      },
    },
    {
      id: "3",
      name: "Alex Thompson",
      email: "alex.thompson@enies.com",
      role: "Head of Product",
      status: "pending",
      lastLogin: "Invited 2 days ago",
      permissions: {
        lifecycleHealth: true,
        keyMetrics: true,
        attributionData: true,
        financialData: false,
        executiveSummary: false,
        boardReports: false,
        funnelOverview: true,
        conversionRates: true,
        dataQuality: true,
        bottlenecks: true,
      },
    },
  ]);

  const handleAddMember = (newMember: NewTeamMember) => {
    const teamMember: TeamMember = {
      id: String(teamMembers.length + 1),
      ...newMember,
      status: "pending",
      lastLogin: "Invited just now",
    };
    setTeamMembers([...teamMembers, teamMember]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-[#191b1c] text-white py-3 px-6">
        <p className="text-sm text-center">Configure department head permissions</p>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#005CE8]">Team Member Access Control</h1>
            <p className="text-sm text-[#626c70] mt-1">Manage permissions for department heads and key stakeholders</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="bg-[#005CE8] hover:bg-[#0e5fd9]">
            + Add Team Member
          </Button>
        </div>

        {/* Team Members List */}
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      {/* Add Member Modal */}
      <AddTeamMemberModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddMember}
      />
    </div>
  );
}