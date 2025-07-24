// Image assets - Production ready paths
export const images = {
  // Profile images - using placeholder SVGs for now
  image21: "/images/profile1.svg",
  image23: "/images/profile1.svg", 
  profile1: "/images/profile1.svg",
  profile2: "/images/profile1.svg",
  profile3: "/images/profile1.svg",
  profile4: "/images/profile1.svg",
  
  // Content images - using placeholder SVGs for now
  image19: "/images/dashboard.svg",
  image20: "/images/analytics.svg",
  image9: "/images/dashboard.svg",
  image10: "/images/analytics.svg",
  image11: "/images/dashboard.svg",
  
  // SVG assets - MAIN PULSEFLOW LOGO (the real one!)
  heartbeatIcon: "/logos/Group 1329.svg", // This is the correct PulseFlow logo
  rectangle333: "/logos/Group 1329.svg",
  vector29: "/logos/Group 1329.svg", 
  vector28: "/logos/Group 1329.svg",
  
  // Integration logos - these are the real integration logos
  hubspot: "/logos/hubspot-1 2.svg",
  teams: "/logos/Microsoft_Office_Teams_(2018–present) 1.svg",
  zapier: "/logos/zapier 1.svg",
  googleCalendar: "/logos/Google_Calendar_icon_(2020) 1.svg",
  googleAnalytics: "/logos/google-analytics-1 1.png",
  zenBig: "/logos/ZEN_BIG 1.svg",
  slack: "/logos/Slack_icon_2019 1.svg", // Fixed path
  
  // For now these are placeholder until we restore the original images
  layer: "/images/dashboard.svg", // Temporary placeholder
  group1: "/images/analytics.svg", // Temporary placeholder
  
  // UI elements
  checkCircle: "/images/check-circle.svg",
  checkCircleInner: "/images/check-circle-inner.svg", 
  warning: "/images/warning.svg",
  
  // Rectangles for client cards
  rectangle341: "/images/rectangle341.svg",
  rectangle342: "/images/rectangle342.svg",
  rectangle343: "/images/rectangle343.svg",
} as const;

export type ImageKey = keyof typeof images;
