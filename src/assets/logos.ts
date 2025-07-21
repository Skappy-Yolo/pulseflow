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
  
  // Integration logos - Using inline SVG and reliable CDN URLs
  amplitude: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTAgMjBDMTAgMTUgMTUgMTAgMjAgMTBTMzAgMTUgMzAgMjBTMjUgMzAgMjAgMzBTMTAgMjUgMTAgMjBaIiBmaWxsPSIjMDA1NUZGIi8+Cjx0ZXh0IHg9IjQwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMzMzIj5BbXBsaXR1ZGU8L3RleHQ+Cjwvc3ZnPg==",
  googleAnalytics: "/logos/google-analytics-1 1.png",
  mixpanel: "/logos/Mixpanel.png",
  stripe: "/logos/Stripe.png",
  twilio: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTAgMjBDMTAgMTUgMTUgMTAgMjAgMTBTMzAgMTUgMzAgMjBTMjUgMzAgMjAgMzBTMTAgMjUgMTAgMjBaIiBmaWxsPSIjRjIyRjQ2Ii8+Cjx0ZXh0IHg9IjQwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMzMzIj5Ud2lsaW88L3RleHQ+Cjwvc3ZnPg==",
} as const;

export type LogoKey = keyof typeof logos;
