import { Reveal } from './Reveal.jsx';

/** Consistent section rhythm + max width for every block on the page. */
export function Section({ id, children, className = '', wide = false }) {
  return (
    <section id={id} className={`relative z-10 scroll-mt-24 px-6 py-24 md:px-10 lg:py-32 ${className}`}>
      <div className={`mx-auto w-full ${wide ? 'max-w-[1240px]' : 'max-w-[1120px]'}`}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({ label, title, children, align = 'left' }) {
  const centered = align === 'center';
  return (
    <Reveal className={`mb-14 ${centered ? 'text-center' : ''}`}>
      {label && (
        <div
          className={`eyebrow mb-4 flex items-center gap-3 text-cyber ${
            centered ? 'justify-center' : ''
          }`}
        >
          <span className="h-px w-8 bg-cyber" aria-hidden="true" />
          {label}
        </div>
      )}
      <h2 className="text-balance text-[clamp(1.9rem,4.2vw,3rem)] font-bold text-chalk">{title}</h2>
      {children && (
        <p
          className={`mt-5 max-w-xl text-[0.98rem] leading-relaxed text-ash ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {children}
        </p>
      )}
    </Reveal>
  );
}

/** Soft radial light used behind hero / contact blocks. */
export function GlowOrb({ className = '', color = 'rgba(0,229,255,0.09)', size = 620 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 rounded-full blur-[2px] ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
      }}
    />
  );
}
