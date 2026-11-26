import { motion } from 'framer-motion';
import { learning, skills } from '../data/site.js';
import { ChapterHeading, Section } from './ui/Section.jsx';
import { RevealGroup, revealItem, Reveal } from './ui/Reveal.jsx';
import { iconMap } from './ui/Icons.jsx';

/* each category gets a quiet accent so the grid scans by colour as well */
const tones = {
  mobile: { icon: 'text-sage bg-sage-soft', dot: 'bg-sage' },
  frontend: { icon: 'text-mist bg-mist-soft', dot: 'bg-mist' },
  backend: { icon: 'text-shu bg-shu-soft', dot: 'bg-shu' },
  database: { icon: 'text-kincha bg-[#efe2c9]', dot: 'bg-kincha' },
  tools: { icon: 'text-ink-soft bg-paper-deep', dot: 'bg-ink-faint' },
};

function SkillCard({ group, featured }) {
  const Icon = iconMap[group.icon];
  const tone = tones[group.id] ?? tones.tools;

  return (
    <motion.article
      variants={revealItem}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className={`flex flex-col rounded-[8px] border border-line bg-card p-6 shadow-paper transition-colors duration-300 hover:border-line-strong ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <header className="mb-5 flex items-center gap-3.5">
        <span className={`grid size-10 shrink-0 place-items-center rounded-full ${tone.icon}`}>
          {Icon && <Icon />}
        </span>
        <h3 className="font-serif text-[1.2rem] leading-tight">{group.group}</h3>
      </header>

      <ul className="flex flex-wrap gap-2" aria-label={`${group.group} skills`}>
        {group.items.map((skill) => (
          <li
            key={skill}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/70 px-3 py-1.5 text-[0.84rem] text-ink transition-colors duration-200 hover:border-line-strong hover:bg-paper"
          >
            <span className={`size-1.5 rounded-full ${tone.dot}`} aria-hidden="true" />
            {skill}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title" className="bg-paper-deep/60">
      <ChapterHeading
        id="skills-title"
        index="02"
        label="Skills"
        title={
          <>
            The tools on my desk<span className="text-shu">.</span>
          </>
        }
      >
        What I reach for when building. No progress bars, just the things I use to ship real
        work.
      </ChapterHeading>

      <RevealGroup className="grid gap-5 md:grid-cols-3">
        {skills.map((group) => (
          <SkillCard key={group.id} group={group} featured={group.id === 'frontend'} />
        ))}
      </RevealGroup>

      {/* sticky-note style "learning" card */}
      <Reveal delay={0.1} className="mt-10 flex justify-center md:justify-end">
        <div className="relative w-full max-w-md -rotate-1 rounded-[4px] border border-dashed border-line-strong bg-card/60 px-6 py-5">
          <div className="mb-3 flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-shu" aria-hidden="true" />
            <span className="eyebrow text-ink-muted">Currently learning</span>
          </div>
          <p className="font-serif text-[1.15rem] italic leading-relaxed text-ink-soft">
            {learning.join(', ').replace(/, ([^,]*)$/, ' and $1')}.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
