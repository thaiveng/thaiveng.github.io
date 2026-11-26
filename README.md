# thaiveng.github.io

Personal developer portfolio styled like a quiet Japanese journal — **Vite + React 19, Tailwind CSS v4, Framer Motion**.

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
| `profile` | Name, title, tagline, availability, hero + About copy, interests, optional `avatar` photo |
| `socials` | GitHub / LinkedIn / Instagram (add Telegram — commented example inside) |
| `navLinks` | Header navigation |
| `experience` | Career timeline — company, title, period, responsibilities, contributions |
| `education` | "The path so far" in About |
| `projects` | Project gallery — role, features, tags, repo / live links, cover `pattern` |
| `skills`, `learning` | Skill groups + the "currently learning" note |
| `music` | Spotify link + interlude copy |
| `contactConfig` | Contact form endpoint |
| `footer` | Tagline + copyright |

Fields marked `// ✏️ CONFIRM` were inferred from existing copy during the redesign.
Optional fields left `null` or empty simply don't render.

### Project covers & profile photo

Project cards draw a traditional Japanese pattern cover (seigaiha, hishi, shippo,
kikko) — no stock photos, no fake screenshots. To use a real screenshot, add
`image: '/shots/my-project.png'` and drop the file in `public/`.

The hero shows a hand-drawn SVG desk scene until you set `profile.avatar`
(e.g. `'/me.jpg'` in `public/`).

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
track) and is converted to an embed automatically.

---

## Structure

```
src/
├── App.jsx                  page composition + preloader gate
├── index.css                Tailwind v4 theme tokens (paper / sumi / sage / mist / shu), utilities
├── data/site.js             ← all content
├── hooks/                   useScrollSpy, usePrefersReducedMotion
├── lib/                     commentStore (dormant), image helpers
└── components/
    ├── Preloader.jsx        short "opening the journal" loader
    ├── Navbar.jsx           sticky paper nav + mobile sheet
    ├── Hero.jsx             journal spread, taped photo, sticky note
    ├── HeroIllustration.jsx hand-built SVG desk scene
    ├── About.jsx            standfirst, index card, interests, education
    ├── Skills.jsx           grouped skill cards
    ├── Projects.jsx         editorial gallery + ProjectCard / CardThumb / DetailsModal
    ├── MusicSection.jsx     Spotify interlude
    ├── Experience.jsx       scroll-linked career timeline
    ├── Contact.jsx          address card + letter-style ContactForm
    ├── Footer.jsx           "The end" page
    └── ui/                  Button, Reveal, Section (ChapterHeading, Hanko, Washi), Icons
```

---

## Performance & accessibility notes

- No 3D runtime: the JS payload is ~140 kB gzipped in total (motion split into its own chunk).
- `prefers-reduced-motion` stops petals, parallax, steam, chime and rotating notes.
- Text colours meet WCAG AA on every paper tone.
- Skip link, visible focus rings, labelled form fields with linked error text,
  focus-trapped project dialog (Escape closes, focus returns to the card).
