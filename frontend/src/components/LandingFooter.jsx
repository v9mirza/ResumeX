import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

const YEAR = new Date().getFullYear();

const LandingFooter = () => (
  <footer className="lp-footer">
    <div className="container lp-footer-minimal">
      <div className="lp-footer-left">
        <Link to="/" className="lp-footer-brand-link">
          <img src="/resumex.svg" alt="" width={18} height={18} aria-hidden="true" />
          <span>ResumeX</span>
        </Link>
        <span className="lp-footer-copyright">
          © {YEAR} ResumeX. Built with React · No tracking.
        </span>
      </div>

      <div className="lp-footer-right">
        <Link to="/privacy-policy" className="lp-footer-link">Privacy</Link>
        <Link to="/terms-of-service" className="lp-footer-link">Terms</Link>
        <a
          href="https://github.com/v9mirza/resumex"
          className="lp-footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={13} aria-hidden="true" />
          GitHub
        </a>
      </div>
    </div>
  </footer>
);

export default LandingFooter;
