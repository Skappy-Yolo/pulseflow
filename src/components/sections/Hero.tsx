import './HeroSection.css';

// TypeScript interfaces
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

interface StatCardProps {
  number: string;
  description: string;
}

interface MetricCardProps {
  title: string;
  percentage: string;
  status?: 'normal' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
}

interface StatusBadgeProps {
  type: 'success' | 'danger' | 'warning';
  children: React.ReactNode;
}

// Reusable Button Component
const Button = ({ variant = 'primary', children, className = '' }: ButtonProps) => {
  return (
    <button className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`}>
      {children}
    </button>
  );
};

// Reusable Stat Component
const StatCard = ({ number, description }: StatCardProps) => {
  return (
    <div className="stat-card">
      <div className="stat-number">{number}</div>
      <div className="stat-description">{description}</div>
    </div>
  );
};

// Reusable Metric Component
const MetricCard = ({ title, percentage, status = 'normal', icon }: MetricCardProps) => {
  return (
    <div className={`metric-card ${status}`}>
      <div className="metric-header">
        <span className="metric-title">{title}</span>
        {icon && <span className="metric-icon">{icon}</span>}
      </div>
      <div className="metric-value">{percentage}</div>
    </div>
  );
};

// Reusable Status Badge Component
const StatusBadge = ({ type, children }: StatusBadgeProps) => {
  const getIcon = () => {
    if (type === 'success') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="8" fill="#10B981"/>
          <path d="M11.3 6.2L7.5 10L5.2 7.7L6 6.9L7.5 8.4L10.5 5.4L11.3 6.2Z" fill="white"/>
        </svg>
      );
    } else if (type === 'danger') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M14.7965 11.7479L9.29767 2.24788C9.16653 2.02037 8.97713 1.83151 8.74926 1.70023C8.52139 1.56894 8.26307 1.49984 8.00007 1.49984C7.73707 1.49984 7.47875 1.56894 7.25088 1.70023C7.02301 1.83151 6.83361 2.02037 6.70247 2.24788L1.20368 11.7479C1.07168 11.9759 1.00205 12.2346 1.00179 12.498C1.00153 12.7615 1.07066 13.0203 1.20223 13.2485C1.33379 13.4768 1.52314 13.6663 1.7512 13.7981C1.97925 13.9299 2.23809 13.9993 2.50153 13.9993H13.4986C13.7621 13.9993 14.0209 13.9299 14.249 13.7981C14.477 13.6663 14.6664 13.4768 14.798 13.2485C14.9295 13.0203 14.9987 12.7615 14.9984 12.498C14.998 12.2346 14.9284 11.9759 14.7965 11.7479ZM7.49967 6.49984C7.49967 6.36723 7.55235 6.24005 7.64612 6.14628C7.73989 6.05251 7.86706 5.99984 7.99967 5.99984C8.13228 5.99984 8.25946 6.05251 8.35323 6.14628C8.447 6.24005 8.49967 6.36723 8.49967 6.49984V8.99984C8.49967 9.13245 8.447 9.25962 8.35323 9.35339C8.25946 9.44716 8.13228 9.49984 7.99967 9.49984C7.86706 9.49984 7.73989 9.44716 7.64612 9.35339C7.55235 9.25962 7.49967 9.13245 7.49967 8.99984V6.49984ZM7.99993 12C7.85182 12 7.70732 11.9561 7.58328 11.8736C7.45924 11.7912 7.36171 11.6741 7.30442 11.537C7.24712 11.4 7.23242 11.2492 7.26197 11.1037C7.29153 10.9582 7.36381 10.8246 7.46961 10.7197C7.57541 10.6148 7.70814 10.5434 7.85363 10.5144C7.99912 10.4854 8.14993 10.5003 8.28693 10.5571C8.42393 10.6139 8.54112 10.7106 8.62353 10.8336C8.70594 10.9567 8.74993 11.1017 8.74993 11.25C8.74993 11.4489 8.67093 11.6397 8.53027 11.7803C8.38961 11.921 8.19884 12 7.99993 12Z" fill="#E84646"/>
        </svg>
      );
    }
    return null;
  };

  return (
    <div className={`status-badge ${type}`}>
      {getIcon()}
      <span>{children}</span>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            We turn your disconnected product data into<br />
            <span className="highlight">one unified view</span><br />
            of product & customer success
          </h1>
          
          <p className="hero-description">
            PulseFlow transforms your (scattered) marketing, sales, product, and 
            support data into clear insights so you can get the complete picture you 
            need to make better and faster decisions in one glance
          </p>

          <div className="hero-buttons">
            <Button variant="primary">Book Your Demo</Button>
            <Button variant="secondary">See How it Works</Button>
          </div>

          <div className="hero-stats">
            <StatCard number="2x" description="More Clients, Same Team" />
            <StatCard number="5-seconds" description="From Login to Insight" />
            <StatCard number="0" description="Conflicting Reports" />
          </div>
        </div>

        {/* Right Dashboard */}
        <div className="hero-dashboard">
          <div className="dashboard-header">
            <div className="dashboard-title">
              <h3>Client Portfolio Health</h3>
            </div>
            <div className="dashboard-badges">
              <StatusBadge type="success">Data Synced 2 min ago</StatusBadge>
              <StatusBadge type="danger">4 Clients Need Attention</StatusBadge>
            </div>
          </div>

          <div className="dashboard-metrics">
            <MetricCard 
              title="Bunqqi" 
              percentage="78%" 
              status="warning"
            />
            <MetricCard 
              title="Nolum" 
              percentage="92%" 
              status="success"
            />
            <MetricCard 
              title="Enies Pipeline" 
              percentage="Stalled" 
              status="danger"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14.7965 11.7479L9.29767 2.24788C9.16653 2.02037 8.97713 1.83151 8.74926 1.70023C8.52139 1.56894 8.26307 1.49984 8.00007 1.49984C7.73707 1.49984 7.47875 1.56894 7.25088 1.70023C7.02301 1.83151 6.83361 2.02037 6.70247 2.24788L1.20368 11.7479C1.07168 11.9759 1.00205 12.2346 1.00179 12.498C1.00153 12.7615 1.07066 13.0203 1.20223 13.2485C1.33379 13.4768 1.52314 13.6663 1.7512 13.7981C1.97925 13.9299 2.23809 13.9993 2.50153 13.9993H13.4986C13.7621 13.9993 14.0209 13.9299 14.249 13.7981C14.477 13.6663 14.6664 13.4768 14.798 13.2485C14.9295 13.0203 14.9987 12.7615 14.9984 12.498C14.998 12.2346 14.9284 11.9759 14.7965 11.7479ZM7.49967 6.49984C7.49967 6.36723 7.55235 6.24005 7.64612 6.14628C7.73989 6.05251 7.86706 5.99984 7.99967 5.99984C8.13228 5.99984 8.25946 6.05251 8.35323 6.14628C8.447 6.24005 8.49967 6.36723 8.49967 6.49984V8.99984C8.49967 9.13245 8.447 9.25962 8.35323 9.35339C8.25946 9.44716 8.13228 9.49984 7.99967 9.49984C7.86706 9.49984 7.73989 9.44716 7.64612 9.35339C7.55235 9.25962 7.49967 9.13245 7.49967 8.99984V6.49984ZM7.99993 12C7.85182 12 7.70732 11.9561 7.58328 11.8736C7.45924 11.7912 7.36171 11.6741 7.30442 11.537C7.24712 11.4 7.23242 11.2492 7.26197 11.1037C7.29153 10.9582 7.36381 10.8246 7.46961 10.7197C7.57541 10.6148 7.70814 10.5434 7.85363 10.5144C7.99912 10.4854 8.14993 10.5003 8.28693 10.5571C8.42393 10.6139 8.54112 10.7106 8.62353 10.8336C8.70594 10.9567 8.74993 11.1017 8.74993 11.25C8.74993 11.4489 8.67093 11.6397 8.53027 11.7803C8.38961 11.921 8.19884 12 7.99993 12Z" fill="#FFA726"/>
                  </svg>
                }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
