// Logo assets from local logos folder
export const logos = {
  // Dashboard images
  forConsultants: "/logos/For Consultants.png",
  forExecutives: "/logos/For Executives.png",
  
  // Integration logos - SVG
  crm: "/logos/CRM 1.svg",
  googleCalendar: "/logos/Google_Calendar_icon_(2020) 1.svg",
  group1329: "/logos/Group 1329.svg",
  hubspot: "/logos/hubspot-1 2.svg",
  teams: "/logos/Microsoft_Office_Teams_(2018–present) 1.svg",
  slack: "/logos/Slack_icon_2019 1.svg",
  zapier: "/logos/zapier 1.svg",
  zenBig: "/logos/ZEN_BIG 1.svg",
  
  // Integration logos - Using reliable CDN URLs for better logos
  amplitude: "https://img.icons8.com/color/96/amplitude.png",
  googleAnalytics: "/logos/google-analytics-1 1.png",
  mixpanel: "/logos/Mixpanel.png",
  stripe: "/logos/Stripe.png",
  twilio: "https://img.icons8.com/color/96/twilio.png",
} as const;

export type LogoKey = keyof typeof logos;
