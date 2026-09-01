import { describe, it, expect, beforeEach } from 'vitest'
import { createMemoryHistory } from 'vue-router'
import { applyHead, renderHeadTags, resolveHead } from '../head.js'
import { createAppRouter, routes } from '../router/index.js'
import { site } from '@/data/site.js'

async function headFor(path) {
  const router = createAppRouter(createMemoryHistory())
  await router.push(path)
  await router.isReady()
  return resolveHead(router.currentRoute.value)
}

describe('head', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
  })

  it('gives every route its own canonical URL', async () => {
    const seen = new Set()

    for (const path of ['/', '/portfolio', '/resume', '/contact']) {
      const { canonical } = await headFor(path)
      expect(canonical.startsWith(site.url), canonical).toBe(true)
      seen.add(canonical)
    }

    // One shared canonical would tell search engines the routes are duplicates.
    expect(seen.size).toBe(4)
  })

  it('points og:url at the same URL as the canonical', async () => {
    for (const path of ['/', '/portfolio', '/resume']) {
      const head = await headFor(path)
      expect(head.og['og:url']).toBe(head.canonical)
    }
  })

  it('gives every route its own og:title and og:description', async () => {
    const titles = new Set()
    const descriptions = new Set()

    for (const path of ['/', '/portfolio', '/resume', '/contact']) {
      const head = await headFor(path)
      titles.add(head.og['og:title'])
      descriptions.add(head.og['og:description'])
    }

    expect(titles.size).toBe(4)
    expect(descriptions.size).toBe(4)
  })

  it('marks the error route noindex and nothing else', async () => {
    expect((await headFor('/no-such-page')).noindex).toBe(true)

    for (const path of ['/', '/portfolio', '/resume', '/contact']) {
      expect((await headFor(path)).noindex, path).toBe(false)
    }
  })

  it('advertises no canonical URL on a noindex page', async () => {
    const head = await headFor('/no-such-page')

    expect(head.canonical).toBeNull()
    expect(renderHeadTags(head)).not.toContain('rel="canonical"')
    expect(renderHeadTags(head)).toContain('<meta name="robots" content="noindex" />')
  })

  it('drops a stale canonical when navigating onto the error route', async () => {
    applyHead(await headFor('/resume'))
    expect(document.head.querySelector('link[rel="canonical"]')).not.toBeNull()

    applyHead(await headFor('/no-such-page'))
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull()
  })

  it('describes every route, falling back to the site description', () => {
    for (const route of routes) {
      const { description } = resolveHead(route)
      expect(description, route.name).toBeTruthy()
    }
  })

  it('applies and then updates tags in place rather than duplicating them', async () => {
    applyHead(await headFor('/'))
    applyHead(await headFor('/resume'))

    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
    expect(document.head.querySelectorAll('meta[property="og:url"]')).toHaveLength(1)
    expect(document.head.querySelector('link[rel="canonical"]').getAttribute('href')).toBe(
      `${site.url}/resume`
    )
  })

  it('removes the noindex tag when navigating off the error route', async () => {
    applyHead(await headFor('/no-such-page'))
    expect(document.head.querySelector('meta[name="robots"]')).not.toBeNull()

    applyHead(await headFor('/'))
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull()
  })

  it('escapes quotes so an apostrophe cannot break out of an attribute', () => {
    const tags = renderHeadTags(
      resolveHead({ path: '/x', meta: { title: 'A "quoted" <title>', description: 'x' } })
    )

    expect(tags).not.toContain('content="A "quoted"')
    expect(tags).toContain('&quot;')
    expect(tags).toContain('&lt;title&gt;')
  })

  it('renders the tags the prerenderer injects', async () => {
    const tags = renderHeadTags(await headFor('/portfolio'))

    expect(tags).toContain('<title>Portfolio - Shawn Meister</title>')
    expect(tags).toContain(`<link rel="canonical" href="${site.url}/portfolio" />`)
    expect(tags).toContain(`<meta property="og:url" content="${site.url}/portfolio" />`)
    expect(tags).toContain('<meta name="twitter:card" content="summary_large_image" />')
  })
})
