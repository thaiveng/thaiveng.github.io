/** Hand-rolled inline icons — no icon library, no extra bundle weight. */
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function GitHubIcon({ className = 'size-[18px]' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.47c.52.1.71-.23.71-.5v-1.76c-2.9.63-3.52-1.4-3.52-1.4-.47-1.2-1.16-1.52-1.16-1.52-.95-.65.07-.64.07-.64 1.05.08 1.6 1.08 1.6 1.08.93 1.6 2.44 1.14 3.04.87.09-.68.36-1.14.66-1.4-2.32-.27-4.76-1.16-4.76-5.17 0-1.14.4-2.07 1.07-2.8-.11-.26-.46-1.32.1-2.75 0 0 .87-.28 2.85 1.07a9.9 9.9 0 0 1 5.18 0c1.98-1.35 2.85-1.07 2.85-1.07.56 1.43.21 2.49.1 2.75.67.73 1.07 1.66 1.07 2.8 0 4.02-2.44 4.9-4.77 5.16.37.33.7.95.7 1.92v2.85c0 .28.19.61.71.5A10.5 10.5 0 0 0 12 1.5Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = 'size-[18px]' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.84v1.57h.05A4.2 4.2 0 0 1 17.2 9.2c3 0 3.8 1.86 3.8 4.98V21h-4v-5.9c0-1.4-.5-2.37-1.76-2.37-.96 0-1.53.64-1.78 1.26-.09.22-.12.53-.12.84V21h-4V9.5Z" />
    </svg>
  );
}

export function InstagramIcon({ className = 'size-[18px]' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowUpIcon({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export function ArrowRightIcon({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export function CloseIcon({ className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function MenuIcon({ className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function LinkIcon({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L10.7 5.1" />
      <path d="M14 11a5 5 0 0 0-7.07 0L4.8 13.12a5 5 0 0 0 7.07 7.07L13.3 18.9" />
    </svg>
  );
}

export function UploadIcon({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M12 16V4m-5 5 5-5 5 5" />
      <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

export function SpotifyIcon({ className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.56 14.42a.77.77 0 0 1-1.06.26c-2.9-1.77-6.55-2.17-10.86-1.19a.77.77 0 1 1-.34-1.5c4.7-1.07 8.75-.61 12 1.37.36.22.48.7.26 1.06Zm1.22-2.72a.96.96 0 0 1-1.32.32c-3.32-2.04-8.38-2.64-12.3-1.44a.96.96 0 1 1-.56-1.84c4.48-1.36 10.06-.7 13.87 1.64a.96.96 0 0 1 .31 1.32Zm.1-2.83C14.1 8.5 7.8 8.28 4.4 9.31a1.15 1.15 0 1 1-.67-2.2c3.9-1.19 10.86-.96 15.14 1.59a1.15 1.15 0 0 1-1.18 1.97l.19-.2Z" />
    </svg>
  );
}

export const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
};
