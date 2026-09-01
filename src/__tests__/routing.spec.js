import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory } from 'vue-router'
import App from '../App.vue'
import { createAppRouter } from '../router/index.js'
import { site, projects, about } from '@/data/site.js'

/** Mounts the real App against the real route table, so views actually render. */
async function mountAt(path) {
  const testRouter = createAppRouter(createMemoryHistory())

  testRouter.push(path)
  await testRouter.isReady()

  const wrapper = mount(App, { attachTo: document.body, global: { plugins: [testRouter] } })
  await new Promise((resolve) => setTimeout(resolve, 0))

  return { wrapper, testRouter }
}

describe('routing', () => {
  beforeEach(() => {
    document.title = ''
  })

  it('renders the About view at /', async () => {
    const { wrapper } = await mountAt('/')

    expect(wrapper.find('h1').text()).toContain(site.name)
    expect(wrapper.text()).toContain('head chef')
    expect(wrapper.find(`img[src="${about.portrait.src}"]`).exists()).toBe(true)
  })

  it('renders every project on the portfolio view', async () => {
    const { wrapper } = await mountAt('/portfolio')
    const text = wrapper.text()

    for (const project of projects) {
      expect(text).toContain(project.title)
    }
    expect(text).toContain('Closed source')
  })

  it('renders the resume and contact views', async () => {
    expect((await mountAt('/resume')).wrapper.text()).toContain('Download Resume')
    expect((await mountAt('/contact')).wrapper.text()).toContain('LinkedIn')
  })

  it('shows the 404 view for an unknown path', async () => {
    const { wrapper } = await mountAt('/no-such-page')
    expect(wrapper.text()).toContain('Page Not Found')
  })

  it('gives every page exactly one h1', async () => {
    for (const path of ['/', '/portfolio', '/resume', '/contact']) {
      const { wrapper } = await mountAt(path)
      expect(wrapper.findAll('h1'), `${path} should have one h1`).toHaveLength(1)
    }
  })

  it('exposes a skip link and a main landmark', async () => {
    const { wrapper } = await mountAt('/')

    expect(wrapper.find('a.skip-link').attributes('href')).toBe('#main')
    expect(wrapper.find('main#main').exists()).toBe(true)
  })

  it('marks the current nav item with aria-current', async () => {
    const { wrapper } = await mountAt('/resume')
    const current = wrapper.findAll('[aria-current="page"]')

    expect(current).toHaveLength(1)
    expect(current[0].text()).toBe('Resume')
  })

  it('moves focus to <main> on navigation so the new page is announced', async () => {
    const { wrapper, testRouter } = await mountAt('/')
    expect(document.activeElement).not.toBe(wrapper.find('main#main').element)

    await testRouter.push('/portfolio')
    await testRouter.isReady()
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(document.activeElement).toBe(wrapper.find('main#main').element)
  })

  it('updates the document title and meta description on navigation', async () => {
    const { testRouter } = await mountAt('/')
    expect(document.title).toContain(site.name)

    await testRouter.push('/portfolio')
    await testRouter.isReady()

    expect(document.title).toContain('Portfolio')
    const description = document.querySelector('meta[name="description"]')
    expect(description?.getAttribute('content')).toContain('regex engine')
  })
})
