import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { timeline } from '../data/site.js';

const kindStyles = {
  education: { dot: 'bg-violet shadow-[0_0_14px_#a78bfa]', text: 'text-violet', label: 'Education' },
  experience: { dot: 'bg-cyber shadow-[0_0_14px_#00e5ff]', text: 'text-cyber', label: 'Experience' },
};

/**
 * Vertical timeline whose spine fills as you scroll past it — the progress
 * line is driven by scroll position rather than a loop, so it tracks the
 * reader instead of running on its own.
 */
export default function Timeline() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 72%', 'end 55%'],
  });
  const height = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div ref={container} className="relative pl-8 md:pl-10">
      {/* track + animated fill */}
      <div className="absolute left-0 top-1.5 h-[calc(100%-0.5rem)] w-px bg-hairline" aria-hidden="true">
        <motion.div
          style={{ height }}
          className="w-px bg-gradient-to-b from-cyber via-violet to-amber"
        />
      </div>

      <ol className="space-y-11">
        {timeline.map((item, i) => {
          const style = kindStyles[item.kind];
          return (
            <motion.li
              key={`${item.title}-${i}`}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-14% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <span
                className={`absolute -left-8 top-2 size-2.5 rounded-full md:-left-10 ${style.dot}`}
                aria-hidden="true"
              />

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className={`font-mono text-[0.68rem] uppercase tracking-[0.14em] ${style.text}`}>
                  {item.period}
                </span>
                <span className="h-3 w-px bg-hairline" aria-hidden="true" />
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-slate-muted">
                  {style.label}
                </span>
              </div>

              <h3 className="mt-2 font-display text-[1.08rem] font-semibold text-chalk">
                {item.title}
              </h3>
              {item.meta && (
                <div className="mt-0.5 text-[0.84rem] text-slate-muted">{item.meta}</div>
              )}
              <p className="mt-2.5 max-w-xl text-[0.93rem] leading-relaxed text-ash">{item.body}</p>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
