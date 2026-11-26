import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { profile, projects } from '../data/site.js';
import { Button } from './ui/Button.jsx';
import { ArrowRightIcon } from './ui/Icons.jsx';
import { Hanko, Washi } from './ui/Section.jsx';
import HeroIllustration from './HeroIllustration.jsx';

const ease = [0.22, 1, 0.36, 1];

/** Cycles through profile.roles with a soft crossfade (static under reduced-motion). */
function useRotating(items, ms = 3200) {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || items.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % items.length), ms);
    return () => clearInterval(t);
  }, [items.length, ms, reduced]);
  return items[i];
}

/** A handful of drifting petals. CSS-only, so they cost almost nothing. */
const PETALS = [
  { left: '12%', delay: '0s', dur: '16s', size: 10 },
  { left: '34%', delay: '5s', dur: '19s', size: 8 },
  { left: '58%', delay: '2.5s', dur: '15s', size: 11 },
  { left: '76%', delay: '8s', dur: '18s', size: 9 },
  { left: '92%', delay: '11s', dur: '17s', size: 7 },
];

function Petals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="absolute -top-6 block animate-petal bg-[#e7c1b9] opacity-0"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.8,
            borderRadius: '80% 0 80% 0',
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}
    </div>
  );
}

function fadeUp(i) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: 0.12 + i * 0.08, ease },
  };
}

export default function Hero() {
  const ref = useRef(null);
  const note = useRotating(profile.roles);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // gentle parallax: the photo drifts slower than the text
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 70]);
  const sunY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);

  const year = new Date().getFullYear();
  const latest = projects[0];

  return (
    <section
      ref={ref}
      id="home"
      aria-labelledby="hero-title"
      className="relative z-10 flex items-center overflow-hidden px-4 pb-20 pt-24 sm:px-6 md:px-10 md:pt-28 lg:min-h-[100svh] lg:pb-24"
    >
      {/* graph-paper spread, fading out toward the edges */}
      <div
        aria-hidden="true"
        className="paper-dots absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_30%,transparent_80%)]"
      />
      {/* pale rising sun behind the photo */}
      <motion.div
        aria-hidden="true"
        style={{ y: sunY }}
        className="absolute right-[-12%] top-[14%] size-[min(78vw,560px)] rounded-full bg-sakura/55 blur-[2px] lg:right-[4%]"
      />
      <Petals />

      <div className="relative mx-auto w-full max-w-[1240px]">
        {/* masthead — like the header strip of a journal page */}
        <motion.div
          {...fadeUp(0)}
          className="mb-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line pb-3 text-ink-muted md:mb-16"
        >
          <span className="eyebrow">No. {String(year).slice(2)} — {profile.location}</span>
          <span className="font-serif text-[0.95rem] italic">A developer&apos;s journal</span>
        </motion.div>

        <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
          {/* ---------- words ---------- */}
          <div className="min-w-0">
            <motion.div {...fadeUp(1)} className="mb-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-sage/40 bg-sage-soft/70 px-3.5 py-1.5 text-[0.8rem] font-medium text-sage">
                <span className="relative grid size-2 place-items-center" aria-hidden="true">
                  <span className="absolute size-2 rounded-full bg-sage/70 animate-pulse-ring" />
                  <span className="size-2 rounded-full bg-sage" />
                </span>
                {profile.availability}
              </span>
            </motion.div>

            <motion.p {...fadeUp(2)} className="mb-3 font-serif text-[1.15rem] italic text-ink-soft">
              <span className="text-shu">Hello,</span> I&apos;m
            </motion.p>

            <motion.h1
              {...fadeUp(3)}
              id="hero-title"
              className="text-[clamp(3.1rem,9vw,6.6rem)] font-medium leading-[0.95] tracking-[-0.03em]"
            >
              {profile.firstName}
              <br />
              <span className="italic text-ink-soft">{profile.lastName}</span>
              <span className="text-shu">.</span>
            </motion.h1>

            <motion.p {...fadeUp(4)} className="mt-6 text-[1.08rem] font-medium text-ink">
              <span className="marker">{profile.title}</span>
            </motion.p>

            <motion.blockquote
              {...fadeUp(5)}
              className="mt-7 max-w-xl border-l-2 border-shu/60 pl-5 font-serif text-[clamp(1.2rem,2.2vw,1.45rem)] italic leading-snug text-ink"
            >
              {profile.tagline}
            </motion.blockquote>

            <motion.p
              {...fadeUp(6)}
              className="mt-6 max-w-xl text-pretty text-[1rem] leading-[1.8] text-ink-soft"
            >
              {profile.heroBio}
            </motion.p>

            <motion.div {...fadeUp(7)} className="mt-9 flex flex-wrap items-center gap-3.5">
              <Button href="#projects">
                View My Projects
                <ArrowRightIcon />
              </Button>
              <Button href="#contact" variant="secondary">
                Contact Me
              </Button>
            </motion.div>

            {/* rotating "today's note" */}
            <motion.div
              {...fadeUp(8)}
              className="mt-10 flex items-center gap-3 text-[0.86rem] text-ink-muted"
            >
              <span className="eyebrow shrink-0 text-ink-faint">Note</span>
              <span className="h-px w-6 shrink-0 bg-line-strong" aria-hidden="true" />
              <span className="relative block h-6 min-w-0 flex-1 overflow-hidden" aria-live="off">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={note}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease }}
                    className="absolute inset-0 truncate font-serif text-[1rem] italic text-ink-soft"
                  >
                    {note}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>
          </div>

          {/* ---------- the "photo" taped into the journal ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 1.1, delay: 0.35, ease }}
            className="relative mx-auto w-full max-w-[400px] lg:mr-4"
          >
            <motion.div style={{ y: photoY }}>
              <figure className="relative rounded-[6px] bg-card p-3 pb-14 shadow-lift">
                <Washi tone="sakura" className="-left-5 top-3 -rotate-[32deg]" />
                <Washi tone="sage" className="-right-6 top-6 rotate-[38deg]" />

                <div className="aspect-[5/6] overflow-hidden rounded-[3px] bg-paper-deep">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={`${profile.firstName} ${profile.lastName}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <HeroIllustration className="h-full w-full" />
                  )}
                </div>

                <figcaption className="absolute bottom-4 left-4 right-16 flex items-baseline justify-between gap-3">
                  <span className="font-serif text-[1.02rem] italic text-ink-soft">
                    {profile.avatar ? `${profile.firstName}, ${profile.location.split(',')[0]}` : 'the desk, after hours'}
                  </span>
                </figcaption>

                <Hanko className="absolute -bottom-7 -right-6" size={66} rotate={-12}>
                  {profile.initials}
                </Hanko>
              </figure>

              {/* sticky note pointing at the latest project */}
              {latest && (
                <motion.a
                  href="#projects"
                  initial={{ opacity: 0, y: 16, rotate: -6 }}
                  animate={{ opacity: 1, y: 0, rotate: -5 }}
                  transition={{ duration: 0.9, delay: 0.9, ease }}
                  whileHover={{ rotate: -2, y: -3 }}
                  className="absolute -left-3 top-[54%] block w-[168px] rounded-[3px] bg-[#f2e6bf] p-3.5 text-left shadow-paper sm:-left-14"
                >
                  <span className="eyebrow block text-[0.6rem] text-ink-muted">Latest project</span>
                  <span className="mt-1 block font-serif text-[1.08rem] leading-tight text-ink">
                    {latest.title}
                  </span>
                  <span className="mt-0.5 block text-[0.75rem] leading-snug text-ink-soft">
                    {latest.subtitle}
                  </span>
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-muted transition-colors hover:text-ink lg:flex"
        aria-label="Scroll to the About section"
      >
        <span className="eyebrow" aria-hidden="true">
          Scroll
        </span>
        <span className="h-10 w-px origin-top bg-ink-faint animate-scroll-pulse" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
