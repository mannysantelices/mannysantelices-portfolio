# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project

Angular portfolio site (latest Angular, standalone APIs), deployed to GitHub Pages via
`.github/workflows/deploy.yml`. Node version pinned in `.nvmrc`.

## Standards

### SEO

- Every route/page must have a unique `<title>` and meta description, set via Angular's
  `Title` and `Meta` services (or route data + a resolver/guard that applies them) — never
  leave the default `index.html` title on a routed page.
- Add Open Graph and Twitter Card meta tags (`og:title`, `og:description`, `og:image`,
  `og:url`, `twitter:card`) for every page that should be shareable.
- Use semantic HTML (`<main>`, `<nav>`, `<header>`, `<section>`, `<article>`, one `<h1>` per
  page) — do not rely on `<div>` soup for structural markup.
- Add a `robots.txt` and `sitemap.xml` in `public/`, kept in sync with routes.
- Every image needs a meaningful `alt` attribute.
- Add JSON-LD structured data (`schema.org/Person` or `WebSite`) for the site owner.

### Security

- No secrets, API keys, or tokens committed to the repo — use environment injection at
  build time (GitHub Actions secrets) for anything sensitive (e.g. EmailJS keys are public
  by design, but treat anything else as secret by default).
- Sanitize/avoid `[innerHTML]` unless content is fully trusted and passed through Angular's
  `DomSanitizer` deliberately — never bind raw user input to `innerHTML`.
- All external links (`target="_blank"`) must include `rel="noopener noreferrer"`.
- Set a Content-Security-Policy meta tag in `index.html` appropriate for GitHub Pages
  hosting (restrict `script-src`/`style-src` to self + required third parties only).
- Keep dependencies current — no known-vulnerable packages (`npm audit` clean before
  merging dependency bumps).
- Forms (e.g. contact form) must validate and constrain input client-side and never expose
  private credentials — only public-safe keys (e.g. EmailJS public key) belong in the
  frontend bundle.

### Pre-rendering

- The production build must pre-render all routes (Angular SSG/prerendering) so content is
  present in the initial HTML for crawlers and fast first paint — do not ship a
  client-rendered-only shell.
- Every new route added to `app.routes.ts` must also be registered for prerendering
  (Angular's route config / `prerender` build target) — check this whenever routes change.
- Verify after every route change: `npx ng build` output contains a pre-rendered HTML file
  per route, not just `index.html`.

### Standalone components

- Always use standalone components, directives, and pipes — never generate or add
  `NgModule`-based code.
- Use the standalone `bootstrapApplication` / `app.config.ts` pattern already in place —
  do not introduce `AppModule`.
- Each component explicitly imports what it needs via the `imports` array; do not rely on
  shared modules.

## Deploy

- `npx ng build --base-href /mannysantelices-portfolio/` matches the GitHub Pages path —
  keep this base-href in sync with the repo name if the repo is ever renamed.
- GitHub Pages source must be set to "GitHub Actions" in repo Settings → Pages (manual,
  one-time step, not automatable via git).

## Gotchas

- Static files referenced by runtime-relative paths (`<img src="assets/...">`, favicons,
  robots.txt) belong in `public/` — Angular's application builder copies that folder
  verbatim and such paths resolve correctly against `<base href>` at any deployment path.
  Files referenced via CSS `url()` (fonts, background images) belong in `src/assets/`
  instead, referenced with a path relative to the referencing `.scss` file — esbuild
  resolves and content-hashes these at build time, so they stay portable across base
  hrefs without manual path prefixing. Don't put font files in `public/` and reference
  them with a bare or absolute path — esbuild's CSS resolver will either fail to resolve
  bare paths or leave absolute (`/...`) paths unrewritten, breaking under a GitHub Pages
  subpath.
- `prefers-reduced-motion` overrides must zero out `animation-delay` and set
  `animation-fill-mode: both`, not just `animation-duration` — a delayed entrance
  animation (`animation: rise 0.8s 0.4s ease forwards`) still honors its delay under a
  duration-only override, so reduced-motion users see a real blank delay before content
  appears.
- Any scroll-reveal (`IntersectionObserver`) or `window.matchMedia` usage needs a runtime
  capability check (`typeof IntersectionObserver !== 'function'`), not just an
  `isPlatformBrowser` guard — Vitest's jsdom test environment satisfies
  `isPlatformBrowser` but doesn't polyfill either API, so unguarded calls throw in unit
  tests. Pair scroll-reveal with a `setTimeout` fallback that force-reveals content, so
  nothing stays permanently invisible if the observer never fires.
- DOM-dependent post-render logic (scroll-reveal, measuring elements, etc.) must live in
  `afterNextRender(...)` from `@angular/core`, not `ngAfterViewInit`. With SSR + hydration,
  `ngAfterViewInit` can fire before Angular's hydration/re-render settles, so a
  `NodeList` captured via `querySelectorAll` at that point can go stale (`isConnected ===
  false`) by the time an async callback (e.g. an `IntersectionObserver` or `setTimeout`)
  runs against it — mutations silently land on detached nodes. Re-query fresh elements
  inside any deferred callback rather than closing over an early reference; confirmed via
  this exact bug on `ng serve` (dev-mode hydration timing), verified fixed by switching to
  `afterNextRender` and re-querying in the fallback.
- The CSP `script-src` must include `'unsafe-inline'` — Angular SSR emits small inline
  bootstrap scripts (the hydration event-dispatch contract, transfer-state) whose content
  differs per build/page, so hash-allowlisting isn't practical, and GitHub Pages can't
  inject a per-request nonce since it's static hosting. Blocking them doesn't break
  hydration outright but does silently drop Angular's early-event-replay mechanism.
- Control-flow blocks (`@if`, `@switch`) placed directly inside certain elements (a
  `<button>` was the case that broke) can throw a hard `NG0500` hydration mismatch at
  runtime ("expected a comment node but found a text node"), because SSR emits plain text
  at that position while client hydration expects an anchor comment. This isn't just a
  console warning — it's a thrown `RuntimeError` that appears to abort hydration for the
  whole component, silently breaking event bindings (a submit handler stopped firing
  entirely). Fix: wrap control-flow content in its own child element (e.g. `<span>`)
  rather than making it the element's only/direct children.
- After adding a new npm dependency, `ng serve`'s Vite dev server can wedge itself with
  "There is a new version of the pre-bundle... a page reload is going to ask for it" and
  never recover on its own (SSR module evaluation throws on every subsequent request,
  serving stale output indefinitely). Fix: stop the dev server, delete `.angular/cache`,
  restart. Don't waste time debugging "my change isn't showing up" against a dev server
  that's been running since before a dependency was added — restart it after any
  `npm install`.
- A CSS-modifier class with higher specificity than a responsive override silently wins
  at every viewport width (`.practice-grid.cols-3 { grid-template-columns: repeat(3,
  1fr) }` beat `@media (max-width: 860px) { .practice-grid { grid-template-columns: 1fr
  } }` since two classes outrank one, regardless of the media query). Any grid/layout
  modifier class must be added to the *same* responsive override selector list, not just
  the base class, or it silently escapes mobile collapse.
- When testing responsive layouts via CDP, `Emulation.setDeviceMetricsOverride` with
  `mobile: true` and a narrow width (e.g. 390) can silently clamp to a much wider
  viewport (662px observed) in this headless Chrome build — `mobile: false` with the
  same width applies correctly. The CLI `--window-size` flag has the same unreliability
  for narrow widths. Always confirm `window.innerWidth` matches the requested value
  before trusting a "no overflow" or "element hidden" result from a mobile emulation
  test.
