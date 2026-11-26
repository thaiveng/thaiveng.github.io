import { Reveal } from './Reveal.jsx';

/** Consistent section rhythm + max width for every block on the page. */
export function Section({ id, children, className = '', wide = false, compact = false, labelledBy }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative z-10 scroll-mt-20 px-4 sm:px-6 md:px-10 ${
        compact ? 'py-20 lg:py-24' : 'py-24 lg:py-32'
      } ${className}`}
    >
      <div className={`mx-auto w-full ${wide ? 'max-w-[1240px]' : 'max-w-[1120px]'}`}>
        {children}
      </div>
    </section>
  );
}

/**
 * Chapter-style heading: "01 ── About", then a serif title.
 * Reads like a section opener in a printed journal.
 */
export function ChapterHeading({ id, index, label, title, children, align = 'left' }) {
  const centered = align === 'center';
  return (
    <Reveal className={`mb-14 md:mb-16 ${centered ? 'text-center' : ''}`}>
      <div
        className={`mb-6 flex items-center gap-4 text-ink-muted ${centered ? 'justify-center' : ''}`}
      >
        {index && (
          <span className="font-serif text-[1.05rem] italic text-shu" aria-hidden="true">
            {index}
          </span>
        )}
        <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
        <span className="eyebrow">{label}</span>
      </div>
      <h2
        id={id}
        className="text-balance text-[clamp(2rem,4.6vw,3.3rem)] leading-[1.06]"
      >
        {title}
      </h2>
      {children && (
        <p
          className={`mt-5 max-w-xl text-pretty text-[1rem] leading-relaxed text-ink-soft ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {children}
        </p>
      )}
    </Reveal>
  );
}

/** Round vermilion seal. Pure decoration. */
export function Hanko({ children, className = '', size = 64, rotate = -8 }) {
  return (
    <span
      aria-hidden="true"
      className={`grid place-items-center rounded-full border-2 border-shu/80 font-serif font-semibold text-shu/90 mix-blend-multiply ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.26,
        lineHeight: 1.05,
        transform: `rotate(${rotate}deg)`,
        boxShadow: 'inset 0 0 0 3px rgb(244 239 228), inset 0 0 0 4px rgb(184 85 63 / 0.55)',
      }}
    >
      {children}
    </span>
  );
}

/** Strip of washi tape. `tone` picks the paper colour. */
const tapeTones = {
  sage: 'bg-sage/35',
  mist: 'bg-mist/30',
  sakura: 'bg-[#e3b7ae]/55',
  kincha: 'bg-kincha/35',
};

export function Washi({ tone = 'sakura', className = '', style }) {
  return <span aria-hidden="true" className={`washi ${tapeTones[tone]} ${className}`} style={style} />;
}
