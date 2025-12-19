import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  Users,
  TrendingDown,
  TrendingUp,
  Minus,
  Plus,
  MessageSquare,
  Mail,
  Download,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { motion } from "motion/react";
import { TrendAnalysisChart } from "./TrendAnalysisChart";

interface ClientDetailsPageProps {
  clientId: string;
  onBack: () => void;
}

export function ClientDetailsPage({
  clientId: propClientId,
  onBack,
}: ClientDetailsPageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { clientId: routeClientId } = useParams<{ clientId: string }>();
  
  // Use route param if available, otherwise use prop
  const clientId = routeClientId || propClientId;

  // Mock data mapping - in real app, fetch based on clientId
  const getClientDetails = (id: string) => {
    const clientMap: { [key: string]: any } = {
      "1": {
        id: "enies",
        name: "ENIES",
        category: "Financial Technology",
        users: "33,471 Users",
        mrr: "MRR: €890K",
        clientSince: "Client since January 2025",
        primaryContact: "Jane Smith (Chief Product Officer)",
        currentHealth: 45,
        healthTrend: "down",
        healthTrendValue: "15% from last month",
        healthColor: "text-[#FF272D]",
      },
      "2": {
        id: "bunqqi",
        name: "Bunqqi",
        category: "FinTech",
        users: "2,904 Users",
        mrr: "MRR: €87K",
        clientSince: "Client since March 2024",
        primaryContact: "Sarah Johnson (CTO)",
        currentHealth: 94,
        healthTrend: "up",
        healthTrendValue: "7% from last month",
        healthColor: "text-[#00AA60]",
      },
      "3": {
        id: "tripids",
        name: "Tripids",
        category: "E-Commerce",
        users: "11,182 Users",
        mrr: "MRR: €940K",
        clientSince: "Client since January 2025",
        primaryContact: "Jane Smith (Chief Product Officer)",
        currentHealth: 78,
        healthTrend: "stable",
        healthTrendValue: "0% from last month",
        healthColor: "text-[#FF8E00]",
      },
    };

    return clientMap[id] || clientMap["3"]; // Default to Tripids
  };

  const clientDetails = {
    ...getClientDetails(clientId),
    teamMembers: [
      {
        id: 1,
        name: "Consuela Nicula",
        role: "Lead PM",
        avatar: "👤",
        status: "online",
        statusColor: "bg-[#00AA60]",
      },
      {
        id: 2,
        name: "Emmanuel Okanlawon",
        role: "Product Manager",
        avatar: "👤",
        status: "offline",
        statusColor: "bg-[#ACACAC]",
        lastSeen: "Last Seen 24 hr ago",
      },
    ],
    recentActivity: [
      {
        id: 1,
        type: "issue",
        title: "Conversion drop identified in Sales stage",
        author: "Consuela Nicula",
        timestamp: "2 hours ago",
        color: "bg-[#007AF9]",
      },
      {
        id: 2,
        type: "report",
        title: "Weekly report delivered to Tripids CPO",
        author: "System",
        timestamp: "Yesterday at 9:00 AM",
        color: "bg-[#007AF9]",
      },
      {
        id: 3,
        type: "alert",
        title: "Support tickets spike detected - investigating",
        author: "Emmanuel Okanlawon",
        timestamp: "3 days ago",
        color: "bg-[#007AF9]",
      },
    ],
  };

  const getTrendIcon = () => {
    if (clientDetails.healthTrend === "up")
      return <TrendingUp className="h-5 w-5 text-[#00AA60]" />;
    if (clientDetails.healthTrend === "down")
      return (
        <TrendingDown className="h-5 w-5 text-[#E84646]" />
      );
    return <Minus className="h-5 w-5 text-[#FF8E00]" />;
  };

  const getTrendColor = () => {
    if (clientDetails.healthTrend === "up")
      return "text-[#00AA60]";
    if (clientDetails.healthTrend === "down")
      return "text-[#E84646]";
    return "text-[#FF8E00]";
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-[#626C70] mb-2">
          <button
            onClick={onBack}
            className="hover:text-[#191B1C] transition-colors"
          >
            Home
          </button>
          <span>›</span>
          <button
            onClick={onBack}
            className="hover:text-[#191B1C] transition-colors"
          >
            Clients
          </button>
          <span>›</span>
          <span className="text-[#191B1C]">
            {clientDetails.name}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold text-[#191B1C]">
            Client Details
          </h1>
          <Button className="bg-[#005CE8] hover:bg-[#0046B8] text-white rounded-full px-6">
            Export Report
          </Button>
        </div>
      </div>

      {/* Client Header Card */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E5E7E8] p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left Section - Client Info */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-11 bg-[#F0F6FF] rounded-full flex items-center justify-center">
              <span className="text-base font-medium text-[#FFBF00]">
                Logo
              </span>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-[#191B1C] mb-2">
                {clientDetails.name}
              </h2>
              <p className="text-[#626C70] mb-2">
                {clientDetails.category}
              </p>

              <div className="flex items-center gap-4 text-sm">
                <span className="text-[#57A7E9]">
                  {clientDetails.users}
                </span>
                <span className="w-1 h-1 bg-black rounded-full" />
                <span className="text-[#626C70]">
                  {clientDetails.mrr}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2 text-[#626C70]">
                <Calendar className="h-4 w-4" />
                <span>{clientDetails.clientSince}</span>
              </div>

              <div className="flex items-center gap-2 mt-1 text-[#191B1C]">
                <Users className="h-4 w-4" />
                <span>
                  Primary: {clientDetails.primaryContact}
                </span>
              </div>
            </div>
          </div>

          {/* Right Section - Health Score */}
          <div className="text-center lg:text-right">
            <p className="text-lg text-[#626C70] mb-2">
              Current Health
            </p>
            <div
              className={`text-6xl font-medium mb-2 ${clientDetails.healthColor || "text-[#FFBF00]"}`}
            >
              {clientDetails.currentHealth}%
            </div>
            <div className="flex items-center justify-center lg:justify-end gap-2 mb-4">
              {getTrendIcon()}
              <span className={`text-sm ${getTrendColor()}`}>
                {clientDetails.healthTrendValue}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation - Bigger Container */}
      <div className="bg-white rounded-lg border border-[#E5E7E8] shadow-sm p-6 mb-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-3xl grid-cols-4 bg-[#F8F9FA] border border-[#E5E7E8] p-1 rounded-lg">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-[#005CE8] data-[state=active]:text-[#005CE8] data-[state=active]:shadow-sm rounded-md transition-all duration-200"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="lifecycle"
              className="data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-[#005CE8] data-[state=active]:text-[#005CE8] data-[state=active]:shadow-sm rounded-md transition-all duration-200"
            >
              Lifecycle Analysis
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              className="data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-[#005CE8] data-[state=active]:text-[#005CE8] data-[state=active]:shadow-sm rounded-md transition-all duration-200"
            >
              Alerts
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-[#005CE8] data-[state=active]:text-[#005CE8] data-[state=active]:shadow-sm rounded-md transition-all duration-200"
            >
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Assigned Team Members */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-medium text-[#191B1C]">
                    Assigned Team Members
                  </h3>
                </div>

                <div className="space-y-4">
                  {clientDetails.teamMembers.map((member: any) => (
                    <div
                      key={member.id}
                      className="bg-white border border-[#E5E7E8] rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FFBF66] rounded-full flex items-center justify-center border-2 border-white">
                          {member.avatar}
                        </div>
                        <div>
                          <h4 className="font-medium text-[#191B1C]">
                            {member.name}
                          </h4>
                          <p className="text-sm text-[#626C70]">
                            {member.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {member.status === "online" ? (
                          <div className="bg-[#F0F6FF] rounded-full px-3 py-1">
                            <span className="text-sm font-medium text-[#00AA60]">
                              Online
                            </span>
                          </div>
                        ) : (
                          <div className="bg-[#F0F6FF] rounded-full px-3 py-1">
                            <span className="text-sm font-medium text-[#ACACAC]">
                              {member.lastSeen}
                            </span>
                          </div>
                        )}

                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Team Member Button */}
                  <div className="bg-white border border-dashed border-[#E5E7E8] rounded-lg p-4 text-center hover:border-[#005CE8] hover:bg-[#F0F6FF] transition-all cursor-pointer">
                    <div className="flex items-center justify-center gap-2 text-[#626C70]">
                      <Plus className="h-5 w-5" />
                      <span className="font-medium">
                        Assign Team Member
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity & Notes */}
              <div>
                <h3 className="text-xl font-medium text-[#191B1C] mb-4">
                  Recent Activity & Notes
                </h3>

                <div className="bg-white border border-[#E5E7E8] rounded-lg p-6">
                  <div className="space-y-6">
                    {clientDetails.recentActivity.map(
                      (activity: any, index: number) => (
                        <div
                          key={activity.id}
                          className="flex gap-4"
                        >
                          {/* Timeline indicator */}
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-3 h-3 ${activity.color} rounded-full border-2 border-white`}
                            />
                            {index <
                              clientDetails.recentActivity
                                .length -
                                1 && (
                              <div className="w-px h-12 bg-[#0083FF] opacity-20 mt-2" />
                            )}
                          </div>

                          {/* Activity content */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-[#191B1C] mb-1">
                              {activity.title}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-[#626C70]">
                              <span>{activity.author}</span>
                              <span className="w-1 h-1 bg-[#E5E7E8] rounded-full" />
                              <span>{activity.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lifecycle" className="mt-6">
            {/* Weekly Product Flow */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-[#191B1C] mb-6">
                Weekly Product Flow
              </h3>

              {/* Single Row Pipeline with Proper Arrows */}
              <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto min-w-0">
                {/* Marketing Stage */}
                <div className="bg-white border border-[#E5E7E8] rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow flex-shrink-0 w-56">
                  <div className="text-center mb-3">
                    <div className="w-10 h-10 bg-[#FF9500] rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white text-sm">
                        📢
                      </span>
                    </div>
                    <h4 className="text-[#626C70] text-sm mb-1">
                      MARKETING
                    </h4>
                    <div className="text-xl font-bold text-[#191B1C] mb-2">
                      500
                    </div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded p-2 opacity-70">
                    <div className="flex items-center justify-center gap-2 text-xs">
                      <TrendingDown className="h-3 w-3 text-[#E84646]" />
                      <span className="text-[#E84646] font-medium">
                        6.7% Decrease
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 mx-2">
                  <div className="flex items-center">
                    <div className="w-8 h-px bg-[#C0C2C3]" />
                    <div className="w-0 h-0 border-l-4 border-l-[#C0C2C3] border-y-2 border-y-transparent" />
                  </div>
                </div>

                {/* Sales Stage */}
                <div className="bg-white border border-[#E5E7E8] rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow flex-shrink-0 w-56">
                  <div className="text-center mb-3">
                    <div className="w-10 h-10 bg-[#007AF9] rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white text-sm">
                        💼
                      </span>
                    </div>
                    <h4 className="text-[#626C70] text-sm mb-1">
                      SALES
                    </h4>
                    <div className="text-xl font-bold text-[#191B1C] mb-2">
                      75
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded p-2 opacity-70">
                    <div className="flex items-center justify-center gap-2 text-xs">
                      <TrendingUp className="h-3 w-3 text-[#00AA60]" />
                      <span className="text-[#00AA60] font-medium">
                        60%→Product
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 mx-2">
                  <div className="flex items-center">
                    <div className="w-8 h-px bg-[#C0C2C3]" />
                    <div className="w-0 h-0 border-l-4 border-l-[#C0C2C3] border-y-2 border-y-transparent" />
                  </div>
                </div>

                {/* Product Stage */}
                <div className="bg-white border border-[#E5E7E8] rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow flex-shrink-0 w-56">
                  <div className="text-center mb-3">
                    <div className="w-10 h-10 bg-[#00AA60] rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white text-sm">
                        🎯
                      </span>
                    </div>
                    <h4 className="text-[#626C70] text-sm mb-1">
                      PRODUCT
                    </h4>
                    <div className="text-xl font-bold text-[#191B1C] mb-2">
                      45
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded p-2 opacity-70">
                    <div className="flex items-center justify-center gap-2 text-xs">
                      <TrendingUp className="h-3 w-3 text-[#00AA60]" />
                      <span className="text-[#00AA60] font-medium">
                        89%→Retention
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 mx-2">
                  <div className="flex items-center">
                    <div className="w-8 h-px bg-[#C0C2C3]" />
                    <div className="w-0 h-0 border-l-4 border-l-[#C0C2C3] border-y-2 border-y-transparent" />
                  </div>
                </div>

                {/* Support Stage */}
                <div className="bg-white border border-[#E5E7E8] rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow flex-shrink-0 w-56">
                  <div className="text-center mb-3">
                    <div className="w-10 h-10 bg-[#FF8E00] rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white text-sm">
                        🛠️
                      </span>
                    </div>
                    <h4 className="text-[#626C70] text-sm mb-1">
                      SUPPORT
                    </h4>
                    <div className="text-xl font-bold text-[#191B1C] mb-2">
                      40
                    </div>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded p-2 opacity-70">
                    <div className="flex items-center justify-center gap-2 text-xs">
                      <Minus className="h-3 w-3 text-[#FF8E00]" />
                      <span className="text-[#FF8E00] font-medium">
                        81%→Satisfaction
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lifecycle Health Scores */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-[#191B1C]">
                  Lifecycle Health Scores
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#00AA60] rounded-full" />
                    <span className="text-[#191B1C]">
                      Current
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#C0C2C3] rounded-full" />
                    <span className="text-[#191B1C]">
                      Target
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#E5E7E8] rounded-lg p-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {[
                    {
                      name: "Awareness",
                      current: 85,
                      target: 90,
                    },
                    {
                      name: "Acquisition",
                      current: 72,
                      target: 80,
                    },
                    {
                      name: "Activation",
                      current: 65,
                      target: 75,
                    },
                    {
                      name: "Retention",
                      current: 78,
                      target: 85,
                    },
                    {
                      name: "Revenue",
                      current: 88,
                      target: 95,
                    },
                  ].map((stage) => (
                    <div
                      key={stage.name}
                      className="text-center"
                    >
                      <div className="mb-4">
                        <div className="relative h-32 w-8 mx-auto bg-[#F5F6F7] rounded">
                          <div
                            className="absolute bottom-0 w-full bg-[#00AA60] rounded transition-all duration-500"
                            style={{
                              height: `${stage.current}%`,
                            }}
                          />
                          <div
                            className="absolute w-full border-t-2 border-dashed border-[#C0C2C3] flex items-center justify-center"
                            style={{
                              bottom: `${stage.target}%`,
                            }}
                          >
                            <span className="absolute -right-6 text-xs text-[#626C70] bg-white px-1">
                              {stage.target}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-[#191B1C] font-medium">
                        {stage.name}
                      </div>
                      <div className="text-sm text-[#626C70]">
                        {stage.current}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trend Analysis Chart - Using Figma Design */}
            <TrendAnalysisChart />
          </TabsContent>

          <TabsContent value="alerts" className="mt-6">
            {/* Critical Alerts Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-medium text-[#191B1C] mb-2">
                  Critical Alerts
                </h2>
                <p className="text-[#626C70]">
                  Monitor key performance indicators and system
                  health
                </p>
              </div>

              {/* Alert Status Summary */}
              <div className="flex items-center gap-4">
                <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-4 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse"></div>
                  <span className="text-sm font-medium text-[#DC2626]">
                    2 Critical
                  </span>
                </div>
                <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-lg px-4 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div>
                  <span className="text-sm font-medium text-[#D97706]">
                    1 Warning
                  </span>
                </div>
                <div className="bg-[#DBEAFE] border border-[#BFDBFE] rounded-lg px-4 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#3B82F6]"></div>
                  <span className="text-sm font-medium text-[#1D4ED8]">
                    1 Info
                  </span>
                </div>
              </div>
            </div>

            {/* Alert Grid - Mixed Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* High Impact Alert - Large Card */}
              <motion.div
                className="lg:col-span-2 bg-gradient-to-r from-[#FEF2F2] to-[#FEE2E2] border border-[#FECACA] rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#DC2626] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <TrendingDown className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#DC2626] text-white text-xs font-medium px-2 py-1 rounded-full">
                          CRITICAL
                        </span>
                        <span className="text-xs text-[#6B7280]">
                          2 hours ago
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-[#191B1C] mb-2 group-hover:text-[#DC2626] transition-colors">
                        Marketing to Sales Conversion Dropped
                        15%
                      </h3>
                      <p className="text-[#4B5563] mb-4">
                        Lead quality has decreased significantly
                        from recent campaigns. This requires
                        immediate attention from the marketing
                        team.
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          className="bg-[#DC2626] hover:bg-[#B91C1C] text-white"
                        >
                          Take Action
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Impact Visualization */}
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#DC2626] mb-1">
                      -15%
                    </div>
                    <div className="text-sm text-[#6B7280]">
                      vs. last month
                    </div>
                    <div className="mt-4 bg-white rounded-lg p-3 border border-[#E5E7EB]">
                      <div className="text-xs text-[#6B7280] mb-1">
                        Recommendation
                      </div>
                      <div className="text-sm font-medium text-[#059669]">
                        Review targeting criteria with marketing
                        team
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Support Ticket Volume - Medium Card */}
              <motion.div
                className="bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] border border-[#FDE68A] rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#F59E0B] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#F59E0B] text-white text-xs font-medium px-2 py-1 rounded-full">
                        WARNING
                      </span>
                    </div>
                    <h4 className="font-semibold text-[#191B1C] mb-1 group-hover:text-[#D97706] transition-colors">
                      Support Ticket Volume Up 40%
                    </h4>
                    <p className="text-sm text-[#6B7280] mb-3">
                      Issues with latest product release
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-white rounded-lg p-3 border border-[#E5E7EB] mb-4">
                  <div className="text-2xl font-bold text-[#F59E0B]">
                    247
                  </div>
                  <div className="text-xs text-[#6B7280]">
                    Open tickets
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  View Tickets
                </Button>
              </motion.div>

              {/* Resolution Time - Medium Card */}
              <motion.div
                className="bg-gradient-to-br from-[#FFFBEB] to-[#FED7AA] border border-[#FDBA74] rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#EA580C] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#EA580C] text-white text-xs font-medium px-2 py-1 rounded-full">
                        WARNING
                      </span>
                    </div>
                    <h4 className="font-semibold text-[#191B1C] mb-1 group-hover:text-[#EA580C] transition-colors">
                      Resolution Time Above Target
                    </h4>
                    <p className="text-sm text-[#6B7280] mb-3">
                      Support team needs assistance
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-white rounded-lg p-3 border border-[#E5E7EB] mb-4">
                  <div className="text-2xl font-bold text-[#EA580C]">
                    4.2h
                  </div>
                  <div className="text-xs text-[#6B7280]">
                    Average resolution
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Analyze Issues
                </Button>
              </motion.div>
            </div>

            {/* Positive Alert - Special Card */}
            <motion.div
              className="bg-gradient-to-r from-[#DBEAFE] to-[#BFDBFE] border border-[#93C5FD] rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2563EB] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#2563EB] text-white text-xs font-medium px-2 py-1 rounded-full">
                        POSITIVE
                      </span>
                      <span className="text-xs text-[#6B7280]">
                        1 day ago
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#191B1C] mb-1 group-hover:text-[#2563EB] transition-colors">
                      New Feature Adoption Ahead of Projections
                    </h3>
                    <p className="text-[#4B5563]">
                      Users are loving the new features more
                      than expected
                    </p>
                  </div>
                </div>

                <div className="text-right flex items-center gap-4">
                  <div>
                    <div className="text-3xl font-bold text-[#2563EB]">
                      +127%
                    </div>
                    <div className="text-sm text-[#6B7280]">
                      adoption rate
                    </div>
                  </div>
                  <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
                    Celebrate
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Interactive Alert Legend */}
            <motion.div
              className="bg-white border border-[#E5E7E8] rounded-xl p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h3 className="font-medium text-[#191B1C] mb-4">
                Alert Types
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-[#FEF2F2] rounded-lg hover:bg-[#FEE2E2] transition-colors cursor-pointer">
                  <div className="w-3 h-3 rounded-full bg-[#DC2626]"></div>
                  <div>
                    <div className="font-medium text-[#191B1C]">
                      Critical
                    </div>
                    <div className="text-xs text-[#6B7280]">
                      Immediate action required
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#FFFBEB] rounded-lg hover:bg-[#FEF3C7] transition-colors cursor-pointer">
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                  <div>
                    <div className="font-medium text-[#191B1C]">
                      Warning
                    </div>
                    <div className="text-xs text-[#6B7280]">
                      Needs attention soon
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#F0F9FF] rounded-lg hover:bg-[#E0F2FE] transition-colors cursor-pointer">
                  <div className="w-3 h-3 rounded-full bg-[#0EA5E9]"></div>
                  <div>
                    <div className="font-medium text-[#191B1C]">
                      Info
                    </div>
                    <div className="text-xs text-[#6B7280]">
                      General information
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#DBEAFE] rounded-lg hover:bg-[#BFDBFE] transition-colors cursor-pointer">
                  <div className="w-3 h-3 rounded-full bg-[#2563EB]"></div>
                  <div>
                    <div className="font-medium text-[#191B1C]">
                      Positive
                    </div>
                    <div className="text-xs text-[#6B7280]">
                      Good news & achievements
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            {/* Reports Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-xl font-medium text-[#191B1C] mb-2">
                  Reports & Analytics
                </h2>
                <p className="text-[#626C70]">
                  Generate comprehensive reports and insights
                  for client performance
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Report
                </Button>
                <Button className="bg-[#005CE8] hover:bg-[#0052D4] text-white gap-2">
                  <Download className="h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </div>

            {/* Report Filters */}
            <motion.div
              className="bg-white border border-[#E5E7E8] rounded-xl p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-medium text-[#191B1C] mb-4">
                Report Filters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Report Type
                  </label>
                  <select className="w-full p-3 border border-[#D1D5DB] rounded-lg bg-white">
                    <option>Performance Overview</option>
                    <option>Financial Analysis</option>
                    <option>Operational Metrics</option>
                    <option>Executive Summary</option>
                    <option>Custom Report</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Date Range
                  </label>
                  <select className="w-full p-3 border border-[#D1D5DB] rounded-lg bg-white">
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Format
                  </label>
                  <select className="w-full p-3 border border-[#D1D5DB] rounded-lg bg-white">
                    <option>PDF Report</option>
                    <option>Excel Spreadsheet</option>
                    <option>PowerPoint</option>
                    <option>CSV Data</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Recipients
                  </label>
                  <select className="w-full p-3 border border-[#D1D5DB] rounded-lg bg-white">
                    <option>Internal Team</option>
                    <option>Client + Team</option>
                    <option>Executive Only</option>
                    <option>Custom List</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Report Categories Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Performance Reports */}
              <motion.div
                className="bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] border border-[#BAE6FD] rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#0EA5E9] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <span className="bg-[#0EA5E9] text-white text-xs font-medium px-2 py-1 rounded-full">
                    PERFORMANCE
                  </span>
                </div>

                <h3 className="font-semibold text-[#191B1C] mb-2 group-hover:text-[#0EA5E9] transition-colors">
                  Performance Dashboard
                </h3>
                <p className="text-[#6B7280] mb-4">
                  Comprehensive client health, KPI trends, and
                  performance metrics analysis
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">
                      Health Score Trends
                    </span>
                    <span className="text-sm font-medium text-[#059669]">
                      Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">
                      Conversion Analytics
                    </span>
                    <span className="text-sm font-medium text-[#059669]">
                      Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">
                      User Growth Analysis
                    </span>
                    <span className="text-sm font-medium text-[#059669]">
                      Available
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-[#0EA5E9] group-hover:text-white transition-colors"
                >
                  Generate Report
                </Button>
              </motion.div>

              {/* Financial Reports */}
              <motion.div
                className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] border border-[#BBF7D0] rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#059669] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">
                      💰
                    </span>
                  </div>
                  <span className="bg-[#059669] text-white text-xs font-medium px-2 py-1 rounded-full">
                    FINANCIAL
                  </span>
                </div>

                <h3 className="font-semibold text-[#191B1C] mb-2 group-hover:text-[#059669] transition-colors">
                  Revenue & Financial Analysis
                </h3>
                <p className="text-[#6B7280] mb-4">
                  MRR trends, billing analysis, ROI
                  calculations, and financial forecasting
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">
                      MRR Growth Analysis
                    </span>
                    <span className="text-sm font-medium text-[#059669]">
                      Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">
                      Billing & Invoicing
                    </span>
                    <span className="text-sm font-medium text-[#059669]">
                      Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">
                      ROI Assessment
                    </span>
                    <span className="text-sm font-medium text-[#059669]">
                      Available
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-[#059669] group-hover:text-white transition-colors"
                >
                  Generate Report
                </Button>
              </motion.div>

              {/* Operational Reports */}
              <motion.div
                className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border border-[#FCD34D] rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#F59E0B] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">
                      ⚙️
                    </span>
                  </div>
                  <span className="bg-[#F59E0B] text-white text-xs font-medium px-2 py-1 rounded-full">
                    OPERATIONAL
                  </span>
                </div>

                <h3 className="font-semibold text-[#191B1C] mb-2 group-hover:text-[#F59E0B] transition-colors">
                  Team & Operations
                </h3>
                <p className="text-[#6B7280] mb-4">
                  Team productivity, project status, resource
                  allocation, and operational efficiency
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">
                      Team Performance
                    </span>
                    <span className="text-sm font-medium text-[#059669]">
                      Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">
                      Project Status
                    </span>
                    <span className="text-sm font-medium text-[#059669]">
                      Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">
                      Resource Utilization
                    </span>
                    <span className="text-sm font-medium text-[#059669]">
                      Available
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-[#F59E0B] group-hover:text-white transition-colors"
                >
                  Generate Report
                </Button>
              </motion.div>

              {/* Executive Summary */}
              <motion.div
                className="bg-gradient-to-br from-[#F3E8FF] to-[#E9D5FF] border border-[#DDD6FE] rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#7C3AED] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">
                      📊
                    </span>
                  </div>
                  <span className="bg-[#7C3AED] text-white text-xs font-medium px-2 py-1 rounded-full">
                    EXECUTIVE
                  </span>
                </div>

                <h3 className="font-semibold text-[#191B1C] mb-2 group-hover:text-[#7C3AED] transition-colors">
                  Executive Summary
                </h3>
                <p className="text-[#6B7280] mb-4">
                  High-level overview for stakeholders with key
                  insights and strategic recommendations
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">
                      Strategic Overview
                    </span>
                    <span className="text-sm font-medium text-[#059669]">
                      Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">
                      Key Recommendations
                    </span>
                    <span className="text-sm font-medium text-[#059669]">
                      Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">
                      Risk Assessment
                    </span>
                    <span className="text-sm font-medium text-[#059669]">
                      Available
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-[#7C3AED] group-hover:text-white transition-colors"
                >
                  Generate Report
                </Button>
              </motion.div>
            </div>

            {/* Recent Reports */}
            <motion.div
              className="bg-white border border-[#E5E7E8] rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-[#191B1C]">
                  Recent Reports
                </h3>
                <Button variant="outline" size="sm">
                  View All Reports
                </Button>
              </div>

              <div className="space-y-4">
                {/* Report Item 1 */}
                <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg hover:bg-[#F3F4F6] transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#0EA5E9] rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#191B1C]">
                        Tripids Performance Report - Q1 2025
                      </h4>
                      <p className="text-sm text-[#6B7280]">
                        Generated 2 days ago • 847 KB PDF
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#DCFCE7] text-[#166534] text-xs font-medium px-2 py-1 rounded-full">
                      Completed
                    </span>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Report Item 2 */}
                <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg hover:bg-[#F3F4F6] transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#059669] rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">
                        💰
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#191B1C]">
                        Monthly Financial Analysis - January
                        2025
                      </h4>
                      <p className="text-sm text-[#6B7280]">
                        Generated 5 days ago • 1.2 MB Excel
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#DCFCE7] text-[#166534] text-xs font-medium px-2 py-1 rounded-full">
                      Completed
                    </span>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Report Item 3 */}
                <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg hover:bg-[#F3F4F6] transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#F59E0B] rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">
                        ⚙️
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#191B1C]">
                        Team Productivity Report - Week 3
                      </h4>
                      <p className="text-sm text-[#6B7280]">
                        Generated 1 week ago • 623 KB PDF
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#DCFCE7] text-[#166534] text-xs font-medium px-2 py-1 rounded-full">
                      Completed
                    </span>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}