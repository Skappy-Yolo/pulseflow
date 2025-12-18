import { Client, StatData, Notification, Language } from '../types/index';
import { COLORS } from './colors';

export const CLIENTS_DATA: Client[] = [
  {
    client: 'ENIES',
    color: COLORS.clients.enies.primary,
    healthScore: 45,
    status: 'Critical',
    trend: { type: 'negative', text: 'Marketing - Sales dropped 15%' },
    metrics: {
      category: 'EdTech',
      users: '33,471 Users',
      mrr: 'MRR: €950K',
      assigned: 'Kenny M.',
      priority: 'High',
      details: [
        { label: 'Marketing', value: '600 leads' },
        { label: 'Sales', value: '45 deals (10%)' },
        { label: 'Product', value: '2 active' },
        { label: 'Support', value: '1 ticket' }
      ]
    }
  },
  {
    client: 'Bunqqi',
    color: COLORS.clients.bunqqi.primary,
    healthScore: 94,
    status: 'Excellent',
    trend: { type: 'positive', text: 'All Systems Performing Well' },
    metrics: {
      category: 'FinTech',
      users: '2,904 Users',
      mrr: 'MRR: €470K',
      assigned: 'Emmanuel O.',
      priority: 'Low',
      details: [
        { label: 'Marketing', value: '402 leads' },
        { label: 'Sales', value: '178 deals (42%)' },
        { label: 'Product', value: '43 active' },
        { label: 'Support', value: '2 tickets' }
      ]
    }
  },
  {
    client: 'Tripids',
    color: COLORS.clients.tripids.primary,
    healthScore: 78,
    status: 'Good',
    trend: { type: 'warning', text: 'Product Adoption below target' },
    metrics: {
      category: 'E-commerce',
      users: '11,182 Users',
      mrr: 'MRR: €610K',
      assigned: 'Dieter Van De Bronc',
      priority: 'Medium',
      details: [
        { label: 'Marketing', value: '320 leads' },
        { label: 'Sales', value: '47 deals (15%)' },
        { label: 'Product', value: '18 active' },
        { label: 'Support', value: '4 tickets' }
      ]
    }
  }
];

export const STATS_DATA: StatData[] = [
  { 
    icon: 'Users', 
    label: 'Total Clients', 
    value: '6', 
    color: COLORS.primary[500], 
    bgColor: COLORS.primary[50] 
  },
  { 
    icon: 'CheckCircle', 
    label: 'Average Health', 
    value: '81', 
    color: COLORS.status.excellent[600], 
    bgColor: COLORS.status.excellent[50] 
  },
  { 
    icon: 'AlertTriangle', 
    label: 'Critical', 
    value: '6', 
    color: COLORS.status.critical[600], 
    bgColor: COLORS.status.critical[50] 
  },
  { 
    icon: 'Bell', 
    label: 'Active Alerts', 
    value: '10', 
    color: COLORS.status.warning[600], 
    bgColor: COLORS.status.warning[50] 
  },
];

export const NOTIFICATIONS_DATA: Notification[] = [
  {
    id: 1,
    type: 'payment',
    title: '€ 500 (June Payment) received from Tripids',
    time: '5 min ago',
    icon: '💰',
    color: 'text-green-600'
  },
  {
    id: 2,
    type: 'mention',
    title: 'Emmanuel tagged you in "Investigating Support ticket spike detected- Bunqqi"',
    time: '1 day ago', 
    icon: '👤',
    color: 'text-blue-600'
  },
  {
    id: 3,
    type: 'alert',
    title: 'Critical: Product Churn (-34%)',
    subtitle: 'Tripids',
    time: '2 days ago',
    icon: '⚠️', 
    color: 'text-red-600'
  },
  {
    id: 4,
    type: 'reminder',
    title: "Reminder: ENIES's Quarterly business review prep (meeting Wednesday, 25th July, 2025)",
    subtitle: 'Personal note',
    time: '1 week ago',
    icon: '📅',
    color: 'text-blue-600'
  }
];

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];