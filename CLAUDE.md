# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project

Six-page services site for Santelices Systems (latest Angular, standalone APIs), fully
prerendered (`outputMode: "static"`) and deployed to GitHub Pages via
`.github/workflows/deploy.yml`. Node version pinned in `.nvmrc`.

## Routes

`/`, `/website-creation/`, `/website-improvement/`, `/devsecops-consulting/`, `/about/`,
`/case-studies/own-site-rebuild/` (footer link only; text-only hero, so `HERO_IMAGES` is keyed by
`HeroPageId`).
Canonical URLs end in a slash. There is no `/contact/` route (the contact section is the last
child of `<main>` on every route) and no wildcard route (`public/404.html` answers unknown
paths). Adding a route means: `app.routes.ts`, `core/site/page-id.ts`,
`core/seo/page-meta.data.ts`, the JSON-LD graph, `public/sitemap.xml`, `public/404.html` links.

## Structure

- `src/app/core/site/` — typed data: `site.config.ts` (business name, origin, base path,
  contact details, social image), `services.data.ts`, `tiers.data.ts`, `tools.data.ts`,
  `nav.data.ts`, `founder.data.ts`. A name or URL is typed once, here.
- `src/app/core/seo/` — per-route title, meta, canonical and JSON-LD, driven by route data.
- `src/app/core/{navigation,reveal,theme}/` — shell-wide behaviour.
- `src/app/layout/` — header, footer, icon sprite.
- `src/app/shared/` — page building blocks: `page-hero`, `page-section`, `card-grid`,
  `steps`, `related-services`, and their types in `content.model.ts`.
- `src/app/features/<page>/` — one folder per page: `<page>.copy.ts` (wording, verbatim from
  the approved copy deck), the page component, and page-only components. `features/contact/`
  is the shared contact section and form.
- `src/styles/` — one partial per component group, listed in `src/styles.scss`.
- Components compose only; wording and data live in `*.copy.ts` / `*.data.ts`. Files stay
  under ~200 lines, functions under ~30.

## Commands

- `npm test -- --watch=false` — unit tests once (Vitest); exits non-zero on failure.
- `npx ng build --base-href /mannysantelices-portfolio/` — production build; output in
  `dist/mannysantelices-portfolio/browser` with one `index.html` per route.
- `test -f dist/mannysantelices-portfolio/browser/index.html && rm dist/mannysantelices-portfolio/browser/index.csr.html`
  — run after every build before checking or serving the output; it is the same command as
  the workflow's "Remove client-rendered shell" step.
- `npm audit --omit=dev --audit-level=high` — must exit 0.

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

- `npx ng build --base-href /mannysantelices-portfolio/` matches the GitHub Pages path. The
  base path is also in `core/site/site.config.ts` (`BASE_PATH`), `public/404.html`,
  `public/sitemap.xml` and `public/robots.txt` — change all of them together if the repo is
  ever renamed.
- The workflow tests, then builds, removes `index.csr.html`, then uploads `dist/mannysantelices-portfolio/browser`.
  Actions are pinned to commit SHAs; `.github/dependabot.yml` keeps them and npm current.
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
- Under `<base href>` a bare `href="#contact"` points at the home page, not the current one.
  Every same-page link is `[routerLink]="currentPath()" [fragment]="..."` (path from
  `CurrentRouteService`); fragment targets carry `tabindex="-1"`.
- Angular drops whitespace between adjacent inline elements; write `&ngsp;` where a space
  between two elements must survive.
- The build always emits `index.csr.html` (the un-prerendered shell) next to the prerendered
  pages when a server entry exists; `@angular/build` has no option to turn it off. Nothing
  links to it. It is removed after the build (see Commands); the workflow does the same
  before the upload. An npm `postbuild` script would not run for `npx ng build`.
- `public/404.html` is a static file outside the app: it carries its own copy of the colour
  tokens and cannot load the hashed font files. Update it by hand when tokens, navigation
  labels or the footer line change.
- Unapproved copy must not be in the source at all: a flag that hides it from the HTML still
  ships the strings in the JS bundle.
- Every "Book a call" link targets `BOOK_CALL_FRAGMENT` (`site.config.ts`) on the current route;
  swap in a booking URL there and in `shared/book-call` only.
- `SOCIAL_IMAGE` in `site.config.ts` points at an interim image with no text; its `alt` must
  describe what the file really shows, so change both together.
- `public/sitemap.xml` `lastmod` is the date a page's content last changed, not the build date.
