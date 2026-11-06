import { useMemo } from 'react';

const accents = {
  cyber: ['#00e5ff', '#0b3a4a'],
  violet: ['#a78bfa', '#2a1f4d'],
  amber: ['#ffb347', '#43301a'],
};

/**
 * Procedural thumbnail. Deliberately abstract rather than a stock photo or a
 * mocked-up screenshot — nothing here pretends to be a real product shot.
 * Drop an `image` field on any item in site.js and that wins instead.
 */
export function CardThumb({ item }) {
  const [a, b] = accents[item.accent] ?? accents.cyber;

  // deterministic pattern per item so a card always looks the same
  const seed = useMemo(
    () => [...String(item.id)].reduce((acc, ch) => acc + ch.charCodeAt(0), 0),
    [item.id]
  );

  if (item.image) {
    return (
      <img
        src={item.image}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    );
  }

  const rings = 3 + (seed % 3);
  const rotate = seed % 60;

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${b} 0%, #0b0f1a 65%)` }}
    >
      <svg
        viewBox="0 0 200 120"
        className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-110"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id={`g-${item.id}`} cx="68%" cy="32%">
            <stop offset="0%" stopColor={a} stopOpacity="0.55" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="120" fill={`url(#g-${item.id})`} />
        <g
          transform={`rotate(${rotate} 140 40)`}
          stroke={a}
          fill="none"
          strokeWidth="0.5"
          opacity="0.5"
        >
          {Array.from({ length: rings }).map((_, i) => (
            <circle key={i} cx="140" cy="40" r={14 + i * 13} />
          ))}
          <rect x="112" y="12" width="56" height="56" />
        </g>
        {/* grid floor */}
        <g stroke={a} strokeWidth="0.3" opacity="0.18">
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={60 + i * 10} x2="200" y2={60 + i * 10} />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 20} y1="60" x2={i * 20} y2="120" />
          ))}
        </g>
      </svg>

      <span
        className="absolute bottom-3 left-4 font-mono text-[0.62rem] uppercase tracking-[0.18em]"
        style={{ color: a }}
      >
        {item.year ?? ''}
      </span>
    </div>
  );
}
