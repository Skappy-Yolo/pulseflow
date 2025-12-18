// =============================================================================
// DASHBOARD DATA SERVICE
// =============================================================================
// Fetches dashboard data for the logged-in user's organization
// Returns empty states when no data exists (new clients)
// =============================================================================

import { supabase } from './supabase';

// Types
export interface DashboardUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationId: string;
  organizationName: string;
  customerType: 'consulting' | 'executive';
}

export interface ConsultantClient {
  id: string;
  clientName: string;
  clientLogoUrl?: string;
  industry?: string;
  status: 'active' | 'inactive' | 'at_risk' | 'churned';
  healthScore: number;
  totalProjects: number;
  activeProjects: number;
  openTickets: number;
  monthlyRevenue?: number;
  contractEndDate?: string;
}

export interface DashboardMetric {
  id: string;
  metricType: string;
  metricName: string;
  currentValue: number;
  previousValue?: number;
  changePercentage?: number;
  changeDirection?: 'up' | 'down' | 'stable';
}

export interface ExecutiveDepartment {
  id: string;
  departmentName: string;
  departmentHead?: string;
  healthScore: number;
  budgetUsed?: number;
  budgetTotal?: number;
  headcount: number;
  status: 'on_track' | 'at_risk' | 'behind' | 'ahead';
  kpis: Array<{ name: string; value: number; target?: number }>;
}

export interface Integration {
  id: string;
  integrationType: string;
  isConnected: boolean;
  connectedAt?: string;
  lastSyncAt?: string;
  syncStatus: 'never' | 'syncing' | 'success' | 'failed';
}

export interface DashboardActivity {
  id: string;
  activityType: string;
  title: string;
  description?: string;
  createdAt: string;
}

// =============================================================================
// DASHBOARD SERVICE
// =============================================================================

export class DashboardService {
  
  /**
   * Get the current user's dashboard info
   */
  static async getCurrentUser(): Promise<DashboardUser | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      // Get member and organization info
      const { data: member } = await supabase
        .from('organization_members')
        .select(`
          id,
          first_name,
          last_name,
          organization_id,
          customer_organizations (
            company_name,
            customer_type
          )
        `)
        .eq('auth_user_id', user.id)
        .single();

      if (!member) return null;

      const org = member.customer_organizations as any;

      return {
        id: member.id,
        email: user.email || '',
        firstName: member.first_name,
        lastName: member.last_name,
        organizationId: member.organization_id,
        organizationName: org?.company_name || 'Your Company',
        customerType: org?.customer_type || 'consulting'
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // ===========================================================================
  // CONSULTANT DASHBOARD DATA
  // ===========================================================================

  /**
   * Get consultant's client list
   */
  static async getConsultantClients(organizationId: string): Promise<ConsultantClient[]> {
    try {
      const { data, error } = await supabase
        .from('consultant_clients')
        .select('*')
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!data || data.length === 0) return [];

      return data.map(client => ({
        id: client.id,
        clientName: client.client_name,
        clientLogoUrl: client.client_logo_url,
        industry: client.industry,
        status: client.status,
        healthScore: client.health_score || 0,
        totalProjects: client.total_projects || 0,
        activeProjects: client.active_projects || 0,
        openTickets: client.open_tickets || 0,
        monthlyRevenue: client.monthly_revenue,
        contractEndDate: client.contract_end_date
      }));
    } catch (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
  }

  /**
   * Get consultant dashboard metrics
   */
  static async getConsultantMetrics(organizationId: string): Promise<{
    totalClients: number;
    activeClients: number;
    atRiskClients: number;
    totalRevenue: number;
    avgHealthScore: number;
  }> {
    try {
      const clients = await this.getConsultantClients(organizationId);
      
      if (clients.length === 0) {
        return {
          totalClients: 0,
          activeClients: 0,
          atRiskClients: 0,
          totalRevenue: 0,
          avgHealthScore: 0
        };
      }

      const activeClients = clients.filter(c => c.status === 'active').length;
      const atRiskClients = clients.filter(c => c.status === 'at_risk').length;
      const totalRevenue = clients.reduce((sum, c) => sum + (c.monthlyRevenue || 0), 0);
      const avgHealthScore = Math.round(
        clients.reduce((sum, c) => sum + c.healthScore, 0) / clients.length
      );

      return {
        totalClients: clients.length,
        activeClients,
        atRiskClients,
        totalRevenue,
        avgHealthScore
      };
    } catch (error) {
      console.error('Error calculating metrics:', error);
      return {
        totalClients: 0,
        activeClients: 0,
        atRiskClients: 0,
        totalRevenue: 0,
        avgHealthScore: 0
      };
    }
  }

  // ===========================================================================
  // EXECUTIVE DASHBOARD DATA
  // ===========================================================================

  /**
   * Get executive department list
   */
  static async getExecutiveDepartments(organizationId: string): Promise<ExecutiveDepartment[]> {
    try {
      const { data, error } = await supabase
        .from('executive_departments')
        .select('*')
        .eq('organization_id', organizationId)
        .order('department_name');

      if (error) throw error;
      if (!data || data.length === 0) return [];

      return data.map(dept => ({
        id: dept.id,
        departmentName: dept.department_name,
        departmentHead: dept.department_head,
        healthScore: dept.health_score || 0,
        budgetUsed: dept.budget_used,
        budgetTotal: dept.budget_total,
        headcount: dept.headcount || 0,
        status: dept.status,
        kpis: dept.kpis || []
      }));
    } catch (error) {
      console.error('Error fetching departments:', error);
      return [];
    }
  }

  /**
   * Get executive dashboard metrics
   */
  static async getExecutiveMetrics(organizationId: string): Promise<{
    overallHealthScore: number;
    totalBudgetUsed: number;
    totalBudget: number;
    totalHeadcount: number;
    departmentsOnTrack: number;
    departmentsAtRisk: number;
  }> {
    try {
      const departments = await this.getExecutiveDepartments(organizationId);
      
      if (departments.length === 0) {
        return {
          overallHealthScore: 0,
          totalBudgetUsed: 0,
          totalBudget: 0,
          totalHeadcount: 0,
          departmentsOnTrack: 0,
          departmentsAtRisk: 0
        };
      }

      const overallHealthScore = Math.round(
        departments.reduce((sum, d) => sum + d.healthScore, 0) / departments.length
      );
      const totalBudgetUsed = departments.reduce((sum, d) => sum + (d.budgetUsed || 0), 0);
      const totalBudget = departments.reduce((sum, d) => sum + (d.budgetTotal || 0), 0);
      const totalHeadcount = departments.reduce((sum, d) => sum + d.headcount, 0);
      const departmentsOnTrack = departments.filter(d => d.status === 'on_track' || d.status === 'ahead').length;
      const departmentsAtRisk = departments.filter(d => d.status === 'at_risk' || d.status === 'behind').length;

      return {
        overallHealthScore,
        totalBudgetUsed,
        totalBudget,
        totalHeadcount,
        departmentsOnTrack,
        departmentsAtRisk
      };
    } catch (error) {
      console.error('Error calculating executive metrics:', error);
      return {
        overallHealthScore: 0,
        totalBudgetUsed: 0,
        totalBudget: 0,
        totalHeadcount: 0,
        departmentsOnTrack: 0,
        departmentsAtRisk: 0
      };
    }
  }

  // ===========================================================================
  // SHARED DATA
  // ===========================================================================

  /**
   * Get organization's integrations
   */
  static async getIntegrations(organizationId: string): Promise<Integration[]> {
    try {
      const { data, error } = await supabase
        .from('client_integrations')
        .select('*')
        .eq('organization_id', organizationId);

      if (error) throw error;
      if (!data) return [];

      return data.map(int => ({
        id: int.id,
        integrationType: int.integration_type,
        isConnected: int.is_connected,
        connectedAt: int.connected_at,
        lastSyncAt: int.last_sync_at,
        syncStatus: int.sync_status
      }));
    } catch (error) {
      console.error('Error fetching integrations:', error);
      return [];
    }
  }

  /**
   * Get recent activities
   */
  static async getRecentActivities(organizationId: string, limit = 10): Promise<DashboardActivity[]> {
    try {
      const { data, error } = await supabase
        .from('dashboard_activities')
        .select('*')
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      if (!data) return [];

      return data.map(activity => ({
        id: activity.id,
        activityType: activity.activity_type,
        title: activity.title,
        description: activity.description,
        createdAt: activity.created_at
      }));
    } catch (error) {
      console.error('Error fetching activities:', error);
      return [];
    }
  }

  // ===========================================================================
  // ADD/UPDATE DATA (for when clients input data or integrations sync)
  // ===========================================================================

  /**
   * Add a new client (for consultants)
   */
  static async addClient(organizationId: string, client: Partial<ConsultantClient>): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('consultant_clients')
        .insert({
          organization_id: organizationId,
          client_name: client.clientName,
          client_logo_url: client.clientLogoUrl,
          industry: client.industry,
          status: client.status || 'active',
          health_score: client.healthScore || 50,
          monthly_revenue: client.monthlyRevenue
        })
        .select('id')
        .single();

      if (error) throw error;

      return { success: true, id: data.id };
    } catch (error: any) {
      console.error('Error adding client:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Add a department (for executives)
   */
  static async addDepartment(organizationId: string, department: Partial<ExecutiveDepartment>): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('executive_departments')
        .insert({
          organization_id: organizationId,
          department_name: department.departmentName,
          department_head: department.departmentHead,
          health_score: department.healthScore || 50,
          budget_total: department.budgetTotal,
          headcount: department.headcount || 0,
          status: department.status || 'on_track'
        })
        .select('id')
        .single();

      if (error) throw error;

      return { success: true, id: data.id };
    } catch (error: any) {
      console.error('Error adding department:', error);
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
export const dashboardService = DashboardService;
