# mmc sport — marketing site

Next.js 16 (App Router) rebuild of the mmc sport marketing site: a multilingual
football content newsroom (UEFA, DFB, Bundesliga, Bayern Munich, Manchester
City, Inter Milan, AC Milan). `mmc-sport-redesign.html` in the repo root is the
original static prototype this was built from — it's the visual reference for
layout, type and colour, not something the app depends on at runtime.

## Stack

- Next.js 16 (App Router), TypeScript strict
- Tailwind CSS v4, CSS-first config (`app/globals.css`)
- Content: MDX + `gray-matter` + `zod`, read from the filesystem at build time
- Forms: `react-hook-form` + `zod`, submitted to a Next.js Route Handler
- Email: Resend
- No component library — everything under `components/` is hand-built

## Getting started

```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY if you want real emails sent
npm run dev                  # http://localhost:3000 → redirects to /en
npm run build                # production build, prerenders every route
```

Without `RESEND_API_KEY` set, the demo form still works end-to-end (validates,
rate-limits, returns success) — it just logs a warning and skips the actual
email send. Useful for local dev and preview deploys where you don't want real
notification emails going out.

## Project structure

```
app/
  [locale]/            en/de-prefixed routes (home, services, work, newsroom,
                       about, careers, demo, contact, imprint, privacy)
  api/demo/route.ts    demo form submission handler
proxy.ts               locale-detection redirect (Next 16's renamed middleware)
components/
  home/                sections used only on the home page
  *.tsx                shared across pages (Nav, Footer, Desk, DemoForm, …)
content/
  services/ work/ newsroom/    one MDX file per item, frontmatter + body
lib/
  content.ts           reads + validates content/ (zod), typed getters
  desk.ts              typed mock data source for the live feed
  schemas/demo.ts       shared client/server validation for the demo form
  i18n/                locale list + dictionary loader
messages/
  en.json de.json      nav/footer copy per locale
```

Adding a new service, case study or article is just a new `.mdx` file with the
right frontmatter — no code changes needed. The `zod` schema in `lib/content.ts`
will throw a clear error at build time if a file is missing a required field.

## The live desk

The "desk — live now" strip under the hero is meant to communicate one thing:
this is a newsroom that never stops publishing. Right now it's a convincing
simulation, not a real feed — worth being precise about the difference before
anyone treats it as a live status indicator.

**What it does today.** `lib/desk.ts` exports `getDeskFeed()`, an async
function returning a typed `DeskItem[]` (`{ lang, what, client }`) from a fixed
mock list. `components/Desk.tsx` (client component) fetches that pool once on
mount, then every 3.6s picks the next item from it and pushes a new row onto
the feed — same illusion of nonstop activity as the original prototype, just
with a real typed seam behind it instead of a hardcoded array in a `<script>`
tag.

**What a real version would look like.** To make this feed reflect actual
editorial output, you'd need three pieces:

1. **A publish event, not a page view.** Somewhere in the real newsroom's
   workflow, an editor publishing a commentary, a social post, or an article
   is already a discrete action in whatever CMS/back office they use. That
   action needs to write a row somewhere — `{ timestamp, language, what,
   client }` — either via a webhook the CMS fires on publish, or a small
   insert your editorial tooling calls directly.
2. **A feed store + API.** Those rows land in a table (Postgres is plenty —
   this is maybe a few hundred rows a day) and `getDeskFeed()` stops returning
   mock data and instead queries "last 20 publishes," through a small internal
   API route or directly via a server-side DB client.
3. **Real-time delivery.** The current setup fakes "live" with a client-side
   `setInterval`. A real feed either keeps that pattern but re-fetches from the
   real API on the same interval (simplest, has a few seconds of lag, totally
   fine for this use case), or pushes over SSE/WebSocket if you want it to feel
   instantaneous. Given this is a marketing ambiance feature and not a
   mission-critical dashboard, polling every few seconds is the pragmatic
   choice — don't reach for WebSocket infrastructure to solve a problem this
   small.

**The non-technical catch.** The moment this feed is real, it discloses what
you're publishing and for whom, in public, in real time. Clubs sometimes work
under embargo (an unannounced signing, an injury update held back for a press
conference) — a live "publishing to Manchester City right now" ticker could
leak the fact that *something* is happening even if the "what" text is vague.
Worth a conversation with account leads before wiring this to anything real;
the mock is a safe default precisely because it can't leak anything.

## Design system: dark/light and en/de

Both toggles live in `components/Nav.tsx`, are `localStorage`-backed, and are
independent of each other and of OS-level `prefers-color-scheme` — the brand
default is dark regardless of system setting; light is an explicit opt-in.

**Theme.** `app/globals.css` defines the palette as CSS custom properties
under `:root`, with a `:root[data-theme="light"]` override block. Tailwind's
`@theme inline` maps `bg-ink`, `text-paper`, `bg-panel`, `border-line`,
`text-smoke`, `text-muted`, `text-dim` to those variables, so any component
using the semantic utility classes repaints automatically when the toggle
flips the `data-theme` attribute on `<html>`. A small `beforeInteractive`
script (`next/script`, in `app/[locale]/layout.tsx`) applies the stored
preference before first paint, so there's no flash of the wrong theme.

Not everything follows the toggle, by design:
- **The live desk panel** stays permanently dark (`bg-black`, fixed white/40
  text) — it reads as a broadcast monitor, and a monitor doesn't change colour
  because the room's lights changed.
- **The yellow CTA band** (demo section) and anything sitting on it — its
  form, its buttons, its confirmation panel — stays fixed yellow/black. It's
  a constant brand accent block, not a page surface.
- **`.hl`** (the highlighted word in the h1) is always black-on-yellow.

If you add new components, ask "does this live on the page surface, or is it
one of the fixed brand blocks?" before reaching for `bg-ink`/`text-paper` —
that distinction is what the original build got wrong in a few places (see
below).

**Locale.** `/en` and `/de` are real route prefixes (`app/[locale]/`), not a
client-side switch. `proxy.ts` (Next 16 renamed `middleware.ts` →
`proxy.ts`) redirects `/` to the browser's preferred locale on first visit.
`messages/{en,de}.json` covers nav/footer chrome; **body copy (hero, services,
case studies, articles) is English-only right now** — that's the deliberate
"de is a stub" scope from the original brief, not an oversight. Translating it
means either hand-translating the MDX content or adding a translation field to
the content schema; either is a content task, not an architecture change.

## Bugs found and fixed in this pass

- Several "always dark text/background" utility classes (`text-ink`,
  `bg-paper`, hardcoded grays like `#C9C8C2`) were reused across contexts that
  needed to mean different things once a light theme existed — e.g. button
  text on a yellow background needs to stay black regardless of site theme,
  but was wired to the same token that flips to white in light mode. Fixed by
  splitting "page surface" (theme-adaptive: `ink`/`paper`/`panel`/`line`/
  `smoke`/`muted`/`dim`) from "fixed brand elements" (literal `black`/`white`,
  used on the yellow CTA band, nav/hero buttons, and the live desk panel).
- The no-flash theme-init script was a raw `<script>` tag in a Server
  Component, which threw a React warning on the client ("script tag in
  component tree… never executed when rendering on the client"). Switched to
  `next/script` with `strategy="beforeInteractive"`, which is what that
  strategy exists for.
- A couple of pages had two conflicting `max-w-*` classes on the same element
  (arbitrary-value Tailwind classes don't reliably cascade by JSX order) —
  split into a wrapping div.

## What's stubbed / not production-ready as-is

- **Rate limiting** (`lib/rateLimit.ts`) is an in-memory `Map` — fine for a
  single server instance, resets on redeploy, and doesn't share state across
  serverless instances. Fine for a preview; swap for Upstash/Redis before
  relying on it in production.
- **Imprint/Privacy** pages have placeholder legal text flagged inline as
  such — get real copy from whoever handles compliance before this is public.
- **Demo email** requires `RESEND_API_KEY`; without it, submissions succeed
  but no one is notified. Don't forget to set it before a client relies on the
  form.
- **Honeypot** is a basic hidden-field trap, not a CAPTCHA — stops unsophisticated
  bots, not a determined one.

## Ideas for making this distinctive (not built — for discussion)

None of the below is implemented. Flagging them because they follow directly
from what's already here:

- **Make the live desk real**, per the section above — the single highest-leverage
  change, since it's the site's signature element and it's currently a loop.
- **A localisation-gap comparison slider** on the newsroom report of the same
  name: a translated caption next to a native-written one, side by side,
  letting a visitor feel the difference the report describes instead of just
  reading about it.
- **A "build your matchday" demo tool**: prospect picks their club and a
  target market, sees a mocked desk feed and sample artwork tailored to that
  combination. Turns the /demo page from a contact form into something closer
  to a product experience.
- **Kickoff-aware hero**: on a real matchday for a listed client, swap the
  live desk's mock items for that fixture specifically (still mocked content,
  just contextually relevant) — cheap to fake, doesn't require the real feed.
- **Audio samples**, referenced in the footer but not built: short
  commentary clips per language, since "20+ languages" is a claim best proven
  by letting someone hear it.
- **Geo/browser-language nudge**: detect a visitor's likely market and offer
  a one-click jump to `/de` or a relevant case study, rather than relying on
  them finding the language switcher.

## Deployment

Not deployed yet — see the chat thread for the recommended options and
current status. Vercel is the target per the original brief; it's a zero-config
fit for the App Router, MDX-at-build-time content model, and Route Handlers
used here.
