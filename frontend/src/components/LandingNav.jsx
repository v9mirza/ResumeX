import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { LANDING_NAV_LINKS } from '../data/landingNavLinks';
import NavActions, { MobileLink, MobileAnchor } from './landing/NavActions';

const DESKTOP_BP = 1024;

const LandingNav = ({ rightContent, onThemeToggle, showSectionLinks }) => {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === '/';
  const sectionLinksVisible = showSectionLinks ?? isHome;
  const actions = rightContent ?? <NavActions />;

  const handleThemeClick = (e) => {
    if (onThemeToggle) onThemeToggle(e);
    else toggleTheme();
  };

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.classList.toggle('lp-nav-open', menuOpen);
    return () => document.body.classList.remove('lp-nav-open');
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_BP) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <>
      <header className={`lp-glass-nav${menuOpen ? ' lp-glass-nav--menu-open' : ''}`}>
        <a href="#main-content" className="lp-skip-link">Skip to content</a>

        <div className="lp-nav-shell">
          <nav className="container lp-nav-bar" aria-label="Main navigation">
            <div className="lp-nav-brand">
              <Link to="/" className="lp-nav-brand-link" onClick={closeMenu}>
                <img src="/resumex.svg" alt="" width={24} height={24} aria-hidden="true" />
                <span className="lp-nav-brand-text">ResumeX</span>
              </Link>
            </div>

            {sectionLinksVisible && (
              <div className="lp-nav-links" aria-label="Page sections">
                {LANDING_NAV_LINKS.map((link) => (
                  <a key={link.href} href={link.href} className="lp-nav-anchor">
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            <div className="lp-nav-actions">
              <button
                type="button"
                onClick={handleThemeClick}
                className="lp-nav-theme-btn"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {actions && (
                <>
                  <span className="lp-nav-actions-divider" aria-hidden="true" />
                  <div className="lp-nav-auth-desktop">{actions}</div>
                </>
              )}

              <button
                type="button"
                className="lp-nav-menu-btn"
                aria-expanded={menuOpen}
                aria-controls="lp-mobile-nav"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMenuOpen((o) => !o)}
              >
                {menuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {menuOpen && (
        <button
          type="button"
          className="lp-mobile-nav-backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}

      <div
        id="lp-mobile-nav"
        className={`lp-mobile-nav${menuOpen ? ' lp-mobile-nav--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="container lp-mobile-nav-inner">
          <nav className="lp-mobile-nav-panel" aria-label="Explore">
            <ul className="lp-mobile-nav-list">
              {!isHome && (
                <li>
                  <MobileLink to="/" onClick={closeMenu}>Home</MobileLink>
                </li>
              )}
              {sectionLinksVisible && LANDING_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <MobileAnchor href={link.href} onClick={closeMenu}>
                    {link.label}
                  </MobileAnchor>
                </li>
              ))}
            </ul>
          </nav>

          {actions && <NavActions mobile />}
        </div>
      </div>
    </>
  );
};

export default LandingNav;
