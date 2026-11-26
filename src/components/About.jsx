import { education, experience, profile, projects, skills } from '../data/site.js';
import { ChapterHeading, Section, Washi } from './ui/Section.jsx';
import { Reveal, RevealGroup, revealItem } from './ui/Reveal.jsx';
import { motion } from 'framer-motion';

/** Renders **bold** spans from the bio strings without pulling in a markdown lib. */
function RichText({ text }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) =>
        chunk.startsWith('**') && chunk.endsWith('**') ? (
          <strong key={i} className="font-medium text-ink">
            {chunk.slice(2, -2)}
          </strong>
        ) : (
          chunk
        )
      )}
    </>
  );
}

/** Index card of quick facts — every line comes from site.js. */
function FactCard() {
  const current = experience.find((e) => e.current);
  const degree = education.find((e) => /bachelor|degree/i.test(e.title));
  const techCount = new Set(skills.flatMap((g) => g.items)).size;

  const rows = [
    ['Based in', profile.location],
    current && ['Now', `${current.title} · ${current.company}`],
    degree && ['Studied', degree.title.replace("Bachelor's in", 'BSc,')],
    ['Off-screen', profile.offScreen.join(' · ')],
  ].filter(Boolean);

  return (
    <div className="relative rounded-[6px] border border-line bg-card p-6 shadow-paper sm:p-7">
      <Washi tone="mist" className="-top-3 left-1/2 -translate-x-1/2 -rotate-2" />
      <div className="mb-5 border-b border-dashed border-line-strong pb-3">
        <span className="eyebrow text-ink-muted">Index card</span>
      </div>
      <dl className="space-y-3.5">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[92px_1fr] gap-3 text-[0.92rem]">
            <dt className="pt-0.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-muted">
              {k}
            </dt>
            <dd className="text-ink">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 flex gap-6 border-t border-dashed border-line-strong pt-4">
        <div>
          <div className="font-serif text-[1.9rem] leading-none text-ink">{projects.length}</div>
          <div className="mt-1 text-[0.76rem] text-ink-muted">featured projects</div>
        </div>
        <div>
          <div className="font-serif text-[1.9rem] leading-none text-ink">{techCount}</div>
          <div className="mt-1 text-[0.76rem] text-ink-muted">technologies I use</div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const [lead, ...rest] = profile.aboutBio;

  return (
    <Section id="about" labelledBy="about-title">
      <ChapterHeading
        id="about-title"
        index="01"
        label="About"
        title={
          <>
            Hi, I&apos;m {profile.firstName}.{' '}
            <span className="italic text-ink-soft">I like building things people actually use.</span>
          </>
        }
      />

      <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
        <Reveal className="space-y-5 text-[1.02rem] leading-[1.85] text-ink-soft">
          {/* magazine-style standfirst */}
          <p className="font-serif text-[clamp(1.25rem,2vw,1.42rem)] leading-[1.6] text-ink">
            <RichText text={lead} />
          </p>
          {rest.map((paragraph, i) => (
            <p key={i}>
              <RichText text={paragraph} />
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.12} className="lg:pt-2">
          <FactCard />
        </Reveal>
      </div>

      {/* interests */}
      <div className="mt-20 lg:mt-24">
        <Reveal className="mb-7 flex items-center gap-4">
          <h3 className="font-serif text-[1.45rem] italic">Currently curious about</h3>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </Reveal>
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profile.interests.map((item, i) => (
            <motion.div
              key={item.label}
              variants={revealItem}
              className="group rounded-[6px] border border-line bg-card/70 p-5 transition-colors duration-300 hover:border-line-strong hover:bg-card"
            >
              <div className="mb-3 font-mono text-[0.68rem] text-ink-faint">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="font-serif text-[1.2rem] text-ink">{item.label}</div>
              <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-muted">{item.note}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>

      {/* education — the path so far */}
      <div className="mt-20 grid gap-10 lg:mt-24 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <Reveal>
          <div className="mb-3 flex items-center gap-3 text-ink-muted">
            <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
            <span className="eyebrow">Learning</span>
          </div>
          <h3 className="font-serif text-[1.7rem]">The path so far</h3>
          <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">
            Every class, internship and side project compounds.
          </p>
        </Reveal>

        <ol className="relative space-y-8 border-l border-line pl-7">
          {education.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.08} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[33px] top-2 size-2.5 rounded-full border-2 border-paper bg-mist ring-1 ring-mist/40"
              />
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mist">
                {item.period} · {item.meta}
              </div>
              <h4 className="mt-1.5 font-serif text-[1.2rem]">{item.title}</h4>
              <p className="mt-1.5 max-w-xl text-[0.94rem] leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
