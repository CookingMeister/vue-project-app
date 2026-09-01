import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ResumeSection from '../ResumeSection.vue'
import DownloadLink from '../DownloadLink.vue'
import { skillCategories, resumeFile } from '@/data/site.js'

describe('ResumeSection', () => {
  it('renders the Resume section with DownloadLink component', () => {
    const wrapper = mount(ResumeSection)

    expect(wrapper.text()).toContain('Resume')
    expect(wrapper.findComponent(DownloadLink).exists()).toBe(true)
  })

  it('renders every skill category from site data', () => {
    const wrapper = mount(ResumeSection)

    for (const category of skillCategories) {
      expect(wrapper.text()).toContain(category.title)
    }
  })

  it('lists the current toolset, including recent work', () => {
    const wrapper = mount(ResumeSection)
    const text = wrapper.text()

    for (const skill of [
      'C',
      'PL/B + Visual PL/B',
      'Azure',
      'IIS 10',
      'OPNsense firewall & routing'
    ]) {
      expect(text).toContain(skill)
    }
  })

  it('points the resume download at a version-neutral path', () => {
    const wrapper = mount(ResumeSection)
    const link = wrapper.find(`a[href="${resumeFile}"]`)

    expect(link.exists()).toBe(true)
    expect(resumeFile).not.toMatch(/\d{4}/)
  })
})
