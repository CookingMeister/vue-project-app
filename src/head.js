import { site } from '@/data/site.js'

const DEFAULT_OG_IMAGE = `${site.url}/img/profile.png`
const DEFAULT_OG_IMAGE_ALT = 'Shawn Meister smiling outdoors beside the water'

/**
 * Resolves a route to the head tags it should carry.
 *
 * The single source of truth for both rendering paths: `applyHead` uses it for
 * client-side navigation, and the prerenderer uses it to bake real tags into
 * each generated HTML file. Crawlers that do not run JS only ever see the
 * latter, so anything that matters for search or link previews has to be here
 * rather than applied at runtime.
 */
export function resolveHead(route) {
  const path = route.path
  const title = route.meta?.title ?? `${site.name} - ${site.role}`
  const description = route.meta?.description ?? site.description
  const noindex = route.meta?.noindex === true
  // Absolute, and per-route: a single hardcoded canonical tells search engines
  // every route is a duplicate of the home page.
  const url = path === '/' ? `${site.url}/` : `${site.url}${path}`

  return {
    title,
    description,
    // A page excluded from the index has no canonical URL to advertise.
    canonical: noindex ? null : url,
    noindex,
    og: {
      'og:type': 'website',
      'og:site_name': site.domain,
      'og:title': route.meta?.ogTitle ?? title,
      'og:description': route.meta?.ogDescription ?? description,
      'og:url': url,
      'og:image': DEFAULT_OG_IMAGE,
      'og:image:alt': DEFAULT_OG_IMAGE_ALT
    },
    twitter: {
      'twitter:card': 'summary_large_image'
    }
  }
}

/** Upserts a tag matched by `selector`, creating it in <head> if absent. */
function upsert(selector, create) {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = create()
    document.head.appendChild(tag)
  }
  return tag
}

/**
 * Writes resolved head data into the live document. No-ops outside the browser
 * so the router's `afterEach` is safe to run during prerendering.
 */
export function applyHead(head) {
  if (typeof document === 'undefined') return

  document.title = head.title

  upsert('meta[name="description"]', () => {
    const tag = document.createElement('meta')
    tag.setAttribute('name', 'description')
    return tag
  }).setAttribute('content', head.description)

  const canonical = document.head.querySelector('link[rel="canonical"]')
  if (head.canonical) {
    upsert('link[rel="canonical"]', () => {
      const tag = document.createElement('link')
      tag.setAttribute('rel', 'canonical')
      return tag
    }).setAttribute('href', head.canonical)
  } else if (canonical) {
    canonical.remove()
  }

  for (const [property, content] of Object.entries(head.og)) {
    upsert(`meta[property="${property}"]`, () => {
      const tag = document.createElement('meta')
      tag.setAttribute('property', property)
      return tag
    }).setAttribute('content', content)
  }

  for (const [name, content] of Object.entries(head.twitter)) {
    upsert(`meta[name="${name}"]`, () => {
      const tag = document.createElement('meta')
      tag.setAttribute('name', name)
      return tag
    }).setAttribute('content', content)
  }

  const robots = document.head.querySelector('meta[name="robots"]')
  if (head.noindex) {
    upsert('meta[name="robots"]', () => {
      const tag = document.createElement('meta')
      tag.setAttribute('name', 'robots')
      return tag
    }).setAttribute('content', 'noindex')
  } else if (robots) {
    robots.remove()
  }
}

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

/** Serialises resolved head data to the HTML the prerenderer injects. */
export function renderHeadTags(head) {
  const tags = [
    `<title>${escapeAttr(head.title)}</title>`,
    `<meta name="description" content="${escapeAttr(head.description)}" />`,
    ...(head.canonical ? [`<link rel="canonical" href="${escapeAttr(head.canonical)}" />`] : []),
    ...Object.entries(head.og).map(
      ([property, content]) => `<meta property="${property}" content="${escapeAttr(content)}" />`
    ),
    ...Object.entries(head.twitter).map(
      ([name, content]) => `<meta name="${name}" content="${escapeAttr(content)}" />`
    )
  ]

  if (head.noindex) tags.push('<meta name="robots" content="noindex" />')

  return tags.join('\n    ')
}
