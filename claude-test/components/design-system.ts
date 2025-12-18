// Design System for Premium Dashboard
export const COLORS = {
  primary: {
    50: '#EBF8FF',
    100: '#BEE3F8',
    500: '#3182CE',
    600: '#2B77CB',
    700: '#2C5282',
  },
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  
  // Background Colors
  background: '#F8FAFC',
  surface: '#FFFFFF',
  
  // Text Colors
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  
  // Status Colors
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
  },
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
  },
} as const;

export const CLIENT_THEMES = {
  ENIES: {
    primary: '#dc2626',    // red-600
    bg: '#fef2f2',         // red-50
    border: '#fecaca',     // red-200
    accent: '#dc2626',     // red-600
  },
  BUNQQI: {
    primary: '#059669',    // emerald-600
    bg: '#ecfdf5',         // emerald-50
    border: '#a7f3d0',     // emerald-200
    accent: '#059669',     // emerald-600
  },
  TRIPIDS: {
    primary: '#d97706',    // amber-600
    bg: '#fffbeb',         // amber-50
    border: '#fde68a',     // amber-200
    accent: '#d97706',     // amber-600
  },
} as const;

export const TYPOGRAPHY = {
  // Headings
  heading1: 'text-3xl font-bold tracking-tight',
  heading2: 'text-2xl font-semibold tracking-tight',
  heading3: 'text-xl font-semibold',
  heading4: 'text-lg font-semibold',
  
  // Body text
  body: 'text-base',
  bodySmall: 'text-sm',
  caption: 'text-xs',
  
  // Specialized
  label: 'text-sm font-medium',
  button: 'text-sm font-medium',
  
  // Letter spacing
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
} as const;

export const SPACING = {
  // Component spacing
  componentGap: 'gap-8',
  sectionGap: 'gap-12',
  
  // Padding
  cardPadding: 'p-8',
  buttonPadding: 'px-6 py-3',
  inputPadding: 'px-4 py-3',
  
  // Margins
  elementMargin: 'mb-6',
  sectionMargin: 'mb-12',
} as const;

export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  // Premium card shadows
  card: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  cardHover: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  premium: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  // UI Component shadows
  header: 'shadow-sm',
  input: 'shadow-sm',
  inputFocus: 'shadow-md',
  avatar: 'shadow-sm',
} as const;

export const RADIUS = {
  none: '0',
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '9999px',
} as const;

export const ANIMATIONS = {
  // Transitions
  fast: 'transition-all duration-150 ease-in-out',
  normal: 'transition-all duration-200 ease-in-out',
  slow: 'transition-all duration-300 ease-in-out',
  
  // Hover effects
  hover: 'hover:scale-105 hover:shadow-lg',
  hoverSubtle: 'hover:shadow-md hover:-translate-y-0.5',
  
  // Focus effects
  focus: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
} as const;

// Helper functions
export const getClientTheme = (clientName: string) => {
  const upperName = clientName.toUpperCase();
  return CLIENT_THEMES[upperName as keyof typeof CLIENT_THEMES] || CLIENT_THEMES.TRIPIDS;
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'healthy':
    case 'good':
      return COLORS.success[500];
    case 'warning':
    case 'moderate':
      return COLORS.warning[500];
    case 'critical':
    case 'poor':
    case 'inactive':
      return COLORS.error[500];
    default:
      return COLORS.gray[500];
  }
};

export const getHealthScoreColor = (score: number) => {
  if (score >= 80) return COLORS.success[500];
  if (score >= 60) return COLORS.warning[500];
  return COLORS.error[500];
};
