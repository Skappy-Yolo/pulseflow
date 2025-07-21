// Image assets from Figma design - localhost development server
export const images = {
  // Profile images
  image21: "http://localhost:3845/assets/887b37d8e1cd19f08e1e4a5e54425d6358fb2e53.png",
  image23: "http://localhost:3845/assets/ded72534a52060375589106e4f9b1655a114109f.png",
  profile1: "http://localhost:3845/assets/1e0ec6ac49dc314e6f8240fca08cc72959172a83.png",
  profile2: "http://localhost:3845/assets/a10c45b6ba1bb2c1da54a215f833e7c01787b8e9.png",
  profile3: "http://localhost:3845/assets/f8334ba1dc4d17b04d50426e0ef6360edc7bde9c.png",
  profile4: "http://localhost:3845/assets/38dd706ca11e853a21fb9a8750337e9d4bdf06f7.png",
  
  // Content images
  image19: "http://localhost:3845/assets/0594108464847c241b714cff4c038fefe6b032b9.png",
  image20: "http://localhost:3845/assets/0121eceb05999d11b6559b6f534bcc94dc16284b.png",
  image9: "http://localhost:3845/assets/484934ba9da48ef834614ef18698bba94d643c45.png",
  image10: "http://localhost:3845/assets/52ea66409d95d8c3c6b56526ebe03d3961d123d5.png",
  image11: "http://localhost:3845/assets/8a1cca50e9d04f9a339168a0f4cd47e62ea7c1f2.png",
  
  // SVG assets
  heartbeatIcon: "http://localhost:3845/assets/13bb5e82232359e7b20bc12fbda25a9fd348d4f1.svg",
  rectangle333: "http://localhost:3845/assets/5a2cc10ffcb7d6dc13a4d07a99763278bbd15eb2.svg",
  vector29: "http://localhost:3845/assets/bc72498e1e3f75ede9fdf4592b890e958ee9d9d2.svg",
  vector28: "http://localhost:3845/assets/6b7bf36d5d04dfe20ab4f119762c09d7c1ff6a3e.svg",
  
  // Integration logos
  hubspot: "http://localhost:3845/assets/075e7f087408ba2b668b03633e4c2442e99701b9.svg",
  teams: "http://localhost:3845/assets/818506d7525e465ce517fad74dfab7429e7d571a.svg",
  zapier: "http://localhost:3845/assets/cdcb5deecf6eb13b461976de33cf3b3c7e711f43.svg",
  googleCalendar: "http://localhost:3845/assets/9fc3d5d34fab5c1ffbf7286276230c014db8763f.svg",
  googleAnalytics: "http://localhost:3845/assets/f82343c93fa4f12d228154b0488ff5138488345e.svg",
  zenBig: "http://localhost:3845/assets/d897113c60dd688d67da48b26e98f8c4e036e032.svg",
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
