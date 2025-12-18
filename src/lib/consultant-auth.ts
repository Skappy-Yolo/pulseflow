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
}

// Hardcoded consultant credentials (in production, this would be in a database)
const CONSULTANT_USERS: Record<string, { password: string; type: 'consultant' | 'executive'; name: string }> = {
  'consultant@pulseflow.com': {
    password: 'consultant123',
    type: 'consultant',
    name: 'Consultant User'
  },
  'executive@pulseflow.com': {
    password: 'executive123', 
    type: 'executive',
    name: 'Executive User'
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
        name: user.name
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
}

export const consultantAuth = ConsultantAuthService;
