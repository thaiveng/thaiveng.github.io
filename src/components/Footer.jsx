import { motion } from 'framer-motion';
import { footer, profile, socials } from '../data/site.js';
import { ArrowUpIcon, iconMap } from './ui/Icons.jsx';
import { Reveal } from './ui/Reveal.jsx';

export default function Footer() {
  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });

  return (
    <footer className="relative z-10 border-t border-hairline bg-ink-50/60">
      <div className="mx-auto max-w-[1120px] px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="font-display text-[1.05rem] font-semibold text-chalk">
              {profile.firstName} {profile.lastName}
              <span className="text-cyber">.</span>
            </div>
            <p className="mt-4 max-w-md text-balance text-[0.95rem] leading-relaxed text-ash">
              {footer.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-5 md:items-end">
            <div className="eyebrow text-slate-muted">Elsewhere</div>
            <div className="flex gap-3">
              {socials.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    whileHover={{ y: -3 }}
                    className="grid size-10 place-items-center border border-hairline text-ash transition-colors duration-200 hover:border-cyber/50 hover:text-cyber"
                  >
                    <Icon />
                  </motion.a>
                );
              })}
            </div>
            <div className="font-mono text-[0.72rem] text-slate-muted">{profile.location}</div>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-hairline pt-7 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.72rem] text-slate-muted">{footer.copyright}</p>

          <motion.button
            onClick={toTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-2.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ash transition-colors hover:text-cyber"
            aria-label="Back to top"
          >
            Back to top
            <span className="grid size-8 place-items-center border border-hairline transition-colors group-hover:border-cyber/50">
              <ArrowUpIcon />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
