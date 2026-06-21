import React, { useRef, useCallback, lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import {
  Cloud, FileJson, CheckCircle, LayoutTemplate, Github, ChevronDown, ArrowRight,
  ShieldCheck, UserPlus, PenLine, Eye, Copy,
} from 'lucide-react';
import Minimal from '../../templates/Minimal';
import { SAMPLE_RESUME } from '../../data/sampleResume';
import { LANDING_FAQ_ITEMS } from '../../data/landingNavLinks';
import { useLandingCta } from '../../hooks/useLandingCta';

const FAQ_ICONS = { CheckCircle, FileJson, LayoutTemplate, ShieldCheck, Copy, PenLine };

const Classic = lazy(() => import('../../templates/Classic'));
const Modern = lazy(() => import('../../templates/Modern'));

const HERO_PREVIEW_RESUME = {
  ...SAMPLE_RESUME,
  experience: SAMPLE_RESUME.experience?.slice(0, 1) ?? [],
  education: SAMPLE_RESUME.education?.slice(0, 1) ?? [],
  projects: [],
  certifications: [],
  languages: [],
  achievements: [],
};

const GALLERY_RESUME = {
  ...SAMPLE_RESUME,
  experience: SAMPLE_RESUME.experience?.slice(0, 2) ?? [],
  education: SAMPLE_RESUME.education?.slice(0, 1) ?? [],
  projects: SAMPLE_RESUME.projects?.slice(0, 1) ?? [],
  certifications: [],
  languages: [],
  achievements: [],
};

const TITLE_LINES = [
  ['Build', 'a', 'resume'],
  ['that', 'gets', 'you', 'hired.'],
];
const GRADIENT_WORD = 'hired.';

const titleContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const titleWordVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 180, damping: 22 },
  },
};

const SplitTitle = ({ reducedMotion }) => (
  <motion.h1
    className="lp-hero-title"
    variants={titleContainerVariants}
    initial={reducedMotion ? 'visible' : 'hidden'}
    animate="visible"
    aria-label="Build a resume that gets you hired."
  >
    {TITLE_LINES.map((line, li) => (
      <span key={li} className="title-line" aria-hidden="true">
        {line.map((word, wi) => (
          <motion.span
            key={wi}
            variants={titleWordVariants}
            className={`title-word${word === GRADIENT_WORD ? ' text-gradient-blue' : ''}`}
          >
            {word}
          </motion.span>
        ))}
        {li < TITLE_LINES.length - 1 && <br />}
      </span>
    ))}
  </motion.h1>
);

export const HeroSection = () => {
  const { to, heroLabel } = useLandingCta();
  const reducedMotion = useReducedMotion();

  return (
    <section className="container lp-section-hero lp-hero-section">
      <div className="hero-dot-grid" aria-hidden="true" />
      {!reducedMotion && (
        <>
          <motion.div
            className="hero-orb hero-orb--blue"
            animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0], scale: [1, 1.08, 0.95, 1] }}
            transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
          />
          <motion.div
            className="hero-orb hero-orb--purple"
            animate={{ x: [0, -25, 20, 0], y: [0, 18, -28, 0], scale: [1, 0.93, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 28, ease: 'easeInOut' }}
          />
        </>
      )}

      <div className="hero-split-layout">
        <motion.div
          className="hero-text-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
          >
            <CheckCircle size={13} />
            Free forever · Open‑source · No credit card
          </motion.div>

          <SplitTitle reducedMotion={reducedMotion} />

          <motion.p
            className="lp-hero-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55, ease: 'easeOut' }}
          >
            Guided steps, live preview, and instant PDF export — no Word templates, no blank pages.
          </motion.p>

          <div className="lp-hero-actions">
            <Link to={to} className="btn-lp-primary lp-hero-btn-primary">
              {heroLabel} <ArrowRight size={18} />
            </Link>
            <a href="#how-it-works" className="btn-lp-secondary lp-hero-btn-secondary">
              See how it works
            </a>
          </div>

          <div className="lp-hero-trust">
            <span><CheckCircle size={13} /> Autosave</span>
            <span><FileJson size={13} /> PDF & JSON</span>
            <span><LayoutTemplate size={13} /> 3 templates</span>
            <a href="https://github.com/v9mirza/resumex" target="_blank" rel="noopener noreferrer">
              <Github size={13} /> GitHub
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual-content"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <motion.div
            className="hero-float-wrap"
            animate={reducedMotion ? {} : { y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          >
            <div className="mock-ui-container hero-mock-ui">
              <div className="mock-ui-header">
                <div className="mock-ui-dot mock-ui-dot--red" />
                <div className="mock-ui-dot mock-ui-dot--yellow" />
                <div className="mock-ui-dot mock-ui-dot--green" />
              </div>
              <div className="hero-mock-body">
                <div className="hero-mock-scaler">
                  <Minimal resume={HERO_PREVIEW_RESUME} />
                </div>
                <div className="hero-mock-fade" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const HOW_STEPS = [
  { icon: <UserPlus size={22} />, step: '01', title: 'Create your account', text: 'Sign up free — no credit card, no trial. Just a working email.', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
  { icon: <PenLine size={22} />, step: '02', title: 'Fill the guided builder', text: 'Work through basics, experience, education, skills, and projects — one section at a time.', color: '#0082c9', bg: 'rgba(0,130,201,0.1)' },
  { icon: <Eye size={22} />, step: '03', title: 'Preview & export', text: "Switch templates live and download a polished PDF or clean JSON the moment you're ready.", color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  { icon: <Copy size={22} />, step: '04', title: 'Manage versions', text: 'Duplicate any resume and tailor it per role. Your dashboard keeps every version safe.', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
];

const HowItWorksWithPath = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 0.85', 'end 0.4'] });
  const pathProgress = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 60, damping: 18 });
  const strokeDashoffset = useTransform(pathProgress, [0, 1], [1, 0]);

  return (
    <div ref={sectionRef} className="lp-how-path-wrap">
      <svg className="how-connector-svg" aria-hidden="true" preserveAspectRatio="none">
        <motion.line
          x1="12.5%" y1="60" x2="87.5%" y2="60"
          stroke="url(#howGrad)" strokeWidth="2" strokeDasharray="1"
          strokeDashoffset={strokeDashoffset} pathLength="1" strokeLinecap="round"
        />
        <defs>
          <linearGradient id="howGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
            <stop offset="33%" stopColor="#0082c9" stopOpacity="0.9" />
            <stop offset="66%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>
      <div className="lp-how-cards">
        {HOW_STEPS.map((item, i) => (
          <motion.div
            key={item.step}
            className="lp-how-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="lp-how-card-top">
              <div className="lp-how-card-icon" style={{ background: item.bg, color: item.color }}>{item.icon}</div>
              <span className="lp-how-card-step">{item.step}</span>
            </div>
            <h3 className="lp-how-card-title">{item.title}</h3>
            <p className="lp-how-card-text">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const HowItWorksSection = () => (
  <section id="how-it-works" className="lp-section-how">
    <div className="container">
      <motion.div
        className="lp-section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="lp-section-eyebrow">How it works</p>
        <h2 className="lp-section-title">From blank page to PDF in four steps.</h2>
        <p className="lp-section-subtitle lp-section-subtitle--narrow">
          A guided flow built for students, developers, and job seekers who want results — not formatting headaches.
        </p>
      </motion.div>
      <HowItWorksWithPath />
    </div>
  </section>
);

const STATS = [
  { value: '3', label: 'ATS-friendly templates' },
  { value: '100%', label: 'Free forever' },
  { value: 'PDF + JSON', label: 'Export formats' },
  { value: 'MIT', label: 'Open-source license' },
];

export const StatsBar = () => (
  <section className="lp-stats-bar" aria-label="ResumeX highlights">
    <div className="container">
      <div className="lp-stats-grid">
        {STATS.map((stat) => (
          <div key={stat.label} className="lp-stat-item">
            <span className="lp-stat-value">{stat.value}</span>
            <span className="lp-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const COMPARE_ROWS = [
  { feature: 'Guided step-by-step builder', word: false, resumex: true },
  { feature: 'Live template preview', word: false, resumex: true },
  { feature: 'ATS-friendly structure', word: false, resumex: true },
  { feature: 'PDF & JSON export', word: false, resumex: true },
  { feature: 'Free, no account required to explore', word: true, resumex: true },
];

export const CompareSection = () => (
  <section className="lp-section-compare" aria-labelledby="compare-heading">
    <div className="container">
      <motion.div
        className="lp-section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="lp-section-eyebrow">Why ResumeX</p>
        <h2 id="compare-heading" className="lp-section-title">Better than Word or Google Docs.</h2>
        <p className="lp-section-subtitle lp-section-subtitle--narrow">
          Generic document editors weren&apos;t built for job applications. ResumeX was.
        </p>
      </motion.div>
      <div className="lp-compare-table">
        <div className="lp-compare-row lp-compare-row--head">
          <span className="lp-compare-feature">Feature</span>
          <span className="lp-compare-col">Word / Docs</span>
          <span className="lp-compare-col lp-compare-col--highlight">ResumeX</span>
        </div>
        {COMPARE_ROWS.map((row) => (
          <div key={row.feature} className="lp-compare-row">
            <span className="lp-compare-feature">{row.feature}</span>
            <span className="lp-compare-col">{row.word ? '✓' : '—'}</span>
            <span className="lp-compare-col lp-compare-col--highlight">✓</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BentoGlowGrid = ({ children }) => {
  const gridRef = useRef(null);
  const handleMouseMove = useCallback((e) => {
    const grid = gridRef.current;
    if (!grid) return;
    grid.querySelectorAll('.lp-minimal-card').forEach((card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
    });
  }, []);
  const handleMouseLeave = useCallback(() => {
    gridRef.current?.querySelectorAll('.lp-minimal-card').forEach((card) => {
      card.style.removeProperty('--glow-x');
      card.style.removeProperty('--glow-y');
    });
  }, []);

  return (
    <div ref={gridRef} className="lp-bento-grid" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
};

export const FeaturesSection = () => (
  <section id="features" className="lp-section-features">
    <div className="container">
      <motion.div
        className="lp-section-header lp-section-header--spaced"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <p className="lp-section-eyebrow">Features</p>
        <h2 className="lp-section-title">Everything you need to land the interview.</h2>
        <p className="lp-section-subtitle">
          A calm, repeatable workflow — guided steps, live preview, and autosave so your resume is always one click away from ready.
        </p>
      </motion.div>
      <BentoGlowGrid>
        <motion.div className="lp-minimal-card bento-large lp-bento-feature-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="lp-bento-icon lp-bento-icon--blue"><Cloud size={26} /></div>
          <h3 className="lp-card-heading lp-bento-heading">Guided builder with autosave</h3>
          <p className="lp-card-body">Move step‑by‑step through every section of your resume. Nothing gets skipped, nothing gets lost — every change saves itself.</p>
          <div className="lp-builder-steps">
            {['Basics', 'Experience', 'Education', 'Skills', 'Projects'].map((step, i) => (
              <span key={step} className={`lp-builder-step-pill${i === 1 ? ' lp-builder-step-pill--active' : ''}${i === 0 ? ' lp-builder-step-pill--done' : ''}`}>
                <span className="lp-builder-step-num">{i + 1}</span>{step}
              </span>
            ))}
          </div>
          <div className="lp-builder-preview" aria-hidden="true">
            <div className="lp-builder-preview-top">
              <span className="lp-builder-preview-label">Experience</span>
              <span className="lp-builder-preview-step">Step 2 of 5</span>
            </div>
            <div className="lp-builder-preview-fields">
              <div className="lp-builder-preview-field lp-builder-preview-field--filled">
                <span className="lp-builder-preview-field-label">Job title</span>
                <span className="lp-builder-preview-field-value">Software Engineer</span>
              </div>
              <div className="lp-builder-preview-field lp-builder-preview-field--filled">
                <span className="lp-builder-preview-field-label">Company</span>
                <span className="lp-builder-preview-field-value">Acme Corp</span>
              </div>
              <div className="lp-builder-preview-field">
                <span className="lp-builder-preview-field-label">Description</span>
                <span className="lp-builder-preview-field-placeholder">Describe your impact…</span>
              </div>
            </div>
            <div className="lp-builder-preview-progress">
              <div className="lp-builder-preview-progress-track"><div className="lp-builder-preview-progress-fill" /></div>
              <span className="lp-builder-preview-progress-label">40% complete</span>
            </div>
          </div>
          <div className="lp-autosave-badge"><CheckCircle size={16} color="#10b981" /><span>Changes saved automatically</span></div>
        </motion.div>
        <motion.div className="lp-minimal-card lp-bento-feature-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <div className="lp-bento-icon lp-bento-icon--green"><FileJson size={22} /></div>
          <h3 className="lp-card-heading lp-bento-heading">PDF & JSON export</h3>
          <p className="lp-card-body">Download a polished PDF or export clean JSON — your career data is never locked to one format.</p>
          <div className="lp-export-pills">
            <div className="lp-export-pill lp-export-pill--pdf"><ShieldCheck size={13} /> Download PDF</div>
            <div className="lp-export-pill lp-export-pill--json"><FileJson size={13} /> Export JSON</div>
          </div>
        </motion.div>
        <motion.div className="lp-minimal-card lp-bento-feature-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <div className="lp-bento-icon lp-bento-icon--purple"><LayoutTemplate size={22} /></div>
          <h3 className="lp-card-heading lp-bento-heading">ATS‑friendly templates</h3>
          <p className="lp-card-body">Switch between Minimal, Classic, and Modern instantly — same data, different look, always scanner-ready.</p>
          <div className="lp-template-name-pills">
            {['Minimal', 'Classic', 'Modern'].map((name) => <span key={name} className="lp-template-name-pill">{name}</span>)}
          </div>
        </motion.div>
      </BentoGlowGrid>
    </div>
  </section>
);

const TEMPLATES = [
  { id: 'minimal', label: 'Minimal', description: 'Clean and compact — great for tech roles.', Component: Minimal, lazy: false },
  { id: 'classic', label: 'Classic', description: 'Traditional layout with clear section hierarchy.', Component: Classic, lazy: true },
  { id: 'modern', label: 'Modern', description: 'Bold typography with a contemporary feel.', Component: Modern, lazy: true },
];

export const TemplateGallery = () => {
  const [active, setActive] = useState('minimal');
  const [direction, setDirection] = useState(1);
  const { to, label } = useLandingCta();
  const activeIndex = TEMPLATES.findIndex((t) => t.id === active);
  const activeTemplate = TEMPLATES[activeIndex];
  const Component = activeTemplate.Component;

  const handleSelect = (id) => {
    const nextIndex = TEMPLATES.findIndex((t) => t.id === id);
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActive(id);
  };

  const handleTabKeyDown = (e, id) => {
    const idx = TEMPLATES.findIndex((t) => t.id === id);
    if (e.key === 'ArrowRight') { e.preventDefault(); handleSelect(TEMPLATES[(idx + 1) % TEMPLATES.length].id); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); handleSelect(TEMPLATES[(idx - 1 + TEMPLATES.length) % TEMPLATES.length].id); }
  };

  const flipVariants = {
    enter: (dir) => ({ rotateY: dir * 75, opacity: 0, scale: 0.94, filter: 'brightness(0.85)' }),
    center: { rotateY: 0, opacity: 1, scale: 1, filter: 'brightness(1)', transition: { rotateY: { type: 'spring', stiffness: 200, damping: 26 }, opacity: { duration: 0.18 }, scale: { type: 'spring', stiffness: 200, damping: 26 }, filter: { duration: 0.25 } } },
    exit: (dir) => ({ rotateY: dir * -75, opacity: 0, scale: 0.94, filter: 'brightness(0.85)', transition: { rotateY: { type: 'spring', stiffness: 260, damping: 30 }, opacity: { duration: 0.14 }, scale: { duration: 0.2 }, filter: { duration: 0.14 } } }),
  };

  const preview = activeTemplate.lazy ? (
    <Suspense fallback={<div className="lp-template-loading">Loading preview…</div>}>
      <Component resume={GALLERY_RESUME} />
    </Suspense>
  ) : (
    <Component resume={GALLERY_RESUME} />
  );

  return (
    <section id="templates" className="lp-section-templates">
      <div className="container">
        <motion.div className="lp-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="lp-section-eyebrow">Templates</p>
          <h2 className="lp-section-title">Pick a style. Keep your data.</h2>
          <p className="lp-section-subtitle lp-section-subtitle--narrow">Switch between templates instantly — your content stays exactly the same.</p>
        </motion.div>

        <div className="lp-template-tabs" role="tablist" aria-label="Resume templates">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={active === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={active === t.id ? 0 : -1}
              onClick={() => handleSelect(t.id)}
              onKeyDown={(e) => handleTabKeyDown(e, t.id)}
              className={`lp-template-tab${active === t.id ? ' lp-template-tab--active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="lp-template-desc" id={`panel-${active}-desc`}>{activeTemplate.description}</p>

        <div className="lp-template-flip-stage" role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
          <div className="mock-ui-header lp-template-chrome">
            <div className="mock-ui-dot mock-ui-dot--red" />
            <div className="mock-ui-dot mock-ui-dot--yellow" />
            <div className="mock-ui-dot mock-ui-dot--green" />
            <span className="lp-template-preview-label">{activeTemplate.label} template</span>
          </div>
          <div className="lp-template-flip-viewport">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={active} className="lp-template-flip-card" custom={direction} variants={flipVariants} initial="enter" animate="center" exit="exit">
                <div className="lp-template-preview-body lp-template-preview-body--full">
                  <div className="lp-template-preview-scaler">{preview}</div>
                  <div className="lp-template-preview-fade" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="lp-template-cta-wrap">
          <Link to={to} className="btn-lp-primary">{label} <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
};

export const CtaSection = () => {
  const { to, label } = useLandingCta();
  return (
    <section id="cta" className="lp-section-cta">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut' }} className="lp-cta-card">
          <div className="lp-cta-glow" aria-hidden="true" />
          <div className="lp-cta-inner">
            <div className="lp-cta-copy">
              <span className="lp-cta-eyebrow"><CheckCircle size={13} />Free forever · No credit card</span>
              <h2 className="lp-cta-title">Your resume, ready in <span className="text-gradient-blue">10 minutes</span>.</h2>
              <p className="lp-cta-subtitle">Guided steps, live preview, and instant PDF export — everything you need to send a polished resume today.</p>
              <div className="lp-cta-actions">
                <Link to={to} className="btn-lp-primary lp-cta-btn">{label} <ArrowRight size={18} /></Link>
                <p className="lp-cta-login">Already have an account? <Link to="/login">Log in</Link></p>
              </div>
            </div>
            <div className="lp-cta-panel">
              <p className="lp-cta-panel-label">What you get</p>
              <ul className="lp-cta-benefits">
                {[
                  { icon: <PenLine size={16} />, text: 'Guided step-by-step builder', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
                  { icon: <Cloud size={16} />, text: 'Autosave — never lose progress', color: '#0082c9', bg: 'rgba(0,130,201,0.1)' },
                  { icon: <Eye size={16} />, text: 'Live template preview', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
                  { icon: <FileJson size={16} />, text: 'PDF & JSON export', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
                  { icon: <LayoutTemplate size={16} />, text: 'ATS-friendly templates', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
                ].map((item) => (
                  <li key={item.text} className="lp-cta-benefit">
                    <span className="lp-cta-benefit-icon" style={{ background: item.bg, color: item.color }}>{item.icon}</span>
                    <span className="lp-cta-benefit-text">{item.text}</span>
                    <CheckCircle size={15} className="lp-cta-benefit-check" />
                  </li>
                ))}
              </ul>
              <div className="lp-cta-panel-footer"><ShieldCheck size={14} /><span>30-second signup · Open-source on GitHub</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section id="faq" className="lp-section-faq">
      <div className="container">
        <div className="lp-faq-layout">
          <motion.div className="lp-faq-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="lp-section-eyebrow">FAQ</p>
            <h2 className="lp-section-title">Questions? We&apos;ve got answers.</h2>
            <p className="lp-faq-subtitle">Everything you need to know before building your first resume.</p>
            <a href="https://github.com/v9mirza/resumex" target="_blank" rel="noopener noreferrer" className="lp-faq-github-link">
              <Github size={16} />View source on GitHub<ArrowRight size={14} />
            </a>
          </motion.div>
          <div className="lp-faq-list">
            {LANDING_FAQ_ITEMS.map((item, i) => {
              const isOpen = openIdx === i;
              const Icon = FAQ_ICONS[item.icon];
              const answerId = `faq-answer-${i}`;
              const triggerId = `faq-trigger-${i}`;
              return (
                <motion.div key={item.q} className={`lp-faq-item${isOpen ? ' lp-faq-item--open' : ''}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <button
                    id={triggerId}
                    className="lp-faq-trigger"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span className="lp-faq-icon" style={{ background: item.bg, color: item.color }} aria-hidden="true"><Icon size={16} /></span>
                    <span className="lp-faq-question">{item.q}</span>
                    <span className="lp-faq-chevron"><ChevronDown size={16} /></span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div key="answer" id={answerId} role="region" aria-labelledby={triggerId} className="lp-faq-answer-wrap" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: 'easeInOut' }}>
                        <p className="lp-faq-answer">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
