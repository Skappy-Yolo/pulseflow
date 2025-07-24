import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';
import { images } from '../../assets/images';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userEmail, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Debug: Log the heartbeatIcon path
  console.log('Heartbeat icon path:', images.heartbeatIcon);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = (path?: string) => {
    setIsMobileMenuOpen(false);
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="footer-logo">
          <img
            src="/images/Heartbeat.svg"
            alt="PulseFlow Icon"
            width="32"
            height="32"
            onError={(e) => console.log('Logo failed to load:', e)}
            onLoad={() => console.log('Logo loaded successfully')}
          />
          PulseFlow
        </a>
        
        {/* Desktop Navigation */}
        <ul className="nav-links">
          <li><a href="#" className="nav-link">How it works</a></li>
          <li><a href="#" className="nav-link">For Consultants</a></li>
          <li><a href="#" className="nav-link">For Executives</a></li>
          <li><a href="#" className="nav-link">Pricing</a></li>
        </ul>
        
        {/* Desktop Actions */}
        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <span className="user-email text-sm text-gray-600 mr-4">
                Welcome, {userEmail?.split('@')[0]}
              </span>
              <button 
                onClick={handleLogout} 
                className="login-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate('/login')} 
                className="login-btn"
              >
                Log in
              </button>
              <button 
                onClick={() => navigate('/signup')} 
                className="demo-btn"
              >
                Book a Demo
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg 
            className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path 
              d="M3 12h18M3 6h18M3 18h18" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <div className="mobile-nav-links">
                <a href="#" className="mobile-nav-link" onClick={() => handleMobileNavClick()}>
                  How it works
                </a>
                <a href="#" className="mobile-nav-link" onClick={() => handleMobileNavClick()}>
                  For Consultants
                </a>
                <a href="#" className="mobile-nav-link" onClick={() => handleMobileNavClick()}>
                  For Executives
                </a>
                <a href="#" className="mobile-nav-link" onClick={() => handleMobileNavClick()}>
                  Pricing
                </a>
              </div>
              
              <div className="mobile-nav-actions">
                {isAuthenticated ? (
                  <>
                    <div className="mobile-user-info">
                      Welcome, {userEmail?.split('@')[0]}
                    </div>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }} 
                      className="mobile-logout-btn"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => handleMobileNavClick('/login')} 
                      className="mobile-login-btn"
                    >
                      Log in
                    </button>
                    <button 
                      onClick={() => handleMobileNavClick('/signup')} 
                      className="mobile-demo-btn"
                    >
                      Book a Demo
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navigation;
