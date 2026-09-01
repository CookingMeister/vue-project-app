import { createRouter } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import { site } from '@/data/site.js'
import { applyHead, resolveHead } from '@/head.js'

export const routes = [
  {
    path: '/',
    name: 'About',
    component: AboutView,
    meta: {
      title: `${site.name} - ${site.role}`,
      description: site.description,
      ogDescription:
        'Former head chef turned full-stack developer. Legacy modernization, a regex ' +
        'engine in C, and a Proxmox homelab.'
    }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    // Route-level code splitting: each view ships as its own chunk, loaded on visit.
    component: () => import('../views/PortfolioView.vue'),
    meta: {
      title: `Portfolio - ${site.name}`,
      description:
        'Selected work: a regex engine in C for PL/B, legacy site modernization on Azure and ' +
        'IIS 10, and open-source projects built with Vue, React and Node.'
    }
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () => import('../views/ResumeView.vue'),
    meta: {
      title: `Resume - ${site.name}`,
      description:
        'Skills and experience across languages, frameworks, legacy modernization, ' +
        'databases, infrastructure and networking.'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      title: `Contact - ${site.name}`,
      description: `Get in touch with ${site.name} on GitHub or LinkedIn.`
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: () => import('../views/ErrorView.vue'),
    meta: { title: `Page not found - ${site.name}`, noindex: true }
  }
]

/**
 * Keeps the document head in sync with the route, which an SPA does not do on
 * its own. Matters for history, bookmarks, link previews, search results and
 * screen readers, which announce the title when a page changes.
 *
 * No-ops during prerendering; that path injects the same data as real tags.
 */
export function syncDocumentMeta(to) {
  applyHead(resolveHead(to))
}

/**
 * An explicit `behavior` beats the `scroll-behavior: auto` that styles.css sets
 * under reduced motion, so the preference has to be read here too.
 */
function prefersReducedMotion() {
  return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

// Restore the previous position on back/forward, otherwise start at the top.
export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) return savedPosition
  if (to.hash) {
    return { el: to.hash, behavior: prefersReducedMotion() ? 'auto' : 'smooth' }
  }
  return { top: 0 }
}

/**
 * Built per-caller rather than as a module singleton: the browser passes a web
 * history, the prerenderer and the tests pass a memory history.
 */
export function createAppRouter(history) {
  const router = createRouter({ history, routes, scrollBehavior })
  router.afterEach(syncDocumentMeta)
  return router
}
