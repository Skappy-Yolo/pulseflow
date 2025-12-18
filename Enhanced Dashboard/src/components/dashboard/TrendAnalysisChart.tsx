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

interface TooltipData {
  x: number;
  y: number;
  month: string;
  pipeline: number;
  conversion: number;
  revenue: number;
}

export function TrendAnalysisChart() {
  const [selectedRange, setSelectedRange] = useState("Last 6 Months");
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const timeRanges = [
    "Last 6 Months",
    "Last 3 Months", 
    "Last Month",
    "Last Week",
    "This Year"
  ];

  // Sample data for different time ranges
  const getDataForRange = (range: string) => {
    switch (range) {
      case "Last Week":
        return {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          pipeline: [3200, 3400, 3100, 3600, 3800, 3500, 3700],
          conversion: [2800, 3000, 2700, 3200, 3400, 3100, 3300],
          revenue: [3500, 3700, 3400, 3900, 4100, 3800, 4000]
        };
      case "Last Month":
        return {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          pipeline: [3200, 3800, 4200, 4800],
          conversion: [2800, 3200, 3600, 4200],
          revenue: [3500, 4000, 4500, 5200]
        };
      case "Last 3 Months":
        return {
          labels: ["Oct", "Nov", "Dec"],
          pipeline: [4200, 4600, 5000],
          conversion: [3600, 4000, 4400],
          revenue: [4500, 4900, 5300]
        };
      case "This Year":
        return {
          labels: ["Q1", "Q2", "Q3", "Q4"],
          pipeline: [4000, 4500, 5000, 5500],
          conversion: [3500, 4000, 4500, 5000],
          revenue: [4200, 4700, 5200, 5700]
        };
      default: // Last 6 Months
        return {
          labels: ["January", "February", "March", "April", "May", "June"],
          pipeline: [3200, 4100, 3800, 4500, 5200, 4800],
          conversion: [2800, 3600, 3200, 3900, 4200, 4500],
          revenue: [3500, 4300, 4000, 4700, 5500, 5800]
        };
    }
  };

  const data = getDataForRange(selectedRange);

  const handleRangeChange = (range: string) => {
    setIsAnimating(true);
    setSelectedRange(range);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleExport = () => {
    const csvContent = [
      ['Period', 'Pipeline', 'Conversion', 'Revenue'],
      ...data.labels.map((label, index) => [
        label, 
        data.pipeline[index], 
        data.conversion[index], 
        data.revenue[index]
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trend-analysis-${selectedRange.toLowerCase().replace(' ', '-')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePointHover = (index: number, event: React.MouseEvent) => {
    const rect = (event.currentTarget as SVGElement).getBoundingClientRect();
    const svgRect = (event.currentTarget as SVGElement).closest('svg')?.getBoundingClientRect();
    
    if (svgRect) {
      const x = event.clientX - svgRect.left;
      const y = event.clientY - svgRect.top;
      
      setTooltip({
        x,
        y,
        month: data.labels[index],
        pipeline: data.pipeline[index],
        conversion: data.conversion[index],
        revenue: data.revenue[index]
      });
    }
  };

  return (
    <div className="bg-white border border-[#E5E7E8] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-[#E5E7E8]">
        <h3 className="text-lg font-medium text-[#191B1C]">Trend Analysis</h3>
        <div className="flex items-center gap-2">
          {/* Time Range Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="bg-[#f5f6f7] h-8 px-3 gap-2 hover:bg-[#e5e7e8] transition-colors text-sm"
              >
                <span className="text-[#4a5154]">{selectedRange}</span>
                <ChevronDown className="h-4 w-4 text-[#4a5154]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {timeRanges.map((range) => (
                <DropdownMenuItem 
                  key={range} 
                  onClick={() => handleRangeChange(range)}
                  className={selectedRange === range ? "bg-[#f0f6ff]" : ""}
                >
                  {range}
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
      
      <div className="flex flex-col p-6 pb-0">
        <div className="flex gap-6 flex-1">
          {/* Y-axis labels - SIGNIFICANTLY EXTENDED HEIGHT */}
          <div className="flex flex-col justify-between text-xs text-[#B0B7BA] py-3 pt-8" style={{ height: '480px' }}>
            <span>7500</span>
            <span>6000</span>
            <span>4500</span>
            <span>3000</span>
            <span>1500</span>
            <span>0</span>
          </div>

          {/* Chart Container - Takes full available space */}
          <div className="flex-1 flex flex-col">
            {/* Chart SVG - DRAMATICALLY INCREASED HEIGHT using your Figma design */}
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 1 }}
              animate={{ opacity: isAnimating ? 0.5 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <svg viewBox="0 0 1314 480" className="w-full h-full overflow-visible" style={{ height: '480px' }}>
                {/* Grid lines */}
                {[0, 20, 40, 60, 80, 100].map((val) => {
                  const y = 460 - ((val / 100) * 440) + 20;
                  return (
                    <line
                      key={val}
                      x1="10"
                      y1={y}
                      x2="1304"
                      y2={y}
                      stroke={val === 0 ? "#d0d0d0" : "#f0f0f0"}
                      strokeWidth={val === 0 ? "1.5" : "1"}
                      strokeDasharray={val === 0 ? "none" : "3,3"}
                    />
                  );
                })}
                
                {/* Your exact Figma trend lines - scaled to fit the extended SVG */}
                <motion.path
                  d="M1.00375 172.725C30.9195 175.437 103.361 159.455 131.555 159.455C172.008 172.725 188.239 171.464 212.46 172.725C265.171 153.373 334.783 152.374 358.947 146.185C480.918 199.265 1224.96 82.72 1255.64 66.0119C1290.55 54.5213 1301.61 44.4481 1313.26 36.7075"
                  stroke="#D98B0E"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.2 }}
                />
                <motion.path
                  d="M1.00629 224.989C30.922 227.701 112.545 199.545 131.558 211.72C186.107 201.767 308.984 172.017 333.205 173.278C385.916 153.925 427.946 139.656 452.111 133.468C614.534 133.468 1066.83 179.481 1097.51 162.773C1132.41 151.282 1275.26 11.2729 1286.9 3.53223"
                  stroke="#00AA60"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.3 }}
                />
                <motion.path
                  d="M10.1974 70.9883C40.1131 73.7002 86.8015 73.4797 105.814 85.6545C160.364 75.7019 236.046 180.311 260.267 181.571C312.978 162.219 346.428 219.276 370.592 213.087C492.563 266.167 1039.86 139.671 1070.54 122.963C1105.44 111.472 1290.58 84.8108 1302.23 77.0702"
                  stroke="#006AFF"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.1 }}
                />
                
                {/* Removed interactive points to preserve the pure organic design */}
              </svg>


            </motion.div>

            {/* X-axis labels - Dynamic based on selected range */}
            <div className="flex justify-between text-xs text-[#B0B7BA] -mt-6 px-4">
              {data.labels.map((label, index) => (
                <span key={index}>{label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 flex-wrap -mt-2 pt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#006AFF]" />
            <span className="text-sm text-gray-900">Pipeline</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#D98B0E]" />
            <span className="text-sm text-gray-900">Conversion</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00AA60]" />
            <span className="text-sm text-gray-900">Revenue</span>
          </div>
        </div>
      </div>
    </div>
  );
}