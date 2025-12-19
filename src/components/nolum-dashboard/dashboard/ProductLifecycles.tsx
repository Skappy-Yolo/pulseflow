import { useState } from "react";
import { ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "motion/react";

interface BarData {
  label: string;
  value: number;
  color: string;
  trend?: 'up' | 'down' | 'stable';
  change?: string;
}

interface LifecycleStage {
  title: string;
  subtitle: string;
  ranking: string;
  client: string;
  backgroundColor: string;
  borderColor: string;
  bars: BarData[];
}

interface TooltipData {
  x: number;
  y: number;
  label: string;
  value: number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
}

export function ProductLifecycles() {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  const lifecycleData: LifecycleStage[] = [
    {
      title: "Marketing → Sales",
      subtitle: "Lead Generation & Conversion",
      ranking: "ranks 3rd of 5 similar clients",
      client: "ENIES",
      backgroundColor: "bg-blue-50/40",
      borderColor: "border-blue-100",
      bars: [
        { label: "Lead Quality", value: 78, color: "#3b82f6", trend: 'up', change: "+12%" },
        { label: "Conversion Rate", value: 45, color: "#60a5fa", trend: 'down', change: "-8%" },
        { label: "Cost Per Lead", value: 62, color: "#93c5fd", trend: 'stable', change: "±2%" },
        { label: "Funnel Efficiency", value: 85, color: "#dbeafe", trend: 'up', change: "+15%" }
      ]
    },
    {
      title: "Sales → Product",
      subtitle: "Deal Closure & Onboarding",
      ranking: "ranks 1st of 5 similar clients",
      client: "Bunqqi",
      backgroundColor: "bg-emerald-50/40",
      borderColor: "border-emerald-100",
      bars: [
        { label: "Close Rate", value: 92, color: "#10b981", trend: 'up', change: "+18%" },
        { label: "Deal Size", value: 87, color: "#34d399", trend: 'up', change: "+25%" },
        { label: "Sales Cycle", value: 76, color: "#6ee7b7", trend: 'stable', change: "±3%" },
        { label: "Onboarding Speed", value: 94, color: "#a7f3d0", trend: 'up', change: "+22%" }
      ]
    },
    {
      title: "Product → Support",
      subtitle: "User Retention & Satisfaction",
      ranking: "ranks 2nd of 5 similar clients",
      client: "Tripids",
      backgroundColor: "bg-amber-50/40",
      borderColor: "border-amber-100",
      bars: [
        { label: "User Retention", value: 83, color: "#f59e0b", trend: 'up', change: "+9%" },
        { label: "Support Tickets", value: 35, color: "#fbbf24", trend: 'down', change: "-15%" },
        { label: "Feature Adoption", value: 71, color: "#fcd34d", trend: 'stable', change: "±1%" },
        { label: "NPS Score", value: 89, color: "#fde68a", trend: 'up', change: "+11%" }
      ]
    }
  ];

  const handleBarHover = (bar: BarData, event: React.MouseEvent, stageIndex: number) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      label: bar.label,
      value: bar.value,
      change: bar.change,
      trend: bar.trend
    });
    setHoveredStage(stageIndex);
  };

  const handleBarLeave = () => {
    setTooltip(null);
    setHoveredStage(null);
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-600" />;
      case 'stable':
        return <Minus className="h-3 w-3 text-gray-500" />;
      default:
        return null;
    }
  };

  const getTrendColor = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-gray-100">
        <h3 className="text-base font-medium text-[#191b1c]">Product Lifecycles</h3>
        <p className="text-sm text-[#626c70] mt-1">Stage performance and conversion metrics</p>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {/* Lifecycle Stages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {lifecycleData.map((stage, stageIndex) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stageIndex * 0.1 }}
              className={`relative rounded-lg border ${stage.borderColor} ${stage.backgroundColor} p-4 transition-all duration-300 hover:shadow-md ${
                hoveredStage === stageIndex ? 'scale-[1.02]' : ''
              }`}
            >
              {/* Stage Header */}
              <div className="mb-4">
                <h4 className="font-medium text-[#191b1c] mb-1">{stage.title}</h4>
                <p className="text-xs text-[#626c70] mb-2">{stage.subtitle}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#626c70]">{stage.ranking}</span>
                  <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition-colors">
                    See {stage.client} overview
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Bar Charts */}
              <div className="space-y-3">
                {stage.bars.map((bar, barIndex) => (
                  <div key={bar.label} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#626c70]">{bar.label}</span>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(bar.trend)}
                        <span className={`text-xs font-medium ${getTrendColor(bar.trend)}`}>
                          {bar.change}
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      {/* Background bar */}
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        {/* Animated progress bar */}
                        <motion.div
                          className="h-full rounded-full cursor-pointer transition-all duration-300 hover:brightness-110"
                          style={{ backgroundColor: bar.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${bar.value}%` }}
                          transition={{ 
                            duration: 1, 
                            delay: (stageIndex * 0.1) + (barIndex * 0.1),
                            ease: "easeOut"
                          }}
                          onMouseEnter={(e) => handleBarHover(bar, e, stageIndex)}
                          onMouseLeave={handleBarLeave}
                        />
                      </div>
                      {/* Value label */}
                      <span className="absolute right-0 -top-4 text-xs font-medium text-[#191b1c]">
                        {bar.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100"
        >
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-[#191b1c] mb-1">Key Insights</h5>
              <p className="text-sm text-[#626c70] leading-relaxed">
                <strong className="text-[#191b1c]">Bunqqi</strong> shows exceptional performance in Sales → Product conversion with 92% close rate. 
                <strong className="text-[#191b1c]"> ENIES</strong> needs attention in lead conversion (-8%), while 
                <strong className="text-[#191b1c]"> Tripids</strong> maintains strong retention metrics. 
                Consider implementing Bunqqi's onboarding processes across other clients to improve overall conversion rates.
              </p>
            </div>
          </div>
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
          <div className="text-sm font-medium text-gray-900 mb-1">{tooltip.label}</div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-[#191b1c]">{tooltip.value}%</span>
            {tooltip.trend && (
              <div className="flex items-center gap-1">
                {getTrendIcon(tooltip.trend)}
                <span className={`text-xs font-medium ${getTrendColor(tooltip.trend)}`}>
                  {tooltip.change}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}