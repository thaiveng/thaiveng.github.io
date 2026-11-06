import { motion } from 'framer-motion';
import { CardThumb } from './CardThumb.jsx';
import { ArrowRightIcon } from './ui/Icons.jsx';

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.22 } },
};

export default function ProjectCard({ item, onOpen }) {
  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className="group relative flex flex-col overflow-hidden border border-hairline bg-ink-100/70 transition-colors duration-300 hover:border-cyber/40 hover:shadow-[0_28px_70px_-32px_rgba(0,229,255,0.35)]"
    >
      <div className="h-40 w-full overflow-hidden border-b border-hairline">
        <CardThumb item={item} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {(item.tags ?? []).slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="border border-hairline bg-ink-200/80 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ash"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-chalk transition-colors duration-200 group-hover:text-cyber">
          {item.title}
        </h3>

        <p className="mt-2 flex-1 text-[0.88rem] leading-relaxed text-ash">{item.blurb}</p>

        <button
          onClick={() => onOpen(item)}
          className="mt-5 inline-flex items-center gap-2 self-start font-mono text-[0.7rem] uppercase tracking-[0.14em] text-cyber transition-colors hover:text-white"
        >
          Details
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            <ArrowRightIcon className="size-3.5" />
          </span>
        </button>
      </div>
    </motion.article>
  );
}
