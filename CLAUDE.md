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
