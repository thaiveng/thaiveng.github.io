import { motion } from 'framer-motion';
import { motionTag } from './motionTag.js';

/**
 * Scroll-triggered entrance. One wrapper instead of repeating the same
 * whileInView config in a dozen places.
 */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  once = true,
  className = '',
  as = 'div',
}) {
  const Tag = motionTag(as);
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px -8% 0px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Staggers direct children of a grid/list. */
export function RevealGroup({ children, className = '', stagger = 0.08 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const revealItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
