import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Counts 0 → target once the element scrolls into view.
 * Returns [ref, displayValue]. Honours reduced-motion by snapping to target.
 */
export function useCountUp(target, { duration = 1600, delay = 0 } = {}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced) {
      setValue(target);
      return;
    }

    let raf;
    let timer;

    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.round(easeOutCubic(progress) * target));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            timer = setTimeout(run, delay);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [target, duration, delay, reduced]);

  return [ref, value];
}
