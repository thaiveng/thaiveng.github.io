import { motionTag } from './motionTag.js';

const variants = {
  primary:
    'clip-notch bg-cyber text-ink font-semibold hover:bg-white shadow-[0_10px_40px_-14px_rgba(0,229,255,0.65)]',
  secondary:
    'border border-hairline bg-white/[0.02] text-chalk hover:border-cyber/60 hover:text-cyber',
  ghost: 'text-ash hover:text-cyber',
};

const sizes = {
  md: 'px-7 py-3 text-[0.85rem]',
  sm: 'px-4 py-2 text-[0.78rem]',
};

/**
 * One button for the whole site. Renders as <a> when given href, <button>
 * otherwise, so semantics stay correct without a second component.
 */
export function Button({
  as,
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const Tag = motionTag(as ?? (href ? 'a' : 'button'));

  return (
    <Tag
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      className={`inline-flex items-center justify-center gap-2 font-display tracking-[0.03em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
