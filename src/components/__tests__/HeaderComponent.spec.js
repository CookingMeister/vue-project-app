import { describe, it, expect, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import HeaderComponent from '../HeaderComponent.vue'
import { site } from '@/data/site.js'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div />' } },
    { path: '/portfolio', component: { template: '<div />' } },
    { path: '/resume', component: { template: '<div />' } },
    { path: '/contact', component: { template: '<div />' } }
  ]
})

/** jsdom has no layout engine, so element heights are always 0 unless stubbed. */
function stubHeaderHeight(px) {
  const spy = vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(px)
  return spy
}

function mountHeader() {
  return mount(HeaderComponent, { global: { plugins: [router] } })
}

afterEach(() => {
  vi.restoreAllMocks()
  document.documentElement.style.removeProperty('--header-height')
})

describe('HeaderComponent', () => {
  it('publishes the measured header height as a CSS custom property', async () => {
    stubHeaderHeight(92)
    mountHeader()
    await router.isReady()

    expect(document.documentElement.style.getPropertyValue('--header-height')).toBe('92px')
  })

  it('reports a taller value when the nav wraps', () => {
    stubHeaderHeight(136)
    mountHeader()

    expect(document.documentElement.style.getPropertyValue('--header-height')).toBe('136px')
  })

  it('mounts without ResizeObserver rather than throwing', () => {
    const original = globalThis.ResizeObserver
    delete globalThis.ResizeObserver
    stubHeaderHeight(92)

    expect(() => mountHeader()).not.toThrow()

    globalThis.ResizeObserver = original
  })

  it('disconnects its observer on unmount', () => {
    const disconnect = vi.fn()
    globalThis.ResizeObserver = class {
      observe() {}
      disconnect = disconnect
    }
    stubHeaderHeight(92)

    mountHeader().unmount()
    expect(disconnect).toHaveBeenCalled()
  })

  it('brands the header with the site handle, and keeps the accessible name in sync', () => {
    // WCAG 2.5.3 Label in Name: the accessible name must contain the visible text.
    const wrapper = mountHeader()
    const brand = wrapper.find('.site-header__brand')

    expect(brand.text()).toContain(site.brand)
    expect(brand.attributes('aria-label')).toContain(site.brand)
  })

  it('renders a labelled nav with every route', () => {
    const wrapper = mountHeader()
    const nav = wrapper.find('nav[aria-label="Main"]')

    expect(nav.exists()).toBe(true)
    expect(nav.findAll('a')).toHaveLength(4)
  })
})
