import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface IntegrationCardProps {
  name: string;
  description: string;
  icon: string;
  status: "connected" | "not-connected";
  lastSync?: string;
  records?: string;
  syncFrequency?: string;
  requiredFor?: string;
}

function IntegrationCard({ name, description, icon, status, lastSync, records, syncFrequency, requiredFor }: IntegrationCardProps) {
  const isConnected = status === "connected";
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-2xl">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-[#191b1c]">{name}</h3>
            <p className="text-sm text-[#626c70]">{description}</p>
          </div>
        </div>
        <Badge variant={isConnected ? "default" : "secondary"} className={isConnected ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-red-100 text-red-700 hover:bg-red-100"}>
          {isConnected ? "Connected" : "Not Connected"}
        </Badge>
      </div>

      {isConnected ? (
        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            {lastSync && (
              <div>
                <span className="text-[#626c70]">Last sync:</span>
                <p className="font-medium text-[#191b1c]">{lastSync}</p>
              </div>
            )}
            {records && (
              <div>
                <span className="text-[#626c70]">Records:</span>
                <p className="font-medium text-[#191b1c]">{records}</p>
              </div>
            )}
            {syncFrequency && (
              <div>
                <span className="text-[#626c70]">Sync frequency:</span>
                <p className="font-medium text-[#191b1c]">{syncFrequency}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mb-4">
          {requiredFor && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
              <p className="text-[#626c70]">Status:</p>
              <p className="font-medium text-amber-700">{requiredFor}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2">
        {isConnected ? (
          <>
            <Button variant="outline" size="sm" className="flex-1">
              Configure
            </Button>
            <Button variant="default" size="sm" className="flex-1 bg-[#005CE8] hover:bg-[#0e5fd9]">
              Sync Now
            </Button>
          </>
        ) : (
          <Button variant="default" size="sm" className="flex-1 bg-[#005CE8] hover:bg-[#0e5fd9]">
            Connect
          </Button>
        )}
      </div>
    </div>
  );
}

export function IntegrationsPage() {
  const integrations = [
    {
      name: "HubSpot",
      description: "Marketing Hub",
      icon: "🧡",
      status: "connected" as const,
      lastSync: "5 minutes ago",
      records: "5,234 contacts",
      syncFrequency: "Every hour",
    },
    {
      name: "Salesforce",
      description: "Sales CRM",
      icon: "☁️",
      status: "connected" as const,
      lastSync: "12 minutes ago",
      records: "892 opportunities",
      syncFrequency: "Every hour",
    },
    {
      name: "Mixpanel",
      description: "Product Analytics",
      icon: "📊",
      status: "not-connected" as const,
      requiredFor: "Not configured",
    },
    {
      name: "Zendesk",
      description: "Customer Support",
      icon: "🎧",
      status: "not-connected" as const,
      requiredFor: "Not configured",
    },
    {
      name: "Google Analytics",
      description: "Web Analytics",
      icon: "📈",
      status: "connected" as const,
      lastSync: "8 minutes ago",
      records: "145K sessions",
      syncFrequency: "Real-time",
    },
    {
      name: "Stripe",
      description: "Payment Processing",
      icon: "💳",
      status: "connected" as const,
      lastSync: "3 minutes ago",
      records: "1,247 transactions",
      syncFrequency: "Every 30 min",
    },
  ];

  const connectedCount = integrations.filter(i => i.status === "connected").length;
  const totalRecords = "12.3M";
  const uptime = "99.8%";
  const lastSync = "5m ago";

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#191b1c]">Integrations</h1>
          <p className="text-sm text-[#626c70] mt-1">Manage your data sources and connections</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Test All Connections
          </Button>
          <Button variant="default" size="sm" className="bg-[#005CE8] hover:bg-[#0e5fd9]">
            Add Integration
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-[#626c70] mb-1">Active Integrations</p>
          <p className="text-3xl font-semibold text-[#191b1c]">{connectedCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-[#626c70] mb-1">Records Synced</p>
          <p className="text-3xl font-semibold text-[#191b1c]">{totalRecords}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-[#626c70] mb-1">Uptime (30d)</p>
          <p className="text-3xl font-semibold text-[#0faf62]">{uptime}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-[#626c70] mb-1">Last Sync</p>
          <p className="text-3xl font-semibold text-[#191b1c]">{lastSync}</p>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <IntegrationCard key={integration.name} {...integration} />
        ))}
      </div>
    </div>
  );
}
