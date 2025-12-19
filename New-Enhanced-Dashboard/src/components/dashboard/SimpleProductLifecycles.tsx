import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { motion } from "motion/react";

interface BarData {
  height: number;
  color: string;
  client: string;
  value: number;
}

interface LifecycleStage {
  title: string;
  client: string;
  ranking: string;
  bars: BarData[];
  bgColor: string;
}

interface TooltipData {
  x: number;
  y: number;
  client: string;
  value: number;
}

export function SimpleProductLifecycles() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Year");
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const periods = [
    "This Year",
    "Last Year", 
    "Last 6 Months",
    "Last 3 Months",
    "This Month"
  ];

  // Fixed ranking logic to match the image and descriptions
  const stageData: LifecycleStage[] = [
    {
      title: "Marketing → Sales",
      client: "Tripids",
      ranking: "Tripids ranks 3rd of 5 similar clients",
      bgColor: "bg-blue-50",
      bars: [
        { height: 85, color: "#0E5FD9", client: "Others", value: 85 },
        { height: 67, color: "#0FAF62", client: "Tripids", value: 67 },
        { height: 43, color: "#0E5FD9", client: "Others", value: 43 },
        { height: 72, color: "#0E5FD9", client: "Others", value: 72 },
        { height: 55, color: "#0E5FD9", client: "Others", value: 55 },
        { height: 47, color: "#0E5FD9", client: "Others", value: 47 }
      ]
    },
    {
      title: "Sales → Product",
      client: "ENIES",
      ranking: "ENIES ranks 5th of 5 similar clients",
      bgColor: "bg-orange-50",
      bars: [
        { height: 78, color: "#0E5FD9", client: "Others", value: 78 },
        { height: 35, color: "#f59e0b", client: "ENIES", value: 35 },
        { height: 88, color: "#0E5FD9", client: "Others", value: 88 },
        { height: 42, color: "#0E5FD9", client: "Others", value: 42 },
        { height: 95, color: "#0E5FD9", client: "Others", value: 95 },
        { height: 65, color: "#0E5FD9", client: "Others", value: 65 }
      ]
    },
    {
      title: "Product → Support",
      client: "Bunqqi",
      ranking: "Bunqqi ranks 1st of 5 similar clients",
      bgColor: "bg-gray-50",
      bars: [
        { height: 37, color: "#0E5FD9", client: "Others", value: 37 },
        { height: 52, color: "#0E5FD9", client: "Others", value: 52 },
        { height: 42, color: "#0E5FD9", client: "Others", value: 42 },
        { height: 32, color: "#0E5FD9", client: "Others", value: 32 },
        { height: 92, color: "#ef4444", client: "Bunqqi", value: 92 },
        { height: 47, color: "#0E5FD9", client: "Others", value: 47 }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-100">
        <h3 className="text-base font-medium text-[#191b1c]">Product Lifecycles</h3>
        
        {/* Period Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="bg-[#f5f6f7] h-8 px-3 gap-2 hover:bg-[#e5e7e8] transition-colors text-sm"
            >
              <span className="text-[#4a5154]">{selectedPeriod}</span>
              <ChevronDown className="h-4 w-4 text-[#4a5154]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {periods.map((period) => (
              <DropdownMenuItem 
                key={period} 
                onClick={() => setSelectedPeriod(period)}
                className={selectedPeriod === period ? "bg-[#f0f6ff]" : ""}
              >
                {period}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {/* Lifecycle Stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stageData.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${stage.bgColor} rounded-lg p-4 space-y-4`}
            >
              {/* Stage Title */}
              <h4 className="font-medium text-[#191b1c] text-center">{stage.title}</h4>
              
              {/* Bar Chart */}
              <div className="flex items-end justify-center gap-6 h-[149px] px-4">
                {stage.bars.map((bar, barIndex) => (
                  <div
                    key={barIndex}
                    className="relative w-8 h-full flex items-end justify-center"
                  >
                    {/* Background Container */}
                    <div className="absolute inset-0 bg-[#F0F6FF] rounded-full" />
                    
                    {/* Progress Bar */}
                    <motion.div
                      className="relative w-3 rounded-full cursor-pointer hover:brightness-110 transition-all duration-200 z-10"
                      style={{ 
                        backgroundColor: bar.color,
                        height: `${bar.height}%`
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${bar.height}%` }}
                      transition={{ 
                        duration: 0.8, 
                        delay: (index * 0.2) + (barIndex * 0.05),
                        ease: "easeOut"
                      }}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({
                          x: rect.left + rect.width / 2,
                          y: rect.top - 10,
                          client: bar.client,
                          value: bar.value
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  </div>
                ))}
              </div>
              
              {/* Ranking Text */}
              <p className="text-xs text-[#626c70] text-center">
                {stage.ranking}
              </p>
              
              {/* See Overview Button */}
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-7 px-3 text-xs bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  <ExternalLink className="h-3 w-3 mr-1.5" />
                  See {stage.client} overview
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Insight */}  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
        >
          <div className="h-2 w-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
          <p className="text-sm text-[#626c70] leading-relaxed">
            <span className="text-[#191b1c] font-medium">Bunqqi dominates in product support</span> while 
            <span className="text-red-600 font-medium"> ENIES struggles with sales conversion (5th place)</span>. 
            <span className="text-blue-600 font-medium"> Tripids shows steady mid-tier performance across marketing-to-sales funnel.</span>
          </p>
        </motion.div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bg-white border border-gray-200 rounded-lg shadow-lg p-3 pointer-events-none z-50"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="text-sm font-medium text-gray-900 mb-1">{tooltip.client}</div>
          <div className="text-lg font-semibold text-[#191b1c]">{tooltip.value}%</div>
        </motion.div>
      )}
    </div>
  );
}