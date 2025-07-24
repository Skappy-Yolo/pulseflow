import React from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from '../../assets/images';
import './TestimonialsCTAFooter.css';

// TypeScript interfaces
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface Customer {
  company: string;
  avatar: string;
  quote: string;
  name: string;
  title: string;
}

interface CustomerCardProps {
  customer: Customer;
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
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

// Reusable Customer Card Component
const CustomerCard = ({ customer }: CustomerCardProps) => {
  const { company, avatar, quote, name, title } = customer;
  
  return (
    <div className="customer-card">
      <img src={avatar} alt={name} className="customer-avatar" />
      <blockquote className="customer-quote">"{quote}"</blockquote>
      <div className="customer-company">{company}</div>
      <div className="customer-name">{name}</div>
      <div className="customer-title">{title}</div>
    </div>
  );
};

// Reusable Section Header Component
const SectionHeader = ({ title, subtitle, className = '' }: SectionHeaderProps) => {
  return (
    <div className={`section-header ${className}`}>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

// Reusable Social Link Component
const SocialLink = ({ href, icon, label }: SocialLinkProps) => {
  return (
    <a href={href} className="social-link" aria-label={label}>
      {icon}
    </a>
  );
};

// Reusable Footer Column Component
const FooterColumn = ({ title, links }: FooterColumnProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="footer-column">
      <h3 className="footer-column-title">{title}</h3>
      {links.map((link, index) => (
        <div key={index}>
          {link.text === 'Book a Demo' ? (
            <Button 
              variant="primary" 
              className="footer-demo-btn"
              onClick={() => navigate('/signup')}
            >
              {link.text}
            </Button>
          ) : link.text === 'Contact us' ? (
            <a href="mailto:hello@pulseflow.com" className="footer-link">
              {link.text}
            </a>
          ) : (
            <a href={link.href} className="footer-link">
              {link.text}
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

// Testimonials Section Component
const TestimonialsSection = () => {
  const customers: Customer[] = [
    {
      company: 'Nolum.eu',
      avatar: images.profile1, // Using actual profile image from assets
      quote: 'We went from drowning in client data to surfing on top of it. I\'m managing 3x more clients and my team actually enjoys Monday mornings now.',
      name: 'Consuela Nicula',
      title: 'CEO'
    },
    {
      company: 'Bunqqi',
      avatar: images.profile3, // Swapped back to profile3
      quote: 'Finally, I can see our entire product ecosystem in seconds. No more conflicting reports or endless meetings to understand what\'s happening.',
      name: 'Delphine De Vrij',
      title: 'Chief Product Officer'
    },
    {
      company: 'ENIES',
      avatar: images.profile2, // Swapped back to profile2
      quote: 'The data unification alone saved us 20 working hours per week. But the real value is catching issues before they impact revenue.',
      name: 'Virgil Sleuten',
      title: 'RevOps Manager'
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="section-container">
        <SectionHeader 
          title="Join the league of Satisfied Customers"
          subtitle="Don't just take our word for it. Hear what our customers have to say about their experience with PulseFlow"
        />

        <div className="customers-grid">
          {customers.map((customer, index) => (
            <CustomerCard key={index} customer={customer} />
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="cta-section">
      <div className="section-container">
        <h2 className="cta-title">Ready to Transform Your Product Lifecycle Visibility?</h2>
        <p className="cta-description">
          Take the first step towards transforming your product lifecycle.<br />
          Sign up for our demo and experience the power of PulseFlow for yourself.
        </p>
        
        <div className="button-group">
          <Button 
            variant="primary"
            onClick={() => navigate('/signup')}
          >
            Book a Demo
          </Button>
          <Button 
            variant="secondary"
            onClick={() => console.log('Watch Overview clicked')}
          >
            Watch 2-Min Overview
          </Button>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const footerLinks: Record<string, FooterLink[]> = {
    forTeams: [
      { text: 'Consulting Teams', href: '#' },
      { text: 'Executive Leadership', href: '#' },
      { text: 'How it works', href: '#' },
      { text: 'Book a Demo', href: '#' }
    ],
    company: [
      { text: 'About Us', href: '#' },
      { text: 'Case Studies', href: '#' },
      { text: 'Contact us', href: '#' },
      { text: 'Careers', href: '#' }
    ],
    resources: [
      { text: 'Sustainability Proposition', href: '#' },
      { text: 'FAQs', href: '#' },
      { text: 'Terms and Conditions', href: '#' },
      { text: 'Privacy Policy', href: '#' }
    ]
  };

  const socialIcons = {
    twitter: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
      </svg>
    ),
    linkedin: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    instagram: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Column */}
          <div className="footer-brand">
            <a href="#" className="footer-logo">
              <img
                src={images.heartbeatIcon}
                alt="PulseFlow Icon"
                width="32"
                height="32"
              />
              PulseFlow
            </a>
            <p className="footer-tagline">Transforming product lifecycle for teams</p>
            <div className="social-links">
              <SocialLink 
                href="#" 
                icon={socialIcons.twitter} 
                label="Twitter" 
              />
              <SocialLink 
                href="#" 
                icon={socialIcons.linkedin} 
                label="LinkedIn" 
              />
              <SocialLink 
                href="#" 
                icon={socialIcons.instagram} 
                label="Instagram" 
              />
            </div>
          </div>

          {/* Footer Columns */}
          <FooterColumn 
            title="For Teams" 
            links={footerLinks.forTeams}
          />
          <FooterColumn 
            title="Company" 
            links={footerLinks.company}
          />
          <FooterColumn 
            title="Resources" 
            links={footerLinks.resources}
          />
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© 2025 PulseFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main Component that combines all sections
const TestimonialsCTAFooter = () => {
  return (
    <>
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default TestimonialsCTAFooter;
export { TestimonialsSection, CTASection, Footer, CustomerCard, Button, SectionHeader, FooterColumn };
