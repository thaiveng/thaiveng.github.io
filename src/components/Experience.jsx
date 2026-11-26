import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { experience } from '../data/site.js';
import { ChapterHeading, Section } from './ui/Section.jsx';

/**
 * Career timeline. The ink line fills as you read down it — driven by scroll
 * position, so it follows the reader rather than running on its own.
 */
export default function Experience() {
  const list = useRef(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 75%', 'end 60%'] });
  const fill = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <Section id="experience" labelledBy="experience-title" className="bg-paper-deep/60">
      <ChapterHeading
        id="experience-title"
        index="04"
        label="Experience"
        title={
          <>
            Where I&apos;ve been working<span className="text-shu">.</span>
          </>
        }
      >
        From first internship to production software, newest first.
      </ChapterHeading>

      <div ref={list} className="relative">
        {/* the spine: a faint track with an ink fill */}
        <div
          aria-hidden="true"
          className="absolute bottom-2 left-[7px] top-2 w-px bg-line-strong md:left-[calc(200px+7px)]"
        >
          <motion.div style={{ height: fill }} className="w-px bg-ink" />
        </div>

        <ol className="space-y-12 md:space-y-14">
          {experience.map((job, i) => (
            <motion.li
              key={`${job.title}-${i}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid gap-3 pl-9 md:grid-cols-[200px_1fr] md:gap-0 md:pl-0"
            >
              {/* period column */}
              <div className="md:pr-10 md:pt-1 md:text-right">
                <div className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-muted">
                  {job.period}
                </div>
                {job.location && (
                  <div className="mt-1 text-[0.82rem] text-ink-muted">{job.location}</div>
                )}
              </div>

              {/* node on the spine */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 grid size-[15px] place-items-center rounded-full border md:left-[200px] ${
                  job.current ? 'border-shu bg-paper' : 'border-line-strong bg-paper'
                }`}
              >
                <span className={`size-[7px] rounded-full ${job.current ? 'bg-shu' : 'bg-ink-faint'}`} />
              </span>

              {/* entry */}
              <article className="rounded-[8px] border border-line bg-card p-6 shadow-paper md:ml-10 sm:p-7">
                <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div>
                    <h3 className="text-[1.35rem] leading-tight">{job.title}</h3>
                    {job.company && (
                      <p className="mt-1 text-[0.94rem] text-ink-soft">{job.company}</p>
                    )}
                  </div>
                  {job.current && (
                    <span className="rounded-full border border-shu/30 bg-shu-soft/70 px-2.5 py-0.5 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-shu">
                      Current
                    </span>
                  )}
                </header>

                {job.summary && (
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">{job.summary}</p>
                )}

                {job.responsibilities?.length > 0 && (
                  <div className="mt-5">
                    <h4 className="eyebrow font-sans text-ink-muted">Responsibilities</h4>
                    <ul className="mt-2.5 space-y-1.5 text-[0.92rem] text-ink-soft">
                      {job.responsibilities.map((r) => (
                        <li key={r} className="flex gap-2.5">
                          <span className="mt-[0.72em] h-px w-3 shrink-0 bg-ink-faint" aria-hidden="true" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.contributions?.length > 0 && (
                  <div className="mt-5">
                    <h4 className="eyebrow font-sans text-ink-muted">Key contributions</h4>
                    <ul className="mt-2.5 space-y-1.5 text-[0.92rem] text-ink-soft">
                      {job.contributions.map((c) => (
                        <li key={c} className="flex gap-2.5">
                          <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
