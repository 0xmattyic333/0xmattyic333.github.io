import { fireEvent, render } from '@testing-library/react'
import CursorGlow from './CursorGlow'
import { mockMedia, resetMedia } from '../test/media'

let rafSpy: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  // Run animation frames immediately so we can check the result synchronously.
  rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
    cb(0)
    return 1
  })
})

afterEach(() => {
  rafSpy.mockRestore()
  resetMedia()
  vi.restoreAllMocks()
})

// The moving light itself (inside the clipping frame).
function glow(container: HTMLElement) {
  return container.querySelector('[data-glow]') as HTMLElement
}

it('is decorative and never blocks clicks', () => {
  mockMedia({ canHover: true })
  const { container } = render(<CursorGlow />)
  expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  expect(container.firstElementChild).toHaveClass('pointer-events-none')
})

it('stays still and ignores the pointer when reduced motion is preferred', () => {
  mockMedia({ reduceMotion: true, canHover: true })
  const add = vi.spyOn(window, 'addEventListener')
  const { container } = render(<CursorGlow />)
  expect(glow(container)).toHaveClass('glow-static')
  expect(add.mock.calls.some(([type]) => type === 'pointermove')).toBe(false)
})

it('drifts on its own on touch devices', () => {
  mockMedia({ canHover: false })
  const { container } = render(<CursorGlow />)
  expect(glow(container)).toHaveClass('glow-drift')
})

it('follows the pointer on devices with a mouse', () => {
  mockMedia({ canHover: true })
  const { container } = render(<CursorGlow />)
  fireEvent.pointerMove(window, { clientX: 300, clientY: 200 })
  expect(glow(container).style.transform).toContain('translate3d(')
})

it('does no animation work while the tab is hidden', () => {
  mockMedia({ canHover: true })
  render(<CursorGlow />)
  rafSpy.mockClear()
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(true)
  fireEvent.pointerMove(window, { clientX: 300, clientY: 200 })
  expect(rafSpy).not.toHaveBeenCalled()
})

// The light drifts past the right edge on a 360px phone; a fixed, clipped frame stops
// it from ever widening the page (iOS Safari can count fixed elements as overflow).
it('is clipped to the screen so it can never cause sideways scrolling', () => {
  mockMedia({ canHover: false })
  const { container } = render(<CursorGlow />)
  const frame = container.firstElementChild as HTMLElement
  expect(frame).toHaveClass('fixed', 'inset-0', 'overflow-hidden', 'pointer-events-none')
  expect(frame).toHaveAttribute('aria-hidden', 'true')
  expect(frame).toContainElement(glow(container))
})
