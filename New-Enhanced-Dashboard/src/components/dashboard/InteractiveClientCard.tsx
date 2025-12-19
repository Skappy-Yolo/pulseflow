import { useState } from "react";
import { TrendingUp, TrendingDown, Eye, MoreVertical, ArrowDown, ExternalLink, Settings, Archive } from "lucide-react";
import { Button } from "../ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "../ui/dropdown-menu";

interface ClientCardProps {
  name: string;
  category: string;
  users: string;
  score: number;
  scoreColor: string;
  trend: "up" | "down" | "stable";
  trendValue: string;
  trendText: string;
  assignedTo: string;
  priority: "High" | "Medium" | "Low";
  chartColor: string;
}

export function InteractiveClientCard({
  name,
  category,
  users,
  score,
  scoreColor,
  trend,
  trendValue,
  trendText,
  assignedTo,
  priority,
  chartColor
}: ClientCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const priorityColors = {
    High: "text-[#e84646]",
    Medium: "text-[#ff8e00]", 
    Low: "text-[#0faf62]"
  };

  // Generate sample chart data based on trend
  const generateChartPath = () => {
    const points = trend === "down" 
      ? "M0,20 L20,15 L40,25 L60,20 L80,30 L100,35"
      : trend === "up"
      ? "M0,35 L20,30 L40,20 L60,15 L80,10 L100,5"
      : "M0,25 L20,20 L40,22 L60,18 L80,20 L100,22";
    return points;
  };

  const getMetrics = () => {
    switch(name) {
      case "ENIES":
        return {
          marketing: { label: "Marketing", value: "850 leads", change: null },
          sales: { label: "Sales", value: "45 deals", change: -15 },
          product: { label: "Product", value: "12 active", change: null },
          support: { label: "Support", value: "8 tickets", change: null }
        };
      case "Bunqqi":
        return {
          marketing: { label: "Marketing", value: "622 leads", change: null },
          sales: { label: "Sales", value: "119 deals", change: 27 },
          product: { label: "Product", value: "43 active", change: null },
          support: { label: "Support", value: "22 tickets", change: null }
        };
      case "Tripids":
        return {
          marketing: { label: "Marketing", value: "332 leads", change: null },
          sales: { label: "Sales", value: "47 deals", change: 5 },
          product: { label: "Product", value: "16 active", change: null },
          support: { label: "Support", value: "4 tickets", change: null }
        };
      default:
        return {
          marketing: { label: "Marketing", value: "0 leads", change: null },
          sales: { label: "Sales", value: "0 deals", change: null },
          product: { label: "Product", value: "0 active", change: null },
          support: { label: "Support", value: "0 tickets", change: null }
        };
    }
  };

  const metrics = getMetrics();

  const handleViewClick = () => {
    console.log(`Viewing ${name} dashboard`);
    // Add actual navigation logic here
  };

  const handleMenuAction = (action: string) => {
    console.log(`${action} action for ${name}`);
    // Add actual action logic here
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-100 w-full relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ minHeight: '336px' }}
    >
      <div className="p-6 h-full flex flex-col">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-2xl font-semibold text-[#191b1c]">{name}</h3>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="text-[#018cfe] hover:bg-[#f0f6ff] text-sm border border-[#018cfe] rounded px-3 py-1 transition-all duration-200 hover:shadow-sm"
                  onClick={handleViewClick}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleMenuAction('view-details')}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuAction('configure')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleMenuAction('archive')} className="text-red-600">
                      <Archive className="mr-2 h-4 w-4" />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="text-sm text-[#9ba3a9] mb-1">{category}</div>
            <div className="text-xs text-[#57a7e9]">{users}</div>
          </div>
        </div>

        {/* Score and Chart Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className={`text-4xl font-medium ${scoreColor} mb-2`}>
              {score}/100
            </div>
            
            {/* Trend Status */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <ArrowDown className={`h-4 w-4 ${trend === 'down' ? 'text-[#e84646]' : 'text-[#0faf62] rotate-180'}`} />
                <span className={`text-sm ${trend === 'down' ? 'text-[#e84646]' : 'text-[#0faf62]'}`}>
                  {trendValue} {trend === 'down' ? 'Decrease' : 'Increase'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Mini Chart */}
          <div className="w-24 h-16 relative">
            <svg viewBox="0 0 100 40" className="w-full h-full">
              <defs>
                <linearGradient id={`gradient-${name}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: chartColor, stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: chartColor, stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              <path
                d={`${generateChartPath()} L100,40 L0,40 Z`}
                fill={`url(#gradient-${name})`}
              />
              <path
                d={generateChartPath()}
                stroke={chartColor}
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Trend Message */}
        <div className="mb-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded text-sm ${
            trend === 'down' ? 'bg-red-50 text-[#e84646]' : 'bg-green-50 text-[#0faf62]'
          }`}>
            <ArrowDown className={`h-3 w-3 ${trend === 'down' ? '' : 'rotate-180'}`} />
            {trendText}
          </div>
        </div>

        {/* Metrics Grid - 2x2 Layout */}
        <div className="grid grid-cols-2 gap-3 mb-6 flex-1">
          {/* Marketing */}
          <div className="border border-blue-200 rounded-lg p-3 bg-blue-50/30 hover:bg-blue-50/50 transition-colors">
            <div className="text-xs font-medium text-gray-600 mb-1">{metrics.marketing.label}</div>
            <div className="text-sm font-semibold text-gray-900">{metrics.marketing.value}</div>
          </div>
          
          {/* Sales */}
          <div className="border border-blue-200 rounded-lg p-3 bg-blue-50/30 hover:bg-blue-50/50 transition-colors">
            <div className="text-xs font-medium text-gray-600 mb-1">{metrics.sales.label}</div>
            <div className="flex items-center gap-1">
              <div className="text-sm font-semibold text-gray-900">{metrics.sales.value}</div>
              {metrics.sales.change && (
                <span className={`text-xs font-medium ${metrics.sales.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ({metrics.sales.change > 0 ? '+' : ''}{metrics.sales.change}%)
                </span>
              )}
            </div>
          </div>
          
          {/* Product */}
          <div className="border border-blue-200 rounded-lg p-3 bg-blue-50/30 hover:bg-blue-50/50 transition-colors">
            <div className="text-xs font-medium text-gray-600 mb-1">{metrics.product.label}</div>
            <div className="text-sm font-semibold text-gray-900">{metrics.product.value}</div>
          </div>
          
          {/* Support */}
          <div className="border border-blue-200 rounded-lg p-3 bg-blue-50/30 hover:bg-blue-50/50 transition-colors">
            <div className="text-xs font-medium text-gray-600 mb-1">{metrics.support.label}</div>
            <div className="text-sm font-semibold text-gray-900">{metrics.support.value}</div>
          </div>
        </div>

        {/* Assignment & Priority - Removed Blue Background */}
        <div className="border-t pt-4 mt-auto">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">Assigned: <span className="font-medium">{assignedTo}</span></span>
            <div className="flex items-center gap-1">
              <span className="text-gray-700">Priority:</span>
              <span className={`font-medium ${priorityColors[priority]}`}>{priority}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-lg transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} pointer-events-none`} />
    </div>
  );
}