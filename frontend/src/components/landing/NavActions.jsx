import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MobileLink = ({ children, className = '', ...props }) => (
  <Link className={`lp-mobile-nav-link${className ? ` ${className}` : ''}`} {...props}>
    <span>{children}</span>
    <ChevronRight size={16} className="lp-mobile-nav-chevron" aria-hidden="true" />
  </Link>
);

const MobileAnchor = ({ children, className = '', ...props }) => (
  <a className={`lp-mobile-nav-link${className ? ` ${className}` : ''}`} {...props}>
    <span>{children}</span>
    <ChevronRight size={16} className="lp-mobile-nav-chevron" aria-hidden="true" />
  </a>
);

const NavActions = ({ mobile = false }) => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  if (!mobile) {
    const linkClass = 'lp-nav-link';
    const signupClass = 'lp-nav-link lp-nav-signup';
    const logoutClass = 'lp-nav-link lp-nav-logout';

    if (user) {
      return (
        <div className="lp-nav-auth-group">
          {pathname !== '/dashboard' && <Link to="/dashboard" className={linkClass}>Dashboard</Link>}
          {pathname !== '/profile' && <Link to="/profile" className={linkClass}>Profile</Link>}
          <button type="button" onClick={logout} className={logoutClass}>Log out</button>
        </div>
      );
    }
    if (pathname === '/login') {
      return <div className="lp-nav-auth-group"><Link to="/register" className={signupClass}>Sign up</Link></div>;
    }
    if (pathname === '/register') {
      return <div className="lp-nav-auth-group"><Link to="/login" className={linkClass}>Log in</Link></div>;
    }
    return (
      <div className="lp-nav-auth-group">
        <Link to="/login" className={linkClass}>Log in</Link>
        <Link to="/register" className={signupClass}>Sign up</Link>
      </div>
    );
  }

  /* Mobile drawer */
  if (user) {
    return (
      <div className="lp-mobile-nav-section">
        <nav className="lp-mobile-nav-panel" aria-label="Account">
          <ul className="lp-mobile-nav-list">
            {pathname !== '/dashboard' && (
              <li><MobileLink to="/dashboard">Dashboard</MobileLink></li>
            )}
            {pathname !== '/profile' && (
              <li><MobileLink to="/profile">Profile</MobileLink></li>
            )}
          </ul>
        </nav>
        <button type="button" onClick={logout} className="lp-mobile-nav-logout">
          Log out
        </button>
      </div>
    );
  }

  if (pathname === '/login') {
    return (
      <div className="lp-mobile-nav-section">
        <Link to="/register" className="lp-mobile-nav-cta btn-lp-primary">Create free account</Link>
      </div>
    );
  }

  if (pathname === '/register') {
    return (
      <div className="lp-mobile-nav-section">
        <Link to="/login" className="lp-mobile-nav-cta btn-lp-primary">Log in instead</Link>
      </div>
    );
  }

  return (
    <div className="lp-mobile-nav-section">
      <nav className="lp-mobile-nav-panel" aria-label="Account">
        <ul className="lp-mobile-nav-list">
          <li><MobileLink to="/login">Log in</MobileLink></li>
        </ul>
      </nav>
      <Link to="/register" className="lp-mobile-nav-cta btn-lp-primary">Get started free</Link>
    </div>
  );
};

export { MobileLink, MobileAnchor };
export default NavActions;
