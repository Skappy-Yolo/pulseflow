// Image assets - Production ready paths
export const images = {
  // Profile images - using uploaded profile pictures
  image21: "/images/profiles/Bunqqi.png",
  image23: "/images/profiles/ENIES.png", 
  profile1: "/images/profiles/Bunqqi.png",
  profile2: "/images/profiles/ENIES.png",
  profile3: "/images/profiles/Nolum.png",
  profile4: "/images/profiles/Bunqqi.png",
  
  // Content images - using uploaded "Did you know" images
  image19: "/images/Did you know 1.jpg",
  image20: "/images/Did you know 2.jpg",
  image9: "/images/Did you know 1.jpg",
  image10: "/images/Did you know 2.jpg",
  image11: "/images/Did you know 1.jpg",
  
  // SVG assets - MAIN PULSEFLOW LOGO (the real one!)
  heartbeatIcon: "/images/Heartbeat.svg", // This is the correct PulseFlow logo
  rectangle333: "/images/Heartbeat.svg",
  vector29: "/images/Heartbeat.svg", 
  vector28: "/images/Heartbeat.svg",
  
  // Integration logos - these are the real integration logos
  hubspot: "/logos/hubspot-1 2.svg",
  teams: "/logos/Microsoft_Office_Teams_(2018–present) 1.svg",
  zapier: "/logos/zapier 1.svg",
  googleCalendar: "/logos/Google_Calendar_icon_(2020) 1.svg",
  googleAnalytics: "/logos/google-analytics-1 1.png",
  zenBig: "/logos/ZEN_BIG 1.svg",
  slack: "/logos/Slack_icon_2019 1.svg",
  mixpanel: "/logos/Mixpanel.png",
  amplitude: "/logos/amplitude.png", 
  stripe: "/logos/Stripe.png",
  twilio: "/logos/twilio.png",
  microsoft: "/logos/microsoft.png",
  
  // For now these are placeholder until we restore the original images
  layer: "/images/Did you know 1.jpg", // Using uploaded image
  group1: "/images/Did you know 2.jpg", // Using uploaded image
  
  // UI elements - using placeholder paths for now
  checkCircle: "/images/profile1.svg", // Temporary placeholder
  checkCircleInner: "/images/profile1.svg", // Temporary placeholder
  warning: "/images/profile1.svg", // Temporary placeholder
  
  // Rectangles for client cards - using placeholder paths
  rectangle341: "/images/profile1.svg", // Temporary placeholder  
  rectangle342: "/images/profile1.svg", // Temporary placeholder
  rectangle343: "/images/profile1.svg", // Temporary placeholder
} as const;

export type ImageKey = keyof typeof images;
