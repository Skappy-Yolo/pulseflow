// Design Tokens - Extracted from Figma
// These should match your Figma design tokens exactly

export const tokens = {
  colors: {
    primary: {
      50: '#EBF2FF',
      100: '#D6E5FF',
      200: '#ADC9FF',
      300: '#85ADFF',
      400: '#5C91FF',
      500: '#005CE8',
      600: '#0049B8',
      700: '#003687',
      800: '#002356',
      900: '#001025',
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#191B1C',
    },
    success: {
      50: '#E6F9F0',
      500: '#0FAF62',
      900: '#032314',
    },
    danger: {
      50: '#FEF2F2',
      500: '#E84646',
      900: '#7F1D1D',
    },
    brandGreen: {
      50: '#E6F7ED',
      500: '#017737',
      900: '#00180B',
    },
    blue: {
      primary: '#1361f5',
      secondary: '#094bca',
    },
    white: '#FFFFFF',
    black: '#000000',
  },
  
  typography: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      publicSans: ['Public Sans', 'sans-serif'],
    },
    fontSize: {
      xs: { size: '12px', lineHeight: '16px' },
      sm: { size: '14px', lineHeight: '20px' },
      base: { size: '16px', lineHeight: '24px' },
      lg: { size: '18px', lineHeight: '28px' },
      xl: { size: '20px', lineHeight: '28px' },
      '2xl': { size: '24px', lineHeight: '32px' },
      '3xl': { size: '30px', lineHeight: '36px' },
      '4xl': { size: '36px', lineHeight: '40px' },
      '5xl': { size: '48px', lineHeight: '48px' },
      '6xl': { size: '60px', lineHeight: '60px' },
      '7xl': { size: '72px', lineHeight: '72px' },
    },
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
      adjust: '-1px', // Your custom spacing
    },
  },

  spacing: {
    0: '0px',
    px: '1px',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
    52: '208px',
    56: '224px',
    60: '240px',
    64: '256px',
    72: '288px',
    80: '320px',
    96: '384px',
  },

  borderRadius: {
    none: '0px',
    sm: '2px',
    default: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// Helper functions for consistent usage
export const getColor = (path: string) => {
  const keys = path.split('.');
  let value: any = tokens.colors;
  
  for (const key of keys) {
    value = value[key];
    if (value === undefined) return undefined;
  }
  
  return value;
};

export const getSpacing = (key: keyof typeof tokens.spacing) => {
  return tokens.spacing[key];
};

export const getFontSize = (key: keyof typeof tokens.typography.fontSize) => {
  return tokens.typography.fontSize[key];
};

export type ColorToken = keyof typeof tokens.colors;
export type SpacingToken = keyof typeof tokens.spacing;
export type FontSizeToken = keyof typeof tokens.typography.fontSize;
