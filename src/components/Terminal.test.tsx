import { act, render, screen } from '@testing-library/react'
import Terminal from './Terminal'
import { terminalScript } from '../data/terminal'
import { mockIntersection, resetIntersection } from '../test/media'

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

it('is labelled for assistive tech, with a full transcript', () => {
  mockReducedMotion(false)
  render(<Terminal />)
  const figure = screen.getByLabelText('Mainframe terminal demo')
  expect(figure.tagName).toBe('FIGURE')
  // The screen-reader transcript has every line at once, even while the animation is mid-way.
  const transcript = figure.querySelector('.sr-only')!
  for (const line of terminalScript) expect(transcript.textContent).toContain(line.text)
})

it('shows the whole job immediately when reduced motion is preferred', () => {
  mockReducedMotion(true)
  const { container } = render(<Terminal />)
  const screenText = container.querySelector('[aria-hidden="true"]')!.textContent
  for (const line of terminalScript) expect(screenText).toContain(line.text)
})

it('types the job out and finishes with MAXCC=0000', () => {
  mockReducedMotion(false)
  vi.useFakeTimers()
  const { container } = render(<Terminal />)
  const screenEl = container.querySelector('[aria-hidden="true"]')!
  expect(screenEl.textContent).not.toContain('MAXCC=0000')
  act(() => {
    vi.advanceTimersByTime(6000) // job ends ~4.9s; loop restarts ~7.4s
  })
  expect(screenEl.textContent).toContain('MAXCC=0000')
})

// At 360px the window is ~296px wide; 11px monospace fits the longest 40-char line (~264px)
// so lines like "...SUBMITTED" don't split mid-word.
it('uses a phone-sized font that fits each line without mid-word breaks', () => {
  mockReducedMotion(true)
  const { container } = render(<Terminal />)
  const screenEl = container.querySelector('pre')!
  expect(screenEl).toHaveClass('text-[11px]')
  expect(screenEl).not.toHaveClass('break-all')
})

it('pauses while scrolled off screen, and resumes when back', () => {
  mockReducedMotion(false)
  const setOnScreen = mockIntersection()
  vi.useFakeTimers()
  const { container } = render(<Terminal />)
  const screenEl = container.querySelector('[aria-hidden="true"]')!
  act(() => setOnScreen(false))
  act(() => {
    vi.advanceTimersByTime(6000)
  })
  expect(screenEl.textContent).not.toContain('MAXCC=0000')
  act(() => setOnScreen(true))
  act(() => {
    vi.advanceTimersByTime(6000)
  })
  expect(screenEl.textContent).toContain('MAXCC=0000')
  resetIntersection()
})
