import { describe, it, expect } from 'vitest'
import { projects, socialLinks, skillCategories, resumeFile } from '../site.js'

const allLinks = [
  ...socialLinks.map((link) => link.url),
  ...projects.flatMap((project) => project.links.map((link) => link.url))
]

describe('site data', () => {
  it('has no links to retired Heroku free dynos', () => {
    expect(allLinks.filter((url) => url.includes('herokuapp.com'))).toEqual([])
  })

  it('serves every outbound link over https', () => {
    for (const url of allLinks) {
      expect(url, url).toMatch(/^https:\/\//)
    }
  })

  it('gives every project a unique id', () => {
    const ids = projects.map((project) => project.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('offers source or an explicit closed-source note for every project', () => {
    for (const project of projects) {
      const hasSource = project.links.some((link) => link.type === 'github')
      expect(hasSource || project.closedSource, project.title).toBeTruthy()
    }
  })

  it('only uses link types the card knows how to render', () => {
    for (const project of projects) {
      for (const link of project.links) {
        expect(['github', 'demo'], `${project.title}: ${link.type}`).toContain(link.type)
      }
    }
  })

  it('keeps the resume path free of a version or date', () => {
    expect(resumeFile).not.toMatch(/\d/)
  })

  it('has no duplicate skills within a category', () => {
    for (const category of skillCategories) {
      expect(new Set(category.skills).size, category.title).toBe(category.skills.length)
    }
  })
})
