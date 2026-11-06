import { motion } from 'framer-motion';

/**
 * Stable motion components keyed by tag name.
 * Calling motion.create() during render would mint a brand-new component type
 * on every pass, which remounts the subtree and kills the animation — so the
 * mapping is resolved once, here.
 */
const cache = {
  div: motion.div,
  span: motion.span,
  a: motion.a,
  button: motion.button,
  li: motion.li,
  p: motion.p,
  article: motion.article,
  section: motion.section,
  header: motion.header,
  form: motion.form,
};

export function motionTag(tag = 'div') {
  if (!cache[tag]) cache[tag] = motion.create(tag);
  return cache[tag];
}
