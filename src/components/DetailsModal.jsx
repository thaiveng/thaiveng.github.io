import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CardThumb } from './CardThumb.jsx';
import { CloseIcon, GitHubIcon, LinkIcon } from './ui/Icons.jsx';
import { Button } from './ui/Button.jsx';

export default function DetailsModal({ item, index = 0, onClose }) {
  const panel = useRef(null);

  useEffect(() => {
    if (!item) return;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      // keep Tab inside the dialog
      if (e.key === 'Tab' && panel.current) {
        const nodes = panel.current.querySelectorAll('a[href], button:not([disabled])');
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[150] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="fixed inset-0 bg-[#2a2824]/45 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          <div className="pointer-events-none relative flex min-h-full items-center justify-center p-4 sm:p-6">
            <motion.div
              ref={panel}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-labelledby="details-title"
              initial={{ opacity: 0, y: 24, rotate: -0.6 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="pointer-events-auto relative w-full max-w-2xl overflow-hidden rounded-[10px] border border-line bg-card shadow-lift outline-none"
            >
              <button
                onClick={onClose}
                className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full border border-line bg-card/90 text-ink-soft transition-colors hover:border-ink hover:text-ink"
                aria-label="Close project notes"
              >
                <CloseIcon />
              </button>

              <div className="aspect-[16/7] w-full border-b border-line">
                <CardThumb item={item} index={index} />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-muted">
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

                <h3 id="details-title" className="mt-3 text-[clamp(1.6rem,4vw,2.1rem)]">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="mt-1 font-serif text-[1.05rem] italic text-ink-muted">{item.subtitle}</p>
                )}

                <p className="mt-5 text-[0.98rem] leading-[1.8] text-ink-soft">
                  {item.detail ?? item.blurb}
                </p>

                {item.features?.length > 0 && (
                  <>
                    <h4 className="eyebrow mt-7 font-sans text-ink-muted">Key features</h4>
                    <ul className="mt-3 grid gap-2 text-[0.92rem] text-ink-soft sm:grid-cols-2">
                      {item.features.map((f) => (
                        <li key={f} className="flex gap-2.5">
                          <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technologies">
                  {(item.tags ?? []).map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-[0.7rem] text-ink-soft"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                {(item.link || item.repo) && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {item.link && (
                      <Button href={item.link} target="_blank" rel="noreferrer noopener" size="sm">
                        <LinkIcon />
                        Visit live
                      </Button>
                    )}
                    {item.repo && (
                      <Button
                        href={item.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        variant="secondary"
                        size="sm"
                      >
                        <GitHubIcon className="size-4" />
                        View source
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
