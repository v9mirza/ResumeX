import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

const YEAR = new Date().getFullYear();

const LandingFooter = () => (
  <footer className="lp-footer">
    <div className="container lp-footer-inner">
      <div className="lp-footer-main">
        <div className="lp-footer-brand">
          <Link to="/" className="lp-footer-brand-link">
            <img src="/resumex.svg" alt="" width={24} height={24} aria-hidden="true" />
            <span>ResumeX</span>
          </Link>
          <p>Build a resume that tells your story. Create, preview, and export with confidence.</p>
        </div>

        <nav className="lp-footer-nav" aria-label="Footer navigation">
          <Link to="/privacy-policy" className="lp-footer-link">Privacy</Link>
          <Link to="/terms-of-service" className="lp-footer-link">Terms</Link>
          <a
            href="https://github.com/v9mirza/resumex"
            className="lp-footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={14} aria-hidden="true" />
            GitHub
          </a>
        </nav>
      </div>

      <div className="lp-footer-bottom">
        <span>© {YEAR} ResumeX.</span>
        <span>Made for your next opportunity.</span>
      </div>
    </div>
  </footer>
);

export default LandingFooter;
