import { useState } from 'react';
import './Navbar.css';

const NavigationSimple = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  console.log('Heartbeat icon path:', "/images/Heartbeat.svg");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img
            src="/images/Heartbeat.svg"
            alt="PulseFlow Icon"
            className="navbar-icon"
            onError={(e) => {
              console.error('Failed to load logo:', e);
              e.currentTarget.style.display = 'none';
            }}
            onLoad={() => {
              console.log('Logo loaded successfully');
            }}
          />
          <span className="navbar-text">PulseFlow</span>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          <a href="#features" className="navbar-link">Features</a>
          <a href="#pricing" className="navbar-link">Pricing</a>
          <a href="#about" className="navbar-link">About</a>
          <a href="#contact" className="navbar-link">Contact</a>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="navbar-auth">
          <button className="btn-secondary">Log in</button>
          <button className="btn-primary">Start Free Trial</button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-links">
            <a href="#features" className="mobile-menu-link">Features</a>
            <a href="#pricing" className="mobile-menu-link">Pricing</a>
            <a href="#about" className="mobile-menu-link">About</a>
            <a href="#contact" className="mobile-menu-link">Contact</a>
          </div>
          <div className="mobile-menu-auth">
            <button className="btn-secondary-mobile">Log in</button>
            <button className="btn-primary-mobile">Start Free Trial</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationSimple;
