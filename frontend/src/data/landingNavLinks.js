export const LANDING_NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Templates', href: '/#templates' },
  { label: 'FAQ', href: '/#faq' },
];

export const LANDING_FAQ_ITEMS = [
  { q: 'Is ResumeX free?', a: 'Yes. You can create an account, build multiple resumes, and export PDFs and JSON without entering a credit card.', icon: 'CheckCircle', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  { q: 'Can I export my resume as PDF and JSON?', a: 'From the preview screen you can download a ready‑to‑send PDF or export your full resume data as JSON at any time.', icon: 'FileJson', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  { q: 'Are the templates ATS‑friendly?', a: 'The Minimal, Classic, and Modern templates use clean structure and typography so Applicant Tracking Systems can parse your content reliably.', icon: 'LayoutTemplate', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
  { q: 'What happens to my data?', a: 'Your resumes are stored securely in your account and can be deleted at any time from your profile. The project is open‑source for full transparency.', icon: 'ShieldCheck', color: '#0082c9', bg: 'rgba(0,130,201,0.1)' },
  { q: 'Can I create multiple versions of my resume?', a: 'Yes. Use the dashboard to keep separate versions for different roles or companies, and duplicate any resume to iterate quickly.', icon: 'Copy', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
  { q: 'Does ResumeX write or change my content?', a: 'No. ResumeX focuses on structure, clarity, and exports—you stay in full control of the words on your resume.', icon: 'PenLine', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
];

export const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: LANDING_FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};
