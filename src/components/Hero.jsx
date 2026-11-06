import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/site.js';
import { usePointer } from '../hooks/usePointer.js';
import { Button } from './ui/Button.jsx';
import { ArrowRightIcon } from './ui/Icons.jsx';

// three.js is ~600kB of the bundle — keep it out of the critical path
const HeroScene = lazy(() => import('./three/HeroScene.jsx'));

const hasWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

/** Types / deletes through profile.roles. */
function useTypewriter(words, { typeMs = 85, deleteMs = 45, holdMs = 1700 } = {}) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    const word = words[index % words.length];

    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () =>
        setText((current) =>
          deleting ? word.slice(0, current.length - 1) : word.slice(0, current.length + 1)
        ),
      deleting ? deleteMs : typeMs
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs, reduced]);

  return text;
}

export default function Hero() {
  const pointer = usePointer();
  const typed = useTypewriter(profile.roles);
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    // defer the canvas one frame past paint so the text lands first
    const id = requestAnimationFrame(() => setCanRender3D(hasWebGL()));
    return () => cancelAnimationFrame(id);
  }, []);

  const fade = useMemo(
    () => ({
      hidden: { opacity: 0, y: 28 },
      show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] },
      }),
    }),
    []
  );

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-24 pt-32 md:px-10"
    >
      {/* ---------- 3D layer ---------- */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {canRender3D ? (
          <Suspense fallback={<CanvasFallback />}>
            <HeroScene pointer={pointer} />
          </Suspense>
        ) : (
          <CanvasFallback />
        )}
        {/* legibility scrim: keeps type readable over the brightest frames */}
        <div className="absolute inset-0 bg-ink/55 md:bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* ---------- content ---------- */}
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="max-w-2xl">
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0}
            className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-cyber"
          >
            <span className="h-px w-8 bg-cyber" />
            {profile.location}
            <span className="inline-flex items-center gap-2 text-slate-muted">
              <span className="relative grid size-2 place-items-center">
                <span className="absolute size-2 rounded-full bg-emerald-400/80 animate-pulse-ring" />
                <span className="size-1.5 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </span>
          </motion.div>

          <motion.h1
            variants={fade}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-[clamp(2.6rem,7.2vw,5.4rem)] font-bold leading-[1.02] text-chalk"
          >
            Welcome to
            <br />
            My <span className="gradient-text">Portfolio</span>
          </motion.h1>

          {/* glowing animated subtitle */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <motion.span
              className="font-display text-[clamp(1.4rem,3.4vw,2.1rem)] font-semibold text-cyber text-glow"
              animate={{ opacity: [0.78, 1, 0.78] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {profile.tagline}
            </motion.span>
            <span className="hidden h-6 w-px bg-hairline sm:block" />
            <span className="font-mono text-[0.9rem] text-ash">
              <span className="text-amber">~/</span>
              {typed}
              <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-cyber animate-blink" />
            </span>
          </motion.div>

          <motion.p
            variants={fade}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-8 max-w-xl text-pretty text-[1.02rem] leading-[1.75] text-ash"
          >
            {profile.heroBio}
          </motion.p>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="#portfolio">
              View Projects
              <ArrowRightIcon />
            </Button>
            <Button href="#contact" variant="secondary">
              Contact Me
            </Button>
          </motion.div>
        </div>
      </div>

      {/* ---------- scroll hint ---------- */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 text-slate-muted transition-colors hover:text-cyber md:flex"
        aria-label="Scroll to about section"
      >
        <span className="eyebrow">Scroll</span>
        <span className="h-12 w-px bg-gradient-to-b from-cyber to-transparent animate-scroll-pulse" />
      </motion.a>
    </section>
  );
}

/** Shown while three.js loads, and permanently if WebGL is unavailable. */
function CanvasFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute right-[12%] top-1/2 size-[520px] -translate-y-1/2 rounded-full animate-float blur-xl"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, rgba(0,229,255,0.22), rgba(167,139,250,0.12) 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute left-[-10%] bottom-[-10%] size-[420px] rounded-full blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,179,71,0.10), transparent 70%)',
        }}
      />
    </div>
  );
}
