import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createCommentStore, timeAgo } from '../lib/commentStore.js';
import { fileToAvatar } from '../lib/image.js';
import { Button } from './ui/Button.jsx';
import { UploadIcon } from './ui/Icons.jsx';

const STATUS = {
  connecting: { label: 'Connecting', dot: 'bg-shu', text: 'text-shu', pulse: true },
  live: { label: 'Realtime connected', dot: 'bg-sage', text: 'text-sage', pulse: true },
  polling: { label: 'Connected', dot: 'bg-mist', text: 'text-mist', pulse: false },
  offline: { label: 'Offline — queued locally', dot: 'bg-ink-faint', text: 'text-ink-muted', pulse: false },
};

/** Coloured initial, used when a visitor doesn't upload a picture. */
function Avatar({ comment }) {
  const hue = useMemo(
    () => [...comment.name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360,
    [comment.name]
  );

  if (comment.avatar) {
    return (
      <img
        src={comment.avatar}
        alt=""
        className="size-10 shrink-0 rounded-full border border-line object-cover"
      />
    );
  }

  return (
    <div
      className="grid size-10 shrink-0 place-items-center rounded-full border font-display text-[0.85rem] font-semibold"
      style={{
        borderColor: `hsl(${hue} 70% 60% / 0.35)`,
        background: `hsl(${hue} 70% 55% / 0.12)`,
        color: `hsl(${hue} 80% 72%)`,
      }}
      aria-hidden="true"
    >
      {comment.name.trim().charAt(0).toUpperCase() || '?'}
    </div>
  );
}

export default function Comments() {
  const store = useMemo(() => createCommentStore(), []);
  const [{ comments, status }, setSnapshot] = useState({ comments: [], status: 'connecting' });

  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [busy, setBusy] = useState(false);
  const fileInput = useRef(null);

  useEffect(() => {
    const unsubscribe = store.subscribe(setSnapshot);
    store.init();
    return () => {
      unsubscribe();
      store.destroy();
    };
  }, [store]);

  const onPickFile = async (e) => {
    const file = e.target.files?.[0];
    setFileError(null);
    if (!file) return;
    try {
      setAvatar(await fileToAvatar(file));
    } catch (err) {
      setFileError(err.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (body.trim().length < 2 || busy) return;
    setBusy(true);
    try {
      await store.add({ name: name || 'Anonymous', body, avatar });
      setBody('');
      setAvatar(null);
      if (fileInput.current) fileInput.current.value = '';
    } finally {
      setBusy(false);
    }
  };

  const meta = STATUS[status] ?? STATUS.connecting;
  const remaining = 600 - body.length;

  return (
    <div className="border border-line bg-card p-6 md:p-8">
      {/* ---------- header + connection status ---------- */}
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
        <div>
          <h3 className="font-display text-[1.15rem] font-semibold text-ink">Live comment wall</h3>
          <p className="mt-1 text-[0.86rem] text-ink-soft">
            Leave a note. New comments appear instantly across your open tabs.
          </p>
        </div>

        <div
          className="flex items-center gap-2.5 border border-line bg-paper px-3 py-1.5"
          role="status"
          aria-live="polite"
        >
          <span className="relative grid size-2 place-items-center">
            {meta.pulse && (
              <span className={`absolute size-2 rounded-full ${meta.dot} animate-pulse-ring`} />
            )}
            <span className={`size-1.5 rounded-full ${meta.dot}`} />
          </span>
          <span className={`font-mono text-[0.64rem] uppercase tracking-[0.14em] ${meta.text}`}>
            {meta.label}
          </span>
        </div>
      </div>

      {/* ---------- composer ---------- */}
      <form onSubmit={onSubmit} className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={40}
            className="min-w-0 flex-1 border border-line bg-paper px-3.5 py-2.5 text-[0.88rem] text-ink placeholder:text-ink-faint focus:border-mist/60 focus:outline-none"
          />

          <label className="flex cursor-pointer items-center gap-2 border border-line bg-paper px-3.5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-soft transition-colors hover:border-mist/40 hover:text-mist">
            <UploadIcon />
            {avatar ? 'Change' : 'Picture'}
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              onChange={onPickFile}
              className="sr-only"
            />
          </label>

          {avatar && (
            <div className="flex items-center gap-2">
              <img
                src={avatar}
                alt="Your selected picture"
                className="size-9 rounded-full border border-mist/40 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setAvatar(null);
                  if (fileInput.current) fileInput.current.value = '';
                }}
                className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-ink-muted hover:text-shu"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {fileError && <p className="text-[0.78rem] text-shu">{fileError}</p>}

        <div className="relative">
          <textarea
            rows={3}
            value={body}
            onChange={(e) => setBody(e.target.value.slice(0, 600))}
            placeholder="Say something nice (or useful)…"
            className="w-full resize-y border border-line bg-paper px-4 py-3 text-[0.9rem] text-ink placeholder:text-ink-faint focus:border-mist/60 focus:outline-none"
          />
          <span className="pointer-events-none absolute bottom-3 right-3 font-mono text-[0.64rem] text-ink-muted">
            {remaining}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[0.64rem] text-ink-muted">
            Stored in your browser · swap the adapter in commentStore.js to go global
          </p>
          <Button type="submit" size="sm" disabled={body.trim().length < 2 || busy}>
            {busy ? 'Posting…' : 'Post'}
          </Button>
        </div>
      </form>

      {/* ---------- list ---------- */}
      <ul className="space-y-4">
        <AnimatePresence initial={false}>
          {comments.map((comment) => (
            <motion.li
              key={comment.id}
              layout
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="flex gap-4 border border-line bg-paper p-4"
            >
              <Avatar comment={comment} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span className="font-display text-[0.92rem] font-semibold text-ink">
                    {comment.name}
                  </span>
                  <span className="font-mono text-[0.64rem] text-ink-muted">
                    {timeAgo(comment.createdAt)}
                  </span>
                  {comment.seed && (
                    <span className="border border-line px-1.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-ink-muted">
                      sample
                    </span>
                  )}
                </div>
                <p className="mt-1.5 whitespace-pre-wrap break-words text-[0.9rem] leading-relaxed text-ink-soft">
                  {comment.body}
                </p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {comments.length === 0 && (
        <p className="py-8 text-center text-[0.88rem] text-ink-muted">
          No comments yet — be the first.
        </p>
      )}
    </div>
  );
}
