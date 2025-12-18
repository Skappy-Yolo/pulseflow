// Design System Constants for PulseFlow Consultant Dashboard
// Extracted from Figma design

export const COLORS = {
  // Primary Brand Colors
  primary: '#005CE8',
  primaryHover: '#0056D6',
  primaryLight: '#E8F2FF',
  
  // Status Colors
  success: '#10B981',
  successLight: '#ECFDF5',
  warning: '#F59E0B',
  warningLight: '#FFFBEB',
  danger: '#EF4444',
  dangerLight: '#FEF2F2',
  
  // Neutral Colors
  slate: {
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
  
  // Border Colors
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
} as const;

// CLIENT-SPECIFIC PREMIUM THEMES
export const CLIENT_THEMES = {
  ENIES: {
    primary: '#EF4444',
    light: '#FEF2F2',
    border: '#FECACA',
    text: '#991B1B',
    accent: '#DC2626',
    status: 'critical'
  },
  BUNQQI: {
    primary: '#10B981',
    light: '#ECFDF5',
    border: '#A7F3D0',
    text: '#065F46',
    accent: '#059669',
    status: 'excellent'
  },
  TRIPIDS: {
    primary: '#F59E0B',
    light: '#FFFBEB',
    border: '#FDE68A',
    text: '#92400E',
    accent: '#D97706',
    status: 'good'
  }
} as const;

export const SPACING = {
  // Base spacing unit (4px)
  unit: 4,
  
  // Specific spacing values from Figma
  xs: '4px',    // 1 unit
  sm: '8px',    // 2 units
  md: '12px',   // 3 units
  lg: '16px',   // 4 units
  xl: '20px',   // 5 units
  '2xl': '24px', // 6 units
  '3xl': '32px', // 8 units
  '4xl': '40px', // 10 units
  '5xl': '48px', // 12 units
  '6xl': '64px', // 16 units
} as const;

export const TYPOGRAPHY = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  
  fontSize: {
    xs: ['12px', { lineHeight: '16px' }],
    sm: ['14px', { lineHeight: '20px' }],
    base: ['16px', { lineHeight: '24px' }],
    lg: ['18px', { lineHeight: '28px' }],
    xl: ['20px', { lineHeight: '28px' }],
    '2xl': ['24px', { lineHeight: '32px' }],
    '3xl': ['30px', { lineHeight: '36px' }],
    '4xl': ['36px', { lineHeight: '40px' }],
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
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

export const LAYOUT = {
  // Sidebar
  sidebarWidth: '280px',
  
  // Header
  headerHeight: '72px',
  
  // Container max widths
  maxWidth: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Grid gaps
  gridGap: {
    sm: '16px',
    md: '24px',
    lg: '32px',
  },
} as const;

// Component-specific design tokens
export const COMPONENTS = {
  card: {
    padding: '24px',
    borderRadius: RADIUS.lg,
    shadow: SHADOWS.sm,
    borderWidth: '1px',
  },
  
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
    borderRadius: RADIUS.base,
  },
  
  input: {
    height: '40px',
    padding: '12px 16px',
    borderRadius: RADIUS.base,
    borderWidth: '1px',
  },
} as const;

// PREMIUM HELPER FUNCTIONS
export const getClientTheme = (clientName: string) => {
  const normalizedName = clientName.toUpperCase();
  return CLIENT_THEMES[normalizedName as keyof typeof CLIENT_THEMES] || CLIENT_THEMES.ENIES;
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'critical':
      return {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        badge: 'bg-red-100 text-red-800',
        dot: 'bg-red-500'
      };
    case 'excellent':
      return {
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-200',
        badge: 'bg-green-100 text-green-800',
        dot: 'bg-green-500'
      };
    case 'good':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        badge: 'bg-amber-100 text-amber-800',
        dot: 'bg-amber-500'
      };
    default:
      return {
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        border: 'border-slate-200',
        badge: 'bg-slate-100 text-slate-800',
        dot: 'bg-slate-500'
      };
  }
};

export const getHealthScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-600';
};
