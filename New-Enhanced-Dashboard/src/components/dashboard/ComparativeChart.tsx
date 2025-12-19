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

interface DataPoint {
  date: string;
  enies: number;
  bunqqi: number;
  tripids: number;
}

interface ComparativeChartProps {
  title?: string;
}

interface TooltipData {
  x: number;
  y: number;
  date: string;
  enies: number;
  bunqqi: number;
  tripids: number;
}

export function ComparativeChart({ title = "Comparative Client Performance" }: ComparativeChartProps) {
  const [selectedRange, setSelectedRange] = useState("This Month");
  const [selectedMetric, setSelectedMetric] = useState("All Metrics");
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const timeRanges = [
    "This Month",
    "Last Month", 
    "Last 3 Months",
    "Last 6 Months",
    "This Year"
  ];

  const metricFilters = [
    "All Metrics",
    "Performance Score",
    "User Growth",
    "Revenue Impact",
    "System Health",
    "Churn Rate"
  ];

  // Enhanced data with more points to fill the extended chart
  const data: DataPoint[] = [
    { date: "November 01", enies: 82, bunqqi: 45, tripids: 65 },
    { date: "November 03", enies: 75, bunqqi: 48, tripids: 63 },
    { date: "November 05", enies: 45, bunqqi: 65, tripids: 62 },
    { date: "November 08", enies: 38, bunqqi: 58, tripids: 60 },
    { date: "November 10", enies: 30, bunqqi: 55, tripids: 58 },
    { date: "November 12", enies: 35, bunqqi: 52, tripids: 65 },
    { date: "November 15", enies: 42, bunqqi: 48, tripids: 72 },
    { date: "November 18", enies: 48, bunqqi: 58, tripids: 74 },
    { date: "November 20", enies: 55, bunqqi: 72, tripids: 75 },
    { date: "November 22", enies: 52, bunqqi: 68, tripids: 76 },
    { date: "November 25", enies: 48, bunqqi: 68, tripids: 78 },
    { date: "November 28", enies: 44, bunqqi: 82, tripids: 85 },
    { date: "November 30", enies: 42, bunqqi: 85, tripids: 88 }
  ];

  const handleRangeChange = (range: string) => {
    setIsAnimating(true);
    setSelectedRange(range);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleExport = () => {
    const csvContent = [
      ['Date', 'ENIES', 'Bunqqi', 'Tripids'],
      ...data.map(d => [d.date, d.enies, d.bunqqi, d.tripids])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `client-performance-${selectedRange.toLowerCase().replace(' ', '-')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Calculate path data for smooth curves - SIGNIFICANTLY EXTENDED HEIGHT
  const createSmoothPath = (points: number[], isArea = false) => {
    if (points.length < 2) return '';
    
    const width = 800; // Match SVG viewBox width
    const height = 480; // SIGNIFICANTLY INCREASED from 380 to 480
    const maxVal = 100;
    const padding = 10; // Match dot coordinates
    
    // Convert data points to SVG coordinates
    const coords = points.map((point, index) => ({
      x: padding + (index / (points.length - 1)) * (width - 2 * padding),
      y: height - padding - ((point / maxVal) * (height - 2 * padding))
    }));
    
    let path = `M ${coords[0].x} ${coords[0].y}`;
    
    // Create smooth curve using quadratic bezier curves
    for (let i = 1; i < coords.length; i++) {
      const prevPoint = coords[i - 1];
      const currentPoint = coords[i];
      const controlX = (prevPoint.x + currentPoint.x) / 2;
      
      path += ` Q ${controlX} ${prevPoint.y} ${currentPoint.x} ${currentPoint.y}`;
    }
    
    // Close area path - EXTENDS TO BOTTOM (0 line)
    if (isArea) {
      path += ` L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${height - padding} Z`;
    }
    
    return path;
  };

  const eniesPoints = data.map(d => d.enies);
  const bunqqiPoints = data.map(d => d.bunqqi);
  const tripidsPoints = data.map(d => d.tripids);

  const handlePointHover = (index: number, event: React.MouseEvent) => {
    const rect = (event.currentTarget as SVGElement).getBoundingClientRect();
    const svgRect = (event.currentTarget as SVGElement).closest('svg')?.getBoundingClientRect();
    
    if (svgRect) {
      const x = event.clientX - svgRect.left;
      const y = event.clientY - svgRect.top;
      
      setTooltip({
        x,
        y,
        date: data[index].date,
        enies: data[index].enies,
        bunqqi: data[index].bunqqi,
        tripids: data[index].tripids
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 md:px-6 py-4 border-b border-gray-100 gap-3 sm:gap-0 flex-shrink-0">
        <h3 className="text-base font-medium text-[#191b1c]">{title}</h3>
        <div className="flex items-center gap-2">
          {/* Metric Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="bg-[#f5f6f7] h-8 px-3 gap-2 hover:bg-[#e5e7e8] transition-colors text-sm"
              >
                <span className="text-[#4a5154]">{selectedMetric}</span>
                <ChevronDown className="h-4 w-4 text-[#4a5154]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {metricFilters.map((metric) => (
                <DropdownMenuItem 
                  key={metric} 
                  onClick={() => setSelectedMetric(metric)}
                  className={selectedMetric === metric ? "bg-[#f0f6ff]" : ""}
                >
                  {metric}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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

      {/* Chart Area - REDUCED PADDING TO MAKE ROOM */}
      <div className="flex-1 flex flex-col p-4 md:p-6 pb-0">
        <div className="flex gap-6 flex-1">
          {/* Y-axis labels - SIGNIFICANTLY EXTENDED HEIGHT */}
          <div className="flex flex-col justify-between text-xs text-gray-400 py-3 pt-8" style={{ height: '480px' }}>
            <span>100</span>
            <span>80</span>
            <span>60</span>
            <span>40</span>
            <span>20</span>
            <span>0</span>
          </div>

          {/* Chart Container - Takes full available space */}
          <div className="flex-1 flex flex-col">
            {/* Chart SVG - DRAMATICALLY INCREASED HEIGHT */}
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 1 }}
              animate={{ opacity: isAnimating ? 0.5 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <svg viewBox="0 0 800 480" className="w-full h-full overflow-visible" style={{ height: '480px' }}>
                <defs>
                  {/* Gradient for ENIES */}
                  <linearGradient id="eniesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#227bff", stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: "#227bff", stopOpacity: 0.05 }} />
                  </linearGradient>
                  
                  {/* Gradient for Bunqqi */}
                  <linearGradient id="bunqqiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#ff8e00", stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: "#ff8e00", stopOpacity: 0.05 }} />
                  </linearGradient>

                  {/* Gradient for Tripids */}
                  <linearGradient id="tripidsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#10b981", stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: "#10b981", stopOpacity: 0.05 }} />
                  </linearGradient>
                </defs>
                
                {/* Horizontal Grid lines - UPDATED FOR NEW HEIGHT */}
                {[0, 20, 40, 60, 80, 100].map((val) => {
                  const y = 460 - ((val / 100) * 440) + 20; // Adjusted for 480px height
                  return (
                    <line
                      key={val}
                      x1="10"
                      y1={y}
                      x2="790"
                      y2={y}
                      stroke={val === 0 ? "#d0d0d0" : "#f0f0f0"} // Make 0 line slightly darker
                      strokeWidth={val === 0 ? "1.5" : "1"} // Make 0 line slightly thicker
                    />
                  );
                })}
                
                {/* Area fills - NOW EXTEND FULLY TO BOTTOM */}
                <motion.path
                  d={createSmoothPath(eniesPoints, true)}
                  fill="url(#eniesGradient)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.1 }}
                />
                <motion.path
                  d={createSmoothPath(bunqqiPoints, true)}
                  fill="url(#bunqqiGradient)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.path
                  d={createSmoothPath(tripidsPoints, true)}
                  fill="url(#tripidsGradient)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                
                {/* Line paths */}
                <motion.path
                  d={createSmoothPath(eniesPoints)}
                  stroke="#227bff"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.1 }}
                />
                <motion.path
                  d={createSmoothPath(bunqqiPoints)}
                  stroke="#ff8e00"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.path
                  d={createSmoothPath(tripidsPoints)}
                  stroke="#10b981"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                
                {/* Interactive Data points - UPDATED FOR NEW HEIGHT */}
                {eniesPoints.map((point, index) => {
                  // Use same calculation as createSmoothPath function
                  const width = 800;
                  const height = 480; // Updated height
                  const padding = 10;
                  const x = padding + (index / (eniesPoints.length - 1)) * (width - 2 * padding);
                  const y = height - padding - ((point / 100) * (height - 2 * padding));
                  return (
                    <motion.circle
                      key={`enies-${index}`}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#227bff"
                      className="cursor-pointer hover:r-6 transition-all"
                      onMouseEnter={(e) => handlePointHover(index, e)}
                      onMouseLeave={() => setTooltip(null)}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    />
                  );
                })}
                
                {bunqqiPoints.map((point, index) => {
                  // Use same calculation as createSmoothPath function
                  const width = 800;
                  const height = 480; // Updated height
                  const padding = 10;
                  const x = padding + (index / (bunqqiPoints.length - 1)) * (width - 2 * padding);
                  const y = height - padding - ((point / 100) * (height - 2 * padding));
                  return (
                    <motion.circle
                      key={`bunqqi-${index}`}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#ff8e00"
                      className="cursor-pointer hover:r-6 transition-all"
                      onMouseEnter={(e) => handlePointHover(index, e)}
                      onMouseLeave={() => setTooltip(null)}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                    />
                  );
                })}

                {tripidsPoints.map((point, index) => {
                  // Use same calculation as createSmoothPath function
                  const width = 800;
                  const height = 480; // Updated height
                  const padding = 10;
                  const x = padding + (index / (tripidsPoints.length - 1)) * (width - 2 * padding);
                  const y = height - padding - ((point / 100) * (height - 2 * padding));
                  return (
                    <motion.circle
                      key={`tripids-${index}`}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#10b981"
                      className="cursor-pointer hover:r-6 transition-all"
                      onMouseEnter={(e) => handlePointHover(index, e)}
                      onMouseLeave={() => setTooltip(null)}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                    />
                  );
                })}
              </svg>

              {/* Tooltip */}
              {tooltip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 pointer-events-none z-10"
                  style={{
                    left: tooltip.x + 10,
                    top: tooltip.y - 10,
                    transform: 'translateY(-100%)'
                  }}
                >
                  <div className="text-sm font-medium text-gray-900 mb-2">{tooltip.date}</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#227bff]" />
                      <span className="text-xs text-gray-600">ENIES:</span>
                      <span className="text-xs font-medium">{tooltip.enies}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#ff8e00]" />
                      <span className="text-xs text-gray-600">Bunqqi:</span>
                      <span className="text-xs font-medium">{tooltip.bunqqi}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                      <span className="text-xs text-gray-600">Tripids:</span>
                      <span className="text-xs font-medium">{tooltip.tripids}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* X-axis labels - POSITIONED CLOSER TO CHART */}
            <div className="flex justify-between text-xs text-gray-400 -mt-6 px-4">
              <span>Nov 01</span>
              <span>Nov 08</span>
              <span>Nov 15</span>
              <span>Nov 22</span>
              <span>Nov 30</span>
            </div>
          </div>
        </div>

        {/* Legend - CLEAN SPACING WITHOUT BORDER */}
        <div className="flex items-center justify-center gap-6 flex-wrap -mt-2 pt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#227bff]" />
            <span className="text-sm text-gray-900">ENIES</span>
            <span className="text-sm text-red-600 font-medium">-8.3%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff8e00]" />
            <span className="text-sm text-gray-900">Bunqqi</span>
            <span className="text-sm text-green-600 font-medium">+5.4%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10b981]" />
            <span className="text-sm text-gray-900">Tripids</span>
            <span className="text-sm text-green-600 font-medium">+12.1%</span>
          </div>
        </div>
      </div>
    </div>
  );
}