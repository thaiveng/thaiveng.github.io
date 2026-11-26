import { motion } from 'framer-motion';
import { CardThumb } from './CardThumb.jsx';
import { ArrowRightIcon, ArrowUpRightIcon, GitHubIcon } from './ui/Icons.jsx';
import { revealItem } from './ui/Reveal.jsx';

function ProjectLinks({ item, onOpen }) {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-dashed border-line-strong pt-4">
      <button
        type="button"
        onClick={(e) => onOpen(item, e.currentTarget)}
        className="group/btn inline-flex items-center gap-1.5 text-[0.86rem] font-medium text-ink transition-colors hover:text-shu"
      >
        Read notes
        <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
      </button>
      <span className="flex-1" />
      {item.repo && (
        <a
          href={item.repo}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 text-[0.84rem] text-ink-soft transition-colors hover:text-ink"
          aria-label={`${item.title} source code on GitHub`}
        >
          <GitHubIcon className="size-4" />
          GitHub
        </a>
      )}
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 text-[0.84rem] text-ink-soft transition-colors hover:text-ink"
          aria-label={`Visit ${item.title} live`}
        >
          Live
          <ArrowUpRightIcon className="size-3.5" />
        </a>
      )}
    </div>
  );
}

/**
 * `featured` lays the card out horizontally across the full grid width —
 * the opening spread of the gallery.
 */
export default function ProjectCard({ item, index, onOpen, featured = false, stretchOnTablet = false }) {
  const features = featured ? item.features : item.features?.slice(0, 3);

  return (
    <motion.article
      variants={revealItem}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      className={`group flex flex-col overflow-hidden rounded-[8px] border border-line bg-card shadow-paper transition-shadow duration-300 hover:shadow-lift ${
        featured
          ? 'md:col-span-2 lg:col-span-12 lg:grid lg:grid-cols-[1.25fr_1fr]'
          : `lg:col-span-4 ${stretchOnTablet ? 'md:col-span-2' : ''}`
      }`}
      aria-labelledby={`${item.id}-title`}
    >
      <button
        type="button"
        onClick={(e) => onOpen(item, e.currentTarget)}
        className={`relative block w-full overflow-hidden border-b border-line text-left ${
          featured
            ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[420px] lg:border-b-0 lg:border-r'
            : `aspect-[16/10] ${stretchOnTablet ? 'md:aspect-[21/9] lg:aspect-[16/10]' : ''}`
        }`}
        aria-label={`Open notes for ${item.title}`}
      >
        <CardThumb item={item} index={index} />
      </button>

      <div className={`flex flex-1 flex-col ${featured ? 'p-6 sm:p-8 lg:p-10' : 'p-6'}`}>
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-muted">
          <span className="text-shu">No. {String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden="true">·</span>
          <span>{item.year}</span>
          {item.role && (
            <>
              <span aria-hidden="true">·</span>
              <span>{item.role}</span>
            </>
          )}
        </div>

        <h3
          id={`${item.id}-title`}
          className={`leading-tight ${featured ? 'text-[clamp(1.7rem,3vw,2.3rem)]' : 'text-[1.45rem]'}`}
        >
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="mt-1 font-serif text-[1rem] italic text-ink-muted">{item.subtitle}</p>
        )}

        <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-soft">{item.blurb}</p>

        {features?.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-[0.88rem] text-ink-soft">
            {features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-faint" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="mb-5 mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {(item.tags ?? []).map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line bg-paper/80 px-2.5 py-0.5 font-mono text-[0.66rem] tracking-[0.04em] text-ink-soft"
            >
              {tag}
            </li>
          ))}
        </ul>

        <ProjectLinks item={item} onOpen={onOpen} />
      </div>
    </motion.article>
  );
}
