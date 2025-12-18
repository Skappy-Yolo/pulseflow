import type { Colors } from '../types/index';
// Enhanced Design System with Public Sans
export const COLORS: Colors = {
    primary: {
        50: '#EEF4FF',
        100: '#E0ECFF',
        500: '#005CE8',
        600: '#0056D6',
        700: '#004BC4',
    },
    status: {
        critical: {
            50: '#FEF2F2',
            500: '#EF4444',
            600: '#DC2626',
            700: '#B91C1C',
        },
        excellent: {
            50: '#ECFDF5',
            500: '#10B981',
            600: '#059669',
            700: '#047857',
        },
        warning: {
            50: '#FFFBEB',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
        },
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
    clients: {
        tripids: { primary: '#F59E0B', light: '#FEF3C7' },
        enies: { primary: '#EF4444', light: '#FEE2E2' },
        bunqqi: { primary: '#10B981', light: '#D1FAE5' },
    }
};