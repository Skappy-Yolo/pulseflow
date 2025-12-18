import { useState } from "react";
import { FileText, Download, Send, Calendar, TrendingUp, Users, DollarSign, Eye, MoreVertical, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface Report {
  id: string;
  title: string;
  type: "executive-summary" | "board-deck" | "quarterly-review" | "department-snapshot" | "funnel-analysis";
  status: "draft" | "ready" | "sent";
  dateCreated: string;
  dateSent?: string;
  recipients?: string[];
  metrics: {
    revenue?: string;
    growth?: string;
    customers?: number;
    engagement?: string;
  };
  coverColor: string;
}

function ReportCard({ report }: { report: Report }) {
  const [showActions, setShowActions] = useState(false);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "executive-summary": return "Executive Summary";
      case "board-deck": return "Board Deck";
      case "quarterly-review": return "Quarterly Review";
      case "department-snapshot": return "Department Snapshot";
      case "funnel-analysis": return "Funnel Analysis";
      default: return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">📝 Draft</Badge>;
      case "ready":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">✅ Ready</Badge>;
      case "sent":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">📤 Sent</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Report Cover */}
      <div 
        className="h-32 relative overflow-hidden"
        style={{ background: report.coverColor }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30"></div>
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <div className="text-white">
            <p className="text-xs font-medium opacity-90">{getTypeLabel(report.type)}</p>
            <h3 className="font-semibold text-lg mt-1">{report.title}</h3>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
            >
              <MoreVertical className="h-4 w-4 text-white" />
            </button>
            {showActions && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-10">
                <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-2">
                  <Eye className="h-4 w-4" /> Preview
                </button>
                <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-2">
                  <Download className="h-4 w-4" /> Download
                </button>
                <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-2">
                  <Send className="h-4 w-4" /> Send
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          {getStatusBadge(report.status)}
          <span className="text-xs text-[#626c70]">
            <Calendar className="h-3 w-3 inline mr-1" />
            {report.dateCreated}
          </span>
        </div>

        {/* Key Metrics Preview */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {report.metrics.revenue && (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
              <p className="text-xs text-[#626c70] mb-1">Revenue</p>
              <p className="font-semibold text-[#191b1c]">{report.metrics.revenue}</p>
            </div>
          )}
          {report.metrics.growth && (
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
              <p className="text-xs text-[#626c70] mb-1">Growth</p>
              <p className="font-semibold text-green-700">{report.metrics.growth}</p>
            </div>
          )}
          {report.metrics.customers && (
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3">
              <p className="text-xs text-[#626c70] mb-1">Customers</p>
              <p className="font-semibold text-[#191b1c]">{report.metrics.customers.toLocaleString()}</p>
            </div>
          )}
          {report.metrics.engagement && (
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-3">
              <p className="text-xs text-[#626c70] mb-1">Engagement</p>
              <p className="font-semibold text-[#191b1c]">{report.metrics.engagement}</p>
            </div>
          )}
        </div>

        {/* Recipients */}
        {report.recipients && report.recipients.length > 0 && (
          <div className="border-t border-gray-100 pt-3">
            <p className="text-xs text-[#626c70] mb-2">Recipients ({report.recipients.length})</p>
            <div className="flex flex-wrap gap-1">
              {report.recipients.slice(0, 3).map((recipient, idx) => (
                <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {recipient}
                </span>
              ))}
              {report.recipients.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  +{report.recipients.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          {report.status === "draft" && (
            <Button size="sm" className="flex-1 bg-[#005CE8] hover:bg-[#0e5fd9]">
              <FileText className="h-4 w-4 mr-1" /> Continue Editing
            </Button>
          )}
          {report.status === "ready" && (
            <>
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="h-4 w-4 mr-1" /> Preview
              </Button>
              <Button size="sm" className="flex-1 bg-[#005CE8] hover:bg-[#0e5fd9]">
                <Send className="h-4 w-4 mr-1" /> Send
              </Button>
            </>
          )}
          {report.status === "sent" && (
            <>
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="h-4 w-4 mr-1" /> View
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ReportTemplate({ title, description, icon, color, onClick }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-left group"
    >
      <div 
        className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
        style={{ background: color }}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-[#191b1c] mb-2">{title}</h3>
      <p className="text-sm text-[#626c70]">{description}</p>
    </button>
  );
}

export function ReportsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "draft" | "ready" | "sent">("all");
  const [showTemplates, setShowTemplates] = useState(false);

  const reports: Report[] = [
    {
      id: "1",
      title: "December 2024 Executive Summary",
      type: "executive-summary",
      status: "sent",
      dateCreated: "Dec 15, 2024",
      dateSent: "Dec 16, 2024",
      recipients: ["board@enies.com", "investors@vc.com", "ceo@enies.com"],
      metrics: {
        revenue: "$2.4M",
        growth: "+18%",
        customers: 2180,
        engagement: "92%"
      },
      coverColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: "2",
      title: "Q4 2024 Board Deck",
      type: "board-deck",
      status: "ready",
      dateCreated: "Dec 10, 2024",
      recipients: ["board@enies.com"],
      metrics: {
        revenue: "$7.1M",
        growth: "+24%",
        customers: 8450
      },
      coverColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: "3",
      title: "Marketing Performance - November",
      type: "department-snapshot",
      status: "sent",
      dateCreated: "Nov 30, 2024",
      dateSent: "Dec 1, 2024",
      recipients: ["marketing@enies.com", "cmo@enies.com"],
      metrics: {
        growth: "+12%",
        customers: 850,
        engagement: "87%"
      },
      coverColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      id: "4",
      title: "Funnel Conversion Analysis",
      type: "funnel-analysis",
      status: "draft",
      dateCreated: "Dec 18, 2024",
      metrics: {
        revenue: "$1.2M",
        engagement: "76%"
      },
      coverColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
      id: "5",
      title: "Sales Department Overview",
      type: "department-snapshot",
      status: "ready",
      dateCreated: "Dec 12, 2024",
      recipients: ["sales@enies.com"],
      metrics: {
        revenue: "$890K",
        growth: "+8%",
        customers: 227
      },
      coverColor: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
      id: "6",
      title: "Q3 2024 Quarterly Review",
      type: "quarterly-review",
      status: "sent",
      dateCreated: "Sep 30, 2024",
      dateSent: "Oct 2, 2024",
      recipients: ["board@enies.com", "leadership@enies.com"],
      metrics: {
        revenue: "$6.8M",
        growth: "+21%",
        customers: 7890,
        engagement: "89%"
      },
      coverColor: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
    }
  ];

  const filteredReports = activeTab === "all" 
    ? reports 
    : reports.filter(r => r.status === activeTab);

  const statsData = {
    totalReports: reports.length,
    sentThisMonth: reports.filter(r => r.status === "sent" && r.dateCreated.includes("Dec")).length,
    readyToSend: reports.filter(r => r.status === "ready").length,
    drafts: reports.filter(r => r.status === "draft").length
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#191b1c] mb-2">Executive Reports</h1>
          <p className="text-sm text-[#626c70]">Generate, manage, and distribute executive reports and board decks</p>
        </div>
        <Button 
          onClick={() => setShowTemplates(!showTemplates)}
          className="bg-[#005CE8] hover:bg-[#0e5fd9]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Report
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-[#005CE8]" />
            <p className="text-sm text-[#626c70]">Total Reports</p>
          </div>
          <p className="text-2xl font-semibold text-[#191b1c]">{statsData.totalReports}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Send className="h-5 w-5 text-green-600" />
            <p className="text-sm text-[#626c70]">Sent This Month</p>
          </div>
          <p className="text-2xl font-semibold text-[#191b1c]">{statsData.sentThisMonth}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <p className="text-sm text-[#626c70]">Ready to Send</p>
          </div>
          <p className="text-2xl font-semibold text-[#191b1c]">{statsData.readyToSend}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-gray-600" />
            <p className="text-sm text-[#626c70]">Drafts</p>
          </div>
          <p className="text-2xl font-semibold text-[#191b1c]">{statsData.drafts}</p>
        </div>
      </div>

      {/* Templates Section */}
      {showTemplates && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#191b1c]">Choose a Report Template</h2>
            <button 
              onClick={() => setShowTemplates(false)}
              className="text-sm text-[#626c70] hover:text-[#191b1c]"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ReportTemplate
              title="Executive Summary"
              description="Monthly overview of key metrics and insights for leadership"
              icon={<FileText className="h-6 w-6 text-white" />}
              color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              onClick={() => alert("Creating Executive Summary...")}
            />
            <ReportTemplate
              title="Board Deck"
              description="Comprehensive quarterly presentation for board meetings"
              icon={<Users className="h-6 w-6 text-white" />}
              color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              onClick={() => alert("Creating Board Deck...")}
            />
            <ReportTemplate
              title="Department Snapshot"
              description="Detailed performance report for individual departments"
              icon={<TrendingUp className="h-6 w-6 text-white" />}
              color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              onClick={() => alert("Creating Department Snapshot...")}
            />
            <ReportTemplate
              title="Funnel Analysis"
              description="Deep dive into conversion rates and funnel performance"
              icon={<DollarSign className="h-6 w-6 text-white" />}
              color="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
              onClick={() => alert("Creating Funnel Analysis...")}
            />
            <ReportTemplate
              title="Quarterly Review"
              description="Complete business review covering all departments and KPIs"
              icon={<Calendar className="h-6 w-6 text-white" />}
              color="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
              onClick={() => alert("Creating Quarterly Review...")}
            />
            <ReportTemplate
              title="Custom Report"
              description="Build a custom report with your own sections and metrics"
              icon={<Plus className="h-6 w-6 text-white" />}
              color="linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
              onClick={() => alert("Creating Custom Report...")}
            />
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === "all"
              ? "bg-[#005CE8] text-white"
              : "bg-white text-[#626c70] border border-gray-200 hover:bg-gray-50"
          }`}
        >
          All Reports ({reports.length})
        </button>
        <button
          onClick={() => setActiveTab("draft")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === "draft"
              ? "bg-[#005CE8] text-white"
              : "bg-white text-[#626c70] border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Drafts ({statsData.drafts})
        </button>
        <button
          onClick={() => setActiveTab("ready")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === "ready"
              ? "bg-[#005CE8] text-white"
              : "bg-white text-[#626c70] border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Ready ({statsData.readyToSend})
        </button>
        <button
          onClick={() => setActiveTab("sent")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === "sent"
              ? "bg-[#005CE8] text-white"
              : "bg-white text-[#626c70] border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Sent ({reports.filter(r => r.status === "sent").length})
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-[#626c70] mb-2">No {activeTab !== "all" ? activeTab : ""} reports found</p>
          <p className="text-sm text-[#959fa3]">Create a new report to get started</p>
        </div>
      )}
    </div>
  );
}
