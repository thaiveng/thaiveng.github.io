/**
 * ============================================================================
 *  SITE CONTENT — single source of truth.
 *  Every section reads from here, so you never have to touch component code
 *  to change copy, add a project, or swap a link.
 *
 *  Fields marked  // ✏️ CONFIRM  were inferred from existing copy during the
 *  redesign — check they say what you want. Optional fields (null / empty)
 *  simply don't render, so nothing on the page is ever made up.
 * ============================================================================
 */

export const profile = {
  firstName: 'Thaiveng',
  lastName: 'Thol',
  initials: 'TT',
  role: 'Developer',
  title: 'Mobile & Full-stack Developer', // ✏️ CONFIRM
  tagline: 'Curiosity first, craft second, shipping always.',
  location: 'Phnom Penh, Cambodia',
  email: 'thaiveng2@gmail.com',
  availability: 'Available for opportunities',
  /**
   * Path to a real photo (e.g. '/me.jpg' dropped in public/). While this is
   * null the hero shows a hand-drawn desk illustration instead of a portrait.
   */
  avatar: null,
  /** Short rotating notes in the hero. */
  roles: [
    'Developer @ HangPopok Cloud POS System',
    'Flutter Enthusiast',
    'UI/UX Thinker',
    'Data Explorer',
  ],
  heroBio:
    'I turn curiosity into a craft. I spend my days experimenting with code, breaking things on purpose, and transforming half-formed ideas into functional, beautiful digital realities — interfaces that feel as considered as the logic behind them.',
  aboutBio: [
    "I'm a developer based in Phnom Penh with a Computer Science degree and a stubbornly self-taught streak. I build at the intersection of code, design and interactive 3D, because the most useful software is also the kind people actually enjoy opening.",
    'Currently shipping production software at **HangPopok Cloud POS System**, where I work on robust, user-centric applications. My background spans Flutter and mobile, full-stack web, and a growing obsession with data and machine learning.',
    "When I'm not writing code you'll find me gaming, in a cinema, or plotting the next road trip through Southeast Asia.",
  ],
  /** Things I'm drawn to right now — shown in About. */
  interests: [
    { label: 'Flutter & mobile', note: 'where most of my working hours go' },
    { label: 'AI', note: 'learning how to build with it, not just around it' },
    { label: 'Data Science', note: 'finding the story inside the numbers' },
    { label: 'Emerging tech', note: 'trying things early, keeping what sticks' },
  ],
  offScreen: ['Gaming', 'Cinema', 'Road trips'],
};

export const socials = [
  { label: 'GitHub', handle: '@thaiveng', href: 'https://github.com/thaiveng', icon: 'github' },
  {
    label: 'LinkedIn',
    handle: 'in/thaiveng-thol',
    href: 'https://www.linkedin.com/in/thaiveng-thol',
    icon: 'linkedin',
  },
  {
    label: 'Instagram',
    handle: '@ur_boi_vi',
    href: 'https://instagram.com/ur_boi_vi',
    icon: 'instagram',
  },
  // Add Telegram here and it appears in Contact + Footer automatically:
  // { label: 'Telegram', handle: '@yourhandle', href: 'https://t.me/yourhandle', icon: 'telegram' },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

/* -------------------------------------------------------------------------- */
/*  EXPERIENCE — newest first                                                 */
/*  `company` / `contributions` are optional; add them as you like.           */
/* -------------------------------------------------------------------------- */
export const experience = [
  {
    company: 'HangPopok Cloud POS System',
    title: 'Mobile Developer',
    period: 'Present',
    current: true,
    location: 'Phnom Penh',
    summary:
      'Shipping production software, collaborating across teams, and growing every sprint.',
    responsibilities: [
      'Build and ship production features for a cloud point-of-sale product',
      'Collaborate across teams from planning through release',
      'Focus on reliability and the small details users actually feel',
    ],
    contributions: [],
  },
  {
    company: null,
    title: 'Flutter Developer Intern',
    period: 'Internship',
    location: 'Mobile',
    summary:
      'Built cross-platform applications in Flutter and Dart, and learned the full mobile lifecycle from first widget to store release.',
    responsibilities: [
      'Built cross-platform apps in Flutter and Dart',
      'Worked through the full mobile lifecycle, from first widget to store release',
    ],
    contributions: [],
  },
  {
    company: null,
    title: 'Mobile Development Intern',
    period: 'Internship',
    location: 'Mobile',
    summary:
      'First hands-on professional experience — feature work, debugging, and the code reviews that taught me how real teams write software.',
    responsibilities: ['Feature work and debugging', 'Took part in team code reviews'],
    contributions: [],
  },
];

/* -------------------------------------------------------------------------- */
/*  EDUCATION — shown in About                                                */
/* -------------------------------------------------------------------------- */
export const education = [
  {
    period: 'University',
    title: "Bachelor's in Computer Science",
    meta: 'Phnom Penh',
    body: 'Algorithms, data structures, networks and operating systems — the foundations that make everything else make sense.',
  },
  {
    period: 'Before that',
    title: 'Self-Taught Developer & Designer',
    meta: 'The internet',
    body: 'Documentation, long YouTube nights and personal projects. Still the single biggest input into how I learn.',
  },
];

/* -------------------------------------------------------------------------- */
/*  PROJECTS                                                                  */
/*  `image: '/shots/x.png'` (file in public/) replaces the patterned cover.   */
/*  `pattern`: seigaiha | hishi | shippo | kikko                */
/* -------------------------------------------------------------------------- */
export const projects = [
  {
    id: 'p-rentkh',
    title: 'RentKH',
    subtitle: 'Room Rental Management',
    blurb: 'A self-hosted rental management system for rooms, tenants, utility billing and payments.',
    detail:
      'Manage floors, rooms, tenants, rental assignments, monthly electricity and water readings, invoices, and full or partial payments. The system also supports Telegram bills and reminders, PDF and Excel reports, and an audit log.',
    role: 'Full-stack developer', // ✏️ CONFIRM
    features: [
      'Floors, rooms, tenants and rental assignments',
      'Monthly electricity and water readings',
      'Invoices with full or partial payments',
      'Telegram bills and reminders',
      'PDF and Excel reports, plus an audit log',
    ],
    tags: ['Go', 'SvelteKit', 'PostgreSQL'],
    year: '2026',
    accent: 'sage',
    pattern: 'seigaiha',
    link: null,
    repo: 'https://github.com/thaiveng/room_management',
  },
  {
    id: 'p-workflowkh-mobile',
    title: 'WorkflowKH Mobile',
    subtitle: 'Attendance & Leave App',
    blurb: 'A Flutter attendance and leave app connected to the WeCheckIn backend.',
    detail:
      'Includes organization sign-in, check-in and check-out, leave requests, attendance history, profile settings, and English and Khmer localization. Its typed API client and Riverpod-based architecture support offline widget and controller tests.',
    role: 'Mobile developer', // ✏️ CONFIRM
    features: [
      'Organization sign-in, check-in and check-out',
      'Leave requests and attendance history',
      'English and Khmer localization',
      'Typed API client on a Riverpod architecture',
      'Offline widget and controller tests',
    ],
    tags: ['Flutter', 'Dart', 'Riverpod'],
    year: '2026',
    accent: 'mist',
    pattern: 'hishi',
    link: null,
    repo: 'https://github.com/workflowkh/workflowkh_mobile',
  },
  {
    id: 'p-workflowkh',
    title: 'WorkflowKH UI',
    subtitle: 'Svelte Component Library',
    blurb: 'A Svelte 5 component library built with Skeleton UI and Tailwind CSS.',
    detail:
      'A reusable Svelte library packaged for SvelteKit projects, with build, type-check, and package validation workflows.',
    role: 'Frontend developer', // ✏️ CONFIRM
    features: [
      'Reusable Svelte 5 components on Skeleton UI',
      'Packaged for SvelteKit projects',
      'Build, type-check and package validation workflows',
    ],
    tags: ['Svelte 5', 'Skeleton UI', 'Tailwind CSS'],
    year: '2026',
    accent: 'kincha',
    pattern: 'shippo',
    link: 'https://www.workflowkh.com',
    repo: 'https://github.com/workflowkh/workflowkh',
  },
  {
    id: 'p-portfolio',
    title: 'This Portfolio',
    subtitle: 'A Developer’s Journal',
    blurb: 'The site you are reading — designed like a quiet personal journal.',
    detail:
      'Built with Vite, React, Tailwind CSS and Framer Motion. Every section reads from a single content file, motion is scroll-triggered and respects reduced-motion settings, and the whole thing ships as a static GitHub Pages deploy.',
    role: 'Design & development',
    features: [
      'Editorial project gallery driven by one data file',
      'Scroll-revealed sections with reduced-motion support',
      'Static deploy to GitHub Pages via Actions',
    ],
    tags: ['React', 'Framer Motion', 'Tailwind CSS'],
    year: '2026',
    accent: 'shu',
    pattern: 'kikko',
    link: 'https://thaiveng.github.io',
    repo: 'https://github.com/thaiveng/thaiveng.github.io',
  },
];

/* -------------------------------------------------------------------------- */
/*  SKILLS — grouped; no percentages, just what I actually use               */
/* -------------------------------------------------------------------------- */
export const skills = [
  {
    id: 'mobile',
    group: 'Mobile Development',
    icon: 'phone',
    items: ['Flutter', 'Dart', 'Riverpod', 'Java'],
  },
  {
    id: 'frontend',
    group: 'Frontend Development',
    icon: 'window',
    items: ['React', 'Svelte 5', 'SvelteKit', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'backend',
    group: 'Backend Development',
    icon: 'server',
    items: ['Go', 'Node.js'],
  },
  {
    id: 'database',
    group: 'Database',
    icon: 'database',
    items: ['PostgreSQL'],
  },
  {
    id: 'tools',
    group: 'Tools & Technologies',
    icon: 'tools',
    items: ['Git', 'Docker', 'Linux', 'Figma', 'UI/UX', 'Prototyping'],
  },
];

export const learning = ['AI', 'Data Science', 'Next.js', 'System Design'];

/* Kept from the old site but no longer rendered — fill these in with real
   credentials before bringing them back, so the page never shows made-up
   awards. */
export const certificates = [];
export const achievements = [];

/* -------------------------------------------------------------------------- */
/*  MUSIC                                                                     */
/* -------------------------------------------------------------------------- */
export const music = {
  heading: 'A little music. A lot of ideas.',
  blurb:
    'The soundtrack behind most of the commits on this site. Low beats, no lyrics, nothing that competes with the thinking.',
  /**
   * Paste any Spotify share link or URI here — playlist, album or track.
   */
  spotifyUrl: 'https://open.spotify.com/playlist/43Gu1AiNvfL806vBr4p8bg?si=3e91cea298684238',
  label: 'Daily Rotation',
};

/* -------------------------------------------------------------------------- */
/*  CONTACT                                                                   */
/* -------------------------------------------------------------------------- */
export const contactConfig = {
  /**
   * Static hosting can't send mail on its own. Put a Formspree / Basin /
   * Web3Forms URL here and the form POSTs to it. Anything that isn't an
   * http(s) URL (including null) makes the form open a prefilled email
   * draft instead.
   */
  endpoint: null, // e.g. 'https://formspree.io/f/xxxxxxx'
  successMessage: "Message sent. I'll get back to you soon.",
};

export const footer = {
  tagline: 'Calm, useful software — written in Phnom Penh, one sprint at a time.',
  copyright: `© ${new Date().getFullYear()} Thaiveng Thol`,
};
