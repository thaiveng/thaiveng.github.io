import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CardThumb } from './CardThumb.jsx';
import { CloseIcon, GitHubIcon, LinkIcon } from './ui/Icons.jsx';
import { Button } from './ui/Button.jsx';

export default function DetailsModal({ item, onClose }) {
  const panel = useRef(null);

  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
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
          className="fixed inset-0 z-[150] grid place-items-center overflow-y-auto p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <div
            className="fixed inset-0 bg-ink/85 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panel}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            initial={{ opacity: 0, scale: 0.95, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="relative my-auto w-full max-w-xl border border-hairline bg-ink-100 shadow-card outline-none"
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center border border-hairline bg-ink/70 text-ash transition-colors hover:border-cyber/50 hover:text-cyber"
              aria-label="Close details"
            >
              <CloseIcon />
            </button>

            <div className="h-44 w-full overflow-hidden border-b border-hairline">
              <CardThumb item={item} />
            </div>

            <div className="p-7">
              <div className="flex flex-wrap items-center gap-2">
                {(item.tags ?? []).map((tag) => (
                  <span
                    key={tag}
                    className="border border-hairline bg-ink-200 px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-ash"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="mt-5 font-display text-[1.45rem] font-bold text-chalk">{item.title}</h3>

              {item.issuer && (
                <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-slate-muted">
                  {item.issuer} · {item.year}
                </p>
              )}

              <p className="mt-4 text-[0.96rem] leading-[1.75] text-ash">
                {item.detail ?? item.blurb}
              </p>

              {(item.link || item.repo) && (
                <div className="mt-7 flex flex-wrap gap-3">
                  {item.link && (
                    <Button href={item.link} target="_blank" rel="noreferrer noopener" size="sm">
                      <LinkIcon />
                      Visit
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
                      Source
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
