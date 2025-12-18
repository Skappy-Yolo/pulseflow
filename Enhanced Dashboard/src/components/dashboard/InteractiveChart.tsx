import { useState } from "react";
import { ChevronDown, TrendingUp, TrendingDown } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface ChartProps {
  title: string;
  timeRange: string;
  data: Array<{
    name: string;
    value: number;
    change: number;
    color: string;
  }>;
}

export function InteractiveChart({ title, timeRange, data }: ChartProps) {
  const [selectedRange, setSelectedRange] = useState(timeRange);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  const timeRanges = [
    "This Month",
    "Last Month", 
    "Last 3 Months",
    "Last 6 Months",
    "This Year"
  ];

  return (
    <div className="bg-white rounded-[8px] overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 md:px-6 py-3 border-b border-[#e5e7e8] gap-3 sm:gap-0">
        <h3 className="text-sm md:text-base font-medium text-[#191b1c]">{title}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="bg-[#f5f6f7] h-8 px-2.5 gap-2 hover:bg-[#e5e7e8] transition-colors w-full sm:w-auto"
            >
              <span className="text-sm text-[#4a5154]">{selectedRange}</span>
              <ChevronDown className="h-4 w-4 text-[#4a5154]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {timeRanges.map((range) => (
              <DropdownMenuItem 
                key={range} 
                onClick={() => setSelectedRange(range)}
                className={selectedRange === range ? "bg-[#f0f6ff]" : ""}
              >
                {range}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chart Area */}
      <div className="p-4 md:p-6">
        {/* Pie Chart */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 md:mb-6">
          <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
            {data.map((item, index) => {
              const total = data.reduce((sum, d) => sum + d.value, 0);
              const percentage = (item.value / total) * 100;
              const angle = (percentage / 100) * 360;
              const radius = 60;
              const centerX = 80;
              const centerY = 80;
              
              // Calculate start angle for this segment
              const startAngle = data.slice(0, index).reduce((sum, d) => {
                return sum + ((d.value / total) * 360);
              }, 0);
              
              const endAngle = startAngle + angle;
              
              // Convert to radians
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              
              // Calculate path
              const x1 = centerX + radius * Math.cos(startRad);
              const y1 = centerY + radius * Math.sin(startRad);
              const x2 = centerX + radius * Math.cos(endRad);
              const y2 = centerY + radius * Math.sin(endRad);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');

              return (
                <path
                  key={index}
                  d={pathData}
                  fill={item.color}
                  className={`transition-all duration-200 cursor-pointer ${
                    hoveredSegment === index ? 'opacity-80 transform scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredSegment(index)}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-2 md:space-y-3">
          {data.map((item, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                hoveredSegment === index ? 'bg-[#f8f9fa]' : ''
              }`}
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div 
                  className="w-2 h-2 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs md:text-sm font-medium text-[#191b1c] truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                <span className="text-xs md:text-sm text-[#4a5154]">{item.value.toLocaleString()}</span>
                <div className="flex items-center gap-1">
                  {item.change > 0 ? (
                    <TrendingUp className="h-3 w-3 text-[#0faf62]" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-[#e84646]" />
                  )}
                  <span className={`text-xs ${item.change > 0 ? 'text-[#0faf62]' : 'text-[#e84646]'}`}>
                    {item.change > 0 ? '+' : ''}{item.change}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}