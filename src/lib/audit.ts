// src/lib/audit.ts
// Utility for writing audit logs to Supabase
import { supabase } from './supabase';

export type AuditAction =
  | 'customer_status_changed'
  | 'customer_assigned'
  | 'customer_demo_scheduled';

export interface AuditLog {
  id?: string;
  adminUserId: string;
  adminEmail: string;
  action: AuditAction;
  targetType: 'customer_user';
  targetId: string;
  details: Record<string, any>;
  createdAt?: string;
}

export async function logAudit({ adminUserId, adminEmail, action, targetId, details }: Omit<AuditLog, 'id' | 'createdAt' | 'targetType'>) {
  return supabase.from('admin_audit_logs').insert([
    {
      adminUserId,
      adminEmail,
      action,
      targetType: 'customer_user',
      targetId,
      details,
      createdAt: new Date().toISOString(),
    },
  ]);
}
