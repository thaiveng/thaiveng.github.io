import { motionTag } from './motionTag.js';

const variants = {
  primary:
    'bg-ink text-paper border border-ink hover:bg-[#3b3832] shadow-[0_10px_24px_-14px_rgba(42,40,36,0.7)]',
  secondary:
    'border border-line-strong bg-card/70 text-ink hover:border-ink hover:bg-card',
  ghost: 'text-ink-soft hover:text-ink',
};

const sizes = {
  md: 'px-6 py-3 text-[0.9rem]',
  sm: 'px-4 py-2 text-[0.82rem]',
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
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[0.01em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
