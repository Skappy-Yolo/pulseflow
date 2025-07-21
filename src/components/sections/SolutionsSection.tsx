import { logos } from '../../assets/logos';
import './SolutionSection.css';

// TypeScript interfaces
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface FeatureListProps {
  features: string[];
  className?: string;
}

interface IntegrationItemProps {
  icon?: string;
  src?: string;
  alt?: string;
  color?: string;
  gradient?: string;
  fontSize?: string;
}

interface IntegrationData {
  icon?: string;
  src?: string;
  alt?: string;
  color?: string;
  gradient?: string;
  fontSize?: string;
}

// Reusable Button Component
const Button = ({ variant = 'primary', children, className = '', onClick }: ButtonProps) => {
  return (
    <button 
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Reusable Feature List Component
const FeatureList = ({ features, className = '' }: FeatureListProps) => {
  return (
    <div className={`feature-list ${className}`}>
      {features.map((feature, index) => (
        <div key={index} className="feature-item">
          <div className="check-icon"></div>
          <span>{feature}</span>
        </div>
      ))}
    </div>
  );
};

// Reusable Integration Item Component
const IntegrationItem = ({ icon, src, alt, color, gradient, fontSize = '12px' }: IntegrationItemProps) => {
  const style = {
    background: gradient || color,
    fontSize: fontSize
  };
    
  return (
    <div className="integration-item">
      {src ? (
        <img 
          src={src} 
          alt={alt || 'Integration logo'} 
          className="integration-logo"
        />
      ) : (
        <div className="integration-icon" style={style}>
          {icon}
        </div>
      )}
    </div>
  );
};

const SolutionsSection = () => {
  // Portfolio features data
  const portfolioFeatures: string[] = [
    'Instant client switching with preserved context',
    'Cross-client pattern recognition and benchmarking',
    'White-labelled reports ready in 30 seconds',
    'Spend time solving problems instead of finding data'
  ];

  // Strategic insights features data
  const insightsFeatures: string[] = [
    'Overall health score with trend analysis',
    'Catch problems weeks before they hit your revenue',
    'Lifecycle flow visualization with bottlenecks',
    'Board-ready summaries generated automatically'
  ];

  // Integration icons data
  const integrations: IntegrationData[] = [
    // Row 1
    { src: logos.amplitude, alt: 'Amplitude' },
    { src: logos.teams, alt: 'Microsoft Teams' },
    { src: logos.mixpanel, alt: 'Mixpanel' },
    { src: logos.stripe, alt: 'Stripe' },
    
    // Row 2
    { src: logos.zenBig, alt: 'Zendesk' },
    { src: logos.crm, alt: 'CRM' },
    { src: logos.googleCalendar, alt: 'Google Calendar' },
    { src: logos.group1329, alt: 'Integration Platform' },
    
    // Row 3
    { src: logos.slack, alt: 'Slack' },
    { src: logos.hubspot, alt: 'HubSpot' },
    { src: logos.zapier, alt: 'Zapier' },
    { src: logos.twilio, alt: 'Twilio' }
  ];

  return (
    <section className="solution-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="solutions-main-title">PulseFlow Prevents These Daily Struggles</h2>
          <h3 className="section-subtitle">One Platform, Complete Clarity</h3>
          <p className="section-description">Purposely-built for the unique needs of teams and executives</p>
        </div>

        {/* Portfolio Management Section */}
        <div className="portfolio-section">
          <Button 
            variant="primary" 
            className="consulting-btn"
            onClick={() => console.log('For Consulting Teams clicked')}
          >
            For Consulting Teams
          </Button>
          
          {/* Left: Dashboard Image */}
          <div className="portfolio-image">
            <img 
              src={logos.forConsultants} // Using actual dashboard image for consultants
              alt="PulseFlow Dashboard Interface for Consulting Teams" 
              className="dashboard-image" 
            />
          </div>

          {/* Right: Content */}
          <div className="portfolio-content">
            <h3 className="content-title">Manage Your Entire Portfolio Effortlessly</h3>
            <p className="content-text">
              Stop juggling spreadsheets and browser tabs. See all your clients' status at a glance. 
              Prioritize your day, and deliver insights that clients can't generate themselves.
            </p>
            
            <FeatureList features={portfolioFeatures} />
          </div>
        </div>

        {/* Strategic Insights Section */}
        <div className="insights-section">
          <Button 
            variant="secondary" 
            className="executives-btn"
            onClick={() => console.log('For Executives clicked')}
          >
            For Executives
          </Button>
          
          <div className="insights-header">
            <h3 className="insights-title">Get Strategic Insights in 5 Seconds</h3>
            <p className="insights-text">
              No more conflicting department reports or dashboard overload. 
              See your entire product ecosystem instantly and make decisions with confidence
            </p>
          </div>

          <div className="insights-content">
            {/* Left: Feature List */}
            <FeatureList features={insightsFeatures} />

            {/* Right: Analytics Image */}
            <div className="insights-image">
              <img 
                src={logos.forExecutives} // Using actual dashboard image for executives
                alt="Strategic Insights Dashboard for Executives" 
                className="dashboard-image" 
              />
            </div>
          </div>
        </div>

        {/* Integrations Section */}
        <div className="integrations-section">
          <h3 className="integrations-title">Connect to Your Existing Tech Stack</h3>
          
          <div className="integrations-content">
            {/* Left: Description and Button */}
            <div className="integrations-left">
              <h4 className="integrations-subtitle">Seamless Software Integrations</h4>
              <p className="integrations-description">
                Connect to your existing tech stack. PulseFlow seamlessly integrates with popular software, 
                empowering you to easily retrieve data and maximize productivity.
              </p>
              <Button 
                variant="primary"
                className="explore-btn"
                onClick={() => console.log('Explore Integrations clicked')}
              >
                Explore Our Integrations Today
              </Button>
            </div>

            {/* Right: Integration Grid */}
            <div className="integrations-grid">
              {integrations.map((integration, index) => (
                <IntegrationItem
                  key={index}
                  icon={integration.icon}
                  src={integration.src}
                  alt={integration.alt}
                  color={integration.color}
                  gradient={integration.gradient}
                  fontSize={integration.fontSize}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
