import { existsSync } from 'node:fs'
import { projects } from './projects'
import { badges } from './badges'
import { contactLinks } from './contact'
import { skills } from './skills'

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
    { label: 'X', href: 'https://x.com/x0xmattyic333x' },
    { label: 'Email', href: 'mailto:0xmattyic333@gmail.com' },
  ])
})

// Checks TEMPR is listed anywhere, so adding new projects at the top never breaks this.
it('the TEMPR project is listed', () => {
  expect(projects.map((p) => p.liveUrl)).toContain('https://0xmattyic333.github.io/wolfeepackk_temprgg/')
})

it('every link and media path is valid', () => {
  for (const project of projects) {
    for (const link of project.links ?? []) expect(link.href).toMatch(/^https:\/\//)
    if (project.media) {
      for (const path of Object.values(project.media)) expect(existsSync('public' + path), path).toBe(true)
    }
  }
})

it('the Web3 card lists both token explorers', () => {
  const web3 = projects.find((p) => p.id === 'web3-tokens')!
  expect(web3.links).toEqual([
    {
      label: 'RAR on PolygonScan →',
      href: 'https://polygonscan.com/token/0x0259ddfBD48e65C22Ca365bc32AFF5B0a5fB9567',
    },
    {
      label: 'LIL on BaseScan →',
      href: 'https://basescan.org/token/0xF3007d8719741Cc361Dc7571120c01CE207fC772',
    },
  ])
})

it('skills include on-chain work', () => {
  expect(skills).toEqual(expect.arrayContaining(['Solidity', 'EVM', 'Polygon', 'Base']))
})
