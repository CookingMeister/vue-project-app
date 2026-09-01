import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactSection from '../ContactSection.vue'
import { socialLinks } from '@/data/site.js'

describe('ContactSection', () => {
  it('renders the Contact heading', () => {
    const wrapper = mount(ContactSection)
    expect(wrapper.text()).toContain('Contact')
  })

  it('links to GitHub and LinkedIn', () => {
    const wrapper = mount(ContactSection)
    const github = wrapper.find('a[href="https://github.com/CookingMeister?tab=repositories"]')
    const linkedin = wrapper.find('a[href="https://www.linkedin.com/in/shawn-meister/"]')

    expect(github.exists()).toBe(true)
    expect(linkedin.exists()).toBe(true)

    // External links must not leak the opener window.
    for (const link of [github, linkedin]) {
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toContain('noopener')
    }
  })

  it('renders one card per configured social link', () => {
    const wrapper = mount(ContactSection)
    expect(wrapper.findAll('a')).toHaveLength(socialLinks.length)
  })

  it('renders no message form', () => {
    const wrapper = mount(ContactSection)
    expect(wrapper.find('form').exists()).toBe(false)
    expect(wrapper.find('input[type="email"]').exists()).toBe(false)
  })
})
