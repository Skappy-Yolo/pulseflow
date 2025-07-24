// Image assets - Production ready paths
export const images = {
  // Profile images - using placeholder SVGs
  image21: "/images/profile1.svg",
  image23: "/images/profile1.svg", 
  profile1: "/images/profile1.svg",
  profile2: "/images/profile1.svg",
  profile3: "/images/profile1.svg",
  profile4: "/images/profile1.svg",
  
  // Content images - using placeholder SVGs
  image19: "/images/dashboard.svg",
  image20: "/images/analytics.svg",
  image9: "/images/dashboard.svg",
  image10: "/images/analytics.svg",
  image11: "/images/dashboard.svg",
  
  // SVG assets - using available logos
  heartbeatIcon: "/logos/Group 1329.svg", // PulseFlow icon
  rectangle333: "/logos/Group 1329.svg",
  vector29: "/logos/Group 1329.svg", 
  vector28: "/logos/Group 1329.svg",
  
  // Integration logos - using existing files
  hubspot: "/logos/hubspot-1 2.svg",
  teams: "/logos/Microsoft_Office_Teams_(2018–present) 1.svg",
  zapier: "/logos/zapier 1.svg",
  googleCalendar: "/logos/Google_Calendar_icon_(2020) 1.svg",
  googleAnalytics: "/logos/google-analytics-1 1.png",
  zenBig: "/logos/ZEN_BIG 1.svg",
  layer: "http://localhost:3845/assets/4f0699afe3701247a8a304ebe691c63cf9179c11.svg",
  group1: "http://localhost:3845/assets/e1ea3b4b0fdb8376490d30653a0fd2cbc4c553a2.svg",
  slack: "http://localhost:3845/assets/c48b75178f4704fe47c7b0093f222a1319dc8f84.svg",
  
  // UI elements
  checkCircle: "http://localhost:3845/assets/2ebf1b4d037f823ffce000f6c3337e8e5e87221b.svg",
  checkCircleInner: "http://localhost:3845/assets/82e83abcd2932ddce59ad9766ed5eade99aec03e.svg",
  warning: "http://localhost:3845/assets/fb5b929dcaa236429a82d92031ce7d9aa5424589.svg",
  
  // Rectangles for client cards
  rectangle341: "http://localhost:3845/assets/aec6056360de0a9d9aced4f13e7922469826bd26.svg",
  rectangle342: "http://localhost:3845/assets/a149c52abcc53265b2109aa7eca12f7166d94891.svg",
  rectangle343: "http://localhost:3845/assets/3e1b4987cd0dd163d2f4b2e5acfcb56e8c93e730.svg",
} as const;

export type ImageKey = keyof typeof images;
