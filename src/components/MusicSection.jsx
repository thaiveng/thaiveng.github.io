import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { music } from '../data/site.js';
import { Section } from './ui/Section.jsx';
import { Reveal } from './ui/Reveal.jsx';
import { SpotifyIcon } from './ui/Icons.jsx';

/** Accepts a share URL or a spotify: URI and returns the embed URL. */
function toEmbedUrl(input) {
  if (!input) return null;
  const match = String(input).match(/(playlist|album|track|artist|show|episode)[/:]([A-Za-z0-9]+)/);
  if (!match) return null;
  const [, kind, id] = match;
  return `https://open.spotify.com/embed/${kind}/${id}?utm_source=generator&theme=0`;
}

/** Decorative equaliser — the iframe gives us no audio data to read. */
function Equaliser({ bars = 5 }) {
  return (
    <div className="flex items-end gap-[3px]" aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-cyber"
          animate={{ height: ['6px', '16px', '9px', '18px', '7px'] }}
          transition={{
            duration: 1.3 + i * 0.17,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: i * 0.09,
          }}
        />
      ))}
    </div>
  );
}

export default function MusicSection() {
  const embedUrl = useMemo(() => toEmbedUrl(music.spotifyUrl), []);
  const [loaded, setLoaded] = useState(false);

  return (
    <Section id="music">
      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal>
          <div className="eyebrow mb-5 flex items-center gap-3 text-[#1ed760]">
            <SpotifyIcon className="size-[18px]" />
            {music.label}
          </div>
          <h2 className="text-balance text-[clamp(1.8rem,4vw,2.9rem)] font-bold text-chalk">
            {music.heading}
          </h2>
          <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-ash">{music.blurb}</p>

          <div className="mt-8 flex items-center gap-4 border-t border-hairline pt-6">
            <Equaliser />
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate-muted">
              Now looping while I build
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          {/* stylised frame around Spotify's own player */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-px bg-gradient-to-br from-cyber/40 via-violet/25 to-transparent opacity-60 blur-[1px]"
            />
            <div className="relative border border-hairline bg-ink-100/80 p-3 backdrop-blur-sm">
              <div className="mb-3 flex items-center justify-between px-2 pt-1">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="size-2 rounded-full bg-[#ff5f57]" />
                  <span className="size-2 rounded-full bg-[#febc2e]" />
                  <span className="size-2 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-slate-muted">
                  daily-rotation.spotify
                </span>
              </div>

              {embedUrl ? (
                <div className="relative overflow-hidden rounded-[12px] bg-ink-200">
                  {!loaded && (
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="font-mono text-[0.7rem] text-slate-muted">
                        Loading player…
                      </span>
                    </div>
                  )}
                  <iframe
                    title="Spotify daily rotation"
                    src={embedUrl}
                    width="100%"
                    height="380"
                    frameBorder="0"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    onLoad={() => setLoaded(true)}
                    className="relative block"
                  />
                </div>
              ) : (
                <div className="grid h-[380px] place-items-center rounded-[12px] border border-dashed border-hairline bg-ink-200 px-6 text-center">
                  <p className="text-[0.9rem] text-ash">
                    Add a Spotify playlist link to{' '}
                    <code className="font-mono text-cyber">music.spotifyUrl</code> in{' '}
                    <code className="font-mono text-cyber">src/data/site.js</code>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
