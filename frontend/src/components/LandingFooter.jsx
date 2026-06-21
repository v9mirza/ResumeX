import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import { LANDING_NAV_LINKS } from '../data/landingNavLinks';

const YEAR = new Date().getFullYear();

const FOOTER_PRODUCT = [
  ...LANDING_NAV_LINKS,
  { label: 'Get started', to: '/register' },
  { label: 'Dashboard', to: '/dashboard' },
];

const FOOTER_LEGAL = [
  { label: 'Privacy', to: '/privacy-policy' },
  { label: 'Terms', to: '/terms-of-service' },
  {
    label: 'GitHub',
    href: 'https://github.com/v9mirza/resumex',
    external: true,
  },
];

const FooterLink = ({ item }) => {
  const className = 'lp-footer-link';

  if (item.external) {
    return (
      <a href={item.href} className={className} target="_blank" rel="noopener noreferrer">
        <Github size={14} aria-hidden="true" />
        {item.label}
      </a>
    );
  }

  if (item.href) {
    return <a href={item.href} className={className}>{item.label}</a>;
  }

  return <Link to={item.to} className={className}>{item.label}</Link>;
};

const LandingFooter = () => (
  <footer className="lp-footer">
    <div className="container">
      <div className="lp-footer-grid">
        <div className="lp-footer-brand">
          <Link to="/" className="lp-footer-brand-link">
            <img src="/resumex.svg" alt="" width={20} height={20} aria-hidden="true" />
            <span>ResumeX</span>
          </Link>
          <p className="lp-footer-tagline">Build ATS-friendly resumes in minutes — free forever.</p>
        </div>

        <nav className="lp-footer-col" aria-label="Product links">
          <p className="lp-footer-col-title">Product</p>
          <ul className="lp-footer-link-list">
            {FOOTER_PRODUCT.map((item) => (
              <li key={item.label}>
                <FooterLink item={item} />
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lp-footer-col" aria-label="Legal links">
          <p className="lp-footer-col-title">Legal</p>
          <ul className="lp-footer-link-list">
            {FOOTER_LEGAL.map((item) => (
              <li key={item.label}>
                <FooterLink item={item} />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="lp-footer-bottom">
        <span>© {YEAR} ResumeX. Open-source under the MIT License.</span>
        <span>Built with React · No tracking · No ads</span>
      </div>
    </div>
  </footer>
);

export default LandingFooter;
