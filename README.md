# vue-portfolio-app

[![badge](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/mit)

The source for [fullstackchef.dev](https://fullstackchef.dev) — the portfolio of Shawn Meister,
a full-stack developer in Fredericton, New Brunswick, and a former head chef.

Built with Vue 3 (`<script setup>`), Vue Router 5, Vite 8 and Bootstrap 5. It is a fully static
site: no backend, no build-time secrets, no runtime services. Every route is prerendered to real
HTML at build time and hydrated in the browser, so crawlers and link previews see the content
without running JavaScript.

## Features

- Interactive portfolio covering both open-source projects and closed-source professional work
- Resume section with a downloadable CV and categorised skills
- Contact section linking to GitHub and LinkedIn
- Every route prerendered to static HTML, then hydrated into the same SPA
- Per-route titles, meta descriptions, canonical URLs and Open Graph tags
- Keyboard accessible throughout: skip link, visible focus rings, `aria-current` navigation
- Honours `prefers-reduced-motion`
- Responsive across screen sizes

## Project structure

```text
src/
  data/site.js      All site content — bio, skills, projects, links
  data/icons.js     Inline SVG icon paths
  components/       Presentational components; they render data, never hardcode it
  views/            One thin wrapper per route
  router/           Route table, scroll behaviour, head syncing
  head.js           Resolves a route to its title, description, canonical and OG tags
  app.js            Shared app factory used by both the browser and the prerenderer
  main.js           Browser entry — hydrates the prerendered markup
  entry-server.js   Build-time entry — renders one route to HTML
  assets/styles.css Design tokens, self-hosted font face, layout primitives
scripts/
  prerender.mjs     Writes one HTML file per route into dist/
```

[`src/head.js`](src/head.js) is the single source of truth for head tags. The router applies it
on client-side navigation and the prerenderer bakes it into each HTML file, so the two can't
drift apart.

**Content lives in [`src/data/site.js`](src/data/site.js).** Updating the bio, adding a project,
or editing the skill list means changing that one file — no template edits.

## Project Setup

```sh
npm install
```

Requires Node `^20.19.0 || >=22.12.0` (Vite 8). Node 24.15+ is recommended so `jsdom` can be
bumped past v29. `package-lock.json` is committed so `npm ci` gives reproducible builds in CI
and in the Docker image.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

- Served at <http://localhost:5173>.

### Compile and Minify for Production

```sh
npm run build
```

Three steps, run in order by the `build` script:

1. `build:client` — the usual Vite bundle.
2. `build:server` — an SSR bundle of `src/entry-server.js`, used only during the build.
3. `prerender` — renders each route and writes `dist/index.html`, `dist/portfolio/index.html`
   and so on, then deletes the SSR bundle.

Output lands in `dist/` as plain files, with no host-specific config:

```text
dist/index.html            /
dist/portfolio/index.html  /portfolio
dist/resume/index.html     /resume
dist/contact/index.html    /contact
dist/404.html              anything else, served with a 404 status
dist/assets/…              fingerprinted JS, CSS and fonts
```

Any web server can serve this with one rule: try the file, then its directory index, then
`404.html`. Because every real route is a file, there is no SPA catch-all and an unknown URL
gets a genuine 404 instead of a 200 with the home page.

`npm run preview` reproduces exactly that locally — Vite's own SPA fallback would otherwise
serve the root `index.html` for every path and make prerendering look broken.

To add a route, add it to the route table in [`src/router/index.js`](src/router/index.js) and to
`ROUTES` in [`scripts/prerender.mjs`](scripts/prerender.mjs).

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

Covers each component plus a routing integration suite that mounts the real app against the
real route table and asserts on rendering, heading structure and navigation state.

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

Uses flat config ([`eslint.config.js`](eslint.config.js)), required from ESLint 9 onward.

### Updating your resume

The download button points at `/resume.pdf`, a version-neutral path. Drop a current PDF at
`public/resume.pdf` to update it — no code change needed.

## Deployment

The build output is static files, so any web server will do. What the server has to get right:

1. Serve `dist/<route>/index.html` for `/<route>` — the file on disk wins.
2. Return `dist/404.html` **with a 404 status** for anything that does not match a file.
3. Cache `/assets/*` hard (the filenames are content-hashed) and HTML not at all.

### nginx

[`deploy/nginx.conf`](deploy/nginx.conf) does all three. On an Ubuntu host:

```sh
npm ci && npm run build
rsync -a --delete dist/ /var/www/fullstackchef/

sudo cp deploy/nginx.conf /etc/nginx/sites-available/fullstackchef
sudo ln -sf /etc/nginx/sites-available/fullstackchef /etc/nginx/sites-enabled/
# point `root` at /var/www/fullstackchef
sudo nginx -t && sudo systemctl reload nginx
```

It sets a strict `Content-Security-Policy` — the build emits no inline scripts or styles and
loads nothing cross-origin, so no `'unsafe-inline'` is needed. `Strict-Transport-Security` is
present but commented out; enable it once HTTPS is confirmed working, since browsers honour
`max-age` even after the header is removed.

### Docker

The image builds the site and serves it from nginx. The Node stage is discarded, so the
published image is nginx plus `dist/`.

```sh
docker compose --profile prod up -d --build   # http://localhost:8080
docker compose --profile dev  up              # Vite dev server on :5173
```

### Traefik

[`docker-compose.yml`](docker-compose.yml) carries Traefik labels, disabled by default. Set
`traefik.enable=true`, drop the `ports:` mapping, attach the container to Traefik's network,
and let Traefik terminate TLS. nginx keeps serving plain HTTP inside the container.

### Behind Cloudflare

Cloudflare respects the `Cache-Control` headers above, so a deploy is picked up as soon as the
HTML revalidates — purge the cache if you want it immediate. If you want real client IPs in the
nginx logs rather than Cloudflare's, add `set_real_ip_from` for the
[current Cloudflare ranges](https://www.cloudflare.com/ips/) plus `real_ip_header CF-Connecting-IP`.
Use Full (strict) SSL mode so Cloudflare verifies the origin certificate.

### Technologies Used

- Vue.js 3 + Vue Router 5
- Vite 8
- Bootstrap 5
- Roboto, self-hosted via `@fontsource-variable/roboto` (no font CDN)
- Vitest for unit and integration testing
- ESLint (flat config) + Prettier
- Docker and Docker Compose

### Contact

The Contact page links out to GitHub and LinkedIn rather than hosting a form. That keeps the
site fully static: no backend process, no SMTP credentials to manage, and no public endpoint
that can be abused to send mail.

### Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a Pull Request if you
want to contribute.

### License

[![badge](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/mit)

This project is licensed under the [MIT License](LICENSE).
