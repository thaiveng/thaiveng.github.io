import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/site.js';

/**
 * Brief "opening the journal" moment. Progress is driven by real signals —
 * fonts resolving and the window load event — with an eased time floor so it
 * never flashes, and never holds a fast visitor for long.
 */
export default function Preloader({ onDone, minDuration = 1100 }) {
  const [progress, setProgress] = useState(0);
  const target = useRef(10);

  useEffect(() => {
    const started = performance.now();
    let raf;
    let timer;
    let finished = false;

    const bump = (to) => {
      target.current = Math.max(target.current, to);
    };

    document.fonts?.ready.then(() => bump(60));
    if (document.readyState === 'complete') bump(85);
    else window.addEventListener('load', () => bump(85), { once: true });

    const tick = (now) => {
      const elapsed = now - started;
      bump(Math.min(92, (elapsed / minDuration) * 92));
      if (elapsed >= minDuration && target.current >= 85) bump(100);

      setProgress((current) => {
        const next = current + (target.current - current) * 0.12;
        if (target.current >= 100 && next > 99.4) {
          if (!finished) {
            finished = true;
            timer = setTimeout(onDone, 260);
          }
          return 100;
        }
        return next;
      });

      if (!finished) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [onDone, minDuration]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-paper px-6"
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        <span className="font-serif text-[0.95rem] italic text-ink-muted">A developer&apos;s journal</span>
        <div className="mt-3 font-serif text-[2.4rem] leading-none text-ink">
          {profile.firstName}
          <span className="text-shu">.</span>
        </div>

        {/* an ink stroke drawing across the page */}
        <div
          className="mt-7 h-[2px] w-48 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading portfolio"
        >
          <div className="h-full rounded-full bg-ink" style={{ width: `${progress}%` }} />
        </div>
      </motion.div>
    </motion.div>
  );
}
