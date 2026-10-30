import { existsSync } from 'node:fs'
import { projects } from './projects'
import { badges } from './badges'
import { contactLinks } from './contact'

// These tests guard the data files, so a typo when adding a project fails here instead of shipping.

it('project ids are unique', () => {
  const ids = projects.map((p) => p.id)
  expect(new Set(ids).size).toBe(ids.length)
})

it('every project and badge URL is https', () => {
  const urls = [
    ...projects.flatMap((p) => [p.liveUrl, p.codeUrl]),
    ...badges.map((b) => b.verifyUrl),
  ].filter((url) => url !== undefined)
  for (const url of urls) expect(url).toMatch(/^https:\/\//)
})

it('every image path points into public/', () => {
  const images = [...projects.map((p) => p.image), ...badges.map((b) => b.image)]
  for (const image of images) expect(existsSync('public' + image), image).toBe(true)
})

it('contact links match the spec', () => {
  expect(contactLinks).toEqual([
    { label: 'GitHub', href: 'https://github.com/0xmattyic333' },
    { label: 'Discord', href: 'https://discord.com/users/1429664465091297310' },
    { label: 'Email', href: 'mailto:0xmattyic333@gmail.com' },
  ])
})

it('the first project is TEMPR', () => {
  expect(projects[0].liveUrl).toBe('https://0xmattyic333.github.io/wolfeepackk_temprgg/')
})
