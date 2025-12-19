import { useState } from "react";
import { ChevronDown, Plus, Search, Users, Heart, AlertTriangle, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ClientsPageProps {
  onClientSelect?: (clientId: string) => void;
}

export function ClientsPage({ onClientSelect }: ClientsPageProps = {}) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("health");

  const handleViewMoreClients = () => {
    // Future functionality: Load more clients, navigate to expanded view, etc.
    console.log("View more clients clicked - ready for future implementation");
  };

  const handleFullOverview = (clientId: string) => {
    onClientSelect?.(clientId);
  };

  const statisticsData = [
    {
      label: "Total Clients",
      value: "6",
      icon: Users,
      iconBg: "bg-[#0060E8]/10",
      iconColor: "text-[#0060E8]",
      valueColor: "text-[#005FE7]"
    },
    {
      label: "Average Health",
      value: "81",
      icon: Heart,
      iconBg: "bg-[#00AA60]/10", 
      iconColor: "text-[#00AA60]",
      valueColor: "text-[#00AA60]"
    },
    {
      label: "Critical",
      value: "6",
      icon: AlertTriangle,
      iconBg: "bg-[#FF272D]/10",
      iconColor: "text-[#FF272D]",
      valueColor: "text-[#FF272D]"
    },
    {
      label: "Active Alerts", 
      value: "10",
      icon: Clock,
      iconBg: "bg-[#FF8E00]/10",
      iconColor: "text-[#FF8E00]",
      valueColor: "text-[#FF8E00]"
    }
  ];

  const clientsData = [
    {
      id: 1,
      name: "ENIES",
      category: "Financial Technology",
      users: "33,471 Users",
      mrr: "MRR: €890K",
      score: 45,
      scoreColor: "text-[#FF272D]",
      trend: "down",
      trendValue: "2.1% Decrease",
      trendColor: "text-[#E84646]",
      borderColor: "border-[#FF272D]",
      buttonColor: "border-[#FF272D] text-[#FF272D]",
      barColor: "bg-[#FF272D]",
      alertCount: 3,
      alertColor: "bg-[#FF272D]/10 text-[#FF272D]",
      syncStatus: "Last sync: 5 mins ago",
      syncColor: "text-[#FF272D]",
      members: [
        { avatar: "👤", bg: "bg-[#FFBF66]" },
        { avatar: "👤", bg: "bg-[#00B5DD]" }
      ]
    },
    {
      id: 2,
      name: "Bunqqi",
      category: "FinTech",
      users: "2,904 Users", 
      mrr: "MRR: €87K",
      score: 94,
      scoreColor: "text-[#00AA60]",
      trend: "up",
      trendValue: "7% Increase",
      trendColor: "text-[#00AA60]",
      borderColor: "border-[#00AA60]",
      buttonColor: "border-[#00AA60] text-[#00AA60]",
      barColor: "bg-[#00AA60]",
      alertCount: 1,
      alertColor: "bg-[#FF272D]/10 text-[#FF272D]",
      syncStatus: "Last sync: 2 mins ago",
      syncColor: "text-[#00AA60]",
      members: [
        { avatar: "👤", bg: "bg-[#FFBF66]" },
        { avatar: "👤", bg: "bg-[#00B5DD]" }
      ]
    },
    {
      id: 3,
      name: "Tripids", 
      category: "E-Commerce",
      users: "11,182 Users",
      mrr: "MRR: €940K",
      score: 78,
      scoreColor: "text-[#FF8E00]",
      trend: "stable",
      trendValue: "0%",
      trendColor: "text-[#FF8E00]",
      borderColor: "border-[#FF8E00]",
      buttonColor: "border-[#FF8E00] text-[#FF8E00]",
      barColor: "bg-[#FF8E00]",
      alertCount: 2,
      alertColor: "bg-[#FF272D]/10 text-[#FF272D]",
      syncStatus: "Last sync: 2 mins ago",
      syncColor: "text-[#FF8E00]",
      members: [
        { avatar: "👤", bg: "bg-[#FFBF66]" },
        { avatar: "👤", bg: "bg-[#00B5DD]" }
      ]
    }
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-2 text-sm text-[#626C70] mb-2">
          <span>Home</span>
          <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
          <span>Clients</span>
        </div>
        <h1 className="text-xl md:text-2xl font-semibold text-[#191B1C]">My Clients</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
        {statisticsData.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`h-10 w-10 md:h-12 md:w-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
                  <IconComponent className={`h-5 w-5 md:h-6 md:w-6 ${stat.iconColor}`} />
                </div>
              </div>
              <div>
                <div className={`text-2xl md:text-3xl font-semibold ${stat.valueColor} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-[#626C70]">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[165px] bg-white">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[165px] bg-white">
              <SelectValue placeholder="Sort by Health" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="health">Sort by Health</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="users">Sort by Users</SelectItem>
              <SelectItem value="revenue">Sort by Revenue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="bg-[#005CE8] hover:bg-[#0046B8] text-white rounded-full px-6">
          <Plus className="h-4 w-4 mr-2" />
          Add New Client
        </Button>
      </div>

      {/* Client Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {clientsData.map((client) => (
          <div 
            key={client.id} 
            className={`bg-white rounded-lg shadow-sm border-2 ${client.borderColor} p-4 md:p-6 relative`}
          >
            {/* Colored Left Border */}
            <div className={`absolute left-0 top-0 w-1.5 h-full ${client.barColor} rounded-l-lg`} />
            
            {/* Header Section */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-9 bg-[#F0F6FF] rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-[#005CE8]">Logo</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#191B1C] text-lg">{client.name}</h3>
                  <p className="text-sm text-[#626C70]">{client.category}</p>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <span className="text-[#57A7E9]">{client.users}</span>
                    <span className="w-1 h-1 bg-black rounded-full" />
                    <span className="text-[#626C70]">{client.mrr}</span>
                  </div>
                </div>
              </div>
              
              {/* Alert Badge */}
              <div className={`${client.alertColor} rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1`}>
                <AlertTriangle className="h-3 w-3" />
                {client.alertCount}
              </div>
            </div>

            {/* Score Section */}
            <div className="text-center mb-4">
              <div className={`text-4xl md:text-5xl font-semibold ${client.scoreColor} mb-2`}>
                {client.score}
              </div>
              <div className="text-sm text-[#626C70] mb-2">Overall Health Score</div>
              
              {/* Trend Indicator */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {client.trend === "up" && <div className="text-[#00AA60]">↗</div>}
                {client.trend === "down" && <div className="text-[#E84646]">↘</div>}
                {client.trend === "stable" && <div className="text-[#FF8E00]">→</div>}
                <span className={`text-sm ${client.trendColor}`}>{client.trendValue}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className={`h-2 ${client.barColor} rounded-full opacity-50`} 
                  style={{ width: `${client.score}%` }}
                />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between">
              {/* Team Members */}
              <div className="flex items-center">
                {client.members.map((member, idx) => (
                  <div 
                    key={idx}
                    className={`w-8 h-8 ${member.bg} rounded-full border-2 border-white flex items-center justify-center text-xs ${idx > 0 ? '-ml-2' : ''}`}
                  >
                    {member.avatar}
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleFullOverview(client.id.toString())}
                className={`${client.buttonColor} rounded-full px-4 py-2 hover:bg-opacity-10`}
              >
                Full Overview →
              </Button>
            </div>

            {/* Sync Status */}
            <div className={`text-xs ${client.syncColor} mt-3 text-right`}>
              {client.syncStatus}
            </div>
          </div>
        ))}
        
        {/* View More Clients Button */}
        <div 
          onClick={handleViewMoreClients}
          className="bg-white rounded-lg shadow-sm border-2 border-dashed border-[#E5E7EB] p-4 md:p-6 relative flex items-center justify-center min-h-[310px] hover:border-[#005CE8] hover:bg-[#F0F6FF] transition-all duration-200 cursor-pointer group"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-[#F0F6FF] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#E0EFFF] transition-colors duration-200">
              <ChevronDown className="h-8 w-8 text-[#005CE8] rotate-[-90deg]" />
            </div>
            <h3 className="font-semibold text-[#191B1C] text-lg mb-2">View More Clients</h3>
            <p className="text-sm text-[#626C70] mb-4">Discover additional clients in your portfolio</p>
            <div className="text-xs text-[#959FA3]">
              Coming Soon
            </div>
          </div>
          
          {/* Subtle animation indicator */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#005CE8] rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-[#005CE8] rounded-full animate-pulse delay-100" />
              <div className="w-2 h-2 bg-[#005CE8] rounded-full animate-pulse delay-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}