# thaiveng.github.io

Interactive developer portfolio — **Vite + React 19, Tailwind CSS v4, Framer Motion, React Three Fiber**.

Live at <https://thaiveng.github.io>

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build locally
```

---

## Deploying

The repo ships with `.github/workflows/deploy.yml`, which builds on every push to
`main` and publishes `dist/` to GitHub Pages.

**One-time setup:** GitHub → **Settings → Pages → Build and deployment → Source →
`GitHub Actions`.** (If it is currently set to "Deploy from a branch", the site
will keep serving the old static page until you switch it.)

The previous single-file version of the site is preserved at
[`legacy/index.html`](legacy/index.html).

---

## Where to edit things

Almost everything you'll want to change lives in **one file**:

### `src/data/site.js`

| Export | What it drives |
| --- | --- |
| `profile` | Name, role, location, email, hero bio, typed role list |
| `socials` | GitHub / LinkedIn / Instagram links (footer + contact) |
| `navLinks` | Header navigation |
| `timeline` | Education + experience entries |
| `projects`, `certificates`, `achievements` | Portfolio tab contents |
| `techStack` | Tech Stack tab (set `learning: true` for the amber style) |
| `stats` | Auto-derived counts — they recalculate from the arrays above |
| `music` | Spotify link + section copy |
| `contactConfig` | Contact form endpoint |
| `footer` | Tagline + copyright |

The project cards link to real GitHub repositories. Items marked
`// ⚠️ PLACEHOLDER` in that file are remaining scaffolding for certificates and
awards — replace them with your real credentials and recognitions. The stat
counters read from those arrays, so the numbers stay honest as you edit.

### Project thumbnails

Cards draw a deterministic procedural graphic by default (no stock photos, no
fake screenshots). To use a real image, add `image: '/shots/my-project.png'` to
the item and drop the file in `public/`.

---

## Things that need wiring up

### 1. Contact form

Static hosting can't send mail. With `contactConfig.endpoint = null` the form
opens a prefilled email draft instead. To actually POST:

```js
// src/data/site.js
export const contactConfig = {
  endpoint: 'https://formspree.io/f/xxxxxxx', // Formspree, Basin, Web3Forms…
  successMessage: "Message sent. I'll get back to you soon.",
};
```

### 2. Live comments

`src/lib/commentStore.js` is a pub/sub over a **swappable adapter**. The shipped
`localAdapter` persists to `localStorage` and syncs across the visitor's own open
tabs over `BroadcastChannel` — so the "Realtime connected" badge reflects a real
connection, but comments are per-visitor, not global.

To make them public, write an adapter with the same four methods
(`load`, `add`, `subscribe`, `name`) and pass it to `createCommentStore()`.
A ready-to-paste Supabase example is in the file's header comment.

### 3. Spotify

`music.spotifyUrl` accepts any Spotify share link or URI (playlist, album or
track) and is converted to an embed automatically. It currently points at a
public lo-fi playlist as a placeholder — swap in your own.

---

## Structure

```
src/
├── App.jsx                  page composition + preloader gate
├── index.css                Tailwind v4 theme tokens, keyframes, utilities
├── data/site.js             ← all content
├── hooks/
│   ├── useCountUp.js        viewport-triggered number animation
│   ├── usePointer.js        normalised pointer coords (ref, no re-renders)
│   ├── useScrollSpy.js      active nav section
│   └── usePrefersReducedMotion.js
├── lib/
│   ├── commentStore.js      pluggable comment backend
│   └── image.js             client-side avatar downscaling
└── components/
    ├── Preloader.jsx        % counter driven by real load signals
    ├── Navbar.jsx           sticky glassmorphism nav + mobile sheet
    ├── Hero.jsx             headline, typewriter, CTAs, 3D mount
    ├── About.jsx            bio + stats + timeline
    ├── Timeline.jsx         scroll-linked vertical spine
    ├── StatsRow.jsx         auto-counting stat cards
    ├── MusicSection.jsx     stylised Spotify frame
    ├── Portfolio.jsx        filter tabs + animated grid
    ├── ProjectCard.jsx / CardThumb.jsx / DetailsModal.jsx
    ├── Contact.jsx / ContactForm.jsx / Comments.jsx
    ├── Footer.jsx
    ├── three/               FloatingCore, ParticleField, HeroScene
    └── ui/                  Button, Reveal, Section, Icons
```

---

## Performance & accessibility notes

- `three` + `@react-three/drei` are **lazy-loaded** behind `React.lazy`, so the
  hero text paints before the ~245 kB (gzipped) 3D chunk arrives.
- WebGL is feature-detected; without it the hero falls back to a CSS gradient.
- `prefers-reduced-motion` is honoured globally and inside the 3D scene
  (distortion, float and auto-rotation all stop).
- The canvas is `pointer-events: none` and `aria-hidden`, so it never traps focus.
- Skip link, visible focus rings, `aria-live` on the loader and the realtime
  badge, labelled form fields, Escape-to-close on the details modal.
