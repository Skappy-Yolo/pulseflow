import { ArrowUpRight, ArrowDownRight, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Progress } from "../ui/progress";

export function DataAnalyticsPage() {
  const reconciliationData = [
    { department: "Marketing", hubspot: "5,234", salesforce: "5,234", analytics: "5,189", status: "warning", discrepancy: "45 records" },
    { department: "Sales", hubspot: "892", salesforce: "892", analytics: "892", status: "ok", discrepancy: "0 records" },
    { department: "Product", hubspot: "2,180", salesforce: "2,156", analytics: "2,180", status: "warning", discrepancy: "24 records" },
    { department: "CS", hubspot: "1,247", salesforce: "1,247", analytics: "1,247", status: "ok", discrepancy: "0 records" },
  ];

  const crossTeamProjects = [
    { name: "Q4 Campaign Launch", teams: ["Marketing", "Product"], progress: 87, status: "on-track", deadline: "Dec 31, 2024" },
    { name: "Sales Enablement Initiative", teams: ["Sales", "Marketing"], progress: 45, status: "at-risk", deadline: "Jan 15, 2025" },
    { name: "Customer Onboarding Redesign", teams: ["Product", "CS"], progress: 92, status: "on-track", deadline: "Dec 20, 2024" },
    { name: "Integration Hub Rollout", teams: ["Engineering", "Product"], progress: 68, status: "on-track", deadline: "Jan 30, 2025" },
  ];

  const attributionMetrics = [
    { channel: "Organic Search", leads: 1247, opportunities: 89, customers: 34, revenue: "$142K", conversionRate: "2.7%" },
    { channel: "Paid Social", leads: 892, opportunities: 67, customers: 28, revenue: "$118K", conversionRate: "3.1%" },
    { channel: "Email Marketing", leads: 2156, opportunities: 156, customers: 67, revenue: "$287K", conversionRate: "3.1%" },
    { channel: "Direct", leads: 445, opportunities: 34, customers: 19, revenue: "$89K", conversionRate: "4.3%" },
    { channel: "Referral", leads: 567, opportunities: 45, customers: 24, revenue: "$156K", conversionRate: "4.2%" },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#191b1c] mb-2">Data Analytics & Cross-Functional Insights</h1>
        <p className="text-sm text-[#626c70]">Unified view of metrics, attribution, and reconciliation across departments</p>
      </div>

      {/* Cross-Functional Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-[#626c70]">Total Funnel Entries</p>
            <ArrowUpRight className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-3xl font-semibold text-[#191b1c] mb-1">15,240</p>
          <p className="text-sm text-green-600">+12.4% vs last month</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-[#626c70]">Funnel Conversion Rate</p>
            <ArrowDownRight className="h-5 w-5 text-red-600" />
          </div>
          <p className="text-3xl font-semibold text-[#191b1c] mb-1">1.23%</p>
          <p className="text-sm text-red-600">-0.34% vs last month</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-[#626c70]">Data Quality Score</p>
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-3xl font-semibold text-[#191b1c] mb-1">96.2%</p>
          <p className="text-sm text-green-600">Excellent quality</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-[#626c70]">Cross-Team Projects</p>
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <p className="text-3xl font-semibold text-[#191b1c] mb-1">4</p>
          <p className="text-sm text-amber-600">1 at risk</p>
        </div>
      </div>

      {/* Attribution Analysis */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#191b1c] mb-4">Multi-Touch Attribution Analysis</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#626c70]">Channel</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#626c70]">Leads</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#626c70]">Opportunities</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#626c70]">Customers</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#626c70]">Revenue</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#626c70]">Conv. Rate</th>
              </tr>
            </thead>
            <tbody>
              {attributionMetrics.map((metric, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-[#191b1c]">{metric.channel}</td>
                  <td className="py-3 px-4 text-sm text-right text-[#626c70]">{metric.leads.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-right text-[#626c70]">{metric.opportunities}</td>
                  <td className="py-3 px-4 text-sm text-right text-[#626c70]">{metric.customers}</td>
                  <td className="py-3 px-4 text-sm text-right font-semibold text-[#191b1c]">{metric.revenue}</td>
                  <td className="py-3 px-4 text-sm text-right">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      {metric.conversionRate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Reconciliation Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#191b1c]">Department Data Reconciliation</h2>
          <button className="text-sm text-[#005CE8] hover:text-[#0e5fd9] font-medium">
            Run Full Sync
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#626c70]">Department</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#626c70]">HubSpot</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#626c70]">Salesforce</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#626c70]">Analytics</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#626c70]">Status</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#626c70]">Discrepancy</th>
              </tr>
            </thead>
            <tbody>
              {reconciliationData.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-[#191b1c]">{row.department}</td>
                  <td className="py-3 px-4 text-sm text-right text-[#626c70]">{row.hubspot}</td>
                  <td className="py-3 px-4 text-sm text-right text-[#626c70]">{row.salesforce}</td>
                  <td className="py-3 px-4 text-sm text-right text-[#626c70]">{row.analytics}</td>
                  <td className="py-3 px-4 text-right">
                    {row.status === "ok" ? (
                      <span className="inline-flex items-center gap-1 text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm">Synced</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Warning</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-right">
                    <span className={row.status === "ok" ? "text-green-600" : "text-amber-600"}>
                      {row.discrepancy}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Cross-Team Projects */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#191b1c] mb-4">Active Cross-Team Projects</h2>
        <div className="space-y-4">
          {crossTeamProjects.map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-[#191b1c] mb-1">{project.name}</h3>
                  <div className="flex items-center gap-2">
                    {project.teams.map((team, idx) => (
                      <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {team}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${project.status === "on-track" ? "text-green-600" : "text-red-600"}`}>
                    {project.status === "on-track" ? "On Track" : "At Risk"}
                  </div>
                  <div className="text-xs text-[#626c70] mt-1">Due: {project.deadline}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#626c70]">Progress</span>
                  <span className="font-medium text-[#191b1c]">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
