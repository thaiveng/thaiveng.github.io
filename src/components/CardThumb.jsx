import { useId } from 'react';

/**
 * Project cover. Each project gets a traditional Japanese pattern in its own
 * accent colour, styled like the cover of a small printed book — clearly an
 * illustration, never a fake screenshot. Add `image` to a project in site.js
 * and a real screenshot is used instead.
 */
const accents = {
  sage: { bg: '#e3e7d8', fg: '#6c7d60', ink: '#4f5e45' },
  mist: { bg: '#dfe6ea', fg: '#5c7288', ink: '#435667' },
  kincha: { bg: '#f0e5cf', fg: '#a9844a', ink: '#7c5f31' },
  shu: { bg: '#f3e0d8', fg: '#b8553f', ink: '#8d3f2e' },
};

function Pattern({ id, kind, color, bg }) {
  const stroke = { fill: 'none', stroke: color, strokeWidth: 0.9 };
  switch (kind) {
    case 'seigaiha': {
      // concentric arcs; each lower row overlaps the one above
      const wave = (cx, cy) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="20" fill={bg} stroke={color} strokeWidth="0.9" />
          {[15, 10, 5].map((r) => (
            <circle key={r} cx={cx} cy={cy} r={r} {...stroke} />
          ))}
        </g>
      );
      return (
        <pattern id={id} width="40" height="20" patternUnits="userSpaceOnUse">
          {[wave(0, 0), wave(40, 0), wave(20, 10), wave(0, 20), wave(40, 20)]}
        </pattern>
      );
    }
    case 'hishi':
      return (
        <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M11 0 L22 11 L11 22 L0 11Z" {...stroke} />
          <path d="M11 6 L16 11 L11 16 L6 11Z" {...stroke} />
        </pattern>
      );
    case 'shippo':
      return (
        <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
          {[
            [12, 0],
            [0, 12],
            [24, 12],
            [12, 24],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="12" {...stroke} />
          ))}
        </pattern>
      );
    case 'kikko':
    default:
      return (
        <pattern id={id} width="30" height="17.32" patternUnits="userSpaceOnUse">
          <path d="M0 8.66 L5 0 H15 L20 8.66 L15 17.32 H5Z M20 8.66 H30" {...stroke} />
          <path d="M4 8.66 L7 3.5 H13 L16 8.66 L13 13.8 H7Z" {...stroke} opacity="0.6" />
        </pattern>
      );
  }
}

export function CardThumb({ item, index = 0, className = '' }) {
  const a = accents[item.accent] ?? accents.sage;
  // unique per render so the card and the open modal never share an SVG id
  const patId = `pat-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  if (item.image) {
    return (
      <div className={`relative h-full w-full overflow-hidden ${className}`}>
        <img
          src={item.image}
          alt={`Screenshot of ${item.title}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: a.bg }}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]">
        <defs>
          <Pattern id={patId} kind={item.pattern} color={a.fg} bg={a.bg} />
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patId})`} opacity="0.42" />
      </svg>

      {/* soft sun disc */}
      <div
        className="absolute -right-[8%] -top-[18%] aspect-square w-[46%] rounded-full transition-transform duration-[1.2s] ease-out group-hover:-translate-x-2 group-hover:translate-y-2"
        style={{ background: a.fg, opacity: 0.14 }}
      />

      {/* the "book cover" label */}
      <div className="absolute inset-y-[14%] left-[8%] flex w-[min(62%,260px)] flex-col justify-between rounded-[3px] border border-black/5 bg-card/95 p-4 shadow-paper sm:p-5">
        <div className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.16em]" style={{ color: a.ink }}>
          <span>No. {String(index + 1).padStart(2, '0')}</span>
          <span>{item.year}</span>
        </div>
        <div>
          <div className="font-serif text-[clamp(1.15rem,2.3vw,1.6rem)] leading-[1.05] text-ink">
            {item.title}
          </div>
          {item.subtitle && (
            <div className="mt-1.5 font-serif text-[0.86rem] italic text-ink-muted">{item.subtitle}</div>
          )}
        </div>
        <div className="h-[3px] w-10 rounded-full" style={{ background: a.fg }} />
      </div>
    </div>
  );
}
