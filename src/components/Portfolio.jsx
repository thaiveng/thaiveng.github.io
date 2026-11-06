import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, techStack } from '../data/site.js';
import { Section, SectionHeading } from './ui/Section.jsx';
import { Reveal } from './ui/Reveal.jsx';
import ProjectCard from './ProjectCard.jsx';
import DetailsModal from './DetailsModal.jsx';

const TABS = [
  { id: 'projects', label: 'Projects', items: projects },
  { id: 'stack', label: 'Tech Stack', items: null },
];

export default function Portfolio() {
  const [tab, setTab] = useState('projects');
  const [selected, setSelected] = useState(null);

  const active = useMemo(() => TABS.find((t) => t.id === tab), [tab]);

  return (
    <Section id="portfolio" wide className="bg-ink-50/40">
      <SectionHeading label="Portfolio" title="Things I've built, earned and learned">
        Dashboard apps, AI automation tools, mobile builds and the credentials behind them. Pick a
        category.
      </SectionHeading>

      {/* ---------- filter tabs ---------- */}
      <Reveal className="mb-12">
        <div
          role="tablist"
          aria-label="Portfolio categories"
          className="flex flex-wrap gap-2 border-b border-hairline pb-3"
        >
          {TABS.map((t) => {
            const isActive = t.id === tab;
            const count = t.items ? t.items.length : techStack.length;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(t.id)}
                className={`relative rounded-none px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.13em] transition-colors duration-200 ${
                  isActive ? 'text-ink' : 'text-ash hover:text-chalk'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 -z-10 bg-cyber"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {t.label}
                  <sup className={`ml-1.5 text-[0.6rem] ${isActive ? 'text-ink/60' : 'text-slate-muted'}`}>
                    {count}
                  </sup>
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* ---------- panels ---------- */}
      <div role="tabpanel" aria-label={active.label}>
        <AnimatePresence mode="wait">
          {tab === 'stack' ? (
            <motion.div
              key="stack"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {techStack.map((group, i) => (
                <motion.div
                  key={group.group}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                  whileHover={{ y: -4 }}
                  className={`border bg-ink-100/70 p-6 transition-colors duration-300 ${
                    group.learning
                      ? 'border-amber/30 hover:border-amber/60'
                      : 'border-hairline hover:border-cyber/40'
                  }`}
                >
                  <div
                    className={`mb-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] ${
                      group.learning ? 'text-amber' : 'text-cyber'
                    }`}
                  >
                    {group.group}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className={`border px-2.5 py-1 text-[0.78rem] transition-colors duration-150 ${
                          group.learning
                            ? 'border-amber/30 bg-amber/5 text-amber'
                            : 'border-hairline bg-ink-200 text-chalk hover:border-cyber/40 hover:text-cyber'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={tab}
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {active.items.map((item) => (
                  <ProjectCard key={item.id} item={item} onOpen={setSelected} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DetailsModal item={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
