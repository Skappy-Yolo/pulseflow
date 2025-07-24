import './DidYouKnowSection.css';

// Reusable Button Component (same as used before)
const Button = ({ variant = 'primary', children, className = '', onClick }: {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button 
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Reusable Section Header Component
const SectionHeader = ({ title, subtitle, highlightText }: {
  title: string;
  subtitle: string;
  highlightText: string;
}) => {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <p className="section-problem">
        {subtitle} <span className="highlight-text">{highlightText}</span>
      </p>
    </div>
  );
};

// Reusable Stat Highlight Component
const StatHighlight = ({ children }: { children: React.ReactNode }) => {
  return <div className="stat-highlight">{children}</div>;
};

// Reusable Image Component
const ImageComponent = ({ src, alt, className = '' }: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`image-component ${className}`}
    />
  );
};

const DidYouKnowSection = () => {
  return (
    <section className="did-you-know-section">
      <div className="section-container">
        {/* Section Header */}
        <SectionHeader 
          title="Did you know?"
          subtitle="Every company today struggle with the same fundamental problem:"
          highlightText="Disconnected Systems"
        />

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Left Content */}
          <div className="content-left">
            <StatHighlight>You are wasting 70% of your work hours</StatHighlight>
            
            <p className="content-text">
              By gathering data from HubSpot, Salesforce, Mixpanel, Confluence or 
              Zendesk, you have different manual exports, conflicting metrics and hours 
              lost to reporting instead of strategy execution.
            </p>
            
            <p className="content-question">Is this true?</p>
            
            <Button variant="primary">Find out more</Button>
          </div>

          {/* Right Content */}
          <div className="content-right">
            <ImageComponent 
              src="/images/Did-you-know-1.jpg"
              alt="Person looking stressed at computer - business workflow struggles"
              className="main-image"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom-section">
          {/* Left Image */}
          <div className="bottom-left">
            <ImageComponent 
              src="/images/Did-you-know-2.jpg"
              alt="Business conflict resolution - team collaboration"
              className="solution-image"
            />
          </div>

          {/* Right Content */}
          <div className="bottom-right">
            <StatHighlight>Conflicting reports causes more friction for you</StatHighlight>
            
            <p className="content-text">
              When your Marketing team says leads are up 20%. Sales says pipeline is down 15%. Product team shows users dropping. Support claims satisfaction is rising. You begin to wonder: 'What's actually happening?'
            </p>
            
            <Button variant="primary" onClick={() => console.log('See how PulseFlow helps you clicked')}>
              See how PulseFlow helps you
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DidYouKnowSection;
