/**
 * ============================================================================
 *  COMMENT STORE
 *  A tiny pub/sub over a swappable adapter, so the UI never knows or cares
 *  where comments actually live.
 *
 *  Shipped adapter: `localAdapter` — persists to localStorage and syncs across
 *  the visitor's open tabs over BroadcastChannel. That makes the "realtime"
 *  indicator truthful (it reports a connection it genuinely has) while the
 *  site stays a fully static GitHub Pages deploy with no backend.
 *
 *  To go globally live, write an adapter with the same four methods and pass
 *  it to createCommentStore(). Example with Supabase:
 *
 *    // npm i @supabase/supabase-js
 *    import { createClient } from '@supabase/supabase-js';
 *    const sb = createClient(URL, ANON_KEY);
 *
 *    const supabaseAdapter = {
 *      name: 'supabase',
 *      async load() {
 *        const { data } = await sb.from('comments')
 *          .select('*').order('created_at', { ascending: false }).limit(100);
 *        return data ?? [];
 *      },
 *      async add(comment) {
 *        const { data } = await sb.from('comments').insert(comment).select().single();
 *        return data;
 *      },
 *      subscribe(onChange) {
 *        const ch = sb.channel('comments')
 *          .on('postgres_changes',
 *              { event: 'INSERT', schema: 'public', table: 'comments' },
 *              (p) => onChange('insert', p.new))
 *          .subscribe((s) => onChange('status', s === 'SUBSCRIBED' ? 'live' : 'connecting'));
 *        return () => sb.removeChannel(ch);
 *      },
 *    };
 * ============================================================================
 */

const STORAGE_KEY = 'tt-portfolio-comments-v1';
const CHANNEL = 'tt-portfolio-comments';
const MAX_COMMENTS = 100;

const uid = () =>
  (crypto?.randomUUID?.() ?? `c-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`);

/* ------------------------------- seed data -------------------------------- */
/* Shown only until the first real comment arrives, so the wall is never a
   bare empty box. Flagged so the UI can label them. */
const seed = [
  {
    id: 'seed-1',
    name: 'Visitor',
    body: 'The hero geometry following the cursor is a nice touch — runs smooth on my laptop.',
    avatar: null,
    createdAt: Date.now() - 1000 * 60 * 60 * 26,
    seed: true,
  },
  {
    id: 'seed-2',
    name: 'Sokha',
    body: 'Clean typography and the dark palette actually works. Leaving the first comment!',
    avatar: null,
    createdAt: Date.now() - 1000 * 60 * 90,
    seed: true,
  },
];

/* ----------------------------- local adapter ------------------------------ */
export const localAdapter = {
  name: 'local',

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed) && parsed.length) return parsed;
    } catch {
      /* corrupt or unavailable storage — fall through to seed */
    }
    return seed;
  },

  add(comment) {
    const next = [comment, ...this.load().filter((c) => !c.seed)].slice(0, MAX_COMMENTS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage full or blocked (private mode) — comment stays in memory */
    }
    try {
      new BroadcastChannel(CHANNEL).postMessage({ type: 'insert', comment });
    } catch {
      /* no BroadcastChannel in this browser */
    }
    return comment;
  },

  subscribe(onChange) {
    let channel = null;

    const reportStatus = () =>
      onChange('status', navigator.onLine ? (channel ? 'live' : 'polling') : 'offline');

    try {
      channel = new BroadcastChannel(CHANNEL);
      channel.onmessage = (e) => {
        if (e.data?.type === 'insert') onChange('insert', e.data.comment);
      };
    } catch {
      channel = null;
    }

    // other tabs in older browsers still land here
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) onChange('reload');
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('online', reportStatus);
    window.addEventListener('offline', reportStatus);

    // small delay so the UI gets to show its "connecting" state honestly
    const t = setTimeout(reportStatus, 650);

    return () => {
      clearTimeout(t);
      channel?.close();
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('online', reportStatus);
      window.removeEventListener('offline', reportStatus);
    };
  },
};

/* ------------------------------- the store -------------------------------- */
export function createCommentStore(adapter = localAdapter) {
  let comments = [];
  let status = 'connecting';
  const listeners = new Set();

  const emit = () => listeners.forEach((l) => l({ comments, status }));

  const handleChange = async (type, payload) => {
    if (type === 'status') {
      status = payload;
    } else if (type === 'insert') {
      if (!comments.some((c) => c.id === payload.id)) {
        comments = [payload, ...comments.filter((c) => !c.seed)].slice(0, MAX_COMMENTS);
      }
    } else if (type === 'reload') {
      comments = await adapter.load();
    }
    emit();
  };

  let unsubscribeAdapter = null;

  return {
    adapterName: adapter.name,

    async init() {
      comments = (await adapter.load()) ?? [];
      unsubscribeAdapter = adapter.subscribe(handleChange);
      emit();
    },

    subscribe(listener) {
      listeners.add(listener);
      listener({ comments, status });
      return () => listeners.delete(listener);
    },

    async add({ name, body, avatar }) {
      const comment = {
        id: uid(),
        name: name.trim().slice(0, 40) || 'Anonymous',
        body: body.trim().slice(0, 600),
        avatar: avatar ?? null,
        createdAt: Date.now(),
      };
      const saved = (await adapter.add(comment)) ?? comment;
      comments = [saved, ...comments.filter((c) => !c.seed)].slice(0, MAX_COMMENTS);
      emit();
      return saved;
    },

    destroy() {
      unsubscribeAdapter?.();
      listeners.clear();
    },
  };
}

/** "3 hours ago" without pulling in a date library. */
export function timeAgo(ts) {
  const seconds = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [unit, secs] of units) {
    const n = Math.floor(seconds / secs);
    if (n >= 1) return `${n} ${unit}${n > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}
