import { act, render, screen } from '@testing-library/react'
import Reveal from './Reveal'

// jsdom has no matchMedia or IntersectionObserver, so each test sets up exactly the browser it needs.
function mockReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({ matches: reduce }) as unknown as typeof window.matchMedia
}

let observerCallback: IntersectionObserverCallback | undefined
class FakeIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback
  }
  observe() {}
  disconnect() {}
}

afterEach(() => {
  observerCallback = undefined
  // @ts-expect-error cleaning up test-only globals
  delete window.IntersectionObserver
})

it('content is visible immediately when reduced motion is preferred', () => {
  mockReducedMotion(true)
  window.IntersectionObserver = FakeIntersectionObserver as unknown as typeof IntersectionObserver
  render(<Reveal><p>hello</p></Reveal>)
  expect(screen.getByText('hello').parentElement).not.toHaveClass('opacity-0')
})

it('content is visible when IntersectionObserver is unavailable', () => {
  mockReducedMotion(false)
  render(<Reveal><p>hello</p></Reveal>)
  expect(screen.getByText('hello').parentElement).not.toHaveClass('opacity-0')
})

it('content starts hidden then shows on intersect', () => {
  mockReducedMotion(false)
  window.IntersectionObserver = FakeIntersectionObserver as unknown as typeof IntersectionObserver
  render(<Reveal><p>hello</p></Reveal>)
  const wrapper = screen.getByText('hello').parentElement!
  expect(wrapper).toHaveClass('opacity-0')
  act(() => {
    observerCallback!([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
  })
  expect(wrapper).toHaveClass('opacity-100')
})
