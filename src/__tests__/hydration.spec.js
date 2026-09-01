import { describe, it, expect, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { createMemoryHistory } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import { createVueApp } from '../app.js'

const PRERENDERED_ROUTES = ['/', '/portfolio', '/resume', '/contact']

async function appAt(path) {
  const { app, router } = createVueApp(createMemoryHistory())
  await router.push(path)
  await router.isReady()
  return { app, router }
}

/**
 * Server-renders a route, then hydrates that exact markup the way the browser
 * does against a prerendered file. A mismatch means Vue threw the prerendered
 * DOM away and re-rendered, which is the failure mode prerendering exists to
 * avoid - and it is only ever visible as a console warning.
 */
async function hydrate(path) {
  const server = await appAt(path)
  const html = await renderToString(server.app)

  const container = document.createElement('div')
  container.innerHTML = html
  document.body.appendChild(container)

  const messages = []
  const capture = (...args) => messages.push(args.join(' '))
  vi.spyOn(console, 'warn').mockImplementation(capture)
  vi.spyOn(console, 'error').mockImplementation(capture)

  const client = await appAt(path)
  client.app.mount(container)
  await nextTick()

  return { html, container, messages }
}

afterEach(() => {
  vi.restoreAllMocks()
  document.body.innerHTML = ''
})

describe('prerendering', () => {
  it.each(PRERENDERED_ROUTES)('hydrates %s without a mismatch', async (path) => {
    const { messages } = await hydrate(path)
    const mismatches = messages.filter((message) => /hydrat|mismatch/i.test(message))

    expect(mismatches, mismatches.join('\n')).toEqual([])
  })

  it('server-renders real content, not an empty shell', async () => {
    const { app } = await appAt('/portfolio')
    const html = await renderToString(app)

    expect(html).toContain('PL/B Regex Engine')
    expect(html).toContain('Closed source')
    expect(html).not.toContain('<!--app-html-->')
  })

  it('renders each route on the server without touching browser globals', async () => {
    // `renderToString` runs in Node during the build; anything reaching for
    // `document` or `window` at render time would throw there.
    for (const path of PRERENDERED_ROUTES) {
      const { app } = await appAt(path)
      await expect(renderToString(app)).resolves.toBeTypeOf('string')
    }
  })
})
