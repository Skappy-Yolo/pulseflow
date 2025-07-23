import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { images } from '../../assets/images';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userEmail, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="footer-logo">
          <img
            src={images.heartbeatIcon}
            alt="PulseFlow Icon"
            width="32"
            height="32"
          />
          PulseFlow
        </a>
        
        <ul className="nav-links">
          <li><a href="#" className="nav-link">How it works</a></li>
          <li><a href="#" className="nav-link">For Consultants</a></li>
          <li><a href="#" className="nav-link">For Executives</a></li>
          <li><a href="#" className="nav-link">Pricing</a></li>
        </ul>
        
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
      </div>
    </nav>
  );
};

export default Navigation;
