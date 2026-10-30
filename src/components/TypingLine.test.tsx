import { act, render, screen } from '@testing-library/react'
import TypingLine from './TypingLine'

const phrases = ['building React apps', 'writing COBOL & REXX']

function mockReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn((query: string) => ({
    matches: query === '(prefers-reduced-motion: reduce)' ? reduce : false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

afterEach(() => {
  vi.useRealTimers()
  // @ts-expect-error resetting the test-only mock
  delete window.matchMedia
})

it('shows the first phrase, still, when reduced motion is preferred', () => {
  mockReducedMotion(true)
  const { container } = render(<TypingLine phrases={phrases} />)
  expect(container.querySelector('[aria-hidden="true"]')!.textContent).toContain('> building React apps')
})

it('moves on to the next phrase over time', () => {
  mockReducedMotion(false)
  vi.useFakeTimers()
  const { container } = render(<TypingLine phrases={phrases} />)
  const visible = container.querySelector('[aria-hidden="true"]')!
  // type (~1.1s) + hold (1.4s) + erase (~0.6s) + type the second phrase (~1.2s)
  act(() => {
    vi.advanceTimersByTime(5000)
  })
  expect(visible.textContent).toContain('writing COBOL & REXX')
})

it('gives screen readers every phrase without announcing each keystroke', () => {
  mockReducedMotion(false)
  render(<TypingLine phrases={phrases} />)
  for (const phrase of phrases) expect(screen.getByText(phrase)).toHaveClass('sr-only')
})
