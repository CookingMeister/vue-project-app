import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const distSsr = resolve(root, 'dist-ssr')

/** `/portfolio` -> `dist/portfolio/index.html`, `/` -> `dist/index.html`. */
const pageFor = (route) =>
  route === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${route}`, 'index.html')

/**
 * Every route gets its own HTML file, so a web server can answer from disk
 * without a catch-all rewrite. `/404` renders the router's catch-all route to
 * `dist/404.html`, which the server returns - with a real 404 status - for
 * anything that does not match a file.
 */
const PAGES = [
  ...['/', '/portfolio', '/resume', '/contact'].map((route) => ({
    route,
    output: pageFor(route)
  })),
  { route: '/404', output: resolve(dist, '404.html') }
]

const HEAD_START = '<!--head-start-->'
const HEAD_END = '<!--head-end-->'
const APP_MARKER = '<!--app-html-->'

async function main() {
  const template = await readFile(resolve(dist, 'index.html'), 'utf-8')

  for (const marker of [HEAD_START, HEAD_END, APP_MARKER]) {
    if (!template.includes(marker)) {
      throw new Error(`index.html is missing the ${marker} marker`)
    }
  }

  const { render } = await import(pathToFileURL(resolve(distSsr, 'entry-server.js')).href)

  const headStart = template.indexOf(HEAD_START) + HEAD_START.length
  const headEnd = template.indexOf(HEAD_END)

  for (const { route, output } of PAGES) {
    const { html, headTags } = await render(route)

    const page =
      template.slice(0, headStart) +
      `\n    ${headTags}\n    ` +
      template.slice(headEnd).replace(APP_MARKER, html)

    await mkdir(dirname(output), { recursive: true })
    await writeFile(output, page, 'utf-8')
    console.log(`  prerendered ${route.padEnd(12)} -> ${output.slice(root.length + 1)}`)
  }

  // The SSR bundle is a build artifact, not something to deploy.
  await rm(distSsr, { recursive: true, force: true })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
