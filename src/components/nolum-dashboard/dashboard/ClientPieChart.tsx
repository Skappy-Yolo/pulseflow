import { useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { motion } from "motion/react";

interface ClientData {
  name: string;
  users: number;
  industry: string;
  color: string;
  revenue?: string;
  teamSize?: number;
  growthRate?: string;
}

interface ClientPieChartProps {
  title?: string;
}

interface PieTooltipData {
  x: number;
  y: number;
  client: ClientData;
  percentage: string;
  filterType: string;
}

export function ClientPieChart({ title = "My Clients" }: ClientPieChartProps) {
  const [selectedFilter, setSelectedFilter] = useState("Industry");
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pieTooltip, setPieTooltip] = useState<PieTooltipData | null>(null);

  const filters = ["Industry", "Revenue", "Team Size", "Growth Rate"];

  const clientData: ClientData[] = [
    {
      name: "Tripids",
      users: 11182,
      industry: "E-commerce",
      color: "#10b981",
      revenue: "$847K",
      teamSize: 24,
      growthRate: "+12.1%"
    },
    {
      name: "ENIES", 
      users: 33471,
      industry: "EdTech",
      color: "#227bff",
      revenue: "$1.2M",
      teamSize: 67,
      growthRate: "-8.3%"
    },
    {
      name: "Bunqqi",
      users: 2904,
      industry: "FinTech", 
      color: "#ff8e00",
      revenue: "$324K",
      teamSize: 18,
      growthRate: "+5.4%"
    }
  ];

  const total = clientData.reduce((sum, client) => sum + client.users, 0);

  const handleFilterChange = (filter: string) => {
    setIsAnimating(true);
    setSelectedFilter(filter);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleExport = () => {
    const csvContent = [
      ['Client Name', 'Total Users', 'Industry', 'Revenue', 'Team Size', 'Growth Rate', 'Percentage'],
      ...clientData.map(client => [
        client.name, 
        client.users, 
        client.industry,
        client.revenue || 'N/A',
        client.teamSize || 'N/A',
        client.growthRate || 'N/A',
        `${((client.users / total) * 100).toFixed(1)}%`
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `client-distribution-${selectedFilter.toLowerCase().replace(' ', '-')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getFilterValue = (client: ClientData, filter: string) => {
    switch (filter) {
      case "Industry": return client.industry;
      case "Revenue": return client.revenue || 'N/A';
      case "Team Size": return client.teamSize?.toString() || 'N/A';
      case "Growth Rate": return client.growthRate || 'N/A';
      default: return client.industry;
    }
  };

  const getFilterColor = (value: string, filter: string) => {
    if (filter === "Growth Rate") {
      if (value.startsWith("+")) return "text-green-600";
      if (value.startsWith("-")) return "text-red-600";
      return "text-gray-600";
    }
    return "text-gray-600";
  };

  const handlePieHover = (index: number, event: React.MouseEvent) => {
    const svgRect = (event.currentTarget as SVGElement).closest('svg')?.getBoundingClientRect();
    
    if (svgRect) {
      const x = event.clientX - svgRect.left;
      const y = event.clientY - svgRect.top;
      
      setPieTooltip({
        x,
        y,
        client: clientData[index],
        percentage: ((clientData[index].users / total) * 100).toFixed(1),
        filterType: selectedFilter
      });
    }
    setHoveredSegment(index);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 md:px-6 py-4 border-b border-gray-100 gap-3 sm:gap-0">
        <h3 className="text-base font-medium text-[#191b1c]">{title}</h3>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="bg-[#f5f6f7] h-8 px-3 gap-2 hover:bg-[#e5e7e8] transition-colors w-full sm:w-auto text-sm"
              >
                <span className="text-[#4a5154]">{selectedFilter}</span>
                <ChevronDown className="h-4 w-4 text-[#4a5154]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {filters.map((filter) => (
                <DropdownMenuItem 
                  key={filter} 
                  onClick={() => handleFilterChange(filter)}
                  className={selectedFilter === filter ? "bg-[#f0f6ff]" : ""}
                >
                  {filter}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Export Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 hover:bg-[#e5e7e8] transition-colors"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 text-[#4a5154]" />
          </Button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="p-4 md:p-6">
        {/* Donut Chart with proper gaps including green-to-orange */}
        <motion.div 
          className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: isAnimating ? 0.5 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
            {clientData.map((client, index) => {
              const percentage = (client.users / total) * 100;
              const totalGaps = clientData.length * 6; // 6 degrees total gap per segment
              const adjustedTotalAngle = 360 - totalGaps;
              const angle = (percentage / 100) * adjustedTotalAngle; // Adjusted for gaps
              const radius = 65;
              const innerRadius = 35;
              const centerX = 80;
              const centerY = 80;
              const gapAngle = 6; // Gap between each segment
              
              // Calculate start angle with proper gap distribution
              const startAngle = clientData.slice(0, index).reduce((sum, c) => {
                const segmentAngle = ((c.users / total) * adjustedTotalAngle / 100) * 100;
                return sum + segmentAngle + gapAngle;
              }, 0);
              
              const endAngle = startAngle + angle;
              
              // Convert to radians
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              
              // Calculate outer arc points
              const x1 = centerX + radius * Math.cos(startRad);
              const y1 = centerY + radius * Math.sin(startRad);
              const x2 = centerX + radius * Math.cos(endRad);
              const y2 = centerY + radius * Math.sin(endRad);
              
              // Calculate inner arc points
              const x3 = centerX + innerRadius * Math.cos(endRad);
              const y3 = centerY + innerRadius * Math.sin(endRad);
              const x4 = centerX + innerRadius * Math.cos(startRad);
              const y4 = centerY + innerRadius * Math.sin(startRad);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `L ${x3} ${y3}`,
                `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
                'Z'
              ].join(' ');

              return (
                <motion.path
                  key={index}
                  d={pathData}
                  fill={client.color}
                  className={`transition-all duration-200 cursor-pointer ${
                    hoveredSegment === index ? 'opacity-80 drop-shadow-lg' : ''
                  }`}
                  onMouseEnter={(e) => handlePieHover(index, e)}
                  onMouseLeave={() => {
                    setHoveredSegment(null);
                    setPieTooltip(null);
                  }}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                />
              );
            })}
          </svg>

          {/* Pie Tooltip */}
          {pieTooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 pointer-events-none z-10"
              style={{
                left: pieTooltip.x + 10,
                top: pieTooltip.y - 10,
                transform: 'translateY(-100%)'
              }}
            >
              <div className="text-sm font-medium text-gray-900 mb-2">{pieTooltip.client.name}</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Users:</span>
                  <span className="text-xs font-medium">{pieTooltip.client.users.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Share:</span>
                  <span className="text-xs font-medium">{pieTooltip.percentage}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">{pieTooltip.filterType}:</span>
                  <span className="text-xs font-medium">{getFilterValue(pieTooltip.client, pieTooltip.filterType)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Total Users - Moved outside the chart */}
        <div className="text-center mb-6">
          <div className="text-lg font-semibold text-gray-900">{total.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Total Users</div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-100 mb-3">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">CLIENT NAME</div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">TOTAL USERS</div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{selectedFilter.toUpperCase()}</div>
        </div>

        {/* Client Rows */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 1 }}
          animate={{ opacity: isAnimating ? 0.5 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {clientData.map((client, index) => {
            const percentage = ((client.users / total) * 100).toFixed(1);
            const filterValue = getFilterValue(client, selectedFilter);
            const filterColor = getFilterColor(filterValue, selectedFilter);
            
            return (
              <motion.div 
                key={index}
                className={`grid grid-cols-3 gap-4 py-2 rounded cursor-pointer transition-colors ${
                  hoveredSegment === index ? 'bg-gray-50' : ''
                }`}
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: client.color }}
                  />
                  <span className="text-sm font-medium text-gray-900">{client.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-900">{client.users.toLocaleString()}</span>
                  <span className="text-xs text-gray-500">({percentage}%)</span>
                </div>
                <div className={`text-sm font-medium ${filterColor}`}>
                  {filterValue}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Performance Summary */}
        <motion.div 
          className="mt-4 pt-3 border-t border-gray-100 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Highest Growth</span>
            <span className="font-medium text-green-600">Tripids (+12.1%)</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Largest Client</span>
            <span className="font-medium text-blue-600">ENIES (33,471 users)</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}