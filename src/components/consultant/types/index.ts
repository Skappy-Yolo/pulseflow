// Type definitions for the PulseFlow Dashboard

export interface ClientMetrics {
  category: string;
  users: string;
  mrr: string;
  assigned: string;
  priority: 'High' | 'Medium' | 'Low';
  details: Array<{
    label: string;
    value: string;
  }>;
}

export interface ClientTrend {
  type: 'positive' | 'negative' | 'warning';
  text: string;
}

export interface Client {
  client: string;
  color: string;
  healthScore: number;
  status: 'Critical' | 'Excellent' | 'Good' | 'Warning';
  trend: ClientTrend;
  metrics: ClientMetrics;
}

export interface StatData {
  icon: string; // Lucide icon name
  label: string;
  value: string;
  color: string;
  bgColor: string;
}

export interface Notification {
  id: number;
  type: 'payment' | 'mention' | 'alert' | 'reminder';
  title: string;
  subtitle?: string;
  time: string;
  icon: string;
  color: string;
}

export interface Language {
  code: 'en' | 'nl' | 'fr';
  name: string;
  flag: string;
}

export interface Translation {
  welcome: string;
  portfolioOverview: string;
  overallHealthScore: string;
  assignedTo: string;
  priority: string;
  fullOverview: string;
  marketing: string;
  sales: string;
  product: string;
  support: string;
  comparativePerformance: string;
  myClients: string;
  productLifecycles: string;
  thisYear: string;
}

export type Translations = {
  [K in Language['code']]: Translation;
};

export interface ColorPalette {
  50: string;
  100?: string;
  500: string;
  600: string;
  700: string;
}

export interface Colors {
  primary: ColorPalette;
  status: {
    critical: ColorPalette;
    excellent: ColorPalette;
    warning: ColorPalette;
  };
  gray: ColorPalette & {
    200: string;
    300: string;
    400: string;
    800: string;
    900: string;
  };
  clients: {
    tripids: { primary: string; light: string };
    enies: { primary: string; light: string };
    bunqqi: { primary: string; light: string };
  };
}

// Component Props Interfaces
export interface HeaderProps {
  language: Language['code'];
  setLanguage: (language: Language['code']) => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
}

export interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface ClientCardProps {
  client: string;
  color: string;
  healthScore: number;
  status: Client['status'];
  trend: ClientTrend;
  metrics: ClientMetrics;
  onViewClick: () => void;
  language: Language['code'];
}

export interface OverviewPageProps {
  setActiveTab: (tab: string) => void;
  language: Language['code'];
}

export interface ClientsPageProps {
  setActiveTab: (tab: string) => void;
}