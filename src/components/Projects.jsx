import { useCallback, useRef, useState } from 'react';
import { projects } from '../data/site.js';
import { ChapterHeading, Section } from './ui/Section.jsx';
import { RevealGroup } from './ui/Reveal.jsx';
import ProjectCard from './ProjectCard.jsx';
import DetailsModal from './DetailsModal.jsx';

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const trigger = useRef(null);

  const open = useCallback((item, el) => {
    trigger.current = el ?? null;
    setSelected(item);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    // hand focus back to whatever opened the dialog
    requestAnimationFrame(() => trigger.current?.focus());
  }, []);

  return (
    <Section id="projects" labelledBy="projects-title" wide>
      <ChapterHeading
        id="projects-title"
        index="03"
        label="Projects"
        title={
          <>
            Things I&apos;ve built<span className="text-shu">,</span>{' '}
            <span className="italic text-ink-soft">and what they taught me.</span>
          </>
        }
      >
        Rental management, attendance apps, component libraries. Real projects with real
        repositories. Open any cover for the full notes.
      </ChapterHeading>

      <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-7" stagger={0.1}>
        {projects.map((item, i) => (
          <ProjectCard
            key={item.id}
            item={item}
            index={i}
            onOpen={open}
            featured={i === 0}
            // on tablets the grid is two-up; let a leftover last card span the row
            stretchOnTablet={i === projects.length - 1 && (projects.length - 1) % 2 === 1}
          />
        ))}
      </RevealGroup>

      <DetailsModal item={selected} index={projects.indexOf(selected)} onClose={close} />
    </Section>
  );
}
