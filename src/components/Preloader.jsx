import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/site.js';

const PHASES = [
  [0, 'Booting runtime'],
  [18, 'Compiling shaders'],
  [42, 'Loading 3D assets'],
  [68, 'Warming geometry buffers'],
  [88, 'Mounting interface'],
  [100, 'Ready'],
];

const phaseFor = (p) => PHASES.filter(([at]) => p >= at).at(-1)[1];

/**
 * Full-screen loader. The progress bar is driven by real signals — fonts
 * resolving and the window load event — with an eased floor so the counter
 * reads smoothly instead of snapping from 0 to 100 on a warm cache.
 */
export default function Preloader({ onDone, minDuration = 1900 }) {
  const [progress, setProgress] = useState(0);
  const target = useRef(8);

  useEffect(() => {
    const started = performance.now();
    let raf;
    let finished = false;

    const bump = (to) => {
      target.current = Math.max(target.current, to);
    };

    // real readiness signals
    document.fonts?.ready.then(() => bump(55));
    if (document.readyState === 'complete') bump(80);
    else window.addEventListener('load', () => bump(80), { once: true });

    const tick = (now) => {
      const elapsed = now - started;

      // time-based floor: guarantees the loader is legible even on fast loads
      const floor = Math.min(92, (elapsed / minDuration) * 92);
      bump(floor);

      if (elapsed >= minDuration && target.current >= 80) bump(100);

      setProgress((current) => {
        const next = current + (target.current - current) * 0.09;
        if (target.current >= 100 && next > 99.4) {
          if (!finished) {
            finished = true;
            setTimeout(onDone, 480);
          }
          return 100;
        }
        return next;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone, minDuration]);

  const shown = Math.round(progress);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink px-6"
      exit={{ opacity: 0, filter: 'blur(14px)' }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* drifting backdrop light */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute size-[560px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.10) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="font-display text-[2.6rem] font-bold leading-none tracking-tight text-chalk">
            {profile.firstName}
            <span className="text-cyber">.</span>
          </div>
          <div className="eyebrow mt-3 text-slate-muted">{profile.role} — {profile.tagline}</div>
        </motion.div>

        {/* counter */}
        <div className="mb-3 flex items-baseline justify-between font-mono text-[0.72rem] text-ash">
          <span className="tracking-[0.14em] uppercase">{phaseFor(shown)}…</span>
          <span
            className="font-display text-[1.6rem] font-bold tabular-nums text-cyber"
            aria-live="polite"
          >
            {shown}%
          </span>
        </div>

        {/* track */}
        <div
          className="h-[3px] w-full overflow-hidden bg-hairline"
          role="progressbar"
          aria-valuenow={shown}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading portfolio"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cyber via-violet to-amber"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>

        <div className="mt-4 font-mono text-[0.68rem] text-slate-muted">
          Loading assets… {shown}%
        </div>
      </div>
    </motion.div>
  );
}
