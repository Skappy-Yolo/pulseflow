import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Activity } from "lucide-react";
import { useState } from "react";

interface FunnelStageProps {
  label: string;
  current: number;
  goal: number;
  color: string;
}

function FunnelStage({ label, current, goal, color }: FunnelStageProps) {
  const percentage = Math.round((current / goal) * 100);
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-[#191b1c]">{label}</span>
        <span className="text-sm text-[#626c70]">
          {current.toLocaleString()} <span className="text-xs text-[#959fa3]">(out of {goal.toLocaleString()})</span>
        </span>
      </div>
      <div 
        className="relative h-4 bg-gray-100 rounded-full overflow-visible cursor-pointer transition-all hover:h-5"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div 
          className="h-full rounded-full transition-all duration-300 shadow-sm"
          style={{ 
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: color
          }}
        />
        {showTooltip && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg">
            {percentage}% of monthly goal
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ExecutiveOverview() {
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#006aff]">ENIES</h1>
        </div>
        <div className="text-sm text-[#626c70]">
          <p>Last updated: 2 minutes ago</p>
          <p>Next sync: 3:45 PM</p>
        </div>
      </div>

      {/* Critical Alert Banner */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xl text-[#626c70] mb-2">Product Lifecycle Health Overview</p>
            <div className="flex items-center gap-4">
              <div className="text-6xl md:text-8xl font-semibold text-[#ffbf00]">78%</div>
              <div className="flex items-center gap-2 text-[#e84646]">
                <AlertTriangle className="h-6 w-6" />
                <p className="text-lg font-medium">2 Critical Issues Requiring Immediate Attention</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        {/* Marketing */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-2xl">
              📱
            </div>
            <div>
              <p className="text-sm text-[#626c70]">MARKETING</p>
              <p className="text-xs text-[#626c70]">5.3%</p>
            </div>
          </div>
          <p className="text-2xl font-semibold text-[#15ad01] mb-1">850 leads</p>
          <div className="flex items-center gap-1 text-[#308b05] text-sm mt-2 bg-green-50 rounded-lg px-3 py-1.5 w-fit">
            <TrendingUp className="h-4 w-4" />
            <span>+12% this week</span>
          </div>
        </div>

        {/* Sales */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center text-2xl">
              💼
            </div>
            <div>
              <p className="text-sm text-[#626c70]">SALES</p>
              <p className="text-xs text-[#626c70]">26.7%</p>
            </div>
          </div>
          <p className="text-2xl font-semibold text-[#e84646] mb-1">227 opps</p>
          <div className="flex items-center gap-1 text-[#e84646] text-sm mt-2 bg-red-50 rounded-lg px-3 py-1.5 w-fit">
            <TrendingDown className="h-4 w-4" />
            <span>-15% drop</span>
          </div>
        </div>

        {/* Product Usage */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-2xl">
              ⚡
            </div>
            <div>
              <p className="text-sm text-[#626c70]">PRODUCT</p>
              <p className="text-xs text-[#626c70]">65%</p>
            </div>
          </div>
          <p className="text-2xl font-semibold text-[#15ad01] mb-1">2,180 active</p>
          <div className="flex items-center gap-1 text-[#308b05] text-sm mt-2 bg-green-50 rounded-lg px-3 py-1.5 w-fit">
            <TrendingUp className="h-4 w-4" />
            <span>+8% growth</span>
          </div>
        </div>

        {/* Customer Success */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center text-2xl">
              🎯
            </div>
            <div>
              <p className="text-sm text-[#626c70]">CS HEALTH</p>
              <p className="text-xs text-[#626c70]">92%</p>
            </div>
          </div>
          <p className="text-2xl font-semibold text-[#15ad01] mb-1">Excellent</p>
          <div className="flex items-center gap-1 text-[#308b05] text-sm mt-2 bg-green-50 rounded-lg px-3 py-1.5 w-fit">
            <CheckCircle className="h-4 w-4" />
            <span>Stable</span>
          </div>
        </div>
      </div>

      {/* Funnel Performance Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#191b1c]">Full Funnel Performance</h2>
          <span className="text-sm text-[#626c70] bg-gray-100 px-3 py-1 rounded-full">{currentMonth}</span>
        </div>
        <div className="space-y-4">
          {/* Awareness */}
          <FunnelStage label="Awareness" current={15240} goal={20000} color="#005CE8" />

          {/* Interest */}
          <FunnelStage label="Interest" current={4572} goal={6000} color="#005CE8" />

          {/* Consideration */}
          <FunnelStage label="Consideration" current={1829} goal={3000} color="#ffbf00" />

          {/* Intent */}
          <FunnelStage label="Intent" current={412} goal={500} color="#ff8e00" />

          {/* Purchase */}
          <FunnelStage label="Purchase" current={187} goal={200} color="#15ad01" />
        </div>
      </div>

      {/* Critical Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-[#e84646]" />
            <h3 className="font-semibold text-[#191b1c]">Critical Bottlenecks</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-[#e84646] mt-0.5">•</span>
              <div>
                <p className="font-medium text-[#191b1c]">Marketing → Sales Conversion Drop</p>
                <p className="text-sm text-[#626c70]">15% decrease in trial signups over past 7 days</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#e84646] mt-0.5">•</span>
              <div>
                <p className="font-medium text-[#191b1c]">Onboarding Completion Rate</p>
                <p className="text-sm text-[#626c70]">Only 42% of new users complete setup flow</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-[#15ad01]" />
            <h3 className="font-semibold text-[#191b1c]">Top Performers</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-[#15ad01] mt-0.5">•</span>
              <div>
                <p className="font-medium text-[#191b1c]">Product Engagement</p>
                <p className="text-sm text-[#626c70]">Daily active users up 8% week-over-week</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#15ad01] mt-0.5">•</span>
              <div>
                <p className="font-medium text-[#191b1c]">Lead Generation</p>
                <p className="text-sm text-[#626c70]">Marketing qualified leads increased 12%</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}