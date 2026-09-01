import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from '../FooterComponent.vue'
import { site, socialLinks } from '@/data/site.js'

describe('Footer', () => {
  it('renders current year', () => {
    const wrapper = mount(Footer)
    expect(wrapper.text()).toContain(new Date().getFullYear().toString())
  })

  it('contains social media links', () => {
    const wrapper = mount(Footer)
    expect(
      wrapper.find('a[href="https://github.com/CookingMeister?tab=repositories"]').exists()
    ).toBe(true)
    expect(wrapper.find('a[href="https://www.linkedin.com/in/shawn-meister/"]').exists()).toBe(true)
  })

  it('signs the page with the name only - no domain, no location', () => {
    // The domain is already in the address bar and on the About page, and the
    // location appears there too, so the footer repeats neither.
    const wrapper = mount(Footer)

    expect(wrapper.text()).toContain(site.name)
    expect(wrapper.text()).not.toContain(site.domain)
    expect(wrapper.text()).not.toContain(site.location)
  })

  it('opens every external link safely', () => {
    const wrapper = mount(Footer)
    const anchors = wrapper.findAll('a')

    expect(anchors).toHaveLength(socialLinks.length)
    for (const anchor of anchors) {
      expect(anchor.attributes('target')).toBe('_blank')
      expect(anchor.attributes('rel')).toContain('noopener')
    }
  })
})
