/* ============================================================
   SkillSphere Constants
   Application-wide constants, categories, features, steps
   ============================================================ */

// ─── User Roles ────────────────────────────────────────────
export const USER_ROLES = ['client', 'freelancer', 'admin']

// ─── Proposal & Application Statuses ───────────────────────
export const proposalStatuses = ['Submitted', 'Shortlisted', 'Negotiating', 'Accepted', 'Rejected']
export const applicationStatuses = proposalStatuses

// ─── Gig / Job Types & Categories ──────────────────────────
export const gigTypes = ['Fixed Price', 'Hourly', 'Milestone Based']
export const jobTypes = gigTypes

export const gigCategories = [
  'Web Development',
  'Design',
  'Marketing',
  'Writing',
  'Data',
  'Consulting',
]

// ─── Payment Providers ──────────────────────────────────────
export const paymentProviders = ['Razorpay', 'Stripe']

// ─── Landing Page — Hero Trending Searches ──────────────────
export const TRENDING_SEARCHES = [
  'React Developer',
  'UI/UX Designer',
  'Content Writer',
  'Python Developer',
  'Logo Design',
  'SEO Expert',
]

// ─── Landing Page — Popular Categories ──────────────────────
// Each item defines the icon name (React-Icons FI prefix), title,
// description, and color for display. Icon components are imported
// in the PopularCategories component.
export const CATEGORIES = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'React, Node.js, full-stack, CMS, and more',
    icon: 'FiCode',
    color: 'indigo',
    gradient: 'from-indigo-500/20 to-indigo-600/10',
    border: 'border-indigo-500/20',
    text: 'text-indigo-400',
  },
  {
    id: 'design',
    title: 'Graphic Design',
    description: 'Logos, branding, UI/UX, illustrations',
    icon: 'FiPenTool',
    color: 'pink',
    gradient: 'from-pink-500/20 to-pink-600/10',
    border: 'border-pink-500/20',
    text: 'text-pink-400',
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    description: 'SEO, social media, PPC, email campaigns',
    icon: 'FiTrendingUp',
    color: 'cyan',
    gradient: 'from-cyan-500/20 to-cyan-600/10',
    border: 'border-cyan-500/20',
    text: 'text-cyan-400',
  },
  {
    id: 'writing',
    title: 'Content Writing',
    description: 'Articles, copywriting, technical docs, blogs',
    icon: 'FiFileText',
    color: 'amber',
    gradient: 'from-amber-500/20 to-amber-600/10',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    description: 'Data science, ML, BI dashboards, Python',
    icon: 'FiBarChart2',
    color: 'emerald',
    gradient: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
  },
  {
    id: 'video',
    title: 'Video & Animation',
    description: 'Video editing, motion graphics, explainer videos',
    icon: 'FiVideo',
    color: 'purple',
    gradient: 'from-purple-500/20 to-purple-600/10',
    border: 'border-purple-500/20',
    text: 'text-purple-400',
  },
  {
    id: 'consulting',
    title: 'Business Consulting',
    description: 'Strategy, finance, HR, legal, and operations',
    icon: 'FiBriefcase',
    color: 'orange',
    gradient: 'from-orange-500/20 to-orange-600/10',
    border: 'border-orange-500/20',
    text: 'text-orange-400',
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    description: 'LLMs, computer vision, NLP, automation',
    icon: 'FiZap',
    color: 'sky',
    gradient: 'from-sky-500/20 to-sky-600/10',
    border: 'border-sky-500/20',
    text: 'text-sky-400',
  },
]

// ─── Landing Page — Why SkillSphere Features ────────────────
export const PLATFORM_FEATURES = [
  {
    id: 'ai-matching',
    icon: 'FiZap',
    title: 'AI-Powered Matching',
    description:
      'Our intelligent algorithm connects you with the perfect freelancer based on your project requirements, budget, and timeline.',
    color: 'indigo',
    gradient: 'from-indigo-500/20 to-indigo-600/10',
    border: 'border-indigo-500/20',
    text: 'text-indigo-400',
  },
  {
    id: 'verified',
    icon: 'FiShield',
    title: 'Verified Professionals',
    description:
      'Every freelancer on SkillSphere goes through a rigorous verification process ensuring quality and authenticity.',
    color: 'emerald',
    gradient: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
  },
  {
    id: 'payments',
    icon: 'FiCreditCard',
    title: 'Secure Escrow Payments',
    description:
      'Your money is safe. Funds are held in escrow and only released when you approve the delivered work.',
    color: 'cyan',
    gradient: 'from-cyan-500/20 to-cyan-600/10',
    border: 'border-cyan-500/20',
    text: 'text-cyan-400',
  },
  {
    id: 'delivery',
    icon: 'FiClock',
    title: 'Fast Delivery',
    description:
      'Set clear milestones and deadlines. Track progress in real-time and get your work delivered on time.',
    color: 'amber',
    gradient: 'from-amber-500/20 to-amber-600/10',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
  },
  {
    id: 'collaboration',
    icon: 'FiMessageSquare',
    title: 'Real-Time Collaboration',
    description:
      'Built-in messaging, file sharing, and milestone tracking to keep your project on track from start to finish.',
    color: 'pink',
    gradient: 'from-pink-500/20 to-pink-600/10',
    border: 'border-pink-500/20',
    text: 'text-pink-400',
  },
]

// ─── Landing Page — How It Works Steps ──────────────────────
export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Create Your Account',
    description: 'Sign up as a client or freelancer. Set up your profile with skills, portfolio, and preferences in minutes.',
    icon: 'FiUserPlus',
  },
  {
    step: '02',
    title: 'Find the Right Match',
    description: 'Browse services, post your project, or let our AI match you with the perfect freelancer automatically.',
    icon: 'FiSearch',
  },
  {
    step: '03',
    title: 'Hire & Collaborate',
    description: 'Review proposals, hire confidently, and collaborate with your freelancer using our built-in tools.',
    icon: 'FiHandshake',
  },
  {
    step: '04',
    title: 'Receive Delivery',
    description: 'Review the delivered work, request revisions if needed, and release payment once you\'re satisfied.',
    icon: 'FiCheckCircle',
  },
]

// ─── Landing Page — FAQ Items ────────────────────────────────
export const FAQ_ITEMS = [
  {
    question: 'How does SkillSphere ensure freelancer quality?',
    answer:
      'Every freelancer goes through identity verification, skill assessment, and portfolio review before being listed. We also use reputation scoring based on client reviews and project completion rates.',
  },
  {
    question: 'How is payment handled and protected?',
    answer:
      'We use a secure escrow system. Funds are deposited when you hire and only released to the freelancer when you approve the work. We support Razorpay and Stripe for secure transactions.',
  },
  {
    question: 'Can I hire freelancers for long-term projects?',
    answer:
      'Absolutely! SkillSphere supports fixed-price gigs, hourly contracts, and milestone-based projects — perfect for both short-term tasks and long-term collaborations.',
  },
  {
    question: 'What if I\'m not satisfied with the delivered work?',
    answer:
      'You can request revisions from your freelancer within the agreed scope. If disputes arise, our dedicated dispute resolution team will mediate fairly for both parties.',
  },
  {
    question: 'How does AI matching work?',
    answer:
      'Our AI analyzes your project requirements, budget, timeline, and past hiring patterns to recommend the most suitable freelancers from our verified talent pool.',
  },
  {
    question: 'Is SkillSphere free to use for clients?',
    answer:
      'Posting projects and browsing freelancers is completely free for clients. A small service fee applies only when a project is successfully completed.',
  },
]

// ─── Navigation Links (Landing Navbar) ──────────────────────
export const NAV_LINKS = [
  { label: 'Explore', href: '#categories' },
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
]

// ─── Footer Links ────────────────────────────────────────────
export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  services: [
    { label: 'Web Development', href: '#' },
    { label: 'Design', href: '#' },
    { label: 'AI & ML', href: '#' },
    { label: 'Marketing', href: '#' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'FAQ', href: '#faq' },
  ],
}
