// Consultant Authentication Service
// Simple authentication for consultant and executive users

export interface ConsultantCredentials {
  email: string;
  password: string;
}

export interface ConsultantUser {
  email: string;
  type: 'consultant' | 'executive';
  name: string;
  company: string;
  dashboardRoute: string;
}

// Demo accounts for Figma prototype dashboards
// In production, this would be replaced with Supabase authentication
const CONSULTANT_USERS: Record<string, { 
  password: string; 
  type: 'consultant' | 'executive'; 
  name: string;
  company: string;
  dashboardRoute: string;
}> = {
  // Legacy demo accounts (can be removed later)
  'consultant@pulseflow.com': {
    password: 'consultant123',
    type: 'consultant',
    name: 'Consultant User',
    company: 'PulseFlow',
    dashboardRoute: '/consultant'
  },
  'executive@pulseflow.com': {
    password: 'executive123', 
    type: 'executive',
    name: 'Executive User',
    company: 'PulseFlow',
    dashboardRoute: '/executive'
  },
  
  // Nolum Consulting - Consuela (Consultant Dashboard Demo)
  'consuela@nolum.com': {
    password: 'consuela123',
    type: 'consultant',
    name: 'Consuela',
    company: 'Nolum',
    dashboardRoute: '/consultant'
  },
  
  // ENIES - Delphine (Executive Dashboard Demo)
  'delphine@enies.com': {
    password: 'delphine123',
    type: 'executive',
    name: 'Delphine',
    company: 'ENIES',
    dashboardRoute: '/executive'
  }
};

export class ConsultantAuthService {
  /**
   * Authenticate consultant/executive user
   */
  static authenticate(credentials: ConsultantCredentials): ConsultantUser | null {
    const user = CONSULTANT_USERS[credentials.email.toLowerCase()];
    
    if (user && user.password === credentials.password) {
      return {
        email: credentials.email,
        type: user.type,
        name: user.name,
        company: user.company,
        dashboardRoute: user.dashboardRoute
      };
    }
    
    return null;
  }

  /**
   * Check if email is a consultant/executive email
   */
  static isConsultantEmail(email: string): boolean {
    return email.toLowerCase() in CONSULTANT_USERS;
  }

  /**
   * Get user type for email
   */
  static getUserType(email: string): 'consultant' | 'executive' | null {
    const user = CONSULTANT_USERS[email.toLowerCase()];
    return user ? user.type : null;
  }

  /**
   * Get user's dashboard route
   */
  static getDashboardRoute(email: string): string {
    const user = CONSULTANT_USERS[email.toLowerCase()];
    return user ? user.dashboardRoute : '/';
  }

  /**
   * Get full user info (without password)
   */
  static getUserInfo(email: string): Omit<ConsultantUser, 'email'> | null {
    const user = CONSULTANT_USERS[email.toLowerCase()];
    if (user) {
      return {
        type: user.type,
        name: user.name,
        company: user.company,
        dashboardRoute: user.dashboardRoute
      };
    }
    return null;
  }
}

export const consultantAuth = ConsultantAuthService;
