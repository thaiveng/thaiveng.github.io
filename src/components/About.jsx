import { profile } from '../data/site.js';
import { Section, SectionHeading } from './ui/Section.jsx';
import { Reveal } from './ui/Reveal.jsx';
import StatsRow from './StatsRow.jsx';
import Timeline from './Timeline.jsx';

/** Renders **bold** spans from the bio strings without pulling in a markdown lib. */
function RichText({ text }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) =>
        chunk.startsWith('**') && chunk.endsWith('**') ? (
          <strong key={i} className="font-semibold text-chalk">
            {chunk.slice(2, -2)}
          </strong>
        ) : (
          chunk
        )
      )}
    </>
  );
}

export default function About() {
  return (
    <Section id="about">
      <SectionHeading label="About" title={`Hi, I'm ${profile.firstName}.`}>
        A {profile.role.toLowerCase()} focused on functional and engaging tech — a blend of code,
        design and 3D experiences.
      </SectionHeading>

      <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <Reveal className="space-y-5">
          {profile.aboutBio.map((paragraph, i) => (
            <p key={i} className="text-[0.98rem] leading-[1.78] text-ash">
              <RichText text={paragraph} />
            </p>
          ))}

          <div className="mt-9 border-l-2 border-cyber/40 pl-5">
            <p className="font-display text-[1.02rem] font-medium leading-relaxed text-chalk">
              Curiosity first, craft second, shipping always.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <StatsRow />
        </Reveal>
      </div>

      {/* education + experience */}
      <div className="mt-24 grid items-start gap-12 lg:mt-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="eyebrow mb-4 flex items-center gap-3 text-cyber">
            <span className="h-px w-8 bg-cyber" aria-hidden="true" />
            Journey
          </div>
          <h3 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold text-chalk">
            Education &amp;
            <br />
            Experience
          </h3>
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-ash">
            Every class, internship and side project compounds. Here is the path so far, newest
            first.
          </p>
        </Reveal>

        <Timeline />
      </div>
    </Section>
  );
}
