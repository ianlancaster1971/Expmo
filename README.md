# Ex-Ford PMO Meet Up

A fun, fully responsive React + Vite site for the Ex-Ford PMO meet-up crew —
Home, Future Events, Potential Events, Past Events, and a no-login Dashboard
for editing all of it.

## Stack

- **React 19 + Vite** — app shell and dev server
- **React Router** — the 5 routes (`/`, `/future-events`, `/potential-events`, `/past-events`, `/dashboard`)
- **Tailwind CSS v4** — styling, fully responsive (mobile → tablet → desktop)
- **Framer Motion** — page transitions, hover/vote animations, scroll reveals
- **react-helmet-async** — per-page SEO tags (title, meta description, canonical, Open Graph, Twitter card, JSON-LD event data)
- **Firebase Firestore** *(optional)* — shared, live content storage so Dashboard edits are visible to every visitor

## Getting started

```bash
npm install
npm run dev
```

The site works immediately with no setup — it ships with demo content and
runs in **demo mode**, where Dashboard edits are saved to your own browser's
local storage only (`localStorage`). This is enough to try everything out.

## Going live: connect Firebase (recommended)

To make Dashboard edits show up for *every* visitor, not just the browser
that made them:

1. Create a free project at [console.firebase.google.com](https://console.firebase.google.com).
2. In the project, go to **Build → Firestore Database → Create database** (start in production mode, pick any region).
3. In **Project settings → General → Your apps**, add a Web app and copy the config values.
4. Copy `.env.example` to `.env` and paste in those values.
5. Deploy the rules in `firestore.rules` (Firebase console → Firestore → Rules, paste and publish). These rules match the site's current "no login" choice — **anyone with the link can edit content**. If you want to lock the Dashboard down later, add Firebase Authentication and tighten those rules.
6. Restart `npm run dev` (or redeploy). The Dashboard will show a green "Connected — changes save live" banner instead of the orange demo-mode one, and it auto-seeds Firestore with the starting content the first time it connects.

## Editing content

Go to `/dashboard` (linked in the nav bar). No password is required. From
there you can:

- Edit the Home page hero text, about section, and the four Plan/Manage/Deliver/Succeed captions
- Add, edit, or delete events in Future, Potential, and Past Events

Events added to **Potential Events** get an "I'm interested" vote button on
the public page; the ones with the most votes are the ones worth actually
booking.

## Build & deploy

```bash
npm run build   # outputs static site to dist/
npm run preview # preview the production build locally
```

This is a static site — deploy `dist/` anywhere (Netlify, Vercel, GitHub
Pages, S3, etc.). SPA rewrite rules are already included for the two most
common hosts:

- **Netlify**: `public/_redirects`
- **Vercel**: `vercel.json`

Before going live, also swap the placeholder domain
(`fordpmomeetup.example.com`) in `index.html`, `src/components/SEO.jsx`, and
`public/sitemap.xml`/`public/robots.txt` for your real domain.

## SEO & accessibility notes

- Every page sets its own title/description/canonical/OG/Twitter tags via `src/components/SEO.jsx`
- Future Events emits `schema.org/Event` JSON-LD structured data
- Semantic landmarks (`header`, `nav`, `main`, `footer`), skip-to-content link, visible focus rings, and `prefers-reduced-motion` support are all built in
- `/dashboard` is excluded from `robots.txt` (it's a tool, not content)
- The logo is a hand-built, dependency-free SVG (`src/components/LogoMark.jsx`) so it stays crisp at every size with no image requests
