/**
 * "The desk, after hours" — a flat, hand-built SVG scene: a window at dusk
 * over Phnom Penh rooftops, a sleeping cat on the sill, a wind chime, and a
 * laptop with code on screen. Pure decoration, so it is aria-hidden; the
 * caption around it carries the meaning.
 */
export default function HeroIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 480"
      className={className}
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="hi-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c6d3dc" />
          <stop offset="55%" stopColor="#ecd6cf" />
          <stop offset="100%" stopColor="#f5e4cc" />
        </linearGradient>
        <clipPath id="hi-window">
          <rect x="56" y="36" width="288" height="282" />
        </clipPath>
      </defs>

      {/* wall */}
      <rect width="400" height="480" fill="#eee4d3" />

      {/* view through the window */}
      <g clipPath="url(#hi-window)">
        <rect x="56" y="36" width="288" height="282" fill="url(#hi-sky)" />
        <circle cx="252" cy="150" r="46" fill="#e8b4a0" opacity="0.85" />
        <g fill="#fbf8f1" opacity="0.85">
          <rect x="80" y="112" width="92" height="15" rx="7.5" />
          <rect x="102" y="99" width="48" height="17" rx="8.5" />
          <rect x="226" y="198" width="118" height="13" rx="6.5" />
          <rect x="254" y="187" width="52" height="15" rx="7.5" />
        </g>
        <path d="M56 262 C110 236 160 248 200 238 S300 222 344 246 V318 H56Z" fill="#bfcbd0" />
        <g fill="#9fb0b6">
          <rect x="66" y="268" width="42" height="50" />
          <rect x="112" y="254" width="26" height="64" />
          <rect x="143" y="276" width="52" height="42" />
          <rect x="203" y="246" width="22" height="72" />
          <path d="M200 246 L214 232 L228 246Z" />
          <rect x="231" y="270" width="48" height="48" />
          <rect x="284" y="258" width="30" height="60" />
          <rect x="318" y="278" width="26" height="40" />
        </g>
        <g fill="#e2c38e">
          <rect x="74" y="278" width="5" height="5" />
          <rect x="92" y="290" width="5" height="5" />
          <rect x="119" y="266" width="4" height="5" />
          <rect x="209" y="262" width="4" height="5" />
          <rect x="209" y="280" width="4" height="5" />
          <rect x="242" y="282" width="5" height="5" />
          <rect x="292" y="272" width="5" height="5" />
          <rect x="161" y="290" width="5" height="5" />
        </g>
      </g>

      {/* window frame + transom */}
      <rect x="56" y="36" width="288" height="282" fill="none" stroke="#5d5142" strokeWidth="8" />
      <line x1="200" y1="36" x2="200" y2="318" stroke="#5d5142" strokeWidth="5" />
      <line x1="56" y1="96" x2="344" y2="96" stroke="#5d5142" strokeWidth="3" />

      {/* furin — wind chime */}
      <g className="animate-swing" style={{ transformOrigin: '150px 40px', transformBox: 'view-box' }}>
        <line x1="150" y1="40" x2="150" y2="72" stroke="#5d5142" strokeWidth="1" />
        <path d="M139 82 a11 11 0 0 1 22 0Z" fill="#dbe3e8" stroke="#5c7288" strokeWidth="1.2" />
        <line x1="150" y1="82" x2="150" y2="96" stroke="#5d5142" strokeWidth="0.8" />
        <rect x="146" y="96" width="8" height="24" fill="#ecd3cd" stroke="#c99d92" strokeWidth="0.6" />
      </g>

      {/* sill */}
      <rect x="40" y="318" width="320" height="14" rx="3" fill="#cdb893" />

      {/* plant */}
      <g>
        <ellipse cx="86" cy="281" rx="7" ry="17" fill="#6c7d60" transform="rotate(-26 86 281)" />
        <ellipse cx="101" cy="277" rx="7" ry="19" fill="#879879" transform="rotate(16 101 277)" />
        <ellipse cx="93" cy="270" rx="6" ry="16" fill="#76876a" transform="rotate(-3 93 270)" />
        <rect x="78" y="293" width="30" height="25" rx="3" fill="#b8553f" opacity="0.85" />
        <rect x="76" y="291" width="34" height="6" rx="2" fill="#a24a37" opacity="0.85" />
      </g>

      {/* sleeping cat */}
      <g fill="#4a4640">
        <ellipse cx="306" cy="306" rx="30" ry="13" />
        <circle cx="282" cy="303" r="11" />
        <path d="M273 297 L276 284 L284 294Z" />
        <path d="M283 293 L291 284 L292 297Z" />
        <path d="M334 311 C352 302 348 286 334 291" fill="none" stroke="#4a4640" strokeWidth="5" strokeLinecap="round" />
      </g>
      <path d="M276 305 q3 2 6 0" fill="none" stroke="#eee4d3" strokeWidth="1.2" strokeLinecap="round" />

      {/* desk */}
      <rect x="0" y="372" width="400" height="108" fill="#d8c6a5" />
      <rect x="0" y="372" width="400" height="7" fill="#c6af88" />
      <g stroke="#cbb791" strokeWidth="1" opacity="0.7">
        <path d="M0 410 C80 404 160 416 240 408 S360 404 400 412" fill="none" />
        <path d="M0 446 C90 440 170 452 260 444 S360 440 400 448" fill="none" />
      </g>

      {/* books */}
      <rect x="26" y="342" width="62" height="10" rx="1.5" fill="#c39a5b" />
      <rect x="34" y="352" width="56" height="10" rx="1.5" fill="#5c7288" />
      <rect x="22" y="362" width="66" height="10" rx="1.5" fill="#6c7d60" />

      {/* laptop */}
      <rect x="118" y="268" width="158" height="100" rx="6" fill="#34312c" />
      <rect x="126" y="276" width="142" height="84" rx="3" fill="#3e3b35" />
      <g>
        <rect x="134" y="287" width="38" height="4" rx="2" fill="#a9b89b" />
        <rect x="176" y="287" width="26" height="4" rx="2" fill="#d7b57f" />
        <rect x="142" y="297" width="60" height="4" rx="2" fill="#a7bccb" />
        <rect x="142" y="307" width="32" height="4" rx="2" fill="#e8bfb4" />
        <rect x="178" y="307" width="42" height="4" rx="2" fill="#a9b89b" />
        <rect x="150" y="317" width="48" height="4" rx="2" fill="#d7b57f" />
        <rect x="142" y="327" width="72" height="4" rx="2" fill="#a7bccb" />
        <rect x="134" y="337" width="30" height="4" rx="2" fill="#a9b89b" />
        <rect x="134" y="347" width="20" height="4" rx="2" fill="#e8bfb4" />
        <rect x="158" y="346" width="5" height="7" fill="#f4efe4" className="animate-blink" />
      </g>
      <path d="M98 368 H296 L306 380 H88Z" fill="#8f877a" />
      <rect x="176" y="368" width="42" height="3" rx="1.5" fill="#7b7468" />

      {/* mug + steam */}
      <g fill="none" stroke="#a39b8c" strokeWidth="1.6" strokeLinecap="round">
        <path className="animate-steam" d="M322 330 c-4 -6 4 -10 0 -16" />
        <path className="animate-steam" style={{ animationDelay: '1.2s' }} d="M331 332 c-4 -6 4 -10 0 -16" />
        <path className="animate-steam" style={{ animationDelay: '2.4s' }} d="M340 330 c-4 -6 4 -10 0 -16" />
      </g>
      <rect x="314" y="340" width="34" height="32" rx="5" fill="#f7f2e8" stroke="#8a8070" strokeWidth="1.4" />
      <rect x="314" y="352" width="34" height="6" fill="#dbe3e8" />
      <path d="M348 347 c11 0 11 15 0 15" fill="none" stroke="#8a8070" strokeWidth="1.4" />
    </svg>
  );
}
