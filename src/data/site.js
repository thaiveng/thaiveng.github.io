/**
 * ============================================================================
 *  SITE CONTENT — single source of truth.
 *  Every section reads from here, so you never have to touch component code
 *  to change copy, add a project, or swap a link.
 *
 *  Items marked  // ⚠️ PLACEHOLDER  are scaffolding for you to replace with
 *  your real projects / certificates / awards. The numbers in `stats` are
 *  derived from these arrays automatically, so they stay honest as you edit.
 * ============================================================================
 */

export const profile = {
  firstName: 'Thaiveng',
  lastName: 'Thol',
  brand: 'ThaivengDev',
  initials: 'TT',
  role: 'Developer',
  tagline: '3D Creative',
  location: 'Phnom Penh, Cambodia',
  email: 'thaiveng2@gmail.com',
  availability: 'Open to projects & collaborations',
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
};

export const socials = [
  { label: 'GitHub', href: 'https://github.com/thaiveng', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thaiveng-thol', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://instagram.com/ur_boi_vi', icon: 'instagram' },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

/* -------------------------------------------------------------------------- */
/*  TIMELINE — education + experience, newest first                           */
/* -------------------------------------------------------------------------- */
export const timeline = [
  {
    kind: 'experience',
    period: 'Present',
    title: 'Mobile Developer — HangPopok Cloud POS System',
    meta: 'Phnom Penh',
    body: 'Shipping production software, collaborating across teams, and growing every sprint. Focused on reliability and the small details users actually feel.',
  },
  {
    kind: 'experience',
    period: 'Internship',
    title: 'Flutter Developer Intern',
    meta: 'Mobile',
    body: 'Built cross-platform applications in Flutter and Dart, and learned the full mobile lifecycle from first widget to store release.',
  },
  {
    kind: 'experience',
    period: 'Internship',
    title: 'Mobile Development Intern',
    meta: 'Mobile',
    body: 'First hands-on professional experience — feature work, debugging, and the code reviews that taught me how real teams write software.',
  },
  {
    kind: 'education',
    period: 'University',
    title: "Bachelor's in Computer Science",
    meta: 'Phnom Penh', 
    body: 'Algorithms, data structures, networks and operating systems — the foundations that make everything else make sense.',
  },
  {
    kind: 'education',
    period: 'Before that',
    title: 'Self-Taught Developer & Designer',
    meta: 'The internet',
    body: 'Documentation, long YouTube nights and personal projects. Still the single biggest input into how I learn.',
  },
];

/* -------------------------------------------------------------------------- */
/*  PORTFOLIO                                                                 */
/* -------------------------------------------------------------------------- */
export const projects = [
  {
    id: 'p-rentkh',
    title: 'RentKH — Room Rental Management',
    blurb: 'A self-hosted rental management system for rooms, tenants, utility billing and payments.',
    detail:
      'Manage floors, rooms, tenants, rental assignments, monthly electricity and water readings, invoices, and full or partial payments. The system also supports Telegram bills and reminders, PDF and Excel reports, and an audit log.',
    tags: ['Go', 'SvelteKit', 'PostgreSQL'],
    year: '2026',
    accent: 'cyber',
    link: null,
    repo: 'https://github.com/thaiveng/room_management',
  },
  {
    id: 'p-workflowkh-mobile',
    title: 'WorkflowKH Mobile',
    blurb: 'A Flutter attendance and leave app connected to the WeCheckIn backend.',
    detail:
      'Includes organization sign-in, check-in and check-out, leave requests, attendance history, profile settings, and English and Khmer localization. Its typed API client and Riverpod-based architecture support offline widget and controller tests.',
    tags: ['Flutter', 'Dart', 'Riverpod'],
    year: '2026',
    accent: 'violet',
    link: null,
    repo: 'https://github.com/workflowkh/workflowkh_mobile',
  },
  {
    id: 'p-workflowkh',
    title: 'WorkflowKH UI Library',
    blurb: 'A Svelte 5 component library built with Skeleton UI and Tailwind CSS.',
    detail:
      'A reusable Svelte library packaged for SvelteKit projects, with build, type-check, and package validation workflows.',
    tags: ['Svelte 5', 'Skeleton UI', 'Tailwind CSS'],
    year: '2026',
    accent: 'amber',
    link: 'https://www.workflowkh.com',
    repo: 'https://github.com/workflowkh/workflowkh',
  },
  {
    id: 'p-3d',
    title: 'Interactive 3D Portfolio',
    blurb: 'This site: React Three Fiber geometry and scroll-linked motion.',
    detail:
      'Built with Vite, React, Tailwind, Framer Motion and React Three Fiber. The hero runs a lightweight procedural scene that tracks the pointer, with reduced-motion and mobile fallbacks so it never costs more than it gives.',
    tags: ['React Three Fiber', 'Framer Motion', 'Tailwind'],
    year: '2026',
    accent: 'cyber',
    link: 'https://thaiveng.github.io',
    repo: 'https://github.com/thaiveng/thaiveng.github.io',
  },
];

export const certificates = [
  // ⚠️ PLACEHOLDERS — replace with your real credentials + verification links
  {
    id: 'c-1',
    title: 'Flutter Development',
    blurb: 'Cross-platform mobile development, state management and release workflow.',
    detail: 'Course completion covering widgets, navigation, state management and store deployment.',
    tags: ['Flutter', 'Mobile'],
    issuer: 'Course provider',
    year: '2025',
    accent: 'cyber',
    link: null,
  },
  {
    id: 'c-2',
    title: 'Python for Data Science',
    blurb: 'Data wrangling, visualisation and the statistics underneath the models.',
    detail: 'Covered NumPy, Pandas, visualisation and an introduction to supervised learning.',
    tags: ['Python', 'Data'],
    issuer: 'Course provider',
    year: '2025',
    accent: 'violet',
    link: null,
  },
  {
    id: 'c-3',
    title: 'Docker Essentials',
    blurb: 'Containers, images, compose and shipping the same thing you tested.',
    detail: 'Hands-on with image layering, multi-stage builds and compose-based local environments.',
    tags: ['Docker', 'DevOps'],
    issuer: 'Course provider',
    year: '2026',
    accent: 'amber',
    link: null,
  },
];

export const achievements = [
  // ⚠️ PLACEHOLDERS — replace with your real awards / recognitions
  {
    id: 'a-1',
    title: 'Hackathon Finalist',
    blurb: 'Built and pitched a working prototype inside a weekend.',
    detail: 'Team of four, 48 hours, one deployed demo and a live pitch to judges.',
    tags: ['Team', 'Prototype'],
    year: '2025',
    accent: 'amber',
  },
  {
    id: 'a-2',
    title: 'Academic Recognition',
    blurb: 'Recognised for coursework and project performance during the CS degree.',
    detail: 'Awarded for consistent project work across the programme.',
    tags: ['University'],
    year: '2024',
    accent: 'cyber',
  },
];

export const techStack = [
  { group: 'Mobile', items: ['Flutter', 'Dart','Java'] },
  { group: 'Web', items: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'HTML/CSS'] },
  { group: 'Creative', items: ['Three.js', 'React Three Fiber', 'Framer Motion', 'Tailwind'] },
  { group: 'DevOps & Tools', items: ['Git', 'Docker', 'Linux'] },
  { group: 'Design', items: ['Figma', 'UI/UX', 'Prototyping'] },
  { group: 'Currently learning', items: ['AI', 'Next.js', 'System Design'], learning: true },
];

/* Stats auto-derive from the arrays above so they can never drift out of sync. */
export const stats = [
  { label: 'Projects Created', value: projects.length, suffix: '+' },
  { label: 'Certificates Validated', value: certificates.length, suffix: '' },
  { label: 'Awards Achieved', value: achievements.length, suffix: '' },
  { label: 'Technologies Used', value: techStack.flatMap((g) => g.items).length, suffix: '+' },
];

/* -------------------------------------------------------------------------- */
/*  MUSIC                                                                     */
/* -------------------------------------------------------------------------- */
export const music = {
  heading: 'A little music. A lot of ideas.',
  blurb:
    'The soundtrack behind most of the commits on this site. Low beats, no lyrics, nothing that competes with the thinking.',
  /**
   * Paste any Spotify share link or URI here — playlist, album or track.
   * ⚠️ PLACEHOLDER: this is a well-known public lo-fi playlist, not mine.
   *    Swap it for your own "Daily Rotation" link.
   */
  spotifyUrl: 'https://open.spotify.com/playlist/43Gu1AiNvfL806vBr4p8bg?si=3e91cea298684238',
  label: 'Daily Rotation',
};

/* -------------------------------------------------------------------------- */
/*  CONTACT / COMMENTS CONFIG                                                 */
/* -------------------------------------------------------------------------- */
export const contactConfig = {
  /**
   * Static hosting can't send mail on its own. Drop in a Formspree (or
   * Basin / Web3Forms) endpoint and the form POSTs there. Leave it null and
   * the form falls back to opening a prefilled email draft instead.
   */
  endpoint: "thaiveng2@gmail.com", // e.g. 'https://formspree.io/f/xxxxxxx'
  successMessage: "Message sent. I'll get back to you soon.",
};

export const footer = {
  tagline:
    'Building modern web experiences with precise code, sharp typography, and interactive 3D dimensions.',
  copyright: `© ${new Date().getFullYear()} Thaiveng Thol. All rights reserved.`,
};
