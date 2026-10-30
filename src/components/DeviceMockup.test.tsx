import { act, render, screen } from '@testing-library/react'
import DeviceMockup from './DeviceMockup'
import { mockMedia, resetMedia } from '../test/media'
import type { ProjectMedia } from '../data/types'

const media: ProjectMedia = {
  laptopVideo: '/media/demo/laptop.webm',
  laptopVideoMp4: '/media/demo/laptop.mp4',
  laptopPoster: '/media/demo/laptop.jpg',
  phone: '/media/demo/phone.jpg',
}

let observerCallback: IntersectionObserverCallback | undefined
class FakeIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback
  }
  observe() {}
  disconnect() {}
}

let play: ReturnType<typeof vi.spyOn>
let pause: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  window.IntersectionObserver = FakeIntersectionObserver as unknown as typeof IntersectionObserver
  play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
  pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
})

afterEach(() => {
  resetMedia()
  vi.restoreAllMocks()
  observerCallback = undefined
  // @ts-expect-error cleaning up test-only global
  delete window.IntersectionObserver
})

function intersect(isIntersecting: boolean) {
  act(() => {
    observerCallback!([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver)
  })
}

it('shows a silent looping laptop video with WebM then MP4 sources', () => {
  mockMedia()
  const { container } = render(<DeviceMockup media={media} alt="Demo" />)
  const video = container.querySelector('video')!
  expect(video.muted).toBe(true)
  expect(video).toHaveAttribute('playsinline')
  expect(video.loop).toBe(true)
  expect(video).toHaveAttribute('poster', media.laptopPoster)
  const sources = [...video.querySelectorAll('source')].map((s) => s.getAttribute('src'))
  expect(sources).toEqual([media.laptopVideo, media.laptopVideoMp4])
})

it('shows the phone screenshot with descriptive alt text', () => {
  mockMedia()
  render(<DeviceMockup media={media} alt="Demo" />)
  expect(screen.getByRole('img', { name: 'Demo on a phone' })).toHaveAttribute('src', media.phone)
})

it('plays only while on screen', () => {
  mockMedia()
  render(<DeviceMockup media={media} alt="Demo" />)
  intersect(true)
  expect(play).toHaveBeenCalled()
  intersect(false)
  expect(pause).toHaveBeenCalled()
})

it('never plays when reduced motion is preferred', () => {
  mockMedia({ reduceMotion: true })
  const { container } = render(<DeviceMockup media={media} alt="Demo" />)
  expect(container.querySelector('video')).not.toHaveAttribute('autoplay')
  observerCallback?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
  expect(play).not.toHaveBeenCalled()
})
