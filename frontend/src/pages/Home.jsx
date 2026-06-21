import React from 'react';
import { useViewTransitionTheme } from '../hooks/useViewTransitionTheme';
import LandingFooter from '../components/LandingFooter';
import LandingNav from '../components/LandingNav';
import Seo from '../components/Seo';
import {
  HeroSection,
  HowItWorksSection,
  StatsBar,
  CompareSection,
  FeaturesSection,
  TemplateGallery,
  CtaSection,
  FaqSection,
} from '../components/landing/LandingSections';
import { FAQ_JSON_LD } from '../data/landingNavLinks';

const Home = () => {
  const { transitionToggle } = useViewTransitionTheme();

  return (
    <div className="landing-page">
      <Seo
        title="ResumeX — Build ATS-friendly resumes in minutes"
        description="ResumeX is an online resume builder for students, developers, and job‑seekers. Create ATS‑friendly resumes with guided steps, live preview, and PDF/JSON export."
        canonicalPath="/"
        jsonLd={FAQ_JSON_LD}
      />
      <LandingNav onThemeToggle={transitionToggle} />

      <main id="main-content">
        <HeroSection />
        <HowItWorksSection />
        <StatsBar />
        <CompareSection />
        <FeaturesSection />
        <TemplateGallery />
        <CtaSection />
        <FaqSection />
      </main>

      <LandingFooter />
    </div>
  );
};

export default Home;
