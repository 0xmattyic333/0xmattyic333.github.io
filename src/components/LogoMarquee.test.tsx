import { render, screen } from '@testing-library/react'
import { existsSync } from 'node:fs'
import LogoMarquee from './LogoMarquee'
import { logos } from '../data/logos'
import { mockMedia, resetMedia } from '../test/media'

afterEach(resetMedia)

it('names every logo exactly once for screen readers', () => {
  mockMedia()
  render(<LogoMarquee />)
  for (const logo of logos) expect(screen.getAllByRole('img', { name: logo.name })).toHaveLength(1)
})

it('uses the bundled official Base mark', () => {
  const base = logos.find((l) => l.name === 'Base')!
  expect(base.src).toBe('/images/logos/base.svg')
  expect(existsSync('public' + base.src)).toBe(true)
})

it('scrolls only when motion is allowed', () => {
  mockMedia({ reduceMotion: true })
  const { container, unmount } = render(<LogoMarquee />)
  expect(container.querySelector('.animate-marquee')).toBeNull()
  unmount()
  mockMedia()
  const { container: moving } = render(<LogoMarquee />)
  expect(moving.querySelector('.animate-marquee')).not.toBeNull()
})

it('is clipped so it can never widen the page', () => {
  mockMedia()
  const { container } = render(<LogoMarquee />)
  expect(container.firstElementChild).toHaveClass('overflow-hidden')
})
