// Enhanced Design System for PulseFlow Premium Dashboard

export const COLORS = {
  // Primary Brand Colors
  primary: {
    50: '#EEF4FF',
    100: '#E0ECFF',
    500: '#005CE8',
    600: '#0056D6',
    700: '#004BC4',
  },
  
  // Status Colors (Enhanced)
  status: {
    critical: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C',
      text: '#991B1B',
    },
    excellent: {
      50: '#ECFDF5',
      100: '#D1FAE5',
      500: '#10B981',
      600: '#059669',
      700: '#047857',
      text: '#065F46',
    },
    warning: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      text: '#92400E',
    },
    info: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      text: '#1E40AF',
    }
  },
  
  // Neutral Colors (Professional)
  gray: {
    25: '#FCFCFD',
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
  background: {
    primary: '#F8FAFC',
    secondary: '#FFFFFF',
    elevated: '#FFFFFF',
    overlay: 'rgba(15, 23, 42, 0.6)',
  },
  
  // Text Colors
  text: {
    primary: '#0F172A',
    secondary: '#64748B',
    tertiary: '#94A3B8',
    inverse: '#FFFFFF',
  },
  
  // Border Colors
  border: {
    light: '#F1F5F9',
    default: '#E2E8F0',
    strong: '#CBD5E1',
  },
  
  // Client-specific colors
  clients: {
    tripids: {
      primary: '#F59E0B',
      light: '#FEF3C7',
      border: '#F59E0B',
    },
    enies: {
      primary: '#EF4444',
      light: '#FEE2E2',
      border: '#EF4444',
    },
    bunqqi: {
      primary: '#10B981',
      light: '#D1FAE5',
      border: '#10B981',
    },
  }
} as const;

export const TYPOGRAPHY = {
  fontFamily: {
    sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
  },
  
  fontSize: {
    xs: ['12px', { lineHeight: '16px', letterSpacing: '0.025em' }],
    sm: ['14px', { lineHeight: '20px', letterSpacing: '0.025em' }],
    base: ['16px', { lineHeight: '24px', letterSpacing: '0' }],
    lg: ['18px', { lineHeight: '28px', letterSpacing: '-0.025em' }],
    xl: ['20px', { lineHeight: '28px', letterSpacing: '-0.025em' }],
    '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.025em' }],
    '3xl': ['30px', { lineHeight: '36px', letterSpacing: '-0.025em' }],
    '4xl': ['36px', { lineHeight: '40px', letterSpacing: '-0.05em' }],
    '5xl': ['48px', { lineHeight: '52px', letterSpacing: '-0.05em' }],
    '6xl': ['60px', { lineHeight: '64px', letterSpacing: '-0.05em' }],
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
} as const;

export const SHADOWS = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  base: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  
  // Custom shadows for cards
  card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  cardHover: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  cardElevated: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

export const RADIUS = {
  none: '0',
  xs: '2px',
  sm: '4px',
  base: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
} as const;

export const SPACING = {
  px: '1px',
  0: '0',
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
} as const;

export const LAYOUT = {
  // Sidebar
  sidebar: {
    width: '280px',
    collapsedWidth: '72px',
  },
  
  // Header
  header: {
    height: '72px',
  },
  
  // Container max widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    full: '100%',
  },
  
  // Grid system
  grid: {
    gap: {
      sm: '16px',
      md: '24px',
      lg: '32px',
    },
    columns: {
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      12: 'repeat(12, minmax(0, 1fr))',
    }
  },
} as const;

// Component-specific design tokens
export const COMPONENTS = {
  // Cards
  card: {
    padding: {
      sm: '16px',
      md: '20px',
      lg: '24px',
      xl: '32px',
    },
    radius: RADIUS.xl,
    shadow: SHADOWS.card,
    shadowHover: SHADOWS.cardHover,
    border: `1px solid ${COLORS.border.default}`,
    background: COLORS.background.secondary,
  },
  
  // Buttons
  button: {
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
    padding: {
      sm: '8px 16px',
      md: '12px 20px',
      lg: '16px 24px',
    },
    radius: RADIUS.lg,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  
  // Inputs
  input: {
    height: '40px',
    padding: '12px 16px',
    radius: RADIUS.lg,
    border: `1px solid ${COLORS.border.default}`,
    background: COLORS.background.secondary,
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  
  // Charts
  chart: {
    colors: {
      primary: COLORS.primary[500],
      secondary: COLORS.status.warning[500],
      tertiary: COLORS.status.excellent[500],
      grid: COLORS.gray[200],
      text: COLORS.text.secondary,
    }
  },
  
  // Health Scores
  healthScore: {
    fontSize: {
      large: '48px',
      medium: '36px',
      small: '24px',
    },
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    colors: {
      excellent: COLORS.status.excellent[600],
      good: COLORS.status.warning[600],
      critical: COLORS.status.critical[600],
    }
  },
  
  // Trends
  trend: {
    colors: {
      positive: COLORS.status.excellent[600],
      negative: COLORS.status.critical[600],
      neutral: COLORS.text.secondary,
    }
  }
} as const;

// Animation and transitions
export const ANIMATION = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  }
} as const;

// Utility functions
export const getClientTheme = (clientName: string) => {
  const client = clientName.toLowerCase();
  if (client.includes('tripids')) return COLORS.clients.tripids;
  if (client.includes('enies')) return COLORS.clients.enies;
  if (client.includes('bunqqi')) return COLORS.clients.bunqqi;
  return COLORS.primary;
};

export const getHealthScoreColor = (score: number) => {
  if (score >= 80) return COLORS.status.excellent[600];
  if (score >= 60) return COLORS.status.warning[600];
  return COLORS.status.critical[600];
};

export const getStatusColor = (status: string) => {
  const statusLower = status.toLowerCase();
  if (statusLower.includes('excellent') || statusLower.includes('good')) {
    return COLORS.status.excellent;
  }
  if (statusLower.includes('warning') || statusLower.includes('medium')) {
    return COLORS.status.warning;
  }
  if (statusLower.includes('critical') || statusLower.includes('danger')) {
    return COLORS.status.critical;
  }
  return COLORS.status.info;
};