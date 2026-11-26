import { motion } from 'framer-motion';
import { footer, navLinks, profile, socials } from '../data/site.js';
import { ArrowUpIcon, iconMap } from './ui/Icons.jsx';

export default function Footer() {
  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });

  return (
    <footer className="relative z-10 border-t border-line bg-paper-deep/70">
      {/* the last page of the journal */}
      <div className="flex items-center justify-center gap-4 pt-12 text-ink-muted" aria-hidden="true">
        <span className="h-px w-12 bg-line-strong" />
        <span className="font-serif text-[1rem] italic">The end</span>
        <span className="h-px w-12 bg-line-strong" />
      </div>

      <div className="mx-auto max-w-[1120px] px-4 pb-10 pt-10 sm:px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_auto] md:gap-14">
          <div>
            <div className="font-serif text-[1.3rem] text-ink">
              {profile.firstName} <span className="italic text-ink-soft">{profile.lastName}</span>
              <span className="text-shu">.</span>
            </div>
            <p className="mt-3 max-w-sm text-pretty text-[0.92rem] leading-relaxed text-ink-soft">
              {footer.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-[0.9rem]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ink-muted transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-2.5">
            {socials.map((social) => {
              const Icon = iconMap[social.icon];
              if (!Icon) return null;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  whileHover={{ y: -3 }}
                  className="grid size-10 place-items-center rounded-full border border-line-strong text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
                >
                  <Icon />
                </motion.a>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.7rem] text-ink-muted">
            {footer.copyright} · {profile.location}
          </p>

          <motion.button
            onClick={toTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
          >
            Back to top
            <span className="grid size-8 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-ink">
              <ArrowUpIcon />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
