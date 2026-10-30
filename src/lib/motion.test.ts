import { renderHook } from '@testing-library/react'
import { useCanHover, usePrefersReducedMotion } from './motion'

function mockMatchMedia(matches: Record<string, boolean>) {
  window.matchMedia = vi.fn((query: string) => ({
    matches: matches[query] ?? false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

afterEach(() => {
  // @ts-expect-error resetting the test-only mock
  delete window.matchMedia
})

it('both hooks are false when matchMedia is unavailable', () => {
  expect(renderHook(() => usePrefersReducedMotion()).result.current).toBe(false)
  expect(renderHook(() => useCanHover()).result.current).toBe(false)
})

it('reads reduced motion from the media query', () => {
  mockMatchMedia({ '(prefers-reduced-motion: reduce)': true })
  expect(renderHook(() => usePrefersReducedMotion()).result.current).toBe(true)
})

it('reads hover capability from the media query', () => {
  mockMatchMedia({ '(hover: hover) and (pointer: fine)': true })
  expect(renderHook(() => useCanHover()).result.current).toBe(true)
})
